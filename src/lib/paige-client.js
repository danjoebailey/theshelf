import { buildUserProfile, scoreBook, getBucket, GENRE_BUCKETS } from "./recommender.js";

let recLibrary = null;
let primaryCatalog = null;
let tagData = null;
let tagByNorm = null; // normalized title+author → tagEntry lookup
let loadPromise = null;

async function ensureLoaded() {
  if (recLibrary && tagData) return;
  if (loadPromise) return loadPromise;
  loadPromise = Promise.all([
    fetch("/rec-library.json").then(r => r.json()),
    fetch("/book-data.json").then(r => r.json()),
    fetch("/book-tags.json").then(r => r.json()),
  ]).then(([rec, primary, tags]) => {
    recLibrary = rec;
    primaryCatalog = primary;
    tagData = tags;
    // Build a title+author → {id, tagEntry} lookup for profile matching
    tagByNorm = {};
    const allBooks = [...primary, ...rec];
    for (const book of allBooks) {
      const te = tags[String(book.id)];
      if (te) {
        const key = normalize(book.title) + "|" + normalize(book.author);
        tagByNorm[key] = { id: book.id, genre: book.genre, ...te };
      }
    }
  });
  return loadPromise;
}

function normalize(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function modeFilter(mode, book, tagEntry, userProfile) {
  if (!tagEntry) return false;
  const v = tagEntry.vibes;

  switch (mode) {
    case "popular":
      return book.tier === "S";

    case "trending": {
      const year = parseInt(book.publicationDate?.slice(0, 4));
      return year >= 2022;
    }

    case "hidden_gems":
      return true;

    case "comfort_read":
      return v.difficulty <= 5 && v.intensity <= 6 && v.warmth >= 4 && v.emotional_register >= 3;

    case "challenge_me":
      return v.difficulty >= 6 || v.prose_craft >= 8;

    case "new_to_me": {
      const bucket = getBucket(book.genre);
      const bp = userProfile.bucketProfiles[bucket];
      return !bp || bp.bookCount < 5;
    }

    default:
      return true;
  }
}

function modeScore(mode, baseScore, tagEntry) {
  if (!tagEntry) return baseScore;
  const v = tagEntry.vibes;

  switch (mode) {
    case "comfort_read":
      return baseScore + (v.warmth / 100) + (v.tone / 100) + (v.emotional_register / 100) - (v.difficulty / 100);

    case "challenge_me":
      return baseScore + (v.difficulty / 100) + (v.prose_craft / 100);

    case "new_to_me":
      return baseScore + 0.05;

    default:
      return baseScore;
  }
}

function generateReason(mode, book, tagEntry, score) {
  const v = tagEntry?.vibes;
  if (!v) return "Matches your reading profile.";

  const craftDesc = v.prose_craft >= 8 ? "exceptional prose" : v.prose_craft >= 6 ? "solid prose" : "accessible writing";
  const paceDesc = v.pace >= 7 ? "fast-paced" : v.pace <= 3 ? "meditative" : "";
  const toneDesc = v.tone >= 7 ? "playful and witty" : v.tone <= 3 ? "serious and intense" : "";

  switch (mode) {
    case "popular":
      return `Acclaimed ${book.genre.toLowerCase()} with ${craftDesc}. ${(score * 100).toFixed(0)}% match.`;
    case "trending":
      return `Published ${book.publicationDate?.slice(0, 4) || "recently"} — ${craftDesc}. ${(score * 100).toFixed(0)}% match.`;
    case "hidden_gems":
      return `Under-the-radar ${book.genre.toLowerCase()} with ${craftDesc}. ${(score * 100).toFixed(0)}% match.`;
    case "comfort_read":
      return `Warm, ${paceDesc ? paceDesc + ", " : ""}satisfying read. ${(score * 100).toFixed(0)}% match.`;
    case "challenge_me":
      return `${v.difficulty >= 8 ? "Demanding" : "Ambitious"} ${book.genre.toLowerCase()} with ${craftDesc}. ${(score * 100).toFixed(0)}% match.`;
    case "new_to_me":
      return `${book.genre} you haven't explored much — ${craftDesc}. ${(score * 100).toFixed(0)}% match.`;
    default:
      return `${(score * 100).toFixed(0)}% match based on your reading profile.`;
  }
}

export async function generatePaigeRecs(userBooks, mode, exclude = [], genre = null) {
  await ensureLoaded();

  // Build profile using title+author matching instead of ID matching
  // This handles shelf books that don't have our catalog IDs
  const readBooks = userBooks.filter(b => (b.shelf || "Read") === "Read");
  const profileTagData = {};
  const profileBooks = [];
  for (const book of readBooks) {
    const key = normalize(book.title) + "|" + normalize(book.author);
    const match = tagByNorm[key];
    if (match) {
      const fakeId = match.id || key;
      profileTagData[String(fakeId)] = { vibes: match.vibes, tags: match.tags };
      profileBooks.push({ ...book, id: fakeId, genre: match.genre || book.genre });
    }
  }

  const profile = buildUserProfile(profileBooks, profileTagData);

  const excludeSet = new Set(exclude.map(t => normalize(t)));
  const readSet = new Set(readBooks.map(b => normalize(b.title)));

  // hidden_gems + new_to_me: rec library only (books user probably doesn't know)
  // all other modes: score ALL tagged books from both catalogs
  const recOnly = mode === "hidden_gems" || mode === "new_to_me";
  const pool = recOnly ? recLibrary : [...primaryCatalog, ...recLibrary];

  let candidates = pool.filter(book => {
    if (readSet.has(normalize(book.title))) return false;
    if (excludeSet.has(normalize(book.title))) return false;
    if (genre && book.genre !== genre) return false;
    const te = tagData[String(book.id)];
    return modeFilter(mode, book, te, profile);
  });

  const scored = candidates.map(book => {
    const te = tagData[String(book.id)];
    if (!te) return null;
    const base = scoreBook(book, te, profile);
    if (base == null) return null;
    const final = modeScore(mode, base, te);
    return { book, score: final, tagEntry: te };
  }).filter(Boolean);

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 10);
  const reservePool = scored.slice(10, 20);

  const recommendations = top.map(({ book, score, tagEntry }) => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    publishYear: parseInt(book.publicationDate?.slice(0, 4)) || null,
    pages: book.pageCount || null,
    reason: generateReason(mode, book, tagEntry, score),
    score,
  }));

  const reserve = reservePool.map(({ book, score, tagEntry }) => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    publishYear: parseInt(book.publicationDate?.slice(0, 4)) || null,
    pages: book.pageCount || null,
    reason: generateReason(mode, book, tagEntry, score),
    score,
  }));

  return { recommendations, reserve };
}

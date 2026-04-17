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
      return book.tier === "S" || book.tier === 1 || book.tier === "1";

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

function mismatchPenalty(bookVibes, profileVibes, allKeys) {
  // Penalize books that are 3+ points away on ANY vibe dimension
  // This prevents a warm/gentle book from scoring 90%+ for a grim/intense reader
  let penalty = 0;
  for (const key of allKeys) {
    const bv = bookVibes[key];
    const pv = profileVibes[key];
    if (bv == null || pv == null) continue;
    const diff = Math.abs(bv - pv);
    if (diff >= 4) penalty += 0.04; // harsh penalty for 4+ point gap
    else if (diff >= 3) penalty += 0.02; // moderate penalty for 3 point gap
  }
  return penalty;
}

function modeScore(mode, baseScore, tagEntry, userProfile) {
  if (!tagEntry) return baseScore;
  const v = tagEntry.vibes;

  // Apply mismatch penalty — big vibe gaps should hurt the score
  const allVibeKeys = ["prose_craft", "prose_style", "warmth", "intensity", "pace", "moral_complexity", "fabulism", "emotional_register", "interiority", "tone", "difficulty"];
  const combinedProfile = { ...userProfile.globalVibes };
  const bucket = getBucket(tagEntry.tags?.find(t => GENRE_BUCKETS[t]) || "Fiction");
  const bp = userProfile.bucketProfiles[bucket];
  if (bp) Object.assign(combinedProfile, bp.vibes);
  const penalty = mismatchPenalty(v, combinedProfile, allVibeKeys);
  let adjusted = baseScore - penalty;

  switch (mode) {
    case "comfort_read":
      adjusted += (v.warmth / 100) + (v.tone / 100) + (v.emotional_register / 100) - (v.difficulty / 100);
      break;
    case "challenge_me":
      adjusted += (v.difficulty / 100) + (v.prose_craft / 100);
      break;
    case "new_to_me":
      adjusted += 0.05;
      break;
  }

  return adjusted;
}

function describeVibe(val, low, mid, high) {
  if (val >= 8) return high;
  if (val <= 3) return low;
  return mid;
}

function generateReason(mode, book, tagEntry, score, userProfile) {
  const v = tagEntry?.vibes;
  if (!v) return "Matches your reading profile.";

  // Build a reason from the STRONGEST matching vibes, not just craft
  const traits = [];
  if (v.prose_craft >= 8) traits.push("exceptional prose");
  else if (v.prose_craft >= 6) traits.push("solid craft");
  if (v.intensity >= 7) traits.push("visceral and intense");
  else if (v.intensity <= 3) traits.push("gentle");
  if (v.warmth >= 8) traits.push("warm and human");
  else if (v.warmth <= 2) traits.push("cold and unflinching");
  if (v.moral_complexity >= 8) traits.push("morally complex");
  if (v.tone >= 7) traits.push("playful");
  else if (v.tone <= 2) traits.push("serious");
  if (v.difficulty >= 8) traits.push("demanding");
  else if (v.difficulty <= 2) traits.push("accessible");
  if (v.pace >= 8) traits.push("propulsive");
  else if (v.pace <= 2) traits.push("meditative");
  if (v.interiority >= 8) traits.push("deeply psychological");
  if (v.emotional_register <= 2) traits.push("bleak");
  else if (v.emotional_register >= 8) traits.push("joyful");

  const traitStr = traits.slice(0, 3).join(", ");
  const pct = `${(score * 100).toFixed(0)}%`;

  switch (mode) {
    case "popular":
      return `${traitStr || book.genre}. ${pct} match.`;
    case "trending":
      return `Published ${book.publicationDate?.slice(0, 4) || "recently"} — ${traitStr || book.genre.toLowerCase()}. ${pct} match.`;
    case "hidden_gems":
      return `Under-the-radar — ${traitStr || book.genre.toLowerCase()}. ${pct} match.`;
    case "comfort_read":
      return `${traitStr || "Warm and satisfying"}. ${pct} match.`;
    case "challenge_me":
      return `${traitStr || "Ambitious and demanding"}. ${pct} match.`;
    case "new_to_me":
      return `${book.genre} — ${traitStr || "something different"}. ${pct} match.`;
    default:
      return `${traitStr || book.genre}. ${pct} match.`;
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

  // Pool selection per mode:
  // acclaimed: primary only (canonical, well-known books)
  // hidden_gems + new_to_me: rec library only (books user probably doesn't know)
  // all other modes: both catalogs
  const pool = mode === "popular" ? primaryCatalog
    : (mode === "hidden_gems" || mode === "new_to_me") ? recLibrary
    : [...primaryCatalog, ...recLibrary];

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
    const final = modeScore(mode, base, te, profile);
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
    reason: generateReason(mode, book, tagEntry, score, profile),
    score,
  }));

  const reserve = reservePool.map(({ book, score, tagEntry }) => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    publishYear: parseInt(book.publicationDate?.slice(0, 4)) || null,
    pages: book.pageCount || null,
    reason: generateReason(mode, book, tagEntry, score, profile),
    score,
  }));

  return { recommendations, reserve };
}

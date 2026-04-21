import { buildUserProfile, scoreBook, getBucket, craftHardFilter } from "./recommender.js";

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
    // Build a title+author → {id, tagEntry} lookup for profile matching.
    // Each catalog book registers under every joinKey variant it could present
    // as (e.g., a subtitled title also registers under its suffix) so shelf
    // entries can match regardless of which form they stored.
    tagByNorm = {};
    const allBooks = [...primary, ...rec];
    for (const book of allBooks) {
      const te = tags[String(book.id)];
      if (!te) continue;
      const entry = { id: book.id, genre: book.genre, ...te };
      for (const key of joinKeyVariants(book.title, book.author)) {
        if (!tagByNorm[key]) tagByNorm[key] = entry;
      }
    }
  });
  return loadPromise;
}

function normalize(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Match-normalization collapses common Scandinavian/German digraphs so names
// like "Knausgaard" (aa) and "Knausgård" (å → a after diacritic strip) produce
// the same key. Title+author is specific enough that the rare digraph collision
// is preferable to dropping dozens of real matches.
function matchNormalize(s) {
  return s.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\bcolour\b/g, "color")         // British → American for the one case that matters
    .replace(/aa/g, "a")
    .replace(/oe/g, "o")
    .replace(/ae/g, "a")
    .replace(/ue/g, "u")
    .replace(/ss/g, "s")
    .replace(/[^a-z0-9]/g, "");
}

// Clean a title for keying: strip "(series, #N)" annotations and trailing
// "and/& Other Stories" suffixes that mark anthology editions of books the
// catalog stores under a shorter title.
function cleanTitle(title) {
  return (title || "")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/[,:]?\s*(and|&)\s+other\s+(stories|tales|poems)\s*$/i, "")
    .trim();
}

// Strip leading article ("The ", "A ", "An ") so shelf "The Adventures of
// Huckleberry Finn" matches catalog "Adventures of Huckleberry Finn".
function stripLeadingArticle(title) {
  return (title || "").replace(/^(the|an?)\s+/i, "").trim();
}

// Clean an author for keying: drop co-authors/translators, generational
// suffixes, and middle initials ("Barbara W. Tuchman" → "Barbara Tuchman").
function cleanAuthor(author) {
  return (author || "")
    .replace(/\s*&.*$/, "")
    .replace(/,?\s*(Jr\.?|Sr\.?|III|IV|II)\s*$/i, "")
    .replace(/\s+[A-Z]\.\s+/g, " ")
    .trim();
}

// A single book can present several title forms on either side of the join.
// Registering catalog books under every plausible key, and looking shelf books
// up under the same set, catches mismatches without extra lookups.
function joinKeyVariants(title, author) {
  const t = cleanTitle(title);
  const a = cleanAuthor(author);
  const na = matchNormalize(a);
  const keys = new Set();
  keys.add(matchNormalize(t) + "|" + na);

  // Colon splits: "Palm Sunday: an Autobiographical Collage" ↔ "Palm Sunday"
  //              "The Wheel of Time: New Spring" ↔ "New Spring"
  const colonIdx = t.indexOf(":");
  if (colonIdx > 0) {
    const before = t.slice(0, colonIdx).trim();
    const after = t.slice(colonIdx + 1).trim();
    if (before.length >= 3) keys.add(matchNormalize(before) + "|" + na);
    if (after.length >= 3) keys.add(matchNormalize(after) + "|" + na);
  }

  // "The Adventures of Huckleberry Finn" ↔ "Adventures of Huckleberry Finn"
  const stripped = stripLeadingArticle(t);
  if (stripped !== t && stripped.length >= 3) {
    keys.add(matchNormalize(stripped) + "|" + na);
  }

  return keys;
}

function joinKey(title, author) {
  // When looking up a single key (for the unmatched-diagnostic log), use the
  // canonical form. Matching itself iterates variants.
  return matchNormalize(cleanTitle(title)) + "|" + matchNormalize(cleanAuthor(author));
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

function modeScore(mode, baseScore, tagEntry, userProfile) {
  // Mode filters already narrow the pool (comfort_read requires warm/gentle,
  // challenge_me requires hard/crafted). scoreBook's z-scored vibe match
  // already penalizes taste mismatches against per-bucket SDs, so the old
  // flat 0.02/0.04 mismatchPenalty is redundant and has been removed.
  return baseScore;
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
  // Display is clamped at 100% — the raw composite can exceed 1.0 for
  // exceptional fits, but anything over "100% match" reads as broken.
  const pct = `${Math.min(100, Math.round(score * 100))}%`;

  switch (mode) {
    case "all":
      return `${traitStr || book.genre}. ${pct} match.`;
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

export async function generatePaigeRecs(userBooks, mode, exclude = [], genre = null, authorLimit = 2) {
  await ensureLoaded();

  // Build profile using title+author matching instead of ID matching
  // This handles shelf books that don't have our catalog IDs
  const readBooks = userBooks.filter(b => (b.shelf || "Read") === "Read");
  const profileTagData = {};
  const profileBooks = [];
  const unmatchedByGenre = {};
  for (const book of readBooks) {
    let match = null;
    for (const key of joinKeyVariants(book.title, book.author)) {
      if (tagByNorm[key]) { match = tagByNorm[key]; break; }
    }
    if (match) {
      const fakeId = match.id || joinKey(book.title, book.author);
      profileTagData[String(fakeId)] = { vibes: match.vibes, tags: match.tags, scores: match.scores };
      profileBooks.push({ ...book, id: fakeId, genre: match.genre || book.genre });
    } else {
      const g = book.genre || "Unknown";
      if (!unmatchedByGenre[g]) unmatchedByGenre[g] = [];
      unmatchedByGenre[g].push(`${book.title} — ${book.author}`);
    }
  }
  console.group(`[Paige join diag] mode=${mode}`);
  console.log(`matched=${profileBooks.length}/${readBooks.length} read books`);
  for (const [g, list] of Object.entries(unmatchedByGenre)) {
    console.log(`unmatched ${g} (${list.length}):`, list);
  }
  console.groupEnd();

  const profile = buildUserProfile(profileBooks, profileTagData);

  // Diagnostic: dump per-bucket book counts + craft weights to see why a bucket
  // might be empty (sparse history) vs. present (enough rated books in bucket).
  const bucketBookCounts = {};
  for (const b of profileBooks) {
    const g = b.genre || "Fiction";
    const bkt = ({
      "Fiction": "literary", "Historical Fiction": "historical", "Biography": "literary",
      "Fantasy": "fantasy", "Sci-Fi": "sf", "Horror": "horror", "Graphic Novel": "literary",
      "Mystery": "mystery", "Thriller": "thriller", "Romance": "romance",
      "Young Adult": "romance", "Non-Fiction": "nonfiction", "History": "nonfiction",
      "Self-Help": "nonfiction",
    })[g] || "literary";
    bucketBookCounts[bkt] = (bucketBookCounts[bkt] || 0) + 1;
  }
  console.group(`[Paige craft profile] mode=${mode}`);
  console.log("books per bucket (profile):", bucketBookCounts);
  if (profile.craftProfile) {
    for (const [bucket, axes] of Object.entries(profile.craftProfile.buckets)) {
      let uniSum = 0, packSum = 0;
      const UNI = new Set(["prose","characters","plot","pacing","ideas","resonance","ending","voice"]);
      const rows = [];
      for (const [axis, stats] of Object.entries(axes)) {
        const isUni = UNI.has(axis);
        if (isUni) uniSum += stats.weight; else packSum += stats.weight;
        rows.push({ axis, type: isUni ? "uni" : "pack", weight: +stats.weight.toFixed(3), mean: +stats.mean.toFixed(2), sd: +stats.sd.toFixed(2), n: stats.n });
      }
      const axisCount = Object.keys(axes).length;
      console.log(`${bucket}  books=${bucketBookCounts[bucket] || 0}  axes=${axisCount}  uniSum=${uniSum.toFixed(3)} packSum=${packSum.toFixed(3)}`);
      if (axisCount > 0) console.table(rows);
    }
  } else {
    console.log(`no craftProfile — need ≥3 rated books with craft scores`);
  }
  console.groupEnd();

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
    // Require craft scores — excludes children's/MG/travel-writing backlog
    // that was deliberately left unscored. Adult reader recs shouldn't surface those.
    if (!te?.scores) return false;
    // Craft hard filter: z < -2 on a high-weight axis for this bucket → candidate
    // fails the reader's standards badly enough to exclude, not merely penalize.
    if (craftHardFilter(book, te, profile.craftProfile)) return false;
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

  // Cap how many times a single author can appear in the final list. Prevents
  // a reader's top-fit author from eating the whole screen. authorLimit=0
  // disables the cap.
  const capped = authorLimit > 0 ? (() => {
    const counts = {};
    return scored.filter(({ book }) => {
      const a = book.author || "";
      counts[a] = (counts[a] || 0) + 1;
      return counts[a] <= authorLimit;
    });
  })() : scored;

  const top = capped.slice(0, 10);
  const reservePool = capped.slice(10, 20);

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

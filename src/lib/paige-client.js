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

// Qualifier shape: { axisName: { min, max }, ... }. Missing axes or {min:0,
// max:10} = no filter. Used to hard-filter the candidate pool to books whose
// vibes/scores land inside the user's stated ranges before ranking. Pure
// filter layer — does not mutate the profile or change relative scoring.
function passesQualifiers(tagEntry, qualifiers) {
  if (!qualifiers) return true;
  for (const [axis, range] of Object.entries(qualifiers)) {
    if (!range) continue;
    const { min = 0, max = 10 } = range;
    if (min <= 0 && max >= 10) continue;  // default range, no filter
    // Check vibes first (for prose_style/warmth/intensity/etc.), then scores
    // (for prose/worldBuilding/etc.). Voice lives under scores even though
    // it's a vibe — the getter prefers vibes then falls back to scores.
    const v = tagEntry?.vibes?.[axis];
    const s = tagEntry?.scores?.[axis];
    const val = v != null ? v : s;
    if (val == null) continue;  // axis not scored for this book → don't filter it out
    if (val < min || val > max) return false;
  }
  return true;
}

// Catalog enrichment for shelf-scanned books. OCR sometimes captures the
// title cleanly but misses the author (cropped spine, faded text, etc.).
// For each scanned book, look up the title in our 10K-book catalog (primary
// + rec library = ~13K books). If we have a match, fill in author + genre
// from the catalog and mark _inCatalog: true so callers can filter the
// scan view to "books the system actually knows about."
export async function enrichScannedBooks(scannedBooks) {
  await ensureLoaded();
  const allBooks = [...primaryCatalog, ...recLibrary];
  // Two indexes: strict (title+author) avoids cross-author collisions for
  // ambiguous titles like 'Malice' (Walter/Higashino/Gwynne); loose (title)
  // is the fallback when OCR couldn't read the author.
  const byTitleAuthor = {};
  const byTitle = {};
  for (const book of allBooks) {
    const tk = normalize(book.title);
    const tak = `${tk}::${normalize(book.author || "")}`;
    if (!byTitleAuthor[tak]) byTitleAuthor[tak] = book;
    if (!byTitle[tk]) byTitle[tk] = book;
  }
  return scannedBooks.map(scanned => {
    const tk = normalize(scanned.title);
    const hasAuthor = scanned.author && !/^unknown$/i.test(scanned.author);
    const tak = `${tk}::${normalize(scanned.author || "")}`;
    // When OCR gave us an author, require it to match — same-title-different-
    // author books are real (Malice by Walter is fantasy; by Higashino is
    // mystery). When OCR didn't, fall back to title-only.
    const match = hasAuthor ? byTitleAuthor[tak] : byTitle[tk];
    if (!match) return { ...scanned, _inCatalog: false };
    return {
      ...scanned,
      author: hasAuthor ? scanned.author : match.author,
      genre: scanned.genre || match.genre,
      _inCatalog: true,
    };
  });
}

// Series resolution for Obi's bulk picks. Two rules together:
//   1. Dedup by series — if Obi picked multiple books from the same series,
//      collapse to one entry per series.
//   2. Substitute with first unread — if Obi picked book #5 of a series but
//      the reader hasn't read books #1-4, swap to the earliest unread book
//      so they get the entry point, not a mid-series pick.
// Returns [{ title, book? }] in original order. `book` is the substituted
// catalog entry when a swap happened — caller can add it to the display pool.
export async function resolveSeriesPicks(pickTitles, userBooks) {
  await ensureLoaded();
  const userReadSet = new Set((userBooks || []).map(b => normalize(b.title)));
  const allBooks = [...primaryCatalog, ...recLibrary];

  // Series index: name → books sorted by order
  const seriesByName = {};
  for (const book of allBooks) {
    if (!book.series?.name) continue;
    (seriesByName[book.series.name.toLowerCase()] ||= []).push(book);
  }
  for (const arr of Object.values(seriesByName)) {
    arr.sort((a, b) => (a.series.order || 0) - (b.series.order || 0));
  }

  const seenSeries = new Set();
  const resolved = [];
  for (const pickTitle of pickTitles) {
    const normPick = normalize(pickTitle);
    const book = allBooks.find(b => normalize(b.title) === normPick);
    if (!book?.series?.name) {
      resolved.push({ title: pickTitle, book: null });
      continue;
    }
    const seriesKey = book.series.name.toLowerCase();
    if (seenSeries.has(seriesKey)) continue;  // dedup — already added one from this series
    seenSeries.add(seriesKey);
    const seriesBooks = seriesByName[seriesKey];
    const firstUnread = seriesBooks.find(b => !userReadSet.has(normalize(b.title)));
    if (firstUnread && normalize(firstUnread.title) !== normPick) {
      // Substitute with the entry point
      resolved.push({
        title: firstUnread.title,
        book: {
          title: firstUnread.title,
          author: firstUnread.author,
          genre: firstUnread.genre,
          publishYear: parseInt(firstUnread.publicationDate?.slice(0, 4)) || null,
          pages: firstUnread.pageCount || null,
          reason: `First in ${firstUnread.series.name} — start here.`,
          score: 0,
        },
      });
    } else {
      resolved.push({ title: pickTitle, book: null });
    }
  }
  return resolved;
}

// Catalog browse — no profile, no ranking. Pure filter + sort by tier/year.
// Used by the Browse tab for discovery; users want to see "everything matching
// these criteria" not "everything matching me".
export async function browseCatalog(userBooks, { genre = null, qualifiers = null, sort = "tier", offset = 0, limit = 30 } = {}) {
  await ensureLoaded();
  const readSet = new Set((userBooks || []).map(b => normalize(b.title)));
  const all = [...primaryCatalog, ...recLibrary];
  const filtered = [];
  for (const book of all) {
    if (genre && book.genre !== genre) continue;
    if (readSet.has(normalize(book.title))) continue;
    const te = tagData[String(book.id)];
    if (!te?.scores) continue;
    if (!passesQualifiers(te, qualifiers)) continue;
    filtered.push({ book, tagEntry: te });
  }
  // Sort: tier ascending (1 = top tier), then publication year descending.
  // Random sort uses Fisher-Yates so each call surfaces a different sample
  // from the same filter set — discovery-oriented.
  if (sort === "random") {
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
  } else {
    filtered.sort((a, b) => {
      if (sort === "year") {
        const ya = parseInt(a.book.publicationDate?.slice(0, 4)) || 0;
        const yb = parseInt(b.book.publicationDate?.slice(0, 4)) || 0;
        return yb - ya;
      }
      const ta = parseInt(a.book.tier) || (a.book.tier === "S" ? 0 : 99);
      const tb = parseInt(b.book.tier) || (b.book.tier === "S" ? 0 : 99);
      if (ta !== tb) return ta - tb;
      const ya = parseInt(a.book.publicationDate?.slice(0, 4)) || 0;
      const yb = parseInt(b.book.publicationDate?.slice(0, 4)) || 0;
      return yb - ya;
    });
  }
  const page = filtered.slice(offset, offset + limit);
  return {
    items: page.map(({ book, tagEntry }) => ({
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishYear: parseInt(book.publicationDate?.slice(0, 4)) || null,
      pages: book.pageCount || null,
      tier: book.tier,
      scores: tagEntry.scores,
      vibes: tagEntry.vibes,
    })),
    total: filtered.length,
    hasMore: offset + limit < filtered.length,
  };
}

export async function generatePaigeRecs(userBooks, mode, exclude = [], genre = null, authorLimit = 2, qualifiers = null) {
  await ensureLoaded();

  // Build profile from Read + DNF shelves. DNFs contribute soft-negative vibe
  // signal ("these vibes led me to stop") but are ignored by craft inference
  // per spec ("DNF reasons too noisy" for craft signal).
  const shelfBooks = userBooks.filter(b => {
    const s = b.shelf || "Read";
    return s === "Read" || s === "DNF";
  });
  const profileTagData = {};
  const profileBooks = [];
  const unmatchedByGenre = {};
  for (const book of shelfBooks) {
    let match = null;
    for (const key of joinKeyVariants(book.title, book.author)) {
      if (tagByNorm[key]) { match = tagByNorm[key]; break; }
    }
    if (match) {
      const fakeId = match.id || joinKey(book.title, book.author);
      profileTagData[String(fakeId)] = { vibes: match.vibes, tags: match.tags, scores: match.scores };
      profileBooks.push({ ...book, id: fakeId, genre: match.genre || book.genre, shelf: book.shelf || "Read" });
    } else {
      const g = book.genre || "Unknown";
      if (!unmatchedByGenre[g]) unmatchedByGenre[g] = [];
      unmatchedByGenre[g].push(`${book.title} — ${book.author}`);
    }
  }
  const readBooks = shelfBooks.filter(b => (b.shelf || "Read") === "Read");
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
  console.group(`[Paige profile] mode=${mode}`);
  console.log("books per bucket (profile):", bucketBookCounts);

  // Vibe-profile snapshot (mean + SD per axis) so we can see what the z-score
  // math is working from. Crucial for diagnosing "book X ranks too high" —
  // the SD on taste-defining axes tells us if the profile is sharp or flabby.
  if (profile.globalVibeStats) {
    const gRows = Object.entries(profile.globalVibeStats).map(([axis, s]) => ({
      axis, mean: +s.mean.toFixed(2), sd: +s.sd.toFixed(2),
    }));
    console.log("global vibes:");
    console.table(gRows);
  }
  for (const [bucket, bp] of Object.entries(profile.bucketProfiles || {})) {
    if (!bp.vibeStats) continue;
    const rows = Object.entries(bp.vibeStats).map(([axis, s]) => ({
      axis, mean: +s.mean.toFixed(2), sd: +s.sd.toFixed(2),
    }));
    console.log(`${bucket} vibes (n=${bp.bookCount}):`);
    console.table(rows);
  }
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
  // Exclude both Read and DNF books from candidate pool — we don't want to
  // recommend books the user already finished or stopped reading.
  const readSet = new Set(shelfBooks.map(b => normalize(b.title)));

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
    // Per-query qualifier filter: user-set vibe/craft ranges exclude books
    // outside the range before scoring runs. Pure filter, doesn't touch math.
    if (!passesQualifiers(te, qualifiers)) return false;
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
  // Reserve carries 90 books (rounding to a 100-book pool) so the bulk Obi
  // curate has plenty to work with on the very first generation. Display
  // still shows the top 10 with "Next 10" pagination — reserve is just a
  // bigger buffer behind the scenes. Costs nothing (client-side scoring).
  const reservePool = capped.slice(10, 100);

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

  // True total of viable matches — books that passed all filters and scored
  // above a reasonable quality cutoff (0.6 = "worth considering"). Reflects
  // scope of the rec pool, not just the displayed top 10.
  const MATCH_QUALITY_FLOOR = 0.6;
  const totalMatches = capped.filter(({ score }) => score >= MATCH_QUALITY_FLOOR).length;

  return { recommendations, reserve, totalMatches };
}

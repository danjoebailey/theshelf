const fs = require("fs");
const path = require("path");

// Inline the core logic (CJS can't import ESM) — mirrors src/lib/recommender.js exactly
const GLOBAL_VIBES = ["prose_craft", "prose_style", "warmth", "intensity"];
const GENRE_VIBES = ["pace", "moral_complexity", "fabulism", "emotional_register", "interiority", "tone", "difficulty"];
const WEIGHTS = { global: 0.45, genre: 0.45, tag: 0.1 };
const MIN_BOOKS_PER_BUCKET = 5;

const GENRE_BUCKETS = {
  "Fiction": "literary", "Historical Fiction": "literary", "Biography": "literary",
  "Fantasy": "speculative", "Sci-Fi": "speculative", "Horror": "speculative", "Graphic Novel": "speculative",
  "Mystery": "crime", "Thriller": "crime",
  "Romance": "commercial_warm", "Young Adult": "commercial_warm",
  "Non-Fiction": "nonfiction", "History": "nonfiction", "Self-Help": "nonfiction",
};

function getBucket(genre) { return GENRE_BUCKETS[genre] || "literary"; }

function vibeDistance(bookVibes, profileVibes, keys) {
  let sumSqDiff = 0, count = 0;
  for (const key of keys) {
    const bv = bookVibes[key], pv = profileVibes[key];
    if (bv == null || pv == null) continue;
    sumSqDiff += (bv - pv) * (bv - pv);
    count++;
  }
  if (count === 0) return 0;
  return 1 - sumSqDiff / (count * 100);
}

function tagOverlap(bookTags, profileTagWeights) {
  if (!bookTags || !bookTags.length || !profileTagWeights) return 0;
  const totalWeight = Object.values(profileTagWeights).reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return 0;
  let matchWeight = 0;
  for (const tag of bookTags) {
    if (profileTagWeights[tag]) matchWeight += profileTagWeights[tag];
  }
  return matchWeight / totalWeight;
}

function buildUserProfile(ratedBooks, tagData) {
  const globalVibeSum = {}, globalVibeCount = {};
  for (const key of GLOBAL_VIBES) { globalVibeSum[key] = 0; globalVibeCount[key] = 0; }

  const bucketVibeSum = {}, bucketVibeCount = {}, bucketTagCounts = {}, bucketBookCounts = {};

  for (const book of ratedBooks) {
    const td = tagData[String(book.id)];
    if (!td) continue;

    for (const key of GLOBAL_VIBES) {
      if (td.vibes[key] != null) { globalVibeSum[key] += td.vibes[key]; globalVibeCount[key]++; }
    }

    const bucket = getBucket(book.genre);
    if (!bucketVibeSum[bucket]) {
      bucketVibeSum[bucket] = {}; bucketVibeCount[bucket] = {};
      bucketTagCounts[bucket] = {}; bucketBookCounts[bucket] = 0;
    }
    bucketBookCounts[bucket]++;

    for (const key of GENRE_VIBES) {
      if (td.vibes[key] != null) {
        bucketVibeSum[bucket][key] = (bucketVibeSum[bucket][key] || 0) + td.vibes[key];
        bucketVibeCount[bucket][key] = (bucketVibeCount[bucket][key] || 0) + 1;
      }
    }
    if (td.tags) {
      for (const tag of td.tags) { bucketTagCounts[bucket][tag] = (bucketTagCounts[bucket][tag] || 0) + 1; }
    }
  }

  const globalVibes = {};
  for (const key of GLOBAL_VIBES) {
    globalVibes[key] = globalVibeCount[key] > 0 ? globalVibeSum[key] / globalVibeCount[key] : 5;
  }

  const bucketProfiles = {};
  for (const [bucket, sums] of Object.entries(bucketVibeSum)) {
    const vibes = {};
    for (const key of GENRE_VIBES) {
      vibes[key] = bucketVibeCount[bucket][key] > 0 ? sums[key] / bucketVibeCount[bucket][key] : 5;
    }
    bucketProfiles[bucket] = { vibes, tagWeights: bucketTagCounts[bucket] || {}, bookCount: bucketBookCounts[bucket] || 0 };
  }

  return { globalVibes, bucketProfiles };
}

function scoreBook(candidate, tagEntry, userProfile) {
  if (!tagEntry) return null;
  const globalMatch = vibeDistance(tagEntry.vibes, userProfile.globalVibes, GLOBAL_VIBES);
  const bucket = getBucket(candidate.genre);
  const bp = userProfile.bucketProfiles[bucket];
  const genreMatch = bp && bp.bookCount >= MIN_BOOKS_PER_BUCKET ? vibeDistance(tagEntry.vibes, bp.vibes, GENRE_VIBES) : 0.5;
  let tagMatch = 0;
  if (bp) tagMatch = tagOverlap(tagEntry.tags, bp.tagWeights);
  return WEIGHTS.global * globalMatch + WEIGHTS.genre * genreMatch + WEIGHTS.tag * tagMatch;
}

// --- Load data ---
const primary = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));
const rec = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "rec-library.json"), "utf8"));
const allBooks = [...primary, ...rec];
const tagData = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-tags.json"), "utf8"));

// --- Simulate user's rated shelf from their Goodreads ---
// Map Goodreads titles to catalog books via normalized matching
function normalize(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

const catalogByNorm = {};
for (const b of allBooks) {
  catalogByNorm[normalize(b.title) + "|" + normalize(b.author)] = b;
}

// Hardcode the user's rated books that exist in our tag data (from their Goodreads CSV)
// These are books the user has READ and RATED, and that we have tag data for
const userRatedIds = [
  326,   // Stoner (5)
  459,   // The Human Stain (5)
  1326,  // Tropic of Cancer (5)
  1321,  // Journey to the End of the Night (5)
  1410,  // The Risk Pool (5)
  574,   // The Sound and the Fury (3)
  60,    // The Way of Kings (5)
  117,   // Hyperion (5)
  865,   // A Knight of the Seven Kingdoms (5)
  273,   // The Fellowship of the Ring (5)
  355,   // Slaughterhouse-Five (5)
  5972,  // Grendel (5)
  1255,  // The Big Sleep (4)
  1171,  // American Psycho (4)
  329,   // Into the Wild (5)
  449,   // Do Androids Dream (4 — from CSV)
  511,   // Piranesi (not rated — to-read)
  192,   // Shadow of the Torturer (4)
  64,    // Wind and Truth (4)
  438,   // Picture of Dorian Gray (4)
  844,   // Red Rising (4)
  // 550 Dispossessed — not in Goodreads CSV as read
  2609,  // Hunger (5)
  310,   // Last Argument of Kings (4)
  1174,  // Post Office (5)
  3407,  // Tuf Voyaging (5)
  441,   // Name of the Wind (5)
  3365,  // My Struggle Book 1 (5)
  512,   // The Bell Jar (4)
  507,   // Gardens of the Moon (4)
  478,   // Eye of the World (4)
  166,   // Dune (4)
  // 690 ACOTAR — not read
  1998,  // James (4)
  54,    // Guns of August (4)
  624,   // Colour of Magic (4)
  251,   // Foundation (5)
  2684,  // Confederacy of Dunces (5)
  750,   // Gentleman in Moscow (4)
  319,   // World According to Garp (4)
  3739,  // Joe (4)
  2217,  // A Clockwork Orange (4)
];

// Build the rated shelf as book objects
const ratedShelf = userRatedIds
  .map(id => allBooks.find(b => b.id === id))
  .filter(Boolean);

console.log("=== USER PROFILE BUILD ===");
console.log("Rated books with tag data:", ratedShelf.length);

const profile = buildUserProfile(ratedShelf, tagData);

console.log("\nGlobal vibes (your taste fingerprint):");
for (const [k, v] of Object.entries(profile.globalVibes)) {
  console.log("  " + k.padEnd(14) + v.toFixed(2));
}

console.log("\nPer-bucket profiles:");
for (const [bucket, bp] of Object.entries(profile.bucketProfiles)) {
  console.log("\n  " + bucket + " (" + bp.bookCount + " books):");
  for (const [k, v] of Object.entries(bp.vibes)) {
    console.log("    " + k.padEnd(22) + v.toFixed(2));
  }
  const topTags = Object.entries(bp.tagWeights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag, count]) => tag + "(" + count + ")");
  console.log("    top tags: " + topTags.join(", "));
}

// --- Score ALL tagged books (including ones in the user's shelf, for validation) ---
console.log("\n\n=== RANKING ALL 42 TAGGED BOOKS ===");
console.log("(Higher = better match. Books you've read are marked with your rating.)\n");

const userRatedSet = new Set(userRatedIds);
const scored = [];
for (const book of allBooks) {
  const te = tagData[String(book.id)];
  if (!te) continue;
  const score = scoreBook(book, te, profile);
  if (score != null) scored.push({ book, score });
}
scored.sort((a, b) => b.score - a.score);

for (let i = 0; i < scored.length; i++) {
  const { book, score } = scored[i];
  const marker = userRatedSet.has(book.id) ? " [READ]" : " [NOT READ]";
  console.log(
    (i + 1 + ".").padEnd(4) +
    score.toFixed(4) + "  " +
    book.title.slice(0, 45).padEnd(47) +
    book.author.slice(0, 25).padEnd(27) +
    getBucket(book.genre).padEnd(16) +
    marker
  );
}

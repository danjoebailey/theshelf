const GLOBAL_VIBES = ["prose_craft", "prose_style", "warmth", "intensity"];
const GENRE_VIBES = ["pace", "moral_complexity", "fabulism", "emotional_register", "interiority", "tone", "difficulty"];

const GENRE_BUCKETS = {
  "Fiction": "literary",
  "Historical Fiction": "literary",
  "Biography": "literary",
  "Fantasy": "speculative",
  "Sci-Fi": "speculative",
  "Horror": "speculative",
  "Graphic Novel": "speculative",
  "Mystery": "crime",
  "Thriller": "crime",
  "Romance": "commercial_warm",
  "Young Adult": "commercial_warm",
  "Non-Fiction": "nonfiction",
  "History": "nonfiction",
  "Self-Help": "nonfiction",
};

const WEIGHTS = { global: 0.45, genre: 0.45, tag: 0.1 };
const MIN_BOOKS_PER_BUCKET = 5;

function getBucket(genre) {
  return GENRE_BUCKETS[genre] || "literary";
}

function vibeDistance(bookVibes, profileVibes, keys) {
  let sumSqDiff = 0;
  let count = 0;
  for (const key of keys) {
    const bv = bookVibes[key];
    const pv = profileVibes[key];
    if (bv == null || pv == null) continue;
    sumSqDiff += (bv - pv) * (bv - pv);
    count++;
  }
  if (count === 0) return 0;
  const maxDist = count * 100; // each dimension 0-10, max squared diff = 100
  return 1 - sumSqDiff / maxDist;
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

export function buildUserProfile(ratedBooks, tagData) {
  const globalVibeSum = {};
  const globalVibeCount = {};
  for (const key of GLOBAL_VIBES) {
    globalVibeSum[key] = 0;
    globalVibeCount[key] = 0;
  }

  const bucketVibeSum = {};
  const bucketVibeCount = {};
  const bucketTagCounts = {};
  const bucketBookCounts = {};

  for (const book of ratedBooks) {
    const bookId = String(book.id);
    const td = tagData[bookId];
    if (!td) continue;

    for (const key of GLOBAL_VIBES) {
      if (td.vibes[key] != null) {
        globalVibeSum[key] += td.vibes[key];
        globalVibeCount[key]++;
      }
    }

    const bucket = getBucket(book.genre);
    if (!bucketVibeSum[bucket]) {
      bucketVibeSum[bucket] = {};
      bucketVibeCount[bucket] = {};
      bucketTagCounts[bucket] = {};
      bucketBookCounts[bucket] = 0;
    }
    bucketBookCounts[bucket]++;

    for (const key of GENRE_VIBES) {
      if (td.vibes[key] != null) {
        bucketVibeSum[bucket][key] = (bucketVibeSum[bucket][key] || 0) + td.vibes[key];
        bucketVibeCount[bucket][key] = (bucketVibeCount[bucket][key] || 0) + 1;
      }
    }

    if (td.tags) {
      for (const tag of td.tags) {
        bucketTagCounts[bucket][tag] = (bucketTagCounts[bucket][tag] || 0) + 1;
      }
    }
  }

  const globalVibes = {};
  for (const key of GLOBAL_VIBES) {
    globalVibes[key] = globalVibeCount[key] > 0
      ? globalVibeSum[key] / globalVibeCount[key]
      : 5;
  }

  const bucketProfiles = {};
  for (const [bucket, sums] of Object.entries(bucketVibeSum)) {
    const vibes = {};
    for (const key of GENRE_VIBES) {
      vibes[key] = bucketVibeCount[bucket][key] > 0
        ? sums[key] / bucketVibeCount[bucket][key]
        : 5;
    }
    bucketProfiles[bucket] = {
      vibes,
      tagWeights: bucketTagCounts[bucket] || {},
      bookCount: bucketBookCounts[bucket] || 0,
    };
  }

  return { globalVibes, bucketProfiles };
}

export function scoreBook(candidate, tagEntry, userProfile) {
  if (!tagEntry) return null;

  const globalMatch = vibeDistance(tagEntry.vibes, userProfile.globalVibes, GLOBAL_VIBES);

  const bucket = getBucket(candidate.genre);
  const bucketProfile = userProfile.bucketProfiles[bucket];

  let genreMatch;
  if (bucketProfile && bucketProfile.bookCount >= MIN_BOOKS_PER_BUCKET) {
    genreMatch = vibeDistance(tagEntry.vibes, bucketProfile.vibes, GENRE_VIBES);
  } else {
    genreMatch = 0.5;
  }

  let tagMatch = 0;
  if (bucketProfile) {
    tagMatch = tagOverlap(tagEntry.tags, bucketProfile.tagWeights);
  }

  return WEIGHTS.global * globalMatch + WEIGHTS.genre * genreMatch + WEIGHTS.tag * tagMatch;
}

export function rankBooks(candidates, tagData, userProfile, options = {}) {
  const { bucket: filterBucket, limit = 20 } = options;

  const scored = [];
  for (const book of candidates) {
    if (filterBucket && getBucket(book.genre) !== filterBucket) continue;
    const tagEntry = tagData[String(book.id)];
    if (!tagEntry) continue;
    const score = scoreBook(book, tagEntry, userProfile);
    if (score != null) {
      scored.push({ book, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export { GENRE_BUCKETS, getBucket, GLOBAL_VIBES, GENRE_VIBES, WEIGHTS };

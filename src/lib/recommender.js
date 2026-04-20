// =====================================================================
// VIBE LAYER — mood/feel matching
// =====================================================================

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
  const maxDist = count * 100;
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

// =====================================================================
// CRAFT LAYER — execution quality matching
// =====================================================================

// Craft buckets are genre-granular (Fantasy ≠ Sci-Fi) because pack axes differ.
// Per-bucket means/SDs capture "the user accepts weaker prose in genre than in literary."
const CRAFT_BUCKETS = {
  "Fiction": "literary",
  "Historical Fiction": "historical",
  "Biography": "literary",
  "Fantasy": "fantasy",
  "Sci-Fi": "sf",
  "Horror": "horror",
  "Graphic Novel": "literary",
  "Mystery": "mystery",
  "Thriller": "thriller",
  "Romance": "romance",
  "Young Adult": "romance",
  "Non-Fiction": "nonfiction",
  "History": "nonfiction",
  "Self-Help": "nonfiction",
};

// Universal axes get cross-bucket weight transfer via Bayesian shrinkage.
// Pack axes (worldBuilding, chemistry, etc.) stay bucket-local.
const UNIVERSAL_AXES = new Set(["prose", "characters", "plot", "pacing", "ideas", "resonance", "ending", "voice"]);

const CRAFT_MIN_BOOKS_PER_AXIS = 3;          // below this, axis is dropped for that bucket
const CRAFT_SHRINKAGE_K = 5;                  // α = n / (n + k) for weight transfer
const CRAFT_HARD_FILTER_MIN_N = 5;            // need this many observations to trust a hard filter
const CRAFT_HARD_FILTER_WEIGHT = 0.15;        // only filter on axes with at least this weight
const CRAFT_MIN_SD = 1.0;                     // floor SDs here so tight-consistency axes don't over-penalize

function getCraftBucket(genre) {
  return CRAFT_BUCKETS[genre] || "literary";
}

function meanAndSD(values) {
  const n = values.length;
  if (n === 0) return { mean: null, sd: null, n: 0 };
  const mean = values.reduce((a, b) => a + b, 0) / n;
  if (n < 2) return { mean, sd: CRAFT_MIN_SD, n };
  const variance = values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  return { mean, sd: Math.max(Math.sqrt(variance), CRAFT_MIN_SD), n };
}

function pearsonCorrelation(xs, ys) {
  const n = xs.length;
  if (n < 3) return 0;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    const ex = xs[i] - mx;
    const ey = ys[i] - my;
    num += ex * ey;
    dx += ex * ex;
    dy += ey * ey;
  }
  const denom = Math.sqrt(dx * dy);
  if (denom === 0) return 0;
  const r = num / denom;
  return Math.max(0, r); // negative correlations clipped to 0 — a dimension the user dislikes isn't "anti-weighted", just ignored
}

// Asymmetric penalty: missing the bar hurts more than exceeding it.
// f(+2) ≈ +0.1, f(0 to -1) = 0, f(-1 to -2) ramps to -0.4, f(< -2) capped at -0.4.
function craftPenalty(z) {
  if (z >= 2) return 0.1;
  if (z >= 0) return 0.05 * z;
  if (z >= -1) return 0;
  if (z >= -2) return -0.4 * (Math.abs(z) - 1);
  return -0.4;
}

function buildCraftProfile(ratedBooks, tagData) {
  // Rater normalization: z-score the user's own ratings before using them for correlation.
  // A 4★-from-picky registers like a 5★-from-generous.
  const ratings = ratedBooks.map(b => b.rating).filter(r => r != null && r > 0);
  if (ratings.length < 3) return null; // not enough signal for craft inference
  const rMean = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  const rSD = Math.sqrt(ratings.reduce((a, b) => a + (b - rMean) ** 2, 0) / ratings.length) || 1;
  const normRating = r => (r - rMean) / rSD;

  // Collect observations by (bucket, axis) and globally for universal axes
  const perBucketAxis = {};    // {bucket: {axis: {scores: [], zRatings: []}}}
  const globalPerAxis = {};    // {axis: {scores: [], zRatings: []}} — universal axes only

  for (const book of ratedBooks) {
    if (book.rating == null || book.rating <= 0) continue;
    const zr = normRating(book.rating);
    const td = tagData[String(book.id)];
    if (!td?.scores) continue;

    const bucket = getCraftBucket(book.genre);
    if (!perBucketAxis[bucket]) perBucketAxis[bucket] = {};

    for (const [axis, score] of Object.entries(td.scores)) {
      if (typeof score !== "number") continue;
      if (!perBucketAxis[bucket][axis]) perBucketAxis[bucket][axis] = { scores: [], zRatings: [] };
      perBucketAxis[bucket][axis].scores.push(score);
      perBucketAxis[bucket][axis].zRatings.push(zr);

      if (UNIVERSAL_AXES.has(axis)) {
        if (!globalPerAxis[axis]) globalPerAxis[axis] = { scores: [], zRatings: [] };
        globalPerAxis[axis].scores.push(score);
        globalPerAxis[axis].zRatings.push(zr);
      }
    }
  }

  // Global weights for universal axes (anchor for bucket-level shrinkage)
  const globalWeights = {};
  for (const [axis, data] of Object.entries(globalPerAxis)) {
    globalWeights[axis] = pearsonCorrelation(data.scores, data.zRatings);
  }

  // Per-bucket profile: means, SDs, weights (shrunk toward global for universal axes)
  const buckets = {};
  for (const [bucket, axes] of Object.entries(perBucketAxis)) {
    buckets[bucket] = {};
    for (const [axis, data] of Object.entries(axes)) {
      if (data.scores.length < CRAFT_MIN_BOOKS_PER_AXIS) continue;
      const { mean, sd, n } = meanAndSD(data.scores);
      const bucketWeight = pearsonCorrelation(data.scores, data.zRatings);
      let weight;
      if (UNIVERSAL_AXES.has(axis)) {
        const globalW = globalWeights[axis] || 0;
        const alpha = n / (n + CRAFT_SHRINKAGE_K);
        weight = alpha * bucketWeight + (1 - alpha) * globalW;
      } else {
        weight = bucketWeight; // pack axes have no global anchor
      }
      buckets[bucket][axis] = { mean, sd, weight, n };
    }
  }

  return { buckets, globalWeights };
}

function scoreCraft(candidate, tagEntry, craftProfile) {
  if (!craftProfile || !tagEntry?.scores) return 1; // no profile or no scores → neutral (no boost, no penalty)

  const bucket = getCraftBucket(candidate.genre);
  const bucketStats = craftProfile.buckets[bucket];
  if (!bucketStats) return 1; // user has no history in this bucket → neutral

  let weightedSum = 0;
  let totalWeight = 0;

  for (const [axis, score] of Object.entries(tagEntry.scores)) {
    if (typeof score !== "number") continue;
    const stats = bucketStats[axis];
    if (!stats || stats.weight <= 0) continue;
    const z = (score - stats.mean) / stats.sd;
    weightedSum += stats.weight * craftPenalty(z);
    totalWeight += stats.weight;
  }

  if (totalWeight === 0) return 1;
  // Normalize so craftMatch sits around 1.0 regardless of how many axes contribute
  const craftMatch = 1 + weightedSum / totalWeight;
  return Math.max(0.5, craftMatch);
}

function craftHardFilter(candidate, tagEntry, craftProfile) {
  // Returns true if candidate should be filtered out (z < -2 on a high-weight axis with enough data)
  if (!craftProfile || !tagEntry?.scores) return false;
  const bucket = getCraftBucket(candidate.genre);
  const bucketStats = craftProfile.buckets[bucket];
  if (!bucketStats) return false;

  for (const [axis, score] of Object.entries(tagEntry.scores)) {
    if (typeof score !== "number") continue;
    const stats = bucketStats[axis];
    if (!stats) continue;
    if (stats.n < CRAFT_HARD_FILTER_MIN_N) continue;
    if (stats.weight < CRAFT_HARD_FILTER_WEIGHT) continue;
    const z = (score - stats.mean) / stats.sd;
    if (z < -2) return true;
  }
  return false;
}

// =====================================================================
// PROFILE + SCORING
// =====================================================================

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

  const craftProfile = buildCraftProfile(ratedBooks, tagData);

  return { globalVibes, bucketProfiles, craftProfile };
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

  const vibeMatch = WEIGHTS.global * globalMatch + WEIGHTS.genre * genreMatch + WEIGHTS.tag * tagMatch;
  const craftMatch = scoreCraft(candidate, tagEntry, userProfile.craftProfile);

  return vibeMatch * craftMatch;
}

export function rankBooks(candidates, tagData, userProfile, options = {}) {
  const { bucket: filterBucket, limit = 20 } = options;

  const scored = [];
  for (const book of candidates) {
    if (filterBucket && getBucket(book.genre) !== filterBucket) continue;
    const tagEntry = tagData[String(book.id)];
    if (!tagEntry) continue;
    if (craftHardFilter(book, tagEntry, userProfile.craftProfile)) continue;
    const score = scoreBook(book, tagEntry, userProfile);
    if (score != null) {
      scored.push({ book, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export {
  GENRE_BUCKETS,
  getBucket,
  GLOBAL_VIBES,
  GENRE_VIBES,
  WEIGHTS,
  CRAFT_BUCKETS,
  getCraftBucket,
  craftHardFilter,
  scoreCraft,
};

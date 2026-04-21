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

// Legacy uniform-Euclidean vibe match — retained only for the cold-start path
// where we lack bucket-level SDs. Primary scoring uses vibeMatchZ below.
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

// Symmetric z-score vibe penalty. Any deviation from the user's preferred
// range costs, with bigger gaps on tight-SD axes costing more. This is the
// vibe-layer equivalent of the craftPenalty z-model — axes where the reader's
// taste is narrow (low SD) punish deviation automatically.
function vibePenalty(absZ) {
  if (absZ < 0.5) return 0;
  if (absZ < 1.5) return 0.05 * (absZ - 0.5);          // 0 → 0.05 linear
  if (absZ < 2.5) return 0.05 + 0.10 * (absZ - 1.5);   // 0.05 → 0.15 linear
  return 0.15;
}

// Taste-defining axes: readers have absolute preferences here independent of
// how their rating distribution happens to spread. A reader whose fantasy
// difficulty mean is 6 but SD is 2 (because they read both Sanderson and
// Wolfe) doesn't actually want Sanderson-level reads — their rating spread
// reflects tolerance, not ideal. Raw-point gaps on these axes get an extra
// penalty on top of the z-score math.
const TASTE_DEFINING_AXES = new Set(["prose_craft", "warmth", "intensity", "difficulty"]);

function absoluteTastePenalty(bookVibes, vibeStats, keys) {
  let penalty = 0;
  for (const key of keys) {
    if (!TASTE_DEFINING_AXES.has(key)) continue;
    const bv = bookVibes[key];
    const stats = vibeStats[key];
    if (bv == null || !stats) continue;
    const diff = Math.abs(bv - stats.mean);
    if (diff < 2) continue;
    if (diff < 3) penalty += 0.05;
    else if (diff < 4) penalty += 0.12;
    else if (diff < 5) penalty += 0.20;
    else penalty += 0.28;
  }
  return penalty;
}

// vibeStats is { axis: { mean, sd } }. Returns a 0-1 match score.
function vibeMatchZ(bookVibes, vibeStats, keys) {
  if (!vibeStats) return 0.5;
  let totalPenalty = 0;
  let count = 0;
  for (const key of keys) {
    const bv = bookVibes[key];
    const stats = vibeStats[key];
    if (bv == null || !stats || stats.sd == null) continue;
    const z = (bv - stats.mean) / stats.sd;
    totalPenalty += vibePenalty(Math.abs(z));
    count++;
  }
  if (count === 0) return 0.5;
  totalPenalty += absoluteTastePenalty(bookVibes, vibeStats, keys);
  // Floor at 0.1 so no single bad vibe crater-walks the score below what a
  // craft-strong but tonally-wrong book still deserves structurally — but
  // low enough that tone/difficulty mismatches actually sink a candidate.
  return Math.max(0.1, 1 - totalPenalty);
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
const CRAFT_HIGH_RATING_THRESHOLD = 4;        // means/SDs computed only from books ≥ this rating (spec: 4-5★)
const CRAFT_PRIOR_MEAN = 7;                   // "consistently high" threshold for implicit-requirement prior
const CRAFT_PRIOR_SD = 1.5;                   // "consistently tight" threshold for implicit-requirement prior
const CRAFT_PRIOR_WEIGHT = 0.15;              // weight to inject for pack axes Pearson zeroed out but variance says user requires

// Per-bucket universal/pack weight split. Pack axes (worldBuilding, magicSystem,
// chemistry, stakes, etc.) get less budget in buckets where execution detail is
// the main contract (literary), more where genre contract dominates (romance).
// Without budget enforcement, universal axes swamp pack axes just by having
// more of them — so fantasy's worldBuilding signal gets lost.
const CRAFT_BUDGET = {
  literary:    { universal: 1.0,  pack: 0.0  },
  historical:  { universal: 0.8,  pack: 0.2  },
  fantasy:     { universal: 0.65, pack: 0.35 },
  sf:          { universal: 0.7,  pack: 0.3  },
  horror:      { universal: 0.7,  pack: 0.3  },
  mystery:     { universal: 0.65, pack: 0.35 },
  thriller:    { universal: 0.65, pack: 0.35 },
  romance:     { universal: 0.55, pack: 0.45 },
  nonfiction:  { universal: 0.7,  pack: 0.3  },
};

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

  // Collect observations. `scores`/`zRatings` span all rated books and drive
  // Pearson weight inference (which needs rating variance). `highRatedScores`
  // is a subset of 4-5★ reads used to compute means/SDs — per spec, the
  // profile is "what you accept," not "what you've read."
  const perBucketAxis = {};    // {bucket: {axis: {scores, zRatings, highRatedScores}}}
  const globalPerAxis = {};    // {axis: {scores, zRatings}} — universal axes only

  for (const book of ratedBooks) {
    if (book.rating == null || book.rating <= 0) continue;
    const zr = normRating(book.rating);
    const td = tagData[String(book.id)];
    if (!td?.scores) continue;
    const isHigh = book.rating >= CRAFT_HIGH_RATING_THRESHOLD;

    const bucket = getCraftBucket(book.genre);
    if (!perBucketAxis[bucket]) perBucketAxis[bucket] = {};

    for (const [axis, score] of Object.entries(td.scores)) {
      if (typeof score !== "number") continue;
      if (!perBucketAxis[bucket][axis]) {
        perBucketAxis[bucket][axis] = { scores: [], zRatings: [], highRatedScores: [] };
      }
      perBucketAxis[bucket][axis].scores.push(score);
      perBucketAxis[bucket][axis].zRatings.push(zr);
      if (isHigh) perBucketAxis[bucket][axis].highRatedScores.push(score);

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
      // Means/SDs from 4-5★ subset; fall back to all-rated if subset is too small.
      const meanSource = data.highRatedScores.length >= CRAFT_MIN_BOOKS_PER_AXIS
        ? data.highRatedScores
        : data.scores;
      const { mean, sd, n: meanN } = meanAndSD(meanSource);
      const bucketWeight = pearsonCorrelation(data.scores, data.zRatings);
      let weight;
      if (UNIVERSAL_AXES.has(axis)) {
        const globalW = globalWeights[axis] || 0;
        const alpha = data.scores.length / (data.scores.length + CRAFT_SHRINKAGE_K);
        weight = alpha * bucketWeight + (1 - alpha) * globalW;
      } else {
        // Pack axes: Pearson on low-variance data yields ~0 even when the user
        // clearly requires the axis (every fantasy they read has worldBuilding
        // ≥ 8). If the means say "consistently high" and SDs say "consistently
        // tight," inject a prior weight so the axis still matters in scoring.
        weight = bucketWeight;
        if (weight === 0 && mean >= CRAFT_PRIOR_MEAN && sd <= CRAFT_PRIOR_SD) {
          weight = CRAFT_PRIOR_WEIGHT;
        }
      }
      buckets[bucket][axis] = { mean, sd, weight, n: data.scores.length, meanN };
    }

    // Enforce per-bucket universal/pack budget. Without this, the 8 universal
    // axes drown out the 2 pack axes in fantasy (worldBuilding, magicSystem)
    // just by count. Scale each group so sums match the bucket's budget.
    const budget = CRAFT_BUDGET[bucket] || { universal: 1.0, pack: 0.0 };
    let uniSum = 0, packSum = 0;
    for (const [axis, stats] of Object.entries(buckets[bucket])) {
      if (stats.weight <= 0) continue;
      if (UNIVERSAL_AXES.has(axis)) uniSum += stats.weight;
      else packSum += stats.weight;
    }
    // Split the budget between universal and pack. If one group has no weight
    // (e.g., no correlation with ratings for pack axes), the other gets the
    // full 1.0 rather than leaving budget unused.
    let effectiveUni, effectivePack;
    if (uniSum > 0 && packSum > 0)     { effectiveUni = budget.universal; effectivePack = budget.pack; }
    else if (uniSum > 0)               { effectiveUni = 1.0;              effectivePack = 0; }
    else if (packSum > 0)              { effectiveUni = 0;                effectivePack = 1.0; }
    else                               { effectiveUni = 0;                effectivePack = 0; }
    for (const [axis, stats] of Object.entries(buckets[bucket])) {
      if (UNIVERSAL_AXES.has(axis) && uniSum > 0) {
        stats.weight = stats.weight * (effectiveUni / uniSum);
      } else if (!UNIVERSAL_AXES.has(axis) && packSum > 0) {
        stats.weight = stats.weight * (effectivePack / packSum);
      }
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
  // Normalize so craftMatch sits around 1.0 regardless of how many axes contribute.
  // No floor clamp — let the multiplicative composite actually veto. Asymmetric
  // craftPenalty caps at -0.4 per axis, so a uniformly-weighted pool of
  // catastrophic axes produces craftMatch = 0.6, which is the natural floor.
  return 1 + weightedSum / totalWeight;
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
  // Collect per-axis value arrays. High-rated subset powers mean/SD so the
  // profile reflects "what you accept" not "what you've read." All rated
  // contribute to bookCount + tag weights.
  const globalAxisValues = {};         // {axis: number[]}
  const globalAxisValuesHigh = {};     // {axis: number[]} — 4-5★ only
  const bucketAxisValues = {};         // {bucket: {axis: number[]}}
  const bucketAxisValuesHigh = {};     // {bucket: {axis: number[]} — 4-5★ only
  const bucketTagCounts = {};
  const bucketBookCounts = {};

  for (const book of ratedBooks) {
    const bookId = String(book.id);
    const td = tagData[bookId];
    if (!td) continue;
    const isHigh = (book.rating || 0) >= CRAFT_HIGH_RATING_THRESHOLD;

    for (const key of GLOBAL_VIBES) {
      if (td.vibes?.[key] != null) {
        (globalAxisValues[key] ||= []).push(td.vibes[key]);
        if (isHigh) (globalAxisValuesHigh[key] ||= []).push(td.vibes[key]);
      }
    }

    const bucket = getBucket(book.genre);
    bucketBookCounts[bucket] = (bucketBookCounts[bucket] || 0) + 1;
    if (!bucketAxisValues[bucket]) {
      bucketAxisValues[bucket] = {};
      bucketAxisValuesHigh[bucket] = {};
      bucketTagCounts[bucket] = {};
    }
    for (const key of GENRE_VIBES) {
      if (td.vibes?.[key] != null) {
        (bucketAxisValues[bucket][key] ||= []).push(td.vibes[key]);
        if (isHigh) (bucketAxisValuesHigh[bucket][key] ||= []).push(td.vibes[key]);
      }
    }
    if (td.tags) {
      for (const tag of td.tags) {
        bucketTagCounts[bucket][tag] = (bucketTagCounts[bucket][tag] || 0) + 1;
      }
    }
  }

  // Helper: prefer high-rated subset for mean/SD, fall back to all when sparse.
  function statsOf(allVals, highVals) {
    const source = (highVals && highVals.length >= 3) ? highVals : (allVals || []);
    if (source.length === 0) return { mean: 5, sd: 2.5 };
    const mean = source.reduce((a, b) => a + b, 0) / source.length;
    const variance = source.reduce((a, v) => a + (v - mean) ** 2, 0) / source.length;
    return { mean, sd: Math.max(Math.sqrt(variance), 0.8) };  // SD floor so a perfectly-flat axis doesn't produce infinite z
  }

  const globalVibes = {};
  const globalVibeStats = {};
  for (const key of GLOBAL_VIBES) {
    const s = statsOf(globalAxisValues[key], globalAxisValuesHigh[key]);
    globalVibes[key] = s.mean;   // legacy consumers still read mean-only
    globalVibeStats[key] = s;
  }

  const bucketProfiles = {};
  for (const bucket of Object.keys(bucketAxisValues)) {
    const vibes = {};
    const vibeStats = {};
    for (const key of GENRE_VIBES) {
      const s = statsOf(bucketAxisValues[bucket][key], bucketAxisValuesHigh[bucket][key]);
      vibes[key] = s.mean;
      vibeStats[key] = s;
    }
    bucketProfiles[bucket] = {
      vibes,
      vibeStats,
      tagWeights: bucketTagCounts[bucket] || {},
      bookCount: bucketBookCounts[bucket] || 0,
    };
  }

  const craftProfile = buildCraftProfile(ratedBooks, tagData);

  return { globalVibes, globalVibeStats, bucketProfiles, craftProfile };
}

export function scoreBook(candidate, tagEntry, userProfile) {
  if (!tagEntry) return null;

  // z-score vibe match: axes where the user's taste is tight (low SD) punish
  // deviation hard; axes where they're flexible (high SD) absorb it. Replaces
  // the uniform Euclidean match that couldn't tell difficulty from fabulism.
  const globalMatch = vibeMatchZ(tagEntry.vibes, userProfile.globalVibeStats, GLOBAL_VIBES);

  const bucket = getBucket(candidate.genre);
  const bucketProfile = userProfile.bucketProfiles[bucket];

  let genreMatch;
  if (bucketProfile && bucketProfile.bookCount >= MIN_BOOKS_PER_BUCKET) {
    genreMatch = vibeMatchZ(tagEntry.vibes, bucketProfile.vibeStats, GENRE_VIBES);
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

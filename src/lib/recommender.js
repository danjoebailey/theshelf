// =====================================================================
// VIBE LAYER — mood/feel matching
// =====================================================================

// Voice is sourced from scores.voice (spec: kept as optional vibe after it
// was dropped from universal craft axes mid-pilot). It's a global vibe.
const GLOBAL_VIBES = ["prose_craft", "prose_style", "warmth", "intensity", "voice"];
const GENRE_VIBES = ["pace", "moral_complexity", "fabulism", "emotional_register", "interiority", "tone", "difficulty"];

// Vibes normally live on td.vibes, but voice is stored on td.scores.voice.
// This helper unifies the lookup so callers don't need to know.
function getVibeValue(td, axis) {
  if (!td) return null;
  if (axis === "voice") return td.scores?.voice ?? null;
  return td.vibes?.[axis] ?? null;
}

// Returns a plain vibes object that includes voice merged in from scores,
// so callers scoring against the full vibe set don't miss it.
function mergedVibes(td) {
  if (!td) return {};
  const out = { ...(td.vibes || {}) };
  if (td.scores?.voice != null && out.voice == null) out.voice = td.scores.voice;
  return out;
}

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

// Global vibes (prose_craft, prose_style, warmth, intensity) carry cross-genre
// taste signal — a literary reader's standards for prose and grit don't stop
// at the fantasy aisle. Weighted higher than per-genre vibes so the user's
// sharpest preferences dominate when a genre bucket's profile is diluted by
// mixed reading (e.g., literary fantasy + YA fantasy both sitting in the
// same fantasy bucket pushes genre means toward middle).
//
// Tag overlap dropped — design spec flagged it as "filter tool, not ranking
// driver." At 0.10 weight it was mostly tautological noise (any fantasy
// candidate shares the 'fantasy' tag with the reader's fantasy reads).
const WEIGHTS = { global: 0.67, genre: 0.33 };
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
//
// Voice was dropped per spec (2026-04-17): "too collinear with Prose in
// practice. Prose rubric reframed as 'effectiveness of sentences in
// delivering this author's register' — absorbs what Voice would've caught."
// Voice scores still exist in book-tags.json but aren't read by scoring
// (CRAFT_IGNORED_AXES filters them out of collection).
const UNIVERSAL_AXES = new Set(["prose", "characters", "plot", "pacing", "ideas", "resonance", "ending"]);
const CRAFT_IGNORED_AXES = new Set(["voice"]);

const CRAFT_MIN_BOOKS_PER_AXIS = 3;          // below this, axis is dropped for that bucket
const CRAFT_MIN_BOOKS_PER_BUCKET = 5;         // below this, bucket falls back to global (universal) / neutral (pack)
const CRAFT_SHRINKAGE_K = 5;                  // α = n / (n + k) for weight transfer
const CRAFT_HARD_FILTER_MIN_N = 5;            // need this many observations to trust a hard filter
const CRAFT_HARD_FILTER_WEIGHT = 0.15;        // only filter on axes with at least this weight
const CRAFT_MIN_SD = 1.0;                     // floor SDs here so tight-consistency axes don't over-penalize
const CRAFT_HIGH_RATING_THRESHOLD = 4;        // means/SDs computed only from books ≥ this rating (spec: 4-5★)
const CRAFT_PRIOR_MEAN = 7;                   // "consistently high" threshold for implicit-requirement prior
const CRAFT_PRIOR_SD = 1.5;                   // "consistently tight" threshold for implicit-requirement prior
const CRAFT_PRIOR_WEIGHT = 0.15;              // weight to inject for pack axes Pearson zeroed out but variance says user requires
const CRAFT_NEUTRAL_MEAN = 7;                 // fallback mean for sparse-bucket pack axes (spec)
const CRAFT_NEUTRAL_SD = 2;                   // fallback SD for sparse-bucket pack axes (spec)
const CRAFT_REGRESSION_MIN_N = 70;            // use partial regression for weight inference at ≥ this bucket size
const RECENCY_LAMBDA = 0.15;                  // exp(-λ × years_since_read): 5y→0.47, 10y→0.22, 15y→0.11, 20y→0.05
const NOW_MS = Date.now();

function recencyWeight(book) {
  // Books without a read date get full weight — don't penalize missing data.
  // Books with a date decay exponentially so long-past reads (e.g., childhood
  // Narnia from 15+ years ago) contribute a fraction of a recent read's signal.
  const d = book.date;
  if (!d) return 1;
  const t = Date.parse(d);
  if (isNaN(t)) return 1;
  const yearsAgo = Math.max(0, (NOW_MS - t) / (365.25 * 24 * 3600 * 1000));
  return Math.exp(-RECENCY_LAMBDA * yearsAgo);
}

// Rating-based contribution weight for profile aggregation. A 5★ book defines
// a reader's taste center; a 4★ is "enjoyed but not definitive"; a 3★ is
// meh; 1-2★ are anti-signal. Quadratic in the distance from 3 so top picks
// dominate dramatically:   5★ → 4,  4★ → 1,  3★ → 0,  2★ → 1 (flipped neg
// conceptually — but we keep all as positive contributions to means; true
// anti-signal would need a different math path).
function ratingWeight(book) {
  const r = book.rating || 0;
  if (r <= 0) return 0;
  // 5★=4, 4★=1, 3★=0, 2★=0 (ignored, not opposite), 1★=0
  const delta = Math.max(0, r - 3);
  return delta * delta;
}

// Combined per-book contribution weight: rating dominance × recency decay.
// A 5★ recent read is worth ~16× a 4★ recent read, ~50× a 4★ from 10y ago.
function profileWeight(book) {
  return ratingWeight(book) * recencyWeight(book);
}

// Author-cluster dampening. A user who rated 10 Sanderson books all 5★ is
// giving us *one* signal ("I like this author") replicated 10 times, not 10
// independent signals. Without dampening, that author's taste dominates the
// profile. Spec: only dampen when within-author variance is low — mixed
// within-author ratings still represent rich signal and keep full weight.
//
// Uniform-rated author (rating SD ≤ 0.5, n ≥ 3) gets per-book weight scaled
// so total author contribution ≈ sqrt(n/3) × a single book's weight. 10
// books becomes effectively ~1.8 books of signal instead of 10.
const AUTHOR_DAMPEN_MIN_BOOKS = 3;
const AUTHOR_DAMPEN_SD_THRESHOLD = 0.5;

function authorNormKey(author) {
  return (author || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function computeAuthorDampening(ratedBooks) {
  const byAuthor = {};
  for (const b of ratedBooks) {
    if (b.rating == null || b.rating <= 0) continue;
    const k = authorNormKey(b.author);
    if (!k) continue;
    (byAuthor[k] ||= []).push(b.rating);
  }
  const damp = {};
  for (const [k, ratings] of Object.entries(byAuthor)) {
    if (ratings.length < AUTHOR_DAMPEN_MIN_BOOKS) { damp[k] = 1; continue; }
    const mean = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const variance = ratings.reduce((a, r) => a + (r - mean) ** 2, 0) / ratings.length;
    const sd = Math.sqrt(variance);
    if (sd > AUTHOR_DAMPEN_SD_THRESHOLD) { damp[k] = 1; continue; }  // varied ratings = rich signal, keep full
    // Uniform author — scale individual contributions so total ≈ sqrt(n/3) books
    damp[k] = Math.sqrt(AUTHOR_DAMPEN_MIN_BOOKS / ratings.length);
  }
  return damp;
}

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

function meanAndSD(values, weights) {
  const n = values.length;
  if (n === 0) return { mean: null, sd: null, n: 0 };
  // Unweighted fast path when no recency weights provided
  if (!weights) {
    const mean = values.reduce((a, b) => a + b, 0) / n;
    if (n < 2) return { mean, sd: CRAFT_MIN_SD, n };
    const variance = values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
    return { mean, sd: Math.max(Math.sqrt(variance), CRAFT_MIN_SD), n };
  }
  // Weighted mean/SD — old reads contribute less to the profile center.
  const W = weights.reduce((a, b) => a + b, 0);
  if (W === 0) return { mean: null, sd: null, n: 0 };
  const mean = values.reduce((a, v, i) => a + v * weights[i], 0) / W;
  if (n < 2) return { mean, sd: CRAFT_MIN_SD, n };
  const variance = values.reduce((a, v, i) => a + weights[i] * (v - mean) ** 2, 0) / W;
  return { mean, sd: Math.max(Math.sqrt(variance), CRAFT_MIN_SD), n };
}

// Gauss-Jordan with partial pivoting. Solves Ax = b for small dense systems
// (we have ≤7 universal axes). Returns null if A is singular/near-singular.
function solveLinear(A, b) {
  const n = A.length;
  const M = A.map(row => [...row]);
  const v = [...b];
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    if (maxRow !== i) {
      [M[i], M[maxRow]] = [M[maxRow], M[i]];
      [v[i], v[maxRow]] = [v[maxRow], v[i]];
    }
    if (Math.abs(M[i][i]) < 1e-8) return null;
    for (let k = i + 1; k < n; k++) {
      const f = M[k][i] / M[i][i];
      for (let j = i; j < n; j++) M[k][j] -= f * M[i][j];
      v[k] -= f * v[i];
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = v[i];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return x;
}

// Weighted OLS: β = (X^T W X)^(-1) X^T W y. On standardized X, coefficients
// are comparable across axes and represent each axis's *unique* contribution
// to rating after partialing out the others. This is what decorrelates
// prose/ideas/resonance and stops Pearson from over-crediting a single
// winner among collinear axes.
function weightedOLS(X, y, weights) {
  const m = X.length;
  if (m === 0) return null;
  const n = X[0].length;
  const XtWX = Array.from({ length: n }, () => Array(n).fill(0));
  const XtWy = Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    const w = weights ? weights[i] : 1;
    for (let j = 0; j < n; j++) {
      for (let k = 0; k <= j; k++) XtWX[j][k] += w * X[i][j] * X[i][k];
      XtWy[j] += w * X[i][j] * y[i];
    }
  }
  for (let j = 0; j < n; j++) for (let k = j + 1; k < n; k++) XtWX[j][k] = XtWX[k][j];
  return solveLinear(XtWX, XtWy);
}

// Partial regression for weight inference in large buckets. Returns
// {axis: weight} with non-negative standardized coefficients. Books missing
// any universal axis score are excluded (list-wise deletion).
function inferWeightsByRegression(books, universalAxisList) {
  const ready = books.filter(b => universalAxisList.every(a => b.scores[a] != null));
  if (ready.length < CRAFT_REGRESSION_MIN_N) return null;
  const m = ready.length, n = universalAxisList.length;
  const Xraw = ready.map(b => universalAxisList.map(a => b.scores[a]));
  const y = ready.map(b => b.zRating);
  const w = ready.map(b => b.weight);
  // Standardize X columns using weighted mean/SD so coefficients are comparable.
  const W = w.reduce((a, b) => a + b, 0);
  if (W === 0) return null;
  const means = Array(n).fill(0);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) means[j] += w[i] * Xraw[i][j];
  for (let j = 0; j < n; j++) means[j] /= W;
  const sds = Array(n).fill(0);
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) sds[j] += w[i] * (Xraw[i][j] - means[j]) ** 2;
  for (let j = 0; j < n; j++) sds[j] = Math.max(Math.sqrt(sds[j] / W), 0.5);
  const Xstd = Xraw.map(row => row.map((v, j) => (v - means[j]) / sds[j]));
  const beta = weightedOLS(Xstd, y, w);
  if (!beta) return null;
  const result = {};
  for (let j = 0; j < n; j++) {
    result[universalAxisList[j]] = Math.max(0, beta[j]);
  }
  return result;
}

function pearsonCorrelation(xs, ys, weights) {
  const n = xs.length;
  if (n < 3) return 0;
  const useWeights = !!weights;
  const W = useWeights ? weights.reduce((a, b) => a + b, 0) : n;
  if (W < 3) return 0;
  let mx = 0, my = 0;
  for (let i = 0; i < n; i++) {
    const w = useWeights ? weights[i] : 1;
    mx += xs[i] * w;
    my += ys[i] * w;
  }
  mx /= W;
  my /= W;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    const w = useWeights ? weights[i] : 1;
    const ex = xs[i] - mx;
    const ey = ys[i] - my;
    num += w * ex * ey;
    dx += w * ex * ex;
    dy += w * ey * ey;
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

  // Collect observations. Two parallel tracks with different weighting:
  //   pearsonWeights = recencyWeight × authorDampening (Pearson needs the
  //     full rating variance, but still benefits from dampening redundant
  //     uniformly-rated authors)
  //   profileWeights = ratingWeight × recencyWeight × authorDampening (for
  //     mean/SD — top picks define center, mid-tier fades, prolific-
  //     uniform authors don't over-anchor the profile)
  const authorDamp = computeAuthorDampening(ratedBooks);
  const perBucketAxis = {};
  const perBucketBooks = {};  // {bucket: [{scores: {axis: val}, zRating, weight}]} for regression
  const globalPerAxis = {};

  for (const book of ratedBooks) {
    if (book.rating == null || book.rating <= 0) continue;
    const zr = normRating(book.rating);
    const td = tagData[String(book.id)];
    if (!td?.scores) continue;
    const ad = authorDamp[authorNormKey(book.author)] || 1;
    const rw = recencyWeight(book) * ad;
    const pw = profileWeight(book) * ad;

    const bucket = getCraftBucket(book.genre);
    if (!perBucketAxis[bucket]) perBucketAxis[bucket] = {};

    // Per-book record for regression. Only universal axes needed — partial
    // regression deconflicts universal-axis collinearity; pack axes are
    // bucket-local and keep Pearson.
    if (!perBucketBooks[bucket]) perBucketBooks[bucket] = [];
    const bookScores = {};
    for (const axis of UNIVERSAL_AXES) {
      if (typeof td.scores[axis] === "number") bookScores[axis] = td.scores[axis];
    }
    perBucketBooks[bucket].push({ scores: bookScores, zRating: zr, weight: rw });

    for (const [axis, score] of Object.entries(td.scores)) {
      if (typeof score !== "number") continue;
      if (CRAFT_IGNORED_AXES.has(axis)) continue;
      if (!perBucketAxis[bucket][axis]) {
        perBucketAxis[bucket][axis] = { scores: [], zRatings: [], pearsonWeights: [], profileWeights: [] };
      }
      perBucketAxis[bucket][axis].scores.push(score);
      perBucketAxis[bucket][axis].zRatings.push(zr);
      perBucketAxis[bucket][axis].pearsonWeights.push(rw);
      perBucketAxis[bucket][axis].profileWeights.push(pw);

      if (UNIVERSAL_AXES.has(axis)) {
        if (!globalPerAxis[axis]) globalPerAxis[axis] = { scores: [], zRatings: [], pearsonWeights: [], profileWeights: [] };
        globalPerAxis[axis].scores.push(score);
        globalPerAxis[axis].zRatings.push(zr);
        globalPerAxis[axis].pearsonWeights.push(rw);
        globalPerAxis[axis].profileWeights.push(pw);
      }
    }
  }

  // Global stats for universal axes. Used as: (a) anchor for bucket-level
  // Bayesian shrinkage on weights, and (b) fallback for sparse buckets where
  // per-bucket means/SDs would just be noise.
  const globalWeights = {};
  const globalStats = {};
  for (const [axis, data] of Object.entries(globalPerAxis)) {
    globalWeights[axis] = pearsonCorrelation(data.scores, data.zRatings, data.pearsonWeights);
    const { mean, sd } = meanAndSD(data.scores, data.profileWeights);
    globalStats[axis] = { mean, sd, weight: globalWeights[axis] };
  }

  // Per-bucket profile: means, SDs, weights (shrunk toward global for universal axes)
  const buckets = {};
  for (const [bucket, axes] of Object.entries(perBucketAxis)) {
    buckets[bucket] = {};

    // Bucket-level sparse fallback (spec: "Below ~5 rated books in a bucket,
    // SD is noise. Fall back to global user mean/SD for universal axes,
    // neutral (mean=7, SD=2) for bucket-specific axes."). Use max observed
    // count across axes as proxy for bucket book count.
    const bucketBookCount = Math.max(0, ...Object.values(axes).map(d => d.scores.length));
    if (bucketBookCount < CRAFT_MIN_BOOKS_PER_BUCKET) {
      for (const [axis, gs] of Object.entries(globalStats)) {
        if (gs.mean != null) {
          buckets[bucket][axis] = { mean: gs.mean, sd: gs.sd, weight: gs.weight, n: 0, fallback: "global" };
        }
      }
      // Don't synthesize pack axes here — we'd be guessing which apply. They'll
      // populate naturally once the user rates enough in this bucket.
      continue;
    }

    // If bucket has enough observations, run partial regression on universal
    // axes jointly. Standardized β coefficients replace the per-axis Pearson
    // correlations — this is what prevents Pearson from picking one axis
    // (magicSystem) as the single winner among collinear signals (prose,
    // ideas, resonance, voice all co-vary in catalog scores).
    const regressionWeights = bucketBookCount >= CRAFT_REGRESSION_MIN_N
      ? inferWeightsByRegression(perBucketBooks[bucket] || [], [...UNIVERSAL_AXES])
      : null;

    for (const [axis, data] of Object.entries(axes)) {
      // Axis-level sparse fallback (axis has too few observations in an
      // otherwise-populated bucket). Universal axes fall back to global;
      // pack axes use neutral (mean=7, SD=2).
      if (data.scores.length < CRAFT_MIN_BOOKS_PER_AXIS) {
        if (UNIVERSAL_AXES.has(axis) && globalStats[axis]?.mean != null) {
          buckets[bucket][axis] = { mean: globalStats[axis].mean, sd: globalStats[axis].sd, weight: globalStats[axis].weight, n: data.scores.length, fallback: "global" };
        } else {
          buckets[bucket][axis] = { mean: CRAFT_NEUTRAL_MEAN, sd: CRAFT_NEUTRAL_SD, weight: 0, n: data.scores.length, fallback: "neutral" };
        }
        continue;
      }
      // Means/SDs use the full rating-weighted contribution — top picks
      // dominate, 1-3★ reads contribute nothing. Pearson keeps the unweighted
      // (well, recency-only) path because it needs rating variance as signal.
      const { mean, sd, n: meanN } = meanAndSD(data.scores, data.profileWeights);
      const bucketWeight = pearsonCorrelation(data.scores, data.zRatings, data.pearsonWeights);
      let weight;
      if (UNIVERSAL_AXES.has(axis)) {
        const globalW = globalWeights[axis] || 0;
        const alpha = data.scores.length / (data.scores.length + CRAFT_SHRINKAGE_K);
        // Prefer regression coefficient when available (large bucket);
        // fall back to Pearson for smaller buckets.
        const bucketSignal = regressionWeights?.[axis] ?? bucketWeight;
        weight = alpha * bucketSignal + (1 - alpha) * globalW;
      } else {
        // Pack axes: Pearson on low-variance data yields ~0 even when the user
        // clearly requires the axis (every fantasy they read has worldBuilding
        // ≥ 8). If the means say "consistently high" and SDs say "consistently
        // tight," inject a prior weight so the axis still matters in scoring.
        weight = bucketWeight;
        if (weight === 0 && mean >= CRAFT_PRIOR_MEAN && sd <= CRAFT_PRIOR_SD) {
          weight = CRAFT_PRIOR_WEIGHT;
          buckets[bucket][axis] = { mean, sd, weight, n: data.scores.length, meanN, priorOnly: true };
          continue;
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
    if (CRAFT_IGNORED_AXES.has(axis)) continue;
    const stats = bucketStats[axis];
    if (!stats || stats.weight <= 0) continue;
    const z = (score - stats.mean) / stats.sd;
    // Prior-injected axes represent "you've never read a weak one, so we
    // assume you require a strong one" — use that weight only to penalize
    // below-mean candidates, not to reward above-mean ones we can't verify
    // the user actually values.
    const effectiveZ = stats.priorOnly ? Math.min(z, 0) : z;
    weightedSum += stats.weight * craftPenalty(effectiveZ);
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
    if (CRAFT_IGNORED_AXES.has(axis)) continue;
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
  // Rating-weighted (and recency- and author-weighted) aggregation. Every
  // rated book contributes profileWeight × authorDampening: top picks define
  // the center, mid-tier fades, 3★↓ drops, and uniformly-rated prolific
  // authors don't flood the profile with correlated signal.
  const authorDamp = computeAuthorDampening(ratedBooks);
  const globalAxis = {};
  const bucketAxis = {};
  const bucketBookCounts = {};

  for (const book of ratedBooks) {
    const bookId = String(book.id);
    const td = tagData[bookId];
    if (!td) continue;
    const w = profileWeight(book) * (authorDamp[authorNormKey(book.author)] || 1);
    if (w === 0) continue;

    for (const key of GLOBAL_VIBES) {
      const v = getVibeValue(td, key);
      if (v != null) {
        (globalAxis[key] ||= { vals: [], weights: [] });
        globalAxis[key].vals.push(v);
        globalAxis[key].weights.push(w);
      }
    }

    const bucket = getBucket(book.genre);
    bucketBookCounts[bucket] = (bucketBookCounts[bucket] || 0) + 1;
    if (!bucketAxis[bucket]) bucketAxis[bucket] = {};
    for (const key of GENRE_VIBES) {
      const v = getVibeValue(td, key);
      if (v != null) {
        (bucketAxis[bucket][key] ||= { vals: [], weights: [] });
        bucketAxis[bucket][key].vals.push(v);
        bucketAxis[bucket][key].weights.push(w);
      }
    }
  }

  function statsOf(source) {
    if (!source || source.vals.length === 0) return { mean: 5, sd: 2.5 };
    const W = source.weights.reduce((a, b) => a + b, 0);
    if (W === 0) return { mean: 5, sd: 2.5 };
    const mean = source.vals.reduce((a, v, i) => a + v * source.weights[i], 0) / W;
    const variance = source.vals.reduce((a, v, i) => a + source.weights[i] * (v - mean) ** 2, 0) / W;
    return { mean, sd: Math.max(Math.sqrt(variance), 0.8) };
  }

  const globalVibes = {};
  const globalVibeStats = {};
  for (const key of GLOBAL_VIBES) {
    const s = statsOf(globalAxis[key]);
    globalVibes[key] = s.mean;
    globalVibeStats[key] = s;
  }

  const bucketProfiles = {};
  for (const bucket of Object.keys(bucketAxis)) {
    const vibes = {};
    const vibeStats = {};
    for (const key of GENRE_VIBES) {
      const s = statsOf(bucketAxis[bucket][key]);
      vibes[key] = s.mean;
      vibeStats[key] = s;
    }
    bucketProfiles[bucket] = {
      vibes,
      vibeStats,
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
  const candidateVibes = mergedVibes(tagEntry);
  const globalMatch = vibeMatchZ(candidateVibes, userProfile.globalVibeStats, GLOBAL_VIBES);

  const bucket = getBucket(candidate.genre);
  const bucketProfile = userProfile.bucketProfiles[bucket];

  let genreMatch;
  if (bucketProfile && bucketProfile.bookCount >= MIN_BOOKS_PER_BUCKET) {
    genreMatch = vibeMatchZ(candidateVibes, bucketProfile.vibeStats, GENRE_VIBES);
  } else {
    genreMatch = 0.5;
  }

  const vibeMatch = WEIGHTS.global * globalMatch + WEIGHTS.genre * genreMatch;
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

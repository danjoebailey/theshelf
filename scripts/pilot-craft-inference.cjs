// Pilot craft-inference test
// 43 books from danjoe's shelf, scored on locked rubrics, run profile inference per bucket
// Run: node scripts/pilot-craft-inference.cjs

// Voice re-added as a vibe dimension (invisible in UI, included in inference)
// Scale: 0 = generic/workmanlike, 10 = singular/unmistakable authorial presence
const books = [
  // === LITERARY (25) ===
  { title: "Stoner", author: "John Williams", rating: 5, bucket: "literary",
    scores: { prose: 9, characters: 10, plot: 6, pacing: 3, ideas: 7, resonance: 10, ending: 9 }, vibes: { voice: 7 } },
  { title: "Tropic of Cancer", author: "Henry Miller", rating: 5, bucket: "literary",
    scores: { prose: 9, characters: 6, plot: 2, pacing: 4, ideas: 7, resonance: 9, ending: 5 }, vibes: { voice: 10 } },
  { title: "Plexus", author: "Henry Miller", rating: 5, bucket: "literary",
    scores: { prose: 8, characters: 6, plot: 3, pacing: 4, ideas: 7, resonance: 8, ending: 5 }, vibes: { voice: 9 } },
  { title: "Quiet Days in Clichy", author: "Henry Miller", rating: 5, bucket: "literary",
    scores: { prose: 8, characters: 5, plot: 3, pacing: 5, ideas: 6, resonance: 8, ending: 5 }, vibes: { voice: 9 } },
  { title: "Notes of a Dirty Old Man", author: "Charles Bukowski", rating: 5, bucket: "literary",
    scores: { prose: 7, characters: 6, plot: 2, pacing: 6, ideas: 5, resonance: 8, ending: 5 }, vibes: { voice: 10 } },
  { title: "Ham on Rye", author: "Charles Bukowski", rating: 5, bucket: "literary",
    scores: { prose: 7, characters: 8, plot: 5, pacing: 6, ideas: 6, resonance: 9, ending: 7 }, vibes: { voice: 10 } },
  { title: "Post Office", author: "Charles Bukowski", rating: 5, bucket: "literary",
    scores: { prose: 7, characters: 7, plot: 4, pacing: 6, ideas: 5, resonance: 8, ending: 6 }, vibes: { voice: 10 } },
  { title: "Factotum", author: "Charles Bukowski", rating: 5, bucket: "literary",
    scores: { prose: 7, characters: 7, plot: 3, pacing: 6, ideas: 5, resonance: 8, ending: 5 }, vibes: { voice: 10 } },
  { title: "Women", author: "Charles Bukowski", rating: 4, bucket: "literary",
    scores: { prose: 7, characters: 6, plot: 3, pacing: 6, ideas: 4, resonance: 6, ending: 4 }, vibes: { voice: 9 } },
  { title: "Journey to the End of the Night", author: "Louis-Ferdinand Céline", rating: 5, bucket: "literary",
    scores: { prose: 9, characters: 8, plot: 4, pacing: 6, ideas: 9, resonance: 10, ending: 8 }, vibes: { voice: 10 } },
  { title: "Death on the Installment Plan", author: "Louis-Ferdinand Céline", rating: 5, bucket: "literary",
    scores: { prose: 9, characters: 8, plot: 4, pacing: 7, ideas: 8, resonance: 9, ending: 7 }, vibes: { voice: 10 } },
  { title: "The Human Stain", author: "Philip Roth", rating: 5, bucket: "literary",
    scores: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 8 }, vibes: { voice: 8 } },
  { title: "American Pastoral", author: "Philip Roth", rating: 4, bucket: "literary",
    scores: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7 }, vibes: { voice: 7 } },
  { title: "Sabbath's Theater", author: "Philip Roth", rating: 4, bucket: "literary",
    scores: { prose: 9, characters: 8, plot: 4, pacing: 5, ideas: 8, resonance: 7, ending: 6 }, vibes: { voice: 9 } },
  { title: "The Crossing", author: "Cormac McCarthy", rating: 4, bucket: "literary",
    scores: { prose: 10, characters: 7, plot: 6, pacing: 4, ideas: 8, resonance: 8, ending: 7 }, vibes: { voice: 9 } },
  { title: "All the Pretty Horses", author: "Cormac McCarthy", rating: 4, bucket: "literary",
    scores: { prose: 10, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 8 }, vibes: { voice: 9 } },
  { title: "A Feast of Snakes", author: "Harry Crews", rating: 4, bucket: "literary",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 9, ending: 10 }, vibes: { voice: 9 } },
  { title: "The Sound and the Fury", author: "William Faulkner", rating: 3, bucket: "literary",
    scores: { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 9, resonance: 8, ending: 7 }, vibes: { voice: 9 } },
  { title: "Pale Fire", author: "Vladimir Nabokov", rating: 4, bucket: "literary",
    scores: { prose: 10, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8 }, vibes: { voice: 9 } },
  { title: "My Struggle Book 1", author: "Karl Ove Knausgård", rating: 5, bucket: "literary",
    scores: { prose: 7, characters: 8, plot: 2, pacing: 2, ideas: 9, resonance: 10, ending: 5 }, vibes: { voice: 9 } },
  { title: "My Struggle Book 2", author: "Karl Ove Knausgård", rating: 5, bucket: "literary",
    scores: { prose: 7, characters: 8, plot: 3, pacing: 2, ideas: 9, resonance: 9, ending: 5 }, vibes: { voice: 9 } },
  { title: "Hunger", author: "Knut Hamsun", rating: 5, bucket: "literary",
    scores: { prose: 9, characters: 8, plot: 3, pacing: 5, ideas: 8, resonance: 9, ending: 6 }, vibes: { voice: 9 } },
  { title: "A Confederacy of Dunces", author: "John Kennedy Toole", rating: 5, bucket: "literary",
    scores: { prose: 8, characters: 10, plot: 7, pacing: 7, ideas: 6, resonance: 9, ending: 7 }, vibes: { voice: 10 } },
  { title: "Catch-22", author: "Joseph Heller", rating: 4, bucket: "literary",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7 }, vibes: { voice: 8 } },
  { title: "The Risk Pool", author: "Richard Russo", rating: 5, bucket: "literary",
    scores: { prose: 7, characters: 9, plot: 7, pacing: 5, ideas: 6, resonance: 9, ending: 8 }, vibes: { voice: 7 } },

  // === FANTASY (10) ===
  { title: "The Way of Kings", author: "Brandon Sanderson", rating: 5, bucket: "fantasy",
    scores: { prose: 5, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 9, ending: 9 }, vibes: { voice: 4 } },
  { title: "Words of Radiance", author: "Brandon Sanderson", rating: 4, bucket: "fantasy",
    scores: { prose: 5, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 8, ending: 9 }, vibes: { voice: 4 } },
  { title: "Wind and Truth", author: "Brandon Sanderson", rating: 4, bucket: "fantasy",
    scores: { prose: 5, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7 }, vibes: { voice: 4 } },
  { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", rating: 4, bucket: "fantasy",
    scores: { prose: 5, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8 }, vibes: { voice: 4 } },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", rating: 5, bucket: "fantasy",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 9, ending: 7 }, vibes: { voice: 7 } },
  { title: "The Wise Man's Fear", author: "Patrick Rothfuss", rating: 4, bucket: "fantasy",
    scores: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 6, resonance: 8, ending: 6 }, vibes: { voice: 7 } },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", rating: 5, bucket: "fantasy",
    scores: { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 10, ending: 9 }, vibes: { voice: 8 } },
  { title: "Last Argument of Kings", author: "Joe Abercrombie", rating: 4, bucket: "fantasy",
    scores: { prose: 7, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 9, ending: 9 }, vibes: { voice: 7 } },
  { title: "The Blade Itself", author: "Joe Abercrombie", rating: 3, bucket: "fantasy",
    scores: { prose: 7, characters: 8, plot: 6, pacing: 5, ideas: 6, resonance: 6, ending: 5 }, vibes: { voice: 7 } },
  { title: "Midnight Tides", author: "Steven Erikson", rating: 5, bucket: "fantasy",
    scores: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 9 }, vibes: { voice: 7 } },

  // === SCI-FI (8) ===
  { title: "Project Hail Mary", author: "Andy Weir", rating: 4, bucket: "sf",
    scores: { prose: 5, characters: 7, plot: 9, pacing: 9, ideas: 8, resonance: 8, ending: 9 }, vibes: { voice: 5 } },
  { title: "Hyperion", author: "Dan Simmons", rating: 5, bucket: "sf",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 6 }, vibes: { voice: 7 } },
  { title: "Foundation", author: "Isaac Asimov", rating: 5, bucket: "sf",
    scores: { prose: 5, characters: 5, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 7 }, vibes: { voice: 4 } },
  { title: "Dune", author: "Frank Herbert", rating: 4, bucket: "sf",
    scores: { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8 }, vibes: { voice: 7 } },
  { title: "Children of Dune", author: "Frank Herbert", rating: 5, bucket: "sf",
    scores: { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 8 }, vibes: { voice: 7 } },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", rating: 4, bucket: "sf",
    scores: { prose: 8, characters: 7, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 8 }, vibes: { voice: 7 } },
  { title: "1984", author: "George Orwell", rating: 4, bucket: "sf",
    scores: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 9 }, vibes: { voice: 6 } },
  { title: "The Martian Chronicles", author: "Ray Bradbury", rating: 4, bucket: "sf",
    scores: { prose: 8, characters: 6, plot: 5, pacing: 5, ideas: 8, resonance: 8, ending: 7 }, vibes: { voice: 8 } },
];

const AXES = ["prose", "characters", "plot", "pacing", "ideas", "resonance", "ending"];
const QUALITY_VIBES = ["voice"]; // vibes that correlate with rating — included in inference
const BUCKETS = ["literary", "fantasy", "sf"];

function mean(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }
function sd(arr) {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
}
function pearson(x, y) {
  const n = x.length;
  const mx = mean(x), my = mean(y);
  let num = 0, dx2 = 0, dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx, dy = y[i] - my;
    num += dx * dy; dx2 += dx * dx; dy2 += dy * dy;
  }
  const denom = Math.sqrt(dx2 * dy2);
  return denom === 0 ? 0 : num / denom;
}

// Z-score the user's ratings within their own distribution (rater normalization)
function zScoreRatings(books) {
  const ratings = books.map(b => b.rating);
  const m = mean(ratings), s = sd(ratings) || 1;
  return books.map(b => ({ ...b, zRating: (b.rating - m) / s }));
}

console.log("\n=== PILOT CRAFT INFERENCE ===");
console.log(`Total books scored: ${books.length}`);
console.log(`Rating distribution: ` +
  [3, 4, 5].map(r => `${r}★=${books.filter(b => b.rating === r).length}`).join("  "));

const normalized = zScoreRatings(books);

for (const bucket of BUCKETS) {
  const bb = normalized.filter(b => b.bucket === bucket);
  console.log(`\n--- ${bucket.toUpperCase()} (${bb.length} books) ---`);

  if (bb.length < 5) {
    console.log("  Too few books for inference. Skipping.");
    continue;
  }

  const ratings = bb.map(b => b.rating);
  const zRatings = bb.map(b => b.zRating);
  console.log(`  Ratings: mean=${mean(ratings).toFixed(2)}  sd=${sd(ratings).toFixed(2)}`);
  console.log("");
  console.log("  Dimension      Mean   SD     Pearson(z)");
  console.log("  -----------    ----   ----   ----------");

  const corrs = {};
  const dims = [...AXES, ...QUALITY_VIBES];
  for (const axis of AXES) {
    const scores = bb.map(b => b.scores[axis]);
    const r = pearson(scores, zRatings);
    corrs[axis] = r;
    console.log(`  ${axis.padEnd(14)} ${mean(scores).toFixed(2)}   ${sd(scores).toFixed(2)}    ${r >= 0 ? " " : ""}${r.toFixed(3)}`);
  }
  for (const v of QUALITY_VIBES) {
    const scores = bb.map(b => b.vibes[v]);
    const r = pearson(scores, zRatings);
    corrs[v] = r;
    console.log(`  ${(v + " (vibe)").padEnd(14)} ${mean(scores).toFixed(2)}   ${sd(scores).toFixed(2)}    ${r >= 0 ? " " : ""}${r.toFixed(3)}`);
  }

  // Normalize abs(corrs) into weights
  const absSum = Object.values(corrs).reduce((s, r) => s + Math.abs(r), 0) || 1;
  console.log("");
  console.log("  Inferred profile weights (normalized |corr|, sign = direction):");
  const sorted = dims.map(a => ({ axis: a, w: Math.abs(corrs[a]) / absSum, dir: corrs[a] >= 0 ? "+" : "−" }))
                     .sort((a, b) => b.w - a.w);
  for (const { axis, w, dir } of sorted) {
    const bar = "█".repeat(Math.round(w * 50));
    const label = QUALITY_VIBES.includes(axis) ? `${axis} (vibe)` : axis;
    console.log(`    ${label.padEnd(14)} ${(w * 100).toFixed(1).padStart(5)}%  ${dir}  ${bar}`);
  }
}

console.log("\n");

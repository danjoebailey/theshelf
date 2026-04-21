// Run craft inference across all scored books in book-tags.json, joined to user's Goodreads ratings
// Reports per-bucket means, SDs, Pearson correlations, and inferred weights.

const fs = require("fs");
const path = require("path");

const SIDECAR = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-tags.json"), "utf8"));
const PRIMARY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));
const REC = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "rec-library.json"), "utf8"));
const ALL = [...PRIMARY, ...REC];

const CSV_PATHS = [
  "C:\\Users\\danjo\\Downloads\\goodreads_library_export.csv",
  "C:\\Users\\danjo\\Downloads\\goodreads_library_export (1).csv",
];
const CSV = CSV_PATHS.find(p => fs.existsSync(p));
if (!CSV) { console.error("Goodreads CSV not found."); process.exit(1); }

function norm(s) {
  return (s || "").replace(/[åÅ]/g,"aa").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g," ").trim();
}
function normTitle(t) { return norm((t || "").replace(/\s*\([^)]*\)\s*$/, "")); }

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  const headers = splitLine(lines[0]);
  return lines.slice(1).map(line => {
    const vals = splitLine(line);
    const row = {}; headers.forEach((h, i) => row[h] = vals[i] || "");
    return row;
  });
}
function splitLine(line) {
  const result = []; let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (inQ && line[i+1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === "," && !inQ) { result.push(cur); cur = ""; }
    else cur += c;
  }
  result.push(cur);
  return result.map(v => v.replace(/^=?"|"$/g, "").trim());
}

// Build title+author → book lookup
const byKey = new Map();
for (const b of ALL) byKey.set(normTitle(b.title) + "|" + norm(b.author), b);

// Parse Goodreads, build id → rating map
const rows = parseCSV(fs.readFileSync(CSV, "utf8"));
const idToRating = new Map();
for (const r of rows) {
  if (r["Exclusive Shelf"] !== "read") continue;
  const rating = parseInt(r["My Rating"]);
  if (!rating) continue;
  const book = byKey.get(normTitle(r["Title"]) + "|" + norm(r["Author"]));
  if (book) idToRating.set(book.id, rating);
}

// Pull scored books + ratings, group by bucket
const BUCKETS = {
  literary: ["Fiction", "Historical Fiction", "Biography"],
  fantasy: ["Fantasy", "Graphic Novel"],
  sf: ["Sci-Fi"],
  horror: ["Horror"],
  mystery: ["Mystery"],
  thriller: ["Thriller"],
  romance: ["Romance", "Young Adult"],
  nonfiction: ["Non-Fiction", "History", "Self-Help"],
};
function bucketOf(genre) {
  for (const [b, gs] of Object.entries(BUCKETS)) if (gs.includes(genre)) return b;
  return "other";
}

const UNIVERSAL = ["prose", "characters", "plot", "pacing", "ideas", "resonance", "ending"];
const QUALITY_VIBES = ["voice"];
const PACK_AXES = {
  fantasy: ["worldBuilding", "magicSystem"],
  sf: ["worldBuilding", "speculativeRigor"],
  horror: ["atmosphere", "dread"],
  mystery: ["puzzle", "stakes"],
  thriller: ["stakes", "twists"],
  romance: ["chemistry", "tension", "heaPayoff"],
  historical: ["periodAuthenticity", "researchIntegration"],
  nonfiction: ["argument", "researchRigor", "access"],
};

const bookById = new Map();
for (const b of ALL) bookById.set(b.id, b);

const byBucket = {};
for (const [idStr, entry] of Object.entries(SIDECAR)) {
  if (!entry.scores) continue;
  const id = parseInt(idStr);
  const rating = idToRating.get(id);
  if (!rating) continue; // only include books the user has rated
  const book = bookById.get(id);
  if (!book) continue;
  const bucket = bucketOf(book.genre);
  if (!byBucket[bucket]) byBucket[bucket] = [];
  byBucket[bucket].push({ id, rating, genre: book.genre, title: book.title, scores: entry.scores });
}

// --- Math helpers ---
function mean(a) { return a.reduce((s,x)=>s+x,0) / a.length; }
function sd(a) { const m = mean(a); return Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/a.length); }
function pearson(x, y) {
  const n = x.length, mx = mean(x), my = mean(y);
  let num = 0, dx2 = 0, dy2 = 0;
  for (let i = 0; i < n; i++) { const dx = x[i]-mx, dy = y[i]-my; num += dx*dy; dx2 += dx*dx; dy2 += dy*dy; }
  const d = Math.sqrt(dx2*dy2);
  return d === 0 ? 0 : num / d;
}

// --- Report ---
console.log("\n=== CRAFT INFERENCE ON FULL SCORED SET ===");
console.log(`Total scored books joined to ratings: ${Object.values(byBucket).flat().length}`);

for (const [bucket, books] of Object.entries(byBucket).sort()) {
  console.log(`\n--- ${bucket.toUpperCase()} (${books.length} books, genres: ${[...new Set(books.map(b=>b.genre))].join(", ")}) ---`);

  if (books.length < 5) { console.log("  Too few books. Skipping."); continue; }

  const ratings = books.map(b => b.rating);
  const rM = mean(ratings), rS = sd(ratings) || 1;
  const zRatings = ratings.map(r => (r - rM) / rS);
  console.log(`  Ratings: mean=${rM.toFixed(2)} sd=${rS.toFixed(2)}  (${[3,4,5].map(r=>`${r}★=${ratings.filter(x=>x===r).length}`).join(" ")})`);

  // Build the axis list for this bucket
  let axes = [...UNIVERSAL];
  const packKey = bucket === "literary" ? null : bucket;
  if (packKey && PACK_AXES[packKey]) axes = axes.concat(PACK_AXES[packKey]);
  axes = axes.concat(QUALITY_VIBES);

  // Compute per-axis stats only if that axis is present on at least ~60% of books
  const corrs = {}, presence = {}, stats = {};
  for (const ax of axes) {
    const vals = books.map(b => b.scores[ax]).filter(v => v !== undefined);
    presence[ax] = vals.length / books.length;
    if (presence[ax] < 0.6) continue;
    const aligned = books.filter(b => b.scores[ax] !== undefined);
    const scores = aligned.map(b => b.scores[ax]);
    const zR = aligned.map(b => (b.rating - rM) / rS);
    corrs[ax] = pearson(scores, zR);
    stats[ax] = { mean: mean(scores), sd: sd(scores), n: scores.length };
  }

  console.log("\n  Dimension          Mean  SD    Pearson(z)  n");
  console.log("  ----------------   ----  ----  ----------  ---");
  for (const ax of Object.keys(corrs)) {
    const r = corrs[ax], s = stats[ax];
    console.log(`  ${ax.padEnd(18)} ${s.mean.toFixed(2).padStart(4)}  ${s.sd.toFixed(2).padStart(4)}    ${r>=0?" ":""}${r.toFixed(3)}   ${s.n}`);
  }

  // Inferred weights
  const absSum = Object.values(corrs).reduce((s,r)=>s+Math.abs(r),0) || 1;
  console.log("\n  Inferred weights (normalized |corr|, sign = direction):");
  const sorted = Object.entries(corrs).map(([ax,r])=>({ax,w:Math.abs(r)/absSum,dir:r>=0?"+":"−"})).sort((a,b)=>b.w-a.w);
  for (const {ax, w, dir} of sorted) {
    const bar = "█".repeat(Math.round(w * 50));
    console.log(`    ${ax.padEnd(18)} ${(w*100).toFixed(1).padStart(5)}%  ${dir}  ${bar}`);
  }
}

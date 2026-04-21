// Find rated books from user's Goodreads export that are: (1) in catalog, (2) vibe-tagged, (3) not yet craft-scored
// Output: prioritized candidate list for the next score batch

const fs = require("fs");
const path = require("path");

const SIDECAR = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-tags.json"), "utf8"));
const PRIMARY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));
const REC = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "rec-library.json"), "utf8"));
const ALL = [...PRIMARY, ...REC];

// Goodreads export — check common locations
const CSV_PATHS = [
  "C:\\Users\\danjo\\Downloads\\goodreads_library_export.csv",
  "C:\\Users\\danjo\\Downloads\\goodreads_library_export (1).csv",
  "C:\\Users\\danjo\\OneDrive\\Desktop\\goodreads_library_export.csv",
];
const CSV = CSV_PATHS.find(p => fs.existsSync(p));

function norm(s) {
  return (s || "")
    .replace(/[åÅ]/g, "aa")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
// Strip Goodreads-style "(Series, #N)" and similar parentheticals before normalizing title
function normTitle(t) {
  return norm((t || "").replace(/\s*\([^)]*\)\s*$/, "").replace(/\s*:\s*a novel.*$/i, ""));
}

// --- Parse CSV (simple; handles quoted fields) ---
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  const headers = splitCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const vals = splitCSVLine(line);
    const row = {};
    headers.forEach((h, i) => { row[h] = vals[i] || ""; });
    return row;
  });
}
function splitCSVLine(line) {
  const result = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === "," && !inQ) { result.push(cur); cur = ""; }
    else { cur += c; }
  }
  result.push(cur);
  return result.map(v => v.replace(/^=?"|"$/g, "").trim());
}

if (!CSV) {
  console.error(`Goodreads CSV not found in any of:\n  ${CSV_PATHS.join("\n  ")}`);
  process.exit(1);
}
console.log(`Using: ${CSV}`);

const rows = parseCSV(fs.readFileSync(CSV, "utf8"));

const rated = rows
  .filter(r => r["Exclusive Shelf"] === "read" && parseInt(r["My Rating"]) > 0)
  .map(r => ({
    title: r["Title"],
    author: r["Author"],
    rating: parseInt(r["My Rating"]),
  }));

// --- Build catalog lookup ---
const byKey = new Map();
const byTitle = new Map();
for (const b of ALL) {
  byKey.set(normTitle(b.title) + "|" + norm(b.author), b);
  const tKey = normTitle(b.title);
  if (!byTitle.has(tKey)) byTitle.set(tKey, []);
  byTitle.get(tKey).push(b);
}

// --- Categorize ---
const categorized = { scored: [], vibeOnly: [], untagged: [], notInCatalog: [] };

for (const r of rated) {
  const key = normTitle(r.title) + "|" + norm(r.author);
  let book = byKey.get(key);

  if (!book) {
    const candidates = byTitle.get(normTitle(r.title)) || [];
    const authLast = norm(r.author).split(" ").slice(-1)[0];
    book = candidates.find(c => norm(c.author).includes(authLast));
  }

  if (!book) {
    categorized.notInCatalog.push(r);
    continue;
  }

  const entry = SIDECAR[book.id];
  if (entry?.scores) {
    categorized.scored.push({ ...r, id: book.id, genre: book.genre });
  } else if (entry?.vibes && Object.keys(entry.vibes).length > 0) {
    categorized.vibeOnly.push({ ...r, id: book.id, genre: book.genre });
  } else {
    categorized.untagged.push({ ...r, id: book.id, genre: book.genre });
  }
}

console.log(`\n=== Rated books in your library (by craft-scoring status) ===`);
console.log(`Already craft-scored: ${categorized.scored.length}`);
console.log(`Vibe-tagged but not craft-scored: ${categorized.vibeOnly.length}  ← batch 2 candidates`);
console.log(`In catalog but no vibe tags: ${categorized.untagged.length}`);
console.log(`Not in catalog: ${categorized.notInCatalog.length}`);

console.log(`\n--- NEXT-BATCH CANDIDATES (vibe-tagged, no scores yet) ---`);
const byGenre = {};
for (const b of categorized.vibeOnly) {
  byGenre[b.genre] = byGenre[b.genre] || [];
  byGenre[b.genre].push(b);
}
for (const [genre, list] of Object.entries(byGenre).sort()) {
  console.log(`\n${genre} (${list.length}):`);
  for (const b of list) {
    console.log(`  [${String(b.id).padStart(5)}] ${b.rating}★  ${b.title} — ${b.author}`);
  }
}

if (categorized.notInCatalog.length > 0) {
  console.log(`\n--- NOT IN CATALOG (${categorized.notInCatalog.length}) ---`);
  for (const b of categorized.notInCatalog) {
    console.log(`  ${b.rating}★  ${b.title} — ${b.author}`);
  }
}

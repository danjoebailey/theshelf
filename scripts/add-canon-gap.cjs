const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const BATCH_DIR = path.join(__dirname, "canon-batches");
const APPLY = process.argv.includes("--apply");

const VALID_GENRES = new Set(["Fiction","Historical Fiction","Mystery","Thriller","Horror","Sci-Fi","Fantasy","Romance","Young Adult","Non-Fiction","Biography","Graphic Novel","History","Self-Help"]);

// Load batches
let additions = [];
for (const f of fs.readdirSync(BATCH_DIR).filter(f => f.endsWith(".json")).sort()) {
  const arr = JSON.parse(fs.readFileSync(path.join(BATCH_DIR, f), "utf8"));
  console.log(`  ${f}: ${arr.length} entries`);
  additions = additions.concat(arr);
}
console.log(`Total compiled: ${additions.length}\n`);

// Validate
const problems = [];
for (const b of additions) {
  if (!b.title || typeof b.title !== "string") problems.push(`bad title: ${JSON.stringify(b)}`);
  if (!b.author || typeof b.author !== "string") problems.push(`bad author: ${b.title}`);
  if (!VALID_GENRES.has(b.genre)) problems.push(`bad genre "${b.genre}": ${b.title}`);
  if (!/^\d{4}$/.test(String(b.publicationDate))) problems.push(`bad year "${b.publicationDate}": ${b.title}`);
  if (!Number.isInteger(b.pageCount)) problems.push(`bad pageCount: ${b.title}`);
  if (!b.description || b.description.length < 20) problems.push(`weak description: ${b.title}`);
  if (b.tier !== 1) problems.push(`bad tier: ${b.title}`);
  if ("id" in b) problems.push(`unexpected id field: ${b.title}`);
}
if (problems.length) { console.log("VALIDATION PROBLEMS:"); problems.forEach(p => console.log("  ✗ " + p)); }
else console.log("Validation: all entries OK");

// Load catalog
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

// Dedupe by title|author
const keyOf = b => (b.title + "|" + b.author).toLowerCase().trim();
const existingKeys = new Set(books.map(keyOf));
const titleIndex = new Map();
books.forEach(b => titleIndex.set(b.title.toLowerCase().trim(), b.author));

const toAdd = [], exactDups = [], titleClashes = [], internalDups = [];
const seen = new Set();
for (const b of additions) {
  const k = keyOf(b);
  if (existingKeys.has(k)) { exactDups.push(b); continue; }
  if (seen.has(k)) { internalDups.push(b); continue; }
  seen.add(k);
  const sameTitle = titleIndex.get(b.title.toLowerCase().trim());
  if (sameTitle) titleClashes.push(`"${b.title}" — adding ${b.author}, catalog already has ${sameTitle}`);
  toAdd.push(b);
}

console.log(`\nExact duplicates skipped (already in catalog): ${exactDups.length}`);
exactDups.forEach(b => console.log(`  - ${b.title} | ${b.author}`));
console.log(`Internal duplicates skipped: ${internalDups.length}`);
internalDups.forEach(b => console.log(`  - ${b.title} | ${b.author}`));
console.log(`Same-title-different-author (FYI, not blocked): ${titleClashes.length}`);
titleClashes.forEach(t => console.log(`  ? ${t}`));

// Per-author count
const byAuthor = {};
toAdd.forEach(b => byAuthor[b.author] = (byAuthor[b.author] || 0) + 1);
console.log(`\nWill add ${toAdd.length} books across ${Object.keys(byAuthor).length} authors:`);
Object.entries(byAuthor).sort((a,b)=>a[0].localeCompare(b[0])).forEach(([a,n]) => console.log(`  ${String(n).padStart(2)}  ${a}`));

if (!APPLY) { console.log(`\n[DRY RUN] re-run with --apply to write. Catalog would go ${before} -> ${before + toAdd.length}`); process.exit(0); }
if (problems.length) { console.log("\nABORTING: validation problems must be fixed first."); process.exit(1); }

// Assign ids and append
let nextId = Math.max(...books.map(b => (typeof b.id === "number" ? b.id : 0))) + 1;
for (const b of toAdd) b.id = nextId++;
const next = books.concat(toAdd);
fs.writeFileSync(CATALOG, JSON.stringify(next));
const stat = fs.statSync(CATALOG);
console.log(`\nAPPLIED. Catalog ${before} -> ${next.length} books. File size: ${(stat.size/1024/1024).toFixed(2)} MB`);

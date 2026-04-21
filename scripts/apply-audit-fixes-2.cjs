const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const DELETE = [
  { title: "If You Would Have Told Me", author: "Abby Jimenez" },
  { title: "Let Me In", author: "Karin Slaughter" },
  { title: "Wild Eyes", author: "Colleen Hoover" },
  { title: "The Women of Llanada Grande", author: "Julia Alvarez" },
  { title: "Until November", author: "Penelope Douglas" },
  { title: "Gabriel's Redemption", author: "Daniel Silva" },
  { title: "Caledonia", author: "Diana Gabaldon" },
  { title: "Toxic Influence", author: "Harlan Coben" },
  { title: "Lightbringer", author: "Anthony Ryan" },
  { title: "Found", author: "R.F. Kuang" },
  { title: "The Resurrectionists", author: "Michael Connelly" },
];

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));

const before = books.length;
console.log(`Loaded ${before} books\n`);

console.log("DELETIONS:");
const toDelete = new Set();
for (const d of DELETE) {
  const idx = books.findIndex(b => b.title === d.title && b.author === d.author);
  if (idx === -1) {
    console.log(`  ✗ NOT FOUND: "${d.title}" — ${d.author}`);
  } else {
    toDelete.add(idx);
    console.log(`  ✓ delete: "${d.title}" — ${d.author}`);
  }
}
const filtered = books.filter((_, i) => !toDelete.has(i));
console.log(`\nBefore: ${before} | After: ${filtered.length} | Net change: ${filtered.length - before}`);

fs.writeFileSync(CATALOG, JSON.stringify(filtered));
const stat = fs.statSync(CATALOG);
console.log(`Written to ${CATALOG} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);

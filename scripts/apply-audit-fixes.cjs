const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const DELETE = [
  { title: "The Sparrow", author: "Alan Hollinghurst" },
  { title: "A Trivial Pursuit", author: "Louise Penny" },
  { title: "Helena Hunting", author: "Helena Hunting" },
  { title: "The All-Girl Filling Station's Last Reunion", author: "Adriana Trigiani" },
  { title: "All These Bodies", author: "Rachel Hawkins" },
  { title: "The Soulmate", author: "Sally Thorne" },
  { title: "The Peach Keeper", author: "Mary Kay Andrews" },
  { title: "Until November", author: "Åsa Larsson" },
  { title: "Beautiful Chaos", author: "Jamie McGuire" },
  { title: "A Vintage Affair", author: "Jane Green" },
  { title: "Malibu Burning", author: "Lee Child" },
  { title: "Morning Comes Softly", author: "LaVyrle Spencer" },
  { title: "Her Royal Highness", author: "Rhys Bowen" },
  { title: "The Queen of Bone and Ash", author: "Vaseem Khan" },
  // Also delete Sea of Fertility (tetralogy, not single book)
  { title: "The Sea of Fertility", author: "Yukio Mishima" },
];

const RENAME = [
  { oldTitle: "T.J. Klune Under the Whispering Door", oldAuthor: "TJ Klune", newTitle: "Under the Whispering Door", newAuthor: "TJ Klune" },
  { oldTitle: "βehemoth", oldAuthor: "Peter Watts", newTitle: "Behemoth", newAuthor: "Peter Watts" },
];

const RE_AUTHOR = [
  { title: "Set Boundaries, Find Peace", oldAuthor: "Nedra Glennon Tawwab", newAuthor: "Nedra Glover Tawwab" },
  { title: "Karla's Choice", oldAuthor: "John le Carré", newAuthor: "Nick Harkaway" },
];

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));

const before = books.length;
console.log(`Loaded ${before} books\n`);

// Deletions
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

// Renames (title + optionally author)
console.log("\nTITLE RENAMES:");
for (const r of RENAME) {
  const book = filtered.find(b => b.title === r.oldTitle && b.author === r.oldAuthor);
  if (!book) {
    console.log(`  ✗ NOT FOUND: "${r.oldTitle}" — ${r.oldAuthor}`);
    continue;
  }
  book.title = r.newTitle;
  book.author = r.newAuthor;
  console.log(`  ✓ "${r.oldTitle}" → "${r.newTitle}"`);
}

// Author re-attribution
console.log("\nAUTHOR FIXES:");
for (const r of RE_AUTHOR) {
  const book = filtered.find(b => b.title === r.title && b.author === r.oldAuthor);
  if (!book) {
    console.log(`  ✗ NOT FOUND: "${r.title}" — ${r.oldAuthor}`);
    continue;
  }
  book.author = r.newAuthor;
  console.log(`  ✓ "${r.title}": ${r.oldAuthor} → ${r.newAuthor}`);
}

console.log(`\nBefore: ${before} | After: ${filtered.length} | Net change: ${filtered.length - before}`);

// Write back as compact JSON (no pretty-printing)
fs.writeFileSync(CATALOG, JSON.stringify(filtered));
const stat = fs.statSync(CATALOG);
console.log(`Written to ${CATALOG} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);

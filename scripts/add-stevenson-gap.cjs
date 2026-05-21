const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

// Robert Louis Stevenson bibliography gap fill (9): all missing novels + key collections.
// Stevenson is not ultra-prolific, so "all novels + key collections" applies (no 20-25 cap).
const ADDITIONS = [
  { title: "The Wrecker", author: "Robert Louis Stevenson", pageCount: 480, genre: "Fiction", publicationDate: "1892", description: "Stevenson's South Seas adventure, written with his stepson Lloyd Osbourne: a failed art student turned trader buys a wrecked ship at auction and uncovers a deadly mystery of mistaken identity, murder, and smuggled opium.", series: null, tier: 1, topRank: null },
  { title: "Catriona", author: "Robert Louis Stevenson", pageCount: 352, genre: "Historical Fiction", publicationDate: "1893", description: "The direct sequel to Kidnapped: David Balfour risks his life to clear an innocent man of a political murder and courts the fierce Catriona Drummond through the Jacobite intrigues of Scotland and Holland.", series: null, tier: 1, topRank: null },
  { title: "Weir of Hermiston", author: "Robert Louis Stevenson", pageCount: 208, genre: "Historical Fiction", publicationDate: "1896", description: "Stevenson's unfinished final novel, broken off mid-sentence at his death: the tragic collision between a brutal hanging judge and the tender-hearted son he despises, set in the Scottish Borders — many consider it his masterpiece.", series: null, tier: 1, topRank: null },
  { title: "The Ebb-Tide", author: "Robert Louis Stevenson", pageCount: 160, genre: "Fiction", publicationDate: "1894", description: "A dark late novel written with Lloyd Osbourne: three destitute beachcombers steal a plague-ship's cargo of champagne and wash up on a private island ruled by a chillingly devout pearl trader.", series: null, tier: 1, topRank: null },
  { title: "Prince Otto", author: "Robert Louis Stevenson", pageCount: 256, genre: "Fiction", publicationDate: "1885", description: "A romance set in the imaginary German principality of Grünewald: a dreaming, neglectful prince and his ambitious wife are pushed toward revolution while each fails to truly see the other.", series: null, tier: 1, topRank: null },
  { title: "The Wrong Box", author: "Robert Louis Stevenson", pageCount: 224, genre: "Fiction", publicationDate: "1889", description: "A black farce written with Lloyd Osbourne: two elderly brothers are the last survivors of a tontine, and a misdirected corpse sends their scheming heirs into a frantic comedy of body-disposal.", series: null, tier: 1, topRank: null },
  { title: "St. Ives", author: "Robert Louis Stevenson", pageCount: 384, genre: "Historical Fiction", publicationDate: "1897", description: "A Napoleonic adventure left unfinished at Stevenson's death and completed by Arthur Quiller-Couch: a captured French officer escapes an Edinburgh prison and crosses Britain in pursuit of love and a lost inheritance.", series: null, tier: 1, topRank: null },
  { title: "Island Nights' Entertainments", author: "Robert Louis Stevenson", pageCount: 256, genre: "Fiction", publicationDate: "1893", description: "Stevenson's South Seas story collection, including 'The Bottle Imp' and 'The Beach of Falesá' — a landmark of realistic Pacific fiction blending island folklore with hard colonial truth.", series: null, tier: 1, topRank: null },
  { title: "The Merry Men and Other Tales", author: "Robert Louis Stevenson", pageCount: 256, genre: "Fiction", publicationDate: "1887", description: "A collection of Stevenson's short fiction, including the guilt-haunted 'Markheim,' the supernatural Scots tale 'Thrawn Janet,' and the storm-wrecked title story of a wrecker's haunted Hebridean coast.", series: null, tier: 1, topRank: null },
];

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

// Skip any add that already exists (title|author match)
const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
let nextId = Math.max(...books.map(b => (typeof b.id === "number" ? b.id : 0))) + 1;

const toAdd = [];
const duplicates = [];
for (const a of ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) { duplicates.push(a); continue; }
  existingKeys.add(key);
  toAdd.push({ ...a, id: nextId++ });
}

if (duplicates.length > 0) {
  console.log(`⚠ Skipping ${duplicates.length} already in catalog:`);
  for (const d of duplicates) console.log(`  - "${d.title}"`);
}

const next = books.concat(toAdd);
fs.writeFileSync(CATALOG, JSON.stringify(next));
const stat = fs.statSync(CATALOG);

console.log(`\nAdded ${toAdd.length} Stevenson books:`);
for (const b of toAdd) console.log(`  ✓ ${b.title} (${b.publicationDate})  [id ${b.id}]`);
console.log(`\nBefore: ${before} | After: ${next.length}`);
console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

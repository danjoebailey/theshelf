// Romantasy coverage: complete a few well-known published series + add a
// missing flagship. Only books I can verify exist with correct metadata —
// no fabricated titles/dates. Each new book is added to rec-library.json
// (new commercial authors live there) and tagged to match its series-mates'
// subgenre. Tier is copied from an existing book in the same series.
//
// Run: node scripts/add-romantasy-gaps-001.cjs

const fs = require("fs"), path = require("path");
const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC = path.join(__dirname, "..", "public", "rec-library.json");
const TAGS = path.join(__dirname, "..", "public", "book-tags.json");

const books = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC, "utf8"));
const tags = JSON.parse(fs.readFileSync(TAGS, "utf8"));
const keyOf = b => (b.title + "|" + b.author).toLowerCase();

const ADDITIONS = [
  // Plated Prisoner — complete the series (had 1-3) — romantasy
  { book: { title: "Glow", author: "Raven Kennedy", pageCount: 448, genre: "Fantasy", publicationDate: "2022", description: "Auren steps into her power as a gold-touched fae queen, navigating King Rot's dangerous court and her bond with Slade as the kingdoms that once caged her now fear her.", series: { name: "The Plated Prisoner", order: 4, total: 6 } }, subgenres: ["romantasy"] },
  { book: { title: "Goldfinch", author: "Raven Kennedy", pageCount: 480, genre: "Fantasy", publicationDate: "2023", description: "The climactic turn of the Plated Prisoner saga: Auren embraces her gold magic and confronts the rulers who made her as war engulfs Orea.", series: { name: "The Plated Prisoner", order: 5, total: 6 } }, subgenres: ["romantasy"] },
  // Crave — complete the series (had 1-3) — paranormal-romance
  { book: { title: "Court", author: "Tracy Wolff", pageCount: 544, genre: "Fantasy", publicationDate: "2021", description: "Grace returns to Katmere Academy pulled deeper into vampire politics and her bond with Hudson as the supernatural world tips toward war.", series: { name: "Crave", order: 4, total: 7 } }, subgenres: ["paranormal-romance"] },
  { book: { title: "Charm", author: "Tracy Wolff", pageCount: 528, genre: "Fantasy", publicationDate: "2022", description: "Grace and Hudson fight to hold their court together as old enemies and a brewing supernatural war close in.", series: { name: "Crave", order: 5, total: 7 } }, subgenres: ["paranormal-romance"] },
  { book: { title: "Cherish", author: "Tracy Wolff", pageCount: 656, genre: "Fantasy", publicationDate: "2022", description: "The Crave saga continues as Grace battles for her bond and her court against forces determined to tear the supernatural world apart.", series: { name: "Crave", order: 6, total: 7 } }, subgenres: ["paranormal-romance"] },
  // Penn Cole — complete (had 1-2) — epic-fantasy (matches series-mates)
  { book: { title: "Rule of the Aurora King", author: "Penn Cole", pageCount: 544, genre: "Fantasy", publicationDate: "2024", description: "Captured and bound to the fae prince Luther, Diem plays a perilous game of rebellion and desire as her dangerous magic awakens.", series: { name: "Kindred's Curse", order: 3, total: 4 } }, subgenres: ["epic-fantasy"] },
  // Lyra Selene — missing flagship — romantasy
  { book: { title: "A Feather So Black", author: "Lyra Selene", pageCount: 448, genre: "Fantasy", publicationDate: "2024", description: "Raised by the fae to recover a stolen heart, a young woman infiltrates a cursed court where her loyalties and her heart divide, in an Irish-myth-inflected romantasy.", series: { name: "Fae & Alchemy", order: 1, total: 3 } }, subgenres: ["romantasy"] },
];

let maxId = 0;
for (const b of books) if (b.id > maxId) maxId = b.id;
for (const b of rec) if (b.id > maxId) maxId = b.id;
const recKeys = new Set(rec.map(keyOf));
const seriesTier = name => { const m = rec.find(b => b.series && b.series.name === name); return m ? m.tier : 3; };

let added = 0;
for (const a of ADDITIONS) {
  const b = a.book;
  if (recKeys.has(keyOf(b))) { console.log("skip (dupe):", b.title); continue; }
  b.tier = seriesTier(b.series.name);
  b.topRank = null;
  b.id = ++maxId;
  rec.push(b);
  tags[String(b.id)] = { tags: a.subgenres.slice() };
  added++;
  console.log("  +#" + b.id + "  " + b.title + " — " + b.author + "  tier:" + b.tier + "  [" + a.subgenres.join(",") + "]");
}
fs.writeFileSync(REC, JSON.stringify(rec));
fs.writeFileSync(TAGS, JSON.stringify(tags));
console.log("\nAdded " + added + " books. rec-library now " + rec.length + ".");

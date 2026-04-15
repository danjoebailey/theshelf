const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Shardik", author: "Richard Adams", pageCount: 624, genre: "Fantasy", publicationDate: "1974-01-01", description: "A hunter in an Bronze-Age kingdom discovers what he believes is the reincarnation of the god-bear Shardik.", series: null, tier: "A", topRank: null },
  { title: "Maia", author: "Richard Adams", pageCount: 1072, genre: "Fantasy", publicationDate: "1984-01-01", description: "A beautiful young peasant girl is sold into slavery in the same Beklan empire of Shardik.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Sean Russell — Initiate Brother
  { title: "The Initiate Brother", author: "Sean Russell", pageCount: 480, genre: "Fantasy", publicationDate: "1991-01-01", description: "A young Botahist monk with unusual powers is sent to serve a lord in an empire inspired by feudal Japan.", series: { name: "Initiate Brother", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Gatherer of Clouds", author: "Sean Russell", pageCount: 480, genre: "Fantasy", publicationDate: "1992-01-01", description: "Initiate Brother continues as Shuyun and Lord Shonto navigate the barbarian invasion.", series: { name: "Initiate Brother", order: 2, total: 2 }, tier: "A", topRank: null },
  { title: "World Without End", author: "Sean Russell", pageCount: 544, genre: "Fantasy", publicationDate: "1995-01-01", description: "Two brothers in a Regency-inspired fantasy England hunt a legendary cartographer — the first Moontide Magic Rise novel.", series: { name: "Moontide Magic Rise", order: 1, total: 2 }, tier: "A", topRank: null },

  // Michael Scott Rohan — Winter of the World
  { title: "The Anvil of Ice", author: "Michael Scott Rohan", pageCount: 384, genre: "Fantasy", publicationDate: "1986-01-01", description: "In an Ice Age world, a young smith named Elof apprentices to a mysterious master and forges cursed weapons.", series: { name: "Winter of the World", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Forge in the Forest", author: "Michael Scott Rohan", pageCount: 416, genre: "Fantasy", publicationDate: "1987-01-01", description: "Elof the mastersmith searches for his lost love across the Winter of the World.", series: { name: "Winter of the World", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Hammer of the Sun", author: "Michael Scott Rohan", pageCount: 464, genre: "Fantasy", publicationDate: "1988-01-01", description: "The Winter of the World closes with the final war against the Ice.", series: { name: "Winter of the World", order: 3, total: 3 }, tier: "A", topRank: null },

  // Jo Clayton — Duel of Sorcery
  { title: "Moongather", author: "Jo Clayton", pageCount: 272, genre: "Fantasy", publicationDate: "1982-01-01", description: "A wandering priestess is pulled into a duel between sorcerers — the first Duel of Sorcery novel.", series: { name: "Duel of Sorcery", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Moonscatter", author: "Jo Clayton", pageCount: 272, genre: "Fantasy", publicationDate: "1983-01-01", description: "Serroi the priestess continues her war against the sorcerer Ser Noris.", series: { name: "Duel of Sorcery", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Changer's Moon", author: "Jo Clayton", pageCount: 288, genre: "Fantasy", publicationDate: "1985-01-01", description: "The Duel of Sorcery trilogy closes as Serroi confronts her power.", series: { name: "Duel of Sorcery", order: 3, total: 3 }, tier: "A", topRank: null },

  // Patricia Kennealy-Morrison — Keltiad
  { title: "The Copper Crown", author: "Patricia Kennealy-Morrison", pageCount: 384, genre: "Sci-Fi", publicationDate: "1984-01-01", description: "An Earth starship makes contact with a lost colony of Celts who left Earth two thousand years ago — the first Keltiad novel.", series: { name: "The Keltiad", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "The Throne of Scone", author: "Patricia Kennealy-Morrison", pageCount: 384, genre: "Sci-Fi", publicationDate: "1986-01-01", description: "Aeron, the Celtic queen of Keltia, fights to retake her throne from a usurper.", series: { name: "The Keltiad", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "The Silver Branch", author: "Patricia Kennealy-Morrison", pageCount: 384, genre: "Sci-Fi", publicationDate: "1988-01-01", description: "The young Aeron comes into her own across the Keltiad's backstory.", series: { name: "The Keltiad", order: 3, total: 7 }, tier: "A", topRank: null },

  // Elizabeth Lynn — Chronicles of Tornor
  { title: "Watchtower", author: "Elizabeth Lynn", pageCount: 240, genre: "Fantasy", publicationDate: "1979-01-01", description: "The first Chronicles of Tornor novel — a warrior prince and his captured lord navigate occupation and rebellion.", series: { name: "Chronicles of Tornor", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Dancers of Arun", author: "Elizabeth Lynn", pageCount: 240, genre: "Fantasy", publicationDate: "1979-01-01", description: "A deaf telepath apprentices to a troupe of traveling dancers in the Chronicles of Tornor world.", series: { name: "Chronicles of Tornor", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Northern Girl", author: "Elizabeth Lynn", pageCount: 288, genre: "Fantasy", publicationDate: "1980-01-01", description: "A young mountain-born telepath in the southern city of Kendra-on-the-Delta fights for her freedom.", series: { name: "Chronicles of Tornor", order: 3, total: 3 }, tier: "A", topRank: null },
];

function keyOf(b) { return (b.title + "|" + b.author).toLowerCase(); }

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || []);
const existingKeys = new Set(books.map(keyOf));
const freshPrimary = PRIMARY_ADDITIONS.filter(b => !existingKeys.has(keyOf(b)));
const nextBooks = books.concat(freshPrimary);
fs.writeFileSync(CATALOG, JSON.stringify(Array.isArray(data) ? nextBooks : { ...data, books: nextBooks }));
console.log(`PRIMARY: added ${freshPrimary.length} books, ${books.length} → ${nextBooks.length}`);

let recData = fs.existsSync(REC_LIBRARY) ? JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8")) : [];
const recBooks = Array.isArray(recData) ? recData : (recData.books || []);
const recKeys = new Set(recBooks.map(keyOf));
const freshRec = REC_LIBRARY_ADDITIONS.filter(b => !recKeys.has(keyOf(b)));
const nextRec = recBooks.concat(freshRec);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(Array.isArray(recData) || !recData.books ? nextRec : { ...recData, books: nextRec }));
console.log(`REC LIBRARY: added ${freshRec.length}, ${recBooks.length} → ${nextRec.length}`);

const pSize = (fs.statSync(CATALOG).size / 1024 / 1024).toFixed(2);
const rSize = (fs.statSync(REC_LIBRARY).size / 1024).toFixed(1);
console.log(`\nbook-data.json: ${pSize} MB`);
console.log(`rec-library.json: ${rSize} KB`);

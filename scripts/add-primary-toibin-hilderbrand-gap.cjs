// Tóibín was completely absent from both catalogs — a major literary
// author with Booker shortlists + Costa + IMPAC + Folio Prize. Adds his
// 11 novels and 2 key short story collections to primary (per the
// "primary only for inexcusable misses" rule, this qualifies).
// Also adds The Rumor (Hilderbrand 2015), the one missing entry from
// her primary bibliography.
//
// Run: node scripts/add-primary-toibin-hilderbrand-gap.cjs
// Idempotent: skips any title+author already in either catalog.

const fs = require("fs");
const path = require("path");

const PRIMARY = path.join(__dirname, "..", "public", "book-data.json");
const REC = path.join(__dirname, "..", "public", "rec-library.json");

const primary = JSON.parse(fs.readFileSync(PRIMARY, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC, "utf8"));

const norm = s => (s || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
const existing = new Set();
[...primary, ...rec].forEach(b => existing.add(`${norm(b.title)}|${norm(b.author)}`));

// Use IDs above the rec-library max so neither catalog's ID range collides.
const maxId = Math.max(...primary.map(b => b.id || 0), ...rec.map(b => b.id || 0));
let nextId = maxId + 1;

const T1 = 1, T2 = 2;

const ADDITIONS = [
  // Colm Tóibín — novels (chronological)
  { title: "The South", author: "Colm Tóibín", pageCount: 240, genre: "Fiction", publicationDate: "1990",
    description: "An Irish painter abandons her marriage in Wexford and reinvents herself in 1950s Catalonia, where she meets a Spanish veteran of the Civil War.",
    series: null, tier: T2 },
  { title: "The Heather Blazing", author: "Colm Tóibín", pageCount: 256, genre: "Fiction", publicationDate: "1992",
    description: "A high-court judge spends a summer in his family's house on the Wexford coast, his careful legal life beginning to fracture against memory and loss.",
    series: null, tier: T2 },
  { title: "The Story of the Night", author: "Colm Tóibín", pageCount: 320, genre: "Fiction", publicationDate: "1996",
    description: "A young half-English half-Argentine man comes into himself during the Falklands War and the upheavals that followed in Buenos Aires.",
    series: null, tier: T2 },
  { title: "The Blackwater Lightship", author: "Colm Tóibín", pageCount: 288, genre: "Fiction", publicationDate: "1999",
    description: "Three generations of Irish women — grandmother, mother, and daughter — gather at a seaside cottage to nurse the daughter's dying brother. Booker shortlisted.",
    series: null, tier: T1 },
  { title: "The Master", author: "Colm Tóibín", pageCount: 368, genre: "Fiction", publicationDate: "2004",
    description: "A biographical novel of Henry James in middle age, after the failure of Guy Domville, exploring restraint, sexuality, and the cost of art. Booker shortlisted, IMPAC winner.",
    series: null, tier: T1 },
  { title: "Mothers and Sons", author: "Colm Tóibín", pageCount: 288, genre: "Fiction", publicationDate: "2006",
    description: "Nine short stories tracing the bond between mothers and their adult sons in Ireland and Spain — quiet, watchful, often unresolved.",
    series: null, tier: T2 },
  { title: "Brooklyn", author: "Colm Tóibín", pageCount: 272, genre: "Fiction", publicationDate: "2009",
    description: "A young woman from Enniscorthy emigrates to 1950s Brooklyn, builds a tentative life there, and returns to Ireland for a summer that tests every choice she's made. Costa Novel Award.",
    series: { name: "Eilis Lacey", order: 1, total: 2 }, tier: T1 },
  { title: "The Empty Family", author: "Colm Tóibín", pageCount: 288, genre: "Fiction", publicationDate: "2010",
    description: "Nine stories of departure and return — Irish, Spanish, Pakistani, gay, straight — bound by a shared attention to the shape exile leaves on a life.",
    series: null, tier: T2 },
  { title: "The Testament of Mary", author: "Colm Tóibín", pageCount: 96, genre: "Fiction", publicationDate: "2012",
    description: "An aged Mary, hiding in Ephesus, recalls her son's last days in a voice scrubbed of consolation. Booker shortlisted.",
    series: null, tier: T1 },
  { title: "Nora Webster", author: "Colm Tóibín", pageCount: 384, genre: "Fiction", publicationDate: "2014",
    description: "In 1960s Wexford, a widow rebuilds her life around two young sons and small acts of self-assertion — music lessons, a new job, dyed hair, a borrowed car.",
    series: null, tier: T1 },
  { title: "House of Names", author: "Colm Tóibín", pageCount: 288, genre: "Historical Fiction", publicationDate: "2017",
    description: "The Oresteia retold from inside — Clytemnestra, Electra, and Orestes alternate as narrators of a household's slow ruin after Iphigenia's sacrifice.",
    series: null, tier: T2 },
  { title: "The Magician", author: "Colm Tóibín", pageCount: 512, genre: "Historical Fiction", publicationDate: "2021",
    description: "A biographical novel of Thomas Mann across the catastrophes of 20th-century Germany — bourgeois life, exile, sons in the war, secret desire. Rathbones Folio Prize.",
    series: null, tier: T1 },
  { title: "Long Island", author: "Colm Tóibín", pageCount: 304, genre: "Fiction", publicationDate: "2024",
    description: "Twenty years after Brooklyn, Eilis is settled on Long Island when an Irish stranger arrives at her door — and she returns to Enniscorthy with her life cracking open.",
    series: { name: "Eilis Lacey", order: 2, total: 2 }, tier: T1 },

  // Elin Hilderbrand — missing entry
  { title: "The Rumor", author: "Elin Hilderbrand", pageCount: 400, genre: "Fiction", publicationDate: "2015",
    description: "Two best friends on Nantucket find their summer spiraling as gossip about an affair, a manuscript, and a marriage races faster than the truth can chase it.",
    series: null, tier: T1 },
];

let added = 0, skipped = 0;
const primaryOut = [...primary];
for (const b of ADDITIONS) {
  const key = `${norm(b.title)}|${norm(b.author)}`;
  if (existing.has(key)) {
    skipped++;
    console.log(`  skip (already present): ${b.title} — ${b.author}`);
    continue;
  }
  primaryOut.push({ ...b, topRank: null, id: nextId++ });
  existing.add(key);
  added++;
  console.log(`+ ${b.title} — ${b.author}  (id ${nextId - 1})`);
}

fs.writeFileSync(PRIMARY, JSON.stringify(primaryOut));
console.log(`\nadded ${added}, skipped ${skipped}.  primary now ${primaryOut.length} books`);

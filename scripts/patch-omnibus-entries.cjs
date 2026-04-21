// Omnibus/single-volume catalog entries for works the catalog stores as
// separate volumes but readers often list as one. Scores and vibes are the
// rounded mean of the component volumes already in catalog.
const fs = require("fs");
const path = require("path");

const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const REC_PATH = path.join(__dirname, "..", "public", "rec-library.json");

const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC_PATH, "utf8"));

function avgFields(entries, field) {
  const keys = new Set();
  for (const e of entries) for (const k of Object.keys(e[field] || {})) keys.add(k);
  const out = {};
  for (const k of keys) {
    const vals = entries.map(e => e[field]?.[k]).filter(v => typeof v === "number");
    if (vals.length) out[k] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }
  return out;
}

function aggregate(componentIds) {
  const entries = componentIds.map(id => tags[String(id)]);
  if (entries.some(e => !e)) throw new Error("missing component tag entry");
  return {
    vibes: avgFields(entries, "vibes"),
    scores: avgFields(entries, "scores"),
    tags: [...new Set(entries.flatMap(e => e.tags || []))],
  };
}

const maxId = Math.max(...rec.map(b => b.id), ...Object.keys(tags).map(Number));
let nextId = maxId + 1;

const omnibuses = [
  {
    book: {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      pageCount: 1178,
      genre: "Fantasy",
      publicationDate: "1954",
      description: "Tolkien's three-volume epic read as a single work: Frodo's journey from the Shire to Mount Doom, the siege of Gondor, and the return of the king. Foundational high-fantasy, often published as one book despite its original three-volume release.",
      tier: 1,
    },
    components: [273, 274, 275],
  },
  {
    book: {
      title: "Shadow & Claw",
      author: "Gene Wolfe",
      pageCount: 608,
      genre: "Sci-Fi",
      publicationDate: "1994",
      description: "Omnibus edition of The Shadow of the Torturer and The Claw of the Conciliator — the first half of The Book of the New Sun. Severian the torturer's apprentice is exiled from his guild and begins walking the decaying far-future Earth, carrying a relic he does not understand.",
      tier: 1,
    },
    components: [192, 8357],
  },
  {
    book: {
      title: "Sword & Citadel",
      author: "Gene Wolfe",
      pageCount: 624,
      genre: "Sci-Fi",
      publicationDate: "1994",
      description: "Omnibus edition of The Sword of the Lictor and The Citadel of the Autarch — the second half of The Book of the New Sun. Severian's journey closes on itself; memory, identity, and the sun's dying light converge.",
      tier: 1,
    },
    components: [8358, 8359],
  },
];

for (const { book, components } of omnibuses) {
  const id = nextId++;
  const agg = aggregate(components);
  rec.push({ ...book, id });
  tags[String(id)] = agg;
  console.log(`[${id}] ${book.title} / ${book.author}`);
  console.log(`  scores: ${JSON.stringify(agg.scores)}`);
}

fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
fs.writeFileSync(REC_PATH, JSON.stringify(rec));

console.log(`\nAdded ${omnibuses.length} omnibus entries.`);
console.log(`Rec library size: ${rec.length}  Tag entries: ${Object.keys(tags).length}`);

// Round 2 of the 2026-05-11 shelf audit. Adds 15 books across both
// catalogs with full vibes/tags/scores so they participate in rec
// engine + qualifier sliders + subgenre filter.
//
// Idempotent: dedup on (norm title, norm author).

const fs = require("fs");
const path = require("path");

const PRIMARY = path.join(__dirname, "..", "public", "book-data.json");
const REC     = path.join(__dirname, "..", "public", "rec-library.json");
const TAGS    = path.join(__dirname, "..", "public", "book-tags.json");

const primary = JSON.parse(fs.readFileSync(PRIMARY, "utf8"));
const rec     = JSON.parse(fs.readFileSync(REC,     "utf8"));
const tags    = JSON.parse(fs.readFileSync(TAGS,    "utf8"));

const norm = s => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
const existing = new Set();
[...primary, ...rec].forEach(b => existing.add(`${norm(b.title)}|${norm(b.author)}`));

let nextId = Math.max(...primary.map(b => b.id || 0), ...rec.map(b => b.id || 0)) + 1;

function entry(target, meta, tagEntry) {
  const key = `${norm(meta.title)}|${norm(meta.author)}`;
  if (existing.has(key)) return { skipped: true };
  const id = nextId++;
  const book = { ...meta, topRank: null, id };
  if (target === "primary") primary.push(book);
  else rec.push(book);
  tags[String(id)] = tagEntry;
  existing.add(key);
  return { added: true, id };
}

const PRIMARY_ADDS = [
  // Christopher Ruocchio — Sun Eater (6 books, major contemporary SF)
  {
    meta: { title: "Empire of Silence", author: "Christopher Ruocchio", pageCount: 624, genre: "Sci-Fi", publicationDate: "2018",
      description: "An exiled prince's confessional account, written from a prison awaiting execution, of how he came to commit galactic genocide against the alien Cielcin — an interstellar empire told as a Dying Earth memoir.",
      series: { name: "Sun Eater", order: 1, total: 6 }, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 8, emotional_register: 6, interiority: 9, tone: 3, difficulty: 7 },
      tags: ["space-opera", "far-future", "first-person", "male-protagonist", "doorstopper", "literary-sf", "dying-earth", "philosophical", "interstellar-empire"],
      scores: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
    },
  },
  {
    meta: { title: "Howling Dark", author: "Christopher Ruocchio", pageCount: 736, genre: "Sci-Fi", publicationDate: "2019",
      description: "Hadrian leads a small crew into the lawless space between empires in search of the lost human civilization that might end the Cielcin war — and finds something far older and stranger.",
      series: { name: "Sun Eater", order: 2, total: 6 }, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 8, pace: 5, moral_complexity: 9, fabulism: 8, emotional_register: 6, interiority: 9, tone: 3, difficulty: 7 },
      tags: ["space-opera", "far-future", "first-person", "male-protagonist", "doorstopper", "literary-sf", "philosophical", "first-contact"],
      scores: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
    },
  },
  {
    meta: { title: "Demon in White", author: "Christopher Ruocchio", pageCount: 800, genre: "Sci-Fi", publicationDate: "2020",
      description: "Hadrian, now a war hero, sees the cracks in his own legend widen — political enemies move against him at the imperial court while the Cielcin's true horror reveals itself.",
      series: { name: "Sun Eater", order: 3, total: 6 }, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 8, pace: 5, moral_complexity: 9, fabulism: 8, emotional_register: 6, interiority: 9, tone: 3, difficulty: 7 },
      tags: ["space-opera", "far-future", "first-person", "male-protagonist", "doorstopper", "literary-sf", "philosophical", "political-intrigue"],
      scores: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
    },
  },
  {
    meta: { title: "Kingdoms of Death", author: "Christopher Ruocchio", pageCount: 800, genre: "Sci-Fi", publicationDate: "2022",
      description: "Hadrian is captured by the Cielcin and forced into their court — a sustained, harrowing immersion in the enemy's culture that breaks and remakes him.",
      series: { name: "Sun Eater", order: 4, total: 6 }, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 9, pace: 5, moral_complexity: 9, fabulism: 8, emotional_register: 7, interiority: 9, tone: 3, difficulty: 8 },
      tags: ["space-opera", "far-future", "first-person", "male-protagonist", "doorstopper", "literary-sf", "philosophical", "captivity", "alien-pov"],
      scores: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
    },
  },
  {
    meta: { title: "Ashes of Man", author: "Christopher Ruocchio", pageCount: 624, genre: "Sci-Fi", publicationDate: "2023",
      description: "Hadrian, returned from Cielcin captivity, marshals the remnants of his old life against an empire that no longer wants him — and the war shifts toward its endgame.",
      series: { name: "Sun Eater", order: 5, total: 6 }, tier: 2 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 8, pace: 6, moral_complexity: 9, fabulism: 8, emotional_register: 6, interiority: 9, tone: 3, difficulty: 7 },
      tags: ["space-opera", "far-future", "first-person", "male-protagonist", "doorstopper", "literary-sf", "philosophical"],
      scores: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
    },
  },
  {
    meta: { title: "Disquiet Gods", author: "Christopher Ruocchio", pageCount: 720, genre: "Sci-Fi", publicationDate: "2024",
      description: "The penultimate Sun Eater volume — Hadrian's confrontation with the godlike Quiet draws to its conclusion as the metaphysical stakes overtake the military ones.",
      series: { name: "Sun Eater", order: 6, total: 6 }, tier: 2 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 8, pace: 6, moral_complexity: 9, fabulism: 9, emotional_register: 6, interiority: 9, tone: 3, difficulty: 8 },
      tags: ["space-opera", "far-future", "first-person", "male-protagonist", "doorstopper", "literary-sf", "philosophical", "cosmic"],
      scores: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
    },
  },

  // William Goldman
  {
    meta: { title: "The Princess Bride", author: "William Goldman", pageCount: 416, genre: "Fantasy", publicationDate: "1973",
      description: "A self-described abridgment of S. Morgenstern's classic — a swashbuckling fairy-tale romance of Westley and Buttercup, framed and constantly interrupted by Goldman's wry narrator commentary.",
      series: null, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 8, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 7, interiority: 5, tone: 9, difficulty: 4 },
      tags: ["comic-fantasy", "romance-subplot", "swashbuckling", "metafiction", "witty-prose", "fairy-tale-retelling", "satirical"],
      scores: { prose: 8, characters: 8, plot: 8, pacing: 9, ideas: 7, resonance: 9, ending: 9, voice: 10, worldBuilding: 7 },
    },
  },
  {
    meta: { title: "Marathon Man", author: "William Goldman", pageCount: 320, genre: "Thriller", publicationDate: "1974",
      description: "A Columbia history grad student is drawn into a violent intersection of espionage and a Nazi war criminal hiding in plain sight in 1970s New York. Source for the 'is it safe?' film.",
      series: null, tier: 2 },
    tagEntry: {
      vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 9, pace: 8, moral_complexity: 7, fabulism: 2, emotional_register: 6, interiority: 6, tone: 3, difficulty: 5 },
      tags: ["spy-thriller", "noir", "ticking-clock", "first-person", "male-protagonist", "new-york-setting", "nazi-hunting", "violence"],
      scores: { prose: 7, characters: 7, plot: 8, pacing: 9, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 6 },
    },
  },

  // Kiran Desai
  {
    meta: { title: "The Loneliness of Sonia and Sunny", author: "Kiran Desai", pageCount: 688, genre: "Fiction", publicationDate: "2024",
      description: "Two displaced Indians — Sonia in New York, Sunny in Delhi — orbit each other across decades and continents in Desai's sprawling, long-awaited Booker-shortlisted return.",
      series: null, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 9, prose_style: 8, warmth: 5, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 8, interiority: 9, tone: 5, difficulty: 7 },
      tags: ["literary-fiction", "indian-setting", "diaspora", "multi-pov", "doorstopper", "lyrical-prose", "family", "displacement"],
      scores: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 8 },
    },
  },
  {
    meta: { title: "Hullabaloo in the Guava Orchard", author: "Kiran Desai", pageCount: 240, genre: "Fiction", publicationDate: "1998",
      description: "A failed clerk in a small Indian town climbs a guava tree and is mistaken for a holy man, with comic chaos building around his refusal to come down. Desai's debut.",
      series: null, tier: 2 },
    tagEntry: {
      vibes: { prose_craft: 7, prose_style: 7, warmth: 6, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 6, emotional_register: 7, interiority: 6, tone: 8, difficulty: 4 },
      tags: ["literary-fiction", "indian-setting", "small-town", "satirical", "magical-realism", "witty-prose"],
      scores: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 7 },
    },
  },

  // Alex Haley
  {
    meta: { title: "Roots: The Saga of an American Family", author: "Alex Haley", pageCount: 736, genre: "Historical Fiction", publicationDate: "1976",
      description: "Haley traces his ancestry from Kunta Kinte's capture in 1760s Gambia through enslavement in America and seven generations of his descendants. Pulitzer Special Citation.",
      series: null, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 8, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 8, interiority: 7, tone: 3, difficulty: 6 },
      tags: ["historical-fiction", "family-saga", "doorstopper", "american-setting", "slavery", "multi-generational", "african-diaspora"],
      scores: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 8, worldBuilding: 9 },
    },
  },
];

const REC_ADDS = [
  {
    meta: { title: "Bliss Montage", author: "Ling Ma", pageCount: 240, genre: "Fiction", publicationDate: "2022",
      description: "Eight stories that begin in the recognizable and tilt into the surreal — a woman lives with all 100 of her ex-boyfriends, an invisibility drug spreads through a friendship — the follow-up collection to Severance.",
      series: null, tier: 2 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 6, interiority: 8, tone: 5, difficulty: 6 },
      tags: ["literary-fiction", "short-story-collection", "surreal", "magical-realism", "asian-american", "experimental"],
      scores: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 6 },
    },
  },
  {
    meta: { title: "Flashlight", author: "Susan Choi", pageCount: 464, genre: "Fiction", publicationDate: "2025",
      description: "A girl on a Japanese beach is found alone — her father, a Korean-Japanese diaspora figure, vanished into the sea. Decades unfold around what happened, and what families build over what's missing.",
      series: null, tier: 1 },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 8, interiority: 8, tone: 4, difficulty: 7 },
      tags: ["literary-fiction", "multi-pov", "diaspora", "family", "japanese-setting", "korean-diaspora", "doorstopper"],
      scores: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 8 },
    },
  },
  {
    meta: { title: "Days at the Morisaki Bookshop", author: "Satoshi Yagisawa", pageCount: 160, genre: "Fiction", publicationDate: "2010",
      description: "A young woman, broken-hearted, moves above her uncle's small Tokyo used-bookshop and slowly reads her way back to herself — and her family. A cornerstone of the Japanese cozy-fiction wave.",
      series: { name: "Morisaki Bookshop", order: 1, total: 2 }, tier: 2 },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 9, intensity: 3, pace: 4, moral_complexity: 4, fabulism: 1, emotional_register: 8, interiority: 7, tone: 6, difficulty: 3 },
      tags: ["literary-fiction", "japanese-setting", "translated-from", "cozy", "female-protagonist", "first-person", "books-about-books", "novella"],
      scores: { prose: 6, characters: 7, plot: 5, pacing: 6, ideas: 6, resonance: 8, ending: 7, voice: 7, worldBuilding: 6 },
    },
  },
  {
    meta: { title: "More Days at the Morisaki Bookshop", author: "Satoshi Yagisawa", pageCount: 160, genre: "Fiction", publicationDate: "2023",
      description: "Takako returns to the Morisaki bookshop, her aunt and uncle's marriage at a crossroads — a quiet follow-up about second chances and Tokyo's small reading rooms.",
      series: { name: "Morisaki Bookshop", order: 2, total: 2 }, tier: 2 },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 9, intensity: 3, pace: 4, moral_complexity: 4, fabulism: 1, emotional_register: 8, interiority: 7, tone: 6, difficulty: 3 },
      tags: ["literary-fiction", "japanese-setting", "translated-from", "cozy", "female-protagonist", "first-person", "books-about-books", "novella"],
      scores: { prose: 6, characters: 7, plot: 5, pacing: 6, ideas: 5, resonance: 7, ending: 7, voice: 7, worldBuilding: 6 },
    },
  },
];

let added = 0, skipped = 0;
for (const a of PRIMARY_ADDS) {
  const r = entry("primary", a.meta, a.tagEntry);
  if (r.added) { added++; console.log(`+ [primary] ${a.meta.title} — ${a.meta.author}  (id ${r.id})`); }
  else { skipped++; console.log(`  skip: ${a.meta.title}`); }
}
for (const a of REC_ADDS) {
  const r = entry("rec", a.meta, a.tagEntry);
  if (r.added) { added++; console.log(`+ [rec]     ${a.meta.title} — ${a.meta.author}  (id ${r.id})`); }
  else { skipped++; console.log(`  skip: ${a.meta.title}`); }
}

fs.writeFileSync(PRIMARY, JSON.stringify(primary));
fs.writeFileSync(REC,     JSON.stringify(rec));
fs.writeFileSync(TAGS,    JSON.stringify(tags));
console.log(`\nadded ${added}, skipped ${skipped}. primary=${primary.length}, rec=${rec.length}`);

// Adds 21 books identified from a multi-shelf audit. Each book gets:
//   - metadata entry in primary book-data.json OR rec-library.json
//   - tag entry in book-tags.json (vibes / tags / scores) so the book
//     participates in rec engine, qualifier sliders, and the subgenre filter
//
// Idempotent: dedup on (norm title, norm author). Run repeatedly safely.

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

// -- PRIMARY additions ----------------------------------------------------

const PRIMARY_ADDS = [
  {
    meta: {
      title: "The Screwtape Letters", author: "C.S. Lewis", pageCount: 224, genre: "Fiction", publicationDate: "1942",
      description: "A senior demon, Screwtape, mentors his apprentice Wormwood by letter on the fine art of corrupting a particular Englishman's soul during the Second World War.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 6, moral_complexity: 8, fabulism: 6, emotional_register: 5, interiority: 7, tone: 7, difficulty: 5 },
      tags: ["christian-fiction", "satirical", "epistolary", "philosophical", "religious-themes", "british-setting", "witty-prose", "novella"],
      scores: { prose: 8, characters: 6, plot: 5, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 5 },
    },
  },
  {
    meta: {
      title: "The Great Divorce", author: "C.S. Lewis", pageCount: 160, genre: "Fiction", publicationDate: "1945",
      description: "A narrator boards a bus from hell to heaven and meets ghosts who must choose, one by one, whether to stay in the grey town or to grow real enough to enter paradise.",
      series: null, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 9, emotional_register: 6, interiority: 7, tone: 5, difficulty: 6 },
      tags: ["christian-fiction", "allegory", "philosophical", "religious-themes", "afterlife", "british-setting", "novella"],
      scores: { prose: 7, characters: 6, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 7 },
    },
  },
  {
    meta: {
      title: "Till We Have Faces", author: "C.S. Lewis", pageCount: 320, genre: "Fiction", publicationDate: "1956",
      description: "A retelling of Cupid and Psyche from the perspective of Orual, Psyche's plain elder sister and queen, whose love and resentment shape a life-long indictment of the gods.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 8, emotional_register: 7, interiority: 9, tone: 4, difficulty: 7 },
      tags: ["mythic-retellings", "philosophical", "religious-themes", "female-protagonist", "first-person", "lyrical-prose", "psychological"],
      scores: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9, worldBuilding: 7 },
    },
  },
  {
    meta: {
      title: "War and War", author: "László Krasznahorkai", pageCount: 320, genre: "Fiction", publicationDate: "1999",
      description: "A small-town Hungarian archivist discovers a mysterious manuscript and flies to New York to publish it on the internet before ending his own life — Krasznahorkai's long-sentence apocalyptic.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 9, prose_style: 8, warmth: 2, intensity: 8, pace: 3, moral_complexity: 8, fabulism: 4, emotional_register: 7, interiority: 9, tone: 3, difficulty: 9 },
      tags: ["literary-fiction", "translated-from", "hungarian", "dense-prose", "doorstopper", "philosophical", "experimental", "apocalyptic"],
      scores: { prose: 10, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 9, voice: 10, worldBuilding: 6 },
    },
  },
  {
    meta: {
      title: "Picnic at Hanging Rock", author: "Joan Lindsay", pageCount: 224, genre: "Mystery", publicationDate: "1967",
      description: "On Valentine's Day 1900, three Australian schoolgirls and a teacher vanish during a picnic at Hanging Rock. The mystery is never solved, and the school never recovers.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 7, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 7, interiority: 6, tone: 4, difficulty: 6 },
      tags: ["gothic-horror", "literary-fiction", "australian-setting", "historical-fiction", "ensemble-cast", "female-protagonist", "lyrical-prose", "ambiguous-ending"],
      scores: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, worldBuilding: 8 },
    },
  },
  {
    meta: {
      title: "Mickey7", author: "Edward Ashton", pageCount: 304, genre: "Sci-Fi", publicationDate: "2022",
      description: "On an ice-planet colony, the disposable 'expendable' Mickey dies repeatedly and is reprinted each time — until Mickey7 returns from a mission to find Mickey8 already in his bunk.",
      series: { name: "Mickey7", order: 1, total: 2 }, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 5, interiority: 6, tone: 7, difficulty: 4 },
      tags: ["soft-sf", "first-person", "far-future", "colony-world", "identity", "witty-prose", "philosophical", "comedy"],
      scores: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 7 },
    },
  },
  {
    meta: {
      title: "Antimatter Blues", author: "Edward Ashton", pageCount: 304, genre: "Sci-Fi", publicationDate: "2023",
      description: "Mickey7's sequel — Mickey is now the colony's only Mickey, and the small problem he tucked away on the planet's surface is about to become a much larger one.",
      series: { name: "Mickey7", order: 2, total: 2 }, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 5, interiority: 6, tone: 7, difficulty: 4 },
      tags: ["soft-sf", "first-person", "far-future", "colony-world", "witty-prose", "comedy"],
      scores: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 7 },
    },
  },
  {
    meta: {
      title: "Camp Damascus", author: "Chuck Tingle", pageCount: 240, genre: "Horror", publicationDate: "2023",
      description: "A devout young woman in a small evangelical town slowly realizes the church's gay-conversion camp uses literal demons to enforce its results — and one of them is following her home.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 7, emotional_register: 7, interiority: 6, tone: 4, difficulty: 4 },
      tags: ["supernatural-horror", "queer-romance", "religious-themes", "first-person", "female-protagonist", "american-setting", "psychological-horror", "demons"],
      scores: { prose: 6, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 6 },
    },
  },
  {
    meta: {
      title: "Bury Your Gays", author: "Chuck Tingle", pageCount: 336, genre: "Horror", publicationDate: "2024",
      description: "A queer Hollywood screenwriter is ordered to kill off his queer characters for the finale — and the monsters he wrote begin appearing in his life, exact and lethal.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 7, emotional_register: 7, interiority: 6, tone: 4, difficulty: 4 },
      tags: ["supernatural-horror", "queer-romance", "metafiction", "first-person", "hollywood-setting", "satirical"],
      scores: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 5 },
    },
  },
  {
    meta: {
      title: "There Is No Antimemetics Division", author: "qntm", pageCount: 216, genre: "Sci-Fi", publicationDate: "2021",
      description: "Inside the SCP Foundation, the Antimemetics Division fights ideas you cannot remember — adversaries whose very existence erases itself from your mind seconds after contact.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 5, interiority: 7, tone: 4, difficulty: 7 },
      tags: ["soft-sf", "weird-fiction", "ideas-driven", "ensemble-cast", "cosmic-horror", "experimental", "philosophical"],
      scores: { prose: 6, characters: 6, plot: 7, pacing: 8, ideas: 10, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 7 },
    },
  },
  {
    meta: {
      title: "How to Become the Dark Lord and Die Trying", author: "Django Wexler", pageCount: 416, genre: "Fantasy", publicationDate: "2024",
      description: "A young woman trapped in an endless time-loop fantasy world decides, after a thousand deaths trying to save the kingdom, that becoming the Dark Lord might at least be more interesting.",
      series: { name: "Dark Lord Davi", order: 1, total: 2 }, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 6, pace: 8, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 8, difficulty: 4 },
      tags: ["comic-fantasy", "time-loop", "female-protagonist", "first-person", "secondary-world", "witty-prose", "subversive"],
      scores: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 7 },
    },
  },
  {
    meta: {
      title: "Operation Bounce House", author: "Matt Dinniman", pageCount: 720, genre: "Fantasy", publicationDate: "2025",
      description: "Dungeon Crawler Carl returns: the eighth floor's gimmicks include actual bounce houses, and the larger crawl politics begin to crack open as Carl, Donut, and the team push deeper.",
      series: { name: "Dungeon Crawler Carl", order: 8, total: 10 }, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 7, pace: 8, moral_complexity: 6, fabulism: 9, emotional_register: 6, interiority: 5, tone: 7, difficulty: 4 },
      tags: ["progression-fantasy", "litrpg", "post-apocalyptic", "first-person", "male-protagonist", "humor", "action", "doorstopper"],
      scores: { prose: 6, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 8 },
    },
  },
];

// -- REC additions --------------------------------------------------------

const REC_ADDS = [
  {
    meta: {
      title: "His Name Was Death", author: "Rafael Bernal", pageCount: 144, genre: "Fiction", publicationDate: "1947",
      description: "A reclusive Mexican man fleeing the city builds a hut in the jungle and slowly teaches himself to converse with mosquitoes — a chilling, foundational work of Mexican weird fiction.",
      series: null, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 7, prose_style: 6, warmth: 2, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 8, emotional_register: 6, interiority: 9, tone: 3, difficulty: 6 },
      tags: ["weird-fiction", "translated-from", "mexican-setting", "literary-fiction", "philosophical", "obsession", "novella"],
      scores: { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 6 },
    },
  },
  {
    meta: {
      title: "The Mongolian Conspiracy", author: "Rafael Bernal", pageCount: 224, genre: "Mystery", publicationDate: "1969",
      description: "A brutal Mexican cop is given seventy-two hours to thwart a rumored Mongolian-led assassination plot against the U.S. President's state visit. Considered the best Mexican noir ever written.",
      series: null, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 7, prose_style: 6, warmth: 2, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 2, emotional_register: 5, interiority: 7, tone: 3, difficulty: 5 },
      tags: ["noir", "hardboiled", "translated-from", "mexican-setting", "first-person", "male-protagonist", "violence", "political-intrigue", "ticking-clock"],
      scores: { prose: 8, characters: 8, plot: 8, pacing: 9, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 7 },
    },
  },
  {
    meta: {
      title: "Zama", author: "Antonio Di Benedetto", pageCount: 208, genre: "Fiction", publicationDate: "1956",
      description: "A colonial Spanish official posted to 18th-century Paraguay waits — for a transfer, a reward, a recognition — that never comes. An existential masterpiece of Latin American literature.",
      series: { name: "Trilogy of Expectation", order: 1, total: 3 }, tier: 1,
    },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 6, interiority: 10, tone: 3, difficulty: 7 },
      tags: ["literary-fiction", "translated-from", "historical-fiction", "south-american-setting", "first-person", "male-protagonist", "philosophical", "existential", "colonial"],
      scores: { prose: 9, characters: 8, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 9, voice: 10, worldBuilding: 7 },
    },
  },
  {
    meta: {
      title: "The Silentiary", author: "Antonio Di Benedetto", pageCount: 176, genre: "Fiction", publicationDate: "1964",
      description: "A man in a small Argentine city is driven to obsession — and worse — by the rising tide of noise from his neighbors. The second of Di Benedetto's Trilogy of Expectation.",
      series: { name: "Trilogy of Expectation", order: 2, total: 3 }, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 7, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 6, interiority: 9, tone: 3, difficulty: 7 },
      tags: ["literary-fiction", "translated-from", "south-american-setting", "first-person", "obsession", "experimental", "psychological"],
      scores: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 6 },
    },
  },
  {
    meta: {
      title: "The Suicides", author: "Antonio Di Benedetto", pageCount: 192, genre: "Fiction", publicationDate: "1969",
      description: "A journalist assigned to investigate a series of suicides becomes increasingly consumed by the project. Closing volume of Di Benedetto's Trilogy of Expectation.",
      series: { name: "Trilogy of Expectation", order: 3, total: 3 }, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 8, prose_style: 7, warmth: 2, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 6, interiority: 9, tone: 3, difficulty: 7 },
      tags: ["literary-fiction", "translated-from", "south-american-setting", "first-person", "investigation", "philosophical", "psychological"],
      scores: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 9, voice: 9, worldBuilding: 6 },
    },
  },
  {
    meta: {
      title: "For Whom the Belle Tolls", author: "Jaysea Lynn", pageCount: 384, genre: "Romance", publicationDate: "2023",
      description: "A woman dies and finds the afterlife understaffed, accepts a role as a soul-shepherding clerk, and gets tangled up with the very particular reaper assigned to her training.",
      series: { name: "The Afterlife", order: 1, total: 2 }, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 5, prose_style: 5, warmth: 8, intensity: 5, pace: 6, moral_complexity: 4, fabulism: 7, emotional_register: 7, interiority: 5, tone: 7, difficulty: 3 },
      tags: ["romantasy", "paranormal-romance", "female-protagonist", "first-person", "afterlife", "humor", "HEA", "steamy"],
      scores: { prose: 5, characters: 7, plot: 6, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 6 },
    },
  },
  {
    meta: {
      title: "Dating After the End of the World", author: "Jeneva Rose", pageCount: 320, genre: "Thriller", publicationDate: "2024",
      description: "After a nuclear catastrophe, two strangers in a deserted New York City have to decide whether to trust each other to survive — and whether either of them is who they claim to be.",
      series: null, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 8, pace: 8, moral_complexity: 6, fabulism: 3, emotional_register: 6, interiority: 6, tone: 4, difficulty: 3 },
      tags: ["domestic-thriller", "post-apocalyptic", "twist-ending", "two-handers", "ticking-clock", "twist-ending"],
      scores: { prose: 5, characters: 6, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 6 },
    },
  },
  {
    meta: {
      title: "The Perfect Marriage", author: "Jeneva Rose", pageCount: 336, genre: "Thriller", publicationDate: "2020",
      description: "A successful criminal defense attorney's husband is accused of murder. She decides to defend him — but everyone in the marriage has been lying.",
      series: null, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 7, pace: 8, moral_complexity: 6, fabulism: 2, emotional_register: 6, interiority: 6, tone: 4, difficulty: 3 },
      tags: ["domestic-thriller", "legal-thriller", "twist-ending", "ticking-clock", "multi-pov"],
      scores: { prose: 5, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 5 },
    },
  },
  {
    meta: {
      title: "Kaiju Battlefield Surgeon", author: "Matt Dinniman", pageCount: 416, genre: "Sci-Fi", publicationDate: "2020",
      description: "In a near-future Earth at war with city-sized kaiju, a battlefield medic specializes in keeping wounded monsters alive for study — and is rapidly losing his grip on which side he's on.",
      series: null, tier: 2,
    },
    tagEntry: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 7, emotional_register: 6, interiority: 6, tone: 5, difficulty: 4 },
      tags: ["military-sf", "soft-sf", "near-future", "first-person", "male-protagonist", "kaiju", "war"],
      scores: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 6 },
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

// One-shot: fill tag entries for catalog books that have no scores yet,
// plus add three canonical books to rec-library that were genuine misses.
// After this runs, the shelf→catalog join should land ~215+/244.
const fs = require("fs");
const path = require("path");

const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const REC_PATH = path.join(__dirname, "..", "public", "rec-library.json");

const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC_PATH, "utf8"));

// --- Scores for 17 catalog books currently missing tag entries ---
const patches = {
  // Kerouac
  "278": {
    vibes: { prose_craft: 9, prose_style: 9, warmth: 6, intensity: 7, pace: 7, moral_complexity: 5, fabulism: 2, emotional_register: 6, interiority: 8, tone: 5, difficulty: 5 },
    scores: { prose: 9, characters: 8, plot: 4, pacing: 7, ideas: 7, resonance: 9, ending: 6, voice: 10 },
    tags: ["beat-generation", "road-novel", "autobiographical", "spontaneous-prose", "americana", "friendship"],
  },
  "1559": {
    vibes: { prose_craft: 9, prose_style: 9, warmth: 3, intensity: 8, pace: 6, moral_complexity: 6, fabulism: 2, emotional_register: 2, interiority: 9, tone: 2, difficulty: 6 },
    scores: { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 7, resonance: 9, ending: 8, voice: 10 },
    tags: ["beat-generation", "alcoholism", "breakdown", "autobiographical", "spontaneous-prose", "confessional"],
  },

  // Paine
  "532": {
    vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 8, pace: 8, moral_complexity: 5, fabulism: 1, emotional_register: 6, interiority: 3, tone: 3, difficulty: 5 },
    scores: { prose: 8, characters: 3, plot: 3, pacing: 8, ideas: 10, resonance: 9, ending: 7, voice: 9 },
    tags: ["political-philosophy", "american-revolution", "pamphlet", "polemic", "historical"],
  },

  // Jordan — Towers of Midnight (WoT #13, Sanderson co-wrote)
  "605": {
    vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 5, interiority: 6, tone: 4, difficulty: 6 },
    scores: { prose: 6, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 6, worldBuilding: 10, magicSystem: 9 },
    tags: ["epic-fantasy", "chosen-one", "late-series", "multi-pov", "ensemble-cast", "prophecy"],
  },

  // Roth
  "1335": {
    vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 1, emotional_register: 4, interiority: 9, tone: 4, difficulty: 6 },
    scores: { prose: 9, characters: 9, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 9, voice: 10 },
    tags: ["zuckerman", "writer-protagonist", "metafiction", "jewish-american", "short-novel"],
  },
  "1341": {
    vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 5, interiority: 8, tone: 5, difficulty: 4 },
    scores: { prose: 8, characters: 8, plot: 6, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9 },
    tags: ["jewish-american", "debut", "suburban", "short-fiction", "class"],
  },
  "1346": {
    vibes: { prose_craft: 9, prose_style: 7, warmth: 4, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 5 },
    scores: { prose: 9, characters: 9, plot: 7, pacing: 8, ideas: 8, resonance: 8, ending: 9, voice: 9 },
    tags: ["jewish-american", "korea-war", "coming-of-age", "late-roth", "short-novel"],
  },

  // Céline
  "1324": {
    vibes: { prose_craft: 9, prose_style: 10, warmth: 2, intensity: 9, pace: 6, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 8, tone: 3, difficulty: 9 },
    scores: { prose: 9, characters: 8, plot: 5, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10 },
    tags: ["war-trilogy", "autobiographical", "fragmented", "punctuated-style", "wwii", "exile"],
  },
  "1371": {
    vibes: { prose_craft: 9, prose_style: 10, warmth: 3, intensity: 8, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 8, tone: 5, difficulty: 9 },
    scores: { prose: 9, characters: 7, plot: 4, pacing: 6, ideas: 7, resonance: 7, ending: 6, voice: 10 },
    tags: ["london", "wwi-era", "picaresque", "punctuated-style", "fragmented"],
  },
  "1372": {
    vibes: { prose_craft: 9, prose_style: 10, warmth: 3, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 6, difficulty: 8 },
    scores: { prose: 8, characters: 5, plot: 3, pacing: 6, ideas: 9, resonance: 7, ending: 6, voice: 10 },
    tags: ["literary-manifesto", "metafiction", "short", "craft-essay", "autobiographical"],
  },

  // Hamsun
  "2610": {
    vibes: { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 9, tone: 4, difficulty: 5 },
    scores: { prose: 9, characters: 8, plot: 5, pacing: 6, ideas: 7, resonance: 8, ending: 8, voice: 9 },
    tags: ["lyrical", "nature", "obsession", "norwegian", "early-modernist", "unreliable-narrator"],
  },
  "2611": {
    vibes: { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 9, tone: 4, difficulty: 6 },
    scores: { prose: 8, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 },
    tags: ["psychological", "stranger-in-town", "norwegian", "early-modernist", "unreliable-narrator"],
  },
  "2613": {
    vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 2, emotional_register: 5, interiority: 7, tone: 5, difficulty: 4 },
    scores: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8 },
    tags: ["romance", "class", "unrequited-love", "norwegian", "short-novel"],
  },
  "3397": {
    vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 2, emotional_register: 5, interiority: 8, tone: 5, difficulty: 5 },
    scores: { prose: 8, characters: 7, plot: 5, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 8 },
    tags: ["wanderer-trilogy", "itinerant", "norwegian", "melancholy", "rural-life"],
  },
  "3398": {
    vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 2, emotional_register: 5, interiority: 8, tone: 5, difficulty: 5 },
    scores: { prose: 8, characters: 7, plot: 5, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 8 },
    tags: ["wanderer-trilogy", "itinerant", "norwegian", "melancholy", "rural-life"],
  },

  // Good Omens (Pratchett/Gaiman)
  "425": {
    vibes: { prose_craft: 8, prose_style: 7, warmth: 8, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 8, interiority: 5, tone: 9, difficulty: 3 },
    scores: { prose: 8, characters: 9, plot: 8, pacing: 8, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 7, magicSystem: 6 },
    tags: ["comic-fantasy", "apocalypse", "angels-demons", "collaboration", "british-humor", "end-times"],
  },

  // Jack Black — You Can't Win (hobo memoir that influenced Burroughs)
  "5975": {
    vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 3 },
    scores: { prose: 7, characters: 7, plot: 5, pacing: 6, ideas: 6, resonance: 8, ending: 6, voice: 9 },
    tags: ["memoir", "hobo-life", "underworld", "americana", "early-20th-century", "autobiographical"],
  },
};

let scoredCount = 0;
for (const [id, entry] of Object.entries(patches)) {
  tags[id] = entry;
  scoredCount++;
}

// --- Add 3 canonical books to rec-library + score them ---
// Pick fresh ids well above current max to avoid collision
const maxId = Math.max(
  ...rec.map(b => b.id),
  ...Object.keys(tags).map(Number),
);
let nextId = maxId + 1;

const additions = [
  {
    book: {
      title: "War",
      author: "Louis-Ferdinand Céline",
      pageCount: 144,
      genre: "Fiction",
      publicationDate: "1934",
      description: "A lost manuscript recovered decades after Céline's death, drawn from his WWI experiences: a wounded soldier in a field hospital, disoriented by injury, sex, and the absurdity of war, narrated in Céline's signature fractured style.",
      tier: 3,
    },
    tag: {
      vibes: { prose_craft: 9, prose_style: 10, warmth: 2, intensity: 9, pace: 7, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 8, tone: 3, difficulty: 8 },
      scores: { prose: 9, characters: 7, plot: 4, pacing: 7, ideas: 7, resonance: 8, ending: 6, voice: 10 },
      tags: ["wwi", "war-novel", "lost-manuscript", "short-novel", "fragmented", "punctuated-style"],
    },
  },
  {
    book: {
      title: "Laughter in the Dark",
      author: "Vladimir Nabokov",
      pageCount: 292,
      genre: "Fiction",
      publicationDate: "1938",
      description: "A respectable art critic ruins his life for a teenage cinema usherette who schemes with her lover to bleed him dry. Nabokov's own English translation of his 1932 Russian novel, stripped to cruel comic geometry.",
      tier: 2,
    },
    tag: {
      vibes: { prose_craft: 10, prose_style: 9, warmth: 2, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 6, difficulty: 5 },
      scores: { prose: 10, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 9, voice: 9 },
      tags: ["early-nabokov", "cruelty", "obsession", "berlin", "cinema", "cuckold", "dark-comedy"],
    },
  },
  {
    book: {
      title: "A Separate Peace",
      author: "John Knowles",
      pageCount: 204,
      genre: "Fiction",
      publicationDate: "1959",
      description: "At a New England boarding school during WWII, a cerebral student returns to the campus where his charismatic best friend fell from a tree — an accident he may have caused. A short, controlled novel about adolescent envy and the private wars boys wage on each other.",
      tier: 2,
    },
    tag: {
      vibes: { prose_craft: 9, prose_style: 6, warmth: 5, intensity: 6, pace: 6, moral_complexity: 8, fabulism: 1, emotional_register: 4, interiority: 9, tone: 4, difficulty: 4 },
      scores: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 9 },
      tags: ["coming-of-age", "boarding-school", "wwii-home-front", "male-friendship", "guilt", "short-novel"],
    },
  },
];

for (const { book, tag } of additions) {
  const id = nextId++;
  rec.push({ ...book, id });
  tags[String(id)] = tag;
}

fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
fs.writeFileSync(REC_PATH, JSON.stringify(rec));

console.log(`Scored ${scoredCount} existing books.`);
console.log(`Added ${additions.length} new books to rec-library.`);
console.log(`Total tag entries: ${Object.keys(tags).length}`);
console.log(`Rec library size: ${rec.length}`);

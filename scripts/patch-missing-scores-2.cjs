// Round 2: score the remaining in-catalog books flagged by shelf diagnostic,
// and add 7 single-author collections / canonical misses as new rec-library
// entries. Paired with the round-2 matcher changes (before-colon variant,
// "and Other Stories" strip, leading-article tolerance, colour→color).
const fs = require("fs");
const path = require("path");

const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const REC_PATH = path.join(__dirname, "..", "public", "rec-library.json");

const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC_PATH, "utf8"));

// --- In-catalog but no scores yet ---
const patches = {
  // Carl Jung — Memories, Dreams, Reflections
  "4777": {
    vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 5, emotional_register: 5, interiority: 10, tone: 4, difficulty: 8 },
    scores: { prose: 8, characters: 6, plot: 3, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9 },
    tags: ["memoir", "psychology", "spiritual", "dreams", "autobiography", "jungian", "late-career"],
  },
  // Nic Pizzolatto — Between Here and the Yellow Sea
  "5973": {
    vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 },
    scores: { prose: 8, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 9 },
    tags: ["short-fiction", "southern-gothic", "literary", "debut", "americana", "dark"],
  },
  // Ned Vizzini — It's Kind of a Funny Story
  "5976": {
    vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 2, emotional_register: 6, interiority: 8, tone: 6, difficulty: 3 },
    scores: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 8 },
    tags: ["ya", "mental-health", "depression", "hospital", "teenage-protagonist", "semi-autobiographical"],
  },
};

let scoredCount = 0;
for (const [id, entry] of Object.entries(patches)) {
  tags[id] = entry;
  scoredCount++;
}

// --- New catalog additions (single-author collections + canonical misses) ---
const maxId = Math.max(
  ...rec.map(b => b.id),
  ...Object.keys(tags).map(Number),
);
let nextId = maxId + 1;

const additions = [
  {
    book: {
      title: "Professor Dowell's Head",
      author: "Alexander Belyaev",
      pageCount: 220,
      genre: "Sci-Fi",
      publicationDate: "1925",
      description: "A Soviet pulp-scientifiction novel: a surgeon keeps a rival professor's severed head alive in a lab. Early Russian SF about consciousness, exploitation, and the ethics of what medicine can preserve when the body is gone.",
      tier: 3,
    },
    tag: {
      vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 },
      scores: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 6, worldBuilding: 5, speculativeRigor: 6 },
      tags: ["russian-sf", "early-sf", "body-horror", "medical", "soviet", "consciousness"],
    },
  },
  {
    book: {
      title: "Lord Arthur Savile's Crime and Other Stories",
      author: "Oscar Wilde",
      pageCount: 200,
      genre: "Fiction",
      publicationDate: "1891",
      description: "Wilde's only story collection: a palmist predicts a society gentleman will murder someone, so he sets out to get the crime over with before his wedding. Plus The Canterville Ghost and other comic supernatural pieces.",
      tier: 2,
    },
    tag: {
      vibes: { prose_craft: 9, prose_style: 8, warmth: 6, intensity: 4, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 7, interiority: 5, tone: 9, difficulty: 4 },
      scores: { prose: 9, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 8, voice: 10 },
      tags: ["victorian", "satire", "short-fiction", "supernatural", "dark-comedy", "aestheticism"],
    },
  },
  {
    book: {
      title: "The Wall",
      author: "Jean-Paul Sartre",
      pageCount: 224,
      genre: "Fiction",
      publicationDate: "1939",
      description: "Five stories of trapped consciousness: a prisoner awaiting firing squad, a mother with an autistic child, a fascist-sympathetic youth. Sartre's fiction companion to his philosophy — existentialism dramatized under pressure.",
      tier: 2,
    },
    tag: {
      vibes: { prose_craft: 9, prose_style: 7, warmth: 2, intensity: 8, pace: 6, moral_complexity: 9, fabulism: 2, emotional_register: 2, interiority: 9, tone: 2, difficulty: 7 },
      scores: { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 10, resonance: 8, ending: 8, voice: 9 },
      tags: ["existentialism", "short-fiction", "spanish-civil-war", "philosophical", "prewar-france", "claustrophobic"],
    },
  },
  {
    book: {
      title: "What Matters Most Is How Well You Walk Through the Fire",
      author: "Charles Bukowski",
      pageCount: 368,
      genre: "Fiction",
      publicationDate: "1999",
      description: "Posthumous poetry collection — late Bukowski, looser and more elegiac than the early work. Racetracks, deaths of friends, the long tail of a writing life. Plain-spoken poems about endurance.",
      tier: 3,
    },
    tag: {
      vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 3 },
      scores: { prose: 7, characters: 6, plot: 3, pacing: 6, ideas: 6, resonance: 8, ending: 6, voice: 10 },
      tags: ["poetry", "late-bukowski", "posthumous", "working-class", "racetrack", "autobiographical-poetry"],
    },
  },
  {
    book: {
      title: "Nights of Love and Laughter",
      author: "Henry Miller",
      pageCount: 320,
      genre: "Fiction",
      publicationDate: "1955",
      description: "Selected writings sampler — excerpts and stories pulled from Miller's Tropics, Black Spring, and essays. A door-opener to the American expat in Paris and Big Sur, introduced by Kenneth Rexroth.",
      tier: 3,
    },
    tag: {
      vibes: { prose_craft: 9, prose_style: 9, warmth: 6, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 3, emotional_register: 6, interiority: 8, tone: 6, difficulty: 5 },
      scores: { prose: 9, characters: 7, plot: 3, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 10 },
      tags: ["expat", "paris", "autobiographical", "bohemian", "selected-writings", "miller"],
    },
  },
  {
    book: {
      title: "Wampeters, Foma and Granfalloons",
      author: "Kurt Vonnegut",
      pageCount: 304,
      genre: "Non-Fiction",
      publicationDate: "1974",
      description: "Vonnegut's first nonfiction collection — speeches, essays, and reviews from the late '60s and early '70s, including the Playboy interview and a Biafran war dispatch. Political, crank, funny, kind.",
      tier: 3,
    },
    tag: {
      vibes: { prose_craft: 8, prose_style: 6, warmth: 8, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 3, emotional_register: 7, interiority: 5, tone: 8, difficulty: 3 },
      scores: { prose: 8, characters: 5, plot: 3, pacing: 7, ideas: 8, resonance: 7, ending: 6, voice: 10 },
      tags: ["essays", "speeches", "vonnegut-nonfiction", "1970s", "political", "humanism"],
    },
  },
  {
    book: {
      title: "Sucker's Portfolio",
      author: "Kurt Vonnegut",
      pageCount: 144,
      genre: "Sci-Fi",
      publicationDate: "2013",
      description: "A small posthumous bundle of previously unpublished Vonnegut — six stories and an essay pulled from the Indiana University archive. Minor-key Vonnegut: short, wry, uneven.",
      tier: 4,
    },
    tag: {
      vibes: { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 4, pace: 7, moral_complexity: 5, fabulism: 6, emotional_register: 6, interiority: 4, tone: 7, difficulty: 2 },
      scores: { prose: 7, characters: 6, plot: 5, pacing: 7, ideas: 6, resonance: 6, ending: 5, voice: 9 },
      tags: ["short-fiction", "posthumous", "vonnegut", "unpublished", "minor-works"],
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

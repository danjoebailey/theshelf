// score-batch-001 — seed craft scores from the pilot (43 books from user's rated library)
// Merges `scores: {...}` into existing book-tags.json entries, keyed by catalog ID
// Run: node scripts/score-batch-001.cjs            (dry run — shows what would change)
//      node scripts/score-batch-001.cjs --apply    (writes to book-tags.json)

const fs = require("fs");
const path = require("path");

const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const PRIMARY = path.join(__dirname, "..", "public", "book-data.json");
const REC = path.join(__dirname, "..", "public", "rec-library.json");

const apply = process.argv.includes("--apply");

// Pilot scores: 43 books, titled by author+title as they appear in the user's Goodreads export.
// Axes: prose, characters, plot, pacing, ideas, resonance, ending (+ voice as optional vibe).
const pilot = [
  // === LITERARY (25) ===
  { title: "Stoner", author: "John Williams",
    scores: { prose: 9, characters: 10, plot: 6, pacing: 3, ideas: 7, resonance: 10, ending: 9, voice: 7 } },
  { title: "Tropic of Cancer", author: "Henry Miller",
    scores: { prose: 9, characters: 6, plot: 2, pacing: 4, ideas: 7, resonance: 9, ending: 5, voice: 10 } },
  { title: "Plexus", author: "Henry Miller",
    scores: { prose: 8, characters: 6, plot: 3, pacing: 4, ideas: 7, resonance: 8, ending: 5, voice: 9 } },
  { title: "Quiet Days in Clichy", author: "Henry Miller",
    scores: { prose: 8, characters: 5, plot: 3, pacing: 5, ideas: 6, resonance: 8, ending: 5, voice: 9 } },
  { title: "Notes of a Dirty Old Man", author: "Charles Bukowski",
    scores: { prose: 7, characters: 6, plot: 2, pacing: 6, ideas: 5, resonance: 8, ending: 5, voice: 10 } },
  { title: "Ham on Rye", author: "Charles Bukowski",
    scores: { prose: 7, characters: 8, plot: 5, pacing: 6, ideas: 6, resonance: 9, ending: 7, voice: 10 } },
  { title: "Post Office", author: "Charles Bukowski",
    scores: { prose: 7, characters: 7, plot: 4, pacing: 6, ideas: 5, resonance: 8, ending: 6, voice: 10 } },
  { title: "Factotum", author: "Charles Bukowski",
    scores: { prose: 7, characters: 7, plot: 3, pacing: 6, ideas: 5, resonance: 8, ending: 5, voice: 10 } },
  { title: "Women", author: "Charles Bukowski",
    scores: { prose: 7, characters: 6, plot: 3, pacing: 6, ideas: 4, resonance: 6, ending: 4, voice: 9 } },
  { title: "Journey to the End of the Night", author: "Louis-Ferdinand Céline",
    scores: { prose: 9, characters: 8, plot: 4, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 } },
  { title: "Death on the Installment Plan", author: "Louis-Ferdinand Céline",
    scores: { prose: 9, characters: 8, plot: 4, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 10 } },
  { title: "The Human Stain", author: "Philip Roth",
    scores: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 8 } },
  { title: "American Pastoral", author: "Philip Roth",
    scores: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 7 } },
  { title: "Sabbath's Theater", author: "Philip Roth",
    scores: { prose: 9, characters: 8, plot: 4, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 9 } },
  { title: "The Crossing", author: "Cormac McCarthy",
    scores: { prose: 10, characters: 7, plot: 6, pacing: 4, ideas: 8, resonance: 8, ending: 7, voice: 9 } },
  { title: "All the Pretty Horses", author: "Cormac McCarthy",
    scores: { prose: 10, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 8, voice: 9 } },
  { title: "A Feast of Snakes", author: "Harry Crews",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 9, ending: 10, voice: 9 } },
  { title: "The Sound and the Fury", author: "William Faulkner",
    scores: { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 9, resonance: 8, ending: 7, voice: 9 } },
  { title: "Pale Fire", author: "Vladimir Nabokov",
    scores: { prose: 10, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9 } },
  { title: "My Struggle: Book 1", author: "Karl Ove Knausgård",
    scores: { prose: 7, characters: 8, plot: 2, pacing: 2, ideas: 9, resonance: 10, ending: 5, voice: 9 } },
  { title: "My Struggle: Book 2", author: "Karl Ove Knausgård",
    scores: { prose: 7, characters: 8, plot: 3, pacing: 2, ideas: 9, resonance: 9, ending: 5, voice: 9 } },
  { title: "Hunger", author: "Knut Hamsun",
    scores: { prose: 9, characters: 8, plot: 3, pacing: 5, ideas: 8, resonance: 9, ending: 6, voice: 9 } },
  { title: "A Confederacy of Dunces", author: "John Kennedy Toole",
    scores: { prose: 8, characters: 10, plot: 7, pacing: 7, ideas: 6, resonance: 9, ending: 7, voice: 10 } },
  { title: "Catch-22", author: "Joseph Heller",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 8 } },
  { title: "The Risk Pool", author: "Richard Russo",
    scores: { prose: 7, characters: 9, plot: 7, pacing: 5, ideas: 6, resonance: 9, ending: 8, voice: 7 } },

  // === FANTASY (10) ===
  { title: "The Way of Kings", author: "Brandon Sanderson",
    scores: { prose: 5, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 9, ending: 9, voice: 4, worldBuilding: 9, magicSystem: 9 } },
  { title: "Words of Radiance", author: "Brandon Sanderson",
    scores: { prose: 5, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 8, ending: 9, voice: 4, worldBuilding: 9, magicSystem: 9 } },
  { title: "Wind and Truth", author: "Brandon Sanderson",
    scores: { prose: 5, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 4, worldBuilding: 9, magicSystem: 9 } },
  { title: "Mistborn: The Final Empire", author: "Brandon Sanderson",
    scores: { prose: 5, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 4, worldBuilding: 8, magicSystem: 10 } },
  { title: "The Name of the Wind", author: "Patrick Rothfuss",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 9, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 } },
  { title: "The Wise Man's Fear", author: "Patrick Rothfuss",
    scores: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 6, resonance: 8, ending: 6, voice: 7, worldBuilding: 7, magicSystem: 7 } },
  // Trilogy rated as whole — apply same score to all three volumes
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien",
    scores: { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 10, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 7 } },
  { title: "The Two Towers", author: "J.R.R. Tolkien",
    scores: { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 10, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 7 } },
  { title: "The Return of the King", author: "J.R.R. Tolkien",
    scores: { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 10, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 7 } },
  { title: "Last Argument of Kings", author: "Joe Abercrombie",
    scores: { prose: 7, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 9, ending: 9, voice: 7, worldBuilding: 7, magicSystem: 6 } },
  { title: "The Blade Itself", author: "Joe Abercrombie",
    scores: { prose: 7, characters: 8, plot: 6, pacing: 5, ideas: 6, resonance: 6, ending: 5, voice: 7, worldBuilding: 7, magicSystem: 6 } },
  { title: "Midnight Tides", author: "Steven Erikson",
    scores: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 9, voice: 7, worldBuilding: 10, magicSystem: 8 } },

  // === SCI-FI (8) ===
  { title: "Project Hail Mary", author: "Andy Weir",
    scores: { prose: 5, characters: 7, plot: 9, pacing: 9, ideas: 8, resonance: 8, ending: 9, voice: 5, worldBuilding: 7, speculativeRigor: 10 } },
  { title: "Hyperion", author: "Dan Simmons",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 6, voice: 7, worldBuilding: 9, speculativeRigor: 7 } },
  { title: "Foundation", author: "Isaac Asimov",
    scores: { prose: 5, characters: 5, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 4, worldBuilding: 9, speculativeRigor: 8 } },
  { title: "Dune", author: "Frank Herbert",
    scores: { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 7, worldBuilding: 10, speculativeRigor: 8 } },
  { title: "Children of Dune", author: "Frank Herbert",
    scores: { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 7, worldBuilding: 10, speculativeRigor: 7 } },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin",
    scores: { prose: 8, characters: 7, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 8 } },
  { title: "1984", author: "George Orwell",
    scores: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 6, worldBuilding: 8, speculativeRigor: 7 } },
  { title: "The Martian Chronicles", author: "Ray Bradbury",
    scores: { prose: 8, characters: 6, plot: 5, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 4 } },
];

// --- Normalization for title+author matching ---
function norm(s) {
  return (s || "")
    .replace(/[åÅ]/g, "aa")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// --- Build title+author → id index across both catalogs ---
const primary = JSON.parse(fs.readFileSync(PRIMARY, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC, "utf8"));
const allBooks = [...primary, ...rec];

const byKey = new Map();
const byTitle = new Map();
for (const b of allBooks) {
  const key = norm(b.title) + "|" + norm(b.author);
  byKey.set(key, b);
  const tKey = norm(b.title);
  if (!byTitle.has(tKey)) byTitle.set(tKey, []);
  byTitle.get(tKey).push(b);
}

// --- Match pilot books ---
const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const matched = [];
const unmatched = [];

for (const p of pilot) {
  const key = norm(p.title) + "|" + norm(p.author);
  let book = byKey.get(key);

  if (!book) {
    // Fallback: title match, with author surname overlap
    const candidates = byTitle.get(norm(p.title)) || [];
    const authLast = norm(p.author).split(" ").slice(-1)[0];
    book = candidates.find(c => norm(c.author).includes(authLast));
  }

  if (book) {
    matched.push({ pilot: p, id: book.id, book });
  } else {
    unmatched.push(p);
  }
}

// --- Report ---
console.log("\n=== score-batch-001 ===");
console.log(`Matched: ${matched.length}/${pilot.length}`);
console.log(`Mode: ${apply ? "APPLY" : "DRY RUN (use --apply to write)"}`);

if (unmatched.length > 0) {
  console.log("\nUnmatched (need manual ID resolution):");
  for (const u of unmatched) console.log(`  - ${u.title} — ${u.author}`);
}

console.log("\nMatched books (by bucket):");
for (const m of matched) {
  const hasEntry = !!sidecar[m.id];
  const willAddScores = !sidecar[m.id]?.scores;
  const marker = hasEntry ? (willAddScores ? "+ scores" : "already has scores") : "new entry";
  console.log(`  [${m.id}] ${m.book.title} — ${m.book.author} (${m.book.genre}) — ${marker}`);
}

// --- Apply ---
if (apply) {
  let added = 0, updated = 0;
  for (const m of matched) {
    if (!sidecar[m.id]) {
      sidecar[m.id] = { vibes: {}, tags: [], scores: m.pilot.scores };
      added++;
    } else {
      sidecar[m.id].scores = { ...(sidecar[m.id].scores || {}), ...m.pilot.scores };
      updated++;
    }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`\nWrote ${added} new entries, updated ${updated} existing entries.`);
} else {
  console.log("\nDry run complete. Re-run with --apply to persist.");
}

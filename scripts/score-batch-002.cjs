// score-batch-002 — 48 more rated books from user's Goodreads export
// Same pattern as batch-001. Matches via title+author → catalog ID, merges scores into book-tags.json.
// Run: node scripts/score-batch-002.cjs
//      node scripts/score-batch-002.cjs --apply

const fs = require("fs");
const path = require("path");

const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const PRIMARY = path.join(__dirname, "..", "public", "book-data.json");
const REC = path.join(__dirname, "..", "public", "rec-library.json");

const apply = process.argv.includes("--apply");

const batch = [
  // === FICTION (19) ===
  { title: "The Idiot", author: "Fyodor Dostoevsky",
    scores: { prose: 8, characters: 10, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 9 } },
  { title: "The Catcher in the Rye", author: "J.D. Salinger",
    scores: { prose: 8, characters: 9, plot: 5, pacing: 6, ideas: 6, resonance: 9, ending: 7, voice: 10 } },
  { title: "Animal Farm", author: "George Orwell",
    scores: { prose: 8, characters: 7, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 9, voice: 7 } },
  { title: "Grendel", author: "John Gardner",
    scores: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 9, voice: 9 } },
  { title: "There There", author: "Tommy Orange",
    scores: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 8 } },
  { title: "Chump Change", author: "Dan Fante",
    scores: { prose: 7, characters: 7, plot: 5, pacing: 7, ideas: 5, resonance: 8, ending: 6, voice: 8 } },
  { title: "I Married a Communist", author: "Philip Roth",
    scores: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 8 } },
  { title: "My Struggle: Book 5", author: "Karl Ove Knausgård",
    scores: { prose: 7, characters: 8, plot: 3, pacing: 2, ideas: 9, resonance: 9, ending: 5, voice: 9 } },
  { title: "Demons", author: "Fyodor Dostoevsky",
    scores: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 9 } },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky",
    scores: { prose: 9, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9 } },
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky",
    scores: { prose: 9, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 9 } },
  { title: "Notes from Underground", author: "Fyodor Dostoevsky",
    scores: { prose: 9, characters: 9, plot: 4, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 } },
  { title: "Tropic of Capricorn", author: "Henry Miller",
    scores: { prose: 9, characters: 6, plot: 2, pacing: 4, ideas: 8, resonance: 8, ending: 5, voice: 10 } },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez",
    scores: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 } },
  { title: "The Stranger", author: "Albert Camus",
    scores: { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 9 } },
  { title: "Norwegian Wood", author: "Haruki Murakami",
    scores: { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 7, resonance: 9, ending: 7, voice: 8 } },
  { title: "Still Life with Woodpecker", author: "Tom Robbins",
    scores: { prose: 5, characters: 5, plot: 5, pacing: 6, ideas: 4, resonance: 4, ending: 5, voice: 6 } },
  { title: "Cannery Row", author: "John Steinbeck",
    scores: { prose: 8, characters: 8, plot: 5, pacing: 5, ideas: 7, resonance: 7, ending: 6, voice: 8 } },
  { title: "Swann's Way", author: "Marcel Proust",
    scores: { prose: 10, characters: 8, plot: 3, pacing: 1, ideas: 9, resonance: 8, ending: 5, voice: 9 } },

  // === FANTASY (12) ===
  { title: "The Shadow Rising", author: "Robert Jordan",
    scores: { prose: 6, characters: 8, plot: 9, pacing: 7, ideas: 6, resonance: 9, ending: 9, voice: 5, worldBuilding: 10, magicSystem: 8 } },
  { title: "Lord of Chaos", author: "Robert Jordan",
    scores: { prose: 6, characters: 8, plot: 8, pacing: 6, ideas: 6, resonance: 9, ending: 9, voice: 5, worldBuilding: 10, magicSystem: 8 } },
  { title: "A Memory of Light", author: "Robert Jordan",
    scores: { prose: 6, characters: 8, plot: 9, pacing: 8, ideas: 6, resonance: 10, ending: 10, voice: 5, worldBuilding: 10, magicSystem: 8 } },
  { title: "The Great Hunt", author: "Robert Jordan",
    scores: { prose: 6, characters: 8, plot: 8, pacing: 7, ideas: 5, resonance: 8, ending: 9, voice: 5, worldBuilding: 9, magicSystem: 7 } },
  { title: "A Knight of the Seven Kingdoms", author: "George R.R. Martin",
    scores: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 5 } },
  { title: "The Eye of the World", author: "Robert Jordan",
    scores: { prose: 6, characters: 7, plot: 8, pacing: 6, ideas: 5, resonance: 8, ending: 8, voice: 5, worldBuilding: 9, magicSystem: 6 } },
  { title: "Memories of Ice", author: "Steven Erikson",
    scores: { prose: 7, characters: 9, plot: 9, pacing: 6, ideas: 8, resonance: 9, ending: 10, voice: 7, worldBuilding: 10, magicSystem: 8 } },
  { title: "The Crippled God", author: "Steven Erikson",
    scores: { prose: 7, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 9, ending: 9, voice: 7, worldBuilding: 10, magicSystem: 8 } },
  { title: "The Hero of Ages", author: "Brandon Sanderson",
    scores: { prose: 5, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 9, ending: 10, voice: 4, worldBuilding: 9, magicSystem: 10 } },
  { title: "Rhythm of War", author: "Brandon Sanderson",
    scores: { prose: 5, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 9, voice: 4, worldBuilding: 9, magicSystem: 9 } },
  { title: "Before They Are Hanged", author: "Joe Abercrombie",
    scores: { prose: 7, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 7, magicSystem: 6 } },
  { title: "Oathbringer", author: "Brandon Sanderson",
    scores: { prose: 5, characters: 7, plot: 6, pacing: 5, ideas: 6, resonance: 7, ending: 7, voice: 4, worldBuilding: 9, magicSystem: 9 } },

  // === SCI-FI (11) ===
  { title: "Second Foundation", author: "Isaac Asimov",
    scores: { prose: 5, characters: 5, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 4, worldBuilding: 8, speculativeRigor: 8 } },
  { title: "Tuf Voyaging", author: "George R.R. Martin",
    scores: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 } },
  { title: "Foundation and Empire", author: "Isaac Asimov",
    scores: { prose: 5, characters: 5, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 4, worldBuilding: 8, speculativeRigor: 7 } },
  { title: "The Caves of Steel", author: "Isaac Asimov",
    scores: { prose: 5, characters: 6, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 4, worldBuilding: 7, speculativeRigor: 7 } },
  { title: "The Fall of Hyperion", author: "Dan Simmons",
    scores: { prose: 8, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 7 } },
  { title: "Endymion", author: "Dan Simmons",
    scores: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 } },
  { title: "Red Rising", author: "Pierce Brown",
    scores: { prose: 5, characters: 7, plot: 9, pacing: 9, ideas: 7, resonance: 8, ending: 8, voice: 5, worldBuilding: 7, speculativeRigor: 5 } },
  { title: "Golden Son", author: "Pierce Brown",
    scores: { prose: 5, characters: 7, plot: 9, pacing: 9, ideas: 6, resonance: 8, ending: 9, voice: 5, worldBuilding: 7, speculativeRigor: 5 } },
  { title: "A Clockwork Orange", author: "Anthony Burgess",
    scores: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 7, speculativeRigor: 5 } },
  { title: "Fahrenheit 451", author: "Ray Bradbury",
    scores: { prose: 8, characters: 6, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 7, worldBuilding: 6, speculativeRigor: 5 } },
  { title: "Dune Messiah", author: "Frank Herbert",
    scores: { prose: 7, characters: 6, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 } },

  // === NON-FICTION (3) — first books with NF pack: argument + researchRigor + access ===
  { title: "Into the Wild", author: "Jon Krakauer",
    scores: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 10, ending: 9, voice: 8, argument: 8, researchRigor: 9, access: 10 } },
  { title: "The Electric Kool-Aid Acid Test", author: "Tom Wolfe",
    scores: { prose: 9, characters: 8, plot: 5, pacing: 6, ideas: 8, resonance: 8, ending: 6, voice: 10, argument: 6, researchRigor: 8, access: 10 } },
  { title: "Hell's Angels", author: "Hunter S. Thompson",
    scores: { prose: 8, characters: 7, plot: 5, pacing: 6, ideas: 7, resonance: 8, ending: 6, voice: 10, argument: 7, researchRigor: 8, access: 10 } },

  // === MYSTERY (2) — first mystery pack: puzzle + stakes + ending ===
  { title: "The Big Sleep", author: "Raymond Chandler",
    scores: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 10, puzzle: 7, stakes: 7 } },
  { title: "Farewell, My Lovely", author: "Raymond Chandler",
    scores: { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 5, resonance: 7, ending: 6, voice: 10, puzzle: 6, stakes: 6 } },

  // === HISTORICAL FICTION (1) — first HF pack: periodAuthenticity + researchIntegration ===
  { title: "A Gentleman in Moscow", author: "Amor Towles",
    scores: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 7, resonance: 9, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 8 } },
];

// --- Matching helpers (same as batch-001 + parenthetical strip) ---
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
function normTitle(t) {
  return norm((t || "").replace(/\s*\([^)]*\)\s*$/, ""));
}

const primary = JSON.parse(fs.readFileSync(PRIMARY, "utf8"));
const rec = JSON.parse(fs.readFileSync(REC, "utf8"));
const all = [...primary, ...rec];

const byKey = new Map();
const byTitle = new Map();
for (const b of all) {
  byKey.set(normTitle(b.title) + "|" + norm(b.author), b);
  const tKey = normTitle(b.title);
  if (!byTitle.has(tKey)) byTitle.set(tKey, []);
  byTitle.get(tKey).push(b);
}

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const matched = [];
const unmatched = [];

for (const p of batch) {
  const key = normTitle(p.title) + "|" + norm(p.author);
  let book = byKey.get(key);
  if (!book) {
    const candidates = byTitle.get(normTitle(p.title)) || [];
    const authLast = norm(p.author).split(" ").slice(-1)[0];
    book = candidates.find(c => norm(c.author).includes(authLast));
  }
  if (book) matched.push({ pilot: p, id: book.id, book });
  else unmatched.push(p);
}

console.log("\n=== score-batch-002 ===");
console.log(`Matched: ${matched.length}/${batch.length}`);
console.log(`Mode: ${apply ? "APPLY" : "DRY RUN (use --apply to write)"}`);

if (unmatched.length > 0) {
  console.log("\nUnmatched:");
  for (const u of unmatched) console.log(`  - ${u.title} — ${u.author}`);
}

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

// score-batch-010 — 39 books by user's most-read authors (highest rec value)
// McCarthy, Miller, Bukowski, Céline, Knausgård, Roth — direct impact on user's Paige recs
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === Cormac McCarthy (9) ===
  106:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 10, voice: 10 },// The Road
  107:  { prose: 10, characters: 9, plot: 8, pacing: 8, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // No Country for Old Men
  108:  { prose: 10, characters: 9, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 },  // Suttree
  111:  { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 9, voice: 10 },   // Cities of the Plain
  112:  { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 10 },   // Outer Dark
  113:  { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Child of God
  3245: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // The Passenger
  3246: { prose: 10, characters: 8, plot: 4, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Stella Maris
  8882: { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 8, resonance: 8, ending: 7, voice: 9 },    // Orchard Keeper

  // === Henry Miller (6) ===
  1328: { prose: 8, characters: 5, plot: 2, pacing: 4, ideas: 8, resonance: 8, ending: 5, voice: 9 },    // Black Spring
  1329: { prose: 8, characters: 6, plot: 3, pacing: 5, ideas: 7, resonance: 8, ending: 5, voice: 10 },   // Sexus
  1331: { prose: 8, characters: 6, plot: 3, pacing: 5, ideas: 7, resonance: 8, ending: 5, voice: 9 },    // Nexus
  1332: { prose: 8, characters: 5, plot: 2, pacing: 4, ideas: 8, resonance: 8, ending: 6, voice: 9 },    // Big Sur and the Oranges
  1333: { prose: 9, characters: 6, plot: 3, pacing: 5, ideas: 8, resonance: 9, ending: 6, voice: 10 },   // Colossus of Maroussi
  1401: { prose: 8, characters: 5, plot: 2, pacing: 5, ideas: 8, resonance: 8, ending: 5, voice: 9 },    // Air-Conditioned Nightmare

  // === Charles Bukowski (7) ===
  1316: { prose: 7, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 6, voice: 9 },    // Hollywood
  1317: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 5, voice: 8 },    // Pulp
  1318: { prose: 8, characters: 4, plot: 1, pacing: 6, ideas: 6, resonance: 8, ending: 4, voice: 10 },   // Love Is a Dog from Hell (poems)
  1319: { prose: 7, characters: 7, plot: 4, pacing: 6, ideas: 5, resonance: 8, ending: 5, voice: 10 },   // South of No North
  1380: { prose: 7, characters: 6, plot: 3, pacing: 6, ideas: 5, resonance: 7, ending: 5, voice: 10 },   // Tales of Ordinary Madness
  1381: { prose: 7, characters: 6, plot: 3, pacing: 6, ideas: 5, resonance: 7, ending: 5, voice: 10 },   // Most Beautiful Woman in Town
  1385: { prose: 8, characters: 4, plot: 1, pacing: 6, ideas: 6, resonance: 8, ending: 4, voice: 10 },   // You Get So Alone (poems)

  // === Louis-Ferdinand Céline (3) ===
  1323: { prose: 9, characters: 8, plot: 4, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 },   // Castle to Castle
  1325: { prose: 9, characters: 8, plot: 4, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 },   // Rigadoon
  1370: { prose: 9, characters: 7, plot: 4, pacing: 5, ideas: 9, resonance: 8, ending: 6, voice: 10 },   // Guignol's Band

  // === Karl Ove Knausgård (4) ===
  3367: { prose: 7, characters: 8, plot: 2, pacing: 2, ideas: 9, resonance: 9, ending: 5, voice: 9 },    // My Struggle: Book 3
  3368: { prose: 7, characters: 8, plot: 3, pacing: 2, ideas: 9, resonance: 9, ending: 5, voice: 9 },    // My Struggle: Book 4
  3423: { prose: 7, characters: 8, plot: 3, pacing: 2, ideas: 10, resonance: 9, ending: 5, voice: 9 },   // My Struggle: Book 6
  3424: { prose: 9, characters: 8, plot: 5, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 9 },   // A Time for Everything

  // === Philip Roth (10) ===
  458:  { prose: 9, characters: 9, plot: 5, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 10 },   // Portnoy's Complaint
  1336: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 },    // Zuckerman Unbound
  1337: { prose: 9, characters: 8, plot: 5, pacing: 4, ideas: 8, resonance: 8, ending: 7, voice: 9 },    // The Anatomy Lesson
  1338: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },    // The Counterlife
  1340: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9 },   // The Plot Against America
  1342: { prose: 9, characters: 8, plot: 5, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 10 },   // The Dying Animal
  1343: { prose: 9, characters: 8, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 9, voice: 9 },    // Everyman
  1345: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },    // Nemesis
  1347: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 },    // My Life as a Man
  1348: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 },   // Operation Shylock
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-010 (favorite authors) ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

// score-batch-003 — 70 books filling weak buckets (mystery, thriller, horror, romance, non-fiction)
// Keyed by catalog ID directly (no title match needed — IDs pulled from priority scan).
// Run: node scripts/score-batch-003.cjs
//      node scripts/score-batch-003.cjs --apply

const fs = require("fs");
const path = require("path");

const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === MYSTERY (15) ===
  647:  { prose: 7, characters: 6, plot: 10, pacing: 8, ideas: 5, resonance: 9, ending: 10, voice: 6, puzzle: 10, stakes: 8 },   // And Then There Were None — Christie
  884:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 6, voice: 8, puzzle: 6, stakes: 8 },       // In the Woods — French
  933:  { prose: 7, characters: 8, plot: 9, pacing: 7, ideas: 8, resonance: 8, ending: 9, voice: 6, puzzle: 10, stakes: 8 },      // Devotion of Suspect X — Higashino
  1155: { prose: 8, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 10, puzzle: 6, stakes: 9 },      // Black Dahlia — Ellroy
  1936: { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 6, voice: 8, puzzle: 7, stakes: 6 },       // A Study in Scarlet — Conan Doyle
  1943: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 5 },       // Whose Body? — Sayers
  1946: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 7, stakes: 7 },       // A Taste for Death — P.D. James
  1949: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 8 },       // Faceless Killers — Mankell
  1954: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8, puzzle: 8, stakes: 7 },       // Case Histories — Atkinson
  2011: { prose: 8, characters: 7, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 9, voice: 7, puzzle: 10, stakes: 6 },      // Magpie Murders — Horowitz
  2013: { prose: 7, characters: 7, plot: 9, pacing: 8, ideas: 8, resonance: 8, ending: 8, voice: 7, puzzle: 10, stakes: 7 },      // Seven Deaths of Evelyn Hardcastle — Turton
  2058: { prose: 7, characters: 8, plot: 6, pacing: 6, ideas: 6, resonance: 8, ending: 7, voice: 8, puzzle: 5, stakes: 4 },       // No. 1 Ladies' Detective Agency — McCall Smith
  2069: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 6 },       // Cuckoo's Calling — Galbraith
  2107: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 10, puzzle: 6, stakes: 7 },      // Motherless Brooklyn — Lethem
  2137: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 5 },       // Still Life — Penny

  // === THRILLER (15) ===
  651:  { prose: 6, characters: 9, plot: 9, pacing: 8, ideas: 8, resonance: 9, ending: 9, voice: 7, stakes: 9, twists: 8 },       // Girl with the Dragon Tattoo — Larsson
  654:  { prose: 9, characters: 10, plot: 10, pacing: 9, ideas: 8, resonance: 10, ending: 10, voice: 10, stakes: 10, twists: 10 }, // Gone Girl — Flynn
  707:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 8, ending: 9, voice: 7, stakes: 8, twists: 9 },       // Silent Patient — Michaelides
  872:  { prose: 6, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 6, stakes: 9, twists: 6 },       // A Time to Kill — Grisham
  875:  { prose: 4, characters: 5, plot: 8, pacing: 10, ideas: 5, resonance: 6, ending: 7, voice: 4, stakes: 8, twists: 8 },      // Da Vinci Code — Brown
  878:  { prose: 4, characters: 6, plot: 8, pacing: 10, ideas: 4, resonance: 6, ending: 7, voice: 5, stakes: 9, twists: 7 },      // Along Came a Spider — Patterson
  880:  { prose: 5, characters: 7, plot: 8, pacing: 10, ideas: 3, resonance: 7, ending: 8, voice: 6, stakes: 9, twists: 7 },      // Killing Floor — Child
  882:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 10, ending: 9, voice: 9, stakes: 9, twists: 7 },      // Mystic River — Lehane
  887:  { prose: 6, characters: 6, plot: 7, pacing: 8, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 8, twists: 7 },       // Woman in Cabin 10 — Ware
  914:  { prose: 9, characters: 9, plot: 9, pacing: 6, ideas: 9, resonance: 10, ending: 10, voice: 9, stakes: 10, twists: 10 },   // Spy Who Came in from the Cold — le Carré
  930:  { prose: 5, characters: 6, plot: 8, pacing: 9, ideas: 4, resonance: 6, ending: 7, voice: 6, stakes: 8, twists: 9 },       // Housemaid — McFadden
  958:  { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 8, voice: 7, stakes: 8, twists: 8 },       // Girl on the Train — Hawkins
  1164: { prose: 7, characters: 9, plot: 9, pacing: 8, ideas: 8, resonance: 9, ending: 9, voice: 8, stakes: 10, twists: 8 },      // Red Dragon — Harris
  1233: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 8, voice: 7, stakes: 8, twists: 7 },       // Lincoln Lawyer — Connelly
  1237: { prose: 5, characters: 7, plot: 8, pacing: 9, ideas: 5, resonance: 7, ending: 8, voice: 6, stakes: 8, twists: 9 },       // Tell No One — Coben

  // === HORROR (15) ===
  633:  { prose: 7, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 10, ending: 9, voice: 8, atmosphere: 10, dread: 10 }, // The Shining — King
  702:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, atmosphere: 9, dread: 8 },    // Mexican Gothic — Moreno-Garcia
  727:  { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 7, atmosphere: 10, dread: 9 },   // Dracula — Stoker
  757:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, atmosphere: 9, dread: 9 },    // The Passage — Cronin
  1270: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 },    // Heart-Shaped Box — Hill
  1274: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 7, atmosphere: 10, dread: 9 },   // Head Full of Ghosts — Tremblay
  1966: { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10, atmosphere: 10, dread: 10 }, // Haunting of Hill House — Jackson
  1970: { prose: 7, characters: 5, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9, atmosphere: 10, dread: 10 }, // Call of Cthulhu — Lovecraft
  1973: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 9, ending: 8, voice: 8, atmosphere: 10, dread: 9 },   // Ghost Story — Straub
  1976: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, atmosphere: 9, dread: 9 },    // Hellbound Heart — Barker
  2466: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 8, voice: 8, atmosphere: 8, dread: 7 },    // Southern Book Club — Hendrix
  2470: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 9, atmosphere: 9, dread: 10 },   // Only Good Indians — Graham Jones
  2474: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 7, voice: 6, atmosphere: 8, dread: 10 },   // Bird Box — Malerman
  2478: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 7, resonance: 9, ending: 8, voice: 8, atmosphere: 9, dread: 6 },    // Boy's Life — McCammon
  3007: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 10, atmosphere: 10, dread: 7 },  // Interview with the Vampire — Rice

  // === ROMANCE / YA (10) ===
  657:  { prose: 6, characters: 8, plot: 9, pacing: 10, ideas: 8, resonance: 9, ending: 8, voice: 7, chemistry: 6, tension: 9, heaPayoff: 5 },   // Hunger Games — Collins
  694:  { prose: 5, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 8, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 6 },    // It Ends with Us — Hoover
  738:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 7, voice: 7, chemistry: 4, tension: 7, heaPayoff: 3 },    // The Giver — Lowry
  740:  { prose: 7, characters: 8, plot: 6, pacing: 6, ideas: 7, resonance: 9, ending: 8, voice: 8, chemistry: 9, tension: 6, heaPayoff: 2 },    // Fault in Our Stars — Green
  847:  { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },    // Beach Read — Henry
  853:  { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 8, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },    // Red White & Royal Blue — McQuiston
  912:  { prose: 8, characters: 9, plot: 6, pacing: 6, ideas: 7, resonance: 9, ending: 7, voice: 8, chemistry: 10, tension: 8, heaPayoff: 4 },   // Eleanor & Park — Rowell
  966:  { prose: 7, characters: 9, plot: 7, pacing: 7, ideas: 10, resonance: 10, ending: 8, voice: 9, chemistry: 5, tension: 8, heaPayoff: 5 },  // Hate U Give — Thomas
  1118: { prose: 5, characters: 6, plot: 6, pacing: 6, ideas: 5, resonance: 8, ending: 8, voice: 5, chemistry: 8, tension: 7, heaPayoff: 7 },    // Notebook — Sparks
  1124: { prose: 7, characters: 8, plot: 6, pacing: 6, ideas: 7, resonance: 9, ending: 7, voice: 7, chemistry: 9, tension: 7, heaPayoff: 3 },    // Me Before You — Moyes

  // === NON-FICTION (15) ===
  35:   { prose: 10, characters: 4, plot: 3, pacing: 3, ideas: 9, resonance: 9, ending: 7, voice: 10, argument: 7, researchRigor: 6, access: 7 },    // Pilgrim at Tinker Creek — Dillard
  54:   { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 8, argument: 9, researchRigor: 10, access: 9 },     // Guns of August — Tuchman
  77:   { prose: 9, characters: 3, plot: 2, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 9, researchRigor: 10, access: 9 },  // Cosmos — Sagan
  81:   { prose: 7, characters: 2, plot: 2, pacing: 3, ideas: 10, resonance: 10, ending: 7, voice: 8, argument: 10, researchRigor: 10, access: 5 },  // Origin of Species — Darwin
  304:  { prose: 10, characters: 6, plot: 4, pacing: 4, ideas: 9, resonance: 10, ending: 9, voice: 10, argument: 7, researchRigor: 5, access: 10 }, // Year of Magical Thinking — Didion
  434:  { prose: 8, characters: 7, plot: 3, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 9, argument: 8, researchRigor: 9, access: 10 },   // Man Who Mistook His Wife — Sacks
  476:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 9, argument: 10, researchRigor: 10, access: 9 }, // Power Broker — Caro
  514:  { prose: 10, characters: 5, plot: 3, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10, argument: 9, researchRigor: 6, access: 10 }, // Between the World and Me — Coates
  535:  { prose: 9, characters: 9, plot: 6, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 10, argument: 7, researchRigor: 9, access: 9 },    // Right Stuff — Wolfe
  544:  { prose: 8, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, argument: 8, researchRigor: 9, access: 10 },    // Soul of a New Machine — Kidder
  545:  { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9, argument: 8, researchRigor: 10, access: 10 }, // In Cold Blood — Capote
  682:  { prose: 8, characters: 3, plot: 3, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 8, argument: 9, researchRigor: 7, access: 8 },    // Sapiens — Harari
  687:  { prose: 7, characters: 4, plot: 3, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 7, argument: 7, researchRigor: 6, access: 9 },     // Outliers — Gladwell
  1279: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 10 },   // Moneyball — Lewis
  1283: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 8, argument: 7, researchRigor: 10, access: 9 },   // Devil in the White City — Larson
};

// --- Apply ---
const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);

console.log("\n=== score-batch-003 ===");
console.log(`Books to score: ${entries.length}`);
console.log(`Mode: ${apply ? "APPLY" : "DRY RUN (use --apply to write)"}`);

let missing = 0;
for (const [id] of entries) {
  if (!sidecar[id]) {
    console.log(`  Warning: no existing vibe entry for ID ${id} — will create new`);
    missing++;
  }
}
console.log(`Entries without prior vibes: ${missing}`);

if (apply) {
  let added = 0, updated = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) {
      sidecar[id] = { vibes: {}, tags: [], scores };
      added++;
    } else {
      sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores };
      updated++;
    }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`\nWrote ${added} new entries, updated ${updated} existing entries.`);
} else {
  console.log("\nDry run complete. Re-run with --apply to persist.");
}

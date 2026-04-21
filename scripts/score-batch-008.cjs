// score-batch-008 — 38 hand-picked books (literary canon, graphic novels, SF classics)
// Shift to slower/selective scoring — only books I can differentiate with confidence
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (20) ===
  2211: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 9 },   // Sea, the Sea — Murdoch
  2228: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10 },  // Prime of Miss Jean Brodie — Spark
  2238: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Elementary Particles — Houellebecq
  2247: { prose: 10, characters: 7, plot: 5, pacing: 2, ideas: 10, resonance: 9, ending: 8, voice: 10 },// Satantango — Krasznahorkai
  2589: { prose: 9, characters: 9, plot: 5, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // Last Exit to Brooklyn — Selby
  2594: { prose: 10, characters: 7, plot: 4, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10 },// Jesus' Son — Denis Johnson
  2617: { prose: 10, characters: 7, plot: 4, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },// Our Lady of the Flowers — Genet
  2623: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10 }, // Killer Inside Me — Thompson
  2631: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 9 },  // Postman Always Rings Twice — Cain
  2635: { prose: 9, characters: 10, plot: 8, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9 },// Talented Mr Ripley — Highsmith
  2653: { prose: 10, characters: 6, plot: 2, pacing: 4, ideas: 10, resonance: 9, ending: 6, voice: 10 },// Naked Lunch — Burroughs
  2671: { prose: 10, characters: 10, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9 },// Heart Is Lonely Hunter — McCullers
  2676: { prose: 10, characters: 8, plot: 2, pacing: 3, ideas: 10, resonance: 10, ending: 8, voice: 10 },// Waiting for Godot — Beckett
  2698: { prose: 10, characters: 7, plot: 4, pacing: 3, ideas: 10, resonance: 9, ending: 8, voice: 10 },// The Loser — Bernhard
  2752: { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 9 }, // Painted Bird — Kosinski
  2755: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },// Too Loud a Solitude — Hrabal
  2765: { prose: 10, characters: 9, plot: 5, pacing: 4, ideas: 10, resonance: 10, ending: 7, voice: 10 },// Gravity's Rainbow — Pynchon
  2773: { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 10 },// The Recognitions — Gaddis
  2807: { prose: 10, characters: 8, plot: 4, pacing: 2, ideas: 10, resonance: 10, ending: 9, voice: 10 },// Austerlitz — Sebald
  2815: { prose: 10, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10 },// Blindness — Saramago

  // === FANTASY / GRAPHIC NOVELS (10) ===
  2047: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },  // Graceling
  3011: { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 9, worldBuilding: 8, magicSystem: 7 },  // Storm Front
  3994: { prose: 9, characters: 9, plot: 9, pacing: 8, ideas: 9, resonance: 10, ending: 9, voice: 10, worldBuilding: 10, magicSystem: 6 }, // Saga vol 1
  3996: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 10, ending: 8, voice: 10, worldBuilding: 6, magicSystem: 0 }, // Blankets
  3998: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 7, magicSystem: 0 },// Jimmy Corrigan
  4305: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 9, worldBuilding: 8, magicSystem: 0 },  // Essex County
  4714: { prose: 8, characters: 9, plot: 9, pacing: 8, ideas: 9, resonance: 10, ending: 9, voice: 10, worldBuilding: 9, magicSystem: 5 }, // Batman Dark Knight Returns
  5273: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Gideon the Ninth
  6180: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 6 },// Uzumaki
  6188: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 6 },   // Astro Boy

  // === SCI-FI (5) ===
  5445: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 6 },  // Wool
  5448: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 5 },  // Eyre Affair
  6980: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 7 },  // Dragonflight
  6986: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // 20,000 Leagues
  7550: { prose: 9, characters: 8, plot: 9, pacing: 6, ideas: 9, resonance: 10, ending: 10, voice: 9, worldBuilding: 8, speculativeRigor: 6 },// The Prestige

  // === NON-FICTION (3) ===
  4388: { prose: 7, characters: 8, plot: 5, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 8, argument: 6, researchRigor: 4, access: 10 }, // Tuesdays with Morrie
  4789: { prose: 9, characters: 3, plot: 2, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 9, argument: 10, researchRigor: 6, access: 5 }, // Fear and Trembling
  4799: { prose: 9, characters: 4, plot: 3, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9, argument: 10, researchRigor: 9, access: 7 }, // History of Western Philosophy
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-008 (selective) ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

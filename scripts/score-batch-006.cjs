// score-batch-006 — 100 more T1 #1 canon
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (35) ===
  528:  { prose: 9, characters: 9, plot: 6, pacing: 3, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  534:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  547:  { prose: 8, characters: 8, plot: 8, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 8 },
  555:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  560:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  562:  { prose: 10, characters: 9, plot: 5, pacing: 2, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  566:  { prose: 10, characters: 10, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  571:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  582:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  586:  { prose: 10, characters: 8, plot: 5, pacing: 3, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  589:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 9, voice: 9 },
  591:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 10 },
  594:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10 },
  667:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 10, ending: 8, voice: 8 },
  669:  { prose: 6, characters: 6, plot: 5, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7 },
  673:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  677:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 7 },
  704:  { prose: 7, characters: 9, plot: 8, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 8 },
  708:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 6 },
  710:  { prose: 7, characters: 9, plot: 6, pacing: 6, ideas: 7, resonance: 10, ending: 9, voice: 8 },
  717:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 8 },
  718:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  728:  { prose: 9, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  732:  { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 10, voice: 10 },
  736:  { prose: 8, characters: 10, plot: 8, pacing: 7, ideas: 9, resonance: 10, ending: 10, voice: 9 },
  737:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  754:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  760:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 9 },
  762:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  860:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 9, ending: 7, voice: 8 },
  895:  { prose: 9, characters: 10, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 9 },
  904:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  918:  { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 },
  920:  { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  923:  { prose: 7, characters: 8, plot: 9, pacing: 7, ideas: 7, resonance: 9, ending: 9, voice: 7 },

  // === FANTASY (15) ===
  716:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },
  720:  { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 7 },
  721:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 7, magicSystem: 0 },
  722:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 10, worldBuilding: 7, magicSystem: 0 },
  723:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 10, resonance: 10, ending: 10, voice: 10, worldBuilding: 9, magicSystem: 4 },
  724:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 6, magicSystem: 0 },
  947:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 6, resonance: 8, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 7 },
  950:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 },
  951:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 7, magicSystem: 7 },
  952:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 6 },
  954:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 6 },
  1138: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 5, worldBuilding: 7, magicSystem: 5 },
  1224: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 },
  1228: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 8 },
  1739: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 },

  // === SCI-FI (15) ===
  523:  { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 6 },
  527:  { prose: 8, characters: 6, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 7 },
  556:  { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 7, worldBuilding: 10, speculativeRigor: 9 },
  578:  { prose: 9, characters: 7, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 },
  588:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, worldBuilding: 8, speculativeRigor: 6 },
  758:  { prose: 5, characters: 6, plot: 7, pacing: 9, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 7, speculativeRigor: 5 },
  866:  { prose: 6, characters: 7, plot: 8, pacing: 9, ideas: 8, resonance: 8, ending: 8, voice: 6, worldBuilding: 8, speculativeRigor: 9 },
  1197: { prose: 6, characters: 7, plot: 8, pacing: 9, ideas: 8, resonance: 7, ending: 7, voice: 6, worldBuilding: 7, speculativeRigor: 7 },
  1200: { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 8 },
  1209: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 7 },
  1211: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 },
  1217: { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 10, speculativeRigor: 9 },
  1219: { prose: 7, characters: 9, plot: 6, pacing: 6, ideas: 7, resonance: 9, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 6 },
  1828: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 7, speculativeRigor: 7 },
  1839: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 },

  // === MYSTERY (8) ===
  4521: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  4539: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  4543: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  4546: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, puzzle: 7, stakes: 8 },
  4549: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, puzzle: 7, stakes: 8 },
  4612: { prose: 7, characters: 7, plot: 8, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 8, stakes: 6 },
  5171: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 5 },
  5172: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 6 },

  // === THRILLER (8) ===
  2727: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 },
  3661: { prose: 6, characters: 6, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 7 },
  3881: { prose: 5, characters: 6, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 8, twists: 6 },
  3888: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 7 },
  3968: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },
  3977: { prose: 5, characters: 6, plot: 7, pacing: 9, ideas: 6, resonance: 6, ending: 7, voice: 5, stakes: 8, twists: 7 },
  4127: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 },
  4453: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, stakes: 8, twists: 7 },

  // === HORROR (5) ===
  6140: { prose: 9, characters: 6, plot: 5, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9, atmosphere: 10, dread: 10 },
  6145: { prose: 8, characters: 6, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9, atmosphere: 10, dread: 9 },
  6146: { prose: 8, characters: 6, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, atmosphere: 10, dread: 10 },
  6147: { prose: 9, characters: 6, plot: 5, pacing: 4, ideas: 10, resonance: 10, ending: 7, voice: 9, atmosphere: 10, dread: 10 },
  7498: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, atmosphere: 9, dread: 8 },

  // === NON-FICTION (7) ===
  2948: { prose: 9, characters: 7, plot: 4, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9, argument: 10, researchRigor: 9, access: 9 },
  2952: { prose: 8, characters: 4, plot: 3, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 8, argument: 9, researchRigor: 10, access: 7 },
  3156: { prose: 7, characters: 4, plot: 3, pacing: 7, ideas: 7, resonance: 7, ending: 6, voice: 7, argument: 7, researchRigor: 6, access: 9 },
  3163: { prose: 8, characters: 5, plot: 3, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 8, argument: 9, researchRigor: 10, access: 7 },
  3166: { prose: 8, characters: 6, plot: 4, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, argument: 9, researchRigor: 9, access: 9 },
  3169: { prose: 8, characters: 5, plot: 4, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, argument: 7, researchRigor: 8, access: 9 },
  3387: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10, argument: 9, researchRigor: 8, access: 10 },

  // === ROMANCE / YA (7) ===
  1140: { prose: 5, characters: 6, plot: 6, pacing: 8, ideas: 4, resonance: 7, ending: 7, voice: 6, chemistry: 9, tension: 9, heaPayoff: 8 },
  1141: { prose: 5, characters: 6, plot: 6, pacing: 8, ideas: 4, resonance: 7, ending: 7, voice: 6, chemistry: 9, tension: 8, heaPayoff: 8 },
  1147: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 6, chemistry: 9, tension: 7, heaPayoff: 9 },
  1148: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 8, tension: 7, heaPayoff: 9 },
  2040: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 },
  2160: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 8, heaPayoff: 5 },
  2163: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 5, tension: 8, heaPayoff: 5 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-006 ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

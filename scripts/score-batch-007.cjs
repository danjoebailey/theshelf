// score-batch-007 — 100 more T1 #1 canon
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (35) ===
  936:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  938:  { prose: 7, characters: 7, plot: 5, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8 },
  940:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 10, ending: 9, voice: 8 },
  955:  { prose: 7, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 8 },
  960:  { prose: 9, characters: 7, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  961:  { prose: 9, characters: 8, plot: 4, pacing: 3, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  1117: { prose: 7, characters: 9, plot: 8, pacing: 6, ideas: 7, resonance: 9, ending: 8, voice: 7 },
  1150: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  1160: { prose: 9, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 10 },
  1167: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 9, resonance: 10, ending: 10, voice: 10 },
  1171: { prose: 8, characters: 8, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  1173: { prose: 9, characters: 9, plot: 6, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  1181: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  1184: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  1186: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  1262: { prose: 7, characters: 9, plot: 9, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 7 },
  1264: { prose: 9, characters: 10, plot: 9, pacing: 6, ideas: 9, resonance: 10, ending: 10, voice: 9 },
  1266: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 },
  1267: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8 },
  1301: { prose: 8, characters: 9, plot: 6, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 7 },
  1363: { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 10 },
  1994: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  1998: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  2000: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 },
  2050: { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 8 },
  2103: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  2115: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  2119: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  2122: { prose: 9, characters: 7, plot: 4, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 },
  2124: { prose: 8, characters: 9, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 },
  2128: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  2129: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 10, voice: 10 },
  2184: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  2195: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  2203: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },

  // === FANTASY (15) ===
  1747: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 6, worldBuilding: 9, magicSystem: 7 },
  1751: { prose: 5, characters: 6, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 5, worldBuilding: 8, magicSystem: 6 },
  1755: { prose: 7, characters: 8, plot: 8, pacing: 5, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 7 },
  1759: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },
  1764: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, worldBuilding: 7, magicSystem: 5 },
  1768: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 },
  1773: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 6 },
  1778: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 8, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 5 },
  1782: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 6 },
  1785: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 9 },
  1792: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 },
  1795: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 6 },
  1799: { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 9, voice: 8, worldBuilding: 8, magicSystem: 7 },
  1802: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 6 },
  1806: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 },

  // === SCI-FI (15) ===
  1842: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 8, worldBuilding: 9, speculativeRigor: 7 },
  1853: { prose: 8, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8, worldBuilding: 8, speculativeRigor: 6 },
  1857: { prose: 7, characters: 6, plot: 7, pacing: 7, ideas: 10, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 9 },
  1862: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 8 },
  1865: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 8, worldBuilding: 8, speculativeRigor: 7 },
  1868: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 7, speculativeRigor: 6 },
  1872: { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 },
  1911: { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 10, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 },
  2113: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 6 },
  2409: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
  2416: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 9 },
  2418: { prose: 8, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 8, speculativeRigor: 7 },
  2424: { prose: 8, characters: 8, plot: 6, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 6 },
  2426: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 8, speculativeRigor: 7 },
  2430: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, speculativeRigor: 7 },

  // === MYSTERY (8) ===
  5300: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 7, stakes: 7 },
  5543: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 6, stakes: 7 },
  5550: { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 6 },
  5558: { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  5564: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  5567: { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 6 },
  5897: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 6, stakes: 7 },
  5914: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 6, voice: 7, puzzle: 5, stakes: 4 },

  // === THRILLER (8) ===
  4466: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 7, stakes: 8, twists: 8 },
  4508: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 },
  4525: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, stakes: 8, twists: 8 },
  4528: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 7, stakes: 9, twists: 7 },
  4536: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, stakes: 9, twists: 7 },
  4868: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 9, stakes: 9, twists: 8 },
  4883: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, stakes: 8, twists: 8 },
  5179: { prose: 6, characters: 7, plot: 8, pacing: 9, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 8 },

  // === HORROR (3) ===
  7759: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8, atmosphere: 9, dread: 10 },
  7760: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 8, dread: 7 },
  7763: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 7, atmosphere: 8, dread: 8 },

  // === NON-FICTION (7) ===
  3787: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 8, argument: 9, researchRigor: 10, access: 9 },
  3793: { prose: 8, characters: 4, plot: 3, pacing: 9, ideas: 10, resonance: 9, ending: 7, voice: 8, argument: 10, researchRigor: 8, access: 10 },
  3798: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, argument: 8, researchRigor: 9, access: 9 },
  3962: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 10, ending: 9, voice: 8, argument: 8, researchRigor: 10, access: 9 },
  4228: { prose: 8, characters: 4, plot: 3, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9, argument: 10, researchRigor: 9, access: 7 },
  4267: { prose: 7, characters: 9, plot: 7, pacing: 6, ideas: 7, resonance: 9, ending: 8, voice: 7, argument: 7, researchRigor: 9, access: 9 },
  4275: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 7, argument: 8, researchRigor: 10, access: 8 },

  // === ROMANCE / YA (7) ===
  2166: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 6, tension: 8, heaPayoff: 5 },
  2517: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 5 },
  2521: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 9, tension: 8, heaPayoff: 6 },
  2524: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 8, chemistry: 7, tension: 7, heaPayoff: 4 },
  2534: { prose: 7, characters: 8, plot: 6, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, chemistry: 8, tension: 6, heaPayoff: 7 },
  2543: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  2547: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-007 ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

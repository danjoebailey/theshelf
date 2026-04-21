// score-batch-004 — 100 T1 topRank=1 canonical books across all buckets
// Run: node scripts/score-batch-004.cjs [--apply]

const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (35) ===
  8:    { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8 },
  37:   { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 7, resonance: 8, ending: 7, voice: 9 },
  59:   { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  82:   { prose: 9, characters: 10, plot: 8, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  87:   { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  89:   { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9 },
  97:   { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  100:  { prose: 10, characters: 6, plot: 2, pacing: 1, ideas: 10, resonance: 9, ending: 7, voice: 10 },
  103:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  105:  { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 10, voice: 10 },
  114:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8 },
  122:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 10, ending: 9, voice: 9 },
  125:  { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 7, voice: 10 },
  128:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  132:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  135:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 10, ending: 9, voice: 9 },
  142:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 8 },
  146:  { prose: 9, characters: 10, plot: 6, pacing: 5, ideas: 8, resonance: 10, ending: 8, voice: 9 },
  155:  { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  160:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  163:  { prose: 10, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 10, ending: 10, voice: 9 },
  195:  { prose: 10, characters: 10, plot: 8, pacing: 4, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  207:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 10 },
  217:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  222:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 10, ending: 9, voice: 8 },
  223:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 },
  227:  { prose: 8, characters: 10, plot: 7, pacing: 5, ideas: 8, resonance: 10, ending: 9, voice: 8 },
  233:  { prose: 10, characters: 10, plot: 6, pacing: 3, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  236:  { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  240:  { prose: 8, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 7 },
  248:  { prose: 9, characters: 9, plot: 9, pacing: 6, ideas: 9, resonance: 10, ending: 10, voice: 8 },
  256:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  260:  { prose: 10, characters: 6, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 },
  270:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  284:  { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },

  // === FANTASY (15) ===
  70:   { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 6 },
  92:   { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 },
  131:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 9, worldBuilding: 8, magicSystem: 7 },
  189:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 9 },
  202:  { prose: 8, characters: 10, plot: 9, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 7 },
  209:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, worldBuilding: 8, magicSystem: 7 },
  214:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 10, ending: 9, voice: 8, worldBuilding: 9, magicSystem: 8 },
  280:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 },
  315:  { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 },
  344:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 9, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 },
  364:  { prose: 7, characters: 9, plot: 9, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 8, worldBuilding: 8, magicSystem: 7 },
  372:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 7, magicSystem: 7 },
  401:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 },
  410:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 10, voice: 8, worldBuilding: 10, magicSystem: 9 },
  416:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 8, worldBuilding: 8, magicSystem: 8 },

  // === SCI-FI (15) ===
  1:    { prose: 6, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 6, worldBuilding: 9, speculativeRigor: 9 },
  11:   { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 9 },
  22:   { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 7 },
  30:   { prose: 5, characters: 7, plot: 8, pacing: 9, ideas: 8, resonance: 8, ending: 8, voice: 7, worldBuilding: 7, speculativeRigor: 10 },
  45:   { prose: 7, characters: 6, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 10 },
  138:  { prose: 8, characters: 8, plot: 6, pacing: 8, ideas: 9, resonance: 10, ending: 7, voice: 10, worldBuilding: 8, speculativeRigor: 4 },
  150:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 10, ending: 9, voice: 8, worldBuilding: 8, speculativeRigor: 6 },
  177:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 8 },
  218:  { prose: 8, characters: 6, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 },
  242:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8, worldBuilding: 10, speculativeRigor: 8 },
  267:  { prose: 9, characters: 6, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
  298:  { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 9, worldBuilding: 10, speculativeRigor: 6 },
  307:  { prose: 8, characters: 7, plot: 5, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 7, speculativeRigor: 6 },
  313:  { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 7, worldBuilding: 8, speculativeRigor: 8 },
  314:  { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 },

  // === MYSTERY (10) ===
  1137: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, puzzle: 6, stakes: 7 },
  1278: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, puzzle: 6, stakes: 7 },
  1952: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 8, stakes: 5 },
  2056: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 6 },
  2059: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 6, resonance: 8, ending: 7, voice: 10, puzzle: 7, stakes: 5 },
  2646: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, puzzle: 7, stakes: 7 },
  2650: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 7, puzzle: 7, stakes: 8 },
  2689: { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 8 },
  2715: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, puzzle: 6, stakes: 8 },
  2723: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 6, stakes: 8 },

  // === THRILLER (10) ===
  926:  { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 8, voice: 6, stakes: 8, twists: 8 },
  928:  { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 8 },
  1133: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 9 },
  1153: { prose: 6, characters: 6, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 8, voice: 6, stakes: 8, twists: 9 },
  1241: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 },
  1243: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 6, stakes: 9, twists: 6 },
  1247: { prose: 5, characters: 6, plot: 7, pacing: 9, ideas: 5, resonance: 6, ending: 7, voice: 5, stakes: 9, twists: 6 },
  1250: { prose: 5, characters: 6, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 8, voice: 5, stakes: 9, twists: 7 },
  1252: { prose: 5, characters: 7, plot: 8, pacing: 9, ideas: 4, resonance: 6, ending: 7, voice: 5, stakes: 9, twists: 6 },
  1254: { prose: 5, characters: 6, plot: 7, pacing: 9, ideas: 4, resonance: 6, ending: 6, voice: 5, stakes: 8, twists: 6 },

  // === HORROR (8) ===
  1986: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, atmosphere: 9, dread: 8 },
  2484: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 9, ending: 8, voice: 7, atmosphere: 8, dread: 10 },
  2486: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 5, voice: 6, atmosphere: 7, dread: 8 },
  2488: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 6, voice: 7, atmosphere: 8, dread: 7 },
  3351: { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, atmosphere: 9, dread: 9 },
  3711: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 8, voice: 6, atmosphere: 7, dread: 7 },
  4056: { prose: 5, characters: 7, plot: 8, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 7, atmosphere: 9, dread: 8 },
  5093: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, atmosphere: 9, dread: 9 },

  // === NON-FICTION (7) ===
  178:  { prose: 9, characters: 2, plot: 1, pacing: 4, ideas: 10, resonance: 10, ending: 7, voice: 10, argument: 10, researchRigor: 6, access: 5 },
  225:  { prose: 8, characters: 4, plot: 3, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 8, argument: 10, researchRigor: 10, access: 5 },
  341:  { prose: 7, characters: 3, plot: 2, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 8, argument: 10, researchRigor: 10, access: 4 },
  502:  { prose: 7, characters: 3, plot: 2, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 8, argument: 9, researchRigor: 6, access: 5 },
  503:  { prose: 8, characters: 4, plot: 2, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 9, argument: 10, researchRigor: 9, access: 6 },
  1286: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9, argument: 9, researchRigor: 10, access: 9 },
  1288: { prose: 8, characters: 4, plot: 4, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 8, researchRigor: 8, access: 10 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-004 ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

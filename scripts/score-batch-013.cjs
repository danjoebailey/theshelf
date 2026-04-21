// score-batch-013 — 155 books, expanding to T1 #2 in active buckets
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (60) ===
  6055: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8 },
  6061: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  6074: { prose: 10, characters: 8, plot: 4, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 10 },
  6095: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 },
  6109: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  6157: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 9 },
  6164: { prose: 9, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  6197: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7 },
  6214: { prose: 9, characters: 4, plot: 1, pacing: 4, ideas: 8, resonance: 9, ending: 7, voice: 9 },
  6311: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 9 },
  6317: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8 },
  6429: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 },
  6943: { prose: 7, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 7 },
  7071: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7081: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  7084: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  7087: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 10 },
  7090: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  7093: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  7099: { prose: 10, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  7102: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  7105: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7108: { prose: 8, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  7112: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8 },
  7126: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  7133: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7138: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  7140: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9 },
  7144: { prose: 9, characters: 8, plot: 5, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7157: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  7160: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  7171: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 10 },
  7220: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  7227: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  7230: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7234: { prose: 9, characters: 9, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  7243: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7248: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7251: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  7306: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 8, voice: 8 },
  7502: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 },
  7584: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7590: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7602: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 7 },
  7611: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 7 },
  7615: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  7621: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  7785: { prose: 6, characters: 8, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 8 },
  7791: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 8 },
  7798: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7 },
  7833: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 8, ending: 7, voice: 7 },
  7842: { prose: 6, characters: 8, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7 },
  7854: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  7871: { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7 },
  7874: { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7 },
  7924: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  7945: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  7949: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  7951: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  7959: { prose: 10, characters: 9, plot: 5, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 9 },

  // === FANTASY (25) ===
  7559: { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 7 },
  8097: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 9 },
  8104: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 9 },
  9400: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 7, magicSystem: 0 },
  9453: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 8, magicSystem: 6 },
  71:   { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 6 },
  93:   { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 },
  190:  { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 9 },
  204:  { prose: 8, characters: 10, plot: 10, pacing: 7, ideas: 9, resonance: 10, ending: 10, voice: 8, worldBuilding: 10, magicSystem: 7 },
  210:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 },
  215:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9, worldBuilding: 9, magicSystem: 7 },
  281:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 },
  345:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 },
  365:  { prose: 7, characters: 9, plot: 9, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 8, worldBuilding: 8, magicSystem: 7 },
  373:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 7, magicSystem: 7 },
  411:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 10, voice: 8, worldBuilding: 10, magicSystem: 9 },
  415:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, worldBuilding: 8, magicSystem: 7 },
  422:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 10, magicSystem: 8 },
  455:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 8 },
  482:  { prose: 8, characters: 10, plot: 7, pacing: 5, ideas: 7, resonance: 9, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 },
  499:  { prose: 7, characters: 9, plot: 9, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 8, worldBuilding: 9, magicSystem: 6 },
  511:  { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9, worldBuilding: 10, magicSystem: 8 },
  518:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 9, magicSystem: 8 },
  661:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 9 },

  // === SCI-FI (20) ===
  2:    { prose: 6, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 6, worldBuilding: 9, speculativeRigor: 9 },
  14:   { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 9 },
  47:   { prose: 7, characters: 6, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 7, worldBuilding: 9, speculativeRigor: 9 },
  139:  { prose: 8, characters: 8, plot: 6, pacing: 8, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 8, speculativeRigor: 4 },
  219:  { prose: 8, characters: 6, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 },
  243:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 8, worldBuilding: 10, speculativeRigor: 8 },
  299:  { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 6 },
  347:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 10, voice: 9, worldBuilding: 8, speculativeRigor: 5 },
  352:  { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 7, worldBuilding: 10, speculativeRigor: 10 },
  356:  { prose: 9, characters: 7, plot: 7, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 7, speculativeRigor: 5 },
  418:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 9 },
  430:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 10, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 7 },
  437:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 7, worldBuilding: 9, speculativeRigor: 8 },
  450:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 },
  473:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 },
  486:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, speculativeRigor: 7 },
  496:  { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 },
  505:  { prose: 9, characters: 6, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 8, speculativeRigor: 7 },
  557:  { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 7, worldBuilding: 10, speculativeRigor: 9 },
  // Note: ID 254 (I, Robot) already in batch 4 — skipping to avoid duplicate

  // === MYSTERY (10) ===
  6931: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 7, stakes: 6 },
  7312: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, puzzle: 7, stakes: 7 },
  7749: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 6 },
  7756: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 6 },
  7989: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8, puzzle: 7, stakes: 7 },
  8043: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 6, stakes: 8 },
  8054: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9, puzzle: 7, stakes: 7 },
  9190: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 8, puzzle: 6, stakes: 6 },
  9218: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 7, stakes: 6 },
  646:  { prose: 8, characters: 8, plot: 9, pacing: 7, ideas: 7, resonance: 9, ending: 10, voice: 8, puzzle: 10, stakes: 7 },

  // === THRILLER (10) ===
  5652: { prose: 6, characters: 7, plot: 8, pacing: 9, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 7 },
  5700: { prose: 5, characters: 6, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 5, stakes: 8, twists: 6 },
  5704: { prose: 5, characters: 6, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 5, stakes: 8, twists: 6 },
  5725: { prose: 7, characters: 7, plot: 8, pacing: 9, ideas: 7, resonance: 8, ending: 8, voice: 7, stakes: 9, twists: 8 },
  5831: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },
  5904: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, stakes: 9, twists: 7 },
  5907: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 7 },
  5911: { prose: 5, characters: 6, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 5, stakes: 8, twists: 6 },
  6805: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 8, ending: 8, voice: 6, stakes: 9, twists: 8 },
  6915: { prose: 8, characters: 8, plot: 9, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 7, stakes: 9, twists: 9 },

  // === HORROR (10) ===
  634:  { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 10, ending: 8, voice: 9, atmosphere: 10, dread: 10 },
  1113: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, atmosphere: 9, dread: 9 },
  1271: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, atmosphere: 10, dread: 9 },
  1275: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 7, atmosphere: 9, dread: 10 },
  1967: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10, atmosphere: 10, dread: 9 },
  1971: { prose: 7, characters: 5, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9, atmosphere: 10, dread: 10 },
  1974: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 8, atmosphere: 9, dread: 9 },
  1977: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, atmosphere: 9, dread: 10 },
  1987: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, atmosphere: 9, dread: 8 },
  1991: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8, atmosphere: 10, dread: 9 },

  // === NON-FICTION (10) ===
  36:   { prose: 10, characters: 4, plot: 2, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10, argument: 7, researchRigor: 5, access: 7 },
  55:   { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 8, argument: 9, researchRigor: 10, access: 8 },
  78:   { prose: 9, characters: 4, plot: 3, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 9, access: 8 },
  179:  { prose: 10, characters: 6, plot: 3, pacing: 4, ideas: 10, resonance: 10, ending: 7, voice: 10, argument: 10, researchRigor: 5, access: 5 },
  226:  { prose: 8, characters: 4, plot: 2, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 8, argument: 10, researchRigor: 9, access: 5 },
  305:  { prose: 10, characters: 6, plot: 3, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 9 },
  330:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 10, ending: 9, voice: 9, argument: 8, researchRigor: 9, access: 10 },
  342:  { prose: 8, characters: 3, plot: 2, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 8, argument: 10, researchRigor: 6, access: 7 },
  435:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 9 },
  595:  { prose: 8, characters: 9, plot: 5, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 9, argument: 8, researchRigor: 8, access: 10 },

  // === ROMANCE (10) ===
  4668: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 8, voice: 6, chemistry: 9, tension: 8, heaPayoff: 9 },
  4671: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 9, tension: 8, heaPayoff: 9 },
  4673: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 9, tension: 8, heaPayoff: 9 },
  4696: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 8, chemistry: 1, tension: 9, heaPayoff: 5 },
  4888: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 7, heaPayoff: 9 },
  4892: { prose: 7, characters: 8, plot: 6, pacing: 6, ideas: 7, resonance: 8, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  4895: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  4907: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  4913: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  4924: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, chemistry: 9, tension: 8, heaPayoff: 7 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-013 ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

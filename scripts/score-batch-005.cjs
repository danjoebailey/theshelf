// score-batch-005 — 100 more T1 topRank=1 canonical books
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (35) ===
  288:  { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 10, resonance: 10, ending: 8, voice: 10 },
  291:  { prose: 9, characters: 10, plot: 8, pacing: 7, ideas: 7, resonance: 10, ending: 9, voice: 9 },
  301:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 10 },
  316:  { prose: 9, characters: 8, plot: 9, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  319:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  323:  { prose: 9, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  331:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8 },
  334:  { prose: 10, characters: 5, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 },
  338:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 10, voice: 9 },
  340:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  348:  { prose: 10, characters: 10, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 10, voice: 9 },
  367:  { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 10, voice: 9 },
  375:  { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  377:  { prose: 10, characters: 10, plot: 4, pacing: 1, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  385:  { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  388:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  392:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  395:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  399:  { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 9, voice: 9 },
  402:  { prose: 10, characters: 8, plot: 7, pacing: 4, ideas: 8, resonance: 10, ending: 9, voice: 9 },
  405:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 },
  406:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  427:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  428:  { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  438:  { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 10 },
  443:  { prose: 8, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 10, ending: 8, voice: 9 },
  469:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 8 },
  471:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 8 },
  488:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 8 },
  489:  { prose: 7, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 7 },
  492:  { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  500:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 10, voice: 9 },
  512:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  515:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  524:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 8 },

  // === FANTASY (15) ===
  421:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 },
  446:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9, worldBuilding: 8, magicSystem: 7 },
  454:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 8 },
  467:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 10, ending: 9, voice: 8, worldBuilding: 9, magicSystem: 5 },
  481:  { prose: 8, characters: 10, plot: 7, pacing: 5, ideas: 7, resonance: 9, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 },
  487:  { prose: 8, characters: 7, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 7 },
  498:  { prose: 7, characters: 9, plot: 9, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 8, worldBuilding: 9, magicSystem: 6 },
  507:  { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 7 },
  519:  { prose: 8, characters: 9, plot: 8, pacing: 8, ideas: 8, resonance: 10, ending: 9, voice: 10, worldBuilding: 9, magicSystem: 8 },
  551:  { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 },
  660:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 10, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 9 },
  690:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 8, ending: 8, voice: 6, worldBuilding: 7, magicSystem: 6 },
  697:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 7 },
  703:  { prose: 7, characters: 9, plot: 6, pacing: 7, ideas: 7, resonance: 10, ending: 8, voice: 8, worldBuilding: 7, magicSystem: 6 },
  714:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 },

  // === SCI-FI (15) ===
  351:  { prose: 7, characters: 6, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 9 },
  355:  { prose: 9, characters: 7, plot: 6, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 7, speculativeRigor: 5 },
  360:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 6, worldBuilding: 10, speculativeRigor: 9 },
  379:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
  393:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 8, worldBuilding: 7, speculativeRigor: 5 },
  414:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 },
  417:  { prose: 7, characters: 7, plot: 8, pacing: 9, ideas: 10, resonance: 9, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 },
  429:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 10, ending: 9, voice: 8, worldBuilding: 8, speculativeRigor: 5 },
  436:  { prose: 7, characters: 8, plot: 9, pacing: 8, ideas: 9, resonance: 10, ending: 10, voice: 7, worldBuilding: 8, speculativeRigor: 8 },
  440:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 10, speculativeRigor: 9 },
  449:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 8, worldBuilding: 8, speculativeRigor: 7 },
  475:  { prose: 7, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 },
  477:  { prose: 7, characters: 7, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 7, worldBuilding: 9, speculativeRigor: 9 },
  495:  { prose: 10, characters: 7, plot: 5, pacing: 3, ideas: 10, resonance: 8, ending: 6, voice: 10, worldBuilding: 10, speculativeRigor: 6 },
  504:  { prose: 9, characters: 6, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 9, voice: 9, worldBuilding: 10, speculativeRigor: 9 },

  // === MYSTERY (8) ===
  2831: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 6 },
  2847: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, puzzle: 6, stakes: 9 },
  3876: { prose: 6, characters: 8, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 8, puzzle: 6, stakes: 7 },
  4459: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 8 },
  4462: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 7, stakes: 8 },
  4471: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  4511: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 9, ending: 8, voice: 8, puzzle: 8, stakes: 8 },
  4518: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 6 },

  // === THRILLER (8) ===
  2060: { prose: 6, characters: 7, plot: 8, pacing: 9, ideas: 6, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 7 },
  2061: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 8, ending: 8, voice: 7, stakes: 9, twists: 8 },
  2063: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 },
  2064: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 8, voice: 6, stakes: 8, twists: 8 },
  2066: { prose: 7, characters: 8, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, stakes: 9, twists: 8 },
  2148: { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 7, stakes: 9, twists: 8 },
  2155: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 8, voice: 6, stakes: 8, twists: 9 },
  2159: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 8 },

  // === HORROR (5) ===
  5951: { prose: 9, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, atmosphere: 10, dread: 10 },
  6131: { prose: 10, characters: 5, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, atmosphere: 10, dread: 10 },
  6134: { prose: 9, characters: 6, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9, atmosphere: 10, dread: 10 },
  6137: { prose: 9, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9, atmosphere: 10, dread: 9 },
  6138: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9, atmosphere: 9, dread: 8 },

  // === NON-FICTION (7) ===
  1292: { prose: 6, characters: 4, plot: 3, pacing: 7, ideas: 7, resonance: 7, ending: 6, voice: 7, argument: 6, researchRigor: 4, access: 9 },
  2514: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 8, argument: 9, researchRigor: 10, access: 8 },
  2926: { prose: 9, characters: 6, plot: 3, pacing: 4, ideas: 9, resonance: 10, ending: 8, voice: 9, argument: 9, researchRigor: 7, access: 7 },
  2929: { prose: 8, characters: 7, plot: 3, pacing: 7, ideas: 7, resonance: 9, ending: 6, voice: 10, argument: 5, researchRigor: 3, access: 10 },
  2934: { prose: 8, characters: 6, plot: 3, pacing: 7, ideas: 9, resonance: 8, ending: 6, voice: 9, argument: 8, researchRigor: 6, access: 9 },
  2936: { prose: 8, characters: 6, plot: 3, pacing: 7, ideas: 7, resonance: 8, ending: 6, voice: 10, argument: 5, researchRigor: 3, access: 10 },
  2942: { prose: 9, characters: 5, plot: 2, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 9, argument: 9, researchRigor: 7, access: 8 },

  // === ROMANCE / YA (7) ===
  742:  { prose: 5, characters: 7, plot: 8, pacing: 9, ideas: 6, resonance: 8, ending: 8, voice: 6, chemistry: 6, tension: 8, heaPayoff: 5 },
  852:  { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 6, chemistry: 9, tension: 8, heaPayoff: 9 },
  953:  { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 8, heaPayoff: 5 },
  967:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9, chemistry: 3, tension: 8, heaPayoff: 3 },
  970:  { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 },
  1122: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 8 },
  1134: { prose: 6, characters: 8, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 7, heaPayoff: 9 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-005 ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

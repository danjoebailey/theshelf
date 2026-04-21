// score-batch-012 — 126 books continuing T1 #1 sweep
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (60) ===
  3371: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  3374: { prose: 9, characters: 7, plot: 4, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  3378: { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 10 },
  3381: { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 9 },
  3663: { prose: 6, characters: 7, plot: 5, pacing: 6, ideas: 6, resonance: 7, ending: 6, voice: 8 },
  3706: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 7 },
  3717: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 8, voice: 8 },
  3724: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 10, ending: 8, voice: 10 },
  3728: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10 },
  3733: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 10 },
  3738: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  3742: { prose: 9, characters: 9, plot: 5, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  3758: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  3766: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  3769: { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  3779: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  3783: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  3872: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 5 },
  3896: { prose: 5, characters: 6, plot: 7, pacing: 8, ideas: 4, resonance: 7, ending: 7, voice: 6 },
  3900: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  3954: { prose: 10, characters: 7, plot: 4, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 10 },
  3985: { prose: 8, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  4013: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  4015: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  4018: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 7 },
  4063: { prose: 7, characters: 8, plot: 6, pacing: 6, ideas: 6, resonance: 8, ending: 7, voice: 8 },
  4243: { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 10, ending: 8, voice: 10 },
  4739: { prose: 10, characters: 7, plot: 4, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 },
  4861: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 10, ending: 8, voice: 10 },
  5113: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8 },
  5246: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  5350: { prose: 9, characters: 7, plot: 4, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 },
  5355: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 },
  5403: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 },
  5418: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 7 },
  5482: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  5489: { prose: 8, characters: 9, plot: 6, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10 },
  5504: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 7 },
  5509: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  5514: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 10 },
  5524: { prose: 9, characters: 9, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  5569: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  5572: { prose: 6, characters: 8, plot: 9, pacing: 8, ideas: 6, resonance: 8, ending: 8, voice: 7 },
  5589: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 7 },
  5603: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  5787: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  5791: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7 },
  5798: { prose: 6, characters: 7, plot: 6, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7 },
  5947: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 10, voice: 9 },
  5952: { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 10, voice: 8 },
  5969: { prose: 9, characters: 7, plot: 4, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 },
  5984: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 10 },
  5989: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  6008: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  6015: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  6021: { prose: 9, characters: 8, plot: 5, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 },
  6025: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  6028: { prose: 9, characters: 7, plot: 4, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 },
  6036: { prose: 9, characters: 8, plot: 5, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  6039: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },

  // === FANTASY (25) ===
  6148: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 },
  6152: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 },
  6252: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 7 },
  6255: { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 8, worldBuilding: 7, magicSystem: 7 },
  6260: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  6263: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  6267: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  6269: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  6272: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  6275: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, worldBuilding: 7, magicSystem: 7 },
  6278: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 8, magicSystem: 5 },
  6281: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 },
  6285: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },
  6287: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 },
  6288: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 },
  6291: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 6 },
  6300: { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 6 },
  6996: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },
  7000: { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 },
  7025: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 6 },
  7031: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 },
  7401: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 7, resonance: 9, ending: 7, voice: 8, worldBuilding: 6, magicSystem: 0 },
  7493: { prose: 10, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 7 },
  7506: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 7 },
  7512: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 },

  // === SCI-FI (1) ===
  7486: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 9, worldBuilding: 8, speculativeRigor: 7 },

  // === MYSTERY (10) ===
  6851: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 8, puzzle: 6, stakes: 8 },
  6861: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 },
  6869: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, puzzle: 8, stakes: 6 },
  6871: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 6 },
  6880: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 5 },
  6883: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, puzzle: 7, stakes: 6 },
  6887: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 6, stakes: 6 },
  6901: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  6905: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  6919: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, puzzle: 6, stakes: 5 },

  // === THRILLER (10) ===
  5358: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },
  5362: { prose: 7, characters: 7, plot: 9, pacing: 8, ideas: 7, resonance: 7, ending: 8, voice: 7, stakes: 9, twists: 8 },
  5375: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 9 },
  5382: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },
  5390: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },
  5397: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },
  5535: { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 7, voice: 7, stakes: 9, twists: 8 },
  5546: { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 8 },
  5615: { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9, stakes: 10, twists: 7 },
  5621: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },

  // === ROMANCE (10) ===
  3826: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, chemistry: 7, tension: 6, heaPayoff: 5 },
  3829: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9, chemistry: 3, tension: 7, heaPayoff: 5 },
  4290: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, chemistry: 9, tension: 7, heaPayoff: 9 },
  4295: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  4555: { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 9, ending: 8, voice: 9, chemistry: 9, tension: 7, heaPayoff: 9 },
  4650: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 6, ending: 7, voice: 5, chemistry: 8, tension: 7, heaPayoff: 9 },
  4655: { prose: 6, characters: 7, plot: 6, pacing: 6, ideas: 5, resonance: 7, ending: 8, voice: 6, chemistry: 7, tension: 6, heaPayoff: 8 },
  4656: { prose: 6, characters: 7, plot: 6, pacing: 6, ideas: 5, resonance: 7, ending: 8, voice: 6, chemistry: 8, tension: 6, heaPayoff: 9 },
  4659: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 8, ending: 8, voice: 8, chemistry: 9, tension: 7, heaPayoff: 9 },
  4665: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 6, chemistry: 9, tension: 7, heaPayoff: 8 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-012 ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

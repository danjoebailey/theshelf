// score-batch-011 — 124 books across all buckets, full-pace
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY (50) ===
  2492: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7 },
  2497: { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 7 },
  2503: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 7 },
  2507: { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 8 },
  2510: { prose: 7, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 7 },
  2749: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 },
  2759: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 },
  2793: { prose: 10, characters: 7, plot: 4, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 },
  2803: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 },
  2862: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 8 },
  2904: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  2909: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  2922: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9 },
  2959: { prose: 9, characters: 9, plot: 9, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  2962: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  2971: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  2977: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  2981: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  2989: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  2998: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  3044: { prose: 10, characters: 5, plot: 1, pacing: 5, ideas: 9, resonance: 10, ending: 7, voice: 10 },
  3046: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  3049: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  3053: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 9 },
  3056: { prose: 10, characters: 8, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  3180: { prose: 9, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  3184: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  3196: { prose: 9, characters: 7, plot: 8, pacing: 9, ideas: 10, resonance: 10, ending: 8, voice: 10 },
  3199: { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 8 },
  3202: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 8 },
  3205: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 10, voice: 9 },
  3210: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 9, voice: 9 },
  3215: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  3217: { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 8 },
  3225: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  3228: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 10, voice: 9 },
  3232: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 },
  3236: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 10 },
  3243: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 10, ending: 9, voice: 10 },
  3301: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  3309: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  3324: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 8, voice: 9 },
  3328: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 9 },
  3333: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  3337: { prose: 10, characters: 9, plot: 5, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 },
  3340: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 9 },
  3348: { prose: 9, characters: 7, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10 },
  3354: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9 },
  3363: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 8, voice: 9 },
  3369: { prose: 9, characters: 8, plot: 5, pacing: 4, ideas: 8, resonance: 10, ending: 8, voice: 9 },

  // === FANTASY (25) ===
  2169: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 },
  2180: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, worldBuilding: 7, magicSystem: 6 },
  2336: { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 6 },
  2339: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 },
  2344: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 },
  2349: { prose: 6, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 6 },
  2356: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 7, magicSystem: 5 },
  2360: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 },
  2386: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 },
  2529: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 },
  3248: { prose: 5, characters: 6, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 5, worldBuilding: 8, magicSystem: 7 },
  3258: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },
  3806: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  3813: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 },
  3817: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  4038: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, worldBuilding: 8, magicSystem: 7 },
  4308: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 8, magicSystem: 0 },
  4660: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 },
  5267: { prose: 4, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 6, ending: 6, voice: 5, worldBuilding: 6, magicSystem: 6 },
  5269: { prose: 5, characters: 6, plot: 7, pacing: 8, ideas: 4, resonance: 7, ending: 7, voice: 5, worldBuilding: 7, magicSystem: 6 },
  5277: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 9, voice: 8, worldBuilding: 9, magicSystem: 5 },
  5440: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, worldBuilding: 7, magicSystem: 6 },
  5452: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 6 },
  5458: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },
  5885: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 },

  // === SCI-FI (15) ===
  2661: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
  3254: { prose: 6, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 6, worldBuilding: 8, speculativeRigor: 8 },
  5959: { prose: 6, characters: 8, plot: 8, pacing: 9, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 5 },
  6050: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, worldBuilding: 8, speculativeRigor: 7 },
  6129: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 8 },
  6293: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 6 },
  6949: { prose: 7, characters: 6, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 9 },
  6953: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 6 },
  6963: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 6 },
  6966: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 },
  6991: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 9 },
  7003: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 },
  7008: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 9 },
  7018: { prose: 9, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 },
  7021: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 8, worldBuilding: 7, speculativeRigor: 7 },

  // === MYSTERY (10) ===
  5929: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, puzzle: 6, stakes: 4 },
  5932: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, puzzle: 6, stakes: 4 },
  5934: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 6, voice: 7, puzzle: 5, stakes: 4 },
  5939: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, puzzle: 6, stakes: 4 },
  6230: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, puzzle: 6, stakes: 4 },
  6471: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, puzzle: 7, stakes: 8 },
  6530: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 6, voice: 7, puzzle: 6, stakes: 4 },
  6533: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 },
  6818: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, puzzle: 6, stakes: 7 },
  6831: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, puzzle: 6, stakes: 8 },

  // === THRILLER (10) ===
  5180: { prose: 6, characters: 7, plot: 8, pacing: 9, ideas: 5, resonance: 7, ending: 8, voice: 6, stakes: 9, twists: 8 },
  5181: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 6, resonance: 7, ending: 8, voice: 6, stakes: 8, twists: 8 },
  5182: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 8 },
  5212: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 8 },
  5225: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 7, stakes: 9, twists: 7 },
  5251: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 8 },
  5280: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 7 },
  5290: { prose: 6, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 6, stakes: 9, twists: 7 },
  5312: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 7 },
  5322: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 7, ending: 7, voice: 6, stakes: 8, twists: 8 },

  // === NON-FICTION (4) ===
  4280: { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, argument: 7, researchRigor: 9, access: 9 },
  4966: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 8, argument: 9, researchRigor: 9, access: 8 },
  6079: { prose: 9, characters: 7, plot: 4, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, argument: 8, researchRigor: 8, access: 9 },
  7342: { prose: 8, characters: 4, plot: 3, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 8, argument: 10, researchRigor: 8, access: 8 },

  // === ROMANCE (10) ===
  2550: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 8, ending: 8, voice: 8, chemistry: 9, tension: 7, heaPayoff: 9 },
  2553: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 8, tension: 7, heaPayoff: 9 },
  2556: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, chemistry: 9, tension: 7, heaPayoff: 9 },
  3026: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 10, chemistry: 4, tension: 7, heaPayoff: 3 },
  3129: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 7, chemistry: 8, tension: 7, heaPayoff: 9 },
  3133: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 8, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  3136: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 7, heaPayoff: 9 },
  3140: { prose: 7, characters: 8, plot: 6, pacing: 7, ideas: 6, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 8, heaPayoff: 9 },
  3143: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 7, ending: 8, voice: 7, chemistry: 9, tension: 7, heaPayoff: 9 },
  3824: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 9, chemistry: 4, tension: 7, heaPayoff: 5 },
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const entries = Object.entries(batch);
console.log(`\n=== score-batch-011 ===\nBooks: ${entries.length}\nMode: ${apply ? "APPLY" : "DRY RUN"}`);

if (apply) {
  let updated = 0, added = 0;
  for (const [id, scores] of entries) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else console.log("Dry run. Re-run with --apply.");

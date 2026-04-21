// Batch 68 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === FANTASY ===
  12861: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Arzach
  12862: { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Incal
  12863: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Airtight Garage
  12864: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 7 }, // My Favorite Thing Is Monsters Book One
  12865: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Book Two
  14695: { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Grey Bastards

  // === MYSTERY ===
  8930:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Potshot
  8931:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Back Story
  8932:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // School Days
  8933:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Hundred-Dollar Baby
  8934:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Fearless Jones
  8940:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Burglar in the Library
  8941:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Burglar on the Prowl
  8942:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Drop of the Hard Stuff
  9042:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Give unto Others
  9048:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Complaints
  9071:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Blue-Eyed Devil
  9072:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Sixkill
  9073:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Impossible Dead
  9074:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Event in Autumn
  9078:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Sicilian Method
  9079:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Trace Elements
  9083:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 7, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Mrs McGinty's Dead
  9086:  { prose: 8, characters: 8, plot: 6, pacing: 7, ideas: 7, resonance: 7, ending: 5, voice: 8, puzzle: 7, stakes: 6 }, // Colorado Kid
  9111:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 7, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Death in the Clouds
  11437: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Police at the Funeral
  11438: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Sweet Danger
  11439: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 9, stakes: 8 }, // Tiger in the Smoke
  11445: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Cold Cold Ground
  11446: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // I Hear the Sirens in the Street
  11447: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // In the Morning I'll Be Gone
  12215: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, puzzle: 8, stakes: 7, periodAuthenticity: 9, researchIntegration: 8 },
  12217: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, puzzle: 8, stakes: 7 }, // Himself
  12354: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 8, ending: 8, voice: 10, puzzle: 9, stakes: 8, periodAuthenticity: 10, researchIntegration: 9 },
  12491: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7, periodAuthenticity: 9, researchIntegration: 8 },
  12492: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7, periodAuthenticity: 9, researchIntegration: 8 },

  // === THRILLER ===
  4377:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Winner
  4378:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Simple Truth
  4411:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Eyes of Darkness
  4436:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Body Double
  4450:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Storm Prey
  4451:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Field of Prey
  4452:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Ocean Prey
  4458:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Highway — Box
  4469:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Distant Echo
  4728:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Walk the Wire
  4731:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Match
  4887:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 8, resonance: 6, ending: 6, voice: 7, stakes: 8, twists: 7 }, // Eruption
  5237:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // English Spy
  5245:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Collector — Silva
  5400:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Closer Than You Think
  5401:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Say No More
  5402:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Say You're Sorry
  5470:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 8 }, // Boyfriend
  5472:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Exchange
  5473:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Camino Ghosts
  5645:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Worst Case Scenario
  6341:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Reliquary
  6561:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Say Goodbye
  6562:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Cold Blooded
  7439:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Bone Hacker
  7441:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Shadow State
  7443:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // 24th Hour
  7444:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Judgment Prey
  7445:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Toxic Prey
  7736:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // 12 Months to Live
  8261:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Keeper — Baldacci
  8317:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Last Mile
  8465:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Alone in the Dark
  8466:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Edge of Darkness
  8467:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Into the Dark
  8476:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Iron Orchid
  8484:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Taking Eve
  8485:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Bombshell — Coulter
  8486:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Power Play
  8487:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Insidious

  // === ROMANCE (adult only) ===
  10970: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Bonds of Justice
  10971: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Play of Passion
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-068 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

if (apply) {
  for (const [id, scores] of Object.entries(batch)) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else {
  console.log("Dry run — pass --apply to write.");
}

// Batch 63 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === FANTASY ===
  11835: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Dreadnought
  11836: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Ganymede
  11842: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Affinity Bridge
  11843: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Osiris Ritual
  11844: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Ghosts of Manhattan
  11845: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // London Falling
  11846: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Severed Streets
  11847: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Who Killed Sherlock Holmes
  11848: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Bitter Seeds
  11849: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Coldest War
  11850: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Necessary Evil
  11858: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Sword of Kaigen
  11859: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Blood Over Bright Haven
  11860: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Ruin of Kings
  11861: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Name of All Things
  11862: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Memory of Souls
  11863: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Age of Assassins
  11864: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Blood of Assassins
  11865: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // King of Assassins
  8288:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Awakening — Roberts
  8289:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Becoming
  8290:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Choice
  8325:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Disappearance of Winter's Daughter
  8437:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Magic Gifts
  8456:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Dream Country
  8457:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Game of You
  8458:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Fables & Reflections
  8459:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // World's End
  8460:  { prose: 10, characters: 10, plot: 9, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Kindly Ones
  11379: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Night's Master
  11385: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Banewreaker

  // === MYSTERY ===
  9047:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Wait for Signs
  9069:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // All the Flowers Are Dying
  9070:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Hope to Die — Block
  9075:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Reykjavik Nights
  9076:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // In the Darkness
  9077:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 9, stakes: 7 }, // Climate of Fear
  9080:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Song for the Dying
  9084:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 7, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Lord Edgware Dies
  9109:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Towards Zero
  9110:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Man in the Brown Suit
  9170:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Children of the Storm
  9171:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Guardian of the Horizon
  9172:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Serpent on the Crown
  9173:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Tomb of the Golden Bird
  9174:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // River in the Sky

  // === THRILLER ===
  5223:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Never Tell
  5224:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // One Step Too Far
  5238:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Black Widow
  5239:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // House of Spies
  5240:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Other Woman
  5241:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // New Girl
  5242:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Order
  5243:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Cellist
  5244:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Death in Cornwall
  5287:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Unnatural Exposure
  5288:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Point of Origin
  5289:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Black Notice
  5319:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Conspiracy in Death
  5320:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Loyalty in Death
  5321:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Witness in Death
  5367:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Twelfth Card
  5541:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Lazarus
  5542:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Spider
  5627:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Jefferson Key
  5628:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Columbus Affair

  // === ROMANCE ===
  8408:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Blue Dahlia
  8427:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Twenty Wishes
  8428:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Summer on Blossom Street
  8429:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Hannah's List
  8432:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Love Letters
  8433:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Silver Linings
  8992:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Best of My Love
  9140:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Whiskey Beach
  9141:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Reef — Roberts
  9206:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 5, resonance: 6, ending: 6, voice: 7, chemistry: 7, tension: 7, heaPayoff: 6 }, // Appassionata
  9207:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 5, resonance: 6, ending: 6, voice: 7, chemistry: 7, tension: 7, heaPayoff: 6 }, // Pandora
  9208:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 5, resonance: 6, ending: 6, voice: 7, chemistry: 7, tension: 7, heaPayoff: 6 }, // Wicked!
  9209:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 5, resonance: 6, ending: 6, voice: 7, chemistry: 7, tension: 7, heaPayoff: 6 }, // Jump!
  9210:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 5, resonance: 6, ending: 6, voice: 7, chemistry: 7, tension: 7, heaPayoff: 6 }, // Mount!
  9328:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Italian Matchmaker
  9329:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Affair — Montefiore
  9330:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Summer House
  9349:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Celebration
  9350:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Return to Sender
  9351:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Exclusive
  9352:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Fancy Dancer
  9356:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 8, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Then Came Heaven
  9357:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Small Town Girl
  9358:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // That Camden Summer
  9541:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 7 }, // White Hot — Andrews
  9542:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 7 }, // Wildfire

  // === OTHER ===
  9677:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8 }, // We All Live Here
  9692:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Ever After
  9693:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Undead Pool
  9694:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Witch with No Name
  9695:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // American Demon
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-063 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

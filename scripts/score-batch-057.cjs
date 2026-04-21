// Batch 57 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  13172: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Heart
  13173: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Painting Time
  13174: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  13175: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13176: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // End of Eddy
  13178: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Egoist
  13180: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // New Grub Street
  13181: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Odd Women
  13182: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Erewhon
  13183: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Way of All Flesh
  13184: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Enchanted Wanderer
  13185: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Lady Macbeth of Mtsensk
  13187: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Carmen
  13188: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Letters from My Windmill
  13189: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Tartarin of Tarascon
  13191: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Unter Leuten
  13192: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Before the Feast
  13193: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Where You Come From
  13194: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Capital
  13195: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13196: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13197: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Homecoming
  13200: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Five Women Who Loved Love
  13201: { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Life of an Amorous Woman
  13203: { prose: 10, characters: 10, plot: 9, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  13204: { prose: 10, characters: 10, plot: 9, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Water Margin
  13206: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Strange Tales
  13207: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Manservant and Maidservant
  13208: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // House and Its Head
  13209: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Go-Between
  13211: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Slaves of Solitude
  13212: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Hangover Square
  13213: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Twenty Thousand Streets
  13214: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Weather in the Streets
  13215: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Dusty Answer
  13216: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Loving
  13217: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Concluding
  13218: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Old Wives' Tale
  13219: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Clayhanger
  13220: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Man of Property
  13221: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // In Chancery
  13222: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Towers of Trebizond
  13223: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // World My Wilderness
  13224: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // McTeague
  13225: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13226: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Barren Ground
  13227: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13228: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Maggie
  13229: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Open Boat
  13230: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Oil!
  13232: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Poor White
  13233: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Dark Laughter
  13235: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Serpent and the Rope
  13236: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Untouchable
  13237: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Coolie
  13239: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Great Indian Novel
  13241: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // English, August
  13245: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Strange and Sublime Address
  13246: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Afternoon Raag
  13247: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Joys of Motherhood

  // === FANTASY ===
  9722:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Deadhouse Landing
  9723:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Kellanved's Reach
  9724:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Among Others
  9746:  { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Mythago Wood
  9747:  { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Lavondyss
  9757:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Kushiel's Dart
  9758:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Kushiel's Chosen
  9759:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 8 }, // Kushiel's Avatar
  9760:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Black Sun Rising
  9761:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 10 }, // When True Night Falls
  9762:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Crown of Shadows
  9774:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Deryni Rising
  9775:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Deryni Checkmate
  9776:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // High Deryni
  9858:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Blacktongue Thief
  9859:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Between Two Fires

  // === MYSTERY ===
  3082:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Wrong Side of Goodbye
  3119:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Kingdom of the Blind
  3120:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 8 }, // All the Devils Are Here
  3121:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // World of Curiosities
  3974:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 9, stakes: 7 }, // Uncertain Place
  3975:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Earthly Remains
  4003:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Murder Is Easy
  4004:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Sparkling Cyanide
  4142:  { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Running Grave
  4143:  { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Ink Black Heart
  4155:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 9, stakes: 7 }, // Close to Death
  4329:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Black Box
  4331:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Desert Star
  4357:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Age of Doubt
  4585:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Better Man

  // === THRILLER ===
  11777: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Burning Girls
  11781: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 9 }, // Behind Her Eyes
  11782: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Dead to Her
  11783: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Cross Her Heart
  11866: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Sun Down Motel
  11867: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Book of Cold Cases
  11868: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Broken Girls
  11869: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Murder Road
  11880: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Promise Not to Tell
  11943: { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Stillhouse Lake
  11955: { prose: 9, characters: 9, plot: 9, pacing: 8, ideas: 8, resonance: 8, ending: 9, voice: 9, stakes: 9, twists: 10 }, // Kiss Before Dying
  11956: { prose: 9, characters: 9, plot: 9, pacing: 8, ideas: 9, resonance: 8, ending: 9, voice: 9, stakes: 9, twists: 9 }, // Boys from Brazil
  12020: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 8 }, // Generation Loss
  12070: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, stakes: 8, twists: 8 }, // Six Stories
  12071: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, stakes: 8, twists: 8 }, // Hydra

  // === ROMANCE ===
  5416:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Country Guesthouse
  5417:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Friendship Club
  5428:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Love, Theoretically
  5433:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 7 }, // Radiant Sin
  5434:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 7 }, // Cruel Seduction
  5464:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 5, tension: 7, heaPayoff: 7 }, // Secrets of the Dragon Sanctuary
  5465:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 7, chemistry: 5, tension: 7, heaPayoff: 7 }, // Keys to the Demon Prison

  // === NONFICTION ===
  12887: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 9, access: 8 }, // Anatomy of a Moment
  12888: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 9, access: 8 }, // Impostor
  12959: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, argument: 9, researchRigor: 7, access: 8 }, // On the Road to Babadag
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-057 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

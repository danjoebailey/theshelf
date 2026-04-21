// Batch 56 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  13098: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Bread and Wine
  13099: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Fontamara
  13100: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Conversation in Sicily
  13101: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Women of Messina
  13102: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Neapolitan Chronicles
  13103: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Iguana
  13104: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13105: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Private Affair
  13106: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Beautiful Antonio
  13107: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Late Mattia Pascal
  13108: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // One No One
  13110: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Following Story
  13111: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Rituals
  13112: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Lost Paradise
  13113: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13114: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Discovery of Heaven
  13115: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Siegfried
  13116: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13117: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Beyond Sleep
  13118: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Evenings
  13119: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Parents Worry
  13120: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Black Lake
  13121: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13122: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Hidden Force
  13123: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Eline Vere
  13124: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13125: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Desire
  13126: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Tirza
  13128: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // 1982, Janine
  13129: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Poor Things
  13130: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13131: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Paradise — Kennedy
  13132: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Panopticon
  13134: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Land of Spices
  13136: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Good Behaviour
  13137: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Time After Time
  13138: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Proxopera
  13140: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Langrishe, Go Down
  13142: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Butcher Boy
  13143: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Breakfast on Pluto
  13145: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Solar Storms
  13146: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Bearheart
  13148: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13149: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13150: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13151: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13152: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Fugitive Crosses His Tracks
  13157: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Three Strong Women
  13158: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // My Heart Hemmed In
  13159: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Ladivine
  13160: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 10 },
  13161: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Seventh Function of Language
  13162: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13163: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Vernon Subutex 1
  13164: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Apocalypse Baby
  13166: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13167: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 9 },
  13168: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 9 },
  13169: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Zone
  13170: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Compass

  // === FANTASY ===
  9646:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Dark Mirror
  9649:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Queen Demon
  9650:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Alchemy of Secrets
  9652:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Hemlock & Silver
  9686:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Soul Music
  9687:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Thief of Time
  9710:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Gifts
  9711:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Voices
  9712:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Powers
  9715:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Night of Knives
  9716:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Return of the Crimson Guard
  9717:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Stonewielder
  9718:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Orb Sceptre Throne
  9719:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Blood and Bone
  9720:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Assail
  9721:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Dancer's Lament

  // === MYSTERY ===
  997:   { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 9, ending: 9, voice: 10, puzzle: 9, stakes: 7 }, // Sleeping Murder
  999:   { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 7 }, // Caribbean Mystery
  1498:  { prose: 9, characters: 10, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, puzzle: 8, stakes: 9 }, // Small Mercies
  1941:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Return of Sherlock Holmes
  1942:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Valley of Fear
  2582:  { prose: 10, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Little Sister
  2583:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Playback
  3062:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 7, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Three Act Tragedy
  3063:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 7, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // Cards on the Table
  3064:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Dumb Witness
  3065:  { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 7, ending: 9, voice: 9, puzzle: 9, stakes: 7 }, // One Two Buckle
  3066:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // N or M?
  3069:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // They Do It with Mirrors
  3073:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // At Bertram's Hotel
  3074:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10, puzzle: 9, stakes: 8 }, // Endless Night

  // === THRILLER ===
  11301: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Last Party
  11302: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Game of Lies
  11312: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, stakes: 8, twists: 8 }, // And When She Was Good
  11317: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Memorial Day
  11318: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Last Man
  11319: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Term Limits
  11599: { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Patient Zero
  11600: { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Dragon Factory
  11634: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Mine — McCammon
  11680: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Different Class
  11729: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, stakes: 7, twists: 8 }, // Bad Monkeys
  11731: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, stakes: 7, twists: 8 }, // Mirage
  11774: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Chalk Man
  11775: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Hiding Place
  11776: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Other People

  // === ROMANCE ===
  5158:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Beauty and the Mustache
  5162:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Collided
  5163:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Wrecked
  5164:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Redeemed
  5259:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 6 }, // Brothers Hawthorne
  5334:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Wish
  5415:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Sunrise on Half Moon Bay

  // === NONFICTION ===
  12843: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 8, access: 9 }, // Lonely City
  12844: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 8, access: 9 }, // Trip to Echo Spring
  12846: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, argument: 9, researchRigor: 8, access: 9 }, // Everybody
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-056 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

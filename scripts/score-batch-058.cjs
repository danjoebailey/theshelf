// Batch 58 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  13248: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Second-Class Citizen
  13250: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13251: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13252: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Distant Shore
  13253: { prose: 10, characters: 8, plot: 5, pacing: 3, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Plains
  13254: { prose: 10, characters: 8, plot: 5, pacing: 3, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Tamarisk Row
  13256: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Monkey Grip
  13257: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Children's Bach
  13259: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Watch Tower
  13260: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // In Certain Circles
  13261: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Benang
  13262: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13263: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Sixty Lights
  13265: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Lost Dog
  13266: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Questions of Travel
  13267: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Drylands
  13269: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Potiki
  13271: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Whale Rider
  13273: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Mister Pip
  13274: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Hand Me Down World
  13275: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13277: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13278: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13279: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Sweetland
  13280: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13281: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Autobiography of an Ex-Colored Man
  13282: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Street
  13283: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Narrows
  13284: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13285: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Passing
  13286: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Brown Girl, Brownstones
  13288: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Voroshilovgrad
  13289: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Orphanage
  13290: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Fieldwork in Ukrainian Sex
  13291: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13292: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Perverzion
  13293: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Twelve Circles
  13294: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13295: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Ghana Must Go
  13296: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13298: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // What It Means When a Man Falls
  13299: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 7, voice: 10 }, // Freshwater
  13300: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Death of Vivek Oji
  13301: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Dust
  13303: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13305: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13306: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13307: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Mountain Lion
  13308: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Boston Adventure
  13309: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Hortense Calisher
  13310: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13312: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Mr. Fortune's Maggot
  13313: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13314: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Light in the Piazza
  13316: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Ship of Fools
  13317: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Pale Horse Pale Rider
  13318: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Sleepless Nights
  13320: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Last Samurai
  13321: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 7, ending: 7, voice: 10 }, // Lightning Rods
  13322: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10 }, // No Lease on Life

  // === FANTASY ===
  9874:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Ka: Dar Oakley
  9875:  { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Aegypt
  9887:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Lord Foul's Bane
  9888:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Illearth War
  9889:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Power That Preserves
  9890:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Book of Three
  9891:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Black Cauldron
  9892:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Castle of Llyr
  9893:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Taran Wanderer
  9894:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9, worldBuilding: 9, magicSystem: 8 }, // High King
  9898:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Over Sea, Under Stone
  9899:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Dark Is Rising
  9900:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Greenwitch
  9901:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Grey King
  9902:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Silver on the Tree
  9908:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Empress of Salt and Fortune
  9910:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Wounded Land
  9911:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // One Tree
  9912:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 10, magicSystem: 9 }, // White Gold Wielder
  9913:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Runes of the Earth
  9914:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 9 }, // Fatal Revenant

  // === MYSTERY ===
  4586:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Madness of Crowds
  4587:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Strip Jack
  4605:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Watching the Dark
  4606:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Sleeping in the Ground
  4611:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, puzzle: 9, stakes: 8 }, // Under the Midnight Sun
  4774:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Started Early Took My Dog
  5177:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 9, stakes: 7 }, // Miss Moriarty I Presume?
  5345:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Look Alive Twenty-Five
  5346:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Dirty Thirty
  5471:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Grey Wolf
  5902:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Promise — Crais
  5903:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Racing the Light
  6336:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Buried Angels
  6337:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Witch — Läckberg
  6444:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Hard Eight

  // === THRILLER ===
  12072: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, stakes: 8, twists: 8 }, // Beast — Wesolowski
  12080: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, stakes: 8, twists: 8 }, // Cartographers
  12124: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Legacies
  12184: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Persona
  12295: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, stakes: 9, twists: 8 }, // You — Kepnes
  12296: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 7 }, // Hidden Bodies
  12297: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, stakes: 7, twists: 7 }, // Providence
  12298: { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 7 }, // You Love Me
  12344: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Rain Fall
  12345: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Hard Rain
  12346: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Rain Storm
  12347: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Last Assassin
  12383: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Fistful of Rain
  12390: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 9, twists: 8 }, // Shining Girls
  12392: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 9, twists: 8 }, // Broken Monsters

  // === ROMANCE ===
  5675:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Chesapeake Shores Christmas
  5676:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Driftwood Cottage
  5684:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 7, tension: 7, heaPayoff: 8 }, // Lemon Sisters
  5685:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 7, tension: 7, heaPayoff: 8 }, // Family You Make
  5689:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Friendship List
  5693:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 8, heaPayoff: 7 }, // To Die For
  5694:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 8, heaPayoff: 7 }, // Up Close and Dangerous
  5754:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 8, heaPayoff: 7, periodAuthenticity: 7, researchIntegration: 6 },
  5758:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Someone to Hold
  5763:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Three Weeks with Lady X
  5775:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Goal
  5776:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Chase

  // === NONFICTION ===
  13000: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // They Would Never Hurt a Fly
  13005: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Hooligan's Return
  13031: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Taken Captive
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-058 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

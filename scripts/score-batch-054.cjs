// Batch 54 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  12961: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12962: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Minor Apocalypse
  12963: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Polish Complex
  12964: { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // This Way for the Gas
  12965: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Mighty Angel
  12967: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Who Was David Weiser?
  12969: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Door — Szabó
  12970: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Iza's Ballad
  12971: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Katalin Street
  12972: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Celestial Harmonies
  12973: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Helping Verbs of the Heart
  12974: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Sunflower
  12975: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Adventures of Sindbad
  12976: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12977: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12978: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12979: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Metropole
  12980: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Sinistra Zone
  12984: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Life of Insects
  12985: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Moscow to the End of the Line
  12986: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Big Green Tent
  12987: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12988: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // There Once Lived a Woman
  12989: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // There Once Lived a Girl
  12990: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 9 },
  12991: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Maidenhair
  12992: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 9 },
  12993: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Death and the Penguin
  12994: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12995: { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // On the Edge of Reason
  12996: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Return of Philip Latinowicz
  12997: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Museum of Unconditional Surrender
  12998: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Baba Yaga Laid an Egg
  12999: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // S. — Drakulić
  13001: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Death and the Dervish
  13002: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Lazarus Project
  13003: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Nowhere Man
  13004: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Bait
  13006: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Captives
  13007: { prose: 10, characters: 10, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Love in a Fallen City
  13008: { prose: 10, characters: 10, plot: 7, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Lust, Caution
  13009: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Rouge of the North
  13010: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Rickshaw Boy
  13011: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Mr. Ma and Son
  13012: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Border Town
  13013: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Four Books
  13014: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Serve the People!
  13015: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Dream of Ding Village
  13016: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Raise the Red Lantern
  13017: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Rice
  13018: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13019: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Song of Everlasting Sorrow
  13020: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Family — Ba Jin
  13021: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Invisibility Cloak
  13022: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Hunting Gun
  13023: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Bullfight
  13024: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  13025: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  13026: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Masks
  13027: { prose: 10, characters: 10, plot: 8, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // True Novel

  // === FANTASY ===
  8296:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Night's Sorceries
  8310:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Ravenheart
  8311:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Stormrider
  8319:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Great Ordeal
  8320:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Unholy Consult
  8350:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Destiny of the Sword
  8351:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Coming of Wisdom
  8365:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Magic Binds
  8366:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 9, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Magic Triumphs
  8384:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Staked
  8385:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Besieged
  8386:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Scourged
  8399:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Mask Falling
  8403:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // False Value
  8404:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Amongst Our Weapons
  8415:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 9 }, // Four Roads Cross

  // === SF ===
  12551: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Motherlines
  12554: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // City, Not Long After
  12556: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Queen City Jazz
  12557: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // In War Times
  12571: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Them Bones
  12572: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Night of the Cooters
  12573: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Dream Factories
  12581: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // This Alien Shore (Friedman)
  12584: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Mindplayers
  12585: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Synners
  12586: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Fools — Cadigan
  12587: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Trouble and Her Friends
  12588: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Five-Twelfths of Heaven
  12589: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Dreamships
  12592: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Song of Time
  12593: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // China Mountain Zhang
  12594: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Mission Child
  12595: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Half the Day Is Night
  12596: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Air
  12597: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Child Garden
  12599: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Celestis
  13673: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Marrow Thieves
  13674: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Hunting by Stars
  14340: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 6, ending: 7, voice: 5, worldBuilding: 6, speculativeRigor: 4 }, // Ice Planet Barbarians
  14341: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 6, ending: 7, voice: 5, worldBuilding: 6, speculativeRigor: 4 }, // Barbarian Alien

  // === MYSTERY ===
  10738: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Killing the Shadows
  10739: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Grave Tattoo
  10740: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Kick Back
  10741: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Report for Murder
  10742: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Crack Down
  10743: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Fever of the Bone
  10744: { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Little Scarlet
  10746: { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Fear of the Dark
  10990: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Farthing
  11254: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Death at the Sign of the Rook
  11303: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, puzzle: 8, stakes: 8 }, // Witch Elm
  11310: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Lady in the Lake
  11311: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // What the Dead Know
  11313: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Queenpin
  11314: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, puzzle: 7, stakes: 8 }, // Bury Me Deep

  // === THRILLER ===
  10249: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Whispers
  10250: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Shadowfires
  10252: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // House of Thunder
  10272: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, stakes: 7, twists: 7 }, // Bandits
  10275: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, stakes: 7, twists: 7 }, // Switch — Leonard
  10543: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 6 }, // Summons
  10544: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 6 }, // Broker
  10545: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 6 }, // Appeal
  10546: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 6 }, // Last Juror
  10547: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 6 }, // Associate
  10548: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 6 }, // Litigators
  10549: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Big Bad Wolf
  10550: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // 4th of July
  10551: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Step on a Crack
  10552: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Honeymoon

  // === ROMANCE ===
  5071:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Winterkeep
  5075:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 7 }, // Extras

  // === NONFICTION ===
  12798: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Liliana's Invincible Summer
  12838: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 9, access: 9 }, // On Immunity
  12839: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 10, researchRigor: 8, access: 8 }, // Having and Being Had
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-054 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

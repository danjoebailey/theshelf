// Batch 35 — broad coverage across all buckets
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  10154: { prose: 8, characters: 8, plot: 6, pacing: 4, ideas: 7, resonance: 7, ending: 6, voice: 7 }, // Rudin — Turgenev
  10155: { prose: 8, characters: 8, plot: 6, pacing: 4, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Home of the Gentry
  10156: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9 }, // Typhoon — Conrad
  10157: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Shadow-Line
  10158: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Nigger of the Narcissus
  10159: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 6, ending: 7, voice: 7 }, // The American — James
  10160: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Touchstone — Wharton
  10161: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  10162: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Glimpses of the Moon
  10163: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Fruit of the Tree
  10164: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Greater Inclination
  10165: { prose: 8, characters: 8, plot: 6, pacing: 4, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  10166: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  10167: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Youth and the Bright Medusa
  10168: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 9 }, // My Mortal Enemy
  10169: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  10170: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 7, resonance: 7, ending: 6, voice: 8 }, // Troll Garden
  10171: { prose: 7, characters: 8, plot: 8, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Financier — Dreiser
  10172: { prose: 7, characters: 8, plot: 8, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Titan
  10173: { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Stoic
  10174: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Dodsworth — Lewis
  10175: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8 }, // Call of the Wild
  10177: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Before Adam
  10180: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Mr. Polly
  10181: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Kipps
  10182: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Love and Mr. Lewisham
  10185: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 9 }, // Flush — Woolf
  10186: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // The Years
  10189: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 7, resonance: 7, ending: 6, voice: 9 }, // Put Out More Flags — Waugh
  10203: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Good Man Jesus
  10204: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Sartoris — Faulkner
  10205: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Wild Palms
  10206: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  10207: { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 7, resonance: 6, ending: 6, voice: 8 }, // Mosquitoes
  10208: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Requiem for a Nun
  10211: { prose: 8, characters: 6, plot: 5, pacing: 7, ideas: 7, resonance: 5, ending: 6, voice: 8 }, // Torrents of Spring — Hemingway parody
  10212: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Red Pony
  10213: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  10214: { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 6, ending: 6, voice: 7, periodAuthenticity: 7, researchIntegration: 7 },
  10215: { prose: 8, characters: 8, plot: 6, pacing: 4, ideas: 7, resonance: 7, ending: 6, voice: 8 }, // Pastures of Heaven
  10216: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Long Valley
  10217: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Wayward Bus
  10218: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8 }, // To a God Unknown
  10219: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Look at the Harlequins
  10220: { prose: 9, characters: 6, plot: 4, pacing: 5, ideas: 7, resonance: 6, ending: 5, voice: 10 }, // Original of Laura (unfinished)
  10221: { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Poorhouse Fair
  10222: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 7, resonance: 6, ending: 6, voice: 8 }, // Month of Sundays
  10224: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9, periodAuthenticity: 8, researchIntegration: 8 }, // Lavinia
  10233: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Machineries of Joy
  10235: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Medicine for Melancholy
  10247: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 8 }, // Hearts in Atlantis
  10273: { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9 }, // Touch — Leonard
  10274: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  10276: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  10287: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 7, researchIntegration: 7 },
  10290: { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Big Sea — Hughes
  10291: { prose: 8, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Ways of White Folks
  10292: { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Song Flung Up to Heaven
  10294: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Who Do You Think You Are — Munro
  10295: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // View from Castle Rock

  // === FANTASY ===
  508:   { prose: 8, characters: 9, plot: 9, pacing: 4, ideas: 9, resonance: 9, ending: 9, voice: 8, worldBuilding: 10, magicSystem: 8 }, // Deadhouse Gates
  10080: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, magicSystem: 7 }, // Fall of Gondolin
  10223: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Beginning Place
  10243: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, magicSystem: 6 }, // Eyes of the Dragon
  10255: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Thief of Always
  10256: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Days of Magic
  10257: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 7, resonance: 6, ending: 6, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Galilee
  10280: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 6, voice: 7, worldBuilding: 9, magicSystem: 6 }, // Inferno — Niven
  10283: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, worldBuilding: 8, magicSystem: 7 }, // Good Omens
  10378: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Grimus — Rushdie
  10388: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Three Hearts and Three Lions
  10456: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Jack of Shadows
  10676: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Beguilement
  10788: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // King's Buccaneer
  10789: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Talon of the Silver Hawk
  10790: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // King of Foxes
  10791: { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 7 }, // Flight of the Nighthawks
  10792: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 7 }, // Into a Dark Realm
  10793: { prose: 6, characters: 6, plot: 6, pacing: 6, ideas: 5, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 7 }, // Murder in LaMut
  10794: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, magicSystem: 7 }, // Magic Kingdom for Sale
  10795: { prose: 6, characters: 6, plot: 6, pacing: 6, ideas: 5, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 6 }, // Black Unicorn
  10796: { prose: 6, characters: 6, plot: 6, pacing: 6, ideas: 5, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 6 }, // Wizard at Large

  // === SF ===
  254:   { prose: 7, characters: 6, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 7, worldBuilding: 8, speculativeRigor: 8 }, // I, Robot
  11213: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 8, worldBuilding: 8, speculativeRigor: 6 }, // Starmen of Llyrdis
  11241: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Lost Tales — Tade Thompson
  11276: { prose: 8, characters: 7, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Inverted World
  11278: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Fugue
  11297: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 10, worldBuilding: 8, speculativeRigor: 7 }, // Time War
  11374: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // 334
  11375: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // On Wings of Song
  11376: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Genocides
  11377: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 9, voice: 8, worldBuilding: 7, speculativeRigor: 8 }, // We Who Are About To
  11378: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 8, worldBuilding: 7, speculativeRigor: 7 }, // And Chaos Died
  11387: { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Regenesis
  11388: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Invader
  11389: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Inheritor
  11398: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Worlds
  11399: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Worlds Apart
  11400: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Worlds Enough
  11603: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 9, voice: 9, worldBuilding: 9, speculativeRigor: 9 }, // Roadside Picnic
  11604: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Hard to Be a God
  11606: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Doomed City
  11607: { prose: 8, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Folding Beijing
  11608: { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 8 }, // Vagabonds
  11615: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 9, speculativeRigor: 6 }, // Midnight at Well of Souls
  11616: { prose: 6, characters: 6, plot: 6, pacing: 6, ideas: 6, resonance: 5, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Exiles at Well of Souls
  11617: { prose: 6, characters: 6, plot: 6, pacing: 6, ideas: 6, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Downtiming the Nightside

  // === MYSTERY ===
  4604:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 8, stakes: 7 }, // Playing with Fire — Robinson
  4607:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Ghost Fields
  4608:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Stone Circle
  4609:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Night Hawks
  4773:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // When Will There Be Good News
  5168:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Survivors — Harper
  5175:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Art of Theft
  5176:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Tempest at Sea
  5303:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Another Man's Moccasins
  5304:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Dark Horse
  5305:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Junkyard Dogs
  5306:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 8 }, // Hell Is Empty
  5307:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // As the Crow Flies
  5308:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Serpent's Tooth

  // === THRILLER ===
  3852:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Come Sundown
  3884:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Seeing Red
  3885:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Outfox
  3886:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 6 }, // Mean Streak
  3891:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // I'll Walk Alone
  3980:  { prose: 6, characters: 6, plot: 7, pacing: 8, ideas: 7, resonance: 5, ending: 6, voice: 6, stakes: 8, twists: 7 }, // Doomsday Key
  3981:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Fallen
  3982:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Redemption
  3983:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 7 }, // Gambling Man
  4054:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 6, voice: 7, stakes: 8, twists: 7 }, // Good Guy — Koontz
  4055:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 6, voice: 7, stakes: 8, twists: 7 }, // Velocity
  4097:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Triple — Follett
  4131:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 6 }, // Winter Prey
  4191:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Triptych
  4192:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Fractured
  4193:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Undone
  4194:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Criminal

  // === HORROR ===
  11874: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, atmosphere: 9, dread: 9 }, // The Deep — Cutter
  11875: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 9, dread: 8 }, // Little Heaven
  11876: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 8 }, // Boatman's Daughter
  11877: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 8 }, // Hollow Kind
  11878: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 8 }, // Valley of the Sun
  11879: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Winter People
  11881: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Drowning Kind
  11906: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, atmosphere: 7, dread: 6 }, // Bubba Ho-Tep
  11908: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Seed
  11909: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 9, dread: 9 }, // Brother
  11910: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // Shuddering
  11918: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // Devil Takes You Home

  // === ROMANCE / YA ===
  5862:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 8 }, // Fever
  5868:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 7, voice: 5, chemistry: 7, tension: 7, heaPayoff: 8 }, // Dark Gold
  5870:  { prose: 5, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Dark Needs at Night's Edge
  5874:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 7 }, // Darkest Pleasure
  5877:  { prose: 6, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 8, heaPayoff: 7 }, // King's Men
  6519:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Nobody's Baby but Mine
  6587:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 7, heaPayoff: 6 }, // Does It Hurt
  6599:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 8 }, // Long Game
  6608:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 6 }, // Reckless — Stephens
  6648:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Beautiful Oblivion
  6941:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Legend of Seventh Virgin
  7650:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 8 }, // Practice Makes Perfect
  7655:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Second First Impressions
  7705:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, chemistry: 6, tension: 6, heaPayoff: 7 }, // Clap When You Land
  7721:  { prose: 6, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, chemistry: 7, tension: 6, heaPayoff: 6 }, // Powerful — Roberts
  8048:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 8, voice: 8 }, // Face Like Glass — fantasy YA, no romance pack
  8271:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, chemistry: 6, tension: 6, heaPayoff: 6 }, // Sovereignty
  8898:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 6, tension: 6, heaPayoff: 7 }, // Kentucky Rich
  9205:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 5, resonance: 6, ending: 6, voice: 7, chemistry: 7, tension: 7, heaPayoff: 6 }, // Husbands Jealous

  // === NONFICTION ===
  5953:  { prose: 7, characters: 5, plot: 5, pacing: 8, ideas: 8, resonance: 8, ending: 6, voice: 8, argument: 7, researchRigor: 5, access: 9 }, // War of Art
  201:   { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, argument: 8, researchRigor: 7, access: 8 }, // Down and Out
  10531: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, argument: 8, researchRigor: 7, access: 9 }, // New New Thing
  10532: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, argument: 8, researchRigor: 7, access: 9 }, // Boomerang
  10533: { prose: 8, characters: 5, plot: 5, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 7, argument: 9, researchRigor: 9, access: 7 }, // Blank Slate
  10536: { prose: 8, characters: 6, plot: 5, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, argument: 7, researchRigor: 7, access: 9 }, // Mother Tongue
  10537: { prose: 8, characters: 6, plot: 5, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, argument: 7, researchRigor: 7, access: 9 }, // Made in America
  10573: { prose: 9, characters: 6, plot: 5, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9, argument: 9, researchRigor: 7, access: 9 }, // Dear Ijeawele
  10574: { prose: 9, characters: 6, plot: 5, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, argument: 8, researchRigor: 7, access: 8 }, // Changing My Mind
  10575: { prose: 9, characters: 6, plot: 5, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, argument: 8, researchRigor: 7, access: 8 }, // How to Be Alone
  10595: { prose: 8, characters: 5, plot: 5, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 7, access: 7 }, // Treatise on Tolerance
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-035 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

// Batch 43 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  4401:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 10 }, // Thunderbolt Kid (memoir)
  4402:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Shakespeare (lit bio)
  4431:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Half Asleep in Frog Pajamas
  4432:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Fierce Invalids
  4476:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Leaving Cheyenne
  4477:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  4478:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  4492:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 7 },
  4495:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4496:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4497:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4498:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4499:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4502:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4503:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4504:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4507:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4534:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  4535:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  4640:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Uncle Tungsten
  4692:  { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 8 },
  4721:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Camino Island
  4722:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Camino Winds
  4771:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8 }, // Book of Magic
  4775:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  4840:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Shards
  4841:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Prague Orgy
  4842:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Great American Novel
  4846:  { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // City and Its Uncertain Walls
  4847:  { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Men Without Women
  4849:  { prose: 8, characters: 7, plot: 5, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Hear the Wind Sing
  4851:  { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Damned
  4852:  { prose: 7, characters: 6, plot: 6, pacing: 6, ideas: 8, resonance: 6, ending: 6, voice: 9 }, // Pygmy
  4881:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Playground
  5013:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  5109:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 10 },
  5186:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Lacuna
  5187:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Unsheltered
  5188:  { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 9, resonance: 10, ending: 7, voice: 10 }, // I Am, I Am, I Am
  5340:  { prose: 7, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 7 }, // Valkyries
  5480:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Swan Song — Hilderbrand
  5597:  { prose: 8, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 9 },
  5611:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 10 },
  6245:  { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Largesse of the Sea Maiden
  6378:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6 }, // Goddess of Vengeance
  6379:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6 }, // Power Trip
  6380:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6 }, // Confessions of a Wild Child
  6494:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Dissident Gardens
  6687:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 7 },
  6693:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 8 }, // Little Liar
  6762:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  6770:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Keep the Change
  6772:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Home at the End of the World
  6773:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Day — Cunningham
  6775:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Reef — Wharton

  // === FANTASY ===
  11333: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Iron Grail
  11334: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Broken Kings
  11336: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Camber of Culdi
  11337: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Saint Camber
  11338: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Camber the Heretic
  11339: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Kushiel's Scion
  11340: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Kushiel's Justice
  11341: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Kushiel's Mercy
  11342: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Naamah's Kiss
  11343: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Naamah's Curse
  11365: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Rose Daughter
  11367: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Dragonhaven
  623:   { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Yumi
  624:   { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Colour of Magic
  625:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Equal Rites
  665:   { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Half-Blood Prince
  666:   { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Deathly Hallows

  // === SF ===
  12312: { prose: 8, characters: 7, plot: 7, pacing: 8, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Crux
  12313: { prose: 8, characters: 7, plot: 7, pacing: 8, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Apex
  12334: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Lives of Tao
  12335: { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Deaths of Tao
  12336: { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Time Salvager
  12341: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Spring Heeled Jack
  12342: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Curious Case Clockwork
  12343: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Mountains of the Moon
  12368: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Court of the Air
  12369: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Kingdom Beyond the Waves
  12370: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Rise of the Iron Moon
  12387: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Six Wakes
  12426: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // War with the Newts
  12427: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // R.U.R.
  12428: { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Absolute at Large
  12452: { prose: 8, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Foe
  12461: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Mars House
  12477: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // When Gravity Fails
  12478: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Fire in the Sun
  12479: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Exile Kiss

  // === MYSTERY ===
  6928:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Past Reason Hated
  6929:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Piece of My Heart
  6932:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Dressed for Death
  7309:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Purgatory Ridge
  7310:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Blood Hollow
  7314:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Dance Hall of the Dead
  7315:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // People of Darkness
  7317:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Coyote Waits
  7318:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Sacred Clowns
  7319:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Fallen Man
  7457:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Dark Wind
  7458:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Ghostway
  7459:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Hunting Badger
  7460:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Sinister Pig
  7462:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Mercy Falls

  // === THRILLER ===
  5374:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Wicked Game
  5385:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Body of Lies
  5386:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Blind Alley
  5387:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Countdown
  5388:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Quicksand
  5389:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Eve
  5393:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Edge — Coulter
  5394:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Riptide
  5396:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Guilty as Sin
  5398:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dust to Dust
  5399:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Bitter Season
  5410:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Such a Quiet Place
  5411:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Last to Vanish
  5479:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Blue Hour
  5507:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Lioness

  // === HORROR ===
  12172: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // I Am Not a Serial Killer
  12173: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Mr. Monster
  12174: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // I Don't Want to Kill You
  12218: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Manitou
  12219: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Prey — Masterton
  9085:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Bag of Bones
  9138:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Nightmares & Dreamscapes
  9139:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Everything's Eventual
  9670:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, atmosphere: 10, dread: 9 }, // King Sorrow
  9671:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, atmosphere: 9, dread: 9 }, // Witchcraft for Wayward Girls

  // === ROMANCE ===
  4886:  { prose: 8, characters: 9, plot: 8, pacing: 8, ideas: 8, resonance: 9, ending: 8, voice: 9, chemistry: 6, tension: 9, heaPayoff: 6 }, // Sunrise on the Reaping
  4891:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Technically Yours

  // === NONFICTION ===
  7331:  { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 8, access: 8 }, // Short History of the World
  7630:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, argument: 8, researchRigor: 8, access: 9 }, // On Wings of Eagles
  7691:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, argument: 9, researchRigor: 10, access: 9 }, // Code Breaker
  8336:  { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 9, access: 9 }, // Working
  8757:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 9, resonance: 9, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 10 }, // Anthropocene Reviewed
  8771:  { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 9, resonance: 10, ending: 7, voice: 10, argument: 8, researchRigor: 6, access: 9 }, // Notes on Grief
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-043 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

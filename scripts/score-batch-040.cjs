// Batch 40 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  769:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 10, ending: 9, voice: 9 }, // Green Mile
  800:   { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Nation — Pratchett
  917:   { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  1007:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 5 }, // Regretting You
  1012:  { prose: 7, characters: 9, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  1013:  { prose: 7, characters: 9, plot: 7, pacing: 4, ideas: 7, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  1019:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Calico Joe
  1079:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 }, // Forever Interrupted
  1080:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 9 }, // Britt-Marie Was Here
  1307:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Bluebeard
  1309:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Hocus Pocus
  1310:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Jailbird
  1311:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Deadeye Dick
  1344:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Exit Ghost
  1349:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Breast
  1350:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Deception
  1359:  { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 9 }, // House of the Dead
  1361:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Eternal Husband
  1373:  { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // When She Was Good
  1374:  { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 6, ending: 6, voice: 9 }, // Our Gang
  1375:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Professor of Desire
  1377:  { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Patrimony
  1378:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Letting Go
  1379:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Humbling
  1382:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 10 }, // Burning in Water
  1386:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 9, ending: 7, voice: 10 }, // Last Night of the Earth Poems
  1390:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Village of Stepanchikovo
  1392:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Uncle's Dream
  1393:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 6, voice: 9 }, // Netochka Nezvanova
  1407:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Wine of Youth
  1408:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Dago Red
  1409:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // West of Rome
  1462:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Last Night in Twisted River
  1465:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // In One Person
  1474:  { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Cosmopolis
  1481:  { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Players
  1489:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Nutshell
  1492:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Lessons
  1496:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  1517:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  1525:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Blade Artist
  1526:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Dead Men's Trousers
  1554:  { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Ignorance
  1587:  { prose: 9, characters: 8, plot: 5, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Spirit of SF
  1610:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  1611:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Ordeal of Gilbert Pinfold
  1616:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Utopia Avenue
  1620:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Felix Holt
  1643:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9 }, // Childhood of Jesus
  1702:  { prose: 10, characters: 8, plot: 6, pacing: 3, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Unconsoled
  1707:  { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Invitation to a Beheading
  1708:  { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Real Life of Sebastian Knight
  2202:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Dean's December
  2210:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  2227:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },

  // === FANTASY ===
  11083: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Dragon's Path
  11084: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // King's Blood
  11085: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Tyrant's Law
  11086: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Widow's House
  11087: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Spider's War
  11125: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Stormdancer
  11126: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Kinslayer
  11127: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Endsinger
  11133: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Furthest Station
  11134: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Winter's Gifts
  11135: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Masquerades of Spring
  11136: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Shades of Milk and Honey
  11137: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Glamour in Glass
  11138: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Without a Summer
  11139: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 9 }, // Forging Divinity
  11140: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 9 }, // Stealing Sorcery
  11141: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 9 }, // Six Sacred Swords

  // === SF ===
  11998: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Hospital Station
  11999: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Star Surgeon
  12000: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Major Operation
  12001: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Ventus
  12002: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Permanence
  12003: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Sun of Suns
  12018: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Winterlong
  12034: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Untouched by Human Hands
  12035: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Mindswap
  12036: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Dimension of Miracles
  12037: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Immortality, Inc.
  12038: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Little Fuzzy
  12039: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Space Viking
  12040: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Lord Kalvan
  12041: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 6 }, // Agent of Vega
  12042: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Witches of Karres
  12043: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Universe Against Her
  12047: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Eclipse
  12048: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Eclipse Penumbra
  12049: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Eclipse Corona

  // === MYSTERY ===
  6707:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 5 }, // Fudge Cupcake Murder
  6708:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 5 }, // Sugar Cookie Murder
  6709:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 5 }, // Peach Cobbler Murder
  6718:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Draining Lake
  6719:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Arctic Chill
  6725:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Little Yellow Dog
  6727:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Galton Case
  6728:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Goodbye Look
  6730:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Black Cherry Blues
  6731:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, puzzle: 7, stakes: 9 }, // Tin Roof Blowdown
  6739:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Outrage — Indriðason
  6741:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Gone Fishin'
  6742:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Bad Boy Brawly Brown
  6743:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Stained White Radiance
  6744:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Sunset Limited

  // === THRILLER ===
  4871:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Spook Street
  4872:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // London Rules
  4873:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Joe Country
  4874:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, stakes: 8, twists: 8 }, // Slough House
  5207:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // End of Her
  5218:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Hide
  5220:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Love You More
  5221:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Find Her
  5226:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // English Assassin
  5228:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Messenger
  5229:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Secret Servant
  5230:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Moscow Rules
  5231:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Defector
  5232:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Rembrandt Affair
  5233:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Portrait of a Spy

  // === HORROR ===
  12066: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 10 }, // Painted Devils
  12067: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // World War Z
  12068: { prose: 7, characters: 6, plot: 6, pacing: 7, ideas: 8, resonance: 6, ending: 6, voice: 8, atmosphere: 7, dread: 7 }, // Zombie Survival Guide
  12069: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // Devolution
  12073: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Keeper
  4368:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 9, atmosphere: 10, dread: 9 }, // Coldheart Canyon
  4369:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 9 }, // Great and Secret Show
  4414:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 8, dread: 8 }, // Final Girl Support Group
  4415:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Inspection
  4857:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Holly

  // === ROMANCE ===
  4119:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 6 }, // Nights in Rodanthe
  4121:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 6 }, // Every Breath
  4284:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Romancing the Duke
  4286:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Day of the Duchess
  4300:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 6 }, // Naturals
  4407:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Twice in a Blue Moon
  4419:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Rebel — Lu
  4420:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Warcross
  4426:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Stars Above
  4427:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 6, heaPayoff: 7 }, // Renegades

  // === NONFICTION ===
  3474:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10, argument: 9, researchRigor: 7, access: 9 }, // Knife
  3518:  { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // South and West
  3634:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 9, resonance: 10, ending: 8, voice: 10, argument: 8, researchRigor: 7, access: 9 }, // Gratitude
  4180:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, argument: 7, researchRigor: 6, access: 9 }, // Life Among the Savages
  4187:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 8, access: 9 }, // Going Infinite
  4274:  { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 10, access: 8 }, // Battle of the Bulge
  4361:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 10, access: 8 }, // Great Bridge
  4362:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 9, access: 9 }, // Brave Companions
  4363:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, argument: 8, researchRigor: 8, access: 8 }, // No One Goes Alone
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-040 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

// Batch 45 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  8751:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Train's Been Gone
  8758:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Only Story
  8765:  { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Your Face Tomorrow 3
  8770:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Devil on the Cross
  8790:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 8 }, // Twenties Girl
  8791:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 8 }, // I Owe You One
  8793:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8 }, // Woman Who Stole My Life
  8794:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8 }, // Mystery of Mercy Close
  8796:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Beginner's Goodbye
  8797:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Like Life
  8798:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Bark
  8799:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Breaking and Entering
  8800:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Rodham
  8802:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Monsters of Templeton
  8805:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Fine Just the Way It Is
  8820:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Man in My Basement
  8853:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Juliet, Naked
  8854:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Abstinence Teacher
  8876:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Lost Daughter
  8877:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Troubling Love
  8878:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Strangeness in My Mind
  8880:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Song of the Lark
  8883:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Postcards
  8884:  { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Place on Earth
  8885:  { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // World Lost
  8888:  { prose: 10, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Visiting Privilege
  8889:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Songs for the Missing
  8890:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // How to Be Good
  8891:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Here on Earth
  8986:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 7 },
  9007:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Boys from Biloxi
  9037:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // All That Glitters
  9051:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Way Home
  9100:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Of the Farm
  9101:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 8, researchIntegration: 8 },
  9103:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // After Many a Summer
  9105:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 8 },
  9106:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // He Knew He Was Right
  9112:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Dolores Claiborne
  9122:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Ford County
  9142:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Country
  9143:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Prodigal Son
  9144:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Perfect Life
  9188:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Friends We Keep
  9189:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Sister Stardust
  9217:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8 }, // One Plus One
  9228:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  9230:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 8 },
  9245:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Lyre of Orpheus
  9249:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Maid's Version
  9250:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Bayou Trilogy
  9261:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Of Love and Dust
  9274:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 7 },
  9297:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // House of Splendid Isolation
  9301:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Family Album

  // === FANTASY ===
  1730:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Lyonesse: Madouc
  1745:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Lady of the Lake
  1746:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Season of Storms
  1923:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Guns of the Dawn
  2325:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Sharp Ends
  2328:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Shadow's Edge
  2329:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Beyond the Shadows
  2334:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Water Sleeps
  2335:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Soldiers Live
  2371:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Into the Narrowdark
  2376:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Crown Tower
  2377:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Rose and the Thorn
  2381:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Kraken
  2382:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 8 }, // Un Lun Dun
  2392:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Penric's Demon
  2573:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Soldier of the Mist
  2574:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Soldier of Arete

  // === SF ===
  1901:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Triton
  1903:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Matter
  1904:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Hydrogen Sonata
  1924:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Doors of Eden
  1927:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Light Bringer
  2394:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Ilium
  2395:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Olympos
  2397:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 6, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Mostly Harmless
  2442:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 9 }, // Termination Shock
  2445:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Prayer for the Crown-Shy
  2459:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Methuselah's Children
  2465:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Moving Mars
  2577:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Evil Guest
  2578:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // There Are Doors
  2579:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Free Live Free
  3269:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Rocannon's World
  3273:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Clans of the Alphane Moon
  3274:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 9 }, // 2061
  3275:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Hollow Man
  3276:  { prose: 9, characters: 8, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Years of Rice and Salt

  // === MYSTERY ===
  8511:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Cruelest Month
  8811:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // I Is for Innocent
  8812:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // J Is for Judgment
  8813:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Taming a Sea-Horse
  8814:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Pale Kings and Princes
  8815:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Crimson Joy
  8816:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Ticket to the Boneyard
  8818:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Even the Wicked
  8823:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Cut — Pelecanos
  8910:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Jealousy Man
  8913:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Land of Wolves
  8915:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // L Is for Lawless
  8916:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // M Is for Malice
  8917:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // N Is for Noose
  8918:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // P Is for Peril

  // === THRILLER ===
  5644:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Swimming to Catalina
  5653:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // On Target
  5654:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Ballistic
  5655:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Dead Eye
  5656:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Back Blast
  5657:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Gunmetal Gray
  5658:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Agent in Place
  5659:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Mission Critical
  5662:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Sierra Six
  5663:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Burner
  5703:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, stakes: 7, twists: 6 }, // Soul Harvest
  5901:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Watchman
  5910:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Enemy of Mine
  6342:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Brimstone
  6343:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Dance of Death

  // === HORROR ===
  638:   { prose: 9, characters: 9, plot: 9, pacing: 6, ideas: 9, resonance: 9, ending: 9, voice: 9, atmosphere: 10, dread: 10 }, // 'Salem's Lot
  972:   { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // Tommyknockers
  974:   { prose: 7, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // Insomnia
  975:   { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 8, dread: 7 }, // Rose Madder
  976:   { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 6, voice: 7, atmosphere: 8, dread: 8 }, // Desperation
  977:   { prose: 7, characters: 8, plot: 6, pacing: 6, ideas: 7, resonance: 6, ending: 5, voice: 7, atmosphere: 7, dread: 7 }, // Dreamcatcher
  978:   { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // From a Buick 8
  979:   { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // Cell
  980:   { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Lisey's Story
  983:   { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 7 }, // Later

  // === ROMANCE ===
  4910:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Common Goal
  4911:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Long Game — Reid

  // === NONFICTION ===
  9457:  { prose: 9, characters: 8, plot: 5, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, argument: 7, researchRigor: 6, access: 9 }, // Carnival of Snackery
  9794:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, argument: 10, researchRigor: 9, access: 8 }, // March of Folly
  9809:  { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, argument: 10, researchRigor: 10, access: 6 }, // Extended Phenotype
  9810:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 10, access: 8 }, // Climbing Mount Improbable
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-045 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

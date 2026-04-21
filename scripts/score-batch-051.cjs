// Batch 51 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  12714: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12715: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Piano
  12716: { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Minor Angels
  12717: { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Writers — Volodine
  12719: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Small Lives
  12720: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12721: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12722: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Flanders Road
  12723: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Georgics
  12724: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Triptych — Simon
  12725: { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Tropisms
  12726: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Planetarium
  12727: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Portrait of a Man Unknown
  12728: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Jealousy
  12729: { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Voyeur
  12730: { prose: 10, characters: 7, plot: 5, pacing: 3, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // In the Labyrinth
  12731: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Passing Time
  12732: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Change of Heart
  12733: { prose: 10, characters: 9, plot: 7, pacing: 7, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Zazie in the Metro
  12734: { prose: 10, characters: 7, plot: 5, pacing: 7, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Exercises in Style
  12735: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Sunday of Life
  12736: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Froth on the Daydream
  12737: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Heartsnatcher
  12738: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Red Grass
  12743: { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Acquainted with Grief
  12744: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Gogol's Wife
  12745: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Cancerqueen
  12746: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12748: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12749: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // God's Mountain
  12750: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Three Horses
  12751: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Day Before Happiness
  12752: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Pigeons on the Grass
  12753: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Hothouse — Koeppen
  12754: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Death in Rome
  12755: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Anniversaries
  12756: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Speculations about Jakob
  12757: { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Third Book About Achim
  12758: { prose: 10, characters: 8, plot: 6, pacing: 3, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Bottom's Dream
  12759: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Stony Heart
  12760: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Old Rendering Plant
  12761: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Females
  12762: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Sleep of the Righteous
  12763: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Bricks and Mortar
  12764: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // All the Lights
  12765: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Solar Bones
  12767: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Crowe's Requiem
  12768: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Case of Exploding Mangoes
  12769: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Our Lady of Alice Bhatti
  12770: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Red Birds
  12771: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Fugitive Pieces
  12772: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12773: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12774: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  12775: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Underpainter
  12776: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // February
  12778: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Alligator
  12779: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Mr Scobie's Riddle
  12780: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Well — Jolley
  12781: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Miss Peabody's Inheritance

  // === FANTASY ===
  4424:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 }, // Mister Impossible
  4425:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 }, // Greywaren
  4759:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 7 }, // Ballad of Never After
  5467:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Witch King
  6305:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Broken — Armstrong
  6363:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Black Arts
  6364:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Broken Soul
  6369:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Black Magic Sanction
  6370:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Pale Demon
  6371:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Perfect Blood
  6507:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Rogue
  6508:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Traitor Queen
  6556:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Blood of Empire
  6637:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Red Nails
  6644:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Test of the Twins
  6756:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Gallant

  // === SF ===
  9865:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Shadow of the Giant
  9871:  { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Atrocity Exhibition
  9873:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Engine Summer
  9877:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Beggars and Choosers
  9878:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Beggars Ride
  9879:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Probability Moon
  9880:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Venus Plus X
  9881:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Dreaming Jewels
  9884:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Heavy Weather
  9885:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Holy Fire
  9886:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Distraction
  9923:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Shards of Honor
  9924:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 }, // Trading in Danger
  9939:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Eye in the Sky
  9940:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Solar Lottery
  9941:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 6, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Simulacra
  9942:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Maze of Death
  9944:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Radio Free Albemuth
  9945:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Divine Invasion
  9946:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 6, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Counter-Clock World
  9947:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 6, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Galactic Pot-Healer
  9948:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Tunnel in the Sky
  9949:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Between Planets
  9950:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Red Planet
  9951:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Space Cadet

  // === MYSTERY ===
  9609:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Winter Grave
  9619:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Copy Cap Murder
  9626:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Still Midnight
  10137: { prose: 9, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Law and the Lady
  10138: { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Haunted Hotel
  10258: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Secret Adversary
  10259: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Mystery of the Blue Train
  10260: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Big Four
  10261: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Secret of Chimneys
  10262: { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 7 }, // Pocket Full of Rye
  10263: { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 7, ending: 9, voice: 10, puzzle: 9, stakes: 7 }, // Clocks
  10264: { prose: 8, characters: 9, plot: 9, pacing: 7, ideas: 7, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 7 }, // Nemesis — Christie
  10265: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Killer in the Rain
  10266: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Sight for Sore Eyes
  10267: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Bridesmaid

  // === THRILLER ===
  8836:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Hope to Die
  8837:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Cross the Line
  8845:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Alibi
  8847:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Chasing the Night
  8870:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, stakes: 8, twists: 8 }, // This Sweet Sickness
  8901:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Kill the Messenger
  8959:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Innocent — Coben
  8962:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Last Widow
  8963:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Low Pressure
  9015:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Cop Town
  9018:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Deeper Than the Dead
  9020:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Running Blind
  9029:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Boy
  9054:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Winter of Frankie Machine
  9055:  { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Savages

  // === ROMANCE ===
  5049:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Fix Her Up
  5050:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Love Her or Lose Her

  // === NONFICTION ===
  3489:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 9 }, // Fight
  3490:  { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, argument: 9, researchRigor: 9, access: 7 }, // Of a Fire on the Moon
  3631:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 9, ending: 7, voice: 10, argument: 8, researchRigor: 8, access: 9 }, // Story of a Shipwrecked Sailor
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-051 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

// Batch 50 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  12648: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Men's Club
  12649: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Sylvia
  12650: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Desperate Characters
  12651: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Widow's Children
  12652: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Poor George
  12653: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Engineer of Human Souls
  12654: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Cowards
  12655: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Miss Silver's Past
  12656: { prose: 10, characters: 10, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // Skylark
  12657: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Kornél Esti
  12658: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Anna Édes
  12659: { prose: 10, characters: 9, plot: 6, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Book of Memories
  12660: { prose: 10, characters: 9, plot: 6, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Parallel Stories
  12661: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Badenheim 1939
  12662: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Iron Tracks
  12663: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Tzili
  12664: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Only Yesterday
  12665: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Simple Story
  12666: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Wild Geese
  12667: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Vita Sexualis
  12668: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // Rashomon
  12669: { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Kappa
  12670: { prose: 10, characters: 9, plot: 6, pacing: 6, ideas: 9, resonance: 10, ending: 7, voice: 10 }, // Kitchen
  12671: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Goodbye Tsugumi
  12672: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Amrita
  12673: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Beautyful Ones Are Not Yet Born
  12674: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Fragments
  12675: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // So Long a Letter
  12676: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Scarlet Song
  12677: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10 }, // Lonely Passion of Judith Hearne
  12678: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12680: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Ice Palace
  12681: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Birds — Vesaas
  12682: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Boat in the Evening
  12686: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  12687: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Way of a Serpent
  12688: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Seducer
  12689: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Conqueror
  12690: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Professor Andersen's Night
  12691: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // T. Singer
  12692: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Shyness and Dignity
  12693: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Keepers of the House
  12694: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Black Prince
  12697: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // I Am One of You Forever
  12698: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Look Back All the Green Valley
  12699: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Wolf Whistle
  12700: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Music of the Swamp
  12701: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Lightning Song
  12702: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Stories in the Worst Way
  12703: { prose: 10, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // I Looked Alive
  12704: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Garden State
  12705: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Ice Storm
  12706: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Purple America
  12707: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Thérèse Desqueyroux
  12708: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Vipers' Tangle
  12709: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Desert of Love
  12710: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  12711: { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // Man Who Planted Trees
  12712: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Hill
  12713: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // I'm Gone

  // === FANTASY ===
  11649: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Yendi
  11650: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Teckla
  11651: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Taltos — Brust
  11653: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Grunts!
  11654: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Rats and Gargoyles
  11655: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Dragonsbane
  11657: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Ladies of Mandrigyn
  11658: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 9 }, // Magic of Recluce
  4227:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Omen Machine
  4264:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Summerland
  4342:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Norse Mythology
  4343:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 8 }, // Carpet People
  4346:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Edgedancer
  4347:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, magicSystem: 10 }, // Dawnshard
  4417:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Valiant
  4418:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Ironside

  // === SF ===
  9738:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 8, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Non-Stop
  9739:  { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Hothouse
  9740:  { prose: 9, characters: 8, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Helliconia Spring
  9741:  { prose: 9, characters: 8, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Helliconia Summer
  9742:  { prose: 9, characters: 8, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Helliconia Winter
  9743:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Greybeard
  9748:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // River of Gods
  9749:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // Dervish House
  9750:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // Luna: New Moon
  9751:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // Luna: Wolf Moon
  9752:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // Luna: Moon Rising
  9753:  { prose: 9, characters: 6, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Last and First Men
  9754:  { prose: 9, characters: 6, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // Star Maker
  9755:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Odd John
  9756:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Sirius
  9763:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // This Alien Shore
  9768:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Garden of Iden
  9769:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Sky Coyote
  9770:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Mendoza in Hollywood
  9855:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Stars, Like Dust
  9856:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Currents of Space
  9857:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Pebble in the Sky
  9862:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Gripping Hand
  9863:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Shadow of the Hegemon
  9864:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Shadow Puppets

  // === MYSTERY ===
  9519:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Night Gate
  9533:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Vengeance — Black
  9534:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 7 }, // Holy Orders
  9545:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Ghost in Trouble
  9546:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Ghost to the Rescue
  9547:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Ghost Times Two
  9548:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Ghost Ups Her Game
  9549:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Ghost Blows a Kiss
  9550:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Ghost Followed Home
  9598:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Death by Chocolate Frosted
  9599:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Snickerdoodle
  9605:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Who Watcheth
  9606:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Beige Man
  9607:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Treacherous Net
  9608:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Hunting Game

  // === THRILLER ===
  8470:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Hostage
  8473:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Prior Bad Acts
  8475:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dark Harbor
  8477:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Two Dollar Bill
  8479:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Family Remains
  8503:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 6 }, // Violets Are Blue
  8504:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // First Family
  8505:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Zero Day
  8507:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Catch Me
  8825:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 10, stakes: 7, twists: 7 }, // LaBrava
  8830:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Touch & Go
  8831:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Fear Nothing
  8833:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Stay Close
  8834:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Worth Dying For
  8835:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Never Go Back

  // === HORROR ===
  12511: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 9, dread: 9 }, // Haunted: Tales
  12513: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Hour of the Oxrun Dead
  12514: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Nestling
  12515: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Pet
  12552: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // Vampire Tapestry
  12582: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, atmosphere: 10, dread: 9 }, // Leech

  // === ROMANCE ===
  4981:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Not in Love
  5035:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Yes No Maybe So

  // === NONFICTION ===
  1431:  { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 10, researchRigor: 8, access: 8 }, // Armies of the Night
  1450:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, argument: 8, researchRigor: 6, access: 9 }, // How to Travel with a Salmon (essays)
  2286:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 8, access: 9 }, // Pigeon Tunnel
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-050 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

// Batch 46 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  9304:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Some Tame Gazelle
  9311:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Blue Guitar
  9312:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Mrs. Osmond
  9315:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8 }, // Uncoupling
  9319:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Mother Land
  9331:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7 }, // Flappy Entertains
  9339:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  9340:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  9364:  { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 6 }, // Proving
  9384:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Glassworks
  9512:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  9513:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  9574:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 7 }, // Home to Big Stone Gap
  9639:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  9643:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 8 },
  9662:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  9682:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  9799:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, periodAuthenticity: 9, researchIntegration: 10 },
  9837:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 10, researchIntegration: 10 },
  9839:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9, periodAuthenticity: 10, researchIntegration: 10 },
  9943:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Confessions of a Crap Artist
  9958:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Green Shadows White Whale
  9966:  { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Under Western Eyes
  9967:  { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Chance
  9968:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Outcast of the Islands
  9994:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Elephant Vanishes
  9995:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Blind Willow
  9998:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Short Stories Hemingway
  9999:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Strange Pilgrims
  10002: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Lady with the Dog
  10004: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // St. Lucy's Home
  772:   { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Billy Summers
  943:   { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  1314:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10 }, // Welcome to the Monkey House
  1376:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Facts — Roth
  1383:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 8, ending: 6, voice: 10 }, // Days Run Away — Bukowski
  1384:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 8, ending: 6, voice: 10 }, // War All the Time
  1388:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 8, ending: 6, voice: 10 }, // Run with the Hunted
  1389:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Insulted and Humiliated
  1391:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Gentle Creature
  1394:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Bagombo Snuff Box
  1398:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Armageddon in Retrospect
  1399:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 10 }, // While Mortals Sleep
  1400:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 10 }, // Look at the Birdie
  1405:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Smile at the Foot of the Ladder
  1516:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  2216:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Good Apprentice
  2401:  { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 10, resonance: 7, ending: 6, voice: 10 }, // Perfect Vacuum
  2588:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Journey to the East
  3400:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Elsewhere
  3409:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Dreamsongs v1
  3410:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Dreamsongs v2
  3438:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9 }, // Fallen Idol
  3452:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Reivers
  3453:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Pylon

  // === FANTASY ===
  11575: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Daughter of the Blood
  11576: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Heir to the Shadows
  11577: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Queen of the Darkness
  11578: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Written in Red
  11579: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Murder of Crows
  11580: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Spider's Bite
  11581: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Web of Lies
  11582: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Venom
  11583: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Discovery of Witches
  11584: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Shadow of Night
  11585: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Book of Life
  11587: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Iron Hunt
  2576:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Sorcerer's House
  2580:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Knight
  2581:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 9 }, // Wizard
  3266:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Elf Queen of Shannara
  3267:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Talismans of Shannara

  // === SF ===
  3277:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Integral Trees
  3278:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 9 }, // Protector
  3279:  { prose: 7, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 6, ending: 6, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Number of the Beast
  3280:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Job: Comedy of Justice
  3283:  { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Dreaming Void
  3287:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // State of the Art
  3408:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Nightflyers
  3412:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Skyward
  3413:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Starsight
  3414:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Cytonic
  3415:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Defiant
  3416:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Steelheart
  3417:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Firefight
  3418:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Calamity
  3420:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Sunlit Man
  3477:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Patternmaster
  3496:  { prose: 9, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Zodiac
  3643:  { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 7 }, // Memoirs Found in a Bathtub
  3926:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 7, speculativeRigor: 6 }, // Starter Villain
  4105:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // When the Sleeper Wakes

  // === MYSTERY ===
  8919:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Hit and Run
  8920:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Q Is for Quarry
  8921:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // R Is for Ricochet
  8922:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // S Is for Silence
  8936:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Purple Cane Road
  8937:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Last Car to Elysian Fields
  8938:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Saints of the Shadow Bible
  8939:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 7 }, // Even Dogs in the Wild
  8943:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 7 }, // Murder Is Announced
  8944:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 8, resonance: 8, ending: 9, voice: 10, puzzle: 9, stakes: 7 }, // 4:50 from Paddington
  9039:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Doctored Evidence
  9040:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Through a Glass Darkly
  9045:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // How the Dead Speak
  9046:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Rising Tide
  9056:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Darkness, Take My Hand

  // === THRILLER ===
  6344:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Book of the Dead
  6345:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Wheel of Darkness
  6346:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Cemetery Dance
  6347:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Fever Dream
  6348:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Cold Vengeance
  6400:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Someone We Know
  6401:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Not a Happy Family
  6402:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Curator
  6403:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Dead Ground
  6404:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // You Will Pay
  6405:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Afraid to Die
  6406:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Close to Home
  6407:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Expecting to Die
  6436:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Dilemma
  6437:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Prisoner

  // === HORROR ===
  4001:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 8, atmosphere: 9, dread: 8 }, // Black House
  4370:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Five — McCammon
  4371:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Listener
  4409:  { prose: 8, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 9, atmosphere: 9, dread: 7 }, // Joyland
  4645:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 8, atmosphere: 8, dread: 9 }, // Long Walk
  4649:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, atmosphere: 9, dread: 9 }, // Apt Pupil
  7429:  { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, atmosphere: 9, dread: 9 }, // You Like It Darker
  7734:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, atmosphere: 9, dread: 9 }, // Full Dark No Stars
  7735:  { prose: 8, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, atmosphere: 9, dread: 8 }, // If It Bleeds
  9113:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Girl Who Loved Tom Gordon

  // === ROMANCE ===
  4927:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Smoke in the Sun
  4931:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 7 }, // Only the Good Spy Young

  // === NONFICTION ===
  9811:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, argument: 9, researchRigor: 10, access: 8 }, // Unweaving the Rainbow
  9812:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Among Schoolchildren
  9813:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Old Friends
  9814:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Strength in What Remains
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-046 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

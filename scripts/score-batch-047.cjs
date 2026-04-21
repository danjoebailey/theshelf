// Batch 47 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  3468:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9 }, // Diary of a Bad Year
  3470:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Fury
  3482:  { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // True at First Light
  3511:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Mysterious Stranger
  3517:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10 }, // Last Thing He Wanted
  3635:  { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Ballad of Reading Gaol
  3639:  { prose: 10, characters: 7, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Universal History of Infamy
  3651:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Long After Midnight
  3698:  { prose: 9, characters: 9, plot: 7, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Princess Casamassima
  3699:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Spoils of Poynton
  3866:  { prose: 7, characters: 7, plot: 7, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 8 },
  3870:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 9, researchIntegration: 8 },
  3873:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Safe Harbour
  3874:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // House
  3902:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 7 },
  4125:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Impossible
  4249:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 }, // On Mystic Lake
  4250:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 }, // Wild — Hannah
  4320:  { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9 }, // Freaky Deaky
  4396:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Deal of a Lifetime
  4410:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Elevation
  4494:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4501:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4506:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4647:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9 }, // Rita Hayworth and Shawshank
  4648:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 10, ending: 9, voice: 9 }, // Body
  4690:  { prose: 7, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 7, periodAuthenticity: 9, researchIntegration: 9 },
  4691:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 8 },
  4735:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Before I Met You
  4770:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Every Morning the Way Home
  4844:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Sweet Thursday
  4853:  { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 6, ending: 6, voice: 9 }, // Tell-All
  5527:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Mad Honey
  5576:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7 }, // Heads You Win
  5607:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 9, researchIntegration: 8 },
  6496:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Second Place
  6803:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Insufferable Gaucho
  6804:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 6, voice: 10 }, // Woes of the True Policeman
  7074:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  7421:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Mighty Red
  7570:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  7596:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  7600:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  7601:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  7797:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Other Woman — Green
  8449:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  8451:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  8452:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  8478:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Identicals
  8481:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Storyteller
  8492:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Finding Ashley
  8494:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, periodAuthenticity: 7, researchIntegration: 7 },
  8496:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Without a Trace
  8806:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Winter in Paradise
  8807:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // What Happens in Paradise

  // === FANTASY ===
  11588: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, magicSystem: 9 }, // Monstress v1
  11589: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Cast in Shadow
  11590: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Cast in Courtlight
  11591: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 8 }, // Cast in Secret
  11605: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Monday Begins on Saturday
  11609: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Twelve Kings in Sharakhai
  11610: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // With Blood Upon the Sand
  11611: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Beneath the Twisted Trees
  11612: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Curse of the Mistwraith
  3411:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Ice Dragon
  3419:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Rithmatist
  3421:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 8 }, // Frugal Wizard's Handbook
  3460:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Fragile Things
  3461:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Smoke and Mirrors
  3462:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Trigger Warning
  3939:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Demon Lord of Karanda

  // === SF ===
  4106:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Now Wait for Last Year
  4108:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // 3001
  4109:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 6, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Farnham's Freehold
  4110:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 6, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Cat Who Walks Through Walls
  4165:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // In Enemy Hands
  4166:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Ashes of Victory
  4206:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 8, speculativeRigor: 8 }, // Passage
  4208:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Rimrunners
  4209:  { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Existence
  4211:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Hull Zero Three
  4213:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Galileo's Dream
  4333:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Ender in Exile
  4337:  { prose: 9, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Always Coming Home
  4339:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 9 }, // Nemesis
  4564:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Service Model
  4566:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Apocalypse Codex
  4567:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Nightmare Stacks
  4568:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Agent to the Stars
  4569:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Android's Dream
  4570:  { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // To Be Taught If Fortunate

  // === MYSTERY ===
  9057:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Sacred — Lehane
  9058:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Prayers for Rain
  9059:  { prose: 9, characters: 9, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Moonlight Mile
  9063:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Cinnamon Kiss
  9064:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Blonde Faith
  9065:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Little Green
  9066:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Dixie City Jam
  9067:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Burning Angel
  9068:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Cadillac Jukebox
  9081:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Dying Hours
  9082:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Locked Room
  9161:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Last Camel Died at Noon
  9163:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Hippopotamus Pool
  9164:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Seeing a Large Cat
  9165:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Ape Who Guards the Balance

  // === THRILLER ===
  6455:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Golden Couple
  6456:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Deceivers
  6457:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Power Couple
  6458:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Prisoner — Berenson
  6459:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Hunter Killer
  6462:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Protect and Defend
  6463:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Extreme Measures
  6464:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Pursuit of Honor
  6465:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Dream Town
  6466:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Edge — Baldacci
  6509:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 }, // White Road
  6510:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Black Angel
  6511:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 8, twists: 7 }, // Unquiet
  6515:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Fever — Cook
  6516:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Mutation

  // === HORROR ===
  9280:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Never Flinch
  11527: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, atmosphere: 10, dread: 9 }, // Ghost Stories M.R. James
  11528: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, atmosphere: 10, dread: 9 }, // More Ghost Stories
  12233: { prose: 6, characters: 6, plot: 6, pacing: 7, ideas: 8, resonance: 5, ending: 6, voice: 9, atmosphere: 7, dread: 6 }, // Haunted Vagina
  12234: { prose: 6, characters: 6, plot: 6, pacing: 7, ideas: 8, resonance: 5, ending: 6, voice: 9, atmosphere: 7, dread: 6 }, // Satan Burger
  12235: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 7, resonance: 5, ending: 6, voice: 8, atmosphere: 7, dread: 5 }, // Baby Jesus Butt Plug
  12259: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Red Moon
  12260: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Dark Net
  12274: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Creatures of Will and Temper
  12275: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Creatures of Want and Ruin

  // === ROMANCE ===
  4932:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 7 }, // Out of Sight Out of Time
  4933:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 7 }, // United We Spy

  // === NONFICTION ===
  9815:  { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 10, researchRigor: 9, access: 8 }, // Drowned and the Saved
  9816:  { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 9, researchRigor: 9, access: 8 }, // Moments of Reprieve
  9817:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // In the Shadow of the Sword
  9818:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Millennium
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-047 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

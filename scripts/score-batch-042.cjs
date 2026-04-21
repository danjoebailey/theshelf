// Batch 42 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  3446:  { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  3450:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Town
  3451:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Mansion
  3454:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Dance Dance Dance
  3458:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // First Person Singular
  3469:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9 }, // Schooldays of Jesus
  3481:  { prose: 8, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Across the River and into the Trees
  3483:  { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Voyage Out
  3484:  { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 8, resonance: 7, ending: 6, voice: 9 }, // Night and Day — Woolf
  3485:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Cossacks
  3486:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Family Happiness
  3488:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Tough Guys Don't Dance
  3491:  { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Body Artist
  3492:  { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Point Omega
  3493:  { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Silence — DeLillo
  3498:  { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 10 }, // Tristessa
  3499:  { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 10 }, // Satori in Paris
  3500:  { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Maggie Cassidy
  3504:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  3505:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  3506:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  3509:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  3512:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Two on a Tower
  3516:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Antelope Wife
  3623:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Temple of Dawn
  3624:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // Decay of the Angel
  3629:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Leaf Storm
  3637:  { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 10 }, // Benito Cereno
  3638:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Piazza Tales
  3677:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9 }, // Landline
  3693:  { prose: 10, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Complete Stories — Lispector
  3695:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Diary of a Mad Old Man
  4094:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 9 },
  4098:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  4107:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9 }, // Transmigration of Timothy Archer
  4114:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Edible Woman
  4115:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 6, voice: 9 }, // Lady Oracle
  4116:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Bodily Harm
  4117:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Penelopiad
  4126:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 5 }, // Worthy Opponents
  4135:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9 }, // Prisoner's Dilemma
  4136:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Testament of Mary
  4137:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Heather Blazing
  4139:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Tell Me Everything
  4141:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Magician's Assistant
  4212:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 9 },
  4262:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Timbuktu
  4263:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Telegraph Avenue
  4265:  { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Twenty-Seventh City
  4309:  { prose: 7, characters: 8, plot: 8, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 9, researchIntegration: 8 },
  4326:  { prose: 8, characters: 9, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 10 }, // Raylan
  4351:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10, periodAuthenticity: 10, researchIntegration: 9 },
  4387:  { prose: 7, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 7 }, // Witch of Portobello
  4394:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Five-Star Weekend
  4395:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8 }, // After I Do

  // === FANTASY ===
  11260: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, magicSystem: 7 }, // 300
  11261: { prose: 9, characters: 9, plot: 8, pacing: 8, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Batman: Year One
  11262: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Born Again
  11263: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 8, magicSystem: 6 }, // Pride of Baghdad
  11264: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Runaways v1
  11265: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 6 }, // We Stand on Guard
  11266: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Sweet Tooth v1
  11267: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Descender v1
  11268: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 8, magicSystem: 6 }, // Underwater Welder
  11269: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 10, worldBuilding: 8, magicSystem: 6 }, // Chicken with Plums
  11270: { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, worldBuilding: 8, magicSystem: 6 }, // Embroideries
  11290: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 8, magicSystem: 6 }, // Ghost World
  11291: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 7 }, // Patience
  11292: { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 10, worldBuilding: 7, magicSystem: 5 }, // Wilson
  11295: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 9 }, // Dead Country
  11296: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 9 }, // Wicked Problems
  11332: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 8 }, // Celtika

  // === SF ===
  12131: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Ethera Grave
  12132: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9, worldBuilding: 8, speculativeRigor: 8 }, // Planetfall
  12133: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // After Atlas
  12135: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Before Mars
  12136: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Machinehood
  12137: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Meru
  12138: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 8 }, // Loka
  12176: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 }, // SAO: Aincrad
  12177: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 }, // SAO: Fairy Dance
  12178: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 6 }, // Accel World v1
  12179: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Finna
  12180: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, speculativeRigor: 7 }, // Defekt
  12258: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Dead Lands
  12261: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Ninth Metal
  12265: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Prey of Gods
  12266: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Temper
  12267: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Escaping Exodus
  12271: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // Ammonite
  12272: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, speculativeRigor: 9 }, // Slow River
  12311: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 9 }, // Nexus

  // === MYSTERY ===
  6868:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Service of All the Dead
  6870:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Riddle of the Third Mile
  6874:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Dangerous Mourning
  6886:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 8, ending: 9, voice: 9, puzzle: 9, stakes: 8 }, // Brat Farrar
  6904:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Echo
  6908:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Laughing Policeman
  6909:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Fire Engine That Disappeared
  6910:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Abominable Man
  6920:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Curse of the Pharaohs
  6921:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Mummy Case
  6922:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Lion in the Valley
  6923:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Deeds of the Disturber
  6924:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Room Full of Bones
  6926:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Necessary End
  6927:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Hanging Valley

  // === THRILLER ===
  5316:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Ceremony in Death
  5317:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Vengeance in Death
  5318:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Holiday in Death
  5325:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // New Couple in 5B
  5326:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Out of Range
  5327:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Free Fire
  5328:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Blood Trail
  5329:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Below Zero
  5330:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Nowhere to Run
  5331:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Cold Wind
  5332:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Force of Nature
  5333:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 7 }, // Breaking Point
  5361:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Someone Knows
  5365:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Stone Monkey
  5366:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Vanished Man

  // === HORROR ===
  12123: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Tomb
  12125: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Sibs
  12126: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Reluctant Immortals
  12127: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Rust Maidens
  12128: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Boneset & Feathers
  8291:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 8, atmosphere: 9, dread: 8 }, // Lasher
  8292:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 6, voice: 8, atmosphere: 9, dread: 8 }, // Taltos
  8381:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Throat
  8857:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // Growing Things
  9019:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Outsider

  // === ROMANCE ===
  4627:  { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // King of Wrath
  4628:  { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // King of Pride
  4632:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, chemistry: 8, tension: 8, heaPayoff: 6 }, // Corrupt
  4633:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, chemistry: 8, tension: 8, heaPayoff: 6 }, // Hideaway
  4634:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 6 }, // Kill Switch
  4738:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // placeholder if exists; remove
  // skipping ID 4738 — not in candidates list

  // === NONFICTION ===
  4845:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 8, access: 7 }, // Log from Sea of Cortez
  4848:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Underground
  5127:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, argument: 8, researchRigor: 8, access: 9 }, // Bomber Mafia
  5128:  { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, argument: 8, researchRigor: 7, access: 9 }, // Revenge of the Tipping Point
  5608:  { prose: 9, characters: 7, plot: 6, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, argument: 8, researchRigor: 8, access: 10 }, // Grunt
  5610:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 8, access: 9 }, // Premonition
  7328:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 10, access: 8 }, // Overlord — Hastings
};

// Remove the placeholder — we don't actually have ID 4738
delete batch[4738];

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-042 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

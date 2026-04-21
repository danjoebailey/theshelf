// Batch 39 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  10720: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Surprised by Joy
  10721: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 9 }, // Till We Have Faces
  10723: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Great Divorce
  10730: { prose: 10, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10 }, // One Christmas
  10731: { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Simple Passion
  10732: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Happening
  10733: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Exteriors
  10734: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Getting Lost
  10780: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8 }, // Phases of Gravity
  10879: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 6, voice: 8 }, // Zeitgeist
  10910: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10911: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10912: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10987: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Sunken Land
  10995: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Icarus Girl
  11017: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  11030: { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 10, researchIntegration: 9 },
  11031: { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 10, researchIntegration: 9 },
  11032: { prose: 8, characters: 9, plot: 8, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 10, researchIntegration: 9 },
  11043: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Untamed Shore
  11178: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  11179: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Antidote
  11182: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Hotel Iris
  11183: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Diving Pool
  11210: { prose: 9, characters: 7, plot: 6, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Only Revolutions
  11248: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // This Rough Magic — Stewart
  11255: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Normal Rules Don't Apply
  11259: { prose: 9, characters: 8, plot: 6, pacing: 3, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Jerusalem — Moore
  11277: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Affirmation
  11300: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Last Night in Montreal
  11315: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  11347: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  11348: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  11349: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  11355: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8 }, // Last Family in England
  11356: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Dead Fathers Club
  11360: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Love & Sleep
  11361: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Daemonomania
  11362: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Endless Things
  11366: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  11407: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Justine
  11408: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Balthazar
  11409: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Mountolive
  11410: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Clea
  11411: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // 42nd Parallel
  11412: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Nineteen Nineteen
  11413: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Big Money
  11414: { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // Man Without Qualities v1
  11415: { prose: 10, characters: 9, plot: 5, pacing: 3, ideas: 10, resonance: 9, ending: 6, voice: 10 }, // v2
  11416: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Immoralist
  11417: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Strait is the Gate
  11418: { prose: 10, characters: 8, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Counterfeiters
  11419: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Lafcadio's Adventures
  11425: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Thanatos Syndrome
  11433: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },

  // === FANTASY ===
  10975: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Karen Memory
  10982: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Feast of Souls
  10988: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Course of the Heart
  10991: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 7 }, // Tooth and Claw
  10993: { prose: 9, characters: 7, plot: 6, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Palimpsest
  10994: { prose: 10, characters: 7, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Cities of Coin and Spice
  10998: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Tamsin
  10999: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Folk of the Air
  11000: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, worldBuilding: 7, magicSystem: 7 }, // Summerlong
  11002: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Anackire
  11003: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Storm Lord
  11037: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Trail of Lightning
  11038: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, magicSystem: 8 }, // Storm of Locusts
  11042: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Beautiful Ones
  11044: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 8, magicSystem: 7 }, // Brides of High Hill
  11045: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Siren Queen
  11046: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 8, magicSystem: 7 }, // Sorrowland

  // === SF ===
  11896: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Sinister Barrier
  11897: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 6 }, // Men, Martians and Machines
  11921: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 8 }, // Hominids
  11922: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 8 }, // Humans
  11923: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 8 }, // Calculating God
  11924: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 7 }, // Flashforward
  11925: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Thousand Words for Stranger
  11926: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Beholder's Eye
  11927: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Survival
  11928: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Into the Storm — Anderson
  11929: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Crusade
  11930: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Maelstrom
  11931: { prose: 6, characters: 6, plot: 6, pacing: 7, ideas: 6, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Steel World
  11932: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 5, worldBuilding: 6, speculativeRigor: 5 }, // Mech 12
  11933: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 5, worldBuilding: 7, speculativeRigor: 5 }, // Swarm
  11934: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Into the Black
  11935: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Heart of Matter
  11936: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // On Silver Wings
  11937: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Warship
  11938: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Call to Arms
  11939: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Counterstrike
  11991: { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Hidden Empire
  11992: { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Forest of Stars
  11993: { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Horizon Storms
  11994: { prose: 6, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Climbing Olympus

  // === MYSTERY ===
  6535:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Drowned Girl — Blædel
  6540:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Owls Well That Ends Well
  6541:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // No Nest for the Wicket
  6542:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Hen of the Baskervilles
  6559:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Storm — Theorin
  6614:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, puzzle: 6, stakes: 5 }, // Chapter & Hearse
  6615:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, puzzle: 6, stakes: 5 }, // Sentenced to Death
  6618:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // End of the Wasp Season
  6619:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Gods and Beasts
  6620:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Night Rounds
  6621:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Golden Calf
  6622:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Protected by the Shadows
  6623:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Cloche and Dagger
  6624:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // Death of a Mad Hatter
  6625:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 7, puzzle: 6, stakes: 5 }, // At the Drop of a Hat

  // === THRILLER ===
  4599:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Cross and Burn
  4600:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Insidious Intent
  4676:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Noise Downstairs
  4677:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Lethal
  4678:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Friction
  4679:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 6 }, // Cry in the Night
  4682:  { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Rainbow Six
  4684:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 6 }, // Takedown
  4685:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 6 }, // First Commandment
  4720:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Judge's List
  4723:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Night School
  4729:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 6 }, // Simply Lies
  4730:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 5, ending: 7, voice: 6, stakes: 7, twists: 7 }, // 6:20 Man
  4732:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // I Will Find You
  4736:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // One Perfect Couple

  // === HORROR ===
  12061: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Maker of Moons
  12062: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // E.F. Benson Ghost Stories
  12063: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Room in the Tower
  12064: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 10 }, // Cold Hand in Mine
  12065: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 10 }, // Dark Entries
  3856:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // From the Corner of His Eye
  3857:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, atmosphere: 8, dread: 7 }, // Face — Koontz
  4037:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, atmosphere: 9, dread: 8 }, // We Sold Our Souls
  4175:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, atmosphere: 10, dread: 10 }, // Black Phone
  4179:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // Bird's Nest

  // === ROMANCE ===
  2109:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 6, tension: 6, heaPayoff: 7 }, // Abundance of Katherines
  4028:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Bombshell
  4030:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Reel
  4031:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Soulmate Equation
  4032:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Josh and Hazel
  4033:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Hopeless — Silver
  4034:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Wild Love
  4044:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Restore Me
  4045:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, chemistry: 6, tension: 6, heaPayoff: 6 }, // Defy Me
  4050:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 6, heaPayoff: 7 }, // Once and for All
  4051:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 6, heaPayoff: 7 }, // Lock and Key
  4052:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 6, heaPayoff: 7 }, // Dreamland

  // === NONFICTION ===
  12201: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9, argument: 9, researchRigor: 8, access: 9 }, // Making Comics
  1018:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 8, argument: 8, researchRigor: 8, access: 9 }, // Innocent Man
  1402:  { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 7, ending: 6, voice: 10, argument: 7, researchRigor: 6, access: 6 }, // Remember to Remember
  1403:  { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 7, ending: 6, voice: 10, argument: 7, researchRigor: 6, access: 6 }, // Books in My Life
  1406:  { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 8, ending: 6, voice: 10, argument: 7, researchRigor: 6, access: 6 }, // Stand Still Like the Hummingbird
  1416:  { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 10, argument: 8, researchRigor: 7, access: 8 }, // Music for Chameleons
  1469:  { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 9, resonance: 10, ending: 7, voice: 10, argument: 8, researchRigor: 6, access: 8 }, // Blue Nights
  1682:  { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 10, ending: 8, voice: 10, argument: 10, researchRigor: 8, access: 9 }, // Notes of a Native Son
  3457:  { prose: 9, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, argument: 7, researchRigor: 6, access: 9 }, // What I Talk About Running
  3463:  { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 10, argument: 7, researchRigor: 6, access: 9 }, // View from the Cheap Seats
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-039 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

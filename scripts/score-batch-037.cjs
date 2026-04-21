// Batch 37 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  10397: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 10 }, // Saint Joan
  10398: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Major Barbara
  10399: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 8, voice: 10 }, // Mrs Warren's Profession
  10400: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10 }, // Arms and the Man
  10406: { prose: 10, characters: 10, plot: 8, pacing: 4, ideas: 10, resonance: 10, ending: 10, voice: 10 }, // Long Day's Journey
  10407: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // Iceman Cometh
  10408: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Mourning Becomes Electra
  10409: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Desire Under the Elms
  10410: { prose: 10, characters: 10, plot: 7, pacing: 4, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // Moon for the Misbegotten
  10415: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Caretaker — Pinter
  10416: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 10 }, // Betrayal
  10417: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 8, voice: 10 }, // No Man's Land
  10418: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 9, voice: 10 }, // Rosencrantz and Guildenstern
  10419: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // Arcadia — Stoppard
  10420: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 10, resonance: 8, ending: 8, voice: 10 }, // Travesties
  10421: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Real Thing
  10422: { prose: 10, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 9, ending: 9, voice: 10, periodAuthenticity: 10, researchIntegration: 9 }, // Coast of Utopia
  10423: { prose: 10, characters: 9, plot: 8, pacing: 8, ideas: 8, resonance: 9, ending: 9, voice: 10 }, // Code of the Woosters
  10424: { prose: 10, characters: 9, plot: 8, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 10 }, // Right Ho, Jeeves
  10425: { prose: 9, characters: 9, plot: 7, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 10 }, // Inimitable Jeeves
  10426: { prose: 9, characters: 9, plot: 8, pacing: 8, ideas: 7, resonance: 9, ending: 9, voice: 10 }, // Leave It to Psmith
  10427: { prose: 9, characters: 9, plot: 7, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 10 }, // Carry On, Jeeves
  10428: { prose: 9, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 10 }, // Summer Lightning
  10470: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // My Dark Places — Ellroy
  10503: { prose: 10, characters: 7, plot: 5, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Amores
  10504: { prose: 10, characters: 8, plot: 6, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Heroides
  10505: { prose: 9, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Fasti
  10506: { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Tristia
  10513: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 8, researchIntegration: 7 },
  10514: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9 }, // Iphigenia in Tauris
  10515: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Poetry and Truth
  10553: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  10554: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // Coronado
  10557: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 8, researchIntegration: 7 },
  10562: { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  10563: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10564: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10565: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10566: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10567: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  10568: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7 }, // Ladies of Missalonghi
  10569: { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, periodAuthenticity: 7, researchIntegration: 7 },
  10571: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Running in the Family
  10572: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Thing Around Your Neck
  10576: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Fortune of the Rougons
  10577: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // The Kill — Zola
  10578: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Masterpiece
  10579: { prose: 8, characters: 7, plot: 6, pacing: 5, ideas: 7, resonance: 7, ending: 7, voice: 8 }, // The Dream — Zola
  10580: { prose: 8, characters: 7, plot: 6, pacing: 4, ideas: 8, resonance: 7, ending: 6, voice: 8 }, // Lourdes
  10582: { prose: 10, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10 }, // Boule de Suif
  10583: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Mont-Oriol
  10585: { prose: 10, characters: 9, plot: 6, pacing: 3, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Sodom and Gomorrah
  10586: { prose: 10, characters: 9, plot: 6, pacing: 3, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Captive
  10587: { prose: 10, characters: 9, plot: 6, pacing: 3, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Fugitive
  10591: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 9 }, // Zadig
  10606: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9 }, // Alcestis
  10607: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 9, voice: 9 }, // Hippolytus
  10608: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Hecuba
  10609: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 10, resonance: 9, ending: 9, voice: 9 }, // Iphigenia in Aulis
  10610: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 9 }, // Electra — Euripides

  // === FANTASY ===
  10832: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Eight Days of Luke
  10865: { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Oath of Fealty
  10881: { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Killing Dance
  10882: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Burnt Offerings
  10883: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Blue Moon
  10884: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 8, magicSystem: 7 }, // Obsidian Butterfly
  10885: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 6 }, // Narcissus in Chains
  10886: { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 6 }, // Cerulean Sins
  10887: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 6 }, // Definitely Dead
  10888: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 6 }, // All Together Dead
  10889: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 6 }, // From Dead to Worse
  10890: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 6 }, // Dead and Gone
  10891: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 6 }, // Dead in the Family
  10892: { prose: 6, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 5, ending: 6, voice: 6, worldBuilding: 7, magicSystem: 6 }, // Dead Reckoning
  10894: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 }, // No Humans Involved
  10895: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, magicSystem: 7 }, // Personal Demon
  10922: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // King Rat — Miéville

  // === SF ===
  11758: { prose: 7, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // How Few Remain
  11759: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Worldwar
  11765: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Dreamsnake
  11767: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Starfarers
  11784: { prose: 9, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 8, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Pavane
  11785: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 7 }, // Chalk Giants
  11786: { prose: 7, characters: 6, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Berserker
  11789: { prose: 7, characters: 6, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 7, worldBuilding: 7, speculativeRigor: 8 }, // First Contact
  11790: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 7, resonance: 5, ending: 6, voice: 6, worldBuilding: 8, speculativeRigor: 6 }, // Forgotten Planet
  11791: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 6 }, // Martians, Go Home
  11792: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 6, ending: 7, voice: 8, worldBuilding: 8, speculativeRigor: 6 }, // What Mad Universe
  11793: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 7, speculativeRigor: 7 }, // Lights in the Sky Are Stars
  11797: { prose: 7, characters: 6, plot: 7, pacing: 6, ideas: 8, resonance: 6, ending: 7, voice: 7, worldBuilding: 7, speculativeRigor: 7 }, // A for Anything
  11798: { prose: 7, characters: 6, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, worldBuilding: 7, speculativeRigor: 6 }, // Beyond the Barrier
  11799: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Hymn Before Battle
  11800: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Gust Front
  11801: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // When the Devil Dances
  11803: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Dauntless
  11804: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Fearless
  11805: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Courageous
  11806: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Valiant
  11807: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Terms of Enlistment
  11808: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Lines of Departure
  11809: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Angles of Attack
  11810: { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, worldBuilding: 7, speculativeRigor: 6 }, // Legion of the Damned

  // === MYSTERY ===
  6328:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Shatter the Bones
  6329:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Close to the Bone
  6330:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Missing and the Dead
  6331:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // In the Cold Dark Ground
  6332:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Ice Child
  6333:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Hidden Child
  6334:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Drowning
  6335:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Lost Boy
  6338:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 8, stakes: 7 }, // Purity of Vengeance
  6339:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 8, stakes: 7 }, // Marco Effect
  6340:  { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, puzzle: 8, stakes: 7 }, // Hanging Girl
  6349:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Burning Girl
  6350:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Lifeless
  6351:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Buried
  6352:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, puzzle: 7, stakes: 7 }, // Death Message

  // === THRILLER ===
  4315:  { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Cardinal of the Kremlin
  4316:  { prose: 7, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Debt of Honor
  4317:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Executive Orders
  4321:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, stakes: 7, twists: 7 }, // Glitz
  4328:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Overlook
  4374:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Lion's Game
  4379:  { prose: 6, characters: 6, plot: 7, pacing: 8, ideas: 7, resonance: 5, ending: 6, voice: 6, stakes: 8, twists: 7 }, // Judas Strain
  4382:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // White Hot
  4383:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 5, resonance: 5, ending: 6, voice: 6, stakes: 7, twists: 7 }, // Tailspin
  4413:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 6, voice: 7, stakes: 7, twists: 6 }, // Dark Rivers of the Heart
  4433:  { prose: 7, characters: 7, plot: 7, pacing: 8, ideas: 8, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Airframe
  4434:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 8, twists: 8 }, // Disclosure
  4437:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Vanish
  4438:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Keepsake
  4439:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Ice Cold

  // === HORROR ===
  11963: { prose: 6, characters: 6, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, atmosphere: 7, dread: 7 }, // God Project
  12021: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Lost Souls
  12022: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Drawing Blood
  12023: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 6, ending: 7, voice: 9, atmosphere: 10, dread: 9 }, // Exquisite Corpse
  12024: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Priest of Blood
  12025: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Neverland
  767:   { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Christine
  768:   { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 9 }, // Needful Things
  771:   { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 8, voice: 8, atmosphere: 9, dread: 9 }, // Revival
  971:   { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Firestarter
  973:   { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, atmosphere: 10, dread: 10 }, // Gerald's Game
  981:   { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Duma Key

  // === ROMANCE ===
  1120:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 6, voice: 6, chemistry: 7, tension: 7, heaPayoff: 6 }, // Dear John
  1121:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 6, voice: 6, chemistry: 7, tension: 7, heaPayoff: 6 }, // Last Song
  2043:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 6, voice: 7, chemistry: 7, tension: 7, heaPayoff: 6 }, // Summer I Turned Pretty
  2044:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 7, chemistry: 7, tension: 6, heaPayoff: 6 }, // It's Not Summer Without You
  2095:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Reckless — Silver
  2096:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Happy Ever After Playlist
  2097:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Life's Too Short
  2099:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 6 }, // Confess
  2101:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Longest Ride
  2102:  { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Last Letter from Your Lover
  2520:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Winter — Meyer
  2527:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 7, resonance: 8, ending: 7, voice: 9, chemistry: 7, tension: 7, heaPayoff: 6 }, // Raven King
  2537:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 6, heaPayoff: 7 }, // Saint Anything
  2541:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 6 }, // Nothing More to Tell
  2542:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 6 }, // You'll Be the Death of Me
  2544:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // In a Holidaze
  2545:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Something Wilder
  3131:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Offer from a Gentleman
  3134:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // It Happened One Autumn

  // === NONFICTION ===
  10757: { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // First Salute
  10758: { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, argument: 9, researchRigor: 8, access: 8 }, // We Were Eight Years
  10759: { prose: 9, characters: 7, plot: 6, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9, argument: 9, researchRigor: 7, access: 8 }, // The Message
  10878: { prose: 8, characters: 7, plot: 6, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, argument: 8, researchRigor: 8, access: 8 }, // Hacker Crackdown
  9800:  { prose: 9, characters: 7, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 9 }, // Johnstown Flood
  9801:  { prose: 10, characters: 7, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 9, access: 8 }, // Pine Barrens
  9802:  { prose: 10, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, argument: 8, researchRigor: 9, access: 8 }, // Sense of Where You Are
  9805:  { prose: 10, characters: 7, plot: 6, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 10, argument: 9, researchRigor: 10, access: 7 }, // Curve of Binding Energy
  9806:  { prose: 9, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 8 }, // Bunker Hill
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-037 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

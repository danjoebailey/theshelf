// Batch 48 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  8808:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7 }, // Troubles in Paradise
  8821:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  8839:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, periodAuthenticity: 7, researchIntegration: 7 },
  8840:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Blessing in Disguise
  8841:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Complications
  8842:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // High Stakes
  8850:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8 }, // Lone Wolf
  8872:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Innocent
  8894:  { prose: 9, characters: 9, plot: 6, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // And Every Morning
  8935:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Right Mistake
  8950:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Silent Night
  8951:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Invisible
  8953:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Never Too Late
  8957:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 7 }, // Sooley
  9004:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, periodAuthenticity: 7, researchIntegration: 7 },
  9005:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, periodAuthenticity: 7, researchIntegration: 7 },
  9036:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Good Fight
  9117:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Miracle
  9118:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Sunset in St. Tropez
  9119:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6 }, // Sisters — Steel
  11462: { prose: 10, characters: 10, plot: 7, pacing: 5, ideas: 10, resonance: 10, ending: 8, voice: 10 }, // Zorba the Greek
  11463: { prose: 10, characters: 10, plot: 8, pacing: 5, ideas: 10, resonance: 10, ending: 9, voice: 10 }, // Last Temptation of Christ
  11464: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  11466: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Family of Pascual Duarte
  11467: { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Hive
  11475: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Real Story of Ah-Q
  11476: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Wandering
  11477: { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Diary of a Madman
  11478: { prose: 10, characters: 9, plot: 7, pacing: 4, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Mr. Mani
  11479: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Late Divorce
  11480: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Lover
  11481: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Woman in Jerusalem
  11483: { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10 }, // How Late It Was, How Late
  11484: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Disaffection
  11485: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Busconductor Hines
  11486: { prose: 9, characters: 9, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Kieron Smith, boy
  11493: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Ryder
  11494: { prose: 9, characters: 7, plot: 5, pacing: 5, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Ladies Almanack
  11505: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 9 }, // Thousand Acres
  11506: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Moo
  11507: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Horse Heaven
  11508: { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 9, researchIntegration: 8 },
  11521: { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Book of Numbers
  11524: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Torch
  11525: { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Difficult Women
  11530: { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Spider's House
  11531: { prose: 10, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Up Above the World
  11632: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 9, voice: 10 }, // Boy's Life
  11652: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 9, periodAuthenticity: 10, researchIntegration: 9 },
  11663: { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 8, ending: 8, voice: 8 }, // Tarzan of the Apes
  11670: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 8, ending: 8, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  11672: { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 8, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 8, researchIntegration: 7 },
  11673: { prose: 8, characters: 8, plot: 9, pacing: 8, ideas: 9, resonance: 8, ending: 8, voice: 8 }, // Battle Royale
  11677: { prose: 8, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 9 }, // Chocolat
  11708: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  11709: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  11710: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  11760: { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },
  11761: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 8, voice: 10 }, // Lamb
  11766: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 8, periodAuthenticity: 9, researchIntegration: 8 },

  // === FANTASY ===
  11613: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Ships of Merior
  11614: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 9 }, // Warhost of Vastmark
  11618: { prose: 9, characters: 9, plot: 8, pacing: 5, ideas: 9, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Vagabond v1
  11619: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 6 }, // Slam Dunk v1
  11620: { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 10, ending: 8, voice: 10, worldBuilding: 9, magicSystem: 6 }, // Real v1
  11624: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Succubus Blues
  11625: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Some Girls Bite
  11626: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Friday Night Bites
  3940:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Sorceress of Darshiva
  3941:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 8, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Seeress of Kell
  3945:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Starless Night
  4047:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Lady Midnight
  4048:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Lord of Shadows
  4049:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, magicSystem: 8 }, // Queen of Air and Darkness
  4158:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 6 }, // Long Patrol
  4159:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, magicSystem: 6 }, // Lord Brocktree

  // === SF ===
  5881:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 8 }, // Long Earth
  5964:  { prose: 7, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Eye of the Bedlam Bride
  6127:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 9, speculativeRigor: 9 }, // Bloodchild
  6703:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Poster Girl
  6985:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 8 }, // Ship Who Sang
  7448:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Absolution
  7633:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 9 }, // Burning Chrome
  7644:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Mercy of Gods
  8222:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 7 }, // Dragondrums
  8244:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // One of Our Thursdays
  8245:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Woman Who Died a Lot
  8250:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Magic Labyrinth
  8251:  { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 7 }, // Gods of Riverworld
  8299:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 8 }, // Binti: Night Masquerade
  8337:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Temporal Void
  8338:  { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Evolutionary Void
  8390:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 9 }, // Annals of the Heechee
  8391:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 9, speculativeRigor: 8 }, // Gateway Trip
  8454:  { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Furious Gulf
  8455:  { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 10, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Sailing Bright Eternity
  8979:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Atrocity Archives
  8981:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // Emphyrio
  8987:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 9, ending: 7, voice: 10, worldBuilding: 10, speculativeRigor: 8 }, // How Long 'til Black Future Month?
  9104:  { prose: 9, characters: 7, plot: 7, pacing: 6, ideas: 10, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Ape and Essence
  9263:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 9, resonance: 7, ending: 8, voice: 9, worldBuilding: 10, speculativeRigor: 9 }, // Machine Vendetta

  // === MYSTERY ===
  9166:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Falcon at the Portal
  9168:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Lord of the Silent
  9169:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Golden One
  9176:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // I Am Half-Sick of Shadows
  9191:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Amazing Mrs. Pollifax
  9194:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Mrs. Pollifax on Safari
  9195:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // China Station
  9196:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Hong Kong Buddha
  9197:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Golden Triangle
  9198:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Whirling Dervish
  9199:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Second Thief
  9211:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Vintage Murder
  9212:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Overture to Death
  9213:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Death at the Bar
  9214:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 8, voice: 8, puzzle: 8, stakes: 7 }, // Final Curtain

  // === THRILLER ===
  6548:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Hannibal Rising
  6549:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 8, twists: 6 }, // Tiger's Claw
  6550:  { prose: 6, characters: 7, plot: 7, pacing: 8, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 8, twists: 6 }, // Starfire
  6713:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Sahara
  6714:  { prose: 7, characters: 7, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Atlantis Found
  6722:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Seventh Scroll
  6724:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Good Bad Girl
  6736:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Lie Maker
  6737:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // I Will Ruin You
  6758:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9, stakes: 7, twists: 7 }, // Innocent Blood
  6808:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Scarlatti Inheritance
  6809:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Chancellor Manuscript
  6810:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 8 }, // Matarese Circle
  7430:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, stakes: 7, twists: 8 }, // Midnight Feast
  7455:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 8 }, // Everyone Here Is Lying

  // === HORROR ===
  12293: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 9 }, // Sisters — Johnson
  12299: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 10 }, // Cipher
  12300: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, atmosphere: 10, dread: 9 }, // Skin
  12301: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 9 }, // Bad Brains
  12302: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // Experimental Film
  12304: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 9 }, // In the House of the Worm
  12310: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 9 }, // Things We Say in the Dark
  12348: { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 9, ending: 8, voice: 10, atmosphere: 10, dread: 10 }, // Woman in Black
  12349: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 9 }, // Mist in the Mirror
  12350: { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10, atmosphere: 10, dread: 9 }, // Dolly

  // === ROMANCE ===
  4934:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, chemistry: 6, tension: 7, heaPayoff: 7 }, // Heist Society
  4940:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Heir

  // === NONFICTION ===
  9821:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Paradise Built in Hell
  9822:  { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Faraway Nearby
  9823:  { prose: 9, characters: 8, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Hope in the Dark
  9838:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 9, access: 9 }, // Witches — Schiff
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-048 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

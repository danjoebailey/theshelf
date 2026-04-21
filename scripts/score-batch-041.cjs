// Batch 41 — broad coverage continuation
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === LITERARY ===
  2243:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 6, voice: 10 }, // Serotonin
  2258:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Super-Cannes
  2259:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Kindness of Women
  2265:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 9, ending: 7, voice: 9 }, // Lemon Table
  2266:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Elizabeth Finch
  2271:  { prose: 10, characters: 8, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Oblivion
  2272:  { prose: 10, characters: 8, plot: 5, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Girl with Curious Hair
  2305:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 7, voice: 9 }, // Exile and the Kingdom
  2312:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 6, voice: 9 }, // Garden of Eden
  2313:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 8, resonance: 8, ending: 6, voice: 9 }, // Islands in the Stream
  2314:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // After Dark
  2316:  { prose: 9, characters: 8, plot: 6, pacing: 4, ideas: 9, resonance: 7, ending: 6, voice: 10 }, // Killing Commendatore
  2319:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // Home — Morrison
  2320:  { prose: 10, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10 }, // God Help the Child
  2438:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Pirate Freedom
  2586:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Rosshalde
  2587:  { prose: 9, characters: 8, plot: 6, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Knulp
  2599:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 10 }, // Nobody Move
  2629:  { prose: 8, characters: 8, plot: 8, pacing: 8, ideas: 7, resonance: 7, ending: 8, voice: 9 }, // Getaway
  2630:  { prose: 8, characters: 8, plot: 7, pacing: 8, ideas: 7, resonance: 7, ending: 7, voice: 9 }, // Swell-Looking Babe
  2659:  { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Wild Boys
  2660:  { prose: 9, characters: 7, plot: 5, pacing: 4, ideas: 10, resonance: 8, ending: 6, voice: 10 }, // Cities of the Red Night
  2682:  { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Endgame
  2683:  { prose: 10, characters: 9, plot: 6, pacing: 5, ideas: 10, resonance: 9, ending: 8, voice: 10 }, // Krapp's Last Tape
  2693:  { prose: 9, characters: 8, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 10 }, // Always Outnumbered
  2704:  { prose: 10, characters: 8, plot: 5, pacing: 3, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Concrete
  2705:  { prose: 10, characters: 8, plot: 5, pacing: 3, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Frost
  2771:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Bleeding Edge
  2772:  { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Vineland
  2836:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9 }, // Strangers in the House
  2837:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 9 }, // Act of Passion
  2860:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9 }, // Time of the Hero
  2892:  { prose: 10, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 10, ending: 8, voice: 10, periodAuthenticity: 9, researchIntegration: 8 },
  3024:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10 }, // Kiss Kiss
  3025:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 9, resonance: 9, ending: 9, voice: 10 }, // Someone Like You
  3148:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 5 }, // Without Merit
  3153:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6 }, // Two by Two
  3197:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Lifted Veil
  3198:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Pair of Blue Eyes
  3224:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Victim
  3235:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Centaur
  3386:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, periodAuthenticity: 8, researchIntegration: 7 },
  3399:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Whore's Child
  3404:  { prose: 9, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 8, ending: 7, voice: 9 }, // Until I Find You
  3405:  { prose: 8, characters: 9, plot: 7, pacing: 5, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // Last Chairlift
  3425:  { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Morning Star
  3426:  { prose: 9, characters: 9, plot: 6, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 10 }, // Wolves of Eternity
  3430:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // England Made Me
  3431:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9 }, // It's a Battlefield
  3433:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9 }, // Loser Takes All
  3434:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 9 }, // Doctor Fischer of Geneva
  3435:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9 }, // Captain and the Enemy
  3436:  { prose: 9, characters: 9, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9 }, // Monsignor Quixote
  3437:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 8, voice: 9 }, // Tenth Man
  3445:  { prose: 9, characters: 9, plot: 8, pacing: 4, ideas: 9, resonance: 8, ending: 7, voice: 10 }, // Martin Chuzzlewit

  // === FANTASY ===
  11142: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 9 }, // House of Blades
  11161: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Fire Endless
  11186: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Gilded Chain
  11187: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Lord of the Fire Lands
  11188: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 6, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 7 }, // Sky of Swords
  11189: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Priestess of the White
  11190: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Last of the Wilds
  11191: { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, magicSystem: 8 }, // Voice of the Gods
  11218: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Dragons of Babel
  11219: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 9, magicSystem: 8 }, // Jack Faust
  11233: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Remina
  11234: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Fragments of Horror
  11235: { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 10, magicSystem: 7 }, // Shiver
  11249: { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, worldBuilding: 8, magicSystem: 7 }, // Thornyhold
  11256: { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 10, resonance: 9, ending: 9, voice: 10, worldBuilding: 9, magicSystem: 7 }, // V for Vendetta
  11257: { prose: 10, characters: 9, plot: 8, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // From Hell
  11258: { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, worldBuilding: 10, magicSystem: 8 }, // League v1

  // === SF ===
  12050: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Shore of Women
  12051: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Cloned Lives
  12052: { prose: 7, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 7, worldBuilding: 8, speculativeRigor: 7 }, // Venus of Dreams
  12053: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Door into Ocean
  12054: { prose: 8, characters: 8, plot: 7, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 9 }, // Children Star
  12055: { prose: 8, characters: 7, plot: 7, pacing: 5, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 9, speculativeRigor: 9 }, // Brain Plague
  12057: { prose: 8, characters: 7, plot: 7, pacing: 4, ideas: 10, resonance: 8, ending: 7, voice: 9, worldBuilding: 10, speculativeRigor: 7 }, // Night Land
  12079: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Book of M
  12099: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Growing Up Weightless
  12104: { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 9, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // I'm Waiting for You
  12105: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Origin of Species
  12106: { prose: 9, characters: 8, plot: 6, pacing: 5, ideas: 9, resonance: 8, ending: 7, voice: 10, worldBuilding: 9, speculativeRigor: 8 }, // Prophet of Corruption
  12113: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Morlock Night
  12114: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Infernal Devices
  12115: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Dr. Adder
  12116: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Noir
  12117: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Digging Leviathan
  12118: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 9, worldBuilding: 9, speculativeRigor: 7 }, // Homunculus
  12129: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Nophek Gloss
  12130: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 7, ending: 7, voice: 8, worldBuilding: 10, speculativeRigor: 8 }, // Azura Ghost

  // === MYSTERY ===
  6745:  { prose: 9, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, puzzle: 8, stakes: 8 }, // Crusader's Cross
  6748:  { prose: 9, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Man Who Came Uptown
  6757:  { prose: 9, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, puzzle: 8, stakes: 7 }, // Cover Her Face
  6759:  { prose: 9, characters: 9, plot: 9, pacing: 6, ideas: 9, resonance: 9, ending: 8, voice: 10, puzzle: 9, stakes: 8 }, // Gaudy Night
  6760:  { prose: 9, characters: 9, plot: 9, pacing: 7, ideas: 9, resonance: 8, ending: 8, voice: 10, puzzle: 9, stakes: 7 }, // Murder Must Advertise
  6823:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 7 }, // Looking for Rachel Wallace
  6826:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 9, puzzle: 7, stakes: 6 }, // Burglar in the Closet
  6829:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 9, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Sacred Ginmill Closes
  6830:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Dance at the Slaughterhouse
  6832:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 9, puzzle: 8, stakes: 8 }, // Long Line of Dead Men
  6854:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // Guilty Thing Surprised
  6855:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 7 }, // No More Dying Then
  6864:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 7, stakes: 6 }, // Anodyne Necklace
  6866:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Last Seen Wearing
  6867:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, puzzle: 8, stakes: 7 }, // Silent World

  // === THRILLER ===
  5234:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Fallen Angel
  5235:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // English Girl
  5236:  { prose: 8, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, stakes: 8, twists: 7 }, // Heist
  5283:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Cruel and Unusual
  5284:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Body Farm
  5285:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // From Potter's Field
  5286:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, stakes: 8, twists: 7 }, // Cause of Death
  5293:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Fatal Voyage
  5294:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Grave Secrets
  5295:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Bare Bones
  5296:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Monday Mourning
  5297:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Cross Bones
  5298:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Break No Bones
  5299:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 7, stakes: 7, twists: 7 }, // Bones to Ashes
  5315:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 7, voice: 6, stakes: 7, twists: 7 }, // Rapture in Death

  // === HORROR ===
  12074: { prose: 8, characters: 7, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, atmosphere: 8, dread: 8 }, // Missing — Langan
  12075: { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Good Neighbors
  12076: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Familiar Spirit
  12077: { prose: 8, characters: 7, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 8, dread: 8 }, // Pillow Friend
  12122: { prose: 7, characters: 8, plot: 8, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Keep
  5089:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // What Feasts at Night
  6668:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 6, ending: 6, voice: 6, atmosphere: 7, dread: 7 }, // Resort
  6672:  { prose: 8, characters: 8, plot: 8, pacing: 6, ideas: 8, resonance: 7, ending: 7, voice: 8, atmosphere: 9, dread: 8 }, // Mystery — Straub
  6752:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 8, resonance: 7, ending: 7, voice: 9, atmosphere: 9, dread: 8 }, // Ghost Summer
  8280:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 6, voice: 6, atmosphere: 8, dread: 7 }, // Garden of Shadows

  // === ROMANCE ===
  4558:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 8, ending: 7, voice: 9, chemistry: 8, tension: 7, heaPayoff: 8 }, // Unknown Ajax
  4559:  { prose: 9, characters: 9, plot: 8, pacing: 6, ideas: 8, resonance: 8, ending: 8, voice: 10, chemistry: 9, tension: 8, heaPayoff: 9 }, // Venetia
  4560:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, chemistry: 9, tension: 8, heaPayoff: 9 }, // These Old Shades
  4561:  { prose: 9, characters: 9, plot: 8, pacing: 7, ideas: 8, resonance: 8, ending: 8, voice: 10, chemistry: 9, tension: 8, heaPayoff: 9 }, // Devil's Cub
  4614:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Black Rose
  4616:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Next Always
  4620:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Indigo
  4621:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Night Hawk
  4625:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // How to Find a Princess
  4626:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Long Shot

  // === NONFICTION ===
  4367:  { prose: 9, characters: 8, plot: 7, pacing: 6, ideas: 9, resonance: 8, ending: 8, voice: 9, argument: 9, researchRigor: 10, access: 8 }, // Double Cross — Macintyre
  4485:  { prose: 8, characters: 7, plot: 6, pacing: 7, ideas: 8, resonance: 8, ending: 7, voice: 8, argument: 8, researchRigor: 7, access: 9 }, // Courage Is Calling
  4642:  { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 8, ending: 7, voice: 10, argument: 9, researchRigor: 9, access: 9 }, // Dragons of Eden
  4644:  { prose: 9, characters: 7, plot: 6, pacing: 7, ideas: 9, resonance: 7, ending: 7, voice: 10, argument: 8, researchRigor: 8, access: 10 }, // Fuzz
  4693:  { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 8, access: 8 }, // Swim in a Pond
  4772:  { prose: 9, characters: 7, plot: 5, pacing: 6, ideas: 8, resonance: 9, ending: 7, voice: 9, argument: 8, researchRigor: 6, access: 9 }, // Precious Days
  4784:  { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 7, access: 7 }, // Twilight of the Idols
  4785:  { prose: 10, characters: 7, plot: 5, pacing: 6, ideas: 10, resonance: 9, ending: 8, voice: 10, argument: 9, researchRigor: 7, access: 6 }, // Ecce Homo
  4839:  { prose: 8, characters: 6, plot: 5, pacing: 6, ideas: 8, resonance: 6, ending: 6, voice: 9, argument: 7, researchRigor: 6, access: 8 }, // White
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-041 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

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

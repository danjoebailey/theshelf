const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Julie Czerneda — Canadian SF, biologist, alien biology focus
  11925: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["space-opera", "female-protagonist", "first-person", "aliens", "romance-subplot", "far-future", "biological"] },
  11926: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["space-opera", "aliens", "shape-shifting", "far-future", "biological", "episodic"] },
  11927: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["space-opera", "female-protagonist", "aliens", "first-contact", "biological", "far-future"] },

  // Evan Currie — indie mil-SF
  11934: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 2 }, tags: ["military-sf", "space-opera", "male-protagonist", "action", "aliens", "near-future", "naval"] },
  11935: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 2 }, tags: ["military-sf", "space-opera", "male-protagonist", "action", "aliens"] },
  11936: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 7, emotional_register: 4, interiority: 3, tone: 4, difficulty: 2 }, tags: ["military-sf", "female-protagonist", "near-future", "action", "soldier-protagonist"] },

  // Joshua Dalzelle — indie mil-SF
  11937: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 3, difficulty: 2 }, tags: ["military-sf", "space-opera", "male-protagonist", "action", "far-future", "war"] },
  11938: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 3, difficulty: 2 }, tags: ["military-sf", "space-opera", "male-protagonist", "action", "war"] },
  11939: { vibes: { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 8, emotional_register: 4, interiority: 3, tone: 3, difficulty: 2 }, tags: ["military-sf", "space-opera", "male-protagonist", "action", "war"] },

  // Kristen Britain — Green Rider (epic fantasy, messenger protagonist)
  11976: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "female-protagonist", "quest", "coming-of-age", "horse-culture", "messenger-protagonist"] },
  11977: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "female-protagonist", "time-travel", "political-intrigue"] },
  11978: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "female-protagonist", "political-intrigue", "war"] },

  // Gail Z. Martin — Chronicles of the Necromancer
  11995: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["epic-fantasy", "secondary-world", "male-protagonist", "necromancy", "chosen-one", "quest", "revenge-plot", "ensemble-cast"] },
  11996: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["epic-fantasy", "secondary-world", "necromancy", "war", "political-intrigue"] },
  11997: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["epic-fantasy", "secondary-world", "necromancy", "political-intrigue", "romance-subplot"] },

  // Cornelia Funke — Inkheart (YA, book-magic)
  12004: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["YA-fantasy", "portal-fantasy", "female-protagonist", "books-within-books", "metafiction", "coming-of-age", "father-daughter", "translated-from"] },
  12005: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["YA-fantasy", "portal-fantasy", "female-protagonist", "books-within-books", "quest"] },
  12006: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 }, tags: ["YA-fantasy", "portal-fantasy", "female-protagonist", "books-within-books", "war"] },
  12007: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 3, emotional_register: 6, interiority: 5, tone: 6, difficulty: 3 }, tags: ["YA-fantasy", "male-protagonist", "orphan-protagonist", "venice-setting", "heist", "found-family"] },

  // Philip Reeve — Mortal Engines (YA steampunk)
  12011: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["YA-sci-fi", "steampunk", "post-apocalyptic", "male-protagonist", "adventure", "ensemble-cast", "dystopian", "worldbuilding-heavy"] },
  12012: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["YA-sci-fi", "steampunk", "adventure", "arctic-setting", "ensemble-cast"] },
  12013: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["YA-sci-fi", "steampunk", "adventure", "ensemble-cast", "war"] },
  12014: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["YA-sci-fi", "steampunk", "war", "ensemble-cast", "post-apocalyptic", "sacrifice"] },

  // Elizabeth Hand — literary SF/horror, dense and mythic
  12018: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["far-future", "post-apocalyptic", "lyrical-prose", "gender", "secondary-world", "baroque-prose", "literary-sf"] },
  12019: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["dark-fantasy", "academia", "mythology", "female-protagonist", "lyrical-prose", "gothic-atmosphere", "washington-dc-setting", "pagan"] },
  12020: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-thriller", "female-protagonist", "artist-protagonist", "new-england-setting", "photography", "bleak", "noir"] },

  // Poppy Z. Brite — transgressive gothic horror
  12021: { vibes: { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 8, pace: 5, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["gothic-horror", "vampires", "queer-protagonist", "lyrical-prose", "road-trip", "transgressive", "youth-gang", "southern-setting", "substance-abuse"] },
  12022: { vibes: { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 7, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["gothic-horror", "queer-protagonist", "lyrical-prose", "writer-protagonist", "haunted-house", "southern-setting", "substance-abuse", "grief"] },
  12023: { vibes: { prose_craft: 7, prose_style: 7, warmth: 1, intensity: 10, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 1, interiority: 7, tone: 2, difficulty: 5 }, tags: ["psychological-horror", "serial-killer", "queer-protagonist", "graphic-violence", "transgressive", "new-orleans-setting", "body-horror"] },

  // Douglas Clegg — horror
  12024: { vibes: { prose_craft: 5, prose_style: 5, warmth: 3, intensity: 7, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 5, tone: 2, difficulty: 4 }, tags: ["dark-fantasy", "vampires", "historical-fantasy", "male-protagonist", "medieval-setting", "violence"] },
  12025: { vibes: { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 5, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "child-protagonist", "island-setting", "family", "summer-setting", "coming-of-age", "evil-presence"] },
  12026: { vibes: { prose_craft: 5, prose_style: 5, warmth: 3, intensity: 7, pace: 5, moral_complexity: 5, fabulism: 5, emotional_register: 2, interiority: 5, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "small-town", "evil-presence", "new-england-setting", "coming-of-age"] },

  // Diane Duane — Young Wizards (YA) and Door into Fire
  12030: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["YA-fantasy", "urban-fantasy", "female-protagonist", "coming-of-age", "found-family", "new-york-setting", "soft-magic", "contemporary-setting"] },
  12031: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 }, tags: ["YA-fantasy", "urban-fantasy", "female-protagonist", "ocean-setting", "found-family", "soft-magic"] },
  12032: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["YA-fantasy", "urban-fantasy", "female-protagonist", "space-opera", "found-family", "soft-magic"] },
  12033: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["high-fantasy", "queer-protagonist", "male-protagonist", "secondary-world", "quest", "romance-subplot", "fire-magic"] },

  // Robert Sheckley — classic comic SF, absurdist master
  12034: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 3, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 4, tone: 9, difficulty: 3 }, tags: ["satirical", "soft-sf", "absurdist", "vignettes", "aliens", "comic-fantasy", "near-future", "witty-prose"] },
  12035: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 3, pace: 8, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 9, difficulty: 3 }, tags: ["satirical", "absurdist", "soft-sf", "male-protagonist", "body-swapping", "picaresque", "comic-fantasy"] },
  12036: { vibes: { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 3, pace: 8, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 9, difficulty: 3 }, tags: ["satirical", "absurdist", "soft-sf", "male-protagonist", "picaresque", "comic-fantasy", "quest", "parody"] },
  12037: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 4, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 4, tone: 6, difficulty: 3 }, tags: ["soft-sf", "near-future", "identity", "male-protagonist", "satirical", "mortality", "corporation"] },

  // H. Beam Piper — classic SF
  12038: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 6, interiority: 4, tone: 6, difficulty: 3 }, tags: ["soft-sf", "first-contact", "aliens", "far-future", "optimistic", "legal-thriller", "sentience", "male-protagonist"] },
  12039: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["space-opera", "far-future", "male-protagonist", "post-apocalyptic", "military-sf", "political-intrigue"] },
  12040: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 4, tone: 5, difficulty: 4 }, tags: ["alternate-history-sf", "portal-fantasy", "military-sf", "male-protagonist", "medieval-regression", "political-intrigue"] },

  // James H. Schmitz — classic SF, adventurous
  12041: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 5, interiority: 3, tone: 5, difficulty: 3 }, tags: ["space-opera", "far-future", "episodic", "action", "ensemble-cast"] },
  12042: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 4, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 6, interiority: 4, tone: 7, difficulty: 3 }, tags: ["space-opera", "far-future", "female-protagonist", "child-protagonist", "adventure", "witty-prose", "ensemble-cast", "comic-fantasy"] },
  12043: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 5, interiority: 4, tone: 5, difficulty: 3 }, tags: ["space-opera", "far-future", "female-protagonist", "action", "espionage"] },

  // John Shirley — Eclipse trilogy (cyberpunk, near-future war)
  12047: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 5, tone: 2, difficulty: 5 }, tags: ["cyberpunk", "near-future", "dystopian", "war", "ensemble-cast", "political-intrigue", "european-setting"] },
  12048: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 5, tone: 2, difficulty: 5 }, tags: ["cyberpunk", "near-future", "dystopian", "war", "resistance", "political-intrigue"] },
  12049: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 5, tone: 2, difficulty: 5 }, tags: ["cyberpunk", "near-future", "dystopian", "war", "political-intrigue"] },

  // Pamela Sargent — feminist SF
  12050: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["soft-sf", "feminist", "post-apocalyptic", "gender", "female-protagonist", "quest", "philosophical-sf"] },
  12051: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["hard-sf", "cloning", "identity", "near-future", "philosophical-sf", "ensemble-cast"] },
  12052: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["hard-sf", "terraforming", "colony-world", "female-protagonist", "far-future", "political-sf"] },

  // Joan Slonczewski — eco-feminist SF
  12053: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 3, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 6, tone: 3, difficulty: 6 }, tags: ["soft-sf", "feminist", "anthropological-sf", "colony-world", "pacifist", "ocean-setting", "female-protagonist", "philosophical-sf", "ecological"] },
  12054: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["soft-sf", "colony-world", "aliens", "biological", "female-protagonist", "ecological"] },
  12055: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["soft-sf", "nanotech", "near-future", "female-protagonist", "biological", "identity"] },

  // William Hope Hodgson — proto-weird fiction, foundational
  12056: { vibes: { prose_craft: 7, prose_style: 8, warmth: 3, intensity: 7, pace: 3, moral_complexity: 7, fabulism: 8, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["cosmic-horror", "weird-fiction", "haunted-house", "rural", "first-person", "isolation", "existential", "baroque-prose", "19th-century"] },
  12057: { vibes: { prose_craft: 7, prose_style: 9, warmth: 3, intensity: 6, pace: 2, moral_complexity: 6, fabulism: 10, emotional_register: 2, interiority: 6, tone: 2, difficulty: 9 }, tags: ["far-future", "dying-earth", "weird-fiction", "quest", "baroque-prose", "love-story", "cosmic-horror", "doorstopper"] },
  12058: { vibes: { prose_craft: 6, prose_style: 6, warmth: 3, intensity: 6, pace: 4, moral_complexity: 5, fabulism: 5, emotional_register: 2, interiority: 5, tone: 2, difficulty: 6 }, tags: ["supernatural-horror", "ocean-setting", "ghosts", "isolation", "crew", "atmospheric", "19th-century"] },
  12059: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["supernatural-horror", "ghosts", "series-detective", "first-person", "episodic", "victorian-setting", "occult"] },

  // Robert W. Chambers — The King in Yellow (foundational weird fiction)
  12060: { vibes: { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 2, interiority: 6, tone: 2, difficulty: 6 }, tags: ["weird-fiction", "cosmic-horror", "vignettes", "unreliable-narrator", "madness", "artistic", "19th-century", "gothic-atmosphere", "lyrical-prose"] },
  12061: { vibes: { prose_craft: 6, prose_style: 6, warmth: 3, intensity: 4, pace: 4, moral_complexity: 5, fabulism: 6, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["weird-fiction", "supernatural-horror", "19th-century", "gothic-atmosphere", "vignettes"] },

  // E.F. Benson — Edwardian ghost stories
  12062: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 5, fabulism: 5, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["supernatural-horror", "ghosts", "vignettes", "victorian-setting", "british-setting", "atmospheric", "quiet-horror", "witty-prose"] },
  12063: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 5, fabulism: 5, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["supernatural-horror", "ghosts", "vignettes", "victorian-setting", "british-setting", "atmospheric", "quiet-horror"] },

  // Robert Aickman — "strange stories," literary horror master
  12064: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 6, emotional_register: 2, interiority: 8, tone: 2, difficulty: 8 }, tags: ["weird-fiction", "quiet-horror", "vignettes", "unreliable-narrator", "dreamlike", "uneasy", "british-setting", "lyrical-prose", "psychological-horror", "atmospheric"] },
  12065: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 6, emotional_register: 2, interiority: 8, tone: 2, difficulty: 8 }, tags: ["weird-fiction", "quiet-horror", "vignettes", "unreliable-narrator", "dreamlike", "uneasy", "british-setting", "lyrical-prose"] },
  12066: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 6, emotional_register: 2, interiority: 8, tone: 2, difficulty: 8 }, tags: ["weird-fiction", "quiet-horror", "vignettes", "uneasy", "dreamlike", "british-setting", "lyrical-prose"] },

  // Max Brooks — zombie fiction
  12067: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 4, tone: 3, difficulty: 4 }, tags: ["post-apocalyptic", "zombies", "oral-history", "ensemble-cast", "multi-pov", "military-sf", "political-sf", "global-setting", "survival"] },
  12068: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 3, pace: 5, moral_complexity: 3, fabulism: 4, emotional_register: 4, interiority: 3, tone: 6, difficulty: 2 }, tags: ["zombies", "satirical", "survival", "guide-format", "comic-fantasy"] },
  12069: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 4, tone: 3, difficulty: 4 }, tags: ["supernatural-horror", "oral-history", "ensemble-cast", "survival", "wilderness", "monsters", "isolation"] },

  // Matt Wesolowski — Six Stories (podcast-format crime/horror)
  12070: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "found-footage", "multi-pov", "cold-case", "british-setting", "rural", "unreliable-narrator"] },
  12071: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "found-footage", "multi-pov", "cold-case", "british-setting", "urban"] },
  12072: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "found-footage", "multi-pov", "cold-case", "british-setting", "folk-horror", "wilderness"] },

  // Sarah Langan — literary horror
  12073: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "small-town", "female-protagonist", "new-england-setting", "gothic-atmosphere", "community"] },
  12074: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "small-town", "ensemble-cast", "new-england-setting", "missing-person", "community"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

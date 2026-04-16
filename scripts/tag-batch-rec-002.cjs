const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Charles de Lint — foundational urban fantasy, lyrical, mythic
  11628: { vibes: { prose_craft: 7, prose_style: 6, warmth: 8, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 6, interiority: 6, tone: 4, difficulty: 5 }, tags: ["urban-fantasy", "mythic-fantasy", "lyrical-prose", "found-family", "urban", "soft-magic", "dreamlike", "ensemble-cast", "faeries", "contemporary-setting"] },
  11629: { vibes: { prose_craft: 7, prose_style: 6, warmth: 8, intensity: 2, pace: 4, moral_complexity: 5, fabulism: 7, emotional_register: 6, interiority: 6, tone: 5, difficulty: 5 }, tags: ["urban-fantasy", "mythic-fantasy", "lyrical-prose", "rural", "soft-magic", "music", "found-family", "contemporary-setting"] },
  11630: { vibes: { prose_craft: 7, prose_style: 6, warmth: 7, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 5, interiority: 7, tone: 4, difficulty: 5 }, tags: ["urban-fantasy", "mythic-fantasy", "lyrical-prose", "artist-protagonist", "found-family", "soft-magic", "dreamlike", "memory"] },

  // Robert R. McCammon — major horror/literary crossover
  11631: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 8, pace: 6, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["supernatural-horror", "post-apocalyptic", "ensemble-cast", "good-vs-evil", "epic-fantasy", "doorstopper", "nuclear", "survival", "female-protagonist"] },
  11632: { vibes: { prose_craft: 8, prose_style: 6, warmth: 9, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 6, interiority: 6, tone: 5, difficulty: 4 }, tags: ["coming-of-age", "small-town", "southern-gothic", "male-protagonist", "child-protagonist", "1960s", "magical-realism", "mystery", "nostalgia", "literary-mystery"] },
  11633: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 8, pace: 7, moral_complexity: 5, fabulism: 5, emotional_register: 2, interiority: 4, tone: 3, difficulty: 4 }, tags: ["vampires", "urban", "supernatural-horror", "ensemble-cast", "violence", "los-angeles-setting"] },
  11634: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 7, pace: 8, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "female-protagonist", "kidnapping", "ticking-clock", "violence", "motherhood"] },

  // T.E.D. Klein — legendary horror, small output
  11635: { vibes: { prose_craft: 9, prose_style: 7, warmth: 4, intensity: 6, pace: 3, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["folk-horror", "cosmic-horror", "rural", "slow-burn", "gothic-atmosphere", "religious", "cult-horror", "doorstopper", "lyrical-prose"] },
  11636: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 5, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["cosmic-horror", "folk-horror", "novella-length", "gothic-atmosphere", "slow-burn", "lyrical-prose", "suburban", "uneasy"] },

  // Michael McDowell — Southern gothic horror master
  11637: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 5, tone: 3, difficulty: 4 }, tags: ["gothic-horror", "haunted-house", "southern-gothic", "ensemble-cast", "family", "rural", "atmospheric"] },
  11638: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 7, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["gothic-horror", "family-saga", "southern-gothic", "ensemble-cast", "small-town", "supernatural-horror", "doorstopper", "river-setting"] },
  11639: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 5, tone: 2, difficulty: 4 }, tags: ["gothic-horror", "southern-gothic", "small-town", "rural", "supernatural-horror", "violence", "atmospheric"] },
  11640: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 8, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 1, interiority: 4, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "southern-gothic", "small-town", "cursed-object", "violence", "graphic-violence"] },

  // Adam Nevill — modern British horror
  11641: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 8, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["folk-horror", "wilderness", "male-protagonist", "ensemble-cast", "survival", "friendship", "supernatural-horror", "nordic-setting"] },
  11642: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["supernatural-horror", "cult-horror", "documentary-fiction", "male-protagonist", "urban", "haunted-house", "found-footage"] },
  11643: { vibes: { prose_craft: 6, prose_style: 5, warmth: 2, intensity: 8, pace: 6, moral_complexity: 6, fabulism: 4, emotional_register: 1, interiority: 6, tone: 2, difficulty: 4 }, tags: ["psychological-horror", "urban", "poverty", "claustrophobic", "female-protagonist", "violence", "haunted-house"] },
  11644: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 6, pace: 4, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["supernatural-horror", "haunted-house", "urban", "male-protagonist", "gothic-atmosphere", "slow-burn", "uneasy"] },

  // Steven Brust — Vlad Taltos, witty first-person fantasy
  11648: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 6, difficulty: 4 }, tags: ["secondary-world", "assassin-protagonist", "first-person", "witty-prose", "sword-and-sorcery", "heist", "male-protagonist", "morally-gray-protagonist", "found-family"] },
  11649: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 6, difficulty: 4 }, tags: ["secondary-world", "assassin-protagonist", "first-person", "witty-prose", "sword-and-sorcery", "political-intrigue", "male-protagonist"] },
  11650: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 6, tone: 5, difficulty: 4 }, tags: ["secondary-world", "assassin-protagonist", "first-person", "political-intrigue", "class", "revolution", "male-protagonist"] },
  11651: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 6, difficulty: 4 }, tags: ["secondary-world", "assassin-protagonist", "first-person", "witty-prose", "necromancy", "male-protagonist", "quest"] },

  // Mary Gentle
  11652: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 7 }, tags: ["historical-fantasy", "female-protagonist", "medieval-setting", "war", "alternate-history-sf", "doorstopper", "multi-pov", "soldier-protagonist"] },
  11653: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 8, difficulty: 3 }, tags: ["comic-fantasy", "parody", "military-sf", "ensemble-cast", "violence", "satirical", "secondary-world"] },
  11654: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 6 }, tags: ["secondary-world", "baroque-prose", "urban", "alchemy", "political-intrigue", "ensemble-cast"] },

  // Barbara Hambly
  11655: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["high-fantasy", "dragons", "female-protagonist", "secondary-world", "mentor-student", "romance-subplot", "quest"] },
  11656: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["vampires", "historical-mystery", "victorian-setting", "scholar-protagonist", "gothic-atmosphere", "romance-subplot"] },
  11657: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["high-fantasy", "female-protagonist", "soldier-protagonist", "sword-and-sorcery", "quest", "romance-subplot", "secondary-world"] },

  // L.E. Modesitt Jr. — Recluce
  11658: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "hard-magic", "secondary-world", "worldbuilding-heavy", "coming-of-age", "male-protagonist", "magic-system-focused"] },
  11659: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "hard-magic", "secondary-world", "worldbuilding-heavy", "magic-system-focused", "male-protagonist"] },
  11660: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "hard-magic", "secondary-world", "worldbuilding-heavy", "magic-system-focused", "coming-of-age"] },
  11661: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 5 }, tags: ["secondary-world", "hard-magic", "worldbuilding-heavy", "magic-system-focused", "male-protagonist", "political-intrigue"] },

  // Edgar Rice Burroughs — pulp adventure classics
  11662: { vibes: { prose_craft: 4, prose_style: 5, warmth: 5, intensity: 6, pace: 8, moral_complexity: 3, fabulism: 9, emotional_register: 6, interiority: 3, tone: 5, difficulty: 3 }, tags: ["space-opera", "sword-and-sorcery", "male-protagonist", "romance-subplot", "quest", "adventure", "desert-setting", "colonial-era"] },
  11663: { vibes: { prose_craft: 4, prose_style: 5, warmth: 5, intensity: 6, pace: 8, moral_complexity: 3, fabulism: 4, emotional_register: 5, interiority: 3, tone: 5, difficulty: 3 }, tags: ["adventure", "wilderness", "male-protagonist", "colonial-era", "orphan-protagonist", "survival"] },
  11664: { vibes: { prose_craft: 4, prose_style: 5, warmth: 5, intensity: 6, pace: 8, moral_complexity: 3, fabulism: 9, emotional_register: 6, interiority: 3, tone: 5, difficulty: 3 }, tags: ["space-opera", "sword-and-sorcery", "male-protagonist", "quest", "adventure", "romance-subplot"] },
  11665: { vibes: { prose_craft: 4, prose_style: 5, warmth: 5, intensity: 6, pace: 8, moral_complexity: 3, fabulism: 9, emotional_register: 6, interiority: 3, tone: 5, difficulty: 3 }, tags: ["space-opera", "sword-and-sorcery", "male-protagonist", "quest", "adventure"] },
  11666: { vibes: { prose_craft: 4, prose_style: 5, warmth: 5, intensity: 6, pace: 8, moral_complexity: 3, fabulism: 8, emotional_register: 5, interiority: 3, tone: 5, difficulty: 3 }, tags: ["adventure", "male-protagonist", "quest", "underground-setting", "survival", "prehistoric"] },

  // A. Merritt — early weird fiction
  11667: { vibes: { prose_craft: 6, prose_style: 7, warmth: 4, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 5 }, tags: ["weird-fiction", "adventure", "lost-world", "baroque-prose", "quest", "supernatural-horror"] },
  11668: { vibes: { prose_craft: 6, prose_style: 7, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 4, difficulty: 5 }, tags: ["weird-fiction", "adventure", "portal-fantasy", "baroque-prose", "quest", "romance-subplot"] },
  11669: { vibes: { prose_craft: 6, prose_style: 7, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 5 }, tags: ["weird-fiction", "adventure", "lost-world", "baroque-prose", "quest"] },

  // H. Rider Haggard — Victorian adventure
  11670: { vibes: { prose_craft: 5, prose_style: 6, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 4, emotional_register: 5, interiority: 3, tone: 4, difficulty: 4 }, tags: ["adventure", "male-protagonist", "colonial-era", "19th-century", "quest", "first-person", "africa-setting"] },
  11671: { vibes: { prose_craft: 5, prose_style: 6, warmth: 4, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 5 }, tags: ["adventure", "female-protagonist", "colonial-era", "19th-century", "quest", "immortality", "gothic-atmosphere", "africa-setting"] },
  11672: { vibes: { prose_craft: 5, prose_style: 6, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 4, emotional_register: 5, interiority: 3, tone: 4, difficulty: 4 }, tags: ["adventure", "male-protagonist", "colonial-era", "19th-century", "quest", "first-person", "africa-setting"] },

  // Koushun Takami — Battle Royale
  11673: { vibes: { prose_craft: 5, prose_style: 5, warmth: 3, intensity: 10, pace: 9, moral_complexity: 8, fabulism: 4, emotional_register: 1, interiority: 5, tone: 2, difficulty: 4 }, tags: ["dystopian", "violence", "graphic-violence", "ensemble-cast", "survival", "translated-from", "near-future", "child-protagonist", "ticking-clock", "political-intrigue"] },

  // Adam Roberts — literary SF
  11674: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 3, interiority: 6, tone: 3, difficulty: 7 }, tags: ["hard-sf", "colony-world", "political-sf", "philosophical-sf", "war", "theological"] },
  11675: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 9, emotional_register: 3, interiority: 6, tone: 3, difficulty: 7 }, tags: ["hard-sf", "worldbuilding-heavy", "philosophical-sf", "quest", "vertical-world"] },
  11676: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 6 }, tags: ["hard-sf", "locked-room", "mystery", "space-opera", "male-protagonist", "near-future"] },

  // Joanne Harris
  11677: { vibes: { prose_craft: 7, prose_style: 6, warmth: 9, intensity: 2, pace: 4, moral_complexity: 5, fabulism: 3, emotional_register: 8, interiority: 5, tone: 7, difficulty: 3 }, tags: ["magical-realism", "small-town", "female-protagonist", "food-writing", "community", "quiet-drama", "french-setting", "whimsical"] },
  11678: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["mythology-retelling", "first-person", "trickster", "norse-mythology", "antihero", "morally-gray-protagonist"] },
  11680: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["psychological-thriller", "academia", "boarding-school-setting", "male-protagonist", "unreliable-narrator", "class", "british-setting"] },

  // R.A. MacAvoy — literary fantasy
  11681: { vibes: { prose_craft: 8, prose_style: 5, warmth: 8, intensity: 2, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 6, interiority: 6, tone: 5, difficulty: 5 }, tags: ["urban-fantasy", "dragons", "female-protagonist", "scholar-protagonist", "romance-subplot", "quiet-drama", "lyrical-prose", "contemporary-setting"] },
  11682: { vibes: { prose_craft: 8, prose_style: 6, warmth: 7, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 7, tone: 3, difficulty: 6 }, tags: ["historical-fantasy", "medieval-setting", "musician-protagonist", "lyrical-prose", "divine-magic", "coming-of-age", "italian-setting"] },
  11683: { vibes: { prose_craft: 8, prose_style: 6, warmth: 7, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 4, difficulty: 5 }, tags: ["historical-fantasy", "portal-fantasy", "irish-setting", "lyrical-prose", "quest", "time-travel"] },

  // Katharine Kerr — Deverry cycle, Celtic-inspired epic
  11684: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "secondary-world", "reincarnation", "celtic-inspired", "multi-pov", "nonlinear", "romance-subplot", "dual-timeline"] },
  11685: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "secondary-world", "reincarnation", "celtic-inspired", "multi-pov", "nonlinear", "dual-timeline"] },
  11686: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "secondary-world", "reincarnation", "celtic-inspired", "multi-pov", "nonlinear"] },
  11687: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "secondary-world", "reincarnation", "celtic-inspired", "multi-pov", "quest"] },

  // Juliet Marillier — lyrical fairy-tale fantasy
  11688: { vibes: { prose_craft: 7, prose_style: 6, warmth: 7, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["fairy-tale-retelling", "historical-fantasy", "female-protagonist", "lyrical-prose", "romance-subplot", "celtic-inspired", "medieval-setting", "family-saga", "sibling-bond"] },
  11689: { vibes: { prose_craft: 7, prose_style: 6, warmth: 7, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["fairy-tale-retelling", "historical-fantasy", "female-protagonist", "lyrical-prose", "romance-subplot", "celtic-inspired", "medieval-setting"] },
  11690: { vibes: { prose_craft: 7, prose_style: 6, warmth: 7, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["fairy-tale-retelling", "historical-fantasy", "female-protagonist", "lyrical-prose", "romance-subplot", "celtic-inspired", "divine-magic"] },

  // Jonathan Stroud — Bartimaeus trilogy
  11694: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 5, interiority: 5, tone: 7, difficulty: 4 }, tags: ["urban-fantasy", "historical-fantasy", "demons", "first-person", "witty-prose", "ensemble-cast", "political-intrigue", "london-setting", "alternate-history-sf"] },
  11695: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 5, interiority: 5, tone: 7, difficulty: 4 }, tags: ["urban-fantasy", "historical-fantasy", "demons", "first-person", "witty-prose", "political-intrigue", "london-setting"] },
  11696: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 6, tone: 6, difficulty: 4 }, tags: ["urban-fantasy", "historical-fantasy", "demons", "first-person", "witty-prose", "political-intrigue", "london-setting", "sacrifice"] },

  // Koushun Takami already done above

  // Tanya Huff
  11702: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "vampires", "female-protagonist", "police-procedural", "romance-subplot", "contemporary-setting"] },
  11703: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 4, tone: 5, difficulty: 3 }, tags: ["military-sf", "space-opera", "female-protagonist", "ensemble-cast", "aliens", "action", "witty-prose"] },
  11704: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 5, tone: 6, difficulty: 3 }, tags: ["urban-fantasy", "female-protagonist", "comedy", "demons", "contemporary-setting", "cozy", "witty-prose"] },

  // Charlie Huston — Joe Pitt noir vampire
  11705: { vibes: { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 8, pace: 8, moral_complexity: 7, fabulism: 6, emotional_register: 2, interiority: 5, tone: 3, difficulty: 4 }, tags: ["urban-fantasy", "noir", "vampires", "male-protagonist", "first-person", "violence", "hardboiled", "new-york-setting"] },
  11706: { vibes: { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 8, pace: 8, moral_complexity: 7, fabulism: 6, emotional_register: 2, interiority: 5, tone: 3, difficulty: 4 }, tags: ["urban-fantasy", "noir", "vampires", "male-protagonist", "first-person", "violence", "hardboiled", "political-intrigue"] },
  11707: { vibes: { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 8, pace: 8, moral_complexity: 7, fabulism: 6, emotional_register: 2, interiority: 5, tone: 3, difficulty: 4 }, tags: ["urban-fantasy", "noir", "vampires", "male-protagonist", "first-person", "violence", "hardboiled", "new-york-setting"] },

  // Peter Clines
  11724: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 }, tags: ["cosmic-horror", "mystery", "haunted-house", "ensemble-cast", "lovecraftian", "contemporary-setting", "puzzle-box"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

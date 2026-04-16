const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Jerry Pournelle — military SF, competent prose
  11691: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 3, tone: 3, difficulty: 4 }, tags: ["military-sf", "space-opera", "male-protagonist", "soldier-protagonist", "political-intrigue", "war"] },
  11692: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["military-sf", "alternate-history-sf", "time-travel", "medieval-setting", "war", "survival"] },
  11693: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 3, tone: 4, difficulty: 4 }, tags: ["space-opera", "military-sf", "political-intrigue", "medieval-regression", "war"] },

  // Matt Ruff — Mirage (9/11 alternate history)
  11731: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 8, fabulism: 6, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "conspiracy", "political-intrigue", "middle-east-setting", "multi-pov", "satirical"] },

  // David Farland — Runelords (magic system where you can steal attributes)
  11735: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "hard-magic", "secondary-world", "magic-system-focused", "male-protagonist", "war", "political-intrigue", "doorstopper"] },
  11736: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "hard-magic", "secondary-world", "magic-system-focused", "war", "ensemble-cast"] },
  11737: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "hard-magic", "secondary-world", "magic-system-focused", "war"] },
  11738: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["epic-fantasy", "hard-magic", "secondary-world", "magic-system-focused", "quest", "war"] },

  // Larry Correia
  11753: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 7, pace: 9, moral_complexity: 4, fabulism: 7, emotional_register: 5, interiority: 3, tone: 5, difficulty: 2 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "action", "monsters", "guns", "military-sf", "ensemble-cast"] },
  11754: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 7, pace: 9, moral_complexity: 4, fabulism: 7, emotional_register: 5, interiority: 3, tone: 5, difficulty: 2 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "action", "monsters", "revenge-plot"] },
  11755: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["urban-fantasy", "hard-magic", "alternate-history-sf", "noir", "interwar-setting", "male-protagonist", "ensemble-cast"] },
  11756: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 3, difficulty: 4 }, tags: ["epic-fantasy", "secondary-world", "sword-and-sorcery", "male-protagonist", "caste-system", "rebellion", "hard-magic"] },

  // Fred Saberhagen remaining
  11787: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["secondary-world", "quest", "post-apocalyptic", "sword-and-sorcery", "male-protagonist"] },
  11788: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 6, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["historical-mystery", "vampires", "victorian-setting", "series-detective", "crossover", "london-setting"] },

  // Daniel José Older
  11795: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["urban-fantasy", "male-protagonist", "ghosts", "first-person", "new-york-setting", "Latino-protagonist", "noir"] },

  // Damon Knight — classic SF editor/author
  11797: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 3, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["soft-sf", "near-future", "philosophical-sf", "post-scarcity", "satirical"] },
  11798: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["soft-sf", "time-travel", "adventure", "male-protagonist", "identity"] },

  // John Ringo — military SF (pulpy)
  11799: { vibes: { prose_craft: 3, prose_style: 4, warmth: 4, intensity: 7, pace: 8, moral_complexity: 3, fabulism: 8, emotional_register: 4, interiority: 2, tone: 4, difficulty: 2 }, tags: ["military-sf", "aliens", "first-contact", "male-protagonist", "action", "war", "survival"] },
  11800: { vibes: { prose_craft: 3, prose_style: 4, warmth: 4, intensity: 7, pace: 8, moral_complexity: 3, fabulism: 8, emotional_register: 4, interiority: 2, tone: 4, difficulty: 2 }, tags: ["military-sf", "aliens", "war", "male-protagonist", "action", "invasion"] },
  11801: { vibes: { prose_craft: 3, prose_style: 4, warmth: 4, intensity: 7, pace: 8, moral_complexity: 3, fabulism: 8, emotional_register: 4, interiority: 2, tone: 4, difficulty: 2 }, tags: ["military-sf", "aliens", "war", "male-protagonist", "action"] },

  // Jack Campbell — Lost Fleet (military space opera)
  11803: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["military-sf", "space-opera", "male-protagonist", "far-future", "war", "ensemble-cast", "leadership"] },
  11804: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["military-sf", "space-opera", "male-protagonist", "far-future", "war", "ensemble-cast"] },
  11805: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["military-sf", "space-opera", "male-protagonist", "far-future", "war"] },
  11806: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["military-sf", "space-opera", "male-protagonist", "far-future", "war"] },

  // Marko Kloos — Frontlines (military SF, Heinlein-influenced)
  11807: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 }, tags: ["military-sf", "first-person", "male-protagonist", "near-future", "aliens", "war", "soldier-protagonist"] },
  11808: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 }, tags: ["military-sf", "first-person", "male-protagonist", "aliens", "war", "soldier-protagonist"] },
  11809: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 }, tags: ["military-sf", "first-person", "male-protagonist", "aliens", "war", "soldier-protagonist"] },

  // Diane Setterfield — gothic literary fiction
  11819: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["gothic-atmosphere", "frame-story", "female-protagonist", "twin", "family-saga", "writer-protagonist", "victorian-setting", "unreliable-narrator", "literary-mystery", "british-setting"] },
  11820: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["gothic-atmosphere", "victorian-setting", "male-protagonist", "grief", "mortality", "british-setting", "atmospheric"] },
  11821: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["gothic-atmosphere", "river-setting", "female-protagonist", "mystery", "ensemble-cast", "victorian-setting", "british-setting", "magical-realism"] },

  // Laura Purcell — Victorian gothic horror
  11822: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["gothic-horror", "victorian-setting", "female-protagonist", "haunted-house", "unreliable-narrator", "dual-timeline", "british-setting", "claustrophobic"] },
  11823: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["gothic-horror", "victorian-setting", "female-protagonist", "dual-timeline", "prison-setting", "unreliable-narrator", "british-setting"] },
  11824: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 7, tone: 2, difficulty: 5 }, tags: ["gothic-horror", "victorian-setting", "female-protagonist", "séance", "dual-timeline", "british-setting", "mystery"] },

  // David Zindell — Neverness (literary hard SF, mathematical mysticism)
  11828: { vibes: { prose_craft: 8, prose_style: 8, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 8, tone: 3, difficulty: 9 }, tags: ["hard-sf", "far-future", "baroque-prose", "mathematical", "philosophical-sf", "male-protagonist", "scholar-protagonist", "quest", "worldbuilding-heavy", "literary-sf"] },
  11829: { vibes: { prose_craft: 8, prose_style: 8, warmth: 5, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 8, tone: 3, difficulty: 9 }, tags: ["hard-sf", "far-future", "baroque-prose", "philosophical-sf", "religious", "worldbuilding-heavy"] },
  11830: { vibes: { prose_craft: 8, prose_style: 8, warmth: 5, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 4, interiority: 8, tone: 3, difficulty: 9 }, tags: ["hard-sf", "far-future", "baroque-prose", "philosophical-sf", "quest", "worldbuilding-heavy"] },

  // Lucius Shepard — literary SF/fantastika, Central American magical realism
  11831: { vibes: { prose_craft: 9, prose_style: 8, warmth: 3, intensity: 7, pace: 4, moral_complexity: 9, fabulism: 5, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["near-future", "war", "lyrical-prose", "male-protagonist", "soldier-protagonist", "central-america-setting", "drugs", "magical-realism", "vietnam-era", "alienation"] },
  11832: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 7, tone: 2, difficulty: 6 }, tags: ["gothic-horror", "lyrical-prose", "male-protagonist", "southern-setting", "voodoo", "supernatural-horror", "atmospheric"] },
  11833: { vibes: { prose_craft: 9, prose_style: 7, warmth: 4, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 7, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["magical-realism", "lyrical-prose", "central-america-setting", "vignettes", "dreamlike", "translated-from", "literary-fantasy"] },

  // Cherie Priest — Clockwork Century (steampunk)
  11834: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["flintlock-fantasy", "post-apocalyptic", "female-protagonist", "zombies", "steampunk", "seattle-setting", "adventure", "motherhood"] },
  11835: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 4, difficulty: 3 }, tags: ["flintlock-fantasy", "steampunk", "female-protagonist", "civil-war", "adventure", "train-setting"] },
  11836: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 4, difficulty: 3 }, tags: ["flintlock-fantasy", "steampunk", "female-protagonist", "civil-war", "adventure", "espionage"] },
  11837: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["haunted-house", "supernatural-horror", "ensemble-cast", "family", "southern-setting", "gothic-atmosphere"] },

  // Gail Carriger — Parasol Protectorate (steampunk comedy romance)
  11838: { vibes: { prose_craft: 6, prose_style: 5, warmth: 8, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 7, emotional_register: 7, interiority: 5, tone: 8, difficulty: 3 }, tags: ["steampunk", "paranormal-romance", "female-protagonist", "witty-prose", "vampires", "werewolves", "victorian-setting", "enemies-to-lovers", "comedy", "british-setting"] },
  11839: { vibes: { prose_craft: 6, prose_style: 5, warmth: 8, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 7, emotional_register: 7, interiority: 5, tone: 8, difficulty: 3 }, tags: ["steampunk", "paranormal-romance", "female-protagonist", "witty-prose", "werewolves", "victorian-setting", "british-setting", "espionage"] },
  11840: { vibes: { prose_craft: 6, prose_style: 5, warmth: 8, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 7, emotional_register: 7, interiority: 5, tone: 8, difficulty: 3 }, tags: ["steampunk", "paranormal-romance", "female-protagonist", "witty-prose", "victorian-setting", "road-trip", "italian-setting"] },
  11841: { vibes: { prose_craft: 6, prose_style: 5, warmth: 8, intensity: 4, pace: 6, moral_complexity: 4, fabulism: 7, emotional_register: 7, interiority: 5, tone: 8, difficulty: 3 }, tags: ["steampunk", "paranormal-romance", "female-protagonist", "witty-prose", "victorian-setting", "london-setting", "conspiracy", "motherhood"] },

  // Ian Tregillis — Milkweed Triptych (WWII + superpowers alt history)
  11848: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 8, pace: 6, moral_complexity: 9, fabulism: 7, emotional_register: 2, interiority: 6, tone: 2, difficulty: 6 }, tags: ["alternate-history-sf", "ww2-era", "espionage", "multi-pov", "dark-fantasy", "ensemble-cast", "british-setting", "morally-gray-protagonist"] },
  11849: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 7, pace: 6, moral_complexity: 9, fabulism: 7, emotional_register: 2, interiority: 6, tone: 2, difficulty: 6 }, tags: ["alternate-history-sf", "cold-war-era", "espionage", "multi-pov", "dark-fantasy", "morally-gray-protagonist"] },
  11850: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 7, pace: 6, moral_complexity: 9, fabulism: 7, emotional_register: 2, interiority: 6, tone: 2, difficulty: 6 }, tags: ["alternate-history-sf", "time-travel", "espionage", "multi-pov", "dark-fantasy", "morally-gray-protagonist"] },
  // Alchemy Wars
  11851: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["alternate-history-sf", "AI", "slavery", "multi-pov", "steampunk", "revolution", "philosophical"] },

  // Gareth L. Powell — Embers of War
  11852: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["space-opera", "AI", "multi-pov", "ensemble-cast", "war-trauma", "far-future", "sentient-ship"] },
  11853: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["space-opera", "AI", "multi-pov", "ensemble-cast", "war", "far-future"] },
  11854: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["space-opera", "AI", "multi-pov", "ensemble-cast", "far-future", "aliens"] },

  // M.L. Wang — The Sword of Kaigen (self-pub sensation)
  11858: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 8, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["epic-fantasy", "secondary-world", "hard-magic", "elemental-magic", "Asian-protagonist", "motherhood", "war", "family", "martial-arts", "military-fantasy"] },
  11859: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 9, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["secondary-world", "female-protagonist", "scholar-protagonist", "hard-magic", "academia", "oppression", "systemic-injustice"] },

  // Jenn Lyons — A Chorus of Dragons (complex timeline epic)
  11860: { vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 7 }, tags: ["epic-fantasy", "secondary-world", "nonlinear", "nested-narrator", "dragons", "prophecy", "frame-story", "doorstopper", "unreliable-narrator"] },
  11861: { vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 7 }, tags: ["epic-fantasy", "secondary-world", "nonlinear", "multi-pov", "dragons", "political-intrigue"] },
  11862: { vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 7 }, tags: ["epic-fantasy", "secondary-world", "nonlinear", "multi-pov", "dragons", "gods-walking"] },

  // RJ Barker — Wounded Kingdom
  11863: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["secondary-world", "assassin-protagonist", "first-person", "coming-of-age", "disabled-protagonist", "male-protagonist", "mystery", "court-intrigue"] },
  11864: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["secondary-world", "assassin-protagonist", "first-person", "disabled-protagonist", "war", "court-intrigue"] },
  11865: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["secondary-world", "assassin-protagonist", "first-person", "disabled-protagonist", "war", "political-intrigue"] },

  // Simone St. James — gothic supernatural thrillers
  11866: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, tags: ["supernatural-horror", "dual-timeline", "female-protagonist", "motel-setting", "ghosts", "mystery", "small-town", "atmospheric"] },
  11867: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, tags: ["psychological-thriller", "dual-pov", "female-protagonist", "cold-case", "mystery", "atmospheric"] },
  11868: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, tags: ["supernatural-horror", "dual-timeline", "female-protagonist", "boarding-school-setting", "ghosts", "gothic-atmosphere"] },
  11869: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["supernatural-horror", "road-trip", "married-couple", "mystery", "small-town", "ghosts"] },

  // Ronald Malfi — literary horror
  11870: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["psychological-horror", "grief", "male-protagonist", "marriage", "road-trip", "mystery", "quiet-horror", "literary-mystery"] },
  11871: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["supernatural-horror", "ghosts", "writer-protagonist", "male-protagonist", "atmospheric", "quiet-horror"] },
  11872: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["supernatural-horror", "wilderness", "male-protagonist", "arctic-setting", "isolation", "survival", "atmospheric"] },

  // Nick Cutter — extreme horror
  11873: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 10, pace: 8, moral_complexity: 6, fabulism: 4, emotional_register: 1, interiority: 4, tone: 2, difficulty: 3 }, tags: ["body-horror", "survival", "island-setting", "child-protagonist", "ensemble-cast", "graphic-violence", "biological-horror", "claustrophobic"] },
  11874: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 9, pace: 6, moral_complexity: 6, fabulism: 6, emotional_register: 1, interiority: 5, tone: 2, difficulty: 4 }, tags: ["cosmic-horror", "body-horror", "ocean-setting", "claustrophobic", "survival", "graphic-violence", "isolation"] },
  11875: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 8, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 4, tone: 3, difficulty: 4 }, tags: ["supernatural-horror", "ensemble-cast", "wilderness", "evil-presence", "western-setting", "survival", "graphic-violence"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // James P. Blaylock — steampunk/weird fiction pioneer
  12117: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 6, difficulty: 5 }, tags: ["weird-fiction", "steampunk", "california-setting", "male-protagonist", "adventure", "whimsical", "underground-setting"] },
  12118: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 6, difficulty: 5 }, tags: ["steampunk", "victorian-setting", "london-setting", "ensemble-cast", "adventure", "weird-fiction", "alchemy"] },
  12119: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 6, emotional_register: 5, interiority: 5, tone: 6, difficulty: 5 }, tags: ["urban-fantasy", "california-setting", "male-protagonist", "religious", "cursed-object", "whimsical", "contemporary-setting"] },

  // Rosemary Sutcliff — classic historical fiction, beautiful prose
  12155: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "roman-britain", "male-protagonist", "soldier-protagonist", "quest", "ancient-setting", "british-setting", "lyrical-prose", "father-son", "coming-of-age"] },
  12156: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "roman-britain", "male-protagonist", "soldier-protagonist", "ancient-setting", "british-setting", "lyrical-prose", "rebellion"] },
  12157: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "roman-britain", "male-protagonist", "soldier-protagonist", "ancient-setting", "british-setting", "lyrical-prose", "decline", "elegiac"] },
  12158: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "male-protagonist", "slave-protagonist", "ancient-setting", "celtic-inspired", "horse-culture", "warrior", "identity"] },

  // Kate Griffin — Matthew Swift London urban fantasy
  12159: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "london-setting", "city-as-character", "magic-system-focused", "resurrection", "lyrical-prose"] },
  12160: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "london-setting", "city-as-character", "political-intrigue"] },
  12161: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["urban-fantasy", "male-protagonist", "first-person", "london-setting", "city-as-character"] },

  // Dan Wells — I Am Not a Serial Killer (YA horror/thriller)
  12172: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 3 }, tags: ["psychological-horror", "male-protagonist", "first-person", "serial-killer", "coming-of-age", "small-town", "antihero", "neurodivergent", "YA-thriller"] },
  12173: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 3 }, tags: ["psychological-horror", "male-protagonist", "first-person", "serial-killer", "small-town", "antihero"] },
  12174: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 3 }, tags: ["psychological-horror", "male-protagonist", "first-person", "serial-killer", "small-town", "supernatural-horror"] },

  // Sword Art Online (Japanese light novel, LitRPG precursor)
  12176: { vibes: { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 }, tags: ["VR", "near-future", "male-protagonist", "survival", "romance-subplot", "action", "translated-from", "progression-fantasy", "ensemble-cast"] },
  12177: { vibes: { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 }, tags: ["VR", "near-future", "male-protagonist", "action", "translated-from", "ensemble-cast"] },
  12178: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 8, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 2 }, tags: ["VR", "near-future", "male-protagonist", "action", "translated-from", "progression-fantasy"] },

  // Nino Cipri — queer novellas, IKEA multiverse
  12179: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 3, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 7, difficulty: 3 }, tags: ["soft-sf", "queer-protagonist", "multiverse", "novella-length", "workplace", "comedy", "contemporary-setting"] },
  12180: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 6, difficulty: 3 }, tags: ["soft-sf", "queer-protagonist", "multiverse", "novella-length", "workplace", "AI", "cloning"] },

  // Genevieve Valentine — literary genre-crossover
  12182: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["historical-fiction", "female-protagonist", "1920s-setting", "new-york-setting", "dance", "sibling-bond", "fairy-tale-retelling", "ensemble-cast"] },
  12183: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["steampunk", "circus-setting", "ensemble-cast", "body-horror", "political-intrigue", "lyrical-prose"] },
  12184: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["near-future", "espionage", "female-protagonist", "political-intrigue", "identity", "diplomacy"] },

  // Grant Morrison — graphic novels (major, literary)
  12185: { vibes: { prose_craft: 8, prose_style: 8, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 10, emotional_register: 4, interiority: 7, tone: 5, difficulty: 9 }, tags: ["graphic-novel", "postmodern", "metafiction", "conspiracy", "occult", "ensemble-cast", "chaos-magic", "counterculture", "nonlinear", "experimental-form"] },
  12186: { vibes: { prose_craft: 8, prose_style: 6, warmth: 9, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 9, emotional_register: 8, interiority: 5, tone: 7, difficulty: 4 }, tags: ["graphic-novel", "superhero", "optimistic", "hopeful", "male-protagonist", "mythic-fantasy", "warm"] },
  12187: { vibes: { prose_craft: 8, prose_style: 5, warmth: 7, intensity: 7, pace: 7, moral_complexity: 8, fabulism: 6, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["graphic-novel", "military-sf", "animals", "escape", "near-future", "violence", "emotional", "novella-length"] },
  12188: { vibes: { prose_craft: 9, prose_style: 8, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 9, emotional_register: 5, interiority: 8, tone: 5, difficulty: 9 }, tags: ["graphic-novel", "metafiction", "superhero", "philosophical", "memory", "identity", "experimental-form", "postmodern"] },

  // Warren Ellis — graphic novels and fiction
  12189: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 8, pace: 8, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 4, tone: 6, difficulty: 4 }, tags: ["graphic-novel", "cyberpunk", "satirical", "male-protagonist", "journalist-detective", "near-future", "new-york-setting", "violence", "witty-prose", "counterculture"] },
  12190: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["graphic-novel", "mystery", "ensemble-cast", "multiverse", "superhero", "conspiracy", "pulp", "archaeological"] },
  12191: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 8, pace: 8, moral_complexity: 5, fabulism: 8, emotional_register: 3, interiority: 3, tone: 4, difficulty: 3 }, tags: ["graphic-novel", "superhero", "ensemble-cast", "military-sf", "action", "violence"] },
  12192: { vibes: { prose_craft: 6, prose_style: 4, warmth: 2, intensity: 7, pace: 8, moral_complexity: 5, fabulism: 2, emotional_register: 3, interiority: 4, tone: 6, difficulty: 3 }, tags: ["satirical", "noir", "male-protagonist", "road-trip", "transgressive", "sex-work", "conspiracy", "contemporary-setting", "witty-prose"] },

  // Mike Mignola — Hellboy
  12193: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 5, difficulty: 3 }, tags: ["graphic-novel", "supernatural-horror", "male-protagonist", "demons", "occult", "lovecraftian", "action", "noir", "ensemble-cast"] },
  12194: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 4, tone: 5, difficulty: 3 }, tags: ["graphic-novel", "supernatural-horror", "male-protagonist", "demons", "vampires", "occult", "action"] },
  12195: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 10, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["graphic-novel", "supernatural-horror", "mythic-fantasy", "afterlife", "demons", "melancholic", "elegiac"] },

  // Garth Ennis — graphic novels (extreme, satirical)
  12196: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 9, pace: 7, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 4, tone: 5, difficulty: 4 }, tags: ["graphic-novel", "road-trip", "supernatural-horror", "male-protagonist", "violence", "satirical", "religious", "antihero", "american-setting", "graphic-violence", "ensemble-cast"] },
  12197: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 9, pace: 7, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 4, tone: 5, difficulty: 3 }, tags: ["graphic-novel", "superhero", "satirical", "violence", "graphic-violence", "ensemble-cast", "conspiracy", "antihero", "corporate"] },
  12198: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 10, pace: 7, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 5, tone: 2, difficulty: 4 }, tags: ["graphic-novel", "male-protagonist", "violence", "graphic-violence", "organized-crime", "military-sf", "noir", "antihero", "revenge-plot"] },

  // Scott McCloud — comics theory (nonfiction)
  12199: { vibes: { prose_craft: 8, prose_style: 5, warmth: 7, intensity: 1, pace: 5, moral_complexity: 5, fabulism: 0, emotional_register: 7, interiority: 4, tone: 7, difficulty: 4 }, tags: ["narrative-nonfiction", "art-history", "graphic-novel", "metafiction", "academic-accessible", "big-idea-book", "visual-theory"] },
  12200: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 1, pace: 5, moral_complexity: 5, fabulism: 0, emotional_register: 6, interiority: 4, tone: 6, difficulty: 4 }, tags: ["narrative-nonfiction", "art-history", "graphic-novel", "big-idea-book", "academic-accessible", "future-of-media"] },
  12201: { vibes: { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 1, pace: 5, moral_complexity: 4, fabulism: 0, emotional_register: 6, interiority: 4, tone: 6, difficulty: 3 }, tags: ["narrative-nonfiction", "art-history", "graphic-novel", "academic-accessible", "craft-guide"] },

  // Jeffrey Ford — literary slipstream/fantasy
  12206: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["weird-fiction", "secondary-world", "dystopian", "male-protagonist", "first-person", "literary-sf", "physiognomy", "surreal"] },
  12207: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "historical-fiction", "19th-century", "new-york-setting", "artist-protagonist", "mystery", "atmospheric", "gothic-atmosphere"] },
  12208: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-mystery", "historical-fiction", "1930s", "new-york-setting", "con-artist", "ensemble-cast", "mystery"] },

  // Felix Gilman — literary secondary-world fantasy
  12209: { vibes: { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["secondary-world", "urban-fantasy", "worldbuilding-heavy", "baroque-prose", "city-as-character", "gods-walking", "ensemble-cast", "political-intrigue"] },
  12210: { vibes: { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["secondary-world", "urban-fantasy", "worldbuilding-heavy", "baroque-prose", "city-as-character", "quest", "political-intrigue"] },

  // S.B. Divya — near-future SF
  12136: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["near-future", "AI", "labor", "political-sf", "multi-pov", "philosophical-sf", "south-asian-protagonist"] },
  12137: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 5, interiority: 6, tone: 3, difficulty: 5 }, tags: ["far-future", "colony-world", "AI", "philosophical-sf", "ecological", "female-protagonist", "south-asian-inspired"] },
  12138: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 5, interiority: 6, tone: 3, difficulty: 5 }, tags: ["far-future", "colony-world", "AI", "philosophical-sf", "ecological", "female-protagonist"] },

  // Essa Hansen — Nophek Gloss (space opera, synaesthesia)
  12129: { vibes: { prose_craft: 6, prose_style: 6, warmth: 4, intensity: 7, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["space-opera", "far-future", "male-protagonist", "revenge-plot", "worldbuilding-heavy", "multiverse", "aliens", "orphan-protagonist"] },
  12130: { vibes: { prose_craft: 6, prose_style: 6, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["space-opera", "far-future", "male-protagonist", "multiverse", "worldbuilding-heavy", "ensemble-cast"] },
  12131: { vibes: { prose_craft: 6, prose_style: 6, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["space-opera", "far-future", "male-protagonist", "multiverse", "worldbuilding-heavy"] },

  // Kim Bo-Young remaining
  12106: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["soft-sf", "philosophical-sf", "translated-from", "dystopian", "religious", "prophet", "political-sf"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

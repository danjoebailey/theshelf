const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Felix Gilman — The Half-Made World (weird western, unique)
  12211: { vibes: { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 9, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["weird-fiction", "secondary-world", "western-setting", "steampunk", "ensemble-cast", "multi-pov", "political-intrigue", "guns", "demons", "war", "literary-sf"] },

  // Theodora Goss — Athena Club (Victorian literary monster mashup)
  12212: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 5, interiority: 5, tone: 6, difficulty: 4 }, tags: ["historical-fantasy", "victorian-setting", "female-protagonist", "ensemble-cast", "mystery", "found-family", "london-setting", "monsters", "feminist", "literary-fiction"] },
  12213: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 5, interiority: 5, tone: 6, difficulty: 4 }, tags: ["historical-fantasy", "victorian-setting", "female-protagonist", "ensemble-cast", "european-setting", "adventure", "mystery"] },
  12214: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 5, interiority: 5, tone: 6, difficulty: 4 }, tags: ["historical-fantasy", "victorian-setting", "female-protagonist", "ensemble-cast", "mystery", "london-setting"] },

  // Jess Kidd — Irish historical mystery/magical realism
  12215: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["historical-mystery", "victorian-setting", "london-setting", "female-protagonist", "magical-realism", "gothic-atmosphere", "atmospheric", "literary-mystery"] },
  12216: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "dual-timeline", "island-setting", "ensemble-cast", "colonial-era", "17th-century", "atmospheric", "ocean-setting"] },
  12217: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["mystery", "magical-realism", "irish-setting", "rural", "male-protagonist", "ghosts", "community", "atmospheric", "witty-prose"] },

  // Graham Masterton — 70s-80s horror
  12218: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 4, fabulism: 6, emotional_register: 3, interiority: 4, tone: 3, difficulty: 3 }, tags: ["supernatural-horror", "native-american", "possession", "male-protagonist", "urban", "action", "graphic-violence"] },
  12219: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 4, fabulism: 5, emotional_register: 2, interiority: 4, tone: 2, difficulty: 3 }, tags: ["supernatural-horror", "haunted-house", "family", "violence", "rural", "evil-presence"] },
  12220: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 8, pace: 6, moral_complexity: 5, fabulism: 5, emotional_register: 2, interiority: 4, tone: 2, difficulty: 3 }, tags: ["supernatural-horror", "cult-horror", "violence", "graphic-violence", "male-protagonist", "ritual"] },

  // Richard Chizmar — memoir-horror hybrid, Stephen King collaborator
  12221: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, tags: ["psychological-horror", "autofiction", "male-protagonist", "small-town", "serial-killer", "coming-of-age", "1980s-setting", "nostalgia", "memoir-horror-hybrid"] },
  12222: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, tags: ["psychological-horror", "autofiction", "male-protagonist", "serial-killer", "small-town"] },
  12223: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 }, tags: ["supernatural-horror", "small-town", "female-protagonist", "cursed-object", "coming-of-age", "novella-length"] },

  // Carlton Mellick III — bizarro fiction (extreme, absurdist, niche)
  12233: { vibes: { prose_craft: 4, prose_style: 4, warmth: 2, intensity: 9, pace: 8, moral_complexity: 5, fabulism: 10, emotional_register: 3, interiority: 3, tone: 7, difficulty: 3 }, tags: ["body-horror", "absurdist", "satirical", "graphic-violence", "transgressive", "surreal", "novella-length", "comic-fantasy"] },
  12234: { vibes: { prose_craft: 4, prose_style: 4, warmth: 2, intensity: 8, pace: 8, moral_complexity: 4, fabulism: 10, emotional_register: 3, interiority: 3, tone: 7, difficulty: 3 }, tags: ["body-horror", "absurdist", "satirical", "transgressive", "surreal", "demons", "urban", "cosmic-horror"] },
  12235: { vibes: { prose_craft: 4, prose_style: 4, warmth: 2, intensity: 9, pace: 7, moral_complexity: 4, fabulism: 10, emotional_register: 3, interiority: 3, tone: 7, difficulty: 3 }, tags: ["body-horror", "absurdist", "transgressive", "satirical", "surreal", "graphic-violence", "novella-length"] },

  // James Tynion IV — major current graphic novels
  12245: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 8, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 4, tone: 3, difficulty: 3 }, tags: ["graphic-novel", "supernatural-horror", "female-protagonist", "monsters", "small-town", "child-protagonist", "violence", "mystery"] },
  12246: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 6, moral_complexity: 8, fabulism: 5, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["graphic-novel", "conspiracy", "unreliable-narrator", "metafiction", "male-protagonist", "contemporary-setting", "paranoia", "political-intrigue"] },
  12247: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["graphic-novel", "psychological-horror", "ensemble-cast", "isolation", "lake-setting", "mystery", "supernatural-horror"] },

  // Isabel Greenberg — indie graphic novels (mythic, folk-art style)
  12242: { vibes: { prose_craft: 7, prose_style: 6, warmth: 7, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 5, difficulty: 4 }, tags: ["graphic-novel", "mythology", "frame-story", "vignettes", "mythic-fantasy", "creation-myth", "folk-art"] },
  12243: { vibes: { prose_craft: 7, prose_style: 6, warmth: 7, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 6, interiority: 5, tone: 5, difficulty: 4 }, tags: ["graphic-novel", "fairy-tale-retelling", "frame-story", "female-protagonist", "feminist", "folk-art"] },
  12244: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["graphic-novel", "historical-fiction", "bronte-sisters", "childhood", "imagination", "british-setting", "folk-art"] },

  // Benjamin Percy — literary horror/SF
  12258: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["post-apocalyptic", "multi-pov", "ensemble-cast", "literary-sf", "western-setting", "survival", "quest"] },
  12259: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["supernatural-horror", "werewolves", "multi-pov", "political-intrigue", "near-future", "conspiracy", "literary-sf"] },
  12260: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 7, pace: 7, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["supernatural-horror", "urban-fantasy", "near-future", "technology", "ensemble-cast", "violence"] },

  // Delilah S. Dawson — The Violence (horror, domestic abuse)
  12229: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 6, tone: 2, difficulty: 3 }, tags: ["psychological-horror", "domestic-thriller", "female-protagonist", "violence", "pandemic", "multi-pov", "family", "contemporary-setting", "survival"] },

  // Foz Meadows — portal fantasy, queer
  12255: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["portal-fantasy", "secondary-world", "female-protagonist", "queer-protagonist", "multi-pov", "political-intrigue", "ensemble-cast"] },
  12256: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 5, tone: 4, difficulty: 4 }, tags: ["portal-fantasy", "secondary-world", "female-protagonist", "queer-protagonist", "political-intrigue"] },
  12257: { vibes: { prose_craft: 6, prose_style: 5, warmth: 7, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 6, tone: 4, difficulty: 4 }, tags: ["secondary-world", "queer-protagonist", "male-protagonist", "romance-subplot", "political-intrigue", "enemies-to-lovers", "found-family"] },

  // Lauren Oliver — Before I Fall (YA, Groundhog Day premise)
  12162: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 7, tone: 3, difficulty: 2 }, tags: ["YA-contemporary", "female-protagonist", "time-loop", "high-school-setting", "coming-of-age", "mortality", "redemption", "first-person"] },
  // Delirium trilogy
  12163: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 6, tone: 3, difficulty: 2 }, tags: ["YA-dystopian", "female-protagonist", "first-person", "romance-subplot", "rebellion", "near-future", "forbidden-love"] },
  12164: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 }, tags: ["YA-dystopian", "female-protagonist", "rebellion", "near-future", "survival", "war"] },
  12165: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 }, tags: ["YA-dystopian", "female-protagonist", "rebellion", "near-future", "war"] },

  // Nancy Farmer — The Ear, the Eye, and the Arm (YA SF, Zimbabwe 2194)
  12015: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 5, interiority: 4, tone: 5, difficulty: 3 }, tags: ["YA-sci-fi", "african-setting", "far-future", "ensemble-cast", "adventure", "child-protagonist", "coming-of-age", "detective"] },
  12017: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 5, interiority: 6, tone: 3, difficulty: 3 }, tags: ["YA-contemporary", "female-protagonist", "african-setting", "survival", "wilderness", "coming-of-age", "cultural", "quest"] },

  // Rob J. Hayes — grimdark self-pub
  12248: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 4, tone: 4, difficulty: 3 }, tags: ["grimdark", "secondary-world", "pirate", "morally-gray-protagonist", "ensemble-cast", "heist", "sword-and-sorcery"] },
  12249: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 4, tone: 3, difficulty: 3 }, tags: ["grimdark", "secondary-world", "morally-gray-protagonist", "ensemble-cast", "violence", "war"] },
  12250: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 7, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["secondary-world", "Asian-inspired-setting", "ensemble-cast", "undead", "martial-arts", "adventure"] },
  12251: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["grimdark", "secondary-world", "female-protagonist", "orphan-protagonist", "coming-of-age", "prison-setting", "magic-system-focused"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

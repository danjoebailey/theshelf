const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Simon R. Green — pulpy urban fantasy / adventure fantasy
  11645: { vibes: { prose_craft: 4, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 3, tone: 5, difficulty: 3 }, tags: ["urban-fantasy", "noir", "male-protagonist", "first-person", "witty-prose", "violence", "ensemble-cast", "london-setting"] },
  11646: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 3, tone: 5, difficulty: 3 }, tags: ["sword-and-sorcery", "secondary-world", "ensemble-cast", "police-procedural", "violence", "dual-pov"] },
  11647: { vibes: { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 3, tone: 6, difficulty: 3 }, tags: ["high-fantasy", "secondary-world", "quest", "ensemble-cast", "comic-fantasy", "sword-and-sorcery"] },

  // Jonathan Stroud — Lockwood & Co
  11697: { vibes: { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 5, tone: 6, difficulty: 3 }, tags: ["YA-fantasy", "ghosts", "london-setting", "ensemble-cast", "first-person", "found-family", "female-protagonist", "mystery"] },

  // Chelsea Quinn Yarbro — Saint-Germain historical vampire
  11708: { vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fantasy", "vampires", "male-protagonist", "18th-century", "romance-subplot", "aristocratic", "european-setting"] },
  11709: { vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 6, pace: 4, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fantasy", "vampires", "male-protagonist", "renaissance-setting", "political-intrigue", "aristocratic"] },
  11710: { vibes: { prose_craft: 6, prose_style: 6, warmth: 5, intensity: 7, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fantasy", "vampires", "male-protagonist", "ancient-setting", "political-intrigue", "violence", "gladiator"] },

  // Sherwood Smith — Inda (acclaimed epic fantasy)
  11719: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["epic-fantasy", "secondary-world", "coming-of-age", "male-protagonist", "military-fantasy", "multi-pov", "boarding-school-setting", "political-intrigue", "ensemble-cast"] },

  // Sylvain Neuvel — Themis Files (found-footage format SF)
  11720: { vibes: { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, tags: ["hard-sf", "first-contact", "found-footage", "epistolary", "near-future", "ensemble-cast", "military-sf", "aliens"] },
  11721: { vibes: { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 3, interiority: 4, tone: 4, difficulty: 3 }, tags: ["hard-sf", "first-contact", "found-footage", "epistolary", "near-future", "aliens", "war", "military-sf"] },
  11722: { vibes: { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 }, tags: ["hard-sf", "first-contact", "found-footage", "epistolary", "near-future", "aliens", "political-intrigue"] },
  11723: { vibes: { prose_craft: 5, prose_style: 3, warmth: 3, intensity: 7, pace: 8, moral_complexity: 9, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["near-future", "dystopian", "novella-length", "immigration", "ticking-clock", "philosophical", "moral-dilemma"] },

  // Peter Clines (remaining)
  11725: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 4, tone: 5, difficulty: 4 }, tags: ["cosmic-horror", "mystery", "soft-sf", "male-protagonist", "puzzle-box", "contemporary-setting"] },
  11727: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 3 }, tags: ["zombies", "comic-fantasy", "ensemble-cast", "superhero", "post-apocalyptic", "action"] },

  // Matt Ruff
  11728: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 5, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-fantasy", "race", "Black-protagonist", "1950s-setting", "lovecraftian", "cosmic-horror", "ensemble-cast", "systemic-injustice", "segregation"] },
  11729: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 4, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, tags: ["psychological-thriller", "unreliable-narrator", "conspiracy", "female-protagonist", "twist-ending", "puzzle-box"] },
  11730: { vibes: { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 7, emotional_register: 6, interiority: 5, tone: 6, difficulty: 4 }, tags: ["urban-fantasy", "academia", "coming-of-age", "whimsical", "romance-subplot", "ensemble-cast", "mythic-fantasy"] },

  // Agustina Bazterrica — Argentine dystopian horror
  11732: { vibes: { prose_craft: 8, prose_style: 5, warmth: 1, intensity: 10, pace: 5, moral_complexity: 10, fabulism: 4, emotional_register: 0, interiority: 7, tone: 1, difficulty: 6 }, tags: ["dystopian", "near-future", "translated-from", "graphic-violence", "philosophical", "capitalism", "male-protagonist", "satire", "body-horror", "alienation"] },
  11733: { vibes: { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 1, interiority: 7, tone: 2, difficulty: 5 }, tags: ["dystopian", "translated-from", "class", "oppression", "female-protagonist", "alienation", "bleak"] },
  11734: { vibes: { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 4, emotional_register: 1, interiority: 6, tone: 2, difficulty: 5 }, tags: ["horror", "translated-from", "body-horror", "short-chapters", "vignettes", "bleak", "psychological-horror"] },

  // James Herbert — classic British horror
  11739: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 9, pace: 8, moral_complexity: 4, fabulism: 4, emotional_register: 2, interiority: 3, tone: 2, difficulty: 3 }, tags: ["supernatural-horror", "urban", "graphic-violence", "ensemble-cast", "survival", "monsters", "british-setting"] },
  11740: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 9, pace: 8, moral_complexity: 4, fabulism: 5, emotional_register: 2, interiority: 3, tone: 2, difficulty: 3 }, tags: ["supernatural-horror", "post-apocalyptic", "ensemble-cast", "graphic-violence", "british-setting", "survival", "madness"] },
  11741: { vibes: { prose_craft: 5, prose_style: 4, warmth: 3, intensity: 7, pace: 6, moral_complexity: 5, fabulism: 5, emotional_register: 3, interiority: 4, tone: 3, difficulty: 3 }, tags: ["supernatural-horror", "ghosts", "british-setting", "haunted-house", "ensemble-cast"] },
  11742: { vibes: { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 5, emotional_register: 5, interiority: 4, tone: 4, difficulty: 3 }, tags: ["supernatural-horror", "rural", "british-setting", "romance-subplot", "haunted-house", "quiet-horror", "cozy"] },

  // Robert Bloch — Psycho and classic horror
  11743: { vibes: { prose_craft: 6, prose_style: 4, warmth: 2, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["psychological-horror", "unreliable-narrator", "male-protagonist", "serial-killer", "motel-setting", "twist-ending", "mental-illness", "motherhood"] },
  11744: { vibes: { prose_craft: 6, prose_style: 4, warmth: 2, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["psychological-horror", "male-protagonist", "serial-killer", "obsession", "unreliable-narrator"] },
  11745: { vibes: { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 7, pace: 6, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["gothic-horror", "historical-fiction", "serial-killer", "19th-century", "urban", "chicago-setting"] },

  // S.M. Stirling — Emberverse (post-apocalyptic, tech dies)
  11746: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["post-apocalyptic", "alternate-history-sf", "ensemble-cast", "survival", "community", "medieval-regression", "military-fantasy"] },
  11747: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["post-apocalyptic", "alternate-history-sf", "ensemble-cast", "war", "community", "military-fantasy"] },
  11748: { vibes: { prose_craft: 5, prose_style: 5, warmth: 6, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["post-apocalyptic", "alternate-history-sf", "ensemble-cast", "war", "community"] },
  11749: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "time-travel", "ensemble-cast", "bronze-age", "island-setting", "military-sf", "survival"] },

  // Eric Flint — 1632 alternate history
  11750: { vibes: { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 3, tone: 5, difficulty: 3 }, tags: ["alternate-history-sf", "time-travel", "ensemble-cast", "small-town", "war", "17th-century", "community"] },
  11751: { vibes: { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 3, tone: 5, difficulty: 4 }, tags: ["alternate-history-sf", "time-travel", "ensemble-cast", "war", "political-intrigue", "17th-century"] },
  11752: { vibes: { prose_craft: 4, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "war", "ensemble-cast", "military-sf", "17th-century", "naval"] },

  // Harry Turtledove — alternate history master
  11757: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "civil-war", "time-travel", "military-sf", "multi-pov", "political-intrigue", "american-setting"] },
  11758: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 4, tone: 3, difficulty: 5 }, tags: ["alternate-history-sf", "military-sf", "multi-pov", "political-intrigue", "civil-war", "american-setting"] },
  11759: { vibes: { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["alternate-history-sf", "aliens", "ww2-era", "military-sf", "multi-pov", "ensemble-cast", "first-contact"] },
  11760: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, tags: ["alternate-history-sf", "historical-fantasy", "shakespeare", "political-intrigue", "espionage", "british-setting", "elizabethan"] },

  // Christopher Moore — comic fiction/fantasy
  11761: { vibes: { prose_craft: 6, prose_style: 4, warmth: 8, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 5, emotional_register: 7, interiority: 4, tone: 9, difficulty: 3 }, tags: ["comic-novel", "satirical", "biblical", "male-protagonist", "friendship", "coming-of-age", "historical-fiction", "witty-prose"] },
  11762: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 7, emotional_register: 6, interiority: 3, tone: 8, difficulty: 2 }, tags: ["comic-fantasy", "urban-fantasy", "demons", "small-town", "ensemble-cast", "witty-prose", "california-setting"] },
  11763: { vibes: { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 8, difficulty: 3 }, tags: ["urban-fantasy", "comic-fantasy", "male-protagonist", "mortality", "grief", "witty-prose", "san-francisco-setting"] },
  11764: { vibes: { prose_craft: 5, prose_style: 4, warmth: 7, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 6, emotional_register: 6, interiority: 3, tone: 8, difficulty: 2 }, tags: ["comic-fantasy", "ocean-setting", "whales", "male-protagonist", "ensemble-cast", "witty-prose", "hawaii-setting"] },

  // Vonda McIntyre
  11765: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 5, interiority: 6, tone: 3, difficulty: 5 }, tags: ["soft-sf", "post-apocalyptic", "female-protagonist", "quest", "ecological", "survival", "healing"] },
  11766: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 5, interiority: 6, tone: 4, difficulty: 5 }, tags: ["historical-fantasy", "court-intrigue", "female-protagonist", "scholar-protagonist", "french-setting", "17th-century", "romance-subplot"] },

  // David Wong (Jason Pargin) — John Dies at the End
  11771: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 7, pace: 8, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 8, difficulty: 3 }, tags: ["cosmic-horror", "comic-fantasy", "first-person", "male-protagonist", "absurdist", "unreliable-narrator", "body-horror", "ensemble-cast", "small-town"] },
  11772: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 7, pace: 8, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 8, difficulty: 3 }, tags: ["cosmic-horror", "comic-fantasy", "first-person", "male-protagonist", "absurdist", "spiders", "body-horror", "ensemble-cast"] },
  11773: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 7, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 7, difficulty: 3 }, tags: ["cosmic-horror", "comic-fantasy", "first-person", "male-protagonist", "absurdist", "body-horror", "unreliable-narrator"] },

  // C.J. Tudor — modern British thrillers
  11774: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "dual-timeline", "male-protagonist", "child-protagonist", "small-town", "british-setting", "twist-ending", "coming-of-age"] },
  11775: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "dual-timeline", "british-setting", "boarding-school-setting", "twist-ending"] },
  11776: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "multi-pov", "british-setting", "missing-person", "road-trip", "grief", "twist-ending"] },
  11777: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "folk-horror", "british-setting", "rural", "religious", "female-protagonist"] },

  // Keith Roberts — Pavane (classic alternate history)
  11784: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 7 }, tags: ["alternate-history-sf", "episodic", "british-setting", "vignettes", "lyrical-prose", "pastoral", "religious", "medieval-regression", "meditative"] },
  11785: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["near-future", "british-setting", "vignettes", "lyrical-prose", "post-apocalyptic", "experimental-form"] },

  // Fred Saberhagen — Berserker (classic SF)
  11786: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 3, tone: 3, difficulty: 4 }, tags: ["hard-sf", "space-opera", "AI", "military-sf", "far-future", "ensemble-cast", "survival", "episodic"] },

  // Fredric Brown — classic SF humorist
  11791: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 6, interiority: 4, tone: 9, difficulty: 3 }, tags: ["comic-fantasy", "satirical", "aliens", "first-contact", "near-future", "absurdist", "novella-length"] },
  11792: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 4, tone: 8, difficulty: 3 }, tags: ["soft-sf", "multiverse", "satirical", "absurdist", "comic-fantasy", "novella-length"] },
  11793: { vibes: { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 5, interiority: 4, tone: 6, difficulty: 3 }, tags: ["soft-sf", "near-future", "space-opera", "male-protagonist", "aging"] },

  // Sarah Pinborough — Behind Her Eyes
  11781: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, tags: ["psychological-thriller", "dual-pov", "female-protagonist", "twist-ending", "domestic-thriller", "romance-subplot", "unreliable-narrator"] },
  11782: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["domestic-thriller", "female-protagonist", "marriage", "suburb", "twist-ending"] },
  11783: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["domestic-thriller", "female-protagonist", "multi-pov", "friendship", "twist-ending"] },

  // Murray Leinster — classic SF
  11789: { vibes: { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 4, tone: 4, difficulty: 4 }, tags: ["hard-sf", "first-contact", "aliens", "far-future", "space-opera", "classic-sf"] },
  11790: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 3, tone: 4, difficulty: 4 }, tags: ["hard-sf", "survival", "planetary-romance", "ecological", "far-future"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

// Count skipped from this range
const skipped = [
  "Chloe Neill x3", "Joanne Harris Runemarks", "Jerry Pournelle x3",
  "Eoin Colfer x4 (YA/children's)", "Ian Irvine x3", "Elizabeth Haydon x3",
  "Sherwood Smith Crown/Court Duel (YA)", "David Farland x4", "Larry Correia x4",
  "Darcy Coates x3", "Jennifer Fallon x3", "Fred Saberhagen Broken Lands + Holmes-Dracula",
  "Peter Clines Dead Moon", "Matt Ruff Mirage", "Vonda McIntyre Starfarers",
  "S.M. Stirling already handled by genre defaults"
];
console.log("\\nSkipped (low confidence / YA-children's):", skipped.length, "groups");

const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Yuri Olesha — Envy (1927 Soviet satire)
  12636: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 4, pace: 5, moral_complexity: 8, fabulism: 3, emotional_register: 3, interiority: 8, tone: 5, difficulty: 6 }, tags: ["satirical", "translated-from", "male-protagonist", "modernist", "1920s-setting", "soviet-setting", "alienation", "obsession", "urban", "novella-length"] },

  // Andrey Bely — Petersburg (modernist masterpiece)
  12637: { vibes: { prose_craft: 10, prose_style: 10, warmth: 3, intensity: 6, pace: 3, moral_complexity: 9, fabulism: 4, emotional_register: 3, interiority: 9, tone: 3, difficulty: 10 }, tags: ["modernist", "translated-from", "stream-of-consciousness", "political-intrigue", "urban", "russian-setting", "revolutionary", "dense-prose", "experimental-form", "1900s-setting", "father-son", "doorstopper"] },
  12638: { vibes: { prose_craft: 9, prose_style: 9, warmth: 5, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 10, tone: 4, difficulty: 9 }, tags: ["autofiction", "modernist", "translated-from", "stream-of-consciousness", "childhood", "memory", "experimental-form", "lyrical-prose"] },

  // Gilbert Sorrentino — American experimental fiction
  12642: { vibes: { prose_craft: 9, prose_style: 7, warmth: 2, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 6, tone: 6, difficulty: 9 }, tags: ["postmodern", "metafiction", "experimental-form", "satirical", "writer-protagonist", "literary-fiction", "male-protagonist"] },
  12643: { vibes: { prose_craft: 9, prose_style: 7, warmth: 2, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 5, difficulty: 8 }, tags: ["postmodern", "satirical", "urban", "new-york-setting", "artist-protagonist", "ensemble-cast", "literary-fiction"] },
  12644: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 7, tone: 4, difficulty: 7 }, tags: ["literary-fiction", "family", "small-town", "working-class", "multi-pov", "memory", "20th-century"] },

  // Harry Mathews — Oulipo-adjacent American experimental
  12645: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 5, difficulty: 7 }, tags: ["postmodern", "ensemble-cast", "upper-class", "literary-fiction", "nonlinear", "experimental-form", "new-york-setting"] },
  12646: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 5, tone: 6, difficulty: 7 }, tags: ["postmodern", "absurdist", "experimental-form", "satirical", "adventure", "picaresque"] },
  12647: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 7, tone: 4, difficulty: 7 }, tags: ["postmodern", "diary-form", "experimental-form", "male-protagonist", "metafiction", "obsessive-interiority"] },

  // Leonard Michaels — sharp, compressed literary fiction
  12648: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "male-protagonist", "ensemble-cast", "masculinity", "marriage", "contemporary-setting", "urban", "domestic"] },
  12649: { vibes: { prose_craft: 9, prose_style: 5, warmth: 3, intensity: 8, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 1, interiority: 9, tone: 2, difficulty: 5 }, tags: ["autofiction", "memoir", "male-protagonist", "marriage", "suicide", "grief", "urban", "intimate", "domestic", "mental-illness"] },

  // Paula Fox — precise American literary fiction
  12650: { vibes: { prose_craft: 9, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "female-protagonist", "urban", "marriage", "class", "restrained-prose", "new-york-setting", "domestic", "novella-length"] },
  12651: { vibes: { prose_craft: 9, prose_style: 5, warmth: 2, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "family", "female-protagonist", "domestic", "grief", "restrained-prose", "class"] },
  12652: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "male-protagonist", "marriage", "domestic", "restrained-prose", "urban"] },

  // Josef Škvorecký — Czech literary fiction
  12653: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "immigrant-protagonist", "exile", "canadian-setting", "czech-protagonist", "autofiction", "political-intrigue", "cold-war-era"] },
  12654: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "coming-of-age", "male-protagonist", "ww2-era", "jazz", "czech-setting", "rebellion"] },
  12655: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "satirical", "czech-setting", "communist-era", "mystery"] },

  // Dezső Kosztolányi — Hungarian literary fiction
  12656: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "small-town", "aging", "loneliness", "family", "hungarian-setting", "restrained-prose"] },
  12657: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 6, tone: 6, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "vignettes", "episodic", "picaresque", "hungarian-setting", "witty-prose"] },
  12658: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "domestic", "class", "hungarian-setting", "working-class"] },

  // Péter Nádas — major Hungarian literary fiction
  12659: { vibes: { prose_craft: 10, prose_style: 9, warmth: 3, intensity: 5, pace: 2, moral_complexity: 9, fabulism: 2, emotional_register: 3, interiority: 10, tone: 2, difficulty: 10 }, tags: ["literary-fiction", "translated-from", "dense-prose", "nonlinear", "multi-pov", "sexuality", "memory", "hungarian-setting", "20th-century", "doorstopper", "experimental-form"] },
  12660: { vibes: { prose_craft: 10, prose_style: 10, warmth: 3, intensity: 5, pace: 2, moral_complexity: 9, fabulism: 2, emotional_register: 3, interiority: 10, tone: 2, difficulty: 10 }, tags: ["literary-fiction", "translated-from", "dense-prose", "nonlinear", "multi-pov", "doorstopper", "experimental-form", "multigenerational", "hungarian-setting", "20th-century"] },

  // Aharon Appelfeld — Holocaust literary fiction
  12661: { vibes: { prose_craft: 8, prose_style: 4, warmth: 3, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 1, interiority: 6, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "Holocaust", "Jewish-protagonist", "ensemble-cast", "restrained-prose", "novella-length", "uneasy", "resort-setting"] },
  12662: { vibes: { prose_craft: 8, prose_style: 4, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "Holocaust", "Jewish-protagonist", "male-protagonist", "exile", "memory", "train-setting", "restrained-prose"] },
  12663: { vibes: { prose_craft: 8, prose_style: 4, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 1, interiority: 6, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "Holocaust", "female-protagonist", "survival", "child-protagonist", "restrained-prose", "novella-length"] },

  // S.Y. Agnon — Israeli/Hebrew Nobel laureate
  12664: { vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "Jewish-protagonist", "male-protagonist", "historical-fiction", "israeli-setting", "early-20th-century", "doorstopper", "lyrical-prose"] },
  12665: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "Jewish-protagonist", "male-protagonist", "marriage", "small-town", "19th-century"] },

  // Mori Ōgai — early Japanese modern literary fiction
  12666: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "japanese-setting", "19th-century", "romance-subplot", "restrained-prose", "social-realism"] },
  12667: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "autofiction", "male-protagonist", "japanese-setting", "sexuality", "coming-of-age"] },

  // Ryunosuke Akutagawa — classic Japanese short fiction
  12668: { vibes: { prose_craft: 9, prose_style: 6, warmth: 3, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 4, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["vignettes", "translated-from", "japanese-setting", "historical-fiction", "moral-dilemma", "restrained-prose", "unreliable-narrator"] },
  12669: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 6, tone: 4, difficulty: 5 }, tags: ["satirical", "translated-from", "japanese-setting", "fabulism", "absurdist", "novella-length", "social-realism"] },

  // Yoshimoto Banana — gentle Japanese literary fiction
  12670: { vibes: { prose_craft: 7, prose_style: 4, warmth: 8, intensity: 2, pace: 4, moral_complexity: 5, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 3 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "japanese-setting", "grief", "domestic", "food-writing", "family", "restrained-prose", "contemporary-setting"] },
  12671: { vibes: { prose_craft: 7, prose_style: 4, warmth: 7, intensity: 2, pace: 4, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 3 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "japanese-setting", "friendship", "coming-of-age", "restrained-prose", "novella-length"] },
  12672: { vibes: { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 2, pace: 3, moral_complexity: 5, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "japanese-setting", "grief", "memory", "dreamlike"] },

  // Ayi Kwei Armah — Ghanaian literary fiction
  12673: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 3, moral_complexity: 9, fabulism: 2, emotional_register: 1, interiority: 7, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "african-setting", "male-protagonist", "post-colonial", "corruption", "alienation", "bleak", "political-intrigue", "urban"] },
  12674: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "african-setting", "male-protagonist", "post-colonial", "exile", "alienation", "mental-illness", "nonlinear"] },

  // Mariama Bâ — Senegalese literary fiction
  12675: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 4 }, tags: ["epistolary", "translated-from", "female-protagonist", "african-setting", "marriage", "feminism", "grief", "muslim-protagonist", "novella-length", "restrained-prose"] },
  12676: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "african-setting", "interracial", "marriage", "feminism", "class"] },

  // Brian Moore — The Lonely Passion of Judith Hearne
  12677: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 1, interiority: 9, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "female-protagonist", "irish-setting", "loneliness", "addiction", "faith-and-doubt", "aging", "working-class", "intimate"] },

  // Tarjei Vesaas — Norwegian literary fiction, lyrical
  12680: { vibes: { prose_craft: 9, prose_style: 6, warmth: 5, intensity: 4, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 8, tone: 2, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "child-protagonist", "female-protagonist", "norwegian-setting", "ice-setting", "lyrical-prose", "friendship", "novella-length", "atmospheric", "restrained-prose"] },
  12681: { vibes: { prose_craft: 9, prose_style: 6, warmth: 4, intensity: 4, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "norwegian-setting", "rural", "lyrical-prose", "dreamlike", "mental-illness", "atmospheric"] },
  12682: { vibes: { prose_craft: 9, prose_style: 6, warmth: 5, intensity: 3, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 8, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "vignettes", "norwegian-setting", "lyrical-prose", "memory", "atmospheric", "meditative"] },

  // Dag Solstad — Norwegian literary fiction
  12690: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 3, pace: 2, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "norwegian-setting", "loneliness", "alienation", "midlife-crisis", "academic-setting", "contemporary-setting"] },
  12691: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 3, pace: 2, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "norwegian-setting", "loneliness", "alienation", "librarian-protagonist", "identity"] },
  12692: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 3, pace: 2, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "norwegian-setting", "academia", "loneliness", "alienation", "dignity"] },

  // Shirley Ann Grau — Southern American literary
  12693: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "southern-gothic", "race", "family-saga", "female-protagonist", "political-intrigue", "20th-century", "rural"] },
  12694: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["vignettes", "southern-gothic", "race", "rural", "african-american-community"] },

  // Fred Chappell — Appalachian literary fiction
  12697: { vibes: { prose_craft: 8, prose_style: 6, warmth: 7, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 3, emotional_register: 5, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "coming-of-age", "male-protagonist", "rural", "appalachian-setting", "family", "lyrical-prose", "magical-realism", "nostalgia"] },
  12698: { vibes: { prose_craft: 8, prose_style: 6, warmth: 7, intensity: 3, pace: 3, moral_complexity: 5, fabulism: 3, emotional_register: 5, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "male-protagonist", "rural", "appalachian-setting", "family", "homecoming", "lyrical-prose", "memory"] },

  // Lewis Nordan — Southern magical-realist literary fiction
  12699: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 7, pace: 4, moral_complexity: 9, fabulism: 4, emotional_register: 2, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "southern-gothic", "race", "violence", "magical-realism", "small-town", "mississippi-setting", "child-protagonist"] },
  12700: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "southern-gothic", "coming-of-age", "magical-realism", "small-town", "mississippi-setting", "vignettes", "nostalgia"] },
  12701: { vibes: { prose_craft: 7, prose_style: 6, warmth: 6, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 5, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "southern-gothic", "coming-of-age", "magical-realism", "small-town", "mississippi-setting", "family"] },

  // Gary Lutz — extreme sentence-level prose stylist
  12702: { vibes: { prose_craft: 10, prose_style: 8, warmth: 1, intensity: 5, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 1, interiority: 8, tone: 2, difficulty: 9 }, tags: ["experimental-form", "vignettes", "dense-prose", "alienation", "loneliness", "domestic", "minimalism", "sentence-level-focus"] },
  12703: { vibes: { prose_craft: 10, prose_style: 8, warmth: 1, intensity: 5, pace: 2, moral_complexity: 7, fabulism: 2, emotional_register: 1, interiority: 8, tone: 2, difficulty: 9 }, tags: ["experimental-form", "vignettes", "dense-prose", "alienation", "loneliness", "domestic", "minimalism"] },

  // Rick Moody — American literary fiction
  12704: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "suburban", "coming-of-age", "ensemble-cast", "new-england-setting", "contemporary-setting"] },
  12705: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "suburban", "family", "ensemble-cast", "marriage", "infidelity", "1970s", "new-england-setting", "domestic"] },
  12706: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 2, interiority: 7, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "suburban", "nuclear-anxiety", "family", "male-protagonist", "new-england-setting", "dense-prose", "experimental-form"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

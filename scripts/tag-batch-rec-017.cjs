const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Nicole Krauss — American literary fiction
  12928: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "nonlinear", "multi-pov", "Jewish-protagonist", "Holocaust", "memory", "loss", "love-story", "new-york-setting", "braided-narratives"] },
  12929: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "multi-pov", "writer-protagonist", "Jewish-protagonist", "memory", "identity", "new-york-setting"] },
  12930: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "dual-timeline", "male-protagonist", "Jewish-protagonist", "israeli-setting", "identity", "memory", "aging"] },

  // Magda Szabó — The Door (Hungarian literary masterpiece)
  12969: { vibes: { prose_craft: 9, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "hungarian-setting", "female-protagonist", "friendship", "class", "domestic", "working-class", "restrained-prose", "intimate"] },
  12970: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "hungarian-setting", "female-protagonist", "child-protagonist", "coming-of-age", "family", "memory"] },
  12971: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "hungarian-setting", "female-protagonist", "friendship", "aging", "contemporary-setting"] },

  // Agota Kristof — The Notebook trilogy (Hungarian-French, devastating)
  13581: { vibes: { prose_craft: 9, prose_style: 3, warmth: 1, intensity: 8, pace: 6, moral_complexity: 9, fabulism: 2, emotional_register: 1, interiority: 6, tone: 1, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "child-protagonist", "twin", "ww2-era", "survival", "restrained-prose", "violence", "sparse-prose", "bleak", "novella-length", "war"] },
  13582: { vibes: { prose_craft: 9, prose_style: 3, warmth: 1, intensity: 7, pace: 6, moral_complexity: 9, fabulism: 2, emotional_register: 1, interiority: 7, tone: 1, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "unreliable-narrator", "cold-war-era", "exile", "identity", "sparse-prose", "bleak"] },
  13583: { vibes: { prose_craft: 9, prose_style: 3, warmth: 1, intensity: 6, pace: 5, moral_complexity: 9, fabulism: 2, emotional_register: 1, interiority: 7, tone: 1, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "unreliable-narrator", "metafiction", "exile", "identity", "sparse-prose", "truth-and-lies"] },

  // Max Frisch — Swiss German literary master
  13397: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "identity", "technology", "guilt", "colonialism", "first-person", "20th-century"] },
  13398: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "identity", "metafiction", "prison-setting", "unreliable-narrator", "existential"] },
  13399: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "marriage", "infidelity", "diary-form", "swiss-setting", "domestic"] },

  // David Markson — Wittgenstein's Mistress (experimental masterpiece)
  13774: { vibes: { prose_craft: 9, prose_style: 5, warmth: 2, intensity: 2, pace: 2, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 10, tone: 3, difficulty: 8 }, tags: ["experimental-form", "female-protagonist", "post-apocalyptic", "isolation", "stream-of-consciousness", "memory", "art-history", "loneliness", "metafiction", "fragmentary-prose"] },
  13775: { vibes: { prose_craft: 9, prose_style: 5, warmth: 2, intensity: 2, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 2, interiority: 9, tone: 3, difficulty: 8 }, tags: ["experimental-form", "fragmentary-prose", "metafiction", "literary-fiction", "memory", "death", "art-history", "elegiac"] },
  13776: { vibes: { prose_craft: 9, prose_style: 5, warmth: 2, intensity: 2, pace: 2, moral_complexity: 6, fabulism: 2, emotional_register: 2, interiority: 9, tone: 3, difficulty: 8 }, tags: ["experimental-form", "fragmentary-prose", "metafiction", "writer-protagonist", "memory", "death", "art-history"] },

  // Edmund White — A Boy's Own Story (queer literary)
  13518: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 8, tone: 3, difficulty: 5 }, tags: ["autofiction", "first-person", "male-protagonist", "queer-protagonist", "coming-of-age", "american-setting", "1950s-setting", "lyrical-prose", "sexuality", "identity"] },
  13519: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 }, tags: ["autofiction", "first-person", "male-protagonist", "queer-protagonist", "new-york-setting", "1960s-setting", "lyrical-prose", "sexuality"] },
  13520: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["autofiction", "first-person", "male-protagonist", "queer-protagonist", "paris-setting", "illness", "AIDS", "grief", "lyrical-prose"] },

  // Chris Kraus — I Love Dick (autofiction/feminist)
  13823: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 4, difficulty: 5 }, tags: ["autofiction", "female-protagonist", "epistolary", "obsession", "feminism", "art-world", "sexuality", "contemporary-setting", "los-angeles-setting"] },
  13824: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 4, difficulty: 5 }, tags: ["autofiction", "female-protagonist", "art-world", "new-york-setting", "essay-style", "contemporary-setting"] },

  // Eileen Myles — Inferno (queer autofiction/poetry)
  13818: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 8, tone: 5, difficulty: 5 }, tags: ["autofiction", "queer-protagonist", "female-protagonist", "new-york-setting", "poet", "coming-of-age", "working-class", "art-world"] },
  13819: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 7, tone: 5, difficulty: 4 }, tags: ["autofiction", "queer-protagonist", "female-protagonist", "dog", "new-york-setting", "love", "intimate"] },

  // Sergei Dovlatov — Russian literary humor
  14113: { vibes: { prose_craft: 8, prose_style: 4, warmth: 6, intensity: 3, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 7, difficulty: 3 }, tags: ["vignettes", "translated-from", "russian-setting", "immigrant-protagonist", "new-york-setting", "witty-prose", "satirical", "domestic", "comic-novel", "novella-length"] },
  14114: { vibes: { prose_craft: 8, prose_style: 4, warmth: 5, intensity: 3, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 7, difficulty: 3 }, tags: ["vignettes", "translated-from", "russian-setting", "male-protagonist", "journalist-detective", "witty-prose", "satirical", "absurdist"] },
  14115: { vibes: { prose_craft: 8, prose_style: 4, warmth: 5, intensity: 3, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 7, difficulty: 3 }, tags: ["autofiction", "translated-from", "male-protagonist", "soviet-setting", "prison-setting", "witty-prose", "satirical", "labor"] },

  // Patrick Hamilton — British noir literary
  13211: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "british-setting", "female-protagonist", "ww2-era", "boarding-house", "loneliness", "class", "domestic", "restrained-prose"] },
  13212: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "british-setting", "male-protagonist", "addiction", "obsession", "urban", "london-setting", "noir", "interwar-setting"] },
  13213: { vibes: { prose_craft: 8, prose_style: 5, warmth: 2, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 7, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "british-setting", "male-protagonist", "domestic", "gaslighting", "marriage", "victorian-setting", "manipulation"] },

  // Cees Nooteboom — Dutch literary fiction
  13110: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 8, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "memory", "mortality", "philosophical", "novella-length", "dutch-setting", "meditative"] },
  13111: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "berlin-setting", "german-setting", "road-trip", "memory", "philosophical", "post-wall"] },
  13112: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 7, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "japanese-setting", "zen", "travel", "philosophical", "meditative"] },

  // Marie NDiaye — Three Strong Women (French literary)
  13157: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "african-setting", "french-setting", "immigration", "multi-pov", "identity", "family", "lyrical-prose"] },
  13158: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "french-setting", "domestic", "motherhood", "psychological-horror", "surreal"] },

  // Gerald Murnane — The Plains (Australian experimental)
  13253: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 2, pace: 1, moral_complexity: 6, fabulism: 4, emotional_register: 3, interiority: 9, tone: 3, difficulty: 9 }, tags: ["experimental-form", "australian-setting", "male-protagonist", "landscape", "memory", "metafiction", "dense-prose", "meditative", "novella-length"] },
  13254: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 2, pace: 1, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 9, tone: 3, difficulty: 9 }, tags: ["experimental-form", "australian-setting", "male-protagonist", "childhood", "landscape", "memory", "dense-prose", "horse-culture"] },

  // Eve Babitz — Los Angeles literary
  14082: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 6, tone: 7, difficulty: 3 }, tags: ["autofiction", "female-protagonist", "los-angeles-setting", "1960s-setting", "vignettes", "sexuality", "art-world", "witty-prose", "counterculture"] },
  14083: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 6, tone: 7, difficulty: 3 }, tags: ["autofiction", "female-protagonist", "los-angeles-setting", "1970s", "vignettes", "sexuality", "witty-prose", "hollywood"] },

  // Ishmael Reed — experimental African-American
  14236: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 6, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 4, tone: 7, difficulty: 6 }, tags: ["postmodern", "satirical", "Black-protagonist", "male-protagonist", "new-york-setting", "1920s-setting", "voodoo", "conspiracy", "experimental-form", "race"] },
  14237: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 4, tone: 7, difficulty: 6 }, tags: ["postmodern", "satirical", "western-setting", "race", "experimental-form", "absurdist", "revisionist"] },
  14238: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 6, moral_complexity: 8, fabulism: 6, emotional_register: 3, interiority: 5, tone: 6, difficulty: 6 }, tags: ["postmodern", "satirical", "Japanese-setting", "race", "experimental-form", "voodoo", "conspiracy"] },

  // Eileen Chang — foundational Chinese modern literary
  13007: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "chinese-setting", "1940s", "romance-subplot", "domestic", "war", "restrained-prose", "vignettes"] },
  13008: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "chinese-setting", "ww2-era", "espionage", "sexuality", "betrayal", "novella-length"] },
  13009: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 3, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "chinese-setting", "vignettes", "domestic", "marriage", "class"] },

  // Yan Lianke — major Chinese literary (banned works)
  13013: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 7, pace: 4, moral_complexity: 9, fabulism: 4, emotional_register: 2, interiority: 6, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "chinese-setting", "political-intrigue", "cultural-revolution", "satirical", "dystopian", "ensemble-cast", "labor"] },
  13014: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 6, pace: 4, moral_complexity: 9, fabulism: 4, emotional_register: 2, interiority: 6, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "translated-from", "chinese-setting", "rural", "family-saga", "disease", "satirical", "magical-realism", "political-intrigue"] },

  // Buchi Emecheta — Nigerian literary
  13247: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "nigerian-setting", "motherhood", "feminism", "class", "colonial-era", "domestic", "working-class"] },
  13248: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "nigerian-setting", "london-setting", "immigration", "domestic", "working-class", "racism"] },

  // Yvonne Vera — Zimbabwean literary
  13077: { vibes: { prose_craft: 8, prose_style: 7, warmth: 4, intensity: 7, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "female-protagonist", "zimbabwean-setting", "lyrical-prose", "violence", "war", "coming-of-age", "post-colonial"] },
  13078: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 7, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "female-protagonist", "zimbabwean-setting", "lyrical-prose", "violence", "sexual-violence", "colonial-era"] },
  13079: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 7, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 1, interiority: 8, tone: 2, difficulty: 6 }, tags: ["literary-fiction", "female-protagonist", "zimbabwean-setting", "lyrical-prose", "violence", "urban", "post-colonial", "contemporary-setting"] },

  // Mongo Beti — Cameroonian literary
  13070: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "african-setting", "cameroonian-setting", "religious", "colonialism", "satirical", "male-protagonist", "priest-protagonist"] },
  13071: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "african-setting", "cameroonian-setting", "coming-of-age", "male-protagonist", "colonialism", "satirical"] },

  // Amélie Nothomb — Belgian literary
  13584: { vibes: { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 5, difficulty: 3 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "writer-protagonist", "dark-comedy", "obsession", "novella-length", "witty-prose"] },
  13585: { vibes: { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 5, pace: 7, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 5, difficulty: 3 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "Japanese-setting", "workplace", "dark-comedy", "novella-length"] },

  // Jean-Philippe Toussaint — Belgian minimalist
  13587: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 1, pace: 3, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 7, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "minimalism", "domestic", "absurdist", "novella-length", "restrained-prose", "contemporary-setting"] },
  13588: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 2, pace: 3, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 7, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "male-protagonist", "minimalism", "photography", "contemporary-setting", "novella-length"] },

  // Lydia Millet — A Children's Bible
  13854: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "climate-fiction", "child-protagonist", "ensemble-cast", "biblical", "survival", "family", "satirical", "contemporary-setting", "allegory"] },
  13855: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "marriage", "family", "domestic", "ecological", "american-setting", "contemporary-setting"] },

  // Stuart Dybek — Chicago literary (short stories)
  13923: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["vignettes", "chicago-setting", "working-class", "coming-of-age", "urban", "immigrant-community", "magical-realism", "nostalgia"] },
  13924: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["vignettes", "chicago-setting", "urban", "lyrical-prose", "memory", "romantic", "atmospheric"] },

  // Charles Baxter — American literary
  13926: { vibes: { prose_craft: 7, prose_style: 5, warmth: 7, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "multi-pov", "romance-subplot", "midwestern-setting", "domestic", "quiet-drama", "ensemble-cast", "contemporary-setting"] },
  13927: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 4, difficulty: 4 }, tags: ["vignettes", "literary-fiction", "midwestern-setting", "domestic", "intimate", "quiet-drama"] },

  // Jim Shepard — short fiction master
  13786: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["vignettes", "historical-fiction", "multi-pov", "global-setting", "male-protagonist", "ensemble-cast", "disaster", "moral-dilemma"] },
  13787: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["vignettes", "literary-fiction", "multi-pov", "family", "intimate", "domestic", "american-setting"] },

  // Kevin Brockmeier — Brief History of the Dead
  13783: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 6, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "fabulism", "afterlife", "dual-narrative", "near-future", "apocalyptic", "memory", "community"] },
  13784: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 5, fabulism: 5, emotional_register: 5, interiority: 6, tone: 4, difficulty: 4 }, tags: ["vignettes", "fabulism", "dreamlike", "whimsical", "urban", "magical-realism", "intimate"] },

  // Nell Zink — The Wallcreeper
  13722: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 6, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "first-person", "marriage", "infidelity", "ecological", "european-setting", "contemporary-setting", "satirical", "novella-length"] },
  13723: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 4, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 6, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "race", "identity", "american-setting", "satirical", "contemporary-setting"] },

  // Bonnie Jo Campbell — Once Upon a River
  13755: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "rural", "river-setting", "coming-of-age", "survival", "midwestern-setting", "guns", "working-class"] },
  13756: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["vignettes", "rural", "midwestern-setting", "working-class", "female-protagonist", "domestic", "violence"] },

  // Stephen Dixon — Interstate (experimental American)
  13833: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 7, pace: 4, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["experimental-form", "male-protagonist", "violence", "road-trip", "father-daughter", "grief", "nonlinear", "repetition", "stream-of-consciousness"] },
  13834: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 8, tone: 3, difficulty: 7 }, tags: ["experimental-form", "vignettes", "domestic", "marriage", "stream-of-consciousness", "fragmentary-prose"] },

  // Margaret Drabble — British literary
  14161: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "female-protagonist", "british-setting", "1960s-setting", "pregnancy", "feminism", "coming-of-age", "academic-setting"] },
  14162: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 7, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "ensemble-cast", "british-setting", "multi-pov", "class", "contemporary-setting", "family-saga"] },

  // Alison Lurie — Foreign Affairs (Pulitzer)
  13712: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 2, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 5, interiority: 6, tone: 6, difficulty: 4 }, tags: ["literary-fiction", "dual-pov", "london-setting", "american-protagonist", "academic-setting", "romance-subplot", "witty-prose", "class", "social-comedy"] },

  // James Hannaham — Delicious Foods
  13801: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "Black-protagonist", "southern-setting", "slavery-metaphor", "addiction", "violence", "multi-pov", "labor", "exploitation", "contemporary-setting"] },

  // Helon Habila — Nigerian literary
  13532: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "nigerian-setting", "male-protagonist", "political-intrigue", "community", "urban", "resistance", "writer-protagonist"] },
  13533: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "nigerian-setting", "male-protagonist", "immigrant-protagonist", "european-setting", "refugee-protagonist", "contemporary-setting"] },

  // Hiroko Oyamada — Japanese literary
  13487: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "japanese-setting", "workplace", "alienation", "surreal", "contemporary-setting", "novella-length"] },
  13488: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "female-protagonist", "japanese-setting", "rural", "surreal", "domestic", "novella-length"] },

  // Charlotte Wood — Australian literary
  14170: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 3, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["literary-fiction", "australian-setting", "female-protagonist", "dystopian", "feminist", "ensemble-cast", "captivity", "survival", "violence"] },

  // Perumal Murugan — Indian Tamil literary
  14180: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "indian-setting", "rural", "marriage", "fertility", "caste-system", "domestic", "cultural"] },
  14181: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "indian-setting", "rural", "community", "animal-bond", "pastoral", "coming-of-age"] },

  // Bernardo Atxaga — Basque literary
  14192: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 6, tone: 5, difficulty: 5 }, tags: ["literary-fiction", "translated-from", "basque-setting", "vignettes", "magical-realism", "rural", "community", "braided-narratives", "oral-tradition"] },
  14193: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-fiction", "translated-from", "basque-setting", "male-protagonist", "past-sins", "rural", "domestic", "contemporary-setting"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Nicola Griffith — literary SF / historical fiction
  12271: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 7, tone: 3, difficulty: 6 }, tags: ["soft-sf", "feminist", "female-protagonist", "colony-world", "anthropological-sf", "queer-protagonist", "lyrical-prose", "ecological"] },
  12272: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["near-future", "cyberpunk", "female-protagonist", "queer-protagonist", "class", "identity", "lyrical-prose", "british-setting"] },
  12273: { vibes: { prose_craft: 9, prose_style: 7, warmth: 6, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 2, emotional_register: 4, interiority: 8, tone: 3, difficulty: 7 }, tags: ["historical-fiction", "medieval-setting", "female-protagonist", "queer-protagonist", "lyrical-prose", "coming-of-age", "british-setting", "political-intrigue", "7th-century", "doorstopper"] },

  // Kathe Koja — 90s Dell Abyss literary horror
  12299: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 8, pace: 5, moral_complexity: 8, fabulism: 5, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["weird-fiction", "body-horror", "urban", "artist-protagonist", "obsession", "cosmic-horror", "lyrical-prose", "transgressive"] },
  12300: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 8, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 8, tone: 2, difficulty: 6 }, tags: ["body-horror", "artist-protagonist", "performance-art", "obsession", "transgressive", "urban", "sexuality", "lyrical-prose"] },
  12301: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 7, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 9, tone: 2, difficulty: 6 }, tags: ["psychological-horror", "male-protagonist", "mental-illness", "unreliable-narrator", "surreal", "dreamlike", "lyrical-prose"] },

  // Gemma Files — weird western horror, literary
  12302: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 2, difficulty: 5 }, tags: ["psychological-horror", "film-setting", "canadian-setting", "female-protagonist", "folk-horror", "dreamlike", "atmospheric", "meta-fiction"] },
  12303: { vibes: { prose_craft: 7, prose_style: 7, warmth: 3, intensity: 8, pace: 5, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 6, tone: 2, difficulty: 6 }, tags: ["weird-fiction", "western-setting", "queer-protagonist", "male-protagonist", "blood-magic", "violence", "gods-walking", "lyrical-prose", "civil-war"] },
  12304: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["supernatural-horror", "weird-fiction", "gothic-atmosphere", "atmospheric", "surreal"] },

  // Daisy Johnson — Booker-shortlisted literary fiction/horror
  12292: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 6, pace: 3, moral_complexity: 8, fabulism: 5, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "mythology-retelling", "female-protagonist", "queer-protagonist", "nonlinear", "river-setting", "british-setting", "family", "lyrical-prose", "gothic-atmosphere"] },
  12293: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 7, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["psychological-horror", "female-protagonist", "sibling-bond", "body-horror", "domestic", "claustrophobic", "british-setting"] },
  12294: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 6, pace: 3, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 7, tone: 2, difficulty: 6 }, tags: ["vignettes", "rural", "british-setting", "fens-setting", "dreamlike", "lyrical-prose", "gothic-atmosphere", "folk-horror", "atmospheric"] },

  // Caroline Kepnes — You (stalker thriller)
  12295: { vibes: { prose_craft: 6, prose_style: 4, warmth: 2, intensity: 8, pace: 8, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 8, tone: 4, difficulty: 3 }, tags: ["psychological-thriller", "first-person", "male-protagonist", "unreliable-narrator", "serial-killer", "stalker", "new-york-setting", "obsession", "romance-subplot", "contemporary-setting"] },
  12296: { vibes: { prose_craft: 6, prose_style: 4, warmth: 2, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 4, difficulty: 3 }, tags: ["psychological-thriller", "first-person", "male-protagonist", "unreliable-narrator", "serial-killer", "los-angeles-setting", "contemporary-setting"] },
  12297: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["cosmic-horror", "near-future", "lovecraftian", "male-protagonist", "mystery"] },
  12298: { vibes: { prose_craft: 6, prose_style: 4, warmth: 2, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 4, difficulty: 3 }, tags: ["psychological-thriller", "first-person", "male-protagonist", "unreliable-narrator", "stalker", "small-town", "contemporary-setting"] },

  // Peter Ackroyd — London-obsessed literary fiction
  12352: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 5, pace: 3, moral_complexity: 8, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["literary-fiction", "dual-timeline", "london-setting", "18th-century", "20th-century", "mystery", "architectural", "postmodern", "gothic-atmosphere", "dense-prose"] },
  12353: { vibes: { prose_craft: 9, prose_style: 7, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 7, tone: 3, difficulty: 7 }, tags: ["literary-fiction", "dual-timeline", "london-setting", "elizabethan", "male-protagonist", "alchemy", "occult", "gothic-atmosphere", "dense-prose"] },
  12354: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 3, emotional_register: 3, interiority: 5, tone: 4, difficulty: 5 }, tags: ["historical-mystery", "victorian-setting", "london-setting", "serial-killer", "theater", "ensemble-cast", "literary-mystery"] },
  12355: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["literary-fiction", "victorian-setting", "london-setting", "retelling", "scientist-protagonist", "gothic-atmosphere", "dense-prose"] },

  // Rikki Ducornet — surrealist literary fiction
  12359: { vibes: { prose_craft: 9, prose_style: 8, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 7, tone: 4, difficulty: 8 }, tags: ["fabulism", "lyrical-prose", "baroque-prose", "surreal", "coming-of-age", "sexuality", "dreamlike", "experimental-form"] },
  12360: { vibes: { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 7, tone: 4, difficulty: 8 }, tags: ["fabulism", "lyrical-prose", "baroque-prose", "surreal", "childhood", "dreamlike", "memory", "ocean-setting"] },
  12361: { vibes: { prose_craft: 9, prose_style: 8, warmth: 4, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 7, tone: 5, difficulty: 8 }, tags: ["fabulism", "lyrical-prose", "baroque-prose", "surreal", "dreamlike", "island-setting", "whimsical", "metafiction"] },

  // Eden Robinson — Indigenous Canadian literary fiction
  12356: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "Indigenous-protagonist", "female-protagonist", "canadian-setting", "supernatural-horror", "coming-of-age", "family", "community", "grief"] },
  12357: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 6, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "Indigenous-protagonist", "male-protagonist", "canadian-setting", "supernatural-horror", "coming-of-age", "family", "witty-prose", "trickster"] },
  12358: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 6, tone: 5, difficulty: 4 }, tags: ["literary-fiction", "Indigenous-protagonist", "male-protagonist", "canadian-setting", "supernatural-horror", "family"] },

  // Michelle Paver — literary ghost stories, arctic/remote settings
  12365: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "arctic-setting", "male-protagonist", "isolation", "diary-form", "atmospheric", "1930s", "quiet-horror", "ghost-story"] },
  12366: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 4, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "mountain-setting", "male-protagonist", "isolation", "atmospheric", "1930s", "quiet-horror", "ghost-story", "himalayan-setting"] },
  12367: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["gothic-horror", "rural", "british-setting", "dual-timeline", "female-protagonist", "medieval-setting", "isolation", "atmospheric", "folk-horror"] },

  // Susan Hill — The Woman in Black and ghost stories
  12348: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 5, fabulism: 4, emotional_register: 2, interiority: 7, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "ghost-story", "male-protagonist", "first-person", "isolated-house", "british-setting", "atmospheric", "victorian-setting", "quiet-horror", "classic"] },
  12349: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 5, fabulism: 4, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "ghost-story", "male-protagonist", "first-person", "british-setting", "atmospheric", "victorian-setting"] },
  12350: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 5, fabulism: 4, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["supernatural-horror", "ghost-story", "british-setting", "contemporary-setting", "atmospheric", "novella-length"] },
  12351: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 4, moral_complexity: 5, fabulism: 4, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["supernatural-horror", "ghost-story", "frame-story", "british-setting", "victorian-setting", "atmospheric", "novella-length"] },

  // C.S. Pacat — Captive Prince (fantasy romance, court intrigue)
  12314: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["secondary-world", "romantasy", "male-protagonist", "queer-protagonist", "enemies-to-lovers", "court-intrigue", "slavery", "political-intrigue", "slow-burn"] },
  12315: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["secondary-world", "romantasy", "male-protagonist", "queer-protagonist", "enemies-to-lovers", "court-intrigue", "political-intrigue", "war"] },
  12316: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 8, emotional_register: 5, interiority: 6, tone: 3, difficulty: 4 }, tags: ["secondary-world", "romantasy", "male-protagonist", "queer-protagonist", "enemies-to-lovers", "political-intrigue", "war"] },

  // A.G. Slatter — gothic fairy-tale fantasy
  12305: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["gothic-atmosphere", "fairy-tale-retelling", "female-protagonist", "family-saga", "coastal-setting", "curses", "multigenerational", "atmospheric"] },
  12306: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["gothic-atmosphere", "fairy-tale-retelling", "female-protagonist", "curses", "garden-setting", "atmospheric"] },
  12307: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["gothic-atmosphere", "fairy-tale-retelling", "female-protagonist", "curses", "small-town", "family-saga", "atmospheric"] },

  // Kirsty Logan — literary fantasy/horror
  12308: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 6, tone: 4, difficulty: 5 }, tags: ["literary-fiction", "ocean-setting", "queer-protagonist", "female-protagonist", "circus-setting", "fabulism", "lyrical-prose", "atmospheric"] },
  12309: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 4, pace: 3, moral_complexity: 6, fabulism: 5, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-fiction", "scottish-setting", "queer-protagonist", "female-protagonist", "grief", "island-setting", "atmospheric", "lyrical-prose"] },
  12310: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 5, emotional_register: 2, interiority: 6, tone: 2, difficulty: 5 }, tags: ["vignettes", "horror", "queer-protagonist", "female-protagonist", "gothic-atmosphere", "atmospheric", "lyrical-prose", "body-horror"] },

  // Scott Snyder — graphic novels
  12318: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 8, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 2, interiority: 5, tone: 2, difficulty: 3 }, tags: ["graphic-novel", "supernatural-horror", "witches", "family", "violence", "rural", "body-horror"] },
  12319: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 7, moral_complexity: 6, fabulism: 6, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["graphic-novel", "vampires", "american-setting", "historical-fiction", "western-setting", "dual-timeline", "violence"] },
  12320: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 5, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 }, tags: ["graphic-novel", "superhero", "conspiracy", "male-protagonist", "gothic-atmosphere", "urban", "detective"] },
  12321: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, tags: ["graphic-novel", "post-apocalyptic", "ensemble-cast", "american-setting", "conspiracy", "adventure"] },

  // Jason Aaron — graphic novels (Scalped is exceptional)
  12322: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 9, pace: 7, moral_complexity: 9, fabulism: 1, emotional_register: 2, interiority: 6, tone: 2, difficulty: 4 }, tags: ["graphic-novel", "noir", "Indigenous-protagonist", "male-protagonist", "undercover", "violence", "reservation-setting", "organized-crime", "moral-corruption", "literary-crime"] },
  12323: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 8, pace: 6, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 5, tone: 2, difficulty: 3 }, tags: ["graphic-novel", "noir", "male-protagonist", "southern-gothic", "violence", "football", "small-town", "corruption"] },
  12324: { vibes: { prose_craft: 7, prose_style: 6, warmth: 2, intensity: 9, pace: 5, moral_complexity: 8, fabulism: 5, emotional_register: 1, interiority: 4, tone: 1, difficulty: 4 }, tags: ["graphic-novel", "biblical", "violence", "graphic-violence", "pre-flood", "bleak", "antihero", "survival"] },
  12325: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 4, tone: 4, difficulty: 3 }, tags: ["graphic-novel", "superhero", "mythology", "serial-killer", "male-protagonist", "gods-walking", "action"] },

  // Tom King — graphic novels (literary superhero, deeply human)
  12326: { vibes: { prose_craft: 9, prose_style: 5, warmth: 7, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 7, emotional_register: 3, interiority: 9, tone: 3, difficulty: 5 }, tags: ["graphic-novel", "superhero", "family", "suburban", "AI", "domestic", "identity", "melancholic", "quiet-drama", "philosophical"] },
  12327: { vibes: { prose_craft: 9, prose_style: 5, warmth: 6, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 9, emotional_register: 3, interiority: 8, tone: 3, difficulty: 5 }, tags: ["graphic-novel", "superhero", "marriage", "mortality", "war-trauma", "philosophical", "nonlinear", "intimate", "melancholic"] },
  12328: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 6, tone: 2, difficulty: 4 }, tags: ["graphic-novel", "war", "middle-east-setting", "espionage", "ensemble-cast", "political-intrigue", "violence", "noir"] },
  12329: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 9, fabulism: 7, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["graphic-novel", "superhero", "unreliable-narrator", "war-trauma", "moral-complexity", "conspiracy", "metafiction"] },

  // Jonathan Hickman — graphic novels (high-concept)
  12330: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 4, tone: 3, difficulty: 6 }, tags: ["graphic-novel", "alternate-history-sf", "western-setting", "post-apocalyptic", "multi-pov", "political-intrigue", "apocalyptic", "ensemble-cast"] },
  12331: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 3, tone: 6, difficulty: 4 }, tags: ["graphic-novel", "alternate-history-sf", "satirical", "ensemble-cast", "science", "conspiracy", "absurdist"] },
  12332: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 6 }, tags: ["graphic-novel", "superhero", "nonlinear", "multi-pov", "evolution", "political-intrigue", "ensemble-cast", "metafiction"] },
  12333: { vibes: { prose_craft: 7, prose_style: 5, warmth: 2, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 5, emotional_register: 2, interiority: 5, tone: 2, difficulty: 6 }, tags: ["graphic-novel", "noir", "conspiracy", "occult", "financial", "ensemble-cast", "violence", "mystery"] },

  // Ramez Naam — Nexus (near-future brain-computer SF)
  12311: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, tags: ["near-future", "cyberpunk", "nanotech", "male-protagonist", "political-intrigue", "espionage", "action", "philosophical-sf"] },
  12312: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, tags: ["near-future", "cyberpunk", "nanotech", "ensemble-cast", "political-intrigue", "war"] },
  12313: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 7, pace: 8, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 5, tone: 3, difficulty: 4 }, tags: ["near-future", "cyberpunk", "nanotech", "war", "political-intrigue", "ensemble-cast", "action"] },

  // Rick Remender — graphic novels
  12371: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 8, pace: 8, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 5, tone: 3, difficulty: 3 }, tags: ["graphic-novel", "male-protagonist", "assassin-protagonist", "coming-of-age", "1980s-setting", "violence", "ensemble-cast", "class"] },
  12372: { vibes: { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 7, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, tags: ["graphic-novel", "multiverse", "ensemble-cast", "soft-sf", "adventure", "family", "action"] },
  12373: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["graphic-novel", "far-future", "ocean-setting", "post-apocalyptic", "family", "survival", "hopeful", "lyrical-prose"] },

  // Matt Fraction — graphic novels
  12374: { vibes: { prose_craft: 7, prose_style: 4, warmth: 8, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 6, interiority: 5, tone: 8, difficulty: 2 }, tags: ["graphic-novel", "superhero", "male-protagonist", "witty-prose", "slice-of-life", "urban", "new-york-setting", "warm", "comedy"] },
  12375: { vibes: { prose_craft: 7, prose_style: 4, warmth: 7, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 4, emotional_register: 6, interiority: 5, tone: 8, difficulty: 3 }, tags: ["graphic-novel", "satirical", "dual-pov", "romance-subplot", "contemporary-setting", "witty-prose", "metafiction", "sexuality"] },
  12376: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 5, pace: 8, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 6, difficulty: 5 }, tags: ["graphic-novel", "espionage", "multiverse", "male-protagonist", "action", "nonlinear", "stylized"] },

  // Kelly Sue DeConnick — graphic novels
  12377: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 6, emotional_register: 3, interiority: 5, tone: 4, difficulty: 3 }, tags: ["graphic-novel", "dystopian", "feminist", "female-protagonist", "prison-setting", "satirical", "ensemble-cast", "resistance"] },
  12378: { vibes: { prose_craft: 8, prose_style: 7, warmth: 3, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 8, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, tags: ["graphic-novel", "western-setting", "mythology", "female-protagonist", "death", "lyrical-prose", "mythic-fantasy", "atmospheric"] },

  // Barry Eisler — Rain Fall (assassin thriller, Tokyo)
  12344: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["espionage", "male-protagonist", "assassin-protagonist", "asian-setting", "tokyo-setting", "action", "morally-gray-protagonist", "martial-arts"] },
  12345: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["espionage", "male-protagonist", "assassin-protagonist", "action", "ticking-clock"] },
  12346: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["espionage", "male-protagonist", "assassin-protagonist", "action"] },
  12347: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 8, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["espionage", "male-protagonist", "assassin-protagonist", "action", "tokyo-setting"] },

  // Usman T. Malik — Pakistani fantasy/horror
  12290: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["magical-realism", "pakistani-setting", "muslim-protagonist", "translated-from", "novella-length", "mythic-fantasy", "lyrical-prose", "folk-tale"] },
  12291: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 6, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["magical-realism", "pakistani-setting", "vignettes", "folk-tale", "lyrical-prose", "supernatural-horror", "dreamlike"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

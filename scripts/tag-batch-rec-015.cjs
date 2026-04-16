const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));

const batch = {
  // Lauren Beukes — South African speculative thriller
  12390: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 8, pace: 7, moral_complexity: 7, fabulism: 5, emotional_register: 2, interiority: 6, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "time-travel", "serial-killer", "multi-pov", "female-protagonist", "chicago-setting", "dual-timeline", "cat-and-mouse", "violence"] },
  12392: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 7, moral_complexity: 7, fabulism: 3, emotional_register: 2, interiority: 6, tone: 3, difficulty: 4 }, tags: ["psychological-thriller", "multi-pov", "urban", "detroit-setting", "serial-killer", "art", "violence", "ensemble-cast"] },

  // John Buchan — classic Edwardian spy thrillers
  12437: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 8, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 4 }, tags: ["espionage", "male-protagonist", "first-person", "adventure", "british-setting", "ww1-era", "ticking-clock", "drifter-protagonist", "classic"] },
  12438: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 4 }, tags: ["espionage", "male-protagonist", "first-person", "adventure", "ww1-era", "middle-east-setting", "ticking-clock"] },
  12439: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 4 }, tags: ["espionage", "male-protagonist", "first-person", "adventure", "ww1-era", "disguise", "ticking-clock"] },
  12440: { vibes: { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 4 }, tags: ["espionage", "male-protagonist", "first-person", "adventure", "interwar-setting", "kidnapping", "conspiracy"] },

  // Iain Reid — I'm Thinking of Ending Things (psychological horror)
  12451: { vibes: { prose_craft: 7, prose_style: 4, warmth: 2, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["psychological-horror", "unreliable-narrator", "first-person", "road-trip", "claustrophobic", "identity", "twist-ending", "intimate", "rural", "novella-length"] },
  12453: { vibes: { prose_craft: 7, prose_style: 4, warmth: 3, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 4, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["psychological-horror", "unreliable-narrator", "elderly-protagonist", "isolation", "domestic", "uneasy", "identity"] },

  // Maj Sjöwall & Per Wahlöö — Martin Beck (foundational police procedural)
  12819: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "urban", "series-detective", "social-realism", "cold-case", "restrained-prose"] },
  12820: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "urban", "series-detective", "social-realism", "bus-setting"] },
  12821: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "locked-room", "social-realism", "ensemble-cast"] },
  12822: { vibes: { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "urban", "child-victim", "social-realism"] },

  // Håkan Nesser — Van Veeteren Swedish mystery
  12823: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "series-detective", "psychological"] },
  12824: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "series-detective"] },
  12825: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, tags: ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "series-detective", "cold-case"] },

  // Leonardo Sciascia — Sicilian literary mystery/political
  12739: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "translated-from", "italian-setting", "sicilian-setting", "organized-crime", "political-intrigue", "corruption", "male-protagonist", "restrained-prose", "novella-length"] },
  12740: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "translated-from", "italian-setting", "sicilian-setting", "conspiracy", "male-protagonist", "restrained-prose", "novella-length"] },
  12741: { vibes: { prose_craft: 8, prose_style: 5, warmth: 3, intensity: 5, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "translated-from", "italian-setting", "political-intrigue", "corruption", "satirical", "novella-length"] },

  // Gadda — That Awful Mess on Via Merulana (Italian literary mystery)
  12742: { vibes: { prose_craft: 9, prose_style: 9, warmth: 4, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 5, difficulty: 9 }, tags: ["literary-mystery", "translated-from", "italian-setting", "roman-setting", "baroque-prose", "dense-prose", "satirical", "police-procedural", "multi-lingual", "ensemble-cast"] },

  // Kerstin Ekman — Swedish literary mystery
  12683: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "translated-from", "swedish-setting", "rural", "multi-pov", "ensemble-cast", "dual-timeline", "community", "violence", "doorstopper"] },
  12685: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "translated-from", "swedish-setting", "rural", "winter-setting", "atmospheric"] },

  // Brian Moore — The Statement (Nazi hunter thriller)
  12679: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 7, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 2, difficulty: 4 }, tags: ["espionage", "male-protagonist", "ww2-era", "french-setting", "cat-and-mouse", "religious", "war-criminal", "political-intrigue"] },

  // Nicola Griffith — Menewood (Hild sequel)
  12583: { vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 6, pace: 3, moral_complexity: 8, fabulism: 2, emotional_register: 3, interiority: 8, tone: 3, difficulty: 7 }, tags: ["historical-fiction", "female-protagonist", "queer-protagonist", "medieval-setting", "british-setting", "lyrical-prose", "political-intrigue", "7th-century", "war", "doorstopper"] },

  // Olivia Laing — literary nonfiction
  12843: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 0, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["literary-memoir", "essay-collection", "urban", "new-york-setting", "loneliness", "art-history", "artist-protagonist", "lyrical-prose"] },
  12844: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 0, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-memoir", "essay-collection", "addiction", "writer-protagonist", "american-setting", "biographical", "lyrical-prose"] },
  12846: { vibes: { prose_craft: 8, prose_style: 6, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 0, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-memoir", "essay-collection", "body", "sexuality", "art-history", "lyrical-prose", "contemporary-setting"] },

  // Eula Biss — literary essay/nonfiction
  12838: { vibes: { prose_craft: 8, prose_style: 5, warmth: 6, intensity: 2, pace: 3, moral_complexity: 7, fabulism: 0, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["essay-collection", "personal-essay", "science-writing", "motherhood", "fear", "community", "american-setting", "lyrical-prose"] },
  12839: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 2, pace: 3, moral_complexity: 7, fabulism: 0, emotional_register: 4, interiority: 7, tone: 3, difficulty: 5 }, tags: ["essay-collection", "personal-essay", "capitalism", "class", "domestic", "contemporary-setting", "lyrical-prose"] },
  12840: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 0, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["essay-collection", "personal-essay", "race", "identity", "american-setting", "lyrical-prose"] },

  // Jenny Odell — How to Do Nothing
  12841: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 1, pace: 3, moral_complexity: 6, fabulism: 0, emotional_register: 5, interiority: 6, tone: 4, difficulty: 5 }, tags: ["essay-collection", "big-idea-book", "capitalism", "attention", "ecological", "art-history", "california-setting", "contemporary-setting"] },
  12842: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 1, pace: 3, moral_complexity: 6, fabulism: 0, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["essay-collection", "big-idea-book", "time", "capitalism", "philosophical", "contemporary-setting"] },

  // Javier Cercas — nonfiction
  12887: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 8, fabulism: 0, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, tags: ["narrative-nonfiction", "translated-from", "spanish-setting", "political-intrigue", "coup", "democracy", "deeply-researched", "contemporary-setting"] },
  12888: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 9, fabulism: 0, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["narrative-nonfiction", "translated-from", "spanish-setting", "identity", "fraud", "Holocaust", "moral-dilemma", "biographical"] },

  // Historical Fiction: Hans Fallada — Every Man Dies Alone
  12094: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "german-setting", "ww2-era", "resistance", "marriage", "working-class", "ensemble-cast", "political-intrigue", "berlin-setting"] },

  // Miklós Bánffy — Transylvanian Trilogy (Hungarian historical epic)
  12976: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "hungarian-setting", "transylvanian-setting", "aristocratic", "political-intrigue", "pre-ww1", "multi-pov", "doorstopper", "decline"] },
  12977: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "hungarian-setting", "aristocratic", "political-intrigue", "decline", "ensemble-cast"] },
  12978: { vibes: { prose_craft: 8, prose_style: 7, warmth: 5, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 6, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "hungarian-setting", "aristocratic", "ww1-era", "decline", "war", "ensemble-cast"] },

  // Elias Khoury — Gate of the Sun (Lebanese masterpiece)
  12934: { vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 7, pace: 3, moral_complexity: 9, fabulism: 3, emotional_register: 2, interiority: 8, tone: 2, difficulty: 7 }, tags: ["literary-fiction", "translated-from", "palestinian-setting", "war", "refugee-protagonist", "exile", "memory", "oral-history", "nonlinear", "doorstopper", "political-intrigue"] },

  // Simin Daneshvar — Savushun (Iranian literary classic)
  12951: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "iranian-setting", "female-protagonist", "marriage", "political-intrigue", "ww2-era", "community", "resistance", "domestic"] },

  // Jerzy Andrzejewski — Ashes and Diamonds (Polish)
  12961: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "polish-setting", "ww2-era", "post-war-setting", "male-protagonist", "political-intrigue", "resistance", "moral-dilemma"] },

  // Ivo Andrić — Bosnian Chronicle (Nobel laureate)
  12994: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "bosnian-setting", "multi-pov", "ensemble-cast", "political-intrigue", "diplomatic", "19th-century", "ottoman-setting", "community"] },

  // Yevgeny Vodolazkin — Laurus (Russian medieval literary)
  12990: { vibes: { prose_craft: 8, prose_style: 7, warmth: 6, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 7, tone: 4, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "russian-setting", "medieval-setting", "male-protagonist", "religious", "pilgrimage", "healing", "lyrical-prose", "magical-realism"] },

  // Mikhail Shishkin — The Light and the Dark (Russian literary)
  12992: { vibes: { prose_craft: 9, prose_style: 8, warmth: 5, intensity: 5, pace: 2, moral_complexity: 7, fabulism: 3, emotional_register: 3, interiority: 9, tone: 3, difficulty: 8 }, tags: ["literary-fiction", "translated-from", "russian-setting", "epistolary", "dual-timeline", "war", "romance-subplot", "lyrical-prose", "dense-prose", "nonlinear", "memory"] },

  // Augusto Roa Bastos — I the Supreme (Paraguayan masterpiece)
  13059: { vibes: { prose_craft: 9, prose_style: 8, warmth: 2, intensity: 5, pace: 2, moral_complexity: 9, fabulism: 3, emotional_register: 3, interiority: 8, tone: 3, difficulty: 9 }, tags: ["historical-fiction", "translated-from", "paraguayan-setting", "political-intrigue", "dictator-novel", "experimental-form", "dense-prose", "metafiction", "male-protagonist", "power"] },
  13060: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 6, tone: 2, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "paraguayan-setting", "war", "working-class", "ensemble-cast", "vignettes", "political-intrigue"] },

  // Leonardo Padura — Cuban literary mystery
  13063: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, tags: ["literary-mystery", "translated-from", "cuban-setting", "male-protagonist", "series-detective", "urban", "political-intrigue", "post-revolutionary"] },
  13064: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "cuban-setting", "multi-pov", "trotsky", "dual-timeline", "political-intrigue", "assassination", "20th-century"] },
  13065: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["literary-mystery", "translated-from", "cuban-setting", "jewish-protagonist", "multi-pov", "religious", "dual-timeline", "exile"] },

  // Sembène Ousmane — God's Bits of Wood (African foundational)
  13066: { vibes: { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "african-setting", "senegalese-setting", "labor", "resistance", "ensemble-cast", "community", "colonial-era", "train-setting", "class"] },

  // Gregor von Rezzori — Snows of Yesteryear (memoir)
  13085: { vibes: { prose_craft: 9, prose_style: 7, warmth: 5, intensity: 3, pace: 3, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 8, tone: 4, difficulty: 6 }, tags: ["literary-memoir", "translated-from", "romanian-setting", "ukrainian-setting", "childhood", "memory", "family", "decline", "aristocratic", "lyrical-prose", "elegiac", "interwar-setting"] },

  // Ernst Jünger — Storm of Steel (WWI memoir)
  13087: { vibes: { prose_craft: 8, prose_style: 6, warmth: 2, intensity: 9, pace: 5, moral_complexity: 8, fabulism: 0, emotional_register: 2, interiority: 5, tone: 2, difficulty: 5 }, tags: ["memoir", "translated-from", "ww1-era", "male-protagonist", "soldier-protagonist", "war-trauma", "battlefield", "violence", "german-setting", "french-setting"] },

  // Hans Fallada — Every Man Dies Alone (fixed ID from earlier typo)
  13094: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 7, pace: 5, moral_complexity: 8, fabulism: 1, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "german-setting", "berlin-setting", "ww2-era", "resistance", "marriage", "working-class", "ensemble-cast", "political-intrigue"] },

  // Federico De Roberto — The Viceroys (Sicilian historical)
  13097: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 4, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 6 }, tags: ["historical-fiction", "translated-from", "italian-setting", "sicilian-setting", "family-saga", "aristocratic", "19th-century", "political-intrigue", "decline", "multigenerational"] },

  // Fumiko Enchi — The Waiting Years (Japanese classic)
  13025: { vibes: { prose_craft: 8, prose_style: 5, warmth: 4, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "japanese-setting", "female-protagonist", "marriage", "feminism", "domestic", "meiji-era", "restrained-prose"] },

  // Shohei Ooka — Taken Captive (Japanese war memoir/novel)
  13031: { vibes: { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 7, pace: 4, moral_complexity: 8, fabulism: 0, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["memoir", "translated-from", "male-protagonist", "soldier-protagonist", "ww2-era", "philippine-setting", "prisoner-of-war", "survival", "starvation", "war-trauma"] },

  // R.A. Lafferty — Okla Hannali (Choctaw historical, unique voice)
  12534: { vibes: { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 3, emotional_register: 4, interiority: 4, tone: 6, difficulty: 5 }, tags: ["historical-fiction", "Indigenous-protagonist", "american-setting", "19th-century", "choctaw", "multigenerational", "oral-tradition", "witty-prose", "trail-of-tears", "community"] },

  // Marek Krajewski — Breslau noir mystery
  12491: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 4 }, tags: ["historical-mystery", "translated-from", "german-setting", "interwar-setting", "male-protagonist", "series-detective", "noir", "violence", "ww2-era"] },
  12492: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 4 }, tags: ["historical-mystery", "translated-from", "german-setting", "series-detective", "noir", "violence", "ww2-era"] },
  12493: { vibes: { prose_craft: 6, prose_style: 5, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 4 }, tags: ["historical-mystery", "translated-from", "german-setting", "series-detective", "noir", "violence"] },

  // Ricardo Piglia — Argentine literary mystery
  13053: { vibes: { prose_craft: 8, prose_style: 6, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 7, tone: 3, difficulty: 6 }, tags: ["literary-mystery", "translated-from", "argentine-setting", "male-protagonist", "conspiracy", "provincial", "noir", "metafiction"] },

  // Dacia Maraini — Voices (Italian literary mystery)
  12747: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, tags: ["literary-mystery", "translated-from", "italian-setting", "roman-setting", "female-protagonist", "feminism", "domestic", "violence"] },

  // Dara Horn — All Other Nights
  12932: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 4 }, tags: ["historical-fiction", "civil-war", "jewish-protagonist", "male-protagonist", "espionage", "american-setting", "romance-subplot", "identity"] },

  // Radwa Ashour — Granada (Egyptian historical novel)
  12944: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "spanish-setting", "muslim-protagonist", "15th-century", "multigenerational", "exile", "family-saga", "religious-persecution"] },

  // Yrsa Sigurðardóttir — Icelandic mystery
  12828: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["mystery", "female-protagonist", "translated-from", "icelandic-setting", "series-detective", "supernatural-elements"] },
  12829: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 5, fabulism: 2, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["mystery", "female-protagonist", "translated-from", "icelandic-setting", "rural", "supernatural-elements"] },
  12830: { vibes: { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, tags: ["mystery", "female-protagonist", "translated-from", "icelandic-setting", "cold-case", "community"] },

  // Su Tong — My Life as Emperor (Chinese historical)
  13018: { vibes: { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 2, emotional_register: 2, interiority: 7, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "chinese-setting", "male-protagonist", "child-protagonist", "court-intrigue", "power", "decline", "dynastic"] },

  // Yasushi Inoue — The Blue Wolf (Japanese historical)
  13024: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "mongolian-setting", "male-protagonist", "genghis-khan", "war", "empire", "coming-of-age"] },

  // Slavenka Drakulić — nonfiction (war crimes)
  13000: { vibes: { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 0, emotional_register: 2, interiority: 7, tone: 2, difficulty: 5 }, tags: ["narrative-nonfiction", "translated-from", "war", "genocide", "balkan-setting", "war-crimes", "psychological", "deeply-researched", "empathy"] },

  // Norman Manea — The Hooligan's Return (Romanian memoir)
  13005: { vibes: { prose_craft: 8, prose_style: 6, warmth: 4, intensity: 4, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 8, tone: 3, difficulty: 7 }, tags: ["literary-memoir", "translated-from", "romanian-setting", "jewish-protagonist", "exile", "Holocaust", "communist-era", "memory", "identity", "dense-prose"] },

  // Lyudmila Ulitskaya — Daniel Stein, Interpreter (Russian literary)
  12987: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 8, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "multi-pov", "epistolary", "jewish-protagonist", "Holocaust", "religious", "faith-and-doubt", "israeli-setting", "polish-setting", "ensemble-cast"] },

  // Almudena Grandes — The Frozen Heart
  12897: { vibes: { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "spanish-setting", "civil-war", "dual-timeline", "family-saga", "secrets", "political-intrigue", "doorstopper"] },
  12898: { vibes: { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 4, difficulty: 3 }, tags: ["literary-fiction", "translated-from", "spanish-setting", "female-protagonist", "sexuality", "coming-of-age", "contemporary-setting"] },

  // Manuel Rivas — Galician literary
  12899: { vibes: { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "spanish-setting", "civil-war", "prison-setting", "male-protagonist", "romance-subplot", "lyrical-prose", "novella-length"] },
  12900: { vibes: { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, tags: ["historical-fiction", "translated-from", "spanish-setting", "civil-war", "books-within-books", "ensemble-cast", "multi-pov", "lyrical-prose"] },

  // Cristina Rivera Garza — Liliana's Invincible Summer (nonfiction)
  12798: { vibes: { prose_craft: 8, prose_style: 5, warmth: 5, intensity: 6, pace: 4, moral_complexity: 8, fabulism: 0, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, tags: ["narrative-nonfiction", "translated-from", "mexican-setting", "feminism", "violence", "grief", "sibling-bond", "deeply-researched", "personal-essay", "femicide"] },
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

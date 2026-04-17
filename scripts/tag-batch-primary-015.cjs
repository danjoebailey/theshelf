const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const existing = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
const PRIMARY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "book-data.json"), "utf8"));
const REC = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "rec-library.json"), "utf8"));
const ALL = [...PRIMARY, ...REC];

function ac(ids, v, t) { const r = {}; for (const id of ids) { r[id] = { vibes: { ...v }, tags: [...t] }; } return r; }
function f(a) { return ALL.filter(b => b.author === a && !existing[String(b.id)]).map(b => b.id); }

const batch = {
  // === HIGH CONFIDENCE — Authors I know well ===

  // Literary
  ...ac(f("Sebastian Barry"), { prose_craft: 8, prose_style: 6, warmth: 6, intensity: 5, pace: 3, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 5 }, ["literary-fiction", "irish-setting", "male-protagonist", "family-saga", "lyrical-prose", "historical-fiction", "war"]),
  ...ac(f("Emma Donoghue"), { prose_craft: 6, prose_style: 4, warmth: 6, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 3 }, ["literary-fiction", "irish-setting", "female-protagonist", "domestic", "child-protagonist", "captivity"]),
  ...ac(f("Paul Theroux"), { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 6, tone: 4, difficulty: 4 }, ["literary-fiction", "male-protagonist", "travel", "global-setting", "expatriate", "restrained-prose"]),
  ...ac(f("Arthur Koestler"), { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 6, pace: 5, moral_complexity: 9, fabulism: 1, emotional_register: 2, interiority: 8, tone: 2, difficulty: 5 }, ["literary-fiction", "political-intrigue", "male-protagonist", "prison-setting", "totalitarian", "philosophical"]),
  ...ac(f("Kahlil Gibran"), { prose_craft: 7, prose_style: 6, warmth: 8, intensity: 1, pace: 2, moral_complexity: 4, fabulism: 3, emotional_register: 6, interiority: 7, tone: 4, difficulty: 3 }, ["poetry", "translated-from", "philosophical", "spiritual", "lyrical-prose", "meditative"]),
  ...ac(f("Mitch Albom"), { prose_craft: 4, prose_style: 3, warmth: 9, intensity: 2, pace: 5, moral_complexity: 3, fabulism: 2, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["literary-fiction", "male-protagonist", "mortality", "warm", "hopeful", "parable"]),

  // SF I know well
  ...ac(f("Ken Liu"), { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 6, tone: 4, difficulty: 4 }, ["soft-sf", "vignettes", "translated-from", "chinese-setting", "philosophical-sf", "identity"]),
  ...ac(f("Emily St. John Mandel"), { prose_craft: 7, prose_style: 5, warmth: 5, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 4, emotional_register: 4, interiority: 6, tone: 3, difficulty: 3 }, ["literary-fiction", "post-apocalyptic", "multi-pov", "nonlinear", "ensemble-cast", "memory"]),
  ...ac(f("Christopher Priest"), { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 4, moral_complexity: 7, fabulism: 5, emotional_register: 3, interiority: 6, tone: 3, difficulty: 5 }, ["soft-sf", "british-setting", "unreliable-narrator", "identity", "literary-sf"]),
  ...ac(f("Michael Swanwick"), { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 5, difficulty: 5 }, ["soft-sf", "far-future", "ideas-driven", "witty-prose", "genre-bending"]),
  ...ac(f("A.E. van Vogt"), { prose_craft: 4, prose_style: 4, warmth: 3, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 3, difficulty: 4 }, ["space-opera", "far-future", "male-protagonist", "ideas-driven", "classic-sf"]),
  ...ac(f("Tade Thompson"), { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, ["near-future", "african-setting", "nigerian-setting", "male-protagonist", "aliens", "first-contact"]),
  ...ac(f("Matt Dinniman"), { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 6, pace: 8, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 7, difficulty: 2 }, ["progression-fantasy", "male-protagonist", "first-person", "VR", "dark-humor", "action", "witty-prose"]),
  ...ac(f("Octavia E. Butler"), { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 5, moral_complexity: 9, fabulism: 7, emotional_register: 3, interiority: 7, tone: 2, difficulty: 5 }, ["soft-sf", "female-protagonist", "Black-protagonist", "slavery", "oppression", "identity"]),

  // Fantasy I know well
  ...ac(f("Robert Jackson Bennett"), { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, ["secondary-world", "worldbuilding-heavy", "multi-pov", "magic-system-focused", "political-intrigue"]),
  ...ac(f("Lord Dunsany"), { prose_craft: 8, prose_style: 8, warmth: 4, intensity: 3, pace: 3, moral_complexity: 5, fabulism: 9, emotional_register: 4, interiority: 4, tone: 5, difficulty: 5 }, ["mythic-fantasy", "vignettes", "baroque-prose", "dreamlike", "lyrical-prose", "fairy-tale-retelling"]),
  ...ac(f("Lloyd Alexander"), { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 9, emotional_register: 5, interiority: 4, tone: 6, difficulty: 2 }, ["YA-fantasy", "secondary-world", "male-protagonist", "quest", "coming-of-age", "celtic-inspired"]),
  ...ac(f("Elizabeth Bear"), { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, ["secondary-world", "multi-pov", "female-protagonist", "political-intrigue", "worldbuilding-heavy"]),
  ...ac(f("Miles Cameron"), { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, ["epic-fantasy", "secondary-world", "male-protagonist", "knight-protagonist", "military-fantasy", "historical-fantasy"]),
  ...ac(f("Andrew Rowe"), { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 4, pace: 7, moral_complexity: 4, fabulism: 9, emotional_register: 5, interiority: 4, tone: 6, difficulty: 2 }, ["progression-fantasy", "male-protagonist", "first-person", "hard-magic", "magic-school", "action"]),
  ...ac(f("Katherine Kurtz"), { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, ["epic-fantasy", "secondary-world", "male-protagonist", "political-intrigue", "medieval-setting", "religious"]),
  ...ac(f("David Anthony Durham"), { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, ["epic-fantasy", "secondary-world", "multi-pov", "political-intrigue", "war", "ensemble-cast"]),
  ...ac(f("Rebecca Ross"), { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 2 }, ["romantasy", "female-protagonist", "enemies-to-lovers", "magic-system-focused", "dual-pov"]),
  ...ac(f("Scarlett St. Clair"), { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 2 }, ["romantasy", "mythology-retelling", "female-protagonist", "enemies-to-lovers", "steamy"]),

  // Historical fiction I know well
  ...ac(f("Mary Renault"), { prose_craft: 7, prose_style: 6, warmth: 5, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 6, tone: 3, difficulty: 5 }, ["historical-fiction", "greek-setting", "male-protagonist", "queer-protagonist", "ancient-setting", "war"]),
  ...ac(f("Dorothy Dunnett"), { prose_craft: 7, prose_style: 7, warmth: 4, intensity: 5, pace: 4, moral_complexity: 7, fabulism: 1, emotional_register: 4, interiority: 5, tone: 4, difficulty: 7 }, ["historical-fiction", "european-setting", "male-protagonist", "political-intrigue", "dense-prose", "doorstopper", "espionage"]),
  ...ac(f("Jean Auel"), { prose_craft: 4, prose_style: 4, warmth: 6, intensity: 5, pace: 4, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 3, difficulty: 3 }, ["historical-fiction", "female-protagonist", "prehistoric", "survival", "coming-of-age", "doorstopper"]),

  // Nonfiction I know
  ...ac(f("Søren Kierkegaard"), { prose_craft: 7, prose_style: 6, warmth: 3, intensity: 3, pace: 2, moral_complexity: 9, fabulism: 1, emotional_register: 3, interiority: 9, tone: 3, difficulty: 8 }, ["philosophy-pop", "translated-from", "danish-setting", "existential", "religious", "dense-prose"]),
  ...ac(f("Charles Darwin"), { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 1, pace: 3, moral_complexity: 5, fabulism: 0, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, ["science-writing", "british-setting", "evolution", "observation", "deeply-researched"]),

  // Thriller I know
  ...ac(f("Jeffery Deaver"), { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 }, ["thriller", "male-protagonist", "disabled-protagonist", "series-detective", "forensic-protagonist", "twist-ending"]),
  ...ac(f("B.A. Paris"), { prose_craft: 4, prose_style: 3, warmth: 3, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 2, difficulty: 1 }, ["domestic-thriller", "female-protagonist", "marriage", "twist-ending", "claustrophobic"]),
  ...ac(f("Dale Brown"), { prose_craft: 4, prose_style: 3, warmth: 3, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 2, emotional_register: 3, interiority: 3, tone: 3, difficulty: 2 }, ["tech-thriller", "male-protagonist", "military", "action", "near-future"]),
  ...ac(f("M.W. Craven"), { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 5, tone: 4, difficulty: 2 }, ["police-procedural", "male-protagonist", "british-setting", "series-detective", "serial-killer"]),

  // === MEDIUM CONFIDENCE — Genre defaults but reasonable ===

  // Romance (genre defaults but I know the conventions)
  ...ac(f("Beverly Jenkins"), { prose_craft: 5, prose_style: 3, warmth: 8, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 6, interiority: 5, tone: 5, difficulty: 2 }, ["historical-romance", "Black-protagonist", "female-protagonist", "HEA", "american-setting", "19th-century"]),
  ...ac(f("Jill Shalvis"), { prose_craft: 4, prose_style: 2, warmth: 8, intensity: 2, pace: 6, moral_complexity: 3, fabulism: 1, emotional_register: 6, interiority: 4, tone: 7, difficulty: 1 }, ["contemporary-romance", "rom-com", "female-protagonist", "small-town", "HEA"]),
  ...ac(f("Susan Mallery"), { prose_craft: 4, prose_style: 2, warmth: 8, intensity: 2, pace: 5, moral_complexity: 3, fabulism: 1, emotional_register: 6, interiority: 4, tone: 6, difficulty: 1 }, ["contemporary-romance", "female-protagonist", "small-town", "community", "HEA"]),
  ...ac(f("Penelope Ward"), { prose_craft: 3, prose_style: 2, warmth: 6, intensity: 4, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 4, tone: 5, difficulty: 1 }, ["contemporary-romance", "female-protagonist", "steamy", "HEA"]),
  ...ac(f("Jay Crownover"), { prose_craft: 3, prose_style: 2, warmth: 5, intensity: 5, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["contemporary-romance", "male-protagonist", "steamy", "tattoo-setting", "HEA"]),
  ...ac(f("Rachel Reid"), { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 5, tone: 6, difficulty: 1 }, ["contemporary-romance", "queer-protagonist", "male-protagonist", "sports-romance", "HEA"]),
  ...ac(f("Penny Reid"), { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 2, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 5, tone: 7, difficulty: 1 }, ["contemporary-romance", "rom-com", "female-protagonist", "witty-prose", "HEA", "nerd-protagonist"]),
  ...ac(f("Katee Robert"), { prose_craft: 4, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 4, fabulism: 3, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["romance", "female-protagonist", "mythology-retelling", "steamy", "explicit", "dark-romance"]),
  ...ac(f("Karen Kingsbury"), { prose_craft: 3, prose_style: 2, warmth: 8, intensity: 3, pace: 5, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["romance", "female-protagonist", "religious", "faith", "family", "domestic", "HEA"]),
  ...ac(f("Beverly Lewis"), { prose_craft: 3, prose_style: 2, warmth: 7, intensity: 2, pace: 4, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["fiction", "female-protagonist", "amish-setting", "religious", "domestic", "rural"]),

  // More historical fiction
  ...ac(f("Ben Kane"), { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 7, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 }, ["historical-fiction", "male-protagonist", "roman-setting", "soldier-protagonist", "war", "action"]),
  ...ac(f("Giles Kristian"), { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 7, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 4, tone: 3, difficulty: 3 }, ["historical-fiction", "male-protagonist", "viking", "war", "action", "adventure"]),
  ...ac(f("Susan Meissner"), { prose_craft: 5, prose_style: 3, warmth: 6, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 2 }, ["historical-fiction", "female-protagonist", "dual-timeline", "ww2-era", "family"]),

  // Mystery
  ...ac(f("Maj Sjöwall"), { prose_craft: 7, prose_style: 4, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 4 }, ["police-procedural", "male-protagonist", "translated-from", "swedish-setting", "series-detective", "social-realism"]),
  ...ac(f("Sarah Graves"), { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 3, pace: 5, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 4, tone: 6, difficulty: 1 }, ["cozy-mystery", "female-protagonist", "amateur-sleuth", "small-town", "new-england-setting"]),

  // Jennifer Weiner (commercial fiction)
  ...ac(f("Jennifer Weiner"), { prose_craft: 5, prose_style: 3, warmth: 6, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 5, tone: 6, difficulty: 1 }, ["literary-fiction", "female-protagonist", "domestic", "body", "family", "witty-prose", "contemporary-setting"]),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

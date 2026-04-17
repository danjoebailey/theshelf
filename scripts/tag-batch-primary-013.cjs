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
  // === NOTABLE SF ===
  ...ac(f("Douglas Adams"), { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 2, pace: 7, moral_complexity: 5, fabulism: 9, emotional_register: 6, interiority: 4, tone: 10, difficulty: 2 }, ["comic-fantasy", "space-opera", "satirical", "absurdist", "witty-prose", "male-protagonist"]),
  ...ac(f("Nnedi Okorafor"), { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 5, pace: 5, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, ["afrofuturist", "female-protagonist", "nigerian-setting", "Black-protagonist", "coming-of-age"]),
  ...ac(f("Jasper Fforde"), { prose_craft: 6, prose_style: 5, warmth: 5, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 4, tone: 8, difficulty: 3 }, ["comic-fantasy", "female-protagonist", "metafiction", "books-within-books", "british-setting", "satirical"]),
  ...ac(f("Nancy Kress"), { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, ["hard-sf", "near-future", "genetic-engineering", "ideas-driven", "female-protagonist"]),
  ...ac(f("Poul Anderson"), { prose_craft: 5, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 4 }, ["hard-sf", "space-opera", "far-future", "male-protagonist", "ideas-driven", "adventure"]),
  ...ac(f("Leigh Brackett"), { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, ["space-opera", "sword-and-sorcery", "male-protagonist", "adventure", "planetary-romance"]),
  ...ac(f("Gregory Benford"), { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 4, interiority: 5, tone: 3, difficulty: 5 }, ["hard-sf", "far-future", "ideas-driven", "male-protagonist", "scientist-protagonist"]),
  ...ac(f("Ian McDonald"), { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 5, pace: 5, moral_complexity: 7, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 5 }, ["near-future", "cyberpunk", "multi-pov", "global-setting", "worldbuilding-heavy", "literary-sf"]),
  ...ac(f("Kage Baker"), { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 5, tone: 5, difficulty: 4 }, ["time-travel", "far-future", "ensemble-cast", "ideas-driven"]),
  ...ac(f("Robert Charles Wilson"), { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 7, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, ["hard-sf", "near-future", "ideas-driven", "male-protagonist", "cosmic-scale"]),
  ...ac(f("Dennis E. Taylor"), { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 3, pace: 7, moral_complexity: 4, fabulism: 8, emotional_register: 5, interiority: 4, tone: 7, difficulty: 2 }, ["hard-sf", "space-opera", "male-protagonist", "first-person", "AI", "witty-prose", "self-replication"]),
  ...ac(f("Elizabeth Moon"), { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 8, emotional_register: 4, interiority: 4, tone: 4, difficulty: 3 }, ["military-sf", "space-opera", "female-protagonist", "far-future", "action"]),
  ...ac(f("Mary Shelley"), { prose_craft: 7, prose_style: 6, warmth: 4, intensity: 6, pace: 3, moral_complexity: 8, fabulism: 6, emotional_register: 3, interiority: 7, tone: 2, difficulty: 5 }, ["gothic-horror", "epistolary", "male-protagonist", "science", "moral-dilemma", "19th-century"]),
  ...ac(f("Stephen Baxter"), { prose_craft: 5, prose_style: 5, warmth: 3, intensity: 4, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 3, interiority: 5, tone: 3, difficulty: 5 }, ["hard-sf", "far-future", "ideas-driven", "worldbuilding-heavy", "cosmic-scale"]),

  // === NOTABLE FANTASY ===
  ...ac(f("Peter S. Beagle"), { prose_craft: 8, prose_style: 6, warmth: 7, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 }, ["literary-fantasy", "lyrical-prose", "fairy-tale-retelling", "quest", "melancholic"]),
  ...ac(f("R.F. Kuang"), { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 8, pace: 6, moral_complexity: 8, fabulism: 8, emotional_register: 3, interiority: 6, tone: 2, difficulty: 4 }, ["epic-fantasy", "secondary-world", "Asian-inspired-setting", "female-protagonist", "war", "revolution", "grimdark"]),
  ...ac(f("Jo Walton"), { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 6, emotional_register: 5, interiority: 6, tone: 5, difficulty: 4 }, ["literary-fantasy", "female-protagonist", "metafiction", "coming-of-age", "british-setting"]),
  ...ac(f("Christopher Buehlman"), { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 7, emotional_register: 3, interiority: 5, tone: 4, difficulty: 4 }, ["dark-fantasy", "male-protagonist", "first-person", "historical-fantasy", "witty-prose", "violence"]),
  ...ac(f("Nghi Vo"), { prose_craft: 7, prose_style: 5, warmth: 6, intensity: 3, pace: 4, moral_complexity: 6, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 3 }, ["secondary-world", "Asian-inspired-setting", "novella-length", "found-family", "lyrical-prose"]),
  ...ac(f("Kate Elliott"), { prose_craft: 5, prose_style: 5, warmth: 5, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 9, emotional_register: 4, interiority: 5, tone: 4, difficulty: 4 }, ["epic-fantasy", "secondary-world", "multi-pov", "ensemble-cast", "political-intrigue", "worldbuilding-heavy"]),
  ...ac(f("Susan Cooper"), { prose_craft: 6, prose_style: 5, warmth: 6, intensity: 4, pace: 5, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 3 }, ["YA-fantasy", "celtic-inspired", "british-setting", "quest", "coming-of-age", "chosen-one"]),
  ...ac(f("C.S. Friedman"), { prose_craft: 6, prose_style: 5, warmth: 4, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 9, emotional_register: 4, interiority: 5, tone: 3, difficulty: 4 }, ["dark-fantasy", "secondary-world", "morally-gray-protagonist", "magic-system-focused"]),

  // === MYSTERY ===
  ...ac(f("Robert Crais"), { prose_craft: 5, prose_style: 3, warmth: 5, intensity: 6, pace: 8, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 2 }, ["mystery", "male-protagonist", "los-angeles-setting", "private-eye", "series-detective", "witty-prose"]),
  ...ac(f("Richard Osman"), { prose_craft: 5, prose_style: 3, warmth: 8, intensity: 2, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 4, tone: 8, difficulty: 1 }, ["cozy-mystery", "ensemble-cast", "elderly-protagonist", "british-setting", "witty-prose", "amateur-sleuth"]),
  ...ac(f("Benjamin Black"), { prose_craft: 7, prose_style: 5, warmth: 3, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 7, tone: 3, difficulty: 4 }, ["mystery", "male-protagonist", "dublin-setting", "1950s-setting", "series-detective", "atmospheric", "restrained-prose"]),
  ...ac(f("John Green"), { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 6, tone: 6, difficulty: 2 }, ["YA-contemporary", "male-protagonist", "first-person", "romance-subplot", "coming-of-age", "witty-prose"]),

  // === THRILLER ===
  ...ac(f("Clare Mackintosh"), { prose_craft: 5, prose_style: 3, warmth: 4, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 2 }, ["domestic-thriller", "female-protagonist", "british-setting", "twist-ending", "multi-pov"]),
  ...ac(f("Alice Feeney"), { prose_craft: 5, prose_style: 3, warmth: 3, intensity: 6, pace: 7, moral_complexity: 5, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 2 }, ["domestic-thriller", "female-protagonist", "unreliable-narrator", "twist-ending", "british-setting"]),
  ...ac(f("Mick Herron"), { prose_craft: 7, prose_style: 5, warmth: 4, intensity: 5, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 6, difficulty: 3 }, ["espionage", "british-setting", "london-setting", "ensemble-cast", "witty-prose", "dark-humor"]),
  ...ac(f("Brad Taylor"), { prose_craft: 3, prose_style: 3, warmth: 4, intensity: 6, pace: 8, moral_complexity: 4, fabulism: 1, emotional_register: 3, interiority: 3, tone: 3, difficulty: 1 }, ["espionage", "male-protagonist", "action", "military", "ticking-clock", "global-setting"]),

  // === REMAINING ROMANCE ===
  ...ac(f("Linda Howard"), { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["romantic-suspense", "female-protagonist", "american-setting", "HEA", "steamy"]),
  ...ac(f("Sarina Bowen"), { prose_craft: 4, prose_style: 2, warmth: 7, intensity: 3, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 6, interiority: 4, tone: 7, difficulty: 1 }, ["contemporary-romance", "rom-com", "dual-pov", "HEA", "steamy", "sports-romance"]),
  ...ac(f("Jamie McGuire"), { prose_craft: 3, prose_style: 2, warmth: 5, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 5, tone: 4, difficulty: 1 }, ["romance", "female-protagonist", "college-setting", "steamy", "HEA"]),
  ...ac(f("K. Bromberg"), { prose_craft: 3, prose_style: 2, warmth: 5, intensity: 5, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["contemporary-romance", "female-protagonist", "steamy", "HEA", "sports-romance"]),

  // === REMAINING YA ===
  ...ac(f("Julie Kagawa"), { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 5, pace: 7, moral_complexity: 5, fabulism: 8, emotional_register: 5, interiority: 5, tone: 4, difficulty: 2 }, ["YA-fantasy", "female-protagonist", "romance-subplot", "action", "ensemble-cast"]),
  ...ac(f("Ransom Riggs"), { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 5, pace: 6, moral_complexity: 5, fabulism: 7, emotional_register: 4, interiority: 5, tone: 4, difficulty: 2 }, ["YA-fantasy", "male-protagonist", "time-travel", "photography", "ensemble-cast", "gothic-atmosphere"]),

  // === REMAINING MYSTERY ===
  ...ac(f("Sherry Thomas"), { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 2 }, ["historical-mystery", "female-protagonist", "victorian-setting", "series-detective", "witty-prose"]),
  ...ac(f("Lorna Barrett"), { prose_craft: 3, prose_style: 2, warmth: 6, intensity: 2, pace: 6, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 3, tone: 6, difficulty: 1 }, ["cozy-mystery", "female-protagonist", "amateur-sleuth", "bookshop-setting", "small-town"]),

  // === REMAINING MISC ===
  ...ac(f("Irene Hannon"), { prose_craft: 3, prose_style: 2, warmth: 7, intensity: 4, pace: 5, moral_complexity: 3, fabulism: 1, emotional_register: 5, interiority: 4, tone: 4, difficulty: 1 }, ["romantic-suspense", "female-protagonist", "religious", "faith", "HEA"]),
  ...ac(f("Louis L'Amour"), { prose_craft: 4, prose_style: 3, warmth: 5, intensity: 5, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 4, interiority: 3, tone: 4, difficulty: 1 }, ["western", "male-protagonist", "adventure", "american-setting", "action"]),
  ...ac(f("Karen White"), { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 3, pace: 5, moral_complexity: 4, fabulism: 2, emotional_register: 5, interiority: 4, tone: 4, difficulty: 2 }, ["fiction", "female-protagonist", "southern-setting", "family-saga", "domestic", "ghosts"]),
  ...ac(f("Denise Williams"), { prose_craft: 4, prose_style: 3, warmth: 7, intensity: 2, pace: 7, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 5, tone: 7, difficulty: 1 }, ["contemporary-romance", "rom-com", "female-protagonist", "HEA", "Black-protagonist"]),
  ...ac(f("Alyssa Cole"), { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 3, pace: 6, moral_complexity: 5, fabulism: 1, emotional_register: 6, interiority: 5, tone: 6, difficulty: 2 }, ["historical-romance", "female-protagonist", "Black-protagonist", "HEA", "civil-war"]),
  ...ac(f("Cat Sebastian"), { prose_craft: 6, prose_style: 4, warmth: 7, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 6, interiority: 6, tone: 6, difficulty: 2 }, ["historical-romance", "queer-protagonist", "male-protagonist", "regency-setting", "HEA"]),
  ...ac(f("Ruby Dixon"), { prose_craft: 3, prose_style: 2, warmth: 7, intensity: 4, pace: 7, moral_complexity: 3, fabulism: 8, emotional_register: 6, interiority: 4, tone: 6, difficulty: 1 }, ["paranormal-romance", "aliens", "female-protagonist", "steamy", "HEA", "survival"]),
  ...ac(f("Johanna Lindsey"), { prose_craft: 4, prose_style: 3, warmth: 6, intensity: 4, pace: 6, moral_complexity: 3, fabulism: 1, emotional_register: 6, interiority: 4, tone: 5, difficulty: 1 }, ["historical-romance", "female-protagonist", "regency-setting", "HEA", "steamy"]),
  ...ac(f("Helen Hoang"), { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 2, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 6, tone: 6, difficulty: 1 }, ["contemporary-romance", "female-protagonist", "neurodivergent", "HEA", "Asian-protagonist"]),
  ...ac(f("Talia Hibbert"), { prose_craft: 5, prose_style: 3, warmth: 8, intensity: 2, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 5, tone: 7, difficulty: 1 }, ["contemporary-romance", "rom-com", "female-protagonist", "Black-protagonist", "neurodivergent", "HEA"]),
  ...ac(f("Elena Armas"), { prose_craft: 4, prose_style: 2, warmth: 7, intensity: 2, pace: 7, moral_complexity: 3, fabulism: 1, emotional_register: 6, interiority: 4, tone: 7, difficulty: 1 }, ["contemporary-romance", "rom-com", "female-protagonist", "fake-dating", "HEA"]),
  ...ac(f("S.C. Stephens"), { prose_craft: 3, prose_style: 2, warmth: 5, intensity: 5, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 5, tone: 4, difficulty: 1 }, ["romance", "female-protagonist", "musician-protagonist", "love-triangle", "steamy"]),
  ...ac(f("Meryl Wilsner"), { prose_craft: 5, prose_style: 3, warmth: 7, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 6, interiority: 5, tone: 7, difficulty: 1 }, ["contemporary-romance", "queer-protagonist", "female-protagonist", "rom-com", "HEA"]),

  // Additional known authors
  ...ac(f("Anne Perry"), { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 }, ["historical-mystery", "victorian-setting", "london-setting", "series-detective", "social-realism"]),
  ...ac(f("Minette Walters"), { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 6, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 2, difficulty: 3 }, ["psychological-thriller", "british-setting", "female-protagonist", "domestic", "obsession"]),
  ...ac(f("Martha Grimes"), { prose_craft: 6, prose_style: 4, warmth: 5, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 4, interiority: 5, tone: 5, difficulty: 3 }, ["mystery", "male-protagonist", "british-setting", "series-detective", "witty-prose", "pub-setting"]),
  ...ac(f("Sujata Massey"), { prose_craft: 5, prose_style: 4, warmth: 5, intensity: 4, pace: 5, moral_complexity: 6, fabulism: 1, emotional_register: 4, interiority: 5, tone: 4, difficulty: 3 }, ["historical-mystery", "female-protagonist", "indian-setting", "legal-thriller", "dual-timeline"]),
  ...ac(f("Vaseem Khan"), { prose_craft: 5, prose_style: 4, warmth: 6, intensity: 3, pace: 5, moral_complexity: 5, fabulism: 1, emotional_register: 5, interiority: 4, tone: 6, difficulty: 2 }, ["mystery", "male-protagonist", "indian-setting", "series-detective", "elephant", "witty-prose"]),
  ...ac(f("Malcolm Mackay"), { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 7, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 2, interiority: 5, tone: 3, difficulty: 3 }, ["noir", "male-protagonist", "scottish-setting", "glasgow-setting", "organized-crime", "violence"]),
  ...ac(f("George Pelecanos"), { prose_craft: 7, prose_style: 4, warmth: 5, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 3 }, ["noir", "male-protagonist", "washington-dc-setting", "race", "working-class"]),
  ...ac(f("Seicho Matsumoto"), { prose_craft: 6, prose_style: 4, warmth: 3, intensity: 4, pace: 5, moral_complexity: 7, fabulism: 1, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, ["mystery", "translated-from", "japanese-setting", "social-realism", "male-protagonist", "police-procedural"]),
  ...ac(f("Johan Theorin"), { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 5, pace: 4, moral_complexity: 6, fabulism: 2, emotional_register: 3, interiority: 6, tone: 3, difficulty: 3 }, ["mystery", "translated-from", "swedish-setting", "island-setting", "atmospheric", "rural"]),
  ...ac(f("Dervla McTiernan"), { prose_craft: 5, prose_style: 4, warmth: 4, intensity: 5, pace: 6, moral_complexity: 6, fabulism: 1, emotional_register: 3, interiority: 5, tone: 3, difficulty: 2 }, ["police-procedural", "male-protagonist", "irish-setting", "series-detective", "cold-case"]),
  ...ac(f("Rhys Bowen"), { prose_craft: 5, prose_style: 3, warmth: 6, intensity: 3, pace: 6, moral_complexity: 4, fabulism: 1, emotional_register: 5, interiority: 4, tone: 6, difficulty: 1 }, ["cozy-mystery", "female-protagonist", "historical-mystery", "british-setting", "series-detective"]),
  ...ac(f("Naomi Alderman"), { prose_craft: 6, prose_style: 4, warmth: 4, intensity: 6, pace: 6, moral_complexity: 7, fabulism: 5, emotional_register: 4, interiority: 5, tone: 3, difficulty: 3 }, ["soft-sf", "multi-pov", "feminist", "near-future", "power", "dystopian"]),
};

const merged = { ...existing, ...batch };
fs.writeFileSync(SIDECAR, JSON.stringify(merged, null, 2));

const before = Object.keys(existing).length;
const after = Object.keys(merged).length;
console.log("Before:", before, "| Added:", Object.keys(batch).length, "| After:", after);

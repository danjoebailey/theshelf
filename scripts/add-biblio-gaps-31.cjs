const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "A Darker Shade of Magic", author: "V. E. Schwab", pageCount: 400, genre: "Fantasy", publicationDate: "2015-02-24", description: "Kell, one of the last Antari, travels between parallel Londons and stumbles onto a stone from a dead world.", series: { name: "Shades of Magic", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "A Gathering of Shadows", author: "V. E. Schwab", pageCount: 512, genre: "Fantasy", publicationDate: "2016-02-23", description: "The Element Games bring rival magicians to Red London while a dangerous power stirs.", series: { name: "Shades of Magic", order: 2, total: 3 }, tier: "S", topRank: null },
  { title: "A Conjuring of Light", author: "V. E. Schwab", pageCount: 624, genre: "Fantasy", publicationDate: "2017-02-21", description: "The Shades of Magic trilogy closes as Osaron threatens to consume the four Londons.", series: { name: "Shades of Magic", order: 3, total: 3 }, tier: "S", topRank: null },
  { title: "Vicious", author: "V. E. Schwab", pageCount: 368, genre: "Fantasy", publicationDate: "2013-09-24", description: "Two college friends discover that near-death experiences can produce superpowers — and make the best enemies.", series: { name: "Villains", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Vengeful", author: "V. E. Schwab", pageCount: 480, genre: "Fantasy", publicationDate: "2018-09-25", description: "Victor and Eli's war continues as a new EO rises in their absence.", series: { name: "Villains", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Invisible Life of Addie LaRue", author: "V. E. Schwab", pageCount: 448, genre: "Fantasy", publicationDate: "2020-10-06", description: "A woman sells her soul to live forever but is cursed to be forgotten by everyone she meets — until one man remembers.", series: null, tier: "S", topRank: null },
  { title: "The Fragile Threads of Power", author: "V. E. Schwab", pageCount: 656, genre: "Fantasy", publicationDate: "2023-09-26", description: "Seven years after the Shades of Magic trilogy, new Antari and old enemies threaten the fragile peace between Londons.", series: { name: "Threads of Power", order: 1, total: 3 }, tier: "A", topRank: null },

  { title: "Downbelow Station", author: "C. J. Cherryh", pageCount: 528, genre: "Sci-Fi", publicationDate: "1981-01-01", description: "A space station caught between Earth's Company and a rebel merchant fleet in a war that will redraw human space.", series: { name: "Alliance-Union", order: 1, total: 28 }, tier: "S", topRank: null },
  { title: "Cyteen", author: "C. J. Cherryh", pageCount: 680, genre: "Sci-Fi", publicationDate: "1988-01-01", description: "On the frontier world Cyteen, a murdered scientist is genetically replicated — and her successor inherits her enemies.", series: null, tier: "S", topRank: null },
  { title: "Regenesis", author: "C. J. Cherryh", pageCount: 672, genre: "Sci-Fi", publicationDate: "2009-01-01", description: "The direct sequel to Cyteen, continuing the dangerous politics around Ariane Emory's second life.", series: null, tier: "A", topRank: null },
  { title: "The Pride of Chanur", author: "C. J. Cherryh", pageCount: 224, genre: "Sci-Fi", publicationDate: "1982-01-01", description: "A lion-like hani merchant captain takes aboard a strange creature called a human and ignites an interstellar crisis.", series: { name: "Chanur", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Foreigner", author: "C. J. Cherryh", pageCount: 416, genre: "Sci-Fi", publicationDate: "1994-04-01", description: "The lone human interpreter to the atevi must navigate an alien culture where emotion is not what it seems.", series: { name: "Foreigner", order: 1, total: 22 }, tier: "S", topRank: null },
  { title: "Invader", author: "C. J. Cherryh", pageCount: 432, genre: "Sci-Fi", publicationDate: "1995-04-01", description: "Bren Cameron deals with the arrival of a second human starship that reopens old wounds with the atevi.", series: { name: "Foreigner", order: 2, total: 22 }, tier: "A", topRank: null },
  { title: "Inheritor", author: "C. J. Cherryh", pageCount: 432, genre: "Sci-Fi", publicationDate: "1996-05-01", description: "Bren works to secure a peaceful path between Mospheira, the atevi, and the returned ship.", series: { name: "Foreigner", order: 3, total: 22 }, tier: "A", topRank: null },

  { title: "Stations of the Tide", author: "Michael Swanwick", pageCount: 252, genre: "Sci-Fi", publicationDate: "1991-01-01", description: "A bureaucrat hunts a charismatic magician across a planet about to be drowned by its own tides.", series: null, tier: "S", topRank: null },
  { title: "Bones of the Earth", author: "Michael Swanwick", pageCount: 335, genre: "Sci-Fi", publicationDate: "2002-01-01", description: "Time-traveling paleontologists study dinosaurs in the field — until something goes terribly wrong.", series: null, tier: "A", topRank: null },
  { title: "Dancing with Bears", author: "Michael Swanwick", pageCount: 304, genre: "Fantasy", publicationDate: "2011-01-01", description: "Post-utopian conmen Darger and Surplus journey to a collapsed Russia on a diplomatic mission gone wrong.", series: { name: "Darger and Surplus", order: 1, total: 2 }, tier: "A", topRank: null },

  { title: "Towing Jehovah", author: "James Morrow", pageCount: 336, genre: "Fantasy", publicationDate: "1994-01-01", description: "God is dead and His two-mile-long corpse floats in the Atlantic; a disgraced supertanker captain is hired to tow it.", series: { name: "Godhead Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Blameless in Abaddon", author: "James Morrow", pageCount: 416, genre: "Fantasy", publicationDate: "1996-01-01", description: "A small-town judge sues God for crimes against humanity at the World Court.", series: { name: "Godhead Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Eternal Footman", author: "James Morrow", pageCount: 336, genre: "Fantasy", publicationDate: "1999-01-01", description: "God's disembodied skull hangs over Earth, triggering a plague of despair.", series: { name: "Godhead Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Vampires of El Norte", author: "Isabel Cañas", pageCount: 368, genre: "Horror", publicationDate: "2023-08-15", description: "In 1846 Texas, childhood friends reunite to hunt the bloodsucking creatures stalking vaqueros.", series: null, tier: "A", topRank: null },

  { title: "Everfair", author: "Nisi Shawl", pageCount: 400, genre: "Sci-Fi", publicationDate: "2016-09-06", description: "An alternate history where Congo escapes Leopold II through steampunk technology and a utopian refuge.", series: { name: "Everfair", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Kinning", author: "Nisi Shawl", pageCount: 528, genre: "Sci-Fi", publicationDate: "2024-01-09", description: "The sequel to Everfair, expanding the alternate-history steampunk Africa into a global saga.", series: { name: "Everfair", order: 2, total: 2 }, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  { title: "Them Bones", author: "Howard Waldrop", pageCount: 216, genre: "Sci-Fi", publicationDate: "1984-01-01", description: "A time-travel mission to prevent nuclear war lands in an alternate pre-Columbian Mississippi.", series: null, tier: "A", topRank: null },
  { title: "Night of the Cooters", author: "Howard Waldrop", pageCount: 224, genre: "Sci-Fi", publicationDate: "1990-01-01", description: "Collection featuring the title story: what if Martians had landed in rural Texas during the War of the Worlds?", series: null, tier: "A", topRank: null },
  { title: "Dream Factories and Radio Pictures", author: "Howard Waldrop", pageCount: 224, genre: "Sci-Fi", publicationDate: "2001-01-01", description: "Collected stories blending pop culture history and alternate reality with Waldrop's signature wit.", series: null, tier: "A", topRank: null },
  { title: "A Dozen Tough Jobs", author: "Howard Waldrop", pageCount: 136, genre: "Fantasy", publicationDate: "1989-01-01", description: "The twelve labors of Hercules retold in Depression-era Mississippi.", series: null, tier: "B", topRank: null },

  { title: "Darkness Weaves", author: "Karl Edward Wagner", pageCount: 256, genre: "Fantasy", publicationDate: "1970-01-01", description: "Kane, the immortal cursed wanderer, aids a disfigured noblewoman in a campaign of vengeance.", series: { name: "Kane", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "Bloodstone", author: "Karl Edward Wagner", pageCount: 240, genre: "Fantasy", publicationDate: "1975-01-01", description: "Kane uncovers an ancient alien relic that promises ultimate power — and cosmic catastrophe.", series: { name: "Kane", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Dark Crusade", author: "Karl Edward Wagner", pageCount: 224, genre: "Fantasy", publicationDate: "1976-01-01", description: "Kane manipulates a religious uprising to serve his own purposes in a grim sword-and-sorcery crusade.", series: { name: "Kane", order: 3, total: 6 }, tier: "A", topRank: null },

  { title: "Black Sun Rising", author: "C. S. Friedman", pageCount: 496, genre: "Fantasy", publicationDate: "1991-01-01", description: "On a world where thought shapes reality, a priest and a nine-hundred-year-old sorcerer form an uneasy alliance.", series: { name: "Coldfire Trilogy", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "When True Night Falls", author: "C. S. Friedman", pageCount: 576, genre: "Fantasy", publicationDate: "1993-01-01", description: "Damien and Gerald cross the sea in search of a lost branch of humanity — and the rising One.", series: { name: "Coldfire Trilogy", order: 2, total: 3 }, tier: "S", topRank: null },
  { title: "Crown of Shadows", author: "C. S. Friedman", pageCount: 496, genre: "Fantasy", publicationDate: "1995-01-01", description: "The final battle for the soul of Erna, as light and dark seek to reshape the fae.", series: { name: "Coldfire Trilogy", order: 3, total: 3 }, tier: "S", topRank: null },
  { title: "This Alien Shore", author: "C. S. Friedman", pageCount: 576, genre: "Sci-Fi", publicationDate: "1998-01-01", description: "In a fractured human diaspora, a fugitive girl's identity becomes the key to interstellar war.", series: null, tier: "A", topRank: null },

  { title: "Leech", author: "Hiron Ennes", pageCount: 336, genre: "Horror", publicationDate: "2022-09-27", description: "A hive-mind doctor investigates the death of its own host body at an isolated frozen baronial estate.", series: null, tier: "S", topRank: null },

  { title: "Ammonite", author: "Nicola Griffith", pageCount: 416, genre: "Sci-Fi", publicationDate: "1993-01-01", description: "An anthropologist studies a lost colony where a virus killed all the men — and the women have found another way.", series: null, tier: "A", topRank: null },
  { title: "Slow River", author: "Nicola Griffith", pageCount: 352, genre: "Sci-Fi", publicationDate: "1995-01-01", description: "A kidnapped heiress escapes her captors and rebuilds her identity working in a waste-water plant.", series: null, tier: "A", topRank: null },
  { title: "Hild", author: "Nicola Griffith", pageCount: 560, genre: "Historical Fiction", publicationDate: "2013-11-12", description: "The future Saint Hilda of Whitby grows up as a seer in seventh-century Britain.", series: { name: "Hild", order: 1, total: 2 }, tier: "S", topRank: null },
  { title: "Menewood", author: "Nicola Griffith", pageCount: 720, genre: "Historical Fiction", publicationDate: "2023-10-03", description: "Hild rebuilds her power and community in the wake of devastating loss.", series: { name: "Hild", order: 2, total: 2 }, tier: "S", topRank: null },

  { title: "Mindplayers", author: "Pat Cadigan", pageCount: 288, genre: "Sci-Fi", publicationDate: "1987-01-01", description: "A cyberpunk thriller where the mindplayers dive into others' psyches as their profession.", series: null, tier: "A", topRank: null },
  { title: "Synners", author: "Pat Cadigan", pageCount: 435, genre: "Sci-Fi", publicationDate: "1991-01-01", description: "Video rockers, hackers, and the first uploaded human consciousness share a fractured near-future LA.", series: null, tier: "S", topRank: null },
  { title: "Fools", author: "Pat Cadigan", pageCount: 295, genre: "Sci-Fi", publicationDate: "1992-01-01", description: "A memory junkie with multiple personas cannot tell which of her selves is real.", series: null, tier: "A", topRank: null },

  { title: "Trouble and Her Friends", author: "Melissa Scott", pageCount: 384, genre: "Sci-Fi", publicationDate: "1994-01-01", description: "A lesbian hacker comes out of retirement to hunt down an imposter using her old handle.", series: null, tier: "A", topRank: null },
  { title: "Five-Twelfths of Heaven", author: "Melissa Scott", pageCount: 320, genre: "Sci-Fi", publicationDate: "1985-01-01", description: "Star-traveling alchemy, music, and ritual magic propel ships across an interstellar empire.", series: { name: "Roads of Heaven", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Dreamships", author: "Melissa Scott", pageCount: 368, genre: "Sci-Fi", publicationDate: "1992-01-01", description: "A reluctant pilot is hired to find a missing AI designer who may no longer be entirely human.", series: null, tier: "B", topRank: null },

  { title: "The Light Ages", author: "Ian R. MacLeod", pageCount: 448, genre: "Fantasy", publicationDate: "2003-01-01", description: "In an alternate industrial England powered by aether, a miner's son grows up among the ruling guilds.", series: null, tier: "A", topRank: null },
  { title: "The House of Storms", author: "Ian R. MacLeod", pageCount: 448, genre: "Fantasy", publicationDate: "2005-01-01", description: "The aether-powered Britain sequel, following a new generation through civil war.", series: null, tier: "A", topRank: null },
  { title: "Song of Time", author: "Ian R. MacLeod", pageCount: 368, genre: "Sci-Fi", publicationDate: "2008-01-01", description: "An aging violinist's memories span a century of climate collapse and reinvented humanity.", series: null, tier: "A", topRank: null },

  { title: "China Mountain Zhang", author: "Maureen F. McHugh", pageCount: 320, genre: "Sci-Fi", publicationDate: "1992-01-01", description: "In a twenty-first century where China dominates, a half-Hispanic half-Chinese gay man navigates ordinary futures.", series: null, tier: "S", topRank: null },
  { title: "Mission Child", author: "Maureen F. McHugh", pageCount: 416, genre: "Sci-Fi", publicationDate: "1998-01-01", description: "A woman on a colony world fleeing violence finds identity where she never expected.", series: null, tier: "A", topRank: null },
  { title: "Half the Day Is Night", author: "Maureen F. McHugh", pageCount: 320, genre: "Sci-Fi", publicationDate: "1994-01-01", description: "An ex-soldier takes a bodyguard job in an undersea Caribbean city and stumbles into political terror.", series: null, tier: "A", topRank: null },

  { title: "Air", author: "Geoff Ryman", pageCount: 391, genre: "Sci-Fi", publicationDate: "2004-01-01", description: "A woman in a remote Central Asian village is swept into the first global rollout of a new mental-internet technology.", series: null, tier: "S", topRank: null },
  { title: "The Child Garden", author: "Geoff Ryman", pageCount: 389, genre: "Sci-Fi", publicationDate: "1989-01-01", description: "In a future where viruses teach children everything they need to know, an immune woman falls in love with a polar bear geneticist.", series: null, tier: "A", topRank: null },
  { title: "Was", author: "Geoff Ryman", pageCount: 384, genre: "Fantasy", publicationDate: "1992-01-01", description: "Three lives converge around the real and imagined Kansas of The Wizard of Oz.", series: null, tier: "A", topRank: null },

  { title: "Celestis", author: "Paul Park", pageCount: 272, genre: "Sci-Fi", publicationDate: "1995-01-01", description: "A colonial romance on an alien world where the natives have been surgically altered to seem more human.", series: null, tier: "A", topRank: null },
  { title: "A Princess of Roumania", author: "Paul Park", pageCount: 368, genre: "Fantasy", publicationDate: "2005-01-01", description: "A teenager in Massachusetts discovers she is a Roumanian princess from a parallel world where Greater Roumania rules Europe.", series: { name: "A Princess of Roumania", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Soldiers of Paradise", author: "Paul Park", pageCount: 352, genre: "Sci-Fi", publicationDate: "1987-01-01", description: "On a planet where seasons last generations, a theocracy's rule ends as a new age begins.", series: { name: "Starbridge Chronicles", order: 1, total: 3 }, tier: "A", topRank: null },

  { title: "The Red: First Light", author: "Linda Nagata", pageCount: 448, genre: "Sci-Fi", publicationDate: "2013-06-01", description: "A US Army lieutenant in a cybernetic combat unit starts getting hunches that save his squad — and they may be real.", series: { name: "The Red", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Vast", author: "Linda Nagata", pageCount: 394, genre: "Sci-Fi", publicationDate: "1998-01-01", description: "A crew on a hijacked alien starship hurtles toward the heart of a galactic mystery.", series: { name: "Nanotech Succession", order: 4, total: 4 }, tier: "A", topRank: null },
  { title: "The Bohr Maker", author: "Linda Nagata", pageCount: 336, genre: "Sci-Fi", publicationDate: "1995-01-01", description: "A stolen forbidden nanodevice lets a slum girl rewrite her own body — and threatens the whole solar system.", series: { name: "Nanotech Succession", order: 1, total: 4 }, tier: "A", topRank: null },
];

function keyOf(b) { return (b.title + "|" + b.author).toLowerCase(); }

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || []);
const existingKeys = new Set(books.map(keyOf));
const freshPrimary = PRIMARY_ADDITIONS.filter(b => !existingKeys.has(keyOf(b)));
const nextBooks = books.concat(freshPrimary);
fs.writeFileSync(CATALOG, JSON.stringify(Array.isArray(data) ? nextBooks : { ...data, books: nextBooks }));
console.log(`PRIMARY: added ${freshPrimary.length} books, ${books.length} → ${nextBooks.length}`);

let recData;
if (fs.existsSync(REC_LIBRARY)) {
  recData = JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8"));
} else {
  recData = [];
}
const recBooks = Array.isArray(recData) ? recData : (recData.books || []);
const recKeys = new Set(recBooks.map(keyOf));
const freshRec = REC_LIBRARY_ADDITIONS.filter(b => !recKeys.has(keyOf(b)));
const nextRec = recBooks.concat(freshRec);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(Array.isArray(recData) || !recData.books ? nextRec : { ...recData, books: nextRec }));
console.log(`REC LIBRARY: added ${freshRec.length} books, ${recBooks.length} → ${nextRec.length}`);

const pSize = (fs.statSync(CATALOG).size / 1024 / 1024).toFixed(2);
const rSize = (fs.statSync(REC_LIBRARY).size / 1024).toFixed(1);
console.log(`\nbook-data.json: ${pSize} MB`);
console.log(`rec-library.json: ${rSize} KB`);

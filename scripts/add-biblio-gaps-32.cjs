const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ---- Dedupe ops ----

// Delete all books with any of these exact (author, title) pairs
const DELETIONS = [
  // V. E. Schwab (7 dupes of V.E. Schwab)
  { author: "V. E. Schwab", title: "A Darker Shade of Magic" },
  { author: "V. E. Schwab", title: "A Gathering of Shadows" },
  { author: "V. E. Schwab", title: "A Conjuring of Light" },
  { author: "V. E. Schwab", title: "Vicious" },
  { author: "V. E. Schwab", title: "Vengeful" },
  { author: "V. E. Schwab", title: "The Invisible Life of Addie LaRue" },
  { author: "V. E. Schwab", title: "The Fragile Threads of Power" },
  // C. J. Cherryh overlap (4 dupes)
  { author: "C. J. Cherryh", title: "Downbelow Station" },
  { author: "C. J. Cherryh", title: "Cyteen" },
  { author: "C. J. Cherryh", title: "The Pride of Chanur" },
  { author: "C. J. Cherryh", title: "Foreigner" },
  // Kobo Abe (3 dupes of Kōbō Abe)
  { author: "Kobo Abe", title: "The Woman in the Dunes" },
  { author: "Kobo Abe", title: "The Box Man" },
  { author: "Kobo Abe", title: "The Face of Another" },
  // Liu Cixin (4 dupes, keep Cixin Liu variant)
  { author: "Liu Cixin", title: "The Three-Body Problem" },
  { author: "Liu Cixin", title: "The Dark Forest" },
  { author: "Liu Cixin", title: "Death's End" },
  { author: "Liu Cixin", title: "Ball Lightning" },
];

// Rename author on these books (keeps book, updates author field)
const RENAMES = [
  { from: "C. J. Cherryh", to: "C.J. Cherryh", title: "Regenesis" },
  { from: "C. J. Cherryh", to: "C.J. Cherryh", title: "Invader" },
  { from: "C. J. Cherryh", to: "C.J. Cherryh", title: "Inheritor" },
  { from: "Ayòbámi Adébáyò", to: "Ayọ̀bámi Adébáyọ̀", title: "A Spell of Good Things" },
];

// ---- Primary additions ----

const PRIMARY_ADDITIONS = [
  { title: "Dune: House Atreides", author: "Brian Herbert", pageCount: 685, genre: "Sci-Fi", publicationDate: "1999-10-05", description: "Young Leto Atreides's rise on Caladan, set decades before the events of Dune.", series: { name: "Prelude to Dune", order: 1, total: 3 }, tier: "B", topRank: null },
  { title: "Dune: House Harkonnen", author: "Brian Herbert", pageCount: 684, genre: "Sci-Fi", publicationDate: "2000-10-03", description: "The Baron Harkonnen and House Atreides rivalries deepen as the pieces for Dune are set.", series: { name: "Prelude to Dune", order: 2, total: 3 }, tier: "B", topRank: null },
  { title: "Dune: House Corrino", author: "Brian Herbert", pageCount: 624, genre: "Sci-Fi", publicationDate: "2001-10-02", description: "The final volume of the Prelude to Dune trilogy sets up the events of Frank Herbert's original novel.", series: { name: "Prelude to Dune", order: 3, total: 3 }, tier: "B", topRank: null },

  { title: "Tau Zero", author: "Poul Anderson", pageCount: 208, genre: "Sci-Fi", publicationDate: "1970-01-01", description: "A starship's deceleration fails as it approaches lightspeed, carrying its crew past the end of the universe.", series: null, tier: "S", topRank: null },
  { title: "Brain Wave", author: "Poul Anderson", pageCount: 164, genre: "Sci-Fi", publicationDate: "1954-01-01", description: "Earth leaves an inhibitory field it has been passing through for millions of years — and every mind on the planet leaps in intelligence.", series: null, tier: "A", topRank: null },
  { title: "The High Crusade", author: "Poul Anderson", pageCount: 192, genre: "Sci-Fi", publicationDate: "1960-01-01", description: "A 14th-century English village captures an alien scout ship and rides it into a galactic empire.", series: null, tier: "A", topRank: null },
  { title: "Three Hearts and Three Lions", author: "Poul Anderson", pageCount: 224, genre: "Fantasy", publicationDate: "1961-01-01", description: "A WWII engineer is thrown into a parallel medieval world where he is the prophesied hero against the forces of Chaos.", series: null, tier: "A", topRank: null },

  { title: "Worlds", author: "Joe Haldeman", pageCount: 288, genre: "Sci-Fi", publicationDate: "1981-01-01", description: "A woman from a space habitat visits a disintegrating Earth on the brink of nuclear war.", series: { name: "Worlds", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Worlds Apart", author: "Joe Haldeman", pageCount: 352, genre: "Sci-Fi", publicationDate: "1983-01-01", description: "Survivors of the cataclysm rebuild in the Worlds while Earth descends into madness.", series: { name: "Worlds", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Worlds Enough and Time", author: "Joe Haldeman", pageCount: 304, genre: "Sci-Fi", publicationDate: "1992-01-01", description: "A generation ship sets out from the ruined solar system to found a colony on Epsilon Eridani.", series: { name: "Worlds", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Boy in Darkness", author: "Mervyn Peake", pageCount: 96, genre: "Fantasy", publicationDate: "1956-01-01", description: "A standalone novella featuring a young Titus Groan wandering beyond Gormenghast into a horror of transformed beasts.", series: null, tier: "A", topRank: null },
  { title: "Titus Awakes", author: "Mervyn Peake", pageCount: 272, genre: "Fantasy", publicationDate: "2011-06-23", description: "The long-unfinished fourth Gormenghast novel, completed from Peake's notes by his widow Maeve Gilmore.", series: { name: "Gormenghast", order: 4, total: 4 }, tier: "B", topRank: null },
];

// ---- Rec library additions ----

const REC_LIBRARY_ADDITIONS = [
  { title: "The Face in the Frost", author: "John Bellairs", pageCount: 176, genre: "Fantasy", publicationDate: "1969-01-01", description: "Two elderly wizards battle a nameless evil spreading through a half-imagined medieval world.", series: null, tier: "A", topRank: null },
  { title: "The House with a Clock in Its Walls", author: "John Bellairs", pageCount: 192, genre: "Fantasy", publicationDate: "1973-01-01", description: "An orphaned boy moves in with his warlock uncle in a house haunted by a doomsday clock.", series: { name: "Lewis Barnavelt", order: 1, total: 12 }, tier: "A", topRank: null },
  { title: "The Figure in the Shadows", author: "John Bellairs", pageCount: 160, genre: "Fantasy", publicationDate: "1975-01-01", description: "Lewis Barnavelt finds a cursed coin and unleashes a stalking shadow.", series: { name: "Lewis Barnavelt", order: 2, total: 12 }, tier: "B", topRank: null },

  { title: "The Dazzle of Day", author: "Molly Gloss", pageCount: 256, genre: "Sci-Fi", publicationDate: "1997-01-01", description: "A Quaker generation ship nears its destination after 175 years in transit.", series: null, tier: "A", topRank: null },
  { title: "Wild Life", author: "Molly Gloss", pageCount: 272, genre: "Fantasy", publicationDate: "2000-01-01", description: "A frontier widow searches the Pacific Northwest wilderness and stumbles upon a band of Sasquatches.", series: null, tier: "A", topRank: null },
  { title: "The Hearts of Horses", author: "Molly Gloss", pageCount: 304, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "A young woman earns her living breaking horses in WWI-era Oregon.", series: null, tier: "B", topRank: null },

  { title: "I Am Mordred", author: "Nancy Springer", pageCount: 184, genre: "Fantasy", publicationDate: "1998-01-01", description: "A first-person retelling of the Arthurian tragedy from the doomed son of Arthur.", series: null, tier: "A", topRank: null },
  { title: "Larque on the Wing", author: "Nancy Springer", pageCount: 280, genre: "Fantasy", publicationDate: "1994-01-01", description: "A middle-aged woman's inner ten-year-old self escapes and reshapes her life.", series: null, tier: "A", topRank: null },
  { title: "The Sea King's Daughter", author: "Nancy Springer", pageCount: 304, genre: "Fantasy", publicationDate: "2008-01-01", description: "An Atlantic Coast girl discovers her mother's side of the family is more than human.", series: null, tier: "B", topRank: null },

  { title: "Sorcerer's Son", author: "Phyllis Eisenstein", pageCount: 273, genre: "Fantasy", publicationDate: "1979-01-01", description: "A boy raised in a remote village discovers his true father is a demon-lord.", series: { name: "Book of Elementals", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Shadow of Earth", author: "Phyllis Eisenstein", pageCount: 224, genre: "Sci-Fi", publicationDate: "1979-01-01", description: "A woman is flung into an alternate history where the Spanish Armada won.", series: null, tier: "B", topRank: null },
  { title: "Born to Exile", author: "Phyllis Eisenstein", pageCount: 252, genre: "Fantasy", publicationDate: "1978-01-01", description: "Alaric the minstrel, gifted with teleportation, wanders a fantasy world searching for his origins.", series: null, tier: "A", topRank: null },

  { title: "Neverness", author: "David Zindell", pageCount: 552, genre: "Sci-Fi", publicationDate: "1988-01-01", description: "A pilot in a far-future galactic order navigates mathematical manifolds in search of the secret of the Ieldra.", series: null, tier: "A", topRank: null },
  { title: "The Broken God", author: "David Zindell", pageCount: 832, genre: "Sci-Fi", publicationDate: "1993-01-01", description: "The first volume of A Requiem for Homo Sapiens follows Danlo wi Soli Ringess to the city of Neverness.", series: { name: "A Requiem for Homo Sapiens", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Wild", author: "David Zindell", pageCount: 832, genre: "Sci-Fi", publicationDate: "1995-01-01", description: "The second volume of the Requiem, as Danlo enters the galactic Wild in search of his father.", series: { name: "A Requiem for Homo Sapiens", order: 2, total: 3 }, tier: "A", topRank: null },

  { title: "Galveston", author: "Sean Stewart", pageCount: 464, genre: "Fantasy", publicationDate: "2000-01-01", description: "In a post-Flood Texas where magic has returned, the sins of one family play out against the ruined coast.", series: null, tier: "A", topRank: null },
  { title: "Perfect Circle", author: "Sean Stewart", pageCount: 304, genre: "Fantasy", publicationDate: "2004-01-01", description: "A broke Houston divorcé who sees ghosts gets a job cleaning out a haunted uncle's house.", series: null, tier: "A", topRank: null },
  { title: "Mockingbird", author: "Sean Stewart", pageCount: 320, genre: "Fantasy", publicationDate: "1998-01-01", description: "A Houston woman's dead mother left her six magical spirits in her will.", series: null, tier: "A", topRank: null },

  { title: "The Drylands", author: "Mary Rosenblum", pageCount: 336, genre: "Sci-Fi", publicationDate: "1993-01-01", description: "A climate-changed American west where water engineers hold political power.", series: null, tier: "A", topRank: null },
  { title: "Chimera", author: "Mary Rosenblum", pageCount: 320, genre: "Sci-Fi", publicationDate: "1993-01-01", description: "A virtual-reality artist investigates the death of a rival in a simulated Jazz Age Paris.", series: null, tier: "B", topRank: null },
  { title: "Water Rites", author: "Mary Rosenblum", pageCount: 356, genre: "Sci-Fi", publicationDate: "2007-01-01", description: "Expanded edition of The Drylands set in a drought-ravaged near-future America.", series: null, tier: "B", topRank: null },

  { title: "The Divinity Student", author: "Michael Cisco", pageCount: 192, genre: "Fantasy", publicationDate: "1999-01-01", description: "A student in an occult seminary is struck dead, stuffed with pages from forbidden books, and reanimated to investigate a strange city.", series: null, tier: "A", topRank: null },
  { title: "The Tyrant", author: "Michael Cisco", pageCount: 320, genre: "Fantasy", publicationDate: "2003-01-01", description: "A dreamlike, baroque fantasy of a tyrant and the boy destined to become him.", series: null, tier: "A", topRank: null },
  { title: "The Traitor", author: "Michael Cisco", pageCount: 256, genre: "Fantasy", publicationDate: "2007-01-01", description: "A necromancer's apprentice is caught between two warring cities of the dead.", series: null, tier: "B", topRank: null },

  { title: "The Physiognomy", author: "Jeffrey Ford", pageCount: 256, genre: "Fantasy", publicationDate: "1997-01-01", description: "A physiognomist in a bizarre walled city is dispatched to investigate the theft of the white fruit of paradise.", series: { name: "Well-Built City", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "Memoranda", author: "Jeffrey Ford", pageCount: 272, genre: "Fantasy", publicationDate: "1999-01-01", description: "Cley enters the mind of a sleeping sorcerer to save the city from a sleeping sickness.", series: { name: "Well-Built City", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Beyond", author: "Jeffrey Ford", pageCount: 304, genre: "Fantasy", publicationDate: "2001-01-01", description: "Cley's exile takes him into the wilderness at the edge of the Well-Built City's world.", series: { name: "Well-Built City", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Year of Our War", author: "Steph Swainston", pageCount: 320, genre: "Fantasy", publicationDate: "2004-01-01", description: "An immortal drug-addict messenger flies between factions of the Circle in an endless war against giant insects.", series: { name: "Castle", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "No Present Like Time", author: "Steph Swainston", pageCount: 304, genre: "Fantasy", publicationDate: "2005-01-01", description: "Jant the messenger discovers a new continent beyond the Fourlands.", series: { name: "Castle", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "The Modern World", author: "Steph Swainston", pageCount: 288, genre: "Fantasy", publicationDate: "2007-01-01", description: "The Insect war escalates and Jant confronts old addictions and enemies.", series: { name: "Castle", order: 3, total: 4 }, tier: "A", topRank: null },

  { title: "Acacia: The War with the Mein", author: "David Anthony Durham", pageCount: 592, genre: "Fantasy", publicationDate: "2007-01-01", description: "The four children of a slain emperor must reclaim their empire from the barbarian Mein who overthrew it.", series: { name: "Acacia", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Other Lands", author: "David Anthony Durham", pageCount: 576, genre: "Fantasy", publicationDate: "2009-01-01", description: "The second volume of Acacia takes the reunited siblings across the sea into alien territory.", series: { name: "Acacia", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Sacred Band", author: "David Anthony Durham", pageCount: 624, genre: "Fantasy", publicationDate: "2011-01-01", description: "The Acacia trilogy reaches its conclusion as empires collide with ancient powers.", series: { name: "Acacia", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Celestial Matters", author: "Richard Garfinkle", pageCount: 348, genre: "Sci-Fi", publicationDate: "1996-01-01", description: "An alternate history where Aristotelian physics and Taoist alchemy are literally true, and Greece and China wage cosmic war.", series: null, tier: "A", topRank: null },
  { title: "All of an Instant", author: "Richard Garfinkle", pageCount: 304, genre: "Sci-Fi", publicationDate: "1999-01-01", description: "A conflict across time itself, where humans travel through a timeless Instant and rewrite history.", series: null, tier: "B", topRank: null },
];

function keyOf(b) { return (b.title + "|" + b.author).toLowerCase(); }

// ---- Apply primary ----
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
let books = Array.isArray(data) ? data : (data.books || []);
const startCount = books.length;

// Deletions
const delKeys = new Set(DELETIONS.map(d => (d.title + "|" + d.author).toLowerCase()));
const beforeDel = books.length;
books = books.filter(b => !delKeys.has(keyOf(b)));
const deleted = beforeDel - books.length;

// Renames
let renamed = 0;
RENAMES.forEach(r => {
  books.forEach(b => {
    if (b.author === r.from && b.title === r.title) {
      b.author = r.to;
      renamed++;
    }
  });
});

// Additions
const existingKeys = new Set(books.map(keyOf));
const freshPrimary = PRIMARY_ADDITIONS.filter(b => !existingKeys.has(keyOf(b)));
books = books.concat(freshPrimary);

fs.writeFileSync(CATALOG, JSON.stringify(Array.isArray(data) ? books : { ...data, books }));
console.log(`PRIMARY: deleted ${deleted}, renamed ${renamed}, added ${freshPrimary.length}, ${startCount} → ${books.length}`);

// ---- Apply rec library ----
let recData = fs.existsSync(REC_LIBRARY) ? JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8")) : [];
const recBooks = Array.isArray(recData) ? recData : (recData.books || []);
const recKeys = new Set(recBooks.map(keyOf));
const freshRec = REC_LIBRARY_ADDITIONS.filter(b => !recKeys.has(keyOf(b)));
const nextRec = recBooks.concat(freshRec);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(Array.isArray(recData) || !recData.books ? nextRec : { ...recData, books: nextRec }));
console.log(`REC LIBRARY: added ${freshRec.length}, ${recBooks.length} → ${nextRec.length}`);

const pSize = (fs.statSync(CATALOG).size / 1024 / 1024).toFixed(2);
const rSize = (fs.statSync(REC_LIBRARY).size / 1024).toFixed(1);
console.log(`\nbook-data.json: ${pSize} MB`);
console.log(`rec-library.json: ${rSize} KB`);

const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Ghost Stories of an Antiquary", author: "M.R. James", pageCount: 224, genre: "Horror", publicationDate: "1904-01-01", description: "James's first ghost story collection — the canonical Edwardian antiquarian ghost stories that launched the form.", series: null, tier: "S", topRank: null },
  { title: "More Ghost Stories of an Antiquary", author: "M.R. James", pageCount: 224, genre: "Horror", publicationDate: "1911-01-01", description: "James's second collection, further perfecting the scholarly-gentleman-meets-the-supernatural formula.", series: null, tier: "S", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Classic horror / Victorian weird
  { title: "Uncle Silas", author: "Sheridan Le Fanu", pageCount: 480, genre: "Horror", publicationDate: "1864-01-01", description: "A young heiress is sent to live with her Gothic uncle — Le Fanu's canonical Victorian sensation novel.", series: null, tier: "S", topRank: null },
  { title: "In a Glass Darkly", author: "Sheridan Le Fanu", pageCount: 368, genre: "Horror", publicationDate: "1872-01-01", description: "Five occult tales from the papers of the German doctor Martin Hesselius — including the vampire novella Carmilla.", series: null, tier: "S", topRank: null },
  { title: "Carmilla", author: "Sheridan Le Fanu", pageCount: 112, genre: "Horror", publicationDate: "1872-01-01", description: "A lonely young woman in an Austrian forest is visited by a beautiful mysterious girl — the vampire story that predates Dracula by twenty-five years.", series: null, tier: "A", topRank: null },

  { title: "The Monkey's Paw and Other Tales", author: "W.W. Jacobs", pageCount: 224, genre: "Horror", publicationDate: "1902-01-01", description: "The canonical three-wishes horror story plus Jacobs's other Edwardian dark tales.", series: null, tier: "A", topRank: null },

  { title: "The Body Snatchers", author: "Jack Finney", pageCount: 224, genre: "Sci-Fi", publicationDate: "1955-01-01", description: "Residents of a small California town are slowly being replaced by perfect pod-people duplicates — the foundational paranoid alien-invasion novel.", series: null, tier: "S", topRank: null },
  { title: "Time and Again", author: "Jack Finney", pageCount: 400, genre: "Sci-Fi", publicationDate: "1970-01-01", description: "A contemporary New York illustrator is recruited by a government project and sent back to the 1880s.", series: null, tier: "A", topRank: null },

  { title: "The Hunger and Other Stories", author: "Charles Beaumont", pageCount: 256, genre: "Horror", publicationDate: "1957-01-01", description: "Beaumont's canonical midcentury weird story collection — many stories later adapted for The Twilight Zone.", series: null, tier: "A", topRank: null },
  { title: "Perchance to Dream", author: "Charles Beaumont", pageCount: 304, genre: "Horror", publicationDate: "2015-01-01", description: "Selected stories of Charles Beaumont, restored in a Penguin Classics edition.", series: null, tier: "A", topRank: null },

  { title: "What Was It? and Other Stories", author: "Fitz-James O'Brien", pageCount: 256, genre: "Horror", publicationDate: "1859-01-01", description: "Collected weird tales from the Irish-American Civil War-era proto-horror writer — including The Diamond Lens.", series: null, tier: "A", topRank: null },

  // Contemporary horror
  { title: "Engines of Desire", author: "Livia Llewellyn", pageCount: 288, genre: "Horror", publicationDate: "2011-01-01", description: "Twelve dark erotic horror stories by one of contemporary weird fiction's most admired voices.", series: null, tier: "A", topRank: null },
  { title: "Furnace", author: "Livia Llewellyn", pageCount: 240, genre: "Horror", publicationDate: "2016-02-16", description: "Llewellyn's second story collection — more unsettling tales of female interiority and cosmic horror.", series: null, tier: "A", topRank: null },

  { title: "The Grip of It", author: "Jac Jemc", pageCount: 272, genre: "Horror", publicationDate: "2017-08-01", description: "A young couple moves to a small-town house that starts marking both of them with bruises.", series: null, tier: "A", topRank: null },
  { title: "Empty Theatre", author: "Jac Jemc", pageCount: 528, genre: "Historical Fiction", publicationDate: "2023-02-21", description: "Jemc's novel of Ludwig II of Bavaria and Empress Elisabeth of Austria — two royal lives unraveling in parallel.", series: null, tier: "A", topRank: null },

  { title: "All the Fabulous Beasts", author: "Priya Sharma", pageCount: 272, genre: "Horror", publicationDate: "2018-01-01", description: "Sharma's debut horror collection — seventeen stories of transformation, folklore, and body horror.", series: null, tier: "A", topRank: null },

  { title: "Tell Me I'm Worthless", author: "Alison Rumfitt", pageCount: 256, genre: "Horror", publicationDate: "2023-01-17", description: "Two friends return to a derelict house in Brighton where something terrible happened to them, in a haunted-house novel about fascism.", series: null, tier: "S", topRank: null },
  { title: "Brainwyrms", author: "Alison Rumfitt", pageCount: 272, genre: "Horror", publicationDate: "2023-10-31", description: "Two trans women in London fall into a kink-based relationship that becomes entangled with parasites and TERF violence.", series: null, tier: "A", topRank: null },

  // Folk horror
  { title: "The Loney", author: "Andrew Michael Hurley", pageCount: 304, genre: "Horror", publicationDate: "2014-10-29", description: "A mute English boy and his older brother are taken on an Easter pilgrimage to a desolate Lancashire coast.", series: null, tier: "S", topRank: null },
  { title: "Devil's Day", author: "Andrew Michael Hurley", pageCount: 304, genre: "Horror", publicationDate: "2017-10-19", description: "A Lancashire village's annual ritual binds the Devil each autumn — until the year it doesn't quite work.", series: null, tier: "A", topRank: null },
  { title: "Starve Acre", author: "Andrew Michael Hurley", pageCount: 256, genre: "Horror", publicationDate: "2019-10-31", description: "A grieving Yorkshire family excavates the dead tree at the edge of their property and finds something alive underneath.", series: null, tier: "A", topRank: null },

  { title: "The Gallows Pole", author: "Benjamin Myers", pageCount: 384, genre: "Historical Fiction", publicationDate: "2017-06-01", description: "An eighteenth-century Yorkshire gang of coiners runs a counterfeit economy out of the Calder Valley until the Crown hunts them down.", series: null, tier: "S", topRank: null },
  { title: "The Perfect Golden Circle", author: "Benjamin Myers", pageCount: 240, genre: "Fiction", publicationDate: "2022-05-05", description: "Two men carve increasingly elaborate crop circles into the English countryside in the summer of 1989.", series: null, tier: "A", topRank: null },
  { title: "The Offing", author: "Benjamin Myers", pageCount: 272, genre: "Historical Fiction", publicationDate: "2019-08-15", description: "A teenage boy in post-WWII Yorkshire walks to the coast and spends a summer with an eccentric older poet.", series: null, tier: "A", topRank: null },

  { title: "After the Fire, A Still Small Voice", author: "Evie Wyld", pageCount: 304, genre: "Fiction", publicationDate: "2009-06-04", description: "Two Australian generations reckon with the Vietnam and Korean wars and the silence between fathers and sons.", series: null, tier: "A", topRank: null },
  { title: "The Bass Rock", author: "Evie Wyld", pageCount: 368, genre: "Fiction", publicationDate: "2020-03-19", description: "Three women across centuries live near the same Scottish coast — all of them confronting male violence.", series: null, tier: "S", topRank: null },

  { title: "Elmet", author: "Fiona Mozley", pageCount: 256, genre: "Fiction", publicationDate: "2017-08-10", description: "A Yorkshire family lives off the grid in a handmade house in the woods — until the local landlord comes for them.", series: null, tier: "S", topRank: null },
  { title: "Hot Stew", author: "Fiona Mozley", pageCount: 336, genre: "Fiction", publicationDate: "2021-03-18", description: "A Soho landlord's attempt to evict a brothel becomes the knot through which Mozley tells a London novel.", series: null, tier: "A", topRank: null },

  { title: "The Demonologist", author: "Andrew Pyper", pageCount: 288, genre: "Horror", publicationDate: "2013-03-05", description: "A Columbia professor of Milton is summoned to Venice to witness a supernatural case.", series: null, tier: "A", topRank: null },
  { title: "Lost Girls", author: "Andrew Pyper", pageCount: 416, genre: "Mystery", publicationDate: "1999-01-01", description: "A Toronto lawyer defends a small-town teacher accused of killing two of his students.", series: null, tier: "A", topRank: null },
  { title: "The Damned", author: "Andrew Pyper", pageCount: 288, genre: "Horror", publicationDate: "2015-02-10", description: "A survivor of a near-death experience writes a bestseller about heaven and is then pursued by his dead twin sister.", series: null, tier: "A", topRank: null },

  // Japanese horror
  { title: "Ring", author: "Koji Suzuki", pageCount: 288, genre: "Horror", publicationDate: "1991-01-01", description: "A Tokyo journalist investigates a videotape that supposedly kills anyone who watches it within seven days.", series: { name: "Ring", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "Spiral", author: "Koji Suzuki", pageCount: 320, genre: "Horror", publicationDate: "1995-01-01", description: "A pathologist investigates the death of the man who was investigating the Ring curse.", series: { name: "Ring", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Loop", author: "Koji Suzuki", pageCount: 304, genre: "Horror", publicationDate: "1998-01-01", description: "The Ring trilogy's final volume reframes the entire curse as a computer simulation gone wrong.", series: { name: "Ring", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Zoo", author: "Otsuichi", pageCount: 320, genre: "Horror", publicationDate: "2003-01-01", description: "Eleven dark Japanese short stories — mysteries, ghost stories, and body horror.", series: null, tier: "A", topRank: null },
  { title: "Summer, Fireworks, and My Corpse", author: "Otsuichi", pageCount: 256, genre: "Horror", publicationDate: "1996-01-01", description: "Two Japanese novellas, including the title story in which a dead nine-year-old narrates her own concealment.", series: null, tier: "A", topRank: null },
];

function keyOf(b) { return (b.title + "|" + b.author).toLowerCase(); }

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || []);
const existingKeys = new Set(books.map(keyOf));
const freshPrimary = PRIMARY_ADDITIONS.filter(b => !existingKeys.has(keyOf(b)));
const nextBooks = books.concat(freshPrimary);
fs.writeFileSync(CATALOG, JSON.stringify(Array.isArray(data) ? nextBooks : { ...data, books: nextBooks }));
console.log(`PRIMARY: added ${freshPrimary.length} books, ${books.length} → ${nextBooks.length}`);

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

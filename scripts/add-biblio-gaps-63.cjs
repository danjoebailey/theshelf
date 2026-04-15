const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Chronicles: Volume One", author: "Bob Dylan", pageCount: 304, genre: "Non-Fiction", publicationDate: "2004-10-05", description: "Dylan's memoir of his early Greenwich Village years and his journey into American music — the 2016 Nobel laureate's prose masterpiece.", series: null, tier: "S", topRank: null },

  { title: "Year of the Monkey", author: "Patti Smith", pageCount: 208, genre: "Non-Fiction", publicationDate: "2019-09-24", description: "Smith's dream-haunted memoir of the year her friend Sandy Pearlman slipped into a coma.", series: null, tier: "A", topRank: null },
  { title: "Woolgathering", author: "Patti Smith", pageCount: 112, genre: "Non-Fiction", publicationDate: "1992-01-01", description: "Smith's earliest book-length prose — a lyrical childhood memoir.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Proto-Beat / second-wave prose
  { title: "Views of a Nearsighted Cannoneer", author: "Seymour Krim", pageCount: 288, genre: "Non-Fiction", publicationDate: "1961-01-01", description: "Krim's canonical essay-memoirs on breakdown, jazz, and being Jewish in 1950s New York — a lost Beat-era classic.", series: null, tier: "A", topRank: null },
  { title: "Shake It for the World, Smartass", author: "Seymour Krim", pageCount: 272, genre: "Non-Fiction", publicationDate: "1970-01-01", description: "More Krim essays from the Village Voice and beyond, on writing, failure, and the American underworld.", series: null, tier: "A", topRank: null },

  { title: "Who Walk in Darkness", author: "Chandler Brossard", pageCount: 208, genre: "Fiction", publicationDate: "1952-01-01", description: "Bohemian New York in the late 1940s, written before On the Road — often called the first Beat novel.", series: null, tier: "A", topRank: null },
  { title: "The Bold Saboteurs", author: "Chandler Brossard", pageCount: 320, genre: "Fiction", publicationDate: "1953-01-01", description: "Brossard's second novel — two Washington brothers growing up on the edges of bohemia.", series: null, tier: "A", topRank: null },

  { title: "Kafka Was the Rage", author: "Anatole Broyard", pageCount: 160, genre: "Non-Fiction", publicationDate: "1993-01-01", description: "Broyard's unfinished Greenwich Village memoir of the late 1940s literary and bohemian scene.", series: null, tier: "A", topRank: null },
  { title: "Intoxicated by My Illness", author: "Anatole Broyard", pageCount: 160, genre: "Non-Fiction", publicationDate: "1992-01-01", description: "Broyard's literary essays on his terminal cancer diagnosis.", series: null, tier: "A", topRank: null },

  { title: "Tales of Beatnik Glory", author: "Ed Sanders", pageCount: 720, genre: "Fiction", publicationDate: "1975-01-01", description: "Linked stories of the Lower East Side Beat-Fug scene Sanders lived through and helped create.", series: null, tier: "A", topRank: null },
  { title: "Fug You", author: "Ed Sanders", pageCount: 416, genre: "Non-Fiction", publicationDate: "2011-01-01", description: "Sanders's memoir of his 1960s East Village Peace Eye Bookstore, the Fugs, and the underground press.", series: null, tier: "A", topRank: null },

  { title: "Been Down So Long It Looks Like Up to Me", author: "Richard Fariña", pageCount: 352, genre: "Fiction", publicationDate: "1966-01-01", description: "A picaresque novel of an Irish-Cuban-American graduate student at a thinly fictionalized Cornell in 1958 — Fariña's only novel, published two days before his death.", series: null, tier: "S", topRank: null },

  // Black Arts / Beat-adjacent
  { title: "Mumbo Jumbo", author: "Ishmael Reed", pageCount: 256, genre: "Fiction", publicationDate: "1972-01-01", description: "A Harlem Renaissance-era private detective investigates a contagion called Jes Grew that is spreading jazz across America — Reed's canonical postmodern novel.", series: null, tier: "S", topRank: null },
  { title: "The Last Days of Louisiana Red", author: "Ishmael Reed", pageCount: 224, genre: "Fiction", publicationDate: "1974-01-01", description: "A Black Berkeley businessman is murdered and PapaLaBas the HooDoo detective investigates.", series: null, tier: "A", topRank: null },
  { title: "Flight to Canada", author: "Ishmael Reed", pageCount: 208, genre: "Fiction", publicationDate: "1976-01-01", description: "A fugitive slave escapes on a jumbo jet to Canada in Reed's anachronistic satire of the slave narrative.", series: null, tier: "A", topRank: null },

  { title: "The System of Dante's Hell", author: "Amiri Baraka", pageCount: 160, genre: "Fiction", publicationDate: "1965-01-01", description: "Baraka's autobiographical experimental novel of a young Black man's Newark childhood and Air Force years.", series: null, tier: "A", topRank: null },
  { title: "Tales of the Out and the Gone", author: "Amiri Baraka", pageCount: 240, genre: "Fiction", publicationDate: "2007-01-01", description: "Baraka's late short stories moving between realism and surreal political fable.", series: null, tier: "A", topRank: null },

  // Countercultural novelists
  { title: "Hard Rain Falling", author: "Don Carpenter", pageCount: 320, genre: "Fiction", publicationDate: "1966-01-01", description: "A Portland petty criminal drifts through pool halls and reform schools in Carpenter's cult West Coast noir — NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Fridays at Enrico's", author: "Don Carpenter", pageCount: 384, genre: "Fiction", publicationDate: "2014-01-01", description: "Carpenter's posthumous novel of four writers in 1960s-70s San Francisco and Portland, finished by Jonathan Lethem.", series: null, tier: "A", topRank: null },

  { title: "Fat City", author: "Leonard Gardner", pageCount: 192, genre: "Fiction", publicationDate: "1969-01-01", description: "An aging boxer and a young up-and-comer share an Stockton, California hotel — Gardner's only novel, a cult classic.", series: null, tier: "S", topRank: null },

  { title: "The Fan Man", author: "William Kotzwinkle", pageCount: 192, genre: "Fiction", publicationDate: "1974-01-01", description: "Horse Badorties, a legendary Lower East Side dropout, describes his grubby scheming life — Kotzwinkle's cult Beat-era novel.", series: null, tier: "S", topRank: null },
  { title: "Doctor Rat", author: "William Kotzwinkle", pageCount: 256, genre: "Fiction", publicationDate: "1976-01-01", description: "A laboratory rat who has survived countless experiments becomes a mad pro-human collaborator.", series: null, tier: "A", topRank: null },
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

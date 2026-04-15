const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Famished Road", author: "Ben Okri", pageCount: 512, genre: "Fiction", publicationDate: "1991-01-01", description: "Azaro, a spirit-child, lives between the world of the dead and the slums of Lagos — Okri's canonical Booker Prize winner.", series: { name: "Famished Road", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "Songs of Enchantment", author: "Ben Okri", pageCount: 304, genre: "Fiction", publicationDate: "1993-01-01", description: "Azaro and his family continue their half-spiritual life in the Nigerian compound as political violence gathers.", series: { name: "Famished Road", order: 2, total: 3 }, tier: "A", topRank: null },

  { title: "The Wedding of Zein", author: "Tayeb Salih", pageCount: 128, genre: "Fiction", publicationDate: "1969-01-01", description: "A ragged Sudanese holy fool becomes the unlikely fiancé of the most beautiful girl in his village.", series: null, tier: "A", topRank: null },

  { title: "Sleepwalking Land", author: "Mia Couto", pageCount: 240, genre: "Fiction", publicationDate: "1992-01-01", description: "An old man and a boy wander civil-war Mozambique reading a dead man's notebooks — Couto's canonical first novel.", series: null, tier: "S", topRank: null },
  { title: "The Tuner of Silences", author: "Mia Couto", pageCount: 208, genre: "Fiction", publicationDate: "2009-01-01", description: "A Mozambican boy grows up alone with his mad father and brother in a forgotten game park.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // WWII commercial
  { title: "HMS Ulysses", author: "Alistair MacLean", pageCount: 320, genre: "Historical Fiction", publicationDate: "1955-01-01", description: "A British light cruiser on the Arctic Murmansk convoy run endures weather, submarines, and mutinous exhaustion — MacLean's debut.", series: null, tier: "S", topRank: null },
  { title: "The Guns of Navarone", author: "Alistair MacLean", pageCount: 320, genre: "Historical Fiction", publicationDate: "1957-01-01", description: "A small Allied commando team scales a Greek island cliff to destroy a pair of massive German guns.", series: null, tier: "A", topRank: null },
  { title: "Where Eagles Dare", author: "Alistair MacLean", pageCount: 336, genre: "Historical Fiction", publicationDate: "1967-01-01", description: "An Allied team parachutes into a Bavarian Alps castle to rescue a captured American general.", series: null, tier: "A", topRank: null },

  { title: "The Cruel Sea", author: "Nicholas Monsarrat", pageCount: 512, genre: "Historical Fiction", publicationDate: "1951-01-01", description: "The Atlantic convoy war aboard a British corvette across six years — Monsarrat's canonical WWII naval novel.", series: null, tier: "S", topRank: null },
  { title: "The Tribe That Lost Its Head", author: "Nicholas Monsarrat", pageCount: 624, genre: "Fiction", publicationDate: "1956-01-01", description: "A fictional island off East Africa moves toward independence and rebellion in the late British empire.", series: null, tier: "A", topRank: null },

  { title: "The Lieutenants", author: "W.E.B. Griffin", pageCount: 464, genre: "Historical Fiction", publicationDate: "1982-01-01", description: "Four young officers graduate from West Point on the eve of WWII — the first Brotherhood of War novel.", series: { name: "Brotherhood of War", order: 1, total: 9 }, tier: "A", topRank: null },
  { title: "The Captains", author: "W.E.B. Griffin", pageCount: 432, genre: "Historical Fiction", publicationDate: "1982-01-01", description: "The same officers and their peers now face the Korean War.", series: { name: "Brotherhood of War", order: 2, total: 9 }, tier: "A", topRank: null },
  { title: "The Majors", author: "W.E.B. Griffin", pageCount: 416, genre: "Historical Fiction", publicationDate: "1983-01-01", description: "Peacetime Army politics and Berlin intelligence work — Brotherhood of War book three.", series: { name: "Brotherhood of War", order: 3, total: 9 }, tier: "A", topRank: null },

  { title: "All for Nothing", author: "Walter Kempowski", pageCount: 352, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "An East Prussian estate family in January 1945 watches the Red Army approach and their world end.", series: null, tier: "S", topRank: null },
  { title: "An Ordinary Youth", author: "Walter Kempowski", pageCount: 464, genre: "Historical Fiction", publicationDate: "1971-01-01", description: "Kempowski's autobiographical novel of growing up a Hanseatic bourgeois boy through the Nazi years and WWII.", series: null, tier: "A", topRank: null },

  // Civil War / American 19c
  { title: "The Year of the French", author: "Thomas Flanagan", pageCount: 532, genre: "Historical Fiction", publicationDate: "1979-01-01", description: "The 1798 French invasion of County Mayo told through multiple Irish and English perspectives. NBCC Award winner.", series: null, tier: "S", topRank: null },
  { title: "The Tenants of Time", author: "Thomas Flanagan", pageCount: 848, genre: "Historical Fiction", publicationDate: "1988-01-01", description: "The Irish Land War and the rise of Parnell told across decades of one County Clare village.", series: null, tier: "A", topRank: null },

  { title: "The Black Flower", author: "Howard Bahr", pageCount: 272, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "A Confederate soldier at the Battle of Franklin, 1864, in Bahr's quiet Civil War novel.", series: null, tier: "A", topRank: null },
  { title: "The Year of Jubilo", author: "Howard Bahr", pageCount: 432, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "A Confederate veteran returns to his Mississippi hometown in 1865 to find it ruined.", series: null, tier: "A", topRank: null },

  { title: "All Souls' Rising", author: "Madison Smartt Bell", pageCount: 560, genre: "Historical Fiction", publicationDate: "1995-10-03", description: "The first volume of Bell's trilogy on the Haitian Revolution — Toussaint Louverture's rise amid the 1791 uprising.", series: { name: "Haitian Revolution Trilogy", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "Master of the Crossroads", author: "Madison Smartt Bell", pageCount: 752, genre: "Historical Fiction", publicationDate: "2000-10-04", description: "The Haitian Revolution Trilogy continues as Toussaint governs the French colony.", series: { name: "Haitian Revolution Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Stone That the Builder Refused", author: "Madison Smartt Bell", pageCount: 768, genre: "Historical Fiction", publicationDate: "2004-11-16", description: "The trilogy closes as Toussaint is betrayed and Dessalines takes up arms against Napoleon.", series: { name: "Haitian Revolution Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Jacob's Ladder", author: "Donald McCaig", pageCount: 544, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "A Virginia aristocrat, his horse-trading son, and an enslaved man all survive the American Civil War.", series: null, tier: "A", topRank: null },
  { title: "Canaan", author: "Donald McCaig", pageCount: 448, genre: "Historical Fiction", publicationDate: "2007-11-06", description: "McCaig follows the same characters and their descendants through Reconstruction.", series: null, tier: "A", topRank: null },

  { title: "Property", author: "Valerie Martin", pageCount: 208, genre: "Historical Fiction", publicationDate: "2003-01-21", description: "The wife of a Louisiana planter watches a slave uprising approach her household in 1828. Orange Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Mary Reilly", author: "Valerie Martin", pageCount: 288, genre: "Historical Fiction", publicationDate: "1990-01-01", description: "The Jekyll and Hyde story retold through Jekyll's housemaid Mary Reilly.", series: null, tier: "A", topRank: null },

  // African historical / literary
  { title: "Chaka", author: "Thomas Mofolo", pageCount: 224, genre: "Historical Fiction", publicationDate: "1925-01-01", description: "A mythologized life of the Zulu king Shaka — the first major African novel, written in Sesotho.", series: null, tier: "S", topRank: null },

  { title: "The Laughing Cry", author: "Henri Lopes", pageCount: 272, genre: "Fiction", publicationDate: "1982-01-01", description: "A Congolese dictator's private secretary narrates the absurdities of his master's regime.", series: null, tier: "A", topRank: null },
  { title: "Dossier 101", author: "Henri Lopes", pageCount: 176, genre: "Fiction", publicationDate: "1971-01-01", description: "Lopes's satirical stories of post-independence African bureaucracy.", series: null, tier: "A", topRank: null },

  // WWI literary
  { title: "Johnny Got His Gun", author: "Dalton Trumbo", pageCount: 272, genre: "Historical Fiction", publicationDate: "1939-01-01", description: "A WWI American soldier wakes in a hospital bed without arms, legs, or face and narrates his inner life.", series: null, tier: "S", topRank: null },
  { title: "The Remarkable Andrew", author: "Dalton Trumbo", pageCount: 272, genre: "Fiction", publicationDate: "1941-01-01", description: "An honest small-town bookkeeper is visited by the ghost of Andrew Jackson in the run-up to WWII.", series: null, tier: "A", topRank: null },

  { title: "Under Fire", author: "Henri Barbusse", pageCount: 384, genre: "Historical Fiction", publicationDate: "1916-01-01", description: "A French infantry squad's experience of the trenches — Barbusse's canonical 1916 Goncourt winner.", series: null, tier: "S", topRank: null },

  { title: "Her Privates We", author: "Frederic Manning", pageCount: 288, genre: "Historical Fiction", publicationDate: "1929-01-01", description: "A single British soldier's experience of the Somme and Ancre across the final year of WWI.", series: null, tier: "S", topRank: null },
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

const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Greatest Knight", author: "Elizabeth Chadwick", pageCount: 560, genre: "Historical Fiction", publicationDate: "2005-01-01", description: "The rise of William Marshal from landless younger son to the most celebrated knight of twelfth-century England.", series: { name: "William Marshal", order: 1, total: 2 }, tier: "S", topRank: null },
  { title: "The Scarlet Lion", author: "Elizabeth Chadwick", pageCount: 560, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "William Marshal in the second half of his life as regent for young Henry III.", series: { name: "William Marshal", order: 2, total: 2 }, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Medieval mystery
  { title: "The Novice's Tale", author: "Margaret Frazer", pageCount: 272, genre: "Mystery", publicationDate: "1992-01-01", description: "Dame Frevisse, a fifteenth-century Benedictine nun, investigates a murder at her priory — the first Dame Frevisse novel.", series: { name: "Dame Frevisse", order: 1, total: 17 }, tier: "A", topRank: null },
  { title: "The Servant's Tale", author: "Margaret Frazer", pageCount: 288, genre: "Mystery", publicationDate: "1993-01-01", description: "Frevisse investigates the death of a player at a Christmas feast at the priory.", series: { name: "Dame Frevisse", order: 2, total: 17 }, tier: "A", topRank: null },

  { title: "The Apothecary Rose", author: "Candace Robb", pageCount: 320, genre: "Mystery", publicationDate: "1993-01-01", description: "Owen Archer, a one-eyed former soldier, investigates two deaths at a fourteenth-century York apothecary.", series: { name: "Owen Archer", order: 1, total: 14 }, tier: "A", topRank: null },
  { title: "The Lady Chapel", author: "Candace Robb", pageCount: 336, genre: "Mystery", publicationDate: "1994-01-01", description: "Owen Archer investigates two linked deaths in York's Corpus Christi procession.", series: { name: "Owen Archer", order: 2, total: 14 }, tier: "A", topRank: null },

  // Elizabethan
  { title: "The Secret Diary of Anne Boleyn", author: "Robin Maxwell", pageCount: 304, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "Queen Elizabeth I reads her mother Anne Boleyn's secret diary and is transformed by it.", series: null, tier: "A", topRank: null },
  { title: "Virgin", author: "Robin Maxwell", pageCount: 384, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "The young Elizabeth Tudor's dangerous relationship with her stepfather Thomas Seymour.", series: null, tier: "A", topRank: null },

  { title: "Queen's Gambit", author: "Elizabeth Fremantle", pageCount: 432, genre: "Historical Fiction", publicationDate: "2013-06-06", description: "Katherine Parr, Henry VIII's widowed sixth wife, navigates the final years of his court.", series: null, tier: "A", topRank: null },
  { title: "Sisters of Treason", author: "Elizabeth Fremantle", pageCount: 496, genre: "Historical Fiction", publicationDate: "2014-06-05", description: "The younger sisters of Lady Jane Grey contend with Mary I and then Elizabeth I.", series: null, tier: "A", topRank: null },
  { title: "Watch the Lady", author: "Elizabeth Fremantle", pageCount: 448, genre: "Historical Fiction", publicationDate: "2015-06-25", description: "Penelope Devereux navigates the final years of Elizabeth I's court through her brother Essex's rebellion.", series: null, tier: "A", topRank: null },

  // Byzantine / late ancient
  { title: "Fire in the East", author: "Harry Sidebottom", pageCount: 448, genre: "Historical Fiction", publicationDate: "2008-09-01", description: "Ballista, a Dux Ripae sent east to a Sassanid siege, defends the Roman frontier town of Arete — Warrior of Rome book one.", series: { name: "Warrior of Rome", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "King of Kings", author: "Harry Sidebottom", pageCount: 400, genre: "Historical Fiction", publicationDate: "2009-06-04", description: "Ballista is sent to confront the Persian king Shapur I and the spread of Christianity.", series: { name: "Warrior of Rome", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Lion of the Sun", author: "Harry Sidebottom", pageCount: 432, genre: "Historical Fiction", publicationDate: "2010-06-03", description: "Ballista navigates the disastrous captivity of Emperor Valerian and its aftermath.", series: { name: "Warrior of Rome", order: 3, total: 6 }, tier: "A", topRank: null },

  { title: "Gates of Fire", author: "Stephen Pressfield", pageCount: 400, genre: "Historical Fiction", publicationDate: "1998-11-02", description: "A Greek survivor of Thermopylae narrates the battle and the Spartan life that led to it — Pressfield's canonical novel.", series: null, tier: "S", topRank: null },
  { title: "Tides of War", author: "Stephen Pressfield", pageCount: 432, genre: "Historical Fiction", publicationDate: "2000-01-11", description: "Alcibiades and the Peloponnesian War from the perspective of his former bodyguard.", series: null, tier: "A", topRank: null },
  { title: "The Virtues of War", author: "Stephen Pressfield", pageCount: 384, genre: "Historical Fiction", publicationDate: "2004-10-05", description: "Alexander the Great's first-person memoir of his own campaigns.", series: null, tier: "A", topRank: null },

  // Celtic / Anglo-Saxon / Viking
  { title: "Outlaw", author: "Angus Donald", pageCount: 368, genre: "Historical Fiction", publicationDate: "2009-07-02", description: "A young thief is taken in by a violent, scheming Robin Hood in twelfth-century Sherwood — the first Outlaw Chronicles novel.", series: { name: "Outlaw Chronicles", order: 1, total: 10 }, tier: "A", topRank: null },
  { title: "Holy Warrior", author: "Angus Donald", pageCount: 384, genre: "Historical Fiction", publicationDate: "2010-07-01", description: "Alan Dale and Robin Hood join Richard the Lionheart on crusade.", series: { name: "Outlaw Chronicles", order: 2, total: 10 }, tier: "A", topRank: null },
  { title: "King's Man", author: "Angus Donald", pageCount: 416, genre: "Historical Fiction", publicationDate: "2011-07-07", description: "Alan Dale serves King Richard in the English civil war.", series: { name: "Outlaw Chronicles", order: 3, total: 10 }, tier: "A", topRank: null },

  { title: "The Whale Road", author: "Robert Low", pageCount: 352, genre: "Historical Fiction", publicationDate: "2007-01-04", description: "A young Orkney Viking joins the Oathsworn, a brotherhood of warriors hunting Atlas's silver — the first Oathsworn novel.", series: { name: "The Oathsworn", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "The Wolf Sea", author: "Robert Low", pageCount: 400, genre: "Historical Fiction", publicationDate: "2008-01-03", description: "Orm and the Oathsworn are stranded in Constantinople and pulled into a war with the Arabs.", series: { name: "The Oathsworn", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "The White Raven", author: "Robert Low", pageCount: 384, genre: "Historical Fiction", publicationDate: "2009-03-26", description: "The Oathsworn set out to find the hoard of Attila the Hun across the Russian steppe.", series: { name: "The Oathsworn", order: 3, total: 5 }, tier: "A", topRank: null },

  { title: "The Skystone", author: "Jack Whyte", pageCount: 512, genre: "Historical Fiction", publicationDate: "1992-01-01", description: "Roman soldiers in fourth-century Britain forge the sword that will become Excalibur — the first Camulod Chronicles novel.", series: { name: "Camulod Chronicles", order: 1, total: 9 }, tier: "A", topRank: null },
  { title: "The Singing Sword", author: "Jack Whyte", pageCount: 528, genre: "Historical Fiction", publicationDate: "1993-01-01", description: "As Rome abandons Britain, the founders of Camulod build their own fortified community.", series: { name: "Camulod Chronicles", order: 2, total: 9 }, tier: "A", topRank: null },
  { title: "The Eagles' Brood", author: "Jack Whyte", pageCount: 560, genre: "Historical Fiction", publicationDate: "1994-01-01", description: "The birth of Arthur and Mordred in post-Roman Camulod.", series: { name: "Camulod Chronicles", order: 3, total: 9 }, tier: "A", topRank: null },

  // Irish historical
  { title: "Ireland", author: "Frank Delaney", pageCount: 608, genre: "Historical Fiction", publicationDate: "2005-02-22", description: "A traveling storyteller arrives at a rural Irish household on a winter night in 1951 and tells centuries of Irish history as fable.", series: null, tier: "S", topRank: null },
  { title: "Tipperary", author: "Frank Delaney", pageCount: 464, genre: "Historical Fiction", publicationDate: "2007-02-20", description: "An Irish healer's life from 1860 through the War of Independence.", series: null, tier: "A", topRank: null },
  { title: "Shannon", author: "Frank Delaney", pageCount: 368, genre: "Historical Fiction", publicationDate: "2009-02-24", description: "A traumatized WWI chaplain walks along the Shannon River searching for his identity.", series: null, tier: "A", topRank: null },

  { title: "Seek the Fair Land", author: "Walter Macken", pageCount: 320, genre: "Historical Fiction", publicationDate: "1959-01-01", description: "An Irish family flees Cromwell's invasion across seventeenth-century Ireland — the first of Macken's historical trilogy.", series: { name: "Macken Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Silent People", author: "Walter Macken", pageCount: 304, genre: "Historical Fiction", publicationDate: "1962-01-01", description: "An Irish family endures the nineteenth-century Famine.", series: { name: "Macken Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Scorching Wind", author: "Walter Macken", pageCount: 320, genre: "Historical Fiction", publicationDate: "1964-01-01", description: "Two brothers end up on opposite sides of the Irish Civil War.", series: { name: "Macken Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  // Scottish historical
  { title: "The Bruce Trilogy", author: "Nigel Tranter", pageCount: 1344, genre: "Historical Fiction", publicationDate: "1969-01-01", description: "Tranter's definitive three-volume novelization of Robert the Bruce's Scottish war of independence.", series: null, tier: "S", topRank: null },
  { title: "MacBeth the King", author: "Nigel Tranter", pageCount: 432, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "The real eleventh-century Scottish king MacBeth — Tranter reclaims him from Shakespeare.", series: null, tier: "A", topRank: null },
  { title: "The Wallace", author: "Nigel Tranter", pageCount: 400, genre: "Historical Fiction", publicationDate: "1975-01-01", description: "A prequel novel of William Wallace's war against Edward I, preceding the Bruce trilogy.", series: null, tier: "A", topRank: null },

  // English country-house saga
  { title: "The Town House", author: "Norah Lofts", pageCount: 352, genre: "Historical Fiction", publicationDate: "1959-01-01", description: "A runaway serf in the early fifteenth century builds a merchant's townhouse that will outlive him by centuries — the first Suffolk Trilogy novel.", series: { name: "Suffolk Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The House at Old Vine", author: "Norah Lofts", pageCount: 384, genre: "Historical Fiction", publicationDate: "1961-01-01", description: "The same Suffolk house across the sixteenth and seventeenth centuries.", series: { name: "Suffolk Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The House at Sunset", author: "Norah Lofts", pageCount: 320, genre: "Historical Fiction", publicationDate: "1962-01-01", description: "The Suffolk Trilogy concludes in the eighteenth and nineteenth centuries.", series: { name: "Suffolk Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  // Arthurian
  { title: "Guenevere: Queen of the Summer Country", author: "Rosalind Miles", pageCount: 448, genre: "Fantasy", publicationDate: "1998-01-01", description: "Guenevere tells her own story of her birthright, her marriage to Arthur, and her love for Lancelot.", series: { name: "Guenevere", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Knight of the Sacred Lake", author: "Rosalind Miles", pageCount: 432, genre: "Fantasy", publicationDate: "2000-01-01", description: "Guenevere continues her rule alongside Arthur as the Round Table cracks.", series: { name: "Guenevere", order: 2, total: 3 }, tier: "A", topRank: null },
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

const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Good Earth", author: "Pearl S. Buck", pageCount: 368, genre: "Historical Fiction", publicationDate: "1931-01-01", description: "A Chinese farmer's rise from poverty through revolution and famine — the canonical American-written novel of rural China. Pulitzer Prize winner.", series: { name: "House of Earth", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "Sons", author: "Pearl S. Buck", pageCount: 320, genre: "Historical Fiction", publicationDate: "1932-01-01", description: "The three sons of Wang Lung each take a different path as their father's old China crumbles.", series: { name: "House of Earth", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "A House Divided", author: "Pearl S. Buck", pageCount: 368, genre: "Historical Fiction", publicationDate: "1935-01-01", description: "The House of Earth trilogy closes with Wang Lung's grandson Wang Yuan torn between old and modernizing China.", series: { name: "House of Earth", order: 3, total: 3 }, tier: "A", topRank: null },
  { title: "Pavilion of Women", author: "Pearl S. Buck", pageCount: 336, genre: "Historical Fiction", publicationDate: "1946-01-01", description: "On her fortieth birthday, a Chinese matriarch tells her husband she has selected a concubine to take her place.", series: null, tier: "A", topRank: null },
  { title: "Peony", author: "Pearl S. Buck", pageCount: 320, genre: "Historical Fiction", publicationDate: "1948-01-01", description: "A Chinese bondmaid in a Jewish household in nineteenth-century Kaifeng loves the family's son.", series: null, tier: "A", topRank: null },

  { title: "The Confession", author: "Jessie Burton", pageCount: 464, genre: "Fiction", publicationDate: "2019-09-19", description: "A young Englishwoman seeks out the reclusive novelist who once loved her mother — Burton's literary mystery.", series: null, tier: "A", topRank: null },
  { title: "The House of Fortune", author: "Jessie Burton", pageCount: 400, genre: "Historical Fiction", publicationDate: "2022-07-07", description: "The Miniaturist sequel — Nella's niece Thea, eighteen years later, must keep the Brandt household from ruin.", series: { name: "The Miniaturist", order: 2, total: 2 }, tier: "A", topRank: null },

  { title: "The Moor's Account", author: "Laila Lalami", pageCount: 336, genre: "Historical Fiction", publicationDate: "2014-09-16", description: "The sixteenth-century Moroccan slave Estevanico's fictionalized account of the Narváez expedition through the American Southwest.", series: null, tier: "S", topRank: null },
  { title: "The Other Americans", author: "Laila Lalami", pageCount: 320, genre: "Fiction", publicationDate: "2019-03-26", description: "A Moroccan immigrant is killed in a hit and run in a small California town, and his daughter investigates.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Japan / China historical
  { title: "Across the Nightingale Floor", author: "Lian Hearn", pageCount: 320, genre: "Fantasy", publicationDate: "2002-08-01", description: "A young man in feudal Japan discovers his ninja-like Tribe abilities — the first of the Tales of the Otori.", series: { name: "Tales of the Otori", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Grass for His Pillow", author: "Lian Hearn", pageCount: 304, genre: "Fantasy", publicationDate: "2003-08-04", description: "Takeo trains with the Tribe while Kaede returns to her inherited lands.", series: { name: "Tales of the Otori", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "Brilliance of the Moon", author: "Lian Hearn", pageCount: 336, genre: "Fantasy", publicationDate: "2004-08-02", description: "Takeo and Kaede race to reclaim their destinies — Tales of the Otori book three.", series: { name: "Tales of the Otori", order: 3, total: 5 }, tier: "A", topRank: null },

  { title: "The Chinese Bell Murders", author: "Robert van Gulik", pageCount: 288, genre: "Mystery", publicationDate: "1958-01-01", description: "Magistrate Judge Dee investigates three cases in seventh-century Tang-era China — van Gulik's canonical adaptation of a historical Chinese judge.", series: { name: "Judge Dee", order: 4, total: 16 }, tier: "S", topRank: null },
  { title: "The Chinese Gold Murders", author: "Robert van Gulik", pageCount: 256, genre: "Mystery", publicationDate: "1959-01-01", description: "Young Judge Dee arrives at his first district posting and immediately faces a murdered magistrate and a ghost.", series: { name: "Judge Dee", order: 1, total: 16 }, tier: "A", topRank: null },
  { title: "The Chinese Lake Murders", author: "Robert van Gulik", pageCount: 256, genre: "Mystery", publicationDate: "1960-01-01", description: "Judge Dee investigates a drowning, a ghost, and a secret society in a lakeside Tang district.", series: { name: "Judge Dee", order: 2, total: 16 }, tier: "A", topRank: null },

  { title: "The Skull Mantra", author: "Eliot Pattison", pageCount: 416, genre: "Mystery", publicationDate: "1999-08-15", description: "A disgraced Chinese inspector imprisoned at a Tibetan labor camp is pulled out to investigate a headless body. Edgar Award winner.", series: { name: "Inspector Shan", order: 1, total: 10 }, tier: "S", topRank: null },
  { title: "Water Touching Stone", author: "Eliot Pattison", pageCount: 640, genre: "Mystery", publicationDate: "2001-10-01", description: "Shan investigates ritualized murders of schoolchildren in a Tibetan-Uighur border region.", series: { name: "Inspector Shan", order: 2, total: 10 }, tier: "A", topRank: null },
  { title: "Bone Mountain", author: "Eliot Pattison", pageCount: 624, genre: "Mystery", publicationDate: "2002-11-05", description: "Shan and his monk companions travel through Tibet on a mission to return a sacred stone.", series: { name: "Inspector Shan", order: 3, total: 10 }, tier: "A", topRank: null },

  // Prehistoric / Latin American
  { title: "The Clan of the Cave Bear", author: "Jean M. Auel", pageCount: 528, genre: "Historical Fiction", publicationDate: "1980-01-01", description: "A young Cro-Magnon girl orphaned by an earthquake is adopted by a clan of Neanderthals.", series: { name: "Earth's Children", order: 1, total: 6 }, tier: "S", topRank: null },
  { title: "The Valley of Horses", author: "Jean M. Auel", pageCount: 528, genre: "Historical Fiction", publicationDate: "1982-01-01", description: "Ayla, exiled from the clan, lives alone in a remote valley until she meets a Cro-Magnon man named Jondalar.", series: { name: "Earth's Children", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "The Mammoth Hunters", author: "Jean M. Auel", pageCount: 720, genre: "Historical Fiction", publicationDate: "1985-01-01", description: "Ayla and Jondalar join a mammoth-hunting camp on the eastern European steppe.", series: { name: "Earth's Children", order: 3, total: 6 }, tier: "A", topRank: null },

  { title: "Like Water for Chocolate", author: "Laura Esquivel", pageCount: 256, genre: "Fiction", publicationDate: "1989-01-01", description: "A young Mexican woman forbidden to marry pours her emotions into the food she cooks during the Revolution.", series: null, tier: "S", topRank: null },
  { title: "The Law of Love", author: "Laura Esquivel", pageCount: 272, genre: "Fantasy", publicationDate: "1995-01-01", description: "A twenty-third-century Mexican astroanalyst traces past lives back to the Spanish conquest.", series: null, tier: "A", topRank: null },

  // Regency / Napoleonic historical mystery
  { title: "What Angels Fear", author: "C.S. Harris", pageCount: 368, genre: "Mystery", publicationDate: "2005-11-01", description: "Sebastian St. Cyr, a Regency viscount, is accused of murdering a young actress — the first Sebastian St. Cyr novel.", series: { name: "Sebastian St. Cyr", order: 1, total: 19 }, tier: "A", topRank: null },
  { title: "When Gods Die", author: "C.S. Harris", pageCount: 368, genre: "Mystery", publicationDate: "2006-11-07", description: "Sebastian St. Cyr investigates the murder of a marchioness found in the Prince Regent's arms.", series: { name: "Sebastian St. Cyr", order: 2, total: 19 }, tier: "A", topRank: null },
  { title: "Why Mermaids Sing", author: "C.S. Harris", pageCount: 336, genre: "Mystery", publicationDate: "2007-11-06", description: "Sebastian St. Cyr hunts a killer mutilating wealthy young Regency men.", series: { name: "Sebastian St. Cyr", order: 3, total: 19 }, tier: "A", topRank: null },

  { title: "Jane and the Unpleasantness at Scargrave Manor", author: "Stephanie Barron", pageCount: 288, genre: "Mystery", publicationDate: "1996-01-01", description: "Jane Austen investigates a murder at a country house — the first in Barron's Jane Austen mystery series.", series: { name: "Jane Austen Mysteries", order: 1, total: 15 }, tier: "A", topRank: null },
  { title: "Jane and the Man of the Cloth", author: "Stephanie Barron", pageCount: 288, genre: "Mystery", publicationDate: "1997-01-01", description: "On a family trip to Lyme Regis, Jane Austen encounters a mysterious smuggler and another murder.", series: { name: "Jane Austen Mysteries", order: 2, total: 15 }, tier: "A", topRank: null },

  // Medieval / classical sword-and-sandal
  { title: "The Silver Chalice", author: "Thomas B. Costain", pageCount: 544, genre: "Historical Fiction", publicationDate: "1952-01-01", description: "A first-century Greek silversmith is commissioned to craft a chalice to hold the Cup of the Last Supper.", series: null, tier: "A", topRank: null },
  { title: "The Black Rose", author: "Thomas B. Costain", pageCount: 432, genre: "Historical Fiction", publicationDate: "1945-01-01", description: "A thirteenth-century English adventurer travels the Silk Road to Cathay.", series: null, tier: "A", topRank: null },

  { title: "Conscience of the King", author: "Alfred Duggan", pageCount: 240, genre: "Historical Fiction", publicationDate: "1951-01-01", description: "A fictionalized first-person memoir of Cerdic, the founder of the West Saxon kings — Duggan's classic dark-ages novel.", series: null, tier: "A", topRank: null },
  { title: "The Lady for Ransom", author: "Alfred Duggan", pageCount: 240, genre: "Historical Fiction", publicationDate: "1953-01-01", description: "Norman mercenaries in the Byzantine service navigate the eleventh-century Seljuk invasions.", series: null, tier: "A", topRank: null },

  { title: "The Iron King", author: "Maurice Druon", pageCount: 384, genre: "Historical Fiction", publicationDate: "1955-01-01", description: "Philip IV of France moves against the Knights Templar and is cursed from the pyre — the first of The Accursed Kings.", series: { name: "The Accursed Kings", order: 1, total: 7 }, tier: "S", topRank: null },
  { title: "The Strangled Queen", author: "Maurice Druon", pageCount: 288, genre: "Historical Fiction", publicationDate: "1955-01-01", description: "The curse of the Templars falls on Philip's sons and their adulterous wives.", series: { name: "The Accursed Kings", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "The Poisoned Crown", author: "Maurice Druon", pageCount: 288, genre: "Historical Fiction", publicationDate: "1956-01-01", description: "Louis X's brief reign and its scheming advisors — The Accursed Kings continues.", series: { name: "The Accursed Kings", order: 3, total: 7 }, tier: "A", topRank: null },

  // Literary historical
  { title: "The Essex Serpent", author: "Sarah Perry", pageCount: 432, genre: "Historical Fiction", publicationDate: "2016-06-02", description: "A widowed Victorian naturalist arrives in a small Essex village convinced a sea serpent has returned to the river.", series: null, tier: "S", topRank: null },
  { title: "Melmoth", author: "Sarah Perry", pageCount: 288, genre: "Fiction", publicationDate: "2018-10-16", description: "An English woman in Prague finds a manuscript about a woman in black who walks through history bearing witness to cruelty.", series: null, tier: "A", topRank: null },

  { title: "Wake", author: "Anna Hope", pageCount: 304, genre: "Historical Fiction", publicationDate: "2014-01-30", description: "Three English women in November 1920 wait for the return of the Unknown Soldier and for news of their own dead.", series: null, tier: "A", topRank: null },
  { title: "The Ballroom", author: "Anna Hope", pageCount: 320, genre: "Historical Fiction", publicationDate: "2016-02-11", description: "A Yorkshire asylum in 1911 holds a weekly ballroom dance as a young patient falls in love with an Irish inmate.", series: null, tier: "A", topRank: null },
  { title: "Expectation", author: "Anna Hope", pageCount: 320, genre: "Fiction", publicationDate: "2019-07-11", description: "Three English women navigate the long distance between the lives they thought they'd have and the ones they end up with.", series: null, tier: "A", topRank: null },

  { title: "The Tale of Murasaki", author: "Liza Dalby", pageCount: 432, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "Dalby's novelized life of Murasaki Shikibu, the eleventh-century author of The Tale of Genji.", series: null, tier: "A", topRank: null },
  { title: "Hidden Buddhas", author: "Liza Dalby", pageCount: 304, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "An American Buddhism scholar searches for a set of hidden Japanese temple statues across the twentieth century.", series: null, tier: "A", topRank: null },
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

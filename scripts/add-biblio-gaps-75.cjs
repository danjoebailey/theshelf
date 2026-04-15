const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Biblical / ancient Near East
  { title: "The Red Tent", author: "Anita Diamant", pageCount: 336, genre: "Historical Fiction", publicationDate: "1997-09-10", description: "The biblical Dinah tells her own story of her mothers in Jacob's household and her life in Egypt.", series: null, tier: "S", topRank: null },
  { title: "The Boston Girl", author: "Anita Diamant", pageCount: 336, genre: "Historical Fiction", publicationDate: "2014-12-09", description: "An eighty-five-year-old Jewish Boston grandmother recounts her immigrant coming-of-age in the early twentieth century.", series: null, tier: "A", topRank: null },

  { title: "The Gospel According to Pilate", author: "Eric-Emmanuel Schmitt", pageCount: 208, genre: "Fiction", publicationDate: "2000-01-01", description: "Pontius Pilate writes letters to his brother investigating the disappearance of the body of a man named Yeshua.", series: null, tier: "A", topRank: null },
  { title: "Oscar and the Lady in Pink", author: "Eric-Emmanuel Schmitt", pageCount: 112, genre: "Fiction", publicationDate: "2002-01-01", description: "A dying ten-year-old boy writes letters to God during his last twelve days in a Parisian hospital.", series: null, tier: "A", topRank: null },
  { title: "The Most Beautiful Book in the World", author: "Eric-Emmanuel Schmitt", pageCount: 192, genre: "Fiction", publicationDate: "2006-01-01", description: "Eight stories of ordinary people in unexpected moments of grace.", series: null, tier: "A", topRank: null },

  // Japanese samurai
  { title: "Musashi", author: "Eiji Yoshikawa", pageCount: 984, genre: "Historical Fiction", publicationDate: "1935-01-01", description: "Yoshikawa's sprawling novel of Miyamoto Musashi, the seventeenth-century rōnin and sword saint.", series: null, tier: "S", topRank: null },
  { title: "Taiko", author: "Eiji Yoshikawa", pageCount: 1024, genre: "Historical Fiction", publicationDate: "1937-01-01", description: "The rise of Toyotomi Hideyoshi from peasant soldier to unifier of sixteenth-century Japan.", series: null, tier: "A", topRank: null },

  { title: "Cloud of Sparrows", author: "Takashi Matsuoka", pageCount: 432, genre: "Historical Fiction", publicationDate: "2002-08-27", description: "A Japanese lord with the gift of prophecy and three American missionaries converge in 1861 as the shogunate collapses.", series: { name: "Cloud of Sparrows", order: 1, total: 2 }, tier: "A", topRank: null },
  { title: "Autumn Bridge", author: "Takashi Matsuoka", pageCount: 480, genre: "Historical Fiction", publicationDate: "2004-09-14", description: "Cloud of Sparrows continues through the lives of an earlier samurai ancestor and a modern descendent.", series: { name: "Cloud of Sparrows", order: 2, total: 2 }, tier: "A", topRank: null },

  { title: "Shinju", author: "Laura Joh Rowland", pageCount: 400, genre: "Mystery", publicationDate: "1994-01-01", description: "Sano Ichiro, a yoriki detective in seventeenth-century Edo, investigates what looks like a ritual double suicide — the first Sano novel.", series: { name: "Sano Ichiro", order: 1, total: 18 }, tier: "A", topRank: null },
  { title: "Bundori", author: "Laura Joh Rowland", pageCount: 384, genre: "Mystery", publicationDate: "1996-01-01", description: "Sano Ichiro investigates a series of ritual head-cuttings in Edo.", series: { name: "Sano Ichiro", order: 2, total: 18 }, tier: "A", topRank: null },
  { title: "The Way of the Traitor", author: "Laura Joh Rowland", pageCount: 384, genre: "Mystery", publicationDate: "1997-01-01", description: "Sano is sent to the foreigners' quarter in Nagasaki to investigate a Dutch merchant's murder.", series: { name: "Sano Ichiro", order: 3, total: 18 }, tier: "A", topRank: null },

  { title: "Rashomon Gate", author: "I.J. Parker", pageCount: 320, genre: "Mystery", publicationDate: "2002-01-01", description: "Akitada Sugawara, an eleventh-century Heian-era junior official, investigates a case tied to a ghostly gate.", series: { name: "Akitada", order: 2, total: 17 }, tier: "A", topRank: null },
  { title: "The Hell Screen", author: "I.J. Parker", pageCount: 368, genre: "Mystery", publicationDate: "2003-01-01", description: "Akitada investigates the murder of a famous artist who was painting a depiction of hell.", series: { name: "Akitada", order: 5, total: 17 }, tier: "A", topRank: null },
  { title: "Black Arrow", author: "I.J. Parker", pageCount: 368, genre: "Mystery", publicationDate: "2006-01-01", description: "Akitada is sent to the northern province of Echigo on a political assignment that becomes a murder case.", series: { name: "Akitada", order: 3, total: 17 }, tier: "A", topRank: null },

  { title: "Death at the Crossroads", author: "Dale Furutani", pageCount: 224, genre: "Mystery", publicationDate: "1998-01-01", description: "An unemployed samurai named Matsuyama Kaze investigates a murder at a rural crossroads in seventeenth-century Japan.", series: { name: "Samurai Mystery", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Jade Palace Vendetta", author: "Dale Furutani", pageCount: 256, genre: "Mystery", publicationDate: "1999-01-01", description: "Kaze follows his quest to find the daughter of the lord he once served.", series: { name: "Samurai Mystery", order: 2, total: 3 }, tier: "A", topRank: null },

  // Spanish / Mediterranean historical
  { title: "Cathedral of the Sea", author: "Ildefonso Falcones", pageCount: 624, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "A fourteenth-century Barcelona peasant's son rises through the city's guilds as the great basilica of Santa Maria del Mar is built.", series: null, tier: "S", topRank: null },
  { title: "The Hand of Fatima", author: "Ildefonso Falcones", pageCount: 960, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "A sixteenth-century Morisco boy contends with the persecution and final expulsion of the Spanish Muslims.", series: null, tier: "A", topRank: null },
  { title: "The Heirs of the Land", author: "Ildefonso Falcones", pageCount: 832, genre: "Historical Fiction", publicationDate: "2016-01-01", description: "Cathedral of the Sea's sequel follows Hugo Llor through fourteenth-century Barcelona wine making and plague.", series: null, tier: "A", topRank: null },

  { title: "The Last Cato", author: "Matilde Asensi", pageCount: 464, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "A Vatican paleographer investigates a centuries-old brotherhood guarding fragments of the True Cross.", series: null, tier: "A", topRank: null },
  { title: "Everything Under the Sky", author: "Matilde Asensi", pageCount: 480, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "An early twentieth-century Spanish antiquarian in Shanghai inherits her brother-in-law's search for the tomb of the First Emperor.", series: null, tier: "A", topRank: null },

  { title: "The Son of the Consul", author: "Santiago Posteguillo", pageCount: 832, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "The young Publius Cornelius Scipio comes of age as Hannibal crosses the Alps — first of Posteguillo's Africanus trilogy.", series: { name: "Africanus", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Legions of Rome", author: "Santiago Posteguillo", pageCount: 880, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "Scipio Africanus matures and leads the counter-invasion of Carthage.", series: { name: "Africanus", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Betrayal of Rome", author: "Santiago Posteguillo", pageCount: 768, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "The Africanus trilogy closes with Scipio's last political battles and his exile from Rome.", series: { name: "Africanus", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Bible of Clay", author: "Julia Navarro", pageCount: 560, genre: "Historical Fiction", publicationDate: "2005-01-01", description: "An Iraqi archaeologist in 2003 searches for the clay tablet Abraham is said to have carved his own memoirs on.", series: null, tier: "A", topRank: null },
  { title: "The Blood of the Innocents", author: "Julia Navarro", pageCount: 544, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "Four generations of a family across the Cathar Crusades, the Spanish Inquisition, and contemporary Barcelona.", series: null, tier: "A", topRank: null },

  // German postwar literary
  { title: "The Man Outside", author: "Wolfgang Borchert", pageCount: 160, genre: "Fiction", publicationDate: "1947-01-01", description: "A returning German soldier finds he cannot rejoin civilian life in Borchert's canonical postwar play and stories.", series: null, tier: "A", topRank: null },

  { title: "The German Lesson", author: "Siegfried Lenz", pageCount: 464, genre: "Historical Fiction", publicationDate: "1968-01-01", description: "A German boy in a 1950s juvenile detention center writes a composition titled The Joys of Duty and reconstructs his Nazi-era policeman father.", series: null, tier: "S", topRank: null },
  { title: "The Heritage", author: "Siegfried Lenz", pageCount: 416, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "A Masurian family museum burns and its curator reckons with the vanished East Prussian culture it preserved.", series: null, tier: "A", topRank: null },
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

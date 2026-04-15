const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Gösta Berling's Saga", author: "Selma Lagerlöf", pageCount: 432, genre: "Fiction", publicationDate: "1891-01-01", description: "A defrocked Swedish priest wanders through a strange commune of cavaliers at Ekeby estate — Lagerlöf's fiery debut.", series: null, tier: "S", topRank: null },
  { title: "Jerusalem", author: "Selma Lagerlöf", pageCount: 640, genre: "Historical Fiction", publicationDate: "1901-01-01", description: "A group of Swedish villagers follow a religious movement to the Holy Land — Lagerlöf's epic that was central to her Nobel citation.", series: null, tier: "S", topRank: null },
  { title: "The Löwensköld Ring", author: "Selma Lagerlöf", pageCount: 208, genre: "Historical Fiction", publicationDate: "1925-01-01", description: "A stolen ring curses a Swedish family across generations — the first Löwensköld novel.", series: { name: "The Löwensköld Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Emperor of Portugallia", author: "Selma Lagerlöf", pageCount: 272, genre: "Fiction", publicationDate: "1914-01-01", description: "A poor Swedish crofter whose daughter leaves for Stockholm retreats into a fantasy that she has become an empress.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Ancient Egypt / classical
  { title: "The Egyptian", author: "Mika Waltari", pageCount: 512, genre: "Historical Fiction", publicationDate: "1945-01-01", description: "A physician in the court of Akhenaten narrates a life across fourteenth-century BCE Egypt, Syria, and Crete — Waltari's canonical historical bestseller.", series: null, tier: "S", topRank: null },
  { title: "The Dark Angel", author: "Mika Waltari", pageCount: 400, genre: "Historical Fiction", publicationDate: "1952-01-01", description: "A Renaissance European expatriate lives through the fall of Constantinople in 1453.", series: null, tier: "A", topRank: null },

  { title: "Child of the Morning", author: "Pauline Gedge", pageCount: 416, genre: "Historical Fiction", publicationDate: "1977-01-01", description: "The life of Hatshepsut, the female pharaoh of eighteenth-dynasty Egypt — Gedge's canonical debut.", series: null, tier: "S", topRank: null },
  { title: "House of Dreams", author: "Pauline Gedge", pageCount: 496, genre: "Historical Fiction", publicationDate: "1994-01-01", description: "A rural Egyptian girl at the court of Ramses III is caught in a harem conspiracy.", series: null, tier: "A", topRank: null },
  { title: "The Eagle and the Raven", author: "Pauline Gedge", pageCount: 640, genre: "Historical Fiction", publicationDate: "1978-01-01", description: "Britons Boudicca and Caratacus resist Roman conquest in Gedge's sweeping novel of first-century Britain.", series: null, tier: "A", topRank: null },

  { title: "Ramses: Son of the Light", author: "Christian Jacq", pageCount: 336, genre: "Historical Fiction", publicationDate: "1995-01-01", description: "The young Ramses II of Egypt and his rivals for the throne — the first of Jacq's Ramses quintet.", series: { name: "Ramses", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "The Eternal Temple", author: "Christian Jacq", pageCount: 368, genre: "Historical Fiction", publicationDate: "1995-01-01", description: "Ramses II consolidates his rule and builds his great monuments.", series: { name: "Ramses", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "The Battle of Kadesh", author: "Christian Jacq", pageCount: 352, genre: "Historical Fiction", publicationDate: "1996-01-01", description: "Ramses II faces the Hittites at Kadesh in Jacq's third Ramses novel.", series: { name: "Ramses", order: 3, total: 5 }, tier: "A", topRank: null },

  { title: "Nefertiti", author: "Michelle Moran", pageCount: 480, genre: "Historical Fiction", publicationDate: "2007-07-10", description: "The life of the great queen of Egypt from the perspective of her younger sister Mutnodjmet.", series: null, tier: "A", topRank: null },
  { title: "The Heretic Queen", author: "Michelle Moran", pageCount: 400, genre: "Historical Fiction", publicationDate: "2008-09-16", description: "The young Nefertari, niece of Nefertiti, rises at the court of Ramses II in the shadow of her aunt's heresy.", series: null, tier: "A", topRank: null },
  { title: "Cleopatra's Daughter", author: "Michelle Moran", pageCount: 432, genre: "Historical Fiction", publicationDate: "2009-09-15", description: "Selene and Alexander, the twin children of Cleopatra and Mark Antony, are taken to Rome after their mother's suicide.", series: null, tier: "A", topRank: null },

  // Ancient world
  { title: "Child of a Dream", author: "Valerio Massimo Manfredi", pageCount: 384, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "The first of Manfredi's Alexander Trilogy — the childhood and early campaigns of Alexander the Great.", series: { name: "Alexander Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Sands of Ammon", author: "Valerio Massimo Manfredi", pageCount: 384, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "Alexander invades Persia and consults the oracle of Ammon — Alexander Trilogy book two.", series: { name: "Alexander Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Ends of the Earth", author: "Valerio Massimo Manfredi", pageCount: 384, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "Alexander pushes to India and back, and the trilogy closes with his death in Babylon.", series: { name: "Alexander Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  // Medieval historical / crime
  { title: "Absolution by Murder", author: "Peter Tremayne", pageCount: 336, genre: "Mystery", publicationDate: "1994-01-01", description: "Sister Fidelma, a seventh-century Irish nun and advocate, investigates a murder at the Synod of Whitby — the first Sister Fidelma novel.", series: { name: "Sister Fidelma", order: 1, total: 33 }, tier: "A", topRank: null },
  { title: "Shroud for the Archbishop", author: "Peter Tremayne", pageCount: 288, genre: "Mystery", publicationDate: "1995-01-01", description: "Sister Fidelma investigates the strangling of the archbishop of Canterbury in seventh-century Rome.", series: { name: "Sister Fidelma", order: 2, total: 33 }, tier: "A", topRank: null },
  { title: "Suffer Little Children", author: "Peter Tremayne", pageCount: 288, genre: "Mystery", publicationDate: "1995-01-01", description: "Fidelma returns to Ireland to investigate the massacre of a settlement of young scholars.", series: { name: "Sister Fidelma", order: 3, total: 33 }, tier: "A", topRank: null },

  { title: "Satan in St. Mary's", author: "Paul Doherty", pageCount: 192, genre: "Mystery", publicationDate: "1986-01-01", description: "Hugh Corbett, a clerk in thirteenth-century London, investigates a priest's murder in a sanctuary church — the first Corbett novel.", series: { name: "Hugh Corbett", order: 1, total: 22 }, tier: "A", topRank: null },
  { title: "Crown in Darkness", author: "Paul Doherty", pageCount: 192, genre: "Mystery", publicationDate: "1988-01-01", description: "Hugh Corbett is sent by Edward I to investigate the death of Alexander III of Scotland.", series: { name: "Hugh Corbett", order: 2, total: 22 }, tier: "A", topRank: null },

  { title: "The Serpent Sword", author: "Matthew Harffy", pageCount: 384, genre: "Historical Fiction", publicationDate: "2015-04-01", description: "A young Anglo-Saxon is pulled into the warband of Oswald of Northumbria in seventh-century Britain.", series: { name: "Bernicia Chronicles", order: 1, total: 12 }, tier: "A", topRank: null },
  { title: "The Cross and the Curse", author: "Matthew Harffy", pageCount: 384, genre: "Historical Fiction", publicationDate: "2016-06-01", description: "Beobrand returns to his Bernician homestead to find Welsh raiders have taken everything.", series: { name: "Bernicia Chronicles", order: 2, total: 12 }, tier: "A", topRank: null },

  // Russian historical
  { title: "Sashenka", author: "Simon Sebag Montefiore", pageCount: 640, genre: "Historical Fiction", publicationDate: "2008-06-24", description: "A revolutionary Jewish girl in 1916 Petrograd becomes a loyal Stalinist whose family is destroyed decades later.", series: null, tier: "A", topRank: null },
  { title: "Red Sky at Noon", author: "Simon Sebag Montefiore", pageCount: 464, genre: "Historical Fiction", publicationDate: "2017-05-18", description: "A Cossack cavalryman in a Soviet shtrafbat penal battalion takes part in a 1942 mission into German-occupied Ukraine.", series: null, tier: "A", topRank: null },

  { title: "Gorky Park", author: "Martin Cruz Smith", pageCount: 384, genre: "Mystery", publicationDate: "1981-04-01", description: "A Moscow detective investigates three corpses found in Gorky Park in the late Brezhnev era.", series: { name: "Arkady Renko", order: 1, total: 10 }, tier: "S", topRank: null },
  { title: "Red Square", author: "Martin Cruz Smith", pageCount: 432, genre: "Mystery", publicationDate: "1992-08-25", description: "Arkady Renko investigates a mob killing in a 1991 Moscow slipping out of Communist control.", series: { name: "Arkady Renko", order: 3, total: 10 }, tier: "A", topRank: null },
  { title: "Havana Bay", author: "Martin Cruz Smith", pageCount: 352, genre: "Mystery", publicationDate: "1999-08-17", description: "Arkady Renko travels to late-nineties Havana to identify a body that may be a Russian friend.", series: { name: "Arkady Renko", order: 4, total: 10 }, tier: "A", topRank: null },

  // Victorian / Edwardian mystery
  { title: "Silent in the Grave", author: "Deanna Raybourn", pageCount: 560, genre: "Mystery", publicationDate: "2007-01-01", description: "A widowed Victorian Englishwoman hires a dark private investigator to prove her husband was murdered — the first Julia Grey novel.", series: { name: "Lady Julia Grey", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "A Curious Beginning", author: "Deanna Raybourn", pageCount: 352, genre: "Mystery", publicationDate: "2015-09-01", description: "Veronica Speedwell, a globe-trotting Victorian lepidopterist, is drawn into a murder plot — the first Veronica Speedwell novel.", series: { name: "Veronica Speedwell", order: 1, total: 10 }, tier: "A", topRank: null },
  { title: "A Sinister Revenge", author: "Deanna Raybourn", pageCount: 336, genre: "Mystery", publicationDate: "2023-03-07", description: "Veronica Speedwell and Stoker investigate an old crime from Stoker's past.", series: { name: "Veronica Speedwell", order: 8, total: 10 }, tier: "A", topRank: null },

  { title: "A Beautiful Blue Death", author: "Charles Finch", pageCount: 320, genre: "Mystery", publicationDate: "2007-06-26", description: "Charles Lenox, an 1860s London gentleman amateur detective, investigates a maid's poisoning — the first Charles Lenox novel.", series: { name: "Charles Lenox", order: 1, total: 14 }, tier: "A", topRank: null },
  { title: "The September Society", author: "Charles Finch", pageCount: 320, genre: "Mystery", publicationDate: "2008-07-08", description: "Lenox investigates a missing Oxford student and a secret society of India veterans.", series: { name: "Charles Lenox", order: 2, total: 14 }, tier: "A", topRank: null },
  { title: "The Fleet Street Murders", author: "Charles Finch", pageCount: 320, genre: "Mystery", publicationDate: "2009-07-07", description: "Two journalists are murdered on the same night Lenox is campaigning for Parliament.", series: { name: "Charles Lenox", order: 3, total: 14 }, tier: "A", topRank: null },

  // Tudor / colonial / crusades
  { title: "Through a Glass Darkly", author: "Karleen Koen", pageCount: 752, genre: "Historical Fiction", publicationDate: "1986-01-01", description: "A fifteen-year-old English girl is married off to an aging French aristocrat in the 1715 court — Koen's sprawling debut.", series: { name: "Tamworth Saga", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Now Face to Face", author: "Karleen Koen", pageCount: 656, genre: "Historical Fiction", publicationDate: "1995-01-01", description: "The sequel to Through a Glass Darkly follows Barbara Devane to colonial Virginia.", series: { name: "Tamworth Saga", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Dark Angels", author: "Karleen Koen", pageCount: 512, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "A prequel set in Charles II's 1670s court, centered on the young grandmother of the Tamworth Saga.", series: { name: "Tamworth Saga", order: 0, total: 3 }, tier: "A", topRank: null },

  { title: "The Road to Jerusalem", author: "Jan Guillou", pageCount: 400, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "A young Swedish nobleman enters a monastery and trains for a vow to become a Templar — the first Crusades Trilogy novel.", series: { name: "Crusades Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Templar Knight", author: "Jan Guillou", pageCount: 464, genre: "Historical Fiction", publicationDate: "1999-01-01", description: "Arn Magnusson takes up arms in the Holy Land in Saladin's era.", series: { name: "Crusades Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Birth of the Kingdom", author: "Jan Guillou", pageCount: 464, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "Arn returns to Sweden and helps found a medieval kingdom — the Crusades Trilogy closes.", series: { name: "Crusades Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Gown", author: "Jennifer Robson", pageCount: 384, genre: "Historical Fiction", publicationDate: "2018-12-31", description: "Two young embroiderers on Princess Elizabeth's 1947 wedding gown and a Canadian granddaughter sixty years later.", series: null, tier: "A", topRank: null },
  { title: "Somewhere in France", author: "Jennifer Robson", pageCount: 400, genre: "Historical Fiction", publicationDate: "2013-12-31", description: "An aristocratic English woman defies her family to serve as a WWI ambulance driver on the Western Front.", series: { name: "Great War", order: 1, total: 3 }, tier: "A", topRank: null },
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

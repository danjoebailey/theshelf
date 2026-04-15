const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Italian noir / literary crime
  { title: "The Goodbye Kiss", author: "Massimo Carlotto", pageCount: 176, genre: "Thriller", publicationDate: "2001-01-01", description: "A former Italian radical returns from exile to Milan and spends his life trying to stay one step ahead of his own past.", series: null, tier: "A", topRank: null },
  { title: "The Master of Knots", author: "Massimo Carlotto", pageCount: 176, genre: "Mystery", publicationDate: "2002-01-01", description: "Carlotto's unlicensed investigator Marco Buratti is hired to track down a woman who has vanished into an S&M subculture.", series: { name: "Alligator", order: 4, total: 6 }, tier: "A", topRank: null },

  { title: "Involuntary Witness", author: "Gianrico Carofiglio", pageCount: 288, genre: "Mystery", publicationDate: "2002-01-01", description: "A Bari defense attorney agrees to represent a Senegalese man accused of murdering a nine-year-old boy — the first Guido Guerrieri novel.", series: { name: "Guido Guerrieri", order: 1, total: 6 }, tier: "S", topRank: null },
  { title: "A Walk in the Dark", author: "Gianrico Carofiglio", pageCount: 256, genre: "Mystery", publicationDate: "2002-01-01", description: "Guerrieri takes on a case that seems to be only about domestic abuse and becomes something much bigger.", series: { name: "Guido Guerrieri", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Reasonable Doubts", author: "Gianrico Carofiglio", pageCount: 304, genre: "Mystery", publicationDate: "2006-01-01", description: "Guerrieri is hired to appeal the conviction of a man he knew in school, who bullied him.", series: { name: "Guido Guerrieri", order: 3, total: 6 }, tier: "A", topRank: null },

  { title: "The Crocodile", author: "Maurizio de Giovanni", pageCount: 320, genre: "Mystery", publicationDate: "2012-01-01", description: "A Neapolitan police inspector named the Bastard hunts a serial killer targeting the children of Camorra bosses.", series: null, tier: "A", topRank: null },
  { title: "By My Hand", author: "Maurizio de Giovanni", pageCount: 288, genre: "Mystery", publicationDate: "2011-01-01", description: "Commissario Ricciardi investigates a Christmas murder in 1930s fascist Naples.", series: { name: "Commissario Ricciardi", order: 5, total: 10 }, tier: "A", topRank: null },

  // French neo-polar
  { title: "The Prone Gunman", author: "Jean-Patrick Manchette", pageCount: 160, genre: "Thriller", publicationDate: "1981-01-01", description: "A retired French hit man tries to collect his final payment and escape into a peaceful retirement — the canonical neo-polar thriller.", series: null, tier: "S", topRank: null },
  { title: "Fatale", author: "Jean-Patrick Manchette", pageCount: 112, genre: "Thriller", publicationDate: "1977-01-01", description: "A female assassin arrives in a French provincial town and goes to work. NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Three to Kill", author: "Jean-Patrick Manchette", pageCount: 176, genre: "Thriller", publicationDate: "1976-01-01", description: "A French businessman witnesses a murder on a country road and is gradually hunted into becoming a killer himself.", series: null, tier: "A", topRank: null },

  { title: "Rough Trade", author: "Dominique Manotti", pageCount: 256, genre: "Thriller", publicationDate: "1995-01-01", description: "A Paris inspector investigates the murder of a Thai boy found in the garment district — Manotti's debut.", series: null, tier: "S", topRank: null },
  { title: "Affairs of State", author: "Dominique Manotti", pageCount: 320, genre: "Thriller", publicationDate: "2001-01-01", description: "A Mitterrand-era French political thriller of arms trading, prostitutes, and the socialist government.", series: null, tier: "A", topRank: null },
  { title: "Escape", author: "Dominique Manotti", pageCount: 224, genre: "Thriller", publicationDate: "2013-01-01", description: "An escaped Italian Red Brigades prisoner tries to write a novel about his captivity in 1980s Paris.", series: null, tier: "A", topRank: null },

  { title: "The Crimson Rivers", author: "Jean-Christophe Grangé", pageCount: 384, genre: "Thriller", publicationDate: "1998-01-01", description: "A Paris inspector and an Alpine cop investigate two murders that seem to be connected by a decades-old genetic experiment.", series: null, tier: "A", topRank: null },
  { title: "The Empire of the Wolves", author: "Jean-Christophe Grangé", pageCount: 448, genre: "Thriller", publicationDate: "2003-01-01", description: "A young French woman with amnesia has her face transformed by Turkish gangsters — and the novel digs into why.", series: null, tier: "A", topRank: null },

  // Nordic noir (more)
  { title: "I'm Traveling Alone", author: "Samuel Bjørk", pageCount: 464, genre: "Thriller", publicationDate: "2013-01-01", description: "Two Oslo detectives investigate the kidnapping and ritual killing of a six-year-old girl.", series: { name: "Mia Krüger", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "The Owl Always Hunts at Night", author: "Samuel Bjørk", pageCount: 448, genre: "Thriller", publicationDate: "2015-01-01", description: "Mia Krüger returns to investigate the body of a seventeen-year-old girl found in a forest ritual circle.", series: { name: "Mia Krüger", order: 2, total: 4 }, tier: "A", topRank: null },

  { title: "1222", author: "Anne Holt", pageCount: 304, genre: "Mystery", publicationDate: "2007-01-01", description: "A train derails in a Norwegian mountain blizzard and a retired detective solves a locked-hotel murder among the stranded passengers.", series: { name: "Hanne Wilhelmsen", order: 8, total: 10 }, tier: "A", topRank: null },
  { title: "Punishment", author: "Anne Holt", pageCount: 368, genre: "Mystery", publicationDate: "2001-01-01", description: "An Oslo child killer reappears after a decade and the retired detective Hanne Wilhelmsen is pulled back into the case.", series: null, tier: "A", topRank: null },

  { title: "Where Roses Never Die", author: "Gunnar Staalesen", pageCount: 288, genre: "Mystery", publicationDate: "2012-01-01", description: "A Bergen private investigator is hired to solve a cold case of a three-year-old girl's disappearance twenty-five years ago.", series: { name: "Varg Veum", order: 19, total: 22 }, tier: "A", topRank: null },
  { title: "We Shall Inherit the Wind", author: "Gunnar Staalesen", pageCount: 320, genre: "Mystery", publicationDate: "2010-01-01", description: "Varg Veum investigates the murder of an oil company security consultant on a remote coastal Norwegian wind farm.", series: { name: "Varg Veum", order: 18, total: 22 }, tier: "A", topRank: null },

  { title: "The Bomber", author: "Liza Marklund", pageCount: 448, genre: "Thriller", publicationDate: "1998-01-01", description: "A Stockholm crime reporter investigates a series of bombings at the 2004 Olympics construction sites.", series: { name: "Annika Bengtzon", order: 8, total: 11 }, tier: "A", topRank: null },
  { title: "Red Wolf", author: "Liza Marklund", pageCount: 448, genre: "Thriller", publicationDate: "2003-01-01", description: "Annika Bengtzon investigates an old terror case in the Norrland that connects to a contemporary journalist's murder.", series: { name: "Annika Bengtzon", order: 5, total: 11 }, tier: "A", topRank: null },

  { title: "The Healer", author: "Antti Tuomainen", pageCount: 208, genre: "Thriller", publicationDate: "2010-01-01", description: "In a climate-ravaged near-future Helsinki, a poet searches for his missing journalist wife — who was investigating an eco-terrorist.", series: null, tier: "A", topRank: null },
  { title: "The Rabbit Factor", author: "Antti Tuomainen", pageCount: 336, genre: "Thriller", publicationDate: "2020-01-01", description: "A Helsinki actuary inherits an adventure park whose finances have been tangled up with the Finnish underworld.", series: { name: "Rabbit Factor", order: 1, total: 3 }, tier: "A", topRank: null },

  { title: "Dregs", author: "Jørn Lier Horst", pageCount: 336, genre: "Mystery", publicationDate: "2010-01-01", description: "A Norwegian homicide detective investigates when severed feet in shoes start washing up on the Vestfold coast.", series: { name: "William Wisting", order: 6, total: 14 }, tier: "A", topRank: null },
  { title: "Closed for Winter", author: "Jørn Lier Horst", pageCount: 320, genre: "Mystery", publicationDate: "2011-01-01", description: "The murder of a man in a burgled summer house pulls Wisting into a decades-old disappearance.", series: { name: "William Wisting", order: 7, total: 14 }, tier: "A", topRank: null },

  // Contemporary noir / literary crossover
  { title: "Walking the Perfect Square", author: "Reed Farrel Coleman", pageCount: 288, genre: "Mystery", publicationDate: "2001-01-01", description: "A Brooklyn ex-cop turned private investigator takes on a twenty-year-old missing persons case — the first Moe Prager novel.", series: { name: "Moe Prager", order: 1, total: 9 }, tier: "A", topRank: null },
  { title: "Where It Hurts", author: "Reed Farrel Coleman", pageCount: 352, genre: "Mystery", publicationDate: "2016-01-01", description: "A retired Long Island cop haunted by his son's death is asked by a petty criminal to investigate the murder of the man's own son.", series: { name: "Gus Murphy", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "What You Break", author: "Reed Farrel Coleman", pageCount: 368, genre: "Mystery", publicationDate: "2017-01-01", description: "Gus Murphy investigates two seemingly unrelated murders in suburban Long Island.", series: { name: "Gus Murphy", order: 2, total: 5 }, tier: "A", topRank: null },

  { title: "The Ranger", author: "Ace Atkins", pageCount: 384, genre: "Mystery", publicationDate: "2011-01-01", description: "A Mississippi Army Ranger comes home to investigate his uncle's supposed suicide — the first Quinn Colson novel.", series: { name: "Quinn Colson", order: 1, total: 12 }, tier: "A", topRank: null },
  { title: "Wicked City", author: "Ace Atkins", pageCount: 336, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "A 1955 Alabama veteran tries to clean up Phenix City — Atkins's canonical historical crime novel.", series: null, tier: "A", topRank: null },
  { title: "White Shadow", author: "Ace Atkins", pageCount: 400, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "A 1955 Tampa newspaperman investigates the murder of the Cuban boss who once ran the city's Ybor cigar district.", series: null, tier: "A", topRank: null },

  { title: "Under the Harrow", author: "Flynn Berry", pageCount: 240, genre: "Thriller", publicationDate: "2016-06-14", description: "A London woman arrives in her sister's small English village for a visit and finds her sister dead in a brutal attack.", series: null, tier: "A", topRank: null },
  { title: "A Double Life", author: "Flynn Berry", pageCount: 272, genre: "Thriller", publicationDate: "2018-07-31", description: "A London doctor is the daughter of a notorious fugitive aristocrat who murdered his family's nanny decades ago — and may have come back.", series: null, tier: "A", topRank: null },

  { title: "Invisible City", author: "Julia Dahl", pageCount: 320, genre: "Mystery", publicationDate: "2014-05-06", description: "A New York crime reporter investigates the death of an ultra-Orthodox Hasidic woman — and confronts her own estranged Hasidic mother.", series: { name: "Rebekah Roberts", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Run You Down", author: "Julia Dahl", pageCount: 304, genre: "Mystery", publicationDate: "2015-06-30", description: "Rebekah Roberts takes a case in an upstate Hasidic community and slowly untangles its hidden violence.", series: { name: "Rebekah Roberts", order: 2, total: 4 }, tier: "A", topRank: null },

  { title: "November Road", author: "Lou Berney", pageCount: 320, genre: "Historical Fiction", publicationDate: "2018-10-09", description: "A New Orleans mob courier flees with a young woman and her children in the days after the JFK assassination. Barry Award winner.", series: null, tier: "S", topRank: null },
  { title: "Dark Ride", author: "Lou Berney", pageCount: 304, genre: "Thriller", publicationDate: "2023-10-24", description: "An amusement park greeter in Oklahoma City accidentally notices two abused children and tries to save them.", series: null, tier: "A", topRank: null },

  { title: "Your House Will Pay", author: "Steph Cha", pageCount: 320, genre: "Thriller", publicationDate: "2019-10-15", description: "A Korean American family in Los Angeles and a Black family scarred by the 1992 riots find their lives colliding decades later.", series: null, tier: "S", topRank: null },

  // Literary thriller crossover
  { title: "Our House", author: "Louise Candlish", pageCount: 416, genre: "Thriller", publicationDate: "2018-04-05", description: "A London woman comes home to find strangers moving into her house — and her husband and the deed to the property both missing.", series: null, tier: "A", topRank: null },
  { title: "The Other Passenger", author: "Louise Candlish", pageCount: 400, genre: "Thriller", publicationDate: "2020-06-11", description: "A London man's commuter friend from the Thames riverbus disappears and he becomes the chief suspect.", series: null, tier: "A", topRank: null },
  { title: "Those People", author: "Louise Candlish", pageCount: 400, genre: "Thriller", publicationDate: "2019-05-30", description: "A London neighborhood is turned upside down when a new couple moves in next door — and one of them dies.", series: null, tier: "A", topRank: null },

  { title: "Apple Tree Yard", author: "Louise Doughty", pageCount: 336, genre: "Thriller", publicationDate: "2013-05-30", description: "A respectable English geneticist begins an affair with a man she meets at the Houses of Parliament and ends up on trial for murder.", series: null, tier: "S", topRank: null },
  { title: "Platform Seven", author: "Louise Doughty", pageCount: 416, genre: "Thriller", publicationDate: "2019-08-22", description: "A woman watches a suicide on a Peterborough railway platform at 4 a.m. and slowly realizes she too is dead.", series: null, tier: "A", topRank: null },
  { title: "Black Water", author: "Louise Doughty", pageCount: 368, genre: "Thriller", publicationDate: "2016-06-02", description: "A Dutch-Indonesian fixer hiding in a Bali hut reconstructs the political killings he facilitated decades earlier.", series: null, tier: "A", topRank: null },

  // Cozy / traditional mystery series
  { title: "Maisie Dobbs", author: "Jacqueline Winspear", pageCount: 304, genre: "Mystery", publicationDate: "2003-06-01", description: "A young woman who served as a WWI nurse opens a private investigation practice in 1929 London — the first Maisie Dobbs novel.", series: { name: "Maisie Dobbs", order: 1, total: 18 }, tier: "A", topRank: null },
  { title: "Birds of a Feather", author: "Jacqueline Winspear", pageCount: 320, genre: "Mystery", publicationDate: "2004-06-01", description: "Maisie Dobbs is hired to find a wealthy grocer's runaway daughter in 1930 London.", series: { name: "Maisie Dobbs", order: 2, total: 18 }, tier: "A", topRank: null },
  { title: "Pardonable Lies", author: "Jacqueline Winspear", pageCount: 352, genre: "Mystery", publicationDate: "2005-07-01", description: "Maisie Dobbs accepts a case investigating a dead WWI pilot and the rumor that he may not be dead after all.", series: { name: "Maisie Dobbs", order: 3, total: 18 }, tier: "A", topRank: null },

  { title: "When the Bough Breaks", author: "Jonathan Kellerman", pageCount: 400, genre: "Mystery", publicationDate: "1985-01-01", description: "A Los Angeles child psychologist named Alex Delaware is pulled into the investigation of a double murder — Kellerman's canonical debut.", series: { name: "Alex Delaware", order: 1, total: 38 }, tier: "A", topRank: null },
  { title: "Blood Test", author: "Jonathan Kellerman", pageCount: 384, genre: "Mystery", publicationDate: "1986-01-01", description: "Alex Delaware investigates the abduction of a terminally ill child from a Los Angeles hospital.", series: { name: "Alex Delaware", order: 2, total: 38 }, tier: "A", topRank: null },
  { title: "Silent Partner", author: "Jonathan Kellerman", pageCount: 432, genre: "Mystery", publicationDate: "1989-01-01", description: "An old lover of Alex Delaware's is found dead and he investigates the years he thought he knew her.", series: { name: "Alex Delaware", order: 4, total: 38 }, tier: "A", topRank: null },
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

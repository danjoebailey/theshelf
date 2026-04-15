const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Girl with a Pearl Earring", author: "Tracy Chevalier", pageCount: 256, genre: "Historical Fiction", publicationDate: "1999-11-02", description: "A Dutch maid in Vermeer's seventeenth-century Delft household becomes the model for one of the great paintings of the world.", series: null, tier: "S", topRank: null },
  { title: "The Virgin Blue", author: "Tracy Chevalier", pageCount: 336, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "An American woman researching her French Huguenot ancestors in 1990s France discovers a family secret across four centuries.", series: null, tier: "A", topRank: null },
  { title: "Falling Angels", author: "Tracy Chevalier", pageCount: 336, genre: "Historical Fiction", publicationDate: "2001-09-18", description: "Two Edwardian London families are joined when their mothers meet at adjoining graves in Highgate Cemetery.", series: null, tier: "A", topRank: null },
  { title: "Remarkable Creatures", author: "Tracy Chevalier", pageCount: 320, genre: "Historical Fiction", publicationDate: "2009-08-11", description: "Mary Anning, the nineteenth-century Lyme Regis fossil hunter, and the spinster who became her friend.", series: null, tier: "A", topRank: null },

  { title: "March Violets", author: "Philip Kerr", pageCount: 256, genre: "Mystery", publicationDate: "1989-01-01", description: "Bernie Gunther, a 1936 Berlin private eye, is hired to investigate a double murder that leads into the Nazi elite. The first Bernie Gunther novel.", series: { name: "Bernie Gunther", order: 1, total: 14 }, tier: "S", topRank: null },
  { title: "The Pale Criminal", author: "Philip Kerr", pageCount: 288, genre: "Mystery", publicationDate: "1990-01-01", description: "Bernie Gunther is drafted back into the Kripo to investigate a series of killings of Aryan girls in 1938 Berlin.", series: { name: "Bernie Gunther", order: 2, total: 14 }, tier: "S", topRank: null },
  { title: "A German Requiem", author: "Philip Kerr", pageCount: 336, genre: "Mystery", publicationDate: "1991-01-01", description: "Bernie Gunther travels from ruined 1947 Berlin to Vienna to clear an old friend accused of murdering an American army officer.", series: { name: "Bernie Gunther", order: 3, total: 14 }, tier: "S", topRank: null },
  { title: "Prague Fatale", author: "Philip Kerr", pageCount: 416, genre: "Mystery", publicationDate: "2011-10-04", description: "Bernie Gunther is sent to Heydrich's country house in 1941 Prague and becomes the detective investigating a locked-room murder.", series: { name: "Bernie Gunther", order: 8, total: 14 }, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Roman / ancient military historical
  { title: "Wounds of Honour", author: "Anthony Riches", pageCount: 400, genre: "Historical Fiction", publicationDate: "2009-07-09", description: "A fugitive Roman nobleman joins a Tungrian auxiliary cohort on Hadrian's Wall — the first Empire novel.", series: { name: "Empire", order: 1, total: 13 }, tier: "A", topRank: null },
  { title: "Arrows of Fury", author: "Anthony Riches", pageCount: 400, genre: "Historical Fiction", publicationDate: "2010-07-08", description: "Marcus and the Tungrians face a Syrian cohort's arrows as the northern war rages on.", series: { name: "Empire", order: 2, total: 13 }, tier: "A", topRank: null },
  { title: "Fortress of Spears", author: "Anthony Riches", pageCount: 400, genre: "Historical Fiction", publicationDate: "2011-07-07", description: "Marcus and the Tungrians march to reinforce a fortress besieged by Votadini tribes.", series: { name: "Empire", order: 3, total: 13 }, tier: "A", topRank: null },

  { title: "Killer of Men", author: "Christian Cameron", pageCount: 464, genre: "Historical Fiction", publicationDate: "2010-08-05", description: "A young Plataean boy becomes a bronzesmith's slave in Ephesus and rises through the Persian Wars — the first Long War novel.", series: { name: "The Long War", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Marathon", author: "Christian Cameron", pageCount: 480, genre: "Historical Fiction", publicationDate: "2011-02-03", description: "Arimnestos of Plataea returns home to fight in the battle that saved Athens from Persia.", series: { name: "The Long War", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "Poseidon's Spear", author: "Christian Cameron", pageCount: 544, genre: "Historical Fiction", publicationDate: "2012-08-02", description: "The Long War continues with Arimnestos shipwrecked and trying to get home.", series: { name: "The Long War", order: 3, total: 7 }, tier: "A", topRank: null },

  { title: "Boudica: Dreaming the Eagle", author: "M.C. Scott", pageCount: 576, genre: "Historical Fiction", publicationDate: "2003-01-01", description: "The childhood and training of Boudica, the Iceni warrior queen who nearly broke Roman Britain.", series: { name: "Boudica", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "Rome: The Emperor's Spy", author: "M.C. Scott", pageCount: 416, genre: "Historical Fiction", publicationDate: "2010-01-07", description: "A Roman spy is sent by Seneca into Alexandria to investigate the Christian plot to burn Rome.", series: { name: "Rome", order: 1, total: 5 }, tier: "A", topRank: null },

  { title: "Brethren", author: "Robyn Young", pageCount: 576, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "A young Knight Templar in the Crusader kingdom of Jerusalem is drawn into a shadow war over a stolen book.", series: { name: "Brethren Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Crusade", author: "Robyn Young", pageCount: 608, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "Will Campbell of the Brethren faces the Mamluks and a shadow faction inside his own Order.", series: { name: "Brethren Trilogy", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Requiem", author: "Robyn Young", pageCount: 592, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "The Brethren Trilogy closes with the fall of Acre and the French king's moves against the Templars.", series: { name: "Brethren Trilogy", order: 3, total: 3 }, tier: "A", topRank: null },

  // Naval / nautical historical
  { title: "To Glory We Steer", author: "Alexander Kent", pageCount: 384, genre: "Historical Fiction", publicationDate: "1968-01-01", description: "Captain Richard Bolitho takes command of HMS Phalarope in the American Revolutionary War — the first Bolitho novel.", series: { name: "Bolitho", order: 6, total: 28 }, tier: "A", topRank: null },
  { title: "Form Line of Battle", author: "Alexander Kent", pageCount: 384, genre: "Historical Fiction", publicationDate: "1969-01-01", description: "Bolitho takes command of the Hyperion as the French Revolution drags Britain into war.", series: { name: "Bolitho", order: 9, total: 28 }, tier: "A", topRank: null },
  { title: "Enemy in Sight!", author: "Alexander Kent", pageCount: 384, genre: "Historical Fiction", publicationDate: "1970-01-01", description: "Bolitho returns to England after the West Indies station and is sent back into French-contested waters.", series: { name: "Bolitho", order: 11, total: 28 }, tier: "A", topRank: null },

  { title: "Kydd", author: "Julian Stockwin", pageCount: 384, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "A young wig-maker is press-ganged into the Royal Navy in 1793 and begins his rise — the first Kydd novel.", series: { name: "Kydd", order: 1, total: 25 }, tier: "A", topRank: null },
  { title: "Artemis", author: "Julian Stockwin", pageCount: 416, genre: "Historical Fiction", publicationDate: "2002-01-01", description: "Kydd's ship circumnavigates the globe as Britain's war against Revolutionary France continues.", series: { name: "Kydd", order: 2, total: 25 }, tier: "A", topRank: null },

  // British historical
  { title: "The Lady Elizabeth", author: "Alison Weir", pageCount: 512, genre: "Historical Fiction", publicationDate: "2008-03-25", description: "The young Elizabeth Tudor's early life from her mother's execution through her ascent to the throne.", series: null, tier: "A", topRank: null },
  { title: "Innocent Traitor", author: "Alison Weir", pageCount: 416, genre: "Historical Fiction", publicationDate: "2006-02-07", description: "Weir's novelization of the nine-day reign and execution of Lady Jane Grey.", series: null, tier: "A", topRank: null },
  { title: "The Captive Queen", author: "Alison Weir", pageCount: 496, genre: "Historical Fiction", publicationDate: "2010-07-27", description: "Eleanor of Aquitaine's marriage to Henry II of England and her years of imprisonment by him.", series: null, tier: "A", topRank: null },

  { title: "The Birth of Venus", author: "Sarah Dunant", pageCount: 416, genre: "Historical Fiction", publicationDate: "2003-04-08", description: "A young Florentine noblewoman becomes entangled with a painter in her father's household as Savonarola's monks take over the city.", series: null, tier: "S", topRank: null },
  { title: "In the Company of the Courtesan", author: "Sarah Dunant", pageCount: 384, genre: "Historical Fiction", publicationDate: "2006-02-14", description: "A renowned Venetian courtesan and her dwarf companion flee the sack of Rome in 1527.", series: null, tier: "A", topRank: null },
  { title: "Sacred Hearts", author: "Sarah Dunant", pageCount: 432, genre: "Historical Fiction", publicationDate: "2009-07-14", description: "A rebellious young noblewoman is sent to a sixteenth-century Ferrara convent against her will.", series: null, tier: "A", topRank: null },

  { title: "Lemprière's Dictionary", author: "Lawrence Norfolk", pageCount: 512, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A young scholar compiling a classical dictionary in late eighteenth-century London is drawn into an ancient conspiracy.", series: null, tier: "S", topRank: null },
  { title: "The Pope's Rhinoceros", author: "Lawrence Norfolk", pageCount: 608, genre: "Historical Fiction", publicationDate: "1996-01-01", description: "A sixteenth-century Baltic monastic quest to bring a rhinoceros to the pope, woven through papal politics and Portuguese trade.", series: null, tier: "A", topRank: null },

  { title: "A Close Run Thing", author: "Allan Mallinson", pageCount: 400, genre: "Historical Fiction", publicationDate: "1999-01-01", description: "A young British light dragoon at Waterloo begins the Matthew Hervey cavalry series.", series: { name: "Matthew Hervey", order: 1, total: 14 }, tier: "A", topRank: null },
  { title: "The Nizam's Daughters", author: "Allan Mallinson", pageCount: 384, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "Matthew Hervey's regiment is posted to Hindoostan in the second novel of the series.", series: { name: "Matthew Hervey", order: 2, total: 14 }, tier: "A", topRank: null },

  // Historical thriller
  { title: "Zoo Station", author: "David Downing", pageCount: 304, genre: "Historical Fiction", publicationDate: "2007-06-01", description: "An English journalist in 1939 Berlin is recruited as an Allied spy — the first John Russell / Station novel.", series: { name: "Station", order: 1, total: 6 }, tier: "S", topRank: null },
  { title: "Silesian Station", author: "David Downing", pageCount: 320, genre: "Historical Fiction", publicationDate: "2008-05-01", description: "John Russell returns to Berlin in 1939 just before the invasion of Poland.", series: { name: "Station", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Stettin Station", author: "David Downing", pageCount: 320, genre: "Historical Fiction", publicationDate: "2009-05-01", description: "John Russell struggles to get his German-Jewish family out of late-1941 Berlin.", series: { name: "Station", order: 3, total: 6 }, tier: "A", topRank: null },

  { title: "The American Boy", author: "Andrew Taylor", pageCount: 560, genre: "Historical Fiction", publicationDate: "2003-10-09", description: "A Regency schoolmaster in London takes on a young American pupil named Edgar Allan Poe and is pulled into a murder.", series: null, tier: "A", topRank: null },
  { title: "The Ashes of London", author: "Andrew Taylor", pageCount: 464, genre: "Historical Fiction", publicationDate: "2016-04-07", description: "Two investigators probe a murder in the ruins of the 1666 Great Fire of London.", series: { name: "Marwood and Lovett", order: 1, total: 7 }, tier: "A", topRank: null },

  // Women historical (classic)
  { title: "Katherine", author: "Anya Seton", pageCount: 592, genre: "Historical Fiction", publicationDate: "1954-01-01", description: "The fourteenth-century life of Katherine Swynford, mistress and eventual wife of John of Gaunt — Seton's canonical historical romance.", series: null, tier: "S", topRank: null },
  { title: "Green Darkness", author: "Anya Seton", pageCount: 624, genre: "Historical Fiction", publicationDate: "1972-01-01", description: "A contemporary English wife's crisis is revealed to be a reincarnation of a Tudor-era scandal.", series: null, tier: "A", topRank: null },
  { title: "Dragonwyck", author: "Anya Seton", pageCount: 352, genre: "Historical Fiction", publicationDate: "1944-01-01", description: "A young Connecticut farm girl in 1844 is summoned to the Hudson Valley estate of her wealthy distant cousin.", series: null, tier: "A", topRank: null },

  { title: "America's First Daughter", author: "Stephanie Dray", pageCount: 624, genre: "Historical Fiction", publicationDate: "2016-03-01", description: "Martha Jefferson Randolph, Thomas Jefferson's daughter, across her life as her father's confidant and protector.", series: null, tier: "A", topRank: null },
  { title: "My Dear Hamilton", author: "Stephanie Dray", pageCount: 672, genre: "Historical Fiction", publicationDate: "2018-04-03", description: "Eliza Schuyler Hamilton across a long life of revolution, marriage, and memorial.", series: null, tier: "A", topRank: null },

  { title: "Lilac Girls", author: "Martha Hall Kelly", pageCount: 496, genre: "Historical Fiction", publicationDate: "2016-04-05", description: "A New York socialite, a Polish Ravensbrück prisoner, and a German surgeon converge across decades of WWII and postwar history.", series: { name: "Woolsey-Ferriday", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Lost Roses", author: "Martha Hall Kelly", pageCount: 448, genre: "Historical Fiction", publicationDate: "2019-04-09", description: "The prequel follows Caroline Ferriday's mother and a Russian émigré during the Russian Revolution.", series: { name: "Woolsey-Ferriday", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "Sunflower Sisters", author: "Martha Hall Kelly", pageCount: 528, genre: "Historical Fiction", publicationDate: "2021-03-30", description: "The final Woolsey-Ferriday book follows Caroline Ferriday's Union nurse ancestor through the Civil War.", series: { name: "Woolsey-Ferriday", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Ashford Affair", author: "Lauren Willig", pageCount: 432, genre: "Historical Fiction", publicationDate: "2013-04-09", description: "A contemporary New York lawyer uncovers her grandmother's 1920s Kenyan colonial love triangle.", series: null, tier: "A", topRank: null },
  { title: "The English Wife", author: "Lauren Willig", pageCount: 416, genre: "Historical Fiction", publicationDate: "2018-01-09", description: "A Gilded Age Hudson Valley society wife is murdered and her sister-in-law investigates.", series: null, tier: "A", topRank: null },

  // Recent historical literary
  { title: "Hotel on the Corner of Bitter and Sweet", author: "Jamie Ford", pageCount: 304, genre: "Historical Fiction", publicationDate: "2009-01-27", description: "A Chinese American boy in 1940s Seattle falls in love with a Japanese American girl before her family is interned.", series: null, tier: "A", topRank: null },
  { title: "Love and Other Consolation Prizes", author: "Jamie Ford", pageCount: 320, genre: "Historical Fiction", publicationDate: "2017-09-12", description: "A Chinese American boy is raffled off as a prize at the 1909 Seattle World's Fair.", series: null, tier: "A", topRank: null },

  { title: "One Thousand White Women", author: "Jim Fergus", pageCount: 432, genre: "Historical Fiction", publicationDate: "1998-05-05", description: "A nineteenth-century American woman is married off to a Cheyenne chief as part of a secret government program.", series: { name: "One Thousand White Women", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "The Wild Rose", author: "Jim Fergus", pageCount: 528, genre: "Historical Fiction", publicationDate: "2020-01-07", description: "The One Thousand White Women sequel continues May Dodd's story and its echoes into later generations.", series: { name: "One Thousand White Women", order: 2, total: 3 }, tier: "A", topRank: null },

  { title: "Little Bee", author: "Chris Cleave", pageCount: 288, genre: "Fiction", publicationDate: "2008-08-07", description: "A Nigerian asylum seeker in England is reunited with the English couple who met her on a Nigerian beach years earlier.", series: null, tier: "S", topRank: null },
  { title: "Everyone Brave Is Forgiven", author: "Chris Cleave", pageCount: 432, genre: "Historical Fiction", publicationDate: "2016-05-03", description: "A young woman in 1939 London signs up for the war effort and is sent to teach children who were not evacuated.", series: null, tier: "A", topRank: null },

  { title: "City of Thieves", author: "David Benioff", pageCount: 272, genre: "Historical Fiction", publicationDate: "2008-05-15", description: "Two young men in besieged Leningrad are sent into German-occupied territory to find a dozen eggs for a Soviet colonel's daughter's wedding cake.", series: null, tier: "S", topRank: null },
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

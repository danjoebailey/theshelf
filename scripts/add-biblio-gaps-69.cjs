const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Daughters of Mars", author: "Thomas Keneally", pageCount: 528, genre: "Historical Fiction", publicationDate: "2012-01-01", description: "Two Australian nurse sisters serve in WWI from Gallipoli through the Western Front.", series: null, tier: "A", topRank: null },
  { title: "The People's Train", author: "Thomas Keneally", pageCount: 432, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "A Russian revolutionary exiled in early-twentieth-century Brisbane is drawn back to Petrograd at the eve of revolution.", series: null, tier: "A", topRank: null },

  { title: "Legs", author: "William Kennedy", pageCount: 320, genre: "Historical Fiction", publicationDate: "1975-01-01", description: "Jack 'Legs' Diamond, the Prohibition-era Albany gangster, told by his lawyer — the first of Kennedy's Albany cycle.", series: { name: "Albany Cycle", order: 1, total: 8 }, tier: "A", topRank: null },
  { title: "Roscoe", author: "William Kennedy", pageCount: 320, genre: "Historical Fiction", publicationDate: "2002-01-01", description: "A 1945 Albany political fixer navigates the post-war end of the Democratic machine.", series: { name: "Albany Cycle", order: 6, total: 8 }, tier: "A", topRank: null },

  { title: "The Killer Angels", author: "Michael Shaara", pageCount: 400, genre: "Historical Fiction", publicationDate: "1974-01-01", description: "The Battle of Gettysburg from the perspectives of its Union and Confederate officers. Pulitzer Prize winner.", series: null, tier: "S", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Ancient world
  { title: "Roman Blood", author: "Steven Saylor", pageCount: 368, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "Gordianus the Finder investigates the murder trial that made Cicero's career — the first Roma Sub Rosa novel.", series: { name: "Roma Sub Rosa", order: 1, total: 13 }, tier: "A", topRank: null },
  { title: "Arms of Nemesis", author: "Steven Saylor", pageCount: 320, genre: "Historical Fiction", publicationDate: "1992-01-01", description: "Gordianus investigates a death at Crassus's villa as Spartacus's slave army approaches.", series: { name: "Roma Sub Rosa", order: 2, total: 13 }, tier: "A", topRank: null },
  { title: "Catilina's Riddle", author: "Steven Saylor", pageCount: 432, genre: "Historical Fiction", publicationDate: "1993-01-01", description: "Gordianus retires to the countryside and is drawn into the Catilinarian conspiracy.", series: { name: "Roma Sub Rosa", order: 3, total: 13 }, tier: "A", topRank: null },

  { title: "The Beacon at Alexandria", author: "Gillian Bradshaw", pageCount: 448, genre: "Historical Fiction", publicationDate: "1986-01-01", description: "A young late-Roman woman disguises herself as a eunuch to study medicine in fourth-century Alexandria.", series: null, tier: "A", topRank: null },
  { title: "Island of Ghosts", author: "Gillian Bradshaw", pageCount: 368, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "A Sarmatian prince and his cavalry are posted to Hadrian's Wall by the Romans.", series: null, tier: "A", topRank: null },
  { title: "Imperial Purple", author: "Gillian Bradshaw", pageCount: 352, genre: "Historical Fiction", publicationDate: "1988-01-01", description: "A Tyrian weaver in the fifth-century eastern Roman empire is drawn into an imperial plot after weaving a purple cloak.", series: null, tier: "A", topRank: null },

  { title: "Spartacus", author: "Howard Fast", pageCount: 384, genre: "Historical Fiction", publicationDate: "1951-01-01", description: "Fast's canonical novel of the Thracian gladiator's slave revolt against Rome.", series: null, tier: "S", topRank: null },
  { title: "Moses", author: "Howard Fast", pageCount: 320, genre: "Historical Fiction", publicationDate: "1958-01-01", description: "Fast's life of Moses from his Egyptian upbringing through the Exodus.", series: null, tier: "A", topRank: null },
  { title: "Citizen Tom Paine", author: "Howard Fast", pageCount: 320, genre: "Historical Fiction", publicationDate: "1943-01-01", description: "A novelized life of the American revolutionary pamphleteer.", series: null, tier: "A", topRank: null },

  // Historical crime
  { title: "Dissolution", author: "C.J. Sansom", pageCount: 480, genre: "Mystery", publicationDate: "2003-01-01", description: "Matthew Shardlake, a hunchbacked Tudor lawyer, is sent by Thomas Cromwell to investigate a murder at a monastery about to be dissolved. The first Shardlake novel.", series: { name: "Shardlake", order: 1, total: 7 }, tier: "S", topRank: null },
  { title: "Dark Fire", author: "C.J. Sansom", pageCount: 528, genre: "Mystery", publicationDate: "2004-01-01", description: "Shardlake is tasked with finding the legendary Greek fire as Thomas Cromwell falls from grace.", series: { name: "Shardlake", order: 2, total: 7 }, tier: "S", topRank: null },
  { title: "Sovereign", author: "C.J. Sansom", pageCount: 672, genre: "Mystery", publicationDate: "2006-01-01", description: "Shardlake travels with the royal progress to York to question a conspirator for Henry VIII.", series: { name: "Shardlake", order: 3, total: 7 }, tier: "A", topRank: null },
  { title: "Revelation", author: "C.J. Sansom", pageCount: 560, genre: "Mystery", publicationDate: "2008-01-01", description: "Shardlake investigates a religious serial killer in Henry VIII's final years.", series: { name: "Shardlake", order: 4, total: 7 }, tier: "A", topRank: null },

  { title: "Instruments of Darkness", author: "Imogen Robertson", pageCount: 480, genre: "Mystery", publicationDate: "2009-01-01", description: "A Sussex anatomist and a local gentlewoman investigate a body found on her estate in 1780 — the first Crowther and Westerman novel.", series: { name: "Crowther and Westerman", order: 1, total: 5 }, tier: "A", topRank: null },
  { title: "Anatomy of Murder", author: "Imogen Robertson", pageCount: 432, genre: "Mystery", publicationDate: "2010-01-01", description: "Crowther and Westerman take on a London murder tied to French spies during the American war.", series: { name: "Crowther and Westerman", order: 2, total: 5 }, tier: "A", topRank: null },

  { title: "Mistress of the Art of Death", author: "Ariana Franklin", pageCount: 400, genre: "Mystery", publicationDate: "2007-01-01", description: "A twelfth-century Sicilian-trained female anatomist is sent to Cambridge to investigate the murders of children.", series: { name: "Adelia Aguilar", order: 1, total: 4 }, tier: "S", topRank: null },
  { title: "The Serpent's Tale", author: "Ariana Franklin", pageCount: 400, genre: "Mystery", publicationDate: "2008-01-01", description: "Adelia Aguilar is summoned by Henry II to investigate the death of Fair Rosamund.", series: { name: "Adelia Aguilar", order: 2, total: 4 }, tier: "A", topRank: null },
  { title: "Grave Goods", author: "Ariana Franklin", pageCount: 384, genre: "Mystery", publicationDate: "2009-01-01", description: "Adelia examines the bones supposedly belonging to King Arthur and Guinevere at Glastonbury.", series: { name: "Adelia Aguilar", order: 3, total: 4 }, tier: "A", topRank: null },

  { title: "Heresy", author: "S.J. Parris", pageCount: 416, genre: "Mystery", publicationDate: "2010-01-01", description: "The renegade monk Giordano Bruno arrives at Oxford in 1583 and is pulled into a Catholic conspiracy against Elizabeth I.", series: { name: "Giordano Bruno", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Prophecy", author: "S.J. Parris", pageCount: 432, genre: "Mystery", publicationDate: "2011-01-01", description: "Bruno investigates a courtier's murder in Elizabeth I's palace as an occult Catholic plot unfolds.", series: { name: "Giordano Bruno", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "Sacrilege", author: "S.J. Parris", pageCount: 432, genre: "Mystery", publicationDate: "2012-01-01", description: "Bruno travels to Canterbury on the trail of a former lover who has been accused of murder.", series: { name: "Giordano Bruno", order: 3, total: 7 }, tier: "A", topRank: null },

  { title: "The Janissary Tree", author: "Jason Goodwin", pageCount: 304, genre: "Mystery", publicationDate: "2006-01-01", description: "Yashim, a eunuch detective of the Ottoman palace, investigates murders during the 1836 abolition of the Janissaries. Edgar Award winner.", series: { name: "Yashim", order: 1, total: 5 }, tier: "S", topRank: null },
  { title: "The Snake Stone", author: "Jason Goodwin", pageCount: 320, genre: "Mystery", publicationDate: "2007-01-01", description: "Yashim investigates the murder of a French archaeologist hunting Byzantine treasure in Istanbul.", series: { name: "Yashim", order: 2, total: 5 }, tier: "A", topRank: null },
  { title: "The Bellini Card", author: "Jason Goodwin", pageCount: 304, genre: "Mystery", publicationDate: "2008-01-01", description: "Yashim is sent to Venice to track down a lost Bellini portrait of Mehmet the Conqueror.", series: { name: "Yashim", order: 3, total: 5 }, tier: "A", topRank: null },

  { title: "Martyr", author: "Rory Clements", pageCount: 416, genre: "Mystery", publicationDate: "2009-01-01", description: "John Shakespeare, brother of the playwright, is an Elizabethan intelligencer investigating a burned corpse in 1587 London.", series: { name: "John Shakespeare", order: 1, total: 7 }, tier: "A", topRank: null },
  { title: "Revenger", author: "Rory Clements", pageCount: 432, genre: "Mystery", publicationDate: "2010-01-01", description: "John Shakespeare is pulled back into service to investigate the murder of a colonist from the Roanoke colony.", series: { name: "John Shakespeare", order: 2, total: 7 }, tier: "A", topRank: null },

  // American historical
  { title: "Mariette in Ecstasy", author: "Ron Hansen", pageCount: 192, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A young novice at an upstate New York convent in 1906 begins to show the stigmata.", series: null, tier: "S", topRank: null },
  { title: "The Assassination of Jesse James by the Coward Robert Ford", author: "Ron Hansen", pageCount: 304, genre: "Historical Fiction", publicationDate: "1983-01-01", description: "The novel behind the film — the twenty-year-old Robert Ford's hero worship of and final betrayal of Jesse James.", series: null, tier: "S", topRank: null },
  { title: "A Wild Surge of Guilty Passion", author: "Ron Hansen", pageCount: 288, genre: "Historical Fiction", publicationDate: "2011-06-21", description: "The 1927 Queens murder of Albert Snyder by his wife and her salesman lover.", series: null, tier: "A", topRank: null },

  { title: "News of the World", author: "Paulette Jiles", pageCount: 224, genre: "Historical Fiction", publicationDate: "2016-10-04", description: "An elderly traveling news-reader in 1870 Texas is hired to return a ten-year-old girl captured by the Kiowa to her aunt and uncle.", series: null, tier: "S", topRank: null },
  { title: "Simon the Fiddler", author: "Paulette Jiles", pageCount: 352, genre: "Historical Fiction", publicationDate: "2020-04-14", description: "A Confederate deserter fiddler crosses Texas after the war to find the Irish governess he met once.", series: null, tier: "A", topRank: null },
  { title: "The Color of Lightning", author: "Paulette Jiles", pageCount: 368, genre: "Historical Fiction", publicationDate: "2009-04-14", description: "A free Black settler in 1863 Texas has his wife and children kidnapped by Comanches.", series: null, tier: "A", topRank: null },

  // Tudor / royal
  { title: "The Autobiography of Henry VIII", author: "Margaret George", pageCount: 944, genre: "Historical Fiction", publicationDate: "1986-01-01", description: "Henry VIII's own fictional first-person account of his life and six wives.", series: null, tier: "S", topRank: null },
  { title: "Mary Queen of Scotland and the Isles", author: "Margaret George", pageCount: 880, genre: "Historical Fiction", publicationDate: "1992-01-01", description: "A massive novelized biography of Mary Stuart.", series: null, tier: "A", topRank: null },
  { title: "The Memoirs of Cleopatra", author: "Margaret George", pageCount: 976, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "George's first-person life of the last Ptolemaic queen.", series: null, tier: "A", topRank: null },

  { title: "The Many Lives and Secret Sorrows of Josephine B.", author: "Sandra Gulland", pageCount: 432, genre: "Historical Fiction", publicationDate: "1995-01-01", description: "Gulland's novelized diaries of Napoleon's future empress — the first of the Josephine trilogy.", series: { name: "Josephine B.", order: 1, total: 3 }, tier: "A", topRank: null },
  { title: "Tales of Passion, Tales of Woe", author: "Sandra Gulland", pageCount: 448, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "Josephine's rise from Bonaparte's lover to his empress.", series: { name: "Josephine B.", order: 2, total: 3 }, tier: "A", topRank: null },
  { title: "The Last Great Dance on Earth", author: "Sandra Gulland", pageCount: 464, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "The Josephine trilogy closes as her marriage to Napoleon collapses.", series: { name: "Josephine B.", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "The Last Queen", author: "C.W. Gortner", pageCount: 432, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "Juana the Mad of Castile, daughter of Isabella and Ferdinand, across her life from princess to imprisoned queen.", series: null, tier: "A", topRank: null },
  { title: "The Confessions of Catherine de Medici", author: "C.W. Gortner", pageCount: 416, genre: "Historical Fiction", publicationDate: "2010-01-01", description: "Gortner's first-person life of the Florentine woman who ruled sixteenth-century France through her sons.", series: null, tier: "A", topRank: null },

  // Asian historical
  { title: "Red Azalea", author: "Anchee Min", pageCount: 336, genre: "Historical Fiction", publicationDate: "1994-01-01", description: "Min's autobiographical account of her girlhood during Mao's Cultural Revolution and her recruitment for Madame Mao's film.", series: null, tier: "S", topRank: null },
  { title: "Empress Orchid", author: "Anchee Min", pageCount: 368, genre: "Historical Fiction", publicationDate: "2004-03-02", description: "A novelized life of the young Empress Dowager Cixi before her rise to power over nineteenth-century China.", series: null, tier: "A", topRank: null },
  { title: "The Last Empress", author: "Anchee Min", pageCount: 352, genre: "Historical Fiction", publicationDate: "2007-04-03", description: "The second half of Cixi's life — from her rise to power to the end of imperial China.", series: null, tier: "A", topRank: null },

  { title: "Empress", author: "Shan Sa", pageCount: 320, genre: "Historical Fiction", publicationDate: "2003-01-01", description: "Wu Zetian, the only woman to rule China in her own right, tells her own story from concubine to empress.", series: null, tier: "A", topRank: null },
  { title: "The Girl Who Played Go", author: "Shan Sa", pageCount: 288, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "A Manchurian schoolgirl and a Japanese officer play go against each other in a square during the 1937 occupation.", series: null, tier: "A", topRank: null },

  { title: "The Samurai's Garden", author: "Gail Tsukiyama", pageCount: 224, genre: "Historical Fiction", publicationDate: "1994-01-01", description: "A young Chinese man sent to his family's Japanese coastal home in 1937 to recover from tuberculosis falls in love as war breaks out.", series: null, tier: "S", topRank: null },
  { title: "Women of the Silk", author: "Gail Tsukiyama", pageCount: 288, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A young Chinese girl enters a silk factory in 1920s Canton and joins a sisterhood of unmarried workers.", series: null, tier: "A", topRank: null },
  { title: "The Street of a Thousand Blossoms", author: "Gail Tsukiyama", pageCount: 448, genre: "Historical Fiction", publicationDate: "2007-09-04", description: "Two brothers in Tokyo grow up through WWII — one a sumo hopeful, the other a Noh theater apprentice.", series: null, tier: "A", topRank: null },

  // WWII historical fiction
  { title: "Beneath a Scarlet Sky", author: "Mark Sullivan", pageCount: 528, genre: "Historical Fiction", publicationDate: "2017-05-01", description: "A teenage Italian boy in WWII Milan leads Jewish refugees over the Alps and becomes a spy driving a Nazi general.", series: null, tier: "A", topRank: null },
  { title: "The Last Green Valley", author: "Mark Sullivan", pageCount: 448, genre: "Historical Fiction", publicationDate: "2021-04-01", description: "An ethnic-German family in 1944 Ukraine flees west ahead of the Red Army with Stalin on one side and Hitler on the other.", series: null, tier: "A", topRank: null },

  { title: "Code Name Verity", author: "Elizabeth Wein", pageCount: 352, genre: "Historical Fiction", publicationDate: "2012-05-15", description: "A captured Scottish spy in Nazi-occupied France writes her confession to the Gestapo.", series: { name: "Code Name Verity", order: 1, total: 2 }, tier: "S", topRank: null },
  { title: "Rose Under Fire", author: "Elizabeth Wein", pageCount: 368, genre: "Historical Fiction", publicationDate: "2013-09-10", description: "A young American ATA pilot is shot down over Nazi territory and sent to Ravensbrück.", series: { name: "Code Name Verity", order: 2, total: 2 }, tier: "A", topRank: null },

  { title: "Between Shades of Gray", author: "Ruta Sepetys", pageCount: 352, genre: "Historical Fiction", publicationDate: "2011-03-22", description: "A Lithuanian teenage girl is deported with her family to Siberia in 1941.", series: null, tier: "S", topRank: null },
  { title: "Salt to the Sea", author: "Ruta Sepetys", pageCount: 400, genre: "Historical Fiction", publicationDate: "2016-02-02", description: "Four young refugees converge on the doomed Wilhelm Gustloff evacuation ship in the final months of WWII.", series: null, tier: "S", topRank: null },
  { title: "The Fountains of Silence", author: "Ruta Sepetys", pageCount: 512, genre: "Historical Fiction", publicationDate: "2019-10-01", description: "An American photographer and a Spanish hotel worker in 1957 Madrid uncover the Francoist regime's baby-stealing.", series: null, tier: "A", topRank: null },
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

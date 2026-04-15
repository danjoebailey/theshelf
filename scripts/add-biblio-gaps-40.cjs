const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Real Story of Ah-Q and Other Tales of China", author: "Lu Xun", pageCount: 432, genre: "Fiction", publicationDate: "1923-01-01", description: "The complete fiction of the founder of modern Chinese literature, including Diary of a Madman and The Real Story of Ah-Q.", series: null, tier: "S", topRank: null },
  { title: "Wandering", author: "Lu Xun", pageCount: 224, genre: "Fiction", publicationDate: "1926-01-01", description: "The second short-story collection by the founding writer of modern Chinese vernacular fiction.", series: null, tier: "A", topRank: null },
  { title: "Diary of a Madman and Other Stories", author: "Lu Xun", pageCount: 352, genre: "Fiction", publicationDate: "1918-01-01", description: "Lu Xun's early, paradigm-shifting short fiction, which launched Chinese modernism.", series: null, tier: "S", topRank: null },

  { title: "Mr. Mani", author: "A.B. Yehoshua", pageCount: 368, genre: "Fiction", publicationDate: "1990-01-01", description: "Five one-sided conversations across two centuries trace a Sephardic family from Jerusalem through the modern Jewish experience.", series: null, tier: "S", topRank: null },
  { title: "A Late Divorce", author: "A.B. Yehoshua", pageCount: 368, genre: "Fiction", publicationDate: "1982-01-01", description: "An Israeli family's week before Passover as the estranged father returns from America to obtain a long-delayed divorce.", series: null, tier: "S", topRank: null },
  { title: "The Lover", author: "A.B. Yehoshua", pageCount: 320, genre: "Fiction", publicationDate: "1977-01-01", description: "A Haifa garage owner helps his wife search for her missing lover during the Yom Kippur War.", series: null, tier: "A", topRank: null },
  { title: "A Woman in Jerusalem", author: "A.B. Yehoshua", pageCount: 256, genre: "Fiction", publicationDate: "2004-01-01", description: "A Jerusalem bakery personnel manager must escort the body of a Christian employee killed in a terrorist attack back to her home village.", series: null, tier: "A", topRank: null },

  { title: "One Man's Bible", author: "Gao Xingjian", pageCount: 464, genre: "Fiction", publicationDate: "1999-01-01", description: "A Chinese exile in Hong Kong and Paris reconstructs his life under Mao through fragmented memories, by the 2000 Nobel laureate.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Chinese 20th century
  { title: "Love in a Fallen City", author: "Eileen Chang", pageCount: 352, genre: "Fiction", publicationDate: "1943-01-01", description: "A divorced Shanghainese woman meets a wealthy playboy on the eve of the Japanese occupation of Hong Kong — the title novella collected with five more. NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Lust, Caution", author: "Eileen Chang", pageCount: 160, genre: "Fiction", publicationDate: "1979-01-01", description: "A young woman in wartime Shanghai is recruited to seduce and assassinate a collaborator.", series: null, tier: "A", topRank: null },
  { title: "The Rouge of the North", author: "Eileen Chang", pageCount: 208, genre: "Fiction", publicationDate: "1967-01-01", description: "A Chinese woman sold into a wealthy family slowly becomes the tyrant she once feared.", series: null, tier: "A", topRank: null },

  { title: "Rickshaw Boy", author: "Lao She", pageCount: 304, genre: "Fiction", publicationDate: "1937-01-01", description: "A young rickshaw puller in 1920s Beijing saves to buy his own vehicle and is undone by war and circumstance — the canonical Chinese realist novel.", series: null, tier: "S", topRank: null },
  { title: "Mr. Ma and Son", author: "Lao She", pageCount: 304, genre: "Fiction", publicationDate: "1929-01-01", description: "A widowed Chinese father and his son inherit an antique shop in 1920s London, where they encounter English racism and their own homesickness.", series: null, tier: "A", topRank: null },

  { title: "Border Town", author: "Shen Congwen", pageCount: 192, genre: "Fiction", publicationDate: "1934-01-01", description: "A ferryman's granddaughter in a remote West Hunan town is courted by two brothers — the canonical work of Chinese rural modernism.", series: null, tier: "S", topRank: null },

  { title: "The Four Books", author: "Yan Lianke", pageCount: 352, genre: "Fiction", publicationDate: "2011-01-01", description: "A re-education camp during the Great Leap Forward, told through four interlocking manuscripts that were banned in China.", series: null, tier: "S", topRank: null },
  { title: "Serve the People!", author: "Yan Lianke", pageCount: 224, genre: "Fiction", publicationDate: "2005-01-01", description: "A Maoist division commander's young wife begins an affair with her husband's cook amid slogans of revolutionary discipline.", series: null, tier: "A", topRank: null },
  { title: "Dream of Ding Village", author: "Yan Lianke", pageCount: 352, genre: "Fiction", publicationDate: "2005-01-01", description: "A Chinese village poisoned by an AIDS-infected blood-selling scheme is narrated by a dead child.", series: null, tier: "S", topRank: null },

  { title: "Raise the Red Lantern", author: "Su Tong", pageCount: 272, genre: "Fiction", publicationDate: "1990-01-01", description: "A young university woman becomes the fourth concubine of a wealthy man in 1920s China and enters a household war.", series: null, tier: "S", topRank: null },
  { title: "Rice", author: "Su Tong", pageCount: 272, genre: "Fiction", publicationDate: "1991-01-01", description: "A refugee from a famine-stricken village rises through the rice trade of a decadent pre-Communist city.", series: null, tier: "A", topRank: null },
  { title: "My Life as Emperor", author: "Su Tong", pageCount: 304, genre: "Historical Fiction", publicationDate: "1992-01-01", description: "A fictional boy emperor of an invented Chinese dynasty slides from puppet ruler to tightrope walker.", series: null, tier: "A", topRank: null },

  { title: "The Song of Everlasting Sorrow", author: "Wang Anyi", pageCount: 464, genre: "Fiction", publicationDate: "1995-01-01", description: "A 1940s Shanghai beauty queen's life across four decades of Chinese history — the canonical novel of modern Shanghai.", series: null, tier: "S", topRank: null },

  { title: "Family", author: "Ba Jin", pageCount: 320, genre: "Fiction", publicationDate: "1933-01-01", description: "Three brothers in a 1920s Sichuan Confucian household rebel against their patriarch's rule — the canonical Chinese anti-traditional novel.", series: null, tier: "S", topRank: null },

  { title: "The Invisibility Cloak", author: "Ge Fei", pageCount: 144, genre: "Fiction", publicationDate: "2012-01-01", description: "A Beijing hi-fi amplifier maker's quiet life is upended when a wealthy client asks him to build a machine for a hidden villa.", series: null, tier: "A", topRank: null },

  // Japanese post-war
  { title: "The Hunting Gun", author: "Yasushi Inoue", pageCount: 96, genre: "Fiction", publicationDate: "1949-01-01", description: "A writer receives three letters that tell the same doomed love affair from three women's perspectives.", series: null, tier: "S", topRank: null },
  { title: "Bullfight", author: "Yasushi Inoue", pageCount: 128, genre: "Fiction", publicationDate: "1949-01-01", description: "An Osaka newspaper sponsors a massive postwar bullfighting tournament, and everything goes wrong.", series: null, tier: "A", topRank: null },
  { title: "The Blue Wolf", author: "Yasushi Inoue", pageCount: 240, genre: "Historical Fiction", publicationDate: "1960-01-01", description: "A novelistic life of Genghis Khan as a man who never knew whether he was the son of his father.", series: null, tier: "A", topRank: null },

  { title: "The Waiting Years", author: "Fumiko Enchi", pageCount: 208, genre: "Historical Fiction", publicationDate: "1957-01-01", description: "A Meiji-era Japanese wife is sent to recruit concubines for her tyrannical husband and endures decades of quiet rage.", series: null, tier: "S", topRank: null },
  { title: "Masks", author: "Fumiko Enchi", pageCount: 144, genre: "Fiction", publicationDate: "1958-01-01", description: "A young Japanese widow is slowly shaped by her formidable mother-in-law into an instrument of revenge.", series: null, tier: "A", topRank: null },

  { title: "A True Novel", author: "Minae Mizumura", pageCount: 880, genre: "Fiction", publicationDate: "2002-01-01", description: "A Japanese Wuthering Heights: a postwar Japanese boy's consuming love for the daughter of a wealthy family.", series: null, tier: "S", topRank: null },
  { title: "An I-Novel", author: "Minae Mizumura", pageCount: 352, genre: "Fiction", publicationDate: "1995-01-01", description: "A bilingual Japanese woman in an Ivy League graduate program spends a day on the phone with her sister, remembering their American exile.", series: null, tier: "A", topRank: null },
  { title: "Inheritance from Mother", author: "Minae Mizumura", pageCount: 448, genre: "Fiction", publicationDate: "2012-01-01", description: "An aging Japanese woman reckons with her difficult, recently dead mother while on a hot-springs retreat near Mount Fuji.", series: null, tier: "A", topRank: null },

  { title: "Fires on the Plain", author: "Shohei Ooka", pageCount: 256, genre: "Fiction", publicationDate: "1951-01-01", description: "A tubercular Japanese soldier at the end of WWII wanders the Philippine jungle toward starvation, cannibalism, and grace.", series: null, tier: "S", topRank: null },
  { title: "Taken Captive", author: "Shohei Ooka", pageCount: 224, genre: "Non-Fiction", publicationDate: "1948-01-01", description: "Ooka's memoir of his capture and internment by American forces in the Philippines — the raw material of Fires on the Plain.", series: null, tier: "A", topRank: null },

  { title: "Into a Black Sun", author: "Takeshi Kaiko", pageCount: 224, genre: "Fiction", publicationDate: "1968-01-01", description: "A Japanese war correspondent in Vietnam spirals into alcohol and fatalism as the war grinds on.", series: null, tier: "A", topRank: null },
  { title: "Darkness in Summer", author: "Takeshi Kaiko", pageCount: 208, genre: "Fiction", publicationDate: "1972-01-01", description: "A Japanese writer exiled in Europe is visited by his former lover and they spend a restless summer that can only end badly.", series: null, tier: "A", topRank: null },

  // Taiwanese / Sinophone
  { title: "Notes of a Crocodile", author: "Qiu Miaojin", pageCount: 256, genre: "Fiction", publicationDate: "1994-01-01", description: "A queer Taiwanese college student's campus journal in 1980s Taipei — a canonical Chinese-language lesbian novel.", series: null, tier: "S", topRank: null },
  { title: "Last Words from Montmartre", author: "Qiu Miaojin", pageCount: 176, genre: "Fiction", publicationDate: "1996-01-01", description: "A young woman in Paris writes twenty unsent letters to her lover in the weeks before her suicide.", series: null, tier: "A", topRank: null },

  { title: "Taipei People", author: "Pai Hsien-yung", pageCount: 336, genre: "Fiction", publicationDate: "1971-01-01", description: "Fourteen linked stories about mainland Chinese exiles living in Taipei — the canonical work of Taiwanese fiction.", series: null, tier: "S", topRank: null },
  { title: "Crystal Boys", author: "Pai Hsien-yung", pageCount: 320, genre: "Fiction", publicationDate: "1983-01-01", description: "Young gay men in 1970s Taipei gather in a park that becomes their only possible home.", series: null, tier: "A", topRank: null },

  // Turkish
  { title: "A Mind at Peace", author: "Ahmet Hamdi Tanpınar", pageCount: 432, genre: "Fiction", publicationDate: "1949-01-01", description: "A young Turkish intellectual's consciousness drifts across Istanbul and old Ottoman music on the eve of WWII — the canonical Turkish modernist novel.", series: null, tier: "S", topRank: null },
  { title: "The Time Regulation Institute", author: "Ahmet Hamdi Tanpınar", pageCount: 416, genre: "Fiction", publicationDate: "1961-01-01", description: "A Turkish bureaucratic agency is established to synchronize all the clocks of the country in Tanpınar's comic masterwork.", series: null, tier: "S", topRank: null },

  { title: "Madonna in a Fur Coat", author: "Sabahattin Ali", pageCount: 176, genre: "Fiction", publicationDate: "1943-01-01", description: "A young Turkish man in 1920s Berlin falls for a Jewish artist whose portrait of a Madonna resembles herself — a rediscovered Turkish classic.", series: null, tier: "S", topRank: null },

  { title: "Berji Kristin: Tales from the Garbage Hills", author: "Latife Tekin", pageCount: 192, genre: "Fiction", publicationDate: "1984-01-01", description: "Squatters on the outskirts of Istanbul build a gecekondu neighborhood from the city's dumps.", series: null, tier: "A", topRank: null },

  // Israeli / Hebrew
  { title: "The Last Jew", author: "Yoram Kaniuk", pageCount: 560, genre: "Fiction", publicationDate: "1981-01-01", description: "A Holocaust survivor and his son try to hold onto Jewish memory in Israel and beyond.", series: null, tier: "A", topRank: null },
  { title: "Adam Resurrected", author: "Yoram Kaniuk", pageCount: 384, genre: "Fiction", publicationDate: "1969-01-01", description: "A former circus clown who survived a Nazi camp by acting as the commandant's dog ends up in an Israeli asylum for Holocaust survivors.", series: null, tier: "S", topRank: null },

  { title: "The Blue Mountain", author: "Meir Shalev", pageCount: 384, genre: "Fiction", publicationDate: "1988-01-01", description: "A grandson of Russian Jewish pioneers recounts the mythic early years of the Jezreel Valley moshav his grandfather helped found.", series: null, tier: "S", topRank: null },
  { title: "A Pigeon and a Boy", author: "Meir Shalev", pageCount: 320, genre: "Fiction", publicationDate: "2006-01-01", description: "A carrier-pigeon message from a dying Israeli soldier in 1948 threads through two generations of unresolved love.", series: null, tier: "A", topRank: null },

  { title: "Dolly City", author: "Orly Castel-Bloom", pageCount: 176, genre: "Fiction", publicationDate: "1992-01-01", description: "A possibly mad doctor in a future Tel Aviv adopts a baby she finds in a plastic bag and subjects him to increasingly bizarre care.", series: null, tier: "A", topRank: null },
  { title: "Human Parts", author: "Orly Castel-Bloom", pageCount: 272, genre: "Fiction", publicationDate: "2002-01-01", description: "Early-2000s Israel during the Second Intifada, seen through the lives of a half-dozen ordinary Tel Avivians.", series: null, tier: "A", topRank: null },

  { title: "Dancing Arabs", author: "Sayed Kashua", pageCount: 240, genre: "Fiction", publicationDate: "2002-01-01", description: "A Palestinian Israeli boy from a Triangle village attends a Jewish boarding school and spends his life trying to vanish between identities.", series: null, tier: "S", topRank: null },
  { title: "Let It Be Morning", author: "Sayed Kashua", pageCount: 304, genre: "Fiction", publicationDate: "2004-01-01", description: "A Palestinian Israeli journalist returns to his home village just as the Israeli army seals it off from the outside world.", series: null, tier: "A", topRank: null },

  // Latin American (post-boom)
  { title: "The Shipyard", author: "Juan Carlos Onetti", pageCount: 208, genre: "Fiction", publicationDate: "1961-01-01", description: "A middle-aged drifter returns to a rotting Uruguayan port and takes over the management of a long-defunct shipyard.", series: null, tier: "S", topRank: null },
  { title: "A Brief Life", author: "Juan Carlos Onetti", pageCount: 288, genre: "Fiction", publicationDate: "1950-01-01", description: "A failing Buenos Aires advertising man invents a second life in an imaginary town called Santa María — the novel that established Onetti's imaginary world.", series: null, tier: "S", topRank: null },

  { title: "Artificial Respiration", author: "Ricardo Piglia", pageCount: 240, genre: "Fiction", publicationDate: "1980-01-01", description: "A young Argentine writer corresponds with his exiled uncle in a novel about history, dictatorship, and Borges.", series: null, tier: "S", topRank: null },
  { title: "Target in the Night", author: "Ricardo Piglia", pageCount: 288, genre: "Mystery", publicationDate: "2010-01-01", description: "A Puerto Rican businessman is murdered in a small Argentine pampas town, and the investigation opens the town's political fault lines.", series: null, tier: "A", topRank: null },

  { title: "The Sixty-Five Years of Washington", author: "Juan José Saer", pageCount: 208, genre: "Fiction", publicationDate: "1986-01-01", description: "Two Argentine friends walk across a provincial city discussing a birthday party neither of them attended.", series: null, tier: "A", topRank: null },
  { title: "Scars", author: "Juan José Saer", pageCount: 208, genre: "Fiction", publicationDate: "1969-01-01", description: "Four narrators each tell one part of the same Argentine small-town murder.", series: null, tier: "A", topRank: null },

  { title: "My Two Worlds", author: "Sergio Chejfec", pageCount: 112, genre: "Fiction", publicationDate: "2008-01-01", description: "An Argentine writer in a Brazilian city wanders through a park on the eve of his birthday in one extended reverie.", series: null, tier: "A", topRank: null },

  { title: "The Museum of Eterna's Novel", author: "Macedonio Fernández", pageCount: 256, genre: "Fiction", publicationDate: "1967-01-01", description: "An Argentine proto-Borgesian puzzle: 57 prefaces followed by a novel that is supposed to be, and pointedly isn't, written.", series: null, tier: "A", topRank: null },

  { title: "Piano Stories", author: "Felisberto Hernández", pageCount: 176, genre: "Fiction", publicationDate: "1942-01-01", description: "Uncanny tales from the Uruguayan writer Calvino called one of his masters — pianists, puppets, haunted houses.", series: null, tier: "S", topRank: null },

  { title: "I the Supreme", author: "Augusto Roa Bastos", pageCount: 448, genre: "Historical Fiction", publicationDate: "1974-01-01", description: "A dictator-narrator dictates his self-justification as his country crumbles around him — Paraguay's canonical dictator novel.", series: null, tier: "S", topRank: null },
  { title: "Son of Man", author: "Augusto Roa Bastos", pageCount: 272, genre: "Historical Fiction", publicationDate: "1960-01-01", description: "Linked tales of Paraguayan peasant suffering from the nineteenth century through the Chaco War.", series: null, tier: "A", topRank: null },

  { title: "Three Trapped Tigers", author: "Guillermo Cabrera Infante", pageCount: 480, genre: "Fiction", publicationDate: "1967-01-01", description: "The 1958 Havana nightlife of three young Cubans, told in a torrent of bilingual puns and Caribbean slang.", series: null, tier: "S", topRank: null },
  { title: "Infante's Inferno", author: "Guillermo Cabrera Infante", pageCount: 432, genre: "Fiction", publicationDate: "1979-01-01", description: "A Havana boy's chronology of his own sexual misadventures from early childhood through his escape into exile.", series: null, tier: "A", topRank: null },

  { title: "Havana Blue", author: "Leonardo Padura", pageCount: 240, genre: "Mystery", publicationDate: "1991-01-01", description: "Havana police detective Mario Conde investigates the disappearance of an old classmate turned corrupt bureaucrat — the first Havana Quartet novel.", series: { name: "Havana Quartet", order: 1, total: 4 }, tier: "A", topRank: null },
  { title: "The Man Who Loved Dogs", author: "Leonardo Padura", pageCount: 592, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "A Cuban writer investigates the Spanish exile who murdered Trotsky in Mexico — Padura's masterpiece.", series: null, tier: "S", topRank: null },
  { title: "Heretics", author: "Leonardo Padura", pageCount: 528, genre: "Historical Fiction", publicationDate: "2013-01-01", description: "A Cuban Jew's journey through the Inquisition, the St. Louis refugee ship, and twenty-first century Havana.", series: null, tier: "A", topRank: null },

  // African Francophone + Zimbabwean
  { title: "God's Bits of Wood", author: "Sembène Ousmane", pageCount: 336, genre: "Historical Fiction", publicationDate: "1960-01-01", description: "The 1947 railway workers' strike from Dakar to Bamako, told through the lives of the African families sustaining it.", series: null, tier: "S", topRank: null },
  { title: "Black Docker", author: "Sembène Ousmane", pageCount: 176, genre: "Fiction", publicationDate: "1956-01-01", description: "A Senegalese dockworker in postwar Marseille finishes a novel about his grandmother and is accused of plagiarism.", series: null, tier: "A", topRank: null },
  { title: "Xala", author: "Sembène Ousmane", pageCount: 128, genre: "Fiction", publicationDate: "1973-01-01", description: "A Senegalese businessman's third marriage is spoiled by impotence — a sharp satire of postcolonial African elites.", series: null, tier: "A", topRank: null },

  { title: "Ambiguous Adventure", author: "Cheikh Hamidou Kane", pageCount: 192, genre: "Fiction", publicationDate: "1961-01-01", description: "A young Senegalese Muslim is sent by his family to France for a Western education and loses himself between two worlds.", series: null, tier: "S", topRank: null },

  { title: "The Poor Christ of Bomba", author: "Mongo Beti", pageCount: 224, genre: "Fiction", publicationDate: "1956-01-01", description: "A Cameroonian altar boy records his missionary priest's tour of a rural diocese that does not want him.", series: null, tier: "S", topRank: null },
  { title: "Mission to Kala", author: "Mongo Beti", pageCount: 192, genre: "Fiction", publicationDate: "1957-01-01", description: "A failed French lycée student is sent to his ancestral village to retrieve a runaway cousin's wife and becomes a hero.", series: null, tier: "A", topRank: null },
  { title: "King Lazarus", author: "Mongo Beti", pageCount: 208, genre: "Fiction", publicationDate: "1958-01-01", description: "A dying Cameroonian chief converts to Catholicism and tries to dismiss his many wives, upending his kingdom.", series: null, tier: "A", topRank: null },

  { title: "Houseboy", author: "Ferdinand Oyono", pageCount: 144, genre: "Fiction", publicationDate: "1956-01-01", description: "A young Cameroonian servant's diary records the final days of French colonial rule from inside a commandant's house.", series: null, tier: "S", topRank: null },
  { title: "The Old Man and the Medal", author: "Ferdinand Oyono", pageCount: 192, genre: "Fiction", publicationDate: "1956-01-01", description: "An illiterate Cameroonian elder is to be honored by the French colonial government and learns what the honor is worth.", series: null, tier: "A", topRank: null },

  { title: "Life and a Half", author: "Sony Labou Tansi", pageCount: 208, genre: "Fiction", publicationDate: "1979-01-01", description: "A Central African dictator is haunted by his slaughtered political rival through generations of subsequent tyrants.", series: null, tier: "S", topRank: null },
  { title: "The Seven Solitudes of Lorsa Lopez", author: "Sony Labou Tansi", pageCount: 176, genre: "Fiction", publicationDate: "1985-01-01", description: "A murder in a small African town stops time as the townspeople wait decades for the authorities to arrive.", series: null, tier: "A", topRank: null },

  { title: "Butterfly Burning", author: "Yvonne Vera", pageCount: 176, genre: "Fiction", publicationDate: "1998-01-01", description: "A young woman in 1940s Bulawayo is caught in an affair with an older man as colonial Rhodesia forbids her a future.", series: null, tier: "S", topRank: null },
  { title: "The Stone Virgins", author: "Yvonne Vera", pageCount: 192, genre: "Fiction", publicationDate: "2002-01-01", description: "Two sisters in a Matabeleland village survive the Zimbabwean civil war and a dissident's attack.", series: null, tier: "S", topRank: null },
  { title: "Without a Name", author: "Yvonne Vera", pageCount: 144, genre: "Fiction", publicationDate: "1994-01-01", description: "A Zimbabwean woman flees a rural village for Harare with her baby and is undone by what she has done to survive.", series: null, tier: "A", topRank: null },

  { title: "Johnny Mad Dog", author: "Emmanuel Dongala", pageCount: 336, genre: "Fiction", publicationDate: "2002-01-01", description: "A teenage African militiaman and a schoolgirl on the run tell alternating chapters of a civil war.", series: null, tier: "A", topRank: null },
  { title: "The Fire of Origins", author: "Emmanuel Dongala", pageCount: 272, genre: "Fiction", publicationDate: "1987-01-01", description: "A Congolese shaman and his descendants move from precolonial life through French colonization into independence.", series: null, tier: "A", topRank: null },
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

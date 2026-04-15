const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Paris Stories", author: "Mavis Gallant", pageCount: 384, genre: "Fiction", publicationDate: "2002-01-01", description: "Gallant's selected Paris stories from five decades of reporting the lives of expatriates, exiles, and working Parisians. NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Varieties of Exile", author: "Mavis Gallant", pageCount: 400, genre: "Fiction", publicationDate: "2003-01-01", description: "Gallant's Canadian stories and her linked Linnet Muir sequence about a young woman returning to postwar Montreal.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // British modernists
  { title: "Manservant and Maidservant", author: "Ivy Compton-Burnett", pageCount: 304, genre: "Fiction", publicationDate: "1947-01-01", description: "A tyrannical Edwardian English husband terrorizes his household in Compton-Burnett's all-dialogue domestic comedy of cruelty.", series: null, tier: "A", topRank: null },
  { title: "A House and Its Head", author: "Ivy Compton-Burnett", pageCount: 288, genre: "Fiction", publicationDate: "1935-01-01", description: "A mid-Victorian English patriarch's remarriage unravels his adult children in Compton-Burnett's pitiless wit.", series: null, tier: "A", topRank: null },

  { title: "The Go-Between", author: "L.P. Hartley", pageCount: 320, genre: "Fiction", publicationDate: "1953-01-01", description: "A young boy carries illicit love letters between a Norfolk lady and her farmer lover during one hot 1900 summer — the canonical English novel of lost childhood.", series: null, tier: "S", topRank: null },
  { title: "The Hireling", author: "L.P. Hartley", pageCount: 224, genre: "Fiction", publicationDate: "1957-01-01", description: "A struggling English taxi driver falls in love with the wealthy widowed passenger he chauffeurs.", series: null, tier: "A", topRank: null },

  { title: "The Slaves of Solitude", author: "Patrick Hamilton", pageCount: 304, genre: "Fiction", publicationDate: "1947-01-01", description: "A lonely middle-aged woman in a dismal WWII boarding house outside London is tormented by a petty bully and an American soldier. NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Hangover Square", author: "Patrick Hamilton", pageCount: 288, genre: "Fiction", publicationDate: "1941-01-01", description: "A drunken Earl's Court loner drifts through London on the eve of WWII, pursuing a woman who treats him with contempt.", series: null, tier: "S", topRank: null },
  { title: "Twenty Thousand Streets Under the Sky", author: "Patrick Hamilton", pageCount: 528, genre: "Fiction", publicationDate: "1935-01-01", description: "Three interlocking novels about a Soho pub, its barmaid, and the men who love her in 1930s London.", series: null, tier: "A", topRank: null },

  { title: "The Weather in the Streets", author: "Rosamond Lehmann", pageCount: 400, genre: "Fiction", publicationDate: "1936-01-01", description: "An unhappily married London woman begins an affair with an aristocrat whose life she cannot share.", series: null, tier: "A", topRank: null },
  { title: "Dusty Answer", author: "Rosamond Lehmann", pageCount: 336, genre: "Fiction", publicationDate: "1927-01-01", description: "A young Englishwoman at Cambridge in the 1920s moves through a series of romantic entanglements with her childhood neighbors.", series: null, tier: "A", topRank: null },

  { title: "Loving", author: "Henry Green", pageCount: 240, genre: "Fiction", publicationDate: "1945-01-01", description: "Life below stairs in an Irish country house during WWII, rendered in Green's signature sparse, overheard style.", series: null, tier: "S", topRank: null },
  { title: "Concluding", author: "Henry Green", pageCount: 256, genre: "Fiction", publicationDate: "1948-01-01", description: "A single day at a state girls' boarding school in a future England is shaken when two students disappear.", series: null, tier: "A", topRank: null },

  // Edwardian / Pre-WWI British
  { title: "The Old Wives' Tale", author: "Arnold Bennett", pageCount: 624, genre: "Fiction", publicationDate: "1908-01-01", description: "Two sisters from a Staffordshire pottery town lead radically different lives across the second half of the nineteenth century.", series: null, tier: "S", topRank: null },
  { title: "Clayhanger", author: "Arnold Bennett", pageCount: 576, genre: "Fiction", publicationDate: "1910-01-01", description: "A young man in Bennett's fictional Five Towns inherits his father's print shop and slowly claims his own life.", series: null, tier: "A", topRank: null },

  { title: "The Man of Property", author: "John Galsworthy", pageCount: 400, genre: "Fiction", publicationDate: "1906-01-01", description: "The first Forsyte Saga novel: the Forsyte men build their Victorian fortunes while their wives pay the emotional price.", series: { name: "The Forsyte Saga", order: 1, total: 9 }, tier: "S", topRank: null },
  { title: "In Chancery", author: "John Galsworthy", pageCount: 352, genre: "Fiction", publicationDate: "1920-01-01", description: "The Forsytes enter the Edwardian era as family marriages unravel and the old moral certainties slip.", series: { name: "The Forsyte Saga", order: 2, total: 9 }, tier: "A", topRank: null },

  { title: "The Towers of Trebizond", author: "Rose Macaulay", pageCount: 288, genre: "Fiction", publicationDate: "1956-01-01", description: "An English aunt, her nephew, and a camel undertake a cheerful Anglican mission through 1950s Turkey — one of the funniest novels of the decade.", series: null, tier: "S", topRank: null },
  { title: "The World My Wilderness", author: "Rose Macaulay", pageCount: 256, genre: "Fiction", publicationDate: "1950-01-01", description: "A seventeen-year-old girl raised among the French Resistance is sent back to her father's conventional London after the war.", series: null, tier: "A", topRank: null },

  // American early 20th c
  { title: "McTeague", author: "Frank Norris", pageCount: 448, genre: "Fiction", publicationDate: "1899-01-01", description: "A dim-witted San Francisco dentist's life is destroyed by greed and envy — the foundational American naturalist novel.", series: null, tier: "S", topRank: null },
  { title: "The Octopus", author: "Frank Norris", pageCount: 672, genre: "Historical Fiction", publicationDate: "1901-01-01", description: "California wheat farmers battle the railroads that control their land — the first volume of Norris's uncompleted Epic of the Wheat.", series: null, tier: "A", topRank: null },

  { title: "Barren Ground", author: "Ellen Glasgow", pageCount: 528, genre: "Fiction", publicationDate: "1925-01-01", description: "A young Virginia woman jilted by her first love turns the family farm into a prosperous enterprise and outlasts everyone who betrayed her.", series: null, tier: "S", topRank: null },
  { title: "Vein of Iron", author: "Ellen Glasgow", pageCount: 480, genre: "Historical Fiction", publicationDate: "1935-01-01", description: "Four generations of Scotch-Irish Virginians endure the Depression with stubborn dignity.", series: null, tier: "A", topRank: null },

  { title: "Maggie: A Girl of the Streets", author: "Stephen Crane", pageCount: 96, genre: "Fiction", publicationDate: "1893-01-01", description: "A young woman in the Bowery slums is driven from her family into prostitution and ruin.", series: null, tier: "A", topRank: null },
  { title: "The Open Boat and Other Stories", author: "Stephen Crane", pageCount: 224, genre: "Fiction", publicationDate: "1898-01-01", description: "Crane's major short fiction, including the title story drawn from his own shipwreck survival.", series: null, tier: "A", topRank: null },

  { title: "Oil!", author: "Upton Sinclair", pageCount: 544, genre: "Fiction", publicationDate: "1927-01-01", description: "A Southern California oil baron and his idealistic son — the source novel for There Will Be Blood.", series: null, tier: "A", topRank: null },
  { title: "Dragon's Teeth", author: "Upton Sinclair", pageCount: 640, genre: "Historical Fiction", publicationDate: "1942-01-01", description: "The third Lanny Budd novel, which won Sinclair the Pulitzer Prize for its portrait of Hitler's rise.", series: null, tier: "A", topRank: null },

  { title: "Poor White", author: "Sherwood Anderson", pageCount: 384, genre: "Fiction", publicationDate: "1920-01-01", description: "An orphaned inventor transforms an Ohio farming town and is destroyed by his own success.", series: null, tier: "A", topRank: null },
  { title: "Dark Laughter", author: "Sherwood Anderson", pageCount: 336, genre: "Fiction", publicationDate: "1925-01-01", description: "A Chicago journalist abandons his respectable life and drifts down the Mississippi toward the laughter he believes he has missed.", series: null, tier: "B", topRank: null },

  // Indian literary
  { title: "Kanthapura", author: "Raja Rao", pageCount: 192, genre: "Historical Fiction", publicationDate: "1938-01-01", description: "A South Indian village is transformed by Gandhian resistance to British rule — the first major English-language Indian novel.", series: null, tier: "S", topRank: null },
  { title: "The Serpent and the Rope", author: "Raja Rao", pageCount: 416, genre: "Fiction", publicationDate: "1960-01-01", description: "An Indian philosophy student in France wrestles with Vedanta and his French wife — Rao's metaphysical masterpiece.", series: null, tier: "A", topRank: null },

  { title: "Untouchable", author: "Mulk Raj Anand", pageCount: 160, genre: "Fiction", publicationDate: "1935-01-01", description: "A single day in the life of a young Indian sweeper from the lowest caste — an early and enduring protest novel.", series: null, tier: "S", topRank: null },
  { title: "Coolie", author: "Mulk Raj Anand", pageCount: 368, genre: "Fiction", publicationDate: "1936-01-01", description: "A teenage Indian boy is pulled from his village into the factories and mines of colonial India until the work kills him.", series: null, tier: "A", topRank: null },

  { title: "Rich Like Us", author: "Nayantara Sahgal", pageCount: 304, genre: "Fiction", publicationDate: "1985-01-01", description: "A British woman married to an Indian businessman and a Delhi bureaucrat both contend with the Emergency under Indira Gandhi.", series: null, tier: "A", topRank: null },

  { title: "The Great Indian Novel", author: "Shashi Tharoor", pageCount: 432, genre: "Fiction", publicationDate: "1989-01-01", description: "Twentieth-century Indian political history retold as a comic reimagining of the Mahabharata.", series: null, tier: "A", topRank: null },
  { title: "Riot", author: "Shashi Tharoor", pageCount: 288, genre: "Fiction", publicationDate: "2001-01-01", description: "An American NGO worker is murdered in a communal riot in small-town India, and the novel reconstructs the event from many viewpoints.", series: null, tier: "A", topRank: null },

  { title: "English, August", author: "Upamanyu Chatterjee", pageCount: 320, genre: "Fiction", publicationDate: "1988-01-01", description: "A cynical young civil servant is posted to a dusty provincial Indian district and spends his first year getting stoned and waiting for a transfer.", series: null, tier: "S", topRank: null },
  { title: "The Mammaries of the Welfare State", author: "Upamanyu Chatterjee", pageCount: 448, genre: "Fiction", publicationDate: "2000-01-01", description: "Chatterjee's satire of Indian bureaucracy continues with Agastya Sen now fully embedded in the system.", series: null, tier: "A", topRank: null },

  { title: "Cuckold", author: "Kiran Nagarkar", pageCount: 624, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "The sixteenth-century Rajput prince whose wife Mirabai adored the god Krishna instead of him narrates his own story.", series: null, tier: "S", topRank: null },
  { title: "Seven Sixes Are Forty-Three", author: "Kiran Nagarkar", pageCount: 224, genre: "Fiction", publicationDate: "1974-01-01", description: "A non-linear collage of lower-middle-class Bombay life — the first modern Marathi novel, translated into English.", series: null, tier: "A", topRank: null },

  { title: "A Strange and Sublime Address", author: "Amit Chaudhuri", pageCount: 224, genre: "Fiction", publicationDate: "1991-01-01", description: "A Bombay schoolboy's long visits to his uncle's Calcutta household are rendered in Chaudhuri's quiet, painterly sentences.", series: null, tier: "A", topRank: null },
  { title: "Afternoon Raag", author: "Amit Chaudhuri", pageCount: 144, genre: "Fiction", publicationDate: "1993-01-01", description: "An Oxford graduate student divides his attention between two women, one in England and one back home in India.", series: null, tier: "A", topRank: null },

  // Black British
  { title: "The Joys of Motherhood", author: "Buchi Emecheta", pageCount: 240, genre: "Fiction", publicationDate: "1979-01-01", description: "An Igbo woman leaves her village to follow her husband to Lagos and is undone by the demands of modern motherhood.", series: null, tier: "S", topRank: null },
  { title: "Second-Class Citizen", author: "Buchi Emecheta", pageCount: 192, genre: "Fiction", publicationDate: "1974-01-01", description: "A young Nigerian woman follows her useless husband to 1960s London and begins to carve her own life out of defeat.", series: null, tier: "A", topRank: null },
  { title: "The Bride Price", author: "Buchi Emecheta", pageCount: 192, genre: "Fiction", publicationDate: "1976-01-01", description: "A young Igbo girl's widowed mother tries to save her from the traditions that will decide her future.", series: null, tier: "A", topRank: null },

  { title: "Crossing the River", author: "Caryl Phillips", pageCount: 240, genre: "Historical Fiction", publicationDate: "1993-01-01", description: "A polyphonic novel of the African diaspora, tracing three descendants of an African father who sold his children into slavery.", series: null, tier: "S", topRank: null },
  { title: "Cambridge", author: "Caryl Phillips", pageCount: 192, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "An English spinster's journal of a nineteenth-century Caribbean plantation visit collides with the memoir of an enslaved man named Cambridge.", series: null, tier: "S", topRank: null },
  { title: "A Distant Shore", author: "Caryl Phillips", pageCount: 320, genre: "Fiction", publicationDate: "2003-01-01", description: "An African refugee and an elderly retired English schoolteacher meet in a suburban village — and neither life was made for the other.", series: null, tier: "A", topRank: null },

  // Australian literary
  { title: "The Plains", author: "Gerald Murnane", pageCount: 176, genre: "Fiction", publicationDate: "1982-01-01", description: "A young filmmaker travels into the Australian interior to make a film about the plains and is absorbed into the landholders' library.", series: null, tier: "S", topRank: null },
  { title: "Tamarisk Row", author: "Gerald Murnane", pageCount: 256, genre: "Fiction", publicationDate: "1974-01-01", description: "Murnane's debut: a Catholic Australian boy's obsessive imagination constructs entire inner worlds around horse racing and marble circuits.", series: null, tier: "A", topRank: null },
  { title: "Border Districts", author: "Gerald Murnane", pageCount: 144, genre: "Fiction", publicationDate: "2017-01-01", description: "An aging writer settles in a town near the edge of his country and assembles a final report on everything he has seen.", series: null, tier: "S", topRank: null },

  { title: "Monkey Grip", author: "Helen Garner", pageCount: 256, genre: "Fiction", publicationDate: "1977-01-01", description: "A Melbourne single mother falls in love with a heroin addict and cannot let go — the canonical Australian literary novel of the 1970s.", series: null, tier: "S", topRank: null },
  { title: "The Children's Bach", author: "Helen Garner", pageCount: 128, genre: "Fiction", publicationDate: "1984-01-01", description: "A quiet suburban Melbourne marriage is quietly upended by the arrival of old bohemian friends.", series: null, tier: "S", topRank: null },
  { title: "The First Stone", author: "Helen Garner", pageCount: 224, genre: "Non-Fiction", publicationDate: "1995-01-01", description: "Garner's controversial long essay on a 1990s sexual harassment case at a Melbourne university residential college.", series: null, tier: "A", topRank: null },

  { title: "The Watch Tower", author: "Elizabeth Harrower", pageCount: 272, genre: "Fiction", publicationDate: "1966-01-01", description: "Two Sydney sisters are drawn into the orbit of a tyrannical boarder whose control over them curdles into something terrifying. NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "In Certain Circles", author: "Elizabeth Harrower", pageCount: 240, genre: "Fiction", publicationDate: "2014-01-01", description: "Two pairs of Sydney siblings intersect across decades in Harrower's long-withheld postwar novel.", series: null, tier: "A", topRank: null },

  { title: "Benang", author: "Kim Scott", pageCount: 496, genre: "Fiction", publicationDate: "1999-01-01", description: "A young Aboriginal Australian man researches the government program that tried to breed the blackness out of his family — Miles Franklin Award winner.", series: null, tier: "S", topRank: null },
  { title: "That Deadman Dance", author: "Kim Scott", pageCount: 432, genre: "Historical Fiction", publicationDate: "2010-01-01", description: "An early-contact story from the Noongar coast of southwest Australia — Miles Franklin Award winner.", series: null, tier: "S", topRank: null },

  { title: "Sixty Lights", author: "Gail Jones", pageCount: 272, genre: "Fiction", publicationDate: "2004-01-01", description: "A nineteenth-century Australian orphan becomes a pioneer photographer in colonial India.", series: null, tier: "A", topRank: null },
  { title: "Dreams of Speaking", author: "Gail Jones", pageCount: 240, genre: "Fiction", publicationDate: "2006-01-01", description: "A young Australian academic in Paris befriends an elderly Japanese Hiroshima survivor and each changes the other.", series: null, tier: "A", topRank: null },

  { title: "The Lost Dog", author: "Michelle de Kretser", pageCount: 352, genre: "Fiction", publicationDate: "2007-01-01", description: "A Melbourne academic of Anglo-Indian descent loses his dog in the bush and his life slowly follows.", series: null, tier: "A", topRank: null },
  { title: "Questions of Travel", author: "Michelle de Kretser", pageCount: 528, genre: "Fiction", publicationDate: "2012-01-01", description: "An Australian travel guide editor and a Sri Lankan IT worker drift across decades of modern global movement — Miles Franklin Award winner.", series: null, tier: "S", topRank: null },

  { title: "Drylands", author: "Thea Astley", pageCount: 224, genre: "Fiction", publicationDate: "1999-01-01", description: "A dying Queensland farming town is evoked through the stories of the few townspeople hanging on.", series: null, tier: "A", topRank: null },
  { title: "An Item from the Late News", author: "Thea Astley", pageCount: 208, genre: "Fiction", publicationDate: "1982-01-01", description: "A small far-north Queensland town turns viciously on a newcomer who tries to make good on his inheritance.", series: null, tier: "A", topRank: null },

  // New Zealand
  { title: "Potiki", author: "Patricia Grace", pageCount: 192, genre: "Fiction", publicationDate: "1986-01-01", description: "A Maori coastal community resists the developers who want their land — the canonical modern Maori novel.", series: null, tier: "S", topRank: null },
  { title: "Dogside Story", author: "Patricia Grace", pageCount: 304, genre: "Fiction", publicationDate: "2001-01-01", description: "A Maori village split between two sides of a hill prepares for the millennium amid family feuds and a missing child.", series: null, tier: "A", topRank: null },

  { title: "The Whale Rider", author: "Witi Ihimaera", pageCount: 160, genre: "Fiction", publicationDate: "1987-01-01", description: "A Maori girl believes she is the true heir to her iwi's ancestral whale-riding tradition.", series: null, tier: "S", topRank: null },
  { title: "Bulibasha", author: "Witi Ihimaera", pageCount: 320, genre: "Fiction", publicationDate: "1994-01-01", description: "A young Maori shearer recounts a summer of family rivalries and his larger-than-life grandfather, the King of the Gypsies.", series: null, tier: "A", topRank: null },

  { title: "Mister Pip", author: "Lloyd Jones", pageCount: 256, genre: "Fiction", publicationDate: "2006-01-01", description: "A schoolteacher on civil-war Bougainville reads Great Expectations to his students and invents the only teacher the island has left.", series: null, tier: "S", topRank: null },
  { title: "Hand Me Down World", author: "Lloyd Jones", pageCount: 320, genre: "Fiction", publicationDate: "2010-01-01", description: "An African woman working in a Tunisian hotel tries to get to Berlin to find her stolen son.", series: null, tier: "A", topRank: null },

  // Canadian
  { title: "Two Solitudes", author: "Hugh MacLennan", pageCount: 480, genre: "Historical Fiction", publicationDate: "1945-01-01", description: "A Quebec farming family straddles French and English Canada across two world wars — the canonical novel of Canadian identity.", series: null, tier: "S", topRank: null },
  { title: "Barometer Rising", author: "Hugh MacLennan", pageCount: 272, genre: "Historical Fiction", publicationDate: "1941-01-01", description: "A returning WWI Canadian soldier reaches Halifax on the morning of the 1917 munitions ship explosion.", series: null, tier: "A", topRank: null },

  { title: "The Wars", author: "Timothy Findley", pageCount: 272, genre: "Historical Fiction", publicationDate: "1977-01-01", description: "A young Canadian officer's WWI and the small act of rebellion that defines his life — the canonical modern Canadian war novel.", series: null, tier: "S", topRank: null },
  { title: "Famous Last Words", author: "Timothy Findley", pageCount: 416, genre: "Historical Fiction", publicationDate: "1981-01-01", description: "A dying poet carves his story into the walls of an Austrian hotel room as WWII closes around him.", series: null, tier: "A", topRank: null },

  { title: "Sweetland", author: "Michael Crummey", pageCount: 336, genre: "Fiction", publicationDate: "2014-01-01", description: "The last holdout on a Newfoundland island refuses a government resettlement package that will erase his community.", series: null, tier: "S", topRank: null },
  { title: "Galore", author: "Michael Crummey", pageCount: 352, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "Two hundred years of a Newfoundland outport village, seeded by a silent white man pulled from the belly of a beached whale.", series: null, tier: "A", topRank: null },
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

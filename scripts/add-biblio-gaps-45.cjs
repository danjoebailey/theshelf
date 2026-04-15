const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Ryder", author: "Djuna Barnes", pageCount: 272, genre: "Fiction", publicationDate: "1928-01-01", description: "A Rabelaisian portrait of the Ryder family across the American rural landscape, in Barnes's ribald first novel.", series: null, tier: "A", topRank: null },
  { title: "Ladies Almanack", author: "Djuna Barnes", pageCount: 96, genre: "Fiction", publicationDate: "1928-01-01", description: "A comic roman-à-clef of Natalie Barney's lesbian salon in 1920s Paris, privately printed by Barnes and her circle.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // American experimental / cult literary
  { title: "The Last Samurai", author: "Helen DeWitt", pageCount: 544, genre: "Fiction", publicationDate: "2000-01-01", description: "A precocious single mother in London teaches her gifted son everything she knows, and he searches for a suitable father among living men.", series: null, tier: "S", topRank: null },
  { title: "Lightning Rods", author: "Helen DeWitt", pageCount: 288, genre: "Fiction", publicationDate: "2011-01-01", description: "A failed American salesman invents a grotesque corporate sexual harassment solution and accidentally gets rich.", series: null, tier: "A", topRank: null },

  { title: "No Lease on Life", author: "Lynne Tillman", pageCount: 192, genre: "Fiction", publicationDate: "1998-01-01", description: "A single day in a New York apartment dweller's war against her building and her neighbors.", series: null, tier: "A", topRank: null },
  { title: "American Genius, A Comedy", author: "Lynne Tillman", pageCount: 320, genre: "Fiction", publicationDate: "2006-01-01", description: "A woman at a residential institution for the nervously ill delivers her life in an unbroken digressive monologue.", series: null, tier: "A", topRank: null },

  { title: "Zeroville", author: "Steve Erickson", pageCount: 352, genre: "Fiction", publicationDate: "2007-01-01", description: "A young cinephile with images of Hollywood tattooed on his head arrives in Los Angeles in 1969 and begins editing films.", series: null, tier: "S", topRank: null },
  { title: "Days Between Stations", author: "Steve Erickson", pageCount: 256, genre: "Fiction", publicationDate: "1985-01-01", description: "Erickson's debut: a bike-racing amnesiac, a lost silent film, and the weather itself going wrong across Los Angeles.", series: null, tier: "A", topRank: null },

  { title: "Ava", author: "Carole Maso", pageCount: 272, genre: "Fiction", publicationDate: "1993-01-01", description: "A dying professor recalls her life in lyric fragments across a single day — one of the great American experimental novels of the 1990s.", series: null, tier: "S", topRank: null },
  { title: "Defiance", author: "Carole Maso", pageCount: 272, genre: "Fiction", publicationDate: "1998-01-01", description: "A former Harvard prodigy on death row for murdering two students writes her unflinching final reckoning.", series: null, tier: "A", topRank: null },

  { title: "The Silk Road", author: "Kathryn Davis", pageCount: 160, genre: "Fiction", publicationDate: "2019-01-01", description: "Eight siblings gather in a yoga studio and walk together through memory, myth, and the pilgrimage of their lives.", series: null, tier: "A", topRank: null },
  { title: "Duplex", author: "Kathryn Davis", pageCount: 208, genre: "Fantasy", publicationDate: "2013-01-01", description: "A suburban American street slips between ordinary and dreamlike in Davis's small, unsettling masterpiece.", series: null, tier: "S", topRank: null },

  // Contemporary Arabic women
  { title: "Woman at Point Zero", author: "Nawal El Saadawi", pageCount: 144, genre: "Fiction", publicationDate: "1975-01-01", description: "An Egyptian woman awaiting execution for murder tells her life to a psychiatrist — the canonical Arabic feminist novel.", series: null, tier: "S", topRank: null },
  { title: "The Fall of the Imam", author: "Nawal El Saadawi", pageCount: 160, genre: "Fiction", publicationDate: "1987-01-01", description: "The daughter of an unnamed Islamic dictator pursues her father across a landscape that is both real and allegorical.", series: null, tier: "A", topRank: null },

  { title: "Women of Algiers in Their Apartment", author: "Assia Djebar", pageCount: 176, genre: "Fiction", publicationDate: "1980-01-01", description: "Linked stories of Algerian women before and after independence — Djebar's title echoes the Delacroix painting.", series: null, tier: "S", topRank: null },
  { title: "So Vast the Prison", author: "Assia Djebar", pageCount: 368, genre: "Fiction", publicationDate: "1995-01-01", description: "Memoir, history, and fiction weave together the inner lives of Algerian women across centuries.", series: null, tier: "A", topRank: null },

  { title: "The Translator", author: "Leila Aboulela", pageCount: 208, genre: "Fiction", publicationDate: "1999-01-01", description: "A widowed Sudanese Muslim woman working as a translator in Scotland falls in love with a Scottish academic.", series: null, tier: "A", topRank: null },
  { title: "Minaret", author: "Leila Aboulela", pageCount: 288, genre: "Fiction", publicationDate: "2005-01-01", description: "A former Sudanese elite now working as a maid in London finds unexpected faith at the Regent's Park Mosque.", series: null, tier: "A", topRank: null },

  { title: "The Map of Love", author: "Ahdaf Soueif", pageCount: 544, genre: "Historical Fiction", publicationDate: "1999-01-01", description: "An American woman researching her British grandmother's Egyptian love affair uncovers a hundred-year family history.", series: null, tier: "S", topRank: null },
  { title: "In the Eye of the Sun", author: "Ahdaf Soueif", pageCount: 816, genre: "Fiction", publicationDate: "1992-01-01", description: "A young Egyptian woman's romantic and political life across Cairo and London during the 1970s.", series: null, tier: "A", topRank: null },

  { title: "The Hakawati", author: "Rabih Alameddine", pageCount: 528, genre: "Fiction", publicationDate: "2008-01-01", description: "A Lebanese man returns to Beirut for his father's deathbed and spirals into the storytelling tradition his grandfather taught him.", series: null, tier: "S", topRank: null },
  { title: "An Unnecessary Woman", author: "Rabih Alameddine", pageCount: 304, genre: "Fiction", publicationDate: "2013-01-01", description: "An aging Beirut translator living alone in her apartment starts a new translation every January and never publishes any of them.", series: null, tier: "S", topRank: null },

  // Icelandic literary
  { title: "The Blue Fox", author: "Sjón", pageCount: 128, genre: "Fiction", publicationDate: "2003-01-01", description: "A nineteenth-century Icelandic priest hunts a blue fox through the snow as a naturalist buries a woman with Down syndrome in the valley below.", series: null, tier: "S", topRank: null },
  { title: "From the Mouth of the Whale", author: "Sjón", pageCount: 240, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "A seventeenth-century Icelandic natural philosopher in exile on a remote island contends with ghosts and theology.", series: null, tier: "A", topRank: null },

  { title: "Heaven and Hell", author: "Jón Kalman Stefánsson", pageCount: 240, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "A young Icelandic fisherman loses his closest friend to the cold and sets out across a frozen landscape — the first of the Westfjords trilogy.", series: null, tier: "S", topRank: null },
  { title: "The Sorrow of Angels", author: "Jón Kalman Stefánsson", pageCount: 304, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "The second Westfjords novel: the boy and an elderly postman cross a winter mountain pass with the mail.", series: null, tier: "A", topRank: null },

  { title: "Butterflies in November", author: "Auður Ava Ólafsdóttir", pageCount: 304, genre: "Fiction", publicationDate: "2004-01-01", description: "A recently divorced Icelandic translator sets off on a road trip around the island with a deaf-mute four-year-old she has been left to look after.", series: null, tier: "A", topRank: null },
  { title: "Hotel Silence", author: "Auður Ava Ólafsdóttir", pageCount: 288, genre: "Fiction", publicationDate: "2016-01-01", description: "A suicidal middle-aged Icelandic man travels to a war-ruined country to kill himself and ends up repairing the hotel.", series: null, tier: "A", topRank: null },

  { title: "Angels of the Universe", author: "Einar Már Guðmundsson", pageCount: 160, genre: "Fiction", publicationDate: "1993-01-01", description: "An Icelandic schizophrenic recounts his life in and out of Reykjavík's psychiatric hospital. Nordic Council Literature Prize winner.", series: null, tier: "A", topRank: null },

  // Finnish literary
  { title: "Purge", author: "Sofi Oksanen", pageCount: 400, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "An elderly Estonian woman shelters a trafficked young woman and the novel traces both back through Soviet occupation.", series: null, tier: "S", topRank: null },
  { title: "When the Doves Disappeared", author: "Sofi Oksanen", pageCount: 320, genre: "Historical Fiction", publicationDate: "2012-01-01", description: "Two Estonian cousins on opposite sides of the WWII collaboration spectrum reckon with each other across decades.", series: null, tier: "A", topRank: null },

  { title: "The Unknown Soldier", author: "Väinö Linna", pageCount: 464, genre: "Historical Fiction", publicationDate: "1954-01-01", description: "Finnish foot soldiers endure the 1941-1944 Continuation War with Russia — the canonical Finnish war novel.", series: null, tier: "S", topRank: null },
  { title: "Under the North Star", author: "Väinö Linna", pageCount: 400, genre: "Historical Fiction", publicationDate: "1959-01-01", description: "Three generations of a Finnish tenant-farming family across the civil war and the founding of the republic.", series: null, tier: "A", topRank: null },

  { title: "The Year of the Hare", author: "Arto Paasilinna", pageCount: 192, genre: "Fiction", publicationDate: "1975-01-01", description: "A burnt-out Finnish journalist abandons his car and his life after hitting a hare, and spends a year wandering Finland with the animal.", series: null, tier: "S", topRank: null },
  { title: "The Howling Miller", author: "Arto Paasilinna", pageCount: 208, genre: "Fiction", publicationDate: "1981-01-01", description: "A mysterious ex-soldier restores a derelict Finnish mill and terrorizes the local village with his nightly howls.", series: null, tier: "A", topRank: null },

  { title: "Mirage 38", author: "Kjell Westö", pageCount: 368, genre: "Historical Fiction", publicationDate: "2013-01-01", description: "In 1938 Helsinki, a well-off lawyer's secretary recognizes her boss's dinner guest from a dark episode of her youth.", series: null, tier: "A", topRank: null },
  { title: "The Wednesday Club", author: "Kjell Westö", pageCount: 400, genre: "Historical Fiction", publicationDate: "2013-01-01", description: "Helsinki's Swedish-speaking professional class meets weekly in 1938 to discuss the coming war.", series: null, tier: "A", topRank: null },

  // Czech literary
  { title: "Love and Garbage", author: "Ivan Klíma", pageCount: 256, genre: "Fiction", publicationDate: "1986-01-01", description: "A Prague writer banned from publishing takes a job as a street cleaner and carries on an affair that is slowly ruining his marriage.", series: null, tier: "S", topRank: null },
  { title: "Waiting for the Dark, Waiting for the Light", author: "Ivan Klíma", pageCount: 240, genre: "Fiction", publicationDate: "1993-01-01", description: "A Czech television cameraman contends with the final years of communism and the messy dawn of democracy.", series: null, tier: "A", topRank: null },

  { title: "City Sister Silver", author: "Jáchym Topol", pageCount: 512, genre: "Fiction", publicationDate: "1994-01-01", description: "A young Czech drifter in post-1989 Prague moves through a black market underworld in an ecstatic dialect that has changed Czech prose.", series: null, tier: "S", topRank: null },
  { title: "The Devil's Workshop", author: "Jáchym Topol", pageCount: 176, genre: "Fiction", publicationDate: "2009-01-01", description: "A young Czech caretaker of the Terezín concentration camp memorial is recruited by Belarusian monument-builders planning a grimmer project.", series: null, tier: "A", topRank: null },

  { title: "Life with a Star", author: "Jiří Weil", pageCount: 224, genre: "Historical Fiction", publicationDate: "1949-01-01", description: "A Prague Jew in hiding during the Nazi occupation waits for the deportation order — Weil's canonical novel, drawn from his own survival.", series: null, tier: "S", topRank: null },
  { title: "Mendelssohn Is on the Roof", author: "Jiří Weil", pageCount: 320, genre: "Historical Fiction", publicationDate: "1960-01-01", description: "A Nazi order to remove the statue of Mendelssohn from a Prague rooftop sets off a darkly comic chain of bureaucratic ineptitude.", series: null, tier: "A", topRank: null },

  { title: "War with the Newts", author: "Karel Čapek", pageCount: 352, genre: "Sci-Fi", publicationDate: "1936-01-01", description: "Humanity encounters a race of intelligent newts in the South Pacific and turns them into labor — Čapek's canonical satire.", series: null, tier: "S", topRank: null },
  { title: "An Ordinary Life", author: "Karel Čapek", pageCount: 176, genre: "Fiction", publicationDate: "1934-01-01", description: "A retired Czech railway clerk writes his memoir and discovers he was never the man he thought he was.", series: null, tier: "A", topRank: null },

  // Bulgarian / Balkan
  { title: "Isaac's Torah", author: "Angel Wagenstein", pageCount: 336, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "A Bulgarian Jewish everyman named Isaac lives through every twentieth-century catastrophe and tells his story in a torrent of Yiddish jokes.", series: null, tier: "S", topRank: null },
  { title: "Farewell, Shanghai", author: "Angel Wagenstein", pageCount: 416, genre: "Historical Fiction", publicationDate: "2004-01-01", description: "Jewish refugees from Nazi Europe wash up in the Shanghai ghetto during WWII.", series: null, tier: "A", topRank: null },

  { title: "The Eighth Life", author: "Nino Haratischvili", pageCount: 944, genre: "Historical Fiction", publicationDate: "2014-01-01", description: "A Georgian family across the entire twentieth century — from the Tsar to post-Soviet Tbilisi — told through six generations of women.", series: null, tier: "S", topRank: null },

  { title: "Time Shelter", author: "Georgi Gospodinov", pageCount: 304, genre: "Fiction", publicationDate: "2020-01-01", description: "A clinic for dementia patients recreates decades of the twentieth century and begins to spread across Europe. International Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "The Physics of Sorrow", author: "Georgi Gospodinov", pageCount: 288, genre: "Fiction", publicationDate: "2011-01-01", description: "A Bulgarian narrator with a mythological empathy reconstructs a century of his family's sorrows.", series: null, tier: "S", topRank: null },

  // Contemporary South African
  { title: "The Folly", author: "Ivan Vladislavić", pageCount: 192, genre: "Fiction", publicationDate: "1993-01-01", description: "A South African homeowner's life is slowly taken over by a mysterious neighbor who is building an elaborate architectural folly in his garden.", series: null, tier: "S", topRank: null },
  { title: "Double Negative", author: "Ivan Vladislavić", pageCount: 208, genre: "Fiction", publicationDate: "2010-01-01", description: "A young Johannesburg photographer meets a legendary veteran photographer and the novel traces their acquaintance across apartheid and its aftermath.", series: null, tier: "A", topRank: null },

  { title: "David's Story", author: "Zoë Wicomb", pageCount: 224, genre: "Fiction", publicationDate: "2000-01-01", description: "A Coloured South African former liberation fighter tries to get a biographer to record his family's Griqua history.", series: null, tier: "A", topRank: null },
  { title: "You Can't Get Lost in Cape Town", author: "Zoë Wicomb", pageCount: 192, genre: "Fiction", publicationDate: "1987-01-01", description: "Linked stories of a young Coloured woman growing up in apartheid-era South Africa and its aftermath.", series: null, tier: "A", topRank: null },

  { title: "Agaat", author: "Marlene van Niekerk", pageCount: 704, genre: "Fiction", publicationDate: "2004-01-01", description: "A dying Afrikaner farmer's wife and her lifelong Black maid Agaat share a house, a past, and a mother-daughter bond that cannot be spoken.", series: null, tier: "S", topRank: null },
  { title: "Triomf", author: "Marlene van Niekerk", pageCount: 560, genre: "Fiction", publicationDate: "1994-01-01", description: "A poor Afrikaner family living on the rubble of a destroyed Black township prepares for the 1994 election.", series: null, tier: "A", topRank: null },

  { title: "Ways of Dying", author: "Zakes Mda", pageCount: 224, genre: "Fiction", publicationDate: "1995-01-01", description: "A professional mourner in post-apartheid South Africa navigates the grief business and his own quiet love.", series: null, tier: "A", topRank: null },
  { title: "The Heart of Redness", author: "Zakes Mda", pageCount: 288, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "A modern South African village is split between Believers and Unbelievers, its fault lines traced back to a nineteenth-century Xhosa prophecy.", series: null, tier: "A", topRank: null },

  { title: "The Promise", author: "Damon Galgut", pageCount: 272, genre: "Fiction", publicationDate: "2021-01-01", description: "A white Afrikaner family promises a dying mother to give their Black maid the house she lives in — and spends decades not keeping it. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "In a Strange Room", author: "Damon Galgut", pageCount: 208, genre: "Fiction", publicationDate: "2010-01-01", description: "Three journeys — to Greece, to India, to Lesotho — and the different kinds of grief each carries.", series: null, tier: "S", topRank: null },

  // Latin American women
  { title: "The Ship of Fools", author: "Cristina Peri Rossi", pageCount: 176, genre: "Fiction", publicationDate: "1984-01-01", description: "An exile named Ecks drifts through a series of allegorical encounters in an unnamed country — Peri Rossi's masterpiece of the Uruguayan diaspora.", series: null, tier: "A", topRank: null },
  { title: "Forbidden Passion", author: "Cristina Peri Rossi", pageCount: 176, genre: "Fiction", publicationDate: "1986-01-01", description: "Short stories of forbidden desire and political exile from Uruguay's most important living writer in Spanish.", series: null, tier: "A", topRank: null },

  { title: "Here's to You, Jesusa!", author: "Elena Poniatowska", pageCount: 320, genre: "Fiction", publicationDate: "1969-01-01", description: "A working-class Mexican woman tells the story of her life across the Mexican Revolution and its aftermath.", series: null, tier: "S", topRank: null },
  { title: "Leonora", author: "Elena Poniatowska", pageCount: 432, genre: "Historical Fiction", publicationDate: "2011-01-01", description: "A novelized biography of the surrealist painter Leonora Carrington's life in Mexico.", series: null, tier: "A", topRank: null },

  { title: "The Book of Lamentations", author: "Rosario Castellanos", pageCount: 448, genre: "Historical Fiction", publicationDate: "1962-01-01", description: "A 1930s Chiapas uprising of the Tzotzil Maya against the Mexican state, reconstructed through dozens of voices.", series: null, tier: "S", topRank: null },
  { title: "The Nine Guardians", author: "Rosario Castellanos", pageCount: 272, genre: "Fiction", publicationDate: "1957-01-01", description: "A seven-year-old girl in 1930s Chiapas watches her landowning family confront Lázaro Cárdenas's agrarian reforms.", series: null, tier: "A", topRank: null },

  { title: "The Fourth World", author: "Diamela Eltit", pageCount: 144, genre: "Fiction", publicationDate: "1988-01-01", description: "Twin siblings born into poverty in Pinochet's Chile narrate their joint gestation and the fates that follow them.", series: null, tier: "A", topRank: null },
  { title: "Custody of the Eyes", author: "Diamela Eltit", pageCount: 144, genre: "Fiction", publicationDate: "2005-01-01", description: "A mother and her homebound child in a Chilean apartment — Eltit's hermetic meditation on seclusion.", series: null, tier: "A", topRank: null },

  { title: "Space Invaders", author: "Nona Fernández", pageCount: 96, genre: "Fiction", publicationDate: "2013-01-01", description: "A group of Chilean schoolchildren in the 1980s piece together what happened to a missing classmate whose father was a regime torturer.", series: null, tier: "S", topRank: null },
  { title: "The Twilight Zone", author: "Nona Fernández", pageCount: 208, genre: "Fiction", publicationDate: "2016-01-01", description: "A Chilean woman reconstructs the life of a torturer who confessed to the press during Pinochet's regime.", series: null, tier: "A", topRank: null },

  { title: "Seeing Red", author: "Lina Meruane", pageCount: 176, genre: "Fiction", publicationDate: "2012-01-01", description: "A Chilean writer in New York is struck by sudden blindness when a blood vessel bursts in her eye, and her life turns inward.", series: null, tier: "S", topRank: null },
  { title: "Nervous System", author: "Lina Meruane", pageCount: 208, genre: "Fiction", publicationDate: "2018-01-01", description: "A Chilean astrophysicist in an unnamed northern country begins to show mysterious physical symptoms.", series: null, tier: "A", topRank: null },
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

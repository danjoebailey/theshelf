const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Trust Exercise", author: "Susan Choi", pageCount: 272, genre: "Fiction", publicationDate: "2019-04-09", description: "Two students at a competitive performing-arts high school in the 1980s become entangled with their charismatic acting teacher. National Book Award winner.", series: null, tier: "S", topRank: null },
  { title: "Torch", author: "Cheryl Strayed", pageCount: 336, genre: "Fiction", publicationDate: "2006-02-14", description: "A Minnesota family contends with the mother's terminal cancer diagnosis — Strayed's debut novel, drawn from her own loss.", series: null, tier: "A", topRank: null },
  { title: "Difficult Women", author: "Roxane Gay", pageCount: 272, genre: "Fiction", publicationDate: "2017-01-03", description: "Twenty-one stories of women surviving various kinds of violence and intimacy.", series: null, tier: "A", topRank: null },
  { title: "Take My Hand", author: "Dolen Perkins-Valdez", pageCount: 368, genre: "Historical Fiction", publicationDate: "2022-04-12", description: "A young Black nurse in 1970s Alabama investigates her own clinic's forced sterilization of two Black sisters.", series: null, tier: "S", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Appalachian / rural women
  { title: "Storming Heaven", author: "Denise Giardina", pageCount: 320, genre: "Historical Fiction", publicationDate: "1987-01-01", description: "Four West Virginia coal miners and their families in the 1921 Matewan mine war. W.D. Weatherford Award.", series: null, tier: "S", topRank: null },
  { title: "The Unquiet Earth", author: "Denise Giardina", pageCount: 368, genre: "Historical Fiction", publicationDate: "1992-01-01", description: "The sequel to Storming Heaven — the same West Virginia coal town across WWII and the Vietnam era.", series: null, tier: "A", topRank: null },

  { title: "Strange As This Weather Has Been", author: "Ann Pancake", pageCount: 357, genre: "Fiction", publicationDate: "2007-09-18", description: "A West Virginia family confronts mountaintop removal mining as their hollow is slowly destroyed.", series: null, tier: "S", topRank: null },
  { title: "Given Ground", author: "Ann Pancake", pageCount: 192, genre: "Fiction", publicationDate: "2001-01-01", description: "Pancake's debut story collection of Appalachian lives under economic pressure. Bakeless Prize winner.", series: null, tier: "A", topRank: null },

  { title: "Clay's Quilt", author: "Silas House", pageCount: 304, genre: "Fiction", publicationDate: "2001-01-01", description: "A young Kentucky man raised by his mountain aunts after his mother's murder finds love and himself.", series: null, tier: "A", topRank: null },
  { title: "A Parchment of Leaves", author: "Silas House", pageCount: 272, genre: "Historical Fiction", publicationDate: "2002-01-01", description: "A Cherokee woman marries a white Kentucky man in the early twentieth century and navigates his world.", series: null, tier: "A", topRank: null },
  { title: "Southernmost", author: "Silas House", pageCount: 288, genre: "Fiction", publicationDate: "2018-06-05", description: "A Tennessee evangelical preacher loses his church after welcoming a gay couple and flees south with his young son.", series: null, tier: "A", topRank: null },

  // Korean American
  { title: "The Incendiaries", author: "R.O. Kwon", pageCount: 224, genre: "Fiction", publicationDate: "2018-07-31", description: "A grieving college student is drawn into a Korean American religious cult with ties to a North Korean bombing plot.", series: null, tier: "A", topRank: null },
  { title: "Exhibit", author: "R.O. Kwon", pageCount: 240, genre: "Fiction", publicationDate: "2024-05-21", description: "A photographer and a dancer meet in San Francisco and are both pulled into the other's artistic obsessions.", series: null, tier: "A", topRank: null },

  { title: "The Piano Teacher", author: "Janice Y.K. Lee", pageCount: 336, genre: "Historical Fiction", publicationDate: "2009-01-13", description: "A wealthy Hong Kong household employs an Englishwoman as a piano teacher just after WWII and she uncovers the wartime past.", series: null, tier: "A", topRank: null },
  { title: "The Expatriates", author: "Janice Y.K. Lee", pageCount: 336, genre: "Fiction", publicationDate: "2016-01-12", description: "Three American women in contemporary Hong Kong navigate motherhood, loss, and the expatriate bubble.", series: null, tier: "A", topRank: null },

  { title: "All You Can Ever Know", author: "Nicole Chung", pageCount: 240, genre: "Non-Fiction", publicationDate: "2018-10-02", description: "A Korean American adoptee raised by a white family in Oregon finds her biological relatives.", series: null, tier: "S", topRank: null },
  { title: "A Living Remedy", author: "Nicole Chung", pageCount: 224, genre: "Non-Fiction", publicationDate: "2023-04-04", description: "Chung's second memoir on the loss of her adoptive father and mother and the cost of American health care.", series: null, tier: "A", topRank: null },

  { title: "Re Jane", author: "Patricia Park", pageCount: 352, genre: "Fiction", publicationDate: "2015-05-05", description: "A Korean American Jane Eyre retelling set in Queens and Seoul.", series: null, tier: "A", topRank: null },

  // Vietnamese American
  { title: "The Boat", author: "Nam Le", pageCount: 272, genre: "Fiction", publicationDate: "2008-05-13", description: "Seven stories ranging from Tehran to Hiroshima to Iowa City — Nam Le's widely acclaimed debut collection.", series: null, tier: "S", topRank: null },

  { title: "Short Girls", author: "Bich Minh Nguyen", pageCount: 304, genre: "Fiction", publicationDate: "2009-07-23", description: "Two very different Vietnamese American sisters reunite for their father's citizenship party.", series: null, tier: "A", topRank: null },
  { title: "The Owner of a Lonely Heart", author: "Bich Minh Nguyen", pageCount: 272, genre: "Non-Fiction", publicationDate: "2023-10-17", description: "Nguyen's memoir of meeting her biological mother, who stayed behind in Vietnam when her father fled.", series: null, tier: "A", topRank: null },

  { title: "Dragonfish", author: "Vu Tran", pageCount: 304, genre: "Thriller", publicationDate: "2015-08-04", description: "An Oakland cop travels to Las Vegas to search for his ex-wife, a Vietnamese refugee who has vanished into a dangerous world.", series: null, tier: "A", topRank: null },

  { title: "The Gangster We Are All Looking For", author: "lê thi diem thúy", pageCount: 160, genre: "Fiction", publicationDate: "2003-05-06", description: "A young Vietnamese refugee girl grows up in a San Diego motel-apartment with her father across the 1980s.", series: null, tier: "S", topRank: null },

  { title: "When Heaven and Earth Changed Places", author: "Le Ly Hayslip", pageCount: 432, genre: "Non-Fiction", publicationDate: "1989-01-01", description: "Hayslip's memoir of growing up in a Vietnamese village during the war, working for both sides, and emigrating to America.", series: null, tier: "S", topRank: null },

  { title: "East Eats West", author: "Andrew Lam", pageCount: 240, genre: "Non-Fiction", publicationDate: "2010-04-01", description: "Vietnamese American essayist Lam on the hybrid lives of immigrants and the children of immigrants in America.", series: null, tier: "A", topRank: null },

  // Cuban American / Caribbean American
  { title: "In Cuba I Was a German Shepherd", author: "Ana Menéndez", pageCount: 240, genre: "Fiction", publicationDate: "2001-07-10", description: "Eleven stories of Miami Cuban exiles and their children — Menéndez's debut collection.", series: null, tier: "A", topRank: null },
  { title: "Loving Che", author: "Ana Menéndez", pageCount: 240, genre: "Fiction", publicationDate: "2003-05-01", description: "A young Cuban American woman investigates a packet of letters claiming her mother was Che Guevara's secret lover.", series: null, tier: "A", topRank: null },

  { title: "The Gods of Tango", author: "Carolina De Robertis", pageCount: 384, genre: "Historical Fiction", publicationDate: "2015-07-07", description: "A young Italian immigrant woman in 1913 Buenos Aires disguises herself as a man to play violin in tango orchestras.", series: null, tier: "A", topRank: null },
  { title: "Cantoras", author: "Carolina De Robertis", pageCount: 336, genre: "Historical Fiction", publicationDate: "2019-09-03", description: "Five queer women in 1970s Uruguay share a seaside refuge across the decades of the dictatorship and after.", series: null, tier: "S", topRank: null },

  { title: "Ruins", author: "Achy Obejas", pageCount: 224, genre: "Fiction", publicationDate: "2009-01-01", description: "A committed Cuban revolutionary in late-Soviet Havana lives with the slow collapse of everything his life was built on.", series: null, tier: "A", topRank: null },
  { title: "Memory Mambo", author: "Achy Obejas", pageCount: 240, genre: "Fiction", publicationDate: "1996-01-01", description: "A Cuban American lesbian in 1990s Chicago navigates her family's inherited political violence.", series: null, tier: "A", topRank: null },

  { title: "Bodega Dreams", author: "Ernesto Quiñonez", pageCount: 224, genre: "Fiction", publicationDate: "2000-02-29", description: "A young Puerto Rican Spanish Harlem college student is recruited by a local bodega owner turned neighborhood power broker.", series: null, tier: "S", topRank: null },
  { title: "Chango's Fire", author: "Ernesto Quiñonez", pageCount: 288, genre: "Fiction", publicationDate: "2004-09-14", description: "A Puerto Rican arsonist-for-hire tries to get out of the business as Spanish Harlem gentrifies.", series: null, tier: "A", topRank: null },

  // Black American women
  { title: "Waiting to Exhale", author: "Terry McMillan", pageCount: 432, genre: "Fiction", publicationDate: "1992-01-01", description: "Four Black professional women in Phoenix wait for the right men — McMillan's cultural-phenomenon novel.", series: null, tier: "S", topRank: null },
  { title: "Disappearing Acts", author: "Terry McMillan", pageCount: 416, genre: "Fiction", publicationDate: "1989-01-01", description: "A Black Brooklyn music teacher and a construction worker fall into an affair that neither of them is ready for.", series: null, tier: "A", topRank: null },
  { title: "How Stella Got Her Groove Back", author: "Terry McMillan", pageCount: 416, genre: "Fiction", publicationDate: "1996-01-01", description: "A divorced Black executive in her forties meets a much younger man on a Jamaica vacation.", series: null, tier: "A", topRank: null },

  { title: "Brothers and Sisters", author: "Bebe Moore Campbell", pageCount: 480, genre: "Fiction", publicationDate: "1994-01-01", description: "A Black woman bank executive and a white colleague navigate race, work, and friendship in post-Rodney King Los Angeles.", series: null, tier: "A", topRank: null },
  { title: "Your Blues Ain't Like Mine", author: "Bebe Moore Campbell", pageCount: 432, genre: "Fiction", publicationDate: "1992-01-01", description: "A fictionalized retelling of the Emmett Till murder across decades of a Mississippi town.", series: null, tier: "A", topRank: null },

  { title: "Family", author: "J. California Cooper", pageCount: 240, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A dead enslaved mother narrates the lives of her five children as they split up and become free after the Civil War.", series: null, tier: "A", topRank: null },
  { title: "Some Soul to Keep", author: "J. California Cooper", pageCount: 256, genre: "Fiction", publicationDate: "1987-01-01", description: "Five novellas of Black women's lives across the twentieth-century South.", series: null, tier: "A", topRank: null },

  { title: "Land of Love and Drowning", author: "Tiphanie Yanique", pageCount: 368, genre: "Historical Fiction", publicationDate: "2014-07-10", description: "Three generations of a Virgin Islands family across the twentieth century, from the Danish-to-American handover forward.", series: null, tier: "A", topRank: null },
  { title: "Monster in the Middle", author: "Tiphanie Yanique", pageCount: 320, genre: "Fiction", publicationDate: "2021-10-19", description: "Two lovers from very different Black American backgrounds trace all the ways their families' histories brought them together.", series: null, tier: "A", topRank: null },

  { title: "Here Comes the Sun", author: "Nicole Dennis-Benn", pageCount: 352, genre: "Fiction", publicationDate: "2016-07-19", description: "Three Jamaican women — a hotel worker, her gifted sister, and their scheming mother — navigate the edges of Montego Bay's tourism economy.", series: null, tier: "S", topRank: null },
  { title: "Patsy", author: "Nicole Dennis-Benn", pageCount: 416, genre: "Fiction", publicationDate: "2019-06-04", description: "A Jamaican mother leaves her five-year-old daughter to pursue an old lover in Brooklyn.", series: null, tier: "A", topRank: null },

  // Contemporary memoirists
  { title: "Body Work", author: "Melissa Febos", pageCount: 208, genre: "Non-Fiction", publicationDate: "2022-03-15", description: "Febos's essays on autobiographical writing as somatic work.", series: null, tier: "A", topRank: null },
  { title: "Abandon Me", author: "Melissa Febos", pageCount: 336, genre: "Non-Fiction", publicationDate: "2017-02-28", description: "Febos's memoir of a long-distance affair that became its own kind of abandonment.", series: null, tier: "A", topRank: null },
  { title: "Whip Smart", author: "Melissa Febos", pageCount: 320, genre: "Non-Fiction", publicationDate: "2010-02-16", description: "Febos's memoir of four years working as a Manhattan dominatrix.", series: null, tier: "A", topRank: null },

  { title: "The Women", author: "Hilton Als", pageCount: 192, genre: "Non-Fiction", publicationDate: "1996-01-01", description: "Als's early autobiographical essays on the Black women who shaped him — including his mother and Owen Dodson.", series: null, tier: "A", topRank: null },
  { title: "White Girls", author: "Hilton Als", pageCount: 352, genre: "Non-Fiction", publicationDate: "2013-11-12", description: "Als's essays on race, desire, and identification — Eminem, Michael Jackson, Truman Capote, and the white girls of the title. NBCC finalist.", series: null, tier: "S", topRank: null },

  { title: "Factory Man", author: "Beth Macy", pageCount: 480, genre: "Non-Fiction", publicationDate: "2014-07-15", description: "Macy's history of a Virginia furniture family fighting Chinese imports and the loss of American manufacturing.", series: null, tier: "A", topRank: null },

  { title: "A Little Devil in America", author: "Hanif Abdurraqib", pageCount: 320, genre: "Non-Fiction", publicationDate: "2021-03-30", description: "Abdurraqib's essay meditations on Black performance in American life.", series: null, tier: "S", topRank: null },
  { title: "They Can't Kill Us Until They Kill Us", author: "Hanif Abdurraqib", pageCount: 304, genre: "Non-Fiction", publicationDate: "2017-11-14", description: "Abdurraqib's early essay collection on music, race, and the year of his wedding and his mother's death.", series: null, tier: "A", topRank: null },

  // Midwest literary
  { title: "Childhood and Other Neighborhoods", author: "Stuart Dybek", pageCount: 192, genre: "Fiction", publicationDate: "1980-01-01", description: "Dybek's debut stories of Chicago's Polish and Latino neighborhoods — the canonical Chicago collection.", series: null, tier: "S", topRank: null },
  { title: "The Coast of Chicago", author: "Stuart Dybek", pageCount: 208, genre: "Fiction", publicationDate: "1990-01-01", description: "Fourteen linked stories of Chicago's lakefront, alleys, and immigrants.", series: null, tier: "S", topRank: null },
  { title: "I Sailed with Magellan", author: "Stuart Dybek", pageCount: 336, genre: "Fiction", publicationDate: "2003-05-06", description: "A loose novel-in-stories of one Chicago neighborhood boy across his childhood.", series: null, tier: "A", topRank: null },

  { title: "The Feast of Love", author: "Charles Baxter", pageCount: 320, genre: "Fiction", publicationDate: "2000-04-04", description: "A Michigan novelist interviews his neighbors and friends about their love lives. National Book Award finalist.", series: null, tier: "A", topRank: null },
  { title: "Saul and Patsy", author: "Charles Baxter", pageCount: 336, genre: "Fiction", publicationDate: "2003-09-09", description: "A young Jewish couple moves to a small Michigan town where Saul teaches and is stalked by a troubled student.", series: null, tier: "A", topRank: null },
  { title: "The Soul Thief", author: "Charles Baxter", pageCount: 224, genre: "Fiction", publicationDate: "2008-02-12", description: "A young man in 1970s Buffalo meets a charismatic stranger who begins to assume his identity.", series: null, tier: "A", topRank: null },

  { title: "For Kings and Planets", author: "Ethan Canin", pageCount: 352, genre: "Fiction", publicationDate: "1998-01-13", description: "A young Iowa pre-med student at Columbia falls under the spell of a charismatic classmate who keeps dropping lies.", series: null, tier: "A", topRank: null },
  { title: "Emperor of the Air", author: "Ethan Canin", pageCount: 192, genre: "Fiction", publicationDate: "1988-01-01", description: "Canin's debut story collection of nine American lives, published when he was twenty-seven.", series: null, tier: "A", topRank: null },
  { title: "A Doubter's Almanac", author: "Ethan Canin", pageCount: 576, genre: "Fiction", publicationDate: "2016-02-16", description: "A gifted mathematician in the 1970s rises and falls spectacularly, and his son inherits his burden.", series: null, tier: "A", topRank: null },

  { title: "The Grass Dancer", author: "Susan Power", pageCount: 320, genre: "Fiction", publicationDate: "1994-01-01", description: "A Dakota Sioux reservation family's stories move between the 1980s and the early twentieth century.", series: null, tier: "A", topRank: null },
  { title: "Roofwalker", author: "Susan Power", pageCount: 208, genre: "Fiction", publicationDate: "2002-01-01", description: "Stories of Dakota Sioux women moving between the reservation and Chicago.", series: null, tier: "A", topRank: null },

  { title: "The End of Vandalism", author: "Tom Drury", pageCount: 384, genre: "Fiction", publicationDate: "1994-01-01", description: "A small Iowa county's sheriff, his love life, and his quiet neighbors in Drury's cult comic masterpiece.", series: null, tier: "S", topRank: null },
  { title: "The Driftless Area", author: "Tom Drury", pageCount: 224, genre: "Fiction", publicationDate: "2006-07-27", description: "A young Wisconsin bartender's life is reorganized by a mysterious woman and a dead man's cache of money.", series: null, tier: "A", topRank: null },
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

const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "A Thousand Acres", author: "Jane Smiley", pageCount: 384, genre: "Fiction", publicationDate: "1991-01-01", description: "An Iowa farm patriarch divides his thousand acres among his three daughters in Smiley's King Lear retelling. Pulitzer Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Moo", author: "Jane Smiley", pageCount: 432, genre: "Fiction", publicationDate: "1995-01-01", description: "A satirical novel of life at a large Midwestern agricultural university over a single academic year.", series: null, tier: "A", topRank: null },
  { title: "Horse Heaven", author: "Jane Smiley", pageCount: 576, genre: "Fiction", publicationDate: "2000-01-01", description: "Two years in the world of American thoroughbred horse racing across dozens of interlinked human and equine lives.", series: null, tier: "A", topRank: null },
  { title: "Some Luck", author: "Jane Smiley", pageCount: 400, genre: "Historical Fiction", publicationDate: "2014-10-07", description: "The first volume of Smiley's Last Hundred Years trilogy following an Iowa farm family from 1920 forward.", series: { name: "The Last Hundred Years Trilogy", order: 1, total: 3 }, tier: "A", topRank: null },

  { title: "Charming Billy", author: "Alice McDermott", pageCount: 288, genre: "Fiction", publicationDate: "1998-01-01", description: "The mourners at a Long Island Irish-American funeral reconstruct the alcoholic dead man's life of charming failure. National Book Award winner.", series: null, tier: "S", topRank: null },
  { title: "After This", author: "Alice McDermott", pageCount: 288, genre: "Fiction", publicationDate: "2006-01-01", description: "A post-WWII Irish-American family on Long Island across three decades, rendered in McDermott's quiet catholic sentences.", series: null, tier: "A", topRank: null },
  { title: "That Night", author: "Alice McDermott", pageCount: 192, genre: "Fiction", publicationDate: "1987-01-01", description: "A Long Island neighborhood witnesses a teenage boy try to reclaim his girlfriend from her parents on one summer night.", series: null, tier: "A", topRank: null },

  { title: "Trust", author: "Hernan Diaz", pageCount: 416, genre: "Fiction", publicationDate: "2022-05-03", description: "Four nested accounts of a 1920s Wall Street financier's rise unravel each other. Pulitzer Prize winner.", series: null, tier: "S", topRank: null },

  { title: "Lost in the City", author: "Edward P. Jones", pageCount: 272, genre: "Fiction", publicationDate: "1992-01-01", description: "Fourteen linked stories of Black Washington, D.C. across decades — Jones's canonical debut collection.", series: null, tier: "S", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Contemporary American literary 2010s-2020s
  { title: "The Idiot", author: "Elif Batuman", pageCount: 432, genre: "Fiction", publicationDate: "2017-03-14", description: "A Turkish-American Harvard freshman in 1995 falls into an email correspondence with a Hungarian math student.", series: null, tier: "A", topRank: null },
  { title: "Either/Or", author: "Elif Batuman", pageCount: 368, genre: "Fiction", publicationDate: "2022-05-24", description: "The Idiot's sequel: Selin's Harvard sophomore year, pursued through Kierkegaard and reckless travel.", series: null, tier: "A", topRank: null },
  { title: "The Possessed", author: "Elif Batuman", pageCount: 304, genre: "Non-Fiction", publicationDate: "2010-02-16", description: "Batuman's memoir-essays on graduate school in Russian literature and the obsessed people she met there.", series: null, tier: "A", topRank: null },

  { title: "Nobody Is Ever Missing", author: "Catherine Lacey", pageCount: 256, genre: "Fiction", publicationDate: "2014-07-08", description: "A young American woman flies to New Zealand without telling her husband and hitchhikes across the country.", series: null, tier: "A", topRank: null },
  { title: "Pew", author: "Catherine Lacey", pageCount: 224, genre: "Fiction", publicationDate: "2020-07-21", description: "A genderless, mute stranger is found sleeping on a church pew in a Southern town and becomes its projection screen.", series: null, tier: "S", topRank: null },
  { title: "Biography of X", author: "Catherine Lacey", pageCount: 416, genre: "Fiction", publicationDate: "2023-03-21", description: "The widow of a famously elusive American artist sets out to write the biography her late wife forbade.", series: null, tier: "S", topRank: null },

  { title: "Taipei", author: "Tao Lin", pageCount: 256, genre: "Fiction", publicationDate: "2013-06-04", description: "A young American novelist's MDMA-soaked year between Brooklyn, Las Vegas, and Taipei with his new girlfriend.", series: null, tier: "A", topRank: null },
  { title: "Leave Society", author: "Tao Lin", pageCount: 368, genre: "Fiction", publicationDate: "2021-08-03", description: "A writer visits his parents in Taiwan across four years, trying to redesign his own consciousness and theirs.", series: null, tier: "A", topRank: null },

  // Black American contemporary
  { title: "The Prophets", author: "Robert Jones Jr.", pageCount: 400, genre: "Historical Fiction", publicationDate: "2021-01-05", description: "Two enslaved young men in love on a Deep South plantation contend with a new gospel preached by another enslaved person.", series: null, tier: "S", topRank: null },

  { title: "We Cast a Shadow", author: "Maurice Carlos Ruffin", pageCount: 336, genre: "Fiction", publicationDate: "2019-01-29", description: "A near-future Southern city offers a medical procedure to whiten Black skin — and a Black father considers it for his biracial son.", series: null, tier: "A", topRank: null },
  { title: "The American Daughters", author: "Maurice Carlos Ruffin", pageCount: 304, genre: "Historical Fiction", publicationDate: "2024-02-27", description: "An enslaved teenager in Civil War-era New Orleans joins a secret society of Black women working against the Confederacy.", series: null, tier: "A", topRank: null },

  { title: "Caul Baby", author: "Morgan Jerkins", pageCount: 384, genre: "Fiction", publicationDate: "2021-04-06", description: "Three generations of Harlem women with miraculous healing powers contend with the daughter born between two families.", series: null, tier: "A", topRank: null },
  { title: "This Will Be My Undoing", author: "Morgan Jerkins", pageCount: 272, genre: "Non-Fiction", publicationDate: "2018-01-30", description: "Essays on Black girlhood and Black womanhood across contemporary America.", series: null, tier: "A", topRank: null },

  { title: "Disgruntled", author: "Asali Solomon", pageCount: 288, genre: "Fiction", publicationDate: "2015-02-10", description: "A Black girl in 1980s Philadelphia is raised by Afrocentric intellectual parents and keeps running into the edges of their worldview.", series: null, tier: "A", topRank: null },
  { title: "The Days of Afrekete", author: "Asali Solomon", pageCount: 240, genre: "Fiction", publicationDate: "2021-10-19", description: "A Black Philadelphia woman prepares a dinner party the same night she learns her husband is being investigated.", series: null, tier: "A", topRank: null },

  { title: "Heavy", author: "Kiese Laymon", pageCount: 256, genre: "Non-Fiction", publicationDate: "2018-10-16", description: "Laymon's memoir of growing up Black in Mississippi, obesity, gambling, and the mother who raised him.", series: null, tier: "S", topRank: null },
  { title: "How to Slowly Kill Yourself and Others in America", author: "Kiese Laymon", pageCount: 192, genre: "Non-Fiction", publicationDate: "2013-08-20", description: "Laymon's early essay collection on Black masculinity, the South, and American violence.", series: null, tier: "A", topRank: null },

  // Pulitzer-era American women
  { title: "A Southern Family", author: "Gail Godwin", pageCount: 560, genre: "Fiction", publicationDate: "1987-01-01", description: "A North Carolina family is unmoored by a mysterious death that may be murder or may be suicide.", series: null, tier: "A", topRank: null },
  { title: "Father Melancholy's Daughter", author: "Gail Godwin", pageCount: 416, genre: "Fiction", publicationDate: "1991-01-01", description: "A young Episcopal rector's daughter is abandoned by her mother and raised into a complicated faith.", series: null, tier: "A", topRank: null },
  { title: "Evensong", author: "Gail Godwin", pageCount: 416, genre: "Fiction", publicationDate: "1999-01-01", description: "Father Melancholy's Daughter continues — Margaret Bonner is now a priest herself in a mountain Virginia parish.", series: null, tier: "A", topRank: null },

  { title: "Foreign Affairs", author: "Alison Lurie", pageCount: 304, genre: "Fiction", publicationDate: "1984-01-01", description: "Two American academics on sabbatical in London each have an unlikely love affair. Pulitzer Prize winner.", series: null, tier: "S", topRank: null },
  { title: "The War Between the Tates", author: "Alison Lurie", pageCount: 320, genre: "Fiction", publicationDate: "1974-01-01", description: "A Vietnam-era academic marriage breaks down in a Cornell-like upstate New York town.", series: null, tier: "A", topRank: null },
  { title: "Imaginary Friends", author: "Alison Lurie", pageCount: 288, genre: "Fiction", publicationDate: "1967-01-01", description: "Two sociologists embed themselves in a small UFO-worshipping religious group in upstate New York.", series: null, tier: "A", topRank: null },

  { title: "Rich in Love", author: "Josephine Humphreys", pageCount: 272, genre: "Fiction", publicationDate: "1987-01-01", description: "A seventeen-year-old South Carolina girl holds her family together after her mother walks out.", series: null, tier: "A", topRank: null },
  { title: "Dreams of Sleep", author: "Josephine Humphreys", pageCount: 240, genre: "Fiction", publicationDate: "1984-01-01", description: "A young mother in Charleston, her unfaithful husband, and his mistress share an unraveling spring — Hemingway Foundation Award.", series: null, tier: "A", topRank: null },

  // New England / regional
  { title: "The Bird Artist", author: "Howard Norman", pageCount: 304, genre: "Historical Fiction", publicationDate: "1994-01-01", description: "A young Newfoundland bird painter in 1911 kills the man his mother has been sleeping with — and tells you so on the first page.", series: null, tier: "S", topRank: null },
  { title: "The Museum Guard", author: "Howard Norman", pageCount: 320, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "A Halifax museum guard in 1938 falls for a woman obsessed with a painting of a Dutch Jewish refugee.", series: null, tier: "A", topRank: null },
  { title: "The Northern Lights", author: "Howard Norman", pageCount: 256, genre: "Fiction", publicationDate: "1987-01-01", description: "A Cree Indian boy in 1950s Manitoba grows up between his father's radio work and his mother's dying.", series: null, tier: "A", topRank: null },

  { title: "Selected Stories of Andre Dubus", author: "Andre Dubus", pageCount: 480, genre: "Fiction", publicationDate: "1988-01-01", description: "Dubus's most celebrated short fiction — blue-collar Massachusetts Catholic lives rendered with tenderness and grief.", series: null, tier: "S", topRank: null },
  { title: "We Don't Live Here Anymore", author: "Andre Dubus", pageCount: 272, genre: "Fiction", publicationDate: "1984-01-01", description: "Three novellas of unfaithful New England marriages — the source material for the Larry Gross film.", series: null, tier: "A", topRank: null },

  // Experimental / cult
  { title: "The Wallcreeper", author: "Nell Zink", pageCount: 192, genre: "Fiction", publicationDate: "2014-09-30", description: "An American newlywed in Switzerland crashes their car avoiding a bird and follows her husband into radical environmentalism.", series: null, tier: "A", topRank: null },
  { title: "Mislaid", author: "Nell Zink", pageCount: 256, genre: "Fiction", publicationDate: "2015-05-19", description: "A white Virginia woman walks out on her gay husband, kidnaps their daughter, and raises her as a Black girl.", series: null, tier: "A", topRank: null },
  { title: "Nicotine", author: "Nell Zink", pageCount: 304, genre: "Fiction", publicationDate: "2016-10-04", description: "A young woman inherits her father's New Jersey house, which has been taken over by a squatter collective of smokers' rights activists.", series: null, tier: "A", topRank: null },

  { title: "Sky Saw", author: "Blake Butler", pageCount: 304, genre: "Fiction", publicationDate: "2012-01-01", description: "A small American house is surrounded by an ongoing apocalypse in Butler's hermetic horror novel.", series: null, tier: "A", topRank: null },
  { title: "Scorch Atlas", author: "Blake Butler", pageCount: 192, genre: "Fiction", publicationDate: "2009-01-01", description: "Linked stories set across an America being slowly consumed by biblical plagues.", series: null, tier: "A", topRank: null },

  { title: "Dear Cyborgs", author: "Eugene Lim", pageCount: 176, genre: "Fiction", publicationDate: "2017-06-06", description: "Two Asian American schoolboys grow into men in a novel that slides between their real lives and a parallel superhero story.", series: null, tier: "A", topRank: null },
  { title: "Search History", author: "Eugene Lim", pageCount: 224, genre: "Fiction", publicationDate: "2021-10-19", description: "A grieving narrator tries to find his lost dog — possibly his lost friend reincarnated — across a search that braids grief, AI, and detective fiction.", series: null, tier: "A", topRank: null },

  { title: "Atmospheric Disturbances", author: "Rivka Galchen", pageCount: 256, genre: "Fiction", publicationDate: "2008-05-27", description: "A Manhattan psychiatrist becomes convinced that his wife has been replaced by a perfect impostor.", series: null, tier: "A", topRank: null },
  { title: "Everyone Knows Your Mother Is a Witch", author: "Rivka Galchen", pageCount: 304, genre: "Historical Fiction", publicationDate: "2021-06-08", description: "An illiterate seventeenth-century German widow — the astronomer Johannes Kepler's mother — is accused of witchcraft.", series: null, tier: "A", topRank: null },

  { title: "Heartbreaker", author: "Maryse Meijer", pageCount: 208, genre: "Fiction", publicationDate: "2016-07-12", description: "Thirteen dark stories of American girls and women at the edge of violence, desire, and their own interior weather.", series: null, tier: "A", topRank: null },
  { title: "Rag", author: "Maryse Meijer", pageCount: 208, genre: "Fiction", publicationDate: "2019-10-01", description: "Twelve more unsettling stories from Meijer — mother-son obsessions, strange domestic arrangements, the gothic suburban.", series: null, tier: "A", topRank: null },

  { title: "Intimations", author: "Alexandra Kleeman", pageCount: 224, genre: "Fiction", publicationDate: "2016-09-13", description: "Twelve stories of alienated bodies, strange rooms, and the thinly worn membrane between self and not-self.", series: null, tier: "A", topRank: null },
  { title: "Something New Under the Sun", author: "Alexandra Kleeman", pageCount: 368, genre: "Sci-Fi", publicationDate: "2021-08-03", description: "A young East Coast novelist is flown to Los Angeles to adapt his book and discovers the water supply has been replaced by something synthetic.", series: null, tier: "A", topRank: null },

  { title: "Memorial", author: "Bryan Washington", pageCount: 320, genre: "Fiction", publicationDate: "2020-10-27", description: "A Black American cook and his Japanese American boyfriend try to hold their Houston relationship together as one of them flies to Osaka.", series: null, tier: "S", topRank: null },

  // Southern literary fills
  { title: "Cavedweller", author: "Dorothy Allison", pageCount: 448, genre: "Fiction", publicationDate: "1998-01-01", description: "A rock singer returns to her Georgia hometown to reclaim the children she left behind.", series: null, tier: "A", topRank: null },
  { title: "Two or Three Things I Know for Sure", author: "Dorothy Allison", pageCount: 96, genre: "Non-Fiction", publicationDate: "1995-01-01", description: "Allison's spoken-word memoir of Southern poverty, abuse, and the women who kept her alive.", series: null, tier: "A", topRank: null },

  // Western / frontier
  { title: "Warlock", author: "Oakley Hall", pageCount: 496, genre: "Historical Fiction", publicationDate: "1958-01-01", description: "A fictionalized retelling of the Tombstone-era conflict in a silver-mining Arizona town — NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Apaches", author: "Oakley Hall", pageCount: 384, genre: "Historical Fiction", publicationDate: "1986-01-01", description: "Hall's fictional chronicle of the final years of the Apache resistance in the American Southwest.", series: null, tier: "A", topRank: null },

  { title: "The Ox-Bow Incident", author: "Walter Van Tilburg Clark", pageCount: 256, genre: "Historical Fiction", publicationDate: "1940-01-01", description: "A Nevada cattle town forms a posse that lynches three innocent men — the canonical American novel of mob justice.", series: null, tier: "S", topRank: null },
  { title: "The Track of the Cat", author: "Walter Van Tilburg Clark", pageCount: 416, genre: "Fiction", publicationDate: "1949-01-01", description: "A snowbound Nevada ranching family is stalked by a panther that may or may not be a native spirit.", series: null, tier: "A", topRank: null },

  { title: "The Big Sky", author: "A.B. Guthrie", pageCount: 400, genre: "Historical Fiction", publicationDate: "1947-01-01", description: "A young Kentucky boy runs away to the mountains of the Old West and becomes a trapper — the canonical American mountain-man novel.", series: { name: "The Big Sky", order: 1, total: 6 }, tier: "S", topRank: null },
  { title: "The Way West", author: "A.B. Guthrie", pageCount: 432, genre: "Historical Fiction", publicationDate: "1949-01-01", description: "Guthrie's Pulitzer-winning sequel follows an 1840s wagon train from Missouri to Oregon.", series: { name: "The Big Sky", order: 2, total: 6 }, tier: "S", topRank: null },
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

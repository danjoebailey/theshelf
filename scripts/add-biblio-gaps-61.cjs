const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Prophet Song", author: "Paul Lynch", pageCount: 320, genre: "Fiction", publicationDate: "2023-12-05", description: "A Dublin microbiologist and mother of four watches Ireland slide into a near-future authoritarian state. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Soldier Sailor", author: "Claire Kilroy", pageCount: 224, genre: "Fiction", publicationDate: "2023-05-09", description: "A new Irish mother narrates a year of raw, furious care of her infant son.", series: null, tier: "S", topRank: null },
  { title: "The Devil I Know", author: "Claire Kilroy", pageCount: 368, genre: "Fiction", publicationDate: "2012-09-06", description: "A recovering alcoholic Irish real estate scion is pulled into a doomed development deal during the Celtic Tiger bubble.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Irish contemporary
  { title: "Star of the Sea", author: "Joseph O'Connor", pageCount: 400, genre: "Historical Fiction", publicationDate: "2002-01-01", description: "An Irish famine ship crossing to New York in 1847 carries a killer, a dying aristocrat, and a dispossessed steerage class.", series: null, tier: "S", topRank: null },
  { title: "Cowboys and Indians", author: "Joseph O'Connor", pageCount: 272, genre: "Fiction", publicationDate: "1991-01-01", description: "A young Dublin man escapes to London and drifts through its 1980s underbelly — O'Connor's debut.", series: null, tier: "A", topRank: null },
  { title: "Ghost Light", author: "Joseph O'Connor", pageCount: 256, genre: "Historical Fiction", publicationDate: "2010-09-02", description: "An elderly Molly Allgood, Synge's former lover and muse, walks through a single day in 1952 London remembering him.", series: null, tier: "A", topRank: null },

  { title: "Spill Simmer Falter Wither", author: "Sara Baume", pageCount: 288, genre: "Fiction", publicationDate: "2015-02-12", description: "A reclusive Irish man takes in a one-eyed rescue dog and they begin a long flight through the Irish countryside.", series: null, tier: "S", topRank: null },
  { title: "A Line Made by Walking", author: "Sara Baume", pageCount: 320, genre: "Fiction", publicationDate: "2017-03-02", description: "A grieving young artist moves into her dead grandmother's bungalow and photographs dead animals.", series: null, tier: "A", topRank: null },

  { title: "The Undertaking", author: "Audrey Magee", pageCount: 288, genre: "Historical Fiction", publicationDate: "2013-02-07", description: "A German WWII soldier marries a stranger for a honeymoon leave and both are consumed by the Eastern Front and Berlin's rubble.", series: null, tier: "A", topRank: null },
  { title: "The Colony", author: "Audrey Magee", pageCount: 384, genre: "Fiction", publicationDate: "2022-03-17", description: "An English painter and a French linguist both arrive on a remote Irish-speaking island one summer in 1979.", series: null, tier: "S", topRank: null },

  { title: "These Days", author: "Lucy Caldwell", pageCount: 288, genre: "Historical Fiction", publicationDate: "2022-03-03", description: "A Belfast family tries to hold together during the 1941 Blitz.", series: null, tier: "A", topRank: null },
  { title: "Multitudes", author: "Lucy Caldwell", pageCount: 192, genre: "Fiction", publicationDate: "2016-05-05", description: "Eleven linked stories of Northern Irish girlhood and womanhood.", series: null, tier: "A", topRank: null },

  { title: "A Goat's Song", author: "Dermot Healy", pageCount: 448, genre: "Fiction", publicationDate: "1994-01-01", description: "A heavy-drinking Belfast playwright is abandoned by his lover and writes a play about her family in County Mayo.", series: null, tier: "S", topRank: null },
  { title: "The Bend for Home", author: "Dermot Healy", pageCount: 336, genre: "Non-Fiction", publicationDate: "1996-01-01", description: "Healy's lyrical memoir of his Cavan childhood and his mother.", series: null, tier: "A", topRank: null },
  { title: "Long Time, No See", author: "Dermot Healy", pageCount: 448, genre: "Fiction", publicationDate: "2011-06-09", description: "A young man on the County Sligo coast helps care for two elderly local men — Healy's quietly panoramic final novel.", series: null, tier: "A", topRank: null },

  // Scottish
  { title: "And the Land Lay Still", author: "James Robertson", pageCount: 672, genre: "Historical Fiction", publicationDate: "2010-08-05", description: "A panoramic novel of Scottish political and cultural life from WWII through devolution.", series: null, tier: "S", topRank: null },
  { title: "The Testament of Gideon Mack", author: "James Robertson", pageCount: 400, genre: "Fiction", publicationDate: "2006-08-03", description: "A rationalist Scottish minister falls into a riverbed ravine, meets the Devil, and loses his footing in the world.", series: null, tier: "A", topRank: null },
  { title: "Joseph Knight", author: "James Robertson", pageCount: 368, genre: "Historical Fiction", publicationDate: "2003-06-05", description: "An eighteenth-century Scottish planter seeks to recover his enslaved African servant from the court that freed him.", series: null, tier: "A", topRank: null },

  { title: "The Trick Is to Keep Breathing", author: "Janice Galloway", pageCount: 256, genre: "Fiction", publicationDate: "1989-01-01", description: "A young Scottish drama teacher comes apart after her married lover's drowning — Galloway's canonical debut.", series: null, tier: "S", topRank: null },
  { title: "Clara", author: "Janice Galloway", pageCount: 432, genre: "Historical Fiction", publicationDate: "2002-03-07", description: "A novel of Clara Schumann, the pianist-composer, from her childhood in her father's studio to her late widowhood.", series: null, tier: "A", topRank: null },
  { title: "Foreign Parts", author: "Janice Galloway", pageCount: 288, genre: "Fiction", publicationDate: "1994-01-01", description: "Two Scottish women take a hiking holiday through France that threatens to expose their friendship's faultlines.", series: null, tier: "A", topRank: null },

  { title: "The Cutting Room", author: "Louise Welsh", pageCount: 304, genre: "Mystery", publicationDate: "2002-07-29", description: "A Glasgow auctioneer clearing out a dead man's house discovers a set of violent old photographs — and starts investigating.", series: null, tier: "A", topRank: null },
  { title: "Naming the Bones", author: "Louise Welsh", pageCount: 384, genre: "Mystery", publicationDate: "2010-02-04", description: "An academic on a Scottish island researches a long-dead poet and uncovers the cult around him.", series: null, tier: "A", topRank: null },
  { title: "The Second Cut", author: "Louise Welsh", pageCount: 352, genre: "Mystery", publicationDate: "2022-02-10", description: "Welsh returns to Rilke, the Cutting Room auctioneer, for a case of dead young men in Glasgow's gay scene.", series: null, tier: "A", topRank: null },

  { title: "Trumpet", author: "Jackie Kay", pageCount: 288, genre: "Fiction", publicationDate: "1998-01-01", description: "A Scottish jazz trumpeter dies and is revealed to have been a woman — Kay's novel of family and gender, inspired by Billy Tipton.", series: null, tier: "S", topRank: null },
  { title: "Red Dust Road", author: "Jackie Kay", pageCount: 288, genre: "Non-Fiction", publicationDate: "2010-06-03", description: "Kay's memoir of finding her birth parents — a Scottish Highland mother and a Nigerian father.", series: null, tier: "A", topRank: null },

  { title: "The Stornoway Way", author: "Kevin MacNeil", pageCount: 288, genre: "Fiction", publicationDate: "2005-01-01", description: "An Outer Hebridean alcoholic writer's bleak and funny autobiographical notebook.", series: null, tier: "A", topRank: null },

  // Welsh
  { title: "The Dig", author: "Cynan Jones", pageCount: 176, genre: "Fiction", publicationDate: "2014-01-01", description: "A farmer in rural west Wales and a cruel badger-baiter cross paths across a single brutal week.", series: null, tier: "S", topRank: null },
  { title: "Everything I Found on the Beach", author: "Cynan Jones", pageCount: 224, genre: "Fiction", publicationDate: "2011-01-01", description: "A Welsh fisherman, a Latvian migrant worker, and a drug run gone wrong.", series: null, tier: "A", topRank: null },
  { title: "The Long Dry", author: "Cynan Jones", pageCount: 128, genre: "Fiction", publicationDate: "2006-01-01", description: "A day on a Welsh farm as the farmer searches for a missing cow.", series: null, tier: "A", topRank: null },

  { title: "Grits", author: "Niall Griffiths", pageCount: 464, genre: "Fiction", publicationDate: "2000-01-01", description: "Six drifters in Aberystwyth live on benefits, drugs, and each other's company — Griffiths's roaring debut.", series: null, tier: "A", topRank: null },
  { title: "Sheepshagger", author: "Niall Griffiths", pageCount: 256, genre: "Fiction", publicationDate: "2001-01-01", description: "A feral young Welsh farmer turns a weekend of violence into an elemental revenge.", series: null, tier: "A", topRank: null },

  { title: "The White Trail", author: "Fflur Dafydd", pageCount: 192, genre: "Fiction", publicationDate: "2011-01-01", description: "A retelling of the Mabinogion tale Culhwch ac Olwen set in contemporary Wales.", series: null, tier: "A", topRank: null },

  // Contemporary English
  { title: "The Millstone", author: "Margaret Drabble", pageCount: 192, genre: "Fiction", publicationDate: "1965-01-01", description: "A young Cambridge graduate in 1960s London has a one-night stand and decides to keep the baby.", series: null, tier: "S", topRank: null },
  { title: "The Radiant Way", author: "Margaret Drabble", pageCount: 416, genre: "Fiction", publicationDate: "1987-01-01", description: "Three Cambridge friends navigate 1980s Thatcherite England — the first of Drabble's Thatcher trilogy.", series: null, tier: "A", topRank: null },
  { title: "The Middle Ground", author: "Margaret Drabble", pageCount: 288, genre: "Fiction", publicationDate: "1980-01-01", description: "A London journalist at mid-life takes stock of her marriage, her work, and her generation.", series: null, tier: "A", topRank: null },

  { title: "The Finkler Question", author: "Howard Jacobson", pageCount: 320, genre: "Fiction", publicationDate: "2010-07-01", description: "A non-Jewish Englishman is mugged by a woman in London and becomes obsessed with his Jewish friends' cultural life. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Kalooki Nights", author: "Howard Jacobson", pageCount: 464, genre: "Fiction", publicationDate: "2006-06-29", description: "A lapsed Jewish cartoonist in Manchester remembers his boyhood friend who murdered his own parents.", series: null, tier: "A", topRank: null },

  // Australian literary
  { title: "Grand Days", author: "Frank Moorhouse", pageCount: 576, genre: "Historical Fiction", publicationDate: "1993-01-01", description: "A young Australian woman joins the League of Nations in 1920s Geneva in Moorhouse's Edith Campbell Berry trilogy opener.", series: { name: "Edith Trilogy", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "Dark Palace", author: "Frank Moorhouse", pageCount: 656, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "Edith Campbell Berry's life continues through the 1930s as the League of Nations collapses. Miles Franklin Award winner.", series: { name: "Edith Trilogy", order: 2, total: 3 }, tier: "S", topRank: null },

  { title: "Eucalyptus", author: "Murray Bail", pageCount: 272, genre: "Fiction", publicationDate: "1998-01-01", description: "A rural Australian father plants hundreds of eucalyptus species and promises his daughter to whoever can name them all.", series: null, tier: "S", topRank: null },
  { title: "Homesickness", author: "Murray Bail", pageCount: 352, genre: "Fiction", publicationDate: "1980-01-01", description: "Thirteen Australian tourists travel the world encountering a series of absurd museums.", series: null, tier: "A", topRank: null },

  { title: "The Natural Way of Things", author: "Charlotte Wood", pageCount: 320, genre: "Fiction", publicationDate: "2015-10-01", description: "Ten Australian women wake up imprisoned in a remote outback facility for sexual scandals men have made them into. Stella Prize winner.", series: null, tier: "S", topRank: null },
  { title: "The Weekend", author: "Charlotte Wood", pageCount: 272, genre: "Fiction", publicationDate: "2019-10-01", description: "Three old friends in their seventies gather at a fourth friend's beach house after her death to clear it out.", series: null, tier: "A", topRank: null },
  { title: "Stone Yard Devotional", author: "Charlotte Wood", pageCount: 288, genre: "Fiction", publicationDate: "2023-10-03", description: "A woman retreats to a small monastery in rural Australia and the plague that arrives brings her past back. Booker Prize shortlist.", series: null, tier: "S", topRank: null },

  { title: "Burial Rites", author: "Hannah Kent", pageCount: 336, genre: "Historical Fiction", publicationDate: "2013-08-29", description: "The last woman to be executed in Iceland, awaiting her fate in 1829 on a remote farm. Kent's debut.", series: null, tier: "S", topRank: null },
  { title: "The Good People", author: "Hannah Kent", pageCount: 400, genre: "Historical Fiction", publicationDate: "2016-10-04", description: "Three Irish women in 1825 Kerry contend with a strange child they believe has been taken by the fairies.", series: null, tier: "A", topRank: null },

  { title: "My Brilliant Career", author: "Miles Franklin", pageCount: 240, genre: "Fiction", publicationDate: "1901-01-01", description: "A teenage girl in 1890s rural New South Wales determines to be a writer — the canonical early Australian feminist novel.", series: null, tier: "S", topRank: null },

  // Indian English
  { title: "All the Lives We Never Lived", author: "Anuradha Roy", pageCount: 336, genre: "Historical Fiction", publicationDate: "2018-08-14", description: "A son reconstructs the life of his mother, who abandoned him in 1937 to travel with Walter Spies to Bali.", series: null, tier: "S", topRank: null },
  { title: "An Atlas of Impossible Longing", author: "Anuradha Roy", pageCount: 320, genre: "Fiction", publicationDate: "2008-01-01", description: "Three generations of a Bengali family across twentieth-century India, centered on a foundling boy and the daughter of the house.", series: null, tier: "A", topRank: null },
  { title: "The Folded Earth", author: "Anuradha Roy", pageCount: 272, genre: "Fiction", publicationDate: "2011-03-01", description: "A young widow moves to a small Himalayan town and its history slowly unravels around her.", series: null, tier: "A", topRank: null },

  { title: "We That Are Young", author: "Preti Taneja", pageCount: 576, genre: "Fiction", publicationDate: "2017-08-08", description: "A Delhi-based business dynasty and its retelling as King Lear — the novel that won the Desmond Elliott Prize.", series: null, tier: "A", topRank: null },

  { title: "One Part Woman", author: "Perumal Murugan", pageCount: 256, genre: "Fiction", publicationDate: "2010-01-01", description: "A rural Tamil couple desperate for a child is drawn into a temple fertility ritual that changes their marriage forever.", series: null, tier: "S", topRank: null },
  { title: "Seasons of the Palm", author: "Perumal Murugan", pageCount: 256, genre: "Fiction", publicationDate: "2000-01-01", description: "A Dalit child working as a bonded goatherd for a Tamil farming family in mid-twentieth-century South India.", series: null, tier: "A", topRank: null },
  { title: "Pyre", author: "Perumal Murugan", pageCount: 224, genre: "Fiction", publicationDate: "2013-01-01", description: "A young inter-caste couple flees their villages in rural Tamil Nadu and tries to build a life.", series: null, tier: "A", topRank: null },

  { title: "Narcopolis", author: "Jeet Thayil", pageCount: 304, genre: "Fiction", publicationDate: "2012-01-17", description: "A decades-long drift through the opium dens and heroin trade of Bombay's Shuklaji Street. Booker Prize shortlist.", series: null, tier: "S", topRank: null },
  { title: "Low", author: "Jeet Thayil", pageCount: 256, genre: "Fiction", publicationDate: "2020-07-07", description: "A widowed Indian man flies to Bombay to scatter his wife's ashes and spends the weekend with drug dealers and old friends.", series: null, tier: "A", topRank: null },

  { title: "Immigrant, Montana", author: "Amitava Kumar", pageCount: 320, genre: "Fiction", publicationDate: "2018-07-31", description: "A young Indian graduate student at an American college drifts through the 1990s Northeast in a semi-autobiographical novel.", series: null, tier: "A", topRank: null },
  { title: "A Time Outside This Time", author: "Amitava Kumar", pageCount: 304, genre: "Fiction", publicationDate: "2021-10-19", description: "An Indian American writer at a residency watches the pandemic and misinformation age reshape what he thought he was writing.", series: null, tier: "A", topRank: null },
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

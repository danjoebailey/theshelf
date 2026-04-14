const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Clear Light of Day", author: "Anita Desai", pageCount: 183, genre: "Fiction", publicationDate: "1980-01-01", description: "Four grown siblings gather at their old Delhi home and reckon with the choices — and rivalries — that shaped their lives.", series: null, tier: "S", topRank: null },
  { title: "In Custody", author: "Anita Desai", pageCount: 224, genre: "Fiction", publicationDate: "1984-01-01", description: "A provincial Indian Hindi lecturer is tasked with interviewing his aging hero, an Urdu poet in decline.", series: null, tier: "A", topRank: null },
  { title: "Fasting, Feasting", author: "Anita Desai", pageCount: 240, genre: "Fiction", publicationDate: "1999-01-01", description: "A dutiful Indian daughter and her American-dwelling brother each contend with what their families expect of them.", series: null, tier: "A", topRank: null },
  { title: "The Zigzag Way", author: "Anita Desai", pageCount: 176, genre: "Fiction", publicationDate: "2004-01-01", description: "A young American scholar in Mexico uncovers a Cornish mining past and his own family's buried story.", series: null, tier: "B", topRank: null },

  { title: "The Secret River", author: "Kate Grenville", pageCount: 352, genre: "Historical Fiction", publicationDate: "2005-01-01", description: "A Thames waterman transported to New South Wales in 1806 takes a piece of land along the Hawkesbury and must decide what he will do to keep it.", series: { name: "Thornhill", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "The Idea of Perfection", author: "Kate Grenville", pageCount: 416, genre: "Fiction", publicationDate: "1999-01-01", description: "An engineer and a museum curator are both sent to the same small Australian town to decide the fate of a crumbling bridge.", series: null, tier: "A", topRank: null },
  { title: "Sarah Thornhill", author: "Kate Grenville", pageCount: 320, genre: "Historical Fiction", publicationDate: "2011-01-01", description: "The next generation of the Thornhill family inherits the land — and the reckoning it demands.", series: { name: "Thornhill", order: 3, total: 3 }, tier: "A", topRank: null },

  { title: "Oscar and Lucinda", author: "Peter Carey", pageCount: 512, genre: "Historical Fiction", publicationDate: "1988-01-01", description: "Two unlikely gamblers in nineteenth-century Australia undertake a mad journey to transport a glass church upriver. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "True History of the Kelly Gang", author: "Peter Carey", pageCount: 368, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "Ned Kelly's own voice narrates the life of the bushranger in a torrent of unpunctuated nineteenth-century Australian vernacular. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Parrot and Olivier in America", author: "Peter Carey", pageCount: 400, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "A French aristocrat loosely modeled on Tocqueville travels to Jacksonian America with a working-class English servant.", series: null, tier: "A", topRank: null },

  { title: "The Narrow Road to the Deep North", author: "Richard Flanagan", pageCount: 464, genre: "Historical Fiction", publicationDate: "2013-09-05", description: "An Australian surgeon survives the Japanese POW camps of the Burma railway and carries his war home. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Gould's Book of Fish", author: "Richard Flanagan", pageCount: 464, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "A nineteenth-century convict on Tasmania's Sarah Island paints the colony's fish and recounts his baroque sufferings.", series: null, tier: "A", topRank: null },

  { title: "The Transit of Venus", author: "Shirley Hazzard", pageCount: 352, genre: "Fiction", publicationDate: "1980-01-01", description: "Two orphaned Australian sisters in postwar England move through three decades of love and consequence.", series: null, tier: "S", topRank: null },
  { title: "The Great Fire", author: "Shirley Hazzard", pageCount: 278, genre: "Fiction", publicationDate: "2003-01-01", description: "A decorated British veteran in occupied postwar Japan falls in love with the teenage daughter of an Australian commander.", series: null, tier: "S", topRank: null },

  { title: "The Sellout", author: "Paul Beatty", pageCount: 304, genre: "Fiction", publicationDate: "2015-03-03", description: "A Black farmer in an agrarian Los Angeles ghetto tries to reinstate slavery and segregation as a satirical act. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Slumberland", author: "Paul Beatty", pageCount: 242, genre: "Fiction", publicationDate: "2008-01-01", description: "A Black American DJ in post-Wall Berlin searches for a legendary elusive jazzman and finds a riff on race and art.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Irish / Commonwealth
  { title: "Solar Bones", author: "Mike McCormack", pageCount: 272, genre: "Fiction", publicationDate: "2016-01-01", description: "A Mayo engineer sits at his kitchen table on All Souls' Day and recounts his life in a single unbroken sentence.", series: null, tier: "S", topRank: null },
  { title: "Notes from a Coma", author: "Mike McCormack", pageCount: 224, genre: "Sci-Fi", publicationDate: "2005-01-01", description: "An Irish orphan volunteers for a European penal experiment in deep-coma imprisonment.", series: null, tier: "A", topRank: null },
  { title: "Crowe's Requiem", author: "Mike McCormack", pageCount: 208, genre: "Fiction", publicationDate: "1998-01-01", description: "A young west-of-Ireland man loses himself in Dublin after moving from his remote rural home.", series: null, tier: "B", topRank: null },

  { title: "A Case of Exploding Mangoes", author: "Mohammed Hanif", pageCount: 336, genre: "Fiction", publicationDate: "2008-01-01", description: "A conspiracy-spiraled account of the 1988 plane crash that killed Pakistani dictator Zia ul-Haq.", series: null, tier: "S", topRank: null },
  { title: "Our Lady of Alice Bhatti", author: "Mohammed Hanif", pageCount: 240, genre: "Fiction", publicationDate: "2011-01-01", description: "A Christian nurse in a Karachi hospital navigates sectarian violence and the miraculous.", series: null, tier: "A", topRank: null },
  { title: "Red Birds", author: "Mohammed Hanif", pageCount: 304, genre: "Fiction", publicationDate: "2018-01-01", description: "An American pilot shot down over a desert country is rescued by the very refugees he was sent to bomb.", series: null, tier: "A", topRank: null },

  { title: "Fugitive Pieces", author: "Anne Michaels", pageCount: 294, genre: "Fiction", publicationDate: "1996-01-01", description: "A Greek geologist rescues a Jewish boy from a Polish forest during WWII; the boy grows up to become a poet in Toronto.", series: null, tier: "S", topRank: null },
  { title: "The Winter Vault", author: "Anne Michaels", pageCount: 352, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "An engineer on the Aswan High Dam and a young Canadian woman's marriage is broken by a shared grief.", series: null, tier: "A", topRank: null },

  { title: "Away", author: "Jane Urquhart", pageCount: 400, genre: "Historical Fiction", publicationDate: "1993-01-01", description: "A nineteenth-century Irish woman carries a family curse from Donegal to the Canadian backwoods.", series: null, tier: "A", topRank: null },
  { title: "The Stone Carvers", author: "Jane Urquhart", pageCount: 400, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "A brother and sister from a Canadian immigrant community travel to Vimy Ridge to carve the names of their lost dead.", series: null, tier: "A", topRank: null },
  { title: "The Underpainter", author: "Jane Urquhart", pageCount: 352, genre: "Fiction", publicationDate: "1997-01-01", description: "An elderly American minimalist painter recalls the friendships and affairs he sacrificed to his art.", series: null, tier: "A", topRank: null },

  { title: "February", author: "Lisa Moore", pageCount: 320, genre: "Fiction", publicationDate: "2009-01-01", description: "A Newfoundland widow rebuilds her life twenty-six years after the Ocean Ranger oil rig sinks, taking her husband with it.", series: null, tier: "A", topRank: null },
  { title: "Caught", author: "Lisa Moore", pageCount: 336, genre: "Thriller", publicationDate: "2013-01-01", description: "A Newfoundland drug smuggler escapes prison in 1978 and tries one last run.", series: null, tier: "A", topRank: null },
  { title: "Alligator", author: "Lisa Moore", pageCount: 320, genre: "Fiction", publicationDate: "2005-01-01", description: "Six residents of St. John's, Newfoundland share a week of collisions and quiet upheavals.", series: null, tier: "A", topRank: null },

  { title: "Mr Scobie's Riddle", author: "Elizabeth Jolley", pageCount: 224, genre: "Fiction", publicationDate: "1983-01-01", description: "An elderly man is imprisoned in a suburban Australian nursing home run by a scheming matron.", series: null, tier: "A", topRank: null },
  { title: "The Well", author: "Elizabeth Jolley", pageCount: 176, genre: "Fiction", publicationDate: "1986-01-01", description: "A middle-aged Australian woman and her young companion hit something on the road home — and dump the body into their farm well.", series: null, tier: "S", topRank: null },
  { title: "Miss Peabody's Inheritance", author: "Elizabeth Jolley", pageCount: 160, genre: "Fiction", publicationDate: "1983-01-01", description: "A repressed British spinster corresponds with an eccentric Australian novelist, and the letters slowly transform her.", series: null, tier: "A", topRank: null },

  // German
  { title: "The Blind Side of the Heart", author: "Julia Franck", pageCount: 432, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "At the end of WWII, a German mother abandons her young son at a railway station. Her life unfolds backward from that moment.", series: null, tier: "S", topRank: null },
  { title: "Back to Back", author: "Julia Franck", pageCount: 288, genre: "Fiction", publicationDate: "2011-01-01", description: "Two siblings in 1950s East Berlin are raised by a sculptor mother who treats them as obstacles.", series: null, tier: "A", topRank: null },

  // Asian Canadian
  { title: "Do Not Say We Have Nothing", author: "Madeleine Thien", pageCount: 480, genre: "Historical Fiction", publicationDate: "2016-05-03", description: "A Chinese family's story across Mao's Cultural Revolution, told through music and mathematics.", series: null, tier: "S", topRank: null },
  { title: "Dogs at the Perimeter", author: "Madeleine Thien", pageCount: 256, genre: "Fiction", publicationDate: "2011-01-01", description: "A Montreal neuroscientist confronts her childhood as a refugee from Pol Pot's Cambodia.", series: null, tier: "A", topRank: null },
  { title: "Certainty", author: "Madeleine Thien", pageCount: 320, genre: "Fiction", publicationDate: "2006-01-01", description: "A Canadian journalist investigates the unexplained death of her father, a refugee from WWII Borneo.", series: null, tier: "A", topRank: null },

  // Chilean / Latin American
  { title: "Bonsai", author: "Alejandro Zambra", pageCount: 96, genre: "Fiction", publicationDate: "2006-01-01", description: "A Chilean writer and a woman he once loved are bound together by a book they lie about reading.", series: null, tier: "S", topRank: null },
  { title: "Multiple Choice", author: "Alejandro Zambra", pageCount: 160, genre: "Fiction", publicationDate: "2014-01-01", description: "A novel in the form of a Chilean aptitude test, with answers that reshape themselves as you read.", series: null, tier: "A", topRank: null },
  { title: "Chilean Poet", author: "Alejandro Zambra", pageCount: 368, genre: "Fiction", publicationDate: "2020-01-01", description: "A stepfather, a stepson, and the long Chilean poetic tradition they both end up carrying.", series: null, tier: "A", topRank: null },
  { title: "Ways of Going Home", author: "Alejandro Zambra", pageCount: 160, genre: "Fiction", publicationDate: "2011-01-01", description: "A nine-year-old boy in Pinochet's Chile is asked to spy on a neighbor; decades later, the writer who was that boy tries to understand.", series: null, tier: "A", topRank: null },

  { title: "Optic Nerve", author: "Maria Gainza", pageCount: 208, genre: "Fiction", publicationDate: "2014-01-01", description: "An Argentine art critic weaves her own life through meditations on eleven painters.", series: null, tier: "A", topRank: null },
  { title: "Portrait of an Unknown Lady", author: "Maria Gainza", pageCount: 192, genre: "Fiction", publicationDate: "2019-01-01", description: "A former art appraiser in Buenos Aires investigates a legendary forger of a forgotten female painter.", series: null, tier: "A", topRank: null },

  { title: "Texas: The Great Theft", author: "Carmen Boullosa", pageCount: 288, genre: "Historical Fiction", publicationDate: "2013-01-01", description: "A Mexican bandit rides across the 1859 Texas border with a gang bent on reclaiming stolen land.", series: null, tier: "A", topRank: null },
  { title: "Before", author: "Carmen Boullosa", pageCount: 128, genre: "Fiction", publicationDate: "1989-01-01", description: "A dead girl narrates her own Mexican childhood from some state past life.", series: null, tier: "A", topRank: null },
  { title: "They're Cows, We're Pigs", author: "Carmen Boullosa", pageCount: 192, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A young girl joins a band of Caribbean pirates in the seventeenth century and learns the boundaries of their savage freedoms.", series: null, tier: "B", topRank: null },

  { title: "The Taiga Syndrome", author: "Cristina Rivera Garza", pageCount: 128, genre: "Fiction", publicationDate: "2012-01-01", description: "A former detective travels to the Siberian taiga to find a woman who has willingly disappeared into the forest.", series: null, tier: "A", topRank: null },
  { title: "The Iliac Crest", author: "Cristina Rivera Garza", pageCount: 160, genre: "Fiction", publicationDate: "2002-01-01", description: "A doctor on the Mexican coast is visited by two women who claim to know his body better than he does.", series: null, tier: "A", topRank: null },
  { title: "Liliana's Invincible Summer", author: "Cristina Rivera Garza", pageCount: 320, genre: "Non-Fiction", publicationDate: "2021-01-01", description: "A memoir-investigation into the femicide of the author's sister in 1990 Mexico City.", series: null, tier: "S", topRank: null },

  // Contemporary American
  { title: "Snow Hunters", author: "Paul Yoon", pageCount: 208, genre: "Fiction", publicationDate: "2013-01-01", description: "A young North Korean POW after the Korean War is resettled in a coastal Brazilian town as a tailor's apprentice.", series: null, tier: "A", topRank: null },
  { title: "Once the Shore", author: "Paul Yoon", pageCount: 256, genre: "Fiction", publicationDate: "2009-01-01", description: "Eight linked stories set on a fictional Korean island spanning Japanese occupation to the present.", series: null, tier: "A", topRank: null },
  { title: "The Mountain", author: "Paul Yoon", pageCount: 256, genre: "Fiction", publicationDate: "2017-01-01", description: "Six stories of displaced lives across twentieth-century Europe and Asia.", series: null, tier: "A", topRank: null },

  { title: "You Are Not a Stranger Here", author: "Adam Haslett", pageCount: 240, genre: "Fiction", publicationDate: "2002-01-01", description: "Nine stories of people in varying states of mental crisis, handled with rare precision and compassion.", series: null, tier: "S", topRank: null },
  { title: "Union Atlantic", author: "Adam Haslett", pageCount: 336, genre: "Fiction", publicationDate: "2010-01-01", description: "A fraught Wall Street banker and his elderly retired-history-teacher neighbor collide over a property dispute.", series: null, tier: "A", topRank: null },
  { title: "Imagine Me Gone", author: "Adam Haslett", pageCount: 368, genre: "Fiction", publicationDate: "2016-05-03", description: "A family reckons across decades with the father's depression and the eldest son's inheritance of the same illness.", series: null, tier: "S", topRank: null },

  { title: "Ways to Disappear", author: "Idra Novey", pageCount: 272, genre: "Fiction", publicationDate: "2016-01-01", description: "A translator flies to Rio to find her elusive novelist after the author climbs into an almond tree and vanishes.", series: null, tier: "A", topRank: null },
  { title: "Those Who Knew", author: "Idra Novey", pageCount: 256, genre: "Fiction", publicationDate: "2018-01-01", description: "A former activist on an unnamed island nation suspects a rising politician of murdering a young woman.", series: null, tier: "A", topRank: null },

  { title: "The Twelve Tribes of Hattie", author: "Ayana Mathis", pageCount: 256, genre: "Fiction", publicationDate: "2012-12-04", description: "A Black woman who moved north in the Great Migration raises eleven children and one grandchild across the twentieth century.", series: null, tier: "S", topRank: null },

  // African
  { title: "The Old Drift", author: "Namwali Serpell", pageCount: 566, genre: "Fiction", publicationDate: "2019-03-26", description: "Three Zambian families — Black, white, and Indian — across a century of the country's history, ending in an Afrofuturist near-future.", series: null, tier: "S", topRank: null },
  { title: "The Furrows", author: "Namwali Serpell", pageCount: 272, genre: "Fiction", publicationDate: "2022-09-27", description: "A woman whose brother drowned when she was twelve keeps meeting men who seem to be him.", series: null, tier: "A", topRank: null },

  // Turkish
  { title: "Istanbul Istanbul", author: "Burhan Sönmez", pageCount: 240, genre: "Fiction", publicationDate: "2015-01-01", description: "Four prisoners in an underground cell beneath Istanbul tell each other stories to survive.", series: null, tier: "A", topRank: null },
  { title: "Labyrinth", author: "Burhan Sönmez", pageCount: 176, genre: "Fiction", publicationDate: "2018-01-01", description: "An Istanbul blues musician wakes after a suicide attempt with no memory and must piece his life back together.", series: null, tier: "A", topRank: null },
  { title: "Stone and Shadow", author: "Burhan Sönmez", pageCount: 368, genre: "Fiction", publicationDate: "2021-01-01", description: "An Istanbul gravestone engraver whose life spans a century of Turkish history.", series: null, tier: "A", topRank: null },

  // Chinese
  { title: "To Live", author: "Yu Hua", pageCount: 256, genre: "Historical Fiction", publicationDate: "1993-01-01", description: "A Chinese landowner's son loses everything in the civil war and the Cultural Revolution, yet keeps living.", series: null, tier: "S", topRank: null },
  { title: "Brothers", author: "Yu Hua", pageCount: 656, genre: "Fiction", publicationDate: "2005-01-01", description: "Two stepbrothers grow up in a small town from the Cultural Revolution through the boom years of Chinese capitalism.", series: null, tier: "S", topRank: null },
  { title: "Chronicle of a Blood Merchant", author: "Yu Hua", pageCount: 272, genre: "Fiction", publicationDate: "1995-01-01", description: "A cart-pusher in a small Chinese town sells his blood across decades to keep his family alive.", series: null, tier: "S", topRank: null },

  { title: "Five Spice Street", author: "Can Xue", pageCount: 352, genre: "Fiction", publicationDate: "1988-01-01", description: "An impossible-to-age Chinese woman and her neighbors' obsession with her in a surrealist satire of gossip and power.", series: null, tier: "A", topRank: null },
  { title: "The Last Lover", author: "Can Xue", pageCount: 336, genre: "Fiction", publicationDate: "2005-01-01", description: "A feverish vision of capitalist desire where characters step in and out of each other's dreams and skin.", series: null, tier: "A", topRank: null },
  { title: "I Live in the Slums", author: "Can Xue", pageCount: 256, genre: "Fiction", publicationDate: "2020-01-01", description: "Stories where animals, objects, and consciousness slip past their usual boundaries.", series: null, tier: "A", topRank: null },
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

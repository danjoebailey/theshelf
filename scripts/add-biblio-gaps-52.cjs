const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Why Did I Ever", author: "Mary Robison", pageCount: 208, genre: "Fiction", publicationDate: "2001-01-01", description: "A Hollywood script doctor in her fifties loses her son and her grip in 536 numbered sections — Robison's cult masterpiece.", series: null, tier: "S", topRank: null },
  { title: "Oh!", author: "Mary Robison", pageCount: 176, genre: "Fiction", publicationDate: "1981-01-01", description: "A wealthy Midwestern family's summer disintegration in Robison's clipped minimalist voice.", series: null, tier: "A", topRank: null },

  { title: "The Public Burning", author: "Robert Coover", pageCount: 560, genre: "Historical Fiction", publicationDate: "1977-01-01", description: "The execution of the Rosenbergs reimagined as a carnivalesque public spectacle staged in Times Square, narrated by Vice President Nixon.", series: null, tier: "S", topRank: null },
  { title: "Pricksongs & Descants", author: "Robert Coover", pageCount: 256, genre: "Fiction", publicationDate: "1969-01-01", description: "Coover's canonical metafictional story collection — fairy tales, baseball games, Biblical scenes all dismantled.", series: null, tier: "S", topRank: null },

  { title: "The Sot-Weed Factor", author: "John Barth", pageCount: 800, genre: "Historical Fiction", publicationDate: "1960-01-01", description: "A mock-eighteenth-century picaresque about an English tobacco poet who sails to Maryland to compose an epic of the colony.", series: null, tier: "S", topRank: null },
  { title: "Giles Goat-Boy", author: "John Barth", pageCount: 768, genre: "Fiction", publicationDate: "1966-01-01", description: "The son of a university computer is raised by goats and grows up to become the Grand Tutor — Barth's massive Cold War allegory.", series: null, tier: "A", topRank: null },

  { title: "The Collected Stories of Amy Hempel", author: "Amy Hempel", pageCount: 432, genre: "Fiction", publicationDate: "2006-01-01", description: "Hempel's complete short fiction — four books' worth of the most precise American minimalist stories.", series: null, tier: "S", topRank: null },

  { title: "A Good Scent from a Strange Mountain", author: "Robert Olen Butler", pageCount: 272, genre: "Fiction", publicationDate: "1992-01-01", description: "Fifteen stories of Vietnamese refugees in a small bayou Louisiana town — Pulitzer Prize winner.", series: null, tier: "S", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Minimalist / dirty realism
  { title: "Town Smokes", author: "Pinckney Benedict", pageCount: 128, genre: "Fiction", publicationDate: "1987-01-01", description: "Appalachian short stories from West Virginia's Alleghenies — Benedict's O. Henry-winning debut.", series: null, tier: "A", topRank: null },
  { title: "Dogs of God", author: "Pinckney Benedict", pageCount: 320, genre: "Fiction", publicationDate: "1994-01-01", description: "A West Virginia marijuana grower takes on the state's meth-dealing biker clans.", series: null, tier: "A", topRank: null },

  { title: "The Pugilist at Rest", author: "Thom Jones", pageCount: 240, genre: "Fiction", publicationDate: "1993-01-01", description: "Eleven stories of boxers, Vietnam medics, and diabetic academics — Jones's National Book Award-shortlisted debut.", series: null, tier: "S", topRank: null },

  { title: "Peace", author: "Richard Bausch", pageCount: 176, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "Three American soldiers in Italy in the final days of WWII are sent up a snowy mountain to find a German sniper.", series: null, tier: "A", topRank: null },

  // Vietnam War novels
  { title: "A Rumor of War", author: "Philip Caputo", pageCount: 384, genre: "Non-Fiction", publicationDate: "1977-01-01", description: "Caputo's canonical memoir of his year as a young Marine officer in Vietnam — one of the foundational American accounts of the war.", series: null, tier: "S", topRank: null },
  { title: "Acts of Faith", author: "Philip Caputo", pageCount: 688, genre: "Fiction", publicationDate: "2005-01-01", description: "An American aid worker in Sudan gets drawn into arms smuggling to southern Sudanese rebels.", series: null, tier: "A", topRank: null },

  { title: "The Short-Timers", author: "Gustav Hasford", pageCount: 192, genre: "Fiction", publicationDate: "1979-01-01", description: "A Marine journalist survives the Tet Offensive and the battle for Huế — the source novel for Full Metal Jacket.", series: null, tier: "S", topRank: null },

  { title: "Meditations in Green", author: "Stephen Wright", pageCount: 352, genre: "Fiction", publicationDate: "1983-01-01", description: "A Vietnam veteran recovers in drugged New York while the novel cycles through his war — Wright's cult Vietnam novel.", series: null, tier: "A", topRank: null },
  { title: "Going Native", author: "Stephen Wright", pageCount: 336, genre: "Fiction", publicationDate: "1994-01-01", description: "A Chicago family man abandons his life and embarks on a continent-crossing descent into American violence.", series: null, tier: "A", topRank: null },

  { title: "Paco's Story", author: "Larry Heinemann", pageCount: 224, genre: "Fiction", publicationDate: "1986-01-01", description: "The ghosts of a Vietnam platoon narrate the life of the sole survivor after he returns to a small Texas town. National Book Award winner.", series: null, tier: "S", topRank: null },

  { title: "What It Is Like to Go to War", author: "Karl Marlantes", pageCount: 272, genre: "Non-Fiction", publicationDate: "2011-08-30", description: "Marlantes's meditation-memoir on combat and its lifelong psychic cost, drawn from his own Marine service.", series: null, tier: "A", topRank: null },

  // Working class / rural
  { title: "Once Upon a River", author: "Bonnie Jo Campbell", pageCount: 368, genre: "Fiction", publicationDate: "2011-07-05", description: "A teenage girl with a rifle runs away down the Stark River in rural Michigan after her father is killed.", series: null, tier: "S", topRank: null },
  { title: "American Salvage", author: "Bonnie Jo Campbell", pageCount: 176, genre: "Fiction", publicationDate: "2009-01-01", description: "Fourteen stories of rural Michigan people scraping by on meth, auto parts, and the edges of the rustbelt economy. National Book Award finalist.", series: null, tier: "A", topRank: null },
  { title: "Mothers, Tell Your Daughters", author: "Bonnie Jo Campbell", pageCount: 288, genre: "Fiction", publicationDate: "2015-10-06", description: "Sixteen more rural Michigan stories, mostly of women.", series: null, tier: "A", topRank: null },

  { title: "Crimes in Southern Indiana", author: "Frank Bill", pageCount: 272, genre: "Fiction", publicationDate: "2011-09-13", description: "Seventeen stories of meth, cockfighting, and rural carnage — Bill's country noir debut.", series: null, tier: "A", topRank: null },
  { title: "The Savage", author: "Frank Bill", pageCount: 336, genre: "Fiction", publicationDate: "2017-03-07", description: "A near-future rural America collapsed into civil war, told in Bill's relentless Appalachian voice.", series: null, tier: "A", topRank: null },

  { title: "I Want to Show You More", author: "Jamie Quatro", pageCount: 224, genre: "Fiction", publicationDate: "2013-03-05", description: "Fifteen stories of adultery, marriage, and running set in a small Tennessee mountain town.", series: null, tier: "A", topRank: null },
  { title: "Fire Sermon", author: "Jamie Quatro", pageCount: 208, genre: "Fiction", publicationDate: "2018-01-09", description: "A middle-aged Tennessee woman enters an obsessive correspondence-turned-affair with a poet she has never met.", series: null, tier: "A", topRank: null },

  { title: "The Brothers K", author: "David James Duncan", pageCount: 656, genre: "Fiction", publicationDate: "1992-01-01", description: "A Seventh-Day Adventist Washington family of four baseball-obsessed brothers lives through the Vietnam era.", series: null, tier: "S", topRank: null },

  // Classic noir women
  { title: "In a Lonely Place", author: "Dorothy B. Hughes", pageCount: 224, genre: "Mystery", publicationDate: "1947-01-01", description: "A returning WWII vet in postwar Los Angeles is secretly strangling young women — Hughes's canonical psychological noir.", series: null, tier: "S", topRank: null },
  { title: "The Expendable Man", author: "Dorothy B. Hughes", pageCount: 256, genre: "Mystery", publicationDate: "1963-01-01", description: "A Black doctor driving through Arizona picks up a teenage hitchhiker and her subsequent death pins him into a racist frame.", series: null, tier: "S", topRank: null },
  { title: "Ride the Pink Horse", author: "Dorothy B. Hughes", pageCount: 224, genre: "Mystery", publicationDate: "1946-01-01", description: "A Chicago mobster arrives in New Mexico during fiesta week to blackmail an old associate.", series: null, tier: "A", topRank: null },

  { title: "Beast in View", author: "Margaret Millar", pageCount: 176, genre: "Mystery", publicationDate: "1955-01-01", description: "A neurotic San Francisco woman receives a series of menacing phone calls from a woman who knows her name. Edgar Award winner.", series: null, tier: "S", topRank: null },
  { title: "The Iron Gates", author: "Margaret Millar", pageCount: 256, genre: "Mystery", publicationDate: "1945-01-01", description: "The wife of a Toronto doctor receives a threatening letter and slowly slides into certainty that someone is coming for her.", series: null, tier: "A", topRank: null },
  { title: "An Air That Kills", author: "Margaret Millar", pageCount: 256, genre: "Mystery", publicationDate: "1957-01-01", description: "A Toronto businessman disappears on a fishing trip, and his friends and wife slowly piece together why.", series: null, tier: "A", topRank: null },

  { title: "Laura", author: "Vera Caspary", pageCount: 224, genre: "Mystery", publicationDate: "1942-01-01", description: "A Manhattan advertising woman is murdered in her apartment — but the detective investigating falls in love with her through her portrait.", series: null, tier: "S", topRank: null },
  { title: "Bedelia", author: "Vera Caspary", pageCount: 256, genre: "Mystery", publicationDate: "1945-01-01", description: "A Connecticut newlywed's wife begins to resemble a woman from the newspapers who has poisoned her previous husbands.", series: null, tier: "A", topRank: null },

  { title: "A Dram of Poison", author: "Charlotte Armstrong", pageCount: 224, genre: "Mystery", publicationDate: "1956-01-01", description: "A despairing retired professor poisons a bottle of olive oil — and then loses it. Edgar Award winner.", series: null, tier: "A", topRank: null },

  { title: "The Hours Before Dawn", author: "Celia Fremlin", pageCount: 224, genre: "Mystery", publicationDate: "1958-01-01", description: "A sleepless British mother of three is convinced her lodger is not who she claims to be. Edgar Award winner.", series: null, tier: "S", topRank: null },
  { title: "Uncle Paul", author: "Celia Fremlin", pageCount: 224, genre: "Mystery", publicationDate: "1960-01-01", description: "Three English sisters share a seaside holiday that is slowly poisoned by an old family secret.", series: null, tier: "A", topRank: null },

  // Cult / school of quietude
  { title: "Wittgenstein's Mistress", author: "David Markson", pageCount: 240, genre: "Fiction", publicationDate: "1988-01-01", description: "A woman who believes she is the last human being on earth types a series of literary and philosophical observations — Markson's canonical experimental novel.", series: null, tier: "S", topRank: null },
  { title: "Reader's Block", author: "David Markson", pageCount: 208, genre: "Fiction", publicationDate: "1996-01-01", description: "A fragmentary novel consisting almost entirely of biographical notes about other writers, centered on a character called Reader.", series: null, tier: "A", topRank: null },
  { title: "This Is Not a Novel", author: "David Markson", pageCount: 192, genre: "Fiction", publicationDate: "2001-01-01", description: "Another fragmentary assemblage of literary facts and anecdotes, this time centered on a character called Writer.", series: null, tier: "A", topRank: null },

  { title: "Stories in an Almost Classical Mode", author: "Harold Brodkey", pageCount: 608, genre: "Fiction", publicationDate: "1988-01-01", description: "Brodkey's long-awaited collection of short fiction — lyrical, confrontational, and obsessed with memory.", series: null, tier: "S", topRank: null },
  { title: "The Runaway Soul", author: "Harold Brodkey", pageCount: 848, genre: "Fiction", publicationDate: "1991-01-01", description: "Brodkey's long-delayed autobiographical novel, more than twenty years in the making, about his St. Louis childhood.", series: null, tier: "A", topRank: null },

  { title: "In the Fall", author: "Jeffrey Lent", pageCount: 544, genre: "Historical Fiction", publicationDate: "2000-01-01", description: "A Vermont Civil War veteran and his escaped North Carolina bride watch three generations of their mixed-race family navigate the Green Mountains.", series: null, tier: "S", topRank: null },
  { title: "Lost Nation", author: "Jeffrey Lent", pageCount: 384, genre: "Historical Fiction", publicationDate: "2002-01-01", description: "A Portsmouth tavern-keeper and the young woman he won in a card game drive an oxcart into the nineteenth-century New Hampshire borderlands.", series: null, tier: "A", topRank: null },

  { title: "Driftless", author: "David Rhodes", pageCount: 448, genre: "Fiction", publicationDate: "2008-01-01", description: "A dozen residents of a small unglaciated Wisconsin town quietly interlock in Rhodes's comeback novel after thirty years of silence.", series: null, tier: "S", topRank: null },
  { title: "Jewelweed", author: "David Rhodes", pageCount: 448, genre: "Fiction", publicationDate: "2013-01-01", description: "The sequel to Driftless brings back the same Wisconsin town years later.", series: null, tier: "A", topRank: null },

  // New wave speculative literary
  { title: "The Brief History of the Dead", author: "Kevin Brockmeier", pageCount: 272, genre: "Fiction", publicationDate: "2006-02-07", description: "A city of the dead shrinks each time a living person forgets one of them — and only one Antarctic researcher is still keeping them alive.", series: null, tier: "S", topRank: null },
  { title: "The Illumination", author: "Kevin Brockmeier", pageCount: 272, genre: "Fiction", publicationDate: "2011-02-01", description: "Every wound begins emitting visible light, and the novel follows the journal of a woman's last loving notes to her dead husband.", series: null, tier: "A", topRank: null },
  { title: "The Ghost Variations", author: "Kevin Brockmeier", pageCount: 288, genre: "Fiction", publicationDate: "2021-03-16", description: "One hundred micro ghost stories — precise, strange, unnervingly ordinary.", series: null, tier: "A", topRank: null },

  { title: "Like You'd Understand, Anyway", author: "Jim Shepard", pageCount: 224, genre: "Fiction", publicationDate: "2007-09-11", description: "Eleven stories across Hadrian's Wall, Soviet nuclear test sites, and the Australian outback — Shepard's canonical historical short fiction.", series: null, tier: "S", topRank: null },
  { title: "Project X", author: "Jim Shepard", pageCount: 176, genre: "Fiction", publicationDate: "2004-02-10", description: "Two bullied eighth-grade boys plan a school massacre — Shepard's unflinching Columbine-era novel.", series: null, tier: "A", topRank: null },
  { title: "You Think That's Bad", author: "Jim Shepard", pageCount: 240, genre: "Fiction", publicationDate: "2011-03-22", description: "Eleven more historical and near-future stories from Shepard, ranging across Afghanistan, Black Forest bog people, and a dystopian Dutch engineer.", series: null, tier: "A", topRank: null },

  { title: "The Seas", author: "Samantha Hunt", pageCount: 208, genre: "Fiction", publicationDate: "2004-01-01", description: "A young woman in a rainy fishing town is convinced she is a mermaid and in love with an Iraq War veteran twice her age.", series: null, tier: "A", topRank: null },

  { title: "Find Me", author: "Laura van den Berg", pageCount: 288, genre: "Fiction", publicationDate: "2015-02-17", description: "A young woman in a Kansas hospital survives a nationwide amnesia plague and travels south through a ruined America to find her mother.", series: null, tier: "A", topRank: null },
  { title: "The Third Hotel", author: "Laura van den Berg", pageCount: 224, genre: "Fiction", publicationDate: "2018-08-07", description: "A recently widowed woman travels alone to Havana for a horror film festival and sees her dead husband standing on the street.", series: null, tier: "A", topRank: null },
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

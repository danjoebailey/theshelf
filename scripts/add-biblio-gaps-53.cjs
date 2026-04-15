const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Twilight of the Superheroes", author: "Deborah Eisenberg", pageCount: 224, genre: "Fiction", publicationDate: "2006-01-01", description: "Six long stories by one of the great American short story writers — Eisenberg's post-9/11 collection.", series: null, tier: "S", topRank: null },
  { title: "Your Duck Is My Duck", author: "Deborah Eisenberg", pageCount: 240, genre: "Fiction", publicationDate: "2018-09-25", description: "Six more Eisenberg stories on art world complicity, wealth, and unraveling American arrangements.", series: null, tier: "A", topRank: null },

  { title: "The Living End", author: "Stanley Elkin", pageCount: 192, genre: "Fiction", publicationDate: "1979-01-01", description: "A St. Louis liquor store owner dies, wanders into Heaven and Hell, and is unimpressed by both — Elkin's triptych novella.", series: null, tier: "S", topRank: null },
  { title: "The Magic Kingdom", author: "Stanley Elkin", pageCount: 320, genre: "Fiction", publicationDate: "1985-01-01", description: "Seven terminally ill British children are taken on a chartered trip to Disney World in Elkin's blackest comedy.", series: null, tier: "A", topRank: null },

  { title: "Women and Men", author: "Joseph McElroy", pageCount: 1192, genre: "Fiction", publicationDate: "1987-01-01", description: "McElroy's massive encyclopedic novel of two Manhattan neighbors who never meet, spanning decades of technological and political history.", series: null, tier: "S", topRank: null },
  { title: "Lookout Cartridge", author: "Joseph McElroy", pageCount: 544, genre: "Fiction", publicationDate: "1974-01-01", description: "An American filmmaker in London investigates the destruction of a film he made with a friend — a paranoid postmodernist thriller.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Transgender / queer literary
  { title: "Nevada", author: "Imogen Binnie", pageCount: 272, genre: "Fiction", publicationDate: "2013-04-23", description: "A New York trans woman steals a car and drives to Nevada to mentor a younger trans woman who doesn't know she is one — the canonical modern trans novel.", series: null, tier: "S", topRank: null },

  { title: "A Dream of a Woman", author: "Casey Plett", pageCount: 272, genre: "Fiction", publicationDate: "2021-09-01", description: "Nine stories of trans women navigating work, love, and sobriety across North America.", series: null, tier: "A", topRank: null },
  { title: "Little Fish", author: "Casey Plett", pageCount: 320, genre: "Fiction", publicationDate: "2018-05-01", description: "A trans woman in Winnipeg investigates whether her late grandfather might have been a trans woman too.", series: null, tier: "A", topRank: null },

  { title: "Paul Takes the Form of a Mortal Girl", author: "Andrea Lawlor", pageCount: 352, genre: "Fiction", publicationDate: "2017-11-01", description: "A shapeshifting queer college student in 1993 Iowa City drifts through the early nineties queer underground as his body becomes whatever the moment demands.", series: null, tier: "S", topRank: null },

  { title: "Confessions of the Fox", author: "Jordy Rosenberg", pageCount: 352, genre: "Historical Fiction", publicationDate: "2018-06-26", description: "A trans professor finds what he believes to be the manuscript of the eighteenth-century thief Jack Sheppard — who may himself have been trans.", series: null, tier: "A", topRank: null },

  // Contemporary Black American men
  { title: "High Cotton", author: "Darryl Pinckney", pageCount: 320, genre: "Fiction", publicationDate: "1992-01-01", description: "A young Black Indianapolis intellectual moves between his bourgeois family, 1970s Columbia University, and a Paris he cannot quite claim.", series: null, tier: "S", topRank: null },
  { title: "Black Deutschland", author: "Darryl Pinckney", pageCount: 304, genre: "Fiction", publicationDate: "2016-02-02", description: "A gay Black American recovering alcoholic moves to 1980s Berlin and tries to lose himself among its architects and bar regulars.", series: null, tier: "A", topRank: null },

  { title: "The Residue Years", author: "Mitchell Jackson", pageCount: 352, genre: "Fiction", publicationDate: "2013-08-20", description: "A mother and son in 1990s Portland try to stay clean and out of each other's way.", series: null, tier: "A", topRank: null },
  { title: "Survival Math", author: "Mitchell Jackson", pageCount: 336, genre: "Non-Fiction", publicationDate: "2019-03-05", description: "Jackson's memoir-essays on the Black Portland upbringing that produced him.", series: null, tier: "A", topRank: null },

  { title: "Delicious Foods", author: "James Hannaham", pageCount: 384, genre: "Fiction", publicationDate: "2015-03-17", description: "A young Black boy searches for his crack-addicted mother, who has been lured into a brutal Louisiana farm labor camp — PEN/Faulkner winner.", series: null, tier: "S", topRank: null },
  { title: "Didn't Nobody Give a Shit What Happened to Carlotta", author: "James Hannaham", pageCount: 336, genre: "Fiction", publicationDate: "2023-08-29", description: "A Black trans woman is released from prison after twenty years and tries to reenter Brooklyn over a single Fourth of July weekend.", series: null, tier: "S", topRank: null },
  { title: "God Says No", author: "James Hannaham", pageCount: 304, genre: "Fiction", publicationDate: "2009-06-09", description: "A young closeted Black evangelical college student is pulled between a conversion-therapy life and his own desires.", series: null, tier: "A", topRank: null },

  { title: "I Get on the Bus", author: "Reginald McKnight", pageCount: 208, genre: "Fiction", publicationDate: "1990-01-01", description: "A Black American Peace Corps volunteer in West Africa slowly unravels in the heat and isolation of his post.", series: null, tier: "A", topRank: null },
  { title: "He Sleeps", author: "Reginald McKnight", pageCount: 208, genre: "Fiction", publicationDate: "2001-01-01", description: "A Black American folklorist in Senegal is haunted by dreams of the man sleeping in the next room of his home.", series: null, tier: "A", topRank: null },

  // Horror / literary weird
  { title: "Await Your Reply", author: "Dan Chaon", pageCount: 336, genre: "Thriller", publicationDate: "2009-08-25", description: "Three interwoven stories of stolen identities and vanished lives — Chaon's canonical literary thriller.", series: null, tier: "S", topRank: null },
  { title: "Ill Will", author: "Dan Chaon", pageCount: 480, genre: "Thriller", publicationDate: "2017-03-07", description: "A Cleveland psychologist's adopted older brother, long ago convicted of murdering their parents, is suddenly exonerated.", series: null, tier: "A", topRank: null },
  { title: "You Remind Me of Me", author: "Dan Chaon", pageCount: 368, genre: "Fiction", publicationDate: "2004-01-01", description: "A young man investigates the half-brother he never knew he had, who his mother gave up for adoption.", series: null, tier: "A", topRank: null },

  { title: "A Questionable Shape", author: "Bennett Sims", pageCount: 256, genre: "Fiction", publicationDate: "2013-05-14", description: "Two friends in flooded Baton Rouge search for one of their fathers, who has become a zombie — a philosophical novel about grief and contagion.", series: null, tier: "S", topRank: null },
  { title: "Other Minds and Other Stories", author: "Bennett Sims", pageCount: 208, genre: "Fiction", publicationDate: "2023-01-17", description: "Stories that take literary-genre hybrids — doppelgangers, séances, and cancer support groups — with Sims's signature precision.", series: null, tier: "A", topRank: null },

  { title: "Neverhome", author: "Laird Hunt", pageCount: 256, genre: "Historical Fiction", publicationDate: "2014-09-09", description: "An Indiana farm wife disguises herself as a man and fights for the Union army in Laird Hunt's luminous Civil War novel.", series: null, tier: "S", topRank: null },
  { title: "Kind One", author: "Laird Hunt", pageCount: 208, genre: "Historical Fiction", publicationDate: "2012-09-01", description: "A young white woman marries a Kentucky slaveholder in 1850 and is eventually enslaved by her own former slaves.", series: null, tier: "A", topRank: null },
  { title: "Zorrie", author: "Laird Hunt", pageCount: 176, genre: "Historical Fiction", publicationDate: "2021-02-09", description: "An Indiana farm woman's life across the twentieth century in Hunt's small masterpiece. National Book Award finalist.", series: null, tier: "S", topRank: null },

  // Short story masters
  { title: "Middle Men", author: "Jim Gavin", pageCount: 224, genre: "Fiction", publicationDate: "2013-02-05", description: "Seven linked stories of Southern California men working middle-class jobs — salesmen, plumbers, and their fathers.", series: null, tier: "A", topRank: null },

  { title: "Dog Run Moon", author: "Callan Wink", pageCount: 256, genre: "Fiction", publicationDate: "2016-02-02", description: "Ten stories of the modern American West — Montana ranch hands, divers, dog rescuers.", series: null, tier: "A", topRank: null },
  { title: "August", author: "Callan Wink", pageCount: 336, genre: "Fiction", publicationDate: "2020-07-21", description: "A Michigan boy whose parents are divorcing is sent to work on his father's Montana ranch for the summer.", series: null, tier: "A", topRank: null },

  { title: "Everything Ravaged, Everything Burned", author: "Wells Tower", pageCount: 256, genre: "Fiction", publicationDate: "2009-03-17", description: "Nine stories of American men in crisis, and one on a Viking raid gone wrong — Tower's widely acclaimed debut.", series: null, tier: "S", topRank: null },

  // Alt lit / underground
  { title: "Inferno", author: "Eileen Myles", pageCount: 288, genre: "Fiction", publicationDate: "2010-09-14", description: "Myles's autobiographical novel of a young lesbian poet in 1970s New York, cast as her own Divine Comedy.", series: null, tier: "S", topRank: null },
  { title: "Chelsea Girls", author: "Eileen Myles", pageCount: 288, genre: "Fiction", publicationDate: "1994-01-01", description: "Linked autobiographical stories of downtown Manhattan's poetry world and queer life in the 1970s and 80s.", series: null, tier: "A", topRank: null },
  { title: "Cool for You", author: "Eileen Myles", pageCount: 224, genre: "Fiction", publicationDate: "2000-01-01", description: "A working-class Irish Catholic girl from Boston drifts through New York in Myles's early autobiographical novel.", series: null, tier: "A", topRank: null },

  { title: "The TV Sutras", author: "Dodie Bellamy", pageCount: 160, genre: "Fiction", publicationDate: "2014-02-04", description: "Bellamy channels television into aphoristic sutras in a performance-novel hybrid from the San Francisco New Narrative writer.", series: null, tier: "A", topRank: null },
  { title: "When the Sick Rule the World", author: "Dodie Bellamy", pageCount: 288, genre: "Non-Fiction", publicationDate: "2015-03-02", description: "Bellamy's essays on illness, sex, and female embodiment.", series: null, tier: "A", topRank: null },

  { title: "I Love Dick", author: "Chris Kraus", pageCount: 272, genre: "Fiction", publicationDate: "1997-01-01", description: "A married woman writes obsessive letters to an academic named Dick in Kraus's cult autobiographical novel.", series: null, tier: "S", topRank: null },
  { title: "Aliens & Anorexia", author: "Chris Kraus", pageCount: 240, genre: "Fiction", publicationDate: "2000-01-01", description: "Kraus's follow-up novel braids a failing film project with meditations on Simone Weil, UFOs, and anorexia.", series: null, tier: "A", topRank: null },
  { title: "Torpor", author: "Chris Kraus", pageCount: 288, genre: "Fiction", publicationDate: "2006-01-01", description: "A middle-aged American couple drives through Eastern Europe in 1991 looking for a child to adopt.", series: null, tier: "A", topRank: null },

  { title: "Drifts", author: "Kate Zambreno", pageCount: 336, genre: "Fiction", publicationDate: "2020-05-19", description: "A novelist in Brooklyn tries to write a book and fails, and the failure becomes the book.", series: null, tier: "A", topRank: null },
  { title: "Heroines", author: "Kate Zambreno", pageCount: 320, genre: "Non-Fiction", publicationDate: "2012-10-16", description: "Zambreno reclaims the wives and muses of the modernist canon — Zelda Fitzgerald, Vivienne Eliot, Jane Bowles.", series: null, tier: "A", topRank: null },
  { title: "Green Girl", author: "Kate Zambreno", pageCount: 272, genre: "Fiction", publicationDate: "2011-04-01", description: "A young American woman drifts through London working as a cosmetics counter girl and losing hold of herself.", series: null, tier: "A", topRank: null },

  { title: "Person", author: "Sam Pink", pageCount: 176, genre: "Fiction", publicationDate: "2010-07-01", description: "A young man drifts through a day in Chicago observing the desperate absurdity of everyone he passes.", series: null, tier: "A", topRank: null },
  { title: "The No Hellos Diet", author: "Sam Pink", pageCount: 144, genre: "Fiction", publicationDate: "2011-01-01", description: "A grocery store worker's small, cold Chicago winter in Pink's signature minimalist voice.", series: null, tier: "A", topRank: null },

  // Late modernist
  { title: "The Lost Scrapbook", author: "Evan Dara", pageCount: 480, genre: "Fiction", publicationDate: "1995-01-01", description: "A polyphonic American novel built from dozens of unattributed voices converging on an environmental catastrophe — the FC2 cult classic.", series: null, tier: "S", topRank: null },
  { title: "The Easy Chain", author: "Evan Dara", pageCount: 512, genre: "Fiction", publicationDate: "2008-01-01", description: "Dara's second novel traces the rise and disappearance of a charismatic young Dutch man who conquers 1990s Chicago.", series: null, tier: "A", topRank: null },

  { title: "Interstate", author: "Stephen Dixon", pageCount: 384, genre: "Fiction", publicationDate: "1995-01-01", description: "Eight variations on the same incident — a man and his daughters on a highway encounter gunmen — told and retold. National Book Award finalist.", series: null, tier: "A", topRank: null },
  { title: "Frog", author: "Stephen Dixon", pageCount: 768, genre: "Fiction", publicationDate: "1991-01-01", description: "Dixon's massive maximalist exploration of the life of one Howard Tetch — National Book Award and PEN/Faulkner finalist.", series: null, tier: "A", topRank: null },
  { title: "I.", author: "Stephen Dixon", pageCount: 320, genre: "Fiction", publicationDate: "2002-01-01", description: "Dixon's obsessive first-person novel about a man and his dying wife.", series: null, tier: "A", topRank: null },

  { title: "Tatlin!", author: "Guy Davenport", pageCount: 192, genre: "Fiction", publicationDate: "1974-01-01", description: "Stories that remix Wittgenstein, Franz Kafka, the aviator Santos-Dumont, and the Russian Constructivist Vladimir Tatlin — Davenport's debut collection.", series: null, tier: "S", topRank: null },
  { title: "Da Vinci's Bicycle", author: "Guy Davenport", pageCount: 256, genre: "Fiction", publicationDate: "1979-01-01", description: "More of Davenport's erudite short stories — an encyclopedic modernist imagination at play.", series: null, tier: "A", topRank: null },

  { title: "Darconville's Cat", author: "Alexander Theroux", pageCount: 704, genre: "Fiction", publicationDate: "1981-01-01", description: "A young Catholic professor at a Virginia women's college falls in love with a student and is betrayed — Theroux's baroque cult masterpiece.", series: null, tier: "S", topRank: null },
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

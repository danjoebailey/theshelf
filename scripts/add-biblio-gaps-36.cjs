const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Mystery Mile", author: "Margery Allingham", pageCount: 240, genre: "Mystery", publicationDate: "1930-01-01", description: "Albert Campion smuggles an American judge to an isolated Suffolk village to escape a ruthless criminal organization.", series: { name: "Albert Campion", order: 2, total: 18 }, tier: "A", topRank: null },
  { title: "Police at the Funeral", author: "Margery Allingham", pageCount: 288, genre: "Mystery", publicationDate: "1931-01-01", description: "Campion investigates a chain of murders in a stifling Cambridge household ruled by a Victorian matriarch.", series: { name: "Albert Campion", order: 4, total: 18 }, tier: "A", topRank: null },
  { title: "Sweet Danger", author: "Margery Allingham", pageCount: 256, genre: "Mystery", publicationDate: "1933-01-01", description: "Campion is sent to verify an heir's claim to a principality and meets the young woman who will become his wife.", series: { name: "Albert Campion", order: 5, total: 18 }, tier: "A", topRank: null },
  { title: "The Tiger in the Smoke", author: "Margery Allingham", pageCount: 288, genre: "Mystery", publicationDate: "1952-01-01", description: "A killer stalks the fog-choked streets of postwar London while Campion tries to stop him.", series: { name: "Albert Campion", order: 14, total: 18 }, tier: "S", topRank: null },

  { title: "Cop Hater", author: "Ed McBain", pageCount: 176, genre: "Mystery", publicationDate: "1956-01-01", description: "The opening novel of the 87th Precinct series: a heat wave and someone is picking off cops in the city.", series: { name: "87th Precinct", order: 1, total: 55 }, tier: "A", topRank: null },
  { title: "Ice", author: "Ed McBain", pageCount: 288, genre: "Mystery", publicationDate: "1983-01-01", description: "Three murders on a cold New York December morning pull the 87th Precinct into a web of drug dealing and Broadway glamour.", series: { name: "87th Precinct", order: 36, total: 55 }, tier: "A", topRank: null },
  { title: "Sadie When She Died", author: "Ed McBain", pageCount: 176, genre: "Mystery", publicationDate: "1972-01-01", description: "A grieving husband thanks the detective investigating his wife's murder for putting her down.", series: { name: "87th Precinct", order: 26, total: 55 }, tier: "S", topRank: null },
  { title: "He Who Hesitates", author: "Ed McBain", pageCount: 192, genre: "Mystery", publicationDate: "1965-01-01", description: "A young man wanders the city trying to work up the nerve to confess a crime to the 87th Precinct.", series: { name: "87th Precinct", order: 19, total: 55 }, tier: "A", topRank: null },
  { title: "Hail to the Chief", author: "Ed McBain", pageCount: 192, genre: "Mystery", publicationDate: "1973-01-01", description: "Teenage gangs in the city wage a miniature civil war that leaves six bodies for the 87th Precinct to sort out.", series: { name: "87th Precinct", order: 27, total: 55 }, tier: "A", topRank: null },

  { title: "The Cold Cold Ground", author: "Adrian McKinty", pageCount: 320, genre: "Mystery", publicationDate: "2012-01-01", description: "Sean Duffy, a Catholic detective in the Royal Ulster Constabulary, investigates a serial killer during the 1981 hunger strikes.", series: { name: "Sean Duffy", order: 1, total: 7 }, tier: "S", topRank: null },
  { title: "I Hear the Sirens in the Street", author: "Adrian McKinty", pageCount: 320, genre: "Mystery", publicationDate: "2013-01-01", description: "A headless torso turns up in a suitcase, and Duffy's investigation leads toward the highest levels of the Troubles.", series: { name: "Sean Duffy", order: 2, total: 7 }, tier: "A", topRank: null },
  { title: "In the Morning I'll Be Gone", author: "Adrian McKinty", pageCount: 320, genre: "Mystery", publicationDate: "2014-01-01", description: "Duffy is recruited by MI5 to track down an IRA escapee and chases him through a locked-room mystery.", series: { name: "Sean Duffy", order: 3, total: 7 }, tier: "A", topRank: null },
  { title: "The Chain", author: "Adrian McKinty", pageCount: 368, genre: "Thriller", publicationDate: "2019-07-09", description: "A mother's daughter is kidnapped; to free her, she must kidnap another child and pass the curse on.", series: null, tier: "S", topRank: null },

  { title: "Arctic Dreams", author: "Barry Lopez", pageCount: 464, genre: "Non-Fiction", publicationDate: "1986-01-01", description: "A meditation on the Arctic landscape, its wildlife, and the human imagination that has tried to hold it.", series: null, tier: "S", topRank: null },
  { title: "Of Wolves and Men", author: "Barry Lopez", pageCount: 320, genre: "Non-Fiction", publicationDate: "1978-01-01", description: "Natural history, folklore, and biology braided into a portrait of the wolf and the humans who have hunted and loved them.", series: null, tier: "S", topRank: null },

  { title: "Refuge", author: "Terry Tempest Williams", pageCount: 320, genre: "Non-Fiction", publicationDate: "1991-01-01", description: "The rising of Great Salt Lake and the decline of her mother into cancer, braided in Williams's memoir of Utah.", series: null, tier: "S", topRank: null },
  { title: "When Women Were Birds", author: "Terry Tempest Williams", pageCount: 240, genre: "Non-Fiction", publicationDate: "2012-04-10", description: "Williams's mother left her fifty-four journals, all blank; this essay book is the interpretation.", series: null, tier: "A", topRank: null },

  { title: "The Empathy Exams", author: "Leslie Jamison", pageCount: 256, genre: "Non-Fiction", publicationDate: "2014-04-01", description: "Essays on pain, medical actors, and the limits of feeling what other people feel.", series: null, tier: "S", topRank: null },
  { title: "The Recovering", author: "Leslie Jamison", pageCount: 544, genre: "Non-Fiction", publicationDate: "2018-04-03", description: "A memoir of addiction and recovery braided with the biographies of writers who drank themselves to ruin.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Nordic noir
  { title: "Roseanna", author: "Maj Sjöwall and Per Wahlöö", pageCount: 224, genre: "Mystery", publicationDate: "1965-01-01", description: "A woman's body surfaces in a Swedish canal and Detective Martin Beck begins the case that launched modern Nordic crime.", series: { name: "Martin Beck", order: 1, total: 10 }, tier: "S", topRank: null },
  { title: "The Laughing Policeman", author: "Maj Sjöwall and Per Wahlöö", pageCount: 224, genre: "Mystery", publicationDate: "1968-01-01", description: "Nine people are gunned down on a Stockholm bus, and one of the dead is a detective on a case nobody knew about.", series: { name: "Martin Beck", order: 4, total: 10 }, tier: "S", topRank: null },
  { title: "The Locked Room", author: "Maj Sjöwall and Per Wahlöö", pageCount: 304, genre: "Mystery", publicationDate: "1972-01-01", description: "A man is found shot dead in his apartment with no gun and no way in or out.", series: { name: "Martin Beck", order: 8, total: 10 }, tier: "A", topRank: null },
  { title: "The Man on the Balcony", author: "Maj Sjöwall and Per Wahlöö", pageCount: 192, genre: "Mystery", publicationDate: "1967-01-01", description: "A serial killer of children terrorizes summer Stockholm while Martin Beck scrambles for witnesses.", series: { name: "Martin Beck", order: 3, total: 10 }, tier: "A", topRank: null },

  { title: "Mind's Eye", author: "Håkan Nesser", pageCount: 288, genre: "Mystery", publicationDate: "1993-01-01", description: "Inspector Van Veeteren investigates a man charged with drowning his wife in a bathtub who has no memory of the event.", series: { name: "Van Veeteren", order: 1, total: 10 }, tier: "A", topRank: null },
  { title: "Borkmann's Point", author: "Håkan Nesser", pageCount: 336, genre: "Mystery", publicationDate: "1994-01-01", description: "Van Veeteren leaves vacation behind when a series of axe murders strikes a quiet coastal town.", series: { name: "Van Veeteren", order: 2, total: 10 }, tier: "A", topRank: null },
  { title: "The Return", author: "Håkan Nesser", pageCount: 336, genre: "Mystery", publicationDate: "1995-01-01", description: "A body wrapped in a rug is found in a forest; Van Veeteren recognizes the man as one he once helped convict.", series: { name: "Van Veeteren", order: 3, total: 10 }, tier: "A", topRank: null },

  { title: "The Princess of Burundi", author: "Kjell Eriksson", pageCount: 336, genre: "Mystery", publicationDate: "2002-01-01", description: "Detective Ann Lindell investigates the torture-killing of a quiet Uppsala tropical-fish enthusiast.", series: { name: "Ann Lindell", order: 1, total: 9 }, tier: "A", topRank: null },
  { title: "The Cruel Stars of the Night", author: "Kjell Eriksson", pageCount: 352, genre: "Mystery", publicationDate: "2004-01-01", description: "Elderly men are murdered one by one in small Swedish villages, and Ann Lindell traces a cruel pattern.", series: { name: "Ann Lindell", order: 2, total: 9 }, tier: "A", topRank: null },

  { title: "Last Rituals", author: "Yrsa Sigurðardóttir", pageCount: 368, genre: "Mystery", publicationDate: "2005-01-01", description: "Reykjavík lawyer Thóra Gudmundsdóttir is hired to investigate the ritual murder of a German student studying Icelandic witchcraft.", series: { name: "Thóra Gudmundsdóttir", order: 1, total: 6 }, tier: "A", topRank: null },
  { title: "My Soul to Take", author: "Yrsa Sigurðardóttir", pageCount: 432, genre: "Mystery", publicationDate: "2006-01-01", description: "A murder at a West Iceland spa opens up a decades-old case of child abuse.", series: { name: "Thóra Gudmundsdóttir", order: 2, total: 6 }, tier: "A", topRank: null },
  { title: "Ashes to Dust", author: "Yrsa Sigurðardóttir", pageCount: 416, genre: "Mystery", publicationDate: "2007-01-01", description: "Three bodies and a severed head are found beneath a house being excavated from volcanic ash on a remote Icelandic island.", series: { name: "Thóra Gudmundsdóttir", order: 3, total: 6 }, tier: "A", topRank: null },

  // Horror
  { title: "Blood Crazy", author: "Simon Clark", pageCount: 368, genre: "Horror", publicationDate: "1995-01-01", description: "Every adult in Britain wakes up one morning with a single impulse: to murder every child they see.", series: null, tier: "A", topRank: null },
  { title: "Darkness Demands", author: "Simon Clark", pageCount: 384, genre: "Horror", publicationDate: "2001-01-01", description: "A novelist in a quiet Yorkshire village starts receiving written demands from an ancient buried presence.", series: null, tier: "B", topRank: null },
  { title: "The Night of the Triffids", author: "Simon Clark", pageCount: 352, genre: "Horror", publicationDate: "2001-01-01", description: "An authorized sequel to Wyndham's Day of the Triffids, set decades after the original disaster.", series: null, tier: "B", topRank: null },

  { title: "The Land of Laughs", author: "Jonathan Carroll", pageCount: 256, genre: "Fantasy", publicationDate: "1980-01-01", description: "A schoolteacher visits the small Missouri town of a beloved dead children's author and discovers the entire town is his invention.", series: null, tier: "S", topRank: null },
  { title: "Bones of the Moon", author: "Jonathan Carroll", pageCount: 216, genre: "Fantasy", publicationDate: "1987-01-01", description: "A woman's vivid dream-world of Rondua begins to infiltrate — and threaten — her waking New York life.", series: null, tier: "A", topRank: null },
  { title: "Outside the Dog Museum", author: "Jonathan Carroll", pageCount: 304, genre: "Fantasy", publicationDate: "1991-01-01", description: "A celebrated architect is hired to build a temple to dogs for an Arabian sultan and confronts the edge of his sanity.", series: null, tier: "A", topRank: null },
  { title: "White Apples", author: "Jonathan Carroll", pageCount: 288, genre: "Fantasy", publicationDate: "2002-01-01", description: "A recently deceased womanizer is returned to life for reasons the universe itself urgently needs him to understand.", series: null, tier: "A", topRank: null },

  // Contemporary essayists
  { title: "On Immunity", author: "Eula Biss", pageCount: 224, genre: "Non-Fiction", publicationDate: "2014-09-30", description: "An inoculation of essays threading vaccines, motherhood, and the myth of the individual body.", series: null, tier: "S", topRank: null },
  { title: "Having and Being Had", author: "Eula Biss", pageCount: 336, genre: "Non-Fiction", publicationDate: "2020-09-01", description: "Essays on capitalism, homeownership, and the guilt of entering the middle class.", series: null, tier: "A", topRank: null },
  { title: "Notes from No Man's Land", author: "Eula Biss", pageCount: 240, genre: "Non-Fiction", publicationDate: "2009-01-01", description: "Essays on American race, moving to Chicago, and the thin histories we carry.", series: null, tier: "A", topRank: null },

  { title: "How to Do Nothing", author: "Jenny Odell", pageCount: 256, genre: "Non-Fiction", publicationDate: "2019-04-09", description: "A manifesto against the attention economy that insists paying attention to the natural world is resistance.", series: null, tier: "S", topRank: null },
  { title: "Saving Time", author: "Jenny Odell", pageCount: 400, genre: "Non-Fiction", publicationDate: "2023-03-07", description: "An argument that the clock-based view of time is neither natural nor inevitable.", series: null, tier: "A", topRank: null },

  { title: "The Lonely City", author: "Olivia Laing", pageCount: 336, genre: "Non-Fiction", publicationDate: "2016-03-01", description: "Braided essays on loneliness and urban art — Hopper, Warhol, Henry Darger — written from Laing's own lonely New York.", series: null, tier: "S", topRank: null },
  { title: "The Trip to Echo Spring", author: "Olivia Laing", pageCount: 352, genre: "Non-Fiction", publicationDate: "2013-01-01", description: "A journey across America following six great drunk American writers and their shared disease.", series: null, tier: "A", topRank: null },
  { title: "Crudo", author: "Olivia Laing", pageCount: 144, genre: "Fiction", publicationDate: "2018-06-28", description: "A woman named Kathy Acker gets married in summer 2017 while the world appears to end around her.", series: null, tier: "A", topRank: null },
  { title: "Everybody", author: "Olivia Laing", pageCount: 368, genre: "Non-Fiction", publicationDate: "2021-04-27", description: "A book-length essay on the body, freedom, and the thinkers who tried to make sense of both.", series: null, tier: "A", topRank: null },
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

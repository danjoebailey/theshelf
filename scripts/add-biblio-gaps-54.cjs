const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Martin Dressler", author: "Steven Millhauser", pageCount: 304, genre: "Historical Fiction", publicationDate: "1996-01-01", description: "A young Manhattan bellboy in the Gilded Age rises to build ever-more-elaborate hotels. Pulitzer Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Dangerous Laughter", author: "Steven Millhauser", pageCount: 256, genre: "Fiction", publicationDate: "2008-02-12", description: "Thirteen stories of obsession, miniature civilizations, and the strange edges of ordinary American places.", series: null, tier: "A", topRank: null },

  { title: "Europe Central", author: "William T. Vollmann", pageCount: 832, genre: "Historical Fiction", publicationDate: "2005-04-25", description: "Interlocking stories of Russian and German lives in the twentieth century's wars, centered on the composer Shostakovich. National Book Award winner.", series: null, tier: "S", topRank: null },
  { title: "The Atlas", author: "William T. Vollmann", pageCount: 480, genre: "Fiction", publicationDate: "1996-01-01", description: "Fifty-three short pieces arranged as a palindrome across the globe — Vollmann's travel-story mosaic.", series: null, tier: "A", topRank: null },

  { title: "The Netanyahus", author: "Joshua Cohen", pageCount: 256, genre: "Historical Fiction", publicationDate: "2021-06-22", description: "An account of a minor episode in the life of a 1960s Cornell historian, when Benzion Netanyahu (Benjamin's father) came to interview. Pulitzer Prize winner.", series: null, tier: "S", topRank: null },
  { title: "Book of Numbers", author: "Joshua Cohen", pageCount: 592, genre: "Fiction", publicationDate: "2015-06-09", description: "A struggling novelist named Joshua Cohen is hired to ghostwrite the memoir of a Silicon Valley billionaire also named Joshua Cohen.", series: null, tier: "A", topRank: null },

  { title: "The Free World", author: "David Bezmozgis", pageCount: 368, genre: "Historical Fiction", publicationDate: "2011-03-29", description: "A Latvian Jewish family stranded in Rome in 1978 waits for visas to somewhere they don't yet know.", series: null, tier: "A", topRank: null },
  { title: "The Betrayers", author: "David Bezmozgis", pageCount: 240, genre: "Fiction", publicationDate: "2014-09-23", description: "A disgraced Israeli politician and his young mistress retreat to Yalta and encounter the man who betrayed him to the Soviets decades earlier.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Metafiction / late postmodern
  { title: "The Flame Alphabet", author: "Ben Marcus", pageCount: 304, genre: "Sci-Fi", publicationDate: "2012-01-17", description: "The speech of children becomes lethal to the adults who hear it — Marcus's dystopian allegory of language and family.", series: null, tier: "S", topRank: null },
  { title: "Notable American Women", author: "Ben Marcus", pageCount: 256, genre: "Fiction", publicationDate: "2002-04-02", description: "A novel narrated by a boy raised by a cult of women who practice extreme silence and stillness — Marcus's experimental second novel.", series: null, tier: "A", topRank: null },
  { title: "Leaving the Sea", author: "Ben Marcus", pageCount: 272, genre: "Fiction", publicationDate: "2014-01-07", description: "Fifteen stories ranging from straightforward realism to Marcus's signature textual experiments.", series: null, tier: "A", topRank: null },

  { title: "My Cousin, My Gastroenterologist", author: "Mark Leyner", pageCount: 208, genre: "Fiction", publicationDate: "1990-01-01", description: "Leyner's cult work of hyperactive media-saturated 1990s prose — the book that made him the poster child of literary maximalism.", series: null, tier: "A", topRank: null },
  { title: "Et Tu, Babe", author: "Mark Leyner", pageCount: 176, genre: "Fiction", publicationDate: "1992-01-01", description: "A fictional Mark Leyner has become the most famous writer on earth and the novel is his celebrity ascent.", series: null, tier: "A", topRank: null },

  // Memoir masters
  { title: "Fierce Attachments", author: "Vivian Gornick", pageCount: 208, genre: "Non-Fiction", publicationDate: "1987-01-01", description: "Gornick's canonical memoir of walking New York with her mother and reckoning with the women who raised her in the Bronx.", series: null, tier: "S", topRank: null },
  { title: "The Odd Woman and the City", author: "Vivian Gornick", pageCount: 192, genre: "Non-Fiction", publicationDate: "2015-05-05", description: "Gornick's second urban memoir — the solitary walks of an older single woman in Manhattan.", series: null, tier: "A", topRank: null },
  { title: "Unfinished Business", author: "Vivian Gornick", pageCount: 176, genre: "Non-Fiction", publicationDate: "2020-02-04", description: "Gornick's essays on rereading the books that formed her, and what they look like decades later.", series: null, tier: "A", topRank: null },

  { title: "300 Arguments", author: "Sarah Manguso", pageCount: 112, genre: "Non-Fiction", publicationDate: "2017-02-07", description: "Three hundred very short aphoristic observations on writing, love, and failure.", series: null, tier: "A", topRank: null },
  { title: "Ongoingness", author: "Sarah Manguso", pageCount: 104, genre: "Non-Fiction", publicationDate: "2015-03-03", description: "Manguso's essay on the twenty-five years of diary-keeping she could not stop.", series: null, tier: "S", topRank: null },
  { title: "Very Cold People", author: "Sarah Manguso", pageCount: 208, genre: "Fiction", publicationDate: "2022-02-08", description: "Manguso's first novel — a young girl grows up in a repressive, financially precarious Massachusetts family.", series: null, tier: "A", topRank: null },

  { title: "Half a Life", author: "Darin Strauss", pageCount: 208, genre: "Non-Fiction", publicationDate: "2010-09-21", description: "Strauss's memoir of the traffic accident at seventeen in which he killed a bicycling classmate. National Book Critics Circle winner.", series: null, tier: "S", topRank: null },
  { title: "Chang and Eng", author: "Darin Strauss", pageCount: 352, genre: "Historical Fiction", publicationDate: "2000-05-02", description: "A novel of the conjoined twins Chang and Eng Bunker, the original Siamese twins, across their life in North Carolina.", series: null, tier: "A", topRank: null },

  { title: "Autobiography of a Face", author: "Lucy Grealy", pageCount: 240, genre: "Non-Fiction", publicationDate: "1994-09-30", description: "Grealy's canonical memoir of childhood cancer and the decades of reconstructive surgeries that followed.", series: null, tier: "S", topRank: null },

  { title: "Between Two Kingdoms", author: "Suleika Jaouad", pageCount: 368, genre: "Non-Fiction", publicationDate: "2021-02-09", description: "A young woman diagnosed with leukemia at twenty-two writes through her treatment and her hundred-day post-recovery road trip across America.", series: null, tier: "A", topRank: null },

  // Contemporary American Jewish literary
  { title: "A Children's Bible", author: "Lydia Millet", pageCount: 240, genre: "Fiction", publicationDate: "2020-05-12", description: "Children at a shared lakeside rental watch their parents fall apart as climate catastrophe sweeps the region. National Book Award finalist.", series: null, tier: "S", topRank: null },
  { title: "Magnificence", author: "Lydia Millet", pageCount: 272, genre: "Fiction", publicationDate: "2012-11-06", description: "A middle-aged Los Angeles woman inherits a mansion full of taxidermy and tries to move in.", series: null, tier: "A", topRank: null },
  { title: "Sweet Lamb of Heaven", author: "Lydia Millet", pageCount: 256, genre: "Fiction", publicationDate: "2016-05-03", description: "A young mother on the run from her estranged husband begins hearing an inexplicable inner voice.", series: null, tier: "A", topRank: null },

  { title: "Last Car Over the Sagamore Bridge", author: "Peter Orner", pageCount: 192, genre: "Fiction", publicationDate: "2013-06-04", description: "Fifty-two short stories from the quiet American master of the flash-length story.", series: null, tier: "A", topRank: null },
  { title: "Love and Shame and Love", author: "Peter Orner", pageCount: 464, genre: "Fiction", publicationDate: "2011-11-01", description: "Three generations of a Chicago Jewish family in Orner's first full-length novel.", series: null, tier: "A", topRank: null },
  { title: "Am I Alone Here?", author: "Peter Orner", pageCount: 320, genre: "Non-Fiction", publicationDate: "2016-10-25", description: "Orner's book of reading essays on the writers who kept him company through his divorce. NBCC finalist.", series: null, tier: "A", topRank: null },

  { title: "The Mind-Body Problem", author: "Rebecca Goldstein", pageCount: 288, genre: "Fiction", publicationDate: "1983-01-01", description: "A Barnard philosophy graduate student navigates Princeton intellectuals and her own beautiful face.", series: null, tier: "A", topRank: null },
  { title: "36 Arguments for the Existence of God", author: "Rebecca Goldstein", pageCount: 400, genre: "Fiction", publicationDate: "2010-01-06", description: "A Harvard psychologist becomes a famous atheist and is challenged to a public debate by a Hasidic rabbi.", series: null, tier: "A", topRank: null },

  // Contemporary literary
  { title: "The Dead Fish Museum", author: "Charles D'Ambrosio", pageCount: 240, genre: "Fiction", publicationDate: "2006-03-14", description: "Eight short stories about working-class and unmoored American men from one of the great American short story writers.", series: null, tier: "S", topRank: null },
  { title: "The Point", author: "Charles D'Ambrosio", pageCount: 224, genre: "Fiction", publicationDate: "1995-01-01", description: "D'Ambrosio's debut collection, praised for its Carver-descended precision.", series: null, tier: "A", topRank: null },

  { title: "Cowboys Are My Weakness", author: "Pam Houston", pageCount: 224, genre: "Fiction", publicationDate: "1992-05-05", description: "Twelve stories of women in love with the wrong cowboys, rafting guides, and outdoorsmen — Houston's acclaimed debut.", series: null, tier: "A", topRank: null },
  { title: "Waltzing the Cat", author: "Pam Houston", pageCount: 272, genre: "Fiction", publicationDate: "1998-09-22", description: "More linked stories of a woman's outdoor adventures and romantic failures across the American West.", series: null, tier: "A", topRank: null },

  { title: "Monsters: A Fan's Dilemma", author: "Claire Dederer", pageCount: 288, genre: "Non-Fiction", publicationDate: "2023-04-25", description: "Dederer's essay book on what it means to love the work of artists we know to have done monstrous things.", series: null, tier: "A", topRank: null },

  // Political / dystopian American
  { title: "American War", author: "Omar El Akkad", pageCount: 352, genre: "Sci-Fi", publicationDate: "2017-04-04", description: "A second American civil war is fought in the late twenty-first century over fossil fuels, and a Louisiana girl becomes its central weapon.", series: null, tier: "S", topRank: null },
  { title: "What Strange Paradise", author: "Omar El Akkad", pageCount: 256, genre: "Fiction", publicationDate: "2021-07-20", description: "A nine-year-old Syrian refugee washes up on a Mediterranean island and is helped by a local teenage girl. Scotiabank Giller Prize winner.", series: null, tier: "S", topRank: null },

  { title: "The Small Backs of Children", author: "Lidia Yuknavitch", pageCount: 240, genre: "Fiction", publicationDate: "2015-07-07", description: "An American writer obsesses over a photograph of a small girl who survived a bombing in an unnamed Eastern European village.", series: null, tier: "A", topRank: null },
  { title: "The Book of Joan", author: "Lidia Yuknavitch", pageCount: 288, genre: "Sci-Fi", publicationDate: "2017-04-18", description: "A Joan of Arc figure leads an insurgent rebellion on a ruined future Earth while the survivors above watch from an orbiting station.", series: null, tier: "A", topRank: null },
  { title: "Thrust", author: "Lidia Yuknavitch", pageCount: 352, genre: "Fiction", publicationDate: "2022-06-28", description: "A young water-carrier in a drowning future city can travel through time and history.", series: null, tier: "A", topRank: null },

  { title: "The Age of Miracles", author: "Karen Thompson Walker", pageCount: 288, genre: "Sci-Fi", publicationDate: "2012-06-26", description: "The Earth's rotation slowly decelerates and a California eleven-year-old navigates her changing world and her parents' crumbling marriage.", series: null, tier: "A", topRank: null },
  { title: "The Dreamers", author: "Karen Thompson Walker", pageCount: 320, genre: "Sci-Fi", publicationDate: "2019-01-15", description: "A mysterious sleeping sickness spreads through a small California college town — the dreamers cannot be awakened.", series: null, tier: "A", topRank: null },

  { title: "Bear", author: "Julia Phillips", pageCount: 304, genre: "Fiction", publicationDate: "2024-06-25", description: "Two adult sisters on a San Juan Island watch a grizzly bear appear near their mother's house, and one of them begins to want it to stay.", series: null, tier: "A", topRank: null },
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

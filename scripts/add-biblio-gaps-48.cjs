const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Canterbury Tales", author: "Geoffrey Chaucer", pageCount: 528, genre: "Fiction", publicationDate: "1387-01-01", description: "Thirty pilgrims bound for Canterbury pass the journey telling stories to one another — the founding work of English vernacular literature.", series: null, tier: "S", topRank: null },
  { title: "Troilus and Criseyde", author: "Geoffrey Chaucer", pageCount: 320, genre: "Fiction", publicationDate: "1385-01-01", description: "A Trojan prince's love for a widow and her eventual betrayal — Chaucer's long courtly poem in verse.", series: null, tier: "A", topRank: null },

  { title: "The Decameron", author: "Giovanni Boccaccio", pageCount: 912, genre: "Fiction", publicationDate: "1353-01-01", description: "Ten young Florentines flee the Black Death and pass ten days telling one hundred stories — the canonical work of Italian prose.", series: null, tier: "S", topRank: null },
  { title: "The Elegy of Lady Fiammetta", author: "Giovanni Boccaccio", pageCount: 192, genre: "Fiction", publicationDate: "1344-01-01", description: "A Neapolitan noblewoman's first-person lament for the lover who has abandoned her — possibly the first novel in Western literature.", series: null, tier: "A", topRank: null },

  { title: "The Kingdom of This World", author: "Alejo Carpentier", pageCount: 192, genre: "Historical Fiction", publicationDate: "1949-01-01", description: "The Haitian revolution seen through the eyes of an enslaved man and the novel's preface that coined 'lo real maravilloso.'", series: null, tier: "S", topRank: null },
  { title: "The Lost Steps", author: "Alejo Carpentier", pageCount: 288, genre: "Fiction", publicationDate: "1953-01-01", description: "A New York composer travels up the Orinoco in search of primitive instruments and encounters time itself flowing backwards.", series: null, tier: "S", topRank: null },
  { title: "Explosion in a Cathedral", author: "Alejo Carpentier", pageCount: 368, genre: "Historical Fiction", publicationDate: "1962-01-01", description: "A Caribbean-born merchant becomes an emissary of the French Revolution in the Antilles.", series: null, tier: "S", topRank: null },
  { title: "The Chase", author: "Alejo Carpentier", pageCount: 144, genre: "Fiction", publicationDate: "1956-01-01", description: "A Cuban political fugitive hides in a Havana concert hall during a Beethoven symphony — forty-seven minutes of compressed memory and terror.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Queer literary men
  { title: "Dancer from the Dance", author: "Andrew Holleran", pageCount: 256, genre: "Fiction", publicationDate: "1978-01-01", description: "Gay Manhattan's disco years — the Fire Island summers of the 1970s, told in Holleran's elegiac voice.", series: null, tier: "S", topRank: null },
  { title: "Grief", author: "Andrew Holleran", pageCount: 160, genre: "Fiction", publicationDate: "2006-01-01", description: "A middle-aged gay man moves to Washington, D.C. after his mother's death and rents a room in a house owned by another grieving man.", series: null, tier: "A", topRank: null },

  { title: "The Lost Language of Cranes", author: "David Leavitt", pageCount: 320, genre: "Fiction", publicationDate: "1986-01-01", description: "A young man in 1980s New York comes out to his parents and discovers his father has been living a secret gay life for decades.", series: null, tier: "A", topRank: null },
  { title: "While England Sleeps", author: "David Leavitt", pageCount: 320, genre: "Historical Fiction", publicationDate: "1993-01-01", description: "A young upper-class English writer falls for a working-class communist on the eve of the Spanish Civil War.", series: null, tier: "A", topRank: null },

  { title: "A Boy's Own Story", author: "Edmund White", pageCount: 224, genre: "Fiction", publicationDate: "1982-01-01", description: "An unnamed American boy comes of age and comes out in the 1950s Midwest — the first book of White's autobiographical trilogy.", series: null, tier: "S", topRank: null },
  { title: "The Beautiful Room Is Empty", author: "Edmund White", pageCount: 240, genre: "Fiction", publicationDate: "1988-01-01", description: "The second volume follows the narrator through college and into 1960s New York as Stonewall approaches.", series: null, tier: "S", topRank: null },
  { title: "The Farewell Symphony", author: "Edmund White", pageCount: 416, genre: "Fiction", publicationDate: "1997-01-01", description: "The final volume of the trilogy: a writer in New York and Paris lives through the AIDS years as his friends die around him.", series: null, tier: "A", topRank: null },

  { title: "Edinburgh", author: "Alexander Chee", pageCount: 240, genre: "Fiction", publicationDate: "2001-01-01", description: "A Korean-American boy in a boys' choir is abused by their conductor, and the novel follows the long reverberation.", series: null, tier: "S", topRank: null },
  { title: "The Queen of the Night", author: "Alexander Chee", pageCount: 576, genre: "Historical Fiction", publicationDate: "2016-01-01", description: "An American opera soprano at the height of Second Empire Paris receives a mysterious offer to originate a role based on her own secret past.", series: null, tier: "A", topRank: null },

  { title: "Cleanness", author: "Garth Greenwell", pageCount: 240, genre: "Fiction", publicationDate: "2020-01-01", description: "Nine linked stories about an American teacher in Sofia, Bulgaria — Greenwell's follow-up to What Belongs to You.", series: null, tier: "S", topRank: null },

  // Chicana / Latinx women
  { title: "Face of an Angel", author: "Denise Chávez", pageCount: 480, genre: "Fiction", publicationDate: "1994-01-01", description: "A New Mexico waitress works on a treatise on waitressing while her family's life falls apart around her.", series: null, tier: "A", topRank: null },
  { title: "Loving Pedro Infante", author: "Denise Chávez", pageCount: 240, genre: "Fiction", publicationDate: "2001-01-01", description: "A New Mexico woman and her best friend are devoted to the memory of the Mexican movie idol Pedro Infante.", series: null, tier: "A", topRank: null },

  { title: "Loving in the War Years", author: "Cherríe Moraga", pageCount: 192, genre: "Non-Fiction", publicationDate: "1983-01-01", description: "A foundational hybrid memoir-essay of Chicana lesbian feminist thought.", series: null, tier: "S", topRank: null },

  { title: "Borderlands/La Frontera", author: "Gloria Anzaldúa", pageCount: 256, genre: "Non-Fiction", publicationDate: "1987-01-01", description: "Anzaldúa's foundational essay-poem hybrid on the Texas-Mexico border and the new mestiza consciousness.", series: null, tier: "S", topRank: null },

  { title: "Canícula", author: "Norma Elia Cantú", pageCount: 192, genre: "Fiction", publicationDate: "1995-01-01", description: "Linked fictional autobiographical sketches of a girl growing up on the Texas-Mexico border in the 1940s and 50s.", series: null, tier: "A", topRank: null },

  { title: "So Far from God", author: "Ana Castillo", pageCount: 272, genre: "Fiction", publicationDate: "1993-01-01", description: "A New Mexico mother and her four remarkable daughters live through comic and tragic magical-realist events.", series: null, tier: "S", topRank: null },
  { title: "The Mixquiahuala Letters", author: "Ana Castillo", pageCount: 144, genre: "Fiction", publicationDate: "1986-01-01", description: "Forty letters from one Chicana artist to another document their travels together and apart in Mexico and the U.S.", series: null, tier: "A", topRank: null },

  { title: "Their Dogs Came with Them", author: "Helena María Viramontes", pageCount: 336, genre: "Fiction", publicationDate: "2007-01-01", description: "Four Chicana women in 1960s East Los Angeles contend with freeway construction, curfews, and a rabies quarantine.", series: null, tier: "A", topRank: null },

  // West African contemporary
  { title: "Waiting for an Angel", author: "Helon Habila", pageCount: 240, genre: "Fiction", publicationDate: "2002-01-01", description: "A young Nigerian journalist in the last years of the Abacha dictatorship — linked stories that won Habila the Caine Prize.", series: null, tier: "S", topRank: null },
  { title: "Measuring Time", author: "Helon Habila", pageCount: 384, genre: "Fiction", publicationDate: "2007-01-01", description: "Twin Nigerian brothers take different paths — one writes a history, the other becomes a soldier — across decades of African turmoil.", series: null, tier: "A", topRank: null },
  { title: "Oil on Water", author: "Helon Habila", pageCount: 240, genre: "Fiction", publicationDate: "2010-01-01", description: "Two Nigerian journalists travel into the Niger Delta to investigate the kidnapping of an oil worker's wife.", series: null, tier: "A", topRank: null },

  { title: "The Hairdresser of Harare", author: "Tendai Huchu", pageCount: 192, genre: "Fiction", publicationDate: "2010-01-01", description: "The most popular hairdresser in Harare is upstaged by a talented newcomer who turns out to have a dangerous secret.", series: null, tier: "A", topRank: null },
  { title: "The Library of the Dead", author: "Tendai Huchu", pageCount: 336, genre: "Fantasy", publicationDate: "2021-02-04", description: "A teenage ghostspeaker in a near-future Edinburgh uncovers a conspiracy centered on a secret library of the dead.", series: { name: "Edinburgh Nights", order: 1, total: 4 }, tier: "A", topRank: null },

  { title: "Dance of the Jakaranda", author: "Peter Kimani", pageCount: 320, genre: "Historical Fiction", publicationDate: "2017-02-07", description: "The construction of the Kenya-Uganda railway across three generations of Kenyans and the Englishman and Indian who built it.", series: null, tier: "A", topRank: null },

  { title: "Born on a Tuesday", author: "Elnathan John", pageCount: 272, genre: "Fiction", publicationDate: "2015-01-01", description: "A young Nigerian boy in a Sokoto madrasa is drawn into the Boko Haram insurgency and its consequences.", series: null, tier: "A", topRank: null },

  { title: "My Sister, the Serial Killer", author: "Oyinkan Braithwaite", pageCount: 240, genre: "Fiction", publicationDate: "2018-11-20", description: "A Lagos nurse keeps helping her beautiful younger sister clean up after each new boyfriend turns up dead.", series: null, tier: "A", topRank: null },

  { title: "A Girl Is a Body of Water", author: "Jennifer Nansubuga Makumbi", pageCount: 576, genre: "Fiction", publicationDate: "2020-09-01", description: "A Ugandan girl raised by her grandparents searches for the mother who disappeared at her birth.", series: null, tier: "S", topRank: null },

  // Modernist Latin American
  { title: "Paradiso", author: "José Lezama Lima", pageCount: 480, genre: "Fiction", publicationDate: "1966-01-01", description: "An exuberant Cuban baroque novel that ranges across a young man's family, philosophical initiation, and discovery of homosexuality in pre-Revolution Havana.", series: null, tier: "S", topRank: null },
  { title: "Oppiano Licario", author: "José Lezama Lima", pageCount: 368, genre: "Fiction", publicationDate: "1977-01-01", description: "Lezama's unfinished sequel to Paradiso, centered on the character who haunted the earlier novel.", series: null, tier: "A", topRank: null },

  { title: "The Truce", author: "Mario Benedetti", pageCount: 176, genre: "Fiction", publicationDate: "1960-01-01", description: "A widowed Montevideo office clerk's late-life diary records his unexpected affair with a younger colleague.", series: null, tier: "S", topRank: null },
  { title: "Who Among Us", author: "Mario Benedetti", pageCount: 144, genre: "Fiction", publicationDate: "1953-01-01", description: "Three voices — husband, wife, and friend — narrate a Uruguayan love triangle.", series: null, tier: "A", topRank: null },

  { title: "Chronicle of San Gabriel", author: "Julio Ramón Ribeyro", pageCount: 288, genre: "Fiction", publicationDate: "1960-01-01", description: "A Peruvian city boy is sent to his uncle's highland estate and watches it decay across a decade.", series: null, tier: "A", topRank: null },

  { title: "Barren Lives", author: "Graciliano Ramos", pageCount: 144, genre: "Fiction", publicationDate: "1938-01-01", description: "A Brazilian sertão family wanders the drought-ruined northeast searching for water and work — canonical Brazilian modernism.", series: null, tier: "S", topRank: null },
  { title: "Anguish", author: "Graciliano Ramos", pageCount: 240, genre: "Fiction", publicationDate: "1936-01-01", description: "A poor Brazilian clerk's interior monologue spirals into obsession with his upstairs neighbor.", series: null, tier: "A", topRank: null },

  { title: "Asleep in the Sun", author: "Adolfo Bioy Casares", pageCount: 208, genre: "Fiction", publicationDate: "1973-01-01", description: "A Buenos Aires watchmaker's wife is sent to a mysterious psychiatric institute and returns somehow changed — NYRB Classics.", series: null, tier: "A", topRank: null },
  { title: "A Plan for Escape", author: "Adolfo Bioy Casares", pageCount: 128, genre: "Fiction", publicationDate: "1945-01-01", description: "A naval officer is sent to a French Guiana penal colony run by a governor whose experiments have transformed the prisoners.", series: null, tier: "A", topRank: null },

  { title: "Thus Were Their Faces", author: "Silvina Ocampo", pageCount: 368, genre: "Fiction", publicationDate: "1988-01-01", description: "A career-spanning collection of Ocampo's short fiction — NYRB Classics, introduced by Helen Oyeyemi.", series: null, tier: "S", topRank: null },
  { title: "Forgotten Journey", author: "Silvina Ocampo", pageCount: 96, genre: "Fiction", publicationDate: "1937-01-01", description: "Ocampo's debut story collection, recently translated — unsettling glimpses of Argentine childhood.", series: null, tier: "A", topRank: null },

  { title: "The Decapitated Chicken and Other Stories", author: "Horacio Quiroga", pageCount: 192, genre: "Fiction", publicationDate: "1917-01-01", description: "The canonical collection of Quiroga's Uruguayan-Argentine horror and jungle tales.", series: null, tier: "S", topRank: null },

  // Classical / world classics
  { title: "The Prose Edda", author: "Snorri Sturluson", pageCount: 256, genre: "Fantasy", publicationDate: "1220-01-01", description: "The canonical thirteenth-century Icelandic compilation of Norse mythology, written by the chieftain-historian Snorri.", series: null, tier: "S", topRank: null },

  { title: "The Loom of Time", author: "Kalidasa", pageCount: 368, genre: "Fiction", publicationDate: "450-01-01", description: "Penguin Classics selection of Kalidasa's Sanskrit plays and narrative poems — the major surviving work of classical Indian literature.", series: null, tier: "S", topRank: null },

  { title: "Records of the Grand Historian", author: "Sima Qian", pageCount: 592, genre: "Non-Fiction", publicationDate: "94-01-01", description: "The second-century BCE Chinese historian's canonical history of pre-Han China — the founding work of Chinese historiography.", series: null, tier: "S", topRank: null },

  // Russian silver age / Soviet
  { title: "The Petty Demon", author: "Fyodor Sologub", pageCount: 368, genre: "Fiction", publicationDate: "1907-01-01", description: "A paranoid provincial Russian schoolteacher is pursued by a demonic presence he calls Nedotykomka — the canonical novel of Russian symbolism.", series: null, tier: "S", topRank: null },

  { title: "The House on the Embankment", author: "Yuri Trifonov", pageCount: 224, genre: "Fiction", publicationDate: "1976-01-01", description: "A Moscow academic's moral compromises during Stalin's terror are unspooled in Trifonov's canonical late-Soviet novella.", series: null, tier: "S", topRank: null },
  { title: "Another Life", author: "Yuri Trifonov", pageCount: 256, genre: "Fiction", publicationDate: "1975-01-01", description: "A Moscow widow recalls her marriage to a historian whose career was broken by small, cumulative acts of intellectual cowardice.", series: null, tier: "A", topRank: null },

  { title: "The Story of a Life", author: "Konstantin Paustovsky", pageCount: 656, genre: "Non-Fiction", publicationDate: "1945-01-01", description: "Paustovsky's six-volume memoir of a Russian life across the late Tsarist period, the Revolution, the civil war, and Soviet decades.", series: null, tier: "S", topRank: null },
  { title: "The Slow Approach of Thunder", author: "Konstantin Paustovsky", pageCount: 352, genre: "Non-Fiction", publicationDate: "1955-01-01", description: "A selection from Paustovsky's memoir focused on his literary and artistic encounters.", series: null, tier: "A", topRank: null },

  // Contemporary Korean
  { title: "The Hole", author: "Pyun Hye-young", pageCount: 208, genre: "Fiction", publicationDate: "2016-01-01", description: "A Korean professor wakes up paralyzed after a car accident and is cared for — or tormented — by his mother-in-law digging a hole in the garden.", series: null, tier: "S", topRank: null },
  { title: "City of Ash and Red", author: "Pyun Hye-young", pageCount: 256, genre: "Fiction", publicationDate: "2010-01-01", description: "A Korean office worker is transferred to an unnamed foreign city to do unclear work, and a plague of rats takes over.", series: null, tier: "A", topRank: null },

  { title: "My Brilliant Life", author: "Kim Ae-ran", pageCount: 208, genre: "Fiction", publicationDate: "2011-01-01", description: "A Korean teenage boy with a progeria-like condition that makes him age rapidly narrates his final year.", series: null, tier: "A", topRank: null },

  { title: "The Good Son", author: "Jeong You-jeong", pageCount: 320, genre: "Thriller", publicationDate: "2016-01-01", description: "A young Korean man wakes up in his mother's blood — and the novel reconstructs how and why.", series: null, tier: "A", topRank: null },
  { title: "Seven Years of Darkness", author: "Jeong You-jeong", pageCount: 464, genre: "Thriller", publicationDate: "2011-01-01", description: "A Korean boy's father confesses to a child's murder, and seven years later the son tries to piece together the truth.", series: null, tier: "A", topRank: null },

  { title: "I Have the Right to Destroy Myself", author: "Kim Young-ha", pageCount: 128, genre: "Fiction", publicationDate: "1996-01-01", description: "A Seoul 'suicide counselor' guides clients through their final deaths — a cold, disturbing novella.", series: null, tier: "S", topRank: null },
  { title: "Diary of a Murderer", author: "Kim Young-ha", pageCount: 224, genre: "Fiction", publicationDate: "2013-01-01", description: "An aging Korean serial killer with dementia keeps a diary to track his own disintegrating mind.", series: null, tier: "A", topRank: null },

  { title: "I'll Be Right There", author: "Shin Kyung-sook", pageCount: 336, genre: "Fiction", publicationDate: "2010-01-01", description: "A Korean woman receives a call that a former lover is dying and revisits the 1980s student activism they once shared.", series: null, tier: "A", topRank: null },
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

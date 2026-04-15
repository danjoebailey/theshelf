const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Greek modern literary
  { title: "Life in the Tomb", author: "Stratis Myrivilis", pageCount: 352, genre: "Historical Fiction", publicationDate: "1924-01-01", description: "A Greek soldier's letters home from the WWI Macedonian front — one of the great Greek antiwar novels.", series: null, tier: "S", topRank: null },
  { title: "The Mermaid Madonna", author: "Stratis Myrivilis", pageCount: 416, genre: "Fiction", publicationDate: "1949-01-01", description: "Life in a Lesbos fishing village between the wars, centered on a painted Madonna that rises from the sea.", series: null, tier: "A", topRank: null },

  { title: "The Murderess", author: "Alexandros Papadiamantis", pageCount: 160, genre: "Fiction", publicationDate: "1903-01-01", description: "An aging Greek island woman decides the world has no use for girls and starts killing them — Papadiamantis's unsettling masterpiece.", series: null, tier: "S", topRank: null },
  { title: "The Boundless Garden", author: "Alexandros Papadiamantis", pageCount: 400, genre: "Fiction", publicationDate: "1902-01-01", description: "Selected stories of Aegean island life from the nineteenth-century Greek master of the short form.", series: null, tier: "A", topRank: null },

  { title: "Z", author: "Vassilis Vassilikos", pageCount: 384, genre: "Fiction", publicationDate: "1966-01-01", description: "The political assassination of a Greek democratic leader reconstructed through documents, witness interviews, and prosecutorial reports.", series: null, tier: "S", topRank: null },
  { title: "The Harpoon Gun", author: "Vassilis Vassilikos", pageCount: 192, genre: "Fiction", publicationDate: "1971-01-01", description: "Short fiction on the Greek junta and political violence.", series: null, tier: "A", topRank: null },

  { title: "Deadline in Athens", author: "Petros Markaris", pageCount: 304, genre: "Mystery", publicationDate: "1995-01-01", description: "Inspector Costas Haritos investigates a double murder in 1990s Athens as the city grinds through austerity and Balkan war refugees.", series: { name: "Costas Haritos", order: 1, total: 10 }, tier: "A", topRank: null },
  { title: "Che Committed Suicide", author: "Petros Markaris", pageCount: 320, genre: "Mystery", publicationDate: "2003-01-01", description: "A series of public suicides by former Greek leftists draws Haritos into a case about what the political generation of the 1970s turned into.", series: { name: "Costas Haritos", order: 3, total: 10 }, tier: "A", topRank: null },

  // Swiss literary
  { title: "Homo Faber", author: "Max Frisch", pageCount: 256, genre: "Fiction", publicationDate: "1957-01-01", description: "A Swiss engineer who believes only in statistics and technology meets a young woman in Europe who may be his daughter.", series: null, tier: "S", topRank: null },
  { title: "I'm Not Stiller", author: "Max Frisch", pageCount: 416, genre: "Fiction", publicationDate: "1954-01-01", description: "A man arrested in Zurich insists he is not the fugitive sculptor Stiller — and his prison journal argues it all.", series: null, tier: "S", topRank: null },
  { title: "Montauk", author: "Max Frisch", pageCount: 176, genre: "Fiction", publicationDate: "1975-01-01", description: "An aging Swiss writer spends a weekend on Long Island with a young American lover and takes stock of his life.", series: null, tier: "A", topRank: null },

  { title: "The Pledge", author: "Friedrich Dürrenmatt", pageCount: 144, genre: "Mystery", publicationDate: "1958-01-01", description: "A retired Swiss police inspector refuses to let go of an unsolved child murder — the novel Dürrenmatt wrote as a response to the tidy detective story.", series: null, tier: "S", topRank: null },
  { title: "The Judge and His Hangman", author: "Friedrich Dürrenmatt", pageCount: 128, genre: "Mystery", publicationDate: "1950-01-01", description: "A dying Swiss inspector maneuvers a long-standing enemy into committing the murder the inspector has chosen to solve.", series: null, tier: "A", topRank: null },
  { title: "Suspicion", author: "Friedrich Dürrenmatt", pageCount: 144, genre: "Mystery", publicationDate: "1953-01-01", description: "A hospitalized Swiss police commissioner pursues a wartime Nazi doctor he believes is still practicing in Zurich.", series: null, tier: "A", topRank: null },

  { title: "On a Day Like This", author: "Peter Stamm", pageCount: 224, genre: "Fiction", publicationDate: "2006-01-01", description: "A Swiss middle-school teacher in Paris is diagnosed with a possibly terminal illness and walks away from his life.", series: null, tier: "A", topRank: null },
  { title: "Agnes", author: "Peter Stamm", pageCount: 160, genre: "Fiction", publicationDate: "1998-01-01", description: "A Swiss nonfiction writer in Chicago is asked by his lover Agnes to write a story about her — and she begins to live it.", series: null, tier: "A", topRank: null },

  { title: "Small World", author: "Martin Suter", pageCount: 288, genre: "Fiction", publicationDate: "1997-01-01", description: "An aging Swiss confidant of a wealthy industrial family begins losing his memory — and with it, a long-held secret.", series: null, tier: "A", topRank: null },

  { title: "Night Train to Lisbon", author: "Pascal Mercier", pageCount: 448, genre: "Fiction", publicationDate: "2004-01-01", description: "A Swiss classics teacher impulsively abandons his Bern classroom to trace the life of a Portuguese doctor whose obscure memoir he finds.", series: null, tier: "S", topRank: null },

  // Latin American men post-Bolaño
  { title: "Severina", author: "Rodrigo Rey Rosa", pageCount: 128, genre: "Fiction", publicationDate: "2011-01-01", description: "A Guatemala City bookseller becomes obsessed with a young female book thief who will only tell him fragments of her life.", series: null, tier: "A", topRank: null },
  { title: "The African Shore", author: "Rodrigo Rey Rosa", pageCount: 144, genre: "Fiction", publicationDate: "1999-01-01", description: "A European tourist and a Moroccan boy each pursue an owl through Tangier in Rey Rosa's terse parallel-life story.", series: null, tier: "A", topRank: null },

  { title: "The Invented Part", author: "Rodrigo Fresán", pageCount: 560, genre: "Fiction", publicationDate: "2014-01-01", description: "An aging Argentine writer tries to vanish into the Large Hadron Collider and leave behind an unwritten novel about his life.", series: null, tier: "S", topRank: null },
  { title: "Kensington Gardens", author: "Rodrigo Fresán", pageCount: 400, genre: "Fiction", publicationDate: "2003-01-01", description: "A famous children's-book author gives an interview about the rock star children he lived among in swinging 1960s London — and the J.M. Barrie-haunted childhood behind it.", series: null, tier: "A", topRank: null },

  { title: "The Guilty", author: "Juan Villoro", pageCount: 208, genre: "Fiction", publicationDate: "2007-01-01", description: "A collection of comic, caustic stories of contemporary Mexico from one of its sharpest chroniclers.", series: null, tier: "A", topRank: null },

  { title: "The Sound of Things Falling", author: "Juan Gabriel Vásquez", pageCount: 304, genre: "Fiction", publicationDate: "2011-01-01", description: "A young Bogotá law professor is shot on the street alongside a mysterious older man, and the novel unspools the victim's cocaine-era past.", series: null, tier: "S", topRank: null },
  { title: "The Shape of the Ruins", author: "Juan Gabriel Vásquez", pageCount: 528, genre: "Historical Fiction", publicationDate: "2015-01-01", description: "A Colombian writer is drawn into conspiracy theories about the 1948 assassination of Jorge Eliécer Gaitán.", series: null, tier: "A", topRank: null },
  { title: "Reputations", author: "Juan Gabriel Vásquez", pageCount: 208, genre: "Fiction", publicationDate: "2013-01-01", description: "A celebrated Colombian political cartoonist is forced to reckon with a career spent destroying people's reputations.", series: null, tier: "A", topRank: null },

  { title: "Necropolis", author: "Santiago Gamboa", pageCount: 432, genre: "Fiction", publicationDate: "2009-01-01", description: "A Colombian novelist attends a Jerusalem literary conference and falls into a scandal of priests, pornographers, and memoirists.", series: null, tier: "A", topRank: null },

  { title: "The Armies", author: "Evelio Rosero", pageCount: 208, genre: "Fiction", publicationDate: "2007-01-01", description: "A retired Colombian schoolteacher waits out the collapse of his small mountain village as armed men sweep through it.", series: null, tier: "S", topRank: null },

  { title: "Senselessness", author: "Horacio Castellanos Moya", pageCount: 144, genre: "Fiction", publicationDate: "2004-01-01", description: "A Central American writer is paid to edit human rights testimonies from a genocide and is slowly undone by the language.", series: null, tier: "S", topRank: null },
  { title: "Tyrant Memory", author: "Horacio Castellanos Moya", pageCount: 384, genre: "Fiction", publicationDate: "2008-01-01", description: "A Salvadoran woman whose husband is imprisoned by the dictator must hide his fugitive cousin in her own house.", series: null, tier: "A", topRank: null },

  // Asian American literary
  { title: "The Book of Salt", author: "Monique Truong", pageCount: 288, genre: "Historical Fiction", publicationDate: "2003-01-01", description: "A Vietnamese cook in the Paris household of Gertrude Stein and Alice B. Toklas narrates his displaced life.", series: null, tier: "S", topRank: null },
  { title: "Bitter in the Mouth", author: "Monique Truong", pageCount: 304, genre: "Fiction", publicationDate: "2010-01-01", description: "A Vietnamese-American girl in North Carolina grows up tasting the flavors of the words people speak to her.", series: null, tier: "A", topRank: null },

  { title: "Tropic of Orange", author: "Karen Tei Yamashita", pageCount: 288, genre: "Fiction", publicationDate: "1997-01-01", description: "An orange with a piece of the Tropic of Cancer attached drifts from Mexico into Los Angeles, and the city buckles.", series: null, tier: "A", topRank: null },
  { title: "I Hotel", author: "Karen Tei Yamashita", pageCount: 640, genre: "Historical Fiction", publicationDate: "2010-01-01", description: "A decade of Asian American radical activism in 1968-78 San Francisco, centered on the International Hotel — National Book Award finalist.", series: null, tier: "S", topRank: null },

  { title: "No-No Boy", author: "John Okada", pageCount: 272, genre: "Fiction", publicationDate: "1957-01-01", description: "A young Japanese American veteran released from prison for refusing the WWII loyalty questionnaire returns to Seattle and finds no place for himself.", series: null, tier: "S", topRank: null },

  { title: "America Is in the Heart", author: "Carlos Bulosan", pageCount: 352, genre: "Fiction", publicationDate: "1946-01-01", description: "A Filipino migrant laborer's semi-autobiographical account of labor organizing and racial violence across 1930s-40s America.", series: null, tier: "S", topRank: null },

  { title: "The Swimmers", author: "Julie Otsuka", pageCount: 192, genre: "Fiction", publicationDate: "2022-02-22", description: "An underground California pool and the elderly Japanese-American lap swimmers who depend on it slowly collapse under one mother's dementia.", series: null, tier: "S", topRank: null },

  { title: "The Book of Form and Emptiness", author: "Ruth Ozeki", pageCount: 560, genre: "Fiction", publicationDate: "2021-09-21", description: "A grieving boy in Seattle starts hearing objects speak to him after his father's death. Women's Prize for Fiction winner.", series: null, tier: "A", topRank: null },

  // Latinx American literary
  { title: "We the Animals", author: "Justin Torres", pageCount: 144, genre: "Fiction", publicationDate: "2011-08-30", description: "Three biracial brothers grow up in a volatile Brooklyn household — short, fierce, and musical.", series: null, tier: "S", topRank: null },
  { title: "Blackouts", author: "Justin Torres", pageCount: 320, genre: "Fiction", publicationDate: "2023-10-10", description: "A young man keeps vigil with a dying older queer friend and they together reconstruct a suppressed queer medical history. National Book Award winner.", series: null, tier: "S", topRank: null },

  { title: "Make Your Home Among Strangers", author: "Jennine Capó Crucet", pageCount: 400, genre: "Fiction", publicationDate: "2015-01-01", description: "A Cuban American freshman at an Ivy League school navigates impostor syndrome while her Miami family implodes.", series: null, tier: "A", topRank: null },

  { title: "Heart of Aztlán", author: "Rudolfo Anaya", pageCount: 224, genre: "Fiction", publicationDate: "1976-01-01", description: "A New Mexico Chicano family moves from the countryside to the barrio of Albuquerque and is broken by the move.", series: null, tier: "A", topRank: null },

  { title: "Our House in the Last World", author: "Oscar Hijuelos", pageCount: 256, genre: "Fiction", publicationDate: "1983-01-01", description: "A Cuban immigrant family in 1950s New York slowly fractures under the pressure of displacement.", series: null, tier: "A", topRank: null },
  { title: "Empress of the Splendid Season", author: "Oscar Hijuelos", pageCount: 352, genre: "Fiction", publicationDate: "1999-01-01", description: "A proud Cuban woman who came to New York as a girl works as a cleaning woman in Park Avenue apartments and reimagines her exile.", series: null, tier: "A", topRank: null },

  { title: "The Agüero Sisters", author: "Cristina García", pageCount: 320, genre: "Fiction", publicationDate: "1997-01-01", description: "Two Cuban sisters — one in Havana, one in Miami — each carry a different story of how their mother died.", series: null, tier: "A", topRank: null },
  { title: "The Lady Matador's Hotel", author: "Cristina García", pageCount: 224, genre: "Fiction", publicationDate: "2010-01-01", description: "A week in a Central American capital's luxury hotel, where a female bullfighter is the week's main attraction and five other lives converge around her.", series: null, tier: "A", topRank: null },

  { title: "Lost City Radio", author: "Daniel Alarcón", pageCount: 272, genre: "Fiction", publicationDate: "2007-01-01", description: "The host of a Lima radio show that reunites families separated by a civil war receives the name of a boy who may be her missing husband.", series: null, tier: "S", topRank: null },
  { title: "At Night We Walk in Circles", author: "Daniel Alarcón", pageCount: 384, genre: "Fiction", publicationDate: "2013-01-01", description: "A young Peruvian actor joins a touring revival of a banned radical play and loses himself inside the role.", series: null, tier: "A", topRank: null },

  // Iranian women literary
  { title: "Things We Left Unsaid", author: "Zoya Pirzad", pageCount: 336, genre: "Fiction", publicationDate: "2001-01-01", description: "An Armenian Iranian housewife in a 1960s Abadan oil-town refinery household falls for the quiet man who moves in next door.", series: null, tier: "S", topRank: null },
  { title: "The Space Between Us", author: "Zoya Pirzad", pageCount: 304, genre: "Fiction", publicationDate: "2004-01-01", description: "Linked stories of contemporary Iranian women navigating small constraints.", series: null, tier: "A", topRank: null },

  { title: "The Book of Fate", author: "Parinoush Saniee", pageCount: 464, genre: "Historical Fiction", publicationDate: "2003-01-01", description: "An Iranian woman's life across five decades from the last years of the Shah through the Islamic Republic.", series: null, tier: "A", topRank: null },

  { title: "My Bird", author: "Fariba Vafi", pageCount: 144, genre: "Fiction", publicationDate: "2002-01-01", description: "A young Iranian housewife in Tehran records the quiet disintegration of her marriage and her sense of self.", series: null, tier: "A", topRank: null },

  { title: "The Pomegranate Lady and Her Sons", author: "Goli Taraghi", pageCount: 288, genre: "Fiction", publicationDate: "2013-01-01", description: "Linked stories of Iranian women — in Iran and in exile — from one of the great Persian short story writers.", series: null, tier: "A", topRank: null },

  { title: "Foreigner", author: "Nahid Rachlin", pageCount: 208, genre: "Fiction", publicationDate: "1978-01-01", description: "A Western-trained Iranian biologist returns to Tehran for a brief visit and finds she cannot leave.", series: null, tier: "A", topRank: null },

  { title: "Women Without Men", author: "Shahrnush Parsipur", pageCount: 160, genre: "Fiction", publicationDate: "1989-01-01", description: "Five Iranian women converge at a rural garden and begin to shed the constraints of their lives — the novel that got Parsipur imprisoned.", series: null, tier: "S", topRank: null },
  { title: "Touba and the Meaning of Night", author: "Shahrnush Parsipur", pageCount: 336, genre: "Historical Fiction", publicationDate: "1989-01-01", description: "An Iranian woman's life across the twentieth century mirrors the transformation of her country.", series: null, tier: "A", topRank: null },

  // Contemporary German-language women / Austrian
  { title: "The Wall", author: "Marlen Haushofer", pageCount: 256, genre: "Fiction", publicationDate: "1963-01-01", description: "An Austrian woman on a hunting-lodge vacation wakes to find an invisible wall separating her from the rest of humanity.", series: null, tier: "S", topRank: null },
  { title: "We Kill Stella", author: "Marlen Haushofer", pageCount: 96, genre: "Fiction", publicationDate: "1958-01-01", description: "An Austrian woman reckons with the death of a young girl her family took in as a boarder.", series: null, tier: "A", topRank: null },

  { title: "The Artificial Silk Girl", author: "Irmgard Keun", pageCount: 224, genre: "Fiction", publicationDate: "1932-01-01", description: "A young woman flees her provincial German town for Berlin to become a 'glamour girl' on the eve of Nazi power.", series: null, tier: "S", topRank: null },
  { title: "After Midnight", author: "Irmgard Keun", pageCount: 160, genre: "Fiction", publicationDate: "1937-01-01", description: "A young German woman tries to preserve her ordinary life and an affair as the Nazi regime consolidates around her.", series: null, tier: "A", topRank: null },

  { title: "Maybe Esther", author: "Katja Petrowskaja", pageCount: 272, genre: "Non-Fiction", publicationDate: "2014-01-01", description: "A Ukrainian-Jewish writer's family memoir pieces together grandparents lost in WWII from fragments and guesses.", series: null, tier: "A", topRank: null },

  { title: "An Inventory of Losses", author: "Judith Schalansky", pageCount: 240, genre: "Fiction", publicationDate: "2018-01-01", description: "Twelve essays about things that no longer exist — an extinct tiger, a burned Greek play, a drowned island.", series: null, tier: "S", topRank: null },
  { title: "The Giraffe's Neck", author: "Judith Schalansky", pageCount: 224, genre: "Fiction", publicationDate: "2011-01-01", description: "A biology teacher in a dying East German school town clings to Darwinism while her town depopulates.", series: null, tier: "A", topRank: null },

  { title: "River", author: "Esther Kinsky", pageCount: 368, genre: "Fiction", publicationDate: "2014-01-01", description: "A woman walks along the River Lea in East London and remembers twelve other rivers in her life.", series: null, tier: "A", topRank: null },
  { title: "Grove", author: "Esther Kinsky", pageCount: 288, genre: "Fiction", publicationDate: "2018-01-01", description: "A grieving woman travels to small Italian villages in winter and documents their cemeteries and landscapes.", series: null, tier: "A", topRank: null },

  { title: "Night Work", author: "Thomas Glavinic", pageCount: 400, genre: "Fiction", publicationDate: "2006-01-01", description: "A man wakes up in Vienna to find that he is the only human being left on earth.", series: null, tier: "A", topRank: null },
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

const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "How Late It Was, How Late", author: "James Kelman", pageCount: 374, genre: "Fiction", publicationDate: "1994-01-01", description: "A drunken Glasgow ex-con wakes up in an alley, goes blind, and tries to navigate the benefits system. Booker Prize winner.", series: null, tier: "S", topRank: null },
  { title: "A Disaffection", author: "James Kelman", pageCount: 352, genre: "Fiction", publicationDate: "1989-01-01", description: "A Glasgow schoolteacher finds two industrial pipes that he decides to play like pan-flutes, and unravels.", series: null, tier: "S", topRank: null },
  { title: "The Busconductor Hines", author: "James Kelman", pageCount: 240, genre: "Fiction", publicationDate: "1984-01-01", description: "A young Glasgow bus conductor's interior monologue carries him through the slow humiliation of his working-class life.", series: null, tier: "A", topRank: null },
  { title: "Kieron Smith, boy", author: "James Kelman", pageCount: 432, genre: "Fiction", publicationDate: "2008-01-01", description: "A Glasgow boy growing up in a working-class neighborhood tells his own life in his own voice across a single immersive novel.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Austrian / German modernists — new authors
  { title: "Jakob von Gunten", author: "Robert Walser", pageCount: 176, genre: "Fiction", publicationDate: "1909-01-01", description: "A young aristocrat enrolls in a school that trains servants and observes its mysterious headmaster — Kafka considered Walser a master.", series: null, tier: "S", topRank: null },
  { title: "The Tanners", author: "Robert Walser", pageCount: 368, genre: "Fiction", publicationDate: "1907-01-01", description: "The Tanner siblings drift through turn-of-the-century Switzerland in Walser's first novel — NYRB Classics.", series: null, tier: "A", topRank: null },

  { title: "Memoirs of an Anti-Semite", author: "Gregor von Rezzori", pageCount: 304, genre: "Fiction", publicationDate: "1979-01-01", description: "Five connected stories of a Romanian-Austrian aristocrat's life of casual prejudice across the twentieth century.", series: null, tier: "S", topRank: null },
  { title: "The Snows of Yesteryear", author: "Gregor von Rezzori", pageCount: 304, genre: "Non-Fiction", publicationDate: "1989-01-01", description: "A memoir of Rezzori's Czernowitz childhood, rendered as five portraits of his family and its servants.", series: null, tier: "S", topRank: null },

  { title: "The Strudlhof Steps", author: "Heimito von Doderer", pageCount: 912, genre: "Fiction", publicationDate: "1951-01-01", description: "A vast Viennese novel centered on a famous staircase, weaving scores of characters across two decades — NYRB Classics 2021.", series: null, tier: "S", topRank: null },

  { title: "Storm of Steel", author: "Ernst Jünger", pageCount: 320, genre: "Non-Fiction", publicationDate: "1920-01-01", description: "A German officer's first-hand account of WWI trench combat — unflinching, aesthetically dangerous, and impossible to forget.", series: null, tier: "S", topRank: null },
  { title: "On the Marble Cliffs", author: "Ernst Jünger", pageCount: 144, genre: "Fantasy", publicationDate: "1939-01-01", description: "An allegorical novel of a coming totalitarian invasion, written in plain sight under the Nazi regime.", series: null, tier: "A", topRank: null },

  // Austrian / German fills
  { title: "Dream Story", author: "Arthur Schnitzler", pageCount: 128, genre: "Fiction", publicationDate: "1926-01-01", description: "A Viennese doctor wanders into a secret masked orgy after his wife confesses a fantasy — the basis for Eyes Wide Shut.", series: null, tier: "S", topRank: null },
  { title: "Late Fame", author: "Arthur Schnitzler", pageCount: 144, genre: "Fiction", publicationDate: "2014-01-01", description: "A long-forgotten Viennese poet is suddenly adored by a younger literary circle and comes to understand what they really want from him.", series: null, tier: "A", topRank: null },

  { title: "Tales of a Long Night", author: "Alfred Döblin", pageCount: 640, genre: "Fiction", publicationDate: "1956-01-01", description: "Döblin's last novel: a British veteran returns from WWII, and his family's response unfolds in nested stories over a single night.", series: null, tier: "A", topRank: null },

  { title: "Malina", author: "Ingeborg Bachmann", pageCount: 240, genre: "Fiction", publicationDate: "1971-01-01", description: "A woman in Vienna splits between two men — her violent father and the cold rational Malina — in Bachmann's canonical novel.", series: null, tier: "S", topRank: null },

  { title: "Auto-da-Fé", author: "Elias Canetti", pageCount: 496, genre: "Fiction", publicationDate: "1935-01-01", description: "A reclusive Viennese sinologist is manipulated into marrying his housekeeper and slowly driven from his own library — by the 1981 Nobel laureate.", series: null, tier: "S", topRank: null },

  { title: "Every Man Dies Alone", author: "Hans Fallada", pageCount: 544, genre: "Historical Fiction", publicationDate: "1947-01-01", description: "A working-class Berlin couple mount a quiet private resistance to the Nazi regime by scattering handwritten postcards across the city.", series: null, tier: "S", topRank: null },

  // Italian pre-war / post-war — new authors
  { title: "The House by the Medlar Tree", author: "Giovanni Verga", pageCount: 256, genre: "Fiction", publicationDate: "1881-01-01", description: "A Sicilian fishing family's slow ruin across several generations — the canonical work of Italian verismo.", series: null, tier: "S", topRank: null },
  { title: "Little Novels of Sicily", author: "Giovanni Verga", pageCount: 208, genre: "Fiction", publicationDate: "1883-01-01", description: "Short stories of Sicilian village life drawn with Verga's unsparing realist eye.", series: null, tier: "A", topRank: null },

  { title: "The Viceroys", author: "Federico De Roberto", pageCount: 640, genre: "Historical Fiction", publicationDate: "1894-01-01", description: "A corrupt Sicilian noble family adapts across the nineteenth century to retain power through every political regime.", series: null, tier: "S", topRank: null },

  { title: "Bread and Wine", author: "Ignazio Silone", pageCount: 320, genre: "Fiction", publicationDate: "1936-01-01", description: "A communist organizer in fascist Italy disguises himself as a priest and hides in a rural village.", series: null, tier: "S", topRank: null },
  { title: "Fontamara", author: "Ignazio Silone", pageCount: 240, genre: "Fiction", publicationDate: "1933-01-01", description: "An isolated Abruzzi village is ground under the boot of local fascist authority — the canonical Italian peasant novel of the 1930s.", series: null, tier: "A", topRank: null },

  { title: "Conversation in Sicily", author: "Elio Vittorini", pageCount: 208, genre: "Fiction", publicationDate: "1941-01-01", description: "A Sicilian printer living in Milan returns home to his mother and encounters ghosts of a country crushed by fascism.", series: null, tier: "S", topRank: null },
  { title: "Women of Messina", author: "Elio Vittorini", pageCount: 352, genre: "Fiction", publicationDate: "1949-01-01", description: "A group of refugees rebuilds a war-ruined Sicilian village in Vittorini's postwar romance.", series: null, tier: "A", topRank: null },

  { title: "Neapolitan Chronicles", author: "Anna Maria Ortese", pageCount: 176, genre: "Fiction", publicationDate: "1953-01-01", description: "Linked stories of postwar Naples — Europa Editions — the book Elena Ferrante cites as formative.", series: null, tier: "S", topRank: null },
  { title: "The Iguana", author: "Anna Maria Ortese", pageCount: 192, genre: "Fiction", publicationDate: "1965-01-01", description: "A Milanese count lands on an uncharted Portuguese island where an iguana is kept as a servant.", series: null, tier: "A", topRank: null },

  { title: "Johnny the Partisan", author: "Beppe Fenoglio", pageCount: 352, genre: "Historical Fiction", publicationDate: "1968-01-01", description: "A young Italian anti-fascist joins the partisans in the Langhe hills and endures the 1943-45 war.", series: null, tier: "S", topRank: null },
  { title: "A Private Affair", author: "Beppe Fenoglio", pageCount: 128, genre: "Fiction", publicationDate: "1963-01-01", description: "A partisan near the end of the Italian civil war searches obsessively for a friend who may have slept with the girl he loved.", series: null, tier: "A", topRank: null },

  { title: "The Beautiful Antonio", author: "Vitaliano Brancati", pageCount: 320, genre: "Fiction", publicationDate: "1949-01-01", description: "A famously beautiful Catania man's arranged marriage exposes a secret that shames his whole family.", series: null, tier: "A", topRank: null },

  // Italian fills
  { title: "The Late Mattia Pascal", author: "Luigi Pirandello", pageCount: 272, genre: "Fiction", publicationDate: "1904-01-01", description: "A Sicilian man reads in the newspaper that he has drowned and decides to start a new life as somebody else.", series: null, tier: "S", topRank: null },
  { title: "One, No One and One Hundred Thousand", author: "Luigi Pirandello", pageCount: 176, genre: "Fiction", publicationDate: "1926-01-01", description: "A Sicilian man's wife casually observes that his nose is crooked, and his identity unspools completely.", series: null, tier: "A", topRank: null },

  { title: "Words Are Stones", author: "Carlo Levi", pageCount: 224, genre: "Non-Fiction", publicationDate: "1955-01-01", description: "Levi's travels through Sicily after Christ Stopped at Eboli — the writer bears witness to three trips to the island.", series: null, tier: "A", topRank: null },

  // Dutch / Flemish
  { title: "The Following Story", author: "Cees Nooteboom", pageCount: 144, genre: "Fiction", publicationDate: "1991-01-01", description: "A Dutch classical scholar falls asleep in Amsterdam and wakes up in a Lisbon hotel room — then begins a posthumous journey.", series: null, tier: "S", topRank: null },
  { title: "Rituals", author: "Cees Nooteboom", pageCount: 160, genre: "Fiction", publicationDate: "1980-01-01", description: "A privileged Amsterdam bystander drifts through his life watching two very different father-son pairs destroy themselves.", series: null, tier: "S", topRank: null },
  { title: "Lost Paradise", author: "Cees Nooteboom", pageCount: 160, genre: "Fiction", publicationDate: "2004-01-01", description: "Two Brazilian women travel to Australia in search of angels and end up working as actors in a Perth theater.", series: null, tier: "A", topRank: null },

  { title: "The Assault", author: "Harry Mulisch", pageCount: 192, genre: "Historical Fiction", publicationDate: "1982-01-01", description: "A Dutch boy whose family is murdered by Nazi reprisal spends his life trying to piece together what happened that night.", series: null, tier: "S", topRank: null },
  { title: "The Discovery of Heaven", author: "Harry Mulisch", pageCount: 736, genre: "Fiction", publicationDate: "1992-01-01", description: "Two angels intervene in the lives of three Dutch friends to retrieve the stone tablets of the Ten Commandments from Earth.", series: null, tier: "S", topRank: null },
  { title: "Siegfried", author: "Harry Mulisch", pageCount: 192, genre: "Fiction", publicationDate: "2001-01-01", description: "An aging Dutch writer meets an elderly Austrian couple who claim to have been in Hitler's inner circle.", series: null, tier: "A", topRank: null },

  { title: "The Darkroom of Damocles", author: "Willem Frederik Hermans", pageCount: 352, genre: "Historical Fiction", publicationDate: "1958-01-01", description: "A Dutch tobacconist is drawn into the wartime resistance by a mysterious double who may or may not exist.", series: null, tier: "S", topRank: null },
  { title: "Beyond Sleep", author: "Willem Frederik Hermans", pageCount: 320, genre: "Fiction", publicationDate: "1966-01-01", description: "A Dutch graduate student joins a Norwegian geology expedition in the Arctic and finds only catastrophe.", series: null, tier: "A", topRank: null },

  { title: "The Evenings", author: "Gerard Reve", pageCount: 320, genre: "Fiction", publicationDate: "1947-01-01", description: "The last ten evenings of 1946 in the life of a bored Amsterdam office worker — the canonical Dutch postwar novel.", series: null, tier: "S", topRank: null },
  { title: "Parents Worry", author: "Gerard Reve", pageCount: 208, genre: "Fiction", publicationDate: "1988-01-01", description: "A middle-aged Dutch writer and his younger lover pass a summer in rural France.", series: null, tier: "A", topRank: null },

  { title: "The Black Lake", author: "Hella Haasse", pageCount: 128, genre: "Fiction", publicationDate: "1948-01-01", description: "A Dutch colonial boy in Java and his Indonesian childhood friend grow up on opposite sides of an independence movement.", series: null, tier: "S", topRank: null },
  { title: "In a Dark Wood Wandering", author: "Hella Haasse", pageCount: 592, genre: "Historical Fiction", publicationDate: "1949-01-01", description: "The life of Charles d'Orléans, the fifteenth-century poet-duke, told in meticulous detail across European battlefields and prisons.", series: null, tier: "A", topRank: null },

  { title: "The Hidden Force", author: "Louis Couperus", pageCount: 272, genre: "Fiction", publicationDate: "1900-01-01", description: "A Dutch colonial resident in Java is slowly undone by a native mystical force he refuses to believe in.", series: null, tier: "S", topRank: null },
  { title: "Eline Vere", author: "Louis Couperus", pageCount: 512, genre: "Fiction", publicationDate: "1889-01-01", description: "A beautiful young woman in The Hague society slowly wastes away under the pressure of her own expectations.", series: null, tier: "A", topRank: null },

  { title: "The Sorrow of Belgium", author: "Hugo Claus", pageCount: 608, genre: "Historical Fiction", publicationDate: "1983-01-01", description: "A Flemish boy grows up during the Nazi occupation in a family that is itself complicit — the canonical modern Belgian novel.", series: null, tier: "S", topRank: null },
  { title: "Desire", author: "Hugo Claus", pageCount: 192, genre: "Fiction", publicationDate: "1978-01-01", description: "Two Flemish small-town gamblers travel to Las Vegas and destroy each other.", series: null, tier: "A", topRank: null },

  { title: "Tirza", author: "Arnon Grunberg", pageCount: 400, genre: "Fiction", publicationDate: "2006-01-01", description: "A recently retired Amsterdam book editor fixates on his departing daughter Tirza in a steadily darker monologue.", series: null, tier: "S", topRank: null },

  // Scottish
  { title: "Lanark", author: "Alasdair Gray", pageCount: 560, genre: "Fantasy", publicationDate: "1981-01-01", description: "A dystopian Glasgow named Unthank mirrors and swallows the real city in Gray's four-part postmodernist masterpiece.", series: null, tier: "S", topRank: null },
  { title: "1982, Janine", author: "Alasdair Gray", pageCount: 352, genre: "Fiction", publicationDate: "1984-01-01", description: "A middle-aged Scottish security executive lies sleepless in a hotel and works through pornographic fantasies and political guilt.", series: null, tier: "S", topRank: null },
  { title: "Poor Things", author: "Alasdair Gray", pageCount: 320, genre: "Fiction", publicationDate: "1992-01-01", description: "A Victorian Glasgow doctor reanimates a drowned woman with the brain of her unborn child. Whitbread Prize winner.", series: null, tier: "S", topRank: null },

  { title: "Day", author: "A.L. Kennedy", pageCount: 304, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "A WWII RAF tail gunner takes a job as an extra in a prisoner-of-war film and relives the war.", series: null, tier: "A", topRank: null },
  { title: "Paradise", author: "A.L. Kennedy", pageCount: 352, genre: "Fiction", publicationDate: "2004-01-01", description: "A functioning alcoholic Scottish woman's blackouts are slowly narrowing her life.", series: null, tier: "A", topRank: null },

  { title: "The Panopticon", author: "Jenni Fagan", pageCount: 320, genre: "Fiction", publicationDate: "2012-01-01", description: "A fifteen-year-old Scottish girl is sent to an experimental institution for chronic young offenders and refuses to surrender.", series: null, tier: "A", topRank: null },
  { title: "The Sunlight Pilgrims", author: "Jenni Fagan", pageCount: 304, genre: "Fiction", publicationDate: "2016-01-01", description: "In a near-future Scotland heading into an unstoppable ice age, a grieving young man moves into a caravan park.", series: null, tier: "A", topRank: null },

  // Irish
  { title: "The Land of Spices", author: "Kate O'Brien", pageCount: 304, genre: "Fiction", publicationDate: "1941-01-01", description: "A Reverend Mother at an Irish convent boarding school watches over a young student who reminds her of her own past.", series: null, tier: "S", topRank: null },
  { title: "Mary Lavelle", author: "Kate O'Brien", pageCount: 256, genre: "Fiction", publicationDate: "1936-01-01", description: "A young Irish governess working for a wealthy family in northern Spain falls in love with their married son.", series: null, tier: "A", topRank: null },

  { title: "Good Behaviour", author: "Molly Keane", pageCount: 256, genre: "Fiction", publicationDate: "1981-01-01", description: "An aging Anglo-Irish spinster recalls her childhood in a decaying Big House — Booker-shortlisted comic masterpiece.", series: null, tier: "S", topRank: null },
  { title: "Time After Time", author: "Molly Keane", pageCount: 256, genre: "Fiction", publicationDate: "1983-01-01", description: "Three elderly siblings and their blind sister-in-law live out the decline of their Irish country estate.", series: null, tier: "A", topRank: null },

  { title: "Proxopera", author: "Benedict Kiely", pageCount: 128, genre: "Fiction", publicationDate: "1977-01-01", description: "A retired Northern Irish schoolteacher is forced by the IRA to drive a bomb into town as a proxy.", series: null, tier: "A", topRank: null },
  { title: "The Captain with the Whiskers", author: "Benedict Kiely", pageCount: 320, genre: "Fiction", publicationDate: "1960-01-01", description: "A tyrannical Irish captain's shadow rules his children's lives long after his death.", series: null, tier: "A", topRank: null },

  { title: "Langrishe, Go Down", author: "Aidan Higgins", pageCount: 272, genre: "Fiction", publicationDate: "1966-01-01", description: "Three spinster sisters in a decaying Irish country house look back on a love affair that briefly broke their silence.", series: null, tier: "S", topRank: null },
  { title: "Balcony of Europe", author: "Aidan Higgins", pageCount: 480, genre: "Fiction", publicationDate: "1972-01-01", description: "An Irish painter living on the Costa del Sol in the 1960s records the affairs and debaucheries of an expatriate colony.", series: null, tier: "A", topRank: null },

  { title: "The Butcher Boy", author: "Patrick McCabe", pageCount: 224, genre: "Fiction", publicationDate: "1992-01-01", description: "A young boy in a small Irish town in the 1960s narrates his own slide into murder in a ferocious voice.", series: null, tier: "S", topRank: null },
  { title: "Breakfast on Pluto", author: "Patrick McCabe", pageCount: 208, genre: "Fiction", publicationDate: "1998-01-01", description: "A transgender Irish woman from a border town tells her own story through 1970s London.", series: null, tier: "A", topRank: null },

  // Native American
  { title: "Mean Spirit", author: "Linda Hogan", pageCount: 384, genre: "Historical Fiction", publicationDate: "1990-01-01", description: "Osage people in 1920s Oklahoma are murdered for their oil rights in Hogan's Pulitzer-finalist novel.", series: null, tier: "A", topRank: null },
  { title: "Solar Storms", author: "Linda Hogan", pageCount: 352, genre: "Fiction", publicationDate: "1995-01-01", description: "A teenage Chickasaw girl returns to the Minnesota-Canadian border to her great-grandmothers' land as a dam project threatens their community.", series: null, tier: "A", topRank: null },

  { title: "Bearheart", author: "Gerald Vizenor", pageCount: 256, genre: "Fiction", publicationDate: "1978-01-01", description: "A group of native travelers make a post-apocalyptic pilgrimage across the American heartland in Vizenor's trickster novel.", series: null, tier: "A", topRank: null },
  { title: "Griever: An American Monkey King in China", author: "Gerald Vizenor", pageCount: 240, genre: "Fiction", publicationDate: "1987-01-01", description: "An Anishinaabe exchange teacher in Tianjin reinvents himself as a figure out of Chinese mythology.", series: null, tier: "A", topRank: null },

  // Nordic
  { title: "The Royal Physician's Visit", author: "Per Olov Enquist", pageCount: 336, genre: "Historical Fiction", publicationDate: "1999-01-01", description: "A German doctor becomes the confidant of an unstable Danish king and regent for his kingdom in 1768 — the novel that made Enquist internationally famous.", series: null, tier: "S", topRank: null },
  { title: "The Book About Blanche and Marie", author: "Per Olov Enquist", pageCount: 256, genre: "Historical Fiction", publicationDate: "2004-01-01", description: "Marie Curie and her friend Blanche Wittman, once Charcot's most famous hysteric patient, share their love and research.", series: null, tier: "A", topRank: null },

  { title: "The Emigrants", author: "Vilhelm Moberg", pageCount: 416, genre: "Historical Fiction", publicationDate: "1949-01-01", description: "A nineteenth-century Swedish farming family decides to emigrate to America — the first volume of the canonical Swedish emigrant saga.", series: { name: "The Emigrants", order: 1, total: 4 }, tier: "S", topRank: null },
  { title: "Unto a Good Land", author: "Vilhelm Moberg", pageCount: 432, genre: "Historical Fiction", publicationDate: "1952-01-01", description: "The Swedish emigrants cross the Atlantic and journey through America to Minnesota.", series: { name: "The Emigrants", order: 2, total: 4 }, tier: "S", topRank: null },

  { title: "A Fugitive Crosses His Tracks", author: "Aksel Sandemose", pageCount: 432, genre: "Fiction", publicationDate: "1933-01-01", description: "A Danish-Norwegian murderer writes his memoir from the vanishing point where his guilt becomes unreadable — the novel that coined the Law of Jante.", series: null, tier: "A", topRank: null },
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

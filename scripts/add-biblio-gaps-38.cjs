const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Zorba the Greek", author: "Nikos Kazantzakis", pageCount: 368, genre: "Fiction", publicationDate: "1946-01-01", description: "A young Greek intellectual rents a lignite mine on Crete and is overturned by the uncontainable life of the laborer Alexis Zorba.", series: null, tier: "S", topRank: null },
  { title: "The Last Temptation of Christ", author: "Nikos Kazantzakis", pageCount: 528, genre: "Fiction", publicationDate: "1955-01-01", description: "A human Jesus wrestles with doubt, desire, and his own divinity through his final hours.", series: null, tier: "S", topRank: null },
  { title: "Freedom or Death", author: "Nikos Kazantzakis", pageCount: 434, genre: "Historical Fiction", publicationDate: "1953-01-01", description: "Nineteenth-century Cretan revolutionaries rise against Ottoman rule in a savage, epic struggle.", series: null, tier: "A", topRank: null },
  { title: "Report to Greco", author: "Nikos Kazantzakis", pageCount: 528, genre: "Non-Fiction", publicationDate: "1961-01-01", description: "Kazantzakis's spiritual autobiography, addressed to the Cretan-born Renaissance painter El Greco.", series: null, tier: "A", topRank: null },

  { title: "The Family of Pascual Duarte", author: "Camilo José Cela", pageCount: 176, genre: "Fiction", publicationDate: "1942-01-01", description: "A condemned Spanish peasant's written confession traces the slow escalation of his violence.", series: null, tier: "S", topRank: null },
  { title: "The Hive", author: "Camilo José Cela", pageCount: 320, genre: "Fiction", publicationDate: "1950-01-01", description: "Three days in postwar Madrid follow hundreds of characters through cafés, brothels, and rented rooms.", series: null, tier: "S", topRank: null },
  { title: "Journey to the Alcarria", author: "Camilo José Cela", pageCount: 176, genre: "Non-Fiction", publicationDate: "1948-01-01", description: "Cela's walking account of a week spent crossing rural Spain on foot in the late 1940s.", series: null, tier: "A", topRank: null },

  { title: "Fado Alexandrino", author: "António Lobo Antunes", pageCount: 528, genre: "Fiction", publicationDate: "1983-01-01", description: "Four veterans of Portugal's African colonial war meet a decade later and unravel their own lives in long overlapping monologues.", series: null, tier: "A", topRank: null },
  { title: "The Return of the Caravels", author: "António Lobo Antunes", pageCount: 240, genre: "Fiction", publicationDate: "1988-01-01", description: "Returning Portuguese colonists arrive back in a Lisbon where every century happens at once.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Spanish peninsular
  { title: "Fortunata and Jacinta", author: "Benito Pérez Galdós", pageCount: 818, genre: "Fiction", publicationDate: "1887-01-01", description: "Two women — a working-class beauty and a bourgeois wife — share a husband in nineteenth-century Madrid, the masterwork of Spanish realism.", series: null, tier: "S", topRank: null },
  { title: "Tristana", author: "Benito Pérez Galdós", pageCount: 208, genre: "Fiction", publicationDate: "1892-01-01", description: "A young orphan becomes the ward — and then lover — of an aging rake who refuses to let her go.", series: null, tier: "A", topRank: null },
  { title: "Nazarín", author: "Benito Pérez Galdós", pageCount: 224, genre: "Fiction", publicationDate: "1895-01-01", description: "A Christlike priest wanders the roads of Spain with two repentant prostitutes and is taken for a madman.", series: null, tier: "A", topRank: null },

  { title: "La Regenta", author: "Leopoldo Alas", pageCount: 736, genre: "Fiction", publicationDate: "1885-01-01", description: "A young wife in a provincial Spanish city drifts toward adultery while her confessor and a cynical dandy both pursue her.", series: null, tier: "S", topRank: null },

  { title: "The Tree of Knowledge", author: "Pío Baroja", pageCount: 224, genre: "Fiction", publicationDate: "1911-01-01", description: "A young Spanish medical student's idealism is ground down by the brutalities of turn-of-the-century Madrid and provincial medicine.", series: null, tier: "A", topRank: null },
  { title: "The Restlessness of Shanti Andía", author: "Pío Baroja", pageCount: 256, genre: "Fiction", publicationDate: "1911-01-01", description: "An aging Basque sea captain recalls a life of voyages, smugglers, and lost loves.", series: null, tier: "A", topRank: null },

  { title: "Mist", author: "Miguel de Unamuno", pageCount: 192, genre: "Fiction", publicationDate: "1914-01-01", description: "A hopelessly lovesick man visits the author of his own existence to argue about whether he is allowed to die.", series: null, tier: "S", topRank: null },
  { title: "Abel Sánchez", author: "Miguel de Unamuno", pageCount: 176, genre: "Fiction", publicationDate: "1917-01-01", description: "A modern retelling of Cain and Abel through two boyhood friends consumed by jealousy.", series: null, tier: "A", topRank: null },
  { title: "Saint Manuel Bueno, Martyr", author: "Miguel de Unamuno", pageCount: 96, genre: "Fiction", publicationDate: "1931-01-01", description: "A village priest secretly loses his faith but continues to serve his people with greater care than ever.", series: null, tier: "S", topRank: null },

  { title: "Marks of Identity", author: "Juan Goytisolo", pageCount: 368, genre: "Fiction", publicationDate: "1966-01-01", description: "A Spanish exile in Barcelona and Paris shuffles documents of his family past in an attempt to make sense of Franco's Spain.", series: null, tier: "A", topRank: null },
  { title: "Count Julian", author: "Juan Goytisolo", pageCount: 224, genre: "Fiction", publicationDate: "1970-01-01", description: "An exiled Spaniard in Tangier imagines a ferocious Moorish reconquest of Spain.", series: null, tier: "A", topRank: null },
  { title: "Juan the Landless", author: "Juan Goytisolo", pageCount: 256, genre: "Fiction", publicationDate: "1975-01-01", description: "The final volume of the Álvaro Mendiola trilogy breaks open into pure textual iconoclasm.", series: null, tier: "A", topRank: null },

  { title: "Soldiers of Salamis", author: "Javier Cercas", pageCount: 224, genre: "Historical Fiction", publicationDate: "2001-01-01", description: "A journalist investigates the story of a Falangist writer who was spared by an anonymous Republican soldier in the final days of the Spanish Civil War.", series: null, tier: "S", topRank: null },
  { title: "The Anatomy of a Moment", author: "Javier Cercas", pageCount: 432, genre: "Non-Fiction", publicationDate: "2009-01-01", description: "A minute-by-minute reconstruction of the 1981 attempted coup that nearly toppled Spanish democracy.", series: null, tier: "A", topRank: null },
  { title: "The Impostor", author: "Javier Cercas", pageCount: 416, genre: "Non-Fiction", publicationDate: "2014-01-01", description: "Cercas investigates the most famous liar in modern Spain — a man who falsely claimed to be a Nazi concentration camp survivor.", series: null, tier: "A", topRank: null },

  { title: "Sepharad", author: "Antonio Muñoz Molina", pageCount: 400, genre: "Fiction", publicationDate: "2001-01-01", description: "Seventeen interwoven stories of exile across twentieth-century Europe, from Sephardic Jews to Soviet dissidents.", series: null, tier: "S", topRank: null },
  { title: "A Manuscript of Ashes", author: "Antonio Muñoz Molina", pageCount: 320, genre: "Fiction", publicationDate: "1986-01-01", description: "A young student in late-Franco Spain stumbles into the unsolved story of a doomed poet and the woman who loved him.", series: null, tier: "A", topRank: null },
  { title: "In Her Absence", author: "Antonio Muñoz Molina", pageCount: 128, genre: "Fiction", publicationDate: "2001-01-01", description: "A provincial bureaucrat realizes that the beautiful woman he married has vanished — though she is still sitting across the table.", series: null, tier: "A", topRank: null },

  { title: "School of the Sun", author: "Ana María Matute", pageCount: 256, genre: "Fiction", publicationDate: "1959-01-01", description: "A city girl is sent to live with her wealthy grandmother on Mallorca as the Spanish Civil War explodes on the mainland.", series: null, tier: "A", topRank: null },

  { title: "The Time of the Doves", author: "Mercè Rodoreda", pageCount: 224, genre: "Fiction", publicationDate: "1962-01-01", description: "A Barcelona woman's quiet marriage is consumed by the Spanish Civil War in one of the great twentieth-century novels.", series: null, tier: "S", topRank: null },
  { title: "Camellia Street", author: "Mercè Rodoreda", pageCount: 192, genre: "Fiction", publicationDate: "1966-01-01", description: "A foundling girl in Barcelona moves from one man's care to the next across the postwar decades.", series: null, tier: "A", topRank: null },
  { title: "Death in Spring", author: "Mercè Rodoreda", pageCount: 176, genre: "Fiction", publicationDate: "1986-01-01", description: "In a nameless Catalan village where horses are suffocated in the river and men are buried in trees, a boy grows to manhood.", series: null, tier: "S", topRank: null },

  { title: "On the Edge", author: "Rafael Chirbes", pageCount: 464, genre: "Fiction", publicationDate: "2013-01-01", description: "An unemployed seventy-year-old carpenter finds a body in a Valencian marshland and revisits the rotted-out promises of the Spanish property boom.", series: null, tier: "S", topRank: null },

  { title: "The Frozen Heart", author: "Almudena Grandes", pageCount: 928, genre: "Historical Fiction", publicationDate: "2007-01-01", description: "A Madrid architect at his father's funeral meets a stranger who claims to have been wronged by the family during the civil war.", series: null, tier: "A", topRank: null },
  { title: "The Ages of Lulu", author: "Almudena Grandes", pageCount: 240, genre: "Fiction", publicationDate: "1989-01-01", description: "A woman's sexual awakening and descent through the bohemian demimonde of late-Franco and transition Madrid.", series: null, tier: "A", topRank: null },

  { title: "The Carpenter's Pencil", author: "Manuel Rivas", pageCount: 160, genre: "Historical Fiction", publicationDate: "1998-01-01", description: "A Republican prisoner and a Falangist doctor in civil-war Galicia share the memory of a woman and a pencil.", series: null, tier: "S", topRank: null },
  { title: "Books Burn Badly", author: "Manuel Rivas", pageCount: 592, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "A sprawling chronicle of A Coruña from the Franco book-burnings through the twentieth century.", series: null, tier: "A", topRank: null },

  // Portuguese
  { title: "The Maias", author: "Eça de Queirós", pageCount: 640, genre: "Fiction", publicationDate: "1888-01-01", description: "The great nineteenth-century Portuguese novel: three generations of the Maia family collapse into an aristocratic Lisbon tragedy.", series: null, tier: "S", topRank: null },
  { title: "Cousin Bazilio", author: "Eça de Queirós", pageCount: 480, genre: "Fiction", publicationDate: "1878-01-01", description: "A bourgeois Lisbon wife slides into an affair with her worldly cousin while her blackmailing maid watches.", series: null, tier: "A", topRank: null },
  { title: "The Relic", author: "Eça de Queirós", pageCount: 288, genre: "Fiction", publicationDate: "1887-01-01", description: "A hypocritical young Portuguese nephew journeys to the Holy Land to secure a relic — and his inheritance.", series: null, tier: "A", topRank: null },

  { title: "Jerusalem", author: "Gonçalo M. Tavares", pageCount: 224, genre: "Fiction", publicationDate: "2005-01-01", description: "Five people converge on a Lisbon street one sleepless night in a small, chilly masterpiece.", series: { name: "The Kingdom", order: 3, total: 4 }, tier: "S", topRank: null },
  { title: "Learning to Pray in the Age of Technique", author: "Gonçalo M. Tavares", pageCount: 320, genre: "Fiction", publicationDate: "2007-01-01", description: "A famous surgeon's inability to feel anything except control becomes the novel's slow moral architecture.", series: { name: "The Kingdom", order: 4, total: 4 }, tier: "A", topRank: null },
  { title: "Joseph Walser's Machine", author: "Gonçalo M. Tavares", pageCount: 176, genre: "Fiction", publicationDate: "2004-01-01", description: "An ordinary factory worker maintains his collection of precise metal parts as an unnamed war moves into the city.", series: { name: "The Kingdom", order: 2, total: 4 }, tier: "A", topRank: null },

  { title: "The Book of Chameleons", author: "José Eduardo Agualusa", pageCount: 192, genre: "Fiction", publicationDate: "2004-01-01", description: "A Luanda man who sells invented pasts to his clients is observed by a gecko who was once a human philosopher.", series: null, tier: "S", topRank: null },
  { title: "A General Theory of Oblivion", author: "José Eduardo Agualusa", pageCount: 256, genre: "Fiction", publicationDate: "2012-01-01", description: "A terrified Portuguese woman bricks herself into her Luanda apartment on the eve of Angolan independence and waits twenty-eight years.", series: null, tier: "S", topRank: null },
  { title: "Creole", author: "José Eduardo Agualusa", pageCount: 208, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "A nineteenth-century Portuguese journalist in Angola chases a trader across three continents and writes him letters.", series: null, tier: "A", topRank: null },

  // Korean literary
  { title: "Nowhere to Be Found", author: "Bae Suah", pageCount: 112, genre: "Fiction", publicationDate: "1998-01-01", description: "A young South Korean woman drifts through dead-end work and men as she searches for nothing in particular.", series: null, tier: "A", topRank: null },
  { title: "Untold Night and Day", author: "Bae Suah", pageCount: 160, genre: "Fiction", publicationDate: "2013-01-01", description: "A Seoul audio-theater assistant wanders the summer city in a dreamlike loop where time and identity come loose.", series: null, tier: "A", topRank: null },
  { title: "A Greater Music", author: "Bae Suah", pageCount: 128, genre: "Fiction", publicationDate: "2003-01-01", description: "A Korean woman in Berlin reflects on her relationship with a music teacher who has left her.", series: null, tier: "A", topRank: null },

  { title: "One Hundred Shadows", author: "Hwang Jung-eun", pageCount: 144, genre: "Fiction", publicationDate: "2010-01-01", description: "Two workers in a crumbling Seoul electronics market fall in love as their shadows begin to rise up around them.", series: null, tier: "S", topRank: null },
  { title: "I'll Go On", author: "Hwang Jung-eun", pageCount: 240, genre: "Fiction", publicationDate: "2014-01-01", description: "Two sisters and a lifelong friend share their fractured histories in alternating first-person voices.", series: null, tier: "A", topRank: null },

  { title: "Pavane for a Dead Princess", author: "Park Min-gyu", pageCount: 432, genre: "Fiction", publicationDate: "2009-01-01", description: "A young Korean man in the 1980s falls in love with a department store colleague whose face the world finds hard to look at.", series: null, tier: "A", topRank: null },
  { title: "Castella", author: "Park Min-gyu", pageCount: 320, genre: "Fiction", publicationDate: "2005-01-01", description: "Ten darkly comic stories of Seoul precarity, genre parody, and bureaucratic absurdity.", series: null, tier: "A", topRank: null },

  { title: "The Poet", author: "Yi Mun-yol", pageCount: 224, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A fictionalized life of Kim Sakkat, the nineteenth-century Korean poet who wandered his country under a bamboo hat.", series: null, tier: "A", topRank: null },
  { title: "Our Twisted Hero", author: "Yi Mun-yol", pageCount: 128, genre: "Fiction", publicationDate: "1987-01-01", description: "A fifth-grade class in 1960s Korea is dominated by a monitor whose rule is a parable for authoritarian power.", series: null, tier: "A", topRank: null },

  // Caribbean
  { title: "The Wine of Astonishment", author: "Earl Lovelace", pageCount: 192, genre: "Fiction", publicationDate: "1982-01-01", description: "A Trinidadian Spiritual Baptist congregation fights a colonial law that has outlawed their church.", series: null, tier: "S", topRank: null },
  { title: "Salt", author: "Earl Lovelace", pageCount: 288, genre: "Fiction", publicationDate: "1996-01-01", description: "Trinidadian village life from slavery through independence, told through the griot-like voice of a schoolteacher. Commonwealth Writers' Prize winner.", series: null, tier: "S", topRank: null },
  { title: "The Dragon Can't Dance", author: "Earl Lovelace", pageCount: 224, genre: "Fiction", publicationDate: "1979-01-01", description: "Carnival, poverty, and the last gasp of a hillside Port of Spain neighborhood as a steel band prepares for J'ouvert morning.", series: null, tier: "S", topRank: null },

  { title: "Segu", author: "Maryse Condé", pageCount: 496, genre: "Historical Fiction", publicationDate: "1984-01-01", description: "The 1797 collapse of a West African Bambara kingdom and the scattering of a noble family across three continents.", series: null, tier: "S", topRank: null },
  { title: "I, Tituba, Black Witch of Salem", author: "Maryse Condé", pageCount: 224, genre: "Historical Fiction", publicationDate: "1986-01-01", description: "The enslaved woman whose testimony touched off the Salem witch trials tells her own story.", series: null, tier: "A", topRank: null },
  { title: "Crossing the Mangrove", author: "Maryse Condé", pageCount: 208, genre: "Fiction", publicationDate: "1989-01-01", description: "A wake for a mysterious drowned stranger in a Guadeloupean village, told in twenty voices.", series: null, tier: "A", topRank: null },

  { title: "Texaco", author: "Patrick Chamoiseau", pageCount: 432, genre: "Historical Fiction", publicationDate: "1992-01-01", description: "Three generations of Martinican history told from the squatter's shantytown of Texaco, as a city planner interviews its matriarch. Prix Goncourt winner.", series: null, tier: "S", topRank: null },
  { title: "Solibo Magnificent", author: "Patrick Chamoiseau", pageCount: 224, genre: "Fiction", publicationDate: "1988-01-01", description: "A famous Martinican storyteller drops dead mid-performance and the French police try to investigate it as a murder.", series: null, tier: "A", topRank: null },
  { title: "School Days", author: "Patrick Chamoiseau", pageCount: 192, genre: "Fiction", publicationDate: "1994-01-01", description: "A Creole boy's first encounter with the French colonial school system and its assault on his tongue.", series: null, tier: "A", topRank: null },

  // Jewish American
  { title: "The History of Love", author: "Nicole Krauss", pageCount: 272, genre: "Fiction", publicationDate: "2005-05-03", description: "An old Polish Jewish widower in Brooklyn and a lonely New York teenager are connected by a lost novel written decades ago.", series: null, tier: "S", topRank: null },
  { title: "Great House", author: "Nicole Krauss", pageCount: 304, genre: "Fiction", publicationDate: "2010-10-05", description: "Four lives revolve around a looming, many-drawered writing desk that once belonged to a vanished Chilean poet.", series: null, tier: "A", topRank: null },
  { title: "Forest Dark", author: "Nicole Krauss", pageCount: 304, genre: "Fiction", publicationDate: "2017-09-12", description: "A retired New York lawyer and a novelist with writer's block both disappear into the Tel Aviv desert for reasons they cannot explain.", series: null, tier: "A", topRank: null },

  { title: "The World to Come", author: "Dara Horn", pageCount: 336, genre: "Fiction", publicationDate: "2006-01-17", description: "A stolen Chagall painting links a present-day Jewish family to a Russian shtetl and the afterlife.", series: null, tier: "A", topRank: null },
  { title: "All Other Nights", author: "Dara Horn", pageCount: 384, genre: "Historical Fiction", publicationDate: "2009-04-20", description: "A young Jewish Union soldier is sent south to spy on his own Confederate relatives.", series: null, tier: "A", topRank: null },
  { title: "A Guide for the Perplexed", author: "Dara Horn", pageCount: 352, genre: "Fiction", publicationDate: "2013-09-09", description: "A software developer is kidnapped in Egypt and a Cairo-Geneva manuscript cache from centuries past bears on her fate.", series: null, tier: "A", topRank: null },
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

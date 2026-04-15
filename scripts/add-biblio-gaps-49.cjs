const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "Memoirs of Hadrian", author: "Marguerite Yourcenar", pageCount: 384, genre: "Historical Fiction", publicationDate: "1951-01-01", description: "The aging Roman emperor Hadrian writes a letter to his successor Marcus Aurelius reflecting on his life — Yourcenar's canonical masterpiece.", series: null, tier: "S", topRank: null },
  { title: "The Abyss", author: "Marguerite Yourcenar", pageCount: 384, genre: "Historical Fiction", publicationDate: "1968-01-01", description: "A sixteenth-century Flemish alchemist-physician-philosopher lives through Europe's religious upheavals — Prix Femina winner.", series: null, tier: "S", topRank: null },
  { title: "Coup de Grâce", author: "Marguerite Yourcenar", pageCount: 160, genre: "Historical Fiction", publicationDate: "1939-01-01", description: "A Prussian officer in the 1919 Baltic war recalls the woman who loved him and whose love he returned with a bullet.", series: null, tier: "A", topRank: null },
  { title: "A Coin in Nine Hands", author: "Marguerite Yourcenar", pageCount: 192, genre: "Historical Fiction", publicationDate: "1934-01-01", description: "A single coin circulates among nine lives in fascist Rome during one day in 1933.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Canadian Francophone
  { title: "The Tin Flute", author: "Gabrielle Roy", pageCount: 416, genre: "Fiction", publicationDate: "1945-01-01", description: "A poor working-class family in wartime Saint-Henri, Montreal — the canonical novel of Quebec realism.", series: null, tier: "S", topRank: null },
  { title: "Street of Riches", author: "Gabrielle Roy", pageCount: 176, genre: "Fiction", publicationDate: "1955-01-01", description: "Linked stories of a Franco-Manitoban girl's childhood on a Winnipeg street.", series: null, tier: "A", topRank: null },

  { title: "Kamouraska", author: "Anne Hébert", pageCount: 256, genre: "Historical Fiction", publicationDate: "1970-01-01", description: "A nineteenth-century Quebec woman on her husband's deathbed remembers a prior marriage, a lover, and a murder.", series: null, tier: "S", topRank: null },
  { title: "Children of the Black Sabbath", author: "Anne Hébert", pageCount: 192, genre: "Fiction", publicationDate: "1975-01-01", description: "A young Quebec nun is visited by visions of her witch mother and flees the convent.", series: null, tier: "A", topRank: null },

  { title: "Mad Shadows", author: "Marie-Claire Blais", pageCount: 128, genre: "Fiction", publicationDate: "1959-01-01", description: "A beautiful Quebec boy is destroyed by his mother's obsession with him — Blais's explosive debut.", series: null, tier: "S", topRank: null },
  { title: "A Season in the Life of Emmanuel", author: "Marie-Claire Blais", pageCount: 176, genre: "Fiction", publicationDate: "1965-01-01", description: "A sixteenth child is born into a brutalized Quebec rural Catholic family — Prix Médicis winner.", series: null, tier: "S", topRank: null },

  { title: "The Fat Woman Next Door Is Pregnant", author: "Michel Tremblay", pageCount: 352, genre: "Fiction", publicationDate: "1978-01-01", description: "A single day in 1942 Montreal's Plateau Mont-Royal through the eyes of the neighborhood's women.", series: null, tier: "A", topRank: null },
  { title: "Crossing the Continent", author: "Michel Tremblay", pageCount: 208, genre: "Fiction", publicationDate: "2007-01-01", description: "A young woman from Saskatchewan travels across Canada to join her aunt in Montreal — the opening of Tremblay's autobiographical prequel sequence.", series: null, tier: "A", topRank: null },

  { title: "I Am a Japanese Writer", author: "Dany Laferrière", pageCount: 184, genre: "Fiction", publicationDate: "2008-01-01", description: "A Haitian-Canadian writer accepts an advance on a book titled 'I Am a Japanese Writer' and never writes it.", series: null, tier: "A", topRank: null },
  { title: "The Return", author: "Dany Laferrière", pageCount: 240, genre: "Fiction", publicationDate: "2009-01-01", description: "After his father's death in New York, a Haitian-Canadian writer travels home to Port-au-Prince — Prix Médicis winner.", series: null, tier: "A", topRank: null },

  { title: "Ru", author: "Kim Thúy", pageCount: 160, genre: "Fiction", publicationDate: "2009-01-01", description: "A Vietnamese boat-girl grows up in a Quebec refugee camp and becomes a writer in Laferrière-adjacent prose poems.", series: null, tier: "S", topRank: null },

  { title: "Nikolski", author: "Nicolas Dickner", pageCount: 304, genre: "Fiction", publicationDate: "2005-01-01", description: "Three Montrealers whose lives intersect without meeting — a Quebec cult novel of hidden Caribbean piracy.", series: null, tier: "A", topRank: null },

  // Belgian / Swiss French
  { title: "The Notebook", author: "Agota Kristof", pageCount: 192, genre: "Fiction", publicationDate: "1986-01-01", description: "Twin boys are sent to their grandmother in a wartime border town and begin teaching themselves to survive — the first of the trilogy.", series: { name: "The Notebook Trilogy", order: 1, total: 3 }, tier: "S", topRank: null },
  { title: "The Proof", author: "Agota Kristof", pageCount: 192, genre: "Fiction", publicationDate: "1988-01-01", description: "One twin is left alone in the border town after his brother escapes, and his story fractures from the Notebook's account.", series: { name: "The Notebook Trilogy", order: 2, total: 3 }, tier: "S", topRank: null },
  { title: "The Third Lie", author: "Agota Kristof", pageCount: 160, genre: "Fiction", publicationDate: "1991-01-01", description: "The Notebook Trilogy's final volume unravels everything the earlier books claimed to have settled.", series: { name: "The Notebook Trilogy", order: 3, total: 3 }, tier: "S", topRank: null },

  { title: "Hygiene and the Assassin", author: "Amélie Nothomb", pageCount: 176, genre: "Fiction", publicationDate: "1992-01-01", description: "A Nobel-laureate novelist is interviewed by a series of journalists who each find out something terrible about him — Nothomb's debut.", series: null, tier: "A", topRank: null },
  { title: "Fear and Trembling", author: "Amélie Nothomb", pageCount: 144, genre: "Fiction", publicationDate: "1999-01-01", description: "A young Belgian woman returns to Japan to work in a Tokyo company and is slowly destroyed by its hierarchy. Grand Prix du roman de l'Académie française.", series: null, tier: "S", topRank: null },
  { title: "The Character of Rain", author: "Amélie Nothomb", pageCount: 144, genre: "Fiction", publicationDate: "2000-01-01", description: "Nothomb's memoir-novel of her earliest childhood as a Belgian diplomat's daughter in Japan.", series: null, tier: "A", topRank: null },

  { title: "The Bathroom", author: "Jean-Philippe Toussaint", pageCount: 128, genre: "Fiction", publicationDate: "1985-01-01", description: "A young Parisian man retires to his bathroom and refuses to leave — Toussaint's minimalist debut.", series: null, tier: "A", topRank: null },
  { title: "Television", author: "Jean-Philippe Toussaint", pageCount: 224, genre: "Fiction", publicationDate: "1997-01-01", description: "A Parisian academic working on a biography of Titian in Berlin decides to stop watching television — and cannot.", series: null, tier: "A", topRank: null },
  { title: "Running Away", author: "Jean-Philippe Toussaint", pageCount: 128, genre: "Fiction", publicationDate: "2005-01-01", description: "A Frenchman on a Chinese trip flees a phone call from his lover and the novel follows him through a surreal Shanghai-to-Elba escape.", series: null, tier: "A", topRank: null },

  { title: "What If the Sun", author: "Charles Ferdinand Ramuz", pageCount: 160, genre: "Fiction", publicationDate: "1937-01-01", description: "A Swiss Alpine village wakes to find the sun going dark earlier each day — Ramuz's apocalyptic pastoral.", series: null, tier: "A", topRank: null },
  { title: "Beauty on Earth", author: "Charles Ferdinand Ramuz", pageCount: 192, genre: "Fiction", publicationDate: "1927-01-01", description: "A young Cuban woman is sent to live with her uncle in a Swiss Alpine village, and her beauty slowly tears the village apart.", series: null, tier: "A", topRank: null },

  // Philippine literature
  { title: "Dusk", author: "F. Sionil José", pageCount: 320, genre: "Historical Fiction", publicationDate: "1984-01-01", description: "A Filipino peasant family flees the Spanish colonial regime — the first of the Rosales Saga.", series: { name: "Rosales Saga", order: 1, total: 5 }, tier: "S", topRank: null },
  { title: "My Brother, My Executioner", author: "F. Sionil José", pageCount: 240, genre: "Historical Fiction", publicationDate: "1973-01-01", description: "Two Filipino half-brothers end up on opposite sides of a communist insurgency — the middle of the Rosales Saga.", series: { name: "Rosales Saga", order: 3, total: 5 }, tier: "A", topRank: null },
  { title: "The Pretenders", author: "F. Sionil José", pageCount: 208, genre: "Fiction", publicationDate: "1962-01-01", description: "A young Filipino intellectual marries into a wealthy Manila family and is slowly crushed by the old elite.", series: { name: "Rosales Saga", order: 4, total: 5 }, tier: "A", topRank: null },

  { title: "The Woman Who Had Two Navels", author: "Nick Joaquín", pageCount: 176, genre: "Fiction", publicationDate: "1961-01-01", description: "A Filipino woman exiled in Hong Kong visits a doctor to claim she has two navels — Joaquín's canonical Philippine novel.", series: null, tier: "S", topRank: null },
  { title: "Tropical Gothic", author: "Nick Joaquín", pageCount: 336, genre: "Fiction", publicationDate: "1972-01-01", description: "Joaquín's collected short fiction — mournful Filipino tales at the edge of history.", series: null, tier: "A", topRank: null },

  { title: "Dogeaters", author: "Jessica Hagedorn", pageCount: 272, genre: "Fiction", publicationDate: "1990-01-01", description: "A polyphonic novel of Marcos-era Manila — beauty queens, gangsters, and the movies that made the city in its own image.", series: null, tier: "S", topRank: null },
  { title: "Dream Jungle", author: "Jessica Hagedorn", pageCount: 336, genre: "Fiction", publicationDate: "2003-01-01", description: "A fabricated 'stone-age tribe' discovery in the 1970s Philippines and the Apocalypse Now film shoot haunt this follow-up novel.", series: null, tier: "A", topRank: null },

  { title: "Insurrecto", author: "Gina Apostol", pageCount: 336, genre: "Historical Fiction", publicationDate: "2018-01-01", description: "A Filipina translator and an American filmmaker travel to Samar to make a film about the 1901 Balangiga massacre, and the novel splits and reforms.", series: null, tier: "S", topRank: null },
  { title: "Gun Dealers' Daughter", author: "Gina Apostol", pageCount: 304, genre: "Fiction", publicationDate: "2010-01-01", description: "A young Filipina from a Marcos-regime arms-dealing family is radicalized as a student and the novel reconstructs why.", series: null, tier: "A", topRank: null },

  // Chinese literary
  { title: "Tales of Hulan River", author: "Xiao Hong", pageCount: 288, genre: "Fiction", publicationDate: "1942-01-01", description: "A 1920s Manchurian village remembered in loose, lyrical sketches — the masterwork of modern Chinese women's literature.", series: null, tier: "S", topRank: null },

  { title: "The Flowers of War", author: "Yan Geling", pageCount: 256, genre: "Historical Fiction", publicationDate: "2011-01-01", description: "During the 1937 Nanking Massacre, a group of Chinese prostitutes and convent schoolgirls take shelter together in a Catholic compound.", series: null, tier: "A", topRank: null },
  { title: "The Banquet Bug", author: "Yan Geling", pageCount: 288, genre: "Fiction", publicationDate: "2006-01-01", description: "An unemployed Beijing man stumbles into a lucrative freelance career crashing corporate banquets with a fake press pass.", series: null, tier: "A", topRank: null },

  { title: "Beijing Coma", author: "Ma Jian", pageCount: 592, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "A Tiananmen Square protester in a ten-year coma relives his student past while his government rewrites it.", series: null, tier: "S", topRank: null },
  { title: "Red Dust", author: "Ma Jian", pageCount: 336, genre: "Non-Fiction", publicationDate: "2001-01-01", description: "A three-year wandering through 1980s China on the run from the authorities — Ma Jian's classic travelogue-memoir.", series: null, tier: "A", topRank: null },

  { title: "Ruined City", author: "Jia Pingwa", pageCount: 528, genre: "Fiction", publicationDate: "1993-01-01", description: "A decadent middle-aged Chinese writer's self-destruction in post-Mao Xi'an — banned in China for years.", series: null, tier: "S", topRank: null },

  { title: "The Last Quarter of the Moon", author: "Chi Zijian", pageCount: 320, genre: "Historical Fiction", publicationDate: "2005-01-01", description: "The last chieftain's wife of the Evenki people narrates a century of her reindeer-herding clan's decline in the Greater Khingan Mountains.", series: null, tier: "A", topRank: null },

  // Jewish European classic
  { title: "Tevye the Dairyman", author: "Sholem Aleichem", pageCount: 352, genre: "Fiction", publicationDate: "1894-01-01", description: "A poor Jewish milkman in a Russian shtetl talks with God about his seven daughters — the basis of Fiddler on the Roof.", series: null, tier: "S", topRank: null },
  { title: "The Railroad Stories", author: "Sholem Aleichem", pageCount: 288, genre: "Fiction", publicationDate: "1911-01-01", description: "Stories told by passengers on trains across the Pale of Settlement.", series: null, tier: "A", topRank: null },

  { title: "The I.L. Peretz Reader", author: "I.L. Peretz", pageCount: 416, genre: "Fiction", publicationDate: "1903-01-01", description: "A selection of the Yiddish modernist's canonical short fiction — Peretz's Hasidic tales and modern stories.", series: null, tier: "A", topRank: null },

  { title: "The Nazarene", author: "Sholem Asch", pageCount: 704, genre: "Historical Fiction", publicationDate: "1939-01-01", description: "A Polish Jewish novelist's retelling of the life of Jesus from a Jewish perspective.", series: null, tier: "A", topRank: null },
  { title: "Three Cities", author: "Sholem Asch", pageCount: 880, genre: "Historical Fiction", publicationDate: "1933-01-01", description: "Jewish life across St. Petersburg, Warsaw, and Moscow before and during the Russian Revolution.", series: null, tier: "A", topRank: null },

  { title: "My Mother's Sabbath Days", author: "Chaim Grade", pageCount: 416, genre: "Fiction", publicationDate: "1955-01-01", description: "Grade's autobiographical portrait of a Vilna Jewish childhood before the Holocaust.", series: null, tier: "S", topRank: null },
  { title: "The Yeshiva", author: "Chaim Grade", pageCount: 576, genre: "Fiction", publicationDate: "1967-01-01", description: "Grade's canonical novel of a Lithuanian Jewish religious academy and the young men who studied there.", series: null, tier: "S", topRank: null },

  { title: "Descent", author: "David Bergelson", pageCount: 256, genre: "Fiction", publicationDate: "1920-01-01", description: "A young Jewish merchant in a small Ukrainian town slowly unravels — a Yiddish modernist classic, NYRB Classics.", series: null, tier: "A", topRank: null },

  { title: "Dawn", author: "Elie Wiesel", pageCount: 112, genre: "Fiction", publicationDate: "1961-01-01", description: "A young Jewish freedom fighter in 1947 Palestine waits through the night before he must execute a British hostage.", series: null, tier: "A", topRank: null },
  { title: "The Accident", author: "Elie Wiesel", pageCount: 128, genre: "Fiction", publicationDate: "1962-01-01", description: "A Holocaust survivor hit by a taxi in New York slowly examines why his unconscious body did not try to save itself.", series: null, tier: "A", topRank: null },

  // Black American literary
  { title: "Elbow Room", author: "James Alan McPherson", pageCount: 288, genre: "Fiction", publicationDate: "1977-01-01", description: "McPherson's Pulitzer-winning short story collection — Black American lives across work, love, and class.", series: null, tier: "S", topRank: null },
  { title: "Hue and Cry", author: "James Alan McPherson", pageCount: 272, genre: "Fiction", publicationDate: "1969-01-01", description: "McPherson's debut collection — Black workers, porters, waiters, and lawyers.", series: null, tier: "A", topRank: null },

  { title: "A Different Drummer", author: "William Melvin Kelley", pageCount: 256, genre: "Fiction", publicationDate: "1962-01-01", description: "In a fictional Southern state, every Black resident gets up on the same morning and walks away — Kelley's prescient debut.", series: null, tier: "S", topRank: null },
  { title: "dem", author: "William Melvin Kelley", pageCount: 208, genre: "Fiction", publicationDate: "1967-01-01", description: "A white Madison Avenue executive's life is upended when his wife gives birth to fraternal twins of different races.", series: null, tier: "A", topRank: null },

  { title: "The Man Who Cried I Am", author: "John A. Williams", pageCount: 432, genre: "Fiction", publicationDate: "1967-01-01", description: "A dying Black American novelist in Amsterdam receives a document exposing the U.S. government's plan to eliminate Black citizens.", series: null, tier: "S", topRank: null },

  { title: "Divine Days", author: "Leon Forrest", pageCount: 1144, genre: "Fiction", publicationDate: "1992-01-01", description: "Seven days in the life of a Black Chicago playwright — Forrest's massive, polyphonic magnum opus.", series: null, tier: "A", topRank: null },

  { title: "The Living Is Easy", author: "Dorothy West", pageCount: 352, genre: "Fiction", publicationDate: "1948-01-01", description: "A ruthless Black Boston matriarch rules over her family in the 1910s — a Harlem Renaissance late masterpiece.", series: null, tier: "S", topRank: null },
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

const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [];

const REC_LIBRARY_ADDITIONS = [
  // Black American early-to-mid 20th century
  { title: "The Autobiography of an Ex-Colored Man", author: "James Weldon Johnson", pageCount: 192, genre: "Fiction", publicationDate: "1912-01-01", description: "A light-skinned Black man in turn-of-the-century America chooses to pass for white and narrates his conflicted life.", series: null, tier: "S", topRank: null },

  { title: "The Street", author: "Ann Petry", pageCount: 448, genre: "Fiction", publicationDate: "1946-01-01", description: "A young Black single mother in 1940s Harlem struggles to make a decent life for her son on 116th Street.", series: null, tier: "S", topRank: null },
  { title: "The Narrows", author: "Ann Petry", pageCount: 416, genre: "Fiction", publicationDate: "1953-01-01", description: "A Black Dartmouth graduate in a small Connecticut town falls into a doomed affair with a wealthy white woman.", series: null, tier: "A", topRank: null },

  { title: "Jubilee", author: "Margaret Walker", pageCount: 416, genre: "Historical Fiction", publicationDate: "1966-01-01", description: "A novel following the life of a mixed-race woman born into slavery on a Georgia plantation through Reconstruction.", series: null, tier: "A", topRank: null },

  { title: "Passing", author: "Nella Larsen", pageCount: 128, genre: "Fiction", publicationDate: "1929-01-01", description: "Two light-skinned Black women in 1920s Harlem meet again after years apart — one has been passing for white in her marriage.", series: null, tier: "S", topRank: null },

  { title: "Brown Girl, Brownstones", author: "Paule Marshall", pageCount: 336, genre: "Fiction", publicationDate: "1959-01-01", description: "A Barbadian immigrant family in Brooklyn during the Depression — the canonical Caribbean-American coming-of-age novel.", series: null, tier: "S", topRank: null },
  { title: "Praisesong for the Widow", author: "Paule Marshall", pageCount: 256, genre: "Fiction", publicationDate: "1983-01-01", description: "A middle-aged Black American widow on a Caribbean cruise abruptly leaves the ship and reclaims her Afro-Caribbean heritage.", series: null, tier: "A", topRank: null },

  // Ukrainian literary
  { title: "Voroshilovgrad", author: "Serhiy Zhadan", pageCount: 464, genre: "Fiction", publicationDate: "2010-01-01", description: "A young Kharkiv PR worker returns to his deindustrialized hometown in eastern Ukraine to run his missing brother's gas station.", series: null, tier: "S", topRank: null },
  { title: "The Orphanage", author: "Serhiy Zhadan", pageCount: 336, genre: "Fiction", publicationDate: "2017-01-01", description: "A Ukrainian schoolteacher crosses a contested war zone in the Donbas to retrieve his nephew from a boarding school.", series: null, tier: "S", topRank: null },

  { title: "Fieldwork in Ukrainian Sex", author: "Oksana Zabuzhko", pageCount: 176, genre: "Fiction", publicationDate: "1996-01-01", description: "A Ukrainian poet in America confronts her country's history and a destructive love affair in a feminist monologue-novel.", series: null, tier: "S", topRank: null },
  { title: "The Museum of Abandoned Secrets", author: "Oksana Zabuzhko", pageCount: 720, genre: "Historical Fiction", publicationDate: "2009-01-01", description: "A Kyiv journalist investigates a wartime photograph and unravels a multi-generation Ukrainian family story of resistance.", series: null, tier: "A", topRank: null },

  { title: "Perverzion", author: "Yuri Andrukhovych", pageCount: 320, genre: "Fiction", publicationDate: "1996-01-01", description: "A Ukrainian poet vanishes from a Venice conference and leaves behind a trail of documents that may or may not explain him.", series: null, tier: "A", topRank: null },
  { title: "Twelve Circles", author: "Yuri Andrukhovych", pageCount: 320, genre: "Fiction", publicationDate: "2003-01-01", description: "An Austrian photographer travels to Lviv to shoot Ukrainian landmarks and is drawn into the lives of local artists.", series: null, tier: "A", topRank: null },

  { title: "Sweet Darusya", author: "Maria Matios", pageCount: 192, genre: "Historical Fiction", publicationDate: "2003-01-01", description: "A mute Ukrainian village woman's life across the twentieth century in the Carpathian mountains.", series: null, tier: "A", topRank: null },

  // Contemporary African new wave
  { title: "Ghana Must Go", author: "Taiye Selasi", pageCount: 336, genre: "Fiction", publicationDate: "2013-03-05", description: "A Ghanaian family scattered across three continents reconvenes when the patriarch dies alone in Accra.", series: null, tier: "A", topRank: null },

  { title: "Under the Udala Trees", author: "Chinelo Okparanta", pageCount: 336, genre: "Historical Fiction", publicationDate: "2015-09-22", description: "Two Nigerian girls fall in love during the Biafran war, and the novel follows them through decades of trying to hide.", series: null, tier: "A", topRank: null },
  { title: "Happiness, Like Water", author: "Chinelo Okparanta", pageCount: 208, genre: "Fiction", publicationDate: "2013-08-13", description: "Ten linked short stories of Nigerian women at home and in America — Okparanta's debut collection.", series: null, tier: "A", topRank: null },

  { title: "What It Means When a Man Falls from the Sky", author: "Lesley Nneka Arimah", pageCount: 256, genre: "Fiction", publicationDate: "2017-04-04", description: "Twelve stories of Nigerian women across a mix of realist and speculative modes.", series: null, tier: "A", topRank: null },

  { title: "Freshwater", author: "Akwaeke Emezi", pageCount: 240, genre: "Fiction", publicationDate: "2018-02-13", description: "A Nigerian girl is born with multiple Igbo spirits inhabiting her body — the novel follows each of them in turn.", series: null, tier: "S", topRank: null },
  { title: "The Death of Vivek Oji", author: "Akwaeke Emezi", pageCount: 256, genre: "Fiction", publicationDate: "2020-08-04", description: "A Nigerian family finds their only child dead on their doorstep and slowly reconstructs the life they never understood.", series: null, tier: "S", topRank: null },

  { title: "Dust", author: "Yvonne Adhiambo Owuor", pageCount: 384, genre: "Fiction", publicationDate: "2013-12-24", description: "A Kenyan family is broken by the election violence of 2007 and by the crimes a generation earlier that they refused to name.", series: null, tier: "S", topRank: null },
  { title: "The Dragonfly Sea", author: "Yvonne Adhiambo Owuor", pageCount: 512, genre: "Fiction", publicationDate: "2019-03-12", description: "A girl from the Kenyan island of Pate is discovered to be descended from Ming Chinese sailors — and sent to China to study.", series: null, tier: "A", topRank: null },

  { title: "Season of the Shadow", author: "Léonora Miano", pageCount: 224, genre: "Historical Fiction", publicationDate: "2013-01-01", description: "A Central African village in the seventeenth century awakens to find twelve young men have vanished — the slave trade has arrived.", series: null, tier: "S", topRank: null },
  { title: "Red in Blue Trilogy", author: "Léonora Miano", pageCount: 256, genre: "Fiction", publicationDate: "2015-01-01", description: "A triptych of plays and prose on race, exile, and the Afropean condition.", series: null, tier: "A", topRank: null },

  { title: "The Shadow King", author: "Maaza Mengiste", pageCount: 432, genre: "Historical Fiction", publicationDate: "2019-09-24", description: "Ethiopian women fight Mussolini's 1935 invasion as soldiers alongside their men, in Mengiste's National Book Award finalist.", series: null, tier: "S", topRank: null },
  { title: "Beneath the Lion's Gaze", author: "Maaza Mengiste", pageCount: 304, genre: "Historical Fiction", publicationDate: "2010-01-12", description: "An Addis Ababa family is pulled apart by the 1974 revolution and the subsequent Derg terror.", series: null, tier: "A", topRank: null },

  // Classic American women modernist
  { title: "The Mountain Lion", author: "Jean Stafford", pageCount: 240, genre: "Fiction", publicationDate: "1947-01-01", description: "A brother and sister spend summers on a Colorado ranch and grow apart in Stafford's taut coming-of-age classic.", series: null, tier: "S", topRank: null },
  { title: "Boston Adventure", author: "Jean Stafford", pageCount: 576, genre: "Fiction", publicationDate: "1944-01-01", description: "A poor girl from the Massachusetts coast is taken in as a companion by an elderly Beacon Hill spinster.", series: null, tier: "A", topRank: null },

  { title: "The Collected Stories of Hortense Calisher", author: "Hortense Calisher", pageCount: 544, genre: "Fiction", publicationDate: "1975-01-01", description: "The complete short fiction of one of the great American short story writers of the twentieth century.", series: null, tier: "A", topRank: null },

  { title: "The Wife of Martin Guerre", author: "Janet Lewis", pageCount: 128, genre: "Historical Fiction", publicationDate: "1941-01-01", description: "A sixteenth-century French peasant wife recognizes that the man who has come home after years at war is not her husband.", series: null, tier: "S", topRank: null },

  { title: "Lolly Willowes", author: "Sylvia Townsend Warner", pageCount: 224, genre: "Fantasy", publicationDate: "1926-01-01", description: "A middle-aged English spinster escapes her family and moves to a country village, where she becomes a witch.", series: null, tier: "S", topRank: null },
  { title: "Mr. Fortune's Maggot", author: "Sylvia Townsend Warner", pageCount: 192, genre: "Fiction", publicationDate: "1927-01-01", description: "An English missionary on a remote Pacific island manages to convert only a single boy, whom he slowly falls in love with.", series: null, tier: "A", topRank: null },
  { title: "Summer Will Show", author: "Sylvia Townsend Warner", pageCount: 416, genre: "Historical Fiction", publicationDate: "1936-01-01", description: "An Englishwoman travels to 1848 Paris to retrieve her husband's mistress and joins her instead as the revolution erupts.", series: null, tier: "A", topRank: null },

  { title: "The Light in the Piazza", author: "Elizabeth Spencer", pageCount: 128, genre: "Fiction", publicationDate: "1960-01-01", description: "An American mother touring Florence with her developmentally disabled daughter faces an impossible choice when an Italian man falls in love with her.", series: null, tier: "S", topRank: null },
  { title: "The Voice at the Back Door", author: "Elizabeth Spencer", pageCount: 320, genre: "Fiction", publicationDate: "1956-01-01", description: "A white sheriff in a small 1950s Mississippi town tries to protect a Black man accused of a crime.", series: null, tier: "A", topRank: null },

  { title: "Ship of Fools", author: "Katherine Anne Porter", pageCount: 512, genre: "Fiction", publicationDate: "1962-01-01", description: "A German ocean liner crossing from Veracruz to Bremerhaven in 1931 carries passengers representing every incipient European tension.", series: null, tier: "S", topRank: null },
  { title: "Pale Horse, Pale Rider", author: "Katherine Anne Porter", pageCount: 224, genre: "Fiction", publicationDate: "1939-01-01", description: "Three short novels by Porter, including the title novella set during the 1918 flu pandemic in Denver.", series: null, tier: "S", topRank: null },

  { title: "Sleepless Nights", author: "Elizabeth Hardwick", pageCount: 160, genre: "Fiction", publicationDate: "1979-01-01", description: "A novelistic memoir of Hardwick's intellectual life across Kentucky, New York, and Boston — NYRB Classics.", series: null, tier: "S", topRank: null },
  { title: "Seduction and Betrayal", author: "Elizabeth Hardwick", pageCount: 224, genre: "Non-Fiction", publicationDate: "1974-01-01", description: "Hardwick's essays on the women of nineteenth- and twentieth-century literature and the men who told their stories.", series: null, tier: "A", topRank: null },
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

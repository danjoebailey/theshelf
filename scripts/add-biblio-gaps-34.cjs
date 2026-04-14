const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

const PRIMARY_ADDITIONS = [
  { title: "The Immoralist", author: "André Gide", pageCount: 192, genre: "Fiction", publicationDate: "1902-01-01", description: "A young French scholar's awakening to sensual pleasure on a Tunisian honeymoon changes him beyond recognition.", series: null, tier: "S", topRank: null },
  { title: "Strait is the Gate", author: "André Gide", pageCount: 224, genre: "Fiction", publicationDate: "1909-01-01", description: "Two cousins' love is destroyed by the woman's religious obsession with renunciation.", series: null, tier: "A", topRank: null },
  { title: "The Counterfeiters", author: "André Gide", pageCount: 416, genre: "Fiction", publicationDate: "1925-01-01", description: "A novelist writes about a novelist writing a novel, in a self-reflexive study of Parisian literary life.", series: null, tier: "S", topRank: null },
  { title: "Lafcadio's Adventures", author: "André Gide", pageCount: 256, genre: "Fiction", publicationDate: "1914-01-01", description: "A beautiful illegitimate Romanian commits a motiveless murder on a train in Gide's satire on piety and crime.", series: null, tier: "A", topRank: null },

  { title: "Gigi", author: "Colette", pageCount: 96, genre: "Fiction", publicationDate: "1944-01-01", description: "A young Parisian girl is groomed by her family to become a great courtesan, but falls in love instead.", series: null, tier: "S", topRank: null },
  { title: "Chéri", author: "Colette", pageCount: 160, genre: "Fiction", publicationDate: "1920-01-01", description: "A young Parisian dandy is forced to break from his much older lover to marry a girl his own age.", series: null, tier: "S", topRank: null },
  { title: "The Last of Chéri", author: "Colette", pageCount: 144, genre: "Fiction", publicationDate: "1926-01-01", description: "Chéri returns from the Great War to find his former mistress transformed — and nothing will save him.", series: null, tier: "A", topRank: null },
  { title: "The Vagabond", author: "Colette", pageCount: 224, genre: "Fiction", publicationDate: "1910-01-01", description: "A music-hall performer navigates an unexpected courtship while clinging to her hard-won independence.", series: null, tier: "A", topRank: null },
  { title: "The Pure and the Impure", author: "Colette", pageCount: 176, genre: "Non-Fiction", publicationDate: "1932-01-01", description: "Colette's meditations on the varieties of love — sensual, cerebral, illicit, impossible.", series: null, tier: "A", topRank: null },

  { title: "Love in the Ruins", author: "Walker Percy", pageCount: 416, genre: "Fiction", publicationDate: "1971-01-01", description: "A bad Catholic psychiatrist invents a machine to measure the soul as the American south descends into apocalyptic collapse.", series: null, tier: "A", topRank: null },
  { title: "The Second Coming", author: "Walker Percy", pageCount: 368, genre: "Fiction", publicationDate: "1980-01-01", description: "A wealthy widower in North Carolina meets a young woman who has escaped from a mental hospital.", series: null, tier: "A", topRank: null },
  { title: "The Thanatos Syndrome", author: "Walker Percy", pageCount: 384, genre: "Fiction", publicationDate: "1987-01-01", description: "The sequel to Love in the Ruins: Dr. Tom More discovers heavy sodium being added to the water supply.", series: null, tier: "A", topRank: null },
];

const REC_LIBRARY_ADDITIONS = [
  // Southern Gothic / regional
  { title: "The Keepers of the House", author: "Shirley Ann Grau", pageCount: 320, genre: "Fiction", publicationDate: "1964-01-01", description: "A white Alabama matriarch defends her family's secret biracial inheritance from a hostile town.", series: null, tier: "A", topRank: null },
  { title: "The Black Prince and Other Stories", author: "Shirley Ann Grau", pageCount: 288, genre: "Fiction", publicationDate: "1955-01-01", description: "Nine stories of Louisiana life, lush with the colors and tensions of the coastal South.", series: null, tier: "A", topRank: null },
  { title: "The House on Coliseum Street", author: "Shirley Ann Grau", pageCount: 240, genre: "Fiction", publicationDate: "1961-01-01", description: "A young New Orleans woman's life unravels in the wake of an abortion her family insisted upon.", series: null, tier: "B", topRank: null },

  { title: "Dagon", author: "Fred Chappell", pageCount: 176, genre: "Horror", publicationDate: "1968-01-01", description: "A North Carolina minister inheriting his grandfather's farm is pulled into an ancient Appalachian evil.", series: null, tier: "A", topRank: null },
  { title: "I Am One of You Forever", author: "Fred Chappell", pageCount: 200, genre: "Fiction", publicationDate: "1985-01-01", description: "Linked tales of a boy growing up on a North Carolina farm, written in Chappell's lyrical country voice.", series: null, tier: "A", topRank: null },
  { title: "Look Back All the Green Valley", author: "Fred Chappell", pageCount: 272, genre: "Fiction", publicationDate: "1999-01-01", description: "The final Kirkman family novel, as the grown poet returns to settle his mother's affairs.", series: null, tier: "B", topRank: null },

  { title: "Wolf Whistle", author: "Lewis Nordan", pageCount: 290, genre: "Fiction", publicationDate: "1993-01-01", description: "A fictionalized account of the Emmett Till murder told through the eyes of the small Mississippi town that failed him.", series: null, tier: "S", topRank: null },
  { title: "Music of the Swamp", author: "Lewis Nordan", pageCount: 208, genre: "Fiction", publicationDate: "1991-01-01", description: "A boy grows up in the Mississippi Delta as his father slowly drinks himself to death.", series: null, tier: "A", topRank: null },
  { title: "Lightning Song", author: "Lewis Nordan", pageCount: 256, genre: "Fiction", publicationDate: "1997-01-01", description: "A Mississippi family raises llamas and a teenage boy discovers love when his aunt arrives.", series: null, tier: "A", topRank: null },

  // Contemporary American literary
  { title: "Stories in the Worst Way", author: "Gary Lutz", pageCount: 160, genre: "Fiction", publicationDate: "1996-01-01", description: "Sentence-level fiction from a writer who compresses entire failed lives into single paragraphs.", series: null, tier: "A", topRank: null },
  { title: "I Looked Alive", author: "Gary Lutz", pageCount: 176, genre: "Fiction", publicationDate: "2003-01-01", description: "More disquieting short fiction from Lutz's minor-key catalog of desolation.", series: null, tier: "A", topRank: null },

  { title: "Garden State", author: "Rick Moody", pageCount: 240, genre: "Fiction", publicationDate: "1992-01-01", description: "Suburban New Jersey twenty-somethings drift through the early 1990s in Moody's debut novel.", series: null, tier: "B", topRank: null },
  { title: "The Ice Storm", author: "Rick Moody", pageCount: 304, genre: "Fiction", publicationDate: "1994-01-01", description: "Two Connecticut families collide during Thanksgiving weekend 1973 amid key parties and teenage crisis.", series: null, tier: "S", topRank: null },
  { title: "Purple America", author: "Rick Moody", pageCount: 320, genre: "Fiction", publicationDate: "1997-01-01", description: "A prodigal son returns home to care for his paralyzed mother on the worst night of his life.", series: null, tier: "A", topRank: null },

  // French 20th century — Catholic novelists / pastoral
  { title: "Thérèse Desqueyroux", author: "François Mauriac", pageCount: 176, genre: "Fiction", publicationDate: "1927-01-01", description: "A provincial French woman is tried for attempting to poison her tedious husband.", series: null, tier: "S", topRank: null },
  { title: "Vipers' Tangle", author: "François Mauriac", pageCount: 224, genre: "Fiction", publicationDate: "1932-01-01", description: "A bitter old miser writes letters to the family he despises, and discovers grace almost in spite of himself.", series: null, tier: "S", topRank: null },
  { title: "The Desert of Love", author: "François Mauriac", pageCount: 192, genre: "Fiction", publicationDate: "1925-01-01", description: "A father and son pursue the same woman in a provincial French town, each hiding the pursuit from the other.", series: null, tier: "A", topRank: null },

  { title: "The Horseman on the Roof", author: "Jean Giono", pageCount: 480, genre: "Historical Fiction", publicationDate: "1951-01-01", description: "An exiled Italian colonel rides across cholera-stricken Provence, fugitive from the Austrian police.", series: null, tier: "S", topRank: null },
  { title: "The Man Who Planted Trees", author: "Jean Giono", pageCount: 64, genre: "Fiction", publicationDate: "1953-01-01", description: "A solitary shepherd plants one hundred thousand trees across a barren French valley and remakes the land.", series: null, tier: "S", topRank: null },
  { title: "Hill", author: "Jean Giono", pageCount: 160, genre: "Fiction", publicationDate: "1929-01-01", description: "A small Provençal village believes that old Janet's delirium is bringing down a supernatural plague.", series: null, tier: "A", topRank: null },

  // Modiano-adjacent contemporary French
  { title: "I'm Gone", author: "Jean Echenoz", pageCount: 192, genre: "Fiction", publicationDate: "1999-01-01", description: "A Parisian art dealer flees his life and heads for the Arctic after a heist gone wrong.", series: null, tier: "A", topRank: null },
  { title: "Ravel", author: "Jean Echenoz", pageCount: 128, genre: "Historical Fiction", publicationDate: "2006-01-01", description: "The final ten years of composer Maurice Ravel's life, rendered in Echenoz's spare, droll prose.", series: null, tier: "A", topRank: null },
  { title: "Piano", author: "Jean Echenoz", pageCount: 192, genre: "Fiction", publicationDate: "2003-01-01", description: "A Parisian pianist is murdered and arrives at a purgatory that looks a lot like a mid-range hotel.", series: null, tier: "B", topRank: null },

  { title: "Minor Angels", author: "Antoine Volodine", pageCount: 192, genre: "Fiction", publicationDate: "1999-01-01", description: "Forty-nine vignettes from a post-apocalyptic future told by voices half-real and half-legendary.", series: null, tier: "A", topRank: null },
  { title: "Writers", author: "Antoine Volodine", pageCount: 144, genre: "Fiction", publicationDate: "2010-01-01", description: "Seven portraits of failed writers in an imagined post-exotic canon, each one the last of their kind.", series: null, tier: "A", topRank: null },
  { title: "Radiant Terminus", author: "Antoine Volodine", pageCount: 496, genre: "Sci-Fi", publicationDate: "2014-01-01", description: "Survivors of a nuclear disaster take refuge in a Siberian kolkhoz ruled by an immortal shaman.", series: null, tier: "A", topRank: null },

  { title: "Small Lives", author: "Pierre Michon", pageCount: 240, genre: "Fiction", publicationDate: "1984-01-01", description: "Eight portraits of obscure rural French figures from the narrator's provincial childhood.", series: null, tier: "S", topRank: null },
  { title: "Rimbaud the Son", author: "Pierre Michon", pageCount: 96, genre: "Historical Fiction", publicationDate: "1991-01-01", description: "A lyrical meditation on the poet Rimbaud's conflicted relationship with his mother.", series: null, tier: "A", topRank: null },
  { title: "Winter Mythologies", author: "Pierre Michon", pageCount: 112, genre: "Historical Fiction", publicationDate: "1997-01-01", description: "Eleven legend-infused lives from Irish and French provincial history.", series: null, tier: "A", topRank: null },

  { title: "The Flanders Road", author: "Claude Simon", pageCount: 288, genre: "Fiction", publicationDate: "1960-01-01", description: "A French cavalry officer remembers the 1940 collapse from a POW camp in long looping sentences.", series: null, tier: "S", topRank: null },
  { title: "The Georgics", author: "Claude Simon", pageCount: 320, genre: "Fiction", publicationDate: "1981-01-01", description: "A Revolutionary-era general, a Spanish Civil War soldier, and a WWII cavalryman overlap across centuries.", series: null, tier: "A", topRank: null },
  { title: "Triptych", author: "Claude Simon", pageCount: 160, genre: "Fiction", publicationDate: "1973-01-01", description: "Three scenes — a village, a resort, and a city — interlock and refract into one another.", series: null, tier: "A", topRank: null },

  // Nouveau Roman
  { title: "Tropisms", author: "Nathalie Sarraute", pageCount: 128, genre: "Fiction", publicationDate: "1939-01-01", description: "Twenty-four short prose pieces mapping the micro-movements of human psychology.", series: null, tier: "A", topRank: null },
  { title: "The Planetarium", author: "Nathalie Sarraute", pageCount: 224, genre: "Fiction", publicationDate: "1959-01-01", description: "A young couple's obsession with redecorating their Parisian apartment exposes every social and family tension around them.", series: null, tier: "A", topRank: null },
  { title: "Portrait of a Man Unknown", author: "Nathalie Sarraute", pageCount: 224, genre: "Fiction", publicationDate: "1948-01-01", description: "A narrator's obsession with an unnamed father and daughter becomes a study of how we fabricate other people.", series: null, tier: "A", topRank: null },

  { title: "Jealousy", author: "Alain Robbe-Grillet", pageCount: 144, genre: "Fiction", publicationDate: "1957-01-01", description: "An unnamed narrator watches his wife and her possible lover in a colonial tropical house — obsessively, in loops.", series: null, tier: "S", topRank: null },
  { title: "The Voyeur", author: "Alain Robbe-Grillet", pageCount: 224, genre: "Fiction", publicationDate: "1955-01-01", description: "A traveling salesman returns to the island of his childhood; a girl is found dead at the cliffs.", series: null, tier: "A", topRank: null },
  { title: "In the Labyrinth", author: "Alain Robbe-Grillet", pageCount: 192, genre: "Fiction", publicationDate: "1959-01-01", description: "A lost soldier carries a package through a snowy, nameless city searching for someone he cannot remember.", series: null, tier: "A", topRank: null },

  { title: "Passing Time", author: "Michel Butor", pageCount: 304, genre: "Fiction", publicationDate: "1956-01-01", description: "A French visitor to a grim English industrial city keeps a journal that slowly loops back on itself.", series: null, tier: "A", topRank: null },
  { title: "A Change of Heart", author: "Michel Butor", pageCount: 288, genre: "Fiction", publicationDate: "1957-01-01", description: "A man on a train from Paris to Rome, written in the second person, discovers his own life as he rides toward a decision.", series: null, tier: "A", topRank: null },

  // OuLiPo / playful French
  { title: "Zazie in the Metro", author: "Raymond Queneau", pageCount: 192, genre: "Fiction", publicationDate: "1959-01-01", description: "A foul-mouthed country girl arrives in Paris and causes chaos in a carnivalesque romp.", series: null, tier: "S", topRank: null },
  { title: "Exercises in Style", author: "Raymond Queneau", pageCount: 208, genre: "Fiction", publicationDate: "1947-01-01", description: "The same banal incident retold ninety-nine times in ninety-nine radically different styles.", series: null, tier: "S", topRank: null },
  { title: "The Sunday of Life", author: "Raymond Queneau", pageCount: 192, genre: "Fiction", publicationDate: "1952-01-01", description: "A simple-minded French soldier marries a hard-nosed shopkeeper and slides through interwar France.", series: null, tier: "A", topRank: null },

  { title: "Froth on the Daydream", author: "Boris Vian", pageCount: 240, genre: "Fiction", publicationDate: "1947-01-01", description: "A young Parisian couple's life is invaded by a water lily growing in the wife's lung in Vian's surrealist romance.", series: null, tier: "S", topRank: null },
  { title: "Heartsnatcher", author: "Boris Vian", pageCount: 256, genre: "Fiction", publicationDate: "1953-01-01", description: "A village psychiatrist arrives in a town where the shame of the inhabitants is auctioned off daily.", series: null, tier: "A", topRank: null },
  { title: "The Red Grass", author: "Boris Vian", pageCount: 192, genre: "Fiction", publicationDate: "1950-01-01", description: "An engineer builds a machine to erase his own painful memories and step into them as a ghost.", series: null, tier: "A", topRank: null },

  // Italian 20th century
  { title: "The Day of the Owl", author: "Leonardo Sciascia", pageCount: 128, genre: "Mystery", publicationDate: "1961-01-01", description: "A Carabinieri captain investigates a Sicilian Mafia killing and runs into an impenetrable wall of silence.", series: null, tier: "S", topRank: null },
  { title: "To Each His Own", author: "Leonardo Sciascia", pageCount: 160, genre: "Mystery", publicationDate: "1966-01-01", description: "A Sicilian schoolteacher investigates a double murder and discovers how small-town conspiracies really work.", series: null, tier: "S", topRank: null },
  { title: "Equal Danger", author: "Leonardo Sciascia", pageCount: 144, genre: "Mystery", publicationDate: "1971-01-01", description: "Someone is killing prosecutors in an unnamed Mediterranean country, and an old-school detective chases the motive.", series: null, tier: "A", topRank: null },

  { title: "That Awful Mess on Via Merulana", author: "Carlo Emilio Gadda", pageCount: 400, genre: "Mystery", publicationDate: "1957-01-01", description: "A baroque detective novel about a double robbery-and-murder in fascist Rome, told in riotous mixed dialect.", series: null, tier: "S", topRank: null },
  { title: "Acquainted with Grief", author: "Carlo Emilio Gadda", pageCount: 240, genre: "Fiction", publicationDate: "1963-01-01", description: "An isolated South American estate seethes with familial grievance and linguistic invention.", series: null, tier: "A", topRank: null },

  { title: "Gogol's Wife and Other Stories", author: "Tommaso Landolfi", pageCount: 224, genre: "Fiction", publicationDate: "1963-01-01", description: "Surreal, unnerving tales from one of Italy's most inventive twentieth-century fabulists.", series: null, tier: "A", topRank: null },
  { title: "Cancerqueen", author: "Tommaso Landolfi", pageCount: 224, genre: "Fiction", publicationDate: "1971-01-01", description: "Further fantastic fictions from Landolfi: chess-playing apes, sentient moons, and vanishing lovers.", series: null, tier: "B", topRank: null },

  { title: "The Silent Duchess", author: "Dacia Maraini", pageCount: 272, genre: "Historical Fiction", publicationDate: "1990-01-01", description: "A deaf-mute eighteenth-century Sicilian noblewoman tells her own story against a society that refused to hear her.", series: null, tier: "A", topRank: null },
  { title: "Voices", author: "Dacia Maraini", pageCount: 288, genre: "Mystery", publicationDate: "1994-01-01", description: "A Roman radio journalist investigates the murder of her neighbor — and uncovers a pattern of unsolved women.", series: null, tier: "A", topRank: null },
  { title: "Train to Budapest", author: "Dacia Maraini", pageCount: 368, genre: "Historical Fiction", publicationDate: "2008-01-01", description: "A Florentine journalist travels through Cold War Eastern Europe searching for the fate of a Jewish childhood friend.", series: null, tier: "A", topRank: null },

  { title: "God's Mountain", author: "Erri De Luca", pageCount: 160, genre: "Fiction", publicationDate: "1999-01-01", description: "A Naples boy's diary records his first loves, his father's violence, and the rooftops of his working-class city.", series: null, tier: "A", topRank: null },
  { title: "Three Horses", author: "Erri De Luca", pageCount: 144, genre: "Fiction", publicationDate: "1999-01-01", description: "A gardener in the Italian countryside slowly reveals a past in Argentina's Dirty War.", series: null, tier: "A", topRank: null },
  { title: "The Day Before Happiness", author: "Erri De Luca", pageCount: 144, genre: "Fiction", publicationDate: "2009-01-01", description: "A Naples orphan grows up under the protection of his building's concierge and awaits a girl he has loved since childhood.", series: null, tier: "A", topRank: null },

  // German post-war
  { title: "Pigeons on the Grass", author: "Wolfgang Koeppen", pageCount: 272, genre: "Fiction", publicationDate: "1951-01-01", description: "A single day in 1951 Munich follows dozens of characters through the moral rubble of the postwar city.", series: null, tier: "S", topRank: null },
  { title: "The Hothouse", author: "Wolfgang Koeppen", pageCount: 240, genre: "Fiction", publicationDate: "1953-01-01", description: "A conscience-stricken Bundestag deputy endures two days of parliamentary business in Koeppen's acid portrait of the Adenauer era.", series: null, tier: "A", topRank: null },
  { title: "Death in Rome", author: "Wolfgang Koeppen", pageCount: 208, genre: "Fiction", publicationDate: "1954-01-01", description: "Two generations of one German family meet in postwar Rome — the ex-Nazi, his priest son, and the collaborators who got away.", series: null, tier: "A", topRank: null },

  { title: "Anniversaries", author: "Uwe Johnson", pageCount: 1720, genre: "Fiction", publicationDate: "1970-01-01", description: "Gesine Cresspahl, a German émigré in 1967 New York, recounts her childhood under the Nazis to her daughter across a year of diary entries.", series: null, tier: "S", topRank: null },
  { title: "Speculations about Jakob", author: "Uwe Johnson", pageCount: 240, genre: "Fiction", publicationDate: "1959-01-01", description: "An East German railway dispatcher dies crossing the tracks in fog, and everyone who knew him argues about why.", series: null, tier: "A", topRank: null },
  { title: "The Third Book About Achim", author: "Uwe Johnson", pageCount: 272, genre: "Fiction", publicationDate: "1961-01-01", description: "A West German journalist travels east to interview an East German cycling champion for a planned biography.", series: null, tier: "A", topRank: null },

  { title: "Bottom's Dream", author: "Arno Schmidt", pageCount: 1496, genre: "Fiction", publicationDate: "1970-01-01", description: "A single night in the life of a translator of Edgar Allan Poe, written in three columns and invented orthography.", series: null, tier: "A", topRank: null },
  { title: "The Stony Heart", author: "Arno Schmidt", pageCount: 288, genre: "Fiction", publicationDate: "1956-01-01", description: "A man hunting a rare nineteenth-century book in divided Germany drifts toward his estranged wife in the East.", series: null, tier: "B", topRank: null },

  { title: "Old Rendering Plant", author: "Wolfgang Hilbig", pageCount: 112, genre: "Fiction", publicationDate: "1992-01-01", description: "A boy in East Germany discovers the slaughterhouse where the region's dead animals are rendered into glue.", series: null, tier: "A", topRank: null },
  { title: "The Females", author: "Wolfgang Hilbig", pageCount: 144, genre: "Fiction", publicationDate: "1987-01-01", description: "An East German factory stoker's obsession with the women he watches leads him into a shadowy sexual underground.", series: null, tier: "A", topRank: null },
  { title: "The Sleep of the Righteous", author: "Wolfgang Hilbig", pageCount: 192, genre: "Fiction", publicationDate: "2002-01-01", description: "Seven interlinked stories of East German childhood, memory, and the permanence of the Stasi past.", series: null, tier: "A", topRank: null },

  { title: "Bricks and Mortar", author: "Clemens Meyer", pageCount: 688, genre: "Fiction", publicationDate: "2013-01-01", description: "A polyphonic novel of the Leipzig sex industry from the fall of the Wall through the 2000s.", series: null, tier: "A", topRank: null },
  { title: "All the Lights", author: "Clemens Meyer", pageCount: 240, genre: "Fiction", publicationDate: "2008-01-01", description: "Fifteen stories of drifters, ex-cons, and broken relationships in post-Wall eastern Germany.", series: null, tier: "A", topRank: null },
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

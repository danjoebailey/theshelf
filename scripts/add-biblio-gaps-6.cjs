const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Virgil (2)
  { title: "Eclogues", author: "Virgil", pageCount: 96, genre: "Fiction", publicationDate: "-37", description: "Virgil's first major work: ten pastoral poems modeled on Theocritus, including the prophetic Fourth Eclogue that Christians later read as foretelling Christ.", series: null, tier: 1, topRank: null },
  { title: "Georgics", author: "Virgil", pageCount: 144, genre: "Fiction", publicationDate: "-29", description: "Virgil's four-book didactic poem on farming, beekeeping, and the moral life of Roman agriculture — commissioned by Maecenas to glorify rural Italy.", series: null, tier: 1, topRank: null },

  // Ovid (4)
  { title: "Amores", author: "Ovid", pageCount: 192, genre: "Fiction", publicationDate: "-16", description: "Ovid's early sequence of love elegies to an elusive mistress named Corinna — the book that made him famous and scandalous in Augustan Rome.", series: null, tier: 1, topRank: null },
  { title: "Heroides", author: "Ovid", pageCount: 256, genre: "Fiction", publicationDate: "-15", description: "Twenty-one verse letters from mythological heroines to the men who abandoned them — Ovid's radical experiment in female voice.", series: null, tier: 1, topRank: null },
  { title: "Fasti", author: "Ovid", pageCount: 336, genre: "Fiction", publicationDate: "8", description: "Ovid's unfinished poem in six books, one for each month of the Roman calendar — the festivals, myths, and astronomical origins of each date.", series: null, tier: 1, topRank: null },
  { title: "Tristia", author: "Ovid", pageCount: 224, genre: "Fiction", publicationDate: "13", description: "The 'sorrowful letters' Ovid wrote from exile on the Black Sea after Augustus banished him from Rome — Western literature's first sustained poetry of displacement.", series: null, tier: 1, topRank: null },

  // Lucretius (1)
  { title: "On the Nature of Things", author: "Lucretius", pageCount: 304, genre: "Non-Fiction", publicationDate: "-55", description: "Lucretius's six-book Latin didactic poem setting out Epicurean physics and ethics — the atomic theory, the mortality of the soul, and the denial of divine intervention.", series: null, tier: 1, topRank: null },

  // Dante (2)
  { title: "Convivio", author: "Dante Alighieri", pageCount: 256, genre: "Non-Fiction", publicationDate: "1307", description: "Dante's unfinished 'banquet' of philosophy: a vernacular Italian prose commentary on his own canzoni, arguing for Italian as a vehicle for serious thought.", series: null, tier: 1, topRank: null },
  { title: "La Vita Nuova", author: "Dante Alighieri", pageCount: 112, genre: "Fiction", publicationDate: "1294", description: "Dante's early prosimetrum account of his love for Beatrice — a mix of poems and prose narrative that would seed the Divine Comedy's paradise.", series: null, tier: 1, topRank: null },

  // Chaucer (1)
  { title: "Troilus and Criseyde", author: "Geoffrey Chaucer", pageCount: 400, genre: "Fiction", publicationDate: "1385", description: "Chaucer's book-length tragic romance of a Trojan prince and his faithless lover — his most ambitious single poem before the Canterbury Tales.", series: null, tier: 1, topRank: null },

  // Boccaccio (2)
  { title: "Il Filostrato", author: "Giovanni Boccaccio", pageCount: 256, genre: "Fiction", publicationDate: "1335", description: "Boccaccio's narrative poem of Troilus and Cressida, the work Chaucer translated and expanded into Troilus and Criseyde.", series: null, tier: 1, topRank: null },
  { title: "The Elegy of Lady Fiammetta", author: "Giovanni Boccaccio", pageCount: 176, genre: "Fiction", publicationDate: "1344", description: "Boccaccio's proto-psychological novel told entirely from the point of view of a Neapolitan noblewoman abandoned by her lover — arguably the first modern interior monologue.", series: null, tier: 1, topRank: null },

  // Goethe (3)
  { title: "Egmont", author: "Johann Wolfgang von Goethe", pageCount: 128, genre: "Fiction", publicationDate: "1788", description: "Goethe's tragedy of the Count of Egmont, leader of the Dutch resistance to Spanish rule — later set to music by Beethoven in one of his most famous overtures.", series: null, tier: 1, topRank: null },
  { title: "Iphigenia in Tauris", author: "Johann Wolfgang von Goethe", pageCount: 112, genre: "Fiction", publicationDate: "1787", description: "Goethe's blank-verse reimagining of Euripides: Iphigenia, rescued from sacrifice by Artemis and serving as the goddess's priestess in barbarous Tauris, is reunited with her brother Orestes.", series: null, tier: 1, topRank: null },
  { title: "Poetry and Truth", author: "Johann Wolfgang von Goethe", pageCount: 832, genre: "Biography", publicationDate: "1833", description: "Goethe's four-volume autobiography, charting his life from his Frankfurt childhood through the Sturm und Drang years — published in installments across his last two decades.", series: null, tier: 1, topRank: null },

  // Friedrich Schiller (4)
  { title: "The Robbers", author: "Friedrich Schiller", pageCount: 176, genre: "Fiction", publicationDate: "1781", description: "Schiller's incendiary debut play: a nobleman's son, disowned by his father, becomes the leader of a band of Bohemian outlaws — the signature drama of Sturm und Drang.", series: null, tier: 1, topRank: null },
  { title: "Don Carlos", author: "Friedrich Schiller", pageCount: 240, genre: "Fiction", publicationDate: "1787", description: "Schiller's historical tragedy of the heir to the Spanish throne, secretly in love with his young stepmother and plotting with the Marquis of Posa to free the Netherlands.", series: null, tier: 1, topRank: null },
  { title: "Wallenstein", author: "Friedrich Schiller", pageCount: 432, genre: "Fiction", publicationDate: "1799", description: "Schiller's epic trilogy on the great Bohemian general of the Thirty Years' War — widely considered the greatest historical drama in German literature.", series: null, tier: 1, topRank: null },
  { title: "William Tell", author: "Friedrich Schiller", pageCount: 192, genre: "Fiction", publicationDate: "1804", description: "Schiller's final completed play: the Swiss mountaineer William Tell refuses to bow to a Habsburg bailiff and sets in motion the founding myth of the Swiss Confederation.", series: null, tier: 1, topRank: null },

  // Heinrich Heine (2)
  { title: "Book of Songs", author: "Heinrich Heine", pageCount: 352, genre: "Fiction", publicationDate: "1827", description: "Heine's collection of lyric poems — the book that became one of the most frequently set to music in German-language history, with settings by Schubert, Schumann, Mendelssohn, and Brahms.", series: null, tier: 1, topRank: null },
  { title: "Germany: A Winter's Tale", author: "Heinrich Heine", pageCount: 144, genre: "Fiction", publicationDate: "1844", description: "Heine's satirical verse travelogue of a journey from Paris to Germany, mocking the political reaction and censorship of Metternich's Europe — banned on publication.", series: null, tier: 1, topRank: null },

  // Rainer Maria Rilke (4)
  { title: "Duino Elegies", author: "Rainer Maria Rilke", pageCount: 112, genre: "Fiction", publicationDate: "1922", description: "Rilke's ten-elegy sequence, begun in 1912 at Castle Duino and completed a decade later in a single inspired burst — one of the defining works of German modernist poetry.", series: null, tier: 1, topRank: null },
  { title: "Sonnets to Orpheus", author: "Rainer Maria Rilke", pageCount: 128, genre: "Fiction", publicationDate: "1922", description: "Rilke's fifty-five sonnets composed in three weeks as a 'grave-monument' for a young dancer — and the completion of his decade-long creative drought.", series: null, tier: 1, topRank: null },
  { title: "The Notebooks of Malte Laurids Brigge", author: "Rainer Maria Rilke", pageCount: 288, genre: "Fiction", publicationDate: "1910", description: "Rilke's only novel: the Parisian diary of a young Danish poet from a fallen noble family, fragmented between memory, terror, and the city around him.", series: null, tier: 1, topRank: null },
  { title: "Letters to a Young Poet", author: "Rainer Maria Rilke", pageCount: 96, genre: "Non-Fiction", publicationDate: "1929", description: "Ten letters Rilke wrote between 1903 and 1908 to a young aspiring poet named Franz Kappus — the book that has become a permanent guide for vocation and solitude.", series: null, tier: 1, topRank: null },

  // Hermann Broch (2)
  { title: "The Sleepwalkers", author: "Hermann Broch", pageCount: 648, genre: "Fiction", publicationDate: "1931", description: "Broch's modernist trilogy tracking three German lives from 1888 to 1918 — Romantic, Anarchist, Realist — as the values of imperial Europe disintegrate around them.", series: null, tier: 1, topRank: null },
  { title: "The Death of Virgil", author: "Hermann Broch", pageCount: 480, genre: "Fiction", publicationDate: "1945", description: "A single day inside the dying mind of the Roman poet Virgil, debating whether to burn the unfinished Aeneid — Broch's stream-of-consciousness masterwork, written in internment.", series: null, tier: 1, topRank: null },

  // Alfred Döblin (1)
  { title: "Berlin Alexanderplatz", author: "Alfred Döblin", pageCount: 480, genre: "Fiction", publicationDate: "1929", description: "Döblin's montage novel of Weimar Berlin: an ex-convict named Franz Biberkopf tries to stay straight and is crushed by the city — Germany's Ulysses.", series: null, tier: 1, topRank: null },

  // Cervantes (2)
  { title: "Exemplary Novels", author: "Miguel de Cervantes", pageCount: 512, genre: "Fiction", publicationDate: "1613", description: "Cervantes's collection of twelve short novels — picaresque, romantic, and moral — that he considered his most innovative prose after Don Quixote.", series: null, tier: 1, topRank: null },
  { title: "Entremeses", author: "Miguel de Cervantes", pageCount: 192, genre: "Fiction", publicationDate: "1615", description: "Cervantes's eight short comic interludes — the farcical one-act 'entremés' form he elevated into miniature theatrical masterpieces.", series: null, tier: 1, topRank: null },

  // Michael Lewis (2)
  { title: "The New New Thing", author: "Michael Lewis", pageCount: 272, genre: "Non-Fiction", publicationDate: "1999", description: "Lewis's account of the 1990s Silicon Valley bubble, centered on the serial entrepreneur Jim Clark — founder of Silicon Graphics, Netscape, and Healtheon.", series: null, tier: 1, topRank: null },
  { title: "Boomerang", author: "Michael Lewis", pageCount: 240, genre: "Non-Fiction", publicationDate: "2011", description: "Lewis's post-2008-crisis tour of financial collapse through Iceland, Greece, Ireland, Germany, and California — a portrait of national character through bubble and bust.", series: null, tier: 1, topRank: null },

  // Steven Pinker (1)
  { title: "The Blank Slate", author: "Steven Pinker", pageCount: 528, genre: "Non-Fiction", publicationDate: "2002", description: "Pinker's argument against the tabula rasa model of human nature, drawing on evolutionary psychology, cognitive science, and genetics to defend an inborn human mind.", series: null, tier: 1, topRank: null },

  // Bill Bryson (4)
  { title: "The Lost Continent", author: "Bill Bryson", pageCount: 320, genre: "Non-Fiction", publicationDate: "1989", description: "Bryson's travelogue of a 13,978-mile road trip across 38 US states searching for the perfect American small town — his first travel book.", series: null, tier: 1, topRank: null },
  { title: "Neither Here Nor There", author: "Bill Bryson", pageCount: 272, genre: "Non-Fiction", publicationDate: "1991", description: "Bryson retraces a youthful backpacking tour of Europe as a middle-aged man, from Norway to Istanbul, finding most of his memories inaccurate and most of his destinations changed.", series: null, tier: 1, topRank: null },
  { title: "The Mother Tongue", author: "Bill Bryson", pageCount: 320, genre: "Non-Fiction", publicationDate: "1990", description: "Bryson's history of the English language — how an obscure Germanic dialect colonized half the globe and produced Shakespeare's vocabulary of twenty-thousand-plus words.", series: null, tier: 1, topRank: null },
  { title: "Made in America", author: "Bill Bryson", pageCount: 432, genre: "Non-Fiction", publicationDate: "1994", description: "Bryson's informal history of the American language — how immigration, advertising, and frontier life shaped the vocabulary of the United States.", series: null, tier: 1, topRank: null },

  // Simon Winchester (5)
  { title: "The Professor and the Madman", author: "Simon Winchester", pageCount: 256, genre: "Non-Fiction", publicationDate: "1998", description: "Winchester's account of the compiling of the Oxford English Dictionary and its most prolific volunteer contributor — a convicted murderer confined to Broadmoor asylum.", series: null, tier: 1, topRank: null },
  { title: "The Map That Changed the World", author: "Simon Winchester", pageCount: 336, genre: "Non-Fiction", publicationDate: "2001", description: "The story of William Smith, the son of a blacksmith who produced the first geological map of any country and founded modern stratigraphy before going bankrupt.", series: null, tier: 1, topRank: null },
  { title: "Krakatoa", author: "Simon Winchester", pageCount: 464, genre: "Non-Fiction", publicationDate: "2003", description: "Winchester's account of the August 1883 eruption of Krakatoa — the day a volcano destroyed itself, rearranged the atmosphere, and announced the age of global news.", series: null, tier: 1, topRank: null },
  { title: "The Meaning of Everything", author: "Simon Winchester", pageCount: 288, genre: "Non-Fiction", publicationDate: "2003", description: "Winchester's companion to The Professor and the Madman: the seven-decade project of making the Oxford English Dictionary from 1857 to 1928.", series: null, tier: 1, topRank: null },
  { title: "Atlantic", author: "Simon Winchester", pageCount: 512, genre: "Non-Fiction", publicationDate: "2010", description: "Winchester's biography of the Atlantic Ocean: its geological birth, its human crossings, and its modern environmental collapse.", series: null, tier: 1, topRank: null },

  // John Grisham (6)
  { title: "The Summons", author: "John Grisham", pageCount: 384, genre: "Thriller", publicationDate: "2002", description: "A law professor returns to his dying father's Mississippi home and finds three million dollars in cash in a cabinet — and a brother who knows it's there.", series: null, tier: 1, topRank: null },
  { title: "The Broker", author: "John Grisham", pageCount: 432, genre: "Thriller", publicationDate: "2005", description: "A disgraced Washington power-broker is pardoned by an outgoing president and deposited in Bologna under a new identity — so the CIA can see who tries to kill him first.", series: null, tier: 1, topRank: null },
  { title: "The Appeal", author: "John Grisham", pageCount: 432, genre: "Thriller", publicationDate: "2008", description: "A Mississippi jury hands down a massive verdict against a chemical company — and the company's owner decides to simply buy the Supreme Court justice he needs to overturn it.", series: null, tier: 1, topRank: null },
  { title: "The Last Juror", author: "John Grisham", pageCount: 496, genre: "Thriller", publicationDate: "2004", description: "A young newspaper owner in 1970s Mississippi covers a brutal murder trial and watches the convicted killer return, years later, to systematically kill the jurors who put him away.", series: null, tier: 1, topRank: null },
  { title: "The Associate", author: "John Grisham", pageCount: 384, genre: "Thriller", publicationDate: "2009", description: "A Yale-trained young lawyer is blackmailed into joining the largest law firm in the world — and spying on it from within.", series: null, tier: 1, topRank: null },
  { title: "The Litigators", author: "John Grisham", pageCount: 400, genre: "Thriller", publicationDate: "2011", description: "A burnt-out Harvard corporate lawyer walks out of his firm and joins a two-man Chicago ambulance-chasing operation that just caught the biggest pharmaceutical case of its career.", series: null, tier: 1, topRank: null },

  // James Patterson (4)
  { title: "The Big Bad Wolf", author: "James Patterson", pageCount: 400, genre: "Thriller", publicationDate: "2003", description: "Alex Cross #9: now an FBI agent, Cross tracks a Russian émigré kingpin who has built an empire stealing women to order for the global slave trade.", series: { name: "Alex Cross", order: 9, total: 30 }, tier: 1, topRank: null },
  { title: "4th of July", author: "James Patterson", pageCount: 416, genre: "Thriller", publicationDate: "2005", description: "Women's Murder Club #4: Lindsay Boxer faces criminal charges and an old case from her rookie years that's come back to demand her attention.", series: { name: "Women's Murder Club", order: 4, total: 24 }, tier: 1, topRank: null },
  { title: "Step on a Crack", author: "James Patterson", pageCount: 400, genre: "Thriller", publicationDate: "2007", description: "Michael Bennett #1: an NYPD detective juggling his wife's cancer and ten adopted kids gets handed a massive hostage crisis at a New York cathedral.", series: { name: "Michael Bennett", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "Honeymoon", author: "James Patterson", pageCount: 416, genre: "Thriller", publicationDate: "2005", description: "Patterson's standalone psychological thriller: an FBI agent investigates a beautiful woman whose wealthy husbands keep dying.", series: null, tier: 1, topRank: null },

  // Dennis Lehane (3)
  { title: "Live by Night", author: "Dennis Lehane", pageCount: 416, genre: "Historical Fiction", publicationDate: "2012", description: "The second Coughlin novel: Joe Coughlin rises from Boston petty thief to Prohibition-era rum-runner and Tampa kingpin during the 1920s.", series: null, tier: 1, topRank: null },
  { title: "Coronado", author: "Dennis Lehane", pageCount: 224, genre: "Fiction", publicationDate: "2006", description: "Lehane's short story collection and a play — dark compressed pieces from the universe of his crime novels.", series: null, tier: 1, topRank: null },
  { title: "The Drop", author: "Dennis Lehane", pageCount: 208, genre: "Mystery", publicationDate: "2014", description: "A Boston bar used by the mob as a cash 'drop' is robbed, and its quiet bartender becomes the focus of a cop's investigation — expanded from Lehane's screenplay for the film.", series: null, tier: 1, topRank: null },

  // Robert Harris (1)
  { title: "Archangel", author: "Robert Harris", pageCount: 416, genre: "Thriller", publicationDate: "1998", description: "A British historian in post-Soviet Moscow tracks down Stalin's missing private notebooks — and what they lead him to in the northern forests near Archangel.", series: null, tier: 1, topRank: null },

  // Ken Follett (5)
  { title: "Night Over Water", author: "Ken Follett", pageCount: 544, genre: "Historical Fiction", publicationDate: "1991", description: "Follett's WWII-eve thriller set aboard the last Pan-Am Clipper flight from Britain to America before the war, carrying a plane-full of passengers with secrets.", series: null, tier: 1, topRank: null },
  { title: "The Hammer of Eden", author: "Ken Follett", pageCount: 464, genre: "Thriller", publicationDate: "1998", description: "A cult in the California mountains threatens to trigger an earthquake with a seismic vibrator unless the state halts a dam project that will flood their land.", series: null, tier: 1, topRank: null },
  { title: "The Third Twin", author: "Ken Follett", pageCount: 464, genre: "Thriller", publicationDate: "1996", description: "A geneticist studying identical twins discovers that her subjects — two seemingly unrelated men — have the same DNA.", series: null, tier: 1, topRank: null },
  { title: "Code to Zero", author: "Ken Follett", pageCount: 432, genre: "Thriller", publicationDate: "2000", description: "A man wakes up in a DC train station in January 1958 with no memory and no identity — as the US prepares to launch its first satellite.", series: null, tier: 1, topRank: null },
  { title: "Whiteout", author: "Ken Follett", pageCount: 384, genre: "Thriller", publicationDate: "2004", description: "A lethal virus is stolen from a Scottish biotech lab on Christmas Eve as a blizzard cuts off the staff assembled for a family holiday.", series: null, tier: 1, topRank: null },

  // Bernard Cornwell (6)
  { title: "Stonehenge", author: "Bernard Cornwell", pageCount: 464, genre: "Historical Fiction", publicationDate: "1999", description: "Cornwell's Bronze Age novel imagining the building of Stonehenge — three brothers, a dying king, and the gods who must be placated to raise the stones.", series: null, tier: 1, topRank: null },
  { title: "The Archer's Tale", author: "Bernard Cornwell", pageCount: 416, genre: "Historical Fiction", publicationDate: "2000", description: "The first of the Grail Quest trilogy: a young English archer in the opening years of the Hundred Years' War sets out to recover his family's stolen relics — and the Holy Grail.", series: { name: "Grail Quest", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Vagabond", author: "Bernard Cornwell", pageCount: 464, genre: "Historical Fiction", publicationDate: "2002", description: "Grail Quest #2: Thomas of Hookton is sent north to hunt a traitor among the English ranks during the Scottish invasion — and draws closer to the secret of the Grail.", series: { name: "Grail Quest", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Heretic", author: "Bernard Cornwell", pageCount: 432, genre: "Historical Fiction", publicationDate: "2003", description: "Grail Quest #3: Thomas pursues the Grail into Gascony while being hunted by the Inquisition — Cornwell's climactic volume of the original trilogy.", series: { name: "Grail Quest", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Rebel", author: "Bernard Cornwell", pageCount: 432, genre: "Historical Fiction", publicationDate: "1993", description: "The first Nathaniel Starbuck novel: a Northern-born Yale student finds himself stranded in the South at the start of the Civil War and joins the Confederate army.", series: { name: "Starbuck Chronicles", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Agincourt", author: "Bernard Cornwell", pageCount: 480, genre: "Historical Fiction", publicationDate: "2008", description: "Cornwell's novel of the 1415 Battle of Agincourt, following a young English archer from the siege of Harfleur to the muddy fields where Henry V's outnumbered army beats the French.", series: null, tier: 1, topRank: null },

  // Colleen McCullough (3)
  { title: "The Ladies of Missalonghi", author: "Colleen McCullough", pageCount: 224, genre: "Fiction", publicationDate: "1987", description: "A short novel set in 1900s Australia: a spinster in a strict family town inherits a piece of land and a chance at an unexpected life — McCullough's most beloved minor book.", series: null, tier: 1, topRank: null },
  { title: "The Touch", author: "Colleen McCullough", pageCount: 624, genre: "Historical Fiction", publicationDate: "2003", description: "McCullough's generational saga of a self-made Scottish goldfields tycoon in 19th-century New South Wales and the young bride he brings over from the old country.", series: null, tier: 1, topRank: null },
  { title: "On, Off", author: "Colleen McCullough", pageCount: 352, genre: "Mystery", publicationDate: "2006", description: "The first Carmine Delmonico novel: a 1960s Connecticut homicide detective investigates grisly body parts found at a prestigious neurological research institute.", series: { name: "Carmine Delmonico", order: 1, total: 5 }, tier: 1, topRank: null },

  // Michael Ondaatje (1)
  { title: "Running in the Family", author: "Michael Ondaatje", pageCount: 224, genre: "Biography", publicationDate: "1982", description: "Ondaatje's hybrid memoir returning to the Sri Lanka of his eccentric Dutch-Burgher family — part history, part invention, part dream.", series: null, tier: 1, topRank: null },

  // Chimamanda Ngozi Adichie (2)
  { title: "The Thing Around Your Neck", author: "Chimamanda Ngozi Adichie", pageCount: 240, genre: "Fiction", publicationDate: "2009", description: "Adichie's twelve-story collection spanning Nigeria and the United States — tracing the lives of women caught between continents, marriages, and generations.", series: null, tier: 1, topRank: null },
  { title: "Dear Ijeawele", author: "Chimamanda Ngozi Adichie", pageCount: 80, genre: "Non-Fiction", publicationDate: "2017", description: "Adichie's feminist manifesto written as fifteen suggestions to a friend who wants to raise a feminist daughter.", series: null, tier: 1, topRank: null },

  // Zadie Smith (1)
  { title: "Changing My Mind", author: "Zadie Smith", pageCount: 320, genre: "Non-Fiction", publicationDate: "2009", description: "Smith's first essay collection: occasional pieces on writing, reading, and her own life as a novelist and a critic.", series: null, tier: 1, topRank: null },

  // Jonathan Franzen (1)
  { title: "How to Be Alone", author: "Jonathan Franzen", pageCount: 320, genre: "Non-Fiction", publicationDate: "2002", description: "Franzen's first essay collection, including the Harper's essay 'Why Bother?' on the novel's cultural marginalization — the piece that marked his emergence as a public intellectual.", series: null, tier: 1, topRank: null },
];

console.log(`Will add ${ADDITIONS.length} books\n`);

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
const duplicates = [];
const toAdd = [];
for (const a of ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) duplicates.push(a);
  else { toAdd.push(a); existingKeys.add(key); }
}

if (duplicates.length > 0) {
  console.log(`⚠ Skipping ${duplicates.length} duplicates:`);
  for (const d of duplicates) console.log(`  - "${d.title}" — ${d.author}`);
}

const next = books.concat(toAdd);
fs.writeFileSync(CATALOG, JSON.stringify(next));
const stat = fs.statSync(CATALOG);
console.log(`\nAdded ${toAdd.length} books`);
console.log(`Before: ${before} | After: ${next.length}`);
console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Émile Zola (5)
  { title: "The Fortune of the Rougons", author: "Émile Zola", pageCount: 352, genre: "Fiction", publicationDate: "1871", description: "The opening novel of Zola's twenty-volume Rougon-Macquart cycle: the founding of the rival family branches against the backdrop of Louis-Napoleon's 1851 coup.", series: { name: "Rougon-Macquart", order: 1, total: 20 }, tier: 1, topRank: null },
  { title: "The Kill", author: "Émile Zola", pageCount: 304, genre: "Fiction", publicationDate: "1871", description: "Rougon-Macquart #2: Zola's portrait of Second Empire Paris as a frenzy of speculation, real-estate profiteering, and decadent family sexuality.", series: { name: "Rougon-Macquart", order: 2, total: 20 }, tier: 1, topRank: null },
  { title: "The Masterpiece", author: "Émile Zola", pageCount: 432, genre: "Fiction", publicationDate: "1886", description: "Rougon-Macquart #14: Zola's novel of a doomed Impressionist painter's struggle for an unreachable masterpiece — a book so pointed at Paul Cézanne that it ended their friendship.", series: { name: "Rougon-Macquart", order: 14, total: 20 }, tier: 1, topRank: null },
  { title: "The Dream", author: "Émile Zola", pageCount: 240, genre: "Fiction", publicationDate: "1888", description: "Rougon-Macquart #16: an uncharacteristically quiet, religious novel about a young embroideress in a cathedral town whose idealized love destroys her.", series: { name: "Rougon-Macquart", order: 16, total: 20 }, tier: 1, topRank: null },
  { title: "Lourdes", author: "Émile Zola", pageCount: 480, genre: "Fiction", publicationDate: "1894", description: "The first novel of Zola's Three Cities trilogy: a disillusioned French priest accompanies the pilgrim trains to Lourdes and watches thousands of the sick hope for cures.", series: { name: "Three Cities", order: 1, total: 3 }, tier: 1, topRank: null },

  // Guy de Maupassant (3)
  { title: "The Horla", author: "Guy de Maupassant", pageCount: 96, genre: "Horror", publicationDate: "1887", description: "Maupassant's most famous novella: a man becomes convinced an invisible being has taken up residence in his home and is draining his sanity — a touchstone of weird fiction.", series: null, tier: 1, topRank: null },
  { title: "Boule de Suif", author: "Guy de Maupassant", pageCount: 96, genre: "Fiction", publicationDate: "1880", description: "Maupassant's breakthrough story: during the Franco-Prussian War a prostitute in a stagecoach is pressured by her supposedly respectable fellow passengers into sleeping with a Prussian officer.", series: null, tier: 1, topRank: null },
  { title: "Mont-Oriol", author: "Guy de Maupassant", pageCount: 320, genre: "Fiction", publicationDate: "1887", description: "Maupassant's satirical novel of the founding of a fraudulent spa resort in the Auvergne — a picture of speculation, financial manipulation, and provincial romance.", series: null, tier: 1, topRank: null },

  // Marcel Proust (4)
  { title: "Swann's Way", author: "Marcel Proust", pageCount: 600, genre: "Fiction", publicationDate: "1913", description: "Volume one of In Search of Lost Time: the narrator's childhood in Combray, the Swann family's disastrous love affair with Odette, and the madeleine that launched modernism.", series: { name: "In Search of Lost Time", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "Sodom and Gomorrah", author: "Marcel Proust", pageCount: 720, genre: "Fiction", publicationDate: "1921", description: "Volume four of In Search of Lost Time: the narrator discovers the hidden queer worlds of aristocratic Paris and begins his disastrous involvement with Albertine.", series: { name: "In Search of Lost Time", order: 4, total: 7 }, tier: 1, topRank: null },
  { title: "The Captive", author: "Marcel Proust", pageCount: 528, genre: "Fiction", publicationDate: "1923", description: "Volume five of In Search of Lost Time: the narrator keeps Albertine imprisoned in his family's Paris apartment, attempting to control a woman he cannot fully believe.", series: { name: "In Search of Lost Time", order: 5, total: 7 }, tier: 1, topRank: null },
  { title: "The Fugitive", author: "Marcel Proust", pageCount: 384, genre: "Fiction", publicationDate: "1925", description: "Volume six of In Search of Lost Time: Albertine escapes, dies, and the narrator works through an obsessive, posthumous jealousy toward her.", series: { name: "In Search of Lost Time", order: 6, total: 7 }, tier: 1, topRank: null },

  // Stendhal (3)
  { title: "Armance", author: "Stendhal", pageCount: 272, genre: "Fiction", publicationDate: "1827", description: "Stendhal's first novel: a young Parisian viscount, unable to consummate his love for his cousin, is driven by gossip to ever more elaborate self-deception.", series: null, tier: 1, topRank: null },
  { title: "Lamiel", author: "Stendhal", pageCount: 320, genre: "Fiction", publicationDate: "1889", description: "Stendhal's unfinished posthumous novel: a country girl adopted by an aristocrat refuses every received form of life in a systematic quest for independent experience.", series: null, tier: 1, topRank: null },
  { title: "The Abbess of Castro", author: "Stendhal", pageCount: 144, genre: "Historical Fiction", publicationDate: "1839", description: "Stendhal's Italian Renaissance novella of forbidden love, elopement, and murder between a noble abbess and a bandit — the fiercest of his late Italian tales.", series: null, tier: 1, topRank: null },

  // Voltaire (5)
  { title: "Zadig", author: "Voltaire", pageCount: 112, genre: "Fiction", publicationDate: "1747", description: "Voltaire's philosophical tale of a wise Babylonian minister buffeted by fortune and misfortune — an Enlightenment parable on providence and chance.", series: null, tier: 1, topRank: null },
  { title: "Micromégas", author: "Voltaire", pageCount: 48, genre: "Sci-Fi", publicationDate: "1752", description: "One of the earliest works of science fiction: a giant from the star Sirius and a friend from Saturn visit Earth and are amused and horrified by what they find.", series: null, tier: 1, topRank: null },
  { title: "Letters on the English", author: "Voltaire", pageCount: 224, genre: "Non-Fiction", publicationDate: "1733", description: "Voltaire's praise of English liberty, empiricism, and religious tolerance, written during his exile in London — the book that introduced Newton and Locke to French readers.", series: null, tier: 1, topRank: null },
  { title: "Philosophical Dictionary", author: "Voltaire", pageCount: 496, genre: "Non-Fiction", publicationDate: "1764", description: "Voltaire's alphabetical compendium of short polemical essays on religion, morality, and superstition — burned on publication and repeatedly banned.", series: null, tier: 1, topRank: null },
  { title: "Treatise on Tolerance", author: "Voltaire", pageCount: 176, genre: "Non-Fiction", publicationDate: "1763", description: "Voltaire's polemic written in response to the torture and execution of Protestant merchant Jean Calas — a founding document of Enlightenment religious toleration.", series: null, tier: 1, topRank: null },

  // Plutarch (1)
  { title: "Parallel Lives", author: "Plutarch", pageCount: 1120, genre: "Biography", publicationDate: "100", description: "Plutarch's series of paired biographies of Greek and Roman statesmen — Alexander with Caesar, Demosthenes with Cicero, and so on — one of the most influential works of classical history.", series: null, tier: 1, topRank: null },

  // Tacitus (2)
  { title: "Annals", author: "Tacitus", pageCount: 480, genre: "History", publicationDate: "120", description: "Tacitus's history of the Julio-Claudian emperors from the death of Augustus through Nero — the most penetrating surviving account of early imperial Rome.", series: null, tier: 1, topRank: null },
  { title: "Histories", author: "Tacitus", pageCount: 352, genre: "History", publicationDate: "110", description: "Tacitus's account of the Year of the Four Emperors (69 AD) and its aftermath — a prequel to the Annals, surviving only in fragments.", series: null, tier: 1, topRank: null },

  // Cicero (3)
  { title: "On Duties", author: "Cicero", pageCount: 272, genre: "Non-Fiction", publicationDate: "-44", description: "Cicero's three-book manual on moral obligation, written as a letter to his son and completed weeks before his execution — the model for Stoic ethical thinking in the West.", series: null, tier: 1, topRank: null },
  { title: "On the Nature of the Gods", author: "Cicero", pageCount: 240, genre: "Non-Fiction", publicationDate: "-45", description: "Cicero's three-way philosophical dialogue in which Epicurean, Stoic, and Academic Skeptic spokesmen debate the existence and nature of the divine.", series: null, tier: 1, topRank: null },
  { title: "On Friendship", author: "Cicero", pageCount: 96, genre: "Non-Fiction", publicationDate: "-44", description: "Cicero's dialogue on the nature of true friendship — a short work that became one of the most widely read ethical texts of the Middle Ages and Renaissance.", series: null, tier: 1, topRank: null },

  // Livy (1)
  { title: "The History of Rome", author: "Livy", pageCount: 768, genre: "History", publicationDate: "27", description: "Livy's monumental 142-book history of Rome from its legendary origins to the reign of Augustus — only thirty-five books survive, covering the Republic's formative centuries.", series: null, tier: 1, topRank: null },

  // Horace (2)
  { title: "Odes", author: "Horace", pageCount: 240, genre: "Fiction", publicationDate: "-23", description: "Horace's four books of lyric poetry in Greek meters adapted to Latin — the book that canonized the 'carpe diem' philosophy and shaped European poetry for two thousand years.", series: null, tier: 1, topRank: null },
  { title: "Epistles", author: "Horace", pageCount: 208, genre: "Fiction", publicationDate: "-20", description: "Horace's verse letters on friendship, writing, and how to live — including the Ars Poetica, the foundational Western treatise on poetic craft.", series: null, tier: 1, topRank: null },

  // Juvenal (1)
  { title: "Satires", author: "Juvenal", pageCount: 256, genre: "Fiction", publicationDate: "100", description: "Juvenal's sixteen satirical poems lacerating the corruption, greed, and pretentiousness of imperial Rome — the source of 'bread and circuses' and 'who watches the watchers?'", series: null, tier: 1, topRank: null },

  // Euripides (5)
  { title: "Alcestis", author: "Euripides", pageCount: 80, genre: "Fiction", publicationDate: "-438", description: "Euripides's earliest surviving play: King Admetus escapes death only by persuading his wife Alcestis to die in his place — a tragicomedy rescued at the end by Heracles.", series: null, tier: 1, topRank: null },
  { title: "Hippolytus", author: "Euripides", pageCount: 96, genre: "Fiction", publicationDate: "-428", description: "Phaedra, queen of Athens, falls in love with her chaste stepson Hippolytus, and Aphrodite engineers the catastrophe that destroys them both.", series: null, tier: 1, topRank: null },
  { title: "Hecuba", author: "Euripides", pageCount: 80, genre: "Fiction", publicationDate: "-424", description: "The widowed queen of fallen Troy, enslaved after her city's destruction, watches her youngest daughter sacrificed and her murdered son wash up on the shore.", series: null, tier: 1, topRank: null },
  { title: "Iphigenia in Aulis", author: "Euripides", pageCount: 96, genre: "Fiction", publicationDate: "-405", description: "Agamemnon is forced to choose between sacrificing his daughter Iphigenia and losing the Greek expedition to Troy — Euripides's final, posthumous tragedy.", series: null, tier: 1, topRank: null },
  { title: "Electra", author: "Euripides", pageCount: 80, genre: "Fiction", publicationDate: "-413", description: "Euripides's naturalistic reworking of the Electra myth: the daughter of Agamemnon, married off to a poor farmer, plots with Orestes to kill their mother and her lover.", series: null, tier: 1, topRank: null },

  // Aeschylus (4)
  { title: "Prometheus Bound", author: "Aeschylus", pageCount: 80, genre: "Fiction", publicationDate: "-460", description: "The Titan Prometheus, chained to a rock for stealing fire from the gods, defies Zeus and prophesies his eventual fall — a play whose attribution to Aeschylus has been debated for centuries.", series: null, tier: 1, topRank: null },
  { title: "The Persians", author: "Aeschylus", pageCount: 80, genre: "Fiction", publicationDate: "-472", description: "The oldest surviving Greek tragedy: the Persian court learns of Xerxes's defeat at Salamis — the only extant Greek tragedy on a historical rather than mythical subject.", series: null, tier: 1, topRank: null },
  { title: "Seven Against Thebes", author: "Aeschylus", pageCount: 80, genre: "Fiction", publicationDate: "-467", description: "The cursed sons of Oedipus, Eteocles and Polyneices, fight to the death at the gates of Thebes — the third and only surviving play of Aeschylus's Theban trilogy.", series: null, tier: 1, topRank: null },
  { title: "The Suppliants", author: "Aeschylus", pageCount: 80, genre: "Fiction", publicationDate: "-463", description: "The fifty daughters of Danaus flee forced marriage to their cousins, arriving in Argos to beg protection — the only surviving play of another lost trilogy.", series: null, tier: 1, topRank: null },

  // Sylvia Plath (2)
  { title: "The Colossus and Other Poems", author: "Sylvia Plath", pageCount: 96, genre: "Fiction", publicationDate: "1960", description: "Plath's first published collection, written while she was still finding her voice — the 'juvenilia' side of the poet before the breakthrough into Ariel.", series: null, tier: 1, topRank: null },
  { title: "Johnny Panic and the Bible of Dreams", author: "Sylvia Plath", pageCount: 336, genre: "Fiction", publicationDate: "1977", description: "Plath's posthumous collection of short stories and prose pieces edited by Ted Hughes — a rare window onto her career in fiction.", series: null, tier: 1, topRank: null },

  // Elizabeth Bishop (2)
  { title: "Geography III", author: "Elizabeth Bishop", pageCount: 64, genre: "Fiction", publicationDate: "1976", description: "Bishop's final collection, including 'In the Waiting Room,' 'One Art,' and 'The Moose' — the book that cemented her reputation as one of the greatest American poets of the century.", series: null, tier: 1, topRank: null },
  { title: "North & South", author: "Elizabeth Bishop", pageCount: 96, genre: "Fiction", publicationDate: "1946", description: "Bishop's debut, immediately winning the Houghton Mifflin Poetry Fellowship — containing 'The Fish' and the precise, observational style that would define her career.", series: null, tier: 1, topRank: null },

  // Wallace Stevens (3)
  { title: "Harmonium", author: "Wallace Stevens", pageCount: 144, genre: "Fiction", publicationDate: "1923", description: "Stevens's extraordinary first book, published when he was 44 and a Hartford insurance executive — including 'The Emperor of Ice-Cream' and 'Sunday Morning.'", series: null, tier: 1, topRank: null },
  { title: "The Auroras of Autumn", author: "Wallace Stevens", pageCount: 128, genre: "Fiction", publicationDate: "1950", description: "Stevens's late book of long philosophical poems, grappling with the aurora borealis as a figure for the shifting imagination confronting old age.", series: null, tier: 1, topRank: null },
  { title: "The Collected Poems of Wallace Stevens", author: "Wallace Stevens", pageCount: 544, genre: "Fiction", publicationDate: "1954", description: "Stevens's self-assembled definitive collection, published the year before his death — winner of the Pulitzer Prize for Poetry and the National Book Award.", series: null, tier: 1, topRank: null },

  // Ezra Pound (3)
  { title: "The Cantos", author: "Ezra Pound", pageCount: 824, genre: "Fiction", publicationDate: "1969", description: "Pound's lifelong epic poem in 120 cantos, written from 1915 to 1969 — modernism's most ambitious, most difficult, and most controversial long poem.", series: null, tier: 1, topRank: null },
  { title: "Personae", author: "Ezra Pound", pageCount: 256, genre: "Fiction", publicationDate: "1926", description: "Pound's collection of his shorter poems and translations through 1926 — the foundational volume of Anglo-American modernist poetry.", series: null, tier: 1, topRank: null },
  { title: "ABC of Reading", author: "Ezra Pound", pageCount: 208, genre: "Non-Fiction", publicationDate: "1934", description: "Pound's didactic manifesto on how to read literature, arguing through examples that the history of poetry is a history of precise attention.", series: null, tier: 1, topRank: null },

  // William Carlos Williams (3)
  { title: "Paterson", author: "William Carlos Williams", pageCount: 288, genre: "Fiction", publicationDate: "1946", description: "Williams's five-book epic poem, written from 1946 to 1958, using the New Jersey city of Paterson as a figure for American speech, history, and the modern mind.", series: null, tier: 1, topRank: null },
  { title: "Spring and All", author: "William Carlos Williams", pageCount: 96, genre: "Fiction", publicationDate: "1923", description: "Williams's experimental hybrid of poetry and prose manifesto, including 'The Red Wheelbarrow' — his modernist case for the local, the plain, and the present.", series: null, tier: 1, topRank: null },
  { title: "Pictures from Brueghel", author: "William Carlos Williams", pageCount: 192, genre: "Fiction", publicationDate: "1962", description: "Williams's late and final collection, awarded the Pulitzer Prize two months after his death — containing 'Landscape with the Fall of Icarus.'", series: null, tier: 1, topRank: null },

  // Dylan Thomas (3)
  { title: "Under Milk Wood", author: "Dylan Thomas", pageCount: 112, genre: "Fiction", publicationDate: "1954", description: "Thomas's 'play for voices' set in the fictional Welsh seaside village of Llareggub — a chorus of dreams, gossip, and remembered desire from dawn to midnight.", series: null, tier: 1, topRank: null },
  { title: "Collected Poems 1934-1952", author: "Dylan Thomas", pageCount: 208, genre: "Fiction", publicationDate: "1952", description: "Thomas's definitive collection, assembled by the poet himself a year before his death — including 'Do Not Go Gentle Into That Good Night' and 'Fern Hill.'", series: null, tier: 1, topRank: null },
  { title: "A Child's Christmas in Wales", author: "Dylan Thomas", pageCount: 64, genre: "Fiction", publicationDate: "1952", description: "Thomas's prose reminiscence of childhood Christmases in Swansea — originally a radio piece, now one of the most beloved seasonal memoirs in English.", series: null, tier: 1, topRank: null },

  // Gerard Manley Hopkins (1)
  { title: "Poems", author: "Gerard Manley Hopkins", pageCount: 192, genre: "Fiction", publicationDate: "1918", description: "Hopkins's posthumous collection, assembled by his friend Robert Bridges — the book that introduced his sprung rhythm and God-haunted Victorian Catholicism to the world.", series: null, tier: 1, topRank: null },

  // Seamus Heaney (3)
  { title: "Death of a Naturalist", author: "Seamus Heaney", pageCount: 64, genre: "Fiction", publicationDate: "1966", description: "Heaney's debut collection, centered on his rural Derry childhood — the book that launched him with 'Digging' and his vocation.", series: null, tier: 1, topRank: null },
  { title: "Seeing Things", author: "Seamus Heaney", pageCount: 112, genre: "Fiction", publicationDate: "1991", description: "Heaney's collection after his father's death, moving into a lighter, more visionary register — one of the pivot points of his Nobel-winning late career.", series: null, tier: 1, topRank: null },
  { title: "Beowulf", author: "Seamus Heaney", pageCount: 240, genre: "Fiction", publicationDate: "1999", description: "Heaney's Whitbread Prize-winning translation of the Old English epic — a version so forceful it became the standard English Beowulf in a generation.", series: null, tier: 1, topRank: null },

  // Derek Walcott (3)
  { title: "Another Life", author: "Derek Walcott", pageCount: 176, genre: "Fiction", publicationDate: "1973", description: "Walcott's book-length autobiographical poem about growing up in colonial St. Lucia and his friendship with the painter Dunstan St. Omer.", series: null, tier: 1, topRank: null },
  { title: "The Star-Apple Kingdom", author: "Derek Walcott", pageCount: 96, genre: "Fiction", publicationDate: "1979", description: "Walcott's collection of Caribbean political and historical poems, including 'The Schooner Flight' — one of his strongest mid-career books.", series: null, tier: 1, topRank: null },
  { title: "Midsummer", author: "Derek Walcott", pageCount: 96, genre: "Fiction", publicationDate: "1984", description: "Fifty-four numbered poems composed in and around Trinidad and Boston — Walcott's most conversational, prose-inflected collection.", series: null, tier: 1, topRank: null },

  // Dave Eggers (5)
  { title: "A Heartbreaking Work of Staggering Genius", author: "Dave Eggers", pageCount: 496, genre: "Biography", publicationDate: "2000", description: "Eggers's ironic, self-conscious memoir of raising his younger brother after both their parents died of cancer within a month of each other — the defining Gen-X memoir.", series: null, tier: 1, topRank: null },
  { title: "What Is the What", author: "Dave Eggers", pageCount: 560, genre: "Fiction", publicationDate: "2006", description: "Eggers's novel based on the life of Valentino Achak Deng, one of the Sudanese 'Lost Boys' who fled civil war and arrived in Atlanta as a refugee.", series: null, tier: 1, topRank: null },
  { title: "The Circle", author: "Dave Eggers", pageCount: 512, genre: "Fiction", publicationDate: "2013", description: "A young woman takes a job at a Silicon Valley tech company that wants to connect every aspect of human life — Eggers's dystopian satire of total transparency.", series: null, tier: 1, topRank: null },
  { title: "Zeitoun", author: "Dave Eggers", pageCount: 368, genre: "Non-Fiction", publicationDate: "2009", description: "Eggers's reconstruction of Hurricane Katrina through the experience of Syrian-American contractor Abdulrahman Zeitoun, who paddled New Orleans in a canoe and was then arrested.", series: null, tier: 1, topRank: null },
  { title: "A Hologram for the King", author: "Dave Eggers", pageCount: 336, genre: "Fiction", publicationDate: "2012", description: "A washed-up American businessman trying to sell holographic teleconferencing to the Saudi king waits, and waits, in the half-built King Abdullah Economic City.", series: null, tier: 1, topRank: null },

  // Olga Tokarczuk (2)
  { title: "Primeval and Other Times", author: "Olga Tokarczuk", pageCount: 256, genre: "Fiction", publicationDate: "1996", description: "A multi-generational novel tracing the lives of the residents of Primeval, a mythical Polish village, through the 20th century.", series: null, tier: 1, topRank: null },
  { title: "House of Day, House of Night", author: "Olga Tokarczuk", pageCount: 304, genre: "Fiction", publicationDate: "1998", description: "A mosaic novel of a narrator living in a Silesian village near the Czech border, weaving dreams, local history, and the lives of the dead.", series: null, tier: 1, topRank: null },

  // Boris Pasternak (1)
  { title: "Safe Conduct", author: "Boris Pasternak", pageCount: 192, genre: "Biography", publicationDate: "1931", description: "Pasternak's lyrical autobiography of his first forty years — his childhood, Scriabin and Rilke, the Revolution, and the development of his poetic voice.", series: null, tier: 1, topRank: null },
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

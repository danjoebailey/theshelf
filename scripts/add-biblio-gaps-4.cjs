const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Plato (5)
  { title: "The Republic", author: "Plato", pageCount: 416, genre: "Non-Fiction", publicationDate: "-380", description: "Plato's foundational dialogue on justice, the ideal state, and the nature of the soul — containing the Allegory of the Cave and the philosopher-king argument.", series: null, tier: 1, topRank: null },
  { title: "Symposium", author: "Plato", pageCount: 112, genre: "Non-Fiction", publicationDate: "-385", description: "A dinner party in Athens at which Socrates and six others — including Aristophanes and Alcibiades — each deliver a speech on the nature of love.", series: null, tier: 1, topRank: null },
  { title: "Apology", author: "Plato", pageCount: 80, genre: "Non-Fiction", publicationDate: "-399", description: "Plato's account of Socrates' defense at his trial for impiety and corrupting the youth — the philosopher's refusal to plead for his life in his own words.", series: null, tier: 1, topRank: null },
  { title: "Phaedo", author: "Plato", pageCount: 144, genre: "Non-Fiction", publicationDate: "-360", description: "The dialogue of Socrates' final hours in prison, in which he discusses the immortality of the soul before drinking the hemlock.", series: null, tier: 1, topRank: null },
  { title: "Phaedrus", author: "Plato", pageCount: 144, genre: "Non-Fiction", publicationDate: "-370", description: "A dialogue set outside the walls of Athens in which Socrates and Phaedrus debate the nature of love, rhetoric, and the written word.", series: null, tier: 1, topRank: null },

  // Aristotle (5)
  { title: "Nicomachean Ethics", author: "Aristotle", pageCount: 336, genre: "Non-Fiction", publicationDate: "-340", description: "Aristotle's foundational work on virtue, the good life, and practical wisdom — the most influential treatise on ethics in Western philosophy.", series: null, tier: 1, topRank: null },
  { title: "Politics", author: "Aristotle", pageCount: 400, genre: "Non-Fiction", publicationDate: "-335", description: "Aristotle's study of the city-state as the natural form of human community, classifying forms of government and arguing that politics completes ethics.", series: null, tier: 1, topRank: null },
  { title: "Poetics", author: "Aristotle", pageCount: 96, genre: "Non-Fiction", publicationDate: "-335", description: "The earliest surviving work of Western literary criticism: Aristotle's analysis of tragedy, mimesis, plot, and catharsis.", series: null, tier: 1, topRank: null },
  { title: "Metaphysics", author: "Aristotle", pageCount: 512, genre: "Non-Fiction", publicationDate: "-350", description: "Aristotle's investigation of being as being — the unmoved mover, substance, potentiality and actuality, and the foundations of first philosophy.", series: null, tier: 1, topRank: null },
  { title: "Physics", author: "Aristotle", pageCount: 400, genre: "Non-Fiction", publicationDate: "-350", description: "Aristotle's study of nature, change, motion, and causation — the framework that dominated Western natural philosophy for nearly two thousand years.", series: null, tier: 1, topRank: null },

  // Seneca (1)
  { title: "Medea", author: "Seneca", pageCount: 96, genre: "Fiction", publicationDate: "50", description: "Seneca's violent Roman tragedy reimagining Medea's murder of her children — the most influential of his nine surviving dramas.", series: null, tier: 1, topRank: null },

  // Bertrand Russell (4)
  { title: "Proposed Roads to Freedom", author: "Bertrand Russell", pageCount: 176, genre: "Non-Fiction", publicationDate: "1918", description: "Russell's comparative study of socialism, anarchism, and syndicalism as rival answers to the question of how a just post-capitalist society might be organized.", series: null, tier: 1, topRank: null },
  { title: "The Problem of China", author: "Bertrand Russell", pageCount: 272, genre: "Non-Fiction", publicationDate: "1922", description: "Russell's account of the year he spent teaching in Beijing, arguing that China needed to modernize without imitating the industrial nations that were already failing.", series: null, tier: 1, topRank: null },
  { title: "Autobiography", author: "Bertrand Russell", pageCount: 768, genre: "Biography", publicationDate: "1967", description: "Russell's three-volume memoir (1872–1914, 1914–1944, 1944–1967), covering his aristocratic childhood, philosophical revolutions, pacifism, imprisonment, and three marriages.", series: null, tier: 1, topRank: null },
  { title: "The Analysis of Mind", author: "Bertrand Russell", pageCount: 288, genre: "Non-Fiction", publicationDate: "1921", description: "Russell's attempt to reconcile materialism and idealism through 'neutral monism' — analyzing consciousness, memory, and belief as functional arrangements of sense data.", series: null, tier: 1, topRank: null },

  // Hannah Arendt (2)
  { title: "On Revolution", author: "Hannah Arendt", pageCount: 368, genre: "Non-Fiction", publicationDate: "1963", description: "Arendt's comparative study of the American and French Revolutions, arguing that the American succeeded where the French failed because it kept liberty distinct from social justice.", series: null, tier: 1, topRank: null },
  { title: "The Life of the Mind", author: "Hannah Arendt", pageCount: 544, genre: "Non-Fiction", publicationDate: "1978", description: "Arendt's final, unfinished work — two volumes on Thinking and Willing — intended as a philosophical companion to The Human Condition.", series: null, tier: 1, topRank: null },

  // Simone de Beauvoir (3)
  { title: "The Prime of Life", author: "Simone de Beauvoir", pageCount: 608, genre: "Biography", publicationDate: "1960", description: "The second volume of Beauvoir's memoirs, covering 1929 to 1944 — her early teaching career, her partnership with Sartre, and the Nazi occupation of Paris.", series: null, tier: 1, topRank: null },
  { title: "The Woman Destroyed", author: "Simone de Beauvoir", pageCount: 256, genre: "Fiction", publicationDate: "1967", description: "Three late novellas about women whose lives have been defined by men — written as Beauvoir herself was thinking through the themes of The Coming of Age.", series: null, tier: 1, topRank: null },
  { title: "All Said and Done", author: "Simone de Beauvoir", pageCount: 496, genre: "Biography", publicationDate: "1972", description: "The fourth and final volume of Beauvoir's memoirs, covering the decade after Force of Circumstance and returning to themes of aging, feminism, and her political commitments.", series: null, tier: 1, topRank: null },

  // Jean-Paul Sartre (3)
  { title: "The Words", author: "Jean-Paul Sartre", pageCount: 176, genre: "Biography", publicationDate: "1964", description: "Sartre's memoir of his bookish Parisian childhood, the work cited when he was awarded the Nobel Prize in Literature — which he then refused.", series: null, tier: 1, topRank: null },
  { title: "Baudelaire", author: "Jean-Paul Sartre", pageCount: 224, genre: "Non-Fiction", publicationDate: "1947", description: "Sartre's existentialist psychobiography of Charles Baudelaire, arguing that the poet's life was the result of a fundamental choice made in childhood and endlessly renewed.", series: null, tier: 1, topRank: null },
  { title: "Nekrassov", author: "Jean-Paul Sartre", pageCount: 192, genre: "Fiction", publicationDate: "1955", description: "Sartre's farcical play about a French conman who passes himself off as a defecting Soviet minister to fleece a right-wing newspaper.", series: null, tier: 1, topRank: null },

  // Albert Camus (2)
  { title: "Caligula", author: "Albert Camus", pageCount: 112, genre: "Fiction", publicationDate: "1944", description: "Camus's play of the mad Roman emperor who, after the death of his sister, decides to pursue the impossible with absolute logical consistency — absurdism embodied in a tyrant.", series: null, tier: 1, topRank: null },
  { title: "Resistance, Rebellion and Death", author: "Albert Camus", pageCount: 272, genre: "Non-Fiction", publicationDate: "1960", description: "A collection of Camus's political essays, including his wartime Letters to a German Friend and his stand against both capital punishment and Soviet totalitarianism.", series: null, tier: 1, topRank: null },

  // Tennessee Williams (6)
  { title: "The Glass Menagerie", author: "Tennessee Williams", pageCount: 112, genre: "Fiction", publicationDate: "1944", description: "Williams's breakthrough play, a 'memory play' of a faded Southern mother, her painfully shy disabled daughter, and the son who will eventually abandon them both.", series: null, tier: 1, topRank: null },
  { title: "A Streetcar Named Desire", author: "Tennessee Williams", pageCount: 192, genre: "Fiction", publicationDate: "1947", description: "The faded Southern belle Blanche DuBois arrives at her sister's cramped New Orleans apartment and collides with her brutal brother-in-law Stanley Kowalski.", series: null, tier: 1, topRank: null },
  { title: "Cat on a Hot Tin Roof", author: "Tennessee Williams", pageCount: 192, genre: "Fiction", publicationDate: "1955", description: "Pulitzer-winning play set on a Mississippi plantation the night Big Daddy Pollitt learns he is dying — and his son Brick and daughter-in-law Maggie circle the inheritance.", series: null, tier: 1, topRank: null },
  { title: "The Night of the Iguana", author: "Tennessee Williams", pageCount: 128, genre: "Fiction", publicationDate: "1961", description: "A defrocked Episcopal priest leading a bus tour of middle-aged Texas women to a Mexican hotel confronts his own collapse — Williams's last major stage success.", series: null, tier: 1, topRank: null },
  { title: "Suddenly, Last Summer", author: "Tennessee Williams", pageCount: 80, genre: "Fiction", publicationDate: "1958", description: "A wealthy New Orleans matron wants to have her niece lobotomized to silence what she saw at her son Sebastian's death — a one-act compression of Williams's darkest themes.", series: null, tier: 1, topRank: null },
  { title: "Sweet Bird of Youth", author: "Tennessee Williams", pageCount: 144, genre: "Fiction", publicationDate: "1959", description: "An aging movie star and her young gigolo lover return to a Gulf Coast town where the young man's past is waiting to destroy him.", series: null, tier: 1, topRank: null },

  // Arthur Miller (5)
  { title: "Death of a Salesman", author: "Arthur Miller", pageCount: 144, genre: "Fiction", publicationDate: "1949", description: "Willy Loman, an aging traveling salesman, comes apart as his delusions of American success collide with what his life has actually become — Pulitzer Prize, Tony Award.", series: null, tier: 1, topRank: null },
  { title: "The Crucible", author: "Arthur Miller", pageCount: 160, genre: "Fiction", publicationDate: "1953", description: "Miller's dramatization of the Salem witch trials, written as a direct allegory for the McCarthy-era anti-Communist hearings he himself was later summoned before.", series: null, tier: 1, topRank: null },
  { title: "A View from the Bridge", author: "Arthur Miller", pageCount: 112, genre: "Fiction", publicationDate: "1955", description: "A Brooklyn longshoreman's obsession with his orphaned niece destroys his family when two illegal Italian immigrants come to stay.", series: null, tier: 1, topRank: null },
  { title: "All My Sons", author: "Arthur Miller", pageCount: 96, genre: "Fiction", publicationDate: "1947", description: "Miller's first Broadway hit: a WWII-era small-town industrialist whose faulty airplane parts killed 21 American pilots must face his family's reckoning.", series: null, tier: 1, topRank: null },
  { title: "After the Fall", author: "Arthur Miller", pageCount: 176, genre: "Fiction", publicationDate: "1964", description: "Miller's autobiographical memory play narrating the failed marriages and political disillusions of a lawyer clearly modeled on himself — including a character based on Marilyn Monroe.", series: null, tier: 1, topRank: null },

  // Doris Lessing (6)
  { title: "A Ripple from the Storm", author: "Doris Lessing", pageCount: 288, genre: "Fiction", publicationDate: "1958", description: "The third volume of Lessing's Children of Violence series: Martha Quest, now in wartime Rhodesia, joins a tiny Communist cell and enters a loveless second marriage.", series: { name: "Children of Violence", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "Landlocked", author: "Doris Lessing", pageCount: 288, genre: "Fiction", publicationDate: "1965", description: "The fourth Children of Violence novel: Martha's second marriage disintegrates, she falls in love with a refugee from Poland, and the war drags on.", series: { name: "Children of Violence", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "The Summer Before the Dark", author: "Doris Lessing", pageCount: 288, genre: "Fiction", publicationDate: "1973", description: "A middle-aged London wife and mother whose family is away for the summer takes a job, an affair, and a long illness — and watches her old life fade.", series: null, tier: 1, topRank: null },
  { title: "The Memoirs of a Survivor", author: "Doris Lessing", pageCount: 224, genre: "Fiction", publicationDate: "1974", description: "In a collapsing near-future England, a middle-aged woman watches civilization dissolve through her window and finds she can walk through her flat wall into another reality.", series: null, tier: 1, topRank: null },
  { title: "Shikasta", author: "Doris Lessing", pageCount: 464, genre: "Sci-Fi", publicationDate: "1979", description: "The first volume of Lessing's Canopus in Argos sequence: an ancient galactic civilization reports on the gradual spiritual collapse of a promising world it calls Shikasta (Earth).", series: { name: "Canopus in Argos", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Mara and Dann", author: "Doris Lessing", pageCount: 416, genre: "Sci-Fi", publicationDate: "1999", description: "Lessing's post-apocalyptic far-future novel: two siblings journey north across a drought-wasted Africa thousands of years after an ice age has ended our civilization.", series: null, tier: 1, topRank: null },

  // Hilary Mantel (7)
  { title: "A Place of Greater Safety", author: "Hilary Mantel", pageCount: 896, genre: "Historical Fiction", publicationDate: "1992", description: "Mantel's epic of the French Revolution, following Desmoulins, Danton, and Robespierre from their childhoods to the guillotine — a thousand-page rehearsal for her Cromwell trilogy.", series: null, tier: 1, topRank: null },
  { title: "Fludd", author: "Hilary Mantel", pageCount: 192, genre: "Fiction", publicationDate: "1989", description: "A mysterious young curate arrives in a grim 1950s Northern English mill town and upends the local Catholic parish — Mantel's compact, witchy comic novel.", series: null, tier: 1, topRank: null },
  { title: "The Giant, O'Brien", author: "Hilary Mantel", pageCount: 224, genre: "Historical Fiction", publicationDate: "1998", description: "An Irish giant billed as the tallest man in 1780s London is stalked by the Scottish surgeon John Hunter, who wants his skeleton for dissection.", series: null, tier: 1, topRank: null },
  { title: "An Experiment in Love", author: "Hilary Mantel", pageCount: 256, genre: "Fiction", publicationDate: "1995", description: "Three working-class English girls arrive at a London university in 1970 and are reshaped by ambition, Catholicism, and the ways their friendships begin to curdle.", series: null, tier: 1, topRank: null },
  { title: "A Change of Climate", author: "Hilary Mantel", pageCount: 352, genre: "Fiction", publicationDate: "1994", description: "A Norfolk couple who worked as missionaries in 1950s South Africa carry a buried tragedy home to England that detonates in their middle age.", series: null, tier: 1, topRank: null },
  { title: "Giving Up the Ghost", author: "Hilary Mantel", pageCount: 240, genre: "Biography", publicationDate: "2003", description: "Mantel's memoir of her Derbyshire childhood, her early engagement with Catholicism, and the medical misdiagnosis that defined her adult life.", series: null, tier: 1, topRank: null },
  { title: "The Assassination of Margaret Thatcher", author: "Hilary Mantel", pageCount: 256, genre: "Fiction", publicationDate: "2014", description: "Mantel's short story collection, including the controversial title story imagining an IRA sniper watching Thatcher leave an eye hospital in 1983.", series: null, tier: 1, topRank: null },

  // A.S. Byatt (3)
  { title: "The Matisse Stories", author: "A.S. Byatt", pageCount: 144, genre: "Fiction", publicationDate: "1993", description: "Three linked stories built around Matisse paintings — Byatt's meditation on art, color, and the quiet crises of middle-class English women.", series: null, tier: 1, topRank: null },
  { title: "The Game", author: "A.S. Byatt", pageCount: 288, genre: "Fiction", publicationDate: "1967", description: "Byatt's second novel: two sisters — a reclusive Quaker academic and a successful popular novelist — are reunited and torn apart by their childhood imaginary game.", series: null, tier: 1, topRank: null },
  { title: "Ragnarok", author: "A.S. Byatt", pageCount: 176, genre: "Fiction", publicationDate: "2011", description: "Byatt retells the Norse myth of the end of the world through the eyes of a 'thin child' evacuated to the English countryside during WWII.", series: null, tier: 1, topRank: null },

  // Angela Carter (1)
  { title: "The Sadeian Woman", author: "Angela Carter", pageCount: 192, genre: "Non-Fiction", publicationDate: "1978", description: "Carter's polemical study of the Marquis de Sade as a paradoxical ally of feminism — the book that scandalized second-wave feminist criticism in both directions.", series: null, tier: 1, topRank: null },

  // Jean Rhys (3)
  { title: "Voyage in the Dark", author: "Jean Rhys", pageCount: 192, genre: "Fiction", publicationDate: "1934", description: "A young chorus girl from the West Indies drifts through Edwardian London, an Englishman's mistress, an abortion, and a deepening dissociation from her own life.", series: null, tier: 1, topRank: null },
  { title: "After Leaving Mr. Mackenzie", author: "Jean Rhys", pageCount: 192, genre: "Fiction", publicationDate: "1931", description: "A woman abandoned by her lover drifts between cheap Parisian hotels and a despairing London visit to her sister — Rhys's most compressed portrait of female economic precarity.", series: null, tier: 1, topRank: null },
  { title: "Quartet", author: "Jean Rhys", pageCount: 192, genre: "Fiction", publicationDate: "1928", description: "Rhys's first novel (originally Postures): a young woman whose husband is imprisoned is taken in by an expatriate couple in Paris and slowly used up.", series: null, tier: 1, topRank: null },

  // Jeanette Winterson (5)
  { title: "Oranges Are Not the Only Fruit", author: "Jeanette Winterson", pageCount: 176, genre: "Fiction", publicationDate: "1985", description: "Winterson's semi-autobiographical debut: a working-class Lancashire girl raised by fanatically Pentecostal adoptive parents discovers she's a lesbian and is cast out.", series: null, tier: 1, topRank: null },
  { title: "The Passion", author: "Jeanette Winterson", pageCount: 176, genre: "Historical Fiction", publicationDate: "1987", description: "A Napoleonic Army cook and a web-footed Venetian casino girl whose heart can be removed and kept in a jar meet in the snows of Russia.", series: null, tier: 1, topRank: null },
  { title: "Sexing the Cherry", author: "Jeanette Winterson", pageCount: 160, genre: "Fiction", publicationDate: "1989", description: "A giant foundling called the Dog-Woman and her son Jordan live on the banks of the 17th-century Thames — a fantastical novel of London, time, and queerness.", series: null, tier: 1, topRank: null },
  { title: "Written on the Body", author: "Jeanette Winterson", pageCount: 208, genre: "Fiction", publicationDate: "1992", description: "A narrator of unspecified gender falls in love with a married woman who is dying of leukemia — a prose-poem meditation on love and the body.", series: null, tier: 1, topRank: null },
  { title: "Why Be Happy When You Could Be Normal?", author: "Jeanette Winterson", pageCount: 240, genre: "Biography", publicationDate: "2011", description: "Winterson's adult memoir returning to the childhood she fictionalized in Oranges — her search for her birth mother and her breakdown as an adult.", series: null, tier: 1, topRank: null },

  // Samuel Beckett (1)
  { title: "Proust", author: "Samuel Beckett", pageCount: 96, genre: "Non-Fiction", publicationDate: "1931", description: "Beckett's early monograph on In Search of Lost Time, commissioned by his publisher — the first sustained articulation of his lifelong themes of memory, time, and habit.", series: null, tier: 1, topRank: null },

  // Salman Rushdie (3)
  { title: "Grimus", author: "Salman Rushdie", pageCount: 320, genre: "Fantasy", publicationDate: "1975", description: "Rushdie's first novel, a largely dismissed experimental fantasy: a Native American immortal searches for the mountain at the center of the universe.", series: null, tier: 1, topRank: null },
  { title: "The Jaguar Smile", author: "Salman Rushdie", pageCount: 160, genre: "Non-Fiction", publicationDate: "1987", description: "Rushdie's travel memoir of three weeks in Sandinista Nicaragua, written before the Ayatollah's fatwa made him a global fugitive.", series: null, tier: 1, topRank: null },
  { title: "Luka and the Fire of Life", author: "Salman Rushdie", pageCount: 224, genre: "Fantasy", publicationDate: "2010", description: "A sequel to Haroun and the Sea of Stories: Luka journeys into the World of Magic to steal the Fire of Life and save his storyteller father.", series: { name: "Khalifa Brothers", order: 2, total: 2 }, tier: 1, topRank: null },

  // Jules Verne (4)
  { title: "Michael Strogoff", author: "Jules Verne", pageCount: 400, genre: "Historical Fiction", publicationDate: "1876", description: "A courier for the Tsar carries a crucial message across 5,500 kilometers of Tartar-occupied Siberia to Irkutsk — one of Verne's most successful adventure novels.", series: null, tier: 1, topRank: null },
  { title: "In Search of the Castaways", author: "Jules Verne", pageCount: 480, genre: "Fiction", publicationDate: "1868", description: "Lord Glenarvan's yacht searches South America, Australia, and New Zealand for the shipwrecked Captain Grant, following clues from a message sealed in a bottle.", series: null, tier: 1, topRank: null },
  { title: "Five Weeks in a Balloon", author: "Jules Verne", pageCount: 336, genre: "Fiction", publicationDate: "1863", description: "Verne's first published novel: three Englishmen attempt to cross the African continent in a newly invented hot-air balloon.", series: null, tier: 1, topRank: null },
  { title: "Around the Moon", author: "Jules Verne", pageCount: 256, genre: "Sci-Fi", publicationDate: "1869", description: "The direct sequel to From the Earth to the Moon, following the three astronauts on their trajectory around the Moon and their return to Earth.", series: null, tier: 1, topRank: null },

  // Jack Vance (3)
  { title: "The Star King", author: "Jack Vance", pageCount: 192, genre: "Sci-Fi", publicationDate: "1964", description: "The first of Vance's Demon Princes novels: Kirth Gersen hunts the five pirates who enslaved his home colony — starting with the enigmatic Attel Malagate.", series: { name: "Demon Princes", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Dragon Masters", author: "Jack Vance", pageCount: 160, genre: "Sci-Fi", publicationDate: "1962", description: "Hugo-winning short novel in which humans and genetically engineered dragons fight a proxy war against reptilian aliens and their own captured humans — one of Vance's most compressed works.", series: null, tier: 1, topRank: null },
  { title: "To Live Forever", author: "Jack Vance", pageCount: 224, genre: "Sci-Fi", publicationDate: "1956", description: "In a far-future city where immortality is earned through public achievement, an exile infiltrates the system to assassinate the Chairman — Vance's first major novel.", series: null, tier: 1, topRank: null },

  // Poul Anderson (3)
  { title: "Three Hearts and Three Lions", author: "Poul Anderson", pageCount: 240, genre: "Fantasy", publicationDate: "1961", description: "Anderson's foundational portal fantasy: a Danish engineer is transported from occupied Denmark to a parallel medieval world where he is Holger Danske, the legendary champion.", series: null, tier: 1, topRank: null },
  { title: "The Enemy Stars", author: "Poul Anderson", pageCount: 192, genre: "Sci-Fi", publicationDate: "1959", description: "Four men teleported aboard a matter-transmitter-equipped starship are stranded around a dead sun when their transmitter fails — Anderson's classic of hard SF problem-solving.", series: null, tier: 1, topRank: null },
  { title: "The Trouble Twisters", author: "Poul Anderson", pageCount: 224, genre: "Sci-Fi", publicationDate: "1966", description: "Three linked stories of the trader David Falkayn and his unlikely crew adjusting alien economies for the Polesotechnic League — part of Anderson's Technic Civilization future history.", series: null, tier: 1, topRank: null },

  // Olaf Stapledon (4)
  { title: "Last Men in London", author: "Olaf Stapledon", pageCount: 336, genre: "Sci-Fi", publicationDate: "1932", description: "The sequel to Last and First Men: a Last Man from two billion years in the future telepathically inhabits the body of a London man during and after WWI.", series: null, tier: 1, topRank: null },
  { title: "Darkness and the Light", author: "Olaf Stapledon", pageCount: 224, genre: "Sci-Fi", publicationDate: "1942", description: "Stapledon's wartime vision of two possible futures branching from the crisis of his present — one of spiritual light, the other of perpetual totalitarian darkness.", series: null, tier: 1, topRank: null },
  { title: "Death into Life", author: "Olaf Stapledon", pageCount: 192, genre: "Non-Fiction", publicationDate: "1946", description: "Stapledon's philosophical prose poem on the souls of RAF bomber crews killed over Europe, arguing for an impersonal, cosmic continuity of mind.", series: null, tier: 1, topRank: null },
  { title: "The Flames", author: "Olaf Stapledon", pageCount: 96, genre: "Sci-Fi", publicationDate: "1947", description: "Stapledon's late novella: a scientist discovers that fire itself is sentient — an ancient solar race trapped by humanity's mastery of combustion.", series: null, tier: 1, topRank: null },
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

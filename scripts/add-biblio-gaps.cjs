const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

// 102 additions curated from the bibliography audit.
// Each entry: title, author, pageCount, genre, publicationDate, description, series, tier, topRank
const ADDITIONS = [
  // Charles Darwin (4)
  { title: "The Voyage of the Beagle", author: "Charles Darwin", pageCount: 437, genre: "Non-Fiction", publicationDate: "1839", description: "Darwin's travelogue of his five-year HMS Beagle expedition through South America, the Galápagos, and the Pacific — the field observations that would become the foundation of On the Origin of Species.", series: null, tier: 1, topRank: null },
  { title: "The Descent of Man", author: "Charles Darwin", pageCount: 704, genre: "Non-Fiction", publicationDate: "1871", description: "Darwin extends evolution to humans, arguing sexual selection drives much of human development and that morality itself has an evolutionary origin.", series: null, tier: 1, topRank: null },
  { title: "The Expression of the Emotions in Man and Animals", author: "Charles Darwin", pageCount: 374, genre: "Non-Fiction", publicationDate: "1872", description: "Darwin's pioneering study of facial expressions and body language across species, arguing that emotional displays are evolved, universal, and shared with other animals.", series: null, tier: 1, topRank: null },
  { title: "Autobiography of Charles Darwin", author: "Charles Darwin", pageCount: 144, genre: "Biography", publicationDate: "1887", description: "A frank self-assessment written for his family, charting Darwin's intellectual development from reluctant clergyman-in-training to revolutionary naturalist.", series: null, tier: 1, topRank: null },

  // Niccolò Machiavelli (4)
  { title: "Discourses on Livy", author: "Niccolò Machiavelli", pageCount: 400, genre: "Non-Fiction", publicationDate: "1531", description: "Machiavelli's republican counterpoint to The Prince, using Livy's history of Rome to argue that liberty and civic virtue produce the strongest and most durable states.", series: null, tier: 1, topRank: null },
  { title: "The Art of War", author: "Niccolò Machiavelli", pageCount: 250, genre: "Non-Fiction", publicationDate: "1521", description: "A Socratic dialogue on military strategy, organization, and the citizen-soldier ideal versus mercenary armies.", series: null, tier: 1, topRank: null },
  { title: "Mandragola", author: "Niccolò Machiavelli", pageCount: 80, genre: "Fiction", publicationDate: "1518", description: "A ribald Renaissance comedy of Florentine deception in which a lovestruck young man tricks a virtuous wife with a false fertility potion — Machiavelli's masterpiece in drama.", series: null, tier: 1, topRank: null },
  { title: "Florentine Histories", author: "Niccolò Machiavelli", pageCount: 450, genre: "History", publicationDate: "1532", description: "Commissioned by the Medici, a history of Florence from Roman origins to Machiavelli's own time, framing the city's turbulence through his political philosophy.", series: null, tier: 1, topRank: null },

  // Thomas Paine (2)
  { title: "Rights of Man", author: "Thomas Paine", pageCount: 300, genre: "Non-Fiction", publicationDate: "1791", description: "Paine's defense of the French Revolution against Edmund Burke, arguing for representative government, constitutional rights, and radical social welfare a century before its time.", series: null, tier: 1, topRank: null },
  { title: "The Age of Reason", author: "Thomas Paine", pageCount: 272, genre: "Non-Fiction", publicationDate: "1794", description: "A deist critique of organized religion and biblical inerrancy that got Paine branded an atheist and cost him his American reputation.", series: null, tier: 1, topRank: null },

  // John Milton (2)
  { title: "Areopagitica", author: "John Milton", pageCount: 60, genre: "Non-Fiction", publicationDate: "1644", description: "Milton's landmark address to Parliament against pre-publication censorship — one of the founding defenses of free expression in English.", series: null, tier: 1, topRank: null },
  { title: "Comus", author: "John Milton", pageCount: 70, genre: "Fiction", publicationDate: "1634", description: "A masque commissioned for an earl's installation, in which the sorcerer Comus attempts to seduce a virtuous lady into abandoning her chastity.", series: null, tier: 1, topRank: null },

  // Harriet Beecher Stowe (3)
  { title: "Dred: A Tale of the Great Dismal Swamp", author: "Harriet Beecher Stowe", pageCount: 580, genre: "Historical Fiction", publicationDate: "1856", description: "Stowe's second anti-slavery novel, centering on a fugitive Black revolutionary hiding in the swamps of North Carolina — bleaker and more politically radical than Uncle Tom's Cabin.", series: null, tier: 1, topRank: null },
  { title: "The Minister's Wooing", author: "Harriet Beecher Stowe", pageCount: 448, genre: "Historical Fiction", publicationDate: "1859", description: "A New England romance set during the era of Jonathan Edwards, wrestling with Calvinist theology, grief, and the plight of a widowed mother.", series: null, tier: 1, topRank: null },
  { title: "The Pearl of Orr's Island", author: "Harriet Beecher Stowe", pageCount: 437, genre: "Historical Fiction", publicationDate: "1862", description: "A novel of coastal Maine fishing villages that influenced Sarah Orne Jewett and the entire New England regionalist tradition.", series: null, tier: 1, topRank: null },

  // Henry David Thoreau (3)
  { title: "A Week on the Concord and Merrimack Rivers", author: "Henry David Thoreau", pageCount: 365, genre: "Non-Fiction", publicationDate: "1849", description: "Thoreau's first book, a philosophical travelogue built around a canoe trip with his brother, weaving nature observation with meditations on friendship, poetry, and death.", series: null, tier: 1, topRank: null },
  { title: "The Maine Woods", author: "Henry David Thoreau", pageCount: 400, genre: "Non-Fiction", publicationDate: "1864", description: "Three essays on Thoreau's expeditions into the Maine wilderness — his ascent of Mount Katahdin remains one of American literature's most famous encounters with wild nature.", series: null, tier: 1, topRank: null },
  { title: "Walking", author: "Henry David Thoreau", pageCount: 48, genre: "Non-Fiction", publicationDate: "1862", description: "A late essay arguing that true culture requires long daily 'sauntering' into wildness, and that 'in Wildness is the preservation of the world.'", series: null, tier: 1, topRank: null },

  // Mary Shelley (4)
  { title: "Mathilda", author: "Mary Shelley", pageCount: 116, genre: "Fiction", publicationDate: "1959", description: "A confessional novella about a young woman destroyed by her father's incestuous love — suppressed by Shelley's father William Godwin and unpublished until 140 years after her death.", series: null, tier: 1, topRank: null },
  { title: "Valperga", author: "Mary Shelley", pageCount: 336, genre: "Historical Fiction", publicationDate: "1823", description: "A historical romance set in 14th-century Italy centering on the tyrant Castruccio Castracani and the pious countess who loves him — Shelley's most politically ambitious novel.", series: null, tier: 1, topRank: null },
  { title: "Lodore", author: "Mary Shelley", pageCount: 432, genre: "Fiction", publicationDate: "1835", description: "A domestic romance tracing a British family from Mayfair drawing rooms to the American frontier, marked by Shelley's late focus on motherhood, loss, and education.", series: null, tier: 1, topRank: null },
  { title: "Falkner", author: "Mary Shelley", pageCount: 432, genre: "Fiction", publicationDate: "1837", description: "Shelley's final novel, a melodrama about guilt, redemption, and paternal love in which an orphaned girl reforms a would-be suicide who rescued her.", series: null, tier: 1, topRank: null },

  // Charlotte Brontë (1)
  { title: "The Professor", author: "Charlotte Brontë", pageCount: 256, genre: "Fiction", publicationDate: "1857", description: "Brontë's first novel, unpublished in her lifetime, about an English teacher in a Brussels girls' school — a sparer, more autobiographical precursor to Villette.", series: null, tier: 1, topRank: null },

  // Bret Harte (3)
  { title: "Tales of the Argonauts", author: "Bret Harte", pageCount: 350, genre: "Fiction", publicationDate: "1875", description: "A story collection continuing Harte's chronicle of Gold Rush miners, drifters, and fortune-seekers in the California Sierras.", series: null, tier: 1, topRank: null },
  { title: "Cressy", author: "Bret Harte", pageCount: 300, genre: "Historical Fiction", publicationDate: "1889", description: "A novel of Gold Rush-era California schoolhouse life, blending frontier sentimentality with Harte's characteristic ironic humor.", series: null, tier: 1, topRank: null },
  { title: "The Story of a Mine", author: "Bret Harte", pageCount: 180, genre: "Fiction", publicationDate: "1878", description: "A short novel about silver mining, speculation, and political corruption — Harte's commentary on Western boomtown capitalism.", series: null, tier: 1, topRank: null },

  // Mary Wilkins Freeman (4)
  { title: "Pembroke", author: "Mary Wilkins Freeman", pageCount: 320, genre: "Fiction", publicationDate: "1894", description: "A New England novel of a long-estranged couple, rigid with Calvinist pride, kept apart for decades by a family feud — widely considered Freeman's masterpiece.", series: null, tier: 1, topRank: null },
  { title: "Madelon", author: "Mary Wilkins Freeman", pageCount: 380, genre: "Fiction", publicationDate: "1896", description: "A village romance in which the wronged Madelon stabs the man who jilted her — then must watch another woman be tried for the crime.", series: null, tier: 1, topRank: null },
  { title: "The Wind in the Rose-Bush and Other Stories of the Supernatural", author: "Mary Wilkins Freeman", pageCount: 200, genre: "Horror", publicationDate: "1903", description: "Freeman's collection of New England ghost stories, notable for their psychological chill grounded in domestic realism.", series: null, tier: 1, topRank: null },
  { title: "The Shoulders of Atlas", author: "Mary Wilkins Freeman", pageCount: 336, genre: "Fiction", publicationDate: "1908", description: "A late Freeman novel about inheritance and burden, centered on a woman who refuses to take what rightfully comes to her.", series: null, tier: 1, topRank: null },

  // Sophocles (5)
  { title: "Oedipus at Colonus", author: "Sophocles", pageCount: 80, genre: "Fiction", publicationDate: "-401", description: "The second play in Sophocles' Theban cycle chronologically: the blind, exiled Oedipus finds sanctuary near Athens and prepares for a mysterious, sanctified death.", series: null, tier: 1, topRank: null },
  { title: "Electra", author: "Sophocles", pageCount: 80, genre: "Fiction", publicationDate: "-410", description: "A tragedy of Agamemnon's daughter Electra and her brother Orestes plotting matricide against their mother Clytemnestra.", series: null, tier: 1, topRank: null },
  { title: "Ajax", author: "Sophocles", pageCount: 80, genre: "Fiction", publicationDate: "-440", description: "The Trojan War hero Ajax, passed over for Achilles' armor, is driven mad with humiliation, slaughters a flock of sheep, and takes his own life.", series: null, tier: 1, topRank: null },
  { title: "Philoctetes", author: "Sophocles", pageCount: 80, genre: "Fiction", publicationDate: "-409", description: "A tragedy of the wounded archer Philoctetes, abandoned on Lemnos by the Greeks, whom Odysseus must retrieve to win the Trojan War.", series: null, tier: 1, topRank: null },
  { title: "Women of Trachis", author: "Sophocles", pageCount: 80, genre: "Fiction", publicationDate: "-450", description: "The death of Heracles, poisoned by his wife Deianira with a love charm she believed would win him back from a new mistress.", series: null, tier: 1, topRank: null },

  // Aristophanes (8)
  { title: "The Frogs", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-405", description: "Dionysus descends to Hades to bring back a great tragic poet for Athens — a comic literary criticism pitting Aeschylus against Euripides.", series: null, tier: 1, topRank: null },
  { title: "The Clouds", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-423", description: "A satire of the new sophist intellectuals with Socrates as the chief target — one of the sources of bitterness Plato later cited for the philosopher's trial.", series: null, tier: 1, topRank: null },
  { title: "The Birds", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-414", description: "Two Athenians, fed up with their city, persuade the birds to build a utopia between heaven and earth — Aristophanes' longest and most fantastical comedy.", series: null, tier: 1, topRank: null },
  { title: "The Wasps", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-422", description: "A satire of Athens' jury-obsessed litigiousness, in which a son tries to cure his father's addiction to serving on juries.", series: null, tier: 1, topRank: null },
  { title: "The Acharnians", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-425", description: "Aristophanes' earliest surviving play: a war-weary farmer negotiates a private peace with Sparta during the Peloponnesian War.", series: null, tier: 1, topRank: null },
  { title: "The Knights", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-424", description: "A vicious satire of the populist demagogue Cleon, staged while Cleon was at the height of his power in Athens.", series: null, tier: 1, topRank: null },
  { title: "Peace", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-421", description: "A farmer flies to heaven on a giant dung beetle to rescue the goddess Peace from a cave where War has buried her — written during a brief Athenian-Spartan détente.", series: null, tier: 1, topRank: null },
  { title: "Plutus", author: "Aristophanes", pageCount: 80, genre: "Fiction", publicationDate: "-388", description: "Aristophanes' last surviving play: the god of wealth is blind, an Athenian farmer cures him, and chaos ensues when money finally flows to the deserving.", series: null, tier: 1, topRank: null },

  // Ambrose Bierce (3)
  { title: "The Devil's Dictionary", author: "Ambrose Bierce", pageCount: 280, genre: "Non-Fiction", publicationDate: "1911", description: "Bierce's savagely cynical satirical lexicon, defining words with unsparing wit ('Cynic, n. A blackguard whose faulty vision sees things as they are, not as they ought to be').", series: null, tier: 1, topRank: null },
  { title: "Can Such Things Be?", author: "Ambrose Bierce", pageCount: 240, genre: "Horror", publicationDate: "1893", description: "Bierce's collection of supernatural and psychological horror stories, including tales set on Civil War battlefields.", series: null, tier: 1, topRank: null },
  { title: "In the Midst of Life: Tales of Soldiers and Civilians", author: "Ambrose Bierce", pageCount: 300, genre: "Fiction", publicationDate: "1892", description: "Bierce's story collection of Civil War tragedies and macabre ironies — the original home of 'An Occurrence at Owl Creek Bridge' and 'Chickamauga.'", series: null, tier: 1, topRank: null },

  // Arthur Machen (5)
  { title: "The White People", author: "Arthur Machen", pageCount: 60, genre: "Horror", publicationDate: "1904", description: "A novella framed as the diary of a young girl being initiated into an ancient, nameless witch-cult in the Welsh hills — considered by Lovecraft one of the greatest weird tales ever written.", series: null, tier: 1, topRank: null },
  { title: "The Hill of Dreams", author: "Arthur Machen", pageCount: 240, genre: "Horror", publicationDate: "1907", description: "An autobiographical dark fantasy of a young Welsh writer whose retreat into a private Roman-era dream world slowly destroys him.", series: null, tier: 1, topRank: null },
  { title: "The Three Impostors", author: "Arthur Machen", pageCount: 256, genre: "Horror", publicationDate: "1895", description: "A linked story cycle in the manner of Stevenson's New Arabian Nights, in which three occult criminals pursue a golden coin through a shadowy London.", series: null, tier: 1, topRank: null },
  { title: "The House of Souls", author: "Arthur Machen", pageCount: 400, genre: "Horror", publicationDate: "1906", description: "A collection bringing together Machen's signature supernatural fiction, including 'The White People' and 'A Fragment of Life.'", series: null, tier: 1, topRank: null },
  { title: "The Terror", author: "Arthur Machen", pageCount: 200, genre: "Horror", publicationDate: "1917", description: "A WWI-era thriller in which the animal kingdom rises against humanity in an organized revolt across rural England — one of the earliest nature-revolt horror novels.", series: null, tier: 1, topRank: null },

  // Algernon Blackwood (3)
  { title: "The Wendigo", author: "Algernon Blackwood", pageCount: 60, genre: "Horror", publicationDate: "1910", description: "A novella of a Canadian wilderness hunting trip that encounters the carnivorous spirit of the north woods — a touchstone of cosmic horror.", series: null, tier: 1, topRank: null },
  { title: "The Empty House and Other Ghost Stories", author: "Algernon Blackwood", pageCount: 250, genre: "Horror", publicationDate: "1906", description: "Blackwood's first collection of supernatural tales, introducing his distinctive brand of atmospheric, nature-tinged dread.", series: null, tier: 1, topRank: null },
  { title: "The Centaur", author: "Algernon Blackwood", pageCount: 300, genre: "Fantasy", publicationDate: "1911", description: "A mystic, ecstatic novel about a man who becomes convinced he has glimpsed the survival of classical gods in the Caucasus mountains.", series: null, tier: 1, topRank: null },

  // Lord Dunsany (5)
  { title: "The Gods of Pegana", author: "Lord Dunsany", pageCount: 95, genre: "Fantasy", publicationDate: "1905", description: "Dunsany's debut: an invented pantheon and cosmology that influenced Tolkien, Lovecraft, and Le Guin — sketching the gods, fates, and prophets of the fictional land of Pegana.", series: null, tier: 1, topRank: null },
  { title: "Time and the Gods", author: "Lord Dunsany", pageCount: 180, genre: "Fantasy", publicationDate: "1906", description: "A sequel to Pegana expanding its mythology, written in Dunsany's signature King James biblical cadence.", series: null, tier: 1, topRank: null },
  { title: "The Sword of Welleran", author: "Lord Dunsany", pageCount: 200, genre: "Fantasy", publicationDate: "1908", description: "A collection of early Dunsany fantasy tales, including the title story of a dead hero's sword that defends his city from beyond the grave.", series: null, tier: 1, topRank: null },
  { title: "The Book of Wonder", author: "Lord Dunsany", pageCount: 120, genre: "Fantasy", publicationDate: "1912", description: "A collection of short fantasy tales deliberately constructed around fanciful illustrations by Sidney Sime.", series: null, tier: 1, topRank: null },
  { title: "Fifty-One Tales", author: "Lord Dunsany", pageCount: 120, genre: "Fantasy", publicationDate: "1915", description: "Very short fables and parables — Dunsany condensed — notable for their compression and mordant wit.", series: null, tier: 1, topRank: null },

  // J.R.R. Tolkien (5)
  { title: "Tree and Leaf", author: "J.R.R. Tolkien", pageCount: 96, genre: "Fantasy", publicationDate: "1964", description: "A slim volume pairing Tolkien's essay 'On Fairy-Stories' with his allegorical tale 'Leaf by Niggle' — his most direct statements on the nature of fantasy.", series: null, tier: 1, topRank: null },
  { title: "Farmer Giles of Ham", author: "J.R.R. Tolkien", pageCount: 80, genre: "Fantasy", publicationDate: "1949", description: "A mock-heroic comic tale of a reluctant English yeoman who bluffs his way to fame as a dragon-slayer.", series: null, tier: 1, topRank: null },
  { title: "Smith of Wootton Major", author: "J.R.R. Tolkien", pageCount: 64, genre: "Fantasy", publicationDate: "1967", description: "A late novella about a village smith granted passage to Faerie through a swallowed silver star baked into a children's cake.", series: null, tier: 1, topRank: null },
  { title: "The Father Christmas Letters", author: "J.R.R. Tolkien", pageCount: 96, genre: "Fantasy", publicationDate: "1976", description: "Illustrated letters Tolkien wrote to his children each Christmas from 1920 to 1942, chronicling the adventures of Father Christmas and the North Polar Bear.", series: null, tier: 1, topRank: null },
  { title: "The Fall of Gondolin", author: "J.R.R. Tolkien", pageCount: 304, genre: "Fantasy", publicationDate: "2018", description: "The full textual history of the cataclysmic siege of the Elvish city Gondolin — the third and final of Christopher Tolkien's posthumous standalone editions.", series: null, tier: 1, topRank: null },

  // D.H. Lawrence (3)
  { title: "The White Peacock", author: "D.H. Lawrence", pageCount: 400, genre: "Fiction", publicationDate: "1911", description: "Lawrence's first novel: a pastoral romance of rural Nottinghamshire farm life centered on a love triangle and a repressed homoerotic friendship.", series: null, tier: 1, topRank: null },
  { title: "The Trespasser", author: "D.H. Lawrence", pageCount: 220, genre: "Fiction", publicationDate: "1912", description: "Lawrence's second novel, based on the suicide of a friend: a married music teacher and his student pupil steal a week together on the Isle of Wight.", series: null, tier: 1, topRank: null },
  { title: "The Lost Girl", author: "D.H. Lawrence", pageCount: 384, genre: "Fiction", publicationDate: "1920", description: "A Midlands shopkeeper's daughter escapes provincial England by following an Italian traveling showman to the mountains of the Abruzzo.", series: null, tier: 1, topRank: null },

  // F. Scott Fitzgerald (3)
  { title: "Flappers and Philosophers", author: "F. Scott Fitzgerald", pageCount: 272, genre: "Fiction", publicationDate: "1920", description: "Fitzgerald's first story collection, gathering the tales (including 'Bernice Bobs Her Hair') that established him as the voice of Jazz Age youth.", series: null, tier: 1, topRank: null },
  { title: "Tales of the Jazz Age", author: "F. Scott Fitzgerald", pageCount: 320, genre: "Fiction", publicationDate: "1922", description: "Fitzgerald's second collection, including 'The Curious Case of Benjamin Button' and 'The Diamond as Big as the Ritz.'", series: null, tier: 1, topRank: null },
  { title: "The Pat Hobby Stories", author: "F. Scott Fitzgerald", pageCount: 160, genre: "Fiction", publicationDate: "1962", description: "Seventeen linked stories Fitzgerald wrote for Esquire in his final years, following a washed-up Hollywood screenwriter through the late studio era.", series: null, tier: 1, topRank: null },

  // Aldous Huxley (3)
  { title: "Those Barren Leaves", author: "Aldous Huxley", pageCount: 336, genre: "Fiction", publicationDate: "1925", description: "A satire of English expatriates gathered at an Italian villa, skewering their pretensions, their philosophies, and their dissatisfactions.", series: null, tier: 1, topRank: null },
  { title: "Time Must Have a Stop", author: "Aldous Huxley", pageCount: 320, genre: "Fiction", publicationDate: "1944", description: "A young English poet in fascist Florence is seduced by his libertine uncle, dies, and narrates part of the novel from the afterlife.", series: null, tier: 1, topRank: null },
  { title: "The Perennial Philosophy", author: "Aldous Huxley", pageCount: 320, genre: "Non-Fiction", publicationDate: "1945", description: "Huxley's anthology and commentary arguing that all the world's mystical traditions point toward the same underlying reality — his most influential religious work.", series: null, tier: 1, topRank: null },

  // Oscar Wilde (5)
  { title: "A Woman of No Importance", author: "Oscar Wilde", pageCount: 96, genre: "Fiction", publicationDate: "1893", description: "A society comedy in which an illegitimate son discovers that the dissolute lord he's about to go to work for is the man who ruined his mother.", series: null, tier: 1, topRank: null },
  { title: "The Canterville Ghost", author: "Oscar Wilde", pageCount: 64, genre: "Fiction", publicationDate: "1887", description: "A comedic ghost story in which an American family moves into an English stately home and thoroughly fails to be frightened by its hereditary ghost.", series: null, tier: 1, topRank: null },
  { title: "A House of Pomegranates", author: "Oscar Wilde", pageCount: 144, genre: "Fiction", publicationDate: "1891", description: "Wilde's second fairy tale collection: 'The Young King,' 'The Birthday of the Infanta,' 'The Fisherman and His Soul,' and 'The Star-Child' — darker and more aesthetic than The Happy Prince.", series: null, tier: 1, topRank: null },
  { title: "The Soul of Man Under Socialism", author: "Oscar Wilde", pageCount: 64, genre: "Non-Fiction", publicationDate: "1891", description: "Wilde's essay arguing that true individualism — and therefore art — can only flourish under a socialism that frees people from economic necessity.", series: null, tier: 1, topRank: null },
  { title: "Intentions", author: "Oscar Wilde", pageCount: 256, genre: "Non-Fiction", publicationDate: "1891", description: "Wilde's foundational aesthetic essays, including 'The Decay of Lying' and 'The Critic as Artist,' laying out his argument for art as superior to nature.", series: null, tier: 1, topRank: null },

  // Arthur Koestler (5)
  { title: "The Ghost in the Machine", author: "Arthur Koestler", pageCount: 384, genre: "Non-Fiction", publicationDate: "1967", description: "Koestler's holonic theory of evolution and mind, arguing that the human brain's hierarchical construction has built in a fatal tendency to fanaticism.", series: null, tier: 1, topRank: null },
  { title: "The Act of Creation", author: "Arthur Koestler", pageCount: 752, genre: "Non-Fiction", publicationDate: "1964", description: "Koestler's sprawling study of creativity — comic, scientific, and artistic — unifying them under his concept of 'bisociation.'", series: null, tier: 1, topRank: null },
  { title: "Arrival and Departure", author: "Arthur Koestler", pageCount: 192, genre: "Fiction", publicationDate: "1943", description: "A young revolutionary fleeing Nazi Europe arrives in a neutral country and slowly succumbs to psychoanalysis and disillusion — the third in Koestler's political novel cycle.", series: null, tier: 1, topRank: null },
  { title: "Thieves in the Night", author: "Arthur Koestler", pageCount: 368, genre: "Historical Fiction", publicationDate: "1946", description: "Koestler's novel of 1930s Zionist settlers building a kibbutz in British Mandate Palestine under pressure from Arab villagers and British police.", series: null, tier: 1, topRank: null },
  { title: "The Gladiators", author: "Arthur Koestler", pageCount: 320, genre: "Historical Fiction", publicationDate: "1939", description: "Koestler's first novel of revolution, reimagining the Spartacus slave revolt as a doomed utopian experiment — written during the Moscow Trials.", series: null, tier: 1, topRank: null },

  // Kahlil Gibran (5)
  { title: "The Madman", author: "Kahlil Gibran", pageCount: 80, genre: "Fiction", publicationDate: "1918", description: "Gibran's first English-language book: short parables and poems framed as confessions from a 'madman' who has found freedom in being thought insane.", series: null, tier: 1, topRank: null },
  { title: "The Forerunner", author: "Kahlil Gibran", pageCount: 80, genre: "Fiction", publicationDate: "1920", description: "A second collection of parables continuing Gibran's mystical voice — framed as messages from a figure preparing the way for a greater prophet.", series: null, tier: 1, topRank: null },
  { title: "Sand and Foam", author: "Kahlil Gibran", pageCount: 96, genre: "Fiction", publicationDate: "1926", description: "A book of aphorisms and prose poems distilling Gibran's reflections on love, death, beauty, and the soul.", series: null, tier: 1, topRank: null },
  { title: "Jesus, the Son of Man", author: "Kahlil Gibran", pageCount: 240, genre: "Fiction", publicationDate: "1928", description: "Gibran's retelling of the Gospel: seventy-seven short accounts from witnesses, friends, enemies, and strangers who encountered Christ.", series: null, tier: 1, topRank: null },
  { title: "The Wanderer", author: "Kahlil Gibran", pageCount: 80, genre: "Fiction", publicationDate: "1932", description: "Gibran's final book of parables, published the year after his death, continuing his mystical exploration of wisdom and solitude.", series: null, tier: 1, topRank: null },

  // Daphne du Maurier (5)
  { title: "The Scapegoat", author: "Daphne du Maurier", pageCount: 352, genre: "Fiction", publicationDate: "1957", description: "A lonely Englishman on holiday in France meets his double — a French count — who vanishes, leaving him to impersonate a stranger's life.", series: null, tier: 1, topRank: null },
  { title: "The King's General", author: "Daphne du Maurier", pageCount: 384, genre: "Historical Fiction", publicationDate: "1946", description: "A Cornish romance set during the English Civil War, centered on a woman crippled in an accident and the Royalist general who loves her.", series: null, tier: 1, topRank: null },
  { title: "The House on the Strand", author: "Daphne du Maurier", pageCount: 304, genre: "Fiction", publicationDate: "1969", description: "A man in contemporary Cornwall takes an experimental drug that lets him walk invisibly through 14th-century Cornwall — and becomes obsessed with a woman long dead.", series: null, tier: 1, topRank: null },
  { title: "The Parasites", author: "Daphne du Maurier", pageCount: 384, genre: "Fiction", publicationDate: "1949", description: "Three half-siblings, children of a great musical family, reckon with the legacy of their famous parents and each other.", series: null, tier: 1, topRank: null },
  { title: "The Glass-Blowers", author: "Daphne du Maurier", pageCount: 352, genre: "Historical Fiction", publicationDate: "1963", description: "A historical novel of a French glass-making family through the Revolution, based on du Maurier's own Busson ancestors.", series: null, tier: 1, topRank: null },

  // Georges Perec (1)
  { title: "Things: A Story of the Sixties", author: "Georges Perec", pageCount: 144, genre: "Fiction", publicationDate: "1965", description: "Perec's Prix Renaudot-winning debut: a young couple in Paris accumulates consumer goods and climbs the middle class, told entirely in the language of what they own and what they want to own.", series: null, tier: 1, topRank: null },

  // Ian McEwan (4)
  { title: "The Comfort of Strangers", author: "Ian McEwan", pageCount: 128, genre: "Fiction", publicationDate: "1981", description: "A young English couple on a Venetian holiday are befriended by an elegant, increasingly sinister local man — McEwan's compact early thriller of sexual menace.", series: null, tier: 1, topRank: null },
  { title: "The Child in Time", author: "Ian McEwan", pageCount: 224, genre: "Fiction", publicationDate: "1987", description: "A children's author whose daughter was abducted years earlier drifts through grief, a fractured marriage, and Thatcher-era Britain — winner of the Whitbread Novel Award.", series: null, tier: 1, topRank: null },
  { title: "First Love, Last Rites", author: "Ian McEwan", pageCount: 160, genre: "Fiction", publicationDate: "1975", description: "McEwan's debut story collection of unsettling, often grotesque adolescent encounters — the book that built his early reputation as 'Ian Macabre.'", series: null, tier: 1, topRank: null },
  { title: "The Daydreamer", author: "Ian McEwan", pageCount: 192, genre: "Young Adult", publicationDate: "1994", description: "A book of linked fables about a dreamy ten-year-old boy who, in his imagination, transforms into a cat, a baby, and an adult — written for McEwan's own children.", series: null, tier: 1, topRank: null },

  // Will Durant (5)
  { title: "The Story of Philosophy", author: "Will Durant", pageCount: 528, genre: "Non-Fiction", publicationDate: "1926", description: "Durant's accessible history of Western philosophy through nine key thinkers — the book that launched his career and made him a household name.", series: null, tier: 1, topRank: null },
  { title: "The Story of Civilization I: Our Oriental Heritage", author: "Will Durant", pageCount: 1049, genre: "History", publicationDate: "1935", description: "Volume one of Durant's 11-volume history: the ancient civilizations of Egypt, Mesopotamia, India, China, and Japan.", series: { name: "The Story of Civilization", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "The Story of Civilization II: The Life of Greece", author: "Will Durant", pageCount: 756, genre: "History", publicationDate: "1939", description: "Volume two: the Aegean, Homer, Athens at its height, Alexander, and the Hellenistic successors.", series: { name: "The Story of Civilization", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "The Story of Civilization III: Caesar and Christ", author: "Will Durant", pageCount: 751, genre: "History", publicationDate: "1944", description: "Volume three: the rise of Rome from republic through empire to the triumph of Christianity.", series: { name: "The Story of Civilization", order: 3, total: 11 }, tier: 1, topRank: null },
  { title: "The Story of Civilization IV: The Age of Faith", author: "Will Durant", pageCount: 1196, genre: "History", publicationDate: "1950", description: "Volume four: medieval Europe, Byzantium, and the Islamic world from Constantine to Dante.", series: { name: "The Story of Civilization", order: 4, total: 11 }, tier: 1, topRank: null },
];

console.log(`Will add ${ADDITIONS.length} books\n`);

// Sanity: check nothing is already in catalog
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
const duplicates = [];
const toAdd = [];
for (const a of ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) {
    duplicates.push(a);
  } else {
    toAdd.push(a);
    existingKeys.add(key);
  }
}

if (duplicates.length > 0) {
  console.log(`⚠ Skipping ${duplicates.length} entries already in catalog:`);
  for (const d of duplicates) console.log(`  - "${d.title}" — ${d.author}`);
  console.log("");
}

const next = books.concat(toAdd);
fs.writeFileSync(CATALOG, JSON.stringify(next));
const stat = fs.statSync(CATALOG);
console.log(`Added ${toAdd.length} books`);
console.log(`Before: ${before} | After: ${next.length}`);
console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

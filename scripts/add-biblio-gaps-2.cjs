const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

// Duplicates to remove (the ones WITHOUT the article — we keep the canonical versions)
const DELETE = [
  { title: "A Sentimental Education", author: "Gustave Flaubert" },
  { title: "Strange Case of Dr Jekyll and Mr Hyde", author: "Robert Louis Stevenson" },
];

const ADDITIONS = [
  // Honoré de Balzac (5)
  { title: "The Magic Skin", author: "Honoré de Balzac", pageCount: 304, genre: "Fiction", publicationDate: "1831", description: "A desperate young man in Paris acquires a magical wild-ass hide that grants any wish but shrinks with each one, costing the wisher a measure of his life.", series: null, tier: 1, topRank: null },
  { title: "The Chouans", author: "Honoré de Balzac", pageCount: 400, genre: "Historical Fiction", publicationDate: "1829", description: "Balzac's first novel under his own name: a historical romance of royalist Breton peasants resisting the French Revolution, featuring a seductive double agent sent to entrap their leader.", series: null, tier: 1, topRank: null },
  { title: "The Country Doctor", author: "Honoré de Balzac", pageCount: 288, genre: "Fiction", publicationDate: "1833", description: "Le Médecin de campagne: a physician who has fled personal tragedy transforms a remote Alpine village through tireless public works and medical care.", series: null, tier: 1, topRank: null },
  { title: "The Peasants", author: "Honoré de Balzac", pageCount: 432, genre: "Fiction", publicationDate: "1844", description: "An unfinished late novel about the inexorable destruction of an aristocratic estate by the Burgundian peasants who surround it — Balzac's grim vision of rural class war.", series: null, tier: 1, topRank: null },
  { title: "Scenes from a Courtesan's Life", author: "Honoré de Balzac", pageCount: 544, genre: "Fiction", publicationDate: "1847", description: "The direct continuation of Lost Illusions: Lucien de Rubempré falls under the protection of the master criminal Vautrin in a novel of high society, espionage, and police procedure.", series: null, tier: 1, topRank: null },

  // Nathaniel Hawthorne (5)
  { title: "The Blithedale Romance", author: "Nathaniel Hawthorne", pageCount: 272, genre: "Fiction", publicationDate: "1852", description: "Hawthorne's novel of a utopian Transcendentalist commune based loosely on his own experience at Brook Farm, narrated by an outsider who loves a charismatic feminist reformer.", series: null, tier: 1, topRank: null },
  { title: "The Marble Faun", author: "Nathaniel Hawthorne", pageCount: 448, genre: "Fiction", publicationDate: "1860", description: "Hawthorne's final novel, set among American artists in Rome: a mysterious murder, an innocent young woman, and a young man whose resemblance to a classical faun is more than skin deep.", series: null, tier: 1, topRank: null },
  { title: "Mosses from an Old Manse", author: "Nathaniel Hawthorne", pageCount: 400, genre: "Fiction", publicationDate: "1846", description: "Hawthorne's second major story collection, including 'Young Goodman Brown,' 'The Birth-Mark,' and 'Rappaccini's Daughter' — the book that made Melville declare him a genius.", series: null, tier: 1, topRank: null },
  { title: "Fanshawe", author: "Nathaniel Hawthorne", pageCount: 160, genre: "Fiction", publicationDate: "1828", description: "Hawthorne's first novel, published anonymously at his own expense at age 24 — he later tried to destroy every copy.", series: null, tier: 1, topRank: null },
  { title: "A Wonder-Book for Girls and Boys", author: "Nathaniel Hawthorne", pageCount: 224, genre: "Young Adult", publicationDate: "1852", description: "Hawthorne's retellings of Greek myths for children, including Perseus, Midas, Pandora, and Hercules.", series: null, tier: 1, topRank: null },

  // Herman Melville (4)
  { title: "Omoo", author: "Herman Melville", pageCount: 352, genre: "Fiction", publicationDate: "1847", description: "The sequel to Typee: Melville's narrator escapes his island captivity only to drift through the Society Islands as a beachcomber and mutineer.", series: null, tier: 1, topRank: null },
  { title: "Redburn", author: "Herman Melville", pageCount: 368, genre: "Fiction", publicationDate: "1849", description: "A semi-autobiographical novel of a proud young New Yorker's brutal education as a sailor on his first Atlantic crossing to Liverpool.", series: null, tier: 1, topRank: null },
  { title: "Pierre, or the Ambiguities", author: "Herman Melville", pageCount: 432, genre: "Fiction", publicationDate: "1852", description: "Melville's disastrously received follow-up to Moby-Dick: a young aristocrat abandons his fiancée to protect a mysterious woman claiming to be his half-sister, triggering his family's ruin.", series: null, tier: 1, topRank: null },
  { title: "Mardi", author: "Herman Melville", pageCount: 640, genre: "Fiction", publicationDate: "1849", description: "A South Seas travel narrative that transforms midway into a sprawling philosophical allegory — Melville's first attempt at the ambitious metaphysical fiction he'd perfect in Moby-Dick.", series: null, tier: 1, topRank: null },

  // Edgar Allan Poe (2)
  { title: "Tales of the Grotesque and Arabesque", author: "Edgar Allan Poe", pageCount: 544, genre: "Horror", publicationDate: "1840", description: "Poe's first published story collection, gathering twenty-five tales including 'The Fall of the House of Usher,' 'Ligeia,' and 'William Wilson.'", series: null, tier: 1, topRank: null },
  { title: "Eureka", author: "Edgar Allan Poe", pageCount: 144, genre: "Non-Fiction", publicationDate: "1848", description: "Poe's cosmological prose poem, proposing a Big Bang-like universe that expands and contracts eternally — the strange, late work he considered his masterpiece.", series: null, tier: 1, topRank: null },

  // Wilkie Collins (4)
  { title: "Basil", author: "Wilkie Collins", pageCount: 368, genre: "Fiction", publicationDate: "1852", description: "Collins's first major novel, a tale of obsession and class transgression: a young aristocrat secretly marries a linen-draper's daughter and learns her horrifying secrets.", series: null, tier: 1, topRank: null },
  { title: "The Law and the Lady", author: "Wilkie Collins", pageCount: 432, genre: "Mystery", publicationDate: "1875", description: "A young bride discovers her husband was tried for the murder of his first wife under the Scottish 'Not Proven' verdict — and sets out to clear his name.", series: null, tier: 1, topRank: null },
  { title: "The Haunted Hotel", author: "Wilkie Collins", pageCount: 224, genre: "Mystery", publicationDate: "1878", description: "A Venetian palazzo converted into a hotel hides the secret of a vanished English lord — a compact late Collins blending gothic horror with detective fiction.", series: null, tier: 1, topRank: null },
  { title: "The Black Robe", author: "Wilkie Collins", pageCount: 384, genre: "Fiction", publicationDate: "1881", description: "A sensation novel of a young widower pursued by a scheming Jesuit priest who wants him to bequeath his estate to the Church.", series: null, tier: 1, topRank: null },

  // Anthony Trollope (5)
  { title: "The Three Clerks", author: "Anthony Trollope", pageCount: 480, genre: "Fiction", publicationDate: "1858", description: "Trollope's semi-autobiographical novel of three young civil servants in the Weights and Measures Office, one of whom falls into financial temptation and disgrace.", series: null, tier: 1, topRank: null },
  { title: "The Claverings", author: "Anthony Trollope", pageCount: 496, genre: "Fiction", publicationDate: "1867", description: "A young engineer is jilted by the woman he loves for a wealthy baronet, then must decide whether to take her back when she returns to him widowed.", series: null, tier: 1, topRank: null },
  { title: "The Belton Estate", author: "Anthony Trollope", pageCount: 384, genre: "Fiction", publicationDate: "1866", description: "A young woman must choose between her ardent, boisterous cousin and the reserved aristocrat to whom she is engaged — one of Trollope's domestic studies of female decision.", series: null, tier: 1, topRank: null },
  { title: "The Vicar of Bullhampton", author: "Anthony Trollope", pageCount: 544, genre: "Fiction", publicationDate: "1870", description: "A rural vicar takes up the cause of a fallen woman, defying the local gentry and his own bishop — Trollope's most directly feminist novel.", series: null, tier: 1, topRank: null },
  { title: "An Eye for an Eye", author: "Anthony Trollope", pageCount: 256, genre: "Fiction", publicationDate: "1879", description: "A compact late novel: a young English officer seduces an Irish girl and must face the consequences of abandoning her when duty calls him elsewhere.", series: null, tier: 1, topRank: null },

  // Robert Louis Stevenson (3)
  { title: "The Black Arrow", author: "Robert Louis Stevenson", pageCount: 288, genre: "Historical Fiction", publicationDate: "1883", description: "A historical romance set during the Wars of the Roses: a young man exiled by his guardian takes up with a band of outlawed archers known by their black arrows of vengeance.", series: null, tier: 1, topRank: null },
  { title: "A Child's Garden of Verses", author: "Robert Louis Stevenson", pageCount: 128, genre: "Young Adult", publicationDate: "1885", description: "Stevenson's collection of short poems capturing childhood experience — the bedroom at night, the seaside holiday, the sick child's world — that became a Victorian nursery staple.", series: null, tier: 1, topRank: null },
  { title: "New Arabian Nights", author: "Robert Louis Stevenson", pageCount: 256, genre: "Fiction", publicationDate: "1882", description: "Stevenson's first prose collection, featuring 'The Suicide Club' and 'The Rajah's Diamond' — linked stories of a louche Bohemian prince and his adventures in modern London.", series: null, tier: 1, topRank: null },

  // Rudyard Kipling (6)
  { title: "The Second Jungle Book", author: "Rudyard Kipling", pageCount: 272, genre: "Young Adult", publicationDate: "1895", description: "Kipling's direct sequel to The Jungle Book, continuing Mowgli's story alongside new tales of Indian animals and their encounters with humans.", series: null, tier: 1, topRank: null },
  { title: "The Man Who Would Be King", author: "Rudyard Kipling", pageCount: 80, genre: "Fiction", publicationDate: "1888", description: "Kipling's most famous novella: two British adventurers attempt to become kings of a remote region of Afghanistan — with catastrophic results.", series: null, tier: 1, topRank: null },
  { title: "Puck of Pook's Hill", author: "Rudyard Kipling", pageCount: 288, genre: "Young Adult", publicationDate: "1906", description: "Two English children meet Puck, who summons figures from British history — Roman centurions, Norman knights, medieval builders — to tell them the country's hidden story.", series: null, tier: 1, topRank: null },
  { title: "Plain Tales from the Hills", author: "Rudyard Kipling", pageCount: 320, genre: "Fiction", publicationDate: "1888", description: "Kipling's first story collection, forty tales of British India drawn from his journalism — the book that launched his literary career.", series: null, tier: 1, topRank: null },
  { title: "Stalky & Co.", author: "Rudyard Kipling", pageCount: 288, genre: "Fiction", publicationDate: "1899", description: "A linked series of stories about three schoolboys at a Victorian English boarding school who specialize in outsmarting their masters — based on Kipling's own schooldays.", series: null, tier: 1, topRank: null },
  { title: "The Light That Failed", author: "Rudyard Kipling", pageCount: 288, genre: "Fiction", publicationDate: "1890", description: "Kipling's first novel: a war correspondent turned illustrator loses his sight at the height of his career and watches his life collapse.", series: null, tier: 1, topRank: null },

  // Ivan Turgenev (2)
  { title: "Rudin", author: "Ivan Turgenev", pageCount: 192, genre: "Fiction", publicationDate: "1857", description: "Turgenev's first novel: a charismatic, eloquent intellectual arrives at a country estate, inflames the daughter of the house with love and ideas — and proves fatally unable to act on either.", series: null, tier: 1, topRank: null },
  { title: "Home of the Gentry", author: "Ivan Turgenev", pageCount: 224, genre: "Fiction", publicationDate: "1859", description: "A middle-aged nobleman, separated from his faithless wife, returns to his country estate and falls in love with a devout young woman — Turgenev's meditation on belated love and Russian provincial decline.", series: null, tier: 1, topRank: null },

  // Joseph Conrad (3)
  { title: "Typhoon", author: "Joseph Conrad", pageCount: 160, genre: "Fiction", publicationDate: "1902", description: "Conrad's famous novella: a stolidly unimaginative British sea captain steers his steamer directly into the worst typhoon of his career, carrying two hundred Chinese coolies in the hold.", series: null, tier: 1, topRank: null },
  { title: "The Shadow-Line", author: "Joseph Conrad", pageCount: 160, genre: "Fiction", publicationDate: "1917", description: "A young officer accepts his first command — a sailing ship becalmed in the Gulf of Siam with a dying crew and a cursed predecessor's journal — Conrad's late masterpiece on the passage from youth.", series: null, tier: 1, topRank: null },
  { title: "The Nigger of the Narcissus", author: "Joseph Conrad", pageCount: 208, genre: "Fiction", publicationDate: "1897", description: "Conrad's early sea novel following the crew of a merchant ship carrying a dying Black sailor from Bombay to London — an early study of solidarity, death, and moral ambiguity under sail.", series: null, tier: 1, topRank: null },

  // Henry James (1)
  { title: "The American", author: "Henry James", pageCount: 384, genre: "Fiction", publicationDate: "1877", description: "James's early international novel: a self-made American millionaire in Paris falls in love with a young French aristocrat and collides with her family's ancient prejudices.", series: null, tier: 1, topRank: null },

  // Edith Wharton (5)
  { title: "The Touchstone", author: "Edith Wharton", pageCount: 128, genre: "Fiction", publicationDate: "1900", description: "Wharton's first novella: a young man in financial straits anonymously sells the love letters of a famous deceased novelist — and must live with what he has done.", series: null, tier: 1, topRank: null },
  { title: "The Valley of Decision", author: "Edith Wharton", pageCount: 640, genre: "Historical Fiction", publicationDate: "1902", description: "Wharton's first novel, set in 18th-century Italy: a young duke tries to bring Enlightenment reforms to his principality and is destroyed by revolution and the Church.", series: null, tier: 1, topRank: null },
  { title: "The Glimpses of the Moon", author: "Edith Wharton", pageCount: 320, genre: "Fiction", publicationDate: "1922", description: "Two impoverished members of New York society marry on the understanding that they will live for a year on their friends' hospitality and split amicably — until real feeling intervenes.", series: null, tier: 1, topRank: null },
  { title: "The Fruit of the Tree", author: "Edith Wharton", pageCount: 512, genre: "Fiction", publicationDate: "1907", description: "An idealistic factory manager, his wealthy second wife, and a nurse whose decision in an act of mercy haunts their marriage — Wharton's industrial novel.", series: null, tier: 1, topRank: null },
  { title: "The Greater Inclination", author: "Edith Wharton", pageCount: 256, genre: "Fiction", publicationDate: "1899", description: "Wharton's first story collection, the book that launched her career with eight tales of social entrapment among the Gilded Age elite.", series: null, tier: 1, topRank: null },

  // Willa Cather (6)
  { title: "One of Ours", author: "Willa Cather", pageCount: 464, genre: "Historical Fiction", publicationDate: "1922", description: "Cather's Pulitzer-winning novel of a restless Nebraska farm boy who finds meaning only in the trenches of World War I France.", series: null, tier: 1, topRank: null },
  { title: "Shadows on the Rock", author: "Willa Cather", pageCount: 288, genre: "Historical Fiction", publicationDate: "1931", description: "A quiet novel of French-Canadian life in 17th-century Quebec, centered on an apothecary and his young daughter enduring the frontier winter.", series: null, tier: 1, topRank: null },
  { title: "Youth and the Bright Medusa", author: "Willa Cather", pageCount: 304, genre: "Fiction", publicationDate: "1920", description: "Cather's story collection of young artists and singers pursuing their art — and the Bright Medusa of fame — across the American West and East.", series: null, tier: 1, topRank: null },
  { title: "My Mortal Enemy", author: "Willa Cather", pageCount: 122, genre: "Fiction", publicationDate: "1926", description: "A short, bitter novella tracing the decline of a once-glamorous couple whose great romantic marriage curdles into financial ruin and mutual contempt.", series: null, tier: 1, topRank: null },
  { title: "Sapphira and the Slave Girl", author: "Willa Cather", pageCount: 304, genre: "Historical Fiction", publicationDate: "1940", description: "Cather's final novel: a slaveholding Virginia matron conceives a jealous plot against a young enslaved woman she believes is her husband's lover.", series: null, tier: 1, topRank: null },
  { title: "The Troll Garden", author: "Willa Cather", pageCount: 144, genre: "Fiction", publicationDate: "1905", description: "Cather's first story collection, including 'Paul's Case' and 'A Wagner Matinée' — early glimpses of the provincial hunger for art that would shape her career.", series: null, tier: 1, topRank: null },

  // Theodore Dreiser (3)
  { title: "The Financier", author: "Theodore Dreiser", pageCount: 576, genre: "Fiction", publicationDate: "1912", description: "The first of Dreiser's Trilogy of Desire: a ruthless young Philadelphia broker rises, falls in the panic of 1873, and claws his way back — based on the life of Charles Yerkes.", series: { name: "Trilogy of Desire", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Titan", author: "Theodore Dreiser", pageCount: 560, genre: "Fiction", publicationDate: "1914", description: "The second in the Trilogy of Desire: Frank Cowperwood moves to Chicago and fights his way to the control of the city's street railways — and its high society.", series: { name: "Trilogy of Desire", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Stoic", author: "Theodore Dreiser", pageCount: 416, genre: "Fiction", publicationDate: "1947", description: "The posthumous final volume of the Trilogy of Desire: Cowperwood at the end of his life, in London, haunted by mortality and the limits of accumulation.", series: { name: "Trilogy of Desire", order: 3, total: 3 }, tier: 1, topRank: null },

  // Sinclair Lewis (1)
  { title: "Dodsworth", author: "Sinclair Lewis", pageCount: 384, genre: "Fiction", publicationDate: "1929", description: "A retired Midwestern auto magnate and his dissatisfied wife travel Europe — where she pursues glamorous affairs and he slowly discovers what he really wants.", series: null, tier: 1, topRank: null },

  // Jack London (5)
  { title: "The Call of the Wild", author: "Jack London", pageCount: 170, genre: "Fiction", publicationDate: "1903", description: "London's most famous novel: a pampered California dog is stolen, sold as a sled dog in the Klondike, and gradually answers the call of his ancestral wildness.", series: null, tier: 1, topRank: null },
  { title: "The Iron Heel", author: "Jack London", pageCount: 354, genre: "Sci-Fi", publicationDate: "1908", description: "One of the earliest dystopian novels: an American socialist uprising crushed by an oligarchic capitalist 'Iron Heel,' framed as a manuscript rediscovered seven centuries later.", series: null, tier: 1, topRank: null },
  { title: "Before Adam", author: "Jack London", pageCount: 160, genre: "Fiction", publicationDate: "1907", description: "A man in modern America experiences the dream-memories of a prehistoric ancestor — London's speculative novel of human evolution.", series: null, tier: 1, topRank: null },
  { title: "The People of the Abyss", author: "Jack London", pageCount: 224, genre: "Non-Fiction", publicationDate: "1903", description: "London's first-person journalism of disguising himself as an unemployed sailor and living in the London East End slums — an early work of immersive poverty reporting.", series: null, tier: 1, topRank: null },
  { title: "The Scarlet Plague", author: "Jack London", pageCount: 128, genre: "Sci-Fi", publicationDate: "1912", description: "Post-apocalyptic novella set in 2073: an old survivor of a devastating plague tries to tell his feral grandsons about the vanished world of 2013.", series: null, tier: 1, topRank: null },

  // H.G. Wells (5)
  { title: "The History of Mr. Polly", author: "H.G. Wells", pageCount: 240, genre: "Fiction", publicationDate: "1910", description: "A dyspeptic English shopkeeper stages his own death to escape a failing marriage and a life of quiet desperation — Wells's most beloved comic novel.", series: null, tier: 1, topRank: null },
  { title: "Kipps", author: "H.G. Wells", pageCount: 336, genre: "Fiction", publicationDate: "1905", description: "A semi-autobiographical comic novel: a draper's assistant unexpectedly inherits a fortune, tries to climb into society, and discovers the trap he has stepped into.", series: null, tier: 1, topRank: null },
  { title: "Love and Mr. Lewisham", author: "H.G. Wells", pageCount: 320, genre: "Fiction", publicationDate: "1900", description: "A young science student's ambition collides with love and marriage — Wells's first serious mainstream novel outside his scientific romances.", series: null, tier: 1, topRank: null },
  { title: "The World Set Free", author: "H.G. Wells", pageCount: 256, genre: "Sci-Fi", publicationDate: "1914", description: "Wells's prophetic novel: in 1956, atomic bombs end World War II and force the creation of a world government — the book that coined the phrase 'atomic bomb' decades before one existed.", series: null, tier: 1, topRank: null },
  { title: "In the Days of the Comet", author: "H.G. Wells", pageCount: 320, genre: "Sci-Fi", publicationDate: "1906", description: "A jealous suitor pursuing his former lover is interrupted when Earth passes through the tail of a comet whose gases transform human nature into rational benevolence.", series: null, tier: 1, topRank: null },

  // Virginia Woolf (3)
  { title: "Flush", author: "Virginia Woolf", pageCount: 176, genre: "Fiction", publicationDate: "1933", description: "Woolf's fictional biography of Elizabeth Barrett Browning's cocker spaniel Flush — a sly, affectionate experiment in narrative voice and literary biography.", series: null, tier: 1, topRank: null },
  { title: "The Years", author: "Virginia Woolf", pageCount: 448, genre: "Fiction", publicationDate: "1937", description: "Woolf's most commercially successful novel: a sprawling chronicle of the Pargiter family from 1880 to the present, tracking a half-century of English social change.", series: null, tier: 1, topRank: null },
  { title: "Three Guineas", author: "Virginia Woolf", pageCount: 192, genre: "Non-Fiction", publicationDate: "1938", description: "Woolf's book-length feminist essay framed as three letters, arguing that the causes of war and the subjugation of women are one and the same fight.", series: null, tier: 1, topRank: null },

  // Graham Greene (1)
  { title: "A Gun for Sale", author: "Graham Greene", pageCount: 224, genre: "Thriller", publicationDate: "1936", description: "One of Greene's early 'entertainments': a harelipped hired killer, betrayed after a political assassination, is pursued across England by a police inspector's fiancée.", series: null, tier: 1, topRank: null },

  // Evelyn Waugh (1)
  { title: "Put Out More Flags", author: "Evelyn Waugh", pageCount: 256, genre: "Fiction", publicationDate: "1942", description: "Waugh's Phoney War satire, gathering characters from his 1930s novels for a comic panorama of upper-class England stumbling through the first year of World War II.", series: null, tier: 1, topRank: null },

  // Arthur C. Clarke (5)
  { title: "The Sands of Mars", author: "Arthur C. Clarke", pageCount: 224, genre: "Sci-Fi", publicationDate: "1951", description: "Clarke's first novel: a science-fiction writer visits the Mars colony and uncovers the settlers' secret plan to terraform the planet.", series: null, tier: 1, topRank: null },
  { title: "A Fall of Moondust", author: "Arthur C. Clarke", pageCount: 240, genre: "Sci-Fi", publicationDate: "1961", description: "A tourist cruiser on the lunar Sea of Thirst is swallowed by dust and sinks beneath the surface — Clarke's compact disaster novel, once nominated for the Hugo.", series: null, tier: 1, topRank: null },
  { title: "Islands in the Sky", author: "Arthur C. Clarke", pageCount: 192, genre: "Sci-Fi", publicationDate: "1952", description: "Clarke's first juvenile novel: a teenage winner of a TV contest gets his prize — a trip to the orbiting space station — and the education it provides.", series: null, tier: 1, topRank: null },
  { title: "Expedition to Earth", author: "Arthur C. Clarke", pageCount: 224, genre: "Sci-Fi", publicationDate: "1953", description: "Clarke's early story collection, including 'The Sentinel' (the seed of 2001) and 'The Nine Billion Names of God.'", series: null, tier: 1, topRank: null },
  { title: "Profiles of the Future", author: "Arthur C. Clarke", pageCount: 272, genre: "Non-Fiction", publicationDate: "1962", description: "Clarke's essays on the shape of the coming century — robotics, space elevators, suspended animation — where he first formulated his three famous laws of prediction.", series: null, tier: 1, topRank: null },

  // Frank Herbert (3)
  { title: "The Jesus Incident", author: "Frank Herbert", pageCount: 416, genre: "Sci-Fi", publicationDate: "1979", description: "Herbert's collaboration with Bill Ransom, a sequel to Destination: Void about a ship-god, a far colony world of sentient plants, and a planned genetic future.", series: null, tier: 1, topRank: null },
  { title: "The Santaroga Barrier", author: "Frank Herbert", pageCount: 256, genre: "Sci-Fi", publicationDate: "1968", description: "A market researcher is sent to investigate why no advertising or retail chain can penetrate a single isolated California valley — and discovers its residents share a mind.", series: null, tier: 1, topRank: null },
  { title: "The Godmakers", author: "Frank Herbert", pageCount: 224, genre: "Sci-Fi", publicationDate: "1972", description: "A post-galactic-war agency hunts planets showing early signs of breeding new destructive civilizations — and the agency's best operative begins to change in unforeseen ways.", series: null, tier: 1, topRank: null },

  // Philip Pullman (6)
  { title: "The Ruby in the Smoke", author: "Philip Pullman", pageCount: 230, genre: "Young Adult", publicationDate: "1985", description: "The first Sally Lockhart mystery: a young woman orphaned in 1872 London investigates her father's mysterious death and walks into a web of opium smugglers.", series: { name: "Sally Lockhart", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Shadow in the North", author: "Philip Pullman", pageCount: 320, genre: "Young Adult", publicationDate: "1986", description: "The second Sally Lockhart mystery: now a financial consultant, Sally investigates a ruined railway scheme and a sinister Swedish industrialist with links to a stage magician.", series: { name: "Sally Lockhart", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "The Tiger in the Well", author: "Philip Pullman", pageCount: 416, genre: "Young Adult", publicationDate: "1991", description: "The third Sally Lockhart mystery: Sally, now a single mother, is targeted by a mysterious stranger who claims to be her legal husband — and wants to take her child.", series: { name: "Sally Lockhart", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "The Tin Princess", author: "Philip Pullman", pageCount: 304, genre: "Young Adult", publicationDate: "1994", description: "The fourth Sally Lockhart mystery: Becky and Jim are drawn into the politics of a tiny central European princedom and the fate of its reluctant teenage queen.", series: { name: "Sally Lockhart", order: 4, total: 4 }, tier: 1, topRank: null },
  { title: "Clockwork", author: "Philip Pullman", pageCount: 112, genre: "Young Adult", publicationDate: "1996", description: "A dark German fairy tale nested like clockwork: a failed clockmaker's apprentice, a traveling storyteller, and a gift from a demonic stranger converge on one winter night.", series: null, tier: 1, topRank: null },
  { title: "The Good Man Jesus and the Scoundrel Christ", author: "Philip Pullman", pageCount: 272, genre: "Fiction", publicationDate: "2010", description: "Pullman's provocative retelling of the Gospels: Mary bears twins — Jesus, the good preacher, and Christ, the calculating chronicler who invents the institutional church.", series: null, tier: 1, topRank: null },
];

console.log(`Will add ${ADDITIONS.length} books and remove ${DELETE.length} duplicates\n`);

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

// Deletions
console.log("DUPLICATE REMOVALS:");
const toDelete = new Set();
for (const d of DELETE) {
  const idx = books.findIndex(b => b.title === d.title && b.author === d.author);
  if (idx === -1) console.log(`  ✗ NOT FOUND: "${d.title}" — ${d.author}`);
  else { toDelete.add(idx); console.log(`  ✓ delete: "${d.title}" — ${d.author}`); }
}
const filtered = books.filter((_, i) => !toDelete.has(i));

// Additions (skip duplicates)
const existingKeys = new Set(filtered.map(b => (b.title + "|" + b.author).toLowerCase()));
const duplicates = [];
const toAdd = [];
for (const a of ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) duplicates.push(a);
  else { toAdd.push(a); existingKeys.add(key); }
}

if (duplicates.length > 0) {
  console.log(`\n⚠ Skipping ${duplicates.length} add-duplicates:`);
  for (const d of duplicates) console.log(`  - "${d.title}" — ${d.author}`);
}

const next = filtered.concat(toAdd);
fs.writeFileSync(CATALOG, JSON.stringify(next));
const stat = fs.statSync(CATALOG);
console.log(`\nAdded ${toAdd.length} books, removed ${toDelete.size} duplicates`);
console.log(`Before: ${before} | After: ${next.length}`);
console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

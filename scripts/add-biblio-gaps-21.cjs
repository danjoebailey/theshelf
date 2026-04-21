const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Rebecca Ross (3)
  { title: "A Fire Endless", author: "Rebecca Ross", pageCount: 496, genre: "Fantasy", publicationDate: "2022", description: "The second Elements of Cadence novel: Jack Tamerlaine and Adaira Tamerlaine must face the consequences of their magical bargain with the spirits of Cadence.", series: { name: "Elements of Cadence", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "Dreams Lie Beneath", author: "Rebecca Ross", pageCount: 464, genre: "Young Adult", publicationDate: "2022", description: "In a town where every seventh night is the Dreaming, a young dreamwarden hunts the creatures that prey on sleepers — and discovers her rival is after the same monster.", series: null, tier: 1, topRank: null },
  { title: "Sisters of Sword and Song", author: "Rebecca Ross", pageCount: 384, genre: "Young Adult", publicationDate: "2020", description: "Two sisters in a Greek-inspired kingdom are reunited after eight years apart and are drawn into a plot to overthrow the dying tyrant who rules their land.", series: null, tier: 1, topRank: null },

  // Hannah Whitten (2)
  { title: "For the Wolf", author: "Hannah Whitten", pageCount: 448, genre: "Fantasy", publicationDate: "2021", description: "The first Wilderwood novel: in a northern kingdom where the second daughter of every generation is sacrificed to the forest-god, the latest Second Daughter decides not to die quietly.", series: { name: "The Wilderwood", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "For the Throne", author: "Hannah Whitten", pageCount: 464, genre: "Fantasy", publicationDate: "2022", description: "The Wilderwood #2: Red's sister Neve is lost in the Shadowlands with the Kings of old — and Red and Eammon must follow her through the roots of the Wilderwood to save her.", series: { name: "The Wilderwood", order: 2, total: 2 }, tier: 1, topRank: null },

  // Olivie Blake (2)
  { title: "Masters of Death", author: "Olivie Blake", pageCount: 448, genre: "Fantasy", publicationDate: "2019", description: "An immortal vampire real-estate agent, a tired Death, and a fortune-telling demigod chase a stolen afterlife on a very strange contract — Blake's supernatural comedy novel.", series: null, tier: 1, topRank: null },
  { title: "Alone with You in the Ether", author: "Olivie Blake", pageCount: 384, genre: "Fiction", publicationDate: "2021", description: "Blake's contemporary romance about a bipolar physicist and a manic-depressive heiress artist who meet by chance on a Chicago L train and change each other's lives.", series: null, tier: 1, topRank: null },

  // Allison Saft (2)
  { title: "A Far Wilder Magic", author: "Allison Saft", pageCount: 368, genre: "Young Adult", publicationDate: "2022", description: "A young witch and the son of a fading alchemy dynasty team up to hunt the hala — the legendary white fox whose blood grants miracles — during a weeks-long competition.", series: null, tier: 1, topRank: null },
  { title: "Down Comes the Night", author: "Allison Saft", pageCount: 416, genre: "Young Adult", publicationDate: "2021", description: "Saft's debut: a disgraced healer in a cold northern kingdom is hired by a mysterious nobleman to treat a dying man — who turns out to be her country's enemy.", series: null, tier: 1, topRank: null },

  // Xiran Jay Zhao (1)
  { title: "Zachary Ying and the Dragon Emperor", author: "Xiran Jay Zhao", pageCount: 352, genre: "Young Adult", publicationDate: "2022", description: "A Chinese-American 12-year-old discovers his VR headset is a vessel for the spirit of the First Emperor of China — and that he's been chosen to seal the ancient seal of Qin Shi Huang.", series: { name: "Zachary Ying", order: 1, total: 2 }, tier: 1, topRank: null },

  // Tananarive Due (2)
  { title: "The Between", author: "Tananarive Due", pageCount: 304, genre: "Horror", publicationDate: "1995", description: "Due's debut: a Florida social worker saved from drowning as a child begins to see dead things everywhere — and realizes he was never supposed to be alive.", series: null, tier: 1, topRank: null },
  { title: "My Soul to Take", author: "Tananarive Due", pageCount: 432, genre: "Horror", publicationDate: "2011", description: "African Immortals #4: Fana Wolde, daughter of the Living Blood lineage, is being hunted by both her immortal relatives and human military forces in a scorched-earth conflict.", series: { name: "African Immortals", order: 4, total: 4 }, tier: 1, topRank: null },

  // V. Castro (3)
  { title: "Goddess of Filth", author: "V. Castro", pageCount: 144, genre: "Horror", publicationDate: "2021", description: "A group of Mexican-American teens in South Texas conduct a séance, and the possessed one develops abilities that seem divine rather than demonic.", series: null, tier: 1, topRank: null },
  { title: "The Haunting of Alejandra", author: "V. Castro", pageCount: 304, genre: "Horror", publicationDate: "2023", description: "An unhappy suburban mother is haunted by La Llorona — and discovers the wailing woman has been hunting the women of her family for generations.", series: null, tier: 1, topRank: null },
  { title: "Mestiza Blood", author: "V. Castro", pageCount: 208, genre: "Horror", publicationDate: "2022", description: "Castro's story collection: thirteen tales drawing on Chicana, Aztec, and contemporary Latinx horror traditions.", series: null, tier: 1, topRank: null },

  // Julie Kagawa (2)
  { title: "Talon", author: "Julie Kagawa", pageCount: 464, genre: "Young Adult", publicationDate: "2014", description: "The first Talon Saga novel: a teenage dragon passing as human at a California beach town to learn to blend in with her enemy is drawn to one of the hunters sent to kill her.", series: { name: "Talon Saga", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Immortal Rules", author: "Julie Kagawa", pageCount: 512, genre: "Young Adult", publicationDate: "2012", description: "The first Blood of Eden novel: a starving girl in a vampire-ruled near-future city is turned into a vampire herself and joins a band of uninfected refugees fleeing the plague.", series: { name: "Blood of Eden", order: 1, total: 3 }, tier: 1, topRank: null },

  // Michael Chabon (1)
  { title: "Gentlemen of the Road", author: "Michael Chabon", pageCount: 240, genre: "Historical Fiction", publicationDate: "2007", description: "Chabon's short swashbuckling novel originally serialized in the New York Times: two Jewish swords-for-hire in 10th-century Khazaria are hired to restore a prince to his throne.", series: null, tier: 1, topRank: null },

  // Karen Russell (1)
  { title: "The Antidote", author: "Karen Russell", pageCount: 432, genre: "Fiction", publicationDate: "2025", description: "Russell's second novel: in a Dust Bowl-era Nebraska town, a 'prairie witch' stores the secrets of her neighbors in her own body as a plague moves west.", series: null, tier: 1, topRank: null },

  // Aimee Bender (2)
  { title: "The Color Master", author: "Aimee Bender", pageCount: 240, genre: "Fiction", publicationDate: "2013", description: "Bender's third story collection: fifteen tales of magical realism from modern California and further — love, loss, and the exquisite strangeness of bodies.", series: null, tier: 1, topRank: null },
  { title: "An Invisible Sign of My Own", author: "Aimee Bender", pageCount: 256, genre: "Fiction", publicationDate: "2000", description: "Bender's first novel: a young math teacher in a small town obsessed with numbers discovers one of her students is also counting down to something.", series: null, tier: 1, topRank: null },

  // Yoko Ogawa (2)
  { title: "Hotel Iris", author: "Yoko Ogawa", pageCount: 176, genre: "Fiction", publicationDate: "1996", description: "A 17-year-old Japanese girl working at her mother's seaside hotel becomes obsessed with an older translator — and is drawn into a masochistic affair with him.", series: null, tier: 1, topRank: null },
  { title: "The Diving Pool", author: "Yoko Ogawa", pageCount: 176, genre: "Fiction", publicationDate: "1990", description: "Three novellas of quiet, unsettling obsession: a girl with an unrequited crush on a foster brother, a woman keeping a pregnancy diary, and a student visiting an old dormitory.", series: null, tier: 1, topRank: null },

  // Hiromi Kawakami (2)
  { title: "Manazuru", author: "Hiromi Kawakami", pageCount: 224, genre: "Fiction", publicationDate: "2006", description: "A woman whose husband disappeared years earlier travels repeatedly to the seaside town of Manazuru and begins to see a figure following her.", series: null, tier: 1, topRank: null },
  { title: "The Ten Loves of Nishino", author: "Hiromi Kawakami", pageCount: 240, genre: "Fiction", publicationDate: "2003", description: "Ten short stories about the same mysterious man, told by the ten very different women who loved him in succession — Kawakami's mosaic romance.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // C.L. Polk (4)
  { title: "Witchmark", author: "C.L. Polk", pageCount: 320, genre: "Fantasy", publicationDate: "2018", description: "The first Kingston Cycle: a secretly magical veteran passing as a doctor in a near-Edwardian fantasy capital is drawn into a dying aristocrat's revelations about his own family.", series: { name: "Kingston Cycle", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Stormsong", author: "C.L. Polk", pageCount: 368, genre: "Fantasy", publicationDate: "2020", description: "Kingston Cycle #2: Dame Grace Hensley must navigate the political collapse of her country's weather-magic system and her own engagement to a man she doesn't want.", series: { name: "Kingston Cycle", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Soulstar", author: "C.L. Polk", pageCount: 320, genre: "Fantasy", publicationDate: "2021", description: "Kingston Cycle #3: Robin Thorpe faces the legal and political aftermath of the Storm Queens' fall and the reemergence of liberated witches into society.", series: { name: "Kingston Cycle", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "Even Though I Knew the End", author: "C.L. Polk", pageCount: 144, genre: "Fantasy", publicationDate: "2022", description: "A 1940s Chicago magical private eye who sold her soul ten years ago takes one last case to earn back her redemption — Polk's Nebula-winning noir novella.", series: null, tier: 1, topRank: null },

  // Adalyn Grace (3)
  { title: "All the Stars and Teeth", author: "Adalyn Grace", pageCount: 384, genre: "Young Adult", publicationDate: "2020", description: "The first All the Stars and Teeth novel: a princess of a kingdom of island sorcerers must complete a deadly trial at sea to prove herself the rightful heir.", series: { name: "All the Stars and Teeth", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Belladonna", author: "Adalyn Grace", pageCount: 416, genre: "Young Adult", publicationDate: "2022", description: "The first Belladonna novel: a 19th-century orphan who cannot die begins investigating her own immortality — and meets the charming, seductive incarnation of Death.", series: { name: "Belladonna", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Foxglove", author: "Adalyn Grace", pageCount: 448, genre: "Young Adult", publicationDate: "2023", description: "Belladonna #2: Signa must navigate her aunt's high-society ball and the reappearance of Fate — Death's sworn nemesis — in human form.", series: { name: "Belladonna", order: 2, total: 3 }, tier: 1, topRank: null },

  // Gabino Iglesias (3)
  { title: "The Devil Takes You Home", author: "Gabino Iglesias", pageCount: 320, genre: "Horror", publicationDate: "2022", description: "A grieving father takes on a cartel murder contract and finds himself on a road trip of blood and Mexican folklore that will change him forever.", series: null, tier: 1, topRank: null },
  { title: "Coyote Songs", author: "Gabino Iglesias", pageCount: 240, genre: "Horror", publicationDate: "2018", description: "Iglesias's barrio-noir mosaic: six linked stories of the US-Mexico borderlands where cartel violence, old magic, and the Chicana imagination collide.", series: null, tier: 1, topRank: null },
  { title: "Zero Saints", author: "Gabino Iglesias", pageCount: 224, genre: "Horror", publicationDate: "2015", description: "Iglesias's debut: a Mexican drug runner in Austin witnesses a cartel-assisted black-magic ritual and must fight back with his own fractured faith.", series: null, tier: 1, topRank: null },

  // Robert J. Sawyer (4)
  { title: "Hominids", author: "Robert J. Sawyer", pageCount: 448, genre: "Sci-Fi", publicationDate: "2002", description: "The first Neanderthal Parallax: a parallel Earth where Neanderthals became the dominant hominid accidentally bridges with our world and sends one of its scientists through.", series: { name: "Neanderthal Parallax", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Humans", author: "Robert J. Sawyer", pageCount: 448, genre: "Sci-Fi", publicationDate: "2003", description: "Neanderthal Parallax #2: Ponter Boddit returns to the Homo sapiens Earth, and the two civilizations begin a cross-species diplomatic and scientific relationship.", series: { name: "Neanderthal Parallax", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Calculating God", author: "Robert J. Sawyer", pageCount: 368, genre: "Sci-Fi", publicationDate: "2000", description: "An alien arrives at the Royal Ontario Museum and asks to see a paleontologist — and explains that his civilization has scientific proof of God's existence.", series: null, tier: 1, topRank: null },
  { title: "Flashforward", author: "Robert J. Sawyer", pageCount: 336, genre: "Sci-Fi", publicationDate: "1999", description: "A CERN experiment causes every human on Earth to briefly experience their own future 21 years from now — and then tries to figure out whether that future is inevitable.", series: null, tier: 1, topRank: null },

  // Julie Czerneda (3)
  { title: "A Thousand Words for Stranger", author: "Julie Czerneda", pageCount: 384, genre: "Sci-Fi", publicationDate: "1997", description: "The first Trade Pact novel: an amnesiac woman on an alien freighter discovers she belongs to a secretive telepathic species called the Clan — and must find her way home.", series: { name: "Trade Pact", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Beholder's Eye", author: "Julie Czerneda", pageCount: 384, genre: "Sci-Fi", publicationDate: "1998", description: "The first Web Shifters novel: an eons-old shapeshifter pretending to be an ordinary human scientist is drawn into a galactic crisis only her species can solve.", series: { name: "Web Shifters", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Survival", author: "Julie Czerneda", pageCount: 480, genre: "Sci-Fi", publicationDate: "2004", description: "The first Species Imperative novel: a Canadian salmon biologist is recruited by a galactic committee investigating an alien mass migration that feels uncomfortably familiar.", series: { name: "Species Imperative", order: 1, total: 3 }, tier: 1, topRank: null },

  // Taylor Anderson (3)
  { title: "Into the Storm", author: "Taylor Anderson", pageCount: 400, genre: "Sci-Fi", publicationDate: "2008", description: "The first Destroyermen novel: a WWII American destroyer fleeing the Japanese is caught in a squall and emerges in a parallel Earth where dinosaurs never went extinct.", series: { name: "Destroyermen", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "Crusade", author: "Taylor Anderson", pageCount: 384, genre: "Sci-Fi", publicationDate: "2008", description: "Destroyermen #2: the USS Walker crew must forge alliances with the cat-like Lemurians and prepare for the Grik's inevitable counterattack.", series: { name: "Destroyermen", order: 2, total: 15 }, tier: 1, topRank: null },
  { title: "Maelstrom", author: "Taylor Anderson", pageCount: 400, genre: "Sci-Fi", publicationDate: "2009", description: "Destroyermen #3: the stakes rise as the Grik swarm overwhelms the Lemurian homelands and the Walker must figure out how to survive a continent-spanning war.", series: { name: "Destroyermen", order: 3, total: 15 }, tier: 1, topRank: null },

  // B.V. Larson (3)
  { title: "Steel World", author: "B.V. Larson", pageCount: 384, genre: "Sci-Fi", publicationDate: "2013", description: "The first Undying Mercenaries novel: a broke college dropout signs up for Earth's space-legion mercenary program, where soldiers can be revived after death.", series: { name: "Undying Mercenaries", order: 1, total: 20 }, tier: 1, topRank: null },
  { title: "Mech 12: The Battlestar", author: "B.V. Larson", pageCount: 304, genre: "Sci-Fi", publicationDate: "2009", description: "A military SF standalone: a giant walking war-machine's commander faces an alien invasion that has already devastated Earth's fleet.", series: null, tier: 1, topRank: null },
  { title: "Swarm", author: "B.V. Larson", pageCount: 320, genre: "Sci-Fi", publicationDate: "2010", description: "The first Star Force novel: a computer programmer is kidnapped by an alien nanite-based ship and conscripted into a secret war against an even worse enemy.", series: { name: "Star Force", order: 1, total: 13 }, tier: 1, topRank: null },

  // Evan Currie (3)
  { title: "Into the Black", author: "Evan Currie", pageCount: 496, genre: "Sci-Fi", publicationDate: "2010", description: "The first Odyssey One novel: humanity's first faster-than-light ship makes contact with a dying alien federation — and is immediately caught in their war.", series: { name: "Odyssey One", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The Heart of Matter", author: "Evan Currie", pageCount: 496, genre: "Sci-Fi", publicationDate: "2012", description: "Odyssey One #2: Captain Eric Weston's Odyssey-class starship is sent to help defend the alien Priminae homeworld against an inexorable alien invasion.", series: { name: "Odyssey One", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "On Silver Wings", author: "Evan Currie", pageCount: 384, genre: "Sci-Fi", publicationDate: "2010", description: "The first Hayden War Cycle novel: Sergeant Sorilla Aida leads a doomed holding action against an alien invasion on a colony world and is rescued into a larger war.", series: { name: "Hayden War Cycle", order: 1, total: 7 }, tier: 1, topRank: null },

  // Joshua Dalzelle (3)
  { title: "Warship", author: "Joshua Dalzelle", pageCount: 320, genre: "Sci-Fi", publicationDate: "2014", description: "The first Black Fleet Trilogy novel: a fleet captain assigned a decrepit ship on the Confederate Navy's frontier discovers his quiet patrol is the opening move of a surprise war.", series: { name: "Black Fleet Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Call to Arms", author: "Joshua Dalzelle", pageCount: 336, genre: "Sci-Fi", publicationDate: "2014", description: "Black Fleet #2: Captain Wolfe's Black Fleet must integrate with the regular Navy to hunt down an alien invader exploiting the Confederacy's political paralysis.", series: { name: "Black Fleet Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Counterstrike", author: "Joshua Dalzelle", pageCount: 336, genre: "Sci-Fi", publicationDate: "2015", description: "Black Fleet #3: Wolfe leads a counter-strike into enemy space as the alien enemy reveals itself to be the advance element of something far more dangerous.", series: { name: "Black Fleet Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },

  // Rachel Caine (4)
  { title: "Ink and Bone", author: "Rachel Caine", pageCount: 368, genre: "Young Adult", publicationDate: "2015", description: "The first Great Library novel: in an alternate world where the Library of Alexandria never burned, owning a private book is a capital crime — and a young smuggler gets drafted into the Library's service.", series: { name: "The Great Library", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Glass Houses", author: "Rachel Caine", pageCount: 256, genre: "Young Adult", publicationDate: "2006", description: "The first Morganville Vampires novel: a brilliant teenager at a Texas college discovers the town is secretly run by vampires — and her roommates' protection may not be enough.", series: { name: "Morganville Vampires", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "Working Stiff", author: "Rachel Caine", pageCount: 352, genre: "Fantasy", publicationDate: "2011", description: "The first Revivalist novel: a Dallas zombie reanimation specialist is murdered on the job and reanimates herself — and must survive long enough to solve her own killing.", series: { name: "Revivalist", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Stillhouse Lake", author: "Rachel Caine", pageCount: 304, genre: "Thriller", publicationDate: "2017", description: "The ex-wife of a convicted serial killer tries to build a new life for her kids in an isolated lake community — and discovers her past has followed her there.", series: { name: "Stillhouse Lake", order: 1, total: 5 }, tier: 1, topRank: null },

  // MaryJanice Davidson (3)
  { title: "Undead and Unwed", author: "MaryJanice Davidson", pageCount: 304, genre: "Romance", publicationDate: "2004", description: "The first Betsy the Vampire Queen novel: a shoe-obsessed secretary is killed in a car accident, wakes up as a vampire, and discovers she is the prophesied queen of the undead.", series: { name: "Queen Betsy", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "Undead and Unemployed", author: "MaryJanice Davidson", pageCount: 304, genre: "Romance", publicationDate: "2004", description: "Queen Betsy #2: Betsy tries to hold down a retail job at a Macy's designer shoe department while balancing her vampire queen duties and a serial killer targeting the undead.", series: { name: "Queen Betsy", order: 2, total: 15 }, tier: 1, topRank: null },
  { title: "Derik's Bane", author: "MaryJanice Davidson", pageCount: 288, genre: "Romance", publicationDate: "2005", description: "A werewolf enforcer of the Wyndham pack is sent to kill a mysterious woman in California — who turns out to be the most powerful witch on the West Coast.", series: { name: "Wyndham Werewolves", order: 1, total: 3 }, tier: 1, topRank: null },

  // Kat Richardson (3)
  { title: "Greywalker", author: "Kat Richardson", pageCount: 352, genre: "Fantasy", publicationDate: "2006", description: "The first Greywalker novel: a Seattle private investigator wakes from a two-minute death with the ability to walk in the Grey — the space between the living and the dead.", series: { name: "Greywalker", order: 1, total: 9 }, tier: 1, topRank: null },
  { title: "Poltergeist", author: "Kat Richardson", pageCount: 352, genre: "Fantasy", publicationDate: "2007", description: "Greywalker #2: Harper Blaine is hired to investigate a fraudulent poltergeist experiment at a Seattle university — and discovers it may be creating a real one.", series: { name: "Greywalker", order: 2, total: 9 }, tier: 1, topRank: null },
  { title: "Underground", author: "Kat Richardson", pageCount: 352, genre: "Fantasy", publicationDate: "2008", description: "Greywalker #3: a rash of killings in Seattle's homeless community leads Harper into the city's buried underground — and its old, angry ghosts.", series: { name: "Greywalker", order: 3, total: 9 }, tier: 1, topRank: null },

  // Karen Chance (3)
  { title: "Touch the Dark", author: "Karen Chance", pageCount: 320, genre: "Fantasy", publicationDate: "2006", description: "The first Cassandra Palmer novel: a clairvoyant raised by the vampire mafia goes on the run when her powers attract attention from vampires, the Pythia, and a nasty mage.", series: { name: "Cassandra Palmer", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Claimed by Shadow", author: "Karen Chance", pageCount: 368, genre: "Fantasy", publicationDate: "2007", description: "Cassandra Palmer #2: Cassie must figure out her new role as Pythia — chief oracle of the supernatural world — while three men vie for her formal binding.", series: { name: "Cassandra Palmer", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "Midnight's Daughter", author: "Karen Chance", pageCount: 400, genre: "Fantasy", publicationDate: "2008", description: "The first Dorina Basarab novel: Dracula's daughter, a half-vampire bounty hunter, is hired to recover her father who has escaped confinement in the supernatural underworld.", series: { name: "Dorina Basarab", order: 1, total: 6 }, tier: 1, topRank: null },

  // Ira Levin (4)
  { title: "Rosemary's Baby", author: "Ira Levin", pageCount: 304, genre: "Horror", publicationDate: "1967", description: "Levin's landmark occult horror: a young woman in 1960s Manhattan moves into an old apartment building, becomes pregnant, and slowly realizes her neighbors have plans for her child.", series: null, tier: 1, topRank: null },
  { title: "The Stepford Wives", author: "Ira Levin", pageCount: 144, genre: "Horror", publicationDate: "1972", description: "A woman moving with her husband to a picture-perfect Connecticut suburb realizes the local housewives are just a little too happy to cook and clean — and a little too blank.", series: null, tier: 1, topRank: null },
  { title: "A Kiss Before Dying", author: "Ira Levin", pageCount: 272, genre: "Thriller", publicationDate: "1953", description: "Levin's debut: a young college man has plans to marry into money — and will do anything, to any woman, to get there. The first novel to win the Edgar Award for Best First Novel.", series: null, tier: 1, topRank: null },
  { title: "The Boys from Brazil", author: "Ira Levin", pageCount: 288, genre: "Thriller", publicationDate: "1976", description: "A Nazi hunter discovers a former SS doctor in Paraguay is coordinating the murders of 94 65-year-old men across Europe — and uncovers the real reason why.", series: null, tier: 1, topRank: null },

  // Thomas Tryon (2)
  { title: "The Other", author: "Thomas Tryon", pageCount: 304, genre: "Horror", publicationDate: "1971", description: "Tryon's novel of twin boys on a 1935 Connecticut farm whose summer is haunted by a series of accidents — and whose dead mother may be speaking through one of them.", series: null, tier: 1, topRank: null },
  { title: "Harvest Home", author: "Thomas Tryon", pageCount: 432, genre: "Horror", publicationDate: "1973", description: "A Manhattan couple moves to the perfect New England village of Cornwall Coombe — and discovers the town practices a pre-Christian fertility religion the matriarchs intend to continue.", series: null, tier: 1, topRank: null },

  // William Peter Blatty (2)
  { title: "The Exorcist", author: "William Peter Blatty", pageCount: 416, genre: "Horror", publicationDate: "1971", description: "Blatty's landmark horror: a Washington actress's 12-year-old daughter begins exhibiting symptoms no doctor can explain — and a Jesuit priest is called in to consider demonic possession.", series: null, tier: 1, topRank: null },
  { title: "Legion", author: "William Peter Blatty", pageCount: 336, genre: "Horror", publicationDate: "1983", description: "A sequel to The Exorcist: twelve years after Regan's exorcism, a series of ritualistic murders in Georgetown leads a detective to a psychiatric hospital — and to a patient who should be dead.", series: null, tier: 1, topRank: null },

  // John Saul (3)
  { title: "Suffer the Children", author: "John Saul", pageCount: 352, genre: "Horror", publicationDate: "1977", description: "Saul's debut: a New England town that once saw a brutal child-killing is now seeing it happen again — and a family's buried secret may be the key to stopping it.", series: null, tier: 1, topRank: null },
  { title: "Punish the Sinners", author: "John Saul", pageCount: 352, genre: "Horror", publicationDate: "1978", description: "Saul's Oregon small-town horror: a young priest arriving in a strict Catholic community discovers a pattern of teenage-girl suicides going back over a century.", series: null, tier: 1, topRank: null },
  { title: "The God Project", author: "John Saul", pageCount: 400, genre: "Horror", publicationDate: "1982", description: "Children in a small American town are dying of a strange wasting illness that resists every medical explanation — except one their parents refuse to believe.", series: null, tier: 1, topRank: null },

  // Kevin Wilson (4)
  { title: "The Family Fang", author: "Kevin Wilson", pageCount: 320, genre: "Fiction", publicationDate: "2011", description: "Wilson's debut: the grown children of a famously eccentric performance-art couple come home to confront the people who grew them up as props in their art.", series: null, tier: 1, topRank: null },
  { title: "Nothing to See Here", author: "Kevin Wilson", pageCount: 272, genre: "Fiction", publicationDate: "2019", description: "A woman is hired by her wealthy college roommate to care for her husband's twin children — who spontaneously combust when they get upset.", series: null, tier: 1, topRank: null },
  { title: "Now Is Not the Time to Panic", author: "Kevin Wilson", pageCount: 256, genre: "Fiction", publicationDate: "2022", description: "Two outcast teenagers in a small Tennessee town in the summer of 1996 create a mysterious poster that accidentally triggers a nationwide panic.", series: null, tier: 1, topRank: null },
  { title: "Run for the Hills", author: "Kevin Wilson", pageCount: 272, genre: "Fiction", publicationDate: "2025", description: "Wilson's latest: three half-siblings who have never met decide to track down their vanished father and drive across the country to find him.", series: null, tier: 1, topRank: null },
];

// ── Apply PRIMARY ──
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const beforeP = books.length;

const existingKeys = new Set(books.map(b => (b.title + "|" + b.author).toLowerCase()));
const primaryDupes = [];
const primaryAdd = [];
for (const a of PRIMARY_ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (existingKeys.has(key)) primaryDupes.push(a);
  else { primaryAdd.push(a); existingKeys.add(key); }
}
if (primaryDupes.length > 0) console.log(`⚠ Skipping ${primaryDupes.length} primary duplicates`);
const nextBooks = books.concat(primaryAdd);
fs.writeFileSync(CATALOG, JSON.stringify(nextBooks));
console.log(`PRIMARY: added ${primaryAdd.length} books, ${beforeP} → ${nextBooks.length}`);

// ── Apply REC LIBRARY ──
let recBooks = [];
if (fs.existsSync(REC_LIBRARY)) {
  const raw = JSON.parse(fs.readFileSync(REC_LIBRARY, "utf8"));
  recBooks = Array.isArray(raw) ? raw : (raw.books || []);
}
const beforeR = recBooks.length;

const recKeys = new Set(recBooks.map(b => (b.title + "|" + b.author).toLowerCase()));
const recDupes = [];
const recAdd = [];
for (const a of REC_LIBRARY_ADDITIONS) {
  const key = (a.title + "|" + a.author).toLowerCase();
  if (recKeys.has(key)) recDupes.push(a);
  else { recAdd.push(a); recKeys.add(key); }
}
if (recDupes.length > 0) console.log(`⚠ Skipping ${recDupes.length} rec library duplicates`);
const nextRec = recBooks.concat(recAdd);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(nextRec));
console.log(`REC LIBRARY: added ${recAdd.length} books, ${beforeR} → ${nextRec.length}`);

const statCat = fs.statSync(CATALOG);
const statRec = fs.statSync(REC_LIBRARY);
console.log(`\nbook-data.json: ${(statCat.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`rec-library.json: ${(statRec.size / 1024).toFixed(1)} KB`);

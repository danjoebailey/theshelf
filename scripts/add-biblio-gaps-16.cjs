const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // M.R. Carey (2)
  { title: "The Devil You Know", author: "M.R. Carey", pageCount: 416, genre: "Fantasy", publicationDate: "2006", description: "The first Felix Castor novel: a London exorcist-for-hire, semi-retired after a job gone badly wrong, takes on a haunting at the Bonnington Archive and uncovers a much larger case.", series: { name: "Felix Castor", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Fellside", author: "M.R. Carey", pageCount: 496, genre: "Horror", publicationDate: "2016", description: "A drug-addicted former journalist is sent to the isolated women's prison Fellside for a murder she can't remember — and starts hearing the voice of her victim.", series: null, tier: 1, topRank: null },

  // Peter S. Beagle (3)
  { title: "Tamsin", author: "Peter S. Beagle", pageCount: 288, genre: "Fantasy", publicationDate: "1999", description: "A New York teenager moves to an ancient Dorset farmhouse and befriends a three-hundred-year-old ghost — Beagle's quiet, affectionate ghost story.", series: null, tier: 1, topRank: null },
  { title: "The Folk of the Air", author: "Peter S. Beagle", pageCount: 368, genre: "Fantasy", publicationDate: "1986", description: "A man returns to his college town to find his ex-girlfriend in a medieval recreation society that has begun summoning real magic.", series: null, tier: 1, topRank: null },
  { title: "Summerlong", author: "Peter S. Beagle", pageCount: 336, genre: "Fantasy", publicationDate: "2016", description: "A middle-aged couple on an island in Puget Sound meet a strange young woman whose arrival feels like spring and might be something much older.", series: null, tier: 1, topRank: null },

  // Tanith Lee (3)
  { title: "The Silver Metal Lover", author: "Tanith Lee", pageCount: 304, genre: "Sci-Fi", publicationDate: "1981", description: "In a far-future society of mechanical servants, a sheltered teenage girl falls in love with a musician android — and fights to keep him when the corporation recalls his line.", series: null, tier: 1, topRank: null },
  { title: "Anackire", author: "Tanith Lee", pageCount: 432, genre: "Fantasy", publicationDate: "1983", description: "The sequel to The Storm Lord: the heir to the Vis empire must reclaim his throne while the serpent goddess Anackire grows in her Lowlander followers' worship.", series: { name: "Wars of Vis", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Storm Lord", author: "Tanith Lee", pageCount: 416, genre: "Fantasy", publicationDate: "1976", description: "The first Wars of Vis novel: a raped slave girl gives birth to the rightful heir of a conquered kingdom and sends him out to reclaim his destiny.", series: { name: "Wars of Vis", order: 1, total: 3 }, tier: 1, topRank: null },

  // Kage Baker (4)
  { title: "The Graveyard Game", author: "Kage Baker", pageCount: 304, genre: "Sci-Fi", publicationDate: "2001", description: "Company #4: a thousand years on from the Mendoza trilogy, immortal operatives Joseph and Lewis start asking questions about what the Company is actually planning.", series: { name: "The Company", order: 4, total: 8 }, tier: 1, topRank: null },
  { title: "The Life of the World to Come", author: "Kage Baker", pageCount: 352, genre: "Sci-Fi", publicationDate: "2004", description: "Company #5: Mendoza, imprisoned in a Paleolithic cell for love affairs that crossed centuries, is visited by a cyborg who may or may not be her lost love.", series: { name: "The Company", order: 5, total: 8 }, tier: 1, topRank: null },
  { title: "The Children of the Company", author: "Kage Baker", pageCount: 336, genre: "Sci-Fi", publicationDate: "2005", description: "Company #6: a fix-up novel tracing the Company's human masters across six millennia — and revealing how the immortals became tools of the people they saved.", series: { name: "The Company", order: 6, total: 8 }, tier: 1, topRank: null },
  { title: "The Machine's Child", author: "Kage Baker", pageCount: 352, genre: "Sci-Fi", publicationDate: "2006", description: "Company #7: Mendoza is rescued from her prison cell by a trio of Alec Checkerfield personas, all trapped in a single ship with nowhere left to go.", series: { name: "The Company", order: 7, total: 8 }, tier: 1, topRank: null },

  // Andre Norton (5)
  { title: "The Time Traders", author: "Andre Norton", pageCount: 240, genre: "Sci-Fi", publicationDate: "1958", description: "The first Time Traders novel: a young American delinquent is recruited by a Cold War government project to infiltrate the past as a Bronze Age trader.", series: { name: "Time Traders", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Storm Over Warlock", author: "Andre Norton", pageCount: 224, genre: "Sci-Fi", publicationDate: "1960", description: "A Terran survey team crashes on the alien world Warlock — and the two survivors must make peace with the hostile nonhuman Wyverns to reach safety.", series: null, tier: 1, topRank: null },
  { title: "Key Out of Time", author: "Andre Norton", pageCount: 224, genre: "Sci-Fi", publicationDate: "1963", description: "Time Traders #4: the team travels back to a remote Polynesian past to confront an alien civilization that has been manipulating Earth's history from orbit.", series: { name: "Time Traders", order: 4, total: 6 }, tier: 1, topRank: null },
  { title: "The Defiant Agents", author: "Andre Norton", pageCount: 240, genre: "Sci-Fi", publicationDate: "1962", description: "Time Traders #3: a psychically regressed Apache colonization team is stranded on a planet where their primitive skills are the only weapons that can save them.", series: { name: "Time Traders", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "Sargasso of Space", author: "Andre Norton", pageCount: 192, genre: "Sci-Fi", publicationDate: "1955", description: "The first Solar Queen novel: a young apprentice trader lands a job on a free-trader ship whose first assignment is a planet wrecked by the gravity of a nearby sun.", series: { name: "Solar Queen", order: 1, total: 5 }, tier: 1, topRank: null },

  // Marion Zimmer Bradley (5)
  { title: "The Planet Savers", author: "Marion Zimmer Bradley", pageCount: 144, genre: "Sci-Fi", publicationDate: "1962", description: "An early Darkover novel: a human doctor with a suppressed Darkovan alter ego must cross the mountains to negotiate with the telepathic trailmen during a plague.", series: { name: "Darkover", order: null, total: 40 }, tier: 1, topRank: null },
  { title: "The Bloody Sun", author: "Marion Zimmer Bradley", pageCount: 240, genre: "Sci-Fi", publicationDate: "1964", description: "A young human orphan raised in a Terran spaceport discovers he has Darkovan lineage and telepathic talent — and is drawn into a tower of telepaths.", series: { name: "Darkover", order: null, total: 40 }, tier: 1, topRank: null },
  { title: "City of Sorcery", author: "Marion Zimmer Bradley", pageCount: 400, genre: "Sci-Fi", publicationDate: "1984", description: "Renunciate Magda Lorne and her lover Camilla travel to an unmapped ancient city on Darkover in pursuit of a mystical sisterhood that may be dangerous or holy.", series: { name: "Darkover", order: null, total: 40 }, tier: 1, topRank: null },
  { title: "Star of Danger", author: "Marion Zimmer Bradley", pageCount: 224, genre: "Sci-Fi", publicationDate: "1965", description: "A teenage Terran born on Darkover and his noble Darkovan friend travel across the planet's dangerous wilderness and meet bandits, lost cities, and Darkover's forest folk.", series: { name: "Darkover", order: null, total: 40 }, tier: 1, topRank: null },
  { title: "The Firebrand", author: "Marion Zimmer Bradley", pageCount: 608, genre: "Historical Fiction", publicationDate: "1987", description: "Bradley's retelling of the Trojan War from the perspective of Kassandra, the cursed Trojan prophetess — an epic feminist reimagining like her later Mists of Avalon.", series: null, tier: 1, topRank: null },

  // Rick Riordan (8)
  { title: "The Hidden Oracle", author: "Rick Riordan", pageCount: 384, genre: "Young Adult", publicationDate: "2016", description: "The first Trials of Apollo novel: after offending Zeus one too many times, the god Apollo is stripped of his powers and dumped in a New York dumpster as a mortal teenager.", series: { name: "Trials of Apollo", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Dark Prophecy", author: "Rick Riordan", pageCount: 416, genre: "Young Adult", publicationDate: "2017", description: "Trials of Apollo #2: the mortal Apollo and his demigod master Meg travel to Indianapolis to confront a triumvirate of ancient Roman emperors who have returned.", series: { name: "Trials of Apollo", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "The Burning Maze", author: "Rick Riordan", pageCount: 448, genre: "Young Adult", publicationDate: "2018", description: "Trials of Apollo #3: Apollo's quest brings him to a burning southern California labyrinth and a loss that devastates him.", series: { name: "Trials of Apollo", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "The Tower of Nero", author: "Rick Riordan", pageCount: 448, genre: "Young Adult", publicationDate: "2020", description: "Trials of Apollo #5: the final confrontation between the mortal Apollo and his nemesis Emperor Nero in the heart of Manhattan.", series: { name: "Trials of Apollo", order: 5, total: 5 }, tier: 1, topRank: null },
  { title: "The Sword of Summer", author: "Rick Riordan", pageCount: 512, genre: "Young Adult", publicationDate: "2015", description: "The first Magnus Chase novel: a homeless Boston teenager discovers he's the son of a Norse god and dies within the first chapter — the beginning of his afterlife adventure.", series: { name: "Magnus Chase", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Hammer of Thor", author: "Rick Riordan", pageCount: 480, genre: "Young Adult", publicationDate: "2016", description: "Magnus Chase #2: Magnus and his crew must recover Thor's missing hammer before the giants use its absence to invade Midgard.", series: { name: "Magnus Chase", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Ship of the Dead", author: "Rick Riordan", pageCount: 464, genre: "Young Adult", publicationDate: "2017", description: "Magnus Chase #3: Magnus sails the Ship of the Dead toward Naglfar to prevent Loki from launching Ragnarok.", series: { name: "Magnus Chase", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "The Maze of Bones", author: "Rick Riordan", pageCount: 240, genre: "Young Adult", publicationDate: "2008", description: "The first 39 Clues novel: two orphaned siblings inherit a challenge from their grandmother — solve 39 clues that will lead them to a secret the world's most powerful family wants to hide.", series: { name: "The 39 Clues", order: 1, total: 11 }, tier: 1, topRank: null },

  // Leigh Bardugo (1)
  { title: "The Language of Thorns", author: "Leigh Bardugo", pageCount: 288, genre: "Young Adult", publicationDate: "2017", description: "Bardugo's illustrated collection of six dark folk tales set in the Grishaverse — retellings of familiar fairytale shapes twisted into new shapes.", series: null, tier: 1, topRank: null },

  // Susan Cooper (2)
  { title: "King of Shadows", author: "Susan Cooper", pageCount: 208, genre: "Young Adult", publicationDate: "1999", description: "A modern American boy performing A Midsummer Night's Dream at the Globe Theatre in London swaps places with an Elizabethan boy actor who once played Puck for Shakespeare himself.", series: null, tier: 1, topRank: null },
  { title: "The Boggart", author: "Susan Cooper", pageCount: 208, genre: "Young Adult", publicationDate: "1993", description: "A Canadian family inherits a Scottish castle and brings home — accidentally — its resident boggart, an ancient mischief spirit unaware of the modern world.", series: { name: "The Boggart", order: 1, total: 3 }, tier: 1, topRank: null },

  // Lloyd Alexander (1)
  { title: "The Foundling and Other Tales of Prydain", author: "Lloyd Alexander", pageCount: 96, genre: "Young Adult", publicationDate: "1973", description: "Alexander's collection of eight short stories set in Prydain — side-tales of characters from the Chronicles, including the origins of Dallben and Fflewddur Fflam.", series: null, tier: 1, topRank: null },

  // Sharon Kay Penman (3)
  { title: "Time and Chance", author: "Sharon Kay Penman", pageCount: 528, genre: "Historical Fiction", publicationDate: "2002", description: "Penman's second Plantagenet novel: Henry II at the height of his power, with Eleanor of Aquitaine and Thomas Becket, until the feud with Becket turns murderous.", series: { name: "Plantagenets", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Devil's Brood", author: "Sharon Kay Penman", pageCount: 736, genre: "Historical Fiction", publicationDate: "2008", description: "Plantagenets #3: the rebellion of Henry II's sons and queen against him — the slow poisoning of the most powerful family in 12th-century Europe.", series: { name: "Plantagenets", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Lionheart", author: "Sharon Kay Penman", pageCount: 608, genre: "Historical Fiction", publicationDate: "2011", description: "Plantagenets #4: Richard the Lionheart's Third Crusade, his capture on the way home, and his extraordinary imprisonment in Germany — the life of England's absent king.", series: { name: "Plantagenets", order: 4, total: 4 }, tier: 1, topRank: null },

  // Roshani Chokshi (1)
  { title: "Aru Shah and the End of Time", author: "Roshani Chokshi", pageCount: 368, genre: "Young Adult", publicationDate: "2018", description: "The first Pandava Quintet novel: a twelve-year-old girl discovers she is the reincarnation of one of the Pandava heroes of the Mahabharata — and must save the world from the Sleeper.", series: { name: "Pandava", order: 1, total: 5 }, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // Joanne Harris (4)
  { title: "Chocolat", author: "Joanne Harris", pageCount: 320, genre: "Fiction", publicationDate: "1999", description: "A mysterious chocolatier and her young daughter arrive at a strict French village just before Lent — and begin a quiet war with the parish priest.", series: null, tier: 1, topRank: null },
  { title: "The Gospel of Loki", author: "Joanne Harris", pageCount: 320, genre: "Fantasy", publicationDate: "2014", description: "Harris's retelling of Norse mythology from the viewpoint of the trickster Loki — charting his rise in Asgard and his vengeful role in Ragnarok.", series: null, tier: 1, topRank: null },
  { title: "Runemarks", author: "Joanne Harris", pageCount: 528, genre: "Young Adult", publicationDate: "2007", description: "Five hundred years after the fall of the Norse gods, a girl born with a magical rune on her palm accidentally lets the old gods back into the world.", series: { name: "Runemarks", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Different Class", author: "Joanne Harris", pageCount: 416, genre: "Thriller", publicationDate: "2016", description: "A veteran teacher at a private boys' school finds his past returning to haunt him when a former student is appointed headmaster.", series: null, tier: 1, topRank: null },

  // R.A. MacAvoy (3)
  { title: "Tea with the Black Dragon", author: "R.A. MacAvoy", pageCount: 176, genre: "Fantasy", publicationDate: "1983", description: "MacAvoy's debut: a reclusive 50-something Irish-American musician meets a Chinese gentleman staying at her hotel who may be a two-thousand-year-old dragon.", series: null, tier: 1, topRank: null },
  { title: "Damiano", author: "R.A. MacAvoy", pageCount: 240, genre: "Fantasy", publicationDate: "1984", description: "A young alchemist in 14th-century Italy and his talking dog travel from a war-torn Piedmont to seek the archangel Raphael for his family's sake.", series: { name: "Damiano", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Book of Kells", author: "R.A. MacAvoy", pageCount: 336, genre: "Fantasy", publicationDate: "1985", description: "A modern artist rubbing a medieval Irish stone cross is transported into 10th-century Ireland and must survive in the age of Viking raids.", series: null, tier: 1, topRank: null },

  // Katharine Kerr (4)
  { title: "Daggerspell", author: "Katharine Kerr", pageCount: 416, genre: "Fantasy", publicationDate: "1986", description: "The first Deverry novel: three souls — a dweomer-master, a soldier, and a noblewoman — are reincarnated across centuries in a Celtic-inflected fantasy kingdom.", series: { name: "Deverry", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "Darkspell", author: "Katharine Kerr", pageCount: 448, genre: "Fantasy", publicationDate: "1987", description: "Deverry #2: the reincarnated Jill, now a mercenary woman, finds her magical talent stirring as dark forces begin to gather around her and her lover Rhodry.", series: { name: "Deverry", order: 2, total: 15 }, tier: 1, topRank: null },
  { title: "The Bristling Wood", author: "Katharine Kerr", pageCount: 432, genre: "Fantasy", publicationDate: "1989", description: "Deverry #3: Rhodry, exiled and believed dead, falls into the hands of the savage Westfolk and Jill must journey into the elven lands to find him.", series: { name: "Deverry", order: 3, total: 15 }, tier: 1, topRank: null },
  { title: "The Dragon Revenant", author: "Katharine Kerr", pageCount: 432, genre: "Fantasy", publicationDate: "1990", description: "Deverry #4: the conclusion of the first Deverry act — Rhodry's claim to his kingdom is threatened by Bardekian slavers while Jill finally accepts her destiny as a dweomer master.", series: { name: "Deverry", order: 4, total: 15 }, tier: 1, topRank: null },

  // Juliet Marillier (3)
  { title: "Daughter of the Forest", author: "Juliet Marillier", pageCount: 672, genre: "Fantasy", publicationDate: "1999", description: "Marillier's debut retelling of the Six Swans fairytale in early medieval Ireland: a silent sister weaves shirts of starwort to break the spell that transformed her brothers into swans.", series: { name: "Sevenwaters", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Son of the Shadows", author: "Juliet Marillier", pageCount: 560, genre: "Fantasy", publicationDate: "2000", description: "Sevenwaters #2: a new generation of the Sevenwaters family confronts old enemies and a prophecy that demands a sacrifice none of them is willing to make.", series: { name: "Sevenwaters", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Child of the Prophecy", author: "Juliet Marillier", pageCount: 560, genre: "Fantasy", publicationDate: "2001", description: "Sevenwaters #3: a young sorceress trained by her dark father is sent to destroy the Sevenwaters family — the conclusion of the original trilogy.", series: { name: "Sevenwaters", order: 3, total: 6 }, tier: 1, topRank: null },

  // Jerry Pournelle (3)
  { title: "West of Honor", author: "Jerry Pournelle", pageCount: 240, genre: "Sci-Fi", publicationDate: "1976", description: "An early Falkenberg's Legion novel: a young Marine officer and his mentor fight to hold a colony world for the dying CoDominium on a failing interstellar frontier.", series: { name: "Falkenberg's Legion", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Janissaries", author: "Jerry Pournelle", pageCount: 336, genre: "Sci-Fi", publicationDate: "1979", description: "A CIA-trained mercenary team is abducted by aliens and set down on a medieval planet where they must organize the local kingdoms around their modern firepower.", series: { name: "Janissaries", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "King David's Spaceship", author: "Jerry Pournelle", pageCount: 304, genre: "Sci-Fi", publicationDate: "1981", description: "A CoDominium colony world must construct a functioning primitive spacecraft before the Imperials arrive — or be downgraded to a lower technological tier forever.", series: null, tier: 1, topRank: null },

  // Jonathan Stroud (4)
  { title: "The Amulet of Samarkand", author: "Jonathan Stroud", pageCount: 464, genre: "Fantasy", publicationDate: "2003", description: "The first Bartimaeus Trilogy novel: an apprentice magician summons a 5,000-year-old wise-ass djinn and sends him to steal a powerful amulet from a rival mage.", series: { name: "Bartimaeus", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Golem's Eye", author: "Jonathan Stroud", pageCount: 576, genre: "Fantasy", publicationDate: "2004", description: "Bartimaeus #2: Nathaniel, now a rising young magician, is sent to Prague to investigate the theft of an ancient Kabbalistic artifact that animates a golem.", series: { name: "Bartimaeus", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Ptolemy's Gate", author: "Jonathan Stroud", pageCount: 512, genre: "Fantasy", publicationDate: "2005", description: "Bartimaeus #3: the magical ruling class of alternate-England is collapsing under a commoner revolt while Nathaniel summons Bartimaeus one last time for a desperate plan.", series: { name: "Bartimaeus", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "The Screaming Staircase", author: "Jonathan Stroud", pageCount: 400, genre: "Young Adult", publicationDate: "2013", description: "The first Lockwood & Co. novel: in an alternate England overrun by vengeful ghosts, a three-person psychic investigation agency takes on its deadliest job.", series: { name: "Lockwood & Co.", order: 1, total: 5 }, tier: 1, topRank: null },

  // Eoin Colfer (4)
  { title: "Artemis Fowl", author: "Eoin Colfer", pageCount: 280, genre: "Young Adult", publicationDate: "2001", description: "The first Artemis Fowl novel: a twelve-year-old criminal mastermind kidnaps a fairy captain of the LEPrecon police force to ransom her for fairy gold.", series: { name: "Artemis Fowl", order: 1, total: 8 }, tier: 1, topRank: null },
  { title: "Artemis Fowl: The Arctic Incident", author: "Eoin Colfer", pageCount: 288, genre: "Young Adult", publicationDate: "2002", description: "Artemis Fowl #2: Artemis's father is kidnapped in Russia and Artemis forms an uneasy alliance with the fairies to rescue him.", series: { name: "Artemis Fowl", order: 2, total: 8 }, tier: 1, topRank: null },
  { title: "Artemis Fowl: The Eternity Code", author: "Eoin Colfer", pageCount: 336, genre: "Young Adult", publicationDate: "2003", description: "Artemis Fowl #3: Artemis builds a computer from stolen fairy technology and sells it to a Chicago businessman — then must mount a heist to get it back.", series: { name: "Artemis Fowl", order: 3, total: 8 }, tier: 1, topRank: null },
  { title: "Artemis Fowl: The Opal Deception", author: "Eoin Colfer", pageCount: 352, genre: "Young Adult", publicationDate: "2005", description: "Artemis Fowl #4: the pixie Opal Koboi escapes her asylum and orchestrates a plan to expose the fairy world to humanity while framing Artemis for the crime.", series: { name: "Artemis Fowl", order: 4, total: 8 }, tier: 1, topRank: null },

  // Tanya Huff (3)
  { title: "Blood Price", author: "Tanya Huff", pageCount: 288, genre: "Fantasy", publicationDate: "1991", description: "The first Vicki Nelson novel: a Toronto private detective investigates a series of bloody murders and teams up with a vampire who is secretly Henry VIII's illegitimate son.", series: { name: "Vicki Nelson", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Valor's Choice", author: "Tanya Huff", pageCount: 416, genre: "Sci-Fi", publicationDate: "2000", description: "The first Confederation novel: Staff Sergeant Torin Kerr's Marines are assigned a ceremonial honor-guard detail on an alien world — and are promptly ambushed.", series: { name: "Confederation", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Summon the Keeper", author: "Tanya Huff", pageCount: 368, genre: "Fantasy", publicationDate: "1998", description: "The first Keeper Chronicle: a modern 'Keeper' inherits a Kingston, Ontario bed-and-breakfast that turns out to be sitting on a hole to hell.", series: { name: "Keeper Chronicles", order: 1, total: 3 }, tier: 1, topRank: null },

  // Charlie Huston (3)
  { title: "Already Dead", author: "Charlie Huston", pageCount: 288, genre: "Fantasy", publicationDate: "2005", description: "The first Joe Pitt novel: a hard-boiled Manhattan vampire PI works cases for the city's feuding vampire Clans and gets caught between all of them.", series: { name: "Joe Pitt", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "No Dominion", author: "Charlie Huston", pageCount: 288, genre: "Fantasy", publicationDate: "2006", description: "Joe Pitt #2: a new drug hitting the vampyre streets of New York is making them feel alive — and Joe is hired to find its source.", series: { name: "Joe Pitt", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Half the Blood of Brooklyn", author: "Charlie Huston", pageCount: 256, genre: "Fantasy", publicationDate: "2007", description: "Joe Pitt #3: Joe is sent into the Brooklyn Clans' cross-borough territorial war to negotiate with a Hasidic vampire rabbi who controls half the borough.", series: { name: "Joe Pitt", order: 3, total: 5 }, tier: 1, topRank: null },

  // Chelsea Quinn Yarbro (3)
  { title: "Hotel Transylvania", author: "Chelsea Quinn Yarbro", pageCount: 384, genre: "Historical Fiction", publicationDate: "1978", description: "The first Saint-Germain novel: the four-thousand-year-old vampire Count Saint-Germain takes refuge in pre-Revolution Paris and falls in love with a mortal woman.", series: { name: "Saint-Germain", order: 1, total: 27 }, tier: 1, topRank: null },
  { title: "The Palace", author: "Chelsea Quinn Yarbro", pageCount: 384, genre: "Historical Fiction", publicationDate: "1978", description: "Saint-Germain #2: the vampire Count lives in Renaissance Florence under Medici patronage until Savonarola's fanatics target him as a sorcerer.", series: { name: "Saint-Germain", order: 2, total: 27 }, tier: 1, topRank: null },
  { title: "Blood Games", author: "Chelsea Quinn Yarbro", pageCount: 416, genre: "Historical Fiction", publicationDate: "1980", description: "Saint-Germain #3: the vampire Count in Nero's Rome, navigating the decadent imperial court and its sadistic games as the Empire begins its slow collapse.", series: { name: "Saint-Germain", order: 3, total: 27 }, tier: 1, topRank: null },

  // Ian Irvine (3)
  { title: "A Shadow on the Glass", author: "Ian Irvine", pageCount: 592, genre: "Fantasy", publicationDate: "1998", description: "The first Three Worlds novel: a crippled chronicler and a runaway princess begin a quest across a dying world whose three moons have stopped turning properly.", series: { name: "The View from the Mirror", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Tower on the Rift", author: "Ian Irvine", pageCount: 640, genre: "Fantasy", publicationDate: "1998", description: "Three Worlds #2: Karan and Llian travel to the tower above the rift where the Forbidding between worlds has begun to tear open.", series: { name: "The View from the Mirror", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Dark is the Moon", author: "Ian Irvine", pageCount: 704, genre: "Fantasy", publicationDate: "1999", description: "Three Worlds #3: the war between the Aachim, Faellem, and human civilizations breaks out as the broken world's moon begins to fall.", series: { name: "The View from the Mirror", order: 3, total: 4 }, tier: 1, topRank: null },

  // Elizabeth Haydon (3)
  { title: "Rhapsody: Child of Blood", author: "Elizabeth Haydon", pageCount: 688, genre: "Fantasy", publicationDate: "1999", description: "The first Symphony of Ages novel: three travelers — a namer, an assassin, and a brutal warrior — flee their island home beneath the world via an ancient tree root.", series: { name: "Symphony of Ages", order: 1, total: 9 }, tier: 1, topRank: null },
  { title: "Prophecy: Child of Earth", author: "Elizabeth Haydon", pageCount: 672, genre: "Fantasy", publicationDate: "2000", description: "Symphony of Ages #2: Rhapsody, Achmed, and Grunthor begin to confront the demonic F'dor that has been spreading its corruption through the new world they've arrived in.", series: { name: "Symphony of Ages", order: 2, total: 9 }, tier: 1, topRank: null },
  { title: "Destiny: Child of the Sky", author: "Elizabeth Haydon", pageCount: 720, genre: "Fantasy", publicationDate: "2001", description: "Symphony of Ages #3: the first trilogy's conclusion — Rhapsody must choose between her destiny and her love as the F'dor's plans come to fruition.", series: { name: "Symphony of Ages", order: 3, total: 9 }, tier: 1, topRank: null },

  // Sherwood Smith (3)
  { title: "Crown Duel", author: "Sherwood Smith", pageCount: 192, genre: "Young Adult", publicationDate: "1997", description: "A teenage countess from a remote mountain province leads her people in revolt against the corrupt king — the first half of Smith's classic YA fantasy.", series: { name: "Crown & Court", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Court Duel", author: "Sherwood Smith", pageCount: 224, genre: "Young Adult", publicationDate: "1998", description: "The second half of Crown Duel: Meliara must survive the intricate social politics of the new royal court after the war she helped win.", series: { name: "Crown & Court", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "Inda", author: "Sherwood Smith", pageCount: 624, genre: "Fantasy", publicationDate: "2006", description: "The first Inda novel: a noble boy at a brutal military academy reveals a tactical genius that makes him a prophesied leader — and a target.", series: { name: "Inda", order: 1, total: 4 }, tier: 1, topRank: null },
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
if (primaryDupes.length > 0) {
  console.log(`⚠ Skipping ${primaryDupes.length} primary duplicates`);
}
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
if (recDupes.length > 0) {
  console.log(`⚠ Skipping ${recDupes.length} rec library duplicates`);
}
const nextRec = recBooks.concat(recAdd);
fs.writeFileSync(REC_LIBRARY, JSON.stringify(nextRec));
console.log(`REC LIBRARY: added ${recAdd.length} books, ${beforeR} → ${nextRec.length}`);

const statCat = fs.statSync(CATALOG);
const statRec = fs.statSync(REC_LIBRARY);
console.log(`\nbook-data.json: ${(statCat.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`rec-library.json: ${(statRec.size / 1024).toFixed(1)} KB`);

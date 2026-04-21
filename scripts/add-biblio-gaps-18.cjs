const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// Duplicate to remove (Connie Willis has "Doomsday Book" and "The Doomsday Book")
const DELETE = [
  { title: "The Doomsday Book", author: "Connie Willis" },
];

// ── PRIMARY ──────────────────────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Brandon Mull (4)
  { title: "Dragonwatch", author: "Brandon Mull", pageCount: 432, genre: "Young Adult", publicationDate: "2017", description: "The first Dragonwatch novel and a direct sequel to Fablehaven: the dragons held in magical sanctuaries worldwide are beginning to rebel, and the caretakers must be replaced.", series: { name: "Dragonwatch", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Sky Raiders", author: "Brandon Mull", pageCount: 496, genre: "Young Adult", publicationDate: "2014", description: "The first Five Kingdoms novel: a sixth-grader is kidnapped through a magical doorway into a world of floating castles, flying ships, and ancient treasure-stealing raiders.", series: { name: "Five Kingdoms", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "A World Without Heroes", author: "Brandon Mull", pageCount: 464, genre: "Young Adult", publicationDate: "2011", description: "The first Beyonders novel: a thirteen-year-old boy falls through a hippo's mouth into the parallel world of Lyrian, a realm ruled by an immortal wizard emperor.", series: { name: "Beyonders", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Seeds of Rebellion", author: "Brandon Mull", pageCount: 512, genre: "Young Adult", publicationDate: "2012", description: "Beyonders #2: Jason returns to Lyrian to gather the resistance against Maldor — the sorcerer who cannot be killed because he has hidden his true name.", series: { name: "Beyonders", order: 2, total: 3 }, tier: 1, topRank: null },

  // Anne Rice (5)
  { title: "Merrick", author: "Anne Rice", pageCount: 368, genre: "Horror", publicationDate: "2000", description: "Lestat asks the witch Merrick Mayfair to summon the ghost of Claudia — bridging Rice's Vampire Chronicles and Mayfair Witches.", series: { name: "Vampire Chronicles", order: 7, total: 15 }, tier: 1, topRank: null },
  { title: "Blood and Gold", author: "Anne Rice", pageCount: 480, genre: "Horror", publicationDate: "2001", description: "Vampire Chronicles #8: the full story of Marius, the two-thousand-year-old Roman vampire who became guardian of Akasha and Enkil.", series: { name: "Vampire Chronicles", order: 8, total: 15 }, tier: 1, topRank: null },
  { title: "Blackwood Farm", author: "Anne Rice", pageCount: 528, genre: "Horror", publicationDate: "2002", description: "Vampire Chronicles #9: a young Southern man haunted by a spirit called 'Goblin' since childhood asks Lestat for help — and the Mayfair witches get involved.", series: { name: "Vampire Chronicles", order: 9, total: 15 }, tier: 1, topRank: null },
  { title: "Prince Lestat", author: "Anne Rice", pageCount: 480, genre: "Horror", publicationDate: "2014", description: "Rice's return to the Vampire Chronicles after more than a decade: a voice is telling vampires across the world to destroy the young ones — and Lestat must answer it.", series: { name: "Vampire Chronicles", order: 11, total: 15 }, tier: 1, topRank: null },
  { title: "The Wolf Gift", author: "Anne Rice", pageCount: 416, genre: "Horror", publicationDate: "2012", description: "The first Wolf Gift Chronicles novel: a young San Francisco reporter is attacked at a Mendocino mansion and survives — emerging as something both wolf and more.", series: { name: "The Wolf Gift Chronicles", order: 1, total: 2 }, tier: 1, topRank: null },

  // Connie Willis (3)
  { title: "Bellwether", author: "Connie Willis", pageCount: 256, genre: "Sci-Fi", publicationDate: "1996", description: "A research scientist studying fad behavior in 1990s America falls for a chaos theorist down the hall — Willis's comic novel about trend statistics and serendipity.", series: null, tier: 1, topRank: null },
  { title: "Lincoln's Dreams", author: "Connie Willis", pageCount: 240, genre: "Sci-Fi", publicationDate: "1987", description: "Willis's debut: a Civil War historian's research assistant begins dreaming the dreams of Robert E. Lee — and cannot wake up from them.", series: null, tier: 1, topRank: null },
  { title: "Fire Watch", author: "Connie Willis", pageCount: 288, genre: "Sci-Fi", publicationDate: "1985", description: "Willis's first story collection, including the Hugo- and Nebula-winning title novelette of an Oxford time-travel student sent to watch the Blitz fall on St. Paul's Cathedral.", series: null, tier: 1, topRank: null },

  // Joan D. Vinge (3)
  { title: "The Snow Queen", author: "Joan D. Vinge", pageCount: 496, genre: "Sci-Fi", publicationDate: "1980", description: "Vinge's Hugo-winning novel: on a distant world where the orbital season of 'Winter' is ending, the queen's cloned daughter must survive the political change and an ancient alien technology.", series: { name: "Snow Queen", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Summer Queen", author: "Joan D. Vinge", pageCount: 1008, genre: "Sci-Fi", publicationDate: "1991", description: "Snow Queen #3: the long Summer on Tiamat — and the return of the mysterious mer who may be the planet's original colonists.", series: { name: "Snow Queen", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "Catspaw", author: "Joan D. Vinge", pageCount: 400, genre: "Sci-Fi", publicationDate: "1988", description: "The second Cat novel: the psionic thief from Psion is recruited by a wealthy interstellar family as a bodyguard — and discovers they are hiding a planetary conspiracy.", series: { name: "Cat", order: 2, total: 3 }, tier: 1, topRank: null },

  // Daniel Abraham (5)
  { title: "The Dragon's Path", author: "Daniel Abraham", pageCount: 592, genre: "Fantasy", publicationDate: "2011", description: "The first Dagger and the Coin novel: a banking apprentice, a mercenary captain, an orphan spy, and a legate are drawn together as a sleeping dragon-magic awakens.", series: { name: "The Dagger and the Coin", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The King's Blood", author: "Daniel Abraham", pageCount: 512, genre: "Fantasy", publicationDate: "2012", description: "Dagger and the Coin #2: the spider priests of the goddess of lies begin their play for power, and a young banker must fight to save the only ruler who sees them.", series: { name: "The Dagger and the Coin", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "The Tyrant's Law", author: "Daniel Abraham", pageCount: 544, genre: "Fantasy", publicationDate: "2013", description: "Dagger and the Coin #3: the spider goddess's grip tightens and her crusader army begins to march across the known world.", series: { name: "The Dagger and the Coin", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "The Widow's House", author: "Daniel Abraham", pageCount: 560, genre: "Fantasy", publicationDate: "2014", description: "Dagger and the Coin #4: a banker, a dragon, and a remnant resistance make their stand against the priestly war-machine now consuming the continent.", series: { name: "The Dagger and the Coin", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "The Spider's War", author: "Daniel Abraham", pageCount: 544, genre: "Fantasy", publicationDate: "2016", description: "Dagger and the Coin #5: the final confrontation with the spider goddess and the awakening of the last dragon — the conclusion of Abraham's epic banking fantasy.", series: { name: "The Dagger and the Coin", order: 5, total: 5 }, tier: 1, topRank: null },

  // Hailey Piper (2)
  { title: "The Worm and His Kings", author: "Hailey Piper", pageCount: 152, genre: "Horror", publicationDate: "2020", description: "A homeless trans woman in 1990s New York hunts for her missing girlfriend in a cultist-ruled underground — Piper's breakthrough cosmic-horror novella.", series: null, tier: 1, topRank: null },
  { title: "All the Hearts You Eat", author: "Hailey Piper", pageCount: 320, genre: "Horror", publicationDate: "2024", description: "A grieving woman returns to her Maine hometown to solve the death of a drag performer — and walks into a supernatural case that has been waiting for her.", series: null, tier: 1, topRank: null },

  // Caitlin Starling (2)
  { title: "The Death of Jane Lawrence", author: "Caitlin Starling", pageCount: 368, genre: "Horror", publicationDate: "2021", description: "Starling's Gothic: a pragmatic young woman proposes a marriage of convenience to a small-town doctor and discovers his country house is far from what it seems.", series: null, tier: 1, topRank: null },
  { title: "Last to Leave the Room", author: "Caitlin Starling", pageCount: 320, genre: "Horror", publicationDate: "2023", description: "A scientist investigating a sinking basement door begins encountering a double of herself that emerges whenever she sleeps.", series: null, tier: 1, topRank: null },

  // John Wyndham (2)
  { title: "The Trouble with Lichen", author: "John Wyndham", pageCount: 224, genre: "Sci-Fi", publicationDate: "1960", description: "A female biochemist discovers a life-extending compound in a rare lichen — and has to decide whether to share a drug that could overthrow every social order.", series: null, tier: 1, topRank: null },
  { title: "Chocky", author: "John Wyndham", pageCount: 160, genre: "Sci-Fi", publicationDate: "1968", description: "Wyndham's last novel: an eleven-year-old English boy begins having conversations with an invisible entity named 'Chocky' — and the entity seems to be teaching him.", series: null, tier: 1, topRank: null },

  // Ava Reid (2)
  { title: "The Wolf and the Woodsman", author: "Ava Reid", pageCount: 432, genre: "Fantasy", publicationDate: "2021", description: "Reid's debut: a pagan girl with a suppressed magical bloodline is taken as a hostage by her kingdom's Inquisition-like soldiers and their king's bastard son.", series: null, tier: 1, topRank: null },
  { title: "Fable for the End of the World", author: "Ava Reid", pageCount: 368, genre: "Fantasy", publicationDate: "2025", description: "A young fisher in a drowned world becomes the hunted quarry in a televised reality game run by the ruling corporation of the last inhabited coast.", series: null, tier: 1, topRank: null },

  // Tahereh Mafi (2)
  { title: "This Woven Kingdom", author: "Tahereh Mafi", pageCount: 432, genre: "Young Adult", publicationDate: "2022", description: "The first Woven Kingdom novel: in a Persian-inspired fantasy world, a young orphan servant is discovered to be the prophesied queen of the Jinn.", series: { name: "This Woven Kingdom", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "These Infinite Threads", author: "Tahereh Mafi", pageCount: 400, genre: "Young Adult", publicationDate: "2024", description: "Woven Kingdom #2: Alizeh must navigate Ardunia's court politics while the prince she loves chases her — and the Jinn prepare to rise.", series: { name: "This Woven Kingdom", order: 2, total: 4 }, tier: 1, topRank: null },

  // Fonda Lee (2)
  { title: "Exo", author: "Fonda Lee", pageCount: 368, genre: "Sci-Fi", publicationDate: "2017", description: "Lee's YA SF: a century after an alien occupation, a human teenage soldier for the occupiers is taken hostage by human insurgents and forced to confront his own collaboration.", series: { name: "Exo", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Untethered Sky", author: "Fonda Lee", pageCount: 160, genre: "Fantasy", publicationDate: "2023", description: "Lee's novella: in a world where giant predator manticores prey on humans, a young girl dedicates her life to training a giant roc — a mythic raptor — to hunt them.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY ──────────────────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // S.M. Stirling (4)
  { title: "Dies the Fire", author: "S.M. Stirling", pageCount: 576, genre: "Sci-Fi", publicationDate: "2004", description: "The first Emberverse novel: on a single evening in 1998, a mysterious Change disables every advanced technology on Earth, and the survivors must relearn an iron-age existence.", series: { name: "Emberverse", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "The Protector's War", author: "S.M. Stirling", pageCount: 496, genre: "Sci-Fi", publicationDate: "2005", description: "Emberverse #2: the Bearkiller and Clan Mackenzie communities of Oregon face the expanding Portland Protective Association as the post-Change world settles into feudalism.", series: { name: "Emberverse", order: 2, total: 15 }, tier: 1, topRank: null },
  { title: "A Meeting at Corvallis", author: "S.M. Stirling", pageCount: 512, genre: "Sci-Fi", publicationDate: "2006", description: "Emberverse #3: the Willamette Valley allies gather at Corvallis for a final confrontation with the Portland Protective Association — the conclusion of the first trilogy.", series: { name: "Emberverse", order: 3, total: 15 }, tier: 1, topRank: null },
  { title: "Island in the Sea of Time", author: "S.M. Stirling", pageCount: 608, genre: "Sci-Fi", publicationDate: "1998", description: "The first Nantucket novel: the whole island is transported back to 1250 BC and must survive — and reshape — Bronze Age civilization.", series: { name: "Nantucket", order: 1, total: 3 }, tier: 1, topRank: null },

  // Eric Flint (3)
  { title: "1632", author: "Eric Flint", pageCount: 512, genre: "Sci-Fi", publicationDate: "2000", description: "A small West Virginia coal-mining town is mysteriously transported back to 1632 Germany in the middle of the Thirty Years' War — and must survive with 20th-century technology and 17th-century politics.", series: { name: "1632", order: 1, total: 30 }, tier: 1, topRank: null },
  { title: "1633", author: "Eric Flint", pageCount: 624, genre: "Sci-Fi", publicationDate: "2002", description: "Flint's collaboration with David Weber: the New United States begins building alliances with Gustavus Adolphus while France and England react to the impossible Americans.", series: { name: "1632", order: 2, total: 30 }, tier: 1, topRank: null },
  { title: "1634: The Baltic War", author: "Eric Flint", pageCount: 720, genre: "Sci-Fi", publicationDate: "2007", description: "1632 #3: the Baltic war explodes into the series' first major military conflict as France, Denmark, and England ally against the new American-Swedish coalition.", series: { name: "1632", order: 3, total: 30 }, tier: 1, topRank: null },

  // Larry Correia (4)
  { title: "Monster Hunter International", author: "Larry Correia", pageCount: 752, genre: "Fantasy", publicationDate: "2007", description: "The first MHI novel: an accountant accidentally kills his boss — who was a werewolf — and is recruited by a private monster-killing contractor with government immunity.", series: { name: "Monster Hunter International", order: 1, total: 13 }, tier: 1, topRank: null },
  { title: "Monster Hunter Vendetta", author: "Larry Correia", pageCount: 704, genre: "Fantasy", publicationDate: "2010", description: "MHI #2: Owen Pitt is targeted by an ancient entity that wants him dead, while the MHI team takes on a series of increasingly impossible contracts.", series: { name: "Monster Hunter International", order: 2, total: 13 }, tier: 1, topRank: null },
  { title: "Hard Magic", author: "Larry Correia", pageCount: 608, genre: "Fantasy", publicationDate: "2011", description: "The first Grimnoir Chronicles novel: in an alternate 1930s where magical 'actives' are hunted and used, a Heavy and a Healer join a secret organization fighting the Imperium.", series: { name: "Grimnoir Chronicles", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Son of the Black Sword", author: "Larry Correia", pageCount: 432, genre: "Fantasy", publicationDate: "2015", description: "The first Saga of the Forgotten Warrior: in an Indian-inspired caste society, a black sword-wielding protector discovers the religion he serves has been lying to him.", series: { name: "Saga of the Forgotten Warrior", order: 1, total: 5 }, tier: 1, topRank: null },

  // Harry Turtledove (4)
  { title: "The Guns of the South", author: "Harry Turtledove", pageCount: 560, genre: "Sci-Fi", publicationDate: "1992", description: "Turtledove's most famous alternate history: South African white-supremacist time travelers arm the Confederacy with AK-47s, winning the Civil War — and then everyone has to live with the consequences.", series: null, tier: 1, topRank: null },
  { title: "How Few Remain", author: "Harry Turtledove", pageCount: 624, genre: "Sci-Fi", publicationDate: "1997", description: "The prologue novel to Turtledove's Timeline-191 series: a second US-Confederate war in 1881 plays out differently because of the South's earlier victory.", series: { name: "Timeline-191", order: 0, total: 11 }, tier: 1, topRank: null },
  { title: "Worldwar: In the Balance", author: "Harry Turtledove", pageCount: 528, genre: "Sci-Fi", publicationDate: "1994", description: "The first Worldwar novel: in the middle of World War II, a lizard-like alien race invades Earth — and every combatant nation has to decide whether to fight the aliens, each other, or both.", series: { name: "Worldwar", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Ruled Britannia", author: "Harry Turtledove", pageCount: 480, genre: "Historical Fiction", publicationDate: "2002", description: "In an alternate 1597 where the Spanish Armada succeeded and conquered England, William Shakespeare is secretly commissioned to write a play to ignite a rebellion.", series: null, tier: 1, topRank: null },

  // Christopher Moore (4)
  { title: "Lamb", author: "Christopher Moore", pageCount: 464, genre: "Fiction", publicationDate: "2002", description: "The Gospel According to Biff, Christ's Childhood Pal: Moore's comic novel about Jesus's missing years, told by his resurrected best friend — irreverent, kind, and surprisingly tender.", series: null, tier: 1, topRank: null },
  { title: "Practical Demonkeeping", author: "Christopher Moore", pageCount: 288, genre: "Fantasy", publicationDate: "1992", description: "Moore's debut: a 100-year-old man in a California town is bound to a small green demon who eats only humans he designates — and the demon has just gotten loose.", series: null, tier: 1, topRank: null },
  { title: "A Dirty Job", author: "Christopher Moore", pageCount: 400, genre: "Fantasy", publicationDate: "2006", description: "A beta-male San Francisco second-hand store owner discovers he's just been hired as a Death Merchant — an unofficial agent helping souls cross over.", series: { name: "Grim Reaper", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Fluke", author: "Christopher Moore", pageCount: 336, genre: "Fantasy", publicationDate: "2003", description: "Moore's novel about a marine biologist studying whales off Maui who sees a humpback with 'Bite Me' tattooed on its fluke — and is then swallowed by another whale.", series: null, tier: 1, topRank: null },

  // Vonda McIntyre (3)
  { title: "Dreamsnake", author: "Vonda McIntyre", pageCount: 288, genre: "Sci-Fi", publicationDate: "1978", description: "McIntyre's Hugo-winning novel: a healer in a post-apocalyptic future uses genetically engineered snakes to treat illness — until her dreamsnake, the most important of the three, is killed.", series: null, tier: 1, topRank: null },
  { title: "The Moon and the Sun", author: "Vonda McIntyre", pageCount: 432, genre: "Historical Fiction", publicationDate: "1997", description: "In the court of Louis XIV, a Jesuit natural historian captures a 'sea monster' — and the Sun King's ward finds the captive mermaid is a thinking person.", series: null, tier: 1, topRank: null },
  { title: "Starfarers", author: "Vonda McIntyre", pageCount: 368, genre: "Sci-Fi", publicationDate: "1989", description: "A group of scientists hijack a starship scheduled for decommissioning to flee a militarizing Earth — the first of McIntyre's Starfarers quartet.", series: { name: "Starfarers", order: 1, total: 4 }, tier: 1, topRank: null },

  // Jennifer Fallon (3)
  { title: "Medalon", author: "Jennifer Fallon", pageCount: 576, genre: "Fantasy", publicationDate: "2000", description: "The first Demon Child trilogy novel: a young priestess raised by atheist religious authorities discovers she is the half-demon prophesied to destroy them.", series: { name: "Demon Child", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Lion of Senet", author: "Jennifer Fallon", pageCount: 544, genre: "Fantasy", publicationDate: "2002", description: "The first Second Sons trilogy novel: in a world with two suns and a political-religious cult of 'goddess worship,' three royal sons navigate a sudden solar eclipse that no one expected.", series: { name: "Second Sons", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Immortal Prince", author: "Jennifer Fallon", pageCount: 560, genre: "Fantasy", publicationDate: "2008", description: "The first Tide Lords novel: a convicted murderer taken for hanging turns out to be literally immortal — and his immortality is tied to ancient tide-aligned lords about to return.", series: { name: "Tide Lords", order: 1, total: 4 }, tier: 1, topRank: null },

  // David Wong (3)
  { title: "John Dies at the End", author: "David Wong", pageCount: 480, genre: "Horror", publicationDate: "2007", description: "Two dropout slackers discover a drug called Soy Sauce that lets them perceive other dimensions — and realize they can see the inter-dimensional monsters that are now watching them back.", series: { name: "John Dies at the End", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "This Book Is Full of Spiders", author: "David Wong", pageCount: 432, genre: "Horror", publicationDate: "2012", description: "John Dies at the End #2: invisible spiders are possessing humans across the country, and the Soy Sauce duo must figure out what the spiders actually want.", series: { name: "John Dies at the End", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "What the Hell Did I Just Read", author: "David Wong", pageCount: 384, genre: "Horror", publicationDate: "2017", description: "John Dies at the End #3: small children are disappearing from town, and three narrators — David, John, and Amy — try to explain what actually happened.", series: { name: "John Dies at the End", order: 3, total: 4 }, tier: 1, topRank: null },

  // C.J. Tudor (4)
  { title: "The Chalk Man", author: "C.J. Tudor", pageCount: 288, genre: "Thriller", publicationDate: "2018", description: "Tudor's debut: in 1986 a group of English children find a dismembered body using their secret chalk-stick-figure code — and thirty years later someone is sending them chalk men again.", series: null, tier: 1, topRank: null },
  { title: "The Hiding Place", author: "C.J. Tudor", pageCount: 352, genre: "Thriller", publicationDate: "2019", description: "A teacher returns to the grim mining town where his sister died as a child — and the old playground game that caught them both in its grip is starting again.", series: null, tier: 1, topRank: null },
  { title: "The Other People", author: "C.J. Tudor", pageCount: 352, genre: "Thriller", publicationDate: "2020", description: "A man sees his dead daughter's face through a car window on a highway — and begins a three-year search for the people who took her.", series: null, tier: 1, topRank: null },
  { title: "The Burning Girls", author: "C.J. Tudor", pageCount: 352, genre: "Thriller", publicationDate: "2021", description: "A troubled vicar with a dark past is reassigned to a tiny English village whose history includes the Marian burnings of Protestants — and whose present includes fresh violence.", series: null, tier: 1, topRank: null },

  // Darcy Coates (3)
  { title: "The Haunting of Ashburn House", author: "Darcy Coates", pageCount: 288, genre: "Horror", publicationDate: "2016", description: "A young woman inherits a remote country house from her reclusive great-aunt and discovers the house's terrible history is still unfolding.", series: null, tier: 1, topRank: null },
  { title: "Hunted", author: "Darcy Coates", pageCount: 304, genre: "Horror", publicationDate: "2017", description: "A group of friends searching for a missing hiker in a remote Australian forest discover they are not the only ones in the woods.", series: null, tier: 1, topRank: null },
  { title: "From Below", author: "Darcy Coates", pageCount: 320, genre: "Horror", publicationDate: "2022", description: "A deep-sea dive team is hired to explore the wreck of a WWII-era cargo ship at the edge of human-survivable depth — and finds something has been waiting for them.", series: null, tier: 1, topRank: null },

  // Sarah Pinborough (3)
  { title: "Behind Her Eyes", author: "Sarah Pinborough", pageCount: 320, genre: "Thriller", publicationDate: "2017", description: "A single mother befriends the beautiful wife of her boss — and finds herself at the center of a psychological thriller with a notoriously unexpected ending.", series: null, tier: 1, topRank: null },
  { title: "Dead to Her", author: "Sarah Pinborough", pageCount: 352, genre: "Thriller", publicationDate: "2020", description: "A Savannah socialite's husband brings home a young Black second wife — and Marcie's polite tolerance begins to slip into something darker.", series: null, tier: 1, topRank: null },
  { title: "Cross Her Heart", author: "Sarah Pinborough", pageCount: 368, genre: "Thriller", publicationDate: "2018", description: "Three women — a mother, a daughter, and the mother's best friend — hold secrets that begin to surface when the daughter is nearly killed in an accident.", series: null, tier: 1, topRank: null },

  // Keith Roberts (2)
  { title: "Pavane", author: "Keith Roberts", pageCount: 288, genre: "Sci-Fi", publicationDate: "1968", description: "Roberts's alt-history fix-up: Queen Elizabeth I is assassinated in 1588, the Spanish Armada wins, and by the 20th century England is a technologically stagnant Catholic province.", series: null, tier: 1, topRank: null },
  { title: "The Chalk Giants", author: "Keith Roberts", pageCount: 288, genre: "Sci-Fi", publicationDate: "1974", description: "Linked stories set on a post-apocalyptic English coast — the chalk-cliff giants bear witness as civilization recedes and re-emerges as myth.", series: null, tier: 1, topRank: null },

  // Fred Saberhagen (3)
  { title: "Berserker", author: "Fred Saberhagen", pageCount: 240, genre: "Sci-Fi", publicationDate: "1967", description: "The first Berserker fix-up: giant sentient machines designed by a long-dead civilization hunt and kill all organic life across the galaxy — and humans must figure out how to stop them.", series: { name: "Berserker", order: 1, total: 18 }, tier: 1, topRank: null },
  { title: "The Broken Lands", author: "Fred Saberhagen", pageCount: 224, genre: "Fantasy", publicationDate: "1968", description: "The first Empire of the East novel: in a far-future post-magical-holocaust Earth, a young resistance member fights an empire that rules through elemental demons.", series: { name: "Empire of the East", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Holmes-Dracula File", author: "Fred Saberhagen", pageCount: 224, genre: "Mystery", publicationDate: "1978", description: "Saberhagen's mash-up: Count Dracula arrives in Victorian London just as Sherlock Holmes is investigating a vampire case — and the two must collaborate.", series: null, tier: 1, topRank: null },

  // Murray Leinster (2)
  { title: "First Contact", author: "Murray Leinster", pageCount: 192, genre: "Sci-Fi", publicationDate: "1945", description: "Leinster's landmark novella (published as a collection): two starships from different civilizations meet in deep space and must solve the problem of how to part without telling each other where home is.", series: null, tier: 1, topRank: null },
  { title: "The Forgotten Planet", author: "Murray Leinster", pageCount: 192, genre: "Sci-Fi", publicationDate: "1954", description: "A planet seeded with Earth biology is forgotten for generations — and the descendants of its survivors regress to pre-stone-age life among giant insects.", series: null, tier: 1, topRank: null },

  // Fredric Brown (3)
  { title: "Martians, Go Home", author: "Fredric Brown", pageCount: 176, genre: "Sci-Fi", publicationDate: "1955", description: "Brown's comic satire: a billion obnoxious green Martians appear on Earth overnight and refuse to leave, broadcasting people's secrets and heckling everyone within earshot.", series: null, tier: 1, topRank: null },
  { title: "What Mad Universe", author: "Fredric Brown", pageCount: 176, genre: "Sci-Fi", publicationDate: "1949", description: "An SF magazine editor is accidentally transported into the kind of pulp space opera he's been rejecting — and discovers he can't get back out.", series: null, tier: 1, topRank: null },
  { title: "The Lights in the Sky Are Stars", author: "Fredric Brown", pageCount: 208, genre: "Sci-Fi", publicationDate: "1953", description: "A 60-year-old engineer in the near-future struggles to build public support for a manned mission to Jupiter — Brown's quiet late novel about space advocacy.", series: null, tier: 1, topRank: null },

  // Daniel José Older (3)
  { title: "Shadowshaper", author: "Daniel José Older", pageCount: 304, genre: "Young Adult", publicationDate: "2015", description: "A Brooklyn teenager discovers her Puerto Rican family's tradition of 'shadowshaping' — merging spirits into art — and is hunted by someone who wants to steal it.", series: { name: "Shadowshaper Cypher", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Half-Resurrection Blues", author: "Daniel José Older", pageCount: 336, genre: "Fantasy", publicationDate: "2015", description: "The first Bone Street Rumba novel: a half-dead Brooklyn PI works for the Council of the Dead and investigates a case that points toward something older than the afterlife.", series: { name: "Bone Street Rumba", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Dactyl Hill Squad", author: "Daniel José Older", pageCount: 272, genre: "Young Adult", publicationDate: "2018", description: "In an alternate Civil War Brooklyn with dinosaurs, five orphans of color lead a resistance against slave catchers who are kidnapping children of color into the war effort.", series: null, tier: 1, topRank: null },

  // Damon Knight (2)
  { title: "A for Anything", author: "Damon Knight", pageCount: 224, genre: "Sci-Fi", publicationDate: "1961", description: "A matter duplicator called a 'Gismo' is invented — and civilization collapses into neo-feudalism as the gift of infinite abundance makes every form of labor worthless.", series: null, tier: 1, topRank: null },
  { title: "Beyond the Barrier", author: "Damon Knight", pageCount: 192, genre: "Sci-Fi", publicationDate: "1964", description: "An amnesiac college professor discovers he was transported from the far future to escape an alien enemy — and the enemy has followed him back.", series: null, tier: 1, topRank: null },
];

// ── Apply deletions to PRIMARY ──
const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
let books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const beforeP = books.length;

const toDelete = new Set();
for (const d of DELETE) {
  const idx = books.findIndex(b => b.title === d.title && b.author === d.author);
  if (idx !== -1) {
    toDelete.add(idx);
    console.log(`  ✓ removing dupe: "${d.title}" — ${d.author}`);
  }
}
books = books.filter((_, i) => !toDelete.has(i));

// ── Apply PRIMARY additions ──
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
console.log(`\nPRIMARY: +${primaryAdd.length} -${toDelete.size}, ${beforeP} → ${nextBooks.length}`);

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

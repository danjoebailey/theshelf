const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Andrew Rowe (3)
  { title: "Forging Divinity", author: "Andrew Rowe", pageCount: 384, genre: "Fantasy", publicationDate: "2016", description: "The first Weapons and Wielders novel: a young researcher with a forbidden talent for forging magical relics is drawn into a war for the tools of the gods.", series: { name: "Weapons and Wielders", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Stealing Sorcery", author: "Andrew Rowe", pageCount: 432, genre: "Fantasy", publicationDate: "2016", description: "Weapons and Wielders #2: Lydia and her companions infiltrate a rival city-state to steal back a stolen relic while navigating an assassin cabal.", series: { name: "Weapons and Wielders", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Six Sacred Swords", author: "Andrew Rowe", pageCount: 352, genre: "Fantasy", publicationDate: "2018", description: "The first Weapons and Wielders novel set in the same universe as Arcane Ascension: an ex-soldier carrying a sentient blade must recover the other five legendary weapons.", series: { name: "Weapons and Wielders (Second Arc)", order: 1, total: 5 }, tier: 1, topRank: null },

  // Will Wight (1)
  { title: "House of Blades", author: "Will Wight", pageCount: 336, genre: "Fantasy", publicationDate: "2013", description: "Wight's debut: the first Traveler's Gate novel, in which a young blacksmith from a backwater village is drawn into a war between nine magical Territories.", series: { name: "The Traveler's Gate", order: 1, total: 3 }, tier: 1, topRank: null },

  // Michael R. Fletcher (2)
  { title: "The Mirror's Truth", author: "Michael R. Fletcher", pageCount: 576, genre: "Fantasy", publicationDate: "2016", description: "Manifest Delusions #2: in Fletcher's grimdark world where belief literally shapes reality, a trio of damaged characters continue to chase a messianic boy through a crumbling empire.", series: { name: "Manifest Delusions", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The All Consuming", author: "Michael R. Fletcher", pageCount: 608, genre: "Fantasy", publicationDate: "2020", description: "Manifest Delusions #3: the conclusion of Fletcher's trilogy, in which the world's delusions tear open to reveal what lies beneath them.", series: { name: "Manifest Delusions", order: 3, total: 3 }, tier: 1, topRank: null },

  // Philip José Farmer (2)
  { title: "The Maker of Universes", author: "Philip José Farmer", pageCount: 224, genre: "Sci-Fi", publicationDate: "1965", description: "The first World of Tiers novel: a bored professor accidentally uses a mystical horn to enter a pocket universe whose stepped-pyramid worlds each occupy a different tier.", series: { name: "World of Tiers", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The Gates of Creation", author: "Philip José Farmer", pageCount: 224, genre: "Sci-Fi", publicationDate: "1966", description: "World of Tiers #2: Robert Wolff's adventures continue as he discovers more pocket universes built by the enigmatic Lords and confronts the family politics of their creators.", series: { name: "World of Tiers", order: 2, total: 7 }, tier: 1, topRank: null },

  // Margaret Rogerson (3)
  { title: "An Enchantment of Ravens", author: "Margaret Rogerson", pageCount: 320, genre: "Young Adult", publicationDate: "2017", description: "Rogerson's debut: a human portrait painter in a village that survives by trading art to the fair folk commits the unforgivable mistake of painting a fae prince's mortal sorrow.", series: null, tier: 1, topRank: null },
  { title: "Vespertine", author: "Margaret Rogerson", pageCount: 400, genre: "Young Adult", publicationDate: "2021", description: "In a world where the restless dead rise as spirits, a young novice becomes the first in centuries to bind herself to an ancient revenant — and may need to use him to save her convent.", series: { name: "Vespertine", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Mysteries of Thorn Manor", author: "Margaret Rogerson", pageCount: 176, genre: "Young Adult", publicationDate: "2023", description: "A novella sequel to Sorcery of Thorns: Elisabeth and Nathaniel must contain the magical wards of his family's estate as ghosts and enchantments wake for the spring.", series: null, tier: 1, topRank: null },

  // Gena Showalter (3)
  { title: "The Darkest Whisper", author: "Gena Showalter", pageCount: 384, genre: "Romance", publicationDate: "2009", description: "Lords of the Underworld #4: Sabin, keeper of the demon Doubt, meets the mute Harpy Gwendolyn and must convince her she's worth believing in.", series: { name: "Lords of the Underworld", order: 4, total: 14 }, tier: 1, topRank: null },
  { title: "The Darkest Passion", author: "Gena Showalter", pageCount: 416, genre: "Romance", publicationDate: "2010", description: "Lords of the Underworld #5: the warrior Aeron, host of the demon Wrath, is hunted by the angel Olivia — who has been ordered to kill him but is in love with him instead.", series: { name: "Lords of the Underworld", order: 5, total: 14 }, tier: 1, topRank: null },
  { title: "The Darkest Surrender", author: "Gena Showalter", pageCount: 464, genre: "Romance", publicationDate: "2011", description: "Lords of the Underworld #8: Strider, keeper of the demon Defeat, must win a magical tournament to save a Harpy princess from her enemies.", series: { name: "Lords of the Underworld", order: 8, total: 14 }, tier: 1, topRank: null },

  // Jennifer L. Armentrout (3)
  { title: "Obsidian", author: "Jennifer L. Armentrout", pageCount: 336, genre: "Young Adult", publicationDate: "2011", description: "The first Lux novel: a Virginia teenager discovers her gorgeous new neighbor is a Luxen — a glowing alien in human form — and unwittingly attracts cosmic attention.", series: { name: "Lux", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Half-Blood", author: "Jennifer L. Armentrout", pageCount: 304, genre: "Young Adult", publicationDate: "2011", description: "The first Covenant novel: the half-blood daughter of a goddess and a pureblood demigod must return to the training academy she ran from to save her dying mother.", series: { name: "Covenant", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Wicked", author: "Jennifer L. Armentrout", pageCount: 384, genre: "Romance", publicationDate: "2014", description: "The first Wicked novel: a New Orleans pub owner falls for a mysterious stranger and discovers she is a fae halfling hunted by a rival faction of her own people.", series: { name: "Wicked Trilogy", order: 1, total: 4 }, tier: 1, topRank: null },

  // Nathan Ballingrud (2)
  { title: "The Strange", author: "Nathan Ballingrud", pageCount: 320, genre: "Sci-Fi", publicationDate: "2023", description: "Ballingrud's pulp-era SF novel: in an alternate 1930s where Mars has been colonized and cut off from Earth, a teenage diner waitress and a war veteran face a dangerous rebellion.", series: null, tier: 1, topRank: null },
  { title: "The Visible Filth", author: "Nathan Ballingrud", pageCount: 96, genre: "Horror", publicationDate: "2015", description: "Ballingrud's novella of a New Orleans bartender who finds a stranger's lost phone — and begins receiving videos he cannot bring himself to stop watching.", series: null, tier: 1, topRank: null },

  // Bora Chung (1)
  { title: "Your Utopia", author: "Bora Chung", pageCount: 208, genre: "Fiction", publicationDate: "2024", description: "Chung's second story collection: eight tales of speculative horror and absurd comedy — a self-driving car, an apartment building under siege, a last human on Earth.", series: null, tier: 1, topRank: null },

  // Eric LaRocca (2)
  { title: "Everything the Darkness Eats", author: "Eric LaRocca", pageCount: 272, genre: "Horror", publicationDate: "2023", description: "LaRocca's first full-length novel: a Connecticut town where a widower's grief becomes a doorway for a predatory cosmic cult to move in.", series: null, tier: 1, topRank: null },
  { title: "We Can Never Leave This Place", author: "Eric LaRocca", pageCount: 176, genre: "Horror", publicationDate: "2023", description: "LaRocca's novella of a teenage girl in a collapsing wartime household visited nightly by a mysterious stranger — and the impossible bargain at the center of her family.", series: null, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // M.L. Wang (2)
  { title: "The Sword of Kaigen", author: "M.L. Wang", pageCount: 656, genre: "Fantasy", publicationDate: "2019", description: "Wang's self-published military fantasy set in a feudal-Japan-inspired empire: a family of warriors loyal to a dying empire must finally reckon with what their obedience has cost.", series: null, tier: 1, topRank: null },
  { title: "Blood Over Bright Haven", author: "M.L. Wang", pageCount: 480, genre: "Fantasy", publicationDate: "2024", description: "A gifted magical researcher at a prestigious academy discovers her society's shining city is built on an appalling secret — Wang's dark academia fantasy.", series: null, tier: 1, topRank: null },

  // Jenn Lyons (3)
  { title: "The Ruin of Kings", author: "Jenn Lyons", pageCount: 576, genre: "Fantasy", publicationDate: "2019", description: "The first Chorus of Dragons novel: a singer-turned-slave-turned-prince tells the story of his life to his jailer as the empire around them crumbles.", series: { name: "A Chorus of Dragons", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Name of All Things", author: "Jenn Lyons", pageCount: 592, genre: "Fantasy", publicationDate: "2019", description: "A Chorus of Dragons #2: Janel Theranon tells her story of confronting the dragon Morios to a hidden audience who need to understand why the empire is falling apart.", series: { name: "A Chorus of Dragons", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "The Memory of Souls", author: "Jenn Lyons", pageCount: 640, genre: "Fantasy", publicationDate: "2020", description: "A Chorus of Dragons #3: Kihrin, Janel, and Teraeth confront the eight immortal demons whose schemes are threatening to destroy the world.", series: { name: "A Chorus of Dragons", order: 3, total: 5 }, tier: 1, topRank: null },

  // RJ Barker (3)
  { title: "Age of Assassins", author: "RJ Barker", pageCount: 432, genre: "Fantasy", publicationDate: "2017", description: "The first Wounded Kingdom novel: a disabled apprentice assassin is hired to protect the life of a prince whose court is hiding a dozen different reasons to kill him.", series: { name: "The Wounded Kingdom", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Blood of Assassins", author: "RJ Barker", pageCount: 384, genre: "Fantasy", publicationDate: "2018", description: "Wounded Kingdom #2: Girton Club-Foot returns from exile to find the kingdom at war — and his old friend Rufra on the wrong side of a throne.", series: { name: "The Wounded Kingdom", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "King of Assassins", author: "RJ Barker", pageCount: 432, genre: "Fantasy", publicationDate: "2018", description: "Wounded Kingdom #3: Girton and Rufra must survive a gathering of kingdoms summoned to elect a new high king — and the assassins every faction has sent.", series: { name: "The Wounded Kingdom", order: 3, total: 3 }, tier: 1, topRank: null },

  // Simone St. James (4)
  { title: "The Sun Down Motel", author: "Simone St. James", pageCount: 336, genre: "Thriller", publicationDate: "2020", description: "A young woman investigates the 1982 disappearance of her aunt from a haunted roadside motel — and discovers the same things are happening to her now.", series: null, tier: 1, topRank: null },
  { title: "The Book of Cold Cases", author: "Simone St. James", pageCount: 352, genre: "Thriller", publicationDate: "2022", description: "A true-crime blogger is invited into the home of the woman acquitted of a pair of 1977 murders — and discovers the truth has been hiding in the house all along.", series: null, tier: 1, topRank: null },
  { title: "The Broken Girls", author: "Simone St. James", pageCount: 336, genre: "Thriller", publicationDate: "2018", description: "A Vermont girls' boarding school abandoned in 1950 is being restored — and a journalist investigating her sister's murder finds the school's ghost story was real.", series: null, tier: 1, topRank: null },
  { title: "Murder Road", author: "Simone St. James", pageCount: 336, genre: "Thriller", publicationDate: "2024", description: "A honeymooning couple picks up a hitchhiker who dies in their car — and they are stalked by the ghost of the woman they helped onto a highway she never left.", series: null, tier: 1, topRank: null },

  // Ronald Malfi (3)
  { title: "Come with Me", author: "Ronald Malfi", pageCount: 352, genre: "Horror", publicationDate: "2021", description: "A grieving widower investigates his wife's obsessive secret research into a decades-old series of unsolved murders — and begins to receive signs she is still watching.", series: null, tier: 1, topRank: null },
  { title: "Ghostwritten", author: "Ronald Malfi", pageCount: 336, genre: "Horror", publicationDate: "2022", description: "A collection of four novellas, each built around a book whose text is slowly rewriting itself — or rewriting its readers.", series: null, tier: 1, topRank: null },
  { title: "Bone White", author: "Ronald Malfi", pageCount: 432, genre: "Horror", publicationDate: "2017", description: "A man investigating his missing twin brother travels to a remote Alaska village where a confessed serial killer won't say where he buried the bodies.", series: null, tier: 1, topRank: null },

  // Nick Cutter (3)
  { title: "The Troop", author: "Nick Cutter", pageCount: 368, genre: "Horror", publicationDate: "2013", description: "A scoutmaster and five Canadian boys on a Prince Edward Island wilderness weekend take in a stranger carrying a horrifying biological contamination.", series: null, tier: 1, topRank: null },
  { title: "The Deep", author: "Nick Cutter", pageCount: 416, genre: "Horror", publicationDate: "2015", description: "A marine biologist is brought to an eight-mile-deep underwater research station where a cure for a pandemic has been found — and where the researchers are becoming monsters.", series: null, tier: 1, topRank: null },
  { title: "Little Heaven", author: "Nick Cutter", pageCount: 480, genre: "Horror", publicationDate: "2017", description: "Three mercenaries are hired to rescue a child from a New Mexico religious commune in 1965 — and discover the commune is the front for something far older and hungrier.", series: null, tier: 1, topRank: null },

  // Andy Davidson (3)
  { title: "The Boatman's Daughter", author: "Andy Davidson", pageCount: 368, genre: "Horror", publicationDate: "2020", description: "A teenage smuggler in the Arkansas swamplands is caught between a drug-running preacher, a deranged witch, and the ancient spirit that haunts the river.", series: null, tier: 1, topRank: null },
  { title: "The Hollow Kind", author: "Andy Davidson", pageCount: 368, genre: "Horror", publicationDate: "2022", description: "A woman inherits her grandfather's South Georgia turpentine plantation in 1989 and finds it sitting on top of a horror as old as the land itself.", series: null, tier: 1, topRank: null },
  { title: "In the Valley of the Sun", author: "Andy Davidson", pageCount: 352, genre: "Horror", publicationDate: "2017", description: "A West Texas drifter with a monstrous secret meets a woman running a roadside motel in 1980 — and the worst and best possibilities of what he might become.", series: null, tier: 1, topRank: null },

  // Jennifer McMahon (3)
  { title: "The Winter People", author: "Jennifer McMahon", pageCount: 336, genre: "Horror", publicationDate: "2014", description: "In present-day Vermont a teenage girl investigates a 1908 disappearance — and discovers the old farmhouse she lives in holds a ritual that has been passed down for a century.", series: null, tier: 1, topRank: null },
  { title: "Promise Not to Tell", author: "Jennifer McMahon", pageCount: 288, genre: "Thriller", publicationDate: "2007", description: "A school nurse returning to her rural Vermont hometown after her mother's death investigates a new child murder that mirrors an unsolved killing from her own childhood.", series: null, tier: 1, topRank: null },
  { title: "The Drowning Kind", author: "Jennifer McMahon", pageCount: 336, genre: "Horror", publicationDate: "2021", description: "A social worker inherits her grandmother's Vermont lake house and discovers the water in the family spring has been granting wishes — and collecting payment.", series: null, tier: 1, topRank: null },

  // Harry Harrison (4)
  { title: "The Stainless Steel Rat", author: "Harry Harrison", pageCount: 192, genre: "Sci-Fi", publicationDate: "1961", description: "Harrison's comic science-fiction: James 'Slippery Jim' DiGriz, the galaxy's most charming thief, is caught by the Special Corps and recruited to catch bigger criminals.", series: { name: "Stainless Steel Rat", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "Deathworld", author: "Harry Harrison", pageCount: 176, genre: "Sci-Fi", publicationDate: "1960", description: "A professional gambler is hired to visit Pyrrus, a colony world where every native organism is trying to kill the humans — and where the humans are winning.", series: { name: "Deathworld", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Make Room! Make Room!", author: "Harry Harrison", pageCount: 240, genre: "Sci-Fi", publicationDate: "1966", description: "Harrison's overpopulation dystopia: the New York City of 1999, with 35 million residents, a drowning government, and a detective on a homicide case — the basis for Soylent Green.", series: null, tier: 1, topRank: null },
  { title: "Bill, the Galactic Hero", author: "Harry Harrison", pageCount: 256, genre: "Sci-Fi", publicationDate: "1965", description: "Harrison's savage military-SF satire: a naive farmboy is drafted into the Galactic Emperor's war against the Chingers and discovers war is a lot less glorious than he expected.", series: null, tier: 1, topRank: null },

  // Keith Laumer (3)
  { title: "Retief: Envoy to New Worlds", author: "Keith Laumer", pageCount: 192, genre: "Sci-Fi", publicationDate: "1963", description: "The first Retief collection: a competent second secretary at the Corps Diplomatique Terrestrienne must repeatedly save his own idiot superiors from interstellar disaster.", series: { name: "Retief", order: 1, total: 16 }, tier: 1, topRank: null },
  { title: "Worlds of the Imperium", author: "Keith Laumer", pageCount: 176, genre: "Sci-Fi", publicationDate: "1962", description: "Laumer's first novel: an American diplomat is kidnapped into a parallel-worlds empire and asked to impersonate his counterpart — who has just staged a revolution.", series: { name: "Imperium", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "A Plague of Demons", author: "Keith Laumer", pageCount: 192, genre: "Sci-Fi", publicationDate: "1965", description: "An intelligence officer discovers the bodies of dead soldiers are being harvested and used as raw material in alien war-machine brains.", series: null, tier: 1, topRank: null },

  // E.E. Smith (4)
  { title: "Triplanetary", author: "E.E. Smith", pageCount: 240, genre: "Sci-Fi", publicationDate: "1934", description: "The first Lensman novel (chronologically): the origin of the Arisian and Eddorian conflict that will shape humanity's future as the galaxy's Lensman guardians.", series: { name: "Lensman", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "First Lensman", author: "E.E. Smith", pageCount: 240, genre: "Sci-Fi", publicationDate: "1950", description: "Lensman #2: the founding of the Galactic Patrol and the selection of the first human Lensman — a Virgil Samms who must battle a far-reaching political conspiracy.", series: { name: "Lensman", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Galactic Patrol", author: "E.E. Smith", pageCount: 256, genre: "Sci-Fi", publicationDate: "1937", description: "Lensman #3: the first novel Smith wrote in the series, introducing Kimball Kinnison — the lensman who will carry the galaxy into a thousand-year war.", series: { name: "Lensman", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "The Skylark of Space", author: "E.E. Smith", pageCount: 192, genre: "Sci-Fi", publicationDate: "1928", description: "Smith's debut and one of the founding texts of space opera: a scientist discovers an element that can fling him to the stars — and must race a rival to the galaxy.", series: { name: "Skylark", order: 1, total: 4 }, tier: 1, topRank: null },

  // C.M. Kornbluth (2)
  { title: "The Syndic", author: "C.M. Kornbluth", pageCount: 192, genre: "Sci-Fi", publicationDate: "1953", description: "Kornbluth's dystopia: a crumbling American government has been replaced by two rival organized-crime syndicates, and a young Syndic executive discovers a new threat to both.", series: null, tier: 1, topRank: null },
  { title: "Not This August", author: "C.M. Kornbluth", pageCount: 192, genre: "Sci-Fi", publicationDate: "1955", description: "Kornbluth's Cold War nightmare: the Soviets and Chinese have conquered the continental United States in August 1965, and a Chicago dairy farmer joins the resistance.", series: null, tier: 1, topRank: null },

  // Eric Frank Russell (3)
  { title: "Wasp", author: "Eric Frank Russell", pageCount: 192, genre: "Sci-Fi", publicationDate: "1957", description: "Russell's satire: a single Terran agent is deployed to a totalitarian alien world with instructions to cause as much disruption as possible — like a wasp in a car.", series: null, tier: 1, topRank: null },
  { title: "Sinister Barrier", author: "Eric Frank Russell", pageCount: 192, genre: "Sci-Fi", publicationDate: "1943", description: "Russell's landmark novel: a series of scientist suicides leads an investigator to discover that humanity is the property of unseen energy beings living above our spectrum.", series: null, tier: 1, topRank: null },
  { title: "Men, Martians and Machines", author: "Eric Frank Russell", pageCount: 192, genre: "Sci-Fi", publicationDate: "1955", description: "A fix-up of Russell's Jay Score stories: linked adventures of a mixed human-Martian-robot starship crew exploring a universe of increasingly strange aliens.", series: null, tier: 1, topRank: null },

  // Claire Legrand (3)
  { title: "Furyborn", author: "Claire Legrand", pageCount: 512, genre: "Young Adult", publicationDate: "2018", description: "The first Empirium Trilogy novel: two queens born a thousand years apart are destined to fulfill a prophecy that will decide the fate of their world.", series: { name: "Empirium", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Kingsbane", author: "Claire Legrand", pageCount: 608, genre: "Young Adult", publicationDate: "2019", description: "Empirium #2: Queen Rielle's descent toward the demon-bound angelic faction continues in the past while Eliana uncovers more of her own prophesied identity in the future.", series: { name: "Empirium", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Lightbringer", author: "Claire Legrand", pageCount: 608, genre: "Young Adult", publicationDate: "2020", description: "Empirium #3: the final confrontation between the Sun Queen and the Blood Queen across two timelines — the conclusion of Legrand's trilogy.", series: { name: "Empirium", order: 3, total: 3 }, tier: 1, topRank: null },

  // Kerrelyn Sparks (3)
  { title: "How to Marry a Millionaire Vampire", author: "Kerrelyn Sparks", pageCount: 384, genre: "Romance", publicationDate: "2005", description: "The first Love at Stake novel: a dental hygienist treats a patient with unusually sharp canines and is drawn into the modern politics of the American vampire community.", series: { name: "Love at Stake", order: 1, total: 16 }, tier: 1, topRank: null },
  { title: "Vamps and the City", author: "Kerrelyn Sparks", pageCount: 384, genre: "Romance", publicationDate: "2006", description: "Love at Stake #2: a vampire princess working as a TV reality-show producer falls for a CIA agent assigned to take down her new show's fanged cast.", series: { name: "Love at Stake", order: 2, total: 16 }, tier: 1, topRank: null },
  { title: "Be Still My Vampire Heart", author: "Kerrelyn Sparks", pageCount: 416, genre: "Romance", publicationDate: "2007", description: "Love at Stake #3: a CIA agent hunting supernatural terrorists falls for a Scottish vampire — who has been assigned to kill her.", series: { name: "Love at Stake", order: 3, total: 16 }, tier: 1, topRank: null },

  // Joe R. Lansdale (4)
  { title: "Savage Season", author: "Joe R. Lansdale", pageCount: 224, genre: "Mystery", publicationDate: "1990", description: "The first Hap and Leonard novel: a white Democrat and his Black Vietnam-vet best friend in East Texas are drawn into a cursed money hunt that goes catastrophically wrong.", series: { name: "Hap and Leonard", order: 1, total: 12 }, tier: 1, topRank: null },
  { title: "The Bottoms", author: "Joe R. Lansdale", pageCount: 336, genre: "Mystery", publicationDate: "2000", description: "Lansdale's Edgar Award-winning novel: in 1930s East Texas a thirteen-year-old boy and his sister find the body of a Black woman in the woods and witness their community's response.", series: null, tier: 1, topRank: null },
  { title: "Bubba Ho-Tep", author: "Joe R. Lansdale", pageCount: 96, genre: "Horror", publicationDate: "2003", description: "Lansdale's cult novella: an aging Elvis and a Black man convinced he's JFK fight an Egyptian mummy terrorizing their East Texas nursing home.", series: null, tier: 1, topRank: null },
  { title: "Cold in July", author: "Joe R. Lansdale", pageCount: 272, genre: "Mystery", publicationDate: "1989", description: "A small-town Texas frame shop owner shoots a burglar — and discovers the man's vengeful father is convinced the wrong body is in the grave.", series: null, tier: 1, topRank: null },

  // Ania Ahlborn (3)
  { title: "Seed", author: "Ania Ahlborn", pageCount: 224, genre: "Horror", publicationDate: "2011", description: "Ahlborn's self-published debut: a father who made a childhood bargain with a demonic being finds it has returned decades later for his young daughter.", series: null, tier: 1, topRank: null },
  { title: "Brother", author: "Ania Ahlborn", pageCount: 288, genre: "Horror", publicationDate: "2015", description: "A young man raised by a backwoods Appalachian family of killers falls for a girl in a neighboring town and tries to escape — while his brother tries to drag him back.", series: null, tier: 1, topRank: null },
  { title: "The Shuddering", author: "Ania Ahlborn", pageCount: 304, genre: "Horror", publicationDate: "2013", description: "Two siblings and their friends retreat to a Colorado ski cabin to say goodbye to their childhood — and are hunted by starving creatures no one has seen before.", series: null, tier: 1, topRank: null },
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

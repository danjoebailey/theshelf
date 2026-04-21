const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");
const REC_LIBRARY = path.join(__dirname, "..", "public", "rec-library.json");

// ── PRIMARY (existing authors) ────────────────────────────────────────────
const PRIMARY_ADDITIONS = [
  // Sherrilyn Kenyon (4)
  { title: "Kiss of the Night", author: "Sherrilyn Kenyon", pageCount: 352, genre: "Romance", publicationDate: "2004", description: "Dark-Hunter #4: the Apollite prince Wulf Tryggvason, cursed to exist without being remembered by anyone who meets him, finally finds the one woman who won't forget him.", series: { name: "Dark-Hunter", order: 4, total: 28 }, tier: 1, topRank: null },
  { title: "Night Play", author: "Sherrilyn Kenyon", pageCount: 368, genre: "Romance", publicationDate: "2004", description: "Dark-Hunter #6: the Were-Hunter Vane Kattalakis rescues a human shopkeeper from an attack and discovers she is the mate his soul has been waiting for.", series: { name: "Dark-Hunter", order: 6, total: 28 }, tier: 1, topRank: null },
  { title: "Seize the Night", author: "Sherrilyn Kenyon", pageCount: 384, genre: "Romance", publicationDate: "2005", description: "Dark-Hunter #7: the Dark-Hunter Valerius Magnus, an ancient Roman general, falls in love with the daughter of a gladiator whose line has cursed his family for centuries.", series: { name: "Dark-Hunter", order: 7, total: 28 }, tier: 1, topRank: null },
  { title: "Sins of the Night", author: "Sherrilyn Kenyon", pageCount: 384, genre: "Romance", publicationDate: "2005", description: "Dark-Hunter #8: the Squire of Dark-Hunters Alexion, sent from Katoteros to check on a rogue group, finds his humanity returning for the first time in 9,000 years.", series: { name: "Dark-Hunter", order: 8, total: 28 }, tier: 1, topRank: null },

  // J.R. Ward (5)
  { title: "Lover Unleashed", author: "J.R. Ward", pageCount: 608, genre: "Romance", publicationDate: "2011", description: "Black Dagger Brotherhood #9: Payne, twin sister of Vishous, breaks free from her millennia-long imprisonment — and needs a human surgeon whose skills may kill them both.", series: { name: "Black Dagger Brotherhood", order: 9, total: 22 }, tier: 1, topRank: null },
  { title: "Lover Reborn", author: "J.R. Ward", pageCount: 624, genre: "Romance", publicationDate: "2012", description: "Black Dagger Brotherhood #10: Tohrment returns to the Brotherhood devastated by the loss of his mate Wellsie and must find his way back through No'One.", series: { name: "Black Dagger Brotherhood", order: 10, total: 22 }, tier: 1, topRank: null },
  { title: "The Shadows", author: "J.R. Ward", pageCount: 496, genre: "Romance", publicationDate: "2015", description: "Black Dagger Brotherhood #13: the Shadow brothers Trez and iAm face the ancient obligations of their people — one brother tied to a prophecy of certain death.", series: { name: "Black Dagger Brotherhood", order: 13, total: 22 }, tier: 1, topRank: null },
  { title: "The Beast", author: "J.R. Ward", pageCount: 512, genre: "Romance", publicationDate: "2016", description: "Black Dagger Brotherhood #14: Rhage and Mary's bonded mate relationship is tested by Mary's unexpected pregnancy and the return of the beast that hunts through Rhage.", series: { name: "Black Dagger Brotherhood", order: 14, total: 22 }, tier: 1, topRank: null },
  { title: "The Chosen", author: "J.R. Ward", pageCount: 464, genre: "Romance", publicationDate: "2017", description: "Black Dagger Brotherhood #15: Xcor, the rebel commander in chains beneath the Brotherhood's mansion, and Layla, Chosen mother of his unborn child, must both make impossible choices.", series: { name: "Black Dagger Brotherhood", order: 15, total: 22 }, tier: 1, topRank: null },

  // Kresley Cole (3)
  { title: "Demon from the Dark", author: "Kresley Cole", pageCount: 368, genre: "Romance", publicationDate: "2010", description: "Immortals After Dark #10: a Ghost-demon captured by the witch organization Order is paired with a half-Vrekener witch for an escape through hostile dimensions.", series: { name: "Immortals After Dark", order: 10, total: 18 }, tier: 1, topRank: null },
  { title: "Dreams of a Dark Warrior", author: "Kresley Cole", pageCount: 432, genre: "Romance", publicationDate: "2011", description: "Immortals After Dark #11: a Valkyrie lieutenant and the warrior she's loved through a dozen reincarnations finally meet across the right lifetime.", series: { name: "Immortals After Dark", order: 11, total: 18 }, tier: 1, topRank: null },
  { title: "Dark Desires After Dusk", author: "Kresley Cole", pageCount: 384, genre: "Romance", publicationDate: "2008", description: "Immortals After Dark #6: the half-demon professor Cadeon 'Cade' Woede must deliver the Halo Chosen One Holly Ashwin to her destiny — and not fall in love with her.", series: { name: "Immortals After Dark", order: 6, total: 18 }, tier: 1, topRank: null },

  // Christine Feehan (4)
  { title: "Dark Challenge", author: "Christine Feehan", pageCount: 384, genre: "Romance", publicationDate: "2000", description: "Dark series #5: the ancient Carpathian Julian Savage seeks out the psychic singer Desari, unaware she is the lifemate meant to save him from the darkness.", series: { name: "Dark", order: 5, total: 36 }, tier: 1, topRank: null },
  { title: "Dark Fire", author: "Christine Feehan", pageCount: 368, genre: "Romance", publicationDate: "2001", description: "Dark series #6: Desari's twin sister Tempest, a human mechanic, is taken in by the wounded Carpathian hunter Darius who claims her as his lifemate.", series: { name: "Dark", order: 6, total: 36 }, tier: 1, topRank: null },
  { title: "Dark Legend", author: "Christine Feehan", pageCount: 384, genre: "Romance", publicationDate: "2002", description: "Dark series #7: Gabriel, the legendary Carpathian hunter, awakens after centuries in the earth to find his lost lifemate reborn in the 21st century.", series: { name: "Dark", order: 7, total: 36 }, tier: 1, topRank: null },
  { title: "Dark Guardian", author: "Christine Feehan", pageCount: 384, genre: "Romance", publicationDate: "2002", description: "Dark series #8: Gabriel's twin brother Lucian, believed to have gone rogue to protect his brother, finally finds his own lifemate in a blind teacher who sees him more clearly than anyone.", series: { name: "Dark", order: 8, total: 36 }, tier: 1, topRank: null },

  // Maggie Stiefvater (3)
  { title: "Shiver", author: "Maggie Stiefvater", pageCount: 392, genre: "Young Adult", publicationDate: "2009", description: "The first Wolves of Mercy Falls novel: a Minnesota teenager who was rescued by a yellow-eyed wolf years earlier meets Sam, the human boy who shares the wolf's body in summer.", series: { name: "The Wolves of Mercy Falls", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Linger", author: "Maggie Stiefvater", pageCount: 368, genre: "Young Adult", publicationDate: "2010", description: "Wolves of Mercy Falls #2: Sam is human at last but Grace is slipping into the wolf form he has escaped — and a new wolf named Cole St. Clair arrives running from his own demons.", series: { name: "The Wolves of Mercy Falls", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Forever", author: "Maggie Stiefvater", pageCount: 400, genre: "Young Adult", publicationDate: "2011", description: "Wolves of Mercy Falls #3: with the wolves of Mercy Falls slated for execution, Sam, Grace, Cole, and Isabel fight to save the pack before the hunt begins.", series: { name: "The Wolves of Mercy Falls", order: 3, total: 4 }, tier: 1, topRank: null },

  // Kendare Blake (3)
  { title: "Anna Dressed in Blood", author: "Kendare Blake", pageCount: 320, genre: "Horror", publicationDate: "2011", description: "A teenage ghost hunter who travels the country killing violent dead arrives in Ontario to destroy Anna Dressed in Blood — and is shocked when she spares him.", series: { name: "Anna Dressed in Blood", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Girl of Nightmares", author: "Kendare Blake", pageCount: 336, genre: "Horror", publicationDate: "2012", description: "Anna Dressed in Blood #2: Cas begins seeing Anna's tortured spirit everywhere and must journey to the afterlife to rescue her from a hell designed for ghosts.", series: { name: "Anna Dressed in Blood", order: 2, total: 2 }, tier: 1, topRank: null },
  { title: "All These Bodies", author: "Kendare Blake", pageCount: 288, genre: "Thriller", publicationDate: "2021", description: "A 1958 rural Minnesota reporter gets drawn into a serial killing case where the victims are exsanguinated — and the sole witness is a teenage girl covered in blood.", series: null, tier: 1, topRank: null },

  // Marissa Meyer (3)
  { title: "Fairest", author: "Marissa Meyer", pageCount: 224, genre: "Young Adult", publicationDate: "2015", description: "A Lunar Chronicles prequel novella: the origin story of Queen Levana, the villain of the main series, tracing her rise to power and her obsession with image.", series: { name: "Lunar Chronicles", order: 3.5, total: 4 }, tier: 1, topRank: null },
  { title: "Gilded", author: "Marissa Meyer", pageCount: 512, genre: "Young Adult", publicationDate: "2021", description: "A dark retelling of Rumpelstiltskin: a miller's daughter cursed to tell lies that come true is presented to a greedy king who demands she spin straw into gold.", series: { name: "Gilded", order: 1, total: 2 }, tier: 1, topRank: null },
  { title: "Cursed", author: "Marissa Meyer", pageCount: 576, genre: "Young Adult", publicationDate: "2022", description: "Gilded #2: Serilda continues to battle the Erlking as her curse grows stronger — and the Wild Hunt prepares for its longest night.", series: { name: "Gilded", order: 2, total: 2 }, tier: 1, topRank: null },

  // Jay Kristoff (3)
  { title: "Stormdancer", author: "Jay Kristoff", pageCount: 432, genre: "Fantasy", publicationDate: "2012", description: "The first Lotus War novel: in a Japanese-inspired steampunk empire choking on its industrial poison, a girl is sent to hunt an arashitora — a mythical thunder tiger — for the Shogun.", series: { name: "The Lotus War", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Kinslayer", author: "Jay Kristoff", pageCount: 512, genre: "Fantasy", publicationDate: "2013", description: "Lotus War #2: after killing the Shogun, Yukiko and her thunder tiger Buruu become the face of a rebellion that is already turning on itself.", series: { name: "The Lotus War", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Endsinger", author: "Jay Kristoff", pageCount: 464, genre: "Fantasy", publicationDate: "2014", description: "Lotus War #3: the final reckoning of the Shima Imperium as the ancient Endsinger awakens and the war for the empire's soul reaches its apocalyptic climax.", series: { name: "The Lotus War", order: 3, total: 3 }, tier: 1, topRank: null },

  // Laini Taylor (1)
  { title: "Lips Touch", author: "Laini Taylor", pageCount: 272, genre: "Young Adult", publicationDate: "2009", description: "Taylor's National Book Award-finalist collection of three illustrated novellas, each built around a moment of magical kissing.", series: null, tier: 1, topRank: null },

  // Renée Ahdieh (3)
  { title: "The Beautiful", author: "Renée Ahdieh", pageCount: 448, genre: "Young Adult", publicationDate: "2019", description: "The first Beautiful Quartet: a French orphan arriving in 1872 New Orleans is drawn into a secret vampire society — and a murder that threatens to expose them.", series: { name: "The Beautiful", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Damned", author: "Renée Ahdieh", pageCount: 432, genre: "Young Adult", publicationDate: "2020", description: "Beautiful Quartet #2: Celine and Bastien must navigate the dangerous underbelly of New Orleans while a new hunter stalks the city's supernatural community.", series: { name: "The Beautiful", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "The Righteous", author: "Renée Ahdieh", pageCount: 416, genre: "Young Adult", publicationDate: "2021", description: "Beautiful Quartet #3: Pippa, preparing for her wedding in Catholic New Orleans, is pulled into the dangerous politics of the Court of Fallen Stars.", series: { name: "The Beautiful", order: 3, total: 4 }, tier: 1, topRank: null },

  // Sangu Mandanna (1)
  { title: "A Witch's Guide to Fake Dating a Demon", author: "Sangu Mandanna", pageCount: 336, genre: "Romance", publicationDate: "2024", description: "A witch raising her late sister's children accidentally summons a demon when she wishes for something good in her life — and the demon offers to fake-date her as payment.", series: null, tier: 1, topRank: null },

  // Ben Aaronovitch (3)
  { title: "The Furthest Station", author: "Ben Aaronovitch", pageCount: 144, genre: "Fantasy", publicationDate: "2017", description: "A Rivers of London novella: Peter Grant investigates a series of encounters with vanishing ghosts on the Metropolitan Line during the morning rush.", series: { name: "Rivers of London", order: 5.7, total: 11 }, tier: 1, topRank: null },
  { title: "Winter's Gifts", author: "Ben Aaronovitch", pageCount: 176, genre: "Fantasy", publicationDate: "2023", description: "Aaronovitch's Rivers of London novella set in rural Wisconsin: FBI agent Kimberley Reynolds investigates a violent death in a small snowbound town.", series: { name: "Rivers of London", order: 9.5, total: 11 }, tier: 1, topRank: null },
  { title: "The Masquerades of Spring", author: "Ben Aaronovitch", pageCount: 176, genre: "Fantasy", publicationDate: "2023", description: "A Rivers of London novella set in 1920s New York: Thomas Nightingale's cousin Augustus Berrycloth-Young investigates a magical murder among the Harlem Renaissance elite.", series: { name: "Rivers of London", order: null, total: 11 }, tier: 1, topRank: null },

  // Mary Robinette Kowal (3)
  { title: "Shades of Milk and Honey", author: "Mary Robinette Kowal", pageCount: 304, genre: "Fantasy", publicationDate: "2010", description: "The first Glamourist Histories: a Regency England-style novel where magic called 'glamour' is a feminine accomplishment, and a plain elder sister's talent for it is her only hope.", series: { name: "Glamourist Histories", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Glamour in Glass", author: "Mary Robinette Kowal", pageCount: 320, genre: "Fantasy", publicationDate: "2012", description: "Glamourist Histories #2: Jane and Vincent travel to Belgium for a working honeymoon during the Hundred Days of Napoleon's return — glamour and politics both twisting around them.", series: { name: "Glamourist Histories", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Without a Summer", author: "Mary Robinette Kowal", pageCount: 368, genre: "Fantasy", publicationDate: "2013", description: "Glamourist Histories #3: during the 'year without a summer' Jane and Vincent are drawn into the Luddite riots — and into a conspiracy against weather-glamourists.", series: { name: "Glamourist Histories", order: 3, total: 5 }, tier: 1, topRank: null },
];

// ── REC LIBRARY (new authors) ────────────────────────────────────────────
const REC_LIBRARY_ADDITIONS = [
  // John Ringo (4)
  { title: "A Hymn Before Battle", author: "John Ringo", pageCount: 480, genre: "Sci-Fi", publicationDate: "2000", description: "The first Legacy of the Aldenata novel: humanity is offered an alliance with a galactic federation, but only if they agree to fight the federation's war against the Posleen.", series: { name: "Legacy of the Aldenata", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Gust Front", author: "John Ringo", pageCount: 624, genre: "Sci-Fi", publicationDate: "2001", description: "Legacy of the Aldenata #2: Earth's unprepared forces brace for the first wave of the Posleen invasion as the hive-aliens begin landing on the planet.", series: { name: "Legacy of the Aldenata", order: 2, total: 11 }, tier: 1, topRank: null },
  { title: "When the Devil Dances", author: "John Ringo", pageCount: 560, genre: "Sci-Fi", publicationDate: "2002", description: "Legacy of the Aldenata #3: five years into the Posleen occupation of the continental United States, the ragged American resistance mounts a counter-offensive.", series: { name: "Legacy of the Aldenata", order: 3, total: 11 }, tier: 1, topRank: null },
  { title: "Ghost", author: "John Ringo", pageCount: 400, genre: "Thriller", publicationDate: "2005", description: "The first Paladin of Shadows novel: a SEAL medically retired from combat is recruited for a deniable mission hunting sex traffickers across Eastern Europe.", series: { name: "Paladin of Shadows", order: 1, total: 6 }, tier: 1, topRank: null },

  // Jack Campbell (4)
  { title: "Dauntless", author: "Jack Campbell", pageCount: 304, genre: "Sci-Fi", publicationDate: "2006", description: "The first Lost Fleet novel: a 100-year-frozen war hero is revived by the Alliance Fleet just in time to save the survivors of a catastrophic defeat behind enemy lines.", series: { name: "The Lost Fleet", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Fearless", author: "Jack Campbell", pageCount: 304, genre: "Sci-Fi", publicationDate: "2007", description: "Lost Fleet #2: Captain 'Black Jack' Geary continues the fleet's desperate journey home through enemy space, with dissension inside his own command.", series: { name: "The Lost Fleet", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Courageous", author: "Jack Campbell", pageCount: 304, genre: "Sci-Fi", publicationDate: "2007", description: "Lost Fleet #3: Geary pursues a hyperdrive device that could get the fleet home instantly while fending off Syndic attacks and political conspiracy.", series: { name: "The Lost Fleet", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "Valiant", author: "Jack Campbell", pageCount: 320, genre: "Sci-Fi", publicationDate: "2008", description: "Lost Fleet #4: with the hypernet key in hand, the fleet runs for home — and runs into the Alliance's own political fractures waiting for it.", series: { name: "The Lost Fleet", order: 4, total: 6 }, tier: 1, topRank: null },

  // Marko Kloos (3)
  { title: "Terms of Enlistment", author: "Marko Kloos", pageCount: 304, genre: "Sci-Fi", publicationDate: "2013", description: "The first Frontlines novel: a welfare city kid escapes into the Territorial Army and finds himself reassigned to a colonial expedition confronting an alien threat.", series: { name: "Frontlines", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "Lines of Departure", author: "Marko Kloos", pageCount: 320, genre: "Sci-Fi", publicationDate: "2014", description: "Frontlines #2: five years into the Lanky War, humanity's colonies are falling one by one and a retired Corpsman rejoins the fight.", series: { name: "Frontlines", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "Angles of Attack", author: "Marko Kloos", pageCount: 304, genre: "Sci-Fi", publicationDate: "2015", description: "Frontlines #3: with Earth cut off from the colonies by the Lankies, a desperate operation attempts to break through to Mars.", series: { name: "Frontlines", order: 3, total: 7 }, tier: 1, topRank: null },

  // William C. Dietz (3)
  { title: "Legion of the Damned", author: "William C. Dietz", pageCount: 336, genre: "Sci-Fi", publicationDate: "1993", description: "The first Legion of the Damned novel: the French Foreign Legion is reborn in space as a home for condemned criminals and cyborg soldiers fighting the Empire's lost causes.", series: { name: "Legion of the Damned", order: 1, total: 11 }, tier: 1, topRank: null },
  { title: "Runner", author: "William C. Dietz", pageCount: 416, genre: "Sci-Fi", publicationDate: "2005", description: "The first Jak Rebo novel: on a backwater planet, a courier sworn to protect a religious child confronts a ruthless guild that wants the boy dead.", series: { name: "Jak Rebo", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Galactic Bounty", author: "William C. Dietz", pageCount: 272, genre: "Sci-Fi", publicationDate: "1986", description: "Dietz's debut and the first Sam McCade novel: a bounty hunter takes the biggest contract of his career and discovers his target is connected to a rebellion.", series: { name: "Sam McCade", order: 1, total: 6 }, tier: 1, topRank: null },

  // Mike Shepherd (3)
  { title: "Kris Longknife: Mutineer", author: "Mike Shepherd", pageCount: 400, genre: "Sci-Fi", publicationDate: "2004", description: "The first Kris Longknife novel: the great-granddaughter of a living war hero struggles to prove herself in her own Navy career — and ends up leading a famous mutiny.", series: { name: "Kris Longknife", order: 1, total: 15 }, tier: 1, topRank: null },
  { title: "Kris Longknife: Deserter", author: "Mike Shepherd", pageCount: 384, genre: "Sci-Fi", publicationDate: "2004", description: "Kris Longknife #2: Lieutenant Longknife hunts her missing boyfriend across a dangerous frontier planet and discovers a conspiracy that reaches her own family.", series: { name: "Kris Longknife", order: 2, total: 15 }, tier: 1, topRank: null },
  { title: "Kris Longknife: Defiant", author: "Mike Shepherd", pageCount: 416, genre: "Sci-Fi", publicationDate: "2005", description: "Kris Longknife #3: Longknife commands a handful of corvettes against a massive Greenfeld invasion — the famous defensive action that will define her career.", series: { name: "Kris Longknife", order: 3, total: 15 }, tier: 1, topRank: null },

  // Lynsay Sands (3)
  { title: "Love Bites", author: "Lynsay Sands", pageCount: 384, genre: "Romance", publicationDate: "2004", description: "The first Argeneau novel: a Toronto dentist hired to fix a vampire family's fangs finds herself drawn into a centuries-old clan of immortals living among modern humans.", series: { name: "Argeneau", order: 1, total: 35 }, tier: 1, topRank: null },
  { title: "Single White Vampire", author: "Lynsay Sands", pageCount: 384, genre: "Romance", publicationDate: "2003", description: "Argeneau #3: a romance editor tracks down her reclusive star author to sign a renewal contract and discovers he's a vampire — and her destined life mate.", series: { name: "Argeneau", order: 3, total: 35 }, tier: 1, topRank: null },
  { title: "Tall, Dark & Hungry", author: "Lynsay Sands", pageCount: 384, genre: "Romance", publicationDate: "2004", description: "Argeneau #4: an Italian Argeneau vampire visits New York and falls for a human woman fleeing a violent ex — and has to keep his nature secret in a brownstone full of family.", series: { name: "Argeneau", order: 4, total: 35 }, tier: 1, topRank: null },

  // Diane Setterfield (3)
  { title: "The Thirteenth Tale", author: "Diane Setterfield", pageCount: 416, genre: "Fiction", publicationDate: "2006", description: "An obscure biographer is summoned by a famous reclusive novelist to finally record her true life story — and uncovers secrets that reshape her own family history.", series: null, tier: 1, topRank: null },
  { title: "Bellman & Black", author: "Diane Setterfield", pageCount: 336, genre: "Fiction", publicationDate: "2013", description: "A successful Victorian businessman makes a mysterious bargain in childhood that returns to him decades later when a stranger in black appears at every funeral he attends.", series: null, tier: 1, topRank: null },
  { title: "Once Upon a River", author: "Diane Setterfield", pageCount: 496, genre: "Fiction", publicationDate: "2018", description: "On a winter night at an English riverside inn, an injured stranger arrives carrying a drowned girl — who then breathes again and is claimed by three different families.", series: null, tier: 1, topRank: null },

  // Laura Purcell (3)
  { title: "The Silent Companions", author: "Laura Purcell", pageCount: 304, genre: "Horror", publicationDate: "2017", description: "A newly widowed Victorian woman arrives at her husband's remote country estate and discovers it populated by painted wooden figures that appear to move when she isn't looking.", series: null, tier: 1, topRank: null },
  { title: "The Corset", author: "Laura Purcell", pageCount: 432, genre: "Horror", publicationDate: "2018", description: "A phrenologist visits a young seamstress in prison who claims to have killed her employer with only her mind — and begins to wonder if the claim might be true.", series: null, tier: 1, topRank: null },
  { title: "The Shape of Darkness", author: "Laura Purcell", pageCount: 352, genre: "Horror", publicationDate: "2021", description: "A silhouette artist in Bath whose clients keep turning up murdered teams with a teenage medium to uncover the killer — and the shapes behind it.", series: null, tier: 1, topRank: null },

  // Alwyn Hamilton (3)
  { title: "Rebel of the Sands", author: "Alwyn Hamilton", pageCount: 320, genre: "Young Adult", publicationDate: "2016", description: "The first Rebel of the Sands novel: a sharpshooter girl in a desert kingdom discovers she has a secret magical heritage and joins a rebellion against the cruel sultan.", series: { name: "Rebel of the Sands", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Traitor to the Throne", author: "Alwyn Hamilton", pageCount: 528, genre: "Young Adult", publicationDate: "2017", description: "Rebel of the Sands #2: Amani is kidnapped and brought to the royal harem as a spy — and must navigate the dangerous politics of the Sultan's court.", series: { name: "Rebel of the Sands", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Hero at the Fall", author: "Alwyn Hamilton", pageCount: 496, genre: "Young Adult", publicationDate: "2018", description: "Rebel of the Sands #3: Amani and the Rebel Prince make their final stand for Miraji as ancient djinn magic wakes across the desert kingdom.", series: { name: "Rebel of the Sands", order: 3, total: 3 }, tier: 1, topRank: null },

  // David Zindell (3)
  { title: "Neverness", author: "David Zindell", pageCount: 576, genre: "Sci-Fi", publicationDate: "1988", description: "Zindell's debut: a young pilot-in-training at a city at the edge of the galaxy pursues the secret of the Elder Eddas and a vanishing god-race.", series: null, tier: 1, topRank: null },
  { title: "The Broken God", author: "David Zindell", pageCount: 736, genre: "Sci-Fi", publicationDate: "1992", description: "A sequel to Neverness: the son of the protagonist grows up as a tribal shaman on a distant ice world and returns to pilot school with unearthly gifts.", series: { name: "A Requiem for Homo Sapiens", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Wild", author: "David Zindell", pageCount: 720, genre: "Sci-Fi", publicationDate: "1995", description: "A Requiem for Homo Sapiens #2: the Order's final war against the Solid State Entity and the search for the secret the Elder Eddas hold.", series: { name: "A Requiem for Homo Sapiens", order: 2, total: 3 }, tier: 1, topRank: null },

  // Lucius Shepard (3)
  { title: "Life During Wartime", author: "Lucius Shepard", pageCount: 440, genre: "Sci-Fi", publicationDate: "1987", description: "Shepard's fix-up novel: an American soldier in a future Central American war develops psychic talents through drug therapy and must confront what the war is really about.", series: null, tier: 1, topRank: null },
  { title: "Green Eyes", author: "Lucius Shepard", pageCount: 320, genre: "Horror", publicationDate: "1984", description: "Shepard's debut: a Louisiana scientist has discovered how to temporarily reanimate the dead — and the reanimated are beginning to develop their own strange agency.", series: null, tier: 1, topRank: null },
  { title: "The Jaguar Hunter", author: "Lucius Shepard", pageCount: 416, genre: "Fantasy", publicationDate: "1987", description: "Shepard's first major story collection, including the title novella — one of the landmark works of 1980s magic realism in American SF/F.", series: null, tier: 1, topRank: null },

  // Cherie Priest (4)
  { title: "Boneshaker", author: "Cherie Priest", pageCount: 416, genre: "Fantasy", publicationDate: "2009", description: "The first Clockwork Century novel: in an alternate 1880s Seattle walled off by a zombie-creating gas, a mother enters the ruins to find her son and clear her dead husband's name.", series: { name: "The Clockwork Century", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Dreadnought", author: "Cherie Priest", pageCount: 416, genre: "Fantasy", publicationDate: "2010", description: "Clockwork Century #3: a Confederate army nurse crosses the continent on an armored train to reach her dying father in Seattle during the alternate Civil War.", series: { name: "The Clockwork Century", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "Ganymede", author: "Cherie Priest", pageCount: 368, genre: "Fantasy", publicationDate: "2011", description: "Clockwork Century #4: an ex-Confederate pirate captain and a Cuban-American madam must fly a stolen experimental submarine up the Mississippi to the Union side.", series: { name: "The Clockwork Century", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "The Family Plot", author: "Cherie Priest", pageCount: 368, genre: "Horror", publicationDate: "2016", description: "A Tennessee salvage crew dismantles an old family estate and discovers the house and its grounds are not nearly as empty as they were told.", series: null, tier: 1, topRank: null },

  // Gail Carriger (4)
  { title: "Soulless", author: "Gail Carriger", pageCount: 384, genre: "Romance", publicationDate: "2009", description: "The first Parasol Protectorate novel: a preternatural spinster in Victorian London accidentally kills a vampire with her parasol and is dragged into the supernatural politics of the British Empire.", series: { name: "Parasol Protectorate", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Changeless", author: "Gail Carriger", pageCount: 400, genre: "Romance", publicationDate: "2010", description: "Parasol Protectorate #2: Alexia travels to Scotland with her werewolf husband Lord Maccon to investigate a mysterious plague that is stripping supernatural creatures of their powers.", series: { name: "Parasol Protectorate", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Blameless", author: "Gail Carriger", pageCount: 384, genre: "Romance", publicationDate: "2010", description: "Parasol Protectorate #3: exiled from London and pregnant with what everyone calls the impossible child, Alexia flees across Europe to find scholars who can explain her condition.", series: { name: "Parasol Protectorate", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "Heartless", author: "Gail Carriger", pageCount: 384, genre: "Romance", publicationDate: "2011", description: "Parasol Protectorate #4: heavily pregnant Alexia must identify and stop the killer of a London hive's vampire queen before her own child arrives in a very supernatural family.", series: { name: "Parasol Protectorate", order: 4, total: 5 }, tier: 1, topRank: null },

  // George Mann (3)
  { title: "The Affinity Bridge", author: "George Mann", pageCount: 352, genre: "Fantasy", publicationDate: "2008", description: "The first Newbury & Hobbes novel: a crown investigator and his new assistant solve a zombie plague, a crashed airship, and a string of glowing blue killings in alternate Victorian London.", series: { name: "Newbury & Hobbes", order: 1, total: 7 }, tier: 1, topRank: null },
  { title: "The Osiris Ritual", author: "George Mann", pageCount: 352, genre: "Fantasy", publicationDate: "2009", description: "Newbury & Hobbes #2: an ancient Egyptian ceremony in a London exhibition hall summons something deadly, and two investigators must chase the ritual through the capital.", series: { name: "Newbury & Hobbes", order: 2, total: 7 }, tier: 1, topRank: null },
  { title: "The Ghosts of Manhattan", author: "George Mann", pageCount: 320, genre: "Fantasy", publicationDate: "2010", description: "The first Ghost novel: a 1920s alternate-history vigilante hunts a crime lord and an old enemy in a New York reshaped by alternate-history politics and pulp spectacle.", series: { name: "The Ghost", order: 1, total: 3 }, tier: 1, topRank: null },

  // Paul Cornell (3)
  { title: "London Falling", author: "Paul Cornell", pageCount: 416, genre: "Fantasy", publicationDate: "2012", description: "The first Shadow Police novel: four London cops investigating a gangland murder gain the Sight — the ability to see the supernatural underbelly of the city.", series: { name: "Shadow Police", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "The Severed Streets", author: "Paul Cornell", pageCount: 400, genre: "Fantasy", publicationDate: "2014", description: "Shadow Police #2: Cornell's protagonists hunt a Jack-the-Ripper copycat through London's hidden magical underworld during a summer of political riots.", series: { name: "Shadow Police", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Who Killed Sherlock Holmes?", author: "Paul Cornell", pageCount: 400, genre: "Fantasy", publicationDate: "2016", description: "Shadow Police #3: the Shadow Police investigate the magical death of the fictional Sherlock Holmes himself in an impossible crime scene at 221B Baker Street.", series: { name: "Shadow Police", order: 3, total: 4 }, tier: 1, topRank: null },

  // Ian Tregillis (4)
  { title: "Bitter Seeds", author: "Ian Tregillis", pageCount: 352, genre: "Fantasy", publicationDate: "2010", description: "The first Milkweed Triptych: in an alternate WWII, Nazi Germany deploys a small team of superpowered children and Britain's warlocks answer by bargaining with Eidolons.", series: { name: "Milkweed Triptych", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "The Coldest War", author: "Ian Tregillis", pageCount: 336, genre: "Fantasy", publicationDate: "2012", description: "Milkweed Triptych #2: twenty years after the war's end, a former British intelligence officer is dragged back into the conflict as Soviet superpowered children begin defecting.", series: { name: "Milkweed Triptych", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Necessary Evil", author: "Ian Tregillis", pageCount: 384, genre: "Fantasy", publicationDate: "2013", description: "Milkweed Triptych #3: Raybould Marsh travels back in time to undo Britain's blood pact with the Eidolons — and must confront a younger version of himself.", series: { name: "Milkweed Triptych", order: 3, total: 3 }, tier: 1, topRank: null },
  { title: "The Mechanical", author: "Ian Tregillis", pageCount: 464, genre: "Sci-Fi", publicationDate: "2015", description: "The first Alchemy Wars novel: in an alternate world where 17th-century Dutch alchemy produced sentient clockwork slaves, a Mechanical begins to remember it once had free will.", series: { name: "Alchemy Wars", order: 1, total: 3 }, tier: 1, topRank: null },

  // Gareth L. Powell (3)
  { title: "Embers of War", author: "Gareth L. Powell", pageCount: 416, genre: "Sci-Fi", publicationDate: "2018", description: "The first Embers of War novel: a sentient warship that committed a massive war crime rebrands herself as a rescue vessel — until she's called to save a missing ship in a star system that shouldn't exist.", series: { name: "Embers of War", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Fleet of Knives", author: "Gareth L. Powell", pageCount: 368, genre: "Sci-Fi", publicationDate: "2019", description: "Embers of War #2: an ancient alien fleet answers a distress call and begins pacifying human civilization with extreme prejudice — and only the Trouble Dog can stop them.", series: { name: "Embers of War", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "Light of Impossible Stars", author: "Gareth L. Powell", pageCount: 336, genre: "Sci-Fi", publicationDate: "2020", description: "Embers of War #3: the conclusion of Powell's trilogy as the Fleet of Knives war reaches its endgame and the true origin of the Marble Armada is finally revealed.", series: { name: "Embers of War", order: 3, total: 3 }, tier: 1, topRank: null },

  // Ann Aguirre (3)
  { title: "Grimspace", author: "Ann Aguirre", pageCount: 320, genre: "Sci-Fi", publicationDate: "2008", description: "The first Sirantha Jax novel: a jumper with the rare ability to navigate grimspace is broken out of psychiatric imprisonment to pilot a ship for a charismatic smuggler.", series: { name: "Sirantha Jax", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Enclave", author: "Ann Aguirre", pageCount: 272, genre: "Young Adult", publicationDate: "2011", description: "The first Razorland novel: a 15-year-old in an underground post-apocalyptic settlement is exiled for questioning the Elders and must survive in the ruined surface world.", series: { name: "Razorland", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "Outpost", author: "Ann Aguirre", pageCount: 336, genre: "Young Adult", publicationDate: "2012", description: "Razorland #2: after the events of Enclave, Deuce and Fade must adjust to life in a frontier town — and defend it from the Freaks who are growing smarter.", series: { name: "Razorland", order: 2, total: 3 }, tier: 1, topRank: null },
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

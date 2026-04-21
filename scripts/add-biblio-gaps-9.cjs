const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Thomas Mann (2)
  { title: "Lotte in Weimar", author: "Thomas Mann", pageCount: 464, genre: "Historical Fiction", publicationDate: "1939", description: "Mann's novel of Charlotte Buff — the real-life original of young Werther's Lotte — visiting the aging Goethe in Weimar 44 years after their brief acquaintance.", series: null, tier: 1, topRank: null },
  { title: "Joseph and His Brothers", author: "Thomas Mann", pageCount: 1536, genre: "Historical Fiction", publicationDate: "1943", description: "Mann's sixteen-year tetralogy retelling the Genesis story of Joseph and his brothers — the great German novel of exile, written largely in Mann's own exile from Nazi Germany.", series: null, tier: 1, topRank: null },

  // Hermann Hesse (1)
  { title: "Gertrud", author: "Hermann Hesse", pageCount: 256, genre: "Fiction", publicationDate: "1910", description: "Hesse's early novel of a musician's friendship with a temperamental singer and the woman they both love — his first sustained study of the artist's isolation.", series: null, tier: 1, topRank: null },

  // Günter Grass (3)
  { title: "The Flounder", author: "Günter Grass", pageCount: 608, genre: "Fiction", publicationDate: "1977", description: "A sprawling comic novel retelling human history through nine female cooks and a talking flounder — Grass's grandest post-Danzig trilogy experiment.", series: null, tier: 1, topRank: null },
  { title: "The Rat", author: "Günter Grass", pageCount: 384, genre: "Fiction", publicationDate: "1986", description: "A narrator dreams he is listening to a talking rat describe the end of humanity while familiar characters from Grass's earlier novels wander through the apocalypse.", series: null, tier: 1, topRank: null },
  { title: "Crabwalk", author: "Günter Grass", pageCount: 240, genre: "Historical Fiction", publicationDate: "2002", description: "A German journalist investigates the 1945 sinking of the Wilhelm Gustloff refugee ship — an event his mother survived and that he finds himself inheriting.", series: null, tier: 1, topRank: null },

  // Heinrich Böll (3)
  { title: "The Clown", author: "Heinrich Böll", pageCount: 256, genre: "Fiction", publicationDate: "1963", description: "A failed German clown, abandoned by the Catholic woman he loves, gets drunk in his Bonn apartment and calls through the phonebook — Böll's savage satire of postwar Catholic respectability.", series: null, tier: 1, topRank: null },
  { title: "Billiards at Half-Past Nine", author: "Heinrich Böll", pageCount: 288, genre: "Fiction", publicationDate: "1959", description: "Three generations of a German architect family reckon with war, collaboration, and their own choices on one day in 1958 — Böll's most ambitious novel.", series: null, tier: 1, topRank: null },
  { title: "And Never Said a Word", author: "Heinrich Böll", pageCount: 208, genre: "Fiction", publicationDate: "1953", description: "Böll's early novel of a broken postwar Cologne marriage told alternately from the husband and wife — winner of the Group 47 literary prize.", series: null, tier: 1, topRank: null },

  // Halldór Laxness (3)
  { title: "Iceland's Bell", author: "Halldór Laxness", pageCount: 448, genre: "Historical Fiction", publicationDate: "1943", description: "Laxness's trilogy set in 18th-century Iceland under brutal Danish rule, following a framed peasant's legal battles and an Icelandic nobleman's love for an Icelandic manuscript collector.", series: null, tier: 1, topRank: null },
  { title: "The Atom Station", author: "Halldór Laxness", pageCount: 208, genre: "Fiction", publicationDate: "1948", description: "A country girl takes a housekeeping job in Reykjavík during the postwar debate over leasing Keflavík to the Americans — Laxness's angry political novel of Cold War Iceland.", series: null, tier: 1, topRank: null },
  { title: "Under the Glacier", author: "Halldór Laxness", pageCount: 256, genre: "Fiction", publicationDate: "1968", description: "The Bishop of Iceland sends a young envoy to investigate reports of a strange parish under Snæfellsjökull — a metaphysical comic novel Susan Sontag ranked among her favorites.", series: null, tier: 1, topRank: null },

  // Naguib Mahfouz (3)
  { title: "Adrift on the Nile", author: "Naguib Mahfouz", pageCount: 176, genre: "Fiction", publicationDate: "1966", description: "A houseboat community of hashish-smoking Cairo intellectuals evades politics until a fatal hit-and-run exposes their moral paralysis — Mahfouz's bleakest modernist work.", series: null, tier: 1, topRank: null },
  { title: "The Harafish", author: "Naguib Mahfouz", pageCount: 416, genre: "Fiction", publicationDate: "1977", description: "Ten interlinked stories spanning generations of a single Cairo alley's ruling clan — Mahfouz's epic of corruption and the slum poor who persist beneath it.", series: null, tier: 1, topRank: null },
  { title: "The Day the Leader Was Killed", author: "Naguib Mahfouz", pageCount: 112, genre: "Fiction", publicationDate: "1985", description: "Three first-person monologues converging on the October 1981 assassination of Anwar Sadat — Mahfouz's short novel on Egypt's lost generation.", series: null, tier: 1, topRank: null },

  // Orhan Pamuk (1)
  { title: "Istanbul: Memories and the City", author: "Orhan Pamuk", pageCount: 400, genre: "Biography", publicationDate: "2005", description: "Pamuk's memoir of growing up in a dwindling upper-class Istanbul family, threaded through with the melancholy ('hüzün') of a city haunted by its own lost grandeur.", series: null, tier: 1, topRank: null },

  // Wole Soyinka (3)
  { title: "A Dance of the Forests", author: "Wole Soyinka", pageCount: 80, genre: "Fiction", publicationDate: "1963", description: "Soyinka's allegorical play commissioned for Nigerian independence, summoning the spirits of the dead to remind the living that their history is not a clean triumph.", series: null, tier: 1, topRank: null },
  { title: "The Lion and the Jewel", author: "Wole Soyinka", pageCount: 64, genre: "Fiction", publicationDate: "1959", description: "Soyinka's early comic play of a Yoruba village girl courted by both an old tribal chief and a young schoolteacher — a satire of tradition and modernization.", series: null, tier: 1, topRank: null },
  { title: "You Must Set Forth at Dawn", author: "Wole Soyinka", pageCount: 528, genre: "Biography", publicationDate: "2006", description: "Soyinka's memoir of Nigerian politics and his own exile — the second volume of autobiography after Aké, tracing a life shaped by dictatorship and resistance.", series: null, tier: 1, topRank: null },

  // Ngũgĩ wa Thiong'o (1)
  { title: "Dreams in a Time of War", author: "Ngũgĩ wa Thiong'o", pageCount: 272, genre: "Biography", publicationDate: "2010", description: "Ngũgĩ's memoir of his Kikuyu childhood during the Mau Mau uprising — the first volume of his multi-book autobiography.", series: null, tier: 1, topRank: null },

  // Judy Blume (5)
  { title: "Are You There God? It's Me, Margaret", author: "Judy Blume", pageCount: 176, genre: "Young Adult", publicationDate: "1970", description: "Blume's landmark 1970 novel of a sixth-grader navigating puberty, religion, and her first bra — one of the most influential and most-banned YA books in American history.", series: null, tier: 1, topRank: null },
  { title: "Tales of a Fourth Grade Nothing", author: "Judy Blume", pageCount: 128, genre: "Young Adult", publicationDate: "1972", description: "Peter Hatcher's life is destroyed by his toddler brother Fudge — the first Fudge book, still in print more than fifty years later.", series: { name: "Fudge", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Superfudge", author: "Judy Blume", pageCount: 192, genre: "Young Adult", publicationDate: "1980", description: "The second Fudge book: Peter's family moves to Princeton and has a new baby sister — and Fudge tries to teach the family parakeet to talk like a person.", series: { name: "Fudge", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Blubber", author: "Judy Blume", pageCount: 160, genre: "Young Adult", publicationDate: "1974", description: "A fifth-grade class systematically bullies an overweight classmate until the victimizer becomes the victim — Blume's unsparing look at the cruelty of middle school.", series: null, tier: 1, topRank: null },
  { title: "Forever...", author: "Judy Blume", pageCount: 224, genre: "Young Adult", publicationDate: "1975", description: "A senior-year love affair and the loss of virginity — Blume's frank YA novel about teenage sex that has been continually challenged and banned since publication.", series: null, tier: 1, topRank: null },

  // A.A. Milne (3)
  { title: "Winnie-the-Pooh", author: "A.A. Milne", pageCount: 176, genre: "Young Adult", publicationDate: "1926", description: "Milne's collection of ten linked stories of Christopher Robin's stuffed bear in the Hundred Acre Wood — one of the most beloved children's books in the English language.", series: null, tier: 1, topRank: null },
  { title: "The House at Pooh Corner", author: "A.A. Milne", pageCount: 192, genre: "Young Adult", publicationDate: "1928", description: "The sequel to Winnie-the-Pooh, introducing Tigger and ending with Christopher Robin's farewell to the forest — the final Pooh book Milne wrote.", series: null, tier: 1, topRank: null },
  { title: "When We Were Very Young", author: "A.A. Milne", pageCount: 112, genre: "Young Adult", publicationDate: "1924", description: "Milne's first children's poetry collection — the book that introduced Christopher Robin and the idea of writing for the three-year-old son in the next room.", series: null, tier: 1, topRank: null },

  // L. Frank Baum (3)
  { title: "The Wonderful Wizard of Oz", author: "L. Frank Baum", pageCount: 272, genre: "Fantasy", publicationDate: "1900", description: "Baum's first Oz book: Dorothy Gale of Kansas is swept by a tornado into a magical land where she must find the Wizard of Oz to get home.", series: { name: "Oz", order: 1, total: 14 }, tier: 1, topRank: null },
  { title: "The Marvelous Land of Oz", author: "L. Frank Baum", pageCount: 288, genre: "Fantasy", publicationDate: "1904", description: "The second Oz book: a boy named Tip escapes his witch-guardian with a living wooden sawhorse and a pumpkin-headed man, and helps the Scarecrow reclaim the Emerald City.", series: { name: "Oz", order: 2, total: 14 }, tier: 1, topRank: null },
  { title: "Ozma of Oz", author: "L. Frank Baum", pageCount: 272, genre: "Fantasy", publicationDate: "1907", description: "The third Oz book: Dorothy returns to Oz with a talking chicken named Billina and helps rescue the royal family of Ev from the Nome King.", series: { name: "Oz", order: 3, total: 14 }, tier: 1, topRank: null },

  // J.M. Barrie (2)
  { title: "Peter Pan", author: "J.M. Barrie", pageCount: 224, genre: "Fantasy", publicationDate: "1911", description: "The definitive novel version (originally titled Peter and Wendy): a boy who never grows up visits the Darling nursery and takes Wendy and her brothers to Neverland.", series: null, tier: 1, topRank: null },
  { title: "Peter Pan in Kensington Gardens", author: "J.M. Barrie", pageCount: 160, genre: "Fantasy", publicationDate: "1906", description: "The first appearance of Peter Pan in book form — six chapters extracted from Barrie's earlier adult novel The Little White Bird.", series: null, tier: 1, topRank: null },

  // Kenneth Grahame (2)
  { title: "The Wind in the Willows", author: "Kenneth Grahame", pageCount: 240, genre: "Fantasy", publicationDate: "1908", description: "Grahame's classic of Edwardian pastoral fantasy: Mole, Rat, Badger, and the incorrigible Toad of Toad Hall on the riverbank and the open road.", series: null, tier: 1, topRank: null },
  { title: "The Reluctant Dragon", author: "Kenneth Grahame", pageCount: 64, genre: "Fantasy", publicationDate: "1898", description: "Grahame's short story of a peaceable, poetry-loving dragon in the English countryside who must be persuaded to stage a fake battle with Saint George to satisfy the villagers.", series: null, tier: 1, topRank: null },

  // Frances Hodgson Burnett (3)
  { title: "The Secret Garden", author: "Frances Hodgson Burnett", pageCount: 288, genre: "Young Adult", publicationDate: "1911", description: "A sour orphaned British girl sent to a gloomy Yorkshire manor discovers a walled garden and a hidden invalid cousin — and heals all of them through the work of spring.", series: null, tier: 1, topRank: null },
  { title: "A Little Princess", author: "Frances Hodgson Burnett", pageCount: 272, genre: "Young Adult", publicationDate: "1905", description: "Sara Crewe, the pampered star pupil at Miss Minchin's London boarding school, is abruptly reduced to servant status and must rely on her imagination to survive.", series: null, tier: 1, topRank: null },
  { title: "Little Lord Fauntleroy", author: "Frances Hodgson Burnett", pageCount: 224, genre: "Young Adult", publicationDate: "1886", description: "A kind-hearted American boy discovers he is the heir of an irritable English earl and is shipped off to transform his grandfather — Burnett's enormous Victorian bestseller.", series: null, tier: 1, topRank: null },

  // Beverly Cleary (4)
  { title: "Ramona the Pest", author: "Beverly Cleary", pageCount: 192, genre: "Young Adult", publicationDate: "1968", description: "Five-year-old Ramona Quimby starts kindergarten and discovers the world does not orbit her — the book that launched Cleary's eight-volume Ramona series.", series: { name: "Ramona", order: 2, total: 8 }, tier: 1, topRank: null },
  { title: "Dear Mr. Henshaw", author: "Beverly Cleary", pageCount: 144, genre: "Young Adult", publicationDate: "1983", description: "A sixth-grader navigating his parents' divorce writes letters and a diary to his favorite author — Cleary's Newbery Medal-winning epistolary novel.", series: null, tier: 1, topRank: null },
  { title: "Henry Huggins", author: "Beverly Cleary", pageCount: 160, genre: "Young Adult", publicationDate: "1950", description: "Cleary's first book: a third-grader on Klickitat Street adopts a stray dog named Ribsy and begins the long arc of Cleary's Portland neighborhood stories.", series: null, tier: 1, topRank: null },
  { title: "Beezus and Ramona", author: "Beverly Cleary", pageCount: 192, genre: "Young Adult", publicationDate: "1955", description: "The first Ramona book, told from the viewpoint of her long-suffering older sister Beezus — the book that launched both Ramona and Cleary's greatest run of novels.", series: { name: "Ramona", order: 1, total: 8 }, tier: 1, topRank: null },

  // Madeleine L'Engle (4)
  { title: "Meet the Austins", author: "Madeleine L'Engle", pageCount: 240, genre: "Young Adult", publicationDate: "1960", description: "The first Austin Family book: the happy Austin household absorbs an orphaned child after her parents die — the beginning of L'Engle's realistic family chronicle.", series: { name: "Austin Family Chronicles", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "The Young Unicorns", author: "Madeleine L'Engle", pageCount: 288, genre: "Young Adult", publicationDate: "1968", description: "The third Austin Family book: the Austins spend a year in New York City and are drawn into a conspiracy centered on a gang of boys near the Cathedral of St. John the Divine.", series: { name: "Austin Family Chronicles", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "A Ring of Endless Light", author: "Madeleine L'Engle", pageCount: 336, genre: "Young Adult", publicationDate: "1980", description: "The fourth Austin book: Vicky Austin, at her grandfather's beach house for his last summer, works with a marine biologist studying dolphin communication — Newbery Honor.", series: { name: "Austin Family Chronicles", order: 4, total: 5 }, tier: 1, topRank: null },
  { title: "The Arm of the Starfish", author: "Madeleine L'Engle", pageCount: 256, genre: "Young Adult", publicationDate: "1965", description: "An American biology student arrives on a Portuguese island for a summer internship and lands in the middle of a political conspiracy involving regenerative starfish research.", series: null, tier: 1, topRank: null },

  // C.S. Lewis (7)
  { title: "The Problem of Pain", author: "C.S. Lewis", pageCount: 192, genre: "Non-Fiction", publicationDate: "1940", description: "Lewis's early Christian apologetic on the theological problem of suffering — the book he later said he wrote without yet having experienced serious pain himself.", series: null, tier: 1, topRank: null },
  { title: "Surprised by Joy", author: "C.S. Lewis", pageCount: 256, genre: "Biography", publicationDate: "1955", description: "Lewis's autobiography of his conversion from atheism to Christianity, tracing the recurring, unexplainable experience he called 'Joy' through his childhood and Oxford years.", series: null, tier: 1, topRank: null },
  { title: "Till We Have Faces", author: "C.S. Lewis", pageCount: 320, genre: "Fiction", publicationDate: "1956", description: "Lewis's last novel and his own favorite: a retelling of the Cupid and Psyche myth from the perspective of Psyche's ugly, jealous elder sister.", series: null, tier: 1, topRank: null },
  { title: "Perelandra", author: "C.S. Lewis", pageCount: 240, genre: "Sci-Fi", publicationDate: "1943", description: "The second book of Lewis's Space Trilogy: Ransom is sent to the ocean-world of Perelandra (Venus) to prevent a new Eden from falling as ours did.", series: { name: "The Space Trilogy", order: 2, total: 3 }, tier: 1, topRank: null },
  { title: "The Great Divorce", author: "C.S. Lewis", pageCount: 160, genre: "Fiction", publicationDate: "1945", description: "Lewis's theological fantasy: a bus from Grey Town (purgatory/hell) takes its reluctant passengers on a day trip to heaven where they must choose whether to stay.", series: null, tier: 1, topRank: null },
  { title: "Out of the Silent Planet", author: "C.S. Lewis", pageCount: 192, genre: "Sci-Fi", publicationDate: "1938", description: "The first book of Lewis's Space Trilogy: a Cambridge philologist is kidnapped and taken to Mars (Malacandra) by two earthbound scientists with dark intentions.", series: { name: "The Space Trilogy", order: 1, total: 3 }, tier: 1, topRank: null },
  { title: "That Hideous Strength", author: "C.S. Lewis", pageCount: 384, genre: "Sci-Fi", publicationDate: "1945", description: "The third book of Lewis's Space Trilogy: a sinister technocratic institute takes over an English college town and Ransom must gather a small resistance to stop it.", series: { name: "The Space Trilogy", order: 3, total: 3 }, tier: 1, topRank: null },

  // Lewis Carroll (3)
  { title: "The Hunting of the Snark", author: "Lewis Carroll", pageCount: 96, genre: "Fiction", publicationDate: "1876", description: "Carroll's nonsense epic poem in eight fits: a crew of ten, led by a Bellman, sails to hunt an elusive creature called the Snark — one of which turns out to be a Boojum.", series: null, tier: 1, topRank: null },
  { title: "Sylvie and Bruno", author: "Lewis Carroll", pageCount: 416, genre: "Fantasy", publicationDate: "1889", description: "Carroll's sprawling second Alice-like novel, alternating between a Victorian adult world and a fairyland — his own favorite of his books.", series: null, tier: 1, topRank: null },
  { title: "Phantasmagoria and Other Poems", author: "Lewis Carroll", pageCount: 208, genre: "Fiction", publicationDate: "1869", description: "Carroll's first collection of comic poetry, including the title poem about a ghost who grumbles to his would-be haunt about union rules.", series: null, tier: 1, topRank: null },

  // Louis Sachar (4)
  { title: "Sideways Stories from Wayside School", author: "Louis Sachar", pageCount: 128, genre: "Young Adult", publicationDate: "1978", description: "Thirty short chapters set in an accidentally thirty-story-tall school where each floor has one classroom — Sachar's debut and the start of a classroom classic.", series: { name: "Wayside School", order: 1, total: 4 }, tier: 1, topRank: null },
  { title: "Wayside School Is Falling Down", author: "Louis Sachar", pageCount: 192, genre: "Young Adult", publicationDate: "1989", description: "The second Wayside School collection: more linked chapters of classroom chaos, plus Miss Mush's cafeteria, the cows in the basement, and a substitute teacher named Mr. Gorf.", series: { name: "Wayside School", order: 2, total: 4 }, tier: 1, topRank: null },
  { title: "Wayside School Gets a Little Stranger", author: "Louis Sachar", pageCount: 176, genre: "Young Adult", publicationDate: "1995", description: "The third Wayside School: a 243-day closure of the school means the return finds everything a little off, from the cow herd to the cafeteria to the substitute teachers.", series: { name: "Wayside School", order: 3, total: 4 }, tier: 1, topRank: null },
  { title: "There's a Boy in the Girls' Bathroom", author: "Louis Sachar", pageCount: 208, genre: "Young Adult", publicationDate: "1987", description: "A difficult, unliked fifth-grader begins meeting with a new school counselor and slowly changes — Sachar's warmest realist novel outside Wayside.", series: null, tier: 1, topRank: null },

  // Tom Wolfe (4)
  { title: "Radical Chic and Mau-Mauing the Flak Catchers", author: "Tom Wolfe", pageCount: 144, genre: "Non-Fiction", publicationDate: "1970", description: "Wolfe's two-essay broadside: one on Leonard Bernstein hosting a fundraiser for the Black Panthers, the other on poverty-program bureaucrats being 'mau-maued' by activists.", series: null, tier: 1, topRank: null },
  { title: "From Bauhaus to Our House", author: "Tom Wolfe", pageCount: 144, genre: "Non-Fiction", publicationDate: "1981", description: "Wolfe's polemic on 20th-century architecture — his argument that the Bauhaus émigrés turned American skyscrapers into faceless boxes against the country's own inclinations.", series: null, tier: 1, topRank: null },
  { title: "The Painted Word", author: "Tom Wolfe", pageCount: 128, genre: "Non-Fiction", publicationDate: "1975", description: "Wolfe's essay on how postwar American art became inseparable from its critical theory — the argument that to see a Jackson Pollock properly you need an art historian.", series: null, tier: 1, topRank: null },
  { title: "The Pump House Gang", author: "Tom Wolfe", pageCount: 304, genre: "Non-Fiction", publicationDate: "1968", description: "Wolfe's second New Journalism collection, including the title piece on La Jolla surfers and essays on Marshall McLuhan, Carol Doda, and Hugh Hefner.", series: null, tier: 1, topRank: null },

  // Truman Capote (1)
  { title: "One Christmas", author: "Truman Capote", pageCount: 48, genre: "Fiction", publicationDate: "1982", description: "Capote's short late companion piece to A Christmas Memory, recalling a Christmas he spent with his estranged father in New Orleans as a child.", series: null, tier: 1, topRank: null },

  // Annie Ernaux (4)
  { title: "Simple Passion", author: "Annie Ernaux", pageCount: 96, genre: "Biography", publicationDate: "1991", description: "Ernaux's account of a two-year obsessive affair with a married Eastern European diplomat — the stripped-down autobiographical style that made her famous.", series: null, tier: 1, topRank: null },
  { title: "Happening", author: "Annie Ernaux", pageCount: 96, genre: "Biography", publicationDate: "2000", description: "Ernaux's reconstruction of her illegal back-room abortion in 1963 Rouen as a 23-year-old student — a central text of contemporary French autofiction.", series: null, tier: 1, topRank: null },
  { title: "Exteriors", author: "Annie Ernaux", pageCount: 96, genre: "Biography", publicationDate: "1993", description: "Ernaux's diary-fragments of overheard conversations and observed scenes in the Paris suburbs — a collective portrait made of disconnected particulars.", series: null, tier: 1, topRank: null },
  { title: "Getting Lost", author: "Annie Ernaux", pageCount: 240, genre: "Biography", publicationDate: "2001", description: "The raw diary Ernaux kept during the affair that she would later distill into Simple Passion — published twenty years later with almost no revision.", series: null, tier: 1, topRank: null },

  // Ian Rankin (3)
  { title: "The Naming of the Dead", author: "Ian Rankin", pageCount: 464, genre: "Mystery", publicationDate: "2006", description: "Rebus investigates a murder during the 2005 G8 summit in Edinburgh, with protests and world leaders providing the backdrop to a series of linked killings.", series: { name: "Inspector Rebus", order: 16, total: 25 }, tier: 1, topRank: null },
  { title: "A Question of Blood", author: "Ian Rankin", pageCount: 432, genre: "Mystery", publicationDate: "2003", description: "Rebus investigates a school shooting at a private academy while being investigated himself for the mysterious death of a small-time thug who was stalking Siobhan.", series: { name: "Inspector Rebus", order: 14, total: 25 }, tier: 1, topRank: null },
  { title: "Hide and Seek", author: "Ian Rankin", pageCount: 288, genre: "Mystery", publicationDate: "1990", description: "The second Rebus novel: Rebus investigates the death of a junkie in an Edinburgh squat with satanic markings on the walls, uncovering links to the city's respectable upper class.", series: { name: "Inspector Rebus", order: 2, total: 25 }, tier: 1, topRank: null },

  // Val McDermid (6)
  { title: "Killing the Shadows", author: "Val McDermid", pageCount: 432, genre: "Mystery", publicationDate: "2000", description: "A serial killer is murdering crime novelists in the ways they wrote about — a standalone thriller in which one of the victims' friends becomes the hunter.", series: null, tier: 1, topRank: null },
  { title: "The Grave Tattoo", author: "Val McDermid", pageCount: 432, genre: "Mystery", publicationDate: "2006", description: "A tattooed body from the Lake District peat bogs may hold the key to a literary mystery about Wordsworth's missing friend Fletcher Christian of the HMS Bounty.", series: null, tier: 1, topRank: null },
  { title: "Kick Back", author: "Val McDermid", pageCount: 288, genre: "Mystery", publicationDate: "1993", description: "The second Kate Brannigan novel: Manchester PI Brannigan investigates a kitchen-fitting scam and ends up with a body in the greenhouse.", series: { name: "Kate Brannigan", order: 2, total: 6 }, tier: 1, topRank: null },
  { title: "Report for Murder", author: "Val McDermid", pageCount: 240, genre: "Mystery", publicationDate: "1987", description: "McDermid's first novel: Manchester journalist Lindsay Gordon, a socialist feminist, is sent to cover a fundraiser at a girls' boarding school and lands in the middle of a murder.", series: { name: "Lindsay Gordon", order: 1, total: 6 }, tier: 1, topRank: null },
  { title: "Crack Down", author: "Val McDermid", pageCount: 304, genre: "Mystery", publicationDate: "1994", description: "The third Kate Brannigan novel: Brannigan investigates an industrial-espionage case that turns out to be a front for a massive heroin smuggling operation.", series: { name: "Kate Brannigan", order: 3, total: 6 }, tier: 1, topRank: null },
  { title: "Fever of the Bone", author: "Val McDermid", pageCount: 432, genre: "Mystery", publicationDate: "2009", description: "The sixth Tony Hill novel: Hill and Jordan investigate the serial killing of teenagers who have all used the same social networking site.", series: { name: "Tony Hill", order: 6, total: 8 }, tier: 1, topRank: null },

  // Walter Mosley (3)
  { title: "Little Scarlet", author: "Walter Mosley", pageCount: 320, genre: "Mystery", publicationDate: "2004", description: "The tenth Easy Rawlins novel, set in the immediate aftermath of the 1965 Watts riots: Rawlins is asked by the LAPD to investigate the murder of a Black woman they can't reach.", series: { name: "Easy Rawlins", order: 10, total: 15 }, tier: 1, topRank: null },
  { title: "Futureland", author: "Walter Mosley", pageCount: 368, genre: "Sci-Fi", publicationDate: "2001", description: "Mosley's nine linked stories of a near-future America, tracking Black life across a corporate-feudal landscape — his most ambitious foray outside crime fiction.", series: null, tier: 1, topRank: null },
  { title: "Fear of the Dark", author: "Walter Mosley", pageCount: 320, genre: "Mystery", publicationDate: "2006", description: "The third Fearless Jones novel: a Los Angeles bookseller in the 1950s and his fearless friend investigate the disappearance of the bookseller's cousin.", series: { name: "Fearless Jones", order: 3, total: 3 }, tier: 1, topRank: null },

  // Tove Jansson (4)
  { title: "Finn Family Moomintroll", author: "Tove Jansson", pageCount: 176, genre: "Fantasy", publicationDate: "1948", description: "The third Moomin book and the first big international success: Moomintroll finds the Hobgoblin's Hat and it begins transforming everything it touches.", series: { name: "Moomins", order: 3, total: 9 }, tier: 1, topRank: null },
  { title: "Comet in Moominland", author: "Tove Jansson", pageCount: 192, genre: "Fantasy", publicationDate: "1946", description: "The second Moomin book: Moomintroll and his friends trek to an observatory to find out about the approaching comet that threatens their valley.", series: { name: "Moomins", order: 2, total: 9 }, tier: 1, topRank: null },
  { title: "Moominland Midwinter", author: "Tove Jansson", pageCount: 176, genre: "Fantasy", publicationDate: "1957", description: "Moomintroll wakes up unexpectedly from hibernation in the middle of winter and must figure out how to live in a world his family knows nothing about.", series: { name: "Moomins", order: 6, total: 9 }, tier: 1, topRank: null },
  { title: "Tales from Moominvalley", author: "Tove Jansson", pageCount: 176, genre: "Fantasy", publicationDate: "1962", description: "Jansson's Moomin short story collection, shifting tone toward the more melancholy and strange — including 'The Invisible Child' and 'The Fillyjonk Who Believed in Disasters.'", series: null, tier: 1, topRank: null },
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

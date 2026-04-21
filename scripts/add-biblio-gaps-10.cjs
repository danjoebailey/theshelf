const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const ADDITIONS = [
  // Robert A. Caro (5)
  { title: "The Power Broker", author: "Robert A. Caro", pageCount: 1344, genre: "Biography", publicationDate: "1974", description: "Caro's Pulitzer-winning biography of Robert Moses — the unelected master builder whose public-works dictatorship reshaped 20th-century New York and displaced hundreds of thousands of residents.", series: null, tier: 1, topRank: null },
  { title: "The Path to Power", author: "Robert A. Caro", pageCount: 960, genre: "Biography", publicationDate: "1982", description: "Volume one of The Years of Lyndon Johnson: LBJ's Hill Country childhood, his college years, and his relentless climb from rural poverty to the House of Representatives.", series: { name: "The Years of Lyndon Johnson", order: 1, total: 5 }, tier: 1, topRank: null },
  { title: "Means of Ascent", author: "Robert A. Caro", pageCount: 528, genre: "Biography", publicationDate: "1990", description: "Volume two of The Years of Lyndon Johnson: LBJ's 1948 Senate campaign, centered on the stolen-election 87-vote victory that made him 'Landslide Lyndon.'", series: { name: "The Years of Lyndon Johnson", order: 2, total: 5 }, tier: 1, topRank: null },
  { title: "Master of the Senate", author: "Robert A. Caro", pageCount: 1232, genre: "Biography", publicationDate: "2002", description: "Volume three of The Years of Lyndon Johnson: LBJ's decade as Senate Majority Leader, from his arrival to the passage of the 1957 Civil Rights Act — Pulitzer Prize for Biography.", series: { name: "The Years of Lyndon Johnson", order: 3, total: 5 }, tier: 1, topRank: null },
  { title: "The Passage of Power", author: "Robert A. Caro", pageCount: 752, genre: "Biography", publicationDate: "2012", description: "Volume four of The Years of Lyndon Johnson: LBJ's vice presidency and his ascent to the White House in the days and weeks after the Kennedy assassination.", series: { name: "The Years of Lyndon Johnson", order: 4, total: 5 }, tier: 1, topRank: null },

  // Barbara Tuchman (2)
  { title: "The Zimmerman Telegram", author: "Barbara Tuchman", pageCount: 256, genre: "History", publicationDate: "1958", description: "Tuchman's early narrative history of the 1917 intercepted German telegram proposing a Mexican alliance against the United States — the cable that helped pull America into WWI.", series: null, tier: 1, topRank: null },
  { title: "The First Salute", author: "Barbara Tuchman", pageCount: 368, genre: "History", publicationDate: "1988", description: "Tuchman's final book: the American Revolution from the Dutch, French, and British naval perspectives — centered on the first official salute to the American flag in 1776.", series: null, tier: 1, topRank: null },

  // Ta-Nehisi Coates (2)
  { title: "We Were Eight Years in Power", author: "Ta-Nehisi Coates", pageCount: 416, genre: "Non-Fiction", publicationDate: "2017", description: "Coates's collection of eight essays from the Obama years, one for each year of the presidency, with new reflections on what each piece missed or got right.", series: null, tier: 1, topRank: null },
  { title: "The Message", author: "Ta-Nehisi Coates", pageCount: 256, genre: "Non-Fiction", publicationDate: "2024", description: "Coates's essay collection tracing journeys to Senegal, South Carolina, and Palestine — arguing that the stories we tell about oppression shape the politics we tolerate.", series: null, tier: 1, topRank: null },

  // Roald Dahl (6)
  { title: "Charlie and the Great Glass Elevator", author: "Roald Dahl", pageCount: 160, genre: "Young Adult", publicationDate: "1972", description: "The direct sequel to Charlie and the Chocolate Factory: Willy Wonka and Charlie's family soar into space in the great glass elevator and collide with alien Vermicious Knids.", series: null, tier: 1, topRank: null },
  { title: "The Twits", author: "Roald Dahl", pageCount: 96, genre: "Young Adult", publicationDate: "1980", description: "A pair of revolting, cruel spouses torment each other and a family of captive monkeys — until the monkeys and a flock of birds conspire to destroy them.", series: null, tier: 1, topRank: null },
  { title: "The Magic Finger", author: "Roald Dahl", pageCount: 64, genre: "Young Adult", publicationDate: "1966", description: "A little girl who can turn people into whatever she's angry about points her magic finger at a neighbor's hunting family — and they spend the night as birds.", series: null, tier: 1, topRank: null },
  { title: "The Enormous Crocodile", author: "Roald Dahl", pageCount: 40, genre: "Young Adult", publicationDate: "1978", description: "A crocodile sets out to eat the children of a jungle village with elaborate disguises — and is repeatedly thwarted by the other jungle animals.", series: null, tier: 1, topRank: null },
  { title: "The Giraffe and the Pelly and Me", author: "Roald Dahl", pageCount: 80, genre: "Young Adult", publicationDate: "1985", description: "A boy partners with a giraffe, a pelican, and a monkey to clean the windows of a grand house — and help the Duke of Hampshire reward them for catching a burglar.", series: null, tier: 1, topRank: null },
  { title: "The Wonderful Story of Henry Sugar", author: "Roald Dahl", pageCount: 224, genre: "Young Adult", publicationDate: "1977", description: "Dahl's collection of seven longer stories, including the title tale of a wealthy idler who learns to see through playing cards after studying an Indian mystic's techniques.", series: null, tier: 1, topRank: null },

  // Dr. Seuss (5)
  { title: "The Cat in the Hat", author: "Dr. Seuss", pageCount: 61, genre: "Young Adult", publicationDate: "1957", description: "Two bored children on a rainy day are visited by a tall cat in a red-striped hat who proceeds to wreck their house — the book that taught a generation to read.", series: null, tier: 1, topRank: null },
  { title: "Green Eggs and Ham", author: "Dr. Seuss", pageCount: 62, genre: "Young Adult", publicationDate: "1960", description: "Sam-I-Am relentlessly tries to convince a grumpy friend to try green eggs and ham — written on a bet that Dr. Seuss couldn't compose a book using only fifty different words.", series: null, tier: 1, topRank: null },
  { title: "The Lorax", author: "Dr. Seuss", pageCount: 72, genre: "Young Adult", publicationDate: "1971", description: "A forest of Truffula trees is destroyed by a greedy industrialist until the Lorax, who 'speaks for the trees,' forces him to reckon with what he has done.", series: null, tier: 1, topRank: null },
  { title: "How the Grinch Stole Christmas!", author: "Dr. Seuss", pageCount: 64, genre: "Young Adult", publicationDate: "1957", description: "A sour green creature living above Whoville decides to steal Christmas from the Whos — and discovers that his heart may be three sizes too small.", series: null, tier: 1, topRank: null },
  { title: "Oh, the Places You'll Go!", author: "Dr. Seuss", pageCount: 56, genre: "Young Adult", publicationDate: "1990", description: "Dr. Seuss's final book, an inspirational rhymed send-off that has become America's definitive graduation gift.", series: null, tier: 1, topRank: null },

  // E.B. White (3)
  { title: "Charlotte's Web", author: "E.B. White", pageCount: 192, genre: "Young Adult", publicationDate: "1952", description: "A runt pig named Wilbur is saved from slaughter by a barn spider named Charlotte, who writes words in her web to convince the farmers he is a remarkable pig.", series: null, tier: 1, topRank: null },
  { title: "Stuart Little", author: "E.B. White", pageCount: 144, genre: "Young Adult", publicationDate: "1945", description: "A mouse born to a human family in New York sets off in a toy car to find his vanished bird friend Margalo — E.B. White's first children's novel.", series: null, tier: 1, topRank: null },
  { title: "The Trumpet of the Swan", author: "E.B. White", pageCount: 272, genre: "Young Adult", publicationDate: "1970", description: "A mute trumpeter swan named Louis learns to play a stolen trumpet to win the love of a female swan — E.B. White's last book for children.", series: null, tier: 1, topRank: null },

  // Shel Silverstein (3)
  { title: "The Giving Tree", author: "Shel Silverstein", pageCount: 64, genre: "Young Adult", publicationDate: "1964", description: "A boy grows up alongside a tree that loves him and gives him everything it can — one of the most beloved, and debated, picture books in American literature.", series: null, tier: 1, topRank: null },
  { title: "Where the Sidewalk Ends", author: "Shel Silverstein", pageCount: 176, genre: "Young Adult", publicationDate: "1974", description: "Silverstein's first major children's poetry collection, illustrated by the author — 'Sarah Cynthia Sylvia Stout,' 'Sick,' 'Hug O' War,' and the title poem.", series: null, tier: 1, topRank: null },
  { title: "A Light in the Attic", author: "Shel Silverstein", pageCount: 176, genre: "Young Adult", publicationDate: "1981", description: "Silverstein's second major children's poetry collection, reaching No. 1 on the New York Times bestseller list for 182 weeks — a record for a children's book.", series: null, tier: 1, topRank: null },

  // Maurice Sendak (3)
  { title: "Where the Wild Things Are", author: "Maurice Sendak", pageCount: 48, genre: "Young Adult", publicationDate: "1963", description: "Max is sent to bed without his supper, and his room transforms into a wild forest where he becomes king of the Wild Things — the Caldecott Medal children's classic.", series: null, tier: 1, topRank: null },
  { title: "In the Night Kitchen", author: "Maurice Sendak", pageCount: 40, genre: "Young Adult", publicationDate: "1970", description: "A boy named Mickey falls through his bedroom floor into the Night Kitchen, where three bakers mistake him for milk — Sendak's dreamlike, long-banned Caldecott Honor book.", series: null, tier: 1, topRank: null },
  { title: "Outside Over There", author: "Maurice Sendak", pageCount: 40, genre: "Young Adult", publicationDate: "1981", description: "Ida's baby sister is stolen by goblins while Ida plays her wonder horn — the third and strangest book in Sendak's picture book trilogy with Where the Wild Things Are.", series: null, tier: 1, topRank: null },

  // Peter Matthiessen (1)
  { title: "In the Spirit of Crazy Horse", author: "Peter Matthiessen", pageCount: 656, genre: "Non-Fiction", publicationDate: "1983", description: "Matthiessen's long investigation of the 1975 Pine Ridge shootings and the prosecution of AIM activist Leonard Peltier — a book that generated major lawsuits before clearing the courts.", series: null, tier: 1, topRank: null },
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

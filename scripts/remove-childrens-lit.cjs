const fs = require("fs");
const path = require("path");

const CATALOG = path.join(__dirname, "..", "public", "book-data.json");

const DELETE = [
  // Dr. Seuss (5)
  { title: "The Cat in the Hat", author: "Dr. Seuss" },
  { title: "Green Eggs and Ham", author: "Dr. Seuss" },
  { title: "The Lorax", author: "Dr. Seuss" },
  { title: "How the Grinch Stole Christmas!", author: "Dr. Seuss" },
  { title: "Oh, the Places You'll Go!", author: "Dr. Seuss" },

  // Shel Silverstein (3)
  { title: "The Giving Tree", author: "Shel Silverstein" },
  { title: "Where the Sidewalk Ends", author: "Shel Silverstein" },
  { title: "A Light in the Attic", author: "Shel Silverstein" },

  // Maurice Sendak (3)
  { title: "Where the Wild Things Are", author: "Maurice Sendak" },
  { title: "In the Night Kitchen", author: "Maurice Sendak" },
  { title: "Outside Over There", author: "Maurice Sendak" },

  // A.A. Milne (3)
  { title: "Winnie-the-Pooh", author: "A.A. Milne" },
  { title: "The House at Pooh Corner", author: "A.A. Milne" },
  { title: "When We Were Very Young", author: "A.A. Milne" },

  // E.B. White (3)
  { title: "Charlotte's Web", author: "E.B. White" },
  { title: "Stuart Little", author: "E.B. White" },
  { title: "The Trumpet of the Swan", author: "E.B. White" },

  // Frances Hodgson Burnett (3)
  { title: "The Secret Garden", author: "Frances Hodgson Burnett" },
  { title: "A Little Princess", author: "Frances Hodgson Burnett" },
  { title: "Little Lord Fauntleroy", author: "Frances Hodgson Burnett" },

  // Beverly Cleary (4)
  { title: "Ramona the Pest", author: "Beverly Cleary" },
  { title: "Dear Mr. Henshaw", author: "Beverly Cleary" },
  { title: "Henry Huggins", author: "Beverly Cleary" },
  { title: "Beezus and Ramona", author: "Beverly Cleary" },

  // Judy Blume (5)
  { title: "Are You There God? It's Me, Margaret", author: "Judy Blume" },
  { title: "Tales of a Fourth Grade Nothing", author: "Judy Blume" },
  { title: "Superfudge", author: "Judy Blume" },
  { title: "Blubber", author: "Judy Blume" },
  { title: "Forever...", author: "Judy Blume" },

  // Louis Sachar (4)
  { title: "Sideways Stories from Wayside School", author: "Louis Sachar" },
  { title: "Wayside School Is Falling Down", author: "Louis Sachar" },
  { title: "Wayside School Gets a Little Stranger", author: "Louis Sachar" },
  { title: "There's a Boy in the Girls' Bathroom", author: "Louis Sachar" },

  // Madeleine L'Engle Austin Family (4)
  { title: "Meet the Austins", author: "Madeleine L'Engle" },
  { title: "The Young Unicorns", author: "Madeleine L'Engle" },
  { title: "A Ring of Endless Light", author: "Madeleine L'Engle" },
  { title: "The Arm of the Starfish", author: "Madeleine L'Engle" },

  // Lois Lowry (1)
  { title: "A Summer to Die", author: "Lois Lowry" },

  // Lewis Carroll non-Alice (3)
  { title: "The Hunting of the Snark", author: "Lewis Carroll" },
  { title: "Sylvie and Bruno", author: "Lewis Carroll" },
  { title: "Phantasmagoria and Other Poems", author: "Lewis Carroll" },

  // Roald Dahl picture books (3)
  { title: "The Enormous Crocodile", author: "Roald Dahl" },
  { title: "The Giraffe and the Pelly and Me", author: "Roald Dahl" },
  { title: "The Magic Finger", author: "Roald Dahl" },
];

console.log(`Will remove ${DELETE.length} children's lit entries\n`);

const data = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const books = Array.isArray(data) ? data : (data.books || Object.values(data).find(v => Array.isArray(v)));
const before = books.length;

const toDelete = new Set();
const notFound = [];
for (const d of DELETE) {
  const idx = books.findIndex(b => b.title === d.title && b.author === d.author);
  if (idx === -1) notFound.push(d);
  else toDelete.add(idx);
}

if (notFound.length > 0) {
  console.log(`⚠ ${notFound.length} entries NOT FOUND:`);
  for (const d of notFound) console.log(`  - "${d.title}" — ${d.author}`);
  console.log("");
}

const filtered = books.filter((_, i) => !toDelete.has(i));
fs.writeFileSync(CATALOG, JSON.stringify(filtered));
const stat = fs.statSync(CATALOG);
console.log(`Removed ${toDelete.size} books`);
console.log(`Before: ${before} | After: ${filtered.length}`);
console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

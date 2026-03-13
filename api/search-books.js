const GENRE_MAP = {
  "fiction":          "Fiction",
  "literary fiction": "Fiction",
  "science fiction":  "Sci-Fi",
  "fantasy":          "Fantasy",
  "mystery":          "Mystery",
  "thriller":         "Mystery",
  "crime":            "Mystery",
  "romance":          "Romance",
  "biography":        "Biography",
  "autobiography":    "Biography",
  "memoir":           "Biography",
  "history":          "History",
  "historical":       "History",
  "self-help":        "Self-Help",
  "psychology":       "Non-Fiction",
  "philosophy":       "Non-Fiction",
  "science":          "Non-Fiction",
  "nonfiction":       "Non-Fiction",
  "non-fiction":      "Non-Fiction",
};

function inferGenre(subjects = []) {
  const joined = subjects.join(" ").toLowerCase();
  for (const [key, genre] of Object.entries(GENRE_MAP)) {
    if (joined.includes(key)) return genre;
  }
  return "Other";
}

async function googleBooksLookup(title, author) {
  try {
    const q = encodeURIComponent(`intitle:${title}${author ? ` inauthor:${author}` : ""}`);
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1&printType=books`);
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return null;
    const thumb = item.volumeInfo?.imageLinks?.thumbnail;
    return {
      coverUrl: thumb ? thumb.replace("http://", "https://") : null,
      genre: inferGenre(item.volumeInfo?.categories || []),
    };
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Missing query" });

  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=7&fields=title,author_name,number_of_pages_median,subject,cover_i,first_publish_year`;
  const response = await fetch(url);
  const data = await response.json();

  const results = await Promise.all((data.docs || []).map(async doc => {
    const genre = inferGenre(doc.subject || []);
    const coverUrl = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null;

    let gb = null;
    if (!coverUrl || genre === "Other") {
      gb = await googleBooksLookup(doc.title || query, (doc.author_name || [])[0] || "");
    }

    return {
      title:       doc.title || "Unknown",
      author:      (doc.author_name || [])[0] || "Unknown",
      pages:       doc.number_of_pages_median || 0,
      genre:       genre !== "Other" ? genre : (gb?.genre && gb.genre !== "Other" ? gb.genre : "Other"),
      coverUrl:    coverUrl || gb?.coverUrl || null,
      publishYear: doc.first_publish_year || null,
    };
  }));

  res.json(results);
}

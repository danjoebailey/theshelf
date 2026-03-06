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

function inferGenre(categories = []) {
  const joined = categories.join(" ").toLowerCase();
  for (const [key, genre] of Object.entries(GENRE_MAP)) {
    if (joined.includes(key)) return genre;
  }
  return "Other";
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Missing query" });

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&printType=books`;
  const response = await fetch(url);
  const data = await response.json();

  const results = (data.items || []).map(item => {
    const info = item.volumeInfo || {};
    const thumb = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null;
    return {
      title:       info.title || "Unknown",
      author:      (info.authors || [])[0] || "Unknown",
      pages:       info.pageCount || 0,
      genre:       inferGenre(info.categories || []),
      coverUrl:    thumb ? thumb.replace("http://", "https://") : null,
      description: info.description || "",
    };
  });

  res.json(results);
}

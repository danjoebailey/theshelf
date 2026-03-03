const GENRE_KEYWORDS = {
  "Sci-Fi":      ["science fiction","sci-fi","space opera","cyberpunk","dystopia","futuristic"],
  "Fantasy":     ["fantasy","magic","dragons","wizards","sword","sorcery","epic fantasy"],
  "Mystery":     ["mystery","detective","crime","thriller","suspense","noir","whodunit"],
  "Romance":     ["romance","love story","romantic"],
  "Biography":   ["biography","autobiography","memoir","life of","personal narrative"],
  "History":     ["history","historical","ancient","medieval","war","civilization"],
  "Self-Help":   ["self-help","personal development","motivation","productivity","habits","mindset"],
  "Non-Fiction": ["non-fiction","nonfiction","essays","journalism","science","psychology","philosophy"],
  "Fiction":     ["fiction","literary fiction","short stories","novel"],
};

function inferGenre(subjects = []) {
  const joined = subjects.join(" ").toLowerCase();
  for (const [genre, keywords] of Object.entries(GENRE_KEYWORDS)) {
    if (keywords.some(k => joined.includes(k))) return genre;
  }
  return "Other";
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Missing query" });

  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5&fields=title,author_name,number_of_pages_median,subject`;
  const response = await fetch(url);
  const data = await response.json();

  const results = (data.docs || []).map(doc => ({
    title:  doc.title || "Unknown",
    author: (doc.author_name || [])[0] || "Unknown",
    pages:  doc.number_of_pages_median || 0,
    genre:  inferGenre(doc.subject),
  }));

  res.json(results);
}

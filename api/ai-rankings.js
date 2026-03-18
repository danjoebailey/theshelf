export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { topN, genre, category } = req.body;
  if (!topN || !genre || !category) return res.status(400).json({ error: "Missing params" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const count = topN === "all" ? 25 : Number(topN);
  const genreStr = genre === "All" ? "" : ` ${genre}`;
  const categoryStr = category === "all" ? "" : `, specifically ranked by quality of ${category}`;

  const prompt = `List the top ${count}${genreStr} novels of all time in your opinion${categoryStr}. Return ONLY a valid JSON array — no markdown, no explanation, no code blocks. Each object must have exactly these keys: "rank" (number), "title" (string), "author" (string), "reason" (string — one concise sentence on what makes it exceptional). Example: [{"rank":1,"title":"The Lord of the Rings","author":"J.R.R. Tolkien","reason":"The foundational epic that established the template for modern fantasy."}]`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      temperature: 0,
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  let text = (data.content?.[0]?.text || "").trim();
  text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  let items;
  try {
    items = JSON.parse(text);
  } catch {
    return res.status(500).json({ error: "Failed to parse AI response", raw: text });
  }

  // Fetch covers from Google Books in parallel
  const itemsWithCovers = await Promise.all(items.map(async item => {
    try {
      const q = encodeURIComponent(`${item.title} ${item.author}`);
      const r = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1&printType=books`);
      const d = await r.json();
      const thumb = d.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
      return { ...item, coverUrl: thumb ? thumb.replace("http://", "https://").replace("&edge=curl", "") : null };
    } catch {
      return { ...item, coverUrl: null };
    }
  }));

  res.json({ items: itemsWithCovers });
}

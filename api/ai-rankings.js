export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { genre, category } = req.body;
  if (!genre || !category) return res.status(400).json({ error: "Missing params" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const genreStr = genre === "All" ? "" : ` ${genre}`;
  const categoryStr = category === "all" ? "" : `, specifically ranked by quality of ${category}`;

  const prompt = `Give me your genuine, personal top 100${genreStr} novels of all time${categoryStr}, as if a well-read friend is sharing their true list. For each rank, ask yourself: what is the single best book that belongs in this slot compared to everything else? Judge each book on its own merits — multiple books from the same series or author are fine if they genuinely deserve it, but do not enumerate an author's catalog in sequence. Do not default to Book 1 of a series just because it is the most famous entry; rank whichever individual book is actually the best regardless of where it falls in the series. Each book must appear exactly once — do not repeat any title. Return ONLY a valid JSON array — no markdown, no explanation, no code blocks. Each object must have exactly these keys: "rank" (number), "title" (string), "author" (string), "reason" (string — one concise sentence on what makes it exceptional). Example: [{"rank":1,"title":"The Lord of the Rings","author":"J.R.R. Tolkien","reason":"The foundational epic that established the template for modern fantasy."}]`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      temperature: 0.3,
      max_tokens: 12000,
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

  // Deduplicate by title+author as a safety net, then re-number
  const seen = new Set();
  const deduped = items.filter(item => {
    const key = `${item.title.toLowerCase()}|||${item.author.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((item, i) => ({ ...item, rank: i + 1 }));

  res.json({ items: deduped });
}

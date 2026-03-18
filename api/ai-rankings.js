export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { genre, category } = req.body;
  if (!genre || !category) return res.status(400).json({ error: "Missing params" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const genreStr = genre === "All" ? " — spanning all genres and literary traditions equally, not dominated by any single genre —" : ` ${genre}`;
  const categoryStr = category === "all" ? "" : `. These are books where ${category} is the primary reason to read them — books a ${category} stylist would consider the gold standard. A book acclaimed for its plot or world-building but with mediocre ${category} should not appear. Only include books where ${category} is independently exceptional, regardless of the book's overall reputation.`;

  const prompt = `Give me your genuine, personal top 50${genreStr} novels of all time${categoryStr}. For each rank, ask yourself: what is the single best book that belongs in this slot compared to everything else? Judge each book purely on its individual literary merit — not its cultural prominence, not its position in a series, not how well-known it is. A later book in a series should rank higher than an earlier one if it is the superior work. For example, in the Wheel of Time, The Shadow Rising and Lord of Chaos are stronger books than The Eye of the World and should rank higher despite Eye of the World being the first entry. Apply this same logic across all series. Multiple books from the same series or author are welcome if they each genuinely deserve their slot, but do not list them consecutively — interleave the full list holistically. Each book must appear exactly once. Return ONLY a valid JSON array — no markdown, no explanation, no code blocks. Each object must have exactly these keys: "rank" (number), "title" (string), "author" (string), "reason" (string — one concise sentence on what makes it exceptional). Example: [{"rank":1,"title":"The Shadow Rising","author":"Robert Jordan","reason":"The peak of the Wheel of Time — the Aiel history, Rhuidean, and the Two Rivers defense make this the richest volume in the series."}]`;

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
      max_tokens: 6000,
      system: "You are a deeply well-read literary critic and lifelong genre fiction reader. You have strong, considered opinions and rank books the way a knowledgeable friend would — honestly, based on actual quality, not popularity or cultural default. You are not afraid to rank a book from the middle of a series above the first book if it is genuinely the better work.",
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

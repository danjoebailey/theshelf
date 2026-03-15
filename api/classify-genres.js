const VALID_GENRES = ["Fiction","Non-Fiction","Fantasy","Sci-Fi","Mystery","Thriller","Horror","Romance","Biography","History","Historical Fiction","Young Adult","Self-Help","Graphic Novel","Other"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { books } = req.body;
  if (!Array.isArray(books) || !books.length) return res.status(400).json({ error: "Missing books" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const list = books.map(b => `{"id":"${b.id}","title":${JSON.stringify(b.title)},"author":${JSON.stringify(b.author)}}`).join("\n");

  const prompt = `Classify the genre of each book below. Respond ONLY with a JSON object mapping each id to a genre string — no markdown, no explanation.

Valid genres: ${VALID_GENRES.join(", ")}

Books:
${list}

Example response: {"abc123":"Fantasy","def456":"Mystery"}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "{}";
    let results;
    try { results = JSON.parse(text); } catch { results = {}; }

    // Sanitize: only return valid genres
    for (const id of Object.keys(results)) {
      if (!VALID_GENRES.includes(results[id])) results[id] = "Other";
    }

    res.json({ results });
  } catch {
    res.status(500).json({ error: "Classification failed" });
  }
}

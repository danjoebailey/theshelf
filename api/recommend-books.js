export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { mode } = req.body || {};

  // ── Author recommendations mode ──────────────────────────────────────────
  if (mode === "authors") {
    const { authors, readAuthors } = req.body;
    if (!authors?.length) return res.status(400).json({ error: "Missing authors" });

    const readList = (readAuthors || []).join(", ");
    const seedList = authors.join(", ");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        temperature: 0.7,
        max_tokens: 1200,
        system: "You are a literary recommendation engine with deep knowledge of authors across all genres. Return only valid JSON — no markdown, no explanation.",
        messages: [{
          role: "user",
          content: `A reader enjoys these authors: ${seedList}.\nThey have already read works by: ${readList}.\n\nRecommend 8 authors this reader would likely enjoy who are NOT in either list above. For each, return an object with: "name" (string), "topGenre" (string — their primary genre), "booksWritten" (number — approximate total books in their catalog), "reason" (string — 1-2 sentences explaining why this reader specifically would enjoy them based on the seed authors).\n\nReturn ONLY a valid JSON array of 8 objects.`,
        }],
      }),
    });

    if (!response.ok) return res.status(500).json({ error: await response.text() });

    const data = await response.json();
    let text = (data.content?.[0]?.text || "").trim();
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    try {
      return res.json({ recommendations: JSON.parse(text) });
    } catch {
      return res.status(500).json({ error: "Failed to parse AI response", raw: text });
    }
  }

  // ── Book recommendations mode (default) ──────────────────────────────────
  const { books, prompt, owned } = req.body;
  if (!books || !Array.isArray(books) || books.length === 0)
    return res.status(400).json({ error: "Please select at least one book." });

  const bookList = books.map(b => `- "${b.title}" by ${b.author} (${b.genre})`).join("\n");
  const moodLine = prompt ? `\nThe reader also says: "${prompt}"` : "";
  const excludeLine = owned && owned.length > 0
    ? `\n\nThe reader has ALREADY READ the following books — do NOT recommend any of them under any circumstances:\n${owned.map(t => `- "${t}"`).join("\n")}`
    : "";

  const userMessage = `Based on these books the reader has enjoyed:\n${bookList}${moodLine}${excludeLine}\n\nRecommend exactly 10 books they would love. For each, provide a concise reason (1–2 sentences) explaining why it fits their taste. Respond ONLY with a JSON object — no markdown, no explanation — in this exact format:\n{"recommendations":[{"title":"...","author":"...","genre":"...","publishYear":1954,"pages":320,"reason":"..."},...]}\n\nGenres must be one of: Fiction, Non-Fiction, Fantasy, Sci-Fi, Mystery, Thriller, Horror, Romance, Biography, History, Historical Fiction, Young Adult, Self-Help, Graphic Novel, Other.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) return res.status(500).json({ error: await response.text() });

  const data = await response.json();
  const text = (data.content?.[0]?.text || "").trim();

  try {
    return res.json(JSON.parse(text));
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return res.json(JSON.parse(match[0])); } catch {}
    }
    res.status(500).json({ error: "Failed to parse recommendations." });
  }
}

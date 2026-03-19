export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { books, prompt, owned } = req.body;
  if (!books || !Array.isArray(books) || books.length === 0)
    return res.status(400).json({ error: "Please select at least one book." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const bookList = books.map(b => `- "${b.title}" by ${b.author} (${b.genre})`).join("\n");
  const moodLine = prompt ? `\nThe reader also says: "${prompt}"` : "";
  const excludeLine = owned && owned.length > 0
    ? `\n\nThe reader has ALREADY READ the following books — do NOT recommend any of them under any circumstances:\n${owned.map(t => `- "${t}"`).join("\n")}`
    : "";

  const userMessage = `Based on these books the reader has enjoyed:\n${bookList}${moodLine}${excludeLine}\n\nRecommend exactly 10 books they would love. For each, provide a concise reason (1–2 sentences) explaining why it fits their taste. Respond ONLY with a JSON object — no markdown, no explanation — in this exact format:\n{"recommendations":[{"title":"...","author":"...","genre":"...","reason":"..."},...]}\n\nGenres must be one of: Fiction, Non-Fiction, Fantasy, Sci-Fi, Mystery, Thriller, Horror, Romance, Biography, History, Historical Fiction, Young Adult, Self-Help, Graphic Novel, Other.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const text = (data.content?.[0]?.text || "").trim();

  try {
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch {
    // Try to extract JSON if there's extra text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return res.json(JSON.parse(match[0])); } catch {}
    }
    res.status(500).json({ error: "Failed to parse recommendations." });
  }
}

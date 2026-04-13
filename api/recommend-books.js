export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { mode } = req.body || {};

  // ── Author recommendations mode (unchanged — uses Sonnet) ────────────────
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
        max_tokens: 1800,
        system: "You are a literary recommendation engine with deep knowledge of authors across all genres. Return only valid JSON — no markdown, no explanation.",
        messages: [{
          role: "user",
          content: `A reader enjoys these authors: ${seedList}.\nThey have already read works by: ${readList}.\n\nRecommend 8 authors this reader would likely enjoy who are NOT in either list above. For each, return an object with: "name" (string), "topGenre" (string — their primary genre), "booksWritten" (number — approximate total books in their catalog), "reason" (string — 1-2 sentences explaining why this reader specifically would enjoy them based on the seed authors), "topBooks" (array of exactly 2 objects, each with "title" (string), "author" (string — same as name), "genre" (string — one of: Fiction, Non-Fiction, Fantasy, Sci-Fi, Mystery, Thriller, Horror, Romance, Biography, History, Historical Fiction, Young Adult, Self-Help, Graphic Novel, Other)).\n\nReturn ONLY a valid JSON array of 8 objects.`,
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

  // ── Book recommendations mode (Haiku + catalog candidates) ───────────────
  const { books, prompt, candidates } = req.body;
  if (!books || !Array.isArray(books) || books.length === 0)
    return res.status(400).json({ error: "Please select at least one book." });
  if (!candidates || !Array.isArray(candidates) || candidates.length === 0)
    return res.status(400).json({ error: "No candidates provided." });

  const seedList = books.map(b => `- "${b.title}" by ${b.author} (${b.genre})`).join("\n");
  const moodLine = prompt ? `\nThe reader also says: "${prompt}"` : "";
  const candidateList = candidates.map((b, i) => `${i + 1}. "${b.title}" by ${b.author} (${b.genre}${b.publishYear ? `, ${b.publishYear}` : ""})`).join("\n");

  const userMessage = `A reader has enjoyed these books:\n${seedList}${moodLine}\n\nFrom the candidate pool below, pick exactly 10 books this reader would most enjoy. For each pick, write a concise 1-2 sentence reason tied to the seed books.\n\nCandidate pool:\n${candidateList}\n\nRespond ONLY with a JSON object — no markdown, no explanation — in this exact format:\n{"recommendations":[{"title":"...","author":"...","genre":"...","publishYear":1954,"pages":320,"reason":"..."}]}\n\nUse the exact titles and authors from the candidate pool.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1800,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) return res.status(500).json({ error: await response.text() });

  const data = await response.json();
  const text = (data.content?.[0]?.text || "").trim();

  let parsed;
  try { parsed = JSON.parse(text); }
  catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) { try { parsed = JSON.parse(match[0]); } catch {} }
  }
  if (!parsed?.recommendations) return res.status(500).json({ error: "Failed to parse recommendations." });

  // Enrich picks with full metadata from candidate pool
  const candidateMap = new Map(candidates.map(c => [c.title.toLowerCase(), c]));
  const recommendations = parsed.recommendations.slice(0, 10).map(r => {
    const src = candidateMap.get(r.title.toLowerCase()) || {};
    return {
      title: r.title,
      author: r.author || src.author,
      genre: r.genre || src.genre,
      publishYear: r.publishYear || src.publishYear,
      pages: r.pages || src.pages,
      reason: r.reason,
    };
  });

  res.json({ recommendations });
}

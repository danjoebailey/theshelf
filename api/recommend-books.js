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
      max_tokens: 3000,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) return res.status(500).json({ error: await response.text() });

  const data = await response.json();
  let text = (data.content?.[0]?.text || "").trim();
  // Strip markdown fences if Claude wrapped the response.
  text = text.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "").trim();

  // 1. Strict full parse.
  try { return res.json(JSON.parse(text)); } catch {}

  // 2. Extract a {…} object via greedy match.
  const objMatch = text.match(/\{[\s\S]*\}/);
  if (objMatch) {
    try { return res.json(JSON.parse(objMatch[0])); } catch {}
  }

  // 3. Bare array shape — Claude sometimes returns [{...}, ...] without
  //    the {recommendations:...} wrapper despite the prompt.
  const arrMatch = text.match(/\[[\s\S]*\]/);
  if (arrMatch) {
    try { return res.json({ recommendations: JSON.parse(arrMatch[0]) }); } catch {}
  }

  // 4. Truncation recovery — walk the text, find the last complete top-level
  //    object inside a recommendations array, and close the JSON there.
  const recovered = recoverTruncatedRecs(text);
  if (recovered) return res.json(recovered);

  res.status(500).json({ error: "Failed to parse recommendations.", raw: text.slice(0, 300) });
}

function recoverTruncatedRecs(text) {
  const arrStart = text.indexOf("[");
  if (arrStart === -1) return null;
  const tail = text.slice(arrStart);
  let depth = 0, inStr = false, escape = false, lastClose = -1;
  for (let i = 0; i < tail.length; i++) {
    const c = tail[i];
    if (escape) { escape = false; continue; }
    if (c === "\\") { escape = true; continue; }
    if (c === '"') inStr = !inStr;
    if (inStr) continue;
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) lastClose = i;
    }
  }
  if (lastClose === -1) return null;
  try {
    const arr = JSON.parse(tail.slice(0, lastClose + 1) + "]");
    return Array.isArray(arr) ? { recommendations: arr } : null;
  } catch { return null; }
}

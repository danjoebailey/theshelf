export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { title, author, books } = req.body;

  // --- Batch mode: array of {title, author} ---
  if (Array.isArray(books) && books.length > 0) {
    const list = books
      .map((b, i) => `${i + 1}. "${b.title}" by ${b.author}`)
      .join("\n");

    const prompt = `You are a book series expert. For each book below, determine whether it belongs to a named series.

${list}

Return a JSON array (one entry per book, in the same order) where each entry is:
{"title": "<exact title from input>", "series": "<series name or null>", "seriesTotal": <integer or null>}

Rules:
- "series": use the most widely recognised official series name (e.g. "Wheel of Time", "The Stormlight Archive", "Harry Potter"). Strip leading "The" only if the series is rarely called that. Be CONSISTENT — all books in the same series must have the identical "series" string.
- "seriesTotal": total number of main-series novels (not counting short stories/anthologies/prequels unless they are numbered in the main sequence). Use null only if the series is genuinely ongoing with no announced end.
- Standalones, nonfiction, memoirs, short story collections → "series": null, "seriesTotal": null.

Return ONLY the JSON array. No markdown fences, no explanation.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2048,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      let text = (data.content?.[0]?.text || "").trim();
      text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
      const results = JSON.parse(text);
      return res.json({ results });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // --- Single mode: {title, author} ---
  if (!title || !author) return res.status(400).json({ error: "Missing title or author" });

  const prompt = `Is the book "${title}" by ${author} part of a named series?

If yes, return a JSON object with:
- "series": the official series name (e.g. "Wheel of Time", "The Stormlight Archive") — consistent capitalisation, no author name appended
- "seriesTotal": total number of main-series books (integer, or null if unknown/ongoing)

If no (standalone, nonfiction, memoir, etc.), return: {"series": null, "seriesTotal": null}

Return ONLY the JSON object. No markdown, no explanation.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 80,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    let text = (data.content?.[0]?.text || "").trim();
    text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const result = JSON.parse(text);
    return res.json({ series: result.series || null, seriesTotal: result.seriesTotal || null });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

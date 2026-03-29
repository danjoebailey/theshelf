export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: "Missing title or author" });

  const prompt = `Is the book "${title}" by ${author} part of a named series?

If yes, return a JSON object with:
- "series": the official series name only (e.g. "The Stormlight Archive", "Wheel of Time", "Harry Potter") — no author name, no word "series" unless it's part of the official title
- "seriesTotal": total number of main-series books (integer, or null if unknown/ongoing with no set end)

If no (standalone novel, short story collection, nonfiction, memoir, etc.), return: {"series": null, "seriesTotal": null}

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

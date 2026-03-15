const WORLD_BUILDING_GENRES = new Set(["Fantasy", "Sci-Fi", "Fiction"]);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author, genre } = req.body;
  if (!title || !author) return res.status(400).json({ error: "Missing title or author" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const includeWorldBuilding = WORLD_BUILDING_GENRES.has(genre);
  const exampleJson = includeWorldBuilding
    ? `{"prose":7,"plot":8,"characters":9,"pacing":6,"worldBuilding":8,"dialogue":7,"ending":8}`
    : `{"prose":7,"plot":8,"characters":9,"pacing":6,"dialogue":7,"ending":8}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `Score "${title}" by ${author} on a scale of 1–10 for each of the following categories. Be discerning — reserve 9–10 for truly exceptional works. Respond ONLY with a JSON object, no markdown, no explanation:\n${exampleJson}`,
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const text = (data.content?.[0]?.text || "").trim();

  try {
    res.json(JSON.parse(text));
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return res.json(JSON.parse(match[0])); } catch {}
    }
    res.status(500).json({ error: "Failed to parse scores." });
  }
}

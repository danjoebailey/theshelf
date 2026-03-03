export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { query } = req.body;
  if (!query?.trim()) return res.status(400).json({ error: "Missing query" });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{
        role: "user",
        content: `Search for books matching "${query}". Return ONLY a JSON array (no markdown) of up to 5 results. Each object: {"title":"...","author":"...","pages":0,"genre":"..."} where genre is one of: Fiction, Non-Fiction, Fantasy, Sci-Fi, Mystery, Biography, History, Romance, Self-Help, Other. Use the most likely genre. Pages as a number or 0 if unknown.`
      }]
    }),
  });

  const data = await response.json();
  const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "[]";
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean);
    res.json(Array.isArray(parsed) ? parsed : []);
  } catch {
    res.json([]);
  }
}

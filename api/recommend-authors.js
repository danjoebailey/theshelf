export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { authors, readAuthors } = req.body || {};
  if (!authors?.length) return res.status(400).json({ error: "Missing authors" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const readList = (readAuthors || []).join(", ");
  const seedList = authors.join(", ");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
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

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  let text = (data.content?.[0]?.text || "").trim();
  text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

  let recommendations;
  try {
    recommendations = JSON.parse(text);
  } catch {
    return res.status(500).json({ error: "Failed to parse AI response", raw: text });
  }

  res.json({ recommendations });
}

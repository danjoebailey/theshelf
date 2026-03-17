export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author, genre } = req.body;
  if (!title || !author) return res.status(400).json({ error: "Missing title or author" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{
        role: "user",
        content: `Write a 3–4 sentence description of "${title}" by ${author}${genre && genre !== "Other" ? ` (${genre})` : ""}. Cover what the book is about and what makes it notable or distinctive. No spoilers. No intro like "This book..." — just dive straight in.`,
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const description = data.content?.[0]?.text?.trim() || null;
  res.json({ description });
}

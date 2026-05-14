export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, author } = req.body;
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
      max_tokens: 400,
      messages: [{
        role: "user",
        content: `Write a short prose passage (2–3 paragraphs) in the unmistakable style of ${author}, capturing the voice, rhythm, and atmosphere of their book "${title}". Do not reference the book or its characters directly — just evoke the author's distinctive prose style. Use NO character names; refer to people in the abstract (the woman, a young soldier, the old man, etc.) so readers don't mistake invented names for real characters from the book. Return only the prose itself, no titles, headings, labels, introduction, or explanation. Do not use markdown.`,
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text || "";
  const text = raw.replace(/^#+\s+[^\n]*\n+/gm, "").trim();
  res.json({ prose: text });
}

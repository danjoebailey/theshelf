// Lightweight pre-pass before the main shelf OCR. We send the low-res
// overview to Claude Vision and ask "how many bookcases × shelves?" The
// answer drives an adaptive grid for the main scan: dense walls get more
// crops, single-bookcase shots get fewer. Costs ~half a cent.

async function callClaudeVision(apiKey, content) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 100,
      messages: [{ role: "user", content }],
    }),
  });
  if (!response.ok) throw new Error(`Claude ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return (data.content?.[0]?.text || "").trim();
}

export const config = {
  api: {
    bodyParser: { sizeLimit: "1mb" },
  },
  maxDuration: 30,
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { overview } = req.body || {};
  if (!overview) return res.status(400).json({ error: "Missing overview image" });

  const content = [
    { type: "image", source: { type: "base64", media_type: "image/jpeg", data: overview } },
    { type: "text", text: `Look at this bookshelf photo. Return ONLY JSON in this exact format, no markdown, no explanation:
{"bookcases": N, "shelves": M}

- bookcases = number of distinct vertical bookcase units visible (separate furniture units side by side)
- shelves = number of horizontal shelf rows in the tallest bookcase
- If unclear, estimate. Both must be positive integers.` },
  ];

  try {
    const raw = await callClaudeVision(apiKey, content);
    const match = raw.match(/\{[\s\S]*?\}/);
    if (!match) throw new Error(`No JSON in response: ${raw.slice(0, 200)}`);
    const parsed = JSON.parse(match[0]);
    const bookcases = Math.max(1, Math.min(6, parseInt(parsed.bookcases) || 1));
    const shelves = Math.max(2, Math.min(6, parseInt(parsed.shelves) || 4));
    res.json({ bookcases, shelves });
  } catch (e) {
    res.status(500).json({ error: e.message || "Preflight failed" });
  }
}

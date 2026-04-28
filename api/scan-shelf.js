// Server-side wrapper for Claude Vision shelf scanning. Client does the
// per-crop slicing (so we don't have to ship a 5MB raw photo through Vercel's
// 4.5MB body limit) and sends compressed JPEGs. We compose the prompt and
// forward to Anthropic. API key stays server-side.

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
      // 6000 tokens ≈ 200-240 book entries. Above that we rely on the
      // truncation recovery in parseBookArray() and signal it to the client.
      max_tokens: 6000,
      messages: [{ role: "user", content }],
    }),
  });
  if (!response.ok) throw new Error(`Claude ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return (data.content?.[0]?.text || "").trim();
}

function imageBlock(b64) {
  return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } };
}

function textBlock(text) { return { type: "text", text }; }

export const config = {
  api: {
    bodyParser: { sizeLimit: "4mb" },
  },
  // Vision calls with up to 36 crops can take 30s+. Default 10s timeout
  // returns a 500 to the client before Anthropic responds.
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { overview, crops, rows, cols } = req.body || {};
  if (!overview || !Array.isArray(crops) || !crops.length) {
    return res.status(400).json({ error: "Expected { overview, crops: [...], rows, cols }" });
  }

  const content = [];
  content.push(textBlock(
    `OVERVIEW — use this to understand the overall bookcase layout before reading the crops below:`
  ));
  content.push(imageBlock(overview));

  for (const c of crops) {
    content.push(textBlock(`--- Row ${c.row}, Column ${c.col} ---`));
    content.push(imageBlock(c.data));
  }

  content.push(textBlock(`
The OVERVIEW image shows the full bookcase(s) in original orientation. The labeled crops below it are a ${rows || "?"}-row × ${cols || "?"}-column grid of the same image, top-to-bottom, left-to-right — but each crop has been ROTATED 90° CLOCKWISE so vertical spine text reads horizontally (left-to-right) for easier OCR.

Use the overview to understand bookcase layout (how many bookcases, how many shelves). Then use the rotated crops to read individual book spines — the text on book spines should appear horizontal in the crops.

Return a single deduplicated JSON array of all books you can identify. No markdown, no explanation — only the JSON:
[{"title": "Book Title", "author": "Author Name", "shelf": 1}]

Rules:
- "shelf" = the row number (1–${rows || "?"}) the book appears in
- If a book appears in multiple crops, include it once
- Skip completely illegible spines
- Stacked/horizontal books count too
- AUTHOR FALLBACK: if you can read the title clearly but the author portion of the spine is unreadable or cropped, use your knowledge of well-known books to fill in the author (e.g., if you read "Blood Meridian" but can't see the author spine, write "Cormac McCarthy"). Only set author to null when you genuinely don't know who wrote it.`));

  try {
    const raw = await callClaudeVision(apiKey, content);
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const { books: parsed, truncated } = parseBookArray(cleaned);
    if (!parsed) throw new Error(`No JSON array in response: ${cleaned.slice(0, 200)}`);
    // Server-side dedupe (defense in depth — client also dedupes)
    const seen = new Set();
    const deduped = parsed.filter(b => {
      const key = (b.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    res.json({ books: deduped, truncated });
  } catch (e) {
    res.status(500).json({ error: e.message || "Scan failed" });
  }
}

// Parse Claude's array response, recovering gracefully when max_tokens
// truncates mid-object. Returns { books, truncated } so the client can warn
// the user that some spines were cut off.
function parseBookArray(cleaned) {
  // Happy path: full closing bracket present.
  const fullMatch = cleaned.match(/\[[\s\S]*\]/);
  if (fullMatch) {
    try { return { books: JSON.parse(fullMatch[0]), truncated: false }; } catch {}
  }
  // Truncated: walk the string, track bracket depth + string state, find
  // the last complete top-level `}`, and close the array there.
  const start = cleaned.indexOf("[");
  if (start === -1) return { books: null, truncated: false };
  const tail = cleaned.slice(start);
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
  if (lastClose === -1) return { books: null, truncated: false };
  const recovered = tail.slice(0, lastClose + 1) + "]";
  try { return { books: JSON.parse(recovered), truncated: true }; }
  catch { return { books: null, truncated: false }; }
}

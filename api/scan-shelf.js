// Server-side wrapper for Claude Vision shelf scanning. Client does the
// per-crop slicing (so we don't have to ship a 5MB raw photo through Vercel's
// 4.5MB body limit) and sends compressed JPEGs. We compose the prompt and
// forward to Anthropic. API key stays server-side.

async function callClaudeVision(apiKey, content, maxTokens = 4500) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      messages: [{ role: "user", content }],
    }),
  });
  if (!response.ok) throw new Error(`Claude ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return (data.content?.[0]?.text || "").trim();
}

// One retry with brief backoff. The most common failure mode for parallel
// row batches is a transient 5xx or rate limit — retrying nearly always
// succeeds, and silently losing a batch leaves real books out of the scan.
async function callWithRetry(apiKey, content, maxTokens) {
  try {
    return await callClaudeVision(apiKey, content, maxTokens);
  } catch (e) {
    await new Promise(r => setTimeout(r, 900));
    return callClaudeVision(apiKey, content, maxTokens);
  }
}

function imageBlock(b64) {
  return { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } };
}

function textBlock(text) { return { type: "text", text }; }

export const config = {
  api: {
    bodyParser: { sizeLimit: "4mb" },
  },
  // Each batch averages 20-40s; parallel split keeps us well under the cap.
  maxDuration: 60,
};

// Build the message content for a batch of crops. Each batch sees the full
// overview image so Claude has layout context regardless of which rows it's
// reading. The prompt tells Claude which rows it's actually responsible for.
function buildContent(overview, crops, rows, cols, rowsCovered) {
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
The OVERVIEW image shows the full bookcase(s) in original orientation. The labeled crops below it cover ${rowsCovered} of a ${rows || "?"}-row × ${cols || "?"}-column grid of the same image, top-to-bottom, left-to-right — but each crop has been ROTATED 90° CLOCKWISE so vertical spine text reads horizontally (left-to-right) for easier OCR.

Use the overview to understand bookcase layout (how many bookcases, how many shelves). Then use the rotated crops to read individual book spines — the text on book spines should appear horizontal in the crops. Only return books visible in THIS BATCH's crops, not the entire shelf.

Return a single deduplicated JSON array of all books you can identify. No markdown, no explanation — only the JSON:
[{"title": "Book Title", "author": "Author Name", "shelf": 1}]

Rules:
- "shelf" = the row number (1–${rows || "?"}) the book appears in
- If a book appears in multiple crops within this batch, include it once
- Skip completely illegible spines
- Stacked/horizontal books count too
- AUTHOR FALLBACK: if you can read the title clearly but the author portion of the spine is unreadable or cropped, use your knowledge of well-known books to fill in the author (e.g., if you read "Blood Meridian" but can't see the author spine, write "Cormac McCarthy"). Only set author to null when you genuinely don't know who wrote it.`));

  return content;
}

// Below this, run as a single call. Above, fan out per-row in parallel —
// each row batch has cols-many crops + overview = small, fast call. Wall
// time becomes ~max(individual call times) instead of summing.
const SINGLE_CALL_THRESHOLD = 8;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const { overview, crops, rows, cols } = req.body || {};
  if (!overview || !Array.isArray(crops) || !crops.length) {
    return res.status(400).json({ error: "Expected { overview, crops: [...], rows, cols }" });
  }

  try {
    let allBooks = [];
    let anyTruncated = false;

    let failedRows = 0;
    let totalRows = 1;

    if (crops.length > SINGLE_CALL_THRESHOLD) {
      // Per-row parallel fan-out. Each row batch is small (cols crops +
      // overview), so individual Anthropic calls complete in ~5-10s. With
      // Promise.allSettled + per-call retry, total wall time ≈ slowest
      // single batch and a transient failure in one row no longer drops
      // those books from the scan.
      const byRow = {};
      for (const c of crops) {
        (byRow[c.row] = byRow[c.row] || []).push(c);
      }
      const rowKeys = Object.keys(byRow).map(k => parseInt(k, 10)).sort((a, b) => a - b);
      totalRows = rowKeys.length;

      const settled = await Promise.allSettled(
        rowKeys.map(async rowNum => {
          const batch = byRow[rowNum];
          const content = buildContent(overview, batch, rows, cols, `row ${rowNum} of ${rows}`);
          const raw = await callWithRetry(apiKey, content, 3500);
          return parseBookArray(raw.replace(/```json|```/g, "").trim());
        })
      );

      for (let i = 0; i < settled.length; i++) {
        const s = settled[i];
        if (s.status === "fulfilled" && s.value.books) {
          allBooks.push(...s.value.books);
          if (s.value.truncated) anyTruncated = true;
          console.log(`[scan-shelf] row ${rowKeys[i]}: ${s.value.books.length} books${s.value.truncated ? " (truncated)" : ""}`);
        } else {
          failedRows++;
          const reason = s.status === "rejected" ? s.reason?.message : "no books parsed";
          console.warn(`[scan-shelf] row ${rowKeys[i]} FAILED: ${reason}`);
        }
      }
      if (allBooks.length === 0) {
        const firstErr = settled.find(s => s.status === "rejected")?.reason?.message || "All row batches failed";
        throw new Error(firstErr);
      }
    } else {
      const raw = await callClaudeVision(apiKey, buildContent(overview, crops, rows, cols, "the entire shelf"), 6000);
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = parseBookArray(cleaned);
      if (!parsed.books) throw new Error(`No JSON array in response: ${cleaned.slice(0, 200)}`);
      allBooks = parsed.books;
      anyTruncated = parsed.truncated;
    }

    // Server-side dedupe — books that appear in multiple row batches (e.g.
    // tall books spanning two rows) should be returned once.
    const seen = new Set();
    const deduped = allBooks.filter(b => {
      const key = (b.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    res.json({ books: deduped, truncated: anyTruncated, failedRows, totalRows });
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

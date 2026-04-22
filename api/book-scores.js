// Lookup-first scoring endpoint. For books in the static catalog (~10K), we
// return the cached scores from book-tags.json instead of paying for an LLM
// call. Same matcher as paige-client (parens stripped, diacritics collapsed,
// subtitle splits, leading articles tolerated). Falls back to Claude only for
// books we don't have tagged.
//
// Catalog files are bundled into the function via vercel.json's includeFiles.
// Read once at cold start and held in module scope; subsequent invocations on
// the same warm instance are pure lookups.
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let tagByNorm = null;

function normalize(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchNormalize(s) {
  return s.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\bcolour\b/g, "color")
    .replace(/aa/g, "a").replace(/oe/g, "o").replace(/ae/g, "a")
    .replace(/ue/g, "u").replace(/ss/g, "s")
    .replace(/[^a-z0-9]/g, "");
}

function cleanTitle(title) {
  return (title || "")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/[,:]?\s*(and|&)\s+other\s+(stories|tales|poems)\s*$/i, "")
    .trim();
}

function cleanAuthor(author) {
  return (author || "")
    .replace(/\s*&.*$/, "")
    .replace(/,?\s*(Jr\.?|Sr\.?|III|IV|II)\s*$/i, "")
    .replace(/\s+[A-Z]\.\s+/g, " ")
    .trim();
}

function stripLeadingArticle(title) {
  return (title || "").replace(/^(the|an?)\s+/i, "").trim();
}

function joinKeyVariants(title, author) {
  const t = cleanTitle(title);
  const a = cleanAuthor(author);
  const na = matchNormalize(a);
  const keys = new Set();
  keys.add(matchNormalize(t) + "|" + na);
  const colonIdx = t.indexOf(":");
  if (colonIdx > 0) {
    const before = t.slice(0, colonIdx).trim();
    const after = t.slice(colonIdx + 1).trim();
    if (before.length >= 3) keys.add(matchNormalize(before) + "|" + na);
    if (after.length >= 3) keys.add(matchNormalize(after) + "|" + na);
  }
  const stripped = stripLeadingArticle(t);
  if (stripped !== t && stripped.length >= 3) {
    keys.add(matchNormalize(stripped) + "|" + na);
  }
  return keys;
}

function loadCatalog() {
  if (tagByNorm) return tagByNorm;
  // Resolve relative to this function's location. Vercel includes these files
  // alongside the function bundle per vercel.json's includeFiles glob.
  const candidates = [
    path.join(__dirname, "..", "public"),
    path.join(process.cwd(), "public"),
  ];
  let primary, rec, tags, loadedFrom;
  for (const dir of candidates) {
    try {
      primary = JSON.parse(readFileSync(path.join(dir, "book-data.json"), "utf8"));
      rec = JSON.parse(readFileSync(path.join(dir, "rec-library.json"), "utf8"));
      tags = JSON.parse(readFileSync(path.join(dir, "book-tags.json"), "utf8"));
      loadedFrom = dir;
      break;
    } catch {}
  }
  if (!primary) {
    console.warn("[book-scores] catalog files not found in any candidate path");
    return null;
  }
  const map = {};
  for (const book of [...primary, ...rec]) {
    const te = tags[String(book.id)];
    if (!te?.scores) continue;
    for (const key of joinKeyVariants(book.title, book.author)) {
      if (!map[key]) map[key] = { scores: te.scores, vibes: te.vibes || null, genre: book.genre };
    }
  }
  console.log(`[book-scores] catalog loaded from ${loadedFrom}: ${Object.keys(map).length} keys covering ${primary.length + rec.length} books`);
  tagByNorm = map;
  return tagByNorm;
}

// LLM fallback for books not in the catalog. Asks for the new-schema scores
// (universal 7 + genre-appropriate pack axes) instead of the old 7-axis grid.
const GENRE_PACK = {
  "Fantasy": ["worldBuilding", "magicSystem"],
  "Sci-Fi": ["worldBuilding", "speculativeRigor"],
  "Horror": ["dread", "atmosphere"],
  "Mystery": ["puzzle", "stakes"],
  "Thriller": ["stakes", "twists"],
  "Romance": ["chemistry", "tension", "heaPayoff"],
  "Historical Fiction": ["periodAuthenticity", "researchIntegration"],
  "Non-Fiction": ["argument", "researchRigor", "access"],
  "Biography": ["argument", "researchRigor", "access"],
  "History": ["argument", "researchRigor", "access"],
};

async function llmScore(apiKey, title, author, genre) {
  const pack = GENRE_PACK[genre] || [];
  const universalKeys = ["prose", "characters", "plot", "pacing", "ideas", "resonance", "ending"];
  const allKeys = [...universalKeys, ...pack];
  const exampleJson = "{" + allKeys.map(k => `"${k}":7`).join(",") + "}";

  const prompt = `Score "${title}" by ${author} on a 0-10 integer scale on each of these craft axes:

Universal: prose, characters, plot, pacing, ideas, resonance, ending
${pack.length ? "Genre pack: " + pack.join(", ") : ""}

Anchors: prose 10 = Lolita/Ulysses; resonance 10 = Stoner/Beloved (effectiveness at the book's contract); 7 = competent genre, 4 = weak. Score honestly — low scores describe, not punish.

Respond ONLY with JSON, no markdown:
${exampleJson}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!response.ok) throw new Error(`Claude API ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const text = (data.content?.[0]?.text || "").trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON in LLM response");
  return JSON.parse(match[0]);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { title, author, genre } = req.body || {};
  if (!title || !author) return res.status(400).json({ error: "Missing title or author" });

  // Lookup-first
  const catalog = loadCatalog();
  if (catalog) {
    for (const key of joinKeyVariants(title, author)) {
      if (catalog[key]) {
        // Flat score fields for backwards-compat with the old display shape.
        // Vibes travel in a separate _vibes field so the UI can render them
        // independently without breaking score rendering.
        return res.json({ ...catalog[key].scores, _vibes: catalog[key].vibes, _source: "catalog" });
      }
    }
  }

  // LLM fallback — scores only; vibes not inferred on the fly to keep costs low.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured and book not in catalog" });
  try {
    const scores = await llmScore(apiKey, title, author, genre);
    return res.json({ ...scores, _vibes: null, _source: "llm" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

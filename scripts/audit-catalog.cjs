// Catalog audit v2: verify every book in public/book-data.json exists in at least
// one of Open Library / iTunes. Hardened matcher with variant title handling,
// retry on empty, and batch pacing to avoid rate limits.
//
// Usage: node scripts/audit-catalog.cjs
// Optional env: START=0 LIMIT=10069 CONCURRENCY=3

const fs = require("fs");
const path = require("path");

const CATALOG_PATH = path.join(__dirname, "..", "public", "book-data.json");
const OUT_PATH = path.join(__dirname, "..", "audit-flagged.json");

const START = parseInt(process.env.START || "0", 10);
const LIMIT = parseInt(process.env.LIMIT || "0", 10);
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "3", 10);

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019\u201a\u201b]/g, "'") // curly single quotes -> straight
    .replace(/[\u201c\u201d\u201e\u201f]/g, '"') // curly double quotes
    .replace(/[\u2013\u2014\u2212]/g, "-")       // en/em dash -> hyphen
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Return an ordered list of title variants to try (most specific first)
function titleVariants(title) {
  const variants = new Set();
  const base = title || "";
  variants.add(base);

  // Strip subtitle after colon: "The Dark Tower: The Gunslinger" -> "The Gunslinger" and "The Dark Tower"
  if (base.includes(":")) {
    const parts = base.split(":").map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      variants.add(parts[parts.length - 1]); // last segment (often the specific book)
      variants.add(parts[0]);                // first segment
    }
  }

  // Strip parenthetical: "We Are Legion (We Are Bob)" -> "We Are Legion"
  const parenStripped = base.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  if (parenStripped && parenStripped !== base) variants.add(parenStripped);

  // Strip trailing "and Other Stories" / "and Other Tales" etc.
  const otherStripped = base.replace(/\s+and\s+other\s+(stories|tales|essays|poems)$/i, "").trim();
  if (otherStripped && otherStripped !== base) variants.add(otherStripped);

  // Strip leading "The " if present (helps some matchers)
  if (/^the\s+/i.test(base)) {
    const noThe = base.replace(/^the\s+/i, "").trim();
    if (noThe) variants.add(noThe);
  }

  return Array.from(variants);
}

function titleMatches(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length >= 5 && nb.includes(na)) return true;
  if (nb.length >= 5 && na.includes(nb)) return true;
  // Token overlap fallback for reordered titles
  const ta = na.split(" ").filter(t => t.length >= 3);
  const tb = new Set(nb.split(" "));
  if (ta.length >= 2) {
    const overlap = ta.filter(t => tb.has(t)).length;
    if (overlap >= Math.max(2, Math.floor(ta.length * 0.7))) return true;
  }
  return false;
}

function authorMatches(catalogAuthor, resultAuthor) {
  const na = normalize(catalogAuthor);
  const nb = normalize(resultAuthor);
  if (!na || !nb) return false;
  const tokens = na.split(" ").filter(t => t.length > 1);
  if (!tokens.length) return false;
  const lastName = tokens[tokens.length - 1];
  if (nb.includes(lastName)) return true;
  // Also allow match on full catalog name appearing anywhere in result
  return nb.includes(na);
}

async function fetchJson(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const r = await fetch(url, { signal: controller.signal, headers: { "User-Agent": "theshelf-audit/2.0" } });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function checkOpenLibraryWithTitle(title, author) {
  const q = `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=5`;
  const data = await fetchJson(`https://openlibrary.org/search.json?${q}`);
  if (!data || !Array.isArray(data.docs)) return { status: "error" };
  if (data.docs.length === 0) return { status: "empty" };
  for (const doc of data.docs) {
    const docTitle = doc.title || "";
    const docAuthors = (doc.author_name || []).join(" ");
    if (titleMatches(title, docTitle) && authorMatches(author, docAuthors)) {
      return { status: "match", matched: { title: docTitle, author: docAuthors } };
    }
  }
  return { status: "no-match", resultCount: data.docs.length };
}

async function checkITunesWithTitle(title, author) {
  const q = encodeURIComponent(`${title} ${author}`);
  const data = await fetchJson(`https://itunes.apple.com/search?term=${q}&entity=ebook&limit=10`);
  if (!data || !Array.isArray(data.results)) return { status: "error" };
  if (data.results.length === 0) return { status: "empty" };
  for (const doc of data.results) {
    const docTitle = doc.trackName || doc.collectionName || "";
    const docAuthor = doc.artistName || "";
    if (titleMatches(title, docTitle) && authorMatches(author, docAuthor)) {
      return { status: "match", matched: { title: docTitle, author: docAuthor } };
    }
  }
  return { status: "no-match", resultCount: data.results.length };
}

async function tryVariantsOpenLibrary(title, author) {
  const variants = titleVariants(title);
  for (const v of variants) {
    const r = await checkOpenLibraryWithTitle(v, author);
    if (r.status === "match") return { found: true, source: "openlibrary", matched: r.matched };
    if (r.status === "error") return { found: false, source: "openlibrary", reason: "error" };
  }
  // One retry on empty/no-match to catch rate-limit transient empties
  await new Promise(r => setTimeout(r, 800));
  const retry = await checkOpenLibraryWithTitle(variants[0], author);
  if (retry.status === "match") return { found: true, source: "openlibrary", matched: retry.matched };
  return { found: false, source: "openlibrary", reason: retry.status };
}

async function tryVariantsITunes(title, author) {
  const variants = titleVariants(title);
  for (const v of variants) {
    const r = await checkITunesWithTitle(v, author);
    if (r.status === "match") return { found: true, source: "itunes", matched: r.matched };
    if (r.status === "error") return { found: false, source: "itunes", reason: "error" };
  }
  await new Promise(r => setTimeout(r, 800));
  const retry = await checkITunesWithTitle(variants[0], author);
  if (retry.status === "match") return { found: true, source: "itunes", matched: retry.matched };
  return { found: false, source: "itunes", reason: retry.status };
}

async function auditBook(book) {
  const title = book.title;
  const author = book.author;
  const ol = await tryVariantsOpenLibrary(title, author);
  if (ol.found) return { flagged: false, book, checks: [ol] };
  const it = await tryVariantsITunes(title, author);
  if (it.found) return { flagged: false, book, checks: [ol, it] };
  return { flagged: true, book, checks: [ol, it] };
}

async function processBatch(books, startIdx) {
  const results = [];
  let i = 0;
  while (i < books.length) {
    const slice = books.slice(i, i + CONCURRENCY);
    const batch = await Promise.all(slice.map(b => auditBook(b)));
    results.push(...batch);
    i += CONCURRENCY;
    const done = startIdx + i;
    // Small delay between batches to pace requests
    await new Promise(r => setTimeout(r, 150));
    // Longer cooldown every 500 books to avoid cumulative rate limiting
    if (done > 0 && done % 500 === 0) {
      await new Promise(r => setTimeout(r, 3000));
    }
    if (done % 100 === 0 || i >= books.length) {
      const flaggedSoFar = results.filter(r => r.flagged).length;
      process.stdout.write(`\r  checked ${done}, flagged so far: ${flaggedSoFar}  `);
    }
  }
  return results;
}

(async () => {
  const raw = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
  const books = Array.isArray(raw) ? raw : (raw.books || Object.values(raw).find(v => Array.isArray(v)));
  console.log(`Loaded ${books.length} books from catalog`);

  const end = LIMIT > 0 ? Math.min(START + LIMIT, books.length) : books.length;
  const slice = books.slice(START, end);
  console.log(`Auditing books [${START}..${end}) = ${slice.length} books, concurrency=${CONCURRENCY}`);
  console.log(`Matcher: subtitle/paren/other-stories variants, retry on empty, 500-book cooldowns`);
  console.log("");

  const t0 = Date.now();
  const results = await processBatch(slice, START);
  const dt = ((Date.now() - t0) / 1000).toFixed(0);

  const flagged = results.filter(r => r.flagged).map(r => ({
    title: r.book.title,
    author: r.book.author,
    publicationDate: r.book.publicationDate,
    genre: r.book.genre,
    series: r.book.series,
    checks: r.checks.map(c => ({ source: c.source, reason: c.reason })),
  }));

  console.log(`\n\nDone in ${dt}s`);
  console.log(`Total checked: ${results.length}`);
  console.log(`Verified: ${results.length - flagged.length}`);
  console.log(`Flagged: ${flagged.length} (${((flagged.length / results.length) * 100).toFixed(1)}%)`);

  fs.writeFileSync(OUT_PATH, JSON.stringify(flagged, null, 2));
  console.log(`\nFlagged entries written to ${OUT_PATH}`);

  if (flagged.length > 0) {
    console.log("\nFirst 30 flagged:");
    for (const f of flagged.slice(0, 30)) {
      console.log(`  "${f.title}" — ${f.author}`);
    }
  }
})().catch(e => {
  console.error("Audit failed:", e);
  process.exit(1);
});

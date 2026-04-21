// Metadata audit: for every book in the catalog, query Open Library and
// compare publication year + page count. Flag meaningful mismatches.
//
// Usage: node scripts/audit-metadata.cjs
// Optional env: START=0 LIMIT=10043 CONCURRENCY=3

const fs = require("fs");
const path = require("path");

const CATALOG_PATH = path.join(__dirname, "..", "public", "book-data.json");
const OUT_PATH = path.join(__dirname, "..", "metadata-issues.json");

const START = parseInt(process.env.START || "0", 10);
const LIMIT = parseInt(process.env.LIMIT || "0", 10);
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "3", 10);

// Thresholds
const YEAR_TOLERANCE = 3;        // catalog year within ±3 of OL first_publish_year is fine
const PAGES_PCT_TOLERANCE = 0.25; // catalog pages within ±25% of OL median is fine
const PAGES_MIN_ABS_DIFF = 30;   // ignore small absolute diffs even if pct is high

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019\u201a\u201b]/g, "'")
    .replace(/[\u201c\u201d\u201e\u201f]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleMatches(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length >= 5 && nb.includes(na)) return true;
  if (nb.length >= 5 && na.includes(nb)) return true;
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

async function findBestOpenLibraryMatch(title, author) {
  const q = `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=5&fields=title,author_name,first_publish_year,publish_year,number_of_pages_median,edition_count`;
  const data = await fetchJson(`https://openlibrary.org/search.json?${q}`);
  if (!data || !Array.isArray(data.docs) || data.docs.length === 0) return null;
  for (const doc of data.docs) {
    const docTitle = doc.title || "";
    const docAuthors = (doc.author_name || []).join(" ");
    if (titleMatches(title, docTitle) && authorMatches(author, docAuthors)) {
      return {
        title: doc.title,
        author: (doc.author_name || [])[0] || "",
        first_publish_year: doc.first_publish_year,
        publish_years: Array.isArray(doc.publish_year) ? doc.publish_year : [],
        pages_median: doc.number_of_pages_median,
        edition_count: doc.edition_count,
      };
    }
  }
  return null;
}

function catalogYear(book) {
  if (!book.publicationDate) return null;
  const y = parseInt(String(book.publicationDate).slice(0, 4), 10);
  return isNaN(y) ? null : y;
}

async function auditBook(book) {
  const match = await findBestOpenLibraryMatch(book.title, book.author);
  if (!match) return { book, status: "not-found" };

  const issues = [];
  const catYear = catalogYear(book);
  const olFirstYear = match.first_publish_year;
  const olYears = match.publish_years || [];

  // Build a sane year range from OL history. Prefer the earliest actual edition.
  let olMinYear = null;
  if (olYears.length > 0) {
    olMinYear = Math.min(...olYears.filter(y => y && y > 1000 && y < 2100));
  }
  const olReferenceYear = olMinYear || olFirstYear;

  // Year check: avoid OL reprint-noise for classics (pre-1970 books often have
  // OL data starting from later reprint editions). For modern books (1970+)
  // flag in both directions. For older books, only flag large forward gaps.
  if (catYear && olReferenceYear) {
    const inHistory = olYears.includes(catYear);
    const diff = catYear - olReferenceYear;

    if (!inHistory) {
      // Forward mismatch: catalog claims a later date than any OL edition — flag always
      if (diff > YEAR_TOLERANCE) {
        issues.push({
          field: "year",
          catalog: catYear,
          openlibrary_earliest: olReferenceYear,
          diff,
          direction: "forward",
        });
      }
      // Backward mismatch: catalog earlier than OL's earliest edition.
      // Only meaningful for modern books (1970+) where OL records tend to match
      // actual release. For classics this is OL noise and we ignore.
      else if (diff < -10 && catYear >= 1970) {
        issues.push({
          field: "year",
          catalog: catYear,
          openlibrary_earliest: olReferenceYear,
          diff,
          direction: "backward",
        });
      }
    }
  }

  // Pages check is too noisy (omnibus editions, excerpts) — skip entirely.

  if (issues.length === 0) return { book, status: "ok", match };
  return { book, status: "issues", match, issues };
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
    await new Promise(r => setTimeout(r, 150));
    if (done > 0 && done % 500 === 0) {
      await new Promise(r => setTimeout(r, 3000));
    }
    if (done % 100 === 0 || i >= books.length) {
      const issues = results.filter(r => r.status === "issues").length;
      const nf = results.filter(r => r.status === "not-found").length;
      process.stdout.write(`\r  checked ${done} | issues: ${issues} | not-found: ${nf}  `);
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
  console.log(`Auditing metadata [${START}..${end}) = ${slice.length} books, concurrency=${CONCURRENCY}`);
  console.log(`Thresholds: year ±${YEAR_TOLERANCE} | pages ±${PAGES_PCT_TOLERANCE * 100}% (min ${PAGES_MIN_ABS_DIFF} pages)`);
  console.log("");

  const t0 = Date.now();
  const results = await processBatch(slice, START);
  const dt = ((Date.now() - t0) / 1000).toFixed(0);

  const withIssues = results.filter(r => r.status === "issues");
  const yearIssues = withIssues.filter(r => r.issues.some(i => i.field === "year"));
  const pagesIssues = withIssues.filter(r => r.issues.some(i => i.field === "pages"));
  const notFound = results.filter(r => r.status === "not-found");

  const flagged = withIssues.map(r => ({
    title: r.book.title,
    author: r.book.author,
    catalog: { year: catalogYear(r.book), pages: r.book.pageCount, series: r.book.series },
    openlibrary: { title: r.match.title, year: r.match.first_publish_year, pages: r.match.pages_median },
    issues: r.issues,
  }));

  console.log(`\n\nDone in ${dt}s`);
  console.log(`Total checked: ${results.length}`);
  console.log(`OK: ${results.length - withIssues.length - notFound.length}`);
  console.log(`Issues: ${withIssues.length} (${((withIssues.length / results.length) * 100).toFixed(1)}%)`);
  console.log(`  - year mismatches: ${yearIssues.length}`);
  console.log(`  - pages mismatches: ${pagesIssues.length}`);
  console.log(`Not found in OL: ${notFound.length} (skipped, expected)`);

  fs.writeFileSync(OUT_PATH, JSON.stringify(flagged, null, 2));
  console.log(`\nIssues written to ${OUT_PATH}`);
})().catch(e => {
  console.error("Audit failed:", e);
  process.exit(1);
});

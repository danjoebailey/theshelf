// Bibliography audit: for every unique author in the catalog, query Open Library
// for their notable works and flag authors whose bibliography is under-filled.
//
// Usage: node scripts/audit-bibliography.cjs
// Optional env: CONCURRENCY=3 MIN_EDITIONS=15 MAX_GAPS_PER_AUTHOR=10

const fs = require("fs");
const path = require("path");

const CATALOG_PATH = path.join(__dirname, "..", "public", "book-data.json");
const OUT_PATH = path.join(__dirname, "..", "biblio-gaps.json");

const CONCURRENCY = parseInt(process.env.CONCURRENCY || "3", 10);
const MIN_EDITIONS = parseInt(process.env.MIN_EDITIONS || "15", 10);
const MAX_GAPS_PER_AUTHOR = parseInt(process.env.MAX_GAPS_PER_AUTHOR || "10", 10);
const MAX_WORKS_FROM_OL = 50;

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

function titlesEquivalent(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length >= 5 && nb.includes(na)) return true;
  if (nb.length >= 5 && na.includes(nb)) return true;
  return false;
}

// Filter out noise titles: introductions, prefaces, letters-to, critical editions,
// short stories that snuck into work lists, study guides, etc.
const NOISE_PATTERNS = [
  /\bintroduction\b/i,
  /\bpreface\b/i,
  /\bforeword\b/i,
  /\bafterword\b/i,
  /\bstudy guide\b/i,
  /\bcritical edition\b/i,
  /\bnorton critical\b/i,
  /\bselected (works|writings|essays|letters|poems)\b/i,
  /\bcollected (works|writings|essays|letters|poems)\b/i,
  /\bcomplete (works|writings)\b/i,
  /\bcompanion to\b/i,
  /\babridged\b/i,
  /\breader('s)? guide\b/i,
  /\bsparknotes\b/i,
  /\bcliffsnotes\b/i,
  /\bbook\s*club\b.*\bedition\b/i,
  /\bin spanish\b/i,
  /\bin french\b/i,
  /\bin german\b/i,
  /\b\(illustrated\)\b/i,
  /\bfacsimile\b/i,
  /^a study of /i,
  /^critical (essays|companion|perspectives|readings) /i,
  /^(biography|life) of /i,
];

function isNoiseTitle(title) {
  if (!title) return true;
  for (const p of NOISE_PATTERNS) if (p.test(title)) return true;
  return false;
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

// English stopwords, ≥2 chars and not ambiguous across Romance languages.
// Single-letter words ("a", "i", "o") and short words also common in Italian/
// Spanish/French (like "e", "un", "la", "de") are excluded.
const ENGLISH_STOPWORDS = new Set([
  "the","an","of","to","in","on","at","by","for","with","from","and","but",
  "as","is","it","its","this","that","these","those","he","she","we","you","they",
  "his","her","their","my","your","our","who","what","where","when","how","why","all",
  "not","no","be","been","being","was","were","has","have","had","do","does","did",
  "will","would","can","could","should","may","might","must","down","out","over",
  "under","about","into","through","between","after","before","above","below",
  "if","than","then","there","here","one","two","three","four","five","new","old",
  "good","bad","great","little","big","small","last","first","next","other","some",
  "any","many","much","more","most","own","same","such","only","also","very",
  "just","now","away","off","back",
]);

function hasSuspiciousUnicode(s) {
  // Non-Latin scripts (Cyrillic, CJK, Arabic, Greek) — definitely not English
  if (/[\u0370-\u1fff\u2c00-\ud7ff\u3000-\u9fff\ua000-\ufaff]/.test(s || "")) return true;
  // Diacritics common in Romance/Germanic languages
  if (/[àáâäãåèéêëìíîïòóôöõùúûüñçßæø]/i.test(s || "")) return true;
  return false;
}

// Aggressive non-English detector: require English stopwords in multi-word titles,
// reject any diacritics, and reject titles starting with common non-English tokens.
function looksNonEnglish(title) {
  if (!title) return true;
  if (hasSuspiciousUnicode(title)) return true;

  const t = title.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!t) return true;

  // Common non-English leading tokens (high confidence)
  const nonEngStart = /^(der|die|das|und|eine|einer|einem|brief|briefe|im|vom|zum|zur|il|lo|gli|della|delle|dei|del|una|uno|questo|questa|queste|questi|nostri|nostra|nostre|se|sono|siamo|sulla|nella|otras|siete|sobre|entre|nuestra|nuestro|le|les|du|des|dans|avec|pour|sans|temps|choses|fiabe|enarrationes|opera|sermones|epistulae|ad|cum|el|la|los|las|obra|obras|antolog|cuentos|ensayos|i)\s+(sommersi|nostri|nostra|nostre|salvati|promessi|miserabili|fiori|morti|giorni|sette|tre|cinque|due|quattro|dieci|sei|nove)/;
  if (nonEngStart.test(t)) return true;
  // Additional check: if the FIRST word is a foreign determiner/pronoun
  const firstWord = t.split(" ")[0];
  const foreignFirstWords = new Set(["der","die","das","und","eine","einer","einem","il","lo","gli","della","delle","dei","del","una","uno","questo","questa","le","les","du","des","dans","avec","pour","sans","el","la","los","las","obra","obras","brief","briefe","im","vom","zum","zur","otras","siete","sobre","entre","nuestra","nuestro","opera","enarrationes","sermones","epistulae","ad","cum","antologia","antología","antología","cuentos","ensayos","se","sono","siamo","nostri","nostra"]);
  if (foreignFirstWords.has(firstWord)) return true;

  // For multi-word titles, require at least one English stopword
  const words = t.split(" ").filter(w => w.length > 0);
  if (words.length >= 2) {
    const hasStopword = words.some(w => ENGLISH_STOPWORDS.has(w));
    if (!hasStopword) return true;
  }
  // Single-word titles pass if they're simple ASCII
  return false;
}

async function queryOpenLibraryWorks(author) {
  // language=eng tells OL to prefer English-language records
  const q = `author=${encodeURIComponent(author)}&language=eng&limit=${MAX_WORKS_FROM_OL}&fields=title,author_name,first_publish_year,edition_count,language`;
  const data = await fetchJson(`https://openlibrary.org/search.json?${q}`);
  if (!data || !Array.isArray(data.docs)) return [];
  const results = [];
  const na = normalize(author);
  const tokens = na.split(" ").filter(t => t.length > 1);
  const lastName = tokens[tokens.length - 1] || "";
  for (const doc of data.docs) {
    const docAuthors = (doc.author_name || []).join(" ").toLowerCase();
    if (!docAuthors.includes(lastName)) continue;
    const title = doc.title || "";
    if (isNoiseTitle(title)) continue;
    if ((doc.edition_count || 0) < MIN_EDITIONS) continue;
    // Require English in the language array
    const langs = doc.language || [];
    if (!langs.includes("eng") && !langs.includes("en")) continue;
    // Skip if title itself looks like a non-English language
    if (looksNonEnglish(title)) continue;
    results.push({
      title,
      editions: doc.edition_count || 0,
      year: doc.first_publish_year || null,
    });
  }
  results.sort((a, b) => b.editions - a.editions);
  return results;
}

async function auditAuthor(author, catalogTitlesByAuthor) {
  const olWorks = await queryOpenLibraryWorks(author);
  if (olWorks.length === 0) return null;
  const catalogTitles = catalogTitlesByAuthor[author] || [];
  const gaps = [];
  for (const work of olWorks) {
    const covered = catalogTitles.some(t => titlesEquivalent(t, work.title));
    if (!covered) gaps.push(work);
    if (gaps.length >= MAX_GAPS_PER_AUTHOR) break;
  }
  return { author, catalogCount: catalogTitles.length, olWorksFound: olWorks.length, gaps };
}

async function processAuthors(authors, catalogTitlesByAuthor) {
  const results = [];
  let i = 0;
  while (i < authors.length) {
    const slice = authors.slice(i, i + CONCURRENCY);
    const batch = await Promise.all(slice.map(a => auditAuthor(a, catalogTitlesByAuthor)));
    for (const r of batch) if (r) results.push(r);
    i += CONCURRENCY;
    await new Promise(r => setTimeout(r, 150));
    if (i > 0 && i % 300 === 0) await new Promise(r => setTimeout(r, 2000));
    if (i % 50 === 0 || i >= authors.length) {
      const gapSum = results.reduce((s, r) => s + r.gaps.length, 0);
      process.stdout.write(`\r  audited ${Math.min(i, authors.length)}/${authors.length} authors | ${gapSum} gaps found  `);
    }
  }
  return results;
}

(async () => {
  const raw = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
  const books = Array.isArray(raw) ? raw : (raw.books || Object.values(raw).find(v => Array.isArray(v)));

  const catalogTitlesByAuthor = {};
  for (const b of books) {
    if (!catalogTitlesByAuthor[b.author]) catalogTitlesByAuthor[b.author] = [];
    catalogTitlesByAuthor[b.author].push(b.title);
  }
  const authors = Object.keys(catalogTitlesByAuthor);

  console.log(`Catalog has ${books.length} books across ${authors.length} authors`);
  console.log(`Filters: edition_count >= ${MIN_EDITIONS}, English only, no ephemera, max ${MAX_GAPS_PER_AUTHOR} gaps/author`);
  console.log("");

  const t0 = Date.now();
  const results = await processAuthors(authors, catalogTitlesByAuthor);
  const dt = ((Date.now() - t0) / 1000).toFixed(0);

  // Only keep authors with at least 1 gap
  const withGaps = results.filter(r => r.gaps.length > 0);
  withGaps.sort((a, b) => b.gaps.length - a.gaps.length);

  const totalGaps = withGaps.reduce((s, r) => s + r.gaps.length, 0);

  console.log(`\n\nDone in ${dt}s`);
  console.log(`Authors audited: ${results.length}`);
  console.log(`Authors with gaps: ${withGaps.length}`);
  console.log(`Total potential additions: ${totalGaps}`);

  fs.writeFileSync(OUT_PATH, JSON.stringify(withGaps, null, 2));
  console.log(`\nGaps written to ${OUT_PATH}`);

  console.log("\nTop 20 authors with most gaps:");
  for (const r of withGaps.slice(0, 20)) {
    console.log(`  ${r.author} — ${r.catalogCount} in catalog, ${r.gaps.length} suggested additions`);
  }
})().catch(e => {
  console.error("Audit failed:", e);
  process.exit(1);
});

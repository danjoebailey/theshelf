// Batch 72 — adult romance push
const fs = require("fs");
const path = require("path");
const SIDECAR = path.join(__dirname, "..", "public", "book-tags.json");
const apply = process.argv.includes("--apply");

const batch = {
  // === ROMANCE (adult) ===
  6524:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // King — Ward
  6527:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Blaze of Memory
  6591:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Asa
  6594:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Sweet Ache
  6595:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Hard Beat
  6602:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Touch of Chaos
  6607:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Park Avenue Player
  6735:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Dark Deeds at Night's Edge
  7660:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Under One Roof
  7662:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Fine Print
  7675:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Throne of the Fallen
  7679:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Love, Redesigned
  8332:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Reunion
  8333:  { prose: 5, characters: 6, plot: 6, pacing: 7, ideas: 4, resonance: 5, ending: 6, voice: 5, chemistry: 7, tension: 6, heaPayoff: 7 }, // Beautiful Burn
  8335:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dating-ish
  8434:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Dare
  8435:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Play
  8436:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Legacy
  8502:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Blue Smoke
  8519:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Block Shot
  8520:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Catch a Rogue
  8521:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // One Good Earl Deserves a Lover
  8522:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 8, voice: 8, chemistry: 9, tension: 8, heaPayoff: 9 }, // Devil in Spring
  8966:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Stuck with You
  8967:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // My Killer Vacation
  8970:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Friend Zone
  8971:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Last Second Chance
  8972:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Handle with Care
  8973:  { prose: 7, characters: 8, plot: 7, pacing: 6, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Luna and the Lie
  8975:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 8 }, // Lothaire
  8976:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Kiss of Snow
  8977:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 7, tension: 6, heaPayoff: 8 }, // Wedding Party
  8988:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Window on the Bay
  8989:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Must Love Flowers
  8990:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Wanderer
  8991:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // What We Find
  8993:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // California Girls
  8996:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 7, tension: 7, heaPayoff: 8 }, // Wrapped Up in You
  8998:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 8, heaPayoff: 7 }, // Mackenzie's Mountain
  8999:  { prose: 7, characters: 8, plot: 7, pacing: 8, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 8, heaPayoff: 7 }, // Dream Man
  9035:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Northern Lights
  9332:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Italian Girl in Brooklyn
  9355:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Spirit of the Season
  9359:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Family Blessings
  9360:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // November of the Heart
  9361:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Bygones
  9367:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Blackberry Beach
  9368:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Windswept Way
  9544:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Devil's Daughter
  9566:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Slightly Tempted
  9567:  { prose: 8, characters: 8, plot: 7, pacing: 6, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Slightly Sinful
  9603:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Call Me Irresistible
  9604:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Heroes Are My Weakness
  9614:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Healer
  9615:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Rescuer
  9616:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Losing the Field
  9617:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Making a Play
  9618:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Game Changer
  9624:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Shameless Hour
  9625:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Fifteenth Minute
  9633:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // O'Malley Christmas
  9674:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Deep End
  9675:  { prose: 6, characters: 7, plot: 6, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // King of Envy
  9676:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Say You'll Remember Me
  9690:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Fearless — Silver
  9691:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 7 }, // Wild Heart
  2092:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 6, voice: 6, chemistry: 8, tension: 8, heaPayoff: 6 }, // Birthday Girl
  3844:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Again the Magic
  3850:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Born in Fire
  4406:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 7, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // Devil in Disguise
  4617:  { prose: 7, characters: 8, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 8 }, // Girl with the Make-Believe Husband
  4637:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Rescue
  4654:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Good Yarn
  4980:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Paradise Problem
  5429:  { prose: 8, characters: 8, plot: 7, pacing: 7, ideas: 7, resonance: 8, ending: 7, voice: 8, chemistry: 8, tension: 7, heaPayoff: 8 }, // People You Meet on Vacation
  5668:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Bed of Roses
  5669:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Savor the Moment
  5670:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Happy Ever After
  5779:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 8, tension: 8, heaPayoff: 7 }, // Fire Night
  6381:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 6, tension: 6, heaPayoff: 7 }, // Changing Habits
  6382:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Christmas List
  6383:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Starting Now
  6409:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Cedar Cove Christmas
  7891:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Apartment
  8304:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Born in Ice
  8305:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Born in Shame
  8343:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Shadow Spell
  8344:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Blood Magick
  8426:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Back on Blossom Street
  8438:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 7 }, // Susannah's Garden
  8508:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Promise — Steel
  8509:  { prose: 5, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 6, ending: 7, voice: 6, chemistry: 7, tension: 6, heaPayoff: 7 }, // Palomino
  8843:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 8, tension: 7, heaPayoff: 7 }, // Slow Heat in Heaven
  8946:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Chesapeake Blue
  8947:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Dance Upon the Air
  8948:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Heaven and Earth
  8949:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Face the Fire
  8968:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 6, heaPayoff: 8 }, // Roomies
  8969:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 8, tension: 7, heaPayoff: 8 }, // Dating You / Hating You
  8995:  { prose: 7, characters: 7, plot: 7, pacing: 7, ideas: 6, resonance: 7, ending: 7, voice: 7, chemistry: 7, tension: 7, heaPayoff: 7 }, // Sweet Magnolias: Stealing Home
  9001:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Key of Light
  9002:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Key of Knowledge
  9003:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Key of Valor
  9116:  { prose: 6, characters: 7, plot: 7, pacing: 7, ideas: 5, resonance: 7, ending: 7, voice: 6, chemistry: 7, tension: 7, heaPayoff: 7 }, // Montana Sky
};

const sidecar = JSON.parse(fs.readFileSync(SIDECAR, "utf8"));
let added = 0, updated = 0;
console.log(`=== score-batch-072 ===\nBooks: ${Object.keys(batch).length}\nMode: ${apply ? "APPLY" : "DRY-RUN"}`);

if (apply) {
  for (const [id, scores] of Object.entries(batch)) {
    if (!sidecar[id]) { sidecar[id] = { vibes: {}, tags: [], scores }; added++; }
    else { sidecar[id].scores = { ...(sidecar[id].scores || {}), ...scores }; updated++; }
  }
  fs.writeFileSync(SIDECAR, JSON.stringify(sidecar, null, 2));
  console.log(`Wrote ${added} new, updated ${updated}.`);
} else {
  console.log("Dry run — pass --apply to write.");
}

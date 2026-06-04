// Craft scores + vibes for unscored romantasy titles Claude can score honestly
// (genuine craft read; obscure/edge titles deliberately left unscored).
// Schema matches live book-tags.json: universal 8 (prose, characters, plot,
// pacing, ideas, resonance, ending, voice) + genre pack (Fantasy:
// worldBuilding, magicSystem | Romance: chemistry, tension, heaPayoff) + 11
// vibes (prose_craft, prose_style, warmth, intensity, pace, moral_complexity,
// fabulism, emotional_register, interiority, tone, difficulty).
// Merges into existing entries — preserves each book's `tags`.
//
// Run: node scripts/score-batch-romantasy-001.cjs

const fs = require("fs"), path = require("path");
const TAGS_PATH = path.join(__dirname, "..", "public", "book-tags.json");
const tags = JSON.parse(fs.readFileSync(TAGS_PATH, "utf8"));

const batch = {
  // Fourth Wing — Rebecca Yarros [Fantasy]: propulsive dragon-rider academy
  // romantasy; functional commercial prose, strong banter/chemistry, cliffhanger.
  755: { scores: { prose:4, characters:6, plot:6, pacing:9, ideas:4, resonance:8, ending:7, voice:5, worldBuilding:6, magicSystem:6 },
         vibes:  { prose_craft:4, prose_style:4, warmth:6, intensity:6, pace:9, moral_complexity:4, fabulism:8, emotional_register:5, interiority:4, tone:5, difficulty:3 } },
  // Iron Flame — Rebecca Yarros [Fantasy]: sequel; more worldbuilding, saggier
  // middle, another cliffhanger.
  756: { scores: { prose:4, characters:6, plot:5, pacing:6, ideas:4, resonance:6, ending:7, voice:5, worldBuilding:6, magicSystem:6 },
         vibes:  { prose_craft:4, prose_style:4, warmth:6, intensity:6, pace:6, moral_complexity:4, fabulism:8, emotional_register:5, interiority:4, tone:5, difficulty:3 } },
  // Sorcery of Thorns — Margaret Rogerson [Fantasy]: gothic grimoire-libraries,
  // demon pact, enemies-to-lovers; charming, cleanly written standalone.
  7065: { scores: { prose:6, characters:7, plot:7, pacing:7, ideas:5, resonance:8, ending:7, voice:6, worldBuilding:7, magicSystem:6 },
          vibes:  { prose_craft:6, prose_style:5, warmth:7, intensity:4, pace:7, moral_complexity:4, fabulism:9, emotional_register:6, interiority:5, tone:6, difficulty:4 } },
  // A Marvellous Light — Freya Marske [Fantasy]: Edwardian hidden-magic, M/M,
  // curse mystery; witty, well-crafted prose.
  7055: { scores: { prose:7, characters:7, plot:6, pacing:6, ideas:5, resonance:8, ending:7, voice:7, worldBuilding:6, magicSystem:6 },
          vibes:  { prose_craft:7, prose_style:6, warmth:7, intensity:5, pace:6, moral_complexity:5, fabulism:8, emotional_register:6, interiority:6, tone:6, difficulty:5 } },
  // Mortal Follies — Alexis Hall [Romance]: Regency sapphic fantasy, arch
  // Robin-Goodfellow narrator; stylish comedic voice.
  4906: { scores: { prose:7, characters:6, plot:6, pacing:5, ideas:5, resonance:7, ending:7, voice:8, chemistry:7, tension:6, heaPayoff:7 },
          vibes:  { prose_craft:7, prose_style:7, warmth:6, intensity:4, pace:5, moral_complexity:5, fabulism:8, emotional_register:6, interiority:5, tone:7, difficulty:5 } },
  // The Foxglove King — Hannah Whitten [Fantasy]: necromancy + court intrigue,
  // slow-burn; solid, moody, mid-spice.
  7070: { scores: { prose:6, characters:6, plot:6, pacing:6, ideas:5, resonance:7, ending:6, voice:6, worldBuilding:6, magicSystem:6 },
          vibes:  { prose_craft:6, prose_style:5, warmth:5, intensity:6, pace:6, moral_complexity:6, fabulism:8, emotional_register:4, interiority:5, tone:3, difficulty:4 } },
  // The Bridge Kingdom — Danielle L. Jensen [Fantasy]: assassin-princess,
  // enemies-to-lovers, political; brisk commercial fantasy romance.
  11537: { scores: { prose:5, characters:6, plot:7, pacing:7, ideas:4, resonance:7, ending:7, voice:5, worldBuilding:6, magicSystem:4 },
           vibes:  { prose_craft:5, prose_style:4, warmth:6, intensity:6, pace:7, moral_complexity:5, fabulism:7, emotional_register:5, interiority:4, tone:4, difficulty:3 } },
  // Assistant to the Villain — Hannah Nicole Maehrer [Romance]: cozy fantasy
  // romcom; warm, light, banter-forward.
  5438: { scores: { prose:5, characters:6, plot:5, pacing:6, ideas:3, resonance:7, ending:6, voice:6, chemistry:7, tension:5, heaPayoff:7 },
          vibes:  { prose_craft:5, prose_style:4, warmth:8, intensity:3, pace:6, moral_complexity:3, fabulism:7, emotional_register:7, interiority:4, tone:8, difficulty:2 } },
};

let n = 0;
for (const [id, data] of Object.entries(batch)) {
  const entry = tags[id] || { tags: [] };
  if (!Array.isArray(entry.tags)) entry.tags = [];
  entry.scores = data.scores;
  entry.vibes = data.vibes;
  tags[id] = entry;
  n++;
}
fs.writeFileSync(TAGS_PATH, JSON.stringify(tags));
console.log("Scored " + n + " romantasy titles. Wrote " + path.basename(TAGS_PATH));

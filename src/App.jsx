import { useState, useMemo, useRef, useEffect } from "react";
import { supabase } from "./supabase.js";

const GENRES = ["Fiction","Non-Fiction","Fantasy","Sci-Fi","Mystery","Thriller","Horror","Romance","Biography","History","Historical Fiction","Young Adult","Self-Help","Graphic Novel","Other"];
const GENRE_COLORS = {
  "Fiction":"#7b6fa0","Non-Fiction":"#4a8a8a","Fantasy":"#6b7fa8","Sci-Fi":"#4a7a8a",
  "Mystery":"#8a5a6a","Thriller":"#4a5a6a","Horror":"#6a3a3a","Romance":"#8a5a5a",
  "Biography":"#8a6a4a","History":"#7a7a4a","Historical Fiction":"#7a6a4a",
  "Young Adult":"#5a8a7a","Self-Help":"#4a7a5a","Graphic Novel":"#7a5a8a","Other":"#6a6a6a",
};
const SHELVES = ["Read", "Reading", "The List", "Curious", "DNF"];

// Touch-click helper: fires action on touchEnd (no 300ms delay) and onClick (desktop).
// stopProp=true also stops event propagation (for buttons inside click-to-close containers).
function tc(action, stopProp = false) {
  return {
    onTouchEnd: e => { if (stopProp) e.stopPropagation(); e.preventDefault(); action(); },
    onClick: stopProp ? (e => { e.stopPropagation(); action(); }) : action,
  };
}

// Warm wood palette
const WOOD = {
  dark:    "#5a3820",
  mid:     "#7a5030",
  grain1:  "#8a6038",
  grain2:  "#6e4828",
  plank:   "#9a7048",
  light:   "#b8905a",
  shine:   "#d4aa72",
  shelf:   "#a07845",
  shadow:  "rgba(0,0,0,0.25)",
  text:    "#2a1608",
  textDim: "#6b4020",
  textFaint:"#9a7040",
  amber:   "#b86800",
  card:    "rgba(255,235,195,0.72)",
  cardBorder: "rgba(160,100,40,0.3)",
};

const CR = {
  bg: "#f5e8d0", panel: "#ece0c4", text: "#2a1e10",
  textDim: "#8a7060", textFaint: "#b8a888", border: "#d8ceba", amber: "#b86800",
};

// Rustic hardcover color palettes
const RUSTIC_COVERS = [
  { base:"#8b1a1a", mid:"#b02828", dark:"#5c1010", light:"#d44040", cloth:"#7a1818" },
  { base:"#1a4a1a", mid:"#286828", dark:"#0f2e0f", light:"#3a8c3a", cloth:"#183818" },
  { base:"#1a2a7a", mid:"#2438a0", dark:"#101850", light:"#3050c8", cloth:"#182060" },
  { base:"#7a5000", mid:"#9a6800", dark:"#4a3000", light:"#c08810", cloth:"#604000" },
  { base:"#5a1a7a", mid:"#7228a0", dark:"#381050", light:"#9040c8", cloth:"#481860" },
  { base:"#007870", mid:"#009a90", dark:"#004848", light:"#10b8a8", cloth:"#006060" },
  { base:"#8b4500", mid:"#b05800", dark:"#5c2e00", light:"#d87010", cloth:"#7a3800" },
  { base:"#1a3a6a", mid:"#244e88", dark:"#102448", light:"#2e62a8", cloth:"#183058" },
  { base:"#6a1a3a", mid:"#882450", dark:"#401028", light:"#a83060", cloth:"#501830" },
  { base:"#2a5a1a", mid:"#387828", dark:"#183810", light:"#489a30", cloth:"#204814" },
];

function RusticSpine({ book, index, w, h, tilt }) {
  const rc = RUSTIC_COVERS[index % RUSTIC_COVERS.length];
  const id = `rs-${book.id}`;
  const topH = 5;
  const sy = topH;
  const sh = h - topH;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink:0, transform:`rotate(${tilt}deg)`, transformOrigin:"bottom center", display:"block", overflow:"visible" }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={rc.dark}/>
          <stop offset="12%"  stopColor={rc.cloth}/>
          <stop offset="38%"  stopColor={rc.base}/>
          <stop offset="62%"  stopColor={rc.mid}/>
          <stop offset="88%"  stopColor={rc.cloth}/>
          <stop offset="100%" stopColor={rc.dark}/>
        </linearGradient>
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,245,210,0.28)"/>
          <stop offset="20%"  stopColor="rgba(255,255,255,0.04)"/>
          <stop offset="70%"  stopColor="rgba(0,0,0,0.04)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.38)"/>
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={rc.light}/>
          <stop offset="100%" stopColor={rc.base}/>
        </linearGradient>
      </defs>

      {/* 3D top face */}
      <rect x="0" y="0" width={w} height={topH} fill={`url(#${id}-top)`}/>
      <rect x="0" y="0" width={w} height={topH} fill="rgba(255,255,255,0.18)"/>
      <line x1="1" y1="1.5" x2={w-1} y2="1.5" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6"/>
      <line x1="1" y1="3.2" x2={w-1} y2="3.2" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>

      {/* Spine body */}
      <rect x="0" y={sy} width={w} height={sh} fill={`url(#${id}-g)`}/>
      <rect x="0" y={sy} width={w} height={sh} fill={`url(#${id}-v)`}/>

      {/* Left edge shadow */}
      <rect x="0" y={sy} width="2.5" height={sh} fill="rgba(0,0,0,0.52)"/>
      {/* Right edge highlight */}
      <rect x={w-1.5} y={sy} width="1.5" height={sh} fill="rgba(255,255,255,0.12)"/>
      {/* Top spine highlight */}
      <rect x="0" y={sy} width={w} height="2" fill="rgba(255,245,210,0.32)"/>

      {/* Gold decorative band — top */}
      <rect x="2" y={sy+5}   width={w-4} height="2"   fill="rgba(255,215,80,0.35)"/>
      <rect x="2" y={sy+8}   width={w-4} height="0.8" fill="rgba(255,215,80,0.2)"/>
      {/* Gold decorative band — bottom */}
      <rect x="2" y={sy+sh-9} width={w-4} height="2"   fill="rgba(255,215,80,0.35)"/>
      <rect x="2" y={sy+sh-6} width={w-4} height="0.8" fill="rgba(255,215,80,0.2)"/>

      {/* Bottom shadow */}
      <rect x="0" y={sy+sh-3} width={w} height="3" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

function DecorativeShelf({ books }) {
  const shelfH = 72;
  const ledgeH = 10;
  const displayed = books.slice(0, 10);
  const WIDTHS  = [14, 11, 16, 12, 10, 15, 13, 11, 14, 10];
  const HEIGHTS = [52, 58, 48, 55, 60, 50, 56, 46, 62, 54];
  const TILTS   = [0, -2, 0, 1, -1, 2, 0, -2, 1, 0];

  return (
    <div style={{ position:"relative", zIndex:10, flexShrink:0, height: shelfH + ledgeH, margin:"0" }}>
      <div style={{ position:"absolute", left:0, right:0, top:0, bottom:ledgeH, background:"rgba(0,0,0,0.15)" }}/>
      <div style={{
        position:"absolute", left:0, right:0, bottom:ledgeH,
        display:"flex", alignItems:"flex-end", justifyContent:"flex-end", paddingRight:12, gap:2,
        height:shelfH, overflow:"hidden",
      }}>
        {/* title — custom image */}
        <div style={{ flex:1, paddingLeft:8, paddingBottom:0, alignSelf:"flex-end", position:"relative" }}>
          <img src="/shelf-logo.png" alt="the Shelf"
            style={{ height:120, width:"auto", maxWidth:260, objectFit:"contain", objectPosition:"bottom left", transform:"translateY(30px)" }} />
        </div>
        <img src="/left-knight.png" alt="" style={{ height:72, width:"auto", flexShrink:0, objectFit:"contain", objectPosition:"bottom", filter:"drop-shadow(1px 3px 4px rgba(0,0,0,0.4))", alignSelf:"flex-end", marginRight:-16, transform:"scaleX(-1) translateY(4px)" }} />
        {displayed.map((book, i) => (
          <RusticSpine key={book.id} book={book} index={i} w={WIDTHS[i]} h={HEIGHTS[i]} tilt={TILTS[i]} />
        ))}
        <img src="/knight.png" alt="knight" style={{ height:72, width:"auto", flexShrink:0, filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.5))", objectFit:"contain", alignSelf:"flex-end", transform:"translateY(4px)" }} />
      </div>
      <div style={{
        position:"absolute", left:0, right:0, bottom:0, height:ledgeH,
        background:"linear-gradient(180deg, #d4a060 0%, #b07840 60%, #8a5a28 100%)",
        boxShadow:"0 4px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,220,140,0.3)",
      }}/>
    </div>
  );
}

// SVG wood grain background
function WoodBg() {
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:1, pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="woodBase" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#c8905a"/>
          <stop offset="18%"  stopColor="#daa870"/>
          <stop offset="35%"  stopColor="#c89060"/>
          <stop offset="50%"  stopColor="#d4a870"/>
          <stop offset="65%"  stopColor="#c48858"/>
          <stop offset="82%"  stopColor="#d0a468"/>
          <stop offset="100%" stopColor="#c08858"/>
        </linearGradient>
        <linearGradient id="plankShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.0)"/>
          <stop offset="40%"  stopColor="rgba(0,0,0,0.08)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)"/>
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      {/* base wood */}
      <rect width="100%" height="100%" fill="url(#woodBase)"/>
      {/* grain texture overlay */}
      <rect width="100%" height="100%" fill="rgba(180,110,40,0.08)" filter="url(#grain)" style={{mixBlendMode:"multiply"}}/>
      {/* vignette */}
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="100%" stopColor="rgba(80,40,10,0.3)"/>
      </radialGradient>
      <rect width="100%" height="100%" fill="url(#vignette)"/>
    </svg>
  );
}

function StarRating({ value, onChange, size=22, readonly=false, stretch=false, onlyFilled=false }) {
  const [hovered, setHovered] = useState(null);
  const display = hovered ?? value;
  const uid = useRef(`sr-${Math.random().toString(36).slice(2)}`);
  return (
    <div style={{ display:"flex", gap:stretch?0:2, justifyContent:stretch?"space-between":"flex-start", width:stretch?"100%":"auto", cursor:readonly?"default":"pointer" }}
      onMouseLeave={()=>!readonly&&setHovered(null)}>
      {[1,2,3,4,5].map(star => {
        const full = display >= star, half = !full && display >= star-0.5;
        if (onlyFilled && !full && !half) return null;
        const id = `${uid.current}-${star}`;
        return (
          <div key={star} style={{ position:"relative", width:size, height:size }}>
            {!onlyFilled && (
              <svg width={size} height={size} viewBox="0 0 20 20" style={{ position:"absolute" }}>
                <polygon points="10,2 12.4,7.5 18.5,7.5 13.7,11.4 15.5,17.5 10,13.8 4.5,17.5 6.3,11.4 1.5,7.5 7.6,7.5"
                  fill="rgba(0,0,0,0.3)" stroke="rgba(100,60,20,0.4)" strokeWidth="1" />
              </svg>
            )}
            {(full||half) && (
              <svg width={size} height={size} viewBox="0 0 20 20" style={{ position:"absolute" }}>
                <defs><clipPath id={id}><rect x="0" y="0" width={full?20:10} height="20"/></clipPath></defs>
                <polygon points="10,2 12.4,7.5 18.5,7.5 13.7,11.4 15.5,17.5 10,13.8 4.5,17.5 6.3,11.4 1.5,7.5 7.6,7.5"
                  fill="#f59e0b" clipPath={`url(#${id})`} />
              </svg>
            )}
            {!readonly && <>
              <div style={{ position:"absolute",left:0,top:0,width:"50%",height:"100%",zIndex:10 }}
                onMouseEnter={()=>setHovered(star-0.5)} {...tc(()=>onChange(star-0.5),true)} />
              <div style={{ position:"absolute",left:"50%",top:0,width:"50%",height:"100%",zIndex:10 }}
                onMouseEnter={()=>setHovered(star)} {...tc(()=>onChange(star),true)} />
            </>}
          </div>
        );
      })}
    </div>
  );
}

const COVERS = {
  "The Great Gatsby": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAC0AHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDidNgibTrQtFGS0SclRycCtiPw/cSgNHZK6sMgrFnP6VmaVzptnwT+6Tp9BXX2XiZtOEIW35iHylsjP4V24uWIhGP1eCk+pz0lTbftHYxx4buuMafnPI/c9f0pp8OXX/PgP+/X/wBaupHje6hjt5DZhY1XajMrAMMAdfwHT+tQSeKroN5UlnKDLjCFGBbnIwMe56VxSr5klpSX4f5myp4b+b+vuOc/4Ru5PWxX/v3/APWpw8M3Gf8AjyH/AH7/APrV0cfjC4jdFTTwHgBXHlsSM9dwx/Ol/wCExu1VV+wHCOZBmNuuSfT3pfWMy/59L8P8w9nhv5n/AF8jnh4auDwLEH/tl/8AWpP+EbuP+fAHPT91/wDWreh8aSoYiloHEQKqME8H6UJ43nQQKlluEOSo2sc565/Wmq+ZdaS/D/MPZ4b+b+vuOfHhy4J4sAT7Rf8A1qX/AIR25x/x4D/v1/8AWrfTxpPB5JGnqvkliCUbPPXPFQv4zeSAA2uYg5bI3YyffH+cml9YzO2lJf18w9nhb/G/6+Rht4auz/y4ds/6r/61RnwzeHkafwP+mR/wrpP+E9ljZJBZKCIxECQ3IGPzPFVz45YI0ZtgoaMRkZYZAOamVfMv+fS/r5lKGG/m/r7jnm8MXx5Fgcf9cj/hUT+Gr5VLNYkAAknyzwPyrqJPH0myRGs0Ak+Y53DqB/gP6VXvvHZvA/nW0YLoUyCR1z7e9ZutmH/Ptf18ylDD/wAxxZiiSRkMcZKnHQYopJfnmdlztJyDRXrLbU5XubfhC7hsbvRLq4YrBA8MkhAyQowTx3q9rOoLq91NeGSVSCEjhlmeZivOSHboPb34rA0z/kGWv/XFP5CtBLW5dQ628rKeQwQkGupcsbSk7GXLKV1FXOxvfEOnSX+hahcXDXstrKPtEMSusQRVAVgj8K/HIX5TtFQW2qQW93eCTxJLcT3dsY4NSaKXdanfuIOfmG4ZBK9K5R4ZkZVeKRWb7oKkE/Snxb4mlRrTzXA5DKcp78VPJC2j/Ifv31R10XiiCz8RaLMNTuZ1tYfKvrxQ6/aeWK/KeWC7gAW5rHtfEt7H4e1Ozk1G9a5uJYWTMrEYG7zMnPGQV+tZ8Uj3K7o9LSQDglFPPOe3tTJbgQSBH05I5OG2sp6Zz0Pbt/nFSlC/L1+QNT5ea2nzNbQNdj0fQ9VhJl+03Dw+UIpXiwF3ZO5eeMjjvV3RvFFvp2o+HZGu54YbS3kivSoOHJaRhwPvD5h+NcyLhXTy/scRYggbck5Pf60+WQwSQyyaYqKjKSCpG8gdCT6kZq5Ri2093/lYmPNa62RtWutRnwxfRXOuXEl7dyhpoJVlcPGv8AboGcgAt6ACrOualpuo2V/cR+Iblkkkia00rY8aQKGG5WGNmFHTae2axRfXE8ZdNEikRguCULL8qlT09c569RVYam8kpjXTrRmcOioIuQWOePcdB7CsrRbb7eaLtJJXW/qdP4k13T7/AMV2GoQaqk1lHfJKYgk+Y1DKSxD/AC5wCMIB9Ki1vW9J8RtBDdaoyxJqtxLJJLGzOLZuV8vA4XAxtPIYg9K595rmGzC3GixbI4thlMRQk8AMT3PH6mobjUTqj+THYQRO8jSDyV5B2ngcVmlFq8dl1ui2pJ2ktX0szpb/AF7w7q2paXqsJexnsbuFXimiAElsHGMbMjMYGOeSPXFR2d9p9lqfiOS28RWEEl/GzWlyqSYiYzbsEFMg7fQEVxENtNcNsgjkkcDJVRk4pz6ZqCqWNpcAAZJMZ4FTJQjo5FRU5LmUfwNLxTf2N9r8k2n7Xi8qNXlSLy1mkCgPIE/hDHnFFYQOOcCiqSsrE3Lum8aZakf88U/kK6HQbiVrsxmRyixMQu7gfhXPadn+zLX/AK4p/IVZGQODj6VtVoqtR5O6DD13QrKoujL0FxLNfWzTTM+2RcFznHNbQltjqV7GsAWXym3S787hgdq5TPft2p8UM08m2KN5H67VGcVjiMHCp7zfKkrfjf8ApHRhcfOl7qXM2793tbs/vNrSk83SJYwhYmUEKJvLJGB3rOvopIborIpXIyqmTzCB9arz2txbkC4heMtyAwxmkRXKMVUlUGWIHQVdKly1JVVK6l/Xe34Gdas5Uo0ZRacf62tf8TV0Y/LdrEVW8aPEJY8++P0qO4stSexmlvJZlWIghJOd2eMiqMUU84Jhikk29dik4/KlmW/WJjLHdCMdd4bH61EqSVZyUldtb7+i9S4Vm6ChKErJPZ6a9Xp09ehpxTLDp+lb7iWGPzH3NGffv7VHJG8fimKaQKqSTB1ZTlSPXNZS211JAZ0tpWiUElwvAApIbO8uoy8FrLIgOCVXIzUOhSi5S51rdP5u/wDX6GixNWSjH2b05Wt/sq3bZ+W3ma+r2svkyzJDsQOWZxdbwwz/AHfypNJhjsbRr6aaKGaVStuZASAB1bArFSzuZZ3gSB/OQEshGGA+hplvBLOsrRqWEcZZiOiipdH917LnVuvp829/+AH1hqv7ZU3fW3r30S2/PU1NZiFrIuo2Ep+z3GfmiYgBu4+lO169uYoNORJ5VElqC4Dn5s+vrWCc4xk49KiY896PqzXLzO/Lfp9xLxl1PkVua3XZ9beoZopDiitzkRe03/kGWuf+eKfyFWXxjGarad/yDLX/AK4r/IVMDly2RxwOevvXTHRIze7HAdz/APqrXsCZtHmtrSQLdeZuYBtpdfY1jjJ6nP8AKnFsc8YFKtR9rFK9rWffbui6Ff2M27Xumu2/Zl69sLqCyinuWfzGkKeW53YHXOc1pWkcGmWyQXE8CSy/NcJJnJQg4UVy8t/CnDTZPoCTVdtVtgfmZvqVNclWh7SChUqL5aen3HVRxSpVHUp09bJau/r23N24guNN1AQxzyiN2VkZWxuXPHSpfEE839pTwefIIsL8gb5enpWHHeRXH+rl3EDpnpTizHknNaRw6co1JNNpW9dtfwM54pqEqUE0m099lrp+J0pt5bvRU+0F7cQwZSWOQbXGOjL61U0+C5n0BktlkeQXQJCNsONvPNYEs6QxbpX2pmqn9sQLwkkuP9kGueWHUIuPMt7r+rnQsYpSUuV7Weur/C2np6nR69cTWuuCaJv3kaIQVOSpx0Pr/wDXqTXrhYYI4I40gW7i+0y7Rjc3H6CuVOq256mQe5Wp4buK5JVZg2VIwT7Uo0IXhZ35fxFPFzaqaW53f07/AH7dBhZl/wBofr/9egEMMggimNFgnblfp0/KoWDKdxGD3YdD9a6W2jiSLOMUU2Nw3Heikncdi9YE/wBl2uOpiQfpVtFzGAM+uMf1qnp3/IOtfaFf5CrafcXk9K6YK9jOTsKVIHNVZk3csjv9eFFWtx9aaWYd60nHmVjOL5Xc0LTwjd6jZRXFrqFgol4SNSBzn7uWwAfY4qHxH4a/sG4kiGpQ3bKUUQsvzMSuWxjsOBk9z7VRKAkkZBPXaSM/XFCxqmSq8nvXL9Vble+ht7dpEFvZxxN5gjCufTtU5XFOLHFRkmulRjFWRjdyd2RyRJMhWRAy+hp+kaDdaxdPb2s9nZbMFvO5baTjI4+bHfHSlzgUxlDYJ6g5BBwRWFaiprzNadRxNa48BaxYeb9t1eziIJEe45VlHJc/3V/UnHFcxDmV3WW3STAYeZEMfjV50D/6ws/++5P86dGcE+yn+VYQw7XxM0lWvsQFMJxnj1pu3HansOOvemNgVs0ZpkRhw+5Dg9x2P+FFLnJzRWTSNE2XNOP/ABLrUf8ATFf5CrKn5E+gqrp5xp1r/wBcl/kKsxn92v0rqg9EYyQ+kJ/GlxnvSFcGtbszGk0AVebTJE0mLUS6mOSUxBR1BA61UxTUb6kqfQYcYppOPrUhHBphAzSaY00MLZppxTyiMeg/Ko2jA6EioaZSaEOKEbCyf7n9RTG3Doc/hQhykv8AudvqKycrGiRGzfLn3qJiT0qQ4K9ec9KjIrJ6loTBI5oo7etFIrUuWPGl2x/6ZL/KraphQPSqlh/yDbT/AK5p/Kr28gV1QWhjNidKT3o6048VrHUzlojelKf8IPaqSd5vXKjB4G3mufIq617v0iKzYsTHO0i+gBUA/qKpGnBWTv3MluGCaaUqeBPOmWPIXPAJPFb3/COKY1LLcZI5Klcfz4rjxWNpUGlK9z1MHllfFJyha3qcueDxyajIY9Rir+o2yWk4jRg5B5GRkfXHFQQ2811MIoYnkdjgKoya1pTjVhzx2OWvSlQqOnLdedyrt4oRQfMz/wA8zU1zDLazNFMjRyDqrcGoVP3h/smhkoryAiM5G4bvxqvk9VO4ehqz5iupAOeePf6VC6AnI4b1rCS7Gq8xFYEcHnuD1FFCgMwVxhuxHf6UVnzWL5TQ09d2mWv/AFyT+Qq0R6VW04/8Sy1/65L/ACqzz6V2xV0jmk7Bj3pD1q5b6XqF5H5ltYXU6f3ooWYfmBUDxPFIY5UZJF6q6kEfga1ja9kzN3sHlD7N5vmx53bfLz83TOcelRYzTsD1oAG3NNomLE6c1K08+3y3kfA7bjio2wFqLcSOAfxqZqL31NKcpL4XYc2MjsM1cs0ZrWYozKBNFuZGHcnHvnPPXtVEg4yxz7dqv2lrObe+WGJJNqx5dW5ALdAO+eh+lJ9xMg1UhrzEjb2CKCzYyT71Tj2ZOB/CRwfatPU5GWKBFkDxzQxvl1AIIXGB3wOcetVxYXFskc89vKkckbmN3QgN8p5HrUPRFRMl4UYblULg9O35VECVISRcnsw6GrZjb7MWbIO/Bx9KqvypU8r3FYStubq4MoIxjiihRtUAknHc0VlZMu9i9ppH9m2v/XJe3tXp/gHwWdXtf7WuYUeLzDHAsgyox952H8WOgHTPJ4FeZ6acaZaf9ck/kK9a0W01m/8ADFh/ZE0ixtYGNFS5Ef71UuQ2Bkc73hOfoe1aYmThSVuplSSlPXoelLo1oV/eq0jFdpJYgDgDgA4XpnisfxF4PtNZtfJaIybm4dmzJB7xsffkg5B6ccVnrpniT+1JpW+0fZ5LtHVPtXEcYuDkYz0MQU49yOtZa6R4zTS286a5WZYjCP8ATR0W3dQ5O7q0jg565APavMTcXdHY0mrM8q1TTLjSdTubC5wJreQo2Oh9CPYjB/Gqe0V1fxImQ+NrxV5ZI41fnPzbRwT64IFcnuJ6ACvfpzU4Js8uUXGTSAio2+9kH8KkOTSFB1NU1dCi7bkZyRgfpWtosEcqXJmJC5jG8NtZfmPT19/aqdpaNdXARJliYAuGckdOcDHOT2xXX+G9Gu4baZru3khDH5S5Hcc4HXJ7muerUUYu5tTg5OyMbUrKNtRt9hcxiEKDIpO0gkcY7DtXQaXd2usS7PEt1NLbW6eTbIBgFzxt+Xv0xUi6Vcf2rG6M7LgbWyAcZ7dh9KuWXhC31q8WKVzGkLiUlODuHQA/jzXl4jG04x1fTfqj1FgZQp87PO9WsJtNmuLWe2ktyk/CSdcEHH6CsSTO4Djb0Ndz4+je31qeO4lWaYSI2SPvAKQM4/KuGcZkxnrzx2611Uqrq0YzfU4OVRk0HUc0UoQ44NFVZlFvTR/xLLXr/ql/kK7nwX4ybw8ZLK5Z1s5W3rKih2gfjJA7qcAEde45rhNMmiOn2qbvm8pOPwFX8AtjiulQhVp8rd0YOUoTufRNj4rtLu2MqT2c6hSQ0N0nzEZwNrEFSeOD0z1rnPFXj2wtIpYUlt7yQEeVbwPvVj6ysOAvT5RnOPxrx8WxePzhDujHBfbkfnWyPDVwYYpAPkZQSQv3cjP41yfVqMWnKWhs61R6JGDdXE15cy3Vw5knmcyO56sxOTUQJPTit8eHdUVTJFASGBUlcHg8EVJb+F74yo0tuypnkHriuz6zSiviRzOlJvVGAkEkjBUBJPQAcmtKLRrx4WcwMoGPmZeMdzn24ruPDfhwG7DeQUKgZYk8jvwRXcwaNZrEVaBGHzD5hnIJ7ivBzDP1QlyU48x10cFzayZ5VoVoNJvobwxhpoXyecqw7YH516KZYNeheS1dYpEjwVkXHI5HGenPWrd/oVpdQlVhiWT+EgY/CuOmja0uJItnl4OGJYD8BXi1czljXde7JH0GFw1FxSho0aK6Jfi7jHnQpcSIZBhuMenr9DVvTDb6fp90Vk865CHzkb/lmwz0Pvipb3TbB7ZpEDB0QhG3H0PH41h6ddW9jbzrOrDzsZVRnGOpJ96yo0pVr80tumxVepKpSaX5HG6paf2rtvbm5ijcQoX3yFeOeT8p78Vzt5p1tFC0iXds5HRUm3Mfw2iut1yziubSNypRFiwhyMttOOgP0rivnMQiUQMXmVQzHLrjtjOQvPp1HtX1WFm40lfZHhVaLUl3ZUVRnHNFTpLbyM5KY2ASbUfJK9xk9D+HX1orb2qexPs2tGQ6HoE2oaMb1tXNv5UKMFjgeRYwX2AysvCAkcdT3xitnQbRr15Rf3PNq+w7AGWRg3IJ9CO4rK02LWItN08W95ZIiKkkTvGN6j720kj5lyScHIrW0uGbTLfy0vYOTuY7c5NebKcrWTO+lTipJyR2EM7XMT6eba2jsCSq4dgwA6HPPGT9RXR29xBHYrayOjbSMMOeK4ux8Q3FkhRbyAgnPNujY/MVPN4neZCJLmJh04gQf0rgq4eU1yndGdNPX9D0WxvbZLeCNpIlXe4YM3QcYp97c20k8TLcw7F+8FYV5LLqtu5y0h/BMVWfUrY9ZGP/AAGuGWUtz5uZjcqPNzXPaItR01JA32iMYGOXH+NXRrmmIMG6jH/Ah/jXgrahB2kb/vikOoQg/wCuUH0ZKcMpUNpMzfsX1PdZNa01jkXaAZz94f41wmrzXN7rMlwkcXkFlwPPj5x3xu4riEvoG6yx/lUnnQNyJIifwrWjl8aMnJbs2pezjrFnqA1pfIdfKRSUI4lVucEevvXHzpdzq6x2TR8cMJi/6Vgho2GAy/hikaByMqR+QrppU/ZP3SnShLYk1HT9daIpFFLgjBwprkbvRdWictLbTZxwRxzXRlLgcq3HqOKY0t+ows8uPZya61XklqYTwcXrdnKPJeKcXMc3XJyuMn3PeiumEmoschpG+q5/pRVLE2MHgfN/cccmo3EUaRKw2oAqgjPAp39rXX95P++aKK0OEX+17v8AvL/3zR/bN5/eT/vmiimIQ6tdN1K/980w6hOepX8qKKAD+0J/VfypDfznuv5UUUAL/aM47r/3zS/2lc/3l/75oooAP7SuR/EPyp66vep92Uj6UUUhptDxruoj/l4P4jNL/wAJBqHTzFP/AAEUUVLiuxpGpNbNip4h1FDuSUKfZaKKKnkj2NPbVF9p/ef/2Q==",
};

// Fixed-size cover: renders fallback at exact w×h, overlays img on top (hides on error)
function BookCover({ book, width, height, radius=4, shadow="2px 2px 8px rgba(0,0,0,0.3)" }) {
  const srcs = [
    book.coverUrl,
    book.coverId ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg` : null,
    book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg` : null,
  ].filter(Boolean).map(u => u.replace("http://", "https://").replace("&edge=curl", ""));
  const [srcIdx, setSrcIdx] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const prevCoverUrl = useRef(book.coverUrl);
  useEffect(() => {
    if (prevCoverUrl.current !== book.coverUrl) {
      prevCoverUrl.current = book.coverUrl;
      setSrcIdx(0);
      setImgLoaded(false);
    }
  }, [book.coverUrl]);
  const src = srcs[srcIdx] || null;
  const color = GENRE_COLORS[book.genre] || "#94a3b8";
  const initials = book.title.split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();
  const advance = () => { setSrcIdx(i => i + 1); setImgLoaded(false); };
  return (
    <div style={{ width, height, borderRadius:radius, flexShrink:0, position:"relative", background: imgLoaded ? "transparent" : `linear-gradient(160deg,${color}dd,${color}99)`, border:`1px solid ${color}66`, boxShadow:shadow, display:"flex", alignItems:"center", justifyContent:"center" }}>
      {!imgLoaded && <span style={{ color:"rgba(255,255,255,0.85)", fontSize:width*0.3, fontFamily:"'Crimson Pro',serif", fontWeight:600 }}>{initials}</span>}
      {src && <img src={src} alt={book.title} style={{ position:"absolute", inset:0, width, height, objectFit:"cover", borderRadius:radius, display:"block", filter:"brightness(1.08) saturate(1.05)" }}
        onError={advance}
        onLoad={e=>{ if (e.target.naturalWidth <= 1 || e.target.naturalHeight <= 1) advance(); else setImgLoaded(true); }} />}
    </div>
  );
}

// Spine-style book placeholder
function BookSpine({ title, genre, size=48 }) {
  const cover = COVERS[title];
  const color = GENRE_COLORS[genre] || "#94a3b8";
  const initials = title.split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();
  const h = Math.round(size * 1.47);
  if (cover) {
    return (
      <div style={{
        width:size, height:h, borderRadius:3, flexShrink:0, overflow:"hidden",
        boxShadow:`inset 2px 0 4px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)`,
      }}>
        <img src={cover} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
      </div>
    );
  }
  return (
    <div style={{
      width:size, height:h, borderRadius:3, flexShrink:0,
      background:`linear-gradient(135deg, ${color}22, ${color}40)`,
      border:`1px solid ${color}44`,
      display:"flex", alignItems:"center", justifyContent:"center",
      boxShadow:`inset 2px 0 4px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)`,
    }}>
      <span style={{ color, fontSize:size*0.3, fontFamily:"'Crimson Pro',serif", fontWeight:600 }}>{initials}</span>
    </div>
  );
}

const DESCRIPTIONS = {
  "Dune": "Set in a distant future of feudal interstellar society, Dune follows young Paul Atreides as his family assumes control of the desert planet Arrakis — the only source of the universe's most valuable substance. A sweeping epic of politics, religion, ecology, and human potential that defined modern science fiction.",
  "Educated": "A memoir of a woman who grows up in a survivalist family in rural Idaho, never attending school, yet goes on to earn a PhD from Cambridge University. A story about the struggle to find identity when the people who know you best are determined to tell you who you are.",
  "The Name of the Wind": "The first day in the life of Kvothe, a legendary figure rumoured to have killed a king and seduced a goddess, now living in hiding as an innkeeper. Told in his own words, it's a rich and lyrical fantasy about magic, music, loss, and the stories we tell about ourselves.",
  "Sapiens": "A sweeping account of humankind's history, from the emergence of Homo sapiens in Africa to the present day. Yuval Noah Harari examines how biology, culture, and economics have shaped our species — and raises unsettling questions about where we're headed.",
  "Project Hail Mary": "Ryland Grace wakes up alone on a spaceship millions of miles from Earth with no memory of how he got there. As he pieces together his past, he realizes he may be humanity's last hope — and that he's not entirely alone. A wildly inventive and warm-hearted thriller.",
  "The Great Gatsby": "Set in the glittering excess of 1920s New York, Fitzgerald's masterpiece follows the mysterious millionaire Jay Gatsby and his obsessive pursuit of the beautiful Daisy Buchanan. A dazzling and devastating portrait of the American Dream and the hollowness at its heart.",
  "Atomic Habits": "James Clear lays out a practical framework for building good habits and breaking bad ones, arguing that tiny 1% improvements compound into remarkable results over time. Grounded in psychology and neuroscience, it's one of the most actionable self-improvement books written.",
  "The Girl with the Dragon Tattoo": "A disgraced journalist and a brilliant but troubled hacker join forces to investigate a decades-old disappearance within a powerful Swedish family. A dark, intricately plotted thriller that launched one of crime fiction's most compelling characters.",
  "A Brief History of Time": "Stephen Hawking guides readers from the Big Bang to black holes, exploring the nature of space, time, and the universe with remarkable clarity and wit. A landmark popular science book that made the deepest questions of physics accessible to millions.",
  "The Hobbit": "Bilbo Baggins, a comfort-loving hobbit, is swept into an epic quest with a band of dwarves and the wizard Gandalf to reclaim a mountain kingdom from a fearsome dragon. Tolkien's enchanting prelude to The Lord of the Rings brims with warmth, adventure, and wonder.",
};

const ASPECTS = ["Prose", "Plot", "Characters", "Dialogue", "Pacing", "World-building", "Ending"];

function BookCard({ book, index, onRemove, onEdit, onShelfChange, onOpenShelfPicker, onSaveScores, onSaveDescription, onSaveProgress, onSavePages, onSaveAspects, onAdd, forceProse, onAuthor, libraryProfile = [], userId, guestMode = false }) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shelfDropOpen, setShelfDropOpen] = useState(false);
  const [liked, setLiked] = useState(book.likedAspects || []);
  const [disliked, setDisliked] = useState(book.dislikedAspects || []);
  const [prose, setProse] = useState(null);
  const [proseLoading, setProseLoading] = useState(false);
  const [showProse, setShowProse] = useState(false);
  const [scores, setScores] = useState(book.scores || null);
  const [scoresLoading, setScoresLoading] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [fetchedDescription, setFetchedDescription] = useState(book.description || DESCRIPTIONS[book.title] || null);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [pageInput, setPageInput] = useState(book.currentPage || 0);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [obiVerdict, setObiVerdict] = useState(null);
  const [obiLoading, setObiLoading] = useState(false);
  const [showObi, setShowObi] = useState(false);
  useEffect(() => { if (book.description && !fetchedDescription) setFetchedDescription(book.description); }, [book.description]);
  const touchMoved = useRef(false);
  const isRated = book.shelf === "Read" || book.shelf === "DNF";
  const showProseBtn = forceProse || (!isRated && book.shelf !== "Reading");
  useEffect(() => { setPageInput(book.currentPage || 0); }, [book.currentPage]);

  async function fetchPageCount() {
    setPagesLoading(true);
    try {
      const res = await fetch("/api/book-metadata", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author }) });
      const data = await res.json();
      if (data.pages > 0 && onSavePages) onSavePages(book.id, data.pages);
    } catch {}
    setPagesLoading(false);
  }

  function toggleAspect(aspect, list, setList, otherList, setOtherList) {
    const isLikedList = setList === setLiked;
    const nextList = list.includes(aspect) ? list.filter(a => a !== aspect) : [...list, aspect];
    const nextOther = otherList.filter(a => a !== aspect);
    setList(nextList);
    setOtherList(nextOther);
    if (onSaveAspects) onSaveAspects(book.id, isLikedList ? nextList : nextOther, isLikedList ? nextOther : nextList);
  }

  async function fetchProse() {
    if (showProse) { setShowProse(false); return; }
    setShowScores(false); setShowDescription(false); setShowProse(true);
    if (prose) return;
    setProseLoading(true);
    try {
      const res = await fetch("/api/prose-preview", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author }) });
      const data = await res.json();
      setProse(data.prose || "Unable to generate preview.");
    } catch { setProse("Unable to generate preview."); }
    setProseLoading(false);
  }

  async function fetchScores() {
    if (showScores) { setShowScores(false); return; }
    setShowProse(false); setShowDescription(false);
    if (scores) { setShowScores(true); return; }
    setScoresLoading(true); setShowScores(true);
    try {
      const res = await fetch("/api/book-scores", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author, genre:book.genre }) });
      const data = await res.json();
      const fetched = data.error ? null : data;
      setScores(fetched);
      if (fetched && onSaveScores) onSaveScores(book.id, fetched);
    } catch { setScores(null); }
    setScoresLoading(false);
  }

  async function fetchDescription() {
    if (showDescription) { setShowDescription(false); return; }
    setShowProse(false); setShowScores(false); setShowDescription(true);
    if (fetchedDescription) return;
    setDescriptionLoading(true);
    try {
      const res = await fetch("/api/book-description", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author, genre:book.genre }) });
      const data = await res.json();
      const desc = data.description || null;
      setFetchedDescription(desc);
      if (desc && onSaveDescription) onSaveDescription(book.id, desc);
    } catch { setFetchedDescription(null); }
    setDescriptionLoading(false);
  }

  async function fetchObi() {
    if (showObi) { setShowObi(false); return; }
    setShowProse(false); setShowScores(false); setShowDescription(false); setShowObi(true);
    if (obiVerdict) return;
    if (guestMode) {
      const count = parseInt(localStorage.getItem(GUEST_OBI_KEY) || "0");
      if (count >= 3) {
        setObiVerdict("Sign in to unlock unlimited Obi.");
        return;
      }
      localStorage.setItem(GUEST_OBI_KEY, String(count + 1));
    }
    setObiLoading(true);
    try {
      const res = await fetch("/api/ask-obi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: { title: book.title, author: book.author, genre: book.genre, description: fetchedDescription },
          profile: libraryProfile,
          userId,
        }),
      });
      const data = await res.json();
      setObiVerdict(data.verdict || "Unable to get a read on this one.");
    } catch { setObiVerdict("Unable to get a read on this one."); }
    setObiLoading(false);
  }

  return (
    <div style={{
      background:WOOD.card,
      backdropFilter:"blur(6px)",
      borderRadius:12,
      padding:"14px 16px",
      marginBottom:10,
      borderTop:`6px solid #8a5a28`,
      borderLeft:`6px solid #8a5a28`,
      borderBottom:`6px solid #8a5a28`,
      borderRight:"none",
      boxShadow:"0 2px 8px rgba(0,0,0,0.15)",
      animation:`fadeUp 0.28s ease ${index*0.05}s both`,
      cursor:"pointer",
      touchAction:"manipulation",
      position:"relative",
      zIndex: shelfDropOpen ? 10 : 1,
    }}
    onTouchStart={()=>{ touchMoved.current=false; }}
    onTouchMove={()=>{ touchMoved.current=true; }}
    onTouchEnd={e=>{ if(!touchMoved.current){ e.preventDefault(); if(shelfDropOpen) setShelfDropOpen(false); else setExpanded(x=>!x); } }}
    onClick={()=>{ if(shelfDropOpen) setShelfDropOpen(false); else setExpanded(e=>!e); }}>
      <div style={{ display:"flex", gap:14, alignItems:"stretch" }}>
        <div style={{ alignSelf:"stretch", flexShrink:0, display:"flex", position:"relative" }}>
          <BookCover book={book} width={53} height={80} radius={4} shadow="2px 2px 8px rgba(0,0,0,0.35)" />
          {book.shelf === "Reading" && book.pages > 0 && (book.currentPage || 0) > 0 && (() => {
            const prog = Math.min(1, (book.currentPage || 0) / book.pages);
            const bkH = 5; const bkTop = Math.round((1 - prog) * (80 - bkH));
            return <div style={{ position:"absolute", right:"100%", width:16, height:bkH, top:bkTop, background:"rgba(50,140,80,0.88)", borderRadius:"2px 0 0 2px" }} />;
          })()}
        </div>
        <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ minWidth:0, flex:1 }}>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:21, color:WOOD.text, lineHeight:1.2, marginBottom:1, whiteSpace:expanded?"normal":"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{book.title}</p>
                <p style={{ fontSize:12, color:WOOD.textDim, fontStyle:"italic", marginBottom:2 }}>{book.author}</p>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                <button {...tc(()=>{ onEdit ? onEdit(book) : onAdd && onAdd("Read"); }, true)} style={{ background:"transparent", border:"none", cursor:"pointer", padding:"2px 4px 0", color:"rgba(120,70,20,0.6)", fontSize:16, lineHeight:1 }}>↗</button>
              </div>
            </div>
            {!onAdd && (book.shelf || "Read") !== "The List" && (book.shelf || "Read") !== "Curious" && (book.shelf || "Read") !== "Reading" && <StarRating value={book.rating} readonly size={18} />}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            <span style={{ background:GENRE_COLORS[book.genre], color:"#fff", borderRadius:"20px", padding:"3px 10px", fontSize:9, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", flexShrink:0, lineHeight:1 }}>{book.genre}</span>

            {/* dynamic shelf bubble + dropdown */}
            {(() => {
              const shelf = book.shelf || "Read";
              const SHELF_META = {
                "Read":     { label: "Read",     bg:"rgba(60,120,80,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(60,120,80,0.4)"  },
                "Reading":  { label: "Reading",  bg:"rgba(210,100,30,0.55)", color:"rgba(255,255,255,0.9)", border:"rgba(210,100,30,0.4)" },
                "The List": { label: "The List", bg:"rgba(80,120,180,0.7)",  color:"rgba(255,255,255,0.9)", border:"rgba(80,120,180,0.5)" },
                "Curious":  { label: "Curious",  bg:"rgba(180,155,80,0.7)",  color:"rgba(255,255,255,0.9)", border:"rgba(180,155,80,0.5)" },
                "DNF":      { label: "DNF",      bg:"rgba(160,50,50,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(160,50,50,0.4)" },
              };
              const meta = SHELF_META[shelf];
              return (
                <div style={{ position:"relative", marginLeft:"auto", flexShrink:0 }}>
                  <span {...tc(()=>{ setShelfDropOpen(o=>!o); setMenuOpen(false); }, true)} style={{
                    background: onAdd ? "rgba(138,90,40,0.18)" : meta.bg,
                    color: onAdd ? WOOD.textDim : meta.color,
                    border: onAdd ? "1px solid rgba(138,90,40,0.3)" : `1px solid ${meta.border}`,
                    borderRadius:"20px", padding:"3px 10px",
                    fontSize: 9,
                    fontFamily:"'DM Sans',sans-serif", fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"0.08em",
                    lineHeight:1, cursor:"pointer", display:"block",
                    maxWidth:110, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                  }}>{onAdd ? "+ Add" : meta.label}</span>
                  {shelfDropOpen && (
                    <div onClick={e=>e.stopPropagation()} style={{
                      position:"absolute", top:"calc(100% + 4px)", right:0, zIndex:40, minWidth:120,
                      background:"#f5e8d0", borderRadius:10, overflow:"hidden",
                      boxShadow:"0 4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)",
                      animation:"fadeIn 0.12s ease",
                    }}>
                      {SHELVES.map((s, i) => (
                        <button key={s} {...tc(()=>{ setShelfDropOpen(false); onAdd ? onAdd(s) : onShelfChange(book.id, s); }, true)} style={{
                          display:"block", width:"100%", padding:"9px 14px", textAlign:"left",
                          background: !onAdd && s===shelf ? "rgba(138,90,40,0.1)" : "transparent",
                          border:"none", borderBottom: i<SHELVES.length-1 ? "1px solid rgba(138,90,40,0.1)" : "none",
                          cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13,
                          color: !onAdd && s===shelf ? WOOD.amber : WOOD.text, fontWeight: !onAdd && s===shelf ? 600 : 400,
                        }}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          </div>
        </div>
      </div>



      {expanded && (
        <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid rgba(138,90,40,0.25)" }} onClick={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            {(book.publishYear || book.pages>0) && (
            <p style={{ color:WOOD.textFaint, fontSize:10, marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>
              {book.publishYear ? `Published ${book.publishYear}` : ""}
              {book.publishYear && book.pages>0 ? " · " : ""}
              {book.pages>0 ? `${book.pages.toLocaleString()} pages` : ""}
            </p>
          )}
            {book.date && (book.shelf||"Read")==="Read" && (
              <p style={{ color:WOOD.textFaint, fontSize:10, fontFamily:"'DM Sans',sans-serif", textAlign:"right", flexShrink:0, marginLeft:8 }}>
                {new Date(book.date + "T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
              </p>
            )}
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom: (showDescription||showProse||showScores||showObi) ? 10 : 4 }}>
            <button {...tc(fetchDescription, true)} style={{ display:"flex", alignItems:"center", gap:6, background:showDescription?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"6px 14px", border:`1px solid ${showDescription?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, color:showDescription?"#1a0900":WOOD.textDim, transition:"all 0.15s" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h12"/></svg>
              About
            </button>
            {showProseBtn && <button {...tc(fetchProse, true)} style={{ display:"flex", alignItems:"center", gap:6, background:showProse?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"6px 14px", border:`1px solid ${showProse?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, color:showProse?"#1a0900":WOOD.textDim, transition:"all 0.15s" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Prose
            </button>}
            <button {...tc(fetchScores, true)} style={{ display:"flex", alignItems:"center", gap:6, background:showScores?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"6px 14px", border:`1px solid ${showScores?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, color:showScores?"#1a0900":WOOD.textDim, transition:"all 0.15s" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              Scores
            </button>
            {!isRated && <button {...tc(fetchObi, true)} style={{ display:"flex", alignItems:"center", gap:6, background:showObi?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"6px 14px", border:`1px solid ${showObi?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, color:showObi?"#1a0900":WOOD.textDim, transition:"all 0.15s" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/></svg>
              Ask Obi
            </button>}
          </div>
          {showDescription && (
            <div style={{ marginBottom: 4, animation:"fadeIn 0.18s ease" }}>
              {descriptionLoading
                ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.textFaint, fontStyle:"italic" }}>Loading…</p>
                : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.72 }}>{fetchedDescription}</p>
              }
            </div>
          )}
          {showProse && (
            <div style={{ marginBottom: 4, animation:"fadeIn 0.18s ease" }}>
              {proseLoading
                ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, color:WOOD.textFaint, fontStyle:"italic" }}>Generating…</p>
                : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, color:WOOD.text, lineHeight:1.8 }}>{prose}</p>
              }
            </div>
          )}
          {showScores && (
            <div style={{ marginBottom: 4, animation:"fadeIn 0.18s ease" }}>
              {scoresLoading
                ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.textFaint, fontStyle:"italic" }}>Scoring…</p>
                : scores ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {[["Prose", scores.prose],["Plot", scores.plot],["Characters", scores.characters],["Pacing", scores.pacing],["World-building", scores.worldBuilding],["Dialogue", scores.dialogue],["Ending", scores.ending]].map(([label, val]) => val != null && (
                      <div key={label} style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:WOOD.textDim, width:96, flexShrink:0 }}>{label}</span>
                        <div style={{ flex:1, height:6, borderRadius:3, background:"rgba(138,90,40,0.15)", overflow:"hidden" }}>
                          <div style={{ height:"100%", borderRadius:3, background:WOOD.amber, width:`${val*10}%`, transition:"width 0.4s ease" }} />
                        </div>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:WOOD.amber, width:20, textAlign:"right", flexShrink:0 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                ) : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.textFaint, fontStyle:"italic" }}>Unable to score.</p>
              }
            </div>
          )}
          {showObi && (
            <div style={{ marginBottom: 4, animation:"fadeIn 0.18s ease" }}>
              {obiLoading
                ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.textFaint, fontStyle:"italic" }}>Obi is thinking…</p>
                : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.72 }}>{obiVerdict}</p>
              }
            </div>
          )}
          {book.shelf === "Reading" && (
            <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid rgba(138,90,40,0.2)" }} onClick={e=>e.stopPropagation()}>
              {book.pages > 0 && pageInput > 0 && (
                <div style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:10, color:"#3a7a50", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{Math.round(Math.min(100,(pageInput/book.pages)*100))}%</span>
                    <span style={{ fontSize:10, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif" }}>{pageInput.toLocaleString()} / {book.pages.toLocaleString()} pages</span>
                  </div>
                  <div style={{ height:5, background:"rgba(138,90,40,0.15)", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:"#3a7a50", borderRadius:3, width:`${Math.min(100,(pageInput/book.pages)*100)}%`, transition:"width 0.4s" }} />
                  </div>
                </div>
              )}
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <input type="number" value={pageInput || ""} placeholder="Current page"
                  onChange={e=>setPageInput(parseInt(e.target.value)||0)}
                  onBlur={()=>{ if (onSaveProgress) onSaveProgress(book.id, pageInput); }}
                  onClick={e=>e.stopPropagation()}
                  style={{ flex:1, padding:"5px 10px", borderRadius:8, border:"1px solid rgba(138,90,40,0.3)", background:"rgba(138,90,40,0.08)", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:WOOD.text, outline:"none" }} />
                {book.pages > 0 && <span style={{ fontSize:11, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>/ {book.pages.toLocaleString()}</span>}
                <button {...tc(fetchPageCount, true)} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:28, height:28, borderRadius:8, border:"1px solid rgba(138,90,40,0.25)", background:"rgba(138,90,40,0.08)", cursor:"pointer", color:WOOD.textDim, fontSize:15, flexShrink:0 }}>
                  {pagesLoading ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="4" strokeDasharray="16" strokeDashoffset="8"><animateTransform attributeName="transform" type="rotate" from="0 6 6" to="360 6 6" dur="0.7s" repeatCount="indefinite"/></circle></svg> : "↻"}
                </button>
              </div>
            </div>
          )}
          {isRated && (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div>
                <p style={{ fontSize:10, fontWeight:700, color:"#4a7a5a", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>👍 Liked</p>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  {ASPECTS.map(a => { const active=liked.includes(a); return (
                    <button key={a} {...tc(()=>toggleAspect(a,liked,setLiked,disliked,setDisliked), true)} style={{ padding:"4px 10px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:"pointer", transition:"all 0.15s", background:active?"#4a7a5a":"rgba(74,122,90,0.1)", color:active?"#fff":"#4a7a5a", border:`1px solid ${active?"#4a7a5a":"rgba(74,122,90,0.35)"}` }}>{a}</button>
                  ); })}
                </div>
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:700, color:"#8a4a4a", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>👎 Disliked</p>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  {ASPECTS.map(a => { const active=disliked.includes(a); return (
                    <button key={a} {...tc(()=>toggleAspect(a,disliked,setDisliked,liked,setLiked), true)} style={{ padding:"4px 10px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:"pointer", transition:"all 0.15s", background:active?"#8a4a4a":"rgba(138,74,74,0.1)", color:active?"#fff":"#8a4a4a", border:`1px solid ${active?"#8a4a4a":"rgba(138,74,74,0.35)"}` }}>{a}</button>
                  ); })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BookRowExpanded({ book, onEdit, onRemove, onAdd, onSaveProgress, onSavePages, onSaveAspects }) {
  const isRated = book.shelf === "Read" || book.shelf === "DNF";
  const showProseBtn = book.shelf !== "Read" && book.shelf !== "Reading";
  const [liked, setLiked] = useState(book.likedAspects || []);
  const [disliked, setDisliked] = useState(book.dislikedAspects || []);
  const [prose, setProse] = useState(null);
  const [proseLoading, setProseLoading] = useState(false);
  const [showProse, setShowProse] = useState(false);
  const [scores, setScores] = useState(book.scores || null);
  const [scoresLoading, setScoresLoading] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [fetchedDescription, setFetchedDescription] = useState(book.description || DESCRIPTIONS[book.title] || null);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [pageInput, setPageInput] = useState(book.currentPage || 0);
  const [pagesLoading, setPagesLoading] = useState(false);
  useEffect(() => { if (book.description && !fetchedDescription) setFetchedDescription(book.description); }, [book.description]);
  useEffect(() => { setPageInput(book.currentPage || 0); }, [book.currentPage]);

  async function fetchPageCount() {
    setPagesLoading(true);
    try {
      const res = await fetch("/api/book-metadata", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author }) });
      const data = await res.json();
      if (data.pages > 0 && onSavePages) onSavePages(book.id, data.pages);
    } catch {}
    setPagesLoading(false);
  }

  function toggleAspect(a, list, setList, other, setOther) {
    const isLikedList = setList === setLiked;
    const nextList = list.includes(a) ? list.filter(x=>x!==a) : [...list,a];
    const nextOther = other.filter(x=>x!==a);
    setList(nextList);
    setOther(nextOther);
    if (onSaveAspects) onSaveAspects(book.id, isLikedList ? nextList : nextOther, isLikedList ? nextOther : nextList);
  }
  async function fetchProse() {
    if (showProse) { setShowProse(false); return; }
    setShowScores(false); setShowDescription(false); setShowProse(true);
    if (prose) return;
    setProseLoading(true);
    try {
      const res = await fetch("/api/prose-preview", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author }) });
      const data = await res.json();
      setProse(data.prose || "Unable to generate preview.");
    } catch { setProse("Unable to generate preview."); }
    setProseLoading(false);
  }

  async function fetchScores() {
    if (showScores) { setShowScores(false); return; }
    setShowProse(false); setShowDescription(false);
    if (scores) { setShowScores(true); return; }
    setScoresLoading(true); setShowScores(true);
    try {
      const res = await fetch("/api/book-scores", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author, genre:book.genre }) });
      const data = await res.json();
      setScores(data.error ? null : data);
    } catch { setScores(null); }
    setScoresLoading(false);
  }

  async function fetchDescription() {
    if (showDescription) { setShowDescription(false); return; }
    setShowProse(false); setShowScores(false); setShowDescription(true);
    if (fetchedDescription) return;
    setDescriptionLoading(true);
    try {
      const res = await fetch("/api/book-description", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author, genre:book.genre }) });
      const data = await res.json();
      setFetchedDescription(data.description || null);
    } catch { setFetchedDescription(null); }
    setDescriptionLoading(false);
  }

  return (
    <div style={{ marginTop:8, paddingTop:8, borderTop:"1px solid rgba(138,90,40,0.25)" }} onTouchEnd={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
        {(book.publishYear || book.pages>0) && (
          <p style={{ color:WOOD.textFaint, fontSize:10, fontFamily:"'DM Sans',sans-serif" }}>
            {book.publishYear ? `Published ${book.publishYear}` : ""}
            {book.publishYear && book.pages>0 ? " · " : ""}
            {book.pages>0 ? `${book.pages.toLocaleString()} pages` : ""}
          </p>
        )}
        {book.date && (book.shelf||"Read")==="Read" && (
          <p style={{ color:WOOD.textFaint, fontSize:10, fontFamily:"'DM Sans',sans-serif", textAlign:"right", flexShrink:0, marginLeft:8 }}>
            {new Date(book.date + "T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
          </p>
        )}
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:(showDescription||showProse||showScores)?10:4 }}>
        <button {...tc(fetchDescription, true)} style={{ display:"flex", alignItems:"center", gap:5, background:showDescription?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"5px 12px", border:`1px solid ${showDescription?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, color:showDescription?"#1a0900":WOOD.textDim, transition:"all 0.15s" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h12"/></svg>
          About
        </button>
        {showProseBtn && <button {...tc(fetchProse, true)} style={{ display:"flex", alignItems:"center", gap:5, background:showProse?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"5px 12px", border:`1px solid ${showProse?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, color:showProse?"#1a0900":WOOD.textDim, transition:"all 0.15s" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Prose
        </button>}
        <button {...tc(fetchScores, true)} style={{ display:"flex", alignItems:"center", gap:5, background:showScores?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"5px 12px", border:`1px solid ${showScores?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, color:showScores?"#1a0900":WOOD.textDim, transition:"all 0.15s" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          Scores
        </button>
      </div>
      {showDescription && (
        <div style={{ marginBottom:4, animation:"fadeIn 0.18s ease" }}>
          {descriptionLoading
            ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.textFaint, fontStyle:"italic" }}>Loading…</p>
            : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.text, lineHeight:1.72 }}>{fetchedDescription}</p>
          }
        </div>
      )}
      {showProse && (
        <div style={{ marginBottom:4, animation:"fadeIn 0.18s ease" }}>
          {proseLoading
            ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.textFaint, fontStyle:"italic" }}>Generating…</p>
            : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.8 }}>{prose}</p>
          }
        </div>
      )}
      {showScores && (
        <div style={{ marginBottom:4, animation:"fadeIn 0.18s ease" }}>
          {scoresLoading
            ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:WOOD.textFaint, fontStyle:"italic" }}>Scoring…</p>
            : scores ? (
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {[["Prose", scores.prose],["Plot", scores.plot],["Characters", scores.characters],["Pacing", scores.pacing],["World-building", scores.worldBuilding],["Dialogue", scores.dialogue],["Ending", scores.ending]].map(([label, val]) => val != null && (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:WOOD.textDim, width:88, flexShrink:0 }}>{label}</span>
                    <div style={{ flex:1, height:5, borderRadius:3, background:"rgba(138,90,40,0.15)", overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:3, background:WOOD.amber, width:`${val*10}%`, transition:"width 0.4s ease" }} />
                    </div>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, color:WOOD.amber, width:18, textAlign:"right", flexShrink:0 }}>{val}</span>
                  </div>
                ))}
              </div>
            ) : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:WOOD.textFaint, fontStyle:"italic" }}>Unable to score.</p>
          }
        </div>
      )}
      {book.shelf === "Reading" && (
        <div style={{ marginTop:8, paddingTop:8, borderTop:"1px solid rgba(138,90,40,0.18)" }}>
          {book.pages > 0 && pageInput > 0 && (
            <div style={{ marginBottom:7 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                <span style={{ fontSize:10, color:"#3a7a50", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{Math.round(Math.min(100,(pageInput/book.pages)*100))}%</span>
                <span style={{ fontSize:10, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif" }}>{pageInput.toLocaleString()} / {book.pages.toLocaleString()} pages</span>
              </div>
              <div style={{ height:4, background:"rgba(138,90,40,0.15)", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", background:"#3a7a50", borderRadius:2, width:`${Math.min(100,(pageInput/book.pages)*100)}%`, transition:"width 0.4s" }} />
              </div>
            </div>
          )}
          <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            <input type="number" value={pageInput || ""} placeholder="Current page"
              onChange={e=>setPageInput(parseInt(e.target.value)||0)}
              onBlur={()=>{ if (onSaveProgress) onSaveProgress(book.id, pageInput); }}
              onClick={e=>e.stopPropagation()}
              style={{ flex:1, padding:"4px 9px", borderRadius:7, border:"1px solid rgba(138,90,40,0.3)", background:"rgba(138,90,40,0.08)", fontFamily:"'DM Sans',sans-serif", fontSize:11, color:WOOD.text, outline:"none" }} />
            {book.pages > 0 && <span style={{ fontSize:10, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>/ {book.pages.toLocaleString()}</span>}
            <button {...tc(fetchPageCount, true)} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:26, height:26, borderRadius:7, border:"1px solid rgba(138,90,40,0.25)", background:"rgba(138,90,40,0.08)", cursor:"pointer", color:WOOD.textDim, fontSize:14, flexShrink:0 }}>
              {pagesLoading ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5.5" cy="5.5" r="3.5" strokeDasharray="14" strokeDashoffset="7"><animateTransform attributeName="transform" type="rotate" from="0 5.5 5.5" to="360 5.5 5.5" dur="0.7s" repeatCount="indefinite"/></circle></svg> : "↻"}
            </button>
          </div>
        </div>
      )}
      {isRated && (
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:4 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:700, color:"#4a7a5a", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:5, fontFamily:"'DM Sans',sans-serif" }}>👍 Liked</p>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {ASPECTS.map(a => { const active=liked.includes(a); return (
                <button key={a} {...tc(()=>toggleAspect(a,liked,setLiked,disliked,setDisliked), true)} style={{ padding:"3px 9px", borderRadius:20, fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:"pointer", background:active?"#4a7a5a":"rgba(74,122,90,0.1)", color:active?"#fff":"#4a7a5a", border:`1px solid ${active?"#4a7a5a":"rgba(74,122,90,0.35)"}` }}>{a}</button>
              ); })}
            </div>
          </div>
          <div>
            <p style={{ fontSize:10, fontWeight:700, color:"#8a4a4a", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:5, fontFamily:"'DM Sans',sans-serif" }}>👎 Disliked</p>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {ASPECTS.map(a => { const active=disliked.includes(a); return (
                <button key={a} {...tc(()=>toggleAspect(a,disliked,setDisliked,liked,setLiked), true)} style={{ padding:"3px 9px", borderRadius:20, fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:"pointer", background:active?"#8a4a4a":"rgba(138,74,74,0.1)", color:active?"#fff":"#8a4a4a", border:`1px solid ${active?"#8a4a4a":"rgba(138,74,74,0.35)"}` }}>{a}</button>
              ); })}
            </div>
          </div>
        </div>
      )}
      {onAdd
        ? <div style={{ marginTop:10 }}>
            <button {...tc(()=>onAdd("Read"), true)} style={{ width:"100%", padding:"7px 0", background:"rgba(138,90,40,0.1)", border:"1px solid rgba(138,90,40,0.2)", borderRadius:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:WOOD.text }}>Details</button>
          </div>
        : onEdit && onRemove && (
            <div style={{ display:"flex", gap:8, marginTop:10 }}>
              <button {...tc(()=>onEdit(book), true)} style={{ flex:1, padding:"7px 0", background:"rgba(138,90,40,0.1)", border:"1px solid rgba(138,90,40,0.2)", borderRadius:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:WOOD.text }}>Edit</button>
              <button {...tc(()=>onRemove(book.id), true)} style={{ flex:1, padding:"7px 0", background:"rgba(192,57,43,0.08)", border:"1px solid rgba(192,57,43,0.2)", borderRadius:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#c0392b" }}>Remove</button>
            </div>
          )
      }
    </div>
  );
}

function BookRow({ book, index, onEdit, onRemove, onShelfChange, onAdd, onSaveProgress, onSavePages, onSaveAspects, onAuthor }) {
  const [expanded, setExpanded] = useState(false);
  const [shelfDropOpen, setShelfDropOpen] = useState(false);
  const touchMoved = useRef(false);
  const isRated = book.shelf === "Read" || book.shelf === "DNF";
  const showShelfLabel = book.shelf && !isRated;
  const showAddLabel = !book.shelf;
  return (
    <div style={{
      background:WOOD.card, borderRadius:8, padding:"7px 10px", marginBottom:6,
      borderLeft:`4px solid #8a5a28`,
      boxShadow:"0 1px 4px rgba(0,0,0,0.12)",
      cursor:"pointer",
      touchAction:"manipulation",
      animation:`fadeUp 0.2s ease ${index*0.03}s both`,
      position:"relative", zIndex: shelfDropOpen ? 20 : expanded ? 10 : 1,
    }}
    onTouchStart={()=>{ touchMoved.current=false; }}
    onTouchMove={()=>{ touchMoved.current=true; }}
    onTouchEnd={e=>{ if(!touchMoved.current){ e.preventDefault(); setExpanded(x=>!x); } }}
    onClick={()=>{ setShelfDropOpen(false); setExpanded(e=>!e); }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ position:"relative", flexShrink:0 }}>
          <BookCover book={book} width={29} height={44} radius={3} shadow="1px 1px 5px rgba(0,0,0,0.3)" />
          {book.shelf === "Reading" && book.pages > 0 && (book.currentPage || 0) > 0 && (() => {
            const prog = Math.min(1, (book.currentPage || 0) / book.pages);
            const bkH = 4; const bkTop = Math.round((1 - prog) * (44 - bkH));
            return <div style={{ position:"absolute", right:"100%", width:10, height:bkH, top:bkTop, background:"rgba(50,140,80,0.88)", borderRadius:"2px 0 0 2px" }} />;
          })()}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.2, whiteSpace:expanded?"normal":"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginBottom:1 }}>{book.title}</p>
          <p style={{ fontSize:11, color:WOOD.textDim, fontStyle:"italic", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{book.author}</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ background:GENRE_COLORS[book.genre]||GENRE_COLORS["Other"], color:"#fff", borderRadius:"20px", padding:"2px 7px", fontSize:8, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em" }}>{book.genre}</span>
          </div>
          {isRated
            ? <StarRating value={book.rating} readonly size={12} />
            : (showShelfLabel || showAddLabel)
              ? <div style={{ position:"relative" }} onClick={e=>e.stopPropagation()}>
                  <span {...tc(()=>setShelfDropOpen(o=>!o), true)} style={{ fontSize:8, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", padding:"2px 7px", borderRadius:20, cursor:"pointer",
                    background: showAddLabel ? "rgba(138,90,40,0.18)" : { "Read":"rgba(60,120,80,0.15)", "Reading":"rgba(210,100,30,0.15)", "The List":"rgba(138,90,40,0.18)", "Curious":"rgba(200,144,90,0.15)" }[book.shelf] || "rgba(138,90,40,0.18)",
                    color: showAddLabel ? WOOD.textDim : { "Read":"#3a7a50", "Reading":"#d06420", "The List":WOOD.textDim, "Curious":WOOD.amber }[book.shelf] || WOOD.textDim,
                  }}>{showAddLabel ? "+ Add" : book.shelf}</span>
                  {shelfDropOpen && (
                    <div onClick={e=>e.stopPropagation()} style={{
                      position:"absolute", top:"calc(100% + 4px)", right:0, zIndex:40, minWidth:110,
                      background:"#f5e8d0", borderRadius:10, overflow:"hidden",
                      boxShadow:"0 4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)",
                      animation:"fadeIn 0.12s ease",
                    }}>
                      {SHELVES.map((s, i) => (
                        <button key={s} {...tc(()=>{ setShelfDropOpen(false); onAdd ? onAdd(s) : onShelfChange(book.id, s); }, true)} style={{
                          display:"block", width:"100%", padding:"9px 14px", textAlign:"left",
                          background: !onAdd && s===book.shelf ? "rgba(138,90,40,0.1)" : "transparent",
                          border:"none", borderBottom: i<SHELVES.length-1 ? "1px solid rgba(138,90,40,0.1)" : "none",
                          cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13,
                          color: !onAdd && s===book.shelf ? WOOD.amber : WOOD.text,
                          fontWeight: !onAdd && s===book.shelf ? 600 : 400,
                        }}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              : <div style={{ height:14 }} />
          }
        </div>
      </div>
      {expanded && <BookRowExpanded book={book} onEdit={onEdit} onRemove={onRemove} onAdd={onAdd} onSaveProgress={onSaveProgress} onSavePages={onSavePages} onSaveAspects={onSaveAspects} />}
    </div>
  );
}

function BookRowPages({ book, index, onEdit, onRemove, onShelfChange, maxPages, onSaveProgress, onSavePages }) {
  const [expanded, setExpanded] = useState(false);
  const touchMoved = useRef(false);
  const isRated = (book.shelf || "Read") !== "The List" && (book.shelf || "Read") !== "Curious" && (book.shelf || "Read") !== "Reading";
  const pages = book.pages || 0;
  const minH = 52, maxH = 190;
  const rowHeight = pages > 0 ? Math.max(minH, Math.min(maxH, minH + (pages / Math.max(maxPages, 1)) * (maxH - minH))) : minH;
  return (
    <div style={{
      background:WOOD.card, borderRadius:8, padding:"7px 10px", marginBottom:6,
      boxShadow:"0 1px 4px rgba(0,0,0,0.12)",
      cursor:"pointer", touchAction:"manipulation", minHeight: expanded ? "auto" : rowHeight,
      borderTop:`6px solid #8a5a28`, borderLeft:`6px solid #8a5a28`, borderBottom:`6px solid #8a5a28`, borderRight:"none",
      animation:`fadeUp 0.2s ease ${index*0.03}s both`,
      position:"relative", zIndex: expanded ? 10 : 1,
    }}
    onTouchStart={()=>{ touchMoved.current=false; }}
    onTouchMove={()=>{ touchMoved.current=true; }}
    onTouchEnd={e=>{ if(!touchMoved.current){ e.preventDefault(); setExpanded(x=>!x); } }}
    onClick={()=>setExpanded(e=>!e)}>
      <div style={{ display:"flex", alignItems:"center", gap:10, minHeight: expanded ? 0 : rowHeight - 14 }}>
        <BookCover book={book} width={Math.round(Math.min(rowHeight-14,80)*2/3)} height={Math.min(rowHeight-14,80)} radius={3} shadow="1px 1px 5px rgba(0,0,0,0.3)" />
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.2, whiteSpace:expanded?"normal":"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginBottom:1 }}>{book.title}</p>
          <p style={{ fontSize:11, color:WOOD.textDim, fontStyle:"italic", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginBottom:4 }}>{book.author}</p>
          {pages > 0 && <p style={{ fontSize:10, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif" }}>{pages.toLocaleString()} pages</p>}
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ background:GENRE_COLORS[book.genre]||GENRE_COLORS["Other"], color:"#fff", borderRadius:"20px", padding:"2px 7px", fontSize:8, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em" }}>{book.genre}</span>
          </div>
          {isRated ? <StarRating value={book.rating} readonly size={12} /> : <div style={{ height:14 }} />}
        </div>
      </div>
      {expanded && <BookRowExpanded book={book} onEdit={onEdit} onRemove={onRemove} onSaveProgress={onSaveProgress} onSavePages={onSavePages} />}
    </div>
  );
}

function ShelfTab({ books, onAdd, onAddBook, onRemove, onEdit, onScroll, onShelfChange, onImport, onSaveScores, onSaveDescription, onSaveProgress, onSavePages, onSaveAspects, hideControls=false, onAuthor, userId, guestMode = false }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [activeShelf, setActiveShelf] = useState("Read");
  const [shelfDropOpen, setShelfDropOpen] = useState(false);
  const [sortDropOpen, setSortDropOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterYear, setFilterYear] = useState(null);
  const [filterGenre, setFilterGenre] = useState(null);
  const [filterAuthor, setFilterAuthor] = useState(null);
  const [shelfPickerBook, setShelfPickerBook] = useState(null);
  const [ratingPromptBook, setRatingPromptBook] = useState(null);
  const [promptRating, setPromptRating] = useState(0);
  const [customList, setCustomList] = useState([]);
  const [apiResults, setApiResults] = useState([]);
  const [apiSearching, setApiSearching] = useState(false);
  const [showApiResults, setShowApiResults] = useState(true);
  const [viewMode, setViewMode] = useState("card");
  const [searchMode, setSearchMode] = useState("All");
  const searchTimer = useRef(null);
  const searchAbort = useRef(null);

  const SEARCH_MODES = ["All", "Books", "Authors", "Series"];
  function cycleSearchMode() {
    setSearchMode(m => {
      const next = SEARCH_MODES[(SEARCH_MODES.indexOf(m) + 1) % SEARCH_MODES.length];
      return next;
    });
  }

  const shelfBooks = useMemo(() => books.filter(b => (b.shelf || "Read") === activeShelf), [books, activeShelf]);
  const years   = useMemo(() => [...new Set(shelfBooks.map(b => b.date?.slice(0,4)).filter(Boolean))].sort((a,b)=>b-a), [shelfBooks]);
  const genres  = useMemo(() => [...new Set(shelfBooks.map(b => b.genre).filter(Boolean))].sort(), [shelfBooks]);
  const authors = useMemo(() => [...new Set(shelfBooks.map(b => b.author).filter(Boolean))].sort(), [shelfBooks]);
  const hasFilters = filterYear || filterGenre || filterAuthor;

  const sortedBooks = useMemo(() => {
    let l = shelfBooks.slice();
    if (search) { const q = search.toLowerCase(); l = l.filter(b => searchMode === "Authors" ? b.author.toLowerCase().includes(q) : searchMode === "Books" || searchMode === "Series" ? b.title.toLowerCase().includes(q) : b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)); }
    if (filterYear)  l = l.filter(b=>b.date?.startsWith(filterYear));
    if (filterGenre) l = l.filter(b=>b.genre===filterGenre);
    if (filterAuthor)l = l.filter(b=>b.author===filterAuthor);
    if (sort==="date")   l.sort((a,b)=> sortAsc ? a.date.localeCompare(b.date)   : b.date.localeCompare(a.date));
    if (sort==="rating") l.sort((a,b)=> sortAsc ? a.rating-b.rating              : b.rating-a.rating);
    if (sort==="title")  l.sort((a,b)=> sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
    return l;
  }, [shelfBooks, search, searchMode, sort, sortAsc, filterYear, filterGenre, filterAuthor]);

  const filtered = sort === "custom" ? customList : sortedBooks;

  function handleSearchChange(e) {
    const q = e.target.value;
    setSearch(q);
    setShowApiResults(true);
    clearTimeout(searchTimer.current);
    if (searchAbort.current) { searchAbort.current.abort(); searchAbort.current = null; }
    setApiResults([]);
    if (q.trim().length >= 3) {
      setApiSearching(true);
      searchTimer.current = setTimeout(async () => {
        const controller = new AbortController();
        searchAbort.current = controller;
        try {
          const res = await fetch("/api/search-books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: q, mode: searchMode }),
            signal: controller.signal,
          });
          const data = await res.json();
          setApiResults(Array.isArray(data) ? data : []);
        } catch (err) {
          if (err.name !== "AbortError") setApiResults([]);
        }
        setApiSearching(false);
      }, 600);
    } else {
      setApiSearching(false);
    }
  }

  function handleSortClick(s) {
    if (s === "custom") {
      if (sort !== "custom") {
        setCustomList(sortedBooks.slice());
        setSort("custom");
      }
    } else {
      if (sort === s) setSortAsc(a => !a);
      else { setSort(s); setSortAsc(false); }
    }
  }

  function moveBook(i, dir) {
    const j = i + dir;
    setCustomList(prev => {
      if (j < 0 || j >= prev.length) return prev;
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  const lastScrollY = useRef(0);

  function handleScroll(e) {
    const y = e.target.scrollTop;
    lastScrollY.current = y;
    onScroll(y);
  }

  const pillStyle = (active) => ({
    padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500,
    cursor:"pointer", transition:"all 0.15s", border:"1px solid",
    background: active ? WOOD.amber : "rgba(255,235,195,0.12)",
    color: active ? "#1a0900" : WOOD.textDim,
    borderColor: active ? WOOD.amber : "rgba(138,90,40,0.3)",
    whiteSpace:"nowrap",
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", position:"relative" }} onClick={()=>{ setShelfDropOpen(false); setFilterOpen(false); setSortDropOpen(false); }}>
      {/* shelf selector + search */}
      <div style={{ flexShrink:0, position:"relative", zIndex:100, overflow:"visible" }}>
      <div style={{ padding:"6px 16px 10px" }}>

        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", gap:6 }}>
          <div style={{ position:"relative", flex:1 }}>
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search for a book to add…"
              onTouchEnd={e=>{ e.stopPropagation(); e.currentTarget.focus(); }}
              style={{ width:"100%", boxSizing:"border-box", padding:"10px 36px 10px 12px", border:"1px solid #d1d5db", borderRadius:8, fontSize:15, fontFamily:"'DM Sans',sans-serif", outline:"none", background:"#fff", color:"#111" }}/>
            {apiSearching && <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:12, color:"#999", fontFamily:"'DM Sans',sans-serif" }}>Searching…</span>}
            {search && !apiSearching && <button onClick={()=>{ setSearch(""); setApiResults([]); }} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"transparent", color:"#999", fontSize:13, border:"none", cursor:"pointer" }}>✕</button>}
          </div>
          <button {...tc(cycleSearchMode, true)} style={{ flexShrink:0, height:42, padding:"0 12px", background: searchMode === "All" ? "rgba(15,8,2,0.55)" : WOOD.amber, border: searchMode === "All" ? "1px solid rgba(120,70,20,0.3)" : `1px solid ${WOOD.amber}`, borderRadius:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:600, color: searchMode === "All" ? "rgba(255,255,255,0.8)" : "#1a0900", backdropFilter:"blur(4px)", transition:"all 0.15s", whiteSpace:"nowrap" }}>{searchMode}</button>
          </div>

          {/* dropdown results */}
          {apiResults.length > 0 && showApiResults && (
            <div style={{
              position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:200,
              background:"#fff",
              borderRadius:12, overflow:"hidden",
              boxShadow:"0 8px 32px rgba(0,0,0,0.15)",
              border:"1px solid #e5e7eb",
              maxHeight:320, overflowY:"auto",
            }}>
              {searchMode !== "Authors" && apiResults.map((book, i) => (
                <button key={i} onClick={() => { setSearch(""); setApiResults([]); setShowApiResults(true); onAddBook(book); }} style={{
                  background:"transparent",
                  border:"none", borderBottom: i < apiResults.length-1 ? "1px solid #f3f4f6" : "none",
                  padding:"10px 14px", textAlign:"left", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:10, width:"100%",
                }}>
                  {book.coverUrl
                    ? <img src={book.coverUrl} alt={book.title}
                        style={{ width:28, height:42, objectFit:"cover", borderRadius:3, boxShadow:"1px 1px 4px rgba(0,0,0,0.25)", flexShrink:0 }} />
                    : <BookSpine title={book.title} genre={book.genre} size={28} />
                  }
                  <div style={{ minWidth:0, flex:1 }}>
                    <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{book.title}</p>
                    <p style={{ fontSize:11, color:WOOD.textDim, fontStyle:"italic" }}>{book.author}</p>
                  </div>
                  <span style={{ background:GENRE_COLORS[book.genre]||GENRE_COLORS["Other"], color:"#fff", borderRadius:"20px", padding:"2px 8px", fontSize:9, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", flexShrink:0 }}>{book.genre}</span>
                </button>
              ))}
              {(() => {
                const authors = [...new Set(apiResults.map(b => b.author))];
                return (
                  <div style={{ borderTop:"1px solid #e5e7eb", background:"#fafaf9" }}>
                    {authors.map((author, i) => (
                      <button key={author} {...tc(() => {
                        const normA = s => (s||"").toLowerCase().replace(/[^a-z\s]/g,"").replace(/\s+/g," ").trim();
                        const na = normA(author);
                        const libMatch = books.find(b => normA(b.author) === na || normA(b.author).startsWith(na) || na.startsWith(normA(b.author)));
                        setSearch(""); setApiResults([]); setShowApiResults(true); onAuthor && onAuthor(libMatch?.author || author);
                      }, true)} style={{
                        display:"flex", alignItems:"center", gap:10, width:"100%",
                        padding:"9px 14px", background:"transparent", border:"none",
                        borderBottom: i < authors.length - 1 ? "1px solid #f3f4f6" : "none",
                        cursor:"pointer", textAlign:"left",
                      }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, background:"rgba(138,90,40,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:WOOD.textDim, fontFamily:"'DM Sans',sans-serif" }}>
                          {author.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{author}</p>
                          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:WOOD.textFaint, marginTop:1 }}>View author page →</p>
                        </div>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, color:WOOD.amber, letterSpacing:"0.06em", textTransform:"uppercase", fontWeight:700, flexShrink:0 }}>Author</span>
                      </button>
                    ))}
                  </div>
                );
              })()}
              <button onClick={()=>setShowApiResults(false)} style={{
                display:"block", width:"100%", padding:"9px 14px", textAlign:"center",
                background:"#f9fafb", border:"none", borderTop:"1px solid #e5e7eb",
                cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12,
                color:"#6b7280",
              }}>View shelf results ↓</button>
            </div>
          )}
          {/* re-open results hint */}
          {apiResults.length > 0 && !showApiResults && (
            <button onClick={()=>setShowApiResults(true)} style={{
              position:"absolute", top:"calc(100% + 6px)", right:0, zIndex:200,
              background:"#fff", borderRadius:8, padding:"5px 10px",
              boxShadow:"0 2px 8px rgba(0,0,0,0.12)", border:"1px solid #e5e7eb",
              cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#6b7280",
            }}>{apiResults.length} results ↑</button>
          )}
        </div>

        {!hideControls && <div style={{ display:"flex", gap:6, marginTop:8, alignItems:"center" }}>

          {/* single sort pill + dropdown */}
          <div style={{ position:"relative" }}>
            <button {...tc(()=>{ setSortDropOpen(o=>!o); setFilterOpen(false); setShelfDropOpen(false); }, true)} style={{
              display:"flex", alignItems:"center", gap:5,
              background:"rgba(15,8,2,0.55)", borderRadius:20, padding:"5px 14px",
              border:"1px solid rgba(120,70,20,0.3)", backdropFilter:"blur(4px)",
              cursor:"pointer", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500,
            }}>
              <span style={{ textTransform:"capitalize" }}>
                {sort === "custom" ? "Custom" : sort}
              </span>
              {sort !== "custom" && (
                <span style={{ fontSize:10, display:"inline-block", transform: sortAsc ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.2s", color:"rgba(255,255,255,0.6)" }}>↓</span>
              )}
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)", display:"inline-block", transition:"transform 0.2s", transform: sortDropOpen?"rotate(180deg)":"rotate(0deg)" }}>▾</span>
            </button>

            {sortDropOpen && (
              <div onClick={e=>e.stopPropagation()} style={{
                position:"absolute", top:"calc(100% + 4px)", left:0, zIndex:30, minWidth:140,
                background:"#f5e8d0", borderRadius:10, overflow:"hidden",
                boxShadow:"0 4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)",
                animation:"fadeIn 0.12s ease",
              }}>
                {[
                  { key:"date",   label:"Date" },
                  { key:"rating", label:"Rating" },
                  { key:"title",  label:"Title" },
                  { key:"custom", label:"Custom" },
                ].map(({ key, label }, i, arr) => (
                  <button key={key} {...tc(()=>{ handleSortClick(key); setSortDropOpen(false); })} style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    width:"100%", padding:"10px 14px", textAlign:"left",
                    background: sort===key ? "rgba(138,90,40,0.1)" : "transparent",
                    border:"none", borderBottom: i < arr.length-1 ? "1px solid rgba(138,90,40,0.1)" : "none",
                    cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13,
                    color: sort===key ? WOOD.amber : WOOD.text, fontWeight: sort===key ? 600 : 400,
                  }}>
                    <span>{label}</span>
                    {sort===key && key!=="custom" && (
                      <span style={{ fontSize:12, display:"inline-block", transform: sortAsc?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s" }}>↓</span>
                    )}
                    {sort===key && key==="custom" && null}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display:"flex", gap:6, marginLeft:"auto", position:"relative" }}>
            {/* view mode toggle */}
            <button {...tc(()=>setViewMode(v=>v==="card"?"row":v==="row"?"pages":"card"), true)} title={viewMode==="card"?"Row view":viewMode==="row"?"Pages view":"Card view"} style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              background:"rgba(15,8,2,0.55)", borderRadius:20, padding:"5px 10px",
              border:"1px solid rgba(120,70,20,0.3)", backdropFilter:"blur(4px)",
              cursor:"pointer", color:"#fff",
            }}>
              {viewMode==="card"
                ? <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><rect x="0" y="0" width="13" height="3" rx="1.5"/><rect x="0" y="5" width="13" height="3" rx="1.5"/><rect x="0" y="10" width="13" height="3" rx="1.5"/></svg>
                : viewMode==="row"
                ? <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><rect x="0" y="0" width="13" height="1.5" rx="0.75"/><rect x="0" y="3.5" width="13" height="3" rx="0.75"/><rect x="0" y="8.5" width="13" height="4.5" rx="0.75"/></svg>
                : <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="7" y="0" width="6" height="6" rx="1"/><rect x="0" y="7" width="6" height="6" rx="1"/><rect x="7" y="7" width="6" height="6" rx="1"/></svg>
              }
            </button>

            {/* filter icon button */}
            <button {...tc(()=>{ setFilterOpen(o=>!o); setShelfDropOpen(false); }, true)} style={{
              display:"flex", alignItems:"center", justifyContent:"center", gap:4,
              background: hasFilters ? WOOD.amber : "rgba(15,8,2,0.55)",
              borderRadius:20, padding:"5px 10px",
              border:`1px solid ${hasFilters ? WOOD.amber : "rgba(120,70,20,0.3)"}`,
              backdropFilter:"blur(4px)", cursor:"pointer",
              color: hasFilters ? "#1a0900" : "#fff",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M1 2h10l-4 5v3l-2-1V7L1 2z"/>
              </svg>
              {hasFilters && (() => {
                const active = [filterYear, filterGenre, filterAuthor && filterAuthor.split(" ").pop()].filter(Boolean);
                return <span style={{ fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                  {active.slice(0,2).join(" · ")}{active.length > 2 ? ` +${active.length - 2}` : ""}
                </span>;
              })()}
            </button>

            {/* shelf dropdown */}
            <button {...tc(()=>{ setShelfDropOpen(o=>!o); setFilterOpen(false); }, true)} style={{
              display:"flex", alignItems:"center", gap:5,
              background:"rgba(15,8,2,0.55)", borderRadius:20, padding:"5px 12px",
              border:"1px solid rgba(120,70,20,0.3)", backdropFilter:"blur(4px)",
              cursor:"pointer", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500,
            }}>
              <span>{activeShelf}</span>
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.5)", display:"inline-block", transition:"transform 0.2s", transform: shelfDropOpen?"rotate(180deg)":"rotate(0deg)" }}>▾</span>
            </button>

            {/* shelf dropdown panel */}
            {shelfDropOpen && (
              <div onClick={e=>e.stopPropagation()} style={{
                position:"absolute", top:"calc(100% + 4px)", right:0, zIndex:30, minWidth:130,
                background:"#f5e8d0", borderRadius:10, overflow:"hidden",
                boxShadow:"0 4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)",
                animation:"fadeIn 0.12s ease",
              }}>
                {SHELVES.map((s, i) => (
                  <button key={s} {...tc(()=>{ setActiveShelf(s); setShelfDropOpen(false); if (sort === "custom") setSort("date"); })} style={{
                    display:"block", width:"100%", padding:"10px 14px", textAlign:"left",
                    background: s===activeShelf ? "rgba(138,90,40,0.12)" : "transparent",
                    border:"none", borderBottom: i < SHELVES.length-1 ? "1px solid rgba(138,90,40,0.12)" : "none",
                    cursor:"pointer", fontFamily:"'Crimson Pro',serif", fontSize:15,
                    color: s===activeShelf ? WOOD.amber : WOOD.text, fontWeight: s===activeShelf ? 600 : 400,
                  }}>
                    {s}
                    <span style={{ float:"right", fontSize:11, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif" }}>
                      {books.filter(b=>(b.shelf||"Read")===s).length}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* filter panel */}
            {filterOpen && (
              <div onClick={e=>e.stopPropagation()} style={{
                position:"absolute", top:"calc(100% + 4px)", right:0, zIndex:30, width:240,
                background:"#f5e8d0", borderRadius:12, padding:"14px",
                boxShadow:"0 4px 24px rgba(0,0,0,0.28)", border:"1px solid rgba(138,90,40,0.3)",
                animation:"fadeIn 0.12s ease",
                maxHeight:"60vh", overflowY:"auto", WebkitOverflowScrolling:"touch",
              }}>
                {/* header */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:WOOD.textDim, textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"'DM Sans',sans-serif" }}>Filters</p>
                  {hasFilters && <button {...tc(()=>{ setFilterYear(null); setFilterGenre(null); setFilterAuthor(null); })} style={{ fontSize:11, color:WOOD.amber, background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>Clear all</button>}
                </div>

                {/* Year */}
                {years.length > 0 && <div style={{ marginBottom:12 }}>
                  <p style={{ fontSize:10, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Year</p>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {years.map(y => (
                      <button key={y} {...tc(()=>setFilterYear(filterYear===y?null:y))} style={pillStyle(filterYear===y)}>{y}</button>
                    ))}
                  </div>
                </div>}

                {/* Genre */}
                {genres.length > 0 && <div style={{ marginBottom:12 }}>
                  <p style={{ fontSize:10, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Genre</p>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {genres.map(g => (
                      <button key={g} {...tc(()=>setFilterGenre(filterGenre===g?null:g))} style={pillStyle(filterGenre===g)}>{g}</button>
                    ))}
                  </div>
                </div>}

                {/* Author */}
                {authors.length > 0 && <div>
                  <p style={{ fontSize:10, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Author</p>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {authors.map(a => (
                      <button key={a} {...tc(()=>setFilterAuthor(filterAuthor===a?null:a))} style={pillStyle(filterAuthor===a)}>{a.split(" ").pop()}</button>
                    ))}
                  </div>
                </div>}
              </div>
            )}
          </div>
        </div>}
      </div>
      </div>

      {/* book list */}
      <div style={{ flex:1, overflowY:"auto", padding:"4px 16px 16px", position:"relative", zIndex:1, WebkitOverflowScrolling:"touch" }} onScroll={handleScroll}>
        {filtered.length===0 && apiResults.length===0 && !apiSearching && (
          <div style={{ textAlign:"center", marginTop:60 }}>
            <div style={{
              display:"inline-block",
              background: WOOD.card,
              border: `1px solid ${WOOD.cardBorder}`,
              borderRadius:16,
              padding:"18px 28px",
            }}>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:18, fontStyle:"italic", color:WOOD.textFaint, marginBottom:8 }}>
                Search to add books
              </p>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, fontStyle:"italic", color:WOOD.textFaint, marginBottom:8 }}>or</p>
              <button {...tc(onImport)} style={{
                display:"flex", alignItems:"center", gap:8, margin:"0 auto",
                background:WOOD.amber, borderRadius:20, padding:"8px 18px",
                border:"none", cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, color:"#1a0900",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Import from Goodreads
              </button>
            </div>
          </div>
        )}
        {filtered.map((book,i)=>(
          <div key={book.id} style={{ display:"flex", alignItems:"stretch", gap:0 }}>
            {sort==="custom" && (
              <div style={{
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                width:32, flexShrink:0, paddingBottom:10, gap:2,
              }}>
                <button {...tc(()=>moveBook(i, -1))} disabled={i===0} style={{
                  background:"none", border:"none", cursor: i===0 ? "default" : "pointer",
                  color: i===0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)",
                  fontSize:12, lineHeight:1, padding:"2px 0",
                }}>▲</button>
                <span style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700,
                  color:"rgba(255,255,255,0.75)", userSelect:"none",
                  background:"rgba(138,90,40,0.45)",
                  border:"1px solid rgba(200,144,90,0.35)",
                  borderRadius:"50%",
                  width:24, height:24,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  backdropFilter:"blur(4px)",
                  lineHeight:1,
                  paddingTop:1,
                }}>{i + 1}</span>
                <button {...tc(()=>moveBook(i, 1))} disabled={i===filtered.length-1} style={{
                  background:"none", border:"none", cursor: i===filtered.length-1 ? "default" : "pointer",
                  color: i===filtered.length-1 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)",
                  fontSize:12, lineHeight:1, padding:"2px 0",
                }}>▼</button>
              </div>
            )}
            <div style={{ flex:1, minWidth:0 }}>
              {viewMode==="row"
                ? <BookRow book={book} index={i} onEdit={onEdit} onRemove={onRemove} onShelfChange={onShelfChange} onSaveProgress={onSaveProgress} onSavePages={onSavePages} onSaveAspects={onSaveAspects} onAuthor={onAuthor} />
                : viewMode==="pages"
                ? <BookRowPages book={book} index={i} onEdit={onEdit} onRemove={onRemove} onShelfChange={onShelfChange} maxPages={Math.max(...filtered.map(b=>b.pages||0))} onSaveProgress={onSaveProgress} onSavePages={onSavePages} />
                : <BookCard book={book} index={i} onRemove={onRemove} onEdit={onEdit} onShelfChange={onShelfChange} onOpenShelfPicker={setShelfPickerBook} onSaveScores={onSaveScores} onSaveDescription={onSaveDescription} onSaveProgress={onSaveProgress} onSavePages={onSavePages} onSaveAspects={onSaveAspects} onAuthor={onAuthor} libraryProfile={books.filter(b => b.shelf === "Read" || b.shelf === "DNF")} userId={userId} guestMode={guestMode} />
              }
            </div>
          </div>
        ))}
      </div>


      {/* shelf picker overlay */}
      {shelfPickerBook && (
        <div onClick={()=>setShelfPickerBook(null)} style={{
          position:"absolute", inset:0, zIndex:50, background:"rgba(0,0,0,0.4)",
          display:"flex", alignItems:"flex-end", justifyContent:"center",
          animation:"fadeIn 0.15s ease",
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:"#f5e8d0", borderRadius:"16px 16px 0 0", width:"100%",
            padding:"16px 16px 32px", boxShadow:"0 -4px 24px rgba(0,0,0,0.3)",
          }}>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:18, color:WOOD.textFaint, textAlign:"center", marginBottom:14, fontStyle:"italic" }}>
              Move "{shelfPickerBook.title}" to…
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {[
                { key:"Read",     label:"✅  Read" },
                { key:"Reading",  label:"📖  Reading" },
                { key:"The List", label:"📋  The List" },
                { key:"Curious",  label:"🧐  Curious" },
                { key:"DNF",      label:"🚫  DNF" },
              ].map(({ key, label }) => (
                <button key={key} onClick={()=>{
                    if (key === "Read" && (shelfPickerBook.shelf || "Read") === "Reading") {
                      setRatingPromptBook(shelfPickerBook);
                      setPromptRating(0);
                      setShelfPickerBook(null);
                    } else {
                      onShelfChange(shelfPickerBook.id, key);
                      setShelfPickerBook(null);
                    }
                  }} style={{
                  padding:"12px 16px", borderRadius:12, textAlign:"center",
                  background: (shelfPickerBook.shelf||"Read")===key ? "rgba(138,90,40,0.15)" : "rgba(138,90,40,0.05)",
                  border:`1px solid ${(shelfPickerBook.shelf||"Read")===key ? WOOD.amber : "rgba(138,90,40,0.2)"}`,
                  cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14,
                  color:(shelfPickerBook.shelf||"Read")===key ? WOOD.amber : WOOD.text,
                  fontWeight:(shelfPickerBook.shelf||"Read")===key ? 700 : 400,
                }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {ratingPromptBook && (
        <div onClick={()=>setRatingPromptBook(null)} style={{
          position:"absolute", inset:0, zIndex:60, background:"rgba(0,0,0,0.55)",
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:"fadeIn 0.15s ease",
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:"#fff", borderRadius:16, padding:24, width:"min(340px, 88vw)",
            boxShadow:"0 20px 60px rgba(0,0,0,0.35)", position:"relative",
          }}>
            <button onClick={()=>setRatingPromptBook(null)} style={{ position:"absolute", top:14, right:14, background:"#f3f4f6", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", fontSize:14, color:"#6b7280", display:"flex", alignItems:"center", justifyContent:"center" }}>âœ•</button>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:18, color:"#1a1a1a", marginBottom:4 }}>{ratingPromptBook.title}</p>
            <p style={{ fontSize:13, color:"#6b7280", marginBottom:20 }}>Rate this book before moving to Read</p>
            <StarRating value={promptRating} onChange={setPromptRating} size={44} stretch />
            <button onClick={()=>{
              if (!promptRating) return;
              onShelfChange(ratingPromptBook.id, "Read", promptRating);
              setRatingPromptBook(null);
            }} style={{
              marginTop:20, width:"100%", padding:"13px",
              background: promptRating ? "#b07840" : "#f3f4f6",
              color: promptRating ? "#fff" : "#9ca3af",
              borderRadius:10, fontSize:15, fontWeight:600,
              fontFamily:"'DM Sans',sans-serif",
              border:"none", cursor: promptRating ? "pointer" : "default", transition:"all 0.2s",
            }}>Move to Read</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookCoverThumb({ book: b }) {
  return (
    <div style={{ flexShrink:0 }}>
      {(b.coverUrl || b.coverId)
        ? <img
            src={b.coverUrl || `https://covers.openlibrary.org/b/id/${b.coverId}-M.jpg`}
            alt={b.title} title={b.title}
            style={{ height:90, width:60, objectFit:"cover", borderRadius:5, boxShadow:"0 3px 10px rgba(0,0,0,0.35)", display:"block" }} />
        : <div style={{
            height:90, width:60, borderRadius:5,
            background:GENRE_COLORS[b.genre]||"#7b6fa0",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 3px 10px rgba(0,0,0,0.3)",
          }}>
            <span style={{ fontSize:9, color:"#fff", textAlign:"center", padding:"0 4px", lineHeight:1.3, fontFamily:"'Crimson Pro',serif", fontStyle:"italic" }}>{b.title}</span>
          </div>
      }
    </div>
  );
}

function RecCard({ rec, coverUrl, ownedBook, onAddDirect, onEdit, onAddBook, index }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [prose, setProse] = useState(null);
  const [proseLoading, setProseLoading] = useState(false);
  const [showProse, setShowProse] = useState(false);
  const [scores, setScores] = useState(null);
  const [scoresLoading, setScoresLoading] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [description, setDescription] = useState(null);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const SHELF_META = {
    "Read":     { bg:"rgba(60,120,80,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(60,120,80,0.4)"  },
    "Reading":  { bg:"rgba(210,100,30,0.55)", color:"rgba(255,255,255,0.9)", border:"rgba(210,100,30,0.4)" },
    "The List": { bg:"rgba(138,90,40,0.5)",   color:"rgba(255,255,255,0.9)", border:"rgba(138,90,40,0.4)" },
    "Curious":  { bg:"rgba(200,144,90,0.15)", color:WOOD.amber,              border:"rgba(200,144,90,0.3)" },
    "DNF":      { bg:"rgba(160,50,50,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(160,50,50,0.4)" },
  };
  const dropLabel = ownedBook ? (ownedBook.shelf || "Read") : "+ Add";
  const dropMeta = ownedBook ? SHELF_META[ownedBook.shelf || "Read"] : { bg:"rgba(138,90,40,0.18)", color:WOOD.amber, border:"rgba(138,90,40,0.35)" };

  async function fetchDescription() {
    if (showDescription) { setShowDescription(false); return; }
    setShowProse(false); setShowScores(false); setShowDescription(true);
    if (description) return;
    setDescriptionLoading(true);
    try {
      const res = await fetch("/api/book-description", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:rec.title, author:rec.author, genre:rec.genre }) });
      const data = await res.json();
      setDescription(data.description || null);
    } catch { setDescription(null); }
    setDescriptionLoading(false);
  }

  async function fetchProse() {
    if (showProse) { setShowProse(false); return; }
    setShowDescription(false); setShowScores(false); setShowProse(true);
    if (prose) return;
    setProseLoading(true);
    try {
      const res = await fetch("/api/prose-preview", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:rec.title, author:rec.author }) });
      const data = await res.json();
      setProse(data.prose || "Unable to generate preview.");
    } catch { setProse("Unable to generate preview."); }
    setProseLoading(false);
  }

  async function fetchScores() {
    if (showScores) { setShowScores(false); return; }
    setShowDescription(false); setShowProse(false); setShowScores(true);
    if (scores) { return; }
    setScoresLoading(true);
    try {
      const res = await fetch("/api/book-scores", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:rec.title, author:rec.author, genre:rec.genre }) });
      const data = await res.json();
      setScores(data.error ? null : data);
    } catch { setScores(null); }
    setScoresLoading(false);
  }

  return (
    <div onClick={() => setDropOpen(false)} style={{
      background: WOOD.card, backdropFilter: "blur(6px)", borderRadius: 12, padding: "14px 16px",
      borderTop: "6px solid #8a5a28", borderLeft: "6px solid #8a5a28", borderBottom: "6px solid #8a5a28", borderRight: "none",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)", animation: `fadeUp 0.25s ease ${index * 0.06}s both`, position: "relative",
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ height: 72, width: 48, borderRadius: 4, flexShrink: 0, position: "relative", background: GENRE_COLORS[rec.genre] || GENRE_COLORS["Other"], boxShadow: "1px 1px 6px rgba(0,0,0,0.2)" }}>
          {coverUrl && <img src={coverUrl} alt={rec.title} style={{ position:"absolute", inset:0, height:72, width:48, objectFit:"cover", borderRadius:4, boxShadow:"1px 1px 6px rgba(0,0,0,0.3)" }} onError={e => { e.target.style.display = "none"; }} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:3 }}>
            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 17, color: WOOD.text, lineHeight: 1.2, flex:1, paddingRight:6 }}>{rec.title}</p>
            <button {...tc(()=>{ ownedBook && onEdit ? onEdit(ownedBook) : onAddBook && onAddBook({ title:rec.title, author:rec.author, genre:rec.genre, coverUrl, pages:rec.pages||0 }); }, true)} style={{ background:"transparent", border:"none", cursor:"pointer", padding:"2px 4px 0", color:"rgba(120,70,20,0.6)", fontSize:16, lineHeight:1, flexShrink:0 }}>↗</button>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: WOOD.textDim, fontStyle: "italic", marginBottom: 3 }}>{rec.author}</p>
          {rec.genre && <span style={{ background: GENRE_COLORS[rec.genre] || GENRE_COLORS["Other"], color: "#fff", borderRadius: 20, padding: "2px 8px", fontSize: 8, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", display: "inline-block", marginBottom: 3 }}>{rec.genre}</span>}
          {(rec.publishYear || rec.pages > 0) && (
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: WOOD.textFaint, marginBottom: 6 }}>
              {rec.publishYear ? `Published ${rec.publishYear}` : ""}
              {rec.publishYear && rec.pages > 0 ? " · " : ""}
              {rec.pages > 0 ? `${rec.pages.toLocaleString()} pages` : ""}
            </p>
          )}
        </div>
      </div>
      {rec.reason && <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.textDim, lineHeight:1.6, fontStyle:"italic", marginTop:8 }}>{rec.reason}</p>}

      {/* Action row: About / Prose / Scores + shelf dropdown */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", gap:6 }}>
          <button {...tc(fetchDescription, true)} style={{ display:"flex", alignItems:"center", gap:5, background:showDescription?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"5px 12px", border:`1px solid ${showDescription?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, color:showDescription?"#1a0900":WOOD.textDim }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h12"/></svg>
            About
          </button>
          <button {...tc(fetchProse, true)} style={{ display:"flex", alignItems:"center", gap:5, background:showProse?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"5px 12px", border:`1px solid ${showProse?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, color:showProse?"#1a0900":WOOD.textDim }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Prose
          </button>
          <button {...tc(fetchScores, true)} style={{ display:"flex", alignItems:"center", gap:5, background:showScores?WOOD.amber:"rgba(138,90,40,0.12)", borderRadius:20, padding:"5px 12px", border:`1px solid ${showScores?WOOD.amber:"rgba(138,90,40,0.25)"}`, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, color:showScores?"#1a0900":WOOD.textDim }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            Scores
          </button>
        </div>
        <div style={{ position:"relative" }}>
          <span {...tc(()=>setDropOpen(o=>!o))} style={{ background:dropMeta.bg, color:dropMeta.color, border:`1px solid ${dropMeta.border}`, borderRadius:20, padding:"3px 10px", fontSize:9, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1, cursor:"pointer", display:"inline-block" }}>
            {dropLabel}
          </span>
          {dropOpen && (
            <div style={{ position:"absolute", bottom:"calc(100% + 4px)", right:0, zIndex:40, minWidth:120, background:"#f5e8d0", borderRadius:10, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)", animation:"fadeIn 0.12s ease" }}>
              {SHELVES.map((s, si) => (
                <button key={s}
                  {...tc(()=>{ setDropOpen(false); onAddDirect({ title:rec.title, author:rec.author, genre:rec.genre, coverUrl, pages:0 }, s); })}
                  style={{ display:"block", width:"100%", padding:"9px 14px", textAlign:"left", background:ownedBook&&(ownedBook.shelf||"Read")===s?"rgba(138,90,40,0.1)":"transparent", border:"none", borderBottom:si<SHELVES.length-1?"1px solid rgba(138,90,40,0.1)":"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13, color:ownedBook&&(ownedBook.shelf||"Read")===s?WOOD.amber:WOOD.text, fontWeight:ownedBook&&(ownedBook.shelf||"Read")===s?600:400 }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded panels */}
      {showDescription && (
        <div style={{ marginTop:10, animation:"fadeIn 0.18s ease" }} onClick={e=>e.stopPropagation()}>
          {descriptionLoading
            ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.textFaint, fontStyle:"italic" }}>Loading…</p>
            : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.text, lineHeight:1.72 }}>{description}</p>}
        </div>
      )}
      {showProse && (
        <div style={{ marginTop:10, animation:"fadeIn 0.18s ease" }} onClick={e=>e.stopPropagation()}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:11, color:WOOD.amber, letterSpacing:"0.08em", textTransform:"uppercase" }}>Prose Preview · {rec.author}</p>
            <button {...tc(()=>setShowProse(false), true)} style={{ background:"none", border:"none", cursor:"pointer", color:WOOD.textFaint, fontSize:15, lineHeight:1, padding:"0 2px" }}>✕</button>
          </div>
          {proseLoading
            ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.textFaint, fontStyle:"italic" }}>Generating…</p>
            : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.8 }}>{prose}</p>}
        </div>
      )}
      {showScores && (
        <div style={{ marginTop:10, animation:"fadeIn 0.18s ease" }} onClick={e=>e.stopPropagation()}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:11, color:WOOD.amber, letterSpacing:"0.08em", textTransform:"uppercase" }}>Scores · {rec.title}</p>
            <button {...tc(()=>setShowScores(false), true)} style={{ background:"none", border:"none", cursor:"pointer", color:WOOD.textFaint, fontSize:15, lineHeight:1, padding:"0 2px" }}>✕</button>
          </div>
          {scoresLoading
            ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:WOOD.textFaint, fontStyle:"italic" }}>Scoring…</p>
            : scores ? (
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {[["Prose",scores.prose],["Plot",scores.plot],["Characters",scores.characters],["Pacing",scores.pacing],["World-building",scores.worldBuilding],["Dialogue",scores.dialogue],["Ending",scores.ending]].map(([label,val]) => val != null && (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:WOOD.textDim, width:88, flexShrink:0 }}>{label}</span>
                    <div style={{ flex:1, height:5, borderRadius:3, background:"rgba(138,90,40,0.15)", overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:3, background:WOOD.amber, width:`${val*10}%`, transition:"width 0.4s ease" }} />
                    </div>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, color:WOOD.amber, width:18, textAlign:"right", flexShrink:0 }}>{val}</span>
                  </div>
                ))}
              </div>
            ) : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:WOOD.textFaint, fontStyle:"italic" }}>Unable to score.</p>}
        </div>
      )}
    </div>
  );
}

const PAIGE_MODES = [
  { key:"popular",      label:"Popular",      desc:"Widely loved, broadly acclaimed" },
  { key:"trending",     label:"Trending",     desc:"What book communities are talking about now" },
  { key:"hidden_gems",  label:"Hidden Gems",  desc:"Overlooked, deserves more readers" },
  { key:"comfort_read", label:"Comfort Read", desc:"Easy, warm, satisfying" },
  { key:"challenge_me", label:"Challenge Me", desc:"Push beyond your usual range" },
  { key:"new_to_me",    label:"New To Me",    desc:"Genres and styles you haven't tried" },
];

function PaigeTab({ books, userId, onAddDirect, onEdit, onAddBook }) {
  const [mode, setMode] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState({});       // { [mode]: [...items] }
  const [reserve, setReserve] = useState({}); // { [mode]: [...items] } cached extras
  const [covers, setCovers] = useState({});   // { [mode]: { [title]: url } }
  const [error, setError] = useState(null);
  const [nextLoading, setNextLoading] = useState(false);

  const readBooks = books.filter(b => (b.shelf || "Read") === "Read");
  const profile = readBooks.map(b => ({ title: b.title, author: b.author, genre: b.genre, rating: b.rating || 0 }));
  const hasBooks = readBooks.length > 0;
  const currentRecs = recs[mode] || null;
  const currentCovers = covers[mode] || {};

  // Load saved recs from DB on mount
  useEffect(() => {
    if (!userId) return;
    supabase.from("paige_recommendations").select("mode,items,reserve,covers").eq("user_id", userId)
      .then(({ data }) => {
        if (!data?.length) return;
        const recMap = {}, resMap = {}, covMap = {};
        data.forEach(row => {
          if (row.items?.length) recMap[row.mode] = row.items;
          if (row.reserve?.length) resMap[row.mode] = row.reserve;
          if (row.covers) covMap[row.mode] = row.covers;
        });
        if (Object.keys(recMap).length) setRecs(recMap);
        if (Object.keys(resMap).length) setReserve(resMap);
        if (Object.keys(covMap).length) setCovers(covMap);
      });
  }, [userId]);

  async function fetchCoversForRecs(results, currentMode) {
    const covMap = {};
    const needsFetch = [];
    for (const rec of results) {
      const owned = books.find(b => normBookKey(b.title) === normBookKey(rec.title));
      if (owned?.coverUrl) covMap[rec.title] = owned.coverUrl;
      else needsFetch.push(rec);
    }
    setCovers(prev => ({ ...prev, [currentMode]: { ...(prev[currentMode] || {}), ...covMap } }));
    const BATCH = 5;
    for (let b = 0; b < needsFetch.length; b += BATCH) {
      await Promise.all(needsFetch.slice(b, b + BATCH).map(async rec => {
        try {
          const r = await fetch("/api/fetch-cover", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:rec.title, author:rec.author }) });
          const d = await r.json();
          if (d.coverUrl) {
            covMap[rec.title] = d.coverUrl;
            setCovers(prev => ({ ...prev, [currentMode]: { ...(prev[currentMode] || {}), [rec.title]: d.coverUrl } }));
          }
        } catch {}
      }));
      if (b + BATCH < needsFetch.length) await new Promise(r => setTimeout(r, 200));
    }
    return covMap;
  }

  async function saveToDb(currentMode, items, reserveItems, covMap) {
    if (!userId || userId === "guest") return;
    supabase.from("paige_recommendations")
      .upsert({ user_id: userId, mode: currentMode, items, reserve: reserveItems, covers: covMap, generated_at: new Date().toISOString() }, { onConflict: "user_id,mode" })
      .then(({ error }) => console.log("[paige save]", error || "ok"));
  }

  async function generate() {
    if (!profile.length) return;
    setLoading(true); setError(null);
    setRecs(prev => ({ ...prev, [mode]: null }));
    setReserve(prev => ({ ...prev, [mode]: [] }));
    setCovers(prev => ({ ...prev, [mode]: {} }));
    try {
      const res = await fetch("/api/paige-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, mode, exclude: [] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const readKeys = new Set(readBooks.map(b => normBookKey(b.title)));
      const results = (data.recommendations || []).filter(r => !readKeys.has(normBookKey(r.title)));
      const res2 = (data.reserve || []).filter(r => !readKeys.has(normBookKey(r.title)));
      setRecs(prev => ({ ...prev, [mode]: results }));
      setReserve(prev => ({ ...prev, [mode]: res2 }));
      const covMap = await fetchCoversForRecs([...results, ...res2], mode);
      await saveToDb(mode, results, res2, { ...(covers[mode] || {}), ...covMap });
    } catch (e) {
      setError(e.message || "Something went wrong.");
    }
    setLoading(false);
  }

  async function generateNext() {
    const existing = recs[mode] || [];
    const currentReserve = reserve[mode] || [];
    setNextLoading(true); setError(null);

    // Drain reserve first
    if (currentReserve.length > 0) {
      const nextBatch = currentReserve.slice(0, 10);
      const remainingReserve = currentReserve.slice(10);
      const combined = [...existing, ...nextBatch];
      setRecs(prev => ({ ...prev, [mode]: combined }));
      setReserve(prev => ({ ...prev, [mode]: remainingReserve }));
      const covMap = await fetchCoversForRecs(nextBatch, mode);
      await saveToDb(mode, combined, remainingReserve, { ...(covers[mode] || {}), ...covMap });
      setNextLoading(false);
      return;
    }

    // Reserve exhausted — generate fresh
    const exclude = existing.map(r => r.title);
    try {
      const res = await fetch("/api/paige-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, mode, exclude }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const readKeys = new Set(readBooks.map(b => normBookKey(b.title)));
      const seenKeys = new Set(exclude.map(normBookKey));
      const newResults = (data.recommendations || []).filter(r => !readKeys.has(normBookKey(r.title)) && !seenKeys.has(normBookKey(r.title)));
      const newReserve = (data.reserve || []).filter(r => !readKeys.has(normBookKey(r.title)) && !seenKeys.has(normBookKey(r.title)));
      const combined = [...existing, ...newResults];
      setRecs(prev => ({ ...prev, [mode]: combined }));
      setReserve(prev => ({ ...prev, [mode]: newReserve }));
      const covMap = await fetchCoversForRecs([...newResults, ...newReserve], mode);
      await saveToDb(mode, combined, newReserve, { ...(covers[mode] || {}), ...covMap });
    } catch (e) {
      setError(e.message || "Something went wrong.");
    }
    setNextLoading(false);
  }

  const canGenerate = hasBooks && !loading;
  const modeInfo = PAIGE_MODES.find(m => m.key === mode);

  return (
    <div style={{ padding:"0 0 100px" }}>
      {/* Header */}
      <div style={{ padding:"16px 18px 8px" }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,0.6)", textAlign:"center" }}>Recommendations built from your reading profile.</p>
      </div>

      {!hasBooks ? (
        <div style={{ padding:"40px 20px", textAlign:"center" }}>
          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, color:"rgba(255,255,255,0.7)", fontStyle:"italic" }}>Add books to your Read shelf first, then come back.</p>
        </div>
      ) : (
        <>
          {/* Mode pills */}
          <div style={{ margin:"0 18px 16px", background:"rgba(255,235,195,0.72)", backdropFilter:"blur(6px)", borderRadius:14, border:"1px solid rgba(160,100,40,0.3)", boxShadow:"0 2px 8px rgba(0,0,0,0.12)", padding:14 }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, color:"rgba(90,56,32,0.7)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10, textAlign:"center" }}>What kind of read?</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {PAIGE_MODES.map(m => (
                <button key={m.key} onClick={() => setMode(m.key)} style={{
                  padding:"7px 14px", borderRadius:20, fontSize:12, fontFamily:"'DM Sans',sans-serif", fontWeight:600,
                  cursor:"pointer", transition:"all 0.15s", border:"1px solid",
                  background: mode===m.key ? WOOD.amber : "rgba(138,90,40,0.1)",
                  color: mode===m.key ? "#1a0900" : "rgba(90,56,32,0.75)",
                  borderColor: mode===m.key ? WOOD.amber : "rgba(138,90,40,0.3)",
                }}>{m.label}</button>
              ))}
            </div>
            {modeInfo && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(90,56,32,0.55)", marginTop:8, fontStyle:"italic" }}>{modeInfo.desc}</p>}
          </div>

          {/* Generate button */}
          <div style={{ padding:"0 18px 22px" }}>
            <button onClick={generate} disabled={!canGenerate} style={{
              width:"100%", padding:"13px 0",
              background: canGenerate ? `linear-gradient(135deg,${WOOD.amber},#c8883a)` : "rgba(138,90,40,0.15)",
              border:"none", borderRadius:12, cursor: canGenerate ? "pointer" : "default",
              fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
              color: canGenerate ? "#1a0900" : WOOD.textFaint,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all 0.2s",
            }}>
              {loading
                ? <><span style={{ width:16, height:16, border:"2px solid rgba(26,9,0,0.3)", borderTopColor:"#1a0900", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />Finding books…</>
                : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17 5.8 21.2l2.4-7.3L2 9.4h7.6z"/></svg>Get Recommendations</>
              }
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{ margin:"0 18px 18px", padding:"12px 14px", background:"rgba(192,57,43,0.08)", border:"1px solid rgba(192,57,43,0.2)", borderRadius:10 }}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#c0392b" }}>{error}</p>
            </div>
          )}

          {/* Results */}
          {currentRecs && currentRecs.length > 0 && (
            <div style={{ padding:"0 18px" }}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>Recommended for you</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[...new Map(currentRecs.map(r => [r.title.toLowerCase(), r])).values()].map((rec, i) => (
                  <RecCard key={i} index={i} rec={rec} coverUrl={currentCovers[rec.title] || null} ownedBook={books.find(b => normBookKey(b.title) === normBookKey(rec.title))} onAddDirect={onAddDirect} onEdit={onEdit} onAddBook={onAddBook} />
                ))}
              </div>
              {/* Next 10 */}
              <button onClick={generateNext} disabled={nextLoading} style={{
                width:"100%", marginTop:16, padding:"13px 0",
                background: nextLoading ? "rgba(138,90,40,0.15)" : `linear-gradient(135deg,${WOOD.amber},#c8883a)`,
                border:"none", borderRadius:12, cursor: nextLoading ? "default" : "pointer",
                fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700,
                color: nextLoading ? WOOD.textFaint : "#1a0900",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all 0.2s",
              }}>
                {nextLoading
                  ? <><span style={{ width:16, height:16, border:"2px solid rgba(26,9,0,0.3)", borderTopColor:"#1a0900", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />Loading…</>
                  : <>Next 10 →</>
                }
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function RecommendPage({ books, userId, onAddDirect, onAuthor, onEdit, onAddBook }) {
  const [character, setCharacter] = useState("paige");
  return (
    <div style={{ height:"100%", overflowY:"auto", overflowX:"hidden" }}>
      {/* Character selector */}
      <div style={{ display:"flex", justifyContent:"center", gap:32, padding:"18px 18px 0", borderBottom:"1px solid rgba(138,90,40,0.2)" }}>
        {[{ key:"paige", label:"Paige Turner", img:"/page-turner.png" }, { key:"reiko", label:"Reiko Mend", img:"/reiko-mend.png" }].map(c => (
          <button key={c.key} {...tc(() => setCharacter(c.key))} style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap:6,
            background:"transparent", border:"none", cursor:"pointer",
            borderBottom: character===c.key ? "2px solid #fff" : "2px solid transparent",
            paddingBottom:12, transition:"all 0.15s",
            opacity: character===c.key ? 1 : 0.45,
            touchAction:"manipulation",
          }}>
            <img src={c.img} alt={c.label} style={{ width:80, height:80, objectFit:"contain" }} />
            <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, fontWeight:400, color:"#fff" }}>{c.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      {character === "paige"
        ? <PaigeTab books={books} userId={userId} onAddDirect={onAddDirect} onEdit={onEdit} onAddBook={onAddBook} />
        : <ReikoTab books={books} userId={userId} onAddDirect={onAddDirect} onAuthor={onAuthor} onEdit={onEdit} onAddBook={onAddBook} />
      }
    </div>
  );
}

const SHELF_BADGE = {
  "Read":     { bg:"rgba(60,120,80,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(60,120,80,0.4)"  },
  "Reading":  { bg:"rgba(210,100,30,0.55)", color:"rgba(255,255,255,0.9)", border:"rgba(210,100,30,0.4)" },
  "The List": { bg:"rgba(80,120,180,0.7)",  color:"rgba(255,255,255,0.9)", border:"rgba(80,120,180,0.5)" },
  "Curious":  { bg:"rgba(180,155,80,0.7)",  color:"rgba(255,255,255,0.9)", border:"rgba(180,155,80,0.5)" },
  "DNF":      { bg:"rgba(160,50,50,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(160,50,50,0.4)" },
};

function AuthorRecCard({ rec, books, onAuthor, onEdit, onAddBook, onAddDirect, preloadedCovers = {}, shouldAutoExpand = false }) {
  const [expanded, setExpanded] = useState(false);
  const [userTouched, setUserTouched] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (shouldAutoExpand && !userTouched) setExpanded(true);
  }, [shouldAutoExpand]);

  function handleExpand() {
    setUserTouched(true);
    setExpanded(e => !e);
    setOpenDropdown(null);
  }

  return (
    <div onClick={handleExpand} style={{ background: CR.bg, borderRadius: "12px 0 0 12px", padding: "14px", borderTop: "6px solid #8a5a28", borderRight: "6px solid #8a5a28", borderBottom: "6px solid #8a5a28", borderLeft: `1px solid ${CR.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 3 }}>
        <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 18, color: CR.text, lineHeight: 1.2 }}>{rec.name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onAuthor && onAuthor(rec.name); }} style={{
            padding: "6px 12px", borderRadius: 20, fontSize: 11,
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600, cursor: "pointer",
            background: CR.panel, color: CR.textDim,
            border: `1px solid ${CR.border}`, whiteSpace: "nowrap", transition: "all 0.15s",
          }}>View Profile</button>
        </div>
      </div>
      {(rec.topGenre || rec.booksWritten) && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: CR.textFaint, marginBottom: 8 }}>
        {[rec.topGenre, rec.booksWritten ? `${rec.booksWritten} books` : null].filter(Boolean).join(" · ")}
      </p>}
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: CR.textDim, lineHeight: 1.55 }}>{rec.reason}</p>
      {expanded && rec.topBooks?.length > 0 && (
        <div style={{ marginTop: 12, borderTop: `1px solid ${CR.border}`, paddingTop: 4, display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
          {rec.topBooks.map((b, i) => {
            const ownedBook = books.find(lb => normBookKey(lb.title) === normBookKey(b.title));
            const coverUrl = preloadedCovers[b.title] || ownedBook?.coverUrl || null;
            const draft = { title: b.title, author: rec.name, genre: b.genre || "Fiction", coverUrl, pages: b.pages || 0 };
            const badge = ownedBook ? (SHELF_BADGE[ownedBook.shelf] || SHELF_BADGE["Read"]) : null;
            return (
              <div key={i} style={{ position: "relative", zIndex: openDropdown === b.title ? 10 : "auto", display: "flex", alignItems: "stretch", gap: 12, padding: "12px 0", borderBottom: i < rec.topBooks.length - 1 ? `1px solid ${CR.border}` : "none" }}>
                {/* Tappable row → modal */}
                <div onClick={() => ownedBook ? onEdit && onEdit(ownedBook) : onAddBook && onAddBook(draft)} style={{ display: "flex", gap: 12, flex: 1, minWidth: 0, cursor: "pointer", opacity: ownedBook ? 1 : 0.8 }}>
                  <BookCover book={{ title: b.title, coverUrl }} width={42} height={62} radius={3} shadow="1px 1px 5px rgba(0,0,0,0.2)" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 17, color: CR.text, lineHeight: 1.2, marginBottom: 4 }}>{b.title}</p>
                    {b.publishYear && <p style={{ fontSize: 11, color: CR.textDim, fontFamily: "'DM Sans',sans-serif", marginBottom: 6 }}>{b.publishYear}{b.pages ? ` · ${b.pages} pages` : ""}</p>}
                    {b.genre && <span style={{ background: GENRE_COLORS[b.genre] || "#94a3b8", color: "#fff", borderRadius: 20, padding: "3px 8px", fontSize: 8, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1 }}>{b.genre}</span>}
                  </div>
                </div>
                {/* Shelf badge or + Add dropdown */}
                <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-end", paddingBottom: 2, position: "relative" }}>
                  {ownedBook ? (
                    <span onClick={() => onEdit && onEdit(ownedBook)} style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, borderRadius: 20, padding: "3px 8px", fontSize: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1, cursor: "pointer", whiteSpace: "nowrap" }}>{ownedBook.shelf}</span>
                  ) : (
                    <>
                      <span onClick={e => { e.stopPropagation(); setOpenDropdown(openDropdown === b.title ? null : b.title); }} style={{ background: "rgba(138,90,40,0.18)", color: CR.textDim, border: "1px solid rgba(138,90,40,0.3)", borderRadius: 20, padding: "3px 10px", fontSize: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1, cursor: "pointer", whiteSpace: "nowrap" }}>+ Add</span>
                      {openDropdown === b.title && (
                        <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 50, minWidth: 120, background: "#f5e8d0", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.25)", border: "1px solid rgba(138,90,40,0.3)" }}>
                          {SHELVES.map(s => (
                            <button key={s} onClick={e => { e.stopPropagation(); setOpenDropdown(null); onAddDirect && onAddDirect(draft, s); }} style={{ display: "block", width: "100%", padding: "9px 14px", textAlign: "left", border: "none", background: "transparent", color: "#5a3820", fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" }}>{s}</button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ReikoTab({ books, userId, onAddDirect, onAuthor, onEdit, onAddBook }) {
  const [reikoMode, setReikoMode] = useState("books");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState(null);
  const [recCovers, setRecCovers] = useState({});
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterShelf, setFilterShelf] = useState("Read");
  const [filterGenres, setFilterGenres] = useState([]);
  const [filterRating, setFilterRating] = useState(5);
  const [filterYear, setFilterYear] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [authorRecs, setAuthorRecs] = useState(null);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [authorError, setAuthorError] = useState(null);
  const [pickerCollapsed, setPickerCollapsed] = useState(false);
  const [authorPickerCollapsed, setAuthorPickerCollapsed] = useState(false);
  const [allCovers, setAllCovers] = useState({});
  const [autoExpanded, setAutoExpanded] = useState(new Set());

  const availableYears = useMemo(() => [...new Set(books.map(b => b.date ? new Date(b.date).getFullYear() : null).filter(Boolean))].sort((a,b)=>b-a), [books]);
  const availableGenres = useMemo(() => [...new Set(books.map(b => b.genre).filter(Boolean))].sort(), [books]);
  const [authorSort, setAuthorSort] = useState(() => { try { return localStorage.getItem("authorSort") || "az"; } catch { return "az"; } });

  const readAuthors = useMemo(() => {
    const seen = new Set();
    return books
      .filter(b => (b.shelf || "Read") === "Read" && b.author)
      .map(b => b.author)
      .filter(a => { if (seen.has(a)) return false; seen.add(a); return true; })
      .sort();
  }, [books]);

  const sortedAuthors = useMemo(() => {
    if (authorSort === "az") return readAuthors;
    const counts = {};
    books.filter(b => (b.shelf || "Read") === "Read" && b.author).forEach(b => { counts[b.author] = (counts[b.author] || 0) + 1; });
    return [...readAuthors].sort((a, b) => (counts[b] || 0) - (counts[a] || 0));
  }, [readAuthors, authorSort, books]);

  // Load saved recommendations on mount
  useEffect(() => {
    if (!userId) return;
    supabase.from("reiko_recommendations").select("items,seeds,covers").eq("user_id", userId).single()
      .then(({ data }) => {
        if (!data) return;
        if (data.items?.length) setRecs(data.items);
        if (data.covers) setRecCovers(data.covers);
        if (data.seeds?.length) setSelected(prev => prev.length ? prev : data.seeds.filter(id => books.some(b => b.id === id)));
      });
    try {
      const cached = localStorage.getItem(`author_recs_${userId}`);
      if (cached) { const { items, seeds } = JSON.parse(cached); if (items?.length) { setAuthorRecs(items); if (seeds?.length) setSelectedAuthors(seeds); setAuthorPickerCollapsed(true); } }
    } catch {}
  }, [userId]);

  // Sequentially pre-load covers for author rec cards and auto-expand each when ready
  useEffect(() => {
    if (!authorRecs?.length) return;
    setAllCovers({});
    setAutoExpanded(new Set());
    let cancelled = false;
    (async () => {
      for (let i = 0; i < authorRecs.length; i++) {
        if (cancelled) break;
        const rec = authorRecs[i];
        if (!rec.topBooks?.length) { setAutoExpanded(prev => new Set([...prev, i])); continue; }
        const coverResults = {};
        await Promise.all(rec.topBooks.map(async b => {
          try {
            const r = await fetch("/api/fetch-cover", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: b.title, author: rec.name }) });
            const d = await r.json();
            if (d.coverUrl) coverResults[b.title] = d.coverUrl;
          } catch {}
        }));
        if (!cancelled) {
          setAllCovers(prev => ({ ...prev, [i]: coverResults }));
          setAutoExpanded(prev => new Set([...prev, i]));
        }
      }
    })();
    return () => { cancelled = true; };
  }, [authorRecs]);

  const filteredPicker = useMemo(() => {
    const filtered = books.filter(b => {
      if (filterShelf && (b.shelf || "Read") !== filterShelf) return false;
      if (filterGenres.length > 0 && !filterGenres.includes(b.genre)) return false;
      if (filterYear && (!b.date || new Date(b.date).getFullYear() !== filterYear)) return false;
      if (filterRating) {
        const r = b.rating || 0;
        if (filterRating === 5 && r < 5) return false;
        if (filterRating === 4 && r < 4) return false;
        if (filterRating === 3 && r < 3) return false;
      }
      return true;
    });
    const seen = new Set();
    return filtered.filter(b => {
      const key = normBookKey(b.title);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [books, filterShelf, filterGenres, filterYear, filterRating]);

  const activeFilterCount = [filterShelf, filterGenres.length > 0 ? true : null, filterRating, filterYear].filter(Boolean).length;

  function toggleBook(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : s.length < 10 ? [...s, id] : s);
  }

  async function getRecommendations() {
    const seeds = books.filter(b => selected.includes(b.id));
    setLoading(true); setRecs(null); setRecCovers({}); setError(null); setPickerCollapsed(true);
    try {
      const res = await fetch("/api/recommend-books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ books: seeds.map(b => ({ title: b.title, author: b.author, genre: b.genre })), owned: books.filter(b => (b.shelf||"Read") === "Read").map(b => b.title) }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const readKeys = new Set(books.filter(b => (b.shelf||"Read") === "Read").map(b => normBookKey(b.title)));
      const results = (data.recommendations || []).filter(r => !readKeys.has(normBookKey(r.title)));
      setRecs(results);
      // Seed covers from library matches immediately
      const covers = {};
      const needsCover = [];
      for (const rec of results) {
        const owned = books.find(b => normBookKey(b.title) === normBookKey(rec.title));
        if (owned?.coverUrl) covers[rec.title] = owned.coverUrl;
        else needsCover.push(rec);
      }
      setRecCovers({ ...covers });
      // Fetch remaining via /api/fetch-cover in batches of 5
      const BATCH = 5;
      for (let b = 0; b < needsCover.length; b += BATCH) {
        await Promise.all(needsCover.slice(b, b + BATCH).map(async rec => {
          try {
            const r = await fetch("/api/fetch-cover", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:rec.title, author:rec.author }) });
            const d = await r.json();
            if (d.coverUrl) { covers[rec.title] = d.coverUrl; setRecCovers(prev => ({ ...prev, [rec.title]: d.coverUrl })); }
          } catch {}
        }));
        if (b + BATCH < needsCover.length) await new Promise(r => setTimeout(r, 200));
      }
      setRecCovers(covers);
      if (userId && userId !== "guest") {
        supabase.from("reiko_recommendations")
          .upsert({ user_id: userId, items: results, seeds: selected, covers, generated_at: new Date().toISOString() }, { onConflict: "user_id" })
          .then(({ error }) => console.log("[reiko save]", error || "ok"));
      }
    } catch (e) {
      setError(e.message || "Something went wrong.");
    }
    setLoading(false);
  }

  async function getAuthorRecommendations() {
    setAuthorLoading(true); setAuthorRecs(null); setAuthorError(null); setAuthorPickerCollapsed(true);
    try {
      const res = await fetch("/api/recommend-books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "authors", authors: selectedAuthors, readAuthors }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const readSet = new Set(readAuthors.map(a => a.toLowerCase()));
      const results = (data.recommendations || []).filter(r => !readSet.has(r.name.toLowerCase()));
      setAuthorRecs(results);
      try { localStorage.setItem(`author_recs_${userId}`, JSON.stringify({ items: results, seeds: selectedAuthors })); } catch {}
    } catch (e) {
      setAuthorError(e.message || "Something went wrong.");
    }
    setAuthorLoading(false);
  }

  const hasBooks = books.length > 0;
  const canSubmit = selected.length > 0 && !loading;
  const canSubmitAuthors = selectedAuthors.length > 0 && !authorLoading;

  return (
    <div style={{ padding: "0 0 100px" }}>
      {/* Mode toggle */}
      <div style={{ padding: "16px 18px 0", display: "flex", justifyContent: "center", gap: 6 }}>
        {[["books", "Books"], ["authors", "Authors"]].map(([m, label]) => (
          <button key={m} onClick={() => { setReikoMode(m); setPickerCollapsed(false); setAuthorPickerCollapsed(false); }} style={{
            padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer",
            background: reikoMode===m ? WOOD.amber : "rgba(255,235,195,0.12)",
            color: reikoMode===m ? "#1a0900" : "rgba(255,235,195,0.6)",
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
            transition: "all 0.15s",
          }}>{label}</button>
        ))}
      </div>
      {/* Header */}
      <div style={{ padding: "10px 18px 8px" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", textAlign:"center" }}>
          {reikoMode === "books"
            ? "Select up to 6 books you've loved — AI will find your next read."
            : "Select authors you love — AI will find writers you haven't discovered yet."}
        </p>
      </div>

      {!hasBooks ? (
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 17, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>Add books to your shelf first, then come back for recommendations.</p>
        </div>
      ) : (
        <>
          {reikoMode === "books" && <>
          {/* Book picker */}
          <div style={{ padding: "0 18px 16px" }}>
            {pickerCollapsed ? (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {books.filter(b => selected.includes(b.id)).map(b => (
                    <span key={b.id} style={{ padding: "4px 10px", borderRadius: 20, background: WOOD.card, border: "1px solid rgba(138,90,40,0.25)", fontFamily: "'Crimson Pro',serif", fontSize: 13, color: WOOD.textDim, whiteSpace: "nowrap" }}>{b.title}</span>
                  ))}
                </div>
                <button onClick={() => setPickerCollapsed(false)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", padding: 2, marginTop: 2 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
            ) : (
            <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Choose seeds {selected.length > 0 && <span style={{ color: WOOD.amber, fontWeight: 700 }}>({selected.length} selected)</span>}
                </p>
                {selected.length > 0 && (
                  <button onClick={() => setSelected([])} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", padding: 0, textDecoration: "underline" }}>Clear</button>
                )}
                {(recs || loading) && <button onClick={() => setPickerCollapsed(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", padding: 2 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                </button>}
              </div>
              <button onClick={() => setFilterOpen(o => !o)} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                background: activeFilterCount > 0 ? WOOD.amber : "rgba(15,8,2,0.55)",
                borderRadius: 20, padding: "5px 10px",
                border: `1px solid ${activeFilterCount > 0 ? WOOD.amber : "rgba(120,70,20,0.3)"}`,
                backdropFilter: "blur(4px)", cursor: "pointer",
                color: activeFilterCount > 0 ? "#1a0900" : "#fff",
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M1 2h10l-4 5v3l-2-1V7L1 2z"/></svg>
                {activeFilterCount > 0 && <span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>
                  {[filterShelf, filterGenres.length > 0 ? filterGenres.join("/") : null, filterRating ? `${filterRating}★+` : null, filterYear].filter(Boolean).slice(0,2).join(" · ")}
                  {activeFilterCount > 2 ? ` +${activeFilterCount - 2}` : ""}
                </span>}
              </button>
            </div>

            {filterOpen && (
              <div style={{
                background: "#f5e8d0", borderRadius: 12, padding: "14px", marginBottom: 12,
                boxShadow: "0 4px 24px rgba(0,0,0,0.28)", border: "1px solid rgba(138,90,40,0.3)",
                animation: "fadeIn 0.12s ease", display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: WOOD.textDim, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Sans',sans-serif" }}>Filters</p>
                  {activeFilterCount > 0 && <button onClick={() => { setFilterShelf(null); setFilterGenres([]); setFilterRating(null); setFilterYear(null); }} style={{ fontSize: 11, color: WOOD.amber, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>Clear all</button>}
                </div>
                {/* Shelf */}
                <div>
                  <p style={{ fontSize: 10, color: WOOD.textFaint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>Shelf</p>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {SHELVES.map(s => (
                      <button key={s} onClick={() => setFilterShelf(f => f === s ? null : s)} style={{ padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500, cursor:"pointer", transition:"all 0.15s", border:"1px solid", background: filterShelf===s ? WOOD.amber : "rgba(255,235,195,0.12)", color: filterShelf===s ? "#1a0900" : WOOD.textDim, borderColor: filterShelf===s ? WOOD.amber : "rgba(138,90,40,0.3)", whiteSpace:"nowrap" }}>{s}</button>
                    ))}
                  </div>
                </div>
                {/* Genre */}
                {availableGenres.length > 0 && (
                  <div>
                    <p style={{ fontSize: 10, color: WOOD.textFaint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>Genre</p>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {availableGenres.map(g => (
                        <button key={g} onClick={() => setFilterGenres(gs => gs.includes(g) ? gs.filter(x => x !== g) : [...gs, g])} style={{ padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500, cursor:"pointer", transition:"all 0.15s", border:"1px solid", background: filterGenres.includes(g) ? WOOD.amber : "rgba(255,235,195,0.12)", color: filterGenres.includes(g) ? "#1a0900" : WOOD.textDim, borderColor: filterGenres.includes(g) ? WOOD.amber : "rgba(138,90,40,0.3)", whiteSpace:"nowrap" }}>{g}</button>
                      ))}
                    </div>
                  </div>
                )}
                {/* Rating */}
                <div>
                  <p style={{ fontSize: 10, color: WOOD.textFaint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>Rating</p>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {[{ label: "5★", val: 5 }, { label: "4★+", val: 4 }, { label: "3★+", val: 3 }].map(({ label, val }) => (
                      <button key={val} onClick={() => setFilterRating(f => f === val ? null : val)} style={{ padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500, cursor:"pointer", transition:"all 0.15s", border:"1px solid", background: filterRating===val ? WOOD.amber : "rgba(255,235,195,0.12)", color: filterRating===val ? "#1a0900" : WOOD.textDim, borderColor: filterRating===val ? WOOD.amber : "rgba(138,90,40,0.3)", whiteSpace:"nowrap" }}>{label}</button>
                    ))}
                  </div>
                </div>
                {/* Year */}
                {availableYears.length > 0 && (
                  <div>
                    <p style={{ fontSize: 10, color: WOOD.textFaint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>Year Read</p>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {availableYears.map(y => (
                        <button key={y} onClick={() => setFilterYear(f => f === y ? null : y)} style={{ padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500, cursor:"pointer", transition:"all 0.15s", border:"1px solid", background: filterYear===y ? WOOD.amber : "rgba(255,235,195,0.12)", color: filterYear===y ? "#1a0900" : WOOD.textDim, borderColor: filterYear===y ? WOOD.amber : "rgba(138,90,40,0.3)", whiteSpace:"nowrap" }}>{y}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {filteredPicker.length === 0
                ? <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>No books match the current filters.</p>
                : filteredPicker.map(book => {
                const isOn = selected.includes(book.id);
                const color = GENRE_COLORS[book.genre] || GENRE_COLORS["Other"];
                return (
                  <button key={book.id} onClick={() => toggleBook(book.id)} style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "6px 10px 6px 6px", borderRadius: 10,
                    background: WOOD.card,
                    border: `1.5px solid ${isOn ? WOOD.amber : "rgba(138,90,40,0.18)"}`,
                    boxShadow: isOn ? "0 1px 6px rgba(0,0,0,0.13)" : "0 1px 3px rgba(0,0,0,0.08)",
                    cursor: "pointer", transition: "all 0.15s",
                    maxWidth: "calc(50% - 4px)", minWidth: 0, flex: "1 1 calc(50% - 4px)",
                  }}>
                    {(book.coverUrl || book.coverId)
                      ? <img src={book.coverUrl || `https://covers.openlibrary.org/b/id/${book.coverId}-S.jpg`} alt={book.title}
                          style={{ height: 34, aspectRatio: "2/3", objectFit: "cover", borderRadius: 3, flexShrink: 0 }} />
                      : <div style={{ height: 34, width: 23, borderRadius: 3, background: color, flexShrink: 0 }} />
                    }
                    <div style={{ minWidth: 0, textAlign: "left" }}>
                      <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 13, color: isOn ? WOOD.text : WOOD.textDim, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130 }}>{book.title}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: WOOD.textFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130 }}>{book.author}</p>
                    </div>
                    {isOn && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill={WOOD.amber} stroke="none" style={{ flexShrink: 0, marginLeft: 2 }}>
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17 5.8 21.2l2.4-7.3L2 9.4h7.6z" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            </div>
            )}
          </div>

          {/* Submit */}
          <div style={{ padding: "0 18px 22px" }}>
            <button {...tc(getRecommendations)} disabled={!canSubmit} style={{
              width: "100%", padding: "13px 0",
              background: canSubmit ? `linear-gradient(135deg, ${WOOD.amber}, #c8883a)` : "rgba(138,90,40,0.15)",
              border: "none", borderRadius: 12, cursor: canSubmit ? "pointer" : "default",
              fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700,
              color: canSubmit ? "#1a0900" : WOOD.textFaint,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s",
            }}>
              {loading
                ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(26,9,0,0.3)", borderTopColor: "#1a0900", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Finding books…</>
                : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17 5.8 21.2l2.4-7.3L2 9.4h7.6z"/></svg>Get Recommendations</>
              }
            </button>
            {selected.length === 0 && <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", marginTop: 8 }}>Select at least one book to continue</p>}
          </div>

          {/* Error */}
          {error && (
            <div style={{ margin: "0 18px 18px", padding: "12px 14px", background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.2)", borderRadius: 10 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c0392b" }}>{error}</p>
            </div>
          )}

          {/* Results */}
          {recs && recs.length > 0 && (
            <div style={{ padding: "0 18px" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Recommended for you</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[...new Map(recs.map(r => [r.title.toLowerCase(), r])).values()].map((rec, i) => (
                  <RecCard key={i} index={i} rec={rec} coverUrl={recCovers[rec.title] || books.find(b => normBookKey(b.title) === normBookKey(rec.title))?.coverUrl || null} ownedBook={books.find(b => normBookKey(b.title) === normBookKey(rec.title))} onAddDirect={onAddDirect} onEdit={onEdit} onAddBook={onAddBook} />
                ))}
              </div>
            </div>
          )}
          </>}

          {reikoMode === "authors" && <>
          {/* Author picker */}
          <div style={{ padding: "0 18px 16px" }}>
            {authorPickerCollapsed ? (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {selectedAuthors.map(author => (
                    <span key={author} style={{ padding: "4px 10px", borderRadius: 20, background: WOOD.card, border: "1px solid rgba(138,90,40,0.25)", fontFamily: "'Crimson Pro',serif", fontSize: 13, color: WOOD.textDim, whiteSpace: "nowrap" }}>{author}</span>
                  ))}
                </div>
                <button onClick={() => setAuthorPickerCollapsed(false)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", padding: 2, marginTop: 2 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
            ) : (
            <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Choose authors {selectedAuthors.length > 0 && <span style={{ color: WOOD.amber }}>({selectedAuthors.length} selected)</span>}
              </p>
              {selectedAuthors.length > 0 && (
                <button onClick={() => setSelectedAuthors([])} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", padding: 0, textDecoration: "underline" }}>Clear</button>
              )}
              <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
                {[["az", "A–Z"], ["count", "# Read"]].map(([val, label]) => (
                  <button key={val} onClick={() => { setAuthorSort(val); try { localStorage.setItem("authorSort", val); } catch {} }} style={{ padding: "2px 8px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 600, background: authorSort === val ? WOOD.amber : "rgba(255,235,195,0.12)", color: authorSort === val ? "#1a0900" : "rgba(255,255,255,0.45)", transition: "all 0.15s" }}>{label}</button>
                ))}
              </div>
              {(authorRecs || authorLoading) && <button onClick={() => setAuthorPickerCollapsed(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", padding: 2 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              </button>}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {sortedAuthors.map(author => {
                const isOn = selectedAuthors.includes(author);
                return (
                  <button key={author} onClick={() => setSelectedAuthors(s => s.includes(author) ? s.filter(a => a !== author) : [...s, author])} style={{
                    padding: "7px 14px", borderRadius: 20, fontSize: 13, fontFamily: "'Crimson Pro',serif",
                    cursor: "pointer", transition: "all 0.15s", border: "1.5px solid",
                    background: isOn ? WOOD.amber : WOOD.card,
                    color: isOn ? "#1a0900" : WOOD.textDim,
                    borderColor: isOn ? WOOD.amber : "rgba(138,90,40,0.18)",
                  }}>{author}</button>
                );
              })}
            </div>
            </div>
            )}
          </div>

          {/* Author submit */}
          <div style={{ padding: "0 18px 22px" }}>
            <button onClick={getAuthorRecommendations} disabled={!canSubmitAuthors} style={{
              width: "100%", padding: "13px 0",
              background: canSubmitAuthors ? `linear-gradient(135deg, ${WOOD.amber}, #c8883a)` : "rgba(138,90,40,0.15)",
              border: "none", borderRadius: 12, cursor: canSubmitAuthors ? "pointer" : "default",
              fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700,
              color: canSubmitAuthors ? "#1a0900" : WOOD.textFaint,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s",
            }}>
              {authorLoading
                ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(26,9,0,0.3)", borderTopColor: "#1a0900", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Finding authors…</>
                : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17 5.8 21.2l2.4-7.3L2 9.4h7.6z"/></svg>Find Authors</>
              }
            </button>
            {selectedAuthors.length === 0 && <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", marginTop: 8 }}>Select at least one author to continue</p>}
          </div>

          {/* Author error */}
          {authorError && (
            <div style={{ margin: "0 18px 18px", padding: "12px 14px", background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.2)", borderRadius: 10 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#c0392b" }}>{authorError}</p>
            </div>
          )}

          {/* Author results */}
          {authorRecs && authorRecs.length > 0 && (
            <div style={{ padding: "0 18px" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Authors to discover</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {authorRecs.map((rec, i) => (
                  <AuthorRecCard key={i} rec={rec} books={books} onAuthor={onAuthor} onEdit={onEdit} onAddBook={onAddBook} onAddDirect={onAddDirect} preloadedCovers={allCovers[i] || {}} shouldAutoExpand={autoExpanded.has(i)} />
                ))}
              </div>
            </div>
          )}
          </>}
        </>
      )}
    </div>
  );
}

const CLAUDE_100 = [
  { title:"Don Quixote", author:"Miguel de Cervantes", publishYear:1605, genre:"Fiction", pages:1023 },
  { title:"Pride and Prejudice", author:"Jane Austen", publishYear:1813, genre:"Fiction", pages:432 },
  { title:"Moby-Dick", author:"Herman Melville", publishYear:1851, genre:"Fiction", pages:654 },
  { title:"Anna Karenina", author:"Leo Tolstoy", publishYear:1878, genre:"Fiction", pages:864 },
  { title:"The Brothers Karamazov", author:"Fyodor Dostoevsky", publishYear:1880, genre:"Fiction", pages:796 },
  { title:"Crime and Punishment", author:"Fyodor Dostoevsky", publishYear:1866, genre:"Fiction", pages:671 },
  { title:"War and Peace", author:"Leo Tolstoy", publishYear:1869, genre:"Fiction", pages:1225 },
  { title:"Madame Bovary", author:"Gustave Flaubert", publishYear:1857, genre:"Fiction", pages:329 },
  { title:"Middlemarch", author:"George Eliot", publishYear:1871, genre:"Fiction", pages:785 },
  { title:"Great Expectations", author:"Charles Dickens", publishYear:1861, genre:"Fiction", pages:505 },
  { title:"Jane Eyre", author:"Charlotte Brontë", publishYear:1847, genre:"Fiction", pages:532 },
  { title:"Wuthering Heights", author:"Emily Brontë", publishYear:1847, genre:"Fiction", pages:342 },
  { title:"Les Misérables", author:"Victor Hugo", publishYear:1862, genre:"Fiction", pages:1463 },
  { title:"The Adventures of Huckleberry Finn", author:"Mark Twain", publishYear:1884, genre:"Fiction", pages:366 },
  { title:"The Picture of Dorian Gray", author:"Oscar Wilde", publishYear:1890, genre:"Fiction", pages:254 },
  { title:"Frankenstein", author:"Mary Shelley", publishYear:1818, genre:"Sci-Fi", pages:280 },
  { title:"Ulysses", author:"James Joyce", publishYear:1922, genre:"Fiction", pages:730 },
  { title:"In Search of Lost Time", author:"Marcel Proust", publishYear:1913, genre:"Fiction", pages:4215 },
  { title:"The Sound and the Fury", author:"William Faulkner", publishYear:1929, genre:"Fiction", pages:326 },
  { title:"To the Lighthouse", author:"Virginia Woolf", publishYear:1927, genre:"Fiction", pages:209 },
  { title:"Mrs. Dalloway", author:"Virginia Woolf", publishYear:1925, genre:"Fiction", pages:194 },
  { title:"The Trial", author:"Franz Kafka", publishYear:1925, genre:"Fiction", pages:255 },
  { title:"The Metamorphosis", author:"Franz Kafka", publishYear:1915, genre:"Fiction", pages:96 },
  { title:"One Hundred Years of Solitude", author:"Gabriel García Márquez", publishYear:1967, genre:"Fiction", pages:417 },
  { title:"The Magic Mountain", author:"Thomas Mann", publishYear:1924, genre:"Fiction", pages:706 },
  { title:"The Great Gatsby", author:"F. Scott Fitzgerald", publishYear:1925, genre:"Fiction", pages:180 },
  { title:"As I Lay Dying", author:"William Faulkner", publishYear:1930, genre:"Fiction", pages:267 },
  { title:"The Grapes of Wrath", author:"John Steinbeck", publishYear:1939, genre:"Fiction", pages:464 },
  { title:"To Kill a Mockingbird", author:"Harper Lee", publishYear:1960, genre:"Fiction", pages:281 },
  { title:"Invisible Man", author:"Ralph Ellison", publishYear:1952, genre:"Fiction", pages:581 },
  { title:"Catch-22", author:"Joseph Heller", publishYear:1961, genre:"Fiction", pages:453 },
  { title:"Slaughterhouse-Five", author:"Kurt Vonnegut", publishYear:1969, genre:"Fiction", pages:215 },
  { title:"Beloved", author:"Toni Morrison", publishYear:1987, genre:"Fiction", pages:321 },
  { title:"Blood Meridian", author:"Cormac McCarthy", publishYear:1985, genre:"Fiction", pages:337 },
  { title:"Lolita", author:"Vladimir Nabokov", publishYear:1955, genre:"Fiction", pages:317 },
  { title:"Their Eyes Were Watching God", author:"Zora Neale Hurston", publishYear:1937, genre:"Fiction", pages:286 },
  { title:"1984", author:"George Orwell", publishYear:1949, genre:"Sci-Fi", pages:328 },
  { title:"Brave New World", author:"Aldous Huxley", publishYear:1932, genre:"Sci-Fi", pages:311 },
  { title:"Lord of the Flies", author:"William Golding", publishYear:1954, genre:"Fiction", pages:224 },
  { title:"The Remains of the Day", author:"Kazuo Ishiguro", publishYear:1989, genre:"Fiction", pages:258 },
  { title:"Never Let Me Go", author:"Kazuo Ishiguro", publishYear:2005, genre:"Fiction", pages:288 },
  { title:"Atonement", author:"Ian McEwan", publishYear:2001, genre:"Fiction", pages:351 },
  { title:"Things Fall Apart", author:"Chinua Achebe", publishYear:1958, genre:"Fiction", pages:209 },
  { title:"The Master and Margarita", author:"Mikhail Bulgakov", publishYear:1967, genre:"Fiction", pages:412 },
  { title:"The Stranger", author:"Albert Camus", publishYear:1942, genre:"Fiction", pages:123 },
  { title:"The Plague", author:"Albert Camus", publishYear:1947, genre:"Fiction", pages:308 },
  { title:"The Unbearable Lightness of Being", author:"Milan Kundera", publishYear:1984, genre:"Fiction", pages:314 },
  { title:"Midnight's Children", author:"Salman Rushdie", publishYear:1981, genre:"Fiction", pages:647 },
  { title:"The God of Small Things", author:"Arundhati Roy", publishYear:1997, genre:"Fiction", pages:321 },
  { title:"Dune", author:"Frank Herbert", publishYear:1965, genre:"Sci-Fi", pages:688 },
  { title:"The Left Hand of Darkness", author:"Ursula K. Le Guin", publishYear:1969, genre:"Sci-Fi", pages:286 },
  { title:"Fahrenheit 451", author:"Ray Bradbury", publishYear:1953, genre:"Sci-Fi", pages:256 },
  { title:"Solaris", author:"Stanisław Lem", publishYear:1961, genre:"Sci-Fi", pages:204 },
  { title:"The Handmaid's Tale", author:"Margaret Atwood", publishYear:1985, genre:"Sci-Fi", pages:311 },
  { title:"Neuromancer", author:"William Gibson", publishYear:1984, genre:"Sci-Fi", pages:271 },
  { title:"The Lord of the Rings", author:"J.R.R. Tolkien", publishYear:1954, genre:"Fantasy", pages:1178 },
  { title:"Pedro Páramo", author:"Juan Rulfo", publishYear:1955, genre:"Fiction", pages:124 },
  { title:"Ficciones", author:"Jorge Luis Borges", publishYear:1944, genre:"Fiction", pages:174 },
  { title:"Love in the Time of Cholera", author:"Gabriel García Márquez", publishYear:1985, genre:"Fiction", pages:348 },
  { title:"The House of the Spirits", author:"Isabel Allende", publishYear:1982, genre:"Fiction", pages:433 },
  { title:"Stoner", author:"John Williams", publishYear:1965, genre:"Fiction", pages:278 },
  { title:"Gilead", author:"Marilynne Robinson", publishYear:2004, genre:"Fiction", pages:247 },
  { title:"White Noise", author:"Don DeLillo", publishYear:1985, genre:"Fiction", pages:310 },
  { title:"American Pastoral", author:"Philip Roth", publishYear:1997, genre:"Fiction", pages:423 },
  { title:"Infinite Jest", author:"David Foster Wallace", publishYear:1996, genre:"Fiction", pages:1079 },
  { title:"Giovanni's Room", author:"James Baldwin", publishYear:1956, genre:"Fiction", pages:159 },
  { title:"Doctor Zhivago", author:"Boris Pasternak", publishYear:1957, genre:"Fiction", pages:592 },
  { title:"The Tin Drum", author:"Günter Grass", publishYear:1959, genre:"Fiction", pages:600 },
  { title:"If on a winter's night a traveler", author:"Italo Calvino", publishYear:1979, genre:"Fiction", pages:260 },
  { title:"The Name of the Rose", author:"Umberto Eco", publishYear:1980, genre:"Mystery", pages:502 },
  { title:"Siddhartha", author:"Hermann Hesse", publishYear:1922, genre:"Fiction", pages:152 },
  { title:"The Old Man and the Sea", author:"Ernest Hemingway", publishYear:1952, genre:"Fiction", pages:127 },
  { title:"A Farewell to Arms", author:"Ernest Hemingway", publishYear:1929, genre:"Fiction", pages:332 },
  { title:"The Sun Also Rises", author:"Ernest Hemingway", publishYear:1926, genre:"Fiction", pages:251 },
  { title:"Disgrace", author:"J.M. Coetzee", publishYear:1999, genre:"Fiction", pages:220 },
  { title:"The Bell Jar", author:"Sylvia Plath", publishYear:1963, genre:"Fiction", pages:244 },
  { title:"Season of Migration to the North", author:"Tayeb Salih", publishYear:1966, genre:"Fiction", pages:139 },
  { title:"Silence", author:"Shusaku Endo", publishYear:1966, genre:"Fiction", pages:276 },
  { title:"The Woman in the Dunes", author:"Kobo Abe", publishYear:1964, genre:"Fiction", pages:239 },
  { title:"The Tale of Genji", author:"Murasaki Shikibu", publishYear:1000, genre:"Fiction", pages:1216 },
  { title:"Half of a Yellow Sun", author:"Chimamanda Ngozi Adichie", publishYear:2006, genre:"Fiction", pages:433 },
  { title:"A Fine Balance", author:"Rohinton Mistry", publishYear:1995, genre:"Fiction", pages:603 },
  { title:"The English Patient", author:"Michael Ondaatje", publishYear:1992, genre:"Fiction", pages:301 },
  { title:"Life and Fate", author:"Vasily Grossman", publishYear:1980, genre:"Fiction", pages:896 },
  { title:"We", author:"Yevgeny Zamyatin", publishYear:1924, genre:"Sci-Fi", pages:226 },
  { title:"Housekeeping", author:"Marilynne Robinson", publishYear:1980, genre:"Fiction", pages:219 },
  { title:"Notes from Underground", author:"Fyodor Dostoevsky", publishYear:1864, genre:"Fiction", pages:136 },
  { title:"A Passage to India", author:"E.M. Forster", publishYear:1924, genre:"Fiction", pages:362 },
  { title:"Sons and Lovers", author:"D.H. Lawrence", publishYear:1913, genre:"Fiction", pages:432 },
  { title:"The Portrait of a Lady", author:"Henry James", publishYear:1881, genre:"Fiction", pages:626 },
  { title:"Independent People", author:"Halldór Laxness", publishYear:1934, genre:"Fiction", pages:470 },
  { title:"Brideshead Revisited", author:"Evelyn Waugh", publishYear:1945, genre:"Fiction", pages:315 },
  { title:"The Road", author:"Cormac McCarthy", publishYear:2006, genre:"Fiction", pages:287 },
  { title:"East of Eden", author:"John Steinbeck", publishYear:1952, genre:"Fiction", pages:601 },
  { title:"Herzog", author:"Saul Bellow", publishYear:1964, genre:"Fiction", pages:341 },
  { title:"Go Tell It on the Mountain", author:"James Baldwin", publishYear:1953, genre:"Fiction", pages:303 },
  { title:"The Dispossessed", author:"Ursula K. Le Guin", publishYear:1974, genre:"Sci-Fi", pages:341 },
  { title:"Rebecca", author:"Daphne du Maurier", publishYear:1938, genre:"Mystery", pages:449 },
  { title:"Snow Country", author:"Yasunari Kawabata", publishYear:1956, genre:"Fiction", pages:175 },
  { title:"Dream of the Red Chamber", author:"Cao Xueqin", publishYear:1791, genre:"Fiction", pages:2339 },
];

const CLAUDE_PROSE_100 = [
  { title:"Lolita", author:"Vladimir Nabokov", publishYear:1955, genre:"Fiction", pages:317 },
  { title:"Ulysses", author:"James Joyce", publishYear:1922, genre:"Fiction", pages:730 },
  { title:"To the Lighthouse", author:"Virginia Woolf", publishYear:1927, genre:"Fiction", pages:209 },
  { title:"In Search of Lost Time", author:"Marcel Proust", publishYear:1913, genre:"Fiction", pages:4215 },
  { title:"Pale Fire", author:"Vladimir Nabokov", publishYear:1962, genre:"Fiction", pages:315 },
  { title:"Blood Meridian", author:"Cormac McCarthy", publishYear:1985, genre:"Fiction", pages:337 },
  { title:"Mrs. Dalloway", author:"Virginia Woolf", publishYear:1925, genre:"Fiction", pages:194 },
  { title:"The Sound and the Fury", author:"William Faulkner", publishYear:1929, genre:"Fiction", pages:326 },
  { title:"As I Lay Dying", author:"William Faulkner", publishYear:1930, genre:"Fiction", pages:267 },
  { title:"Their Eyes Were Watching God", author:"Zora Neale Hurston", publishYear:1937, genre:"Fiction", pages:286 },
  { title:"Beloved", author:"Toni Morrison", publishYear:1987, genre:"Fiction", pages:321 },
  { title:"Song of Solomon", author:"Toni Morrison", publishYear:1977, genre:"Fiction", pages:337 },
  { title:"One Hundred Years of Solitude", author:"Gabriel García Márquez", publishYear:1967, genre:"Fiction", pages:417 },
  { title:"Pedro Páramo", author:"Juan Rulfo", publishYear:1955, genre:"Fiction", pages:124 },
  { title:"The Waves", author:"Virginia Woolf", publishYear:1931, genre:"Fiction", pages:229 },
  { title:"Ficciones", author:"Jorge Luis Borges", publishYear:1944, genre:"Fiction", pages:174 },
  { title:"Anna Karenina", author:"Leo Tolstoy", publishYear:1878, genre:"Fiction", pages:864 },
  { title:"Madame Bovary", author:"Gustave Flaubert", publishYear:1857, genre:"Fiction", pages:329 },
  { title:"The Brothers Karamazov", author:"Fyodor Dostoevsky", publishYear:1880, genre:"Fiction", pages:796 },
  { title:"Notes from Underground", author:"Fyodor Dostoevsky", publishYear:1864, genre:"Fiction", pages:136 },
  { title:"The Stranger", author:"Albert Camus", publishYear:1942, genre:"Fiction", pages:123 },
  { title:"Absalom, Absalom!", author:"William Faulkner", publishYear:1936, genre:"Fiction", pages:313 },
  { title:"Middlemarch", author:"George Eliot", publishYear:1871, genre:"Fiction", pages:785 },
  { title:"Wuthering Heights", author:"Emily Brontë", publishYear:1847, genre:"Fiction", pages:342 },
  { title:"The Remains of the Day", author:"Kazuo Ishiguro", publishYear:1989, genre:"Fiction", pages:258 },
  { title:"Never Let Me Go", author:"Kazuo Ishiguro", publishYear:2005, genre:"Fiction", pages:288 },
  { title:"Stoner", author:"John Williams", publishYear:1965, genre:"Fiction", pages:278 },
  { title:"Gilead", author:"Marilynne Robinson", publishYear:2004, genre:"Fiction", pages:247 },
  { title:"Housekeeping", author:"Marilynne Robinson", publishYear:1980, genre:"Fiction", pages:219 },
  { title:"Atonement", author:"Ian McEwan", publishYear:2001, genre:"Fiction", pages:351 },
  { title:"The English Patient", author:"Michael Ondaatje", publishYear:1992, genre:"Fiction", pages:301 },
  { title:"Disgrace", author:"J.M. Coetzee", publishYear:1999, genre:"Fiction", pages:220 },
  { title:"Giovanni's Room", author:"James Baldwin", publishYear:1956, genre:"Fiction", pages:159 },
  { title:"Invisible Man", author:"Ralph Ellison", publishYear:1952, genre:"Fiction", pages:581 },
  { title:"The Bell Jar", author:"Sylvia Plath", publishYear:1963, genre:"Fiction", pages:244 },
  { title:"A Portrait of the Artist as a Young Man", author:"James Joyce", publishYear:1916, genre:"Fiction", pages:288 },
  { title:"Doctor Zhivago", author:"Boris Pasternak", publishYear:1957, genre:"Fiction", pages:592 },
  { title:"The Old Man and the Sea", author:"Ernest Hemingway", publishYear:1952, genre:"Fiction", pages:127 },
  { title:"A Farewell to Arms", author:"Ernest Hemingway", publishYear:1929, genre:"Fiction", pages:332 },
  { title:"The Sun Also Rises", author:"Ernest Hemingway", publishYear:1926, genre:"Fiction", pages:251 },
  { title:"A Sentimental Education", author:"Gustave Flaubert", publishYear:1869, genre:"Fiction", pages:432 },
  { title:"The Portrait of a Lady", author:"Henry James", publishYear:1881, genre:"Fiction", pages:626 },
  { title:"The Wings of the Dove", author:"Henry James", publishYear:1902, genre:"Fiction", pages:544 },
  { title:"Great Expectations", author:"Charles Dickens", publishYear:1861, genre:"Fiction", pages:505 },
  { title:"Bleak House", author:"Charles Dickens", publishYear:1853, genre:"Fiction", pages:989 },
  { title:"Pride and Prejudice", author:"Jane Austen", publishYear:1813, genre:"Fiction", pages:432 },
  { title:"Persuasion", author:"Jane Austen", publishYear:1817, genre:"Fiction", pages:261 },
  { title:"Snow Country", author:"Yasunari Kawabata", publishYear:1956, genre:"Fiction", pages:175 },
  { title:"The Sound of Waves", author:"Yukio Mishima", publishYear:1954, genre:"Fiction", pages:182 },
  { title:"The Woman in the Dunes", author:"Kobo Abe", publishYear:1964, genre:"Fiction", pages:239 },
  { title:"Silence", author:"Shusaku Endo", publishYear:1966, genre:"Fiction", pages:276 },
  { title:"Season of Migration to the North", author:"Tayeb Salih", publishYear:1966, genre:"Fiction", pages:139 },
  { title:"The Unbearable Lightness of Being", author:"Milan Kundera", publishYear:1984, genre:"Fiction", pages:314 },
  { title:"Midnight's Children", author:"Salman Rushdie", publishYear:1981, genre:"Fiction", pages:647 },
  { title:"The Magic Mountain", author:"Thomas Mann", publishYear:1924, genre:"Fiction", pages:706 },
  { title:"Siddhartha", author:"Hermann Hesse", publishYear:1922, genre:"Fiction", pages:152 },
  { title:"If on a winter's night a traveler", author:"Italo Calvino", publishYear:1979, genre:"Fiction", pages:260 },
  { title:"Invisible Cities", author:"Italo Calvino", publishYear:1972, genre:"Fiction", pages:165 },
  { title:"Love in the Time of Cholera", author:"Gabriel García Márquez", publishYear:1985, genre:"Fiction", pages:348 },
  { title:"The Master and Margarita", author:"Mikhail Bulgakov", publishYear:1967, genre:"Fiction", pages:412 },
  { title:"Don Quixote", author:"Miguel de Cervantes", publishYear:1605, genre:"Fiction", pages:1023 },
  { title:"Brideshead Revisited", author:"Evelyn Waugh", publishYear:1945, genre:"Fiction", pages:315 },
  { title:"The Picture of Dorian Gray", author:"Oscar Wilde", publishYear:1890, genre:"Fiction", pages:254 },
  { title:"Things Fall Apart", author:"Chinua Achebe", publishYear:1958, genre:"Fiction", pages:209 },
  { title:"A Passage to India", author:"E.M. Forster", publishYear:1924, genre:"Fiction", pages:362 },
  { title:"A Room with a View", author:"E.M. Forster", publishYear:1908, genre:"Fiction", pages:226 },
  { title:"Tess of the d'Urbervilles", author:"Thomas Hardy", publishYear:1891, genre:"Fiction", pages:518 },
  { title:"Far from the Madding Crowd", author:"Thomas Hardy", publishYear:1874, genre:"Fiction", pages:464 },
  { title:"The Road", author:"Cormac McCarthy", publishYear:2006, genre:"Fiction", pages:287 },
  { title:"All the Pretty Horses", author:"Cormac McCarthy", publishYear:1992, genre:"Fiction", pages:302 },
  { title:"Sula", author:"Toni Morrison", publishYear:1973, genre:"Fiction", pages:174 },
  { title:"East of Eden", author:"John Steinbeck", publishYear:1952, genre:"Fiction", pages:601 },
  { title:"The Grapes of Wrath", author:"John Steinbeck", publishYear:1939, genre:"Fiction", pages:464 },
  { title:"The House of the Spirits", author:"Isabel Allende", publishYear:1982, genre:"Fiction", pages:433 },
  { title:"The God of Small Things", author:"Arundhati Roy", publishYear:1997, genre:"Fiction", pages:321 },
  { title:"Go Tell It on the Mountain", author:"James Baldwin", publishYear:1953, genre:"Fiction", pages:303 },
  { title:"Half of a Yellow Sun", author:"Chimamanda Ngozi Adichie", publishYear:2006, genre:"Fiction", pages:433 },
  { title:"The Hour of the Star", author:"Clarice Lispector", publishYear:1977, genre:"Fiction", pages:96 },
  { title:"Orlando", author:"Virginia Woolf", publishYear:1928, genre:"Fiction", pages:294 },
  { title:"The Trial", author:"Franz Kafka", publishYear:1925, genre:"Fiction", pages:255 },
  { title:"Light in August", author:"William Faulkner", publishYear:1932, genre:"Fiction", pages:507 },
  { title:"Ada, or Ardor", author:"Vladimir Nabokov", publishYear:1969, genre:"Fiction", pages:589 },
  { title:"Steppenwolf", author:"Hermann Hesse", publishYear:1927, genre:"Fiction", pages:218 },
  { title:"The Name of the Rose", author:"Umberto Eco", publishYear:1980, genre:"Mystery", pages:502 },
  { title:"Independent People", author:"Halldór Laxness", publishYear:1934, genre:"Fiction", pages:470 },
  { title:"Doctor Faustus", author:"Thomas Mann", publishYear:1947, genre:"Fiction", pages:534 },
  { title:"Life and Fate", author:"Vasily Grossman", publishYear:1980, genre:"Fiction", pages:896 },
  { title:"Waiting for the Barbarians", author:"J.M. Coetzee", publishYear:1980, genre:"Fiction", pages:156 },
  { title:"The Buried Giant", author:"Kazuo Ishiguro", publishYear:2015, genre:"Fiction", pages:317 },
  { title:"The Line of Beauty", author:"Alan Hollinghurst", publishYear:2004, genre:"Fiction", pages:438 },
  { title:"The Corrections", author:"Jonathan Franzen", publishYear:2001, genre:"Fiction", pages:566 },
  { title:"American Pastoral", author:"Philip Roth", publishYear:1997, genre:"Fiction", pages:423 },
  { title:"The Plot Against America", author:"Philip Roth", publishYear:2004, genre:"Fiction", pages:391 },
  { title:"Herzog", author:"Saul Bellow", publishYear:1964, genre:"Fiction", pages:341 },
  { title:"The Tin Drum", author:"Günter Grass", publishYear:1959, genre:"Fiction", pages:600 },
  { title:"Jane Eyre", author:"Charlotte Brontë", publishYear:1847, genre:"Fiction", pages:532 },
  { title:"Les Misérables", author:"Victor Hugo", publishYear:1862, genre:"Fiction", pages:1463 },
  { title:"War and Peace", author:"Leo Tolstoy", publishYear:1869, genre:"Fiction", pages:1225 },
  { title:"Água Viva", author:"Clarice Lispector", publishYear:1973, genre:"Fiction", pages:96 },
  { title:"Dream of the Red Chamber", author:"Cao Xueqin", publishYear:1791, genre:"Fiction", pages:2339 },
];

// Canned lists available as static JSON files in /public/rankings/
// Key format: {genre-lowercase-hyphenated}-{rankingMode}-{scoreCategory}
const CANNED_LISTS = new Set([
  "fantasy-vacuum-all",
  "fantasy-alltime-all",
  "sci-fi-vacuum-all",
  "sci-fi-alltime-all",
  "fiction-vacuum-all",
  "fiction-alltime-all",
  "non-fiction-alltime-all",
  "non-fiction-vacuum-all",
]);
function cannedKey(genre, rankingMode, scoreCategory) {
  return `${genre.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${rankingMode}-${scoreCategory}`;
}
const cannedCoversCache = {};

const CLAUDE100_CACHE_KEY = "claude100_covers_v1";
let claude100CoversCache = (() => {
  try { const s = localStorage.getItem(CLAUDE100_CACHE_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
})();

const CLAUDEPROSE100_CACHE_KEY = "claudeprose100_covers_v1";
let claudeProse100CoversCache = (() => {
  try { const s = localStorage.getItem(CLAUDEPROSE100_CACHE_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
})();

const SCORE_CATEGORIES = [
  { key:"all",          label:"All" },
  { key:"prose",        label:"Prose" },
  { key:"plot",         label:"Plot" },
  { key:"characters",   label:"Characters" },
  { key:"pacing",       label:"Pacing" },
  { key:"worldBuilding",label:"World" },
  { key:"dialogue",     label:"Dialogue" },
  { key:"ending",       label:"Ending" },
];

function RankingsTab({ books, onSaveScores, userId, onAddBook, onAddDirect, onShelfChange, onEdit }) {
  const [mode, setMode] = useState("user");
  const [genreFilter, setGenreFilter] = useState("All");
  const [topN, setTopN] = useState(10);
  const [scoreCategory, setScoreCategory] = useState("all");
  // Global order: all read book IDs ranked. null = use default (rating desc).
  const [userOrder, setUserOrder] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [controlsOpen, setControlsOpen] = useState(true);
  const [aiItems, setAiItems] = useState([]);
  const [rankingMode, setRankingMode] = useState("alltime");
  const fetchSession = useRef(0);

  const readBooks = useMemo(() =>
    books.filter(b => (b.shelf || "Read") === "Read"),
    [books]
  );

  const userGenres = useMemo(() => {
    const genres = [...new Set(readBooks.map(b => b.genre).filter(Boolean))].sort();
    return ["All", ...genres];
  }, [readBooks]);

  const availableGenres = mode === "ai" ? ["All", ...GENRES.filter(g => g !== "Other")] : userGenres;

  // Default global order: all read books sorted by rating desc
  const defaultAllOrderIds = useMemo(() =>
    [...readBooks].sort((a, b) => (b.rating || 0) - (a.rating || 0)).map(b => b.id),
    [readBooks]
  );

  // Load saved user ranking from Supabase on mount
  useEffect(() => {
    if (!userId) return;
    supabase.from("user_rankings").select("user_order").eq("user_id", userId).single()
      .then(({ data, error }) => {
        console.log("[rankings load]", { data, error, userId });
        if (data?.user_order?.length) setUserOrder(data.user_order);
      });
  }, [userId]);

  // Load saved AI ranking from Supabase when AI filters change (topN is just a view slice)
  useEffect(() => {
    if (!userId || mode !== "ai") return;
    const sid = ++fetchSession.current;
    if (rankingMode === "alltime") {
      if (genreFilter === "All" && scoreCategory === "all") {
        const base = claude100CoversCache || CLAUDE_100;
        setAiItems(base);
        setGenerated(true);
        if (!claude100CoversCache) fetchClaude100Covers(CLAUDE_100, setAiItems, sid);
        return;
      }
      if (genreFilter === "All" && scoreCategory === "prose") {
        const base = claudeProse100CoversCache || CLAUDE_PROSE_100;
        setAiItems(base);
        setGenerated(true);
        if (!claudeProse100CoversCache) fetchProse100Covers(CLAUDE_PROSE_100, setAiItems, sid);
        return;
      }
      // Check canned list before falling back to Supabase
      if (CANNED_LISTS.has(cannedKey(genreFilter, rankingMode, scoreCategory))) {
        const key = cannedKey(genreFilter, rankingMode, scoreCategory);
        const base = cannedCoversCache[key] || [];
        setAiItems(base);
        setGenerated(base.length > 0);
        fetchCannedList(genreFilter, rankingMode, scoreCategory, (items) => { setAiItems(items); setGenerated(true); }, sid);
        return;
      }
      // Other alltime combos: load from Supabase cache
      setGenerated(false);
      setAiItems([]);
      supabase.from("ai_rankings")
        .select("items")
        .eq("user_id", userId)
        .eq("genre", genreFilter)
        .eq("category", scoreCategory)
        .single()
        .then(({ data }) => {
          if (data?.items?.length) { setAiItems(data.items); setGenerated(true); }
        });
    } else if (rankingMode !== "foryou" && CANNED_LISTS.has(cannedKey(genreFilter, rankingMode, scoreCategory))) {
      const key = cannedKey(genreFilter, rankingMode, scoreCategory);
      const base = cannedCoversCache[key] || [];
      setAiItems(base);
      setGenerated(base.length > 0);
      fetchCannedList(genreFilter, rankingMode, scoreCategory, (items) => { setAiItems(items); setGenerated(true); }, sid);
    } else {
      // vacuum / foryou without canned list — require explicit generate
      setGenerated(false);
      setAiItems([]);
    }
  }, [userId, mode, genreFilter, topN, scoreCategory, rankingMode]);

  const bookMap = useMemo(() => new Map(books.map(b => [b.id, b])), [books]);

  // User ranked list: global order → filter by genre → cap to topN
  const userRankedBooks = useMemo(() => {
    const allIds = userOrder || defaultAllOrderIds;
    const allOrdered = allIds.map(id => bookMap.get(id)).filter(Boolean);
    const filtered = genreFilter === "All" ? allOrdered : allOrdered.filter(b => b.genre === genreFilter);
    const cap = topN === "all" ? filtered.length : topN;
    return filtered.slice(0, cap);
  }, [userOrder, defaultAllOrderIds, bookMap, genreFilter, topN]);

  function moveBook(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= userRankedBooks.length) return;
    const bookA = userRankedBooks[i];
    const bookB = userRankedBooks[j];
    const globalIds = userOrder || defaultAllOrderIds;
    const posA = globalIds.indexOf(bookA.id);
    const posB = globalIds.indexOf(bookB.id);
    if (posA === -1 || posB === -1) return;
    const next = globalIds.slice();
    [next[posA], next[posB]] = [next[posB], next[posA]];
    setUserOrder(next);
    if (userId && userId !== "guest") supabase.from("user_rankings")
      .upsert({ user_id: userId, user_order: next }, { onConflict: "user_id" })
      .then(({ error }) => console.log("[rankings save]", error || "ok"));
  }

  async function fetchClaude100Covers(items, onUpdate, sid) {
    if (claude100CoversCache) { if (fetchSession.current === sid) onUpdate(claude100CoversCache); return; }
    const enriched = items.map(i => ({ ...i }));
    const BATCH = 5;
    for (let b = 0; b < enriched.length; b += BATCH) {
      if (fetchSession.current !== sid) return;
      await Promise.all(enriched.slice(b, b + BATCH).map(async item => {
        if (item.coverUrl) return;
        try {
          const r = await fetch("/api/fetch-cover", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ title: item.title, author: item.author }) });
          const d = await r.json();
          item.coverUrl = d.coverUrl || null;
        } catch { /* leave null */ }
      }));
      if (fetchSession.current !== sid) return;
      onUpdate([...enriched]);
      if (b + BATCH < enriched.length) await new Promise(r => setTimeout(r, 200));
    }
    if (fetchSession.current !== sid) return;
    claude100CoversCache = enriched;
    try { localStorage.setItem(CLAUDE100_CACHE_KEY, JSON.stringify(enriched)); } catch { /* storage full */ }
    onUpdate([...enriched]);
  }

  async function fetchProse100Covers(items, onUpdate, sid) {
    if (claudeProse100CoversCache) { if (fetchSession.current === sid) onUpdate(claudeProse100CoversCache); return; }
    const enriched = items.map(i => ({ ...i }));
    const BATCH = 5;
    for (let b = 0; b < enriched.length; b += BATCH) {
      if (fetchSession.current !== sid) return;
      await Promise.all(enriched.slice(b, b + BATCH).map(async item => {
        if (item.coverUrl) return;
        try {
          const r = await fetch("/api/fetch-cover", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ title: item.title, author: item.author }) });
          const d = await r.json();
          item.coverUrl = d.coverUrl || null;
        } catch { /* leave null */ }
      }));
      if (fetchSession.current !== sid) return;
      onUpdate([...enriched]);
      if (b + BATCH < enriched.length) await new Promise(r => setTimeout(r, 200));
    }
    if (fetchSession.current !== sid) return;
    claudeProse100CoversCache = enriched;
    try { localStorage.setItem(CLAUDEPROSE100_CACHE_KEY, JSON.stringify(enriched)); } catch { /* storage full */ }
    onUpdate([...enriched]);
  }

  async function fetchCannedList(genre, rankingMode, scoreCategory, onUpdate, sid) {
    const key = cannedKey(genre, rankingMode, scoreCategory);
    const cacheKey = `canned_${key}_v2`;
    if (cannedCoversCache[key]) { if (fetchSession.current === sid) onUpdate(cannedCoversCache[key]); return; }
    let cached = null;
    try { const s = localStorage.getItem(cacheKey); cached = s ? JSON.parse(s) : null; } catch {}
    if (cached) { cannedCoversCache[key] = cached; if (fetchSession.current === sid) onUpdate(cached); return; }
    try {
      const r = await fetch(`/rankings/${key}.json`);
      if (!r.ok) return;
      const items = await r.json();
      if (fetchSession.current !== sid) return;
      onUpdate(items);
      const enriched = items.map(i => ({ ...i }));
      const BATCH = 5;
      for (let b = 0; b < enriched.length; b += BATCH) {
        if (fetchSession.current !== sid) return;
        await Promise.all(enriched.slice(b, b + BATCH).map(async item => {
          if (item.coverUrl) return;
          try {
            const r = await fetch("/api/fetch-cover", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ title: item.title, author: item.author }) });
            const d = await r.json();
            item.coverUrl = d.coverUrl || null;
          } catch {}
        }));
        if (fetchSession.current !== sid) return;
        onUpdate([...enriched]);
        if (b + BATCH < enriched.length) await new Promise(r => setTimeout(r, 200));
      }
      if (fetchSession.current !== sid) return;
      cannedCoversCache[key] = enriched;
      try { localStorage.setItem(cacheKey, JSON.stringify(enriched)); } catch {}
      onUpdate([...enriched]);
    } catch {}
  }

  async function generateAIRankings() {
    const sid = ++fetchSession.current;
    if (rankingMode === "alltime") {
      if (genreFilter === "All" && scoreCategory === "all") {
        const base = claude100CoversCache || CLAUDE_100;
        setAiItems(base);
        setGenerated(true);
        if (!claude100CoversCache) fetchClaude100Covers(CLAUDE_100, setAiItems, sid);
        return;
      }
      if (genreFilter === "All" && scoreCategory === "prose") {
        const base = claudeProse100CoversCache || CLAUDE_PROSE_100;
        setAiItems(base);
        setGenerated(true);
        if (!claudeProse100CoversCache) fetchProse100Covers(CLAUDE_PROSE_100, setAiItems, sid);
        return;
      }
    }
    if (rankingMode !== "foryou" && CANNED_LISTS.has(cannedKey(genreFilter, rankingMode, scoreCategory))) {
      fetchCannedList(genreFilter, rankingMode, scoreCategory, (items) => { setAiItems(items); setGenerated(true); }, sid);
      return;
    }
    setGenerating(true);
    try {
      const library = rankingMode === "foryou"
        ? books.filter(b => b.rating > 0).map(b => ({ title: b.title, author: b.author, genre: b.genre, rating: b.rating, likedAspects: b.likedAspects || [], dislikedAspects: b.dislikedAspects || [] }))
        : [];
      const res = await fetch("/api/ai-rankings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre: genreFilter, category: scoreCategory, rankingMode, library }),
      });
      const data = await res.json();
      if (!data.error) {
        const items = data.items || [];
        setAiItems(items);
        setGenerated(true);

        const unmatched = items.filter(item => !findInLibrary(item.title));
        const itemsWithCovers = items.map(i => ({ ...i }));
        const BATCH = 5;
        for (let b = 0; b < unmatched.length; b += BATCH) {
          if (fetchSession.current !== sid) break;
          await Promise.all(unmatched.slice(b, b + BATCH).map(async item => {
            try {
              const r = await fetch("/api/fetch-cover", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: item.title, author: item.author }),
              });
              const d = await r.json();
              const idx = itemsWithCovers.findIndex(x => x.title === item.title && x.author === item.author);
              if (idx !== -1) itemsWithCovers[idx].coverUrl = d.coverUrl || null;
            } catch { /* leave coverUrl as-is */ }
          }));
          if (b + BATCH < unmatched.length) await new Promise(r => setTimeout(r, 200));
        }
        if (fetchSession.current === sid) setAiItems([...itemsWithCovers]);
        // Only cache alltime results to Supabase
        if (rankingMode === "alltime" && userId && userId !== "guest") {
          supabase.from("ai_rankings")
            .upsert({ user_id: userId, genre: genreFilter, category: scoreCategory, items: itemsWithCovers, generated_at: new Date().toISOString() }, { onConflict: "user_id,genre,category" })
            .then(({ error }) => console.log("[ai_rankings save]", error || "ok"));
        }
      }
    } catch (e) { console.error(e); }
    setGenerating(false);
  }

  const aiDisplayItems = generated ? (topN === "all" ? aiItems : aiItems.slice(0, Number(topN))) : [];
  const displayList = mode === "user" ? userRankedBooks : aiDisplayItems;

  // Library cross-reference for AI mode
  const libTitleMap = useMemo(() => {
    const m = new Map();
    for (const b of books) m.set((b.title || "").toLowerCase().replace(/[^a-z0-9]/g, ""), b);
    return m;
  }, [books]);

  function findInLibrary(title) {
    const key = (title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return libTitleMap.get(key) || null;
  }

  const rankBadgeStyle = (i) => ({
    fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700,
    color: i === 0 ? "#1a0900" : i === 1 ? "#1a0900" : i === 2 ? "#1a0900" : "rgba(255,255,255,0.75)",
    userSelect: "none",
    background: i === 0 ? "rgba(212,170,80,0.85)"
               : i === 1 ? "rgba(180,180,180,0.75)"
               : i === 2 ? "rgba(180,120,60,0.75)"
               : "rgba(138,90,40,0.45)",
    border: "1px solid rgba(200,144,90,0.35)",
    borderRadius: "50%",
    width: 24, height: 24,
    display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(4px)",
    lineHeight: 1, paddingTop: 1,
    flexShrink: 0,
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden", position:"relative" }}>
      {/* Controls header */}
      <div style={{ padding:"12px 16px 10px", flexShrink:0, background:"rgba(50,28,12,0.7)", borderBottom:"1px solid rgba(200,144,90,0.15)" }}>
        {/* Mode toggle + view toggle */}
        <div style={{ display:"flex", gap:6, marginBottom: controlsOpen ? 10 : 0, alignItems:"center" }}>
          {controlsOpen
            ? [["user","Your Ranking"],["ai","AI Ranking"]].map(([m, label]) => (
                <button key={m} {...tc(() => { setMode(m); if (m === "ai") { setGenerated(false); setGenreFilter("Fiction"); setTopN("all"); } else { setGenreFilter("All"); } })} style={{
                  padding:"5px 14px", borderRadius:20, border:"none", cursor:"pointer",
                  background: mode===m ? WOOD.amber : "rgba(255,235,195,0.12)",
                  color: mode===m ? "#1a0900" : "rgba(255,235,195,0.6)",
                  fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
                  transition:"all 0.15s",
                }}>{label}</button>
              ))
            : <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(255,235,195,0.75)", fontStyle:"italic" }}>
                {`${mode === "user" ? "Your" : "AI"} Top ${topN === "all" ? 50 : topN}${genreFilter !== "All" ? ` ${genreFilter}` : ""} Books${mode === "ai" && scoreCategory !== "all" ? ` · ${SCORE_CATEGORIES.find(c => c.key === scoreCategory)?.label || scoreCategory}` : ""}`}
              </span>
          }
          <div style={{ display:"flex", gap:6, marginLeft:"auto" }}>
            <button {...tc(()=>setViewMode(v=>v==="card"?"row":"card"), true)} style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              background:"rgba(15,8,2,0.55)", borderRadius:20, padding:"5px 10px",
              border:"1px solid rgba(120,70,20,0.3)", backdropFilter:"blur(4px)",
              cursor:"pointer", color:"#fff",
            }}>
              {viewMode==="card"
                ? <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><rect x="0" y="0" width="13" height="3" rx="1.5"/><rect x="0" y="5" width="13" height="3" rx="1.5"/><rect x="0" y="10" width="13" height="3" rx="1.5"/></svg>
                : <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="7" y="0" width="6" height="6" rx="1"/><rect x="0" y="7" width="6" height="6" rx="1"/><rect x="7" y="7" width="6" height="6" rx="1"/></svg>
              }
            </button>
            <button {...tc(()=>setControlsOpen(o=>!o), true)} style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              background:"rgba(15,8,2,0.55)", borderRadius:20, padding:"5px 10px",
              border:"1px solid rgba(120,70,20,0.3)", backdropFilter:"blur(4px)",
              cursor:"pointer", color:"#fff",
            }}>
              <svg width="11" height="7" viewBox="0 0 11 7" fill="currentColor" style={{ transition:"transform 0.2s", transform: controlsOpen ? "rotate(0deg)" : "rotate(180deg)" }}>
                <path d="M1 6l4.5-5L10 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsible filters */}
        {controlsOpen && <div>

        {/* Filters row */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center", marginBottom: mode==="ai" ? 8 : 0 }}>
          {/* Top N */}
          {[10, 20, "all"].map(n => (
            <button key={n} {...tc(() => { setTopN(n); setGenerated(false); })} style={{
              padding:"3px 10px", borderRadius:20,
              border:`1px solid ${topN===n ? WOOD.amber : "rgba(255,235,195,0.22)"}`,
              background: topN===n ? WOOD.amber : "transparent",
              color: topN===n ? "#1a0900" : "rgba(255,235,195,0.6)",
              fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:600, cursor:"pointer",
              transition:"all 0.15s",
            }}>{n === "all" ? "All" : `Top ${n}`}</button>
          ))}
          <span style={{ color:"rgba(255,235,195,0.25)", fontSize:14 }}>|</span>
          {/* Genre */}
          <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
            <select value={genreFilter} onChange={e => { setGenreFilter(e.target.value); setGenerated(false); }} style={{
              padding:"3px 22px 3px 9px", borderRadius:20,
              border:"1px solid rgba(255,235,195,0.22)",
              background:"rgba(255,235,195,0.08)", color:"rgba(255,235,195,0.75)",
              fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer",
              appearance:"none", WebkitAppearance:"none",
            }}>
              {availableGenres.map(g => <option key={g} value={g} style={{ background:"#5a3820" }}>{g}</option>)}
            </select>
            <svg style={{ position:"absolute", right:7, pointerEvents:"none" }} width="8" height="5" viewBox="0 0 8 5">
              <path d="M0 0l4 5 4-5z" fill="rgba(255,235,195,0.5)"/>
            </svg>
          </div>
        </div>

        {/* AI: ranking mode + category */}
        {mode === "ai" && (
          <div style={{ display:"flex", gap:4, alignItems:"center", flexWrap:"wrap", marginBottom:8, paddingTop:8, borderTop:"1px solid rgba(200,144,90,0.15)" }}>
            {[["alltime","All Time"],["vacuum","Vacuum"],["foryou","For You"]].map(([m, label]) => (
              <button key={m} {...tc(() => { setRankingMode(m); setGenerated(false); setAiItems([]); })} style={{
                padding:"3px 10px", borderRadius:20,
                border:`1px solid ${rankingMode===m ? WOOD.amber : "rgba(255,235,195,0.18)"}`,
                background: rankingMode===m ? WOOD.amber : "transparent",
                color: rankingMode===m ? "#1a0900" : "rgba(255,235,195,0.5)",
                fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600, cursor:"pointer",
                transition:"all 0.15s",
              }}>{label}</button>
            ))}
            <span style={{ color:"rgba(255,235,195,0.25)", fontSize:14 }}>|</span>
            <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
              <select value={scoreCategory} onChange={e => { setScoreCategory(e.target.value); setGenerated(false); }} style={{
                padding:"3px 22px 3px 9px", borderRadius:20,
                border:"1px solid rgba(255,235,195,0.22)",
                background:"rgba(255,235,195,0.08)", color:"rgba(255,235,195,0.75)",
                fontFamily:"'DM Sans',sans-serif", fontSize:11, cursor:"pointer",
                appearance:"none", WebkitAppearance:"none",
              }}>
                {SCORE_CATEGORIES.map(({ key, label }) => <option key={key} value={key} style={{ background:"#5a3820" }}>{label}</option>)}
              </select>
              <svg style={{ position:"absolute", right:7, pointerEvents:"none" }} width="8" height="5" viewBox="0 0 8 5">
                <path d="M0 0l4 5 4-5z" fill="rgba(255,235,195,0.5)"/>
              </svg>
            </div>
          </div>
        )}

        {/* AI: generate button */}
        {mode === "ai" && (
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button {...tc(generating ? ()=>{} : generateAIRankings)} style={{
              padding:"7px 18px", borderRadius:20,
              background: generating ? "rgba(184,104,0,0.45)" : WOOD.amber,
              color: "#1a0900", border:"none", cursor: generating ? "default" : "pointer",
              fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600,
              opacity: generating ? 0.7 : 1, transition:"all 0.15s",
            }}>
              {generating ? "Generating…" : generated ? "Regenerate" : "Generate Rankings"}
            </button>
            {generated && !generating && (
              <span style={{ fontSize:12, color:"rgba(255,235,195,0.45)", fontFamily:"'DM Sans',sans-serif" }}>
                {aiDisplayItems.length} of {aiItems.length}
              </span>
            )}
          </div>
        )}
        </div>}
      </div>

      {/* Book list */}
      <div style={{ flex:1, overflowY:"auto", padding:"4px 0 20px" }}>
        {displayList.length === 0 && (
          <div style={{ textAlign:"center", padding:"48px 24px" }}>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, fontStyle:"italic", color:"rgba(255,235,195,0.35)" }}>
              {mode === "ai"
                ? "Select options and hit Generate Rankings"
                : readBooks.length === 0 ? "No read books yet" : "No books match this filter"}
            </p>
          </div>
        )}

        {/* User ranking list */}
        {mode === "user" && displayList.map((book, i) => (
          <div key={i} style={{ display:"flex", alignItems:"stretch" }}>
            <div style={{
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              width:36, flexShrink:0, paddingBottom: viewMode==="row" ? 0 : 10, gap:2,
            }}>
              {viewMode === "card" && (
                <button
                  onTouchEnd={e=>{ e.preventDefault(); e.stopPropagation(); if(i>0) moveBook(i,-1); }}
                  onClick={e=>{ e.stopPropagation(); if(i>0) moveBook(i,-1); }}
                  disabled={i===0} style={{
                  background:"none", border:"none", cursor: i===0 ? "default" : "pointer",
                  color: i===0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)",
                  fontSize:14, lineHeight:1, padding:"10px 0", width:"100%",
                }}>▲</button>
              )}
              <span style={rankBadgeStyle(i)}>{i + 1}</span>
              {viewMode === "card" && (
                <button
                  onTouchEnd={e=>{ e.preventDefault(); e.stopPropagation(); if(i<displayList.length-1) moveBook(i,1); }}
                  onClick={e=>{ e.stopPropagation(); if(i<displayList.length-1) moveBook(i,1); }}
                  disabled={i===displayList.length-1} style={{
                  background:"none", border:"none", cursor: i===displayList.length-1 ? "default" : "pointer",
                  color: i===displayList.length-1 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)",
                  fontSize:14, lineHeight:1, padding:"10px 0", width:"100%",
                }}>▼</button>
              )}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              {viewMode === "row"
                ? <BookRow key={book.id} book={book} index={i} onEdit={onEdit} onRemove={null} onShelfChange={onShelfChange} />
                : <BookCard key={book.id} book={book} index={i} onRemove={()=>{}} onEdit={onEdit} onShelfChange={()=>{}} onOpenShelfPicker={()=>{}} onSaveScores={onSaveScores} onSaveDescription={()=>{}} libraryProfile={books.filter(b => b.shelf === "Read" || b.shelf === "DNF")} userId={userId} />
              }
            </div>
          </div>
        ))}

        {/* AI ranking list */}
        {mode === "ai" && generated && aiDisplayItems.map((item, i) => {
          const matched = findInLibrary(item.title);
          const bookObj = (matched && !matched.coverUrl && item.coverUrl) ? { ...matched, coverUrl: item.coverUrl } : matched || {
            id: `ai_${i}`,
            title: item.title,
            author: item.author,
            genre: genreFilter !== "All" ? genreFilter : (item.genre || "Other"),
            shelf: null,
            rating: 0,
            pages: item.pages || 0,
            coverUrl: item.coverUrl || null,
            description: item.reason || null,
            publishYear: item.publishYear || null,
          };
          return (
            <div key={i} style={{ display:"flex", alignItems:"stretch" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:36, flexShrink:0, paddingBottom:10, gap:2 }}>
                <span style={rankBadgeStyle(i)}>{i + 1}</span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                {viewMode === "row"
                  ? <BookRow key={bookObj.id} book={bookObj} index={i} onEdit={matched ? onEdit : null} onRemove={null} onShelfChange={matched ? onShelfChange : ()=>{}} onAdd={matched ? undefined : (s) => onAddDirect({ title:item.title, author:item.author, genre:genreFilter !== "All" ? genreFilter : "Other", pages:0, rating:0, coverUrl:item.coverUrl||null }, s)} />
                  : <BookCard
                      key={bookObj.id}
                      book={bookObj}
                      index={i}
                      onRemove={()=>{}} onEdit={matched ? onEdit : (b)=>onAddBook(b)} onShelfChange={()=>{}} onOpenShelfPicker={()=>{}}
                      onSaveScores={matched ? onSaveScores : ()=>{}} onSaveDescription={()=>{}}
                      forceProse
                      onAdd={matched ? undefined : (shelf) => onAddDirect({ title:item.title, author:item.author, genre: genreFilter !== "All" ? genreFilter : (item.genre || "Other"), pages:0, rating:0, coverUrl:item.coverUrl||null }, shelf)}
                      libraryProfile={books.filter(b => b.shelf === "Read" || b.shelf === "DNF")}
                      userId={userId}
                    />
                }
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function StatsTab({ books }) {
  const [timeline, setTimeline] = useState("All");
  const [filterMonth, setFilterMonth] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);
  const [groupBy, setGroupBy] = useState(null);
  const [groupOpen, setGroupOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const availableYears = useMemo(() => {
    const years = [...new Set(books.filter(b=>(b.shelf||"Read")==="Read").map(b=>b.date?.slice(0,4)).filter(Boolean))];
    return years.sort((a,b)=>b.localeCompare(a));
  }, [books]);

  const availableMonths = useMemo(() => {
    const base = books.filter(b=>(b.shelf||"Read")==="Read" && (timeline==="All" || b.date?.startsWith(timeline)));
    const months = [...new Set(base.map(b=>b.date?.slice(5,7)).filter(Boolean))];
    return months.sort();
  }, [books, timeline]);

  const filteredBooks = useMemo(() => {
    let readBooks = books.filter(b => (b.shelf || "Read") === "Read");
    if (timeline !== "All") readBooks = readBooks.filter(b => b.date?.startsWith(timeline));
    if (filterMonth !== null) readBooks = readBooks.filter(b => b.date?.slice(5,7) === filterMonth);
    if (ratingFilter !== null) readBooks = readBooks.filter(b => b.rating === ratingFilter);
    if (genreFilter !== null) readBooks = readBooks.filter(b => b.genre === genreFilter);
    return readBooks.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [books, timeline, filterMonth, ratingFilter, genreFilter]);

  const stats = useMemo(() => {
    const totalPages = filteredBooks.reduce((s,b)=>s+(b.pages||0),0);
    const avgRating = filteredBooks.length ? filteredBooks.reduce((s,b)=>s+b.rating,0)/filteredBooks.length : 0;
    const genreMap={}, genrePages={}, genreRatingSum={};
    filteredBooks.forEach(b=>{ genreMap[b.genre]=(genreMap[b.genre]||0)+1; genrePages[b.genre]=(genrePages[b.genre]||0)+(b.pages||0); if(b.rating) genreRatingSum[b.genre]=(genreRatingSum[b.genre]||0)+b.rating; });
    const authorMap = {};
    filteredBooks.forEach(b=>{ if(b.author) authorMap[b.author]=(authorMap[b.author]||0)+1; });
    const topAuthor = Object.entries(authorMap).sort((a,b)=>b[1]-a[1])[0] || null;
    const longestBook = filteredBooks.filter(b=>b.pages>0).sort((a,b)=>b.pages-a.pages)[0] || null;
    return { totalPages, avgRating, genreMap, genrePages, genreRatingSum, topAuthor, longestBook };
  }, [filteredBooks]);
  const topGenres = Object.entries(stats.genreMap).sort((a,b)=>b[1]-a[1]);

  const groupedBooks = useMemo(() => {
    if (!groupBy) return null;
    const groups = {};
    filteredBooks.forEach(b => {
      let key;
      if (groupBy === "rating") key = b.rating ? `${b.rating} ★` : "Unrated";
      else if (groupBy === "genre") key = b.genre || "Other";
      else if (groupBy === "year") key = b.date?.slice(0,4) || "Unknown";
      else if (groupBy === "month") { const m = b.date?.slice(5,7); key = m ? MONTH_NAMES[parseInt(m,10)-1] + " " + (b.date?.slice(0,4)||"") : "Unknown"; }
      if (!groups[key]) groups[key] = [];
      groups[key].push(b);
    });
    if (groupBy === "rating") return Object.entries(groups).sort((a,b) => parseFloat(b[0]) - parseFloat(a[0]));
    if (groupBy === "year") return Object.entries(groups).sort((a,b) => b[0].localeCompare(a[0]));
    if (groupBy === "month") return Object.entries(groups).sort((a,b) => b[0].localeCompare(a[0]));
    return Object.entries(groups).sort((a,b) => b[1].length - a[1].length);
  }, [filteredBooks, groupBy]);

  const card = { background:"rgba(255,235,195,0.72)", backdropFilter:"blur(6px)", borderRadius:14, border:`1px solid rgba(160,100,40,0.3)`, boxShadow:"0 2px 8px rgba(0,0,0,0.12)" };

  async function exportShelfImage() {
    setExporting(true);
    const COLS = 5, CW = 80, CH = 120, GAP = 8, PAD = 20, LABEL_H = 36;
    const sections = groupedBooks
      ? groupedBooks.map(([key, bks]) => ({ key, bks }))
      : [{ key: null, bks: filteredBooks }];

    const canvasW = PAD * 2 + COLS * CW + (COLS - 1) * GAP;
    let canvasH = PAD;
    sections.forEach(({ key, bks }) => {
      if (key) canvasH += LABEL_H;
      canvasH += Math.ceil(bks.length / COLS) * (CH + GAP);
    });
    canvasH += PAD + 28; // footer

    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");

    // background
    const bg = ctx.createLinearGradient(0, 0, 0, canvasH);
    bg.addColorStop(0, "#7a4820"); bg.addColorStop(1, "#4a2808");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, canvasW, canvasH);

    // load covers
    const loadImg = url => new Promise(res => {
      const img = new Image(); img.crossOrigin = "anonymous";
      img.onload = () => res(img); img.onerror = () => res(null);
      img.src = url;
    });
    const allBooks = sections.flatMap(s => s.bks);
    const imgMap = {};
    await Promise.all(allBooks.map(async b => {
      const url = b.coverUrl || (b.coverId ? `https://covers.openlibrary.org/b/id/${b.coverId}-M.jpg` : null);
      if (url) imgMap[b.id] = await loadImg(url);
    }));

    function clipRoundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
      ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
      ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
      ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
    }

    let y = PAD;
    for (const { key, bks } of sections) {
      if (key) {
        ctx.fillStyle = "#f5c97a";
        ctx.font = "bold 16px 'Georgia', serif";
        ctx.fillText(key, PAD, y + 22);
        y += LABEL_H;
      }
      bks.forEach((b, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const x = PAD + col * (CW + GAP), by = y + row * (CH + GAP);
        ctx.save(); clipRoundRect(x, by, CW, CH, 4); ctx.clip();
        if (imgMap[b.id]) {
          ctx.drawImage(imgMap[b.id], x, by, CW, CH);
        } else {
          ctx.fillStyle = GENRE_COLORS[b.genre] || "#8a5a28";
          ctx.fillRect(x, by, CW, CH);
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.font = "9px sans-serif";
          const words = b.title.split(" ");
          let line = "", lineY = by + CH/2 - 8;
          words.forEach(w => {
            const test = line ? line + " " + w : w;
            if (ctx.measureText(test).width > CW - 8) { ctx.fillText(line, x+4, lineY); line = w; lineY += 13; }
            else line = test;
          });
          if (line) ctx.fillText(line, x+4, lineY);
        }
        ctx.restore();
      });
      y += Math.ceil(bks.length / COLS) * (CH + GAP);
    }

    // footer
    ctx.fillStyle = "rgba(245,201,122,0.55)";
    ctx.font = "12px 'Georgia', serif";
    ctx.fillText("theshelf.vercel.app", PAD, canvasH - 10);

    canvas.toBlob(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "my-shelf.png";
      a.click();
      setExporting(false);
    });
  }

  return (
    <div style={{ overflowY:"auto", padding:"12px 16px 80px", height:"100%", position:"relative", zIndex:10 }} onClick={()=>{ setFilterOpen(false); setGroupOpen(false); }}>

      {/* filter + group by row */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }} onClick={e=>e.stopPropagation()}>
        <div style={{ position:"relative" }}>
          {(() => {
            const hasF = timeline !== "All" || filterMonth !== null || ratingFilter !== null || genreFilter !== null;
            const statsPillStyle = (active) => ({
              padding:"5px 12px", borderRadius:20, fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:500,
              cursor:"pointer", transition:"all 0.15s", border:"1px solid",
              background: active ? WOOD.amber : "rgba(255,235,195,0.12)",
              color: active ? "#1a0900" : WOOD.textDim,
              borderColor: active ? WOOD.amber : "rgba(138,90,40,0.3)",
              whiteSpace:"nowrap",
            });
            return (<>
              <button onClick={()=>setFilterOpen(o=>!o)} style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:4,
                background: hasF ? WOOD.amber : "rgba(15,8,2,0.55)",
                borderRadius:20, padding:"6px 10px",
                border:`1px solid ${hasF ? WOOD.amber : "rgba(120,70,20,0.3)"}`,
                backdropFilter:"blur(4px)", cursor:"pointer",
                color: hasF ? "#1a0900" : "#fff",
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M1 2h10l-4 5v3l-2-1V7L1 2z"/>
                </svg>
                {hasF && (() => {
                  const active = [timeline !== "All" ? timeline : null, filterMonth !== null ? MONTH_NAMES[parseInt(filterMonth,10)-1] : null, ratingFilter !== null ? `${ratingFilter}★` : null, genreFilter].filter(Boolean);
                  return <span style={{ fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                    {active.slice(0,2).join(" · ")}{active.length > 2 ? ` +${active.length - 2}` : ""}
                  </span>;
                })()}
              </button>
              {filterOpen && (
                <div onClick={e=>e.stopPropagation()} style={{
                  position:"absolute", top:"calc(100% + 4px)", left:0, zIndex:30, width:240,
                  background:"#f5e8d0", borderRadius:12, padding:"14px",
                  boxShadow:"0 4px 24px rgba(0,0,0,0.28)", border:"1px solid rgba(138,90,40,0.3)",
                  animation:"fadeIn 0.12s ease",
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <p style={{ fontSize:11, fontWeight:700, color:WOOD.textDim, textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"'DM Sans',sans-serif" }}>Filters</p>
                    {hasF && <button onClick={()=>{ setTimeline("All"); setFilterMonth(null); setRatingFilter(null); setGenreFilter(null); }} style={{ fontSize:11, color:WOOD.amber, background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>Clear all</button>}
                  </div>
                  {availableYears.length > 0 && <div style={{ marginBottom:12 }}>
                    <p style={{ fontSize:10, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Year</p>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                      {availableYears.map(y => (
                        <button key={y} onClick={()=>{ setTimeline(timeline===y ? "All" : y); setFilterMonth(null); }} style={statsPillStyle(timeline===y)}>{y}</button>
                      ))}
                    </div>
                  </div>}
                  {availableMonths.length > 0 && <div style={{ marginBottom:12 }}>
                    <p style={{ fontSize:10, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Month</p>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                      {availableMonths.map(m => (
                        <button key={m} onClick={()=>setFilterMonth(filterMonth===m ? null : m)} style={statsPillStyle(filterMonth===m)}>{MONTH_NAMES[parseInt(m,10)-1]}</button>
                      ))}
                    </div>
                  </div>}
                  <div style={{ marginBottom:12 }}>
                    <p style={{ fontSize:10, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Rating</p>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                      {[5, 4.5, 4, 3.5, 3].map(r => (
                        <button key={r} onClick={()=>setRatingFilter(ratingFilter===r ? null : r)} style={statsPillStyle(ratingFilter===r)}>{r} ★</button>
                      ))}
                    </div>
                  </div>
                  {Object.keys(stats.genreMap).length > 0 && (
                    <div>
                      <p style={{ fontSize:10, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>Genre</p>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        {Object.keys(stats.genreMap).sort().map(g => (
                          <button key={g} onClick={()=>setGenreFilter(genreFilter===g ? null : g)} style={statsPillStyle(genreFilter===g)}>{g}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>);
          })()}
        </div>
        <div style={{ position:"relative" }}>
          <button onClick={()=>setGroupOpen(o=>!o)} style={{
            display:"flex", alignItems:"center", gap:6,
            background: groupBy !== null ? WOOD.amber : "rgba(15,8,2,0.55)",
            borderRadius:20, padding:"6px 12px",
            border:"1px solid rgba(120,70,20,0.3)",
            cursor:"pointer", color: groupBy !== null ? "#1a0900" : "#fff",
            fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500,
            transition:"all 0.2s",
          }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="3" width="14" height="1.5" rx="0.75"/>
              <rect x="1" y="7.25" width="14" height="1.5" rx="0.75"/>
              <rect x="1" y="11.5" width="14" height="1.5" rx="0.75"/>
            </svg>
            <span>{groupBy ? `Group: ${groupBy[0].toUpperCase()+groupBy.slice(1)}` : "Group"}</span>
          </button>
          {groupOpen && (
            <div style={{
              position:"absolute", top:"calc(100% + 6px)", left:0, zIndex:30, width:160,
              background:"#f5e8d0", borderRadius:12, overflow:"hidden",
              boxShadow:"0 4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)",
              animation:"fadeIn 0.12s ease",
            }}>
              {[{ id:null, label:"None" },{ id:"rating", label:"Rating" },{ id:"genre", label:"Genre" },{ id:"year", label:"Year" },{ id:"month", label:"Month" }].map(({ id, label }) => (
                <button key={id ?? "none"} onClick={()=>{ setGroupBy(id); setGroupOpen(false); }} style={{
                  display:"block", width:"100%", padding:"8px 14px", textAlign:"left",
                  background: groupBy===id ? "rgba(138,90,40,0.12)" : "transparent",
                  border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14,
                  color: groupBy===id ? WOOD.amber : WOOD.text, fontWeight: groupBy===id ? 600 : 400,
                }}>{label}</button>
              ))}
            </div>
          )}
        </div>

        {/* export as image */}
        <button onClick={exportShelfImage} disabled={exporting || filteredBooks.length===0} style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          background:"rgba(15,8,2,0.55)", borderRadius:20, padding:"6px 10px",
          border:"1px solid rgba(120,70,20,0.3)", backdropFilter:"blur(4px)",
          cursor: filteredBooks.length===0 ? "default" : "pointer",
          color:"#fff", opacity: exporting ? 0.5 : 1, marginLeft:"auto",
          transition:"opacity 0.2s",
        }}>
          {exporting
            ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="7" cy="7" r="5" strokeDasharray="20" strokeDashoffset="10"><animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="0.8s" repeatCount="indefinite"/></circle></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          }
        </button>
      </div>

      {/* book covers strip */}
      {filteredBooks.length > 0 && (
        <div style={{ marginBottom:20, marginLeft:-16, marginRight:-16 }}>
          {!groupBy ? (
            <div style={{ display:"flex", gap:6, overflowX:"auto", padding:"16px 16px 12px", scrollbarWidth:"none" }}>
              {filteredBooks.map(b => <BookCoverThumb key={b.id} book={b} />)}
            </div>
          ) : (
            groupedBooks.map(([groupKey, groupBooks]) => (
              <div key={groupKey} style={{ marginBottom:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px 6px" }}>
                  {groupBy === "rating" && groupKey !== "Unrated"
                    ? <StarRating value={parseFloat(groupKey)} readonly size={18} onlyFilled />
                    : <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, fontWeight:700, color:"#fff", letterSpacing:"0.01em" }}>{groupKey}</span>
                  }
                  <span style={{ fontSize:11, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>({groupBooks.length})</span>
                </div>
                <div style={{ display:"flex", gap:6, overflowX:"auto", padding:"2px 16px 10px", scrollbarWidth:"none" }}>
                  {groupBooks.map(b => <BookCoverThumb key={b.id} book={b} />)}
                </div>
                <div style={{ height:1, background:"rgba(138,90,40,0.12)", marginLeft:16, marginRight:16 }}/>
              </div>
            ))
          )}
          <div style={{ height:1, background:"rgba(138,90,40,0.2)", marginLeft:16, marginRight:16 }}/>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
        {[
          { label:"Books Read", value:filteredBooks.length, emoji:"📖" },
          { label:"Pages Turned", value:stats.totalPages.toLocaleString(), emoji:"📄" },
          { label:"Avg Rating", value:stats.avgRating ? stats.avgRating.toFixed(2)+" ★" : "—", emoji:"⭐" },
          { label:"Genres", value:Object.keys(stats.genreMap).length, emoji:"🏷️" },
        ].map(({ label,value })=>(
          <div key={label} style={{ ...card, padding:"11px 12px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>
            <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:28, fontWeight:400, color:WOOD.text, lineHeight:1 }}>{value}</div>
            <div style={{ fontSize:9, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.12em" }}>{label}</div>
          </div>
        ))}
      </div>

      {(() => {
        const readingBooks = books.filter(b => b.shelf === "Reading");
        if (readingBooks.length === 0) return null;
        return (
          <>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
            <span style={{ fontSize:13, color:"#fff", textTransform:"uppercase", letterSpacing:"0.18em", fontFamily:"'Crimson Pro',serif", fontWeight:700, whiteSpace:"nowrap" }}>Currently Reading</span>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
          </div>
          <div style={{ ...card, padding:16, marginBottom:10 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {readingBooks.map(b => {
                const pct = b.pages > 0 && (b.currentPage || 0) > 0 ? Math.min(100, Math.round(((b.currentPage||0) / b.pages) * 100)) : null;
                return (
                  <div key={b.id} style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <BookCover book={b} width={38} height={58} radius={3} shadow="1px 1px 4px rgba(0,0,0,0.25)" />
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:WOOD.text, lineHeight:1.2, marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{b.title}</p>
                      <p style={{ fontSize:11, color:WOOD.textDim, fontStyle:"italic", marginBottom: pct !== null ? 5 : 0 }}>{b.author}</p>
                      {pct !== null && (
                        <>
                          <div style={{ height:4, background:"rgba(138,90,40,0.15)", borderRadius:2, overflow:"hidden", marginBottom:3 }}>
                            <div style={{ height:"100%", background:"#3a7a50", borderRadius:2, width:`${pct}%`, transition:"width 0.4s" }} />
                          </div>
                          <span style={{ fontSize:10, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif" }}>{pct}% · {(b.currentPage||0).toLocaleString()} / {b.pages.toLocaleString()} pages</span>
                        </>
                      )}
                      {pct === null && b.pages > 0 && <span style={{ fontSize:10, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif" }}>{b.pages.toLocaleString()} pages</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </>
        );
      })()}

      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
        <span style={{ fontSize:13, color:"#fff", textTransform:"uppercase", letterSpacing:"0.18em", fontFamily:"'Crimson Pro',serif", fontWeight:700, whiteSpace:"nowrap" }}>Genre Breakdown</span>
        <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
      </div>
      <div style={{ ...card, padding:16, marginBottom:10 }}>
        {topGenres.length===0
          ? <p style={{ color:WOOD.textFaint, fontSize:13 }}>No data yet</p>
          : topGenres.map(([genre,count])=>{
            const avgGenreRating = stats.genreRatingSum[genre] ? (stats.genreRatingSum[genre] / count).toFixed(1) : null;
            return (
            <div key={genre} style={{ marginBottom:10, borderBottom:"1px solid rgba(100,60,20,0.12)", paddingBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                <span style={{ background:GENRE_COLORS[genre]||"#94a3b8", color:"#fff", borderRadius:20, padding:"3px 10px", fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>{genre}</span>
                <span style={{ fontSize:11, color:WOOD.textDim, fontFamily:"'DM Sans',sans-serif" }}>{count} books · {(stats.genrePages[genre]||0).toLocaleString()} pages{avgGenreRating ? ` · ${avgGenreRating} ★` : ""}</span>
              </div>
              <div style={{ height:4, background:"rgba(100,60,20,0.15)", borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${(count/filteredBooks.length)*100}%`, background:GENRE_COLORS[genre]||"#94a3b8", borderRadius:3, transition:"width 0.6s" }}/>
              </div>
            </div>
          )})}
      </div>

      {(stats.topAuthor || stats.longestBook) && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {stats.topAuthor && (
            <div style={{ display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
                <span style={{ fontSize:13, color:"#fff", textTransform:"uppercase", letterSpacing:"0.18em", fontFamily:"'Crimson Pro',serif", fontWeight:700, whiteSpace:"nowrap" }}>Top Author</span>
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
              </div>
              <div style={{ ...card, padding:14 }}>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.2, marginBottom:4 }}>{stats.topAuthor[0]}</p>
                <p style={{ fontSize:12, color:WOOD.textDim }}>{stats.topAuthor[1]} {stats.topAuthor[1] === 1 ? "book" : "books"}</p>
              </div>
            </div>
          )}
          {stats.longestBook && (
            <div style={{ display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
                <span style={{ fontSize:13, color:"#fff", textTransform:"uppercase", letterSpacing:"0.18em", fontFamily:"'Crimson Pro',serif", fontWeight:700, whiteSpace:"nowrap" }}>Longest Book</span>
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.35)" }}/>
              </div>
              <div style={{ ...card, padding:14 }}>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.2, marginBottom:4, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{stats.longestBook.title}</p>
                <p style={{ fontSize:12, color:WOOD.textDim }}>{stats.longestBook.pages.toLocaleString()} pages</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BookSearchModal({ book, onSave, onClose }) {
  const [rating, setRating] = useState(0);
  const [shelf, setShelf] = useState("Read");
  const noRating = ["Reading", "The List", "Curious", "DNF"].includes(shelf);

  function save() {
    if (!noRating && !rating) return;
    onSave({ ...book, rating: noRating ? 0 : rating, shelf, pages: book.pages || 0 });
    onClose();
  }

  return (
    <div
      style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.55)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", animation:"fadeIn 0.15s ease" }}
      onClick={onClose}
    >
      <div onTouchEnd={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()} style={{
        background:"#fff", borderRadius:16, padding:24, width:"min(420px, 92vw)",
        boxShadow:"0 20px 60px rgba(0,0,0,0.35)", position:"relative",
        maxHeight:"90vh", overflowY:"auto",
      }}>
        <button {...tc(onClose, true)} style={{ position:"absolute", top:14, right:14, background:"#f3f4f6", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", fontSize:14, color:"#6b7280", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>

        <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:20 }}>
          {book.coverUrl
            ? <img src={book.coverUrl} alt={book.title} style={{ width:72, height:108, objectFit:"cover", borderRadius:6, boxShadow:"0 4px 12px rgba(0,0,0,0.2)", flexShrink:0 }} />
            : <BookSpine title={book.title} genre={book.genre} size={72} />
          }
          <div style={{ minWidth:0, flex:1 }}>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:20, color:"#1a1a1a", lineHeight:1.2, marginBottom:4 }}>{book.title}</p>
            <p style={{ fontSize:13, color:"#6b7280", fontStyle:"italic", marginBottom:8 }}>{book.author}</p>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ background:GENRE_COLORS[book.genre]||"#94a3b8", color:"#fff", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>{book.genre}</span>
              {book.pages > 0 && <span style={{ fontSize:12, color:"#9ca3af" }}>{book.pages} pages</span>}
            </div>
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:11, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Add to Shelf</p>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {SHELVES.map(s => (
              <button key={s} {...tc(()=>setShelf(s), true)} style={{
                padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
                border: shelf===s ? "2px solid #b07840" : "2px solid #e5e7eb",
                background: shelf===s ? "#b07840" : "#fff",
                color: shelf===s ? "#fff" : "#6b7280",
                cursor:"pointer", transition:"all 0.15s",
              }}>{s}</button>
            ))}
          </div>
        </div>

        {!noRating && (
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:11, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Your Rating</p>
            <StarRating value={rating} onChange={setRating} size={40} stretch />
          </div>
        )}

        <button {...tc(save, true)} style={{
          width:"100%", padding:"13px",
          background: (noRating || rating) ? "#b07840" : "#f3f4f6",
          color: (noRating || rating) ? "#fff" : "#9ca3af",
          borderRadius:10, fontSize:15, fontWeight:600,
          fontFamily:"'DM Sans',sans-serif",
          border:"none", cursor:(noRating || rating) ? "pointer" : "default", transition:"all 0.2s",
        }}>Add to Shelf</button>
      </div>
    </div>
  );
}

function AddSheet({ onSave, onClose, initialBook = null }) {
  const [step, setStep] = useState(initialBook ? "confirm" : "search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState(initialBook);
  const [rating, setRating] = useState(0);
  const [shelf, setShelf] = useState("Read");
  const searchTimer = useRef(null);

  const inputStyle = {
    display:"block", width:"100%",
    background:"rgba(10,5,1,0.6)", border:`1px solid rgba(120,70,20,0.35)`,
    borderRadius:10, padding:"12px 14px", color:WOOD.text,
    fontSize:16, fontFamily:"'DM Sans',sans-serif", marginBottom:9, outline:"none",
  };

  async function searchBooks(q) {
    if (!q.trim()) { setResults([]); return; }
    setSearching(true);
    try {
      const res = await fetch("/api/search-books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const parsed = await res.json();
      setResults(Array.isArray(parsed) ? parsed : []);
    } catch {
      setResults([]);
    }
    setSearching(false);
  }

  function handleQueryChange(e) {
    const q = e.target.value;
    setQuery(q);
    clearTimeout(searchTimer.current);
    if (q.trim().length > 1) {
      setSearching(true);
      searchTimer.current = setTimeout(() => searchBooks(q), 600);
    } else {
      setResults([]);
      setSearching(false);
    }
  }

  function pick(book) {
    setSelected({ ...book, rating: 0 });
    setRating(0);
    setShelf("Read");
    setStep("confirm");
  }

  const noRating = ["Reading", "The List", "Curious", "DNF"].includes(shelf);

  function save() {
    if (!selected || (!noRating && !rating)) return;
    onSave({ ...selected, rating: noRating ? 0 : rating, shelf, pages: selected.pages || 0 });
    onClose();
  }

  const sheetStyle = {
    background:"linear-gradient(180deg, #ddb870 0%, #c89850 100%)",
    borderRadius:"20px 20px 0 0",
    padding:"0 18px 30px",
    maxHeight:"95%",
    minHeight: step === "confirm" ? "80%" : "auto",
    overflowY:"auto",
    borderTop:`1px solid rgba(220,180,100,0.5)`,
    boxShadow:"0 -8px 32px rgba(0,0,0,0.3)",
    animation:"slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
  };

  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.7)", zIndex:50, display:"flex", flexDirection:"column", justifyContent:"flex-end", animation:"fadeIn 0.15s ease" }}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={sheetStyle}>
        <div style={{ height:3, background:"linear-gradient(90deg, rgba(0,0,0,0.3), rgba(255,200,100,0.1) 40%, rgba(0,0,0,0.3))" }}/>
        <div style={{ display:"flex", justifyContent:"center", paddingTop:12, marginBottom:14 }}>
          <div style={{ width:34, height:4, background:"rgba(100,60,20,0.5)", borderRadius:2 }}/>
        </div>

        {step === "search" && <>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:22, fontWeight:300, color:WOOD.text }}>Find a Book</p>
          </div>

          <div style={{ position:"relative", marginBottom:12 }}>
            <input
              autoFocus
              value={query}
              onChange={handleQueryChange}
              placeholder="Type a title or author…"
              style={{ ...inputStyle, marginBottom:0 }}
            />
          </div>

          {/* results */}
          {results.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {results.map((book, i) => (
                <button key={i} onClick={() => pick(book)} style={{
                  background:"rgba(10,5,1,0.45)", border:"1px solid rgba(120,70,20,0.3)",
                  borderRadius:10, padding:"11px 13px", textAlign:"left", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:10,
                }}>
                  {(book.coverUrl || book.coverId)
                    ? <img src={book.coverUrl || `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`} alt={book.title}
                        style={{ width:32, height:46, objectFit:"cover", borderRadius:3, boxShadow:"1px 1px 4px rgba(0,0,0,0.3)", flexShrink:0 }} />
                    : <BookSpine title={book.title} genre={book.genre} size={32} />
                  }
                  <div style={{ minWidth:0 }}>
                    <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, color:WOOD.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{book.title}</p>
                    <p style={{ fontSize:12, color:WOOD.textDim, fontStyle:"italic" }}>{book.author}</p>
                    <div style={{ display:"flex", gap:6, marginTop:3, alignItems:"center" }}>
                      <span style={{ background:GENRE_COLORS[book.genre], color:"#fff", borderRadius:"20px", padding:"3px 10px", fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>{book.genre}</span>
                      {book.pages > 0 && <span style={{ fontSize:11, color:WOOD.textFaint }}>{book.pages} pages</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!searching && query.length > 1 && results.length === 0 && (
            <p style={{ textAlign:"center", color:WOOD.textFaint, fontSize:14, fontStyle:"italic", marginTop:20 }}>No results found</p>
          )}
        </>}

        {step === "confirm" && selected && <>
          <button onClick={() => setStep("search")} style={{ background:"transparent", border:"none", color:WOOD.textDim, fontSize:13, cursor:"pointer", marginBottom:12, padding:0, fontFamily:"'DM Sans',sans-serif" }}>← Back</button>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:18 }}>
            {selected.coverId
              ? <img src={`https://covers.openlibrary.org/b/id/${selected.coverId}-M.jpg`} alt={selected.title}
                  style={{ width:60, height:88, objectFit:"cover", borderRadius:4, boxShadow:"2px 2px 10px rgba(0,0,0,0.35)", flexShrink:0 }} />
              : <BookSpine title={selected.title} genre={selected.genre} size={48} />
            }
            <div>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:19, color:WOOD.text, lineHeight:1.2, marginBottom:3 }}>{selected.title}</p>
              <p style={{ fontSize:13, color:WOOD.textDim, fontStyle:"italic", marginBottom:6 }}>{selected.author}</p>
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                <span style={{ background:GENRE_COLORS[selected.genre], color:"#fff", borderRadius:"20px", padding:"3px 10px", fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>{selected.genre}</span>
                {selected.pages > 0 && <span style={{ fontSize:12, color:WOOD.textFaint }}>{selected.pages} pages</span>}
              </div>
            </div>
          </div>

          {selected.description && (
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:WOOD.text, lineHeight:1.65, fontStyle:"italic", marginBottom:16 }}>{selected.description}</p>
          )}

          <div style={{ marginBottom:16 }}>
            <p style={{ fontSize:11, color:WOOD.textFaint, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>Add to Shelf</p>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {SHELVES.map(s => (
                <button key={s} {...tc(()=>setShelf(s), true)} style={{
                  padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
                  border: shelf===s ? `2px solid ${WOOD.amber}` : "2px solid rgba(120,70,20,0.3)",
                  background: shelf===s ? WOOD.amber : "rgba(10,5,1,0.4)",
                  color: shelf===s ? "#1a0900" : WOOD.textDim,
                  cursor:"pointer", transition:"all 0.15s",
                }}>{s}</button>
              ))}
            </div>
          </div>

          {!noRating && (
            <div style={{ background:"rgba(10,5,1,0.5)", border:`1px solid rgba(120,70,20,0.3)`, borderRadius:10, padding:14, marginBottom:16 }}>
              <p style={{ fontSize:11, color:WOOD.textFaint, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>Your Rating</p>
              <StarRating value={rating} onChange={setRating} size={44} stretch />
            </div>
          )}

          <button onClick={save} style={{
            width:"100%", padding:"14px",
            background: (noRating || rating) ? `linear-gradient(135deg,${WOOD.amber},#f97316)` : "rgba(10,5,1,0.5)",
            color: (noRating || rating) ? "#1a0900" : WOOD.textFaint,
            borderRadius:12, fontSize:15, fontWeight:600,
            fontFamily:"'DM Sans',sans-serif",
            border:`1px solid ${(noRating || rating) ? WOOD.amber : "rgba(100,60,20,0.25)"}`,
            cursor: (noRating || rating) ? "pointer" : "default", transition:"all 0.2s",
          }}>Add to Shelf</button>
        </>}
      </div>

    </div>
  );
}

function EditSheet({ book, onSave, onClose, onSaveDescription, onSaveScores, onAuthor, onRemove, libraryProfile = [], userId }) {
  const [rating, setRating] = useState(book.rating || 0);
  const [shelf, setShelf] = useState(book.shelf || "Read");
  const [genre, setGenre] = useState(book.genre || "Other");
  const [date, setDate] = useState(book.date || new Date().toISOString().slice(0,10));
  const [notes, setNotes] = useState(book.notes || "");
  const [coverUrl, setCoverUrl] = useState(book.coverUrl || null);
  const [coverId, setCoverId] = useState(book.coverId || null);
  const [coverFetch, setCoverFetch] = useState(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [detailPanel, setDetailPanel] = useState(null); // "about" | "prose" | "scores"
  const [description, setDescription] = useState(book.description || null);
  const [descLoading, setDescLoading] = useState(false);
  const [prose, setProse] = useState(null);
  const [proseLoading, setProseLoading] = useState(false);
  const [scores, setScores] = useState(book.scores || null);
  const [scoresLoading, setScoresLoading] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [obiVerdict, setObiVerdict] = useState(null);
  const [obiLoading, setObiLoading] = useState(false);

  const noRating = ["The List", "Curious", "Reading"];
  function hiResCoverUrl(url) {
    if (!url) return url;
    if (url.includes("mzstatic.com") || url.includes("itunes.apple.com")) return url.replace(/\/\d+x\d+bb\./, "/600x600bb.");
    if (url.includes("covers.openlibrary.org")) return url.replace(/-[SML]\.jpg$/, "-L.jpg");
    return url;
  }
  const [modalCoverUrl, setModalCoverUrl] = useState(coverUrl);

  const displayBook = { ...book, coverUrl: modalCoverUrl, coverId };
  const lbl = { fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:CR.textDim, marginBottom:8, fontWeight:500 };

  async function findCover() {
    setCoverFetch("loading");
    try {
      const res = await fetch("/api/fetch-cover", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ title:book.title, author:book.author, isbn:book.isbn }) });
      const data = await res.json();
      setCoverFetch(data.options?.length ? { options: data.options } : "notfound");
    } catch { setCoverFetch("notfound"); }
  }

  useEffect(() => {
    if (activeTab === "details") {
      setDetailPanel("about");
      if (!description) {
        setDescLoading(true);
        fetch("/api/book-description", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author, genre:book.genre }) })
          .then(r => r.json())
          .then(data => { const desc = data.description || null; setDescription(desc); if (desc && onSaveDescription) onSaveDescription(book.id, desc); })
          .catch(() => setDescription(null))
          .finally(() => setDescLoading(false));
      }
    }
  }, [activeTab]);

  async function fetchAbout() {
    if (detailPanel === "about") { setDetailPanel(null); return; }
    setDetailPanel("about");
    if (description) return;
    setDescLoading(true);
    try {
      const res = await fetch("/api/book-description", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author, genre:book.genre }) });
      const data = await res.json();
      const desc = data.description || null;
      setDescription(desc);
      if (desc && onSaveDescription) onSaveDescription(book.id, desc);
    } catch { setDescription(null); }
    setDescLoading(false);
  }

  async function fetchProse() {
    if (detailPanel === "prose") { setDetailPanel(null); return; }
    setDetailPanel("prose");
    if (prose) return;
    setProseLoading(true);
    try {
      const res = await fetch("/api/prose-preview", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author }) });
      const data = await res.json();
      setProse(data.prose || "Unable to generate preview.");
    } catch { setProse("Unable to generate preview."); }
    setProseLoading(false);
  }

  async function fetchScores() {
    if (detailPanel === "scores") { setDetailPanel(null); return; }
    setDetailPanel("scores");
    if (scores) return;
    setScoresLoading(true);
    try {
      const res = await fetch("/api/book-scores", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ title:book.title, author:book.author, genre:book.genre }) });
      const data = await res.json();
      const fetched = data.error ? null : data;
      setScores(fetched);
      if (fetched && onSaveScores) onSaveScores(book.id, fetched);
    } catch { setScores(null); }
    setScoresLoading(false);
  }

  async function fetchObi() {
    if (detailPanel === "obi") { setDetailPanel(null); return; }
    setDetailPanel("obi");
    if (obiVerdict) return;
    setObiLoading(true);
    try {
      const res = await fetch("/api/ask-obi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: { title: book.title, author: book.author, genre: book.genre, description },
          profile: libraryProfile,
          userId,
        }),
      });
      const data = await res.json();
      setObiVerdict(data.verdict || "Unable to get a read on this one.");
    } catch { setObiVerdict("Unable to get a read on this one."); }
    setObiLoading(false);
  }

  const tabs = [
    { key:"edit",     label:"Edit",     icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
    { key:"details",  label:"Details",  icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7v5M8 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { key:"rankings", label:"Rankings", icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 12V9M8 12V5M13 12V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  ];

  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", zIndex:300, display:"flex", flexDirection:"column", justifyContent:"flex-end" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()} style={{ background:CR.bg, borderRadius:0, height:"98%", display:"flex", flexDirection:"column", boxShadow:"0 -4px 40px rgba(0,0,0,0.18)", borderTop:"6px solid #8a5a28", borderLeft:"6px solid #8a5a28" }}>

        {/* Header */}
        <div style={{ padding:"20px 16px 0 22px", marginBottom:20, position:"relative", flexShrink:0 }}>
          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:24, fontWeight:400, color:CR.text, letterSpacing:"-0.01em", lineHeight:1.2, paddingRight:52 }}>{book.title}</p>
          <p onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); onAuthor&&onAuthor(book.author); }} onClick={()=>onAuthor&&onAuthor(book.author)} style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, fontStyle:"italic", color:CR.textDim, marginTop:2, cursor:onAuthor?"pointer":"default", textDecorationLine:onAuthor?"underline":"none", textDecorationStyle:"dotted" }}>{book.author}</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:7, flexWrap:"wrap", gap:6 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:CR.textFaint, flexWrap:"wrap" }}>
              <span style={{ background:GENRE_COLORS[book.genre]||"#94a3b8", color:"#fff", borderRadius:"20px", padding:"3px 10px", fontSize:9, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1 }}>{book.genre}</span>
              {book.pages > 0 && <><span style={{ color:CR.border }}>·</span><span>{book.pages} pages</span></>}
              {book.year && <><span style={{ color:CR.border }}>·</span><span>{book.year}</span></>}
            </div>
            <div style={{ display:"flex", gap:2, background:CR.panel, borderRadius:6, padding:2, flexShrink:0 }}>
              {tabs.map(t => (
                <button key={t.key} onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); setActiveTab(t.key); }} onClick={() => setActiveTab(t.key)} title={t.label} style={{ display:"flex", alignItems:"center", gap:4, padding:"8px 10px", border:"none", borderRadius:4, background:activeTab===t.key ? "#8a5a28" : "transparent", color:activeTab===t.key ? "#fff" : CR.textDim, fontSize:11, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", boxShadow:"none", transition:"all 0.12s", whiteSpace:"nowrap" }}>
                  {t.icon}{activeTab===t.key && <span style={{ marginLeft:2 }}>{t.label}</span>}
                </button>
              ))}
            </div>
          </div>
          <button onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); onClose(); }} onClick={onClose} style={{ position:"absolute", top:20, right:16, background:CR.panel, border:"none", borderRadius:"50%", width:30, height:30, cursor:"pointer", color:CR.textDim, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY:"auto", flex:1, paddingBottom:40 }}>

          {/* Hero cover */}
          <div style={{ display:"flex", justifyContent:"center", borderTop:`1px solid ${CR.border}`, borderBottom:`1px solid ${CR.border}`, padding:"20px 0 34px", marginBottom:24 }}>
            <div style={{ position:"relative" }}>
              <BookCover book={displayBook} width={173} height={255} radius={6} shadow="3px 3px 0 rgba(0,0,0,0.12)" />
              {activeTab === "edit" && (
                <button onClick={findCover} disabled={coverFetch==="loading"} style={{ position:"absolute", bottom:-14, left:"50%", transform:"translateX(-50%)", fontSize:10, color:CR.textDim, background:CR.bg, border:`1px solid ${CR.border}`, borderRadius:20, padding:"3px 12px", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif" }}>
                  {coverFetch==="loading" ? "…" : "Change Cover"}
                </button>
              )}
            </div>
          </div>

          {/* Cover picker — edit tab only */}
          {activeTab === "edit" && coverFetch && coverFetch !== "loading" && coverFetch !== "notfound" && (
            <div style={{ padding:"0 22px", marginBottom:20 }}>
              <p style={{ fontSize:11, color:CR.textDim, marginBottom:8 }}>Pick a cover:</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {coverFetch.options.map((opt, i) => (
                  <div key={i} onClick={() => { const u = hiResCoverUrl(opt.coverUrl); setCoverUrl(u); setModalCoverUrl(u); setCoverId(opt.coverId||null); setCoverFetch(null); }} style={{ cursor:"pointer" }}>
                    <img src={opt.coverUrl} alt={opt.source} style={{ width:48, height:72, objectFit:"cover", borderRadius:4, boxShadow:"0 2px 6px rgba(0,0,0,0.2)" }} />
                    <span style={{ fontSize:9, color:CR.textDim, display:"block", textAlign:"center", maxWidth:52 }}>{opt.source}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setCoverFetch(null)} style={{ marginTop:8, fontSize:11, background:CR.panel, color:CR.textDim, border:`1px solid ${CR.border}`, borderRadius:20, padding:"3px 10px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Cancel</button>
            </div>
          )}
          {activeTab === "edit" && coverFetch === "notfound" && <p style={{ padding:"0 22px", marginBottom:16, fontSize:12, color:CR.textDim, fontStyle:"italic" }}>No cover found.</p>}

          {/* EDIT TAB */}
          {activeTab === "edit" && <>
            {/* Shelf */}
            <div style={{ padding:"0 22px", marginBottom:20 }}>
              <p style={lbl}>Shelf</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:5 }}>
                {SHELVES.map(s => (
                  <button key={s} onClick={() => setShelf(s)} style={{ padding:"8px 4px", border:`1px solid ${shelf===s ? CR.text : CR.border}`, background:shelf===s ? CR.text : CR.panel, color:shelf===s ? CR.bg : CR.textDim, fontSize:12, fontFamily:"'DM Sans',sans-serif", borderRadius:4, cursor:"pointer", textAlign:"center", transition:"all 0.12s" }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Rating */}
            {!noRating.includes(shelf) && (
              <div style={{ padding:"0 22px", marginBottom:20 }}>
                <p style={lbl}>Rating</p>
                <div style={{ display:"flex", gap:6 }}>
                  {[1,2,3,4,5].map(star => {
                    const full = rating >= star, half = !full && rating >= star-0.5, sz = 38;
                    return (
                      <div key={star} style={{ position:"relative", width:sz, height:sz }}>
                        <svg width={sz} height={sz} viewBox="0 0 20 20" style={{ position:"absolute" }}>
                          <polygon points="10,2 12.4,7.5 18.5,7.5 13.7,11.4 15.5,17.5 10,13.8 4.5,17.5 6.3,11.4 1.5,7.5 7.6,7.5" fill={CR.panel} stroke={CR.border} strokeWidth="1"/>
                        </svg>
                        {(full||half) && <svg width={sz} height={sz} viewBox="0 0 20 20" style={{ position:"absolute" }}>
                          <defs><clipPath id={`es${star}`}><rect x="0" y="0" width={full?20:10} height="20"/></clipPath></defs>
                          <polygon points="10,2 12.4,7.5 18.5,7.5 13.7,11.4 15.5,17.5 10,13.8 4.5,17.5 6.3,11.4 1.5,7.5 7.6,7.5" fill={CR.amber} clipPath={`url(#es${star})`}/>
                        </svg>}
                        <div style={{ position:"absolute", left:0, top:0, width:"50%", height:"100%", zIndex:10, cursor:"pointer" }} onClick={() => setRating(star-0.5)}/>
                        <div style={{ position:"absolute", left:"50%", top:0, width:"50%", height:"100%", zIndex:10, cursor:"pointer" }} onClick={() => setRating(star)}/>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Genre + Date */}
            {shelf === "Read" && (
              <div style={{ padding:"0 22px", marginBottom:20 }}>
                <div style={{ display:"flex", gap:20, alignItems:"flex-end", flexWrap:"wrap" }}>
                  <div>
                    <p style={lbl}>Genre</p>
                    <select value={genre} onChange={e => setGenre(e.target.value)} style={{ padding:"9px 13px", border:`1px solid ${CR.border}`, borderRadius:6, background:CR.panel, fontSize:13, fontFamily:"'DM Sans',sans-serif", color:CR.text, outline:"none", cursor:"pointer" }}>
                      {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <p style={lbl}>Date Read</p>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} onTouchEnd={e=>e.stopPropagation()} style={{ padding:"9px 13px", border:`1px solid ${CR.border}`, borderRadius:6, background:CR.panel, fontSize:13, fontFamily:"'DM Sans',sans-serif", color:CR.text, outline:"none" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {(shelf === "Read" || shelf === "Reading") && (
              <div style={{ padding:"0 22px", marginBottom:20 }}>
                <p style={lbl}>Notes</p>
                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Your thoughts on the book…" style={{ width:"100%", padding:"10px 13px", border:`1px solid ${CR.border}`, borderRadius:6, background:CR.panel, fontSize:13, fontFamily:"'Crimson Pro',serif", color:CR.text, resize:"none", outline:"none", lineHeight:1.6, boxSizing:"border-box" }} />
              </div>
            )}
          </>}

          {/* DETAILS TAB */}
          {activeTab === "details" && (
            <div style={{ padding:"0 22px" }}>
              {/* Button row */}
              <div style={{ display:"flex", gap:6, marginBottom:16 }}>
                {[
                  { key:"about",  label:"About",  icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h12"/></svg> },
                  { key:"prose",  label:"Prose",  icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
                  { key:"scores", label:"Scores", icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12V9M8 12V5M13 12V7M18 12V3"/></svg> },
                ].map(({ key, label, icon }) => (
                  <button key={key} onClick={key==="about"?fetchAbout:key==="prose"?fetchProse:fetchScores} style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, transition:"all 0.15s", background:detailPanel===key ? CR.text : CR.panel, color:detailPanel===key ? CR.bg : CR.textDim }}>
                    {icon}{label}
                  </button>
                ))}
                {!["Read","DNF"].includes(shelf) && (
                  <button onClick={fetchObi} style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px", borderRadius:20, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, transition:"all 0.15s", background:detailPanel==="obi" ? CR.text : CR.panel, color:detailPanel==="obi" ? CR.bg : CR.textDim }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/></svg>
                    Ask Obi
                  </button>
                )}
              </div>
              {/* Panel content */}
              {detailPanel === "about" && (
                <div style={{ animation:"fadeIn 0.18s ease" }}>
                  {descLoading
                    ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:CR.textFaint, fontStyle:"italic" }}>Loading…</p>
                    : description
                      ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:CR.text, lineHeight:1.75 }}>{description}</p>
                      : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:CR.textFaint, fontStyle:"italic" }}>No description available.</p>}
                </div>
              )}
              {detailPanel === "prose" && (
                <div style={{ animation:"fadeIn 0.18s ease" }}>
                  {proseLoading
                    ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:CR.textFaint, fontStyle:"italic" }}>Generating…</p>
                    : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:CR.text, lineHeight:1.8 }}>{prose}</p>}
                </div>
              )}
              {detailPanel === "scores" && (
                <div style={{ animation:"fadeIn 0.18s ease" }}>
                  {scoresLoading
                    ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:CR.textFaint, fontStyle:"italic" }}>Scoring…</p>
                    : scores
                      ? <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          {[["Prose",scores.prose],["Plot",scores.plot],["Characters",scores.characters],["Pacing",scores.pacing],["World-building",scores.worldBuilding],["Dialogue",scores.dialogue],["Ending",scores.ending]].map(([label,val]) => val != null && (
                            <div key={label} style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:CR.textDim, width:96, flexShrink:0 }}>{label}</span>
                              <div style={{ flex:1, height:6, borderRadius:3, background:CR.border, overflow:"hidden" }}>
                                <div style={{ height:"100%", borderRadius:3, background:CR.amber, width:`${val*10}%`, transition:"width 0.4s ease" }}/>
                              </div>
                              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:CR.amber, width:20, textAlign:"right", flexShrink:0 }}>{val}</span>
                            </div>
                          ))}
                        </div>
                      : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:CR.textFaint, fontStyle:"italic" }}>Unable to score.</p>}
                </div>
              )}
              {detailPanel === "obi" && (
                <div style={{ animation:"fadeIn 0.18s ease" }}>
                  {obiLoading
                    ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:CR.textFaint, fontStyle:"italic" }}>Obi is thinking…</p>
                    : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:CR.text, lineHeight:1.75 }}>{obiVerdict}</p>}
                </div>
              )}
              {!detailPanel && <p style={{ fontSize:13, color:CR.textFaint, fontStyle:"italic" }}>Select a section above.</p>}
            </div>
          )}

          {/* RANKINGS TAB */}
          {activeTab === "rankings" && (
            <div style={{ padding:"0 22px" }}>
              <p style={{ fontSize:13, color:CR.textFaint, fontStyle:"italic" }}>Rankings coming soon.</p>
            </div>
          )}

          {/* Save */}
          {activeTab === "edit" && <button onClick={() => onSave({ id:book.id, rating, shelf, genre, date, notes, coverUrl, coverId })} style={{ display:"block", width:"calc(100% - 44px)", margin:"20px 22px 0", padding:14, background:CR.text, border:"none", borderRadius:8, color:CR.bg, fontSize:14, fontFamily:"'DM Sans',sans-serif", fontWeight:500, letterSpacing:"0.05em", cursor:"pointer" }}>Save changes</button>}
          {activeTab === "edit" && onRemove && !confirmRemove && (
            <p onClick={()=>setConfirmRemove(true)} style={{ textAlign:"center", margin:"16px 0 8px", fontSize:13, color:"#a0524a", fontFamily:"'DM Sans',sans-serif", cursor:"pointer", textDecorationLine:"underline", textDecorationStyle:"dotted" }}>Remove from library</p>
          )}
          {activeTab === "edit" && onRemove && confirmRemove && (
            <div style={{ margin:"16px 22px 8px", textAlign:"center" }}>
              <p style={{ fontSize:13, color:CR.text, fontFamily:"'DM Sans',sans-serif", marginBottom:12 }}>Are you sure you want to remove this from your library?</p>
              <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                <button onClick={()=>setConfirmRemove(false)} style={{ padding:"7px 18px", background:"transparent", border:`1px solid ${CR.border}`, borderRadius:6, fontSize:13, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", color:CR.textDim }}>Cancel</button>
                <button onClick={()=>{ onRemove(book.id); onClose(); }} style={{ padding:"7px 18px", background:"rgba(160,82,74,0.1)", border:"1px solid rgba(160,82,74,0.3)", borderRadius:6, fontSize:13, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", color:"#a0524a" }}>Remove</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const STORAGE_KEY = "theshelf_books";

const TITLE_LOWER_WORDS = new Set(["a","an","the","and","but","or","nor","for","so","yet","at","by","in","of","on","to","up","as","vs","via"]);
function toTitleCase(str) {
  if (!str) return str;
  const words = str.split(" ");
  return words.map((word, i) => {
    if (!word) return word;
    // Split off any leading non-letter chars (e.g. "(") so we capitalize the actual word
    const m = word.match(/^([^a-zA-Z]*)([a-zA-Z].*)$/);
    if (!m) return word; // no letters (e.g. "#1)"), return as-is
    const prefix = m[1];
    const rest = m[2].toLowerCase();
    const isFirst = i === 0;
    const isLast = i === words.length - 1;
    // Only lowercase stop words when there's no leading punctuation (e.g. not after "(")
    if (!isFirst && !isLast && !prefix && TITLE_LOWER_WORDS.has(rest)) return rest;
    return prefix + rest.charAt(0).toUpperCase() + rest.slice(1);
  }).join(" ");
}

function normBookKey(title) {
  return (title || '').replace(/\s*[(:].*/,'').toLowerCase().replace(/[^\w]/g, '');
}

function normalizeGenre(genre) {
  if (!genre) return "Other";
  if (GENRES.includes(genre)) return genre;
  const g = genre.toLowerCase();
  if (g.includes("young adult") || g.includes("ya ") || g === "ya" || g.includes("teen") || g.includes("juvenile") || g.includes("children")) return "Young Adult";
  if (g.includes("graphic novel") || g.includes("comic") || g.includes("manga") || g.includes("illustrated")) return "Graphic Novel";
  if (g.includes("historical fiction") || (g.includes("histor") && g.includes("fiction"))) return "Historical Fiction";
  if (g.includes("horror") || g.includes("gothic") || g.includes("ghost") || g.includes("occult")) return "Horror";
  if (g.includes("thriller") || g.includes("suspense") || g.includes("true crime")) return "Thriller";
  if (g.includes("mystery") || g.includes("crime") || g.includes("detective") || g.includes("noir")) return "Mystery";
  if (g.includes("romance") || g.includes("chick lit") || g.includes("love story")) return "Romance";
  if (g.includes("fantasy") || g.includes("magic") || g.includes("fairy") || g.includes("mytholog") || g.includes("dragon") || g.includes("witch")) return "Fantasy";
  if (g.includes("sci-fi") || g.includes("science fiction") || g.includes("scifi") || g.includes("dystop") || g.includes("cyberpunk") || g.includes("steampunk") || g.includes("space opera") || g.includes("alien")) return "Sci-Fi";
  if (g.includes("biography") || g.includes("autobiography") || g.includes("memoir")) return "Biography";
  if (g.includes("self-help") || g.includes("self help") || g.includes("personal develop") || g.includes("motivat") || g.includes("productivity")) return "Self-Help";
  if (g.includes("history") || g.includes("historical")) return "History";
  if (g.includes("non-fiction") || g.includes("nonfiction") || g.includes("essay") || g.includes("journalism") || g.includes("psychology") || g.includes("philosophy") || g.includes("politics") || g.includes("economics") || g.includes("science") || g.includes("health") || g.includes("business") || g.includes("travel") || g.includes("religion") || g.includes("spirituality") || g.includes("nature")) return "Non-Fiction";
  if (g.includes("fiction") || g.includes("novel") || g.includes("literary") || g.includes("contemporary") || g.includes("classic") || g.includes("short stor")) return "Fiction";
  return "Other";
}

function bookToRow(book, userId) {
  return {
    user_id: userId,
    book_id: String(book.id),
    title: book.title || "",
    author: book.author || "",
    genre: book.genre || "Other",
    shelf: book.shelf || "Read",
    rating: book.rating || 0,
    pages: book.pages || 0,
    cover_url: book.coverUrl || null,
    cover_id: book.coverId ? String(book.coverId) : null,
    isbn: book.isbn || null,
    date: book.date || null,
    scores: book.scores || null,
    description: book.description || null,
    current_page: book.currentPage || 0,
    liked_aspects: book.likedAspects?.length ? book.likedAspects : null,
    disliked_aspects: book.dislikedAspects?.length ? book.dislikedAspects : null,
    notes: book.notes || null,
  };
}

function rowToBook(row) {
  return {
    id: row.book_id,
    title: row.title,
    author: row.author,
    genre: row.genre,
    shelf: row.shelf,
    rating: row.rating,
    pages: row.pages,
    coverUrl: row.cover_url,
    coverId: row.cover_id,
    isbn: row.isbn,
    date: row.date,
    scores: row.scores || null,
    description: row.description || null,
    currentPage: row.current_page || 0,
    likedAspects: row.liked_aspects || [],
    dislikedAspects: row.disliked_aspects || [],
    notes: row.notes || "",
  };
}

async function dbAddBook(book, userId) {
  const { error } = await supabase.from("books").insert(bookToRow(book, userId));
  if (error) console.error("dbAddBook:", error);
}

async function dbUpdateBook(book, userId) {
  const { error } = await supabase.from("books")
    .update(bookToRow(book, userId))
    .eq("book_id", String(book.id))
    .eq("user_id", userId);
  if (error) console.error("dbUpdateBook:", error);
}

async function dbDeleteBook(bookId, userId) {
  const { error } = await supabase.from("books")
    .delete()
    .eq("book_id", String(bookId))
    .eq("user_id", userId);
  if (error) console.error("dbDeleteBook:", error);
}

const GUEST_BOOKS_KEY = "guest_books";
const GUEST_OBI_KEY = "guest_obi_count";
function guestSaveBooks(books) { localStorage.setItem(GUEST_BOOKS_KEY, JSON.stringify(books)); }
function guestLoadBooks() { try { return JSON.parse(localStorage.getItem(GUEST_BOOKS_KEY) || "[]"); } catch { return []; } }
function guestClearAll() { localStorage.removeItem(GUEST_BOOKS_KEY); localStorage.removeItem(GUEST_OBI_KEY); }

function mapSubjectsToGenre(subjects = []) {
  const joined = subjects.slice(0, 30).join(" ").toLowerCase();
  if (/science fiction|sci-fi|space opera|cyberpunk|dystopi|speculative fiction/.test(joined)) return "Sci-Fi";
  if (/fantasy|magic|dragons|wizard|elves|swords|tolkien/.test(joined)) return "Fantasy";
  if (/mystery|detective|crime fiction|thriller|suspense/.test(joined)) return "Mystery";
  if (/romance|love story|romantic fiction/.test(joined)) return "Romance";
  if (/biography|autobiography|memoir/.test(joined)) return "Biography";
  if (/history|historical/.test(joined)) return "History";
  if (/self-help|self help|personal development|motivation|productivity/.test(joined)) return "Self-Help";
  if (/nonfiction|non-fiction|essays|journalism/.test(joined)) return "Non-Fiction";
  if (/fiction|novel|short stori/.test(joined)) return "Fiction";
  return "Other";
}

function cleanThumb(url) {
  return url ? url.replace("http://", "https://").replace("&edge=curl", "") : null;
}

async function fetchCoverForBook(book) {
  try {
    const res = await fetch("/api/fetch-cover", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: book.title, author: book.author, isbn: book.isbn }),
    });
    if (!res.ok) return { coverUrl: null, coverId: null };
    return await res.json();
  } catch {
    return { coverUrl: null, coverId: null };
  }
}

async function enrichBooksFromOpenLibrary(books, onProgress) {
  const results = [];
  const batchSize = 4;
  for (let i = 0; i < books.length; i += batchSize) {
    const batch = books.slice(i, i + batchSize);
    const enriched = await Promise.all(batch.map(async book => {
      try {
        const title = encodeURIComponent(book.title.replace(/\s*\(.*$/, "").trim());
        const author = encodeURIComponent(book.author);
        const isbn = book.isbn;

        const fetches = [
          // OpenLibrary by title+author
          fetch(`https://openlibrary.org/search.json?title=${title}&author=${author}&limit=1&fields=cover_i,subject`).then(r=>r.json()).catch(()=>null),
          // Google Books by title+author
          fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&maxResults=1&printType=books`).then(r=>r.json()).catch(()=>null),
          // Google Books by ISBN (if available)
          isbn ? fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=1`).then(r=>r.json()).catch(()=>null) : Promise.resolve(null),
        ];

        const [olData, gbTitleData, gbIsbnData] = await Promise.all(fetches);

        const olDoc = olData?.docs?.[0];
        const gbTitleThumb = gbTitleData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
        const gbIsbnThumb = gbIsbnData?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;

        return {
          ...book,
          // Google Books thumbnails are verified (only set when items[0] exists)
          coverUrl: cleanThumb(gbIsbnThumb) || cleanThumb(gbTitleThumb) || book.coverUrl || null,
          // OL search cover ID — reliable when returned, BookCover uses as fallback
          coverId: olDoc?.cover_i || null,
          // ISBN stored so BookCover can try OL ISBN CDN as last resort
          isbn: isbn || book.isbn || null,
          genre: olDoc ? mapSubjectsToGenre(olDoc.subject) : (book.genre || "Other"),
        };
      } catch { return book; }
    }));
    results.push(...enriched);
    if (onProgress) onProgress(results.length, books.length, "covers");
  }

  // AI genre classification for any books still on "Other"
  const unresolved = results.filter(b => b.genre === "Other");
  if (unresolved.length > 0) {
    if (onProgress) onProgress(results.length, books.length, "genres");
    try {
      const batchSize2 = 20;
      for (let i = 0; i < unresolved.length; i += batchSize2) {
        const batch = unresolved.slice(i, i + batchSize2).map(b => ({ id: String(b.id), title: b.title, author: b.author }));
        const res = await fetch("/api/classify-genres", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ books: batch }),
        });
        const data = await res.json();
        if (data.results) {
          for (const b of results) {
            if (data.results[String(b.id)]) b.genre = data.results[String(b.id)];
          }
        }
      }
    } catch {}
  }

  return results;
}

const DEFAULT_GR_SHELF_MAP = { "read": "Read", "to-read": "The List", "currently-reading": "Reading" };

function parseLine(line) {
  const fields = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i+1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === ',' && !inQ) {
      fields.push(cur); cur = "";
    } else cur += c;
  }
  fields.push(cur);
  return fields;
}

function getGoodreadsShelfCounts(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return {};
  const headers = parseLine(lines[0]).map(h => h.trim());
  const shelfIdx = headers.indexOf("Exclusive Shelf");
  if (shelfIdx === -1) return {};
  const counts = {};
  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const shelf = (parseLine(line)[shelfIdx] || "").trim().toLowerCase();
    if (shelf) counts[shelf] = (counts[shelf] || 0) + 1;
  }
  return counts;
}

function parseGoodreadsCSV(text, shelfMap = DEFAULT_GR_SHELF_MAP) {
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = parseLine(lines[0]).map(h => h.trim());
  const idx = k => headers.indexOf(k);
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const f = parseLine(line);
    const get = k => (f[idx(k)] || "").trim();
    const grShelf = get("Exclusive Shelf").toLowerCase();
    const dateRaw = get("Date Read") || get("Date Added");
    const date = dateRaw ? dateRaw.replace(/\//g, "-") : new Date().toISOString().slice(0,10);
    const rawIsbn = get("ISBN13") || get("ISBN");
    const isbn = rawIsbn.replace(/[^0-9X]/gi, "");
    return {
      id: Date.now() + Math.random(),
      title: get("Title"),
      author: get("Author"),
      genre: "Other",
      pages: parseInt(get("Number of Pages")) || 0,
      rating: parseFloat(get("My Rating")) || 0,
      date,
      shelf: shelfMap[grShelf] || "Read",
      isbn: isbn || null,
    };
  }).filter(b => b.title);
}

function AuthorModal({ author, books, onClose, onEdit, onAdd, onDirectAdd, userId }) {
  const [activeTab, setActiveTab] = useState("books");
  const [bio, setBio] = useState(null);
  const [bioLoading, setBioLoading] = useState(false);
  const [wikiImage, setWikiImage] = useState(null);
  const [biblio, setBiblio] = useState(null);
  const [biblioLoading, setBiblioLoading] = useState(false);
  const [biblioError, setBiblioError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(5);
  const [unreadCovers, setUnreadCovers] = useState({});
  const [sortedUnread, setSortedUnread] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [obiRec, setObiRec] = useState(null);
  const [obiRecLoading, setObiRecLoading] = useState(false);
  const [showObiRec, setShowObiRec] = useState(false);
  const touchMoved = useRef(false);

  async function fetchObiRec() {
    if (showObiRec) { setShowObiRec(false); return; }
    setShowObiRec(true);
    if (obiRec) return;
    setObiRecLoading(true);
    try {
      const profile = books.filter(b => b.shelf === "Read" || b.shelf === "DNF");
      const bibliography = (sortedUnread || []).slice(0, 20).map(b => ({ title: b.title, genre: b.genre, publishYear: b.publishYear }));
      const res = await fetch("/api/ask-obi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "recommend", author, bibliography, profile, userId }),
      });
      const data = await res.json();
      setObiRec(data.verdict || "Unable to make a recommendation.");
    } catch { setObiRec("Unable to make a recommendation."); }
    setObiRecLoading(false);
  }

  const CR = {
    bg: "#f5e8d0", panel: "#ece5d8", text: "#2a1e10",
    textDim: "#8a7060", textFaint: "#b8a888", border: "#d8ceba", amber: "#b86800",
  };

  const normAuthorName = s => (s||"").toLowerCase().replace(/[^a-z\s]/g,"").replace(/\s+/g," ").trim();
  const normAuthor = normAuthorName(author);
  const authorBooks = books.filter(b => {
    const nb = normAuthorName(b.author);
    return nb === normAuthor || nb.startsWith(normAuthor) || normAuthor.startsWith(nb);
  });

  // Fetch bibliography when books tab is active and we have no biblio yet
  useEffect(() => {
    if (activeTab !== "books" || biblio !== null || biblioLoading) return;
    setBiblioLoading(true);
    setBiblioError(null);
    fetch("/api/author-bibliography", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) { setBiblioError(data.error); setBiblio([]); }
        else setBiblio(data.items || []);
      })
      .catch(() => { setBiblioError("Failed to load bibliography."); setBiblio([]); })
      .finally(() => setBiblioLoading(false));
  }, [activeTab, author]);

  // Effect 1: sort/group bibliography and show first 5 immediately
  useEffect(() => {
    if (!biblio) return;

    const extractSeriesName = s => s ? s.replace(/,?\s*#\d+.*$/, "").trim() : null;
    const extractSeriesNum = s => { const m = (s || "").match(/#(\d+)/); return m ? parseInt(m[1]) : 999; };
    const stripSeries = t => (t || "").toLowerCase().replace(/\s*\(.*$/, "").split(/\s*[,:]\s*/)[0].trim().replace(/^(the|a|an) /, "");
    const libraryTitles = new Set(
      books
        .filter(b => { const nb = normAuthorName(b.author); return nb === normAuthor || nb.startsWith(normAuthor) || normAuthor.startsWith(nb); })
        .map(b => normBookKey(b.title))
    );
    const unread = biblio.filter(b => !libraryTitles.has(normBookKey(b.title)));

    const seriesMap = {};
    const seriesFirstIndex = {};
    const standalones = [];
    unread.forEach((book, idx) => {
      const sn = extractSeriesName(book.series);
      if (sn) {
        if (!seriesMap[sn]) { seriesMap[sn] = []; seriesFirstIndex[sn] = idx; }
        seriesMap[sn].push(book);
      } else {
        standalones.push({ book, idx });
      }
    });
    for (const sn in seriesMap) seriesMap[sn].sort((a, b) => extractSeriesNum(a.series) - extractSeriesNum(b.series));
    const entries = [
      ...Object.values(seriesMap).map(books => ({ books, idx: seriesFirstIndex[extractSeriesName(books[0].series)] })),
      ...standalones.map(({ book, idx }) => ({ books: [book], idx })),
    ].sort((a, b) => a.idx - b.idx);
    const sorted = entries.flatMap(e => e.books);

    const cached = {};
    biblio.forEach(b => { if (b.coverUrl) cached[b.title] = b.coverUrl; });
    setUnreadCovers(cached);
    setDisplayedCount(5);
    setSortedUnread(sorted);
  }, [biblio, books]);

  // Effect 2: fetch covers in batches of 5, expand display after each batch
  useEffect(() => {
    if (!sortedUnread?.length) return;
    let cancelled = false;
    (async () => {
      const total = Math.min(sortedUnread.length, 10);
      for (let i = 0; i < total; i += 5) {
        if (cancelled) break;
        const batch = sortedUnread.slice(i, i + 5);
        await Promise.all(batch.map(async b => {
          try {
            const r = await fetch("/api/fetch-cover", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: b.title, author }) });
            const d = await r.json();
            if (d.coverUrl && !cancelled) setUnreadCovers(prev => ({ ...prev, [b.title]: d.coverUrl }));
          } catch {}
        }));
        if (!cancelled) setDisplayedCount(i + 10);
      }
    })();
    return () => { cancelled = true; };
  }, [sortedUnread]);

  const tabs = [
    { key:"books",   label:"Books",   icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 2h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4"/><path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { key:"bio",     label:"Bio",     icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { key:"series",  label:"Series",  icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 4h3v8H2zM6 4h3v8H6zM10 4h3v8h-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
    { key:"awards",  label:"Awards",  icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
    { key:"related", label:"Related", icon:<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M6 8h2M10 4.5L6.5 7M10 11.5L6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  ];

  useEffect(() => {
    if (activeTab === "bio" && !bio) {
      setBioLoading(true);
      const q = encodeURIComponent(author);
      Promise.all([
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${q}`)
          .then(r => r.json())
          .then(data => { if (data.thumbnail?.source) setWikiImage(data.thumbnail.source); })
          .catch(() => {}),
        fetch("/api/author-bio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ author }),
        })
          .then(r => r.json())
          .then(data => { if (data.bio) setBio(data.bio); })
          .catch(() => {}),
      ]).finally(() => setBioLoading(false));
    }
  }, [activeTab]);

  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", zIndex:400, display:"flex", flexDirection:"column", justifyContent:"flex-end" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()} style={{ background:CR.bg, borderRadius:0, height:"98%", display:"flex", flexDirection:"column", boxShadow:"0 -4px 40px rgba(0,0,0,0.18)", borderTop:"6px solid #8a5a28", borderRight:"6px solid #8a5a28" }}>

        {/* Header */}
        <div style={{ padding:"20px 16px 0 22px", marginBottom:20, position:"relative", flexShrink:0 }}>
          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:24, fontWeight:400, color:CR.text, letterSpacing:"-0.01em" }}>{author}</p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:CR.textDim, marginTop:3 }}>{authorBooks.length} book{authorBooks.length !== 1 ? "s" : ""} in your library</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10, gap:8 }}>
            <button
              onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); if(sortedUnread?.length) fetchObiRec(); }}
              onClick={()=>{ if(sortedUnread?.length) fetchObiRec(); }}
              disabled={!sortedUnread?.length}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px", borderRadius:20, border:"none", cursor:sortedUnread?.length ? "pointer" : "not-allowed", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, transition:"all 0.15s", background:showObiRec ? CR.text : CR.panel, color:showObiRec ? CR.bg : CR.textDim, opacity:sortedUnread?.length ? 1 : 0.4, flexShrink:0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/></svg>
              Ask Obi
            </button>
            <div style={{ display:"flex", gap:2, background:CR.panel, borderRadius:6, padding:2 }}>
              {tabs.map(t => (
                <button key={t.key} onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); setActiveTab(t.key); }} onClick={()=>setActiveTab(t.key)} title={t.label} style={{ display:"flex", alignItems:"center", gap:4, padding:"8px 10px", border:"none", borderRadius:4, background:activeTab===t.key ? "#8a5a28" : "transparent", color:activeTab===t.key ? "#fff" : CR.textDim, fontSize:11, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", boxShadow:"none", transition:"all 0.12s", whiteSpace:"nowrap" }}>
                  {t.icon}{activeTab===t.key && <span style={{ marginLeft:2 }}>{t.label}</span>}
                </button>
              ))}
            </div>
          </div>
          {showObiRec && (
            <div style={{ marginTop:10, animation:"fadeIn 0.18s ease" }}>
              {obiRecLoading
                ? <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:CR.textFaint, fontStyle:"italic" }}>Obi is thinking…</p>
                : <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:CR.text, lineHeight:1.7 }}>{obiRec}</p>}
            </div>
          )}
          <button onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); onClose(); }} onClick={onClose} style={{ position:"absolute", top:20, right:16, background:CR.panel, border:"none", borderRadius:"50%", width:30, height:30, cursor:"pointer", color:CR.textDim, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:"0 18px 20px" }}>

          {activeTab === "books" && (() => {
            const SM = {
              "Read":     { bg:"rgba(60,120,80,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(60,120,80,0.4)"  },
              "Reading":  { bg:"rgba(210,100,30,0.55)", color:"rgba(255,255,255,0.9)", border:"rgba(210,100,30,0.4)" },
              "The List": { bg:"rgba(80,120,180,0.7)",  color:"rgba(255,255,255,0.9)", border:"rgba(80,120,180,0.5)" },
              "Curious":  { bg:"rgba(180,155,80,0.7)",  color:"rgba(255,255,255,0.9)", border:"rgba(180,155,80,0.5)" },
              "DNF":      { bg:"rgba(160,50,50,0.55)",  color:"rgba(255,255,255,0.9)", border:"rgba(160,50,50,0.4)" },
            };

            // Books already in library, sorted by shelf then date
            const shelfOrder = { "Read":0, "Reading":1, "The List":2, "Curious":3, "DNF":4 };
            const sortedAuthorBooks = [...authorBooks].sort((a, b) => {
              const ao = shelfOrder[a.shelf] ?? 5, bo = shelfOrder[b.shelf] ?? 5;
              if (ao !== bo) return ao - bo;
              if ((a.shelf === "Read") && (b.shelf === "Read"))
                return new Date(b.date || 0) - new Date(a.date || 0);
              return 0;
            });
            const libraryRows = sortedAuthorBooks.map(book => (
              <div key={book.id} onTouchStart={()=>{ touchMoved.current=false; }} onTouchMove={()=>{ touchMoved.current=true; }} onTouchEnd={e=>{ if(!touchMoved.current){ e.stopPropagation(); e.preventDefault(); onEdit&&onEdit(book); } }} onClick={()=>onEdit&&onEdit(book)} style={{ display:"flex", gap:12, padding:"12px 0", borderBottom:`1px solid ${CR.border}`, cursor:"pointer" }}>
                <BookCover book={book} width={42} height={62} radius={3} shadow="1px 1px 5px rgba(0,0,0,0.2)" />
                <div style={{ flex:1, minWidth:0, display:"flex", alignItems:"stretch", gap:8 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, color:CR.text, lineHeight:1.2, marginBottom:4 }}>{book.title}</p>
                    {book.rating > 0 && <StarRating value={book.rating} readonly size={14} />}
                    <div style={{ marginTop:6 }}>
                      <span style={{ background:GENRE_COLORS[book.genre]||"#94a3b8", color:"#fff", borderRadius:"20px", padding:"3px 8px", fontSize:8, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1 }}>{book.genre}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end", flexShrink:0 }}>
                    {(() => { const shelf = book.shelf || "Read"; const m = SM[shelf] || SM["Read"]; return <span style={{ background:m.bg, color:m.color, border:`1px solid ${m.border}`, borderRadius:"20px", padding:"3px 8px", fontSize:8, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1 }}>{shelf}</span>; })()}
                  </div>
                </div>
              </div>
            ));

            const unreadBooks = sortedUnread || [];
            const unreadSlice = unreadBooks.slice(0, displayedCount);

            const unreadRows = unreadSlice.map((book, i) => {
              const draft = { title:book.title, author, pages:book.pages||null, coverUrl:unreadCovers[book.title]||null, genre:book.genre||"Fiction" };
              return (
                <div key={`unread-${i}`} style={{ position:"relative", zIndex:openDropdown===book.title ? 10 : "auto", display:"flex", alignItems:"stretch", gap:12, padding:"12px 0", borderBottom:`1px solid ${CR.border}` }}>
                  {/* Tappable row area → EditSheet */}
                  <div onTouchStart={()=>{ touchMoved.current=false; }} onTouchMove={()=>{ touchMoved.current=true; }} onTouchEnd={e=>{ if(!touchMoved.current){ e.stopPropagation(); e.preventDefault(); setOpenDropdown(null); onAdd&&onAdd(draft); } }} onClick={e=>{ if(openDropdown) return; setOpenDropdown(null); onAdd&&onAdd(draft); }} style={{ display:"flex", gap:12, flex:1, minWidth:0, cursor:"pointer", opacity:0.75 }}>
                    <BookCover book={{ title:book.title, coverUrl:unreadCovers[book.title]||null }} width={42} height={62} radius={3} shadow="1px 1px 5px rgba(0,0,0,0.2)" />
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, color:CR.text, lineHeight:1.2, marginBottom:4 }}>{book.title}{book.series ? ` (${book.series})` : ""}</p>
                      {book.publishYear && <p style={{ fontSize:11, color:CR.textDim, fontFamily:"'DM Sans',sans-serif", marginBottom:6 }}>{book.publishYear}{book.pages ? ` · ${book.pages} pages` : ""}</p>}
                      {book.genre && <span style={{ background:GENRE_COLORS[book.genre]||"#94a3b8", color:"#fff", borderRadius:"20px", padding:"3px 8px", fontSize:8, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1 }}>{book.genre}</span>}
                    </div>
                  </div>
                  {/* + Add bubble */}
                  <div style={{ flexShrink:0, display:"flex", alignItems:"flex-end", paddingBottom:2, position:"relative" }}>
                    <span onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); setOpenDropdown(openDropdown===book.title ? null : book.title); }} onClick={e=>{ e.stopPropagation(); setOpenDropdown(openDropdown===book.title ? null : book.title); }} style={{ background:"rgba(138,90,40,0.18)", color:CR.textDim, border:"1px solid rgba(138,90,40,0.3)", borderRadius:"20px", padding:"3px 10px", fontSize:9, fontFamily:"'DM Sans',sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1, cursor:"pointer", whiteSpace:"nowrap" }}>+ Add</span>
                    {openDropdown === book.title && (
                      <div onClick={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()} style={{ position:"absolute", top:"calc(100% + 4px)", right:0, zIndex:50, minWidth:120, background:"#f5e8d0", borderRadius:10, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)" }}>
                        {SHELVES.map(s => (
                          <button key={s} onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); setOpenDropdown(null); onDirectAdd&&onDirectAdd({ ...draft, shelf:s }); }} onClick={e=>{ e.stopPropagation(); setOpenDropdown(null); onDirectAdd&&onDirectAdd({ ...draft, shelf:s }); }} style={{ display:"block", width:"100%", padding:"9px 14px", textAlign:"left", border:"none", background:"transparent", color:"#5a3820", fontSize:13, fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>{s}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            });

            return (
              <div>
                {libraryRows}
                {biblioLoading && !biblio && (
                  <p style={{ color:CR.textDim, fontSize:13, fontFamily:"'DM Sans',sans-serif", textAlign:"center", padding:"20px 0" }}>Loading bibliography…</p>
                )}
                {biblioError && (
                  <p style={{ color:CR.textDim, fontSize:12, fontFamily:"'DM Sans',sans-serif", textAlign:"center", padding:"16px 0", fontStyle:"italic" }}>{biblioError}</p>
                )}
                {unreadRows}
                {unreadBooks.length > displayedCount && displayedCount >= 10 && (
                  <button onTouchEnd={e=>{ e.stopPropagation(); e.preventDefault(); setDisplayedCount(v => v + 10); }} onClick={()=>setDisplayedCount(v => v + 10)} style={{ width:"100%", padding:"12px", marginTop:4, background:"transparent", border:`1px solid ${CR.border}`, borderRadius:8, color:CR.textDim, fontSize:13, fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
                    Show next 10
                  </button>
                )}
              </div>
            );
          })()}

          {activeTab === "bio" && (
            <div style={{ paddingTop:8 }}>
              {bioLoading && <p style={{ color:CR.textDim, textAlign:"center", paddingTop:40 }}>Loading…</p>}
              {!bioLoading && wikiImage && <img src={wikiImage} alt={author} style={{ width:90, height:90, objectFit:"cover", borderRadius:8, float:"right", margin:"0 0 12px 12px" }} />}
              {!bioLoading && bio && <p style={{ fontSize:14, color:CR.text, lineHeight:1.75 }}>{bio}</p>}
            </div>
          )}

          {(activeTab === "series" || activeTab === "awards" || activeTab === "related") && (
            <p style={{ color:CR.textDim, fontStyle:"italic", textAlign:"center", paddingTop:40 }}>Coming soon.</p>
          )}

        </div>
      </div>
    </div>
  );
}

function GoodreadsImportSheet({ onImport, onClose }) {
  const [csvText, setCsvText] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [grShelfCounts, setGrShelfCounts] = useState({});
  const [shelfMapping, setShelfMapping] = useState({});
  const [error, setError] = useState("");
  const [enriching, setEnriching] = useState(false);
  const [enrichProgress, setEnrichProgress] = useState(0);
  const [enrichPhase, setEnrichPhase] = useState("covers");
  const fileRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const text = ev.target.result;
        const counts = getGoodreadsShelfCounts(text);
        if (!Object.keys(counts).length) { setError("No books found — make sure this is a Goodreads export CSV."); setCsvText(null); return; }
        const mapping = {};
        for (const gr of Object.keys(counts)) mapping[gr] = DEFAULT_GR_SHELF_MAP[gr] || "Read";
        setCsvText(text);
        setGrShelfCounts(counts);
        setShelfMapping(mapping);
        setTotalCount(Object.values(counts).reduce((a,b)=>a+b,0));
        setError("");
      } catch { setError("Couldn't parse the file. Please use the Goodreads export CSV."); }
    };
    reader.readAsText(file);
  }

  const GR_LABEL = { "read": "Read", "to-read": "To Read", "currently-reading": "Currently Reading" };

  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.7)", zIndex:50, display:"flex", flexDirection:"column", justifyContent:"flex-end", animation:"fadeIn 0.15s ease" }}
      onClick={onClose}>
      <div onTouchEnd={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(180deg, #ddb870 0%, #c89850 100%)",
        borderRadius:"20px 20px 0 0",
        padding:"0 18px 30px",
        maxHeight:"90%", overflowY:"auto",
        borderTop:"1px solid rgba(220,180,100,0.5)",
        boxShadow:"0 -8px 32px rgba(0,0,0,0.3)",
        animation:"slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{ height:3, background:"linear-gradient(90deg, rgba(0,0,0,0.3), rgba(255,200,100,0.1) 40%, rgba(0,0,0,0.3))" }}/>
        <div style={{ display:"flex", justifyContent:"center", paddingTop:12, marginBottom:14 }}>
          <div style={{ width:34, height:4, background:"rgba(100,60,20,0.5)", borderRadius:2 }}/>
        </div>

        <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:22, fontWeight:300, marginBottom:6, color:WOOD.text }}>Import from Goodreads</p>
        <p style={{ fontSize:13, color:WOOD.textDim, marginBottom:18, lineHeight:1.5 }}>
          In Goodreads, go to <strong>My Books → Import/Export → Export Library</strong>. Then upload the downloaded CSV file below.
        </p>

        <button onClick={()=>fileRef.current.click()} style={{
          width:"100%", padding:"12px", borderRadius:10, cursor:"pointer",
          background:"rgba(255,245,220,0.85)", border:"2px dashed rgba(138,90,40,0.4)",
          fontFamily:"'DM Sans',sans-serif", fontSize:14, color:WOOD.textDim,
          marginBottom:12, textAlign:"center",
        }}>
          {csvText ? `✓ ${totalCount} books loaded — tap to change` : "Choose CSV file"}
        </button>
        <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} style={{ display:"none" }}/>

        {error && <p style={{ fontSize:13, color:"#c0392b", marginBottom:12, textAlign:"center" }}>{error}</p>}

        {csvText && (
          <div style={{ background:"rgba(255,245,220,0.85)", borderRadius:10, padding:"12px 14px", marginBottom:16, border:"1px solid rgba(200,160,80,0.3)" }}>
            <p style={{ fontSize:12, color:WOOD.textFaint, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12, fontFamily:"'DM Sans',sans-serif" }}>Shelf Mapping</p>
            {Object.entries(grShelfCounts).map(([grShelf, count]) => (
              <div key={grShelf} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:5 }}>
                  <span style={{ fontSize:13, color:WOOD.text, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
                    {GR_LABEL[grShelf] || grShelf}
                  </span>
                  <span style={{ fontSize:11, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif" }}>{count} books</span>
                </div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  {SHELVES.map(s => {
                    const active = shelfMapping[grShelf] === s;
                    return (
                      <button key={s} {...tc(()=>setShelfMapping(prev=>({...prev,[grShelf]:s})),true)} style={{
                        padding:"4px 10px", borderRadius:20, cursor:"pointer", fontSize:11,
                        fontFamily:"'DM Sans',sans-serif", fontWeight: active ? 700 : 400,
                        textTransform:"uppercase", letterSpacing:"0.05em",
                        background: active ? WOOD.amber : "rgba(138,90,40,0.1)",
                        color: active ? "#1a0900" : WOOD.textDim,
                        border: `1px solid ${active ? WOOD.amber : "rgba(138,90,40,0.25)"}`,
                        transition:"all 0.15s",
                      }}>{s}</button>
                    );
                  })}
                </div>
              </div>
            ))}
            <p style={{ fontSize:11, color:WOOD.textFaint, marginTop:8, fontStyle:"italic" }}>Covers and genres will be fetched automatically on import.</p>
          </div>
        )}

        {csvText && (
          <button onClick={async ()=>{
            setEnriching(true); setEnrichProgress(0); setEnrichPhase("covers");
            const parsed = parseGoodreadsCSV(csvText, shelfMapping);
            const enriched = await enrichBooksFromOpenLibrary(parsed, (done, total, phase) => {
              setEnrichPhase(phase);
              if (phase === "covers") setEnrichProgress(Math.round(done/total*100));
            });
            onImport(enriched); onClose();
          }} disabled={enriching} style={{
            width:"100%", padding:"13px", borderRadius:12, cursor: enriching ? "default" : "pointer",
            background:WOOD.amber, border:"none",
            fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, color:"#1a0900",
            opacity: enriching ? 0.8 : 1,
          }}>
            {enriching
              ? enrichPhase === "genres" ? "Classifying genres with AI…" : `Fetching covers… ${enrichProgress}%`
              : `Import ${totalCount} books`}
          </button>
        )}
      </div>
    </div>
  );
}

function LoginScreen({ onGuest }) {
  const [loading, setLoading] = useState(false);
  async function signIn() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  }
  return (
    <div style={{ width:"100%", height:"100dvh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:"#3a2010" }}>
      <WoodBg />
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"0 32px", maxWidth:340, width:"100%" }}>
        <img src="/shelf-logo.png" alt="The Shelf" style={{ height:90, width:"auto", marginBottom:8 }} />
        <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:36, fontWeight:300, color:WOOD.text, marginBottom:6, letterSpacing:"-0.01em" }}>The Shelf</p>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:WOOD.textFaint, marginBottom:40, textAlign:"center" }}>Your personal reading life</p>
        <button onClick={signIn} disabled={loading} style={{
          width:"100%", padding:"14px 24px", borderRadius:14, cursor: loading ? "default" : "pointer",
          background:`linear-gradient(135deg,${WOOD.amber},#f97316)`,
          border:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, color:"#1a0900",
          boxShadow:"0 4px 16px rgba(0,0,0,0.3)", opacity: loading ? 0.7 : 1,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#1a0900" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#1a0900" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#1a0900" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#1a0900" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? "Signing in…" : "Sign in with Google"}
        </button>
        <button onClick={onGuest} style={{
          width:"100%", padding:"12px 24px", borderRadius:14, cursor:"pointer", marginTop:12,
          background:"#ffffff", border:"none",
          fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, color:"#1a0900",
        }}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [guestMode, setGuestMode] = useState(false);
  const [books, setBooks] = useState([]);
  const [tab, setTab] = useState("shelf");
  const [showAdd, setShowAdd] = useState(false);
  const [addBookDraft, setAddBookDraft] = useState(null);
  const [authorModal, setAuthorModal] = useState(null);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const [editBook, setEditBook] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [showImport, setShowImport] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [coverFetchProgress, setCoverFetchProgress] = useState(null); // null | { done, total, found }
  const loadedUserRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Sync books to localStorage in guest mode
  useEffect(() => {
    if (!guestMode || session) return;
    guestSaveBooks(books);
  }, [books, guestMode, session]);

  // Load guest books when entering guest mode
  useEffect(() => {
    if (!guestMode || session) return;
    setBooks(guestLoadBooks());
  }, [guestMode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!session && !guestMode) { setBooks([]); loadedUserRef.current = null; return; }
    if (!session) return;
    const userId = session.user.id;
    // Prevent running twice for the same user (auth fires multiple events on load)
    if (loadedUserRef.current === userId) return;
    loadedUserRef.current = userId;
    supabase.from("books").select("*").eq("user_id", userId).order("created_at", { ascending: true })
      .then(async ({ data }) => {
        if (data && data.length > 0) {
          const loadedBooks = data.map(rowToBook);
          setBooks(loadedBooks);
          // One-time title case normalization for books added before the fix
          if (!localStorage.getItem("titlesCorrected2")) {
            localStorage.setItem("titlesCorrected2", "1");
            const toFix = loadedBooks.filter(b => b.title && b.title !== toTitleCase(b.title));
            for (const book of toFix) {
              const updated = { ...book, title: toTitleCase(book.title) };
              setBooks(prev => prev.map(b => b.id === book.id ? updated : b));
              dbUpdateBook(updated, userId);
            }
          }
          // Silently fetch covers for books that don't have one
          const missing = loadedBooks.filter(b => !b.coverUrl);
          for (let i = 0; i < missing.length; i += 4) {
            const batch = missing.slice(i, i + 4);
            await Promise.all(batch.map(async book => {
              const { coverUrl, coverId } = await fetchCoverForBook(book);
              if (coverUrl || coverId) {
                const updated = { ...book, coverUrl: coverUrl || book.coverUrl, coverId: book.coverId || coverId };
                setBooks(prev => prev.map(b => b.id === book.id ? updated : b));
                dbUpdateBook(updated, userId);
              }
            }));
          }
        } else {
          // Migrate from localStorage on first sign-in
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const localBooks = stored ? JSON.parse(stored) : [];
            if (localBooks.length > 0) {
              localStorage.removeItem(STORAGE_KEY); // clear before insert to prevent re-run
              supabase.from("books").insert(localBooks.map(b => bookToRow(b, userId)));
              setBooks(localBooks);
            }
          } catch {}
        }
      });
  }, [session]);

  if (authLoading) return (
    <div style={{ width:"100%", height:"100dvh", background:"#3a2010", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:28, height:28, border:`3px solid ${WOOD.amber}`, borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
    </div>
  );

  if (!session && !guestMode) return <LoginScreen onGuest={() => { guestClearAll(); setGuestMode(true); }} />;

  const userId = session?.user.id ?? "guest";

  function addBook(form) {
    if (books.some(b => normBookKey(b.title) === normBookKey(form.title) && (b.author||"").toLowerCase() === (form.author||"").toLowerCase())) return;
    const book = { id: Date.now(), ...form, genre: normalizeGenre(form.genre), pages: parseInt(form.pages)||0, date: new Date().toISOString().slice(0,10) };
    setBooks(prev => [...prev, book]);
    if (!guestMode) dbAddBook(book, userId);
    clearTimeout(toastTimer.current);
    setToast({ title: book.title, shelf: book.shelf || "Read" });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  function saveScores(id, scores) {
    const next = books.map(b => b.id === id ? { ...b, scores } : b);
    setBooks(next);
    if (!guestMode) dbUpdateBook(next.find(b => b.id === id), userId);
  }

  function saveDescription(id, description) {
    const next = books.map(b => b.id === id ? { ...b, description } : b);
    setBooks(next);
    if (!guestMode) dbUpdateBook(next.find(b => b.id === id), userId);
  }

  function saveProgress(id, currentPage) {
    const next = books.map(b => b.id === id ? { ...b, currentPage } : b);
    setBooks(next);
    if (!guestMode) dbUpdateBook(next.find(b => b.id === id), userId);
  }

  function savePages(id, pages) {
    const next = books.map(b => b.id === id ? { ...b, pages } : b);
    setBooks(next);
    if (!guestMode) dbUpdateBook(next.find(b => b.id === id), userId);
  }

  function saveAspects(id, likedAspects, dislikedAspects) {
    const next = books.map(b => b.id === id ? { ...b, likedAspects, dislikedAspects } : b);
    setBooks(next);
    if (!guestMode) dbUpdateBook(next.find(b => b.id === id), userId);
  }

  function saveEdit(updated) {
    const next = books.map(b => b.id === updated.id ? { ...b, rating: updated.rating, shelf: updated.shelf, genre: updated.genre ?? b.genre, date: updated.date ?? b.date, notes: updated.notes ?? b.notes, coverUrl: updated.coverUrl ?? b.coverUrl, coverId: updated.coverId ?? b.coverId } : b);
    setBooks(next);
    if (!guestMode) dbUpdateBook(next.find(b => b.id === updated.id), userId);
  }

  function changeShelf(id, shelf, rating) {
    const next = books.map(b => b.id === id ? { ...b, shelf, ...(rating != null ? { rating } : {}) } : b);
    setBooks(next);
    if (!guestMode) dbUpdateBook(next.find(b => b.id === id), userId);
  }

  async function fetchMissingCovers() {
    const missing = books;
    if (!missing.length) return;
    setShowProfileMenu(false);
    let found = 0;
    setCoverFetchProgress({ done: 0, total: missing.length, found: 0 });
    const batchSize = 4;
    for (let i = 0; i < missing.length; i += batchSize) {
      const batch = missing.slice(i, i + batchSize);
      await Promise.all(batch.map(async book => {
        const { coverUrl, coverId } = await fetchCoverForBook(book);
        if (coverUrl || coverId) {
          if (coverUrl) found++;
          const updated = { ...book, coverUrl: coverUrl || book.coverUrl, coverId: book.coverId || coverId };
          setBooks(prev => prev.map(b => b.id === book.id ? updated : b));
          if (!guestMode) dbUpdateBook(updated, userId);
        }
      }));
      setCoverFetchProgress({ done: Math.min(i + batchSize, missing.length), total: missing.length, found });
    }
    setCoverFetchProgress({ done: missing.length, total: missing.length, found, complete: true });
    setTimeout(() => setCoverFetchProgress(null), 4000);
  }

  async function importBooks(imported) {
    const existing = new Set(books.map(b => normBookKey(b.title)));
    const newBooks = imported.filter(b => !existing.has(normBookKey(b.title))).map(b => ({ ...b, genre: normalizeGenre(b.genre) }));
    if (!newBooks.length) return;
    setBooks(prev => [...prev, ...newBooks]);
    if (guestMode) return;
    const { error } = await supabase.from("books").insert(newBooks.map(b => bookToRow(b, userId)));
    if (error) alert("Import save failed: " + error.message);
  }

  return (
    <div style={{ position:"fixed", inset:0, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html, body, #root { height:100%; width:100%; overflow:hidden; background:#3a2010; }
        ::-webkit-scrollbar { width:2px; }
        ::-webkit-scrollbar-thumb { background:rgba(100,60,20,0.4); border-radius:2px; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(80px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeUp { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes spin { to{transform:rotate(360deg)} }
        input::placeholder { color:rgba(120,70,20,0.4); }
        input[type=number] { -moz-appearance:textfield; }
        input[type=number]::-webkit-inner-spin-button { display:none; }
        option { background:#3a2010; color:#f5e6d0; }
      `}</style>
        {/* wood background */}
        <WoodBg />

        {/* decorative shelf + header */}
        {(() => {
          const SHELF_H = 82;
          const progress = Math.min(scrollY / SHELF_H, 1);
          return (
            <div style={{
              flexShrink: 0,
              height: SHELF_H,
              overflow: "hidden",
              position: "relative",
              zIndex: 10,
              marginBottom: -(progress * SHELF_H),
              pointerEvents: progress > 0 ? "none" : "auto",
            }}>
              <div style={{
                opacity: 1 - progress,
                transform: `translateY(${-progress * SHELF_H}px)`,
                willChange: "transform, opacity",
              }}>
                <DecorativeShelf books={books} />
                {tab==="stats" && <div style={{ padding:"2px 20px 4px" }}><h1 style={{ fontFamily:"'Crimson Pro',serif", fontWeight:300, fontSize:30, color:WOOD.text, letterSpacing:"-0.01em" }}>Statistics</h1></div>}
                {tab==="rankings" && <div style={{ padding:"2px 20px 4px" }}><h1 style={{ fontFamily:"'Crimson Pro',serif", fontWeight:300, fontSize:30, color:WOOD.text, letterSpacing:"-0.01em" }}>Rankings</h1></div>}
              </div>
            </div>
          );
        })()}

        {/* content */}
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
          {tab==="shelf"
            ? <ShelfTab books={books} onAdd={()=>setShowAdd(true)} onAddBook={book=>{ setAddBookDraft({ id:Date.now(), title:book.title, author:book.author, genre:normalizeGenre(book.genre), pages:parseInt(book.pages)||0, rating:0, shelf:"Read", coverUrl:book.coverUrl||null, coverId:book.coverId||null, date:new Date().toISOString().slice(0,10), description:"", scores:null, notes:"" }); }} onRemove={id=>{ setBooks(prev => prev.filter(b=>b.id!==id)); if (!guestMode) dbDeleteBook(id, userId); }} onEdit={setEditBook} onScroll={setScrollY} onShelfChange={changeShelf} onImport={()=>setShowImport(true)} onSaveScores={saveScores} onSaveDescription={saveDescription} onSaveProgress={saveProgress} onSavePages={savePages} onSaveAspects={saveAspects} hideControls={!!editBook} onAuthor={setAuthorModal} userId={userId} guestMode={guestMode} />
            : tab==="reiko"
            ? <RecommendPage books={books} userId={userId} onAddDirect={(book, shelf) => { const b = { id:Date.now(), ...book, genre:normalizeGenre(book.genre), shelf, rating:0, date:new Date().toISOString().slice(0,10) }; setBooks(prev => [...prev, b]); if (!guestMode) dbAddBook(b, userId); }} onAuthor={setAuthorModal} onEdit={setEditBook} onAddBook={book=>{ setAddBookDraft({ id:Date.now(), title:book.title, author:book.author, genre:normalizeGenre(book.genre), pages:parseInt(book.pages)||0, rating:0, shelf:"Read", coverUrl:book.coverUrl||null, coverId:book.coverId||null, date:new Date().toISOString().slice(0,10), description:"", scores:null, notes:"" }); }} />
            : tab==="rankings"
            ? <RankingsTab books={books} onSaveScores={saveScores} userId={userId} onAddBook={book=>{ setAddBookDraft({ id:Date.now(), title:book.title, author:book.author, genre:normalizeGenre(book.genre), pages:parseInt(book.pages)||0, rating:0, shelf:"Read", coverUrl:book.coverUrl||null, coverId:book.coverId||null, date:new Date().toISOString().slice(0,10), description:"", scores:null, notes:"" }); }} onAddDirect={(book, shelf) => { const b = { id:Date.now(), ...book, genre:normalizeGenre(book.genre), shelf, date:new Date().toISOString().slice(0,10) }; setBooks(prev => [...prev, b]); if (!guestMode) dbAddBook(b, userId); }} onShelfChange={changeShelf} onEdit={setEditBook} />
            : <StatsTab books={books} />
          }
          {showAdd && <AddSheet onSave={addBook} onClose={()=>setShowAdd(false)} />}
          {addBookDraft && <EditSheet book={addBookDraft} onSave={updated=>{ addBook({...addBookDraft,...updated}); setAddBookDraft(null); }} onClose={()=>setAddBookDraft(null)} onSaveDescription={()=>{}} onSaveScores={()=>{}} onAuthor={setAuthorModal} libraryProfile={books.filter(b => b.shelf === "Read" || b.shelf === "DNF")} userId={userId} />}
          {editBook && <EditSheet key={editBook.id} book={editBook} onSave={updated=>{ saveEdit(updated); setEditBook(null); }} onClose={()=>setEditBook(null)} onSaveDescription={saveDescription} onSaveScores={saveScores} onAuthor={setAuthorModal} onRemove={id=>{ setBooks(prev=>prev.filter(b=>b.id!==id)); if (!guestMode) dbDeleteBook(id, userId); setEditBook(null); }} libraryProfile={books.filter(b => b.shelf === "Read" || b.shelf === "DNF")} userId={userId} />}
          {authorModal && <AuthorModal author={authorModal} books={books} onClose={()=>setAuthorModal(null)} onEdit={book=>{ setAuthorModal(null); setEditBook(book); }} onAdd={draft=>{ setAuthorModal(null); setEditBook(null); setAddBookDraft({ id:Date.now(), title:draft.title, author:draft.author, genre:draft.genre||"Fiction", pages:draft.pages||0, rating:0, shelf:"Read", coverUrl:draft.coverUrl||null, coverId:null, date:new Date().toISOString().slice(0,10), description:"", scores:null, notes:"" }); }} onDirectAdd={draft=>{ addBook({ title:draft.title, author:draft.author, genre:draft.genre||"Fiction", pages:draft.pages||0, rating:0, shelf:draft.shelf, coverUrl:draft.coverUrl||null, coverId:null, description:"", scores:null, notes:"" }); }} userId={userId} />}
          {showImport && <GoodreadsImportSheet onImport={importBooks} onClose={()=>setShowImport(false)} />}
          {toast && (
            <div style={{
              position:"fixed", bottom:90, left:0, right:0,
              background:"#22c55e", zIndex:200,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              padding:"13px 20px",
              boxShadow:"0 -2px 12px rgba(0,0,0,0.2)",
              animation:"slideUp 0.2s ease",
            }}>
              <span style={{ fontSize:15, color:"#fff" }}>✓</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {toast.title} added to {toast.shelf}
              </span>
            </div>
          )}
        </div>

        {/* tab bar */}
        <div style={{
          display:"flex",
          background:"linear-gradient(180deg, #c89050 0%, #b07838 100%)",
          borderTop:"1px solid rgba(200,150,70,0.4)",
          paddingTop:2,
          paddingBottom:"calc(6px + env(safe-area-inset-bottom, 0px))",
          flexShrink:0,
          position:"relative", zIndex:10,
        }}>
          {[{ id:"shelf", label:"Shelf" },{ id:"stats", label:"Breakdown" },{ id:"reiko", label:"Reiko" },{ id:"rankings", label:"Rankings" }].map(({ id,label })=>(
            <button key={id}
              onTouchEnd={e=>{ e.preventDefault(); setTab(id); }}
              onClick={()=>setTab(id)} style={{
              flex:1, background:"transparent", border:"none", cursor:"pointer",
              display:"flex", justifyContent:"center", alignItems:"center", padding:"6px 8px",
            }}>
              <span style={{
                width:64, height:44, borderRadius:20,
                background: tab===id ? WOOD.amber : "rgba(0,0,0,0.18)",
                color: tab===id ? "#1a0900" : WOOD.textFaint,
                fontSize:13, fontFamily:"'DM Sans',sans-serif", fontWeight:600,
                transition:"all 0.2s", letterSpacing:"0.02em",
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                flexShrink:0,
              }}>
                {id==="shelf"
                  ? <img src="/books_no_bg.png" alt="Shelf" style={{ width:72, height:50, objectFit:"contain", display:"block", opacity: tab===id ? 1 : 0.55, transition:"opacity 0.2s" }} />
                  : id==="stats"
                  ? <img src="/three_books_breakdown.png" alt="Breakdown" style={{ width:44, height:32, objectFit:"contain", display:"block", opacity: tab===id ? 1 : 0.55, transition:"opacity 0.2s" }} />
                  : id==="reiko"
                  ? <img src="/recommend_book.png" alt="Reiko" style={{ width:44, height:32, objectFit:"contain", display:"block", opacity: tab===id ? 1 : 0.55, transition:"opacity 0.2s" }} />
                  : id==="rankings"
                  ? <img src="/all_3_books_no_bg.png" alt="Rankings" style={{ width:44, height:32, objectFit:"contain", display:"block", opacity: tab===id ? 1 : 0.55, transition:"opacity 0.2s" }} />
                  : label}
              </span>
            </button>
          ))}
          {/* profile menu button */}
          <div style={{ flex:1, position:"relative", display:"flex", justifyContent:"center" }}>
            <button onClick={()=>setShowProfileMenu(m=>!m)} style={{
              background:"transparent", border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              padding:"6px 12px",
            }}>
              <span style={{
                padding:"0px 6px", borderRadius:20,
                background: showProfileMenu ? WOOD.amber : "rgba(0,0,0,0.18)",
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                transition:"background 0.2s",
              }}>
                <img src="/reader_no_bg.png" alt="Account" style={{ height:50, width:"auto", display:"block", margin:"-8px -4px", opacity: showProfileMenu ? 1 : 0.55, filter:"brightness(0) invert(1)", transition:"opacity 0.2s" }} />
              </span>
            </button>

            {showProfileMenu && (
              <>
                <div onClick={()=>setShowProfileMenu(false)} style={{ position:"fixed", inset:0, zIndex:40 }} />
                <div style={{
                  position:"absolute", bottom:"calc(100% + 6px)", right:0, zIndex:50, minWidth:220,
                  background:"#f5e8d0", borderRadius:12, overflow:"hidden",
                  boxShadow:"0 -4px 20px rgba(0,0,0,0.25)", border:"1px solid rgba(138,90,40,0.3)",
                  animation:"fadeIn 0.12s ease",
                }}>
                  {/* user info */}
                  <div style={{ padding:"12px 16px 10px", borderBottom:"1px solid rgba(138,90,40,0.15)", display:"flex", alignItems:"center", gap:10 }}>
                    {guestMode
                      ? <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(138,90,40,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={WOOD.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        </div>
                      : session.user.user_metadata?.avatar_url
                      ? <img src={session.user.user_metadata.avatar_url} style={{ width:32, height:32, borderRadius:"50%", flexShrink:0 }} />
                      : <div style={{ width:32, height:32, borderRadius:"50%", background:WOOD.amber, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <span style={{ fontSize:14, fontWeight:600, color:"#1a0900" }}>{(session.user.email||"?")[0].toUpperCase()}</span>
                        </div>
                    }
                    <div style={{ minWidth:0 }}>
                      <p style={{ fontSize:13, fontWeight:600, color:WOOD.text, fontFamily:"'DM Sans',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {guestMode ? "Guest" : (session.user.user_metadata?.full_name || session.user.email)}
                      </p>
                      <p style={{ fontSize:11, color:WOOD.textFaint, fontFamily:"'DM Sans',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {guestMode ? "Books won't be saved" : session.user.email}
                      </p>
                    </div>
                  </div>
                  {!guestMode && <button onClick={()=>{ setShowProfileMenu(false); setShowImport(true); }} style={{
                    display:"flex", alignItems:"center", gap:10,
                    width:"100%", padding:"12px 16px", textAlign:"left",
                    background:"transparent", border:"none", cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif", fontSize:14, color:WOOD.text, fontWeight:400,
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WOOD.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    Import from Goodreads
                  </button>}
                  {!guestMode && <button onClick={fetchMissingCovers} disabled={!!coverFetchProgress} style={{
                    display:"flex", alignItems:"center", gap:10,
                    width:"100%", padding:"12px 16px", textAlign:"left",
                    background:"transparent", border:"none", borderTop:"1px solid rgba(138,90,40,0.15)", cursor: coverFetchProgress ? "default" : "pointer",
                    fontFamily:"'DM Sans',sans-serif", fontSize:14, color:WOOD.text, fontWeight:400,
                    opacity: coverFetchProgress ? 0.6 : 1,
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WOOD.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                    Fetch missing covers
                  </button>}
                  {guestMode
                    ? <button onClick={async ()=>{ setShowProfileMenu(false); guestClearAll(); setGuestMode(false); await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo: window.location.origin } }); }} style={{
                        display:"flex", alignItems:"center", gap:10,
                        width:"100%", padding:"12px 16px", textAlign:"left",
                        background:"transparent", border:"none", borderTop:"1px solid rgba(138,90,40,0.15)", cursor:"pointer",
                        fontFamily:"'DM Sans',sans-serif", fontSize:14, color:WOOD.amber, fontWeight:500,
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WOOD.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        Sign in to save your books
                      </button>
                    : <button onClick={()=>{ setShowProfileMenu(false); supabase.auth.signOut(); }} style={{
                        display:"flex", alignItems:"center", gap:10,
                        width:"100%", padding:"12px 16px", textAlign:"left",
                        background:"transparent", border:"none", borderTop:"1px solid rgba(138,90,40,0.15)", cursor:"pointer",
                        fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#c0392b", fontWeight:400,
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Sign out
                      </button>
                  }
                </div>
              </>
            )}
          </div>
        </div>
        {coverFetchProgress && (
          <div style={{
            position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)",
            background:"#2a1505", color:"#f5e8d0", borderRadius:12, padding:"12px 20px",
            fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500,
            boxShadow:"0 4px 20px rgba(0,0,0,0.5)", zIndex:200,
            animation:"slideUp 0.2s ease", whiteSpace:"nowrap",
          }}>
            {coverFetchProgress.complete
              ? `Done — ${coverFetchProgress.found} cover${coverFetchProgress.found !== 1 ? "s" : ""} updated out of ${coverFetchProgress.total} checked`
              : `Fetching covers… ${coverFetchProgress.done}/${coverFetchProgress.total}`}
          </div>
        )}
    </div>
  );
}

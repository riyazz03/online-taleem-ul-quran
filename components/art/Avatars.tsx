/**
 * Illustrated profile badges for testimonials. Each variant is a tiny
 * scene in the brand palette (no faces, no figures) drawn on a 64×64 grid
 * so it stays crisp at 48–56px. Gradient ids are derived from `useId()`,
 * so any number of badges can share a page (including the duplicated
 * copies a marquee renders).
 */
import { useId } from "react";
import { cn } from "@/lib/utils";
import "./avatars.css";

export const avatarVariants = [
  "mosque",
  "lantern",
  "rehal",
  "minaret",
  "letters",
  "palm",
  "tasbih",
  "qalam",
] as const;

export type AvatarVariant = (typeof avatarVariants)[number];

type SceneProps = { u: string };

const r2 = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/* 1. Crescent over a mosque at night — deep teal night sky           */
/* ------------------------------------------------------------------ */
const NIGHT_STARS: Array<[number, number, number, number]> = [
  [10, 16, 0.75, 0], [18, 8, 0.6, 1.2], [26, 17, 0.55, 0.5], [31, 7, 0.5, 2],
  [57, 31, 0.55, 0.8], [7, 27, 0.5, 1.6], [53, 5, 0.5, 2.4], [22, 25, 0.45, 0.3],
];

function MosqueScene({ u }: SceneProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1d1c" />
          <stop offset="0.55" stopColor="#173634" />
          <stop offset="1" stopColor="#2e6560" />
        </linearGradient>
        <radialGradient id={`${u}-glow`}>
          <stop offset="0" stopColor="#ecd6a4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ecd6a4" stopOpacity="0" />
        </radialGradient>
        <mask id={`${u}-moon`}>
          <circle cx={44.5} cy={17} r={7.5} fill="white" />
          <circle cx={48} cy={14.2} r={6.6} fill="black" />
        </mask>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-sky)`} />
      {NIGHT_STARS.map(([x, y, r, d], i) => (
        <circle key={i} className="pb-twinkle" cx={x} cy={y} r={r} fill="#fbf6ea" style={{ animationDelay: `${d}s` }} />
      ))}
      <circle className="pb-flicker" cx={44.5} cy={17} r={15} fill={`url(#${u}-glow)`} />
      <rect x={36} y={8} width={18} height={18} fill="#ecd6a4" mask={`url(#${u}-moon)`} />
      <g fill="#0a1a19">
        {/* minarets */}
        <path d="M8.2,64 V38 H11.8 V64 Z M7.3,38.2 H12.7 V36.6 H7.3 Z M8.4,36.6 L10,30.4 L11.6,36.6 Z" />
        <path d="M52.2,64 V38 H55.8 V64 Z M51.3,38.2 H56.7 V36.6 H51.3 Z M52.4,36.6 L54,30.4 L55.6,36.6 Z" />
        <circle cx={10} cy={29.6} r={0.8} />
        <circle cx={54} cy={29.6} r={0.8} />
        {/* side domes */}
        <path d="M13,50 C13,46 16,44.6 18.5,42 C21,44.6 24,46 24,50 Z" />
        <path d="M40,50 C40,46 43,44.6 45.5,42 C48,44.6 51,46 51,50 Z" />
        {/* main dome + finial with crescent */}
        <path d="M19.5,50 C19.5,41.5 26,38.6 32,32.6 C38,38.6 44.5,41.5 44.5,50 Z" />
        <rect x={31.4} y={27.4} width={1.2} height={6} rx={0.6} />
        <path d="M32,23.4 a2.2,2.2 0 1,0 1.76,3.52 a1.76,1.76 0 1,1 -1.76,-3.52 Z" />
        {/* prayer hall */}
        <rect x={6} y={49} width={52} height={15} />
      </g>
      {/* lit door and windows */}
      <g className="pb-flicker" fill="#e0bd74">
        <path d="M29.6,64 V57.6 a2.4,2.4 0 0 1 4.8,0 V64 Z" />
        <path d="M20.2,57.4 v-2.6 a1.2,1.2 0 0 1 2.4,0 v2.6 Z M41.4,57.4 v-2.6 a1.2,1.2 0 0 1 2.4,0 v2.6 Z" opacity={0.85} />
        <path d="M13.4,57.4 v-2.6 a1.2,1.2 0 0 1 2.4,0 v2.6 Z M48.2,57.4 v-2.6 a1.2,1.2 0 0 1 2.4,0 v2.6 Z" opacity={0.6} />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Glowing hanging lantern (fanoos) in a mihrab niche               */
/* ------------------------------------------------------------------ */
function LanternScene({ u }: SceneProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#234c4a" />
          <stop offset="1" stopColor="#0b1d1c" />
        </linearGradient>
        <radialGradient id={`${u}-halo`}>
          <stop offset="0" stopColor="#ffe6a6" stopOpacity="0.75" />
          <stop offset="0.45" stopColor="#d2a554" stopOpacity="0.3" />
          <stop offset="1" stopColor="#d2a554" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${u}-glass`} cy="0.55">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="0.55" stopColor="#ecd09a" />
          <stop offset="1" stopColor="#c69846" />
        </radialGradient>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-bg)`} />
      {/* mihrab niche */}
      <path d="M11,66 V34 C11,22 21,14 32,7 C43,14 53,22 53,34 V66 Z" fill="#0f2524" opacity={0.55} />
      <path
        d="M11,66 V34 C11,22 21,14 32,7 C43,14 53,22 53,34 V66"
        fill="none"
        stroke="#d2a554"
        strokeOpacity={0.35}
        strokeWidth={0.8}
      />
      <g className="pb-swing" style={{ transformOrigin: "32px 0px" }}>
        <line x1={32} y1={-1} x2={32} y2={5} stroke="#d2a554" strokeWidth={0.8} strokeDasharray="1.4 1" />
        <circle className="pb-flicker" cx={32} cy={34} r={25} fill={`url(#${u}-halo)`} />
        <g transform="translate(12.8 4.2) scale(0.48)">
          <circle cx={40} cy={4} r={4} fill="none" stroke="#d2a554" strokeWidth={2.4} />
          <path d="M26 22 Q40 2 54 22 Z" fill="#d2a554" />
          <rect x={24} y={21} width={32} height={5} rx={2} fill="#a07230" />
          <path
            d="M27 26 C18 50 20 78 40 96 C60 78 62 50 53 26 Z"
            fill={`url(#${u}-glass)`}
            stroke="#7f5829"
            strokeWidth={2.4}
          />
          <path
            d="M40 26 V96 M31 30 C25 52 28 74 38 90 M49 30 C55 52 52 74 42 90"
            stroke="#7f5829"
            strokeWidth={1.8}
            fill="none"
          />
          <path d="M33 60 Q40 46 47 60" stroke="#7f5829" strokeWidth={1.8} fill="none" />
          <path d="M36 95 H44 L40 112 Z" fill="#d2a554" />
          <circle cx={40} cy={115} r={3} fill="#d2a554" />
        </g>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Open Quran on a rehal — golden dawn                              */
/* ------------------------------------------------------------------ */
const RAYS = [-56, -36, -18, 0, 18, 36, 56];

function RehalScene({ u }: SceneProps) {
  const lines = [0, 1, 2];
  return (
    <>
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="0.55" stopColor="#f5ead0" />
          <stop offset="1" stopColor="#e6c98e" />
        </linearGradient>
        <radialGradient id={`${u}-glow`}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-bg)`} />
      <g className="pb-rays" style={{ transformOrigin: "32px 36px" }}>
        {RAYS.map((a) => (
          <path key={a} d="M32,36 L29.6,2 L34.4,2 Z" fill="#e0bd74" opacity={0.32} transform={`rotate(${a} 32 36)`} />
        ))}
      </g>
      <circle className="pb-flicker" cx={32} cy={31} r={21} fill={`url(#${u}-glow)`} />
      <ellipse cx={32} cy={58.6} rx={17} ry={1.8} fill="#a07230" opacity={0.2} />
      {/* rehal stand */}
      <path d="M17,58 L45,38 M47,58 L19,38" stroke="#2b605b" strokeWidth={3.1} strokeLinecap="round" />
      <path d="M17,58 L45,38 M47,58 L19,38" stroke="#45938b" strokeWidth={1} strokeLinecap="round" opacity={0.55} />
      <circle cx={32} cy={47.3} r={1.3} fill="#d2a554" />
      {/* cover */}
      <path
        d="M32,42.8 C27,38.2 19.5,36.9 9.8,37.4 L9.3,29.6 C19,29.2 27,31.6 32,36.4 C37,31.6 45,29.2 54.7,29.6 L54.2,37.4 C44.5,36.9 37,38.2 32,42.8 Z"
        fill="#234c4a"
      />
      {/* pages */}
      <path
        d="M32,41 C27,36.5 20,35 11.6,35.6 L11.1,28 C19.5,27.6 27,30 32,35 Z"
        fill="#fbf6ea"
        stroke="#d2a554"
        strokeWidth={0.5}
      />
      <path
        d="M32,41 C37,36.5 44,35 52.4,35.6 L52.9,28 C44.5,27.6 37,30 32,35 Z"
        fill="#fbf6ea"
        stroke="#d2a554"
        strokeWidth={0.5}
      />
      <g stroke="#63aea7" strokeWidth={0.65} strokeLinecap="round" fill="none">
        {lines.map((i) => {
          const o = i * 1.75;
          return (
            <g key={i}>
              <path d={`M14.4,${30.2 + o} C20,${30 + o} 26,${31.6 + o} 29.8,${35 + o * 0.9}`} />
              <path d={`M49.6,${30.2 + o} C44,${30 + o} 38,${31.6 + o} 34.2,${35 + o * 0.9}`} />
            </g>
          );
        })}
      </g>
      <path d="M32,35 V41" stroke="#d2a554" strokeWidth={0.6} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Minaret silhouette at dusk                                       */
/* ------------------------------------------------------------------ */
const DUSK_STARS: Array<[number, number, number, number]> = [
  [40, 8, 0.5, 0.4], [52, 13, 0.45, 1.5], [12, 13, 0.5, 2.1], [31, 5, 0.4, 0.9], [58, 24, 0.4, 2.6],
];

function MinaretScene({ u }: SceneProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b3a39" />
          <stop offset="0.38" stopColor="#347770" />
          <stop offset="0.74" stopColor="#e0bd74" />
          <stop offset="1" stopColor="#f5ead0" />
        </linearGradient>
        <radialGradient id={`${u}-sun`}>
          <stop offset="0" stopColor="#fff3cf" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff3cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-sky)`} />
      {DUSK_STARS.map(([x, y, r, d], i) => (
        <circle key={i} className="pb-twinkle" cx={x} cy={y} r={r} fill="#fbf6ea" style={{ animationDelay: `${d}s` }} />
      ))}
      <circle className="pb-flicker" cx={45} cy={46} r={15} fill={`url(#${u}-sun)`} />
      <circle cx={45} cy={46} r={6.4} fill="#fbf6ea" />
      <g className="pb-birds" stroke="#0f2524" strokeWidth={0.65} strokeLinecap="round" fill="none">
        <path d="M35,21 q1.4,-1.3 2.8,0 q1.4,-1.3 2.8,0" />
        <path d="M43,16.6 q1,-0.9 2,0 q1,-0.9 2,0" />
      </g>
      {/* distant domes */}
      <g fill="#1b3a39" opacity={0.9}>
        <path d="M32,64 V54 H66 V64 Z" />
        <path d="M37,54 C37,49.5 41,47.8 44.5,45 C48,47.8 52,49.5 52,54 Z" />
        <rect x={44.1} y={41.4} width={0.8} height={4} rx={0.4} />
        <path d="M55,54 V45.2 H57.4 V54 Z M54.6,45.4 L56.2,40.4 L57.8,45.4 Z" />
      </g>
      <rect x={0} y={60} width={64} height={4} fill="#0f2524" />
      {/* minaret */}
      <g fill="#0f2524">
        <path d="M18.6,64 L19.4,38 H24.6 L25.4,64 Z" />
        <rect x={16.6} y={44} width={10.8} height={1.6} rx={0.4} />
        <path d="M18,45.6 L22,48.4 L26,45.6 Z" />
        <rect x={17.4} y={36.6} width={9.2} height={1.5} rx={0.4} />
        <path d="M18.6,38.1 L22,40.4 L25.4,38.1 Z" />
        <path d="M19.8,37 V29 H24.2 V37 Z" />
        <rect x={19.2} y={28} width={5.6} height={1.2} rx={0.4} />
        <path d="M20.4,28.2 V24.4 H23.6 V28.2 Z" />
        <path d="M19.9,24.6 C19.9,21.6 22,20.8 22,18.6 C22,20.8 24.1,21.6 24.1,24.6 Z" />
        <rect x={21.7} y={14.8} width={0.6} height={4.2} />
        <path d="M22,11.9 a1.1,1.1 0 1,0 0.88,1.76 a0.88,0.88 0 1,1 -0.88,-1.76 Z" />
      </g>
      <g className="pb-flicker" fill="#e0bd74">
        <path d="M21.4,56 v-2.6 a0.6,0.6 0 0 1 1.2,0 v2.6 Z" />
        <path d="M21.4,34.6 v-2.4 a0.6,0.6 0 0 1 1.2,0 v2.4 Z" />
        <path d="M21.4,27.6 v-1.8 a0.6,0.6 0 0 1 1.2,0 v1.8 Z" />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Arabic letter tiles (alif, ba, ta) on ruled notebook paper       */
/* ------------------------------------------------------------------ */
const TILES = [
  // right to left, as Arabic is read: alif, ba, ta
  { ch: "\u0627", x: 49, y: 35, rot: 7, face: "#2b605b", edge: "#1b3a39", ink: "#fbf6ea", delay: 0 },
  { ch: "\u0628", x: 32, y: 29.5, rot: -2, face: "#fbf6ea", edge: "#d2a554", ink: "#1b3a39", delay: 0.12 },
  { ch: "\u062a", x: 15, y: 35, rot: -8, face: "#d2a554", edge: "#a07230", ink: "#0f2524", delay: 0.24 },
];

function LettersScene({ u }: SceneProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="1" stopColor="#ecdcbc" />
        </linearGradient>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-bg)`} />
      <g stroke="#83c4b9" strokeWidth={0.5} opacity={0.55}>
        {[12, 20, 28, 36, 44, 52, 60].map((y) => (
          <line key={y} x1={0} y1={y} x2={64} y2={y} />
        ))}
      </g>
      <line x1={55} y1={0} x2={55} y2={64} stroke="#d2a554" strokeWidth={0.6} opacity={0.5} />
      <ellipse cx={32} cy={46.5} rx={25} ry={2.3} fill="#7f5829" opacity={0.14} />
      {TILES.map((t) => (
        <g key={t.ch} transform={`translate(${t.x} ${t.y}) rotate(${t.rot})`}>
          <g className="pb-hop" style={{ animationDelay: `${t.delay}s` }}>
            <rect x={-8.2} y={-6.8} width={16.4} height={16.8} rx={3.2} fill={t.edge} />
            <rect x={-8.2} y={-8.2} width={16.4} height={16.4} rx={3.2} fill={t.face} />
            <rect
              x={-6.9}
              y={-6.9}
              width={13.8}
              height={13.8}
              rx={2.4}
              fill="none"
              stroke={t.ink}
              strokeOpacity={0.18}
              strokeWidth={0.5}
            />
            <text
              x={0}
              y={3.8}
              textAnchor="middle"
              fontSize={12.8}
              fontWeight={700}
              fill={t.ink}
              lang="ar"
              direction="rtl"
              style={{ fontFamily: "var(--font-arabic)" }}
            >
              {t.ch}
            </text>
          </g>
        </g>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Date palm by a pointed arch window — sea green                   */
/* ------------------------------------------------------------------ */
const FRONDS = [
  "M34.2,30.4 C30,24.5 24.5,21.5 18,22 C24,23.6 29,26.6 33.6,31.2 Z",
  "M34.2,30.4 C27.5,27.6 20,28.8 14.5,34.5 C21,31.6 27.2,31 33.8,31.6 Z",
  "M34.2,30.4 C28.8,31.8 24.4,36.2 23,42.5 C26.2,37.4 30,34 34,31.8 Z",
  "M34.2,30.4 C37,24 42,20.5 48.5,20.5 C42.5,22.6 38.4,26 34.8,31 Z",
  "M34.2,30.4 C40.8,27.4 47.4,28.4 52.5,33.5 C46.6,30.8 40.8,30.6 34.8,31.6 Z",
  "M34.2,30.4 C40.4,31.6 44.6,35.6 46,41.5 C43,36.8 39.2,33.6 34.4,31.8 Z",
  "M34.2,30.4 C33.8,24.6 35.6,19.6 39.5,16.5 C37,20.8 35.8,25.2 35,30.6 Z",
];

function PalmScene({ u }: SceneProps) {
  const arch = "M19,62 V36 C19,27.5 25,22 32,17 C39,22 45,27.5 45,36 V62 Z";
  return (
    <>
      <defs>
        <linearGradient id={`${u}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#83c4b9" />
          <stop offset="1" stopColor="#347770" />
        </linearGradient>
        <linearGradient id={`${u}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="0.65" stopColor="#f5ead0" />
          <stop offset="1" stopColor="#e6c98e" />
        </linearGradient>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-wall)`} />
      <path d={arch} fill={`url(#${u}-sky)`} />
      <circle className="pb-flicker" cx={26} cy={49} r={3.4} fill="#ffffff" opacity={0.9} />
      <path d="M19,62 V55 C24,53.4 28,54.2 32,55.6 C37,53.8 41,53.6 45,55 V62 Z" fill="#aedbd3" opacity={0.75} />
      <path d={arch} fill="none" stroke="#ecd6a4" strokeWidth={1.8} />
      <path d={arch} fill="none" stroke="#bf8d3c" strokeWidth={0.5} opacity={0.6} transform="translate(32 40) scale(0.9) translate(-32 -40)" />
      <rect x={15.5} y={58.4} width={33} height={3} rx={0.8} fill="#ecd6a4" />
      <rect x={0} y={61.4} width={64} height={3} fill="#234c4a" />
      {/* trunk */}
      <path d="M38.6,58.6 C38.4,49 36.8,39 33.4,30.6 L35,30.4 C38.6,39 40.6,49 41.2,58.6 Z" fill="#1b3a39" />
      <g stroke="#63aea7" strokeWidth={0.5} fill="none" opacity={0.7} strokeLinecap="round">
        <path d="M38.5,52.4 q1.3,0.8 2.6,0" />
        <path d="M37.9,46.4 q1.2,0.8 2.4,0" />
        <path d="M36.8,40.6 q1.1,0.7 2.2,0" />
        <path d="M35.4,35.4 q1,0.6 2,0" />
      </g>
      {/* fronds */}
      <g className="pb-sway" style={{ transformOrigin: "34.2px 30.4px" }}>
        {FRONDS.map((d, i) => (
          <path key={i} d={d} fill={i % 2 ? "#234c4a" : "#1b3a39"} />
        ))}
        <circle cx={32.8} cy={32.6} r={1.1} fill="#bf8d3c" />
        <circle cx={35.1} cy={33.1} r={1.1} fill="#d2a554" />
        <circle cx={33.9} cy={34.4} r={1.05} fill="#a07230" />
        <circle cx={36.3} cy={31.9} r={0.9} fill="#e0bd74" />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Tasbih (prayer beads) — pale mint                                */
/* ------------------------------------------------------------------ */
const BEAD_SLOTS = 22;
const LOOP = { cx: 32, cy: 26.5, r: 13.5 };
const BEADS = Array.from({ length: BEAD_SLOTS - 1 }, (_, i) => {
  const step = i + 1;
  const a = ((90 + (step * 360) / BEAD_SLOTS) * Math.PI) / 180;
  return {
    x: r2(LOOP.cx + LOOP.r * Math.cos(a)),
    y: r2(LOOP.cy + LOOP.r * Math.sin(a)),
    marker: step === 7 || step === 15,
  };
});

function TasbihScene({ u }: SceneProps) {
  const top = LOOP.cy - LOOP.r;
  const bottom = LOOP.cy + LOOP.r;
  return (
    <>
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef7f5" />
          <stop offset="1" stopColor="#9fd1c8" />
        </linearGradient>
        <radialGradient id={`${u}-gold`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="0.45" stopColor="#e0bd74" />
          <stop offset="1" stopColor="#a07230" />
        </radialGradient>
        <radialGradient id={`${u}-teal`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#aedbd3" />
          <stop offset="0.5" stopColor="#45938b" />
          <stop offset="1" stopColor="#1b3a39" />
        </radialGradient>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-bg)`} />
      <circle cx={32} cy={30} r={22} fill="#ffffff" opacity={0.4} />
      <g className="pb-tasbih" style={{ transformOrigin: `32px ${top}px` }}>
        <circle cx={LOOP.cx} cy={LOOP.cy} r={LOOP.r} fill="none" stroke="#a07230" strokeWidth={0.5} opacity={0.55} />
        <line x1={32} y1={bottom} x2={32} y2={52} stroke="#a07230" strokeWidth={0.5} opacity={0.55} />
        <g fill="#2b605b" opacity={0.22} transform="translate(0.5 0.8)">
          {BEADS.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={b.marker ? 2.15 : 1.75} />
          ))}
        </g>
        {BEADS.map((b, i) => (
          <circle
            key={i}
            cx={b.x}
            cy={b.y}
            r={b.marker ? 2.15 : 1.75}
            fill={`url(#${u}-${b.marker ? "teal" : "gold"})`}
          />
        ))}
        {/* tail: bead, marker, imam bead and tassel */}
        <circle cx={32} cy={42.4} r={1.6} fill={`url(#${u}-gold)`} />
        <circle cx={32} cy={45.4} r={1.9} fill={`url(#${u}-teal)`} />
        <ellipse cx={32} cy={49.6} rx={1.9} ry={2.8} fill={`url(#${u}-gold)`} />
        <rect x={30.5} y={52.1} width={3} height={1.3} rx={0.5} fill="#7f5829" />
        <path d="M31,53.3 L28.4,61.4 Q32,63.2 35.6,61.4 L33,53.3 Z" fill="#d2a554" />
        <path
          d="M31.6,54 L29.8,61.6 M32,54 V62.2 M32.4,54 L34.2,61.6"
          stroke="#a07230"
          strokeWidth={0.45}
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Inkwell with a qalam (reed pen) — rich manuscript gold           */
/* ------------------------------------------------------------------ */
function QalamScene({ u }: SceneProps) {
  return (
    <>
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#ecd6a4" />
          <stop offset="0.5" stopColor="#d2a554" />
          <stop offset="1" stopColor="#a07230" />
        </linearGradient>
        <radialGradient id={`${u}-hi`} cx="0.3" cy="0.2" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${u}-reed`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="0.55" stopColor="#ecd6a4" />
          <stop offset="1" stopColor="#bf8d3c" />
        </linearGradient>
      </defs>
      <rect width={64} height={64} fill={`url(#${u}-bg)`} />
      <rect width={64} height={64} fill={`url(#${u}-hi)`} />
      {/* paper with a calligraphic nun-like flourish */}
      <g transform="rotate(-11 20 52)">
        <rect x={5.6} y={39.4} width={28} height={30} rx={1} fill="#7f5829" opacity={0.25} />
        <rect x={4.6} y={38.2} width={28} height={30} rx={1} fill="#fbf6ea" />
        <path d="M11,49 C10.4,56.6 23,57.8 24.6,49.2 C22.6,54.6 13.4,54.6 11,49 Z" fill="#1b3a39" />
        <circle cx={17.8} cy={46.4} r={1.15} fill="#1b3a39" />
      </g>
      {/* reed pen, resting in the well */}
      <g transform="rotate(-24 44.5 40)">
        <g className="pb-dip">
          <rect x={43.2} y={4} width={2.6} height={37} rx={1.2} fill={`url(#${u}-reed)`} stroke="#7f5829" strokeWidth={0.4} />
          <rect x={43.2} y={13.5} width={2.6} height={0.9} fill="#a07230" />
          <rect x={43.2} y={24.5} width={2.6} height={0.9} fill="#a07230" />
          <rect x={43.2} y={33.5} width={2.6} height={7.5} fill="#1b3a39" opacity={0.85} />
        </g>
      </g>
      {/* inkwell */}
      <ellipse cx={45} cy={58.4} rx={11} ry={1.7} fill="#7f5829" opacity={0.35} />
      <path
        d="M37,58 C34.4,58 33.6,55.4 34.2,52.6 C35.2,48.2 38.6,46.2 39.6,43 H50.4 C51.4,46.2 54.8,48.2 55.8,52.6 C56.4,55.4 55.6,58 53,58 Z"
        fill="#1b3a39"
      />
      <path d="M37.4,54.2 C37.8,50.8 39.6,49 41,47.6" stroke="#83c4b9" strokeWidth={0.9} strokeLinecap="round" fill="none" opacity={0.7} />
      <path d="M34.5,51.4 C41,53.2 49,53.2 55.5,51.4" stroke="#e0bd74" strokeWidth={0.9} fill="none" />
      <g fill="#e0bd74">
        <circle cx={40} cy={54.4} r={0.45} />
        <circle cx={45} cy={54.9} r={0.45} />
        <circle cx={50} cy={54.4} r={0.45} />
      </g>
      <rect x={39.4} y={40.3} width={11.2} height={3.2} rx={1} fill="#234c4a" />
      <rect x={38.6} y={39} width={12.8} height={1.8} rx={0.9} fill="#e0bd74" />
    </>
  );
}

const SCENES: Record<AvatarVariant, (props: SceneProps) => React.ReactNode> = {
  mosque: MosqueScene,
  lantern: LanternScene,
  rehal: RehalScene,
  minaret: MinaretScene,
  letters: LettersScene,
  palm: PalmScene,
  tasbih: TasbihScene,
  qalam: QalamScene,
};

/**
 * A circular illustrated avatar framed by a thin gold ring. Size it with
 * `className` (defaults to 56px). Decorative by default; pass `label` to
 * expose it to assistive technology.
 */
export function ProfileBadge({
  variant,
  className,
  label,
}: {
  variant: AvatarVariant;
  className?: string;
  label?: string;
}) {
  const u = `pb${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const Scene = SCENES[variant] ?? MosqueScene;
  return (
    <span
      className={cn(
        "pb relative inline-flex size-14 shrink-0 rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-brand-400 p-[2px] shadow-[0_8px_18px_-10px_rgb(15_34_33/0.55)]",
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <span className="block size-full overflow-hidden rounded-full border-[1.5px] border-white">
        <svg viewBox="0 0 64 64" className="pb-art block size-full" aria-hidden focusable="false">
          <defs>
            <clipPath id={`${u}-clip`}>
              <circle cx={32} cy={32} r={32} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${u}-clip)`}>
            <Scene u={u} />
          </g>
        </svg>
      </span>
    </span>
  );
}

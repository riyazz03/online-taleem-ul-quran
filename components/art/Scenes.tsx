/**
 * Hand-built SVG illustrations in the brand palette. They replace the old
 * raster illustrations: crisp at any size, a few KB each, and animated with
 * plain CSS (no JavaScript). Every scene takes a unique `id` so its
 * gradients/clip-paths never collide when several are on one page.
 */
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import "./scenes.css";

const ARCH_OUTER = "M14,520 V196 C14,106 104,48 200,10 C296,48 386,106 386,196 V520 Z";
const ARCH_INNER = "M30,520 V201 C30,117 113,64 200,30 C287,64 370,117 370,201 V520 Z";

const STARS: Array<[number, number, number, number]> = [
  [62, 250, 1.3, 0], [96, 180, 1, 1.2], [128, 128, 1.6, 0.4], [168, 92, 1, 2.1],
  [222, 84, 1.2, 0.8], [312, 118, 1.4, 1.6], [340, 196, 1, 0.2], [300, 250, 1.1, 2.4],
  [84, 318, 0.9, 1.1], [330, 300, 0.9, 0.6], [188, 168, 1, 1.9], [250, 200, 0.8, 0.9],
  [140, 230, 0.8, 2.8], [60, 380, 0.8, 1.4], [350, 360, 0.9, 2.2],
];

function Lantern({
  x,
  length,
  scale = 1,
  delay = 0,
  swing = "normal",
  id,
}: {
  x: number;
  length: number;
  scale?: number;
  /** Phase offset in seconds (applied as a negative delay, so it never jumps on load). */
  delay?: number;
  /** "slow" swings on a longer, opposite cycle so lanterns never move in lockstep. */
  swing?: "normal" | "slow";
  id: string;
}) {
  const s = scale;
  const y = length;
  const phase = `${-delay}s`;
  return (
    <g
      className={swing === "slow" ? "scene-swing-slow" : "art-swing"}
      style={{ transformOrigin: `${x}px 0px`, animationDelay: phase }}
    >
      <line x1={x} y1={0} x2={x} y2={y} stroke="#d2a554" strokeWidth={1.2} opacity={0.8} />
      <circle
        className="art-flicker"
        cx={x}
        cy={y + 32 * s}
        r={42 * s}
        fill={`url(#${id}-lamp)`}
        style={{ animationDelay: phase }}
      />
      <path d={`M${x - 9 * s},${y + 9 * s} Q${x},${y - 5 * s} ${x + 9 * s},${y + 9 * s} Z`} fill="#d2a554" />
      <path
        d={`M${x - 11 * s},${y + 10 * s} C${x - 21 * s},${y + 27 * s} ${x - 15 * s},${y + 47 * s} ${x},${y + 58 * s} C${x + 15 * s},${y + 47 * s} ${x + 21 * s},${y + 27 * s} ${x + 11 * s},${y + 10 * s} Z`}
        fill={`url(#${id}-glass)`}
        stroke="#bf8d3c"
        strokeWidth={1.2}
      />
      <path
        d={`M${x},${y + 11 * s} V${y + 56 * s} M${x - 8 * s},${y + 14 * s} Q${x - 14 * s},${y + 32 * s} ${x - 4 * s},${y + 50 * s} M${x + 8 * s},${y + 14 * s} Q${x + 14 * s},${y + 32 * s} ${x + 4 * s},${y + 50 * s}`}
        stroke="#bf8d3c"
        strokeWidth={0.8}
        fill="none"
        opacity={0.7}
      />
      <line x1={x} y1={y + 58 * s} x2={x} y2={y + 68 * s} stroke="#d2a554" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

function MosqueSilhouette({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      {/* minarets */}
      <path d="M54,520 V372 H70 V520 Z M52,372 H72 V362 H52 Z M56,362 L62,330 L68,362 Z" />
      <path d="M330,520 V372 H346 V520 Z M328,372 H348 V362 H328 Z M332,362 L338,330 L344,362 Z" />
      <circle cx={62} cy={326} r={2.5} />
      <circle cx={338} cy={326} r={2.5} />
      {/* side domes */}
      <path d="M86,470 C86,446 104,440 116,426 C128,440 146,446 146,470 Z" />
      <path d="M254,470 C254,446 272,440 284,426 C296,440 314,446 314,470 Z" />
      {/* main dome */}
      <path d="M132,470 C132,414 170,398 200,366 C230,398 268,414 268,470 Z" />
      <rect x={197} y={336} width={6} height={32} rx={3} />
      <path d="M200,316 a10,10 0 1,0 8,16 a8,8 0 1,1 -8,-16 Z" />
      {/* hall */}
      <path d="M40,520 V466 H360 V520 Z" />
    </g>
  );
}

/* ------------------------------------------------------------------
   Night-only life. Every moving piece is drawn around its local origin
   and positioned by a parent <g>, so the CSS loops in scenes.css only
   touch transform/opacity. Delays are negative so the scene is already
   "mid-life" when it appears.
------------------------------------------------------------------- */

type Vars = CSSProperties & Record<`--${string}`, string>;

/** Brighter stars that glint now and then: [x, y, size, phase]. */
const GLINTS: Array<[number, number, number, number]> = [
  [200, 70, 1, 1.2],
  [236, 262, 0.75, 3.6],
  [122, 292, 0.7, 5.3],
];

/** Embers drifting up from the lanterns: [x, y, drift, rise, duration, phase, radius]. */
const MOTES: Array<[number, number, number, number, number, number, number]> = [
  // large lantern (x 92)
  [84, 150, -10, -78, 8.5, 0, 1.1],
  [100, 162, 9, -92, 10, 3.2, 0.9],
  [92, 140, -4, -70, 9, 6.1, 1.2],
  [78, 168, -12, -64, 11, 8.4, 0.8],
  // small high lantern (x 146)
  [140, 96, -8, -50, 8, 1.5, 0.9],
  [153, 102, 7, -56, 9.5, 5.6, 1],
  [146, 90, 2, -44, 10.5, 8, 0.8],
  // low lantern (x 54)
  [49, 236, -6, -62, 9, 2.4, 0.9],
  [60, 244, 8, -72, 10, 6.8, 1.1],
  [54, 228, -2, -56, 11.5, 9.9, 0.8],
];

/** Fireflies over the domes: [x, y, duration, phase]. */
const FIREFLIES: Array<[number, number, number, number]> = [
  [100, 404, 9, 2],
  [162, 382, 11, 6],
  [238, 388, 10, 4],
  [302, 404, 12, 8.5],
];

/** Doves in a loose formation, relative to the lead bird: [dx, dy, scale, flap phase]. */
const DOVES: Array<[number, number, number, number]> = [
  [0, 0, 1, 0],
  [-13, -7, 0.8, 0.3],
  [-15, 8, 0.85, 0.55],
  [-29, 1, 0.7, 0.15],
];

const CLOUD =
  "M8,0 C-1,0 -2,-9 9,-10 C11,-19 25,-22 33,-15 C37,-27 57,-30 65,-19 C71,-26 87,-26 91,-16 C99,-21 113,-19 113,-10 C125,-11 131,-2 122,0 Z";
const CLOUD_WISP = "M26,5 C38,1 64,1 80,4 C94,2 112,4 106,8 C90,10 50,10 30,9 C22,8 20,6 26,5 Z";

/**
 * A wispy moonlit cloud. `x` is where it rests (and where it is drawn when
 * motion is reduced); it drifts from `from` to `to` (scene units, absolute x).
 */
function Cloud({
  id,
  x,
  y,
  scale = 1,
  from,
  to,
  duration,
  phase,
  opacity = 1,
}: {
  id: string;
  x: number;
  y: number;
  scale?: number;
  from: number;
  to: number;
  duration: number;
  phase: number;
  opacity?: number;
}) {
  const style: Vars = {
    "--from": `${(from - x) / scale}px`,
    "--to": `${(to - x) / scale}px`,
    "--dur": `${duration}s`,
    animationDelay: `${-phase}s`,
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <g className="scene-cloud" style={style}>
        <path d={CLOUD} fill={`url(#${id}-cloud)`} />
        <path d={CLOUD_WISP} fill={`url(#${id}-cloud)`} opacity={0.8} />
      </g>
    </g>
  );
}

/** Stars, crescent with a breathing halo, drifting clouds and a passing flock. */
function NightSky({ id }: { id: string }) {
  return (
    <>
      {STARS.map(([x, y, r, d], i) => (
        <circle
          key={i}
          className="art-twinkle"
          cx={x}
          cy={y}
          r={r}
          fill="#fbf6ea"
          // Each star keeps its own tempo (2.8s–5.2s) so the sky never pulses in unison.
          style={{ animationDelay: `${-d}s`, animationDuration: `${2.8 + ((i * 7) % 5) * 0.6}s` }}
        />
      ))}
      {GLINTS.map(([x, y, s, d], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <g className="scene-glint" style={{ animationDelay: `${-d}s` }}>
            <circle r={5} fill={`url(#${id}-mote)`} />
            <path d="M0,-6 Q0.8,-0.8 6,0 Q0.8,0.8 0,6 Q-0.8,0.8 -6,0 Q-0.8,-0.8 0,-6 Z" fill="#fbf6ea" />
          </g>
        </g>
      ))}

      <g transform="translate(276 150)">
        <circle className="scene-breathe" r={90} fill={`url(#${id}-moonglow)`} />
      </g>
      <rect x={230} y={100} width={100} height={100} fill="#ecd6a4" mask={`url(#${id}-crescent)`} />

      {/* doves crossing every ~36s, rising gently past the crescent */}
      <g transform="translate(0 234)" opacity={0.8}>
        <g className="scene-flock">
          <g className="scene-bob">
            {DOVES.map(([dx, dy, s, d], i) => (
              <g key={i} transform={`translate(${dx} ${dy}) scale(${s})`}>
                <path
                  className="scene-flap"
                  d="M-5.5,0 Q-2.8,-3.6 0,0.8 Q2.8,-3.6 5.5,0"
                  fill="none"
                  stroke="#f5ead0"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: `${-d}s` }}
                />
              </g>
            ))}
          </g>
        </g>
      </g>

      {/* a faint high cloud behind the lanterns, and a nearer one that veils the crescent */}
      <Cloud id={id} x={70} y={112} scale={0.7} from={-110} to={400} duration={84} phase={17} opacity={0.65} />
      <Cloud id={id} x={186} y={194} from={-150} to={420} duration={58} phase={31} />
    </>
  );
}

/** Golden embers rising slowly from the lanterns. */
function LanternMotes({ id }: { id: string }) {
  return (
    <>
      {MOTES.map(([x, y, dx, rise, dur, d, r], i) => {
        const style: Vars = {
          "--dx": `${dx}px`,
          "--rise": `${rise}px`,
          "--dur": `${dur}s`,
          animationDelay: `${-d}s`,
        };
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="scene-mote" style={style}>
              <circle r={r * 3.4} fill={`url(#${id}-mote)`} />
              <circle r={r} fill="#fff1c9" />
            </g>
          </g>
        );
      })}
    </>
  );
}

function archWindow(x: number, top: number, bottom: number, w: number) {
  const h = w / 2;
  return `M${x - h},${bottom} V${top + w * 1.1} Q${x - h},${top + w * 0.35} ${x},${top} Q${x + h},${top + w * 0.35} ${x + h},${top + w * 1.1} V${bottom} Z`;
}

/** Warm lit windows in the mosque; groups glow and dim on their own slow cycles. */
function MosqueLights({ id }: { id: string }) {
  const fill = `url(#${id}-window)`;
  const hall = (xs: number[]) => xs.map((x) => <path key={x} d={archWindow(x, 475, 493, 7)} />);
  const cycle = (dur: number, phase: number): CSSProperties & Record<"--dur", string> => ({
    "--dur": `${dur}s`,
    animationDelay: `${-phase}s`,
  });
  return (
    <g fill={fill}>
      {/* warm spill of light across the prayer hall */}
      <g opacity={0.35}>
        <ellipse className="scene-window-soft" cx={200} cy={490} rx={168} ry={30} fill={`url(#${id}-lamp)`} />
      </g>
      <ellipse className="scene-window-soft" cx={200} cy={486} rx={46} ry={24} fill={`url(#${id}-lamp)`} style={{ animationDelay: "-2s" }} />

      <g className="scene-window" style={cycle(11, 2)}>{hall([84, 120, 156])}</g>
      <g className="scene-window" style={cycle(14, 9)}>{hall([102, 138])}</g>
      <g className="scene-window" style={cycle(12.5, 5)}>{hall([244, 280, 316])}</g>
      <g className="scene-window" style={cycle(10, 7.5)}>{hall([262, 298])}</g>

      {/* doorway, dome drum and side-dome windows breathe but never go dark */}
      <path className="scene-window-soft" d={archWindow(200, 471, 500, 17)} />
      <g className="scene-window-soft" style={{ animationDelay: "-3s" }}>
        {[172, 186, 214, 228].map((x) => (
          <path key={x} d={archWindow(x, 449, 462, 5)} />
        ))}
      </g>
      <g className="scene-window-soft" style={{ animationDelay: "-1.5s" }}>
        <path d={archWindow(116, 454, 466, 5)} />
        <path d={archWindow(284, 454, 466, 5)} />
      </g>

      {/* minaret slits */}
      <g className="scene-window" style={cycle(16, 12)}>
        <path d={archWindow(62, 390, 401, 3.4)} />
        <path d={archWindow(62, 424, 435, 3.4)} />
      </g>
      <g className="scene-window" style={cycle(13, 3)}>
        <path d={archWindow(338, 390, 401, 3.4)} />
        <path d={archWindow(338, 424, 435, 3.4)} />
      </g>
    </g>
  );
}

/** A few fireflies wandering over the domes. */
function Fireflies({ id }: { id: string }) {
  return (
    <>
      {FIREFLIES.map(([x, y, dur, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="scene-firefly" style={{ "--dur": `${dur}s`, animationDelay: `${-d}s` } as Vars}>
            <circle r={3.6} fill={`url(#${id}-mote)`} />
            <circle r={0.9} fill="#fff1c9" />
          </g>
        </g>
      ))}
    </>
  );
}

function BookOnRehal({ cx = 200, cy = 468, glowId }: { cx?: number; cy?: number; glowId: string }) {
  return (
    <g>
      <circle className="art-flicker" cx={cx} cy={cy - 40} r={110} fill={`url(#${glowId})`} />
      {/* light rays */}
      <g className="art-rays" style={{ transformOrigin: `${cx}px ${cy - 10}px` }} opacity={0.55}>
        {[-60, -40, -20, 0, 20, 40, 60].map((a) => (
          <path
            key={a}
            d={`M${cx},${cy - 12} L${cx - 9},${cy - 190} L${cx + 9},${cy - 190} Z`}
            fill="#f5ead0"
            opacity={0.18}
            transform={`rotate(${a} ${cx} ${cy - 12})`}
          />
        ))}
      </g>
      {/* rehal (X-shaped stand) */}
      <path
        d={`M${cx - 62},${cy + 44} L${cx + 50},${cy - 6} M${cx + 62},${cy + 44} L${cx - 50},${cy - 6}`}
        stroke="#234c4a"
        strokeWidth={11}
        strokeLinecap="round"
      />
      {/* pages */}
      <path
        d={`M${cx},${cy - 4} C${cx - 20},${cy - 22} ${cx - 52},${cy - 22} ${cx - 76},${cy - 12} L${cx - 70},${cy + 8} C${cx - 48},${cy} ${cx - 20},${cy} ${cx},${cy + 14} Z`}
        fill="#fbf6ea"
        stroke="#bf8d3c"
        strokeWidth={1.2}
      />
      <path
        d={`M${cx},${cy - 4} C${cx + 20},${cy - 22} ${cx + 52},${cy - 22} ${cx + 76},${cy - 12} L${cx + 70},${cy + 8} C${cx + 48},${cy} ${cx + 20},${cy} ${cx},${cy + 14} Z`}
        fill="#fbf6ea"
        stroke="#bf8d3c"
        strokeWidth={1.2}
      />
      {/* suggested lines of text (abstract, not letters) */}
      {[0, 1, 2].map((i) => (
        <g key={i} stroke="#83c4b9" strokeWidth={1.4} strokeLinecap="round" opacity={0.9}>
          <path d={`M${cx - 62 + i * 3},${cy - 8 + i * 6} Q${cx - 38},${cy - 14 + i * 6} ${cx - 10},${cy - 4 + i * 6}`} fill="none" />
          <path d={`M${cx + 62 - i * 3},${cy - 8 + i * 6} Q${cx + 38},${cy - 14 + i * 6} ${cx + 10},${cy - 4 + i * 6}`} fill="none" />
        </g>
      ))}
    </g>
  );
}

/**
 * A pointed mihrab arch opening onto a night sky (crescent, stars, swinging
 * lanterns, mosque skyline) or a soft dawn with an open Quran on a rehal.
 */
export function ArchScene({
  id,
  variant = "night",
  focal,
  className,
  title,
}: {
  id: string;
  variant?: "night" | "dawn";
  focal?: "mosque" | "book";
  className?: string;
  title?: string;
}) {
  const night = variant === "night";
  const show = focal ?? (night ? "mosque" : "book");
  return (
    <svg
      viewBox="0 0 400 520"
      className={cn("h-auto w-full overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          {night ? (
            <>
              <stop offset="0" stopColor="#0b1d1c" />
              <stop offset="0.55" stopColor="#173634" />
              <stop offset="1" stopColor="#2e6560" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#f5ead0" />
              <stop offset="0.55" stopColor="#f8f5ef" />
              <stop offset="1" stopColor="#cfe9e3" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`${id}-frame`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecd6a4" />
          <stop offset="0.5" stopColor="#d2a554" />
          <stop offset="1" stopColor="#a07230" />
        </linearGradient>
        <radialGradient id={`${id}-moonglow`}>
          <stop offset="0" stopColor="#ecd6a4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ecd6a4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-lamp`}>
          <stop offset="0" stopColor="#ffe9b0" stopOpacity="0.8" />
          <stop offset="0.45" stopColor="#d2a554" stopOpacity="0.28" />
          <stop offset="1" stopColor="#d2a554" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glass`} cy="0.6">
          <stop offset="0" stopColor="#fff4d1" />
          <stop offset="0.6" stopColor="#e9c97f" />
          <stop offset="1" stopColor="#bf8d3c" />
        </radialGradient>
        {night && (
          <>
            <linearGradient id={`${id}-cloud`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbf1da" stopOpacity="0.42" />
              <stop offset="0.55" stopColor="#cfe9e3" stopOpacity="0.16" />
              <stop offset="1" stopColor="#83c4b9" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id={`${id}-mote`}>
              <stop offset="0" stopColor="#ffe9b0" stopOpacity="0.9" />
              <stop offset="0.4" stopColor="#e9c97f" stopOpacity="0.35" />
              <stop offset="1" stopColor="#d2a554" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${id}-window`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff1c9" />
              <stop offset="1" stopColor="#d9a954" />
            </linearGradient>
          </>
        )}
        <radialGradient id={`${id}-bookglow`}>
          <stop offset="0" stopColor={night ? "#ffe9b0" : "#ffffff"} stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#ecd6a4" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ecd6a4" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d={ARCH_INNER} />
        </clipPath>
        <mask id={`${id}-crescent`}>
          <circle cx={276} cy={150} r={34} fill="white" />
          <circle cx={292} cy={139} r={30} fill="black" />
        </mask>
        <pattern id={`${id}-geo`} width="40" height="40" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={night ? "#83c4b9" : "#347770"} strokeWidth="0.6">
            <path d="M20 6L34 20L20 34L6 20Z" />
            <rect x="10" y="10" width="20" height="20" />
          </g>
        </pattern>
      </defs>

      <path d={ARCH_OUTER} fill={`url(#${id}-frame)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="400" height="520" fill={`url(#${id}-sky)`} />
        <rect width="400" height="520" fill={`url(#${id}-geo)`} opacity={night ? 0.07 : 0.1} />

        {night ? (
          <NightSky id={id} />
        ) : (
          <>
            <circle cx={200} cy={120} r={160} fill="#fbf6ea" opacity={0.6} />
            <circle className="art-flicker" cx={200} cy={250} r={200} fill={`url(#${id}-bookglow)`} opacity={0.6} />
          </>
        )}

        {/* night: a third, smaller lantern hangs lowest on a slower, opposite swing */}
        {night && <Lantern id={id} x={54} length={218} scale={0.52} delay={2.1} swing="slow" />}
        <Lantern id={id} x={92} length={night ? 120 : 96} scale={1} delay={0} />
        <Lantern id={id} x={146} length={night ? 66 : 150} scale={0.75} delay={0.8} />
        {!night && <Lantern id={id} x={296} length={80} scale={0.85} delay={1.6} />}
        {night && <LanternMotes id={id} />}

        {show === "mosque" ? (
          <>
            <MosqueSilhouette fill={night ? "#0a1a19" : "#aedbd3"} />
            <rect x={0} y={500} width={400} height={20} fill={night ? "#0a1a19" : "#aedbd3"} />
            {night && (
              <>
                <MosqueLights id={id} />
                <Fireflies id={id} />
              </>
            )}
          </>
        ) : (
          <>
            <rect x={0} y={492} width={400} height={28} fill={night ? "#0a1a19" : "#d6ede8"} />
            <BookOnRehal glowId={`${id}-bookglow`} />
          </>
        )}
      </g>
      <path d={ARCH_INNER} fill="none" stroke="#ecd6a4" strokeOpacity={0.55} strokeWidth={1} strokeDasharray="1 5" transform="translate(200 280) scale(0.955) translate(-200 -280)" />
      <path d="M200,-6 l4.5,4.5 h6.5 v6.5 l4.5,4.5 l-4.5,4.5 v6.5 h-6.5 l-4.5,4.5 l-4.5,-4.5 h-6.5 v-6.5 l-4.5,-4.5 l4.5,-4.5 v-6.5 h6.5 z" fill="#d2a554" />
    </svg>
  );
}

const ARABIC_LETTERS = "ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي".split(" ");

/** Course artwork: Tajweed — a Qaida page whose letters light up one by one. */
function TajweedArt({ id }: { id: string }) {
  const cols = 7;
  const cell = 38;
  const x0 = 200 - (cols * cell) / 2;
  const y0 = 58;
  return (
    <>
      <rect x={x0 - 16} y={y0 - 20} width={cols * cell + 32} height={4 * cell + 40} rx={14} fill="#fbf6ea" opacity={0.96} />
      <rect x={x0 - 8} y={y0 - 12} width={cols * cell + 16} height={4 * cell + 24} rx={9} fill="none" stroke="#d2a554" strokeWidth={1.2} />
      {ARABIC_LETTERS.map((l, i) => {
        // Right-to-left reading order, like a real Qaida page.
        const col = cols - 1 - (i % cols);
        const row = Math.floor(i / cols);
        const cx = x0 + col * cell + cell / 2;
        const cy = y0 + row * cell + cell / 2;
        return (
          <g key={l}>
            <rect
              className="art-cell"
              x={cx - 15}
              y={cy - 15}
              width={30}
              height={30}
              rx={7}
              fill={`url(#${id}-gold)`}
              style={{ animationDelay: `${i * 0.18}s` }}
            />
            <text x={cx} y={cy + 7} textAnchor="middle" className="font-arabic" fontSize={21} fill="#1b3a39">
              {l}
            </text>
          </g>
        );
      })}
    </>
  );
}

/** Course artwork: Recitation — an open Quran on a rehal with rising sound. */
function RecitationArt({ id }: { id: string }) {
  return (
    <>
      <circle cx={200} cy={170} r={140} fill={`url(#${id}-glow)`} className="art-flicker" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="art-dash"
          d={`M${70 + i * 10},${118 - i * 22} C120,${88 - i * 22} 150,${148 - i * 22} 200,${118 - i * 22} S280,${88 - i * 22} ${330 - i * 10},${118 - i * 22}`}
          fill="none"
          stroke={i === 1 ? "#e0bd74" : "#83c4b9"}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.9 - i * 0.2}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      <g transform="translate(0 -218)">
        <BookOnRehal cx={200} cy={440} glowId={`${id}-glow`} />
      </g>
    </>
  );
}

/** Course artwork: Memorization — steps rising towards a star ("recite and rise"). */
function HifzArt({ id }: { id: string }) {
  const steps = [0, 1, 2, 3, 4, 5];
  return (
    <>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${140 - i * 34},300 V${170 - i * 18} C${140 - i * 34},${120 - i * 22} ${170 - i * 20},${100 - i * 26} 200,${84 - i * 30} C${230 + i * 20},${100 - i * 26} ${260 + i * 34},${120 - i * 22} ${260 + i * 34},${170 - i * 18} V300`}
          fill="none"
          stroke="#83c4b9"
          strokeOpacity={0.35 - i * 0.08}
        />
      ))}
      {steps.map((i) => (
        <rect
          key={i}
          className="art-rise"
          x={70 + i * 42}
          y={250 - i * 24}
          width={48}
          height={300}
          rx={4}
          fill={i === steps.length - 1 ? `url(#${id}-gold)` : "#2b605b"}
          opacity={0.45 + i * 0.1}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      <circle cx={318} cy={96} r={60} fill={`url(#${id}-glow)`} className="art-flicker" />
      <path d="M300,128 V92 C300,80 308,72 318,66 C328,72 336,80 336,92 V128 Z" fill="#fbf6ea" stroke="#d2a554" strokeWidth={2} />
      <path d="M306,128 V94 C306,86 311,80 318,76 C325,80 330,86 330,94 V128" fill="none" stroke="#d2a554" strokeWidth={0.8} />
    </>
  );
}

export type CourseArtSlug = "simplified-tajweed" | "quran-recitation" | "quran-memorization";

/** 4:3 artwork for a course card or hero. */
export function CourseArt({ slug, id, className }: { slug: CourseArtSlug; id?: string; className?: string }) {
  const key = id ?? `art-${slug}`;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id={`${key}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#234c4a" />
          <stop offset="1" stopColor="#0f2524" />
        </linearGradient>
        <linearGradient id={`${key}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5ead0" />
          <stop offset="0.5" stopColor="#d2a554" />
          <stop offset="1" stopColor="#a07230" />
        </linearGradient>
        <radialGradient id={`${key}-glow`}>
          <stop offset="0" stopColor="#ffe9b0" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="#d2a554" stopOpacity="0.2" />
          <stop offset="1" stopColor="#d2a554" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${key}-geo`} width="36" height="36" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#83c4b9" strokeWidth="0.5">
            <path d="M18 5L31 18L18 31L5 18Z" />
            <rect x="9" y="9" width="18" height="18" />
          </g>
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#${key}-bg)`} />
      <rect width="400" height="300" fill={`url(#${key}-geo)`} opacity={0.08} />
      {slug === "simplified-tajweed" && <TajweedArt id={key} />}
      {slug === "quran-recitation" && <RecitationArt id={key} />}
      {slug === "quran-memorization" && <HifzArt id={key} />}
    </svg>
  );
}

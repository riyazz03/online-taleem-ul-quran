/**
 * Small Islamic decorative motifs — crescent & star, hanging lantern
 * (fanoos), Quran on a rehal, mosque dome — used as section ornaments in
 * place of abstract geometric shapes. Pure SVG, coloured with CSS classes.
 */
import { cn } from "@/lib/utils";

/** Crescent moon with a small eight-pointed star. */
export function CrescentStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("shrink-0", className)} fill="currentColor">
      <path d="M36.5 6.5A26 26 0 1 0 57 46.6 21 21 0 1 1 36.5 6.5Z" />
      <path d="M47 14l2.3 3.7 4.2-1.1-1.1 4.2L56 23l-3.6 2.2 1.1 4.3-4.2-1.1L47 32l-2.3-3.6-4.2 1.1 1.1-4.3L38 23l3.6-2.2-1.1-4.2 4.2 1.1Z" />
    </svg>
  );
}

/**
 * A hanging lantern on a chain. Set `swing` to let it sway gently from its
 * hook (CSS only).
 */
export function Lantern({
  className,
  chain = 60,
  swing = true,
  delay = 0,
}: {
  className?: string;
  chain?: number;
  swing?: boolean;
  delay?: number;
}) {
  const h = chain + 118;
  return (
    <svg viewBox={`0 0 80 ${h}`} aria-hidden className={cn("overflow-visible", className)}>
      <defs>
        <radialGradient id={`lantern-light-${chain}`} cy="0.55">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="0.55" stopColor="#ecd09a" />
          <stop offset="1" stopColor="#c69846" />
        </radialGradient>
        <radialGradient id={`lantern-halo-${chain}`}>
          <stop offset="0" stopColor="#ffe6a6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffe6a6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g
        className={swing ? "art-swing" : undefined}
        style={{ transformOrigin: "40px 0px", animationDelay: `${delay}s` }}
      >
        <line x1={40} y1={0} x2={40} y2={chain} stroke="#b88a3e" strokeWidth={1.5} strokeDasharray="3 2" />
        <circle className="art-flicker" cx={40} cy={chain + 60} r={46} fill={`url(#lantern-halo-${chain})`} />
        <circle cx={40} cy={chain + 4} r={4} fill="none" stroke="#b88a3e" strokeWidth={2} />
        {/* cap */}
        <path d={`M26 ${chain + 22} Q40 ${chain + 2} 54 ${chain + 22} Z`} fill="#b88a3e" />
        <rect x={24} y={chain + 21} width={32} height={5} rx={2} fill="#9d7430" />
        {/* glass body */}
        <path
          d={`M27 ${chain + 26} C18 ${chain + 50} 20 ${chain + 78} 40 ${chain + 96} C60 ${chain + 78} 62 ${chain + 50} 53 ${chain + 26} Z`}
          fill={`url(#lantern-light-${chain})`}
          stroke="#9d7430"
          strokeWidth={2}
        />
        {/* frame + window arches */}
        <path
          d={`M40 ${chain + 26} V${chain + 96} M31 ${chain + 30} C25 ${chain + 52} 28 ${chain + 74} 38 ${chain + 90} M49 ${chain + 30} C55 ${chain + 52} 52 ${chain + 74} 42 ${chain + 90}`}
          stroke="#9d7430"
          strokeWidth={1.2}
          fill="none"
        />
        <path d={`M33 ${chain + 60} Q40 ${chain + 46} 47 ${chain + 60}`} stroke="#9d7430" strokeWidth={1.2} fill="none" />
        {/* finial */}
        <path d={`M36 ${chain + 95} H44 L40 ${chain + 112} Z`} fill="#b88a3e" />
        <circle cx={40} cy={chain + 115} r={2.5} fill="#b88a3e" />
      </g>
    </svg>
  );
}

/** An open Quran resting on a rehal (folding X-shaped stand). */
export function RehalQuran({ className, glow = true }: { className?: string; glow?: boolean }) {
  return (
    <svg viewBox="0 0 200 150" aria-hidden className={cn("overflow-visible", className)}>
      <defs>
        <radialGradient id="rehal-glow">
          <stop offset="0" stopColor="#ffe9b0" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffe9b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {glow && <ellipse className="art-flicker" cx={100} cy={52} rx={92} ry={60} fill="url(#rehal-glow)" />}
      {/* stand */}
      <path d="M38 140 L150 62 M162 140 L50 62" stroke="#234c4a" strokeWidth={10} strokeLinecap="round" />
      <path d="M38 140 L150 62 M162 140 L50 62" stroke="#347770" strokeWidth={3} strokeLinecap="round" opacity={0.6} />
      {/* book cover */}
      <path d="M100 74 C80 60 48 58 18 66 L22 82 C50 74 80 76 100 90 C120 76 150 74 178 82 L182 66 C152 58 120 60 100 74 Z" fill="#234c4a" />
      {/* pages */}
      <path d="M100 70 C80 54 50 52 24 58 L27 74 C52 68 80 70 100 84 Z" fill="#fbf6ea" stroke="#d2a554" strokeWidth={1.2} />
      <path d="M100 70 C120 54 150 52 176 58 L173 74 C148 68 120 70 100 84 Z" fill="#fbf6ea" stroke="#d2a554" strokeWidth={1.2} />
      {/* ornamented margins + abstract lines of text */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} stroke="#63aea7" strokeWidth={1.3} strokeLinecap="round" fill="none" opacity={0.85}>
          <path d={`M${34 + i * 2} ${62 + i * 3.4} Q${62} ${57 + i * 3.4} ${94} ${70 + i * 3.6}`} />
          <path d={`M${166 - i * 2} ${62 + i * 3.4} Q${138} ${57 + i * 3.4} ${106} ${70 + i * 3.6}`} />
        </g>
      ))}
      <path d="M100 70 V86" stroke="#d2a554" strokeWidth={1.2} />
    </svg>
  );
}

/** Onion dome with crescent finial — for section corners. */
export function Dome({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" aria-hidden className={cn("shrink-0", className)} fill="currentColor">
      <path d="M60 2a8 8 0 1 0 6.4 12.8A6.5 6.5 0 1 1 60 2Z" />
      <rect x={58.5} y={16} width={3} height={18} rx={1.5} />
      <path d="M60 34C40 52 12 64 12 100V110H108V100C108 64 80 52 60 34Z" />
      <rect x={6} y={110} width={108} height={10} rx={2} />
      <rect x={14} y={120} width={92} height={30} />
    </svg>
  );
}

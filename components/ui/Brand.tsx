import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Eight-pointed star (Rub el Hizb), used as an ornament and bullet. */
export function Star8({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("shrink-0", className)} fill="currentColor">
      <path d="M12 0l3.5 3.5H20.5V8.5L24 12l-3.5 3.5v5h-5L12 24l-3.5-3.5h-5v-5L0 12l3.5-3.5v-5h5z" />
    </svg>
  );
}

/**
 * Repeating Islamic geometric lattice (connected eight-pointed stars).
 * Colour it with a text-* class and tune strength with opacity-*.
 */
export function GeometricPattern({
  className,
  size = 72,
  id = "geo",
}: {
  className?: string;
  size?: number;
  id?: string;
}) {
  const s = 72;
  const c = s / 2;
  const R = 17;
  const r = R / Math.SQRT2;
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" viewBox={`0 0 ${s} ${s}`}>
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d={`M${c} ${c - R}L${c + R} ${c}L${c} ${c + R}L${c - R} ${c}Z`} />
            <rect x={c - r} y={c - r} width={r * 2} height={r * 2} />
            <path d={`M${c} 0V${c - R}M${c} ${c + R}V${s}M0 ${c}H${c - R}M${c + R} ${c}H${s}`} />
            <path d={`M0 0L${c - r} ${c - r}M${s} 0L${c + r} ${c - r}M0 ${s}L${c - r} ${c + r}M${s} ${s}L${c + r} ${c + r}`} />
            <circle cx={c} cy={c} r="4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Hidden SVG definitions shared by every page (the arch clip-path). */
export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d="M0,1 V0.36 C0,0.17 0.2,0.07 0.5,0 C0.8,0.07 1,0.17 1,0.36 V1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Thin gold outline of the arch shape, drawn behind arch images. */
export function ArchOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className={cn("pointer-events-none absolute", className)}>
      <path
        d="M0.5,99.5 V36 C0.5,17 20,7 50,0.6 C80,7 99.5,17 99.5,36 V99.5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Image framed by a pointed mihrab arch, with an offset gold outline. */
export function ArchImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
  outline = true,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  outline?: boolean;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {outline && <ArchOutline className="inset-0 translate-x-3 translate-y-3 text-gold-400/70 sm:translate-x-4 sm:translate-y-4" />}
      <div className="arch relative h-full w-full overflow-hidden bg-brand-100">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
      </div>
    </div>
  );
}

/** Logo lockup: the emblem plus a typeset wordmark. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label="Online Taleem ul Quran — home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <Image
        src={light ? "/brand/emblem-light.svg" : "/brand/emblem.svg"}
        alt=""
        width={44}
        height={48}
        unoptimized
        priority
        className="h-11 w-auto transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[0.6rem] font-bold uppercase tracking-[0.42em]", light ? "text-brand-300" : "text-brand-500")}>
          Online
        </span>
        <span className={cn("font-display text-[1.35rem] leading-[1.05] tracking-tight", light ? "text-cream" : "text-brand-900")}>
          Taleem ul Quran
        </span>
      </span>
    </Link>
  );
}

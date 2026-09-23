"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Ordered list with a vertical rule that draws itself as the list scrolls
 * through the viewport, plus a glowing bead riding the tip of the line.
 * Left-aligned on mobile, centred on large screens.
 */
export function JourneyTrack({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const beadTop = useTransform(progress, (v) => `${v * 100}%`);
  const beadOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <ol ref={ref} className={cn("relative", className)}>
      <span
        aria-hidden
        className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:left-1/2"
      />
      <m.span
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-brand-400 via-gold-300 to-gold-400 lg:left-1/2"
      />
      <m.span
        aria-hidden
        style={{ top: beadTop, opacity: beadOpacity }}
        className="absolute left-6 z-20 -ml-[5px] -mt-[5px] size-[11px] rounded-full bg-gold-200 shadow-[0_0_0_4px_rgb(224_189_116/0.25),0_0_24px_6px_rgb(224_189_116/0.55)] lg:left-1/2"
      />
      {children}
    </ol>
  );
}

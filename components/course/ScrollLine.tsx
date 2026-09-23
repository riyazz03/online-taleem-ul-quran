"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A vertical rail whose gold/teal fill draws itself as the rail scrolls
 * through the viewport. Position it absolutely inside a relative parent.
 */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  return (
    <span ref={ref} aria-hidden className={cn("pointer-events-none absolute w-px bg-brand-900/10", className)}>
      <m.span
        style={{ scaleY }}
        className="absolute inset-0 origin-top bg-gradient-to-b from-brand-400 via-gold-400 to-brand-400"
      />
    </span>
  );
}

"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Inline phrase with a gold highlighter stroke that sweeps in when scrolled into view. */
export function Highlight({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.mark
      initial={{ backgroundSize: "0% 42%" }}
      whileInView={{ backgroundSize: "100% 42%" }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, delay: 0.25, ease }}
      className={cn(
        "rounded-[0.2em] bg-transparent bg-[linear-gradient(90deg,var(--color-gold-200),var(--color-gold-300))] bg-no-repeat px-[0.15em] font-semibold text-brand-950 [background-position:0_88%] box-decoration-clone",
        className,
      )}
    >
      {children}
    </m.mark>
  );
}

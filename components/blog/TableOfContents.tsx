"use client";

import { useEffect, useState } from "react";
import { m, useMotionValueEvent, useSpring } from "motion/react";
import type { TocItem } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { Star8 } from "@/components/ui/Brand";
import { useArticleProgress } from "./useArticleProgress";

/**
 * Sticky "On this page" list built from the article's h2s. The section
 * being read is highlighted (IntersectionObserver) and a bar shows how far
 * through the article the reader is.
 */
export function TableOfContents({
  items,
  targetId,
  minutes,
  className,
}: {
  items: TocItem[];
  targetId: string;
  minutes: number;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [reading, setReading] = useState({ pct: 0, left: minutes });
  const progress = useArticleProgress(targetId);
  const scaleX = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.4 });

  useMotionValueEvent(progress, "change", (v) => {
    const pct = Math.round(v * 100);
    const left = Math.max(0, Math.ceil(minutes * (1 - v)));
    setReading((r) => (r.pct === pct && r.left === left ? r : { pct, left }));
  });

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    // The active section is the last heading that has passed the reading line.
    const pick = () => {
      const line = window.innerHeight * 0.3;
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
        else break;
      }
      setActive(current);
    };

    // A band covering the top 30% of the viewport: headings entering or
    // leaving it are exactly the moments the active section can change.
    const observer = new IntersectionObserver(pick, { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] });
    headings.forEach((h) => observer.observe(h));
    pick();
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn("rounded-[1.25rem] sm:rounded-[1.75rem] border border-brand-900/8 bg-white/75 p-6 shadow-soft backdrop-blur", className)}
    >
      <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-brand-600">
        <Star8 className="size-3 text-gold-400" />
        On this page
      </p>
      <ol className="mt-5 flex flex-col border-l border-brand-900/10">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l-2 py-2 pl-4 text-sm leading-snug transition-[color,border-color] duration-300",
                  on
                    ? "border-gold-400 text-brand-950"
                    : "border-transparent text-muted hover:border-brand-900/25 hover:text-brand-800",
                )}
              >
                <span
                  className={cn(
                    "font-display text-base leading-none tabular-nums transition-colors duration-300",
                    on ? "text-gold-500" : "text-brand-900/30",
                  )}
                >
                  {item.number}
                </span>
                <span>{item.text}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 border-t border-brand-900/8 pt-5">
        <div className="flex items-baseline justify-between text-xs font-semibold text-brand-800">
          <span>Reading progress</span>
          <span className="tabular-nums text-muted">{reading.pct}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={reading.pct}
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-brand-900/8"
        >
          <m.div
            style={{ scaleX }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-gold-400"
          />
        </div>
        <p className="mt-2.5 text-xs text-muted">
          {reading.pct >= 100 ? "You’ve reached the end — thank you for reading" : `${reading.left} min left`}
        </p>
      </div>
    </nav>
  );
}

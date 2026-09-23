"use client";

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useSpring } from "motion/react";
import { useArticleProgress } from "./useArticleProgress";

/**
 * Mobile/tablet reading progress: a small pill (ring + minutes left) that
 * floats bottom-left while the article is being read. Desktop shows the
 * same progress inside the table of contents.
 */
export function ReadingPill({ targetId, minutes }: { targetId: string; minutes: number }) {
  const progress = useArticleProgress(targetId);
  const pathLength = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.4 });
  const [state, setState] = useState({ show: false, left: minutes });

  useMotionValueEvent(progress, "change", (v) => {
    const show = v > 0.01 && v < 0.995;
    const left = Math.max(1, Math.ceil(minutes * (1 - v)));
    setState((s) => (s.show === show && s.left === left ? s : { show, left }));
  });

  return (
    <AnimatePresence>
      {state.show && (
        <m.div
          aria-hidden
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-5 z-40 flex items-center gap-2.5 rounded-full border border-brand-900/10 bg-white/85 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-brand-900 shadow-lift backdrop-blur-md sm:bottom-8 sm:left-7 lg:hidden"
        >
          <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" strokeWidth="3.5" className="stroke-brand-900/10" />
            <m.circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="stroke-gold-400"
              style={{ pathLength }}
            />
          </svg>
          <span className="tabular-nums">{state.left} min left</span>
        </m.div>
      )}
    </AnimatePresence>
  );
}

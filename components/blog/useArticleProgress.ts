"use client";

import { useEffect } from "react";
import { useMotionValue } from "motion/react";

/**
 * Reading progress (0 → 1) through the element with the given id: 0 when
 * its top reaches the navbar, 1 when its end scrolls into view.
 */
export function useArticleProgress(targetId: string, topOffset = 112) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight + topOffset;
      const value = distance <= 0 ? 1 : (topOffset - rect.top) / distance;
      progress.set(Math.min(1, Math.max(0, value)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
    };
  }, [targetId, topOffset, progress]);

  return progress;
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

/**
 * Global client providers: Motion (lazy-loaded feature set, respects the
 * user's reduced-motion setting) and Lenis smooth scrolling (skipped when
 * reduced motion is requested).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSmooth(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {smooth && (
          <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>
            <ScrollReset />
          </ReactLenis>
        )}
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

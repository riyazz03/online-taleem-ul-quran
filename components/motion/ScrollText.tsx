"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn, toWords } from "@/lib/utils";

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <m.span style={{ opacity }} className={cn(highlight && "text-brand-500")}>
      {children}{" "}
    </m.span>
  );
}

/**
 * Paragraph whose words light up one by one as it scrolls through the
 * viewport. Wrap phrases in *asterisks* to highlight them.
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = toWords(text);
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text.replaceAll("*", "")}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const start = i / words.length;
          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, start + 1 / words.length]}
              highlight={w.em}
            >
              {w.word + (w.suffix ?? "")}
            </Word>
          );
        })}
      </span>
    </p>
  );
}

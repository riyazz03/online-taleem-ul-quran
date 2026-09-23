"use client";

import { m, type Variants } from "motion/react";
import { cn, toWords } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { y: "108%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1, ease } },
};

type Props = {
  /** Heading text. Wrap words in *asterisks* to emphasise them. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  emClassName?: string;
};

/** A heading whose words slide up from a mask, one after another, when scrolled into view. */
export function SplitHeading({ text, as = "h2", className, emClassName }: Props) {
  const Tag = m[as];
  const words = toWords(text);
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text.replaceAll("*", "")}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="rise-mask">
            <m.span
              variants={word}
              className={cn("inline-block", w.em && (emClassName ?? "italic text-brand-500"))}
            >
              {w.word}
            </m.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

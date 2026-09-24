"use client";

import { m, type Variants } from "motion/react";
import { cn, toWords } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { y: "160%", rotate: 4 },
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
  // A "\n" in the text forces a line break at that point.
  const lines = text.split("\n").map((line) => toWords(line));
  const renderWords = (words: ReturnType<typeof toWords>) =>
    words.map((w, i) => (
      <span key={i} aria-hidden>
        <span className="rise-mask">
          <m.span variants={word} className="inline-block">
            <span className={cn(w.em && (emClassName ?? "italic text-brand-500"))}>{w.word}</span>
            {w.suffix && (
              <span className={cn(w.suffixEm && (emClassName ?? "italic text-brand-500"))}>{w.suffix}</span>
            )}
          </m.span>
        </span>
        {i < words.length - 1 && " "}
      </span>
    ));
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text.replaceAll("*", "").replaceAll("\n", " ")}
    >
      {lines.length === 1
        ? renderWords(lines[0])
        : lines.map((line, li) => (
            <span key={li} className="block">
              {renderWords(line)}
              {li < lines.length - 1 && " "}
            </span>
          ))}
    </Tag>
  );
}

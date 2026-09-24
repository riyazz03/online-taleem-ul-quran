export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type Segment = { text: string; em: boolean };

/**
 * Splits "Key benefits of *our program*" into plain and emphasised
 * segments. Emphasis is marked with single asterisks.
 */
export function parseEmphasis(input: string): Segment[] {
  return input
    .split("*")
    .map((text, i) => ({ text, em: i % 2 === 1 }))
    .filter((s) => s.text.length > 0);
}

export type Word = { word: string; em: boolean; suffix?: string; suffixEm?: boolean };

/**
 * Splits text into words while keeping each word's emphasis flag.
 * Punctuation glued to the end of an emphasised word ("*live*,") stays on
 * the same word as a suffix, so it can never wrap onto a line of its own.
 */
export function toWords(input: string): Word[] {
  const out: Word[] = [];
  let prevEndsWithSpace = true;
  for (const seg of parseEmphasis(input)) {
    // Glue only when there is no whitespace on either side of the boundary.
    const glued = out.length > 0 && !prevEndsWithSpace && !/^\s/.test(seg.text);
    prevEndsWithSpace = /\s$/.test(seg.text);
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((part, i) => {
        if (i === 0 && glued) {
          const prev = out[out.length - 1];
          prev.suffix = (prev.suffix ?? "") + part;
          prev.suffixEm = seg.em;
        } else {
          out.push({ word: part, em: seg.em });
        }
      });
  }
  return out;
}

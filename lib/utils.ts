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

/** Splits segments into words while keeping each word's emphasis flag. */
export function toWords(input: string) {
  return parseEmphasis(input).flatMap((seg) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, em: seg.em })),
  );
}

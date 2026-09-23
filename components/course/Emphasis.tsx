import { cn, parseEmphasis } from "@/lib/utils";

/** Renders copy where *starred* phrases get the accent style. */
export function Emphasis({ text, emClassName }: { text: string; emClassName?: string }) {
  return (
    <>
      {parseEmphasis(text).map((seg, i) =>
        seg.em ? (
          <strong key={i} className={cn("font-semibold text-brand-700", emClassName)}>
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

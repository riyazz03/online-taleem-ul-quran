import { Fragment } from "react";
import { cn, parseEmphasis } from "@/lib/utils";

/** Renders "What is *Tajweed*" with the emphasised words in the accent style. */
export function Emphasis({
  text,
  emClassName = "italic text-brand-500",
}: {
  text: string;
  emClassName?: string;
}) {
  return (
    <>
      {parseEmphasis(text).map((seg, i) =>
        seg.em ? (
          <span key={i} className={cn(emClassName)}>
            {seg.text}
          </span>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        ),
      )}
    </>
  );
}

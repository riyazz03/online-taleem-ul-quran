import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/utils";
import { Star8 } from "./Brand";

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.28em]",
        tone === "light" ? "text-brand-200" : "text-brand-600",
        className,
      )}
    >
      <Star8 className="size-3 text-gold-400" />
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow?: string;
  /** Wrap words in *asterisks* to render them in the italic accent style. */
  title: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
};

/** Eyebrow + animated display heading + supporting paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  as = "h2",
  className,
  titleClassName,
}: HeadingProps) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <SplitHeading
        as={as}
        text={title}
        className={cn(
          "font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance sm:text-5xl lg:text-[4rem]",
          light ? "text-cream" : "text-brand-950",
          titleClassName,
        )}
        emClassName={light ? "italic text-gold-gradient" : "italic text-brand-500"}
      />
      {description && (
        <Reveal delay={0.15} y={16}>
          <p className={cn("text-base leading-relaxed text-pretty sm:text-lg", light ? "text-brand-100/75" : "text-muted")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

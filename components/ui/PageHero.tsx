import { cn, toWords } from "@/lib/utils";
import { GeometricPattern } from "./Brand";
import { Eyebrow } from "./Section";

/**
 * Headline whose words rise out of a mask on first paint. Pure CSS, so it
 * is safe to use above the fold (no hydration needed before it shows).
 * Wrap words in *asterisks* for the italic accent.
 */
export function HeroTitle({
  text,
  as: Tag = "h1",
  className,
  emClassName = "italic text-brand-500",
  startIndex = 0,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  emClassName?: string;
  startIndex?: number;
}) {
  const words = toWords(text);
  return (
    <Tag aria-label={text.replaceAll("*", "")} className={className}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="rise-word">
            <span style={{ "--i": i + startIndex } as React.CSSProperties}>
              <span className={w.em ? emClassName : undefined}>{w.word}</span>
              {w.suffix && <span className={w.suffixEm ? emClassName : undefined}>{w.suffix}</span>}
            </span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}

/** Shorthand for the CSS entrance used above the fold. */
export function fadeUp(delayMs: number) {
  return { className: "fade-up", style: { "--d": `${delayMs}ms` } as React.CSSProperties };
}

type PageHeroProps = {
  eyebrow?: string;
  /** Wrap words in *asterisks* for the italic accent. */
  title: string;
  description?: React.ReactNode;
  /** Buttons or other actions under the description. */
  actions?: React.ReactNode;
  /** Optional right-hand column (image, card…). Without it the hero is centred. */
  aside?: React.ReactNode;
  /** Small Arabic line shown above the eyebrow. */
  arabic?: string;
  className?: string;
};

/** Top-of-page hero shared by inner pages. */
export function PageHero({ eyebrow, title, description, actions, aside, arabic, className }: PageHeroProps) {
  const centered = !aside;
  return (
    <section className={cn("relative isolate overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44", className)}>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-56 size-[42rem] rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -left-48 top-40 size-[30rem] rounded-full bg-gold-100 blur-3xl" />
        <GeometricPattern
          id="page-hero-geo"
          className="text-brand-800 opacity-[0.06] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_15%,black,transparent)]"
        />
        <div className="skyline absolute inset-x-0 bottom-0 h-[18vw] max-h-52 text-brand-100/70" />
      </div>

      <div
        className={cn(
          "container-page",
          centered ? "flex flex-col items-center text-center" : "grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]",
        )}
      >
        <div className={cn("flex flex-col gap-6", centered ? "max-w-4xl items-center" : "items-start")}>
          {arabic && (
            <p lang="ar" dir="rtl" {...fadeUp(0)} className="fade-up font-arabic text-2xl text-gold-500 sm:text-3xl">
              {arabic}
            </p>
          )}
          {eyebrow && (
            <div {...fadeUp(60)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <HeroTitle
            text={title}
            className="font-display text-[3.2rem] leading-[0.98] tracking-[-0.03em] text-balance text-brand-950 sm:text-7xl lg:text-[5.4rem]"
          />
          {description && (
            <div {...fadeUp(420)} className={cn("fade-up max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl")}>
              {description}
            </div>
          )}
          {actions && (
            <div {...fadeUp(520)} className={cn("fade-up mt-2 flex flex-wrap gap-3", centered && "justify-center")}>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className="scale-in relative" style={{ "--d": "250ms" } as React.CSSProperties}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

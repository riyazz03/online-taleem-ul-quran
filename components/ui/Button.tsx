import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "light" | "ghost-light";

/** base = resting colours, fill = colour that rises in on hover, text = text colour once filled */
const variants: Record<Variant, { base: string; fill: string; text: string }> = {
  primary: {
    base: "bg-brand-800 text-cream shadow-[0_10px_24px_-10px_rgb(35_76_74/0.7)]",
    fill: "bg-brand-500",
    text: "hover:text-white",
  },
  gold: {
    base: "bg-gold-300 text-brand-950 shadow-[0_10px_24px_-10px_rgb(191_141_60/0.75)]",
    fill: "bg-cream",
    text: "hover:text-brand-950",
  },
  outline: {
    base: "border border-brand-800/30 text-brand-900",
    fill: "bg-brand-800",
    text: "hover:text-cream",
  },
  light: {
    base: "bg-cream text-brand-950",
    fill: "bg-gold-200",
    text: "hover:text-brand-950",
  },
  "ghost-light": {
    base: "border border-white/30 text-cream",
    fill: "bg-cream",
    text: "hover:text-brand-950",
  },
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  size?: "md" | "lg";
};

/**
 * Call-to-action link. On hover a new colour rises from the bottom in a soft
 * curve while the arrow slides out and a fresh one slides in. Uses <a> for
 * external, mailto:, tel: and WhatsApp links.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
  size = "md",
}: Props) {
  const v = variants[variant];
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const arrow = size === "lg" ? "size-[1.1rem]" : "size-4";
  const classes = cn(
    "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-[-0.01em] transition-[color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.97]",
    size === "lg" ? "h-[3.25rem] px-7 text-[0.95rem]" : "h-11 px-5 text-sm",
    v.base,
    v.text,
    className,
  );
  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute left-1/2 top-full -z-10 aspect-square w-[140%] -translate-x-1/2 rounded-[50%] transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-[62%]",
          v.fill,
        )}
      />
      <span>{children}</span>
      {icon && (
        <span aria-hidden className={cn("relative shrink-0 overflow-hidden", arrow)}>
          <ArrowRight
            className={cn(arrow, "transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[140%]")}
            strokeWidth={2.25}
          />
          <ArrowRight
            className={cn(arrow, "absolute inset-0 -translate-x-[140%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0")}
            strokeWidth={2.25}
          />
        </span>
      )}
    </>
  );

  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

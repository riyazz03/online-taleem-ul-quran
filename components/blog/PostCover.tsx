import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { ArchOutline, GeometricPattern, Star8 } from "@/components/ui/Brand";

/** Four deep-teal colourways; each post keeps the same one everywhere. */
const tones = [
  {
    bg: "from-brand-700 via-brand-900 to-brand-950",
    glowA: "bg-brand-400/45",
    glowB: "bg-gold-400/25",
    pattern: "text-gold-200",
    star: "text-gold-300/30",
  },
  {
    bg: "from-brand-900 via-brand-950 to-brand-950",
    glowA: "bg-gold-400/30",
    glowB: "bg-brand-500/40",
    pattern: "text-brand-200",
    star: "text-brand-300/30",
  },
  {
    bg: "from-brand-600 via-brand-800 to-brand-950",
    glowA: "bg-brand-300/35",
    glowB: "bg-gold-300/25",
    pattern: "text-cream",
    star: "text-gold-200/30",
  },
  {
    bg: "from-brand-950 via-brand-900 to-brand-700",
    glowA: "bg-gold-300/30",
    glowB: "bg-brand-400/35",
    pattern: "text-gold-300",
    star: "text-gold-300/25",
  },
] as const;

const sizes = {
  sm: { word: "text-[4.75rem] sm:text-[5.5rem]", star: "size-60", pattern: 56, chip: "left-4 top-4" },
  md: { word: "text-[5.5rem] sm:text-[6.5rem]", star: "size-72", pattern: 64, chip: "left-4 top-4" },
  lg: { word: "text-[6.5rem] sm:text-[9rem]", star: "size-[26rem]", pattern: 80, chip: "left-5 top-5 sm:left-7 sm:top-7" },
  xl: {
    word: "text-[7rem] sm:text-[11rem] lg:text-[13rem]",
    star: "size-[30rem] sm:size-[40rem]",
    pattern: 96,
    chip: "left-5 top-5 sm:left-8 sm:top-8",
  },
} as const;

/**
 * Generative cover art (no photos): a deep-teal gradient with the
 * geometric lattice, a slowly turning star and the post's Arabic word
 * set large in Amiri. Hover effects key off the nearest `group`.
 */
export function PostCover({
  post,
  size = "md",
  idSuffix = "card",
  className,
  showCategory = true,
}: {
  post: Pick<PostMeta, "slug" | "arabic" | "category" | "tone">;
  size?: keyof typeof sizes;
  /** Makes the SVG pattern id unique when a post appears twice on a page. */
  idSuffix?: string;
  className?: string;
  showCategory?: boolean;
}) {
  const tone = tones[post.tone % tones.length];
  const s = sizes[size];
  const id = `cover-${post.slug}-${idSuffix}`.replace(/[^a-zA-Z0-9-]/g, "-");

  return (
    <div className={cn("relative isolate overflow-hidden bg-gradient-to-br", tone.bg, className)}>
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
      >
        <GeometricPattern
          id={id}
          size={s.pattern}
          className={cn(
            tone.pattern,
            "opacity-[0.11] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]",
          )}
        />
        <div className={cn("absolute -right-16 -top-20 size-72 rounded-full blur-3xl", tone.glowA)} />
        <div className={cn("absolute -bottom-24 -left-16 size-72 rounded-full blur-3xl", tone.glowB)} />
        {/* Mihrab arch framing the word */}
        <div className="absolute bottom-0 left-1/2 aspect-[4/5] h-[80%] -translate-x-1/2">
          <div className="arch absolute inset-0 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-transparent" />
          <ArchOutline className="inset-0 text-gold-300/40" />
        </div>
      </div>

      <div aria-hidden className="skyline absolute inset-x-0 bottom-0 h-2/5 text-brand-950/45" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(15_37_36/0.5))]"
      />

      <span
        lang="ar"
        dir="rtl"
        aria-hidden
        className={cn(
          "absolute inset-0 grid place-items-center pt-[7%] font-arabic leading-none text-cream drop-shadow-[0_10px_30px_rgb(0_0_0/0.35)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:scale-105",
          s.word,
        )}
      >
        {post.arabic}
      </span>

      {showCategory && (
        <span
          className={cn(
            "absolute inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cream backdrop-blur-md",
            s.chip,
          )}
        >
          <Star8 className="size-2.5 text-gold-300" />
          {post.category}
        </span>
      )}
      <Star8 className="absolute bottom-4 right-4 size-3 text-gold-300/70" />
    </div>
  );
}

import { cn } from "@/lib/utils";

/**
 * Brand-tuned Tailwind Typography for rendered Markdown: Instrument Serif
 * headings, a gold drop cap, star bullets, framed quotations and Arabic
 * blocks (the markup comes from the renderer in lib/blog.ts).
 */
const prose = cn(
  "prose prose-lg max-w-none",
  // Colour tokens
  "[--tw-prose-body:color-mix(in_oklab,var(--color-ink)_84%,transparent)] [--tw-prose-headings:var(--color-brand-950)] [--tw-prose-bold:var(--color-brand-950)] [--tw-prose-links:var(--color-brand-700)] [--tw-prose-counters:var(--color-gold-600)] [--tw-prose-quotes:var(--color-brand-950)] [--tw-prose-hr:rgb(15_34_33/0.1)]",
  // Paragraphs and lead
  "prose-p:leading-[1.85] prose-p:text-pretty",
  "[&>p:first-of-type]:text-[1.3rem] [&>p:first-of-type]:leading-[1.7] [&>p:first-of-type]:text-brand-950",
  "[&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1.5 [&>p:first-of-type]:first-letter:font-display [&>p:first-of-type]:first-letter:text-[4.9rem] [&>p:first-of-type]:first-letter:leading-[0.72] [&>p:first-of-type]:first-letter:text-brand-600",
  // Headings
  "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal prose-headings:text-brand-950",
  "prose-h2:mb-6 prose-h2:mt-20 prose-h2:text-[2.4rem] prose-h2:leading-[1.05] prose-h2:tracking-[-0.02em] sm:prose-h2:text-[2.9rem]",
  "prose-h3:mb-3 prose-h3:mt-12 prose-h3:text-[1.75rem] prose-h3:leading-tight prose-h3:tracking-[-0.01em] sm:prose-h3:text-[1.95rem]",
  "[&_h2_em]:text-brand-500 [&_h3_em]:text-brand-500",
  // Inline emphasis and links
  "prose-em:font-display prose-em:text-[1.12em] prose-em:leading-none prose-em:text-brand-700",
  "prose-strong:font-semibold",
  "prose-a:font-semibold prose-a:decoration-gold-400 prose-a:decoration-2 prose-a:underline-offset-4 prose-a:transition-colors prose-a:hover:text-brand-500",
  // Unordered lists: gold eight-pointed star bullets (two overlapping squares)
  "[&_ul]:list-none [&_ul]:pl-0 [&_ul>li]:relative [&_ul>li]:pl-9",
  "[&_ul>li]:before:absolute [&_ul>li]:before:left-2 [&_ul>li]:before:top-[0.72em] [&_ul>li]:before:size-2.5 [&_ul>li]:before:bg-gold-400",
  "[&_ul>li]:after:absolute [&_ul>li]:after:left-2 [&_ul>li]:after:top-[0.72em] [&_ul>li]:after:size-2.5 [&_ul>li]:after:rotate-45 [&_ul>li]:after:bg-gold-400",
  "prose-li:my-2.5 prose-li:leading-[1.75] [&_ol>li]:pl-2 [&_ol>li]:marker:font-display [&_ol>li]:marker:text-[1.2em]",
  // Quotations: framed card with a gold star badge
  "prose-blockquote:relative prose-blockquote:my-16 prose-blockquote:rounded-[1.75rem] prose-blockquote:border-l-0 prose-blockquote:bg-gradient-to-br prose-blockquote:from-white prose-blockquote:to-gold-50 prose-blockquote:px-6 prose-blockquote:pb-7 prose-blockquote:pt-10 prose-blockquote:shadow-soft prose-blockquote:ring-1 prose-blockquote:ring-brand-900/8 sm:prose-blockquote:px-10 sm:prose-blockquote:pb-9",
  "prose-blockquote:font-display prose-blockquote:text-[1.55rem] prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:leading-[1.3] sm:prose-blockquote:text-[1.85rem]",
  "[&_blockquote_p]:my-0 [&_blockquote_p]:leading-[1.3] [&_blockquote_p+p]:mt-5 [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none",
  "[&_p[lang=ar]]:leading-[2.1] [&_blockquote_p[lang=ar]]:leading-[2] [&_blockquote_em]:text-[1em] [&_blockquote_em]:text-brand-600",
  "[&_blockquote_p:has(cite)]:mt-6 [&_blockquote_p:has(cite)]:border-t [&_blockquote_p:has(cite)]:border-brand-900/10 [&_blockquote_p:has(cite)]:pt-5",
  "[&_cite]:font-sans [&_cite]:text-xs [&_cite]:font-bold [&_cite]:uppercase [&_cite]:not-italic [&_cite]:tracking-[0.22em] [&_cite]:text-muted",
);

export function PostBody({ html, className }: { html: string; className?: string }) {
  return <div className={cn(prose, className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

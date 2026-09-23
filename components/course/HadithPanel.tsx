import type { Hadith, HadithSegment } from "@/lib/course-details";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8, Star8Outline } from "@/components/ui/Brand";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const segmentClass: Record<HadithSegment["kind"], string> = {
  isnad: "text-lg leading-[2.1] text-brand-200/70 sm:text-xl",
  matn: "text-[1.9rem] leading-[1.95] text-gold-200 sm:text-[2.6rem] lg:text-5xl lg:leading-[1.9]",
  note: "text-base leading-loose text-gold-400/90 sm:text-lg",
  source: "rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-base text-brand-200/75",
};

function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-3 text-gold-300/80", className)}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/60 sm:w-20" />
      <Star8 className="size-3.5" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/60 sm:w-20" />
    </div>
  );
}

/**
 * The course's hadith, typeset like a manuscript page: Arabic (chain of
 * narration, saying and source), then the English and Urdu translations
 * side by side. All strings come from lib/course-arabic.json.
 */
export function HadithPanel({ hadith, className }: { hadith: Hadith; className?: string }) {
  return (
    <section className={cn("grain relative overflow-hidden bg-brand-950 py-24 text-cream sm:py-32", className)}>
      <GeometricPattern id="hadith-geo" className="text-gold-300 opacity-[0.06]" />
      <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />
      <Star8Outline className="absolute -left-48 top-1/3 size-[30rem] animate-spin-slow text-brand-400/15" />
      <Star8Outline className="absolute -bottom-48 -right-48 size-[32rem] animate-spin-slow text-gold-300/10 [animation-direction:reverse]" />

      <div className="container-page relative flex flex-col items-center gap-14">
        <SectionHeading tone="light" eyebrow="Prophetic guidance" title="Wisdom from *the Sunnah*" />

        <Reveal y={50} className="w-full max-w-5xl">
          <figure className="relative overflow-hidden rounded-[2.5rem] border border-gold-300/15 bg-white/[0.035] px-6 py-10 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)] backdrop-blur-sm sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            {/* Corner ornaments */}
            {["left-5 top-5", "right-5 top-5", "bottom-5 left-5", "bottom-5 right-5"].map((pos) => (
              <Star8 key={pos} className={cn("absolute size-3 text-gold-300/40", pos)} />
            ))}

            <blockquote dir="rtl" className="flex flex-col items-center gap-4 text-center sm:gap-5">
              {hadith.arabic.map((seg, i) => (
                <Reveal key={i} y={16} blur={seg.kind === "matn"} delay={Math.min(i * 0.08, 0.4)}>
                  <p lang={seg.lang} className={cn("font-arabic text-balance", segmentClass[seg.kind])}>
                    {seg.text}
                  </p>
                </Reveal>
              ))}
            </blockquote>

            <Ornament className="my-10 sm:my-12" />

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/10">
              <Reveal y={20} className="flex flex-col gap-4 lg:pr-12">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brand-300">English</p>
                {hadith.english.narrator && (
                  <p className="text-sm font-semibold text-gold-300/90">{hadith.english.narrator}</p>
                )}
                <blockquote lang="en" className="flex flex-col gap-4">
                  {hadith.english.lines.map((line, i) => (
                    <p key={i} className="font-display text-[1.6rem] leading-[1.3] text-cream text-pretty sm:text-3xl">
                      “{line}”
                    </p>
                  ))}
                </blockquote>
              </Reveal>

              <Reveal y={20} delay={0.12} className="flex flex-col gap-4 lg:pl-12">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brand-300">Urdu</p>
                <blockquote lang="ur" dir="rtl" className="flex flex-col gap-4">
                  {hadith.urdu.map((para, i) => (
                    <p key={i} className="font-arabic text-xl leading-[2.1] text-brand-100/85 sm:text-[1.4rem]">
                      {para}
                    </p>
                  ))}
                </blockquote>
              </Reveal>
            </div>

            <figcaption className="mt-12 flex items-center justify-center gap-3 text-center text-xs font-bold uppercase tracking-[0.3em] text-brand-200/70">
              <span aria-hidden className="h-px w-8 bg-brand-200/30" />
              {hadith.reference}
              <span aria-hidden className="h-px w-8 bg-brand-200/30" />
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

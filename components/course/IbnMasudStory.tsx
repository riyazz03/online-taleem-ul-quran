import { Quote } from "lucide-react";
import type { Story } from "@/lib/course-details";
import { cn } from "@/lib/utils";
import { Star8, Star8Outline } from "@/components/ui/Brand";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ScrollLine } from "./ScrollLine";

/**
 * The narration of Ibn Mas'ud reciting to the Prophet ﷺ, told line by line
 * along a rail that draws itself as you read. Text from course-arabic.json.
 */
export function IbnMasudStory({ story, className }: { story: Story; className?: string }) {
  const last = story.dialogue.length - 1;
  return (
    <section className={cn("relative overflow-hidden py-24 sm:py-32", className)}>
      <Star8Outline className="absolute -left-40 bottom-10 size-[26rem] animate-spin-slow text-gold-400/20" />
      <div className="container-page relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal y={12}>
            <Eyebrow>A moment from the Sunnah</Eyebrow>
          </Reveal>
          <SplitHeading
            text={story.title}
            className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl lg:text-[4rem]"
          />
          <Reveal delay={0.15} y={12} className="flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-gold-400/70" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">{story.citation}</p>
          </Reveal>
        </div>

        <div className="relative">
          <ScrollLine className="bottom-4 left-[0.6rem] top-4" />
          <ol className="flex flex-col gap-10 pl-10 sm:gap-12 sm:pl-14">
            {story.dialogue.map((line, i) => (
              <Reveal as="li" key={i} y={30} amount={0.5} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-10 top-1.5 grid size-5 place-items-center rounded-full bg-cream ring-1 ring-brand-900/15 sm:-left-14"
                >
                  <Star8 className="size-2.5 text-gold-500" />
                </span>
                {line.speaker && <p className="text-sm font-semibold text-brand-600">{line.speaker}</p>}
                <p
                  className={cn(
                    "font-display text-[1.9rem] leading-[1.18] tracking-tight text-pretty sm:text-4xl",
                    line.speaker && "mt-2",
                    i === last ? "italic text-brand-500" : "text-brand-950",
                  )}
                >
                  {line.quote}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal y={30} className="mt-14 pl-10 sm:pl-14">
            <div className="relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border border-brand-900/8 bg-sand/70 p-7 sm:p-9">
              <span aria-hidden className="grid size-10 place-items-center rounded-full bg-white text-gold-500 shadow-soft">
                <Quote className="size-4" />
              </span>
              <p className="text-lg leading-relaxed text-brand-900 text-pretty">{story.reflection}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { HeartHandshake, Languages } from "lucide-react";
import type { RecitationCurriculum as Curriculum } from "@/lib/course-details";
import { Star8, Star8Outline } from "@/components/ui/Brand";
import { Eyebrow } from "@/components/ui/Section";
import { Parallax, SpotlightCard } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitHeading } from "@/components/motion/SplitHeading";

const pointIcons = [Languages, HeartHandshake];
/** Taken from the course copy: "learn the Arabic alphabet, grammar and vocabulary". */
const pillars = ["Alphabet", "Grammar", "Vocabulary"];

/** "Learn Quranic Arabic and connect with the Quran on a deeper level." */
export function RecitationCurriculum({ data, arabic }: { data: Curriculum; arabic: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-sand/60 py-24 sm:py-32">
      <div className="container-page flex flex-col gap-16 sm:gap-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="flex flex-col items-start gap-8">
            <Reveal y={12}>
              <Eyebrow>Course outline</Eyebrow>
            </Reveal>
            <SplitHeading
              text={data.title}
              className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl lg:text-[4rem]"
            />
            <ScrollText
              text={data.lead}
              className="text-xl font-medium leading-[1.55] tracking-tight text-brand-950 sm:text-2xl sm:leading-[1.5]"
            />
          </div>

          <Reveal y={60} className="relative mx-auto w-full max-w-md">
            <Parallax offset={30}>
              <div className="relative aspect-[1200/1132] overflow-hidden rounded-[2.5rem] border border-brand-900/8 bg-white shadow-lift">
                <Image
                  src="/img/about/guidance-2.webp"
                  alt="Illustration of a teacher on a video call guiding a smiling student at his laptop"
                  fill
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-contain p-6"
                />
              </div>
            </Parallax>
            <div className="absolute -bottom-6 -left-4 grid size-28 place-items-center rounded-full bg-brand-900 shadow-lift ring-8 ring-cream sm:-left-10 sm:size-32">
              <span lang="ar" dir="rtl" className="font-arabic text-5xl leading-none text-gold-200">
                {arabic}
              </span>
            </div>
            <ul className="absolute -right-2 top-8 flex flex-col items-end gap-2 sm:-right-8">
              {pillars.map((p, i) => (
                <li
                  key={p}
                  className="flex animate-float items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-800 shadow-soft backdrop-blur"
                  style={{ animationDelay: `${i * 600}ms` }}
                >
                  <Star8 className="size-2.5 text-gold-400" />
                  {p}
                </li>
              ))}
            </ul>
            <Star8Outline className="absolute -right-16 -top-16 -z-10 size-48 animate-spin-slow text-gold-400/40" />
          </Reveal>
        </div>

        <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.14}>
          {data.points.map((point, i) => {
            const Icon = pointIcons[i % pointIcons.length];
            return (
              <StaggerItem key={point.title} className="h-full">
                <SpotlightCard className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[2rem] border border-brand-900/8 bg-white/80 p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-10">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-900 text-gold-200 transition-transform duration-500 group-hover:-rotate-8">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-bold tabular-nums tracking-[0.3em] text-gold-500">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-[2.1rem] leading-tight text-brand-950">{point.title}</h3>
                  <p className="text-lg leading-relaxed text-muted text-pretty">{point.text}</p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

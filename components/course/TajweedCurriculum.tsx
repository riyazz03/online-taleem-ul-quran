import Image from "next/image";
import { Check, HeartHandshake } from "lucide-react";
import type { TajweedCurriculum as Curriculum } from "@/lib/course-details";
import { GeometricPattern, Star8Outline } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { LevelsStairs } from "./LevelsStairs";

const pad = (n: number) => String(n).padStart(2, "0");

/** Course outline (18 topics), overview + three levels, sisters and outcomes. */
export function TajweedCurriculum({ data, arabic }: { data: Curriculum; arabic: string }) {
  return (
    <>
      {/* ---------------- Outline ---------------- */}
      <section className="relative bg-gradient-to-b from-cream to-sand/60 py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col items-start gap-10 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Course outline"
              title="What the course *covers*"
              description={data.outlineIntro}
            />
            <Reveal delay={0.2} className="w-full max-w-md">
              <div className="grain relative flex items-end gap-5 overflow-hidden rounded-[2rem] bg-brand-900 p-7 text-cream shadow-lift">
                <GeometricPattern id="topics-geo" className="text-gold-200 opacity-[0.08]" />
                <span
                  lang="ar"
                  dir="rtl"
                  aria-hidden
                  className="absolute -top-3 right-5 font-arabic text-7xl leading-none text-white/10"
                >
                  {arabic}
                </span>
                <span className="relative font-display text-8xl leading-[0.8] text-gold-gradient">
                  <CountUp value={data.topics.length} />
                </span>
                <p className="relative max-w-[12rem] pb-1 text-sm font-medium leading-snug text-brand-100/80">
                  topics — from the etiquettes of recitation to the stopping signs
                </p>
              </div>
            </Reveal>
          </div>

          <Stagger as="ol" className="grid gap-3 sm:grid-cols-2" stagger={0.045} amount={0.05}>
            {data.topics.map((topic, i) => (
              <StaggerItem as="li" key={topic}>
                <div className="group flex h-full items-center gap-4 rounded-2xl border border-brand-900/8 bg-white/80 p-4 pr-5 shadow-soft backdrop-blur transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-800 hover:bg-brand-900 hover:shadow-lift">
                  <span className="w-10 shrink-0 font-display text-3xl leading-none tabular-nums text-gold-500 transition-colors duration-500 group-hover:text-gold-300">
                    {pad(i + 1)}
                  </span>
                  <span className="font-medium leading-snug text-brand-950 transition-colors duration-500 group-hover:text-cream">
                    {topic}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- Overview + levels ---------------- */}
      <section className="relative overflow-hidden bg-sand/60 py-24 sm:py-32">
        <Star8Outline className="absolute -right-40 top-10 size-[28rem] animate-spin-slow text-gold-400/20" />
        <div className="container-page relative flex flex-col gap-20 sm:gap-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="flex flex-col items-start gap-5">
              <Reveal y={12}>
                <Eyebrow>Course overview</Eyebrow>
              </Reveal>
              <SplitHeading
                text="Theory and practice, *hand in hand*"
                className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl lg:text-[4rem]"
              />
            </div>
            <div className="flex flex-col gap-8">
              <ScrollText
                text={data.overview.lead}
                className="text-2xl font-medium leading-[1.45] tracking-tight text-brand-950 sm:text-[1.7rem]"
              />
              {data.overview.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} y={20}>
                  <p className="text-lg leading-relaxed text-muted text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <SplitHeading
              as="h3"
              text={data.overview.levelsIntro}
              className="text-center font-display text-4xl leading-tight tracking-tight text-brand-950 sm:text-5xl"
            />
            <LevelsStairs levels={data.levels} />
          </div>
        </div>
      </section>

      {/* ---------------- Sisters + what you learn ---------------- */}
      <section className="relative py-24 sm:py-32">
        <div className="container-page grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal y={50} className="h-full">
            <article className="grain relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.5rem] bg-brand-900 p-8 text-cream shadow-lift sm:p-12">
              <GeometricPattern id="sisters-geo" className="text-gold-200 opacity-[0.07]" />
              <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-500/30 blur-3xl" />
              <span className="relative grid size-12 place-items-center rounded-2xl bg-gold-300 text-brand-950">
                <HeartHandshake className="size-5" />
              </span>
              <SplitHeading
                as="h2"
                text={data.sisters.title}
                className="relative font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-5xl"
                emClassName="italic text-gold-gradient"
              />
              <p className="relative text-lg leading-relaxed text-brand-100/80 text-pretty">{data.sisters.text}</p>
              <div className="relative mt-auto aspect-[6/5] w-full overflow-hidden rounded-[2rem] bg-white">
                <Image
                  src="/img/about/hero.webp"
                  alt="Illustration of a sister in hijab studying from an open book beside her screen"
                  fill
                  sizes="(min-width: 1024px) 34rem, 90vw"
                  className="object-contain p-4 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] hover:scale-105"
                />
              </div>
            </article>
          </Reveal>

          <Reveal y={50} delay={0.1} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-brand-900/8 bg-white p-8 shadow-soft sm:p-12">
              <Eyebrow>Learning outcomes</Eyebrow>
              <SplitHeading
                as="h2"
                text={data.learn.title}
                className="mt-5 font-display text-[2.6rem] leading-[1.02] tracking-tight text-brand-950 sm:text-5xl"
              />
              <Stagger as="ul" className="mt-8 flex flex-col" stagger={0.07}>
                {data.learn.items.map((item) => (
                  <StaggerItem
                    as="li"
                    key={item}
                    className="group flex items-start gap-4 border-b border-brand-900/8 py-4 last:border-0"
                  >
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 transition-colors duration-500 group-hover:bg-brand-800 group-hover:text-gold-200">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[1.05rem] leading-snug text-brand-950">{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-8">
                <ButtonLink href="/contact-us">Book your demo</ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}

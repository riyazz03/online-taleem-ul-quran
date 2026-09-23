import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { Lantern } from "@/components/art/Motifs";
import { SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/Interactive";
import { Reveal } from "@/components/motion/Reveal";
import { milestones } from "./data";
import { JourneyTrack } from "./JourneyTrack";

/** Milestone timeline on a dark band — only facts stated in the academy's own story. */
export function Journey() {
  return (
    <section className="grain relative overflow-hidden bg-brand-950 py-24 text-cream sm:py-32">
      <GeometricPattern id="about-journey-geo" className="text-gold-300 opacity-[0.06]" />
      <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />
      <Lantern chain={90} className="absolute left-[5%] top-0 hidden w-14 md:block lg:w-16" />
      <Lantern chain={150} delay={1.4} className="absolute right-[6%] top-0 hidden w-12 md:block lg:w-14" />
      <div className="skyline absolute inset-x-0 bottom-0 h-40 text-brand-900/60" />

      <div className="container-page relative flex flex-col gap-16 sm:gap-24">
        <SectionHeading
          tone="light"
          eyebrow="Our journey"
          title="From offline classes to *hearts around the world*"
          description="A few milestones on the road so far — Alhamdulillah for every one of them."
        />

        <JourneyTrack className="flex flex-col gap-14 lg:gap-24">
          {milestones.map((ms, i) => {
            const cardLeft = i % 2 === 1;
            const numbers = "stats" in ms ? stats.filter((s) => (ms.stats as readonly string[]).includes(s.label)) : [];
            return (
              <li key={ms.title} className="relative grid items-center pl-16 lg:grid-cols-2 lg:gap-28 lg:pl-0">
                {/* Node on the line */}
                <Reveal
                  scale={0.3}
                  y={0}
                  duration={0.8}
                  amount={0.8}
                  className="absolute left-6 top-6 z-10 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                >
                  <span className="grid size-12 place-items-center rounded-full border border-gold-300/40 bg-brand-950 text-gold-300 shadow-[0_0_0_8px_var(--color-brand-950)]">
                    <Star8 className="size-5" />
                  </span>
                </Reveal>

                {/* Oversized marker word (large screens) */}
                <div className={cn("hidden lg:flex", cardLeft ? "order-2 justify-start" : "order-1 justify-end")}>
                  <Reveal x={cardLeft ? 50 : -50} y={0} blur>
                    <span className="block font-display text-[7.5rem] italic leading-[0.9] tracking-tight text-gold-gradient xl:text-[9rem]">
                      {ms.marker}
                    </span>
                  </Reveal>
                </div>

                {/* Card */}
                <Reveal
                  x={0}
                  y={40}
                  className={cn(cardLeft ? "lg:order-1" : "lg:order-2")}
                >
                  <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold-300/30 hover:bg-white/[0.07] sm:p-9">
                    <div aria-hidden className="absolute -right-16 -top-16 size-40 rounded-full bg-brand-500/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                    <p className="relative text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold-300">
                      {ms.kicker}
                    </p>
                    <h3 className="relative mt-3 font-display text-[2.1rem] leading-[1.05] text-cream sm:text-[2.6rem]">
                      {ms.title}
                    </h3>
                    <p className="relative mt-4 leading-relaxed text-brand-100/75">{ms.text}</p>
                    {numbers.length > 0 && (
                      <dl className="relative mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                        {numbers.map((s) => (
                          <div key={s.label} className="flex flex-col-reverse gap-1 bg-brand-950/80 px-4 py-5 sm:px-5">
                            <dt className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-200/80 sm:tracking-[0.25em]">
                              {s.label}
                            </dt>
                            <dd className="font-display text-[2.6rem] leading-none text-gold-gradient sm:text-5xl">
                              <CountUp value={s.value} suffix={s.suffix} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </JourneyTrack>
      </div>
    </section>
  );
}

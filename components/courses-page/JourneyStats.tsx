import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { Lantern } from "@/components/art/Motifs";
import { SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/Interactive";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** "Our journey of guidance & growth" — all seven milestones, led by the student count. */
export function JourneyStats({ className }: { className?: string }) {
  const [lead, ...rest] = stats;
  return (
    <section className={cn("grain relative overflow-hidden bg-brand-950 py-24 text-cream sm:py-32", className)}>
      <GeometricPattern id="courses-journey-geo" className="text-gold-300 opacity-[0.06]" />
      <div aria-hidden className="absolute -left-40 -top-20 h-96 w-[50rem] rounded-full bg-brand-600/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -right-20 size-[30rem] rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          tone="light"
          align="left"
          eyebrow="Our journey"
          title="Our journey of *guidance & growth*"
          description="We have guided over 300 students on their Quran journey, proudly calling them our Guided Seekers."
        />

        <Stagger as="dl" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" stagger={0.08}>
          <StaggerItem className="group relative isolate col-span-2 flex min-h-52 flex-col-reverse justify-center gap-3 overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-800/80 via-brand-900/50 to-brand-950/20 p-7 transition-colors duration-500 hover:border-gold-300/30 sm:col-span-3 sm:min-h-60 sm:p-10">
            <dt className="text-xs font-bold uppercase tracking-[0.25em] text-brand-200/80">
              {lead.label} · our Guided Seekers
            </dt>
            <dd className="font-display text-[5.5rem] leading-none text-gold-gradient sm:text-9xl">
              <CountUp value={lead.value} suffix={lead.suffix} duration={2.4} />
              <Lantern chain={30} className="absolute -top-2 right-6 h-36 w-auto opacity-90 sm:right-12 sm:h-44" />
            </dd>
          </StaggerItem>

          {rest.map((s) => (
            <StaggerItem
              key={s.label}
              className="group relative flex flex-col-reverse justify-end gap-3 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-500 hover:border-gold-300/30 hover:bg-white/[0.08] sm:p-7"
            >
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-200/80">
                {s.label}
                <Star8 className="absolute right-4 top-4 size-3 text-gold-300/40 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-90 group-hover:text-gold-300" />
              </dt>
              <dd className="font-display text-5xl leading-none text-gold-gradient sm:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

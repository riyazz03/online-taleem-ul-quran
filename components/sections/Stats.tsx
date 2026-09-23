import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GeometricPattern } from "@/components/ui/Brand";
import { SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/Interactive";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Dark band with animated counters for the academy's milestones. */
export function Stats({ className, limit = 6 }: { className?: string; limit?: number }) {
  const list = stats.slice(0, limit);
  return (
    <section className={cn("grain relative overflow-hidden bg-brand-950 py-24 text-cream sm:py-32", className)}>
      <GeometricPattern id="stats-geo" className="text-gold-300 opacity-[0.06]" />
      <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />

      <div className="container-page relative flex flex-col gap-16">
        <SectionHeading
          tone="light"
          eyebrow="Our journey"
          title="Our journey of *guidance & growth*"
          description="We have guided over 300 students on their Quran journey, proudly calling them our Guided Seekers."
        />
        <Stagger
          as="dl"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3"
          stagger={0.08}
        >
          {list.map((s) => (
            <StaggerItem key={s.label} className="group flex flex-col-reverse items-center gap-2 bg-brand-950/90 px-4 py-10 text-center transition-colors duration-500 hover:bg-brand-900 sm:py-12">
              <dt className="text-xs font-bold uppercase tracking-[0.25em] text-brand-200/80">{s.label}</dt>
              <dd className="font-display text-6xl leading-none text-gold-gradient sm:text-7xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

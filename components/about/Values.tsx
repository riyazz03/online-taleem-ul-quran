import { BookOpenCheck, DoorOpen, Hourglass, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { SectionHeading } from "@/components/ui/Section";
import { TiltCard } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { values } from "./data";

const valueIcons: Record<(typeof values)[number]["icon"], LucideIcon> = {
  door: DoorOpen,
  book: BookOpenCheck,
  shield: ShieldCheck,
  hourglass: Hourglass,
};

/** "What we stand for" — four principles drawn from the academy's mission. */
export function Values() {
  return (
    <section className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <GeometricPattern id="about-values-geo" className="text-brand-800 opacity-[0.045]" />
      <div aria-hidden className="absolute -left-40 top-10 size-[30rem] rounded-full bg-cream/80 blur-3xl" />

      <div className="container-page relative flex flex-col gap-14 sm:gap-20">
        <div className="grid items-end gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <SectionHeading align="left" eyebrow="What we stand for" title="The values behind *every lesson*" />
          <Reveal delay={0.15} y={16}>
            <p className="max-w-md text-base leading-relaxed text-muted text-pretty sm:text-lg lg:ml-auto">
              Everything we do grows from one wish — that anyone with a desire to learn the Quran
              can, whatever their age, schedule or circumstances.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:pb-12" stagger={0.12}>
          {values.map((v, i) => {
            const Icon = valueIcons[v.icon];
            return (
              <StaggerItem key={v.title} className={cn("h-full", i % 2 === 1 && "lg:translate-y-12")}>
                <TiltCard max={5} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-brand-900/8 bg-cream p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:min-h-[21rem] lg:min-h-[23rem]">
                    <span
                      aria-hidden
                      className="absolute inset-x-7 top-0 h-[3px] origin-left scale-x-0 rounded-b-full bg-gradient-to-r from-brand-400 to-gold-400 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />
                    <Star8 className="absolute -bottom-12 -right-12 size-40 text-brand-100/70 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:scale-110" />

                    <div className="relative flex items-start justify-between">
                      <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft transition-all duration-500 group-hover:-rotate-6 group-hover:bg-brand-800 group-hover:text-gold-200">
                        <Icon className="size-6" />
                      </span>
                      <span className="font-display text-5xl leading-none text-brand-900/10 transition-colors duration-500 group-hover:text-gold-400/60">
                        0{i + 1}
                      </span>
                    </div>

                    <div className="relative mt-auto flex flex-col gap-3 pt-10 sm:pt-12">
                      <h3 className="font-display text-[2rem] leading-[1.05] text-brand-950">{v.title}</h3>
                      <p className="leading-relaxed text-muted">{v.text}</p>
                    </div>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

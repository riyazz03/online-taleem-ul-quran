import { audiences } from "@/lib/content";
import { GeometricPattern } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { icons } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** "Who we teach": children, sisters, adults and non-Arabic speakers. */
export function Audiences() {
  return (
    <section className="relative overflow-hidden bg-sand section-y">
      <GeometricPattern id="aud-geo" className="text-brand-800 opacity-[0.045]" />
      <div className="container-page relative grid items-start gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="flex flex-col items-start gap-8 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Who we teach"
            title="A place at the table for *every learner*"
            description="From a child's first letters to an adult finally fulfilling a lifelong wish — our teachers meet every student where they are."
          />
          <Reveal delay={0.25}>
            <ButtonLink href="/contact-us">Find the right class</ButtonLink>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
          {audiences.map((a, i) => {
            const Icon = icons[a.icon];
            return (
              <StaggerItem key={a.title} className={i % 2 === 1 ? "sm:translate-y-10" : undefined}>
                <article className="group relative h-full overflow-hidden rounded-[2rem] border border-brand-900/8 bg-cream p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="absolute -right-10 -top-10 size-32 rounded-full bg-brand-100 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[2.6]" />
                  <div className="relative flex flex-col gap-5">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft transition-colors duration-500 group-hover:bg-brand-800 group-hover:text-gold-200">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-3xl text-brand-950">{a.title}</h3>
                    <p className="leading-relaxed text-muted">{a.description}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

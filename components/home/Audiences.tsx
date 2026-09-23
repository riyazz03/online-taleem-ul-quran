import Image from "next/image";
import { audiences } from "@/lib/content";
import { GeometricPattern } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { icons } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** "Who we teach": children, sisters, adults and non-Arabic speakers. */
export function Audiences() {
  return (
    <section className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <GeometricPattern id="aud-geo" className="text-brand-800 opacity-[0.04]" />
      <div className="container-page relative flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Who we teach"
            title="Classes for *every learner*"
            description="From a child's very first letters to an adult finally fulfilling a lifelong wish — our teachers meet every student exactly where they are."
          />
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href="/contact-us" variant="outline">
              Find the right class
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {audiences.map((a) => {
            const Icon = icons[a.icon];
            return (
              <StaggerItem key={a.title}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-brand-900/8 bg-cream shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />
                    <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-2xl bg-cream/95 text-brand-700 shadow-soft backdrop-blur transition-colors duration-500 group-hover:bg-brand-800 group-hover:text-gold-200">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="font-display text-[1.75rem] leading-tight text-brand-950">{a.title}</h3>
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

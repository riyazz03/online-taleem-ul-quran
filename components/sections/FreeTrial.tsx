import { Check } from "lucide-react";
import { trialFeatures } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

/** "Still deciding?" call to action with the free-trial checklist. */
export function FreeTrial({
  className,
  eyebrow = "Free trial",
  title = "Still *deciding?*",
  description = "Interested in learning more about our courses? Book a demo class — it's free, and there's no obligation.",
}: {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="container-page">
        <Reveal y={50} className="grain relative overflow-hidden rounded-[2.5rem] bg-brand-900 text-cream shadow-lift">
          <GeometricPattern id="trial-geo" className="text-gold-200 opacity-[0.08]" />
          <div aria-hidden className="absolute -left-40 bottom-0 size-96 rounded-full bg-brand-500/30 blur-3xl" />
          <div aria-hidden className="absolute right-0 top-0 size-96 rounded-full bg-gold-400/15 blur-3xl" />
          <div className="skyline absolute inset-x-0 bottom-0 h-32 text-brand-950/40" />

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:p-16">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
              <SplitHeading
                text={title}
                className="font-display text-5xl leading-[1] tracking-tight sm:text-6xl lg:text-7xl"
                emClassName="italic text-gold-gradient"
              />
              <p className="max-w-md text-lg leading-relaxed text-brand-100/80">{description}</p>
              <ButtonLink href="/contact-us" variant="gold" size="lg" className="mt-2">
                Book your demo
              </ButtonLink>
            </div>

            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 backdrop-blur-md sm:p-9">
              <p className="flex items-center gap-3 font-display text-3xl sm:text-4xl">
                Claim your free trial
                <Star8 className="size-5 animate-spin-slow text-gold-300" />
              </p>
              <Stagger as="ul" className="mt-7 flex flex-col gap-4" stagger={0.09}>
                {trialFeatures.map((f) => (
                  <StaggerItem as="li" key={f} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold-300 text-brand-950">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span className="text-lg font-medium">{f}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

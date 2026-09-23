import { BookOpenText, Scale, ScrollText, Sparkles } from "lucide-react";
import type { CourseDetail } from "@/lib/course-details";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArchOutline, GeometricPattern } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Magnetic, TiltCard } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Aqeeda, Seerat, Fiqh, Surah memorization. */
const icons = [Sparkles, ScrollText, Scale, BookOpenText];

/** "Enrich your recitation journey" — four arch-topped cards and a CTA. */
export function EnrichSection({ data, className }: { data: CourseDetail["enrich"]; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-sand/70 py-24 sm:py-32", className)}>
      <GeometricPattern id="enrich-geo" className="text-brand-800 opacity-[0.045]" />
      <div className="container-page relative flex flex-col gap-16">
        <SectionHeading
          eyebrow="Beyond recitation"
          title={data.title}
          description={data.description}
          titleClassName="lg:text-[3.6rem]"
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {data.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            const featured = i === data.cards.length - 1;
            return (
              <StaggerItem key={card.title} className="h-full">
                <TiltCard className="h-full" max={5}>
                  <article className="group relative flex h-full flex-col rounded-[2rem] border border-brand-900/8 bg-white p-3 shadow-soft transition-shadow duration-500 hover:shadow-lift">
                    <div className="relative mx-auto mt-3 aspect-[5/4] w-[52%] sm:w-[72%]">
                      <ArchOutline className="inset-0 translate-x-2 translate-y-2 text-gold-400/60" />
                      <div className={cn("arch absolute inset-0", featured ? "bg-gold-100" : "bg-brand-50")} />
                      <div className="arch absolute inset-0 bg-gradient-to-b from-brand-800 to-brand-950 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="absolute inset-0 grid place-items-center pt-[18%]">
                        <Icon
                          className={cn(
                            "size-10 transition-all duration-700 ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-gold-200",
                            featured ? "text-gold-600" : "text-brand-700",
                          )}
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.65rem] font-bold tabular-nums tracking-[0.3em] text-gold-500 transition-colors duration-700 group-hover:text-gold-300">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-7 text-center">
                      <h3 className="font-display text-[2rem] leading-tight text-brand-950">{card.title}</h3>
                      <p className="leading-relaxed text-muted">{card.description}</p>
                    </div>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal y={20} className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <ButtonLink href="/contact-us" size="lg">
              Book your demo
            </ButtonLink>
          </Magnetic>
          <ButtonLink href={site.whatsappUrl} variant="outline" size="lg">
            <span className="inline-flex items-center gap-2">
              <WhatsAppIcon className="size-4" /> Chat on WhatsApp
            </span>
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

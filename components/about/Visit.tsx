import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Star8 } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Parallax } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { visit } from "./data";

/** "Visit us on weekends" — invitation to drop by, with the address and directions. */
export function Visit() {
  const { address } = site;
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="flex flex-col items-start gap-7">
          <Reveal y={12}>
            <Eyebrow>{visit.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading
            text={visit.title}
            className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl lg:text-[4rem]"
          />
          <Reveal delay={0.1} y={16}>
            <p className="max-w-lg text-base leading-relaxed text-muted text-pretty sm:text-lg">{visit.description}</p>
          </Reveal>

          <div className="flex w-full max-w-lg flex-col gap-4">
            <Reveal delay={0.15} y={12}>
              <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold-600">
                <CalendarDays className="size-4" />
                Every weekend
              </p>
            </Reveal>
            <Stagger className="grid grid-cols-2 gap-3 sm:gap-4" stagger={0.12}>
              {visit.days.map((day) => (
                <StaggerItem key={day}>
                  <div className="group relative overflow-hidden rounded-3xl border border-brand-900/8 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-6">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-400 to-gold-300" />
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-muted">
                      {day.slice(0, 3)}
                    </span>
                    <p className="mt-1 font-display text-[2rem] leading-none text-brand-950 sm:text-[2.6rem]">{day}</p>
                    <Star8 className="absolute bottom-5 right-5 size-4 text-gold-400 transition-transform duration-700 group-hover:rotate-90" />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.2} className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/contact-us" size="lg">
              Plan your visit
            </ButtonLink>
            <ButtonLink href={address.mapsUrl} variant="outline" size="lg">
              Get directions
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal y={50} className="relative">
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-brand-900 shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <Parallax offset={40} className="absolute -inset-y-[10%] inset-x-0">
              <Image
                src="/img/about/visit.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 36rem, 92vw"
                className="object-cover brightness-[1.35] saturate-[1.15]"
              />
            </Parallax>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/20 to-transparent" />

            <span className="absolute left-5 top-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-brand-950/40 py-1.5 pl-2 pr-4 text-xs font-semibold text-cream backdrop-blur-md sm:left-7 sm:top-7">
              <span className="relative grid size-5 place-items-center rounded-full bg-gold-300/20">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-300/60" />
                <span className="relative size-2 rounded-full bg-gold-300" />
              </span>
              Drop by every Saturday &amp; Sunday
            </span>

            <div className="absolute inset-x-4 bottom-4 rounded-[1.75rem] border border-white/15 bg-white/10 p-6 text-cream backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gold-300 text-brand-950">
                  <MapPin className="size-5" />
                </span>
                <address className="not-italic">
                  <span className="block text-[0.68rem] font-bold uppercase tracking-[0.28em] text-brand-200">
                    Find us at
                  </span>
                  <span className="mt-2 block font-display text-2xl leading-tight sm:text-[1.7rem]">
                    {address.lines[0]}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-brand-100/80">
                    {address.lines.slice(1).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
              </div>
              <a
                href={address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-gold-200 transition-colors hover:text-gold-100"
              >
                Open in Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

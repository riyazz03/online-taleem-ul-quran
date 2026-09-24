import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Star8 } from "@/components/ui/Brand";
import { ArchScene } from "@/components/art/Scenes";
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
    <section className="relative overflow-x-clip section-y">
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

        <div className="relative mx-auto w-full max-w-[27rem] lg:mr-0">
          <Reveal y={50} blur>
            <Parallax offset={24}>
              <div className="relative">
                <div aria-hidden className="absolute inset-x-[8%] bottom-[4%] top-[18%] rounded-full bg-brand-300/35 blur-3xl" />
                <ArchScene
                  id="about-visit-scene"
                  variant="night"
                  focal="mosque"
                  title="Illustration of a mosque beneath a crescent moon and swinging lanterns, framed by a mihrab arch"
                  className="relative drop-shadow-[0_30px_40px_rgb(15_37_36/0.25)]"
                />
              </div>
            </Parallax>
          </Reveal>

          <Reveal delay={0.3} y={16} className="absolute -left-2 top-[30%] z-10 sm:-left-10">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/90 py-2 pl-2 pr-4 text-xs font-semibold text-brand-900 shadow-lift backdrop-blur-md">
              <span className="relative grid size-6 place-items-center rounded-full bg-gold-100">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-300/70" />
                <span className="relative size-2 rounded-full bg-gold-500" />
              </span>
              Every Saturday &amp; Sunday
            </span>
          </Reveal>

          <Reveal delay={0.2} y={40} className="relative z-10 mx-3 -mt-14 sm:mx-6 sm:-mt-16 lg:-ml-16 lg:mr-10">
            <div className="rounded-[1.75rem] border border-brand-900/8 bg-white/95 p-6 shadow-lift backdrop-blur-md sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-800 text-gold-200">
                  <MapPin className="size-5" />
                </span>
                <address className="not-italic">
                  <span className="block text-[0.68rem] font-bold uppercase tracking-[0.28em] text-gold-600">
                    Find us at
                  </span>
                  <span className="mt-2 block font-display text-2xl leading-tight text-brand-950 sm:text-[1.7rem]">
                    {address.lines[0]}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
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
                className="group mt-5 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-brand-700 transition-colors hover:text-brand-950"
              >
                Open in Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

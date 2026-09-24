import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Parallax } from "@/components/motion/Interactive";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { missionChapters as ch, missionLead } from "./data";
import { ClientRosette } from "./ClientRosette";
import { Highlight } from "./Highlight";

/** Circular text seal that slowly turns around an eight-pointed star. */
function Seal({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid size-28 place-items-center rounded-full bg-cream/95 shadow-lift backdrop-blur sm:size-32", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="about-seal-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className="fill-brand-800 text-[15px] font-bold uppercase" letterSpacing="3">
          <textPath href="#about-seal-path" textLength="460" lengthAdjust="spacing">
            Read correctly ✦ Read beautifully ✦
          </textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-brand-900 text-gold-300 sm:size-14">
        <Star8 className="size-6 sm:size-7" />
      </span>
    </div>
  );
}

function MissionArt() {
  return (
    <div className="relative mx-auto w-full max-w-[19.5rem] sm:max-w-[26rem] lg:max-w-[30rem]">
      <Reveal y={60} blur>
        <Parallax offset={26}>
          <div className="relative aspect-square">
            <div aria-hidden className="absolute -inset-[9%]">
              <ClientRosette className="size-full text-gold-400/70" strokeWidth={0.6} />
            </div>
            <Star8 className="absolute inset-[3%] size-[94%] animate-spin-slow text-brand-100/80 [animation-direction:reverse]" />
            <div className="absolute inset-[11%] overflow-hidden rounded-full border-[6px] border-white bg-gradient-to-b from-brand-200/70 via-brand-100 to-brand-50 shadow-lift">
              <GeometricPattern id="about-mission-geo" size={48} className="text-brand-800 opacity-[0.1]" />
              <div aria-hidden className="absolute inset-x-[15%] bottom-[8%] h-[30%] rounded-full bg-white/60 blur-2xl" />
            </div>
            <div className="absolute inset-x-[6%] bottom-[12%] top-[14%]">
              <Image
                src="/img/about/guidance-2.webp"
                alt="Illustration of a boy learning online from his teacher on a video call, with books beside his laptop"
                fill
                sizes="(min-width: 1024px) 28rem, 85vw"
                className="object-contain object-bottom drop-shadow-[0_24px_24px_rgb(15_37_36/0.2)]"
              />
            </div>
          </div>
        </Parallax>
      </Reveal>

      <Reveal delay={0.35} y={20} className="absolute -left-2 -top-4 sm:-left-8">
        <Seal />
      </Reveal>

      <Reveal delay={0.5} y={24} className="absolute -bottom-6 right-0 sm:-right-6">
        <div className="flex max-w-[15rem] items-center gap-3 rounded-3xl bg-brand-900 p-4 pr-5 text-cream shadow-lift">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gold-300 text-brand-950">
            <GraduationCap className="size-5" />
          </span>
          <p className="text-sm font-semibold leading-snug">
            Experienced teachers
            <span className="block font-medium text-brand-100/70">&amp; adult supervision</span>
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function Chapter({
  index,
  label,
  children,
  dropCap = false,
}: {
  index: number;
  label: string;
  children: React.ReactNode;
  dropCap?: boolean;
}) {
  return (
    <Reveal y={28} className="grid gap-3 sm:grid-cols-[7.5rem_1fr] sm:gap-8">
      <h3 className="flex items-baseline gap-3 sm:flex-col sm:gap-1 sm:pt-1">
        <span aria-hidden className="font-display text-2xl sm:text-3xl leading-none text-brand-400">
          0{index}
        </span>
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold-600">{label}</span>
      </h3>
      <p
        className={cn(
          "text-[1.075rem] leading-[1.8] text-ink/80 text-pretty sm:text-lg sm:leading-[1.8]",
          dropCap &&
            "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-brand-800",
        )}
      >
        {children}
      </p>
    </Reveal>
  );
}

/** "Our mission and purpose" — the founding story told as an editorial long-read. */
export function Mission() {
  return (
    <section id="mission" className="relative scroll-mt-20 overflow-x-clip section-y">
      <div className="container-page relative grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="relative lg:sticky lg:top-32 lg:self-start">
          <MissionArt />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Reveal y={12}>
              <Eyebrow>Our story</Eyebrow>
            </Reveal>
            <SplitHeading
              text="Our *mission* and *purpose*"
              className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl lg:text-[4rem]"
            />
          </div>

          <ScrollText
            text={missionLead}
            className="text-2xl font-medium leading-[1.4] tracking-tight text-brand-950 sm:text-[1.85rem]"
          />

          <div aria-hidden className="flex items-center gap-3 text-gold-400">
            <span className="h-px flex-1 bg-gradient-to-r from-gold-300/70 to-transparent" />
            <Star8 className="size-3" />
          </div>

          <div className="flex flex-col gap-10">
            <Chapter index={1} label={ch.gap.label} dropCap>
              {ch.gap.text}
            </Chapter>
            <Chapter index={2} label={ch.answer.label}>
              {ch.answer.text}
            </Chapter>
            <Chapter index={3} label={ch.growth.label}>
              {ch.growth.before} <Highlight>{ch.growth.highlight}</Highlight>
              {ch.growth.after}
            </Chapter>

            <Reveal y={36} blur>
              <figure className="relative ml-0 border-l-2 border-gold-400 py-2 pl-6 sm:ml-[9.5rem] sm:pl-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-1 -top-10 select-none font-display text-[8rem] leading-none text-gold-300/50 sm:-left-2"
                >
                  &ldquo;
                </span>
                <blockquote className="relative font-display text-[1.5rem] leading-[1.18] tracking-[-0.01em] text-brand-900 text-balance sm:text-[2.4rem]">
                  {ch.aim}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-muted">
                  <span className="h-px w-8 bg-gold-400" />
                  Our aim
                </figcaption>
              </figure>
            </Reveal>

            <Chapter index={4} label={ch.journey.label}>
              {ch.journey.text}
            </Chapter>
          </div>

          <Reveal className="flex flex-wrap items-center gap-3 sm:pl-[9.5rem]">
            <ButtonLink href="/contact-us" size="lg">
              Book your free demo
            </ButtonLink>
            <ButtonLink href="/our-course" variant="outline" size="lg">
              Explore courses
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

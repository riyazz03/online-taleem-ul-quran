import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { courses } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArchOutline, GeometricPattern, Star8, Star8Outline } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Section";
import { HeroTitle, fadeUp } from "@/components/ui/PageHero";
import { Magnetic } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found. Explore our online Quran courses or get in touch with us.",
};

/** Shared size of the "404" composition; the arch is sized in em so it tracks the digits. */
const digitSize = "text-[9.5rem] sm:text-[15rem] lg:text-[18.5rem]";

/** One of the two "4"s, rising out of a mask on first paint. */
function Digit({ children, index, className }: { children: string; index: number; className?: string }) {
  return (
    <span className="rise-word">
      <span
        style={{ "--i": index } as React.CSSProperties}
        className={cn("block font-display leading-[0.82] tracking-[-0.04em]", digitSize, className)}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * The "0": a mihrab arch framing the emblem, like a doorway to somewhere else.
 * Its bottom sits on the digits' baseline (0.07em above the line box) and its
 * point rises a little above their cap height.
 */
function ArchZero() {
  return (
    <div
      className={cn("scale-in relative mx-[0.035em] mb-[0.07em] h-[0.8em] w-[0.6em] shrink-0", digitSize)}
      style={{ "--d": "260ms" } as React.CSSProperties}
    >
      <ArchOutline className="inset-0 translate-x-2 translate-y-2 text-gold-400/80 sm:translate-x-3 sm:translate-y-3" />
      <div className="arch grain relative grid h-full w-full place-items-center overflow-hidden bg-brand-900">
        <GeometricPattern id="not-found-arch-geo" size={48} className="text-gold-200 opacity-[0.12]" />
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-brand-400/35 to-transparent" />
        <Star8Outline className="absolute top-1/2 left-1/2 size-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-gold-300/35" />
        <div className="relative mt-[18%] w-[58%] animate-float-slow">
          <Image
            src="/brand/emblem-light.svg"
            alt=""
            width={2215}
            height={2410}
            unoptimized
            className="h-auto w-full drop-shadow-[0_10px_24px_rgb(0_0_0/0.35)]"
          />
        </div>
      </div>
    </div>
  );
}

const destinations = [
  ...courses.map((c) => ({
    href: `/course-details/${c.slug}`,
    title: c.title,
    label: "Course",
    arabic: c.arabic as string | undefined,
  })),
  { href: site.whatsappUrl, title: "Chat on WhatsApp", label: "Message us", arabic: undefined },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pb-8 pt-32 sm:pt-40">
      {/* Backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-56 size-[42rem] rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -left-48 top-48 size-[30rem] rounded-full bg-gold-100 blur-3xl" />
        <GeometricPattern
          id="not-found-geo"
          className="text-brand-800 opacity-[0.06] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,black,transparent)]"
        />
        <Star8Outline className="absolute -left-40 top-[18%] size-[26rem] animate-spin-slow text-gold-400/25" />
        <Star8Outline className="absolute -right-40 top-[34%] size-[26rem] animate-spin-slow text-brand-400/25 [animation-direction:reverse]" />
        <div className="skyline absolute inset-x-0 bottom-0 h-[18vw] max-h-52 text-brand-100/70" />
      </div>

      <div className="container-page flex flex-col items-center text-center">
        <p lang="ar" dir="rtl" {...fadeUp(0)} className="fade-up font-arabic text-2xl text-gold-500 sm:text-3xl">
          ٤٠٤
        </p>
        <div {...fadeUp(60)} className="fade-up mt-4">
          <Eyebrow>Error 404 · Page not found</Eyebrow>
        </div>

        {/* 4 [arch] 4 */}
        <div aria-hidden className="relative mt-8 flex items-end justify-center sm:mt-10">
          <Digit index={0} className="text-brand-950">
            4
          </Digit>
          <ArchZero />
          <Digit index={1} className="italic text-brand-500">
            4
          </Digit>
          <Star8 className="absolute -top-2 left-[6%] size-4 animate-float text-gold-400 sm:size-5" />
          <Star8 className="absolute -right-2 top-[8%] size-3 animate-float-slow text-brand-400 sm:-right-5" />
        </div>

        <HeroTitle
          text="This page has *lost its way*"
          startIndex={3}
          className="mt-10 max-w-3xl font-display text-[2.9rem] leading-[1] tracking-[-0.03em] text-balance text-brand-950 sm:mt-14 sm:text-6xl lg:text-7xl"
        />
        <p {...fadeUp(480)} className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
          The link may be broken, or the page may have moved. Let&rsquo;s guide you back to where your Quran
          journey continues.
        </p>
        <div {...fadeUp(580)} className="fade-up mt-9 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
          </Magnetic>
          <ButtonLink href="/our-course" variant="outline" size="lg">
            Explore courses
          </ButtonLink>
          <ButtonLink href="/contact-us" variant="outline" size="lg">
            Contact us
          </ButtonLink>
        </div>

        {/* Helpful destinations */}
        <div className="mt-20 w-full max-w-5xl sm:mt-24">
          <Reveal y={16} className="flex items-center justify-center gap-3 text-gold-500">
            <span className="h-px w-10 bg-gold-400/60 sm:w-16" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Or head straight to</span>
            <span className="h-px w-10 bg-gold-400/60 sm:w-16" />
          </Reveal>
          <Stagger as="ul" className="mt-8 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {destinations.map((d) => {
              const external = d.href.startsWith("http");
              const content = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-800 group-hover:text-gold-200">
                    {d.arabic ? (
                      <span lang="ar" dir="rtl" className="font-arabic text-xl leading-none">
                        {d.arabic}
                      </span>
                    ) : (
                      <WhatsAppIcon className="size-5" />
                    )}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-600">{d.label}</span>
                    <span className="truncate font-display text-[1.45rem] leading-tight text-brand-950">{d.title}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-brand-800 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-45" />
                </>
              );
              const className =
                "group flex h-full items-center gap-4 rounded-2xl border border-brand-900/8 bg-white/80 p-4 shadow-soft backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-lift";
              return (
                <StaggerItem as="li" key={d.href}>
                  {external ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link href={d.href} className={className}>
                      {content}
                    </Link>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

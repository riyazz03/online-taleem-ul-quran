"use client";

import Image from "next/image";
import { m } from "motion/react";
import { Check } from "lucide-react";
import { trialFeatures } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

const ease = [0.16, 1, 0.3, 1] as const;

/** Gold star ornament for the corners of the pass. */
function Corner({ className }: { className: string }) {
  return <Star8 className={cn("absolute size-3 text-gold-400", className)} />;
}

/**
 * The free-trial invitation: a cream "pass" with a gold border that slides
 * up out of a teal envelope, then a gold seal stamps onto the envelope.
 */
function TrialPass() {
  return (
    <m.div
      initial="closed"
      whileInView="open"
      viewport={{ once: true, amount: 0.45 }}
      className="relative mx-auto w-full max-w-[26rem]"
    >
      {/* Clips the pass at the envelope's bottom edge while it slides out */}
      <div className="relative overflow-hidden px-3 pt-6 sm:px-5">
        {/* envelope back */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-44 rounded-b-[1.75rem] rounded-t-md bg-brand-900" />

        {/* the pass */}
        <m.div
          variants={{
            closed: { y: 150, rotate: 0 },
            open: { y: 0, rotate: -2.5, transition: { duration: 1.2, ease, delay: 0.15 } },
          }}
          className="relative z-10 mb-24 rounded-[1.4rem] bg-[#fdfaf2] p-2 shadow-[0_30px_60px_-24px_rgb(15_37_36/0.55)]"
        >
          <div className="relative rounded-[1.1rem] border border-gold-300/80 p-1">
            <div className="relative rounded-[0.85rem] border border-gold-200 px-6 pb-8 pt-7 sm:px-8">
              <Corner className="-left-1.5 -top-1.5" />
              <Corner className="-right-1.5 -top-1.5" />
              <Corner className="-bottom-1.5 -left-1.5" />
              <Corner className="-bottom-1.5 -right-1.5" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold-700">Free trial pass</p>
                  <p className="mt-2 font-display text-[2rem] leading-none text-brand-950">
                    Your <span className="italic text-brand-500">demo class</span>
                  </p>
                </div>
                <span lang="ar" dir="rtl" className="font-arabic text-3xl leading-none text-gold-500">
                  دعوة
                </span>
              </div>

              <div aria-hidden className="my-5 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />

              <ul className="flex flex-col gap-3">
                {trialFeatures.map((f, i) => (
                  <m.li
                    key={f}
                    variants={{
                      closed: { opacity: 0, x: -10 },
                      open: { opacity: 1, x: 0, transition: { duration: 0.6, ease, delay: 0.8 + i * 0.08 } },
                    }}
                    className="flex items-center gap-3 text-[0.95rem] font-semibold text-brand-900"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-800 text-gold-200">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </m.li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between border-t border-dashed border-gold-300 pt-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-brand-700">
                <span>Weekends</span>
                <span className="text-gold-600">✦</span>
                <span>Online</span>
                <span className="text-gold-600">✦</span>
                <span>Free</span>
              </div>
            </div>
          </div>
        </m.div>

        {/* envelope front pocket, with a V-shaped opening */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-20 h-32 rounded-b-[1.75rem] bg-gradient-to-b from-brand-700 to-brand-800 shadow-[0_-10px_30px_-12px_rgb(15_37_36/0.5)] [clip-path:polygon(0_0,50%_42%,100%_0,100%_100%,0_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-20 h-32 [clip-path:polygon(0_0,50%_42%,100%_0,100%_100%,0_100%)]"
        >
          <GeometricPattern id="trial-envelope-geo" className="text-gold-200 opacity-[0.08]" />
        </div>
      </div>

      {/* wax seal */}
      <m.div
        aria-hidden
        variants={{
          closed: { scale: 1.8, opacity: 0, rotate: -30 },
          open: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 16, delay: 1.1 } },
        }}
        className="absolute bottom-[4rem] left-1/2 z-30 -ml-9 grid size-[4.5rem] place-items-center rounded-full border-[3px] border-gold-300 bg-brand-950 shadow-[0_10px_24px_-8px_rgb(15_37_36/0.8)] ring-4 ring-gold-300/25"
      >
        <Image src="/brand/emblem-light.svg" alt="" width={40} height={44} unoptimized className="h-11 w-auto" />
      </m.div>
    </m.div>
  );
}

/** "Still deciding?" call to action with the free-trial pass. */
export function FreeTrial({
  className,
  eyebrow = "Free trial",
  title = "Still *deciding?*",
  description = "Interested in learning more about our courses? Book a free demo class and see how we teach — for you or your child.",
}: {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden section-y", className)}>
      <div aria-hidden className="absolute inset-x-0 top-1/2 h-[70%] -translate-y-1/2 bg-gradient-to-b from-transparent via-sand/70 to-transparent" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Reveal y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading
            text={title}
            className="font-display text-5xl leading-[1] tracking-tight text-brand-950 sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1} y={16}>
            <p className="max-w-md text-lg leading-relaxed text-muted">{description}</p>
          </Reveal>
          <Reveal delay={0.2} y={16} className="flex flex-wrap gap-3">
            <ButtonLink href="/contact-us" size="lg">
              Book your demo
            </ButtonLink>
            <ButtonLink href={site.whatsappUrl} variant="outline" size="lg">
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="size-4" /> Ask on WhatsApp
              </span>
            </ButtonLink>
          </Reveal>
        </div>

        <TrialPass />
      </div>
    </section>
  );
}

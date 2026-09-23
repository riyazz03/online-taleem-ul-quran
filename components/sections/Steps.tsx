"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { steps } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Section";
import { icons } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

/** "How we work" — five steps joined by a line that draws itself on scroll. */
export function Steps({ className }: { className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section className={cn("relative py-24 sm:py-32", className)}>
      <div className="container-page flex flex-col gap-16">
        <SectionHeading
          eyebrow="Getting started"
          title="How we *work*"
          description="From your first message to your first class — five simple steps."
        />

        <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Track + animated fill: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-6 left-7 top-6 w-px bg-brand-900/10 lg:inset-x-[10%] lg:bottom-auto lg:top-7 lg:h-px lg:w-auto" />
          <m.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-6 left-7 top-6 w-px origin-top bg-gradient-to-b from-brand-400 to-gold-400 lg:hidden"
          />
          <m.span
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute inset-x-[10%] top-7 hidden h-px origin-left bg-gradient-to-r from-brand-400 to-gold-400 lg:block"
          />

          {steps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <m.li
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="group relative flex items-start gap-6 lg:flex-col lg:items-center lg:text-center"
              >
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border border-brand-900/10 bg-cream text-brand-700 shadow-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:bg-brand-800 group-hover:text-gold-200">
                  <Icon className="size-6" />
                </span>
                <div className="flex flex-col gap-2 pt-1 lg:pt-0">
                  <span className="text-xs font-bold tabular-nums tracking-[0.3em] text-gold-500">
                    STEP 0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl leading-tight text-brand-950 sm:text-[1.7rem]">{step.title}</h3>
                </div>
              </m.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

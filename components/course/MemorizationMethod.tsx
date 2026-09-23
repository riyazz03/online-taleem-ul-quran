"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "motion/react";
import type { MemorizationCurriculum as Curriculum } from "@/lib/course-details";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

const ease = [0.16, 1, 0.3, 1] as const;

/** Radii of the three rings: the new lesson at the core, older revision around it. */
const RINGS = [62, 112, 162];

/**
 * Concentric rings — every class starts with the new lesson (Sabaq) at the
 * core, then widens to the recent (Sabaq Para) and older (Purana Sabaq)
 * revision. The ring for the step being read lights up.
 */
function Rings({ active, labels, arabic }: { active: number; labels: string[]; arabic: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-[26rem]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
        <circle
          cx="200"
          cy="200"
          r="194"
          fill="none"
          className="origin-center animate-spin-slow stroke-gold-400/40"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        {[...RINGS].reverse().map((r, ri) => {
          const i = RINGS.length - 1 - ri;
          const on = i <= active;
          return (
            <m.circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: 0.15 * i, ease }}
              className={cn(
                "transition-[fill,stroke] duration-700",
                i === active
                  ? "fill-brand-100 stroke-brand-500"
                  : on
                    ? "fill-brand-50 stroke-brand-300"
                    : "fill-white/60 stroke-brand-900/10",
              )}
              strokeWidth={i === active ? 2 : 1}
            />
          );
        })}
      </svg>

      {/* Ring labels, placed on the top edge of each ring */}
      {RINGS.map((r, i) => (
        <span
          key={r}
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] shadow-soft transition-colors duration-500 sm:text-[0.68rem]",
            i === active ? "bg-brand-800 text-cream" : "bg-white text-brand-700",
          )}
          style={{ top: `${((200 - r) / 400) * 100}%` }}
        >
          0{i + 1} · {labels[i]}
        </span>
      ))}

      <div className="absolute left-1/2 top-1/2 grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-900 shadow-lift">
        <span lang="ar" dir="rtl" className="font-arabic text-3xl leading-none text-gold-200 sm:text-4xl">
          {arabic}
        </span>
      </div>
    </div>
  );
}

type Step = Curriculum["steps"][number];

/** One step of the method. Becomes "active" while it crosses the middle of the viewport. */
function StepCard({
  step,
  index,
  active,
  onActivate,
}: {
  step: Step;
  index: number;
  active: boolean;
  /** Stable setter (receives this card's index). */
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const centred = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (centred) onActivate(index);
  }, [centred, index, onActivate]);

  return (
    <m.li
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease }}
      onPointerEnter={() => onActivate(index)}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border bg-white p-7 shadow-soft transition-[border-color,box-shadow] duration-500 sm:p-9",
        active ? "border-brand-400/60 shadow-lift" : "border-brand-900/8",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-brand-400 to-gold-400 transition-transform duration-700",
          active ? "scale-y-100" : "scale-y-0",
        )}
      />
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="font-display text-5xl leading-none text-gold-500">0{index + 1}</span>
        <h3 className="font-display text-[2.2rem] leading-none text-brand-950">{step.name}</h3>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-brand-700">
          {step.meaning}
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {step.paragraphs.map((p, j) => (
          <p key={j} className="leading-relaxed text-muted text-pretty">
            {p}
          </p>
        ))}
      </div>
    </m.li>
  );
}

/** "Our approach has stood the test of time" — Sabaq, Sabaq Para, Purana Sabaq. */
export function MemorizationMethod({ data, arabic }: { data: Curriculum; arabic: string }) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-gradient-to-b from-cream to-sand/60 py-24 sm:py-32">
      <div className="container-page flex flex-col gap-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Reveal y={12}>
            <Eyebrow>Course outline</Eyebrow>
          </Reveal>
          <SplitHeading
            text={data.title}
            className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl lg:text-[4rem]"
          />
          <Reveal delay={0.15} y={16}>
            <p className="text-lg leading-relaxed text-muted sm:text-xl">{data.description}</p>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal y={40} className="flex flex-col items-center gap-6">
              <Rings active={active} labels={data.steps.map((s) => s.meaning)} arabic={arabic} />
              <p className="max-w-xs text-center text-sm leading-relaxed text-muted">
                Three parts, every class — the new lesson first, then recent and older revision.
              </p>
            </Reveal>
          </div>

          <ol className="flex flex-col gap-5">
            {data.steps.map((step, i) => (
              <StepCard key={step.name} step={step} index={i} active={active === i} onActivate={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

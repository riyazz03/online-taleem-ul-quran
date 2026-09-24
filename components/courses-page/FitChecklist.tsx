"use client";

import { useState } from "react";
import { m } from "motion/react";
import { Check } from "lucide-react";
import { cn, parseEmphasis } from "@/lib/utils";
import { Star8, Star8Outline } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { fitPoints } from "./data";

const messages = [
  "Which of these sound like you?",
  "A good start — keep going.",
  "Halfway there.",
  "Almost there — just one more.",
  "You'll feel right at home with us.",
];

const R = 34;
const CIRCUMFERENCE = 2 * Math.PI * R;

/** Progress ring + message + call to action. */
function FitMeter({ count, total }: { count: number; total: number }) {
  const done = count === total;
  return (
    <div
      className={cn(
        "relative flex items-center gap-5 overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] border p-5 shadow-soft transition-colors duration-700 sm:gap-6 sm:p-6",
        done ? "border-brand-800 bg-brand-900 text-cream" : "border-brand-900/8 bg-white/80 backdrop-blur",
      )}
    >
      <Star8Outline
        className={cn(
          "absolute -right-10 -top-10 size-40 animate-spin-slow transition-colors duration-700",
          done ? "text-gold-300/30" : "text-brand-300/25",
        )}
      />
      <div className="relative size-20 shrink-0">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
          <circle cx="40" cy="40" r={R} fill="none" strokeWidth="6" className={done ? "stroke-white/10" : "stroke-brand-100"} />
          <m.circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={false}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - count / total) }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className={cn("transition-colors duration-700", done ? "stroke-gold-300" : "stroke-brand-500")}
          />
        </svg>
        <span
          className={cn(
            "absolute inset-0 grid place-items-center font-display text-2xl tabular-nums",
            done ? "text-gold-200" : "text-brand-900",
          )}
        >
          {done ? <Check className="size-7" strokeWidth={2.5} aria-hidden /> : `${count}/${total}`}
        </span>
      </div>
      <div className="relative flex flex-col items-start gap-3">
        <p aria-live="polite" className={cn("font-display text-2xl leading-tight", done ? "text-cream" : "text-brand-950")}>
          <span className="sr-only">{`${count} of ${total} ticked. `}</span>
          {messages[count]}
        </p>
        <ButtonLink href="/contact-us" variant={done ? "gold" : "primary"}>
          Book a free demo
        </ButtonLink>
      </div>
    </div>
  );
}

/**
 * "Is this program right for you?" — the original "Don't enroll with us"
 * points, turned into a positive self-check the visitor can tick off.
 */
export function FitChecklist({ heading }: { heading: React.ReactNode }) {
  const [checked, setChecked] = useState<boolean[]>(() => fitPoints.map(() => false));
  const count = checked.filter(Boolean).length;

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-16 lg:gap-y-16">
      <div className="lg:col-start-1 lg:row-start-1">{heading}</div>

      <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 sm:pb-10 lg:col-span-2 lg:row-start-2" stagger={0.1}>
        {fitPoints.map((p, i) => {
          const on = checked[i];
          return (
            <StaggerItem as="li" key={p.title} className={cn(i % 2 === 1 && "sm:translate-y-10")}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={cn(
                  "group relative flex h-full w-full flex-col gap-5 overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] border p-7 text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift active:scale-[0.99] sm:p-8",
                  on ? "border-brand-800 bg-brand-900" : "border-brand-900/8 bg-cream",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute -right-12 -top-12 size-36 rounded-full transition-all duration-700 ease-[var(--ease-out-expo)]",
                    on ? "scale-[3.2] bg-brand-800/70" : "bg-brand-100 group-hover:scale-125",
                  )}
                />
                <span className="relative flex items-center justify-between">
                  <span aria-hidden className="text-xs font-bold tabular-nums tracking-[0.15em] text-gold-500">0{i + 1}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-10 place-items-center rounded-full border-2 transition-all duration-500 ease-[var(--ease-spring)]",
                      on
                        ? "scale-110 border-gold-300 bg-gold-300 text-brand-950"
                        : "border-brand-900/15 bg-white text-transparent group-hover:border-brand-400 group-hover:text-brand-300",
                    )}
                  >
                    <Check className="size-5" strokeWidth={3} />
                  </span>
                </span>
                <span
                  className={cn(
                    "relative font-display text-[1.75rem] leading-[1.1] transition-colors duration-500 sm:text-[1.9rem]",
                    on ? "text-cream" : "text-brand-950",
                  )}
                >
                  {parseEmphasis(p.title).map((seg, k) =>
                    seg.em ? (
                      <em key={k} className={cn("transition-colors duration-500", on ? "text-gold-300" : "text-brand-500")}>
                        {seg.text}
                      </em>
                    ) : (
                      <span key={k}>{seg.text}</span>
                    ),
                  )}
                </span>
                <span
                  className={cn(
                    "relative leading-relaxed transition-colors duration-500",
                    on ? "text-brand-100/80" : "text-muted",
                  )}
                >
                  {p.text}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500",
                    on ? "text-gold-300" : "text-brand-600",
                  )}
                >
                  <Star8 className="size-3" />
                  {on ? "That's me" : "Tick if this is you"}
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* After the cards on small screens; beside the heading on desktop. */}
      <Reveal delay={0.2} y={24} className="lg:col-start-2 lg:row-start-1 lg:self-end">
        <FitMeter count={count} total={fitPoints.length} />
      </Reveal>
    </div>
  );
}

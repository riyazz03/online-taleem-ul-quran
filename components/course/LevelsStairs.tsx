"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";
import { Star8 } from "@/components/ui/Brand";
import { ScrollLine } from "./ScrollLine";

const ease = [0.16, 1, 0.3, 1] as const;
/** Height of each stair tread on desktop — the course literally climbs. */
const treads = ["lg:h-16", "lg:h-36", "lg:h-56"];

/**
 * The three Tajweed levels as an ascending staircase: on desktop each card
 * sits on a tread that grows out of the floor; on mobile they stack along a
 * rail that draws itself on scroll.
 */
export function LevelsStairs({ levels }: { levels: { title: string; description: string }[] }) {
  return (
    <ol className="relative grid gap-6 pl-12 lg:grid-cols-3 lg:items-end lg:gap-5 lg:pl-0">
      <ScrollLine className="bottom-8 left-[1.2rem] top-8 lg:hidden" />

      {levels.map((level, i) => (
        <li key={level.title} className="relative flex flex-col">
          {/* Rail node (mobile) */}
          <span
            aria-hidden
            className="absolute -left-12 top-8 grid size-10 place-items-center rounded-full border border-brand-900/10 bg-cream text-gold-500 shadow-soft lg:hidden"
          >
            <Star8 className="size-4" />
          </span>

          <m.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease }}
            className="group relative flex flex-col gap-4 rounded-[1.25rem] sm:rounded-[2rem] border border-brand-900/8 bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brand-700">
                Level {i + 1}
              </span>
              {/* Signal-strength style meter: how far up the climb this level is */}
              <span aria-hidden className="flex items-end gap-1">
                {levels.map((_, j) => (
                  <span
                    key={j}
                    className={cn(
                      "w-1.5 rounded-full transition-colors duration-500",
                      j <= i ? "bg-gold-400" : "bg-brand-900/10",
                    )}
                    style={{ height: 8 + j * 6 }}
                  />
                ))}
              </span>
            </div>
            <h4 className="font-display text-[2rem] leading-tight text-brand-950">{level.title}</h4>
            <p className="leading-relaxed text-muted">{level.description}</p>
          </m.article>

          {/* Stair tread (desktop) */}
          <m.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, delay: i * 0.15, ease }}
            className={cn(
              "relative mt-4 hidden origin-bottom overflow-hidden rounded-t-[1.75rem] bg-gradient-to-b from-brand-800 to-brand-950 lg:block",
              treads[i],
            )}
          >
            <span className="absolute bottom-3 right-6 font-display text-6xl leading-none text-gold-300/80">
              0{i + 1}
            </span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/60 to-transparent" />
          </m.div>
        </li>
      ))}
    </ol>
  );
}

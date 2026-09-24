"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Baby,
  BookOpen,
  BookOpenText,
  GraduationCap,
  HeartHandshake,
  Route,
  Target,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { courses } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { comparison, sharedFeatures } from "./data";

const sharedIcons: Record<(typeof sharedFeatures)[number]["icon"], LucideIcon> = {
  baby: Baby,
  users: Users,
  heart: HeartHandshake,
  cap: GraduationCap,
  book: BookOpen,
  award: Award,
};

const rows: { key: "bestFor" | "goal" | "method"; label: string; icon: LucideIcon }[] = [
  { key: "bestFor", label: "Best for", icon: UserRound },
  { key: "goal", label: "You'll learn to", icon: Target },
  { key: "method", label: "How you learn", icon: Route },
];

/* Each row of a card re-plays this entrance when the card is switched in on
   small screens (display: none → flex restarts CSS animations). */
const cellAnim = "max-lg:animate-[fade-up_0.8s_var(--ease-out-expo)_both]";

function RowLabel({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold-600">
      <Icon className="size-3.5" aria-hidden />
      {children}
    </p>
  );
}

/** Side-by-side comparison of the three courses, plus what they all share. */
export function CompareCourses({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  // Row under the mouse — highlighted across all three columns on desktop.
  const [row, setRow] = useState<number | null>(null);
  const hoverRow = (r: number) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setRow(r);
  };
  const rowTone = (r: number) =>
    cn("transition-colors duration-500", row === r && "lg:bg-brand-50/80");

  return (
    <section
      id="compare"
      className={cn("relative scroll-mt-10 overflow-hidden section-y", className)}
    >
      <GeometricPattern
        id="compare-geo"
        className="text-brand-800 opacity-[0.05] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
      />
      <div aria-hidden className="absolute -right-40 top-40 size-[34rem] rounded-full bg-brand-200/30 blur-3xl" />

      <div className="container-page relative flex flex-col gap-12 sm:gap-14">
        <SectionHeading
          eyebrow="Side by side"
          title="Compare our *courses*"
          description="Not sure where to begin? See how Tajweed, Recitation and Memorization differ — and everything they have in common."
        />

        {/* Course switcher — small screens only; on desktop all three columns show. */}
        <Reveal y={16} className="lg:hidden">
          <div
            role="group"
            aria-label="Choose a course to view"
            className="relative mx-auto flex w-full max-w-md rounded-full border border-brand-900/10 bg-white/80 p-1.5 shadow-soft backdrop-blur"
          >
            <span
              aria-hidden
              className="absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/3)] rounded-full bg-brand-800 shadow-[0_8px_20px_-8px_rgb(35_76_74/0.8)] transition-transform duration-500 ease-[var(--ease-out-expo)]"
              style={{ transform: `translateX(${active * 100}%)` }}
            />
            {comparison.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                aria-pressed={active === i}
                aria-controls={`compare-${c.slug}`}
                onClick={() => setActive(i)}
                className={cn(
                  "relative z-10 flex-1 rounded-full px-2 py-2.5 text-[0.8rem] font-semibold transition-colors duration-300 sm:text-sm",
                  active === i ? "text-cream" : "text-brand-800 hover:text-brand-950",
                )}
              >
                {c.short}
              </button>
            ))}
          </div>
        </Reveal>

        <div onPointerLeave={() => setRow(null)}>
          <Stagger className="grid gap-6 lg:grid-cols-3 lg:gap-y-0" stagger={0.14} amount={0.1}>
            {comparison.map((c, i) => {
              const course = courses.find((x) => x.slug === c.slug)!;
              return (
                <StaggerItem
                  key={c.slug}
                  as="article"
                  className={cn(
                    "group relative flex-col overflow-hidden rounded-[2rem] border border-brand-900/8 bg-white shadow-soft transition-[box-shadow,border-color] duration-500 hover:border-brand-400/40 hover:shadow-lift lg:row-span-6 lg:grid lg:grid-rows-subgrid",
                    active === i ? "flex" : "hidden",
                  )}
                >
                  <div id={`compare-${c.slug}`} className="contents">
                    {/* Accent bar that draws in on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-gold-300 to-brand-400 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />

                    {/* Header */}
                    <div className={cn("relative bg-gradient-to-b from-brand-50/70 to-white p-6 sm:p-8", cellAnim)} onPointerEnter={() => setRow(null)}>
                      <span
                        lang="ar"
                        dir="rtl"
                        aria-hidden
                        className="pointer-events-none absolute right-4 top-1 font-arabic text-[6.5rem] leading-none text-brand-900/[0.05] transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:text-gold-400/15"
                      >
                        {course.arabic}
                      </span>
                      <div className="relative flex items-center gap-4">
                        <div className="arch relative h-20 w-16 shrink-0 overflow-hidden bg-brand-100">
                          <Image src={course.image} alt="" fill sizes="4rem" className="object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold tabular-nums tracking-[0.15em] text-gold-500">
                            0{i + 1}
                          </span>
                          <h3 className="font-display text-[2rem] leading-[1.05] text-brand-950 sm:text-[2.2rem]">
                            {course.title}
                          </h3>
                        </div>
                      </div>
                      <p className="relative mt-5 leading-relaxed text-muted">{course.description}</p>
                      <div className="relative mt-4 flex flex-wrap gap-2">
                        {course.tags.map((t) => (
                          <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-[0.7rem] font-semibold text-brand-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {rows.map((row, r) => (
                      <div
                        key={row.key}
                        className={cn("flex flex-col gap-2.5 border-t border-brand-900/8 px-6 py-5 sm:px-8 sm:py-6", cellAnim, rowTone(r))}
                        style={{ animationDelay: `${(r + 1) * 70}ms` }}
                        onPointerEnter={hoverRow(r)}
                      >
                        <RowLabel icon={row.icon}>{row.label}</RowLabel>
                        <p className="leading-relaxed text-ink/80">{c[row.key]}</p>
                      </div>
                    ))}

                    <div
                      className={cn("flex flex-col gap-3 border-t border-brand-900/8 px-6 py-5 sm:px-8 sm:py-6", cellAnim, rowTone(3))}
                      style={{ animationDelay: "280ms" }}
                      onPointerEnter={hoverRow(3)}
                    >
                      <RowLabel icon={BookOpenText}>Key topics</RowLabel>
                      <ul className="flex flex-col gap-2">
                        {c.topics.map((t) => (
                          <li key={t} className="flex items-start gap-3 text-[0.95rem] leading-snug text-brand-900">
                            <Star8 className="mt-[0.2rem] size-3 text-gold-400" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={cn("flex items-end border-t border-brand-900/8 bg-brand-50/40 px-6 py-5 sm:px-8", cellAnim)}
                      style={{ animationDelay: "350ms" }}
                    >
                      <Link
                        href={`/course-details/${c.slug}`}
                        className="group/link flex w-full items-center justify-between gap-4 text-sm font-semibold text-brand-800"
                      >
                        Explore {course.title}
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-800 transition-all duration-500 ease-[var(--ease-spring)] group-hover/link:rotate-45 group-hover/link:bg-brand-800 group-hover/link:text-cream">
                          <ArrowUpRight className="size-5" aria-hidden />
                        </span>
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* What every course shares */}
        <Reveal y={40} className="relative overflow-hidden rounded-[2rem] border border-brand-900/8 bg-gradient-to-br from-white via-white/80 to-brand-50 p-6 shadow-soft sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
            <div className="flex flex-col gap-3 lg:w-64 lg:shrink-0">
              <Star8 className="size-6 text-gold-400" />
              <h3 className="font-display text-4xl leading-[1.05] text-brand-950 sm:text-[2.6rem]">
                Included in <em className="text-brand-500">every</em> course
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Whichever path you choose, these come as standard.
              </p>
            </div>
            <Stagger as="ul" className="grid flex-1 gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
              {sharedFeatures.map((f) => {
                const Icon = sharedIcons[f.icon];
                return (
                  <StaggerItem as="li" key={f.title} className="group/feat flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-900 text-gold-200 transition-transform duration-500 ease-[var(--ease-spring)] group-hover/feat:-rotate-[8deg] group-hover/feat:scale-105">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-brand-950">{f.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

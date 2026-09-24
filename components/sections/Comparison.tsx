"use client";

import { useState } from "react";
import { m, type Variants } from "motion/react";
import {
  Award,
  CalendarClock,
  Check,
  Gift,
  HeartHandshake,
  House,
  Info,
  Minus,
  MonitorSmartphone,
  NotebookPen,
  School,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CrescentStar, Lantern } from "@/components/art/Motifs";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/* ------------------------------------------------------------------
   Content. Our column only states what the academy already says about
   itself (lib/content.ts and the original course pages). The other two
   columns are deliberately general and fair: every madrasa and tutor
   is different, so they are phrased with "usually", "depends", "varies".
------------------------------------------------------------------- */

/** How well an option usually covers a need: yes / it depends / not usually. */
type Status = "yes" | "varies" | "no";
type Cell = { title: string; text: string };
type OtherCell = Cell & { status: Status };
type OtherKey = "madrasa" | "tutor";
type Row = { label: string; icon: LucideIcon; us: Cell } & Record<OtherKey, OtherCell>;

const rows: Row[] = [
  {
    label: "Timings",
    icon: CalendarClock,
    us: { title: "Weekdays & weekends", text: "Flexible timings, and you can reschedule when needed." },
    madrasa: { status: "no", title: "Fixed timetable", text: "Usually set hours for the whole class." },
    tutor: { status: "varies", title: "Depends on the tutor", text: "Varies with their availability." },
  },
  {
    label: "Teaching style",
    icon: Users,
    us: { title: "One-to-one or batch", text: "Tailored lessons, at your own pace." },
    madrasa: { status: "no", title: "Group classes", text: "Usually one pace for the whole group." },
    tutor: { status: "yes", title: "One-to-one", text: "Personal attention; the pace depends on the tutor." },
  },
  {
    label: "Female teachers for sisters",
    icon: HeartHandshake,
    us: { title: "Yes", text: "Female teachers for female students, online or offline." },
    madrasa: { status: "varies", title: "Depends", text: "Varies from one madrasa to another." },
    tutor: { status: "varies", title: "Depends", text: "Depends on who is available nearby." },
  },
  {
    label: "Learn from home",
    icon: MonitorSmartphone,
    us: { title: "Live online, from anywhere", text: "Or join our offline classes in Vellore." },
    madrasa: { status: "no", title: "In person", text: "Travel to the madrasa for each class." },
    tutor: { status: "yes", title: "At your home", text: "The tutor visits, usually locally." },
  },
  {
    label: "Progress tracking",
    icon: NotebookPen,
    us: { title: "Monthly exams", text: "Focused exams keep your progress on track." },
    madrasa: { status: "varies", title: "Periodic tests", text: "How often varies by madrasa." },
    tutor: { status: "no", title: "Informal", text: "Usually no set exam schedule." },
  },
  {
    label: "Fees",
    icon: Wallet,
    us: { title: "Pay per lesson", text: "Only pay for the lessons you take." },
    madrasa: { status: "varies", title: "Usually fixed", text: "A set monthly or term fee." },
    tutor: { status: "varies", title: "Varies", text: "Hourly or monthly rates set by the tutor." },
  },
  {
    label: "Certificate",
    icon: Award,
    us: { title: "Yes", text: "A Quran completion certificate on our courses." },
    madrasa: { status: "varies", title: "Depends", text: "Some madrasas issue one." },
    tutor: { status: "no", title: "Not usually", text: "Private lessons are usually informal." },
  },
  {
    label: "Free trial",
    icon: Gift,
    us: { title: "Free demo class", text: "Held on weekends, free of charge." },
    madrasa: { status: "no", title: "Not usually", text: "You can usually visit and ask first." },
    tutor: { status: "varies", title: "Depends", text: "Some tutors offer a trial lesson." },
  },
];

const others: Record<OtherKey, { name: string; short: string; note: string; icon: LucideIcon }> = {
  madrasa: { name: "Local madrasa", short: "Madrasa", note: "Classes at a nearby madrasa", icon: School },
  tutor: { name: "Private home tutor", short: "Home tutor", note: "A tutor who visits your home", icon: House },
};
const otherKeys: OtherKey[] = ["madrasa", "tutor"];

const statusMeta: Record<Status, { icon: LucideIcon; label: string; className: string }> = {
  yes: { icon: Check, label: "Yes", className: "bg-brand-100 text-brand-700" },
  varies: { icon: Info, label: "Depends / varies", className: "bg-gold-100 text-gold-700" },
  no: { icon: Minus, label: "Not usually", className: "bg-brand-900/[0.06] text-brand-900/45" },
};

/* ------------------------------------------------------------------
   Motion
------------------------------------------------------------------- */

const ease = [0.16, 1, 0.3, 1] as const;

const tableV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const backdropV: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};
const rowV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delayChildren: 0.2 } },
};
/** The gold checks in our column pop in with a little spring. */
const popV: Variants = {
  hidden: { scale: 0, rotate: -45 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 520, damping: 15, delay: 0.15 } },
};
/** The neutral icons in the other columns simply settle in. */
const settleV: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease, delay: 0.25 } },
};

/* ------------------------------------------------------------------
   Small pieces
------------------------------------------------------------------- */

function GoldCheck({ className }: { className?: string }) {
  return (
    <m.span
      variants={popV}
      aria-hidden
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full bg-gold-300 text-brand-950 shadow-[0_6px_16px_-6px_rgb(224_189_116/0.9)]",
        className,
      )}
    >
      <Check className="size-3.5" strokeWidth={3} />
    </m.span>
  );
}

function StatusIcon({ status, animate = true }: { status: Status; animate?: boolean }) {
  const s = statusMeta[status];
  const Icon = s.icon;
  const cls = cn("grid size-6 shrink-0 place-items-center rounded-full", s.className);
  const icon = <Icon className="size-3.5" strokeWidth={2.75} />;
  return animate ? (
    <m.span variants={settleV} aria-hidden className={cls}>
      {icon}
    </m.span>
  ) : (
    <span aria-hidden className={cls}>
      {icon}
    </span>
  );
}

/* ------------------------------------------------------------------
   Desktop / tablet (md and up): a four-column comparison table.
   The dark card behind our column is one grid item spanning every row,
   so the column reads as a single highlighted card.
------------------------------------------------------------------- */

function ComparisonTable() {
  return (
    <m.div
      role="table"
      aria-label="Online Taleem ul Quran compared with a local madrasa and a private home tutor"
      className="relative hidden grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid"
      style={{ gridTemplateRows: `repeat(${rows.length + 1}, auto)` }}
      variants={tableV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Our highlighted column */}
      <m.div
        aria-hidden
        variants={backdropV}
        className="grain -my-5 overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] bg-gradient-to-b from-brand-900 to-brand-950 shadow-lift ring-1 ring-gold-300/25"
        style={{ gridColumn: 2, gridRow: "1 / -1" }}
      >
        <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />
        <span className="absolute -right-16 -top-16 size-56 rounded-full bg-brand-500/25 blur-3xl" />
        <span className="absolute -bottom-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />
        <Lantern chain={30} delay={0.6} className="absolute right-8 top-0 hidden w-10 lg:block" />
      </m.div>

      {/* Column headers */}
      <m.div role="row" variants={rowV} className="relative grid grid-cols-subgrid" style={{ gridColumn: "1 / -1", gridRow: 1 }}>
        <div role="columnheader" className="flex items-end pb-5 pr-4">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-600">What matters</span>
        </div>
        <div role="columnheader" className="flex flex-col items-start px-5 pb-6 pt-3 lg:px-7 lg:pr-16">
          <CrescentStar className="size-7 text-gold-300" />
          <span className="mt-3 font-display text-[1.65rem] leading-[1.05] text-cream lg:text-[2rem]">
            Online Taleem ul Quran
          </span>
          <span className="mt-2 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-gold-300">Our academy</span>
        </div>
        {otherKeys.map((k) => {
          const o = others[k];
          const Icon = o.icon;
          return (
            <div key={k} role="columnheader" className="flex flex-col items-start justify-end px-4 pb-6 lg:px-6">
              <span className="grid size-10 place-items-center rounded-2xl border border-brand-900/10 bg-white text-brand-700 shadow-soft">
                <Icon className="size-[1.1rem]" aria-hidden />
              </span>
              <span className="mt-3 font-display text-[1.45rem] leading-[1.1] text-brand-950 lg:text-[1.7rem]">{o.name}</span>
              <span className="mt-1 text-xs leading-snug text-muted">{o.note}</span>
            </div>
          );
        })}
      </m.div>

      {/* One row per need */}
      {rows.map((r, i) => {
        const RowIcon = r.icon;
        return (
          <m.div
            key={r.label}
            role="row"
            variants={rowV}
            className="group/row relative grid grid-cols-subgrid"
            style={{ gridColumn: "1 / -1", gridRow: i + 2 }}
          >
            <div role="rowheader" className="flex items-start gap-3 border-t border-brand-900/10 py-5 pr-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 transition-colors duration-500 group-hover/row:bg-brand-800 group-hover/row:text-gold-200">
                <RowIcon className="size-[1.1rem]" aria-hidden />
              </span>
              <span className="pt-1.5 font-semibold leading-snug text-brand-950">{r.label}</span>
            </div>

            <div role="cell" className="px-5 lg:px-7">
              <div className="flex h-full items-start gap-3 border-t border-white/10 py-5">
                <GoldCheck className="mt-0.5 transition-transform duration-500 ease-[var(--ease-spring)] group-hover/row:scale-110" />
                <div>
                  <p className="font-semibold leading-snug text-cream">{r.us.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-100/70">{r.us.text}</p>
                </div>
              </div>
            </div>

            {otherKeys.map((k) => {
              const c = r[k];
              return (
                <div key={k} role="cell" className="flex items-start gap-3 border-t border-brand-900/10 px-4 py-5 lg:px-6">
                  <span className="sr-only">{statusMeta[c.status].label}: </span>
                  <StatusIcon status={c.status} />
                  <div className="-mt-px">
                    <p className="font-semibold leading-snug text-brand-950/85">{c.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
                  </div>
                </div>
              );
            })}
          </m.div>
        );
      })}
    </m.div>
  );
}

/* ------------------------------------------------------------------
   Phones (below md): no wide table. Pick which option to compare
   against, then each need is a row of two tiles — us vs them.
------------------------------------------------------------------- */

function ComparisonStack() {
  const [other, setOther] = useState<OtherKey>("madrasa");
  const active = otherKeys.indexOf(other);

  return (
    <div className="flex flex-col gap-7 md:hidden">
      <Reveal y={16} className="flex flex-col gap-3">
        <p id="compare-with" className="text-center text-[0.68rem] font-bold uppercase tracking-[0.24em] text-brand-600">
          Compare us with
        </p>
        <div
          role="group"
          aria-labelledby="compare-with"
          className="relative mx-auto flex w-full max-w-sm rounded-full border border-brand-900/10 bg-white/80 p-1.5 shadow-soft backdrop-blur"
        >
          <span
            aria-hidden
            className="absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/2)] rounded-full bg-brand-800 shadow-[0_8px_20px_-8px_rgb(35_76_74/0.8)] transition-transform duration-500 ease-[var(--ease-out-expo)]"
            style={{ transform: `translateX(${active * 100}%)` }}
          />
          {otherKeys.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={other === k}
              aria-controls="compare-stack"
              onClick={() => setOther(k)}
              className={cn(
                "relative z-10 flex-1 rounded-full px-2 py-2.5 text-sm font-semibold transition-colors duration-300",
                other === k ? "text-cream" : "text-brand-800 hover:text-brand-950",
              )}
            >
              {others[k].name}
            </button>
          ))}
        </div>
      </Reveal>

      <div id="compare-stack">
        <Stagger as="ul" className="flex flex-col gap-6" stagger={0.07} amount={0.05}>
        {rows.map((r) => {
          const RowIcon = r.icon;
          const c = r[other];
          return (
            <StaggerItem as="li" key={r.label} className="flex flex-col gap-2.5">
              <p className="flex items-center gap-2.5 font-semibold text-brand-950">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <RowIcon className="size-4" aria-hidden />
                </span>
                {r.label}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {/* Us */}
                <div className="grain relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 to-brand-950 p-3.5 text-cream shadow-soft">
                  <span aria-hidden className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent" />
                  <span className="flex items-center gap-2">
                    <GoldCheck className="size-5" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-300">With us</span>
                  </span>
                  <span className="mt-2.5 text-[0.93rem] font-semibold leading-snug">{r.us.title}</span>
                  <span className="mt-1 text-[0.8rem] leading-relaxed text-brand-100/75">{r.us.text}</span>
                </div>
                {/* Them — re-plays a soft entrance whenever the comparison is switched */}
                <div
                  key={other}
                  className="flex animate-[fade-up_0.6s_var(--ease-out-expo)_both] flex-col rounded-2xl border border-brand-900/8 bg-white/80 p-3.5 shadow-soft"
                >
                  <span className="flex items-center gap-2">
                    <StatusIcon status={c.status} animate={false} />
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted">
                      {others[other].short}
                    </span>
                  </span>
                  <span className="sr-only">{statusMeta[c.status].label}: </span>
                  <span className="mt-2.5 text-[0.93rem] font-semibold leading-snug text-brand-950/85">{c.title}</span>
                  <span className="mt-1 text-[0.8rem] leading-relaxed text-muted">{c.text}</span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
        </Stagger>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Section
------------------------------------------------------------------- */

/** "Why families choose us" — our academy compared, fairly, with a local madrasa and a private home tutor. */
export function Comparison({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative overflow-hidden bg-gradient-to-b from-cream via-sand/60 to-cream section-y", className)}
    >
      <div aria-hidden className="absolute -left-40 top-1/3 size-[30rem] rounded-full bg-brand-200/25 blur-3xl" />

      <div className="container-page relative flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="Compare your options"
          title="Why families choose *Online Taleem ul Quran*"
          description="Every family's needs are different. Here's an honest look at how learning with us compares to a local madrasa or a private home tutor."
        />

        <ComparisonTable />
        <ComparisonStack />

        <Reveal y={20} className="flex flex-col items-center gap-6 text-center md:mt-2">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-sm text-muted" aria-label="Key">
            <li className="flex items-center gap-2">
              <span aria-hidden className="grid size-5 place-items-center rounded-full bg-gold-300 text-brand-950">
                <Check className="size-3" strokeWidth={3} />
              </span>
              Online Taleem ul Quran
            </li>
            {(Object.keys(statusMeta) as Status[]).map((s) => {
              const Icon = statusMeta[s].icon;
              return (
                <li key={s} className="flex items-center gap-2">
                  <span aria-hidden className={cn("grid size-5 place-items-center rounded-full", statusMeta[s].className)}>
                    <Icon className="size-3" strokeWidth={2.75} />
                  </span>
                  {statusMeta[s].label}
                </li>
              );
            })}
          </ul>
          <p className="max-w-md text-xs leading-relaxed text-muted/80 text-pretty">
            A general guide only — every madrasa and tutor is different.
          </p>
          <ButtonLink href="/contact-us">Book a free demo</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

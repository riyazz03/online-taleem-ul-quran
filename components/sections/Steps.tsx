"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { steps } from "@/lib/content";
import { cn, parseEmphasis } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Section";
import { Star8 } from "@/components/ui/Brand";
import { StepIllustration, type StepIllustrationKind } from "@/components/art/StepIllustrations";

const ease = [0.16, 1, 0.3, 1] as const;

/** Per-step copy and artwork, in the same order as `steps` in lib/content. */
const details: ReadonlyArray<{ art: StepIllustrationKind; text: string }> = [
  {
    art: "door",
    text: "Pick a weekend date for your *free demo class* — ask your questions and see how a real lesson feels.",
  },
  {
    art: "assessment",
    text: "A friendly level check shows where your child should begin — *Qaida, Tajweed or Hifz*. Our courses follow the Mastery Phase of our Al-Burhan Qaida.",
  },
  {
    art: "form",
    text: "Share the learner's details and the *course you're interested in* — it only takes a few minutes.",
  },
  {
    art: "teacher",
    text: "We pair you with an expert tutor — *male teachers for male students* and *female teachers for female students*.",
  },
  {
    art: "class",
    text: "Your *first live class* begins — one-to-one or batch-wise, at timings that suit you.",
  },
];

/* ------------------------------------------------------------------
   Timeline geometry. The line is built from the measured centres of the
   step badges, so it always passes exactly through them at any width.
------------------------------------------------------------------- */
type Pt = { x: number; y: number };
type Geometry = {
  d: string;
  height: number;
  total: number;
  /** Sampled polyline: x, y and cumulative length at each sample. */
  xs: number[];
  ys: number[];
  ls: number[];
  /** Length along the line at which each badge is reached. */
  nodeLens: number[];
};

const f = (n: number) => n.toFixed(1);
const cubic = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

/** A line that meanders between the badges, bowing left and right in turn. */
function buildGeometry(nodes: Pt[], amp: number, height: number): Geometry {
  const xs = [nodes[0].x];
  const ys = [0];
  const ls = [0];
  const push = (x: number, y: number) => {
    const i = xs.length - 1;
    ls.push(ls[i] + Math.hypot(x - xs[i], y - ys[i]));
    xs.push(x);
    ys.push(y);
  };

  let d = `M${f(nodes[0].x)} 0`;
  if (nodes[0].y > 0) {
    d += ` L${f(nodes[0].x)} ${f(nodes[0].y)}`;
    push(nodes[0].x, nodes[0].y);
  }
  const nodeLens = [ls[ls.length - 1]];

  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const side = i % 2 === 0 ? 1 : -1;
    const mid = (a.y + b.y) / 2;
    const c1 = { x: a.x + side * amp, y: mid };
    const c2 = { x: b.x + side * amp, y: mid };
    d += ` C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(b.x)} ${f(b.y)}`;
    for (let k = 1; k <= 48; k++) {
      const t = k / 48;
      push(cubic(a.x, c1.x, c2.x, b.x, t), cubic(a.y, c1.y, c2.y, b.y, t));
    }
    nodeLens.push(ls[ls.length - 1]);
  }

  return { d, height, total: ls[ls.length - 1], xs, ys, ls, nodeLens };
}

/** Index of the last sample whose value is <= v (arr is non-decreasing). */
function search(arr: number[], v: number) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (arr[mid] <= v) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/** Length along the line at which it reaches a given height (y only grows). */
function lengthAtY(g: Geometry, y: number) {
  const last = g.ys.length - 1;
  if (y <= 0) return 0;
  if (y >= g.ys[last]) return g.total;
  const i = search(g.ys, y);
  const span = g.ys[i + 1] - g.ys[i] || 1;
  return g.ls[i] + ((y - g.ys[i]) / span) * (g.ls[i + 1] - g.ls[i]);
}

function pointAtLength(g: Geometry, l: number): Pt {
  const last = g.ls.length - 1;
  if (l <= 0) return { x: g.xs[0], y: g.ys[0] };
  if (l >= g.total) return { x: g.xs[last], y: g.ys[last] };
  const i = search(g.ls, l);
  const t = (l - g.ls[i]) / (g.ls[i + 1] - g.ls[i] || 1);
  return { x: g.xs[i] + (g.xs[i + 1] - g.xs[i]) * t, y: g.ys[i] + (g.ys[i + 1] - g.ys[i]) * t };
}

/** Centre of `el` in `root`'s coordinates (layout boxes, ignoring transforms). */
function centreIn(el: HTMLElement, root: HTMLElement): Pt {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  if (node === root) return { x, y };
  const a = el.getBoundingClientRect();
  const b = root.getBoundingClientRect();
  return { x: a.left + a.width / 2 - b.left, y: a.top + a.height / 2 - b.top };
}

function Rich({ text }: { text: string }) {
  return parseEmphasis(text).map((s, i) =>
    s.em ? (
      <strong key={i} className="font-semibold text-brand-800">
        {s.text}
      </strong>
    ) : (
      <Fragment key={i}>{s.text}</Fragment>
    ),
  );
}

/**
 * "How we work" — an alternating vertical timeline. A single meandering line
 * draws itself down the page as you scroll, lighting up each step's badge as
 * it passes; every step pairs its text with a line drawing. On phones the
 * line runs down the left edge with the content beside it.
 */
export function Steps({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [reached, setReached] = useState(-1);
  const gradientId = `steps-line-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Measure the badges and rebuild the line whenever the layout changes.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const pts: Pt[] = [];
      for (let i = 0; i < steps.length; i++) {
        const el = nodeRefs.current[i];
        if (!el) return;
        pts.push(centreIn(el, wrap));
      }
      const width = wrap.clientWidth;
      // Badges sit in the centre column on tablets/desktops, at the left edge on phones.
      const centred = pts[0].x > width * 0.25;
      const amp = centred ? (width >= 900 ? 70 : 50) : 13;
      const next = buildGeometry(pts, amp, wrap.clientHeight);
      setGeo((prev) => (prev && prev.d === next.d && prev.height === next.height ? prev : next));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // The drawn tip follows a reading line two-thirds of the way down the screen.
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.66", "end 0.66"] });
  const target = useTransform(scrollYProgress, (p) =>
    geo && geo.total > 0 ? lengthAtY(geo, p * geo.height) / geo.total : 0,
  );
  const drawn = useSpring(target, { stiffness: 160, damping: 30, restDelta: 0.0005 });
  const tipX = useTransform(drawn, (v) => (geo ? pointAtLength(geo, v * geo.total).x : 0));
  const tipY = useTransform(drawn, (v) => (geo ? pointAtLength(geo, v * geo.total).y : 0));
  const tipOpacity = useTransform(drawn, [0, 0.01, 0.985, 1], [0, 1, 1, 0]);

  useMotionValueEvent(drawn, "change", (v) => {
    if (!geo) return;
    const l = v * geo.total;
    let r = -1;
    geo.nodeLens.forEach((nl, i) => {
      if (l >= nl - 1) r = i;
    });
    setReached(r);
  });

  return (
    <section className={cn("relative section-y", className)}>
      <div className="container-page flex flex-col gap-14 sm:gap-20">
        <SectionHeading
          eyebrow="Getting started"
          title="How we *work*"
          description="From your first message to your first class — five simple steps."
        />

        <div ref={wrapRef} className="relative mx-auto w-full max-w-5xl">
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {geo && (
              <>
                <defs>
                  <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={geo.height}>
                    <stop offset="0" stopColor="#83c4b9" stopOpacity="0" />
                    <stop offset="0.06" stopColor="#63aea7" />
                    <stop offset="0.55" stopColor="#45938b" />
                    <stop offset="1" stopColor="#d2a554" />
                  </linearGradient>
                </defs>
                <path d={geo.d} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-brand-900/10" />
                <m.path
                  d={geo.d}
                  fill="none"
                  stroke={`url(#${gradientId})`}
                  strokeWidth={2.25}
                  style={{ pathLength: drawn }}
                />
                <m.g style={{ x: tipX, y: tipY, opacity: tipOpacity }}>
                  <circle r={10} className="fill-gold-300/30" />
                  <circle r={3.75} className="fill-gold-400" />
                </m.g>
              </>
            )}
          </svg>

          <ol className="relative flex flex-col gap-14 md:gap-4 lg:gap-2">
            {steps.map((s, i) => {
              const textLeft = i % 2 === 0;
              const active = reached >= i;
              const detail = details[i];
              return (
                <li
                  key={s.title}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-6 md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] md:items-center md:gap-x-0 md:gap-y-0 lg:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)]"
                >
                  {/* Badge on the line */}
                  <div className="col-start-1 row-span-2 row-start-1 flex justify-center md:col-start-2 md:row-span-1">
                    <span
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      aria-hidden
                      className={cn(
                        "relative z-10 grid size-11 place-items-center rounded-full border transition-[background-color,border-color,box-shadow,color] duration-700 md:size-14",
                        active
                          ? "border-brand-800 bg-brand-800 text-gold-200 shadow-[0_0_0_7px_rgb(99_174_167_/_0.14)]"
                          : "border-brand-900/12 bg-cream text-brand-700 shadow-soft",
                      )}
                    >
                      <Star8
                        className={cn(
                          "absolute size-9 transition-all duration-700 md:size-11",
                          active ? "rotate-45 text-brand-700" : "text-brand-50",
                        )}
                      />
                      <span className="relative font-display text-lg leading-none md:text-2xl">{i + 1}</span>
                    </span>
                  </div>

                  {/* Text */}
                  <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease }}
                    className={cn(
                      "col-start-2 row-start-1 flex max-w-[26rem] flex-col gap-2.5 pt-2.5 md:row-start-1 md:pt-0",
                      textLeft
                        ? "md:col-start-1 md:items-end md:justify-self-end md:pr-2 md:text-right"
                        : "md:col-start-3 md:justify-self-start md:pl-2",
                    )}
                  >
                    <span className="text-xs font-bold tabular-nums tracking-[0.3em] text-gold-500">
                      STEP 0{i + 1}
                    </span>
                    <h3 className="font-display text-[1.7rem] leading-[1.08] text-balance text-brand-950 sm:text-3xl lg:text-[2.15rem]">
                      {s.title}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-pretty text-muted sm:text-base">
                      <Rich text={detail.text} />
                    </p>
                  </m.div>

                  {/* Line drawing */}
                  <div
                    className={cn(
                      "col-start-2 row-start-2 w-full max-w-[11.5rem] md:row-start-1 md:max-w-[15rem] lg:max-w-[17.5rem]",
                      textLeft ? "md:col-start-3 md:justify-self-start" : "md:col-start-1 md:justify-self-end",
                    )}
                  >
                    <StepIllustration kind={detail.art} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

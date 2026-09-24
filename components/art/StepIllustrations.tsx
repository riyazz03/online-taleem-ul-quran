"use client";

/**
 * Line illustrations for the "How we work" timeline. One consistent hand:
 * teal ink lines of equal weight, gold accents, pale paper tints. Every line
 * draws itself (pathLength) the first time the drawing scrolls into view,
 * then its tints fade in behind it.
 */
import { m, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export type StepIllustrationKind = "door" | "assessment" | "form" | "teacher" | "class";

/* Brand palette (mirrors the tokens in app/globals.css). */
const INK = "#2b605b"; // brand-700
const SOFT = "#63aea7"; // brand-400
const PALE = "#aedbd3"; // brand-200
const GOLD = "#bf8d3c"; // gold-500
const GOLD_LIGHT = "#d2a554"; // gold-400
const GOLD_TINT = "#f5ead0"; // gold-100
const GOLD_PALE = "#ecd6a4"; // gold-200
const TEAL_TINT = "#eef7f5"; // brand-50
const TEAL_TINT_2 = "#d6ede8"; // brand-100
const PAPER = "#fffdf8";
const HALO = "#f0e9dc"; // sand

const STAR8 = "M12 0l3.5 3.5H20.5V8.5L24 12l-3.5 3.5v5h-5L12 24l-3.5-3.5h-5v-5L0 12l3.5-3.5v-5h5z";

const step = (i: number) => 0.15 + i * 0.14;

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, delay: step(i), ease: [0.65, 0, 0.35, 1] },
      opacity: { duration: 0.01, delay: step(i) },
    },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, delay: step(i), ease: "easeOut" },
  }),
};

/** A single stroke that draws itself. */
function Ln({ d, c = INK, w, i = 0 }: { d: string; c?: string; w?: number; i?: number }) {
  return <m.path d={d} fill="none" stroke={c} strokeWidth={w} variants={draw} custom={i} />;
}

/** A tinted shape: the outline draws first, the tint fades in behind it. */
function Shape({
  d,
  fill,
  c = INK,
  w,
  i = 0,
  rule,
}: {
  d: string;
  fill: string;
  c?: string;
  w?: number;
  i?: number;
  rule?: "evenodd";
}) {
  return (
    <>
      <m.path d={d} fill={fill} fillRule={rule} stroke="none" variants={fade} custom={i + 2.5} />
      <m.path d={d} fill="none" stroke={c} strokeWidth={w} variants={draw} custom={i} />
    </>
  );
}

/** A tint with no outline. */
function Tint({ d, fill, i = 0, o }: { d: string; fill: string; i?: number; o?: number }) {
  return <m.path d={d} fill={fill} fillOpacity={o} variants={fade} custom={i} />;
}

/** A small eight-pointed star (Rub el Hizb) ornament. */
function Star({ cx, cy, r, i = 0, fill = GOLD_LIGHT }: { cx: number; cy: number; r: number; i?: number; fill?: string }) {
  return (
    <m.path
      d={STAR8}
      fill={fill}
      transform={`translate(${cx - r} ${cy - r}) scale(${r / 12})`}
      variants={fade}
      custom={i}
    />
  );
}

/** Soft warm disc behind every drawing + a ground line, for a common frame. */
function Base({ ground = true }: { ground?: boolean }) {
  return (
    <>
      <m.circle cx={120} cy={98} r={72} fill={HALO} variants={fade} custom={0} />
      {ground && (
        <>
          <Ln d="M42 160 H198" c={PALE} i={0} />
          <Ln d="M26 160 H33 M207 160 H214" c={PALE} i={0.5} />
        </>
      )}
    </>
  );
}

/** 1 · An open arched door, lantern inside, crescent and star above. */
function Door() {
  const outer = "M82 160 V91 C82 70 99 57 120 45 C141 57 158 70 158 91 V160";
  const inner = "M94 160 V93 C94 77 106 67 120 58 C134 67 146 77 146 93 V160 Z";
  return (
    <>
      <Base />
      <Tint d="M95 160 L145 160 L170 174 L70 174 Z" fill={GOLD_TINT} i={4} />
      <Tint d={`${outer} Z ${inner}`} fill={TEAL_TINT_2} i={3} />
      <Shape d={inner} fill={GOLD_TINT} i={1} />
      <Ln d={outer} i={0.6} />
      {/* hanging lantern */}
      <m.circle cx={120} cy={90} r={17} fill="#fff6dc" variants={fade} custom={4} />
      <Ln d="M120 58 V73" c={GOLD} w={1.25} i={2} />
      <Shape d="M113.5 79 Q120 70.5 126.5 79 Z" fill={GOLD_LIGHT} c={GOLD} i={2.4} />
      <Shape d="M114 79 C109.5 87 111.5 95 120 100.5 C128.5 95 130.5 87 126 79 Z" fill="#fbf0d4" c={GOLD} i={2.8} />
      <Ln d="M120 100.5 V105" c={GOLD} i={3.2} />
      {/* door leaf, swung open */}
      <Shape d="M146 160 V94 C151 86 159 80 171 76 V168 Z" fill={PAPER} i={1.6} />
      <Ln d="M152 156 V99 C156 93 160 90 165 87 V161 Z" c={SOFT} w={1.25} i={3} />
      <m.circle cx={167.5} cy={124} r={1.9} fill={GOLD} variants={fade} custom={4.5} />
      {/* crescent and star */}
      <Shape d="M122.8 7 A12 12 0 1 0 132.2 25.4 A9.7 9.7 0 1 1 122.8 7 Z" fill={GOLD_PALE} c={GOLD} i={3.4} />
      <Star cx={127.6} cy={14.6} r={3.6} i={4.6} />
    </>
  );
}

/** 2 · A clipboard with a level checklist, one level ticked; books beside it. */
function Assessment() {
  return (
    <>
      <Base />
      <g transform="translate(-8 0)">
        <Shape d="M76 40 H144 A8 8 0 0 1 152 48 V152 A8 8 0 0 1 144 160 H76 A8 8 0 0 1 68 152 V48 A8 8 0 0 1 76 40 Z" fill={TEAL_TINT_2} i={0.6} />
        <Shape d="M78 52 H142 V150 H78 Z" fill={PAPER} c={SOFT} w={1.25} i={1.2} />
        <Shape d="M96 34 A4 4 0 0 1 100 30 H120 A4 4 0 0 1 124 34 V46 H96 Z" fill={GOLD_PALE} c={GOLD} i={1.4} />
        <Ln d="M106 30 A4 4 0 0 1 114 30" c={GOLD} i={1.8} />
        {[0, 1, 2].map((r) => {
          const y = 72 + r * 24;
          return (
            <g key={r}>
              <Ln d={`M86 ${y - 6} h12 v12 h-12 Z`} w={1.5} i={2 + r * 0.5} />
              <Ln d={`M106 ${y - 2} H134`} c={SOFT} i={2.2 + r * 0.5} />
              <Ln d={`M106 ${y + 4} H124`} c={PALE} i={2.4 + r * 0.5} />
            </g>
          );
        })}
        <Ln d="M88.5 96 L92 100 L100.5 89" c={GOLD} w={2.4} i={4.4} />
      </g>
      {/* two study books */}
      <Shape d="M156 160 V149 H200 V160 Z" fill={GOLD_TINT} i={2.6} />
      <Ln d="M162 149 V160 M194 149 V160" c={GOLD} w={1.25} i={3.4} />
      <Shape d="M160 149 V139 H196 V149 Z" fill={TEAL_TINT} i={3} />
      <Ln d="M166 139 V149" c={GOLD} w={1.25} i={3.8} />
    </>
  );
}

/** 3 · An application form with a pen finishing the signature. */
function Form() {
  return (
    <>
      <Base />
      <Shape d="M72 50 L130 42 L144 150 L86 158 Z" fill={TEAL_TINT} c={SOFT} w={1.25} i={0.4} />
      <Shape d="M88 36 H144 L160 52 V162 H88 Z" fill={PAPER} i={0.8} />
      <Shape d="M144 36 V52 H160 Z" fill={TEAL_TINT_2} i={1.4} />
      <Star cx={101} cy={50} r={5} i={3} />
      <Ln d="M111 50 H134" w={2.5} i={1.6} />
      <Ln d="M98 70 H150" c={SOFT} i={2} />
      <Ln d="M98 84 H150" c={SOFT} i={2.3} />
      <Ln d="M98 98 H140" c={SOFT} i={2.6} />
      <Ln d="M98 110 h9 v9 h-9 Z" w={1.5} i={2.8} />
      <Ln d="M114 115 H146" c={SOFT} i={3} />
      <Ln d="M99.5 114 L102.5 117.5 L109 108.5" c={GOLD} w={2.2} i={4.2} />
      <Ln d="M96 150 H148" c={PALE} i={3.2} />
      <Ln
        d="M98 144 C102 134 108 133 108 141 C108 147 114 147 118 139 C121 133 126 135 126 141 C126 145 130 145 134 141"
        w={1.5}
        i={4.6}
      />
      {/* pen, resting at the end of the signature */}
      <g transform="rotate(-45 136 141)">
        <Shape d="M156 137 H194 A4 4 0 0 1 194 145 H156 Z" fill={TEAL_TINT_2} i={3.4} />
        <Shape d="M147 137 H156 V145 H147 Z" fill={GOLD_TINT} i={3.7} />
        <Shape d="M136 141 L147 137 V145 Z" fill={GOLD_LIGHT} c={GOLD} i={4} />
        <Ln d="M170 137 V145 M174 137 V145" c={GOLD} w={1.5} i={4.4} />
      </g>
    </>
  );
}

/** 4 · Teacher and student as two arched niches on cushions, a Quran on a rehal between them. */
function Teacher() {
  return (
    <>
      <Base />
      <Star cx={121} cy={66} r={4.5} i={5} />
      {/* teacher: the taller arch */}
      <Shape d="M46 142 V86 C46 71 55 61 68 53 C81 61 90 71 90 86 V142 Z" fill={TEAL_TINT} i={0.6} />
      <Ln d="M54 142 V88 C54 78 60 71 68 66 C76 71 82 78 82 88 V142" c={SOFT} w={1.25} i={2} />
      {/* student: the smaller arch */}
      <Shape d="M156 144 V100 C156 88 164 81 174 75 C184 81 192 88 192 100 V144 Z" fill={TEAL_TINT} i={1} />
      <Ln d="M163 144 V102 C163 94 168 88 174 84 C180 88 185 94 185 102 V144" c={SOFT} w={1.25} i={2.3} />
      {/* cushions */}
      <Shape d="M38 160 C38 148 49 142 68 142 C87 142 98 148 98 160 Z" fill={GOLD_TINT} c={GOLD} i={1.6} />
      <Shape d="M150 160 C150 150 159 144 174 144 C189 144 198 150 198 160 Z" fill={GOLD_TINT} c={GOLD} i={1.9} />
      <Ln d="M39 155 l-4 4 M97 155 l4 4 M151 155 l-4 4 M197 155 l4 4" c={GOLD} w={1.25} i={3.4} />
      {/* Quran on a rehal */}
      <Ln d="M108 160 L134 134 M134 160 L108 134" w={2.25} i={2.6} />
      <Shape d="M121 134 C114 128 105 126 97 128 L99 136 C106 134 114 135 121 140 Z" fill={PAPER} c={GOLD} i={3} />
      <Shape d="M121 134 C128 128 137 126 145 128 L143 136 C136 134 128 135 121 140 Z" fill={PAPER} c={GOLD} i={3} />
      <Ln d="M121 119 V111 M110 121 L105.5 115 M132 121 L136.5 115" c={GOLD_LIGHT} w={1.5} i={4.2} />
    </>
  );
}

/** 5 · An open book with the sun rising gently behind it. */
function FirstClass() {
  const rays = [155, 125, 90, 55, 25].map((a) => {
    const r = (a * Math.PI) / 180;
    const p = (len: number) => `${(120 + len * Math.cos(r)).toFixed(1)} ${(130 - len * Math.sin(r)).toFixed(1)}`;
    return `M${p(43)} L${p(54)}`;
  });
  return (
    <>
      <Base ground={false} />
      <Ln d="M30 130 H210" c={PALE} i={0} />
      <Shape d="M86 130 A34 34 0 0 1 154 130 Z" fill={GOLD_TINT} c={GOLD} i={0.6} />
      <Ln d={rays.join(" ")} c={GOLD_LIGHT} w={1.5} i={1.4} />
      {/* book */}
      <Shape
        d="M54 128 V158 C80 154 104 156 120 164 C136 156 160 154 186 158 V128 C160 124 136 126 120 134 C104 126 80 124 54 128 Z"
        fill={TEAL_TINT_2}
        i={1.6}
      />
      <Shape d="M120 134 C104 125 82 123 60 127 V154 C82 150 104 152 120 160 Z" fill={PAPER} i={2} />
      <Shape d="M120 134 C136 125 158 123 180 127 V154 C158 150 136 152 120 160 Z" fill={PAPER} i={2} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <Ln d={`M68 ${134 + k * 7} C84 ${131 + k * 7} 100 ${132 + k * 7} 112 ${137 + k * 7}`} c={SOFT} w={1.25} i={2.8 + k * 0.35} />
          <Ln d={`M172 ${134 + k * 7} C156 ${131 + k * 7} 140 ${132 + k * 7} 128 ${137 + k * 7}`} c={SOFT} w={1.25} i={2.8 + k * 0.35} />
        </g>
      ))}
      <Shape d="M127 157 V172 L130.5 168.5 L134 172 V155" fill={GOLD_LIGHT} c={GOLD} i={3.8} />
    </>
  );
}

const ART: Record<StepIllustrationKind, () => React.JSX.Element> = {
  door: Door,
  assessment: Assessment,
  form: Form,
  teacher: Teacher,
  class: FirstClass,
};

/** A 4:3 line drawing for one step of "How we work". */
export function StepIllustration({ kind, className }: { kind: StepIllustrationKind; className?: string }) {
  const Art = ART[kind];
  return (
    <m.svg
      viewBox="0 0 240 180"
      aria-hidden
      className={cn("h-auto w-full overflow-visible", className)}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
    >
      <Art />
    </m.svg>
  );
}

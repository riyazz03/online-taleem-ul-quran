/**
 * An illustrated, gently animated live online class: a video-call window
 * with a Qaida board of the six throat letters, the Ustadh and student
 * tiles, the class chat and a voice waveform. Pure HTML/CSS (no images,
 * no JavaScript); the timing lives in ./virtual-classroom.css.
 */
import { Hand, Mic, Users, Video } from "lucide-react";
import { CrescentStar } from "@/components/art/Motifs";
import { cn } from "@/lib/utils";
import "./virtual-classroom.css";

/** حروف الحلق — the throat letters, from the deepest point outwards. */
const THROAT_LETTERS = ["ء", "ه", "ع", "ح", "غ", "خ"];
/** Where each pair is pronounced (deepest, middle, upper part of the throat). */
const THROAT_PARTS = ["Deepest", "Middle", "Upper"];

const WAVE = [6, 12, 18, 10, 22, 16, 8, 20, 26, 14, 9, 18, 24, 12, 7, 16, 22, 10, 19, 13, 8, 17, 23, 11, 15, 9];

function Arabic({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span lang="ar" dir="rtl" className={cn("font-arabic", className)}>
      {children}
    </span>
  );
}

/** A small hanging-lantern (fanoos) glyph with a lit window. */
function LanternGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden className={className}>
      <circle cx={12} cy={2.6} r={1.7} fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M6.8 9.4Q12 3.4 17.2 9.4Z" fill="currentColor" />
      <rect x={6.2} y={9.2} width={11.6} height={2} rx={0.8} fill="currentColor" />
      <path d="M7.4 11.2C4.9 15.4 5.4 21.2 12 26.2C18.6 21.2 19.1 15.4 16.6 11.2Z" fill="currentColor" />
      <path d="M9.9 21.6V16.3Q12 12.9 14.1 16.3V21.6Z" fill="#f5ead0" />
      <path d="M10.8 25.4H13.2L12 30.2Z" fill="currentColor" />
    </svg>
  );
}

/** Thin mihrab-arch outline used as the "room" behind each participant. */
function ArchBackdrop() {
  return (
    <svg
      viewBox="0 0 100 80"
      aria-hidden
      className="absolute bottom-0 left-1/2 h-[88%] w-auto -translate-x-1/2 text-gold-300/25"
    >
      <path d="M12 80V40C12 22 30 12 50 3C70 12 88 22 88 40V80" fill="none" stroke="currentColor" strokeWidth={1.2} />
      <path d="M20 80V42C20 27 34 18 50 10C66 18 80 27 80 42V80" fill="none" stroke="currentColor" strokeWidth={0.8} />
    </svg>
  );
}

function ParticipantTile({ role }: { role: "teacher" | "student" }) {
  const teacher = role === "teacher";
  const speaking = teacher ? "vc-teacher" : "vc-student";
  return (
    <div
      className={cn(
        "relative isolate h-[5.5rem] overflow-hidden rounded-2xl sm:h-auto sm:min-h-[5.5rem]",
        teacher
          ? "bg-[radial-gradient(120%_100%_at_50%_0%,#2b605b,#0f2524)]"
          : "bg-[radial-gradient(120%_100%_at_50%_0%,#45938b,#1b3a39)]",
      )}
    >
      <ArchBackdrop />

      <div className="absolute inset-0 grid place-items-center pb-3">
        <div className="relative">
          <span aria-hidden className={cn("absolute inset-0", speaking)}>
            <span className="vc-pulse absolute inset-0 rounded-full bg-gold-300/60" />
            <span className="absolute -inset-1 rounded-full ring-2 ring-gold-300" />
          </span>
          <span
            className={cn(
              "relative grid size-11 place-items-center rounded-full shadow-[0_6px_18px_-6px_rgb(0_0_0/0.5)] sm:size-12",
              teacher ? "bg-gradient-to-br from-gold-100 to-gold-300 text-brand-900" : "bg-cream text-brand-700",
            )}
          >
            {teacher ? <LanternGlyph className="h-6 w-auto" /> : <CrescentStar className="size-6" />}
          </span>
        </div>
      </div>

      <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-brand-950/50 px-2 py-0.5 text-[0.65rem] font-semibold text-cream backdrop-blur-sm">
        <Mic className="size-2.5" strokeWidth={2.5} />
        {teacher ? "Ustadh" : "Student"}
      </span>

      <span aria-hidden className={cn("absolute bottom-2.5 right-2.5 flex h-3 items-center gap-[2px]", speaking)}>
        {[0, 0.25, 0.12].map((d) => (
          <span
            key={d}
            className="vc-bar h-full w-[3px] rounded-full bg-gold-300"
            style={{ animationDelay: `${d}s`, animationDuration: "0.6s" }}
          />
        ))}
      </span>

      {/* Active-speaker frame */}
      <span aria-hidden className={cn("absolute inset-0 rounded-2xl ring-2 ring-inset ring-gold-300", speaking)} />
    </div>
  );
}

type Message = { from: "teacher" | "student"; text: React.ReactNode };

const MESSAGES: Message[] = [
  {
    from: "teacher",
    text: (
      <>
        Listen carefully: <Arabic className="text-[1.3em] leading-none">ع</Arabic>
      </>
    ),
  },
  { from: "student", text: <Arabic className="text-[1.3em] leading-none">ع</Arabic> },
  {
    from: "teacher",
    text: (
      <>
        Excellent — <Arabic className="text-[1.15em] leading-none">ما شاء الله</Arabic>!
      </>
    ),
  },
];

const POPS = ["vc-pop-1", "vc-pop-2", "vc-pop-3"];

function ChatBubble({ message, className }: { message: Message; className?: string }) {
  const teacher = message.from === "teacher";
  return (
    <div className={cn("flex h-9 items-center gap-2 sm:h-10", teacher ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "flex items-center gap-2",
          teacher ? "origin-bottom-left" : "origin-bottom-right flex-row-reverse",
          className,
        )}
      >
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-full",
            teacher ? "bg-gradient-to-br from-gold-100 to-gold-300 text-brand-900" : "bg-brand-100 text-brand-700",
          )}
        >
          {teacher ? <LanternGlyph className="h-3.5 w-auto" /> : <CrescentStar className="size-3.5" />}
        </span>
        <p
          className={cn(
            "whitespace-nowrap rounded-2xl px-3 py-1.5 text-[0.75rem] font-semibold leading-5 sm:text-[0.8rem]",
            teacher
              ? "rounded-bl-md bg-white text-brand-900 shadow-[0_2px_8px_-4px_rgb(15_34_33/0.25)] ring-1 ring-brand-900/8"
              : "min-w-[2.75rem] rounded-br-md bg-brand-700 text-center text-cream",
          )}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
}

export function VirtualClassroom({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustration of a live online Tajweed class: the Ustadh highlights the six throat letters on a Qaida board, the student repeats the letter ع, and the Ustadh replies “Excellent — ma sha Allah!”"
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] border border-brand-900/8 bg-white text-left shadow-lift",
        className,
      )}
    >
      {/* Window bar */}
      <div className="flex items-center gap-3 border-b border-brand-900/8 bg-cream/60 px-4 py-3 sm:px-5">
        <span aria-hidden className="hidden gap-1.5 min-[400px]:flex">
          <span className="size-2.5 rounded-full bg-gold-300" />
          <span className="size-2.5 rounded-full bg-brand-300" />
          <span className="size-2.5 rounded-full bg-brand-900/15" />
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-red-600">
          <span className="vc-live size-1.5 rounded-full bg-red-500" />
          Live
        </span>
        <span className="min-w-0 truncate text-xs font-semibold text-brand-900">Tajweed · Throat letters</span>
        <span className="ml-auto hidden items-center gap-1.5 text-[0.7rem] font-semibold text-muted sm:inline-flex">
          <Users className="size-3.5" />2 in class
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
          {/* Qaida board */}
          <div className="relative rounded-2xl bg-gold-50 p-4 ring-1 ring-gold-200 sm:p-5">
            <span aria-hidden className="pointer-events-none absolute inset-1.5 rounded-xl border border-gold-300/50" />
            <div className="relative flex items-end justify-between gap-3">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-600">Throat letters</span>
              <Arabic className="text-[1.45rem] leading-none text-brand-900 sm:text-[1.7rem]">حروف الحلق</Arabic>
            </div>

            <div
              lang="ar"
              dir="rtl"
              className="relative mt-4 grid grid-cols-6 overflow-hidden rounded-xl bg-white ring-1 ring-gold-200"
            >
              <span aria-hidden className="vc-hl pointer-events-none absolute inset-y-0 right-0 w-1/6 p-1">
                <span className="block size-full rounded-lg bg-gradient-to-b from-gold-100 to-gold-300 shadow-[0_6px_16px_-6px_rgb(191_141_60/0.7)] ring-1 ring-gold-400/50" />
              </span>
              {THROAT_LETTERS.map((letter) => (
                <span
                  key={letter}
                  className="relative grid h-14 place-items-center border-gold-200/80 pb-1 font-arabic text-[1.85rem] leading-none text-brand-950 sm:h-16 sm:text-[2.2rem] [&:not(:last-child)]:border-l"
                >
                  {letter}
                </span>
              ))}
            </div>

            <div dir="rtl" className="relative mt-2 grid grid-cols-3 gap-2">
              {THROAT_PARTS.map((part) => (
                <span key={part} dir="ltr" className="flex flex-col items-center gap-1">
                  <span aria-hidden className="h-1.5 w-[78%] rounded-b-md border-x border-b border-gold-300" />
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-brand-600/80">{part}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Participants */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:grid-rows-2">
            <ParticipantTile role="teacher" />
            <ParticipantTile role="student" />
          </div>
        </div>

        {/* Class chat: two slots on phones, three from sm up */}
        <div className="rounded-2xl bg-cream px-3 py-1.5 ring-1 ring-brand-900/5">
          <div className="relative h-[4.5rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_1.1rem)] sm:h-[7.5rem]">
            <div className="vc-chat absolute inset-x-0 bottom-0">
              {[...MESSAGES, ...MESSAGES].map((message, i) => (
                <ChatBubble key={i} message={message} className={i >= MESSAGES.length ? POPS[i - MESSAGES.length] : undefined} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call controls + voice waveform */}
      <div className="flex items-center gap-3 border-t border-brand-900/8 px-4 py-3 sm:px-5">
        {[Mic, Video].map((Icon, i) => (
          <span key={i} aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
            <Icon className="size-3.5" />
          </span>
        ))}
        <span className="grid shrink-0 whitespace-nowrap text-[0.7rem] font-semibold text-brand-800">
          <span className="vc-teacher [grid-area:1/1]">Ustadh speaking</span>
          <span className="vc-student [grid-area:1/1]">Student reciting</span>
        </span>
        <span
          aria-hidden
          className="vc-quiet flex h-7 min-w-0 flex-1 items-center justify-center gap-[3px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]"
        >
          {WAVE.map((h, i) => (
            <span
              key={i}
              className="vc-bar w-[3px] shrink-0 rounded-full bg-gradient-to-t from-brand-400 to-gold-400"
              style={{ height: h, animationDelay: `${(i % 7) * 0.09}s`, animationDuration: `${0.9 + (i % 4) * 0.15}s` }}
            />
          ))}
        </span>
        <span aria-hidden className="hidden size-8 shrink-0 place-items-center rounded-full bg-gold-50 text-gold-600 sm:grid">
          <Hand className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

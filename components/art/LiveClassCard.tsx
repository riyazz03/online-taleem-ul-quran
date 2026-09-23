import { Check, Mic, Video } from "lucide-react";
import { cn } from "@/lib/utils";

const bars = [10, 18, 26, 14, 30, 22, 12, 28, 20, 16, 24, 11, 19, 27, 15];

/**
 * Illustrated "live lesson" window: teacher and student joined by an
 * animated voice waveform, with the lesson checklist beneath.
 */
export function LiveClassCard({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("rounded-[1.75rem] border border-white/70 bg-white/90 p-4 shadow-lift backdrop-blur-md", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-red-600">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-500" />
            <span className="relative size-1.5 rounded-full bg-red-500" />
          </span>
          Live
        </span>
        <span className="text-[0.7rem] font-semibold text-muted">Tajweed · One-to-one</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-800 font-display text-lg text-cream">T</span>
        <div className="flex h-10 flex-1 items-center justify-center gap-[3px]" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[3px] origin-center rounded-full bg-gradient-to-t from-brand-400 to-gold-400"
              style={{
                height: h,
                animation: `wave-bar 1.1s ease-in-out ${i * 0.07}s infinite alternate`,
              }}
            />
          ))}
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-300 font-display text-lg text-brand-950">S</span>
      </div>

      {!compact && (
        <ul className="mt-4 flex flex-col gap-2 border-t border-brand-900/8 pt-3 text-[0.75rem] font-semibold text-brand-900">
          {[
            ["Makharij (articulation)", true],
            ["Sifaat (characteristics)", true],
            ["Qalqalah practice", false],
          ].map(([label, done]) => (
            <li key={label as string} className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-full",
                  done ? "bg-brand-500 text-white" : "border border-dashed border-brand-300",
                )}
              >
                {done && <Check className="size-2.5" strokeWidth={4} />}
              </span>
              {label}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex items-center justify-center gap-2">
        {[Mic, Video].map((Icon, i) => (
          <span key={i} className="grid size-7 place-items-center rounded-full bg-brand-50 text-brand-700">
            <Icon className="size-3.5" />
          </span>
        ))}
      </div>
    </div>
  );
}

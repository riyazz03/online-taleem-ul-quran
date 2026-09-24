import { Check } from "lucide-react";
import { benefits } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Section";
import { icons } from "@/components/ui/Icons";
import { SpotlightCard } from "@/components/motion/Interactive";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

function OneToOneVisual() {
  return (
    <div aria-hidden className="relative flex h-28 items-center justify-center gap-4">
      <span className="grid size-16 place-items-center rounded-full bg-brand-800 font-display text-2xl text-cream shadow-soft transition-transform duration-500 group-hover:-translate-x-2">
        T
      </span>
      <span className="relative h-px w-24 overflow-hidden bg-brand-200">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-slide-x bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
      </span>
      <span className="grid size-16 place-items-center rounded-full bg-gold-300 font-display text-2xl text-brand-950 shadow-soft transition-transform duration-500 group-hover:translate-x-2">
        S
      </span>
      <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-white px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-brand-700 shadow-soft">
        1 : 1
      </span>
    </div>
  );
}

function WalletVisual() {
  return (
    <div aria-hidden className="flex h-28 items-end justify-center gap-2">
      {[40, 64, 52, 80].map((h, i) => (
        <span
          key={i}
          className="w-7 origin-bottom rounded-t-lg bg-brand-200 transition-all duration-700 group-hover:bg-brand-400"
          style={{ height: h, transitionDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  );
}

function TimingVisual() {
  return (
    <div aria-hidden className="flex h-28 flex-wrap content-center items-center justify-center gap-2">
      {["Weekdays", "Weekends", "Reschedule"].map((t, i) => (
        <span
          key={t}
          className="rounded-full border border-brand-900/10 bg-white px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-soft transition-transform duration-500 group-hover:-translate-y-1"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ExamVisual() {
  return (
    <div aria-hidden className="flex h-28 items-center justify-center gap-2 sm:gap-3">
      {["M1", "M2", "M3", "M4", "M5", "M6"].map((m, i) => (
        <span key={m} className="flex flex-col items-center gap-2">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full border-2 transition-all duration-500",
              i < 4
                ? "border-brand-500 bg-brand-500 text-white group-hover:scale-110"
                : "border-dashed border-brand-300 text-brand-300",
            )}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {i < 4 && <Check className="size-4" strokeWidth={3} />}
          </span>
          <span className="text-[0.65rem] font-bold text-muted">{m}</span>
        </span>
      ))}
    </div>
  );
}

const visuals = [OneToOneVisual, WalletVisual, TimingVisual, ExamVisual];
const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"];

/** Bento grid of the four programme benefits. */
export function Benefits({ className }: { className?: string }) {
  return (
    <section className={cn("relative section-y", className)}>
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          eyebrow="Why families choose us"
          title="Key benefits of *our program*"
          description="Every class is built around one student, one teacher and steady, measurable progress."
        />
        <Stagger className="grid gap-4 md:grid-cols-6" stagger={0.12}>
          {benefits.map((b, i) => {
            const Icon = icons[b.icon];
            const Visual = visuals[i];
            return (
              <StaggerItem key={b.title} className={spans[i]}>
                <SpotlightCard className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[2rem] border border-brand-900/8 bg-white/70 p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-8">
                  <div className="rounded-3xl bg-gradient-to-br from-brand-50 to-cream p-3">
                    <Visual />
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-900 text-gold-200 transition-transform duration-500 group-hover:rotate-[-8deg]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.9rem] leading-tight text-brand-950">{b.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{b.description}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

import { Award, BookOpenCheck, Sprout, Users, type LucideIcon } from "lucide-react";
import type { Essential, EssentialIcon } from "@/lib/course-details";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8Outline } from "@/components/ui/Brand";
import { SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/Interactive";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Emphasis } from "./Emphasis";

const iconFor: Record<EssentialIcon, LucideIcon> = {
  age: Sprout,
  qaida: BookOpenCheck,
  certificate: Award,
  sessions: Users,
};

/** "Ages 4+" -> "Ages " + a counter that ticks up to 4. */
function Headline({ text }: { text: string }) {
  const match = text.match(/^(.*?)(\d+)(\+?)$/);
  if (!match) return <>{text}</>;
  const [, before, digits, suffix] = match;
  return (
    <>
      {before}
      <CountUp value={Number(digits)} suffix={suffix} duration={1.4} />
    </>
  );
}

/** "Say goodbye to stumbles" — the four essentials of every course. */
export function CourseEssentials({ items, className }: { items: Essential[]; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden section-y", className)}>
      <GeometricPattern
        id="essentials-geo"
        className="text-brand-800 opacity-[0.04] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />
      <div className="container-page relative flex flex-col gap-16">
        <SectionHeading
          eyebrow="Before you begin"
          title="Say goodbye to stumbles — embrace the *smooth flow of Tilawat*"
          titleClassName="lg:text-[3.6rem]"
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {items.map((item, i) => {
            const Icon = iconFor[item.icon];
            return (
              <StaggerItem key={item.label} className={cn("h-full", i % 2 === 1 && "lg:translate-y-10")}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] border border-brand-900/8 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 size-36 rounded-full bg-brand-50 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[2.4]"
                  />
                  <Star8Outline className="absolute -bottom-10 -right-10 size-32 text-gold-400/0 transition-colors duration-700 group-hover:text-gold-400/30" />

                  <div className="relative flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-900 text-gold-200 shadow-soft transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-8 group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-bold tabular-nums tracking-[0.3em] text-gold-500">0{i + 1}</span>
                  </div>

                  <p className="relative mt-8 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-brand-600">
                    {item.label}
                  </p>
                  <h3 className="relative mt-2 font-display text-[1.7rem] sm:text-[2.1rem] leading-[1.05] text-brand-950">
                    <Headline text={item.headline} />
                  </h3>
                  <p className="relative mt-4 leading-relaxed text-muted">
                    <Emphasis text={item.text} />
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

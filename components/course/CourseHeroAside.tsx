import { Sparkles, Users } from "lucide-react";
import type { CourseSummary } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArchImage, Star8, Star8Outline } from "@/components/ui/Brand";

function Chip({
  icon: Icon,
  children,
  className,
  delay,
}: {
  icon: typeof Users;
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <div className={cn("absolute z-10", className)}>
      <div className="scale-in" style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        <div
          className="flex animate-float items-center gap-2.5 rounded-2xl border border-white/60 bg-white/85 py-2.5 pl-2.5 pr-4 shadow-lift backdrop-blur-md"
          style={{ animationDelay: `${delay * 2}ms` }}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
            <Icon className="size-4" />
          </span>
          <p className="whitespace-nowrap text-[0.8rem] font-semibold text-brand-900">{children}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Right-hand column of the course hero: the course illustration framed by a
 * mihrab arch, the course's Arabic word on a rotating seal, and two
 * floating tags. CSS-only entrances, so it is safe above the fold.
 */
export function CourseHeroAside({ course }: { course: CourseSummary }) {
  const [first, second] = course.tags;
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[21rem] sm:max-w-[27rem] lg:max-w-[30rem]">
      <Star8Outline className="absolute -right-16 -top-12 size-56 animate-spin-slow text-gold-400/35" />
      <div aria-hidden className="absolute inset-x-[10%] bottom-[2%] top-[8%] rounded-full bg-brand-300/30 blur-3xl" />

      <div className="absolute inset-x-[7%] bottom-[5%] top-0">
        <ArchImage
          src={course.image}
          alt={course.imageAlt}
          priority
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 80vw"
          className="h-full w-full"
        />
      </div>

      {/* Arabic word on a seal */}
      <div className="scale-in absolute -left-2 bottom-[2%] z-20 sm:-left-6" style={{ "--d": "600ms" } as React.CSSProperties}>
        <div className="relative grid size-28 place-items-center rounded-full bg-brand-900 shadow-lift ring-8 ring-cream sm:size-36">
          <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-2 animate-spin-slow text-gold-300/50">
            <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
          </svg>
          <span lang="ar" dir="rtl" className="relative font-arabic text-5xl leading-none text-gold-200 sm:text-6xl">
            {course.arabic}
          </span>
        </div>
      </div>

      {first && (
        <Chip icon={Sparkles} className="-right-2 top-[16%] sm:-right-8" delay={800}>
          {first}
        </Chip>
      )}
      {second && (
        <Chip icon={Users} className="-right-1 bottom-[20%] sm:-right-4" delay={950}>
          {second}
        </Chip>
      )}

      <Star8 className="absolute left-[4%] top-[10%] size-5 animate-float text-gold-400" />
      <Star8 className="absolute bottom-[40%] left-[-2%] size-3 animate-float-slow text-brand-400" />
    </div>
  );
}

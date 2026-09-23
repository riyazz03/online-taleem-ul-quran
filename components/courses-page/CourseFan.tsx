import Image from "next/image";
import Link from "next/link";
import { Baby, Users } from "lucide-react";
import { courses } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArchOutline, Star8, Star8Outline } from "@/components/ui/Brand";
import { TiltCard } from "@/components/motion/Interactive";

/*
 * Position, resting angle and hover spread of each arch in the fan
 * (left → right: Tajweed, Recitation, Memorization). The fan opens a
 * little wider when the pointer is over it.
 */
const layout = [
  {
    wrap: "left-0 top-[15%] w-[38%]",
    card: "-rotate-[9deg] group-hover/fan:-translate-x-4 group-hover/fan:-rotate-[13deg]",
    delay: 380,
    caption: "left-0 right-[24%]",
    label: "hidden sm:block",
  },
  {
    wrap: "inset-x-[28%] top-0 z-10",
    card: "group-hover/fan:-translate-y-3",
    delay: 220,
    caption: "inset-x-0",
    label: "",
  },
  {
    wrap: "right-0 top-[15%] w-[38%]",
    card: "rotate-[9deg] group-hover/fan:translate-x-4 group-hover/fan:rotate-[13deg]",
    delay: 520,
    caption: "left-[24%] right-0",
    label: "hidden sm:block",
  },
];

function Seal() {
  return (
    <div className="relative grid size-20 place-items-center rounded-full bg-cream/95 shadow-lift backdrop-blur sm:size-28">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="courses-seal-path" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="fill-brand-800 text-[17px] font-bold uppercase" letterSpacing="4">
          <textPath href="#courses-seal-path" textLength="448" lengthAdjust="spacing">
            Learn ✦ Understand ✦ Implement ✦
          </textPath>
        </text>
      </svg>
      <Star8 className="relative size-7 text-gold-400 sm:size-9" />
    </div>
  );
}

function Note({
  icon: Icon,
  children,
  className,
  delay,
}: {
  icon: typeof Baby;
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <div className={cn("z-20", className)}>
      <div className="scale-in" style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        <div
          className="flex animate-float items-center gap-2.5 rounded-2xl border border-white/60 bg-white/85 p-2.5 pr-4 shadow-lift backdrop-blur-md"
          style={{ animationDelay: `${delay * 2}ms` }}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
            <Icon className="size-4" />
          </span>
          <p className="whitespace-nowrap text-[0.78rem] font-semibold leading-snug text-brand-900">{children}</p>
        </div>
      </div>
    </div>
  );
}

/** Hero aside: the three course illustrations fanned out in mihrab arches. */
export function CourseFan() {
  return (
    <TiltCard max={5} className="relative mx-auto w-full max-w-[34rem] px-3 sm:px-0">
      <div className="group/fan relative aspect-[5/4] w-full">
        {/* Backdrop ornaments */}
        <div aria-hidden className="absolute inset-[6%] rounded-full bg-gradient-to-br from-brand-100/80 via-cream/40 to-gold-100/80" />
        <Star8Outline className="absolute -inset-[4%] animate-spin-slow text-gold-400/35" />
        <div aria-hidden className="absolute inset-x-[12%] bottom-[8%] h-10 rounded-[50%] bg-brand-900/20 blur-2xl" />

        {courses.map((course, i) => {
          const l = layout[i];
          return (
            <div key={course.slug} className={cn("absolute", l.wrap)}>
              <div className="scale-in" style={{ "--d": `${l.delay}ms` } as React.CSSProperties}>
                <Link
                  href={`/course-details/${course.slug}`}
                  aria-label={course.title}
                  className={cn(
                    "group/arch relative block transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-4!",
                    l.card,
                  )}
                >
                  <ArchOutline className="inset-0 translate-x-2 translate-y-2 text-gold-400/80" />
                  <div className="drop-shadow-[0_22px_24px_rgb(15_34_33/0.22)]">
                    <div className="arch relative aspect-[3/4] w-full bg-cream p-[5px]">
                      <div className="arch relative size-full overflow-hidden bg-brand-100">
                        <Image
                          src={course.image}
                          alt=""
                          fill
                          priority={i === 1}
                          sizes="(min-width: 1024px) 15rem, 45vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/arch:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
                        <div className={cn("absolute bottom-0 flex flex-col items-center gap-1.5 px-2 pb-4 text-center sm:pb-5", l.caption)}>
                          <span
                            lang="ar"
                            dir="rtl"
                            className="font-arabic text-[2.1rem] leading-none text-white drop-shadow-md sm:text-5xl"
                          >
                            {course.arabic}
                          </span>
                          <span className={cn("text-[0.55rem] font-bold uppercase leading-snug tracking-[0.22em] text-gold-200 sm:text-[0.62rem]", l.label)}>
                            {course.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}

        <div className="absolute -left-2 -top-5 z-20 sm:-left-6">
          <div className="scale-in" style={{ "--d": "760ms" } as React.CSSProperties}>
            <Seal />
          </div>
        </div>

        <Note icon={Users} delay={900} className="absolute -right-6 -top-2 hidden sm:block">
          One-to-one & batch classes
        </Note>
        <div className="absolute bottom-[-1%] left-1/2 z-20 -translate-x-1/2">
          <Note icon={Baby} delay={1050}>
            Learners from 4 years old
          </Note>
        </div>

        <Star8 className="absolute bottom-[12%] left-[4%] size-4 animate-float text-gold-400" />
        <Star8 className="absolute bottom-[30%] right-[1%] size-3 animate-float-slow text-brand-400" />
      </div>
    </TiltCard>
  );
}

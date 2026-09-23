import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { courses, type CourseSlug } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Section";
import { TiltCard } from "@/components/motion/Interactive";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function CourseCard({ slug, index }: { slug: CourseSlug; index: number }) {
  const course = courses.find((c) => c.slug === slug)!;
  return (
    <TiltCard className="h-full">
      <Link
        href={`/course-details/${course.slug}`}
        className="group flex h-full flex-col rounded-[2rem] border border-brand-900/8 bg-white p-3 shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-brand-100">
          <Image
            src={course.image}
            alt={course.imageAlt}
            fill
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 92vw"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-bold tabular-nums text-brand-800 backdrop-blur">
            0{index + 1}
          </span>
          <span
            lang="ar"
            dir="rtl"
            className="absolute bottom-2 right-5 font-arabic text-6xl leading-none text-white/90 drop-shadow-lg transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2"
          >
            {course.arabic}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-6">
          <div className="flex flex-wrap gap-2">
            {course.tags.map((t) => (
              <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-[0.7rem] font-semibold text-brand-700">
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-display text-[2.1rem] leading-tight text-brand-950">{course.title}</h3>
          <p className="leading-relaxed text-muted">{course.description}</p>
          <span className="mt-auto flex items-center justify-between pt-4 text-sm font-semibold text-brand-800">
            Start with a free trial
            <span className="grid size-10 place-items-center rounded-full bg-brand-100 text-brand-800 transition-all duration-500 ease-[var(--ease-spring)] group-hover:rotate-45 group-hover:bg-brand-800 group-hover:text-cream">
              <ArrowUpRight className="size-5" />
            </span>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}

/** Heading plus the three course cards. */
export function CoursesGrid({
  className,
  exclude,
  title = "Our *courses*",
  eyebrow = "Learn with us",
  description = "Unlock the beauty of the Quran with expert-guided, interactive courses.",
}: {
  className?: string;
  exclude?: CourseSlug;
  title?: string;
  eyebrow?: string;
  description?: string;
}) {
  const list = courses.filter((c) => c.slug !== exclude);
  return (
    <section className={cn("relative py-24 sm:py-32", className)}>
      <div className="container-page flex flex-col gap-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Stagger
          className={cn("grid gap-6 sm:grid-cols-2", list.length === 3 ? "lg:grid-cols-3" : "mx-auto w-full max-w-5xl")}
          stagger={0.15}
        >
          {list.map((c) => (
            <StaggerItem key={c.slug} className={cn(list.length === 3 && "last:sm:col-span-2 last:lg:col-span-1")}>
              <CourseCard slug={c.slug} index={courses.indexOf(c)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

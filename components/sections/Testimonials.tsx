import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProfileBadge } from "@/components/art/Avatars";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="pb-host flex w-[78vw] max-w-[26rem] shrink-0 flex-col gap-4 rounded-[1.25rem] border border-brand-900/8 bg-white p-5 shadow-soft transition-transform duration-500 hover:-translate-y-1 sm:gap-6 sm:rounded-[2rem] sm:p-7">
      <Quote className="size-6 text-gold-400 sm:size-8" fill="currentColor" strokeWidth={0} />
      <blockquote className="flex-1 text-[0.92rem] leading-relaxed text-brand-950 sm:text-[1.05rem]">{t.review}</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-brand-900/8 pt-4 sm:gap-3.5 sm:pt-5">
        <ProfileBadge variant={t.avatar} className="size-11 sm:size-14" />
        <span className="flex min-w-0 flex-col">
          <span className="text-[0.95rem] font-semibold text-brand-950 sm:text-base">{t.name}</span>
          <span className="text-sm text-muted">{t.country}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Two rows of reviews gliding in opposite directions. */
export function Testimonials({ className }: { className?: string }) {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);
  return (
    <section className={cn("relative overflow-hidden section-y", className)}>
      <div className="container-page flex flex-col items-center gap-8">
        <SectionHeading
          eyebrow="Kind words"
          title="Why students love *our Quran classes*"
          description="Hear from our students and parents about their journey of learning the Quran with us."
        />
        <Reveal delay={0.2}>
          <ButtonLink href="/contact-us" variant="outline">
            Start learning
          </ButtonLink>
        </Reveal>
      </div>
      <div className="mt-16 flex flex-col gap-5">
        <Marquee duration={70}>
          {rowA.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee duration={70} reverse>
          {rowB.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

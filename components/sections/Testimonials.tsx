import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[22rem] shrink-0 flex-col gap-6 rounded-[2rem] border border-brand-900/8 bg-white p-7 shadow-soft transition-transform duration-500 hover:-translate-y-1 sm:w-[26rem]">
      <Quote className="size-8 text-gold-400" fill="currentColor" strokeWidth={0} />
      <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-brand-950">{t.review}</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-brand-900/8 pt-5">
        <span className="relative shrink-0 rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-brand-400 p-[2px]">
          <span className="block overflow-hidden rounded-full border-2 border-white bg-gold-100">
            <Image src={t.avatar} alt="" width={52} height={52} className="size-12 object-cover" />
          </span>
        </span>
        <span className="flex flex-col">
          <span className="font-semibold text-brand-950">{t.name}</span>
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

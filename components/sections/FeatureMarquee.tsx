import { Star8 } from "@/components/ui/Brand";
import { Marquee } from "@/components/ui/Marquee";

const items = [
  "Quran Recitation",
  "Simplified Tajweed",
  "Quran Memorization",
  "Islamic Studies & Duas",
  "One-to-one Classes",
  "Male & Female Tutors",
  "Flexible Timings",
  "Monthly Exams",
];

/** Dark ribbon of course and feature names scrolling past. */
export function FeatureMarquee() {
  return (
    <section aria-label="What we offer" className="relative -rotate-1 bg-brand-950 py-5 text-cream shadow-lift">
      <Marquee duration={40} gap={2.5}>
        {items.map((item) => (
          <span key={item} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl italic sm:text-4xl">
            {item}
            <Star8 className="size-4 text-gold-400" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

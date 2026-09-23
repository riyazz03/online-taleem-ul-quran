import { Star8 } from "@/components/ui/Brand";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";

/** Hadith on learning and teaching the Quran (Sahih al-Bukhari 5027). */
export function HadithQuote() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-36">
      <div className="container-page relative mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <Reveal y={16} className="flex items-center gap-3 text-gold-500">
          <span className="h-px w-12 bg-gold-400/60" />
          <Star8 className="size-4" />
          <span className="h-px w-12 bg-gold-400/60" />
        </Reveal>
        <Reveal blur y={20}>
          <p lang="ar" dir="rtl" className="font-arabic text-4xl leading-[1.7] text-brand-800 sm:text-6xl">
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </p>
        </Reveal>
        <ScrollText
          text="“The best among you are those who *learn the Quran* and *teach it*.”"
          className="font-display text-4xl leading-[1.15] tracking-tight text-brand-950 sm:text-6xl"
        />
        <Reveal delay={0.1} y={12}>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted">
            Prophet Muhammad ﷺ · Sahih al-Bukhari 5027
          </p>
        </Reveal>
      </div>
    </section>
  );
}

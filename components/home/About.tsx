import { ArchImage } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Parallax } from "@/components/motion/Interactive";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitHeading } from "@/components/motion/SplitHeading";

const story =
  "At *Online Taleem ul Quran*, we offer a complete and accessible Quran learning experience for all ages and backgrounds. Whether you're a beginner, a non-Arabic speaker, or looking to improve Tajweed and Qirat, expert tutors guide you through *flexible online and offline classes* at your own pace. Enjoy *high-quality education* from home or in person, with *flexible weekday and weekend classes* and *one-to-one or batch sessions* to suit your needs. Female learners benefit from a safe environment, and children build strong Quran reading and pronunciation skills — so every student can master correct recitation and connect deeply with the Holy Quran.";

export function About() {
  return (
    <section className="relative overflow-hidden section-y">
      <div className="container-page grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="relative lg:sticky lg:top-28">
          <Reveal y={60} className="relative mx-auto w-full max-w-md">
            <Parallax offset={30}>
              <ArchImage
                src="/img/home/learning-journey.webp"
                alt="Illustration of a student in an online Quran lesson inside a mosque-shaped frame"
                className="aspect-[4/5] w-full"
                sizes="(min-width: 1024px) 28rem, 90vw"
              />
            </Parallax>
            <div className="absolute -bottom-6 -left-4 rounded-3xl bg-brand-900 p-5 text-cream shadow-lift sm:-left-10">
              <p className="font-display text-5xl leading-none text-gold-300">15+</p>
              <p className="mt-1 max-w-[9rem] text-xs font-medium text-brand-100/80">
                years of experience in Quranic education
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal y={12}>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <SplitHeading
            text="Empowering your Quran *learning journey*"
            className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-brand-950 sm:text-5xl lg:text-[4rem]"
          />
          <ScrollText
            text={story}
            className="text-xl font-medium leading-[1.55] tracking-tight text-brand-950 sm:text-2xl sm:leading-[1.5]"
          />
          <Reveal>
            <ButtonLink href="/about-us" variant="outline" size="lg">
              Know more about us
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

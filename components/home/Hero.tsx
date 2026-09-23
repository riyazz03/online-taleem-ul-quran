import Image from "next/image";
import { Globe, HeartHandshake } from "lucide-react";
import { toWords, cn } from "@/lib/utils";
import { GeometricPattern } from "@/components/ui/Brand";
import { ArchScene } from "@/components/art/Scenes";
import { LiveClassCard } from "@/components/art/LiveClassCard";
import { CrescentStar } from "@/components/art/Motifs";
import { ButtonLink } from "@/components/ui/Button";

const headline = "Your Quran journey *begins* here";

function RotatingSeal({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid size-28 place-items-center rounded-full bg-cream/90 shadow-soft backdrop-blur sm:size-32", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="seal-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className="fill-brand-800 text-[17px] font-bold uppercase" letterSpacing="4">
          <textPath href="#seal-path" textLength="460" lengthAdjust="spacing">
            Learn ✦ Recite ✦ Reflect ✦ Memorize ✦
          </textPath>
        </text>
      </svg>
      <Image src="/brand/emblem.svg" alt="" width={48} height={52} unoptimized className="relative h-12 w-auto sm:h-14" />
    </div>
  );
}

function FloatingNote({
  icon: Icon,
  children,
  className,
  delay,
}: {
  icon: typeof HeartHandshake;
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <div className={cn("absolute z-10", className)}>
      <div className="scale-in" style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        <div
          className="flex max-w-[15rem] animate-float items-center gap-3 rounded-2xl border border-white/60 bg-white/80 p-3 pr-4 shadow-lift backdrop-blur-md"
          style={{ animationDelay: `${delay * 2}ms` }}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
            <Icon className="size-[1.1rem]" />
          </span>
          <p className="text-[0.8rem] font-semibold leading-snug text-brand-900">{children}</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  // Two deliberate lines: "Your Quran journey" / "begins here".
  const lines = [toWords("Your Quran journey"), toWords("*begins* here")];
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
      {/* Backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-56 size-[46rem] rounded-full bg-brand-200/55 blur-3xl" />
        <div className="absolute -left-48 top-32 size-[34rem] rounded-full bg-gold-100 blur-3xl" />
        <GeometricPattern
          id="hero-geo"
          className="text-brand-800 opacity-[0.07] [mask-image:radial-gradient(ellipse_75%_60%_at_60%_20%,black,transparent)]"
        />
        <div className="skyline absolute inset-x-0 bottom-0 h-[22vw] max-h-64 text-brand-100/80" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
        <div className="relative flex flex-col items-start">
          <p
            lang="ar"
            dir="rtl"
            className="fade-up font-arabic text-2xl text-gold-500 sm:text-[1.7rem]"
            style={{ "--d": "0ms" } as React.CSSProperties}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <span
            className="fade-up mt-6 inline-flex items-center gap-2.5 rounded-full border border-brand-900/10 bg-white/60 py-1.5 pl-2 pr-4 text-xs font-semibold text-brand-800 backdrop-blur"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            <span className="relative grid size-5 place-items-center rounded-full bg-brand-100">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400/60" />
              <span className="relative size-2 rounded-full bg-brand-500" />
            </span>
            Live one-to-one Quran classes · Worldwide
          </span>

          <h1
            aria-label={headline.replaceAll("*", "")}
            className="mt-7 font-display text-[clamp(2.9rem,12.8vw,5rem)] leading-[0.96] tracking-[-0.03em] text-brand-950 sm:text-[clamp(4.6rem,11vw,6.5rem)] lg:text-[clamp(5rem,7.2vw,6.6rem)]"
          >
            {lines.map((line, li) => (
              <span key={li} aria-hidden className="block whitespace-nowrap">
                {line.map((w, wi) => {
                  const i = li * 3 + wi;
                  return (
                    <span key={wi}>
                      <span className="rise-word">
                        <span style={{ "--i": i } as React.CSSProperties} className={w.em ? "italic text-brand-500" : undefined}>
                          {w.word}
                        </span>
                      </span>
                      {wi < line.length - 1 && " "}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p
            className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-muted text-pretty sm:text-xl"
            style={{ "--d": "450ms" } as React.CSSProperties}
          >
            Expert-led lessons, flexible schedules, lifelong learning. Learn to recite the Holy
            Quran beautifully — one-to-one, with qualified male and female tutors.
          </p>

          <div
            className="fade-up mt-9 flex flex-wrap items-center gap-3"
            style={{ "--d": "550ms" } as React.CSSProperties}
          >
            <ButtonLink href="/contact-us" size="lg">
              Book a free demo
            </ButtonLink>
            <ButtonLink href="/our-course" variant="outline" size="lg">
              Explore courses
            </ButtonLink>
          </div>

          <dl
            className="fade-up mt-12 grid w-full max-w-lg grid-cols-3 divide-x divide-brand-900/10 border-t border-brand-900/10 pt-6"
            style={{ "--d": "650ms" } as React.CSSProperties}
          >
            {[
              ["300+", "Students guided"],
              ["15+", "Expert tutors"],
              ["10+", "Countries"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col gap-1 px-4 first:pl-0">
                <dt className="order-2 text-xs font-medium text-muted">{label}</dt>
                <dd className="order-1 font-display text-4xl text-brand-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Illustrated collage */}
        <div className="relative mx-auto w-full max-w-[26rem] sm:max-w-[32rem] lg:max-w-[34rem]">
          <div className="scale-in relative mx-auto w-[80%]" style={{ "--d": "200ms" } as React.CSSProperties}>
            <div aria-hidden className="absolute inset-x-[8%] bottom-[2%] top-[18%] rounded-full bg-brand-500/25 blur-3xl" />
            <ArchScene id="hero-scene" variant="night" title="A mihrab arch opening onto a night sky with a crescent moon, lanterns and a mosque" />
          </div>

          <div className="scale-in absolute -right-1 bottom-[7%] w-[60%] max-w-[16.5rem] sm:right-0 sm:w-[50%]" style={{ "--d": "650ms" } as React.CSSProperties}>
            <div className="animate-float-slow">
              <LiveClassCard />
            </div>
          </div>

          <div className="scale-in absolute -top-3 right-[4%] z-20 hidden sm:block" style={{ "--d": "800ms" } as React.CSSProperties}>
            <RotatingSeal />
          </div>

          <FloatingNote icon={Globe} className="-left-3 bottom-[20%] hidden sm:block lg:-left-12" delay={950}>
            Anytime, anywhere, with expert guidance.
          </FloatingNote>
          <FloatingNote icon={HeartHandshake} className="-bottom-6 left-[6%] sm:left-[14%]" delay={1150}>
            Guided learning for every heart and mind.
          </FloatingNote>

          <CrescentStar className="absolute left-[8%] top-[1%] size-7 text-gold-400" />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { GraduationCap, HeartHandshake, Hourglass, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArchOutline, GeometricPattern, Star8 } from "@/components/ui/Brand";
import { CrescentStar, Lantern } from "@/components/art/Motifs";

function FloatingNote({
  icon: Icon,
  children,
  className,
  delay,
  tone = "light",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  delay: number;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("absolute z-10", className)}>
      <div className="scale-in" style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        <div
          className={cn(
            "flex max-w-[14.5rem] animate-float items-center gap-3 rounded-2xl p-3 pr-4 shadow-lift backdrop-blur-md",
            dark ? "bg-brand-900/95 text-cream" : "border border-white/60 bg-white/85 text-brand-900",
          )}
          style={{ animationDelay: `${delay * 2}ms` }}
        >
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-xl",
              dark ? "bg-gold-300 text-brand-950" : "bg-brand-100 text-brand-700",
            )}
          >
            <Icon className="size-[1.1rem]" />
          </span>
          <p className="text-[0.8rem] font-semibold leading-snug">{children}</p>
        </div>
      </div>
    </div>
  );
}

/** Hero illustration: a mihrab arch window with floating notes around it. CSS-only entrances. */
export function HeroArt() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[25rem] sm:max-w-[29rem] lg:mr-0">
      <CrescentStar className="absolute -right-2 -top-6 z-10 size-12 animate-float-slow text-gold-400 sm:-right-8 sm:size-16" />
      <ArchOutline className="inset-0 translate-x-3 translate-y-3 text-gold-400/70 sm:translate-x-4 sm:translate-y-4" />

      <div className="absolute inset-0 [filter:drop-shadow(0_30px_40px_rgb(15_37_36/0.16))]">
        <div className="arch relative h-full w-full overflow-hidden bg-gradient-to-b from-white via-white to-brand-50">
          <GeometricPattern
            id="about-hero-arch-geo"
            size={56}
            className="text-brand-700 opacity-[0.07] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-100/70 to-transparent" />
          {/* Lantern hanging from the apex of the arch */}
          <Lantern chain={48} className="absolute left-1/2 top-0 w-11 -translate-x-1/2 sm:w-14" />
          <div aria-hidden className="absolute inset-x-[12%] bottom-[6%] h-[5%] rounded-[100%] bg-brand-900/15 blur-md" />
          <div className="absolute inset-x-[5%] bottom-[7%] top-[20%]">
            <Image
              src="/img/about/hero.webp"
              alt="Illustration of a woman in hijab studying the Quran at her desk, with an online lesson open on a screen beside her"
              fill
              priority
              sizes="(min-width: 1024px) 27rem, (min-width: 640px) 26rem, 85vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      <FloatingNote icon={GraduationCap} tone="dark" className="-left-3 top-[20%] sm:-left-12" delay={700}>
        15+ years of experience in Quranic education
      </FloatingNote>
      <FloatingNote icon={Hourglass} className="-right-3 top-[52%] hidden sm:block sm:-right-10" delay={880}>
        Learn at your own pace and convenience.
      </FloatingNote>
      <FloatingNote icon={HeartHandshake} className="-bottom-5 left-[6%] sm:-left-6" delay={1060}>
        For children, adults, men and women.
      </FloatingNote>

      <Star8 className="absolute -right-1 bottom-[22%] size-3 animate-float-slow text-brand-400" />
    </div>
  );
}

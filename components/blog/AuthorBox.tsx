import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8Outline } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** "Written by" card for the academy, with the free-demo call to action. */
export function AuthorBox({ author, className }: { author: string; className?: string }) {
  return (
    <Reveal y={40} className={className}>
      <aside
        aria-label="About the author"
        className="relative overflow-hidden rounded-[2rem] border border-brand-900/8 bg-sand/70 p-7 sm:p-10"
      >
        <GeometricPattern
          id="author-box-geo"
          className="text-brand-800 opacity-[0.05] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        />
        <Star8Outline className="absolute -right-16 -top-16 size-56 animate-spin-slow text-gold-400/30" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <span className="grid size-20 shrink-0 place-items-center rounded-3xl bg-white shadow-soft">
            <Image src="/brand/emblem.svg" alt="" width={40} height={44} unoptimized className="h-11 w-auto" />
          </span>
          <div className="flex flex-col items-start gap-3">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-brand-600">Written by</p>
            <p className="font-display text-3xl leading-tight text-brand-950 sm:text-4xl">{author}</p>
            <p className="max-w-xl leading-relaxed text-muted">
              With over 15 years of experience in Quranic education, we help children and adults
              read the Quran correctly and beautifully with Tajweed — in live one-to-one classes
              with qualified male and female tutors, at times that suit you.
            </p>
            <div className={cn("mt-3 flex flex-wrap gap-3")}>
              <ButtonLink href="/contact-us">Book a free demo</ButtonLink>
              <ButtonLink href={site.whatsappUrl} variant="outline">
                Ask on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </aside>
    </Reveal>
  );
}

import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8, Star8Outline } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

/** The message the WhatsApp link pre-fills, read from the link itself. */
const greeting = new URL(site.whatsappUrl).searchParams.get("text") ?? "Assalamu alaikum!";

/**
 * Newsletter-style call to action. There is no mailing list: readers
 * continue the conversation on WhatsApp instead. Light on purpose, so it
 * contrasts with the dark call to action at the top of the footer.
 */
export function BlogCta({ className }: { className?: string }) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container-page">
        <Reveal
          y={50}
          className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-900/8 bg-sand/70 shadow-soft"
        >
          <GeometricPattern
            id="blog-cta-geo"
            className="text-brand-800 opacity-[0.05] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
          />
          <div aria-hidden className="absolute -right-24 -top-32 size-[26rem] rounded-full bg-brand-200/60 blur-3xl" />
          <div aria-hidden className="absolute -bottom-40 -left-24 size-96 rounded-full bg-gold-100 blur-3xl" />
          <Star8Outline className="absolute -bottom-24 right-1/3 size-72 animate-spin-slow text-gold-400/25" />

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:p-16">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>Stay connected</Eyebrow>
              <SplitHeading
                text="Questions after *reading?*"
                className="font-display text-5xl leading-[1] tracking-tight text-balance text-brand-950 sm:text-6xl lg:text-7xl"
              />
              <p className="max-w-md text-lg leading-relaxed text-muted">
                Ask us anything about Tajweed, Hifz or finding the right class for your child. No
                sign-up and no mailing list — just a friendly conversation on WhatsApp.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <ButtonLink href={site.whatsappUrl} size="lg">
                  Message us on WhatsApp
                </ButtonLink>
                <ButtonLink href="/contact-us" variant="outline" size="lg">
                  Book a free demo
                </ButtonLink>
              </div>
            </div>

            {/* Chat preview */}
            <Reveal delay={0.15} y={40} className="relative mx-auto w-full max-w-md">
              <div className="rotate-[1.5deg] rounded-[1.25rem] sm:rounded-[2rem] border border-brand-900/8 bg-white p-4 shadow-lift transition-transform duration-700 ease-[var(--ease-out-expo)] hover:rotate-0 sm:p-5">
                <div className="flex items-center gap-3 border-b border-brand-900/8 px-1 pb-4">
                  <span className="grid size-11 place-items-center rounded-full bg-brand-50 ring-1 ring-brand-900/8">
                    <Image src="/brand/emblem.svg" alt="" width={22} height={24} unoptimized className="h-6 w-auto" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-semibold text-brand-950">{site.name}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <WhatsAppIcon className="size-3.5 text-brand-500" />
                      WhatsApp
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl px-1 pb-1 pt-5">
                  <p className="self-center rounded-full bg-sand px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-700">
                    Your message
                  </p>
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-brand-100 px-4 py-3 text-[0.95rem] leading-snug text-brand-950">
                    {greeting}
                    <span className="mt-1 flex justify-end">
                      <CheckCheck aria-hidden className="size-4 text-brand-500" />
                    </span>
                  </div>
                  <div aria-hidden className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-sand px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-2 animate-bounce rounded-full bg-brand-400 motion-reduce:animate-none"
                        style={{ animationDelay: `${i * 160}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Star8 className="absolute -right-3 -top-3 size-6 animate-spin-slow text-gold-400" />
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

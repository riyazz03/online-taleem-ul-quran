import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { courses } from "@/lib/content";
import { navLinks, site } from "@/lib/site";
import { GeometricPattern, Logo, Star8 } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  x: "X (Twitter)",
  instagram: "Instagram",
  youtube: "YouTube",
};

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <footer className="relative mt-6 sm:mt-10">
      {/* Closing call to action, overlapping the footer */}
      <div className="container-page relative z-10">
        <Reveal y={60} className="grain relative overflow-hidden rounded-[2.5rem] bg-brand-800 px-6 py-16 text-center text-cream shadow-lift sm:px-12 sm:py-20">
          <GeometricPattern id="footer-cta-geo" className="text-gold-200 opacity-[0.09]" />
          <div aria-hidden className="absolute -left-24 -top-24 size-72 rounded-full bg-brand-400/30 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 -right-16 size-80 rounded-full bg-gold-400/25 blur-3xl" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            <p lang="ar" dir="rtl" className="font-arabic text-3xl text-gold-200 sm:text-4xl">
              اقْرَأْ بِاسْمِ رَبِّكَ
            </p>
            <SplitHeading
              text={"Take the first step\n*book your free demo*"}
              className="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl"
              emClassName="italic text-gold-gradient"
            />
            <p className="max-w-xl text-brand-100/80">
              Meet a teacher, get a gentle assessment and a learning plan built around your
              schedule — for you or your child.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/contact-us" variant="gold" size="lg">
                Book a free demo
              </ButtonLink>
              <ButtonLink href={site.whatsappUrl} variant="ghost-light" size="lg">
                Chat on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="grain relative -mt-40 overflow-hidden bg-brand-950 pt-56 text-brand-100/80">
        <GeometricPattern id="footer-geo" className="text-brand-300 opacity-[0.05]" />
        <div className="container-page relative grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed">
              Guiding hearts with the wisdom of the Quran, illuminating lives with the light of
              Islam — live online classes for every age.
            </p>
            {socials.length > 0 && (
              <div className="flex gap-2">
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-gold-300 hover:text-gold-200"
                  >
                    {socialLabels[key]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <FooterColumn title="Explore">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Courses">
            {courses.map((c) => (
              <FooterLink key={c.slug} href={`/course-details/${c.slug}`}>
                {c.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <a href={`mailto:${site.email}`} className="group flex items-start gap-3 text-sm hover:text-cream">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-300" />
              <span className="break-all">{site.email}</span>
            </a>
            {site.phones.map((p) => (
              <a
                key={p.tel}
                href={`https://wa.me/${p.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm hover:text-cream"
              >
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-brand-300" />
                <span>
                  {p.display} <span className="text-xs text-brand-300">(WhatsApp only)</span>
                </span>
              </a>
            ))}
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm hover:text-cream"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" />
              <span>{site.address.lines.join(", ")}</span>
            </a>
          </FooterColumn>
        </div>

        <div className="container-page relative">
          <p
            aria-hidden
            className="select-none whitespace-nowrap text-center font-display text-[15.5vw] leading-[0.8] tracking-tight text-white/[0.04] lg:text-[12.5rem]"
          >
            Taleem ul Quran
          </p>
        </div>

        <div className="relative border-t border-white/10">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
            <p className="flex items-center gap-2">
              <Star8 className="size-3 text-gold-400" /> © {year} {site.name}. All rights reserved.
            </p>
            <a href={site.credit.href} className="inline-flex items-center gap-1.5 hover:text-cream">
              Crafted by <span className="font-semibold text-cream">{site.credit.name}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold-300">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex w-fit items-center gap-2 text-sm transition-colors hover:text-cream">
      <span className="h-px w-0 bg-gold-300 transition-all duration-300 group-hover:w-4" />
      {children}
    </Link>
  );
}

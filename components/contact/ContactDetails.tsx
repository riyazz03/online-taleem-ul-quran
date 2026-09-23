import Image from "next/image";
import { ArrowUpRight, CalendarDays, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GeometricPattern, Star8, Star8Outline } from "@/components/ui/Brand";
import { Eyebrow } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Parallax, SpotlightCard } from "@/components/motion/Interactive";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

function ContactCard({
  icon,
  label,
  children,
  linked = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  /** The card contains a stretched link, so show the arrow affordance. */
  linked?: boolean;
}) {
  return (
    <SpotlightCard className="group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-500 hover:border-gold-300/30 hover:bg-white/[0.07] sm:gap-5 sm:p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-300 text-brand-950 shadow-[0_10px_24px_-10px_rgb(210_165_84/0.9)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-105">
        {icon}
      </span>
      <div className="min-w-0 flex-1 pr-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-200/80">{label}</p>
        <div className="mt-1.5">{children}</div>
      </div>
      {linked && (
        <ArrowUpRight
          aria-hidden
          className="absolute right-4 top-4 size-4 text-brand-300 transition-all duration-500 ease-[var(--ease-spring)] group-hover:rotate-45 group-hover:text-gold-200"
        />
      )}
    </SpotlightCard>
  );
}

const stretched = "after:absolute after:inset-0 after:rounded-2xl after:content-['']";

/** Left column of the booking section: a dark panel with the contact cards. */
export function ContactDetails({ className }: { className?: string }) {
  const [emailUser, emailDomain] = site.email.split("@");

  return (
    <Reveal
      y={40}
      className={cn(
        "grain relative flex flex-col overflow-hidden rounded-[2.5rem] bg-brand-950 p-6 text-cream shadow-lift sm:p-10",
        className,
      )}
    >
      <GeometricPattern id="contact-panel-geo" className="text-gold-300 opacity-[0.06]" />
      <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-500/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-28 -left-20 size-72 rounded-full bg-gold-400/15 blur-3xl" />
      <Star8Outline className="absolute -right-16 -top-16 size-56 animate-spin-slow text-gold-300/20" />
      <div aria-hidden className="skyline absolute inset-x-0 bottom-0 h-40 text-brand-800/70" />

      <div className="relative flex flex-col items-start gap-5">
        <Eyebrow tone="light">Connect now</Eyebrow>
        <SplitHeading
          text="We'd love to *hear from you*"
          className="font-display text-[2.6rem] leading-[1] tracking-[-0.02em] text-balance sm:text-5xl"
          emClassName="italic text-gold-gradient"
        />
        <p className="max-w-sm leading-relaxed text-brand-100/75">
          Message us on WhatsApp, write to us, or visit us in Vellore — we&apos;re happy to help
          you choose the right course.
        </p>
      </div>

      <Stagger as="ul" className="relative mt-8 flex flex-col gap-3" stagger={0.08}>
        <StaggerItem as="li">
          <ContactCard icon={<WhatsAppIcon className="size-5" />} label="WhatsApp only">
            <ul className="flex flex-col gap-1">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`https://wa.me/${phone.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${phone.display}`}
                    className="text-lg font-semibold tabular-nums tracking-tight text-cream underline decoration-transparent underline-offset-4 transition-colors hover:text-gold-200 hover:decoration-gold-300/60"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </ContactCard>
        </StaggerItem>

        <StaggerItem as="li">
          <ContactCard icon={<Mail className="size-5" />} label="Email" linked>
            <a
              href={`mailto:${site.email}`}
              className={cn(
                "text-[0.95rem] font-semibold text-cream transition-colors [overflow-wrap:anywhere] group-hover:text-gold-200 sm:text-base",
                stretched,
              )}
            >
              {emailUser}
              <wbr />@{emailDomain}
            </a>
          </ContactCard>
        </StaggerItem>

        <StaggerItem as="li">
          <ContactCard icon={<MapPin className="size-5" />} label="Visit us" linked>
            <address className="text-[0.95rem] not-italic leading-relaxed text-cream/90">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-200 transition-colors group-hover:text-gold-100",
                stretched,
              )}
            >
              Open in Google Maps
            </a>
          </ContactCard>
        </StaggerItem>

        <StaggerItem as="li">
          <ContactCard icon={<CalendarDays className="size-5" />} label="Demo classes">
            <p className="font-display text-[1.7rem] leading-tight text-cream">On weekends</p>
            <p className="mt-1 text-sm text-brand-100/70">Pick a Saturday or Sunday in the booking form.</p>
          </ContactCard>
        </StaggerItem>
      </Stagger>

      {/* Leaves room for the skyline when the panel is stretched to the form's height */}
      <div aria-hidden className="h-24 flex-1" />
    </Reveal>
  );
}

/** Illustration card: teacher on a laptop with two students. */

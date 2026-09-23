"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { Mail, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GeometricPattern, Logo } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/our-course") return pathname.startsWith("/our-course") || pathname.startsWith("/course-details");
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 480);
  });

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <nav
          aria-label="Main"
          className="container-page"
        >
        <div
          className={cn(
            "-mx-3 flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:-mx-4 sm:px-4",
            scrolled || open
              ? "border-brand-900/10 bg-cream/80 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                      active
                        ? "bg-white text-brand-950 shadow-[0_2px_10px_-4px_rgb(15_34_33/0.25)]"
                        : "text-brand-900/65 hover:bg-brand-900/5 hover:text-brand-950",
                    )}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink href="/contact-us" className="hidden sm:inline-flex">
              Book a free demo
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full bg-brand-900 text-cream transition-transform active:scale-95 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="menu"
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 42px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
            transition={{ duration: 0.75, ease }}
            className="grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-brand-950 px-6 pb-10 pt-28 text-cream lg:hidden"
          >
            <GeometricPattern id="menu-geo" className="text-gold-300 opacity-[0.07]" />
            <ul className="relative flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 py-2 font-display text-5xl tracking-tight",
                      isActive(pathname, link.href) ? "text-gold-300 italic" : "text-cream",
                    )}
                  >
                    <span className="font-sans text-xs font-bold tabular-nums text-brand-300">0{i + 1}</span>
                    {link.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative mt-auto flex flex-col gap-4 pt-10"
            >
              <ButtonLink href="/contact-us" variant="gold" size="lg" className="self-start">
                Book a free demo
              </ButtonLink>
              <div className="flex flex-col gap-2 text-sm text-brand-100/80">
                <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <WhatsAppIcon className="size-4 text-brand-300" /> {site.phones[0].display}
                </a>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2">
                  <Mail className="size-4 text-brand-300" /> {site.email}
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

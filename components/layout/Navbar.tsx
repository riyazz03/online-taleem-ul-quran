"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { Mail } from "lucide-react";
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
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Centre of the hamburger button + the radius needed to cover the screen.
  const [origin, setOrigin] = useState({ x: 0, y: 0, r: 0 });

  function toggleMenu() {
    const b = toggleRef.current?.getBoundingClientRect();
    if (b) {
      const x = b.left + b.width / 2;
      const y = b.top + b.height / 2;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      setOrigin({ x, y, r });
    }
    setOpen((v) => !v);
  }
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Lock page scroll and make the page behind the menu inert while it is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = [document.getElementById("main"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    lenis?.stop();
    root.style.overflow = "hidden";
    behind.forEach((el) => el.setAttribute("inert", ""));
    const toggle = toggleRef.current;
    // Move focus into the menu once it has rendered.
    const t = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus(), 60);
    return () => {
      window.clearTimeout(t);
      lenis?.start();
      root.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
      toggle?.focus({ preventScroll: true });
    };
  }, [open, lenis]);

  // The menu only exists below lg — close it if the window grows past that.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <m.header
        initial={false}
        animate={{ y: hidden && !open ? -120 : 0 }}
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
            <div className="hidden sm:block">
              <ButtonLink href="/contact-us" className="whitespace-nowrap">
                Book a free demo
              </ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-full bg-brand-900 text-cream transition-[transform,background-color] duration-300 active:scale-95 lg:hidden"
            >
              {/* Three lines that morph into an X */}
              <span aria-hidden className="relative block h-3.5 w-[1.15rem]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-500 ease-[var(--ease-out-expo)]",
                      i === 0 && (open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"),
                      i === 1 && (open ? "top-1/2 -translate-y-1/2 scale-x-0 opacity-0" : "top-1/2 -translate-y-1/2"),
                      i === 2 && (open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 w-2/3"),
                    )}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[45] overflow-hidden text-cream lg:hidden"
          >
            {/* The backdrop is a circle that grows out of the hamburger button.
                Scaling a circle (transform) is GPU-composited, so it stays smooth. */}
            <m.div
              aria-hidden
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, transition: { duration: 0.55, ease: [0.7, 0, 0.84, 0], delay: 0.1 } }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              style={{
                left: origin.x - origin.r,
                top: origin.y - origin.r,
                width: origin.r * 2,
                height: origin.r * 2,
              }}
              className="grain absolute overflow-hidden rounded-full bg-brand-950 will-change-transform"
            >
              <GeometricPattern id="menu-geo" className="text-gold-300 opacity-[0.07]" />
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28"
            >
            <ul className="relative flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease }}
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
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

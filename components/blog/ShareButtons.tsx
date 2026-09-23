"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/Icons";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const button =
  "grid size-11 place-items-center rounded-full border border-brand-900/10 bg-white text-brand-800 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-900 hover:bg-brand-900 hover:text-cream";

/** Copy link, WhatsApp and X share buttons for an article. */
export function ShareButtons({
  url,
  title,
  className,
}: {
  /** Canonical absolute URL of the article. */
  url: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    // Copy the address actually being viewed (works on previews and localhost too).
    const href = `${window.location.origin}${window.location.pathname}`;
    try {
      await navigator.clipboard.writeText(href);
    } catch {
      const input = document.createElement("textarea");
      input.value = href;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;
  const x = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className={cn(button, copied && "border-brand-500 bg-brand-500 text-white hover:border-brand-500 hover:bg-brand-500")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={copied ? "done" : "copy"}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="grid place-items-center"
          >
            {copied ? <Check className="size-[1.1rem]" strokeWidth={2.5} /> : <Link2 className="size-[1.1rem]" />}
          </m.span>
        </AnimatePresence>
      </button>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
        className={button}
      >
        <WhatsAppIcon className="size-[1.1rem]" />
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        title="Share on X"
        className={button}
      >
        <XLogo className="size-4" />
      </a>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight } from "lucide-react";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

type Item = { question: string; answer: string };

/** Clean accordion: numbered questions separated by hairlines. */
export function FaqList({ items, className }: { items: readonly Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <Reveal y={24} className={cn("border-t border-brand-900/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question} className="border-b border-brand-900/10">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
              >
                <span className="w-7 shrink-0 font-display text-lg leading-none tabular-nums text-gold-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1 text-[1.05rem] font-semibold leading-snug transition-colors duration-300 sm:text-lg",
                    isOpen ? "text-brand-700" : "text-brand-950 group-hover:text-brand-700",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                    isOpen ? "border-brand-700 bg-brand-700 text-cream" : "border-brand-900/15 text-brand-800 group-hover:border-brand-500",
                  )}
                >
                  <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                  <span
                    className={cn(
                      "absolute h-3 w-[1.5px] rounded-full bg-current transition-transform duration-300",
                      isOpen && "rotate-90",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pl-11 pr-12 leading-relaxed text-muted sm:pl-[3.25rem]">{item.answer}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </Reveal>
  );
}

/** FAQ section: centred heading, clean list, and a WhatsApp prompt. */
export function Faq({ className }: { className?: string }) {
  return (
    <section className={cn("relative section-y", className)}>
      <div className="container-page flex flex-col gap-12 sm:gap-14">
        <SectionHeading
          eyebrow="FAQ"
          title="Got questions? *We've got answers.*"
          description="Everything families usually ask us about classes, timings and teachers."
        />
        <FaqList items={faqs} className="mx-auto w-full max-w-3xl" />
        <Reveal y={12} className="mx-auto">
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-muted"
          >
            <WhatsAppIcon className="size-4 text-brand-500" />
            Still have a question?
            <span className="inline-flex items-center gap-1 font-semibold text-brand-800 underline decoration-brand-300 underline-offset-4 transition-colors group-hover:text-brand-600">
              Chat with us on WhatsApp
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

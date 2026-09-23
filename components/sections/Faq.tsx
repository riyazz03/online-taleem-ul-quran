"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

type Item = { question: string; answer: string };

export function FaqList({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <m.div
            key={item.question}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.05, ease }}
            className={cn(
              "rounded-3xl border transition-colors duration-500",
              isOpen ? "border-brand-900/10 bg-white shadow-soft" : "border-brand-900/8 bg-white/40 hover:bg-white/80",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
              >
                <span className="text-base font-semibold text-brand-950 sm:text-lg">{item.question}</span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-spring)]",
                    isOpen ? "rotate-45 bg-brand-800 text-cream" : "bg-brand-100 text-brand-800",
                  )}
                >
                  <Plus className="size-4" strokeWidth={2.5} />
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
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-muted sm:px-7">{item.answer}</p>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        );
      })}
    </div>
  );
}

/** FAQ section: sticky intro on the left, accordion on the right. */
export function Faq({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-24 sm:py-32", className)}>
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Got questions? *We've got answers.*"
            description="Explore our FAQs to learn more about our classes, schedules and teaching methods."
          />
          <Reveal delay={0.2} className="w-full max-w-md rounded-[2rem] bg-brand-900 p-7 text-cream shadow-lift">
            <p className="font-display text-3xl">Still have a question?</p>
            <p className="mt-2 text-sm text-brand-100/75">
              Message us on WhatsApp and our team will get back to you, in shaa Allah.
            </p>
            <ButtonLink href={site.whatsappUrl} variant="gold" className="mt-6">
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="size-4" /> Chat on WhatsApp
              </span>
            </ButtonLink>
          </Reveal>
        </div>
        <FaqList items={faqs} />
      </div>
    </section>
  );
}

import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Floating WhatsApp shortcut, bottom-right on every page. */
export function WhatsAppFab() {
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fade-up group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
      style={{ "--d": "1500ms" } as React.CSSProperties}
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-brand-950 px-4 py-2 text-sm font-semibold text-cream opacity-0 shadow-lift transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-brand-500 text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
        <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400" />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}

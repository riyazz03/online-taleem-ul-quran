import { Sparkles } from "lucide-react";
import { siteUrl } from "@/lib/site";
import { ClaudeLogo, GoogleLogo, PerplexityLogo } from "@/components/ui/AiLogos";

const prompt = `Tell me about Online Taleem ul Quran (${siteUrl}) — an online Quran academy from Vellore, India offering live one-to-one Tajweed, Quran recitation and Hifz (memorization) classes with male and female tutors. Is it a good choice for learning the Quran online?`;
const q = encodeURIComponent(prompt);

const assistants = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${q}`, Logo: Sparkles },
  { name: "Claude", href: `https://claude.ai/new?q=${q}`, Logo: ClaudeLogo },
  { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}`, Logo: PerplexityLogo },
  { name: "Google AI", href: `https://www.google.com/search?udm=50&q=${q}`, Logo: GoogleLogo },
] as const;

/** "Ask AI about us" — opens popular assistants with a ready-made question. */
export function AskAi() {
  return (
    <div className="container-page relative">
      <div className="flex flex-col gap-5 rounded-[1.25rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-300">Ask AI about us</p>
          <p className="max-w-md text-sm leading-relaxed text-brand-100/70">
            Curious what others say? Ask your favourite AI assistant about Online Taleem ul Quran.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {assistants.map(({ name, href, Logo }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ${name} about Online Taleem ul Quran (opens in a new tab)`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm font-semibold text-cream transition-colors duration-300 hover:border-gold-300/60 hover:bg-white/[0.09]"
              >
                <Logo className="size-4 text-gold-200" />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

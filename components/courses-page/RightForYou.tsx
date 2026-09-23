import { cn } from "@/lib/utils";
import { GeometricPattern, Star8Outline } from "@/components/ui/Brand";
import { SectionHeading } from "@/components/ui/Section";
import { FitChecklist } from "./FitChecklist";

/** "Is this program right for you?" on a sand background. */
export function RightForYou({ className }: { className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-sand py-24 sm:py-32", className)}>
      <GeometricPattern id="fit-geo" className="text-brand-800 opacity-[0.045]" />
      <Star8Outline className="absolute -right-40 -top-40 size-[28rem] animate-spin-slow text-gold-400/20" />
      <div aria-hidden className="absolute -left-40 bottom-0 size-[30rem] rounded-full bg-brand-200/30 blur-3xl" />
      <div className="container-page relative">
        <FitChecklist
          heading={
            <SectionHeading
              align="left"
              eyebrow="Before you enrol"
              title="Is this program *right for you?*"
              description="Learning the Quran well takes patience, practice and proper recitation. Tick the statements that sound like you."
            />
          }
        />
      </div>
    </section>
  );
}

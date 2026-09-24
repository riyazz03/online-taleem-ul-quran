import { cn } from "@/lib/utils";

/**
 * Infinite, CSS-only horizontal scroller. Content is rendered twice and the
 * track slides by half its width, so the loop is seamless. Pauses on hover.
 * `gap` is in rem and is applied both between items and after the last item
 * of each copy, so the seam between the two copies matches every other gap.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 48,
  gap = 1.5,
  className,
  fade = true,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  gap?: number;
  className?: string;
  fade?: boolean;
}) {
  const groupStyle = { gap: `${gap}rem`, paddingRight: `${gap}rem` };
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden py-3",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] group-active:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-stretch" style={groupStyle}>
          {children}
        </div>
        <div aria-hidden className="flex shrink-0 items-stretch" style={groupStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

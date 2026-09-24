"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.65, 0, 0.35, 1] as const;

function starPath(n: number, skip: number, r: number, cx = 100, cy = 100, rotate = -90) {
  const pts = Array.from({ length: n }, (_, k) => {
    const a = ((rotate + (k * 360) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  let d = "";
  let k = 0;
  for (let i = 0; i <= n; i++) {
    const [x, y] = pts[k];
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    k = (k + skip) % n;
  }
  return d + "Z";
}

const outer = starPath(12, 5, 88);
const inner = starPath(12, 5, 52, 100, 100, -75);
const dots = Array.from({ length: 12 }, (_, k) => {
  const a = ((-90 + k * 30) * Math.PI) / 180;
  return [+(100 + 94 * Math.cos(a)).toFixed(2), +(100 + 94 * Math.sin(a)).toFixed(2)];
});

/**
 * Twelve-fold geometric rosette whose lines draw themselves when scrolled
 * into view, then turn slowly.
 */
export function Rosette({
  className,
  stroke = "currentColor",
  strokeWidth = 0.8,
  spin = true,
  children,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  spin?: boolean;
  children?: React.ReactNode;
}) {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { pathLength: { duration: 2.4, delay, ease }, opacity: { duration: 0.3, delay } },
  });
  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 200 200" className={cn("size-full", spin && "animate-spin-slow")} aria-hidden fill="none" stroke={stroke} strokeWidth={strokeWidth}>
        <m.circle cx={100} cy={100} r={96} {...draw(0)} />
        <m.path d={outer} {...draw(0.2)} strokeLinejoin="round" />
        <m.path d={inner} {...draw(0.6)} strokeLinejoin="round" />
        <m.circle cx={100} cy={100} r={30} {...draw(1)} />
        {dots.map(([x, y], i) => (
          <m.circle
            key={i}
            cx={x}
            cy={y}
            r={2.2}
            fill={stroke}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.05, duration: 0.4 }}
          />
        ))}
      </svg>
      {children && <div className="absolute inset-0 grid place-items-center">{children}</div>}
    </div>
  );
}

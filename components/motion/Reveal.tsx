"use client";

import { m, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled on the y axis, in px. */
  y?: number;
  x?: number;
  blur?: boolean;
  scale?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "p";
  amount?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  blur = false,
  scale = 1,
  duration = 0.9,
  as = "div",
  amount = 0.2,
}: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.1) => ({ transition: { staggerChildren: stagger } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Staggers the entrance of every <StaggerItem> inside it. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  amount = 0.15,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "dd" | "dt";
}) {
  const Tag = m[as];
  return (
    <Tag className={cn(className)} variants={item}>
      {children}
    </Tag>
  );
}

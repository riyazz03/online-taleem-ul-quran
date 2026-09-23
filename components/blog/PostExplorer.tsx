"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m, type Variants } from "motion/react";
import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { Star8 } from "@/components/ui/Brand";
import { PostCard } from "./PostCard";

const ALL = "All";
const ease = [0.16, 1, 0.3, 1] as const;

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, y: 16, filter: "blur(4px)", transition: { duration: 0.25, ease } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
};

/**
 * Topic filter chips plus the article grid. Changing topic fades the
 * current grid out and staggers the matching cards in.
 */
export function PostExplorer({ posts, featuredSlug }: { posts: PostMeta[]; featuredSlug?: string }) {
  const [active, setActive] = useState(ALL);
  const [touched, setTouched] = useState(false);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [{ name: ALL, count: posts.length }, ...[...counts].map(([name, count]) => ({ name, count }))];
  }, [posts]);

  // "All" skips the featured article (it sits right above) unless it is the only one.
  const visible = useMemo(() => {
    if (active !== ALL) return posts.filter((p) => p.category === active);
    const rest = posts.filter((p) => p.slug !== featuredSlug);
    return rest.length ? rest : posts;
  }, [active, posts, featuredSlug]);

  function select(name: string) {
    setTouched(true);
    setActive(name);
  }

  const reveal = touched
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount: 0.1 } };

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2.5">
        {topics.map((t) => {
          const on = t.name === active;
          return (
            <button
              key={t.name}
              type="button"
              aria-pressed={on}
              onClick={() => select(t.name)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border py-2 pl-4 pr-2 text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:scale-[0.97]",
                on
                  ? "border-brand-900 bg-brand-900 text-cream shadow-[0_10px_30px_-12px_rgb(35_76_74/0.8)]"
                  : "border-brand-900/12 bg-white/70 text-brand-900 hover:-translate-y-0.5 hover:border-brand-900/30 hover:bg-white",
              )}
            >
              {on && <Star8 className="size-3 text-gold-300" />}
              {t.name}
              <span
                className={cn(
                  "grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[0.7rem] tabular-nums transition-colors duration-300",
                  on ? "bg-white/15 text-gold-200" : "bg-brand-50 text-brand-700",
                )}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {`Showing ${visible.length} ${visible.length === 1 ? "article" : "articles"}${active === ALL ? "" : ` about ${active}`}`}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={active}
          variants={grid}
          initial="hidden"
          exit="exit"
          {...reveal}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((post) => (
            <m.div key={post.slug} variants={item}>
              <PostCard post={post} idSuffix={`grid-${active}`} />
            </m.div>
          ))}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

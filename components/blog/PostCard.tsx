import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/motion/Interactive";
import { PostCover } from "./PostCover";

/** Blog post card: generative cover, meta, title and excerpt. Tilts on hover. */
export function PostCard({
  post,
  idSuffix = "card",
  className,
}: {
  post: PostMeta;
  idSuffix?: string;
  className?: string;
}) {
  return (
    <TiltCard max={5} className={cn("h-full", className)}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-[1.25rem] sm:rounded-[2rem] border border-brand-900/8 bg-white p-3 shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        <PostCover post={post} idSuffix={idSuffix} className="aspect-[4/3] rounded-[1rem] sm:rounded-[1.6rem]" />
        <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-6">
          <p className="flex flex-wrap items-center gap-x-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-muted">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden className="size-1 rounded-full bg-gold-400" />
            <span>{post.readingTime} min read</span>
          </p>
          <h3 className="font-display text-[1.95rem] leading-[1.08] tracking-[-0.01em] text-balance text-brand-950 transition-colors duration-300 group-hover:text-brand-700">
            {post.title}
          </h3>
          <p className="line-clamp-3 leading-relaxed text-muted">{post.excerpt}</p>
          <span className="mt-auto flex items-center justify-between pt-4 text-sm font-semibold text-brand-800">
            Read article
            <span className="grid size-10 place-items-center rounded-full bg-brand-100 text-brand-800 transition-all duration-500 ease-[var(--ease-spring)] group-hover:rotate-45 group-hover:bg-brand-800 group-hover:text-cream">
              <ArrowUpRight className="size-5" />
            </span>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}

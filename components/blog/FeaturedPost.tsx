import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "./Emphasis";
import { PostByline } from "./PostByline";
import { PostCover } from "./PostCover";

/** Large split card for the featured article at the top of the blog. */
export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Reveal y={50} amount={0.15}>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-[2.5rem] border border-brand-900/8 bg-white p-3 shadow-soft transition-shadow duration-500 hover:shadow-lift lg:grid-cols-[1.1fr_1fr]"
      >
        <PostCover
          post={post}
          size="lg"
          idSuffix="featured"
          className="aspect-[4/3] rounded-[2rem] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[32rem]"
        />
        <div className="flex flex-col items-start justify-center gap-6 px-3 pb-5 pt-8 sm:px-8 sm:pb-8 lg:px-12 lg:py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-700">
            <Sparkles className="size-3.5" />
            Featured article
          </span>
          <h2 className="font-display text-[2.5rem] leading-[1.02] tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl lg:text-[3.5rem]">
            <Emphasis text={post.display} />
          </h2>
          <p className="text-lg leading-relaxed text-muted text-pretty">{post.excerpt}</p>
          <PostByline post={post} />
          <span className="mt-2 inline-flex items-center gap-3 rounded-full bg-brand-800 py-2 pl-6 pr-2 text-sm font-semibold text-cream shadow-[0_10px_30px_-10px_rgb(35_76_74/0.7)] transition-colors duration-300 group-hover:bg-brand-900">
            Read the article
            <span className="grid size-9 place-items-center rounded-full bg-brand-400 text-brand-950 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-45">
              <ArrowUpRight className="size-4" strokeWidth={2.25} />
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

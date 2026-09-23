import Image from "next/image";
import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Academy emblem avatar, author, date and reading time. */
export function PostByline({
  post,
  className,
}: {
  post: Pick<PostMeta, "author" | "date" | "dateLabel" | "readingTime">;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 ring-1 ring-brand-900/10">
        <Image src="/brand/emblem.svg" alt="" width={22} height={24} unoptimized className="h-6 w-auto" />
      </span>
      <span className="flex flex-col text-left text-sm leading-tight">
        <span className="font-semibold text-brand-950">{post.author}</span>
        <span className="mt-0.5 text-muted">
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span aria-hidden> · </span>
          <span className="sr-only">, </span>
          {post.readingTime} min read
        </span>
      </span>
    </div>
  );
}

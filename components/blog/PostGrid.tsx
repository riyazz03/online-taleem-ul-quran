import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PostCard } from "./PostCard";

/**
 * Up to three post cards with a staggered entrance. On tablets (two
 * columns) the third card is hidden so the row never has an orphan.
 */
export function PostGrid({
  posts,
  idSuffix,
  className,
}: {
  posts: PostMeta[];
  idSuffix: string;
  className?: string;
}) {
  return (
    <Stagger className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)} stagger={0.14}>
      {posts.slice(0, 3).map((post, i) => (
        <StaggerItem key={post.slug} className={cn(i === 2 && "md:max-lg:hidden")}>
          <PostCard post={post} idSuffix={idSuffix} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

import { getAllPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PostGrid } from "./PostGrid";

/** Home-page section: the three latest blog posts. */
export function BlogPreview({ className }: { className?: string }) {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className={cn("relative py-24 sm:py-32", className)}>
      <div className="container-page flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Blog"
            title="From the *blog*"
            description="Practical notes on Tajweed, Hifz and learning the Quran online — for students, parents and families."
          />
          <Reveal delay={0.2} y={16} className="shrink-0">
            <ButtonLink href="/blog" variant="outline">
              View all posts
            </ButtonLink>
          </Reveal>
        </div>
        <PostGrid posts={posts} idSuffix="preview" />
      </div>
    </section>
  );
}

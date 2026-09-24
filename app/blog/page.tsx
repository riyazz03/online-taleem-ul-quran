import type { Metadata } from "next";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCta } from "@/components/blog/BlogCta";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostExplorer } from "@/components/blog/PostExplorer";
import { defaultShareImage } from "@/components/seo/defaults";

const description =
  "Reflections and practical learning notes on Tajweed, Hifz and learning the Quran online — for students, parents and families.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    images: [defaultShareImage],
    type: "website",
    url: "/blog",
    siteName: site.name,
    locale: "en_US",
    title: `Blog · ${site.name}`,
    description,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const topicCount = new Set(posts.map((p) => p.category)).size;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Reflections & *learning notes*"
        description="Practical guidance on Tajweed, Hifz and learning the Quran online — from the Online Taleem ul Quran team, for students, parents and families."
        actions={
          <>
            <ButtonLink href="#articles" size="lg">
              Browse articles
            </ButtonLink>
            <ButtonLink href="/contact-us" variant="outline" size="lg">
              Book a free demo
            </ButtonLink>
          </>
        }
      />

      {featured && (
        <section aria-label="Featured article" className="relative pb-8 sm:pb-12">
          <div className="container-page">
            <FeaturedPost post={featured} />
          </div>
        </section>
      )}

      <section id="articles" className="relative scroll-mt-24 pb-4 pt-20 sm:pt-28">
        <div className="container-page flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="All articles"
              title="Browse by *topic*"
              description="Short, practical reads to support your learning between classes."
            />
            <Reveal delay={0.15} y={16} className="shrink-0">
              <p className="flex items-baseline gap-2 text-sm text-muted">
                <span className="font-display text-5xl leading-none text-brand-900">{posts.length}</span>
                articles · {topicCount} topics
              </p>
            </Reveal>
          </div>
          <PostExplorer posts={posts} featuredSlug={featured?.slug} />
        </div>
      </section>

      <BlogCta />
    </>
  );
}

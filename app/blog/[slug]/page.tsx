import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { site, siteUrl } from "@/lib/site";
import { GeometricPattern, Star8 } from "@/components/ui/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { HeroTitle, fadeUp } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { PostBody } from "@/components/blog/PostBody";
import { PostByline } from "@/components/blog/PostByline";
import { PostCover } from "@/components/blog/PostCover";
import { PostGrid } from "@/components/blog/PostGrid";
import { ReadingPill } from "@/components/blog/ReadingPill";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";

type Props = { params: Promise<{ slug: string }> };

const ARTICLE_ID = "article-body";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      locale: "en_US",
      title: post.title,
      description: post.excerpt,
      publishedTime: `${post.date}T00:00:00.000Z`,
      authors: [post.author],
      section: post.category,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const url = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    articleSection: post.category,
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: post.author, url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/logo-full.svg` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        {/* Header */}
        <header className="relative isolate overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute -right-40 -top-56 size-[42rem] rounded-full bg-brand-200/50 blur-3xl" />
            <div className="absolute -left-48 top-40 size-[30rem] rounded-full bg-gold-100 blur-3xl" />
            <GeometricPattern
              id="post-hero-geo"
              className="text-brand-800 opacity-[0.06] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_15%,black,transparent)]"
            />
          </div>

          <div className="container-page flex flex-col items-center text-center">
            <div {...fadeUp(0)}>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-white/60 py-1.5 pl-3 pr-4 text-sm font-semibold text-brand-800 backdrop-blur transition-colors hover:bg-white"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                All articles
              </Link>
            </div>

            <div {...fadeUp(80)} className="fade-up mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold-200">
                <Star8 className="size-2.5 text-gold-300" />
                {post.category}
              </span>
              <span className="text-sm font-medium text-muted">{post.readingTime} min read</span>
            </div>

            <HeroTitle
              text={post.display}
              startIndex={1}
              className="mt-7 max-w-5xl font-display text-[2.75rem] leading-[1] tracking-[-0.03em] text-balance text-brand-950 sm:text-6xl lg:text-[4.75rem]"
            />

            <p {...fadeUp(420)} className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
              {post.excerpt}
            </p>

            <div {...fadeUp(520)} className="fade-up mt-9">
              <PostByline post={post} />
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="container-page">
          <div className="scale-in" style={{ "--d": "280ms" } as React.CSSProperties}>
            <PostCover
              post={post}
              size="xl"
              idSuffix="hero"
              className="aspect-[4/3] rounded-[2rem] shadow-lift sm:aspect-[16/9] sm:rounded-[2.5rem] lg:aspect-[21/9]"
            />
          </div>
        </div>

        {/* Body */}
        <div className="container-page grid gap-12 pb-8 pt-14 sm:pt-20 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-5">
              <TableOfContents items={post.toc} targetId={ARTICLE_ID} minutes={post.readingTime} />
              <div className="rounded-[1.75rem] border border-brand-900/8 bg-white/75 p-6 shadow-soft backdrop-blur">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-brand-600">Share</p>
                <ShareButtons url={url} title={post.title} className="mt-4" />
              </div>
            </div>
          </aside>

          <div className="mx-auto w-full min-w-0 max-w-[46rem] lg:mx-0">
            {post.toc.length > 0 && (
              <details className="group mb-12 rounded-[1.5rem] border border-brand-900/8 bg-white p-5 shadow-soft lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-brand-600">
                    <Star8 className="size-3 text-gold-400" />
                    In this article
                  </span>
                  <ChevronDown className="size-5 text-brand-700 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <ol className="mt-4 flex flex-col gap-1 border-t border-brand-900/8 pt-3">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex gap-3 rounded-xl px-2 py-2 text-[0.95rem] leading-snug text-brand-900 transition-colors hover:bg-brand-50"
                      >
                        <span className="font-display text-gold-500 tabular-nums">{item.number}</span>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div id={ARTICLE_ID} {...fadeUp(450)} className="fade-up">
              <PostBody html={post.html} />
            </div>

            <Reveal y={20} className="mt-16 flex flex-col items-start justify-between gap-5 border-y border-brand-900/10 py-7 sm:flex-row sm:items-center">
              <p className="flex items-center gap-3 font-display text-2xl text-brand-950">
                <Star8 className="size-4 text-gold-400" />
                Found this helpful? Share it.
              </p>
              <ShareButtons url={url} title={post.title} />
            </Reveal>

            <AuthorBox author={post.author} className="mt-12" />
          </div>
        </div>
      </article>

      <ReadingPill targetId={ARTICLE_ID} minutes={post.readingTime} />

      {related.length > 0 && (
        <section className="relative mt-16 overflow-hidden bg-sand/60 py-24 sm:mt-24 sm:py-32">
          <GeometricPattern id="keep-reading-geo" className="text-brand-800 opacity-[0.04]" />
          <div className="container-page relative flex flex-col gap-14">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                align="left"
                eyebrow="Keep reading"
                title="More from *the blog*"
                description="Continue learning with another short read."
              />
              <Reveal delay={0.2} y={16} className="shrink-0">
                <ButtonLink href="/blog" variant="outline">
                  View all posts
                </ButtonLink>
              </Reveal>
            </div>
            <PostGrid posts={related} idSuffix="related" />
          </div>
        </section>
      )}
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courseSlugs, getCourseDetail, type CourseDetail } from "@/lib/course-details";
import { site, siteUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { CoursesGrid } from "@/components/sections/CoursesGrid";
import { Steps } from "@/components/sections/Steps";
import { CourseHeroAside } from "@/components/course/CourseHeroAside";
import { CourseEssentials } from "@/components/course/CourseEssentials";
import { TajweedCurriculum } from "@/components/course/TajweedCurriculum";
import { RecitationCurriculum } from "@/components/course/RecitationCurriculum";
import { MemorizationMethod } from "@/components/course/MemorizationMethod";
import { HadithPanel } from "@/components/course/HadithPanel";
import { IbnMasudStory } from "@/components/course/IbnMasudStory";
import { EnrichSection } from "@/components/course/EnrichSection";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return courseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseDetail(slug);
  if (!course) return {};
  const path = `/course-details/${course.slug}`;
  const { title, description, keywords } = course.meta;
  const image = { url: course.summary.image, width: 1400, height: 843, alt: course.summary.imageAlt };
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: `${title} · ${site.name}`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [image.url],
    },
  };
}

function CourseJsonLd({ course }: { course: CourseDetail }) {
  const url = `${siteUrl}/course-details/${course.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.meta.title,
    description: `${course.lede} ${course.body}`,
    url,
    image: `${siteUrl}${course.summary.image}`,
    inLanguage: "en",
    keywords: course.meta.keywords.join(", "),
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      url: siteUrl,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
    },
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function Curriculum({ course }: { course: CourseDetail }) {
  const { curriculum, summary } = course;
  switch (curriculum.kind) {
    case "tajweed":
      return <TajweedCurriculum data={curriculum} arabic={summary.arabic} />;
    case "recitation":
      return <RecitationCurriculum data={curriculum} arabic={summary.arabic} />;
    case "memorization":
      return <MemorizationMethod data={curriculum} arabic={summary.arabic} />;
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseDetail(slug);
  if (!course) notFound();

  return (
    <>
      <CourseJsonLd course={course} />

      <PageHero
        eyebrow="Courses"
        title={course.heroTitle}
        description={
          <div className="flex flex-col gap-4">
            <p className="text-brand-950">{course.lede}</p>
            <p className="text-base leading-relaxed sm:text-[1.05rem]">{course.body}</p>
          </div>
        }
        actions={
          <>
            <ButtonLink href="/contact-us" size="lg">
              Book your demo
            </ButtonLink>
            <ButtonLink href={site.whatsappUrl} variant="outline" size="lg">
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="size-4" /> WhatsApp us
              </span>
            </ButtonLink>
          </>
        }
        aside={<CourseHeroAside course={course.summary} />}
      />

      <CourseEssentials items={course.essentials} />

      <Curriculum course={course} />

      <HadithPanel hadith={course.hadith} />

      {course.story && <IbnMasudStory story={course.story} />}

      <EnrichSection data={course.enrich} />

      <Steps />

      <CoursesGrid
        exclude={course.slug}
        eyebrow="Keep learning"
        title="Other *courses*"
        description="Unlock the beauty of the Quran with expert-guided, interactive courses."
        className="bg-gradient-to-b from-cream to-sand/60"
      />
    </>
  );
}

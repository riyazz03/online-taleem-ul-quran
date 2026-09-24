import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CoursesGrid } from "@/components/sections/CoursesGrid";
import { Benefits } from "@/components/sections/Benefits";
import { Steps } from "@/components/sections/Steps";
import { FreeTrial } from "@/components/sections/FreeTrial";
import { CoursesHero } from "@/components/courses-page/CoursesHero";
import { CompareCourses } from "@/components/courses-page/CompareCourses";
import { JourneyStats } from "@/components/courses-page/JourneyStats";
import { RightForYou } from "@/components/courses-page/RightForYou";
import { defaultShareImage } from "@/components/seo/defaults";

const description =
  "Explore our online Quran courses — Simplified Tajweed, Quran Recitation and Quran Memorization (Hifz). Live one-to-one and batch classes with male and female tutors, for learners from 4 years old.";

export const metadata: Metadata = {
  title: "Our Courses",
  description,
  alternates: { canonical: "/our-course" },
  openGraph: {
    images: [defaultShareImage],
    type: "website",
    siteName: site.name,
    url: "/our-course",
    title: `Our Courses · ${site.name}`,
    description,
  },
};

export default function OurCoursesPage() {
  return (
    <>
      <CoursesHero />
      <div id="courses" className="scroll-mt-10">
        <CoursesGrid
          eyebrow="Choose your path"
          title="Our *courses*"
          description="Unlock the beauty of the Quran with expert-guided, interactive courses."
          className="bg-gradient-to-b from-cream to-sand/60"
        />
      </div>
      <CompareCourses className="bg-sand/60" />
      <JourneyStats />
      <Benefits />
      <FreeTrial />
      <RightForYou />
      <Steps />
    </>
  );
}

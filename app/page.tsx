import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Audiences } from "@/components/home/Audiences";
import { HadithQuote } from "@/components/home/HadithQuote";
import { LiveLearning } from "@/components/home/LiveLearning";
import { FeatureMarquee } from "@/components/sections/FeatureMarquee";
import { Benefits } from "@/components/sections/Benefits";
import { CoursesGrid } from "@/components/sections/CoursesGrid";
import { Stats } from "@/components/sections/Stats";
import { Steps } from "@/components/sections/Steps";
import { FreeTrial } from "@/components/sections/FreeTrial";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Comparison } from "@/components/sections/Comparison";
import { BlogPreview } from "@/components/blog/BlogPreview";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { defaultShareImage } from "@/components/seo/defaults";
import { faqs } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", images: [defaultShareImage] },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureMarquee />
      <About />
      <CoursesGrid className="bg-gradient-to-b from-cream to-sand/60" />
      <LiveLearning />
      <Comparison />
      <Benefits />
      <Stats />
      <Audiences />
      <Steps />
      <FreeTrial />
      <Testimonials />
      <HadithQuote />
      <Faq />
      <FaqJsonLd items={faqs} />
      <BlogPreview />
    </>
  );
}

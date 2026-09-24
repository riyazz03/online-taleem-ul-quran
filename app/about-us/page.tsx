import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Magnetic } from "@/components/motion/Interactive";
import { Steps } from "@/components/sections/Steps";
import { FreeTrial } from "@/components/sections/FreeTrial";
import { Testimonials } from "@/components/sections/Testimonials";
import { hero } from "@/components/about/data";
import { HeroArt } from "@/components/about/HeroArt";
import { Mission } from "@/components/about/Mission";
import { Values } from "@/components/about/Values";
import { Journey } from "@/components/about/Journey";
import { Visit } from "@/components/about/Visit";
import { defaultShareImage } from "@/components/seo/defaults";

const description =
  `Connecting you with the timeless wisdom of Islam. With over 15 years of experience in Quranic education, ${site.name} offers flexible, accessible Quran learning with Tajweed for children, adults, men and women.`;

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about-us" },
  openGraph: {
    images: [defaultShareImage],
    type: "website",
    siteName: site.name,
    url: "/about-us",
    title: `About Us · ${site.name}`,
    description,
  },
};

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        actions={
          <>
            <Magnetic>
              <ButtonLink href="/contact-us" size="lg">
                Book your demo
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#mission" variant="outline" size="lg">
              Read our story
            </ButtonLink>
          </>
        }
        aside={<HeroArt />}
      />
      <Mission />
      <Values />
      <Journey />
      <Steps />
      <Visit />
      <FreeTrial />
      <Testimonials />
    </>
  );
}

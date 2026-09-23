import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Interactive";
import { CourseFan } from "./CourseFan";

export function CoursesHero() {
  return (
    <PageHero
      eyebrow="Our courses"
      title="Learn, understand & implement the *teachings of the Quran*"
      description={
        <p>
          At Online Taleem ul Quran, we offer a range of carefully designed courses to help individuals of
          all ages connect with the divine message of the Quran. Whether you are a beginner or looking to
          deepen your understanding, our expert scholars and structured curriculum ensure a transformative
          learning experience.
        </p>
      }
      actions={
        <>
          <Magnetic>
            <ButtonLink href="/contact-us" size="lg">
              Book a free demo
            </ButtonLink>
          </Magnetic>
          <ButtonLink href="#compare" variant="outline" size="lg">
            Compare courses
          </ButtonLink>
        </>
      }
      aside={<CourseFan />}
    />
  );
}

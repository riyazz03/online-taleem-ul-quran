import Homecta from "./sections/home-cta";
import LearningJourney from "./sections/LearningJourney";
import KeyBenefits from "./sections/keyBenefits";
import OurCourses from "./sections/OurCourses";
import FAQ from "./sections/faq";
import FreeTrial from "./sections/FreeTrial";
import Testimonial from "./sections/testimonial";

export default function Home() {
  return (
    <main>
      <Homecta />
      <LearningJourney />
      <KeyBenefits />
      <OurCourses />
      <FreeTrial />
      <Testimonial />
      <FAQ />
    </main>
  );
}

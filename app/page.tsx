import Homecta from "./sections/HomePage/home-cta";
import LearningJourney from "./sections/HomePage/LearningJourney";
import KeyBenefits from "./sections/HomePage/keyBenefits";
import OurCourses from "./sections/HomePage/OurCourses";
import FAQ from "./sections/HomePage/faq";
import FreeTrial from "./sections/HomePage/FreeTrial";
import Testimonial from "./sections/HomePage/testimonial";

export default function Home() {
  return (
    <main className="main">
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

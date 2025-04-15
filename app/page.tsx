import Homecta from "./sections/HomePage/home-cta";
import LearningJourney from "./sections/HomePage/LearningJourney";
import KeyBenefits from "./sections/HomePage/keyBenefits";
import FAQ from "./sections/HomePage/faq";
import FreeTrial from "./sections/HomePage/FreeTrial";
import Testimonial from "./sections/HomePage/testimonial";
import OurCoursesLive from "./sections/OurCourses/OurCoursesLive";

export default function Home() {
  return (
    <main className="main">
      <Homecta />
      <LearningJourney />
      <KeyBenefits />
      <OurCoursesLive />
      <FreeTrial />
      <Testimonial />
      <FAQ />
    </main>
  );
}

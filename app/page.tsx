import Navbar from "./components/navbar";
import Homecta from "./sections/home-cta";
import LearningJourney from "./sections/LearningJourney";
import KeyBenefits from "./sections/keyBenefits";
import OurCourses from "./sections/OurCourses";
import FAQ from "./sections/faq";
import FreeTrial from "./sections/FreeTrial";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Homecta />
      <LearningJourney />
      <KeyBenefits />
      <OurCourses />
      <FreeTrial />
      <FAQ />
    </main>
  );
}

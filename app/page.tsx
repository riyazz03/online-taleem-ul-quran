import Navbar from "./components/navbar";
import Homecta from "./sections/home-cta";
import LearningJourney from "./sections/LearningJourney";
import KeyBenefits from "./sections/keyBenefits";
import OurCourses from "./sections/OurCourses";
import FAQ from "./sections/faq";
import FreeTrial from "./sections/FreeTrial";
import Footer from "./components/footer";
import Testimonial from "./sections/testimonial";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Homecta />
      <LearningJourney />
      <KeyBenefits />
      <OurCourses />
      <FreeTrial />
      <Testimonial />
      <FAQ />
      <Footer />
    </main>
  );
}

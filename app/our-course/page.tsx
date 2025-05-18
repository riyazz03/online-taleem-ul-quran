import React from "react";
import HowWeWork from "../sections/AboutUs/HowWeWork";
import OurCourseTeaching from "../sections/OurCourses/OurCourseTeaching";
import OurJourney from "../sections/OurCourses/OurJourney";
import OurCoursesLive from "../sections/OurCourses/OurCoursesLive";
import KeyBenefits from "../sections/HomePage/keyBenefits";
import FreeTrial from "../sections/HomePage/FreeTrial";

const OurCourse = () => {
  return (
    <main className="main">
      <OurCourseTeaching />
      <OurJourney />
      <OurCoursesLive />
      <KeyBenefits />
      <FreeTrial />
      <HowWeWork />
    </main>
  );
};

export default OurCourse;

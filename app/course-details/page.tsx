"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import OurCoursesLiveCard from "@/app/components/OurCoursesLiveCard";
import "@/app/css/OurCourses/our-courses-live.css";
// import CourseDetailsPage from '../sections/CourseDetailsPage/CourseDetailsPageCtc'
// import TilawatCourseOverview from '../sections/CourseDetailsPage/TilawatCourseOverview'
// import QuranLearningOverview from '../sections/CourseDetailsPage/QuranLearningOverview'
// import PropheticHadithSection from '../sections/CourseDetailsPage/PropheticHadithSection'
// import OurCoursesLive from '../sections/OurCourses/OurCoursesLive'

const ourCoursesCard = [
  {
    image: "/Images/courses/quran-recitation.png",
    title: "Quran Recitation",
    description:
      "Unlock the Beauty of the Quran Master Recitation and Comprehension with Expert Guidance.",
    link: "/course-details/quran-recitation",
  },
  {
    image: "/Images/courses/simplified-tajweed.png",
    title: "Simplified Tajweed",
    description:
      "Master the Art of Tajweed with Expert Guidance Live, Personalized, and at Your Pace!",
    link: "/course-details/simplified-tajweed",
  },
  {
    image: "/Images/courses/arabic-language.png",
    title: "Quran Memorization",
    description:
      "Memorize the Quran with Expert Guidance Step-by-Step, Rooted in Tradition, Rewarded for Eternity.",
    link: "/course-details/quran-memorization",
  },
  {
    image: "/Images/courses/quran-memorization.png",
    title: "Arabic Language",
    description:
      "Learn to Recite with Beauty and Precision, Live Online, Anytime, Anywhere!",
    link: "/course-details/quran-recitation",
  },
];

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.35, ease: "easeOut" },
  }),
};

const CourseDetailsPage = () => {
  const sectionRef = useRef(null);

  return (
    <main className="main">
      {/* <CourseDetailsPage />
        <TilawatCourseOverview />
        <QuranLearningOverview />
        <PropheticHadithSection />
        <OurCoursesLive /> */}
      <section className="our-courses-live-section" ref={sectionRef}>
        <div className="padding-global">
          <div className="main-container our-courses-live-container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={titleVariants}
              viewport={{ once: true, amount: 0.1 }}
              className="our-courses-haading"
            >
              <h1 className="section-title">
                Our <span>Courses</span>
              </h1>
              <p className="section-description">
                Unlock the beauty of the Quran with expert-guided, interactive
                courses
              </p>
            </motion.div>
            <div className="our-courses-card-block">
              {ourCoursesCard.map((card, index) => (
                <motion.div
                  className="our-courses-card-outer-div"
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <OurCoursesLiveCard
                    images={card.image}
                    title={card.title}
                    description={card.description} link={card.link}                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetailsPage;

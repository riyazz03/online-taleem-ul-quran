"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import "@/app/css/OurCourses/our-course-teaching.css";

// Animation Variants for Text
const fadeInUpFast = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const OurCourseTeaching = () => {
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isParaInView = useInView(paraRef, { once: true, margin: "-100px" });

  return (
    <section className="our-course-teaching">
      {/* Decorative Grid Images */}
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Grid Left"
        width={500}
        height={800}
        className="our-courses-page-grid-image-left"
      />
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Grid Right"
        width={500}
        height={800}
        className="our-courses-page-grid-image-right"
      />

      {/* Main Content */}
      <div className="padding-global">
        <div className="main-container teaching-container">
          <div className="teaching-content">
            <motion.h1
              ref={titleRef}
              className="teaching-content-title"
              variants={fadeInUpFast}
              initial="hidden"
              animate={isTitleInView ? "visible" : "hidden"}
            >
              Learn, Understand & Implement the Teachings of the Quran
            </motion.h1>

            <motion.p
              ref={paraRef}
              className="teaching-content-description"
              variants={fadeInUpFast}
              initial="hidden"
              animate={isParaInView ? "visible" : "hidden"}
            >
              At Taleem-Ul-Quran, we offer a range of carefully designed courses
              to help individuals of all ages connect with the divine message of
              the Quran. Whether you are a beginner or looking to deepen your
              understanding, our expert scholars and structured curriculum
              ensure a transformative learning experience.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCourseTeaching;

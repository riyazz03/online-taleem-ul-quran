"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import OurCoursesLiveCard from "@/app/components/OurCoursesLiveCard";
import "@/app/css/OurCourses/our-courses-live.css";

const ourCoursesCard = [
  {
    image: "/Images/courses/our-courses-image1.png",
    title: "Quran Recitation",
    description:
      "Learn to Recite with Beauty and Precision, Live Online, Anytime, Anywhere!",
  },
  {
    image: "/Images/courses/our-courses-image2.png",
    title: "Simplified Tajweed",
    description:
      "Learn to Recite with Beauty and Precision, Live Online, Anytime, Anywhere!",
  },
  {
    image: "/Images/courses/our-courses-image3.png",
    title: "Quran Memorization",
    description:
      "Learn to Recite with Beauty and Precision, Live Online, Anytime, Anywhere!",
  },
  {
    image: "/Images/courses/our-courses-image4.png",
    title: "Arabic Language",
    description:
      "Learn to Recite with Beauty and Precision, Live Online, Anytime, Anywhere!",
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

const OurCoursesLive = () => {
  const sectionRef = useRef(null);

  return (
    <section className="our-courses-live-section" ref={sectionRef}>
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
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
                  description={card.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCoursesLive;

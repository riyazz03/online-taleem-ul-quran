"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import "@/app/css/HomePage/learning-journey.css";

const LearningJourney = () => {
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const titleRef = useRef(null);

  // Check if elements are in view
  const isImageInView = useInView(imageWrapperRef, { once: true, margin: "-50px" });
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section className="learning-journey">
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container learning-journey-container">
          <div className="learning-journey-content">
            {/* Heading Animation */}
            <motion.h1
              ref={titleRef}
              className="section-title learning-journey-title"
              initial={{ opacity: 0, y: 100 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Empowering Your Quran <span>Learning Journey</span>
            </motion.h1>

            <h4 className="learning-journey-description">
              At{" "}
              <span className="learning-journey-description-span">
                Online Taleem ul Quran
              </span>
              , we are committed to making Quran learning accessible,
              interactive, and enriching for students of all ages. With expert
              tutors, flexible online classes, and a structured curriculum, we
              provide a seamless learning experience tailored to your needs.
              Whether you&apos;re starting your journey, improving Tajweed, or
              memorizing the Quran, our platform ensures high-quality education
              from the comfort of your home.
            </h4>

            <motion.button
              className="learning-journey-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Know More
            </motion.button>
          </div>

          {/* Static Wrapper */}
          <div ref={imageWrapperRef} className="learning-journey-image-div">
            {/* Image Animation */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={isImageInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Image
                ref={imageRef}
                src="/Images/learning-journey-image.png"
                className="learning-journey-image"
                alt="Learning Journey"
                width={477}
                height={700}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import "@/app/css/AboutUs/about-us-guidance.css";

const AboutUsGuidance = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const isDescriptionInView = useInView(descriptionRef, { once: true, margin: "-50px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-50px" });

  return (
    <section className="about-us-guidance-section">
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container about-us-guidance-container">
          <div className="guidance-content">
            {/* Animated Title */}
            <motion.h1
              ref={titleRef}
              className="section-title"
              initial={{ opacity: 0, y: 60 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Defining <span>Our Path</span>
            </motion.h1>

            {/* Animated Description */}
            <motion.p
              ref={descriptionRef}
              className="guidance-description"
              initial={{ opacity: 0, y: 50 }}
              animate={isDescriptionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              At Taleem-ul-Quran, our vision is to create a world where the
              teachings of the Holy Quran illuminate the hearts and minds of
              every individual, guiding them toward righteousness, peace, and
              success in both this life and the Hereafter. We aspire to build a
              spiritually enlightened society where the Quran is not just read
              but deeply understood, cherished, and applied in daily life.
            </motion.p>
          </div>

          {/* Animated Image */}
          <motion.div
            ref={imageRef}
            initial={{ y: 100, opacity: 0 }}
            animate={isImageInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src="/Images/about-us-guidance-image.png"
              alt="Guidance Image"
              className="guidance-image-image"
              height={403}
              width={427}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGuidance;

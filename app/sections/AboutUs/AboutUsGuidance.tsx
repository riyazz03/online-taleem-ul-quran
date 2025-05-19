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
  const isDescriptionInView = useInView(descriptionRef, {
    once: true,
    margin: "-50px",
  });
  const isImageInView = useInView(imageRef, { once: true, margin: "-50px" });

  return (
    <section className="about-us-guidance-section">
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="right-mosque-icon"
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
              At{" "}
              <span className="learning-journey-description-span">
                Taleem-ul-Quran
              </span>
             , we&apos;ve been dedicated to teaching the Holy
              Quran for over 15 years through offline classes. Over time, we
              noticed that many adults—especially those aged 30 and above—felt
              hesitant or shy to join in-person sessions. To overcome this, we
              introduced Online Taleem-ul-Quran, creating a welcoming and
              private way for learners of all ages to connect with the Quran.
              Alhamdulillah, many students are now learning online, especially
              from the U.S., where access to Quran teachers is limited. Our
              mission continues across 4+ countries, helping hearts reconnect
              with the Quran globally.
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

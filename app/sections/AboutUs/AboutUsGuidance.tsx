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
          <div className="about-us-guidance-image-div">
            <Image
              src="/Images/about-us-guidance.png"
              alt="Guidance Image"
              className="guidance-image"
              height={403}
              width={427}
            />
          </div>
          <div className="guidance-content">
            {/* Animated Title */}
            <motion.h1
              ref={titleRef}
              className="section-title"
              initial={{ opacity: 0, y: 60 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Our <span> Mission</span> and
              <span> Purpose</span>
            </motion.h1>

            {/* Animated Description */}
            <motion.p
              ref={descriptionRef}
              className="guidance-description"
              initial={{ opacity: 0, y: 50 }}
              animate={isDescriptionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              Welcome to{" "}
              <span className="learning-journey-description-span">
                online taleem ul Quran
              </span>
              , With over{" "}
              <span className="learning-journey-description-span">
                15 years
              </span>{" "}
              of experience in Quranic education, we observed a significant gap:
              while children often have the opportunity to learn the Quran
              through part-time madrasas, many adults—particularly housewives
              and older individuals—find it difficult to access such learning.
              Their responsibilities or feelings of shyness due to age often
              prevent them from attending mosques or joining traditional
              classes, even though they have a deep desire to learn the Quran
              with proper Tajweed. <br />
              <br />
              To address this need, our team launched an online Quran education
              platform. This initiative is designed to offer flexible,
              accessible Quran learning for everyone—children, adults, men, and
              women—regardless of their schedules or circumstances. <br />
              <br />
              Alhamdulillah, after successfully running our offline Quran
              education services, we began offering online classes{" "}
              <span className="learning-journey-description-span">
                three years ago
              </span>{" "}
              . Our aim is to make the words of Allah accessible to hearts
              around the world and help preserve and strengthen faith through
              proper Quranic learning. <br />
              <br />
              Under the guidance of experienced teachers and adult supervision,
              students can now learn the Quran at their own pace and
              convenience. By enrolling in our platform, you can gain the
              ability to read the Quran correctly and beautifully with Tajweed.
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
              className="guidance-image-image hidden"
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

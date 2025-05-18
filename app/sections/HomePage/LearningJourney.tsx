"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import "@/app/css/HomePage/learning-journey.css";
import Link from "next/link";
import Button from "@/app/components/button";

const LearningJourney = () => {
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const titleRef = useRef(null);

  const isImageInView = useInView(imageWrapperRef, {
    once: true,
    margin: "-50px",
  });
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section className="learning-journey">
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="right-mosque-icon"
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
              initial={{ opacity: 0, y: 50 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Empowering Your Quran <span>Learning Journey</span>
            </motion.h1>

            <h4 className="learning-journey-description">
              At{" "}
              <span className="learning-journey-description-span">
                Online Taleem ul Quran
              </span>
              , we offer a complete and accessible Quran learning experience for
              all ages and backgrounds. Whether you&apos;re a beginner, non-Arabic
              speaker, or looking to improve Tajweed and Qirat,expert
              tutors guide you through{" "}
              <span className="learning-journey-description-span">
                flexible online and offline classes
              </span>{" "}
              at your own pace. Enjoy{" "}
              <span className="learning-journey-description-span">
                high-quality education
              </span>{" "}
              from home or in person with{" "}
              <span className="learning-journey-description-span">
                flexible weekday and weekend classes
              </span>
              . We provide{" "}
              <span className="learning-journey-description-span">
                one-to-one and batch sessions
              </span>{" "}
              to suit your needs. Female learners benefit from a safe environment,
              and children build strong Quran reading and pronunciation skills.
              We help every student master correct verse articulation, ensuring
              deep understanding and connection with the Holy Quran.
            </h4>

            <Link rel="stylesheet" href="/about-us">
              <Button text="Know More" />
            </Link>
          </div>

          {/* Static Wrapper */}
          <div ref={imageWrapperRef} className="learning-journey-image-div">
            {/* Image Animation */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={isImageInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
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

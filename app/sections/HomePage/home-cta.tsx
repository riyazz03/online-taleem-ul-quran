"use client";

import React from "react";
import "@/app/css/HomePage/home-cta.css";
import Image from "next/image";
import Button from "@/app/components/button";
import { motion } from "framer-motion";

// ** Animation Variants **
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const HOMECTA = () => {
  return (
    <motion.div
      className="home-cta-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Triggers once when in view
    >
      {/* Grid Background Images */}
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="home-page-grid-image-left"
      />
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="home-page-grid-image-right"
      />

      <div className="padding-global">
        <div className="main-container home-cta-container">
          <div className="home-cta-main">
            {/* Text Content */}
            <motion.div className="home-cta-content">
              {/* Heading */}
              <motion.div
                className="home-cta-heading"
                variants={fadeUp}
                custom={0.1} // Appears first
              >
                <div className="flex gap-4">
                  <h1 className="home-cta-title"> Your Quran </h1>
                  <motion.div
                    variants={fadeUp}
                    custom={0.2} // Image appears slightly after the heading
                  >
                    <Image
                      src="/Images/homepage/home-page-heading-image.png"
                      alt="homepage image"
                      width={205}
                      height={75}
                      className="home-page-heading-image"
                    />
                  </motion.div>
                </div>
                <h1 className="home-cta-title">Journey Begins Here</h1>
              </motion.div>

              {/* Description */}
              <motion.p
                className="home-cta-description"
                variants={fadeUp}
                custom={0.3}
              >
                Expert-led lessons, flexible schedules, lifelong learning.
              </motion.p>

              {/* Button */}
              <motion.div variants={fadeUp} custom={0.4}>
                <Button text="Book Your Demo" />
              </motion.div>
            </motion.div>

            {/* Image Blocks with Text */}
            <motion.div className="home-cta-image">
              <motion.div
                className="home-page-quran-1"
                variants={fadeUp}
                custom={0.5}
              >
                <Image
                  src="/Images/homepage/home-page-image1.png"
                  alt="Logo"
                  width={208}
                  height={208}
                  className="home-page-quran"
                />
                <motion.div
                  className="quran-text-content-background quran1"
                  variants={fadeUp}
                  custom={0.6}
                >
                  <h3>Anytime, anywhere, with expert guidance.</h3>
                </motion.div>
              </motion.div>

              <motion.div
                className="home-page-quran-2"
                variants={fadeUp}
                custom={0.7}
              >
                <Image
                  src="/Images/homepage/home-page-image2.png"
                  alt="Logo"
                  width={182}
                  height={182}
                  className="home-page-quran"
                />
                <motion.div
                  className="quran-text-content-background quran2"
                  variants={fadeUp}
                  custom={0.8}
                >
                  <h3>Learn with clarity, recite with confidence.</h3>
                </motion.div>
              </motion.div>

              <motion.div
                className="home-page-quran-3"
                variants={fadeUp}
                custom={0.9}
              >
                <Image
                  src="/Images/homepage/home-page-image3.png"
                  alt="Logo"
                  width={168}
                  height={168}
                  className="home-page-quran"
                />
                <motion.div
                  className="quran-text-content-background quran3"
                  variants={fadeUp}
                  custom={1.0}
                >
                  <h3>Guided learning for every heart and mind.</h3>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Mosque Image */}
          <motion.div
            className="homepage-mosque"
            variants={fadeUp}
            custom={1.1}
          >
            <div className="homepage-mosque-gradient"></div>
            <Image
              src="/Images/homepage/home-page-mosque.png"
              alt="mosque image"
              height={155}
              width={700}
              className="homepage-mosque-image"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HOMECTA;

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Homecta from "./sections/HomePage/home-cta";
import LearningJourney from "./sections/HomePage/LearningJourney";
import KeyBenefits from "./sections/HomePage/keyBenefits";
import FAQ from "./sections/HomePage/faq";
import FreeTrial from "./sections/HomePage/FreeTrial";
import Testimonial from "./sections/HomePage/testimonial";
import OurCoursesLive from "./sections/OurCourses/OurCoursesLive";
import Image from "next/image";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const hasClosedManually = useRef(false);

  useEffect(() => {
    // Show popup after 4 seconds
    const initialTimer = setTimeout(() => {
      setShowPopup(true);
      document.body.style.overflow = "hidden";
    }, 4000);

    // Re-show popup every 1 minute if user stays
    const interval = setInterval(() => {
      if (!hasClosedManually.current) {
        setShowPopup(true);
        document.body.style.overflow = "hidden";
      }
    }, 60000); // 60,000ms = 1 minute

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    hasClosedManually.current = true;
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="overflow-add"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/Images/adds/x.svg"
              alt="x image"
              width={55}
              height={55}
              className="close-image"
              onClick={handleClose}
            />
            <div className="overflow-center-div">
              <div className="overflow-center-div-image">
                <Image
                  src="/Images/adds/1.png"
                  alt="overflow image"
                  width={1000}
                  height={1000}
                  className="overflow-image"
                />
              </div>
              <a
                className="overflow-center-div-btn"
                href="https://forms.gle/bVk9asmTdVwqD59t5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="overflow-btn">Apply Now</p>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="main">
        <Homecta />
        <LearningJourney />
        <KeyBenefits />
        <OurCoursesLive />
        <FreeTrial />
        <Testimonial />
        <FAQ />
      </main>
    </>
  );
}

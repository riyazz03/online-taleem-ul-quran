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
  const scrollYRef = useRef(0);

  const lockScroll = () => {
    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
  };
  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollYRef.current);
  };

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowPopup(true);
      lockScroll();
    }, 4000);

    const interval = setInterval(() => {
      if (!hasClosedManually.current) {
        setShowPopup(true);
        lockScroll();
      }
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      unlockScroll(); // Just in case
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    hasClosedManually.current = true;
    unlockScroll();
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

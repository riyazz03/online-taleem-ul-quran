"use client";

import React, { useEffect, useState, useRef } from "react";
import "@/app/css/AboutUs/about-us-cta.css";
import Image from "next/image";
import Button from "@/app/components/button";
import { motion } from "framer-motion";

const AboutUsCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger animation when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="about-us-cta-section" ref={sectionRef}>
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="about-us-page-grid-image-left"
      />
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="about-us-page-grid-image-right"
      />
      <div className="padding-global">
        <div className="main-container about-us-cta-container">
          <div className="about-us-cta-main">
            <div className="about-us-cta-content">
              {/* Animated Title */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                className="about-us-cta-heading"
              >
                <h1 className="about-us-title">
                  Connecting you with the{" "}
                  <span>timeless wisdom of Islam</span>
                </h1>
              </motion.div>

              {/* Animated Description */}
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="about-us-description"
              >
                Guiding hearts with the wisdom of the Quran, Illuminating lives
                with the light of Islam.
              </motion.p>

              {/* Animated Button */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <Button text="Book Your Demo" />
              </motion.div>
            </div>

            {/* Animated Image (Pop-up Effect) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="about-us-cta-image"
            >
              <Image
                src="/Images/about-us-cta-image.png"
                alt="About Us image"
                height={350}
                width={410}
                className="about-us-image"
              />
            </motion.div>
          </div>

          <div className="about-us-mosque">
            <div className="about-us-mosque-gradient"></div>
            <Image
              src="/Images/homepage/home-page-mosque.png"
              alt="mosque image"
              height={155}
              width={700}
              className="about-us-mosque-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCTA;

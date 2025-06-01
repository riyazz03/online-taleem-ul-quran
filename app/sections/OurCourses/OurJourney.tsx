"use client";

import React from "react";
import { motion } from "framer-motion";
import "@/app/css/OurCourses/our-journey.css";

const OurJourney = () => {
  const rotationAnimation = {
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const textRotationAnimation = {
    animate: {
      rotate: -360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <section className="our-journey-section">
      <div className="padding-global">
        <div className="main-container our-journey-container">
          <div className="our-journey-content">
            <h1 className="our-journey-title">
              Our Journey of <span>Guidance & Growth</span>
            </h1>
            <p className="our-journey-description">
              We have guided over 300 students on their Quran journey,
              proudly calling them our Guided Seekers.
            </p>
          </div>
          <div className="our-journey-cirlce-block">
            <div className="stats-container">
              <motion.div
                {...rotationAnimation}
                style={{ transformOrigin: "center center" }}
                className="stats-wrapper"
              >
                <div className="circle center">
                  <motion.div
                    {...textRotationAnimation}
                    style={{ transformOrigin: "center center" }}
                    className="content"
                  >
                    <div className="number">300+</div>
                    <div className="label">Students</div>
                  </motion.div>
                </div>

                <div className="circle top-left">
                  <motion.div
                    {...textRotationAnimation}
                    style={{ transformOrigin: "center center" }}
                    className="content"
                  >
                    <div className="number">8+</div>
                    <div className="label">Countries</div>
                  </motion.div>
                </div>

                <div className="circle top-right">
                  <motion.div
                    {...textRotationAnimation}
                    style={{ transformOrigin: "center center" }}
                    className="content"
                  >
                    <div className="number">150+</div>
                    <div className="label">Graduated</div>
                  </motion.div>
                </div>

                <div className="circle middle-left">
                  <motion.div
                    {...textRotationAnimation}
                    style={{ transformOrigin: "center center" }}
                    className="content"
                  >
                    <div className="number">3+</div>
                    <div className="label">Year</div>
                  </motion.div>
                </div>

                <div className="circle middle-right">
                  <motion.div
                    {...textRotationAnimation}
                    style={{ transformOrigin: "center center" }}
                    className="content"
                  >
                    <div className="number">500+</div>
                    <div className="label">Class Taken</div>
                  </motion.div>
                </div>

                <div className="circle bottom-left">
                  <motion.div
                    {...textRotationAnimation}
                    style={{ transformOrigin: "center center" }}
                    className="content"
                  >
                    <div className="number">100+</div>
                    <div className="label">Demo</div>
                  </motion.div>
                </div>

                <div className="circle bottom-right">
                  <motion.div
                    {...textRotationAnimation}
                    style={{ transformOrigin: "center center" }}
                    className="content"
                  >
                    <div className="number">15+</div>
                    <div className="label">Instructors</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;

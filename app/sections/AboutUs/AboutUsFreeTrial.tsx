"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "@/app/css/AboutUs/about-us-free-trial.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutUsFreeTrial = () => {
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <motion.section
      className="about-us-free-trial"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Animation triggers when 20% of the section is visible
    >
      <Image
        src="/assets/Icons/left-mosque-icon.svg"
        alt="Right Arrow"
        className="right-mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container free-trial-container">
          <Image
            src="/Images/about-us-free-trial-background.png"
            alt="free trial background"
            width={1360}
            height={711}
            className="free-trial-image"
          />
          <div className="free-trial-content-block">
            {/* Title & Description Animation */}
            <motion.div
              className="free-trial-content"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h1 className="free-trial-title">Wanna hear more about us ?</h1>
              <p className="free-trial-description">
                Drop by to say Salaam and get the answers you seek in a
                welcoming space. Clear your doubts, gain clarity, and start your
                journey toward deeper faith today!
              </p>
              <div className="free-trial-time">Every Day 09:00 pm</div>
              <div className="free-trial-drop-down-section">
                <select
                  id="course"
                  name="course"
                  value={selectedCourse}
                  className="free-trial-drop-down"
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">Select Your Date</option>
                  <option value="option1">Today</option>
                  <option value="option2">Tomorrow</option>
                </select>
              </div>
            </motion.div>

            {/* Free Trial Offer Animation */}
            <motion.div
              className="about-us-trial-offer"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h2 className="about-us-trial-offer-title">Claim Your Free Trial ! ✧₊⁺</h2>
              <div className="about-us-trial-offer-features-block">
                {[
                  "Expert & Certified Tutors",
                  "Affordable & Flexible Plans",
                  "Male & Female Tutors",
                  "Islamic Studies & Duas",
                  "One to One Classes",
                  "Flexible weekday/weekend timings"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="about-us-trial-offer-features-line"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <Image
                      src="/assets/Icons/tick-icon.svg"
                      alt="Tick icon"
                      width={30}
                      height={30}
                    />
                    <p className="about-us-trial-offer-features-paragraph">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUsFreeTrial;

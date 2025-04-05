"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "@/app/css/HomePage/faq.css";
import "@/app/css/HomePage/freetrial.css";
import Button from "@/app/components/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FreeTrial = () => {
  return (
    <motion.div
      className="free-trial-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Image
        src="/assets/Icons/left-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container free-trial-container">
          <Image
            src="/Images/free-trial-background.png"
            alt="free trial background"
            width={1360}
            height={479}
            className="free-trial-image"
          />
          <div className="free-trial-content-block">
            <motion.div className="free-trial-content" variants={fadeInUp}>
              <h1 className="free-trial-title">Still deciding?</h1>
              <p className="free-trial-description">
                Come by with a hello to eliminate any confusion promptly.
              </p>
              <div className="free-trial-button">
                <Button text="Book Your Demo" />
              </div>
            </motion.div>

            <motion.div className="trial-offer" variants={fadeInUp}>
              <h2 className="trial-offer-title">Claim Your Free Trial ! ✧₊⁺</h2>
              <div className="trial-offer-features-block">
                {["Expert & Certified Tutors", "Affordable & Flexible Plans", "Male & Female Tutors", "Islamic Studies & Duas", "24/7 Learning Availability"].map((feature, index) => (
                  <motion.div key={index} className="trial-offer-features-line" variants={fadeInUp}>
                    <Image
                      src="/assets/Icons/tick-icon.svg"
                      alt="Tick icon"
                      width={30}
                      height={30}
                    />
                    <p className="trial-offer-features-paragraph">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FreeTrial;

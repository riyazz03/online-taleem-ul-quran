"use client";
import React from "react";
import Image from "next/image";
import "@/app/css/CourseDetailsPage/CourseDetailsPageCtc.css";
import Button from "@/app/components/button";
import { motion } from "framer-motion";
import Link from "next/link";

// Popup animation variant
const popupVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CourseDetailsPageCtc = () => {
  return (
    <section className="book-your-demo-home-section">
      <div className="padding-global">
        <div className="main-container book-your-demo-home-container">
          {/* Popup content */}
          <motion.div
            className="book-your-demo-home-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={popupVariant}
          >
            <h1 className="section-title book-your-demo-home-title">
              Master the Art of Quran Recitation in just <span>64 weeks</span>
            </h1>
            <div className="book-your-demo-home-description">
              Embark on a remarkable journey of Quran recitation mastery with
              our seasoned Islamic tutors at Quran Online India.
            </div>
            <Link rel="stylesheet" href="/contact-us">
              <Button text="Book Your Demo" />
            </Link>
          </motion.div>

          {/* Popup image with proper scaling */}
          <motion.div
            className="book-your-demo-home-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={popupVariant}
            style={{ width: "100%", maxWidth: "600px" }}
          >
            <div
              style={{ position: "relative", width: "100%", height: "auto" }}
            >
              <Image
                src="/Images/book-your-demo.png"
                alt="Learning Journey"
                className="learning-journey-imagee"
                width={600}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
    </section>
  );
};

export default CourseDetailsPageCtc;

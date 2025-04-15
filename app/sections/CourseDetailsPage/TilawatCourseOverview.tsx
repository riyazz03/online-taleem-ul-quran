"use client";
import React from "react";
import "@/app/css/CourseDetailsPage/tilawatcourseoverview.css";
import TilawatCards from "@/app/components/tilawatCards";
import tilawatCard from "@/app/data/tilawat-card.json";
import { motion } from "framer-motion";

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardsContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardItemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const tilawatcourse = [
  {
    title: "Certification",
    description:
      "We provide a Quran completion certificate accredited by Quran Online India",
    icon: "/assets/tilawat-card/3.svg",
  },
  {
    title: "Class Type",
    description: "Exclusive One-on-One Sessions for Uncompromised Development",
    icon: "/assets/tilawat-card/4.svg",
  },
  {
    title: "Duration",
    description: "Our best students complete quran recitation in just 64 weeks",
    icon: "/assets/tilawat-card/5.svg",
  },
];

const TilawatCourseOverview = () => {
  return (
    <section className="tilawat-course-overview-section">
      <div className="padding-global">
        <div className="main-container tilawat-course-overview-container">

          {/* Title + description */}
          <motion.div
            className="tilawat-course-overview-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariant}
          >
            <h1 className="section-title tilawat-course-overview-title">
              Say goodbye to stumbling over words and embrace the harmonious{" "}
              <span> flow of Tilawat.</span>
            </h1>

            {/* Cards from JSON (first set) */}
            <motion.div
              className="tilawat-course-overview-wrapper"
              variants={cardsContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {tilawatCard.map((card, index) => (
                <motion.div key={index} variants={cardItemVariant}>
                  <TilawatCards
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Cards from inline data (second set) */}
          <motion.div
            className="tilawat-course-overview-cards-bottom"
            variants={cardsContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {tilawatcourse.map((card, index) => (
              <motion.div key={index} variants={cardItemVariant}>
                <TilawatCards
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TilawatCourseOverview;

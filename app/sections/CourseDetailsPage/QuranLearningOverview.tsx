"use client";
import React from "react";
import "@/app/css/CourseDetailsPage/quranlearningoverview.css";
import Button from "@/app/components/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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
      staggerChildren: 0.3,
    },
  },
};

const cardItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const quranLearning = [
  {
    title: "Aqeeda",
    description:
      "Explore the essence of Islamic beliefs and principles, unraveling the depths of faith and spirituality.",
  },
  {
    title: "Seerat",
    description:
      "Immerse yourself in the extraordinary life of Prophet Muhammad (PBUH), discovering his teachings and exemplary character.",
  },
  {
    title: "Fiqh",
    description:
      "Gain a comprehensive understanding of Islamic jurisprudence and its practical applications in daily life.",
  },
  {
    title: "Surah Memorization",
    description:
      "We help you memorize 25 surahs from the 30th Juz, a significant milestone in Quran recitation.",
  },
];

const QuranLearningOverview = () => {
  return (
    <section className="quran-learning-overview-section">
      <Image
        src="/assets/Icons/left-mosque-icon.svg"
        alt="Left Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container quran-learning-overview-container">
          <motion.div
            className="quran-learning-overview-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariant}
          >
            <div className="quran-learning-overview-heading">
              <h1 className="section-title quran-learning-overview-title">
                Enrich Your recitation Journey with basics of{" "}
                <span>Aqeeda, Seerat, Fiqh & Surahs</span>
              </h1>
              <p className="section-description quran-learning-overview-description">
                Our course go beyond recitation, offering a treasure trove of
                knowledge, empowering you with a deeper understanding of
                Islam&rsquo;s core principles.
              </p>
            </div>

            {/* Cards container with staggered animation */}
            <motion.div
              className="quran-learning-overview-cards"
              variants={cardsContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {quranLearning.map((card, index) => (
                <motion.div
                  className="quran-learning-overview-card"
                  key={index}
                  variants={cardItemVariant}
                >
                  <div className="quran-learning-overview-card-title">
                    {card.title}
                  </div>
                  <div className="quran-learning-overview-card-description">
                    {card.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <div className="quran-learning-overview-btn">
              <Link rel="stylesheet" href="/contact-us">
                <Button text="Book Your Demo" />
              </Link>
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

export default QuranLearningOverview;

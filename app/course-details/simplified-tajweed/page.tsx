"use client";
import React, { useRef } from "react";
import Image from "next/image";
import "@/app/css/CourseDetailsPage/CourseDetailsPageCtc.css";
import "@/app/css/CourseDetailsPage/tilawatcourseoverview.css";
import "@/app/css/CourseDetailsPage/quranlearningoverview.css";
import "@/app/css/CourseDetailsPage/prophetichadithsection.css";
import "@/app/css/OurCourses/our-courses-live.css";
import TilawatCards from "@/app/components/tilawatCards";
import tilawatCard from "@/app/data/tilawat-card.json";
import OurCoursesLiveCard from "@/app/components/OurCoursesLiveCard";
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

const contentVariant = {
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

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.35, ease: "easeOut" },
  }),
};

// Animation Variants
// const containerVariant = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   const cardsContainerVariant = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const cardItemVariant = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

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

const ourCoursesCard = [
  {
    image: "/Images/courses/quran-recitation.png",
    title: "Quran Recitation",
    description:
      "Unlock the Beauty of the Quran Master Recitation and Comprehension with Expert Guidance.",
    link: "/course-details/quran-recitation",
  },
  // {
  //   image: "/Images/courses/simplified-tajweed.png",
  //   title: "Simplified Tajweed",
  //   description:
  //     "Master the Art of Tajweed with Expert Guidance Live, Personalized, and at Your Pace!",
  //   link: "/course-details/simplified-tajweed",
  // },
  {
    image: "/Images/courses/arabic-language.png",
    title: "Quran Memorization",
    description:
      "Memorize the Quran with Expert Guidance Step-by-Step, Rooted in Tradition, Rewarded for Eternity.",
    link: "/course-details/quran-memorization",
  },
  {
    image: "/Images/courses/quran-memorization.png",
    title: "Arabic Language",
    description:
      "Learn to Recite with Beauty and Precision, Live Online, Anytime, Anywhere!",
    link: "/course-details/quran-recitation",
  },
];

const SimplifiedTajweed = () => {
  const useSectionRef = useRef(null);

  return (
    <main className="main">
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
              <Link rel="stylesheet" href="/contact-us" >
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
                  Our Tilawat-ul-Quran course goes beyond recitation, offering a
                  treasure trove of knowledge, empowering you with a deeper
                  understanding of Islam&rsquo;s core principles.
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
                <Button text="Book Your Demo" />
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
      <section className="prophetic-hadith-section">
        <div className="padding-global">
          <div className="main-container prophetic-hadith-container">
            <div className="prophetic-hadith-content">
              {/* Title */}
              <motion.h1
                className="prophetic-hadith-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contentVariant}
                transition={{ delay: 0.2 }} // Delay added for sequential effect
              >
                The Prophet (s) once said to ibn Mas&rsquo;ud,
              </motion.h1>

              {/* Description */}
              <motion.div
                className="prophetic-hadith-content-description"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contentVariant}
                transition={{ delay: 0.4 }}
              >
                <p className="prophetic-hadith-description">
                  &ldquo;Recite to me some Qur&rsquo;ān&rdquo;
                </p>
                <p className="prophetic-hadith-description">
                  <span>He replied, </span>“O messenger of Allāh! How can I
                  recite it to you whilst it was revealed to you?”
                </p>
              </motion.div>

              {/* More Content */}
              <motion.div
                className="prophetic-hadith-content-description"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contentVariant}
                transition={{ delay: 0.6 }}
              >
                <p className="prophetic-hadith-description">
                  <span>He said, </span>“I love to hear it from other than me.”
                </p>
                <p className="prophetic-hadith-description">
                  <span>He said, </span>“So I started to read from Sūrat An-Nisā
                  until I reached the āyah that reads, &rsquo;So how will it be
                  when We bring from every nation a witness, and we bring you, O
                  Muḥammad, against these people as a witness?’”
                </p>
              </motion.div>

              {/* Final Content */}
              <motion.div
                className="prophetic-hadith-content-description"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contentVariant}
                transition={{ delay: 0.8 }}
              >
                <p className="prophetic-hadith-description">
                  <span>
                    The Prophet (sall Allāhu ʿalayhi wa sallam), at this point,
                    said to Ibn Masʿūd,{" "}
                  </span>
                  “This is enough”.
                </p>
                <p className="prophetic-hadith-description">
                  <span>Ibn Masʿūd said, </span>“I looked at him and he was
                  shedding tears.”
                </p>
              </motion.div>

              {/* Source */}
              <motion.h4
                className="prophetic-hadith-name"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contentVariant}
                transition={{ delay: 1 }}
              >
                - Sahih Muslim, Book 31, Hadith 5920.
              </motion.h4>
            </div>

            {/* Sub Title */}
            <motion.div
              className="prophetic-hadith-sub-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={contentVariant}
              transition={{ delay: 1.2 }}
            >
              <p className="prophetic-hadith-paragraph">
                The above hadith shows that the Qur&rsquo;an has an impact on
                even our Prophet (s) heart. Being the best of mankind, Prophet
                (s) possessed the most softest of hearts, so much that these
                verses brought him to tears.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="our-courses-live-section" ref={useSectionRef}>
        <Image
          src="/assets/Icons/right-mosque-icon.svg"
          alt="Right Arrow"
          className="mosque-icon"
          height={1}
          width={1}
        />
        <div className="padding-global">
          <div className="main-container our-courses-live-container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={titleVariants}
              viewport={{ once: true, amount: 0.1 }}
              className="our-courses-haading"
            >
              <h1 className="section-title">
                Our <span>Courses</span>
              </h1>
              <p className="section-description">
                Unlock the beauty of the Quran with expert-guided, interactive
                courses
              </p>
            </motion.div>
            <div className="our-courses-card-block">
              {ourCoursesCard.map((card, index) => (
                <motion.div
                  className="our-courses-card-outer-div"
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <OurCoursesLiveCard
                    images={card.image}
                    title={card.title}
                    description={card.description} link={card.link}                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SimplifiedTajweed;

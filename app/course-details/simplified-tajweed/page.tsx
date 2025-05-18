"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import "@/app/css/CourseDetailsPage/coursedetailhomectc.css";
import "@/app/css/CourseDetailsPage/coursedetailcard.css";
import "@/app/css/CourseDetailsPage/coursedetailcontent.css";
import "@/app/css/CourseDetailsPage/prophetichadithsection.css";
import "@/app/css/CourseDetailsPage/quranlearningoverview.css";
import "@/app/css/OurCourses/our-courses-live.css";
import Link from "next/link";
import Button from "@/app/components/button";
import HowWeWork from "@/app/sections/AboutUs/HowWeWork";
import OurCoursesCardMini from "@/app/components/OurCoursesCardMini";


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

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
    },
  }),
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

const ourCoursesCard = [
  {
    image: "/Images/courses/quran-recitation.png",
    title: "Quran Recitation",
    description:
      "Unlock the Beauty of the Quran Master Recitation and Comprehension with Expert Guidance.",
    link: "/course-details/quran-recitation",
  },
  {
    image: "/Images/courses/arabic-language.png",
    title: "Quran Memorization",
    description:
      "Memorize the Quran with Expert Guidance Step-by-Step, Rooted in Tradition, Rewarded for Eternity.",
    link: "/course-details/quran-memorization",
  },
];

const QuranMemorization = () => {
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const titleRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <main className="main">
      <section className="learning-journey-ctc">
        <div className=" learning-journey-container-ctc mt-0">
          <div className="learning-journey-content-ctc">
            <p className="learning-journey-subtitle-ctc">COURSES</p>
            <motion.h1
              ref={titleRef}
              className="section-title learning-journey-title-ctc"
              initial={{ opacity: 0, y: 50 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span>Simplified Tajweed Online</span>
            </motion.h1>

            <h4 className="learning-journey-description-ctc">
              Reading the Qur&apos;an with Tajweed is an obligatory act (fardh)
              for every Muslim, as it ensures correct pronunciation—especially
              crucial during Salah, Dhikr, and Qur&apos;anic recitation.
              Mispronunciation can alter the intended meanings. This course
              begins with practical Tajweed principles and then progresses to
              recitation practice. It is ideal for complete beginners who have
              never recited the Qur&apos;an or studied Tajweed before. Begin
              your online Tajweed journey from the basics, insha&apos;Allah.
              <span className="learning-journey-description-span-ctc">
                {/* Online Taleem ul Quran */}
              </span>
            </h4>

            <Link rel="stylesheet" href="/contact-us">
              <Button text="Book Your Demo" />
            </Link>
          </div>

          <div ref={imageWrapperRef} className="learning-journey-image-div-ctc">
            <div>
              <Image
                ref={imageRef}
                src="/Images/courses/simplified-tajweed.png"
                className="learning-journey-image-ctc"
                alt="Learning Journey"
                width={827}
                height={714}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="quran-memorization-cards-section">
        <div className="padding-global">
          <div className="main-container">
            <motion.div
              className="quran-memorization-card-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h1 className="section-title quran-memorization-card-title">
                Say goodbye to stumbles—embrace the <br />
                <span>smooth flow of Tilawat</span>
              </h1>
            </motion.div>

            <div className="quran-memorization-cards-container">
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  className={`quran-memorization-card card${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.2 * index}
                  variants={fadeInUp}
                >
                  <Image
                    src={`/assets/quran-memorization/card${index + 1}.svg`}
                    alt={`card${index + 1}`}
                    height={70}
                    width={70}
                    className="quran-memorization-card-icon"
                  />
                  <p className="quran-memorization-card-description">
                    {
                      [
                        <>
                          Age knows no bounds in our diverse student community,
                          welcoming learners from as young as{" "}
                          <span>4 years old.</span>
                        </>,
                        <>
                          Should complete The Mastery Phase of our{" "}
                          <span>Al-Burhan Qaida</span>
                        </>,
                        <>
                          We provide a <span>Quran completion certificate</span>{" "}
                          accredited by Quran Online India
                        </>,
                        <>
                          Exclusive One-on-One and Batch-Wise Sessions for
                          Uncompromised Development
                        </>,
                      ][index]
                    }
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="blur-effect"></div>
          </div>
        </div>
        <Image
          src="/assets/Icons/left-mosque-icon.svg"
          alt="Left Arrow"
          className="mosque-icon"
          height={1}
          width={1}
        />
      </section>
      <section className="quran-memorization-content-section">
        <div className="padding-gobal">
          <div className="main-container">
            <div className="quran-memorization-content-container-ctc">
              <div className="quran-memorization-content-heading">
                Course Outline
              </div>
              <p>
                The course will focus on the application oftajweed rules when
                reciting Quran including but not limited to the following
                topics:
              </p>
              <div className="unordered-list-class">
                <ul>
                  <li>Etiquettes of Reciting Quran</li>
                  <li>Introduction to Tajweed</li>
                  <li>Levels of Errors in Pronunciation</li>
                  <li>The Arabic Alphabet</li>
                  <li>Ta&apos;awwuz and Tasmiyah</li>
                  <li>Joining Letters</li>
                  <li>Diacritical Accents (Short Vowels)</li>
                  <li>Stops (Sukun)</li>
                  <li>Nunation (Tanween)</li>
                  <li>Long Vowels</li>
                  <li>Soft Vowels/Diphthongs (Leen)</li>
                  <li>Doubled Letters (Shadd)</li>
                  <li>Hamzah and Alif</li>
                  <li>Rules of the Enabling Hamzah (Hamzat al-Wasl)</li>
                  <li>Points of Articulation (Makhaarij)</li>
                  <li>Intensification (Qalqalah)</li>
                  <li>Rules of Waqf and Continuation</li>
                  <li>Stopping Signs</li>
                </ul>
              </div>
              <div className="quran-memorization-content-heading">
                Course Overview
              </div>
              <p>
                The tajweed course is dedicated towards learning the theoretical
                concepts of tajweed including the practical application
                oftajweed rules when reciting Quran.
              </p>
              <p>
                It is a bespoke, self-paced and one on one interactive course to
                meet your needs. The course is taught by both male and female
                Islamic scholars (including Hafiz, Mujjawwid and Qari), who have
                vast experience in online teaching.
              </p>
              <p>
                By getting registered in online Tajweed classes you can learn
                how to read the holy Quran with tajweed. There are 3 types of
                courses available:
              </p>
              <div className="sub-title-list">Level 1</div>
              <p>
                The first level of Tajweed courses online is for those students
                who want to know how to recite/read the holy Quran, they will
                learn to pronounce letters correctly and also will learn other
                basic attributes of letters e, i. Nasal sounds, idgham, qalb,
                maddahs, and types of madds, etc.
              </p>
              <div className="sub-title-list">Level 2</div>
              <p>
                The second level of online Tajweed courses consists of the
                improvement of your recitation skills by applying the Tajweed
                rules you&apos;ve already learned in the first level of online
                Tajweed courses, characteristics of the letters that
                differentiate them, avoiding the (sinful) mistakes, like making
                longer sound where you&apos;ve to make a short vowel sound, etc.
              </p>
              <div className="sub-title-list">Level 3</div>
              <p>
                This is the final level of online Tajweed courses, at this
                level, you&apos;ll learn the rules of Waqf (rules about stopping
                at the end of the verse or in the middle), and you&apos;ll also
                revise what you&apos;ve learned in the first and second level
                and implement it while reciting the Quran, some exception of
                rules you&apos;ve learned, and reading the holy Quran with
                Tarteel (in very slow motion), etc.
              </p>
              <p>
                learn tajweed online, learn quran with tajweed online, kids,
                learn tajweed rules for kids , adult, sisters, beginners,
                tajweed classes online Quran, Arabic Online Tajweed Classes
                Apply Now
              </p>
              <p>
                Female Quran Teachers for Sisters In this course we will cover
                all aspects of tajweed, you can join this course if you&apos;re
                a beginner or you know some tajweed basics and want to get the
                knowledge of tajweed deeply. this course is specially designed
                for sisters and instructed by female tajweed tutors online.
              </p>
              <p>
                What do you learn? Makharij of Huruf or Articulation Points of
                Letters. Knowledge of Sifaat. The Knowledge & Rules of Tajweed.
                Practicing of Tajweed (Implementation). Practicing with the
                teacher, she will and the student will repeat after. A brief
                explanation of Surahs (optional) Memorization of short Surahs
                with tajweed (recommended) Study Material, Handouts, etc.
              </p>

              <div className="quran-memorization-content-box">
                <p>
                  اِقْرَئُوُا الْقُرْآنَ بِلُحُوْنِ العَرَبِ وَأَصْوَاتِھَا (شعب
                  الایمان)۔ ایک اور روایت میں ارشاد ہے: حَسِّنُوا القُرْآنَ
                  بِأَصْوَاتِکُم؛ فانَّ الصَّوتَ الحَسَنَ یَزِیْدُ القُرآنَ
                  حُسْنًا (شعب الایمان)۔
                </p>
                <p>
                  &quot;Recite the Qur&apos;an with the melodies and tones of
                  the Arabs.&quot;
                  <br /> &quot;Beautify the Qur&apos;an with your voices, for a
                  beautiful voice enhances the beauty of the Qur&apos;an.&quot;
                </p>
                <p>
                  ‘قرآن کو عرب کے لہجے اور ان کی آواز میں پڑھو اچھی آواز سے قرآن
                  کوپڑھاکرواس لیے کہ اچھی آواز قرآن کے حسن کوبڑھادیتی ہے (شعب
                  الایمان)
                </p>
              </div>
            </div>
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
      <HowWeWork />
      <section className="course-detail-courses">
        <div className="padding-global">
          <div className="main-container">
            <div className="course-detail-title">
              <h1 className="section-title">
                Other <span>Courses</span>
              </h1>
            </div>
            <div className="course-detail-cards">
              {ourCoursesCard.map((card, index) => (
                <div className="course-detail-card" key={index}>
                  <OurCoursesCardMini
                    images={card.image}
                    title={card.title}
                    description={card.description}
                    link={card.link}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuranMemorization;

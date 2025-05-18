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
    image: "/Images/courses/simplified-tajweed.png",
    title: "Simplified Tajweed",
    description:
      "Master the Art of Tajweed with Expert Guidance Live, Personalized, and at Your Pace!",
    link: "/course-details/simplified-tajweed",
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
        <div className=" learning-journey-container-ctc">
          <div className="learning-journey-content-ctc">
            <p className="learning-journey-subtitle-ctc">COURSES</p>
            <motion.h1
              ref={titleRef}
              className="section-title learning-journey-title-ctc"
              initial={{ opacity: 0, y: 50 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span>Quran Memorization Online</span>
            </motion.h1>

            <h4 className="learning-journey-description-ctc">
              Are you yearning for a deeper connection with Allah (SWT) and a
              closer understanding of His divine word? Our Quran memorization
              course offers a transformative journey, guiding you step-by-step
              towards memorizing the sacred verses of the Holy Qur&apos;an. This
              isn&apos;t just about committing words to memory, it&apos;s about
              enriching your spiritual life, strengthening your faith, and
              reaping countless rewards in this life and the Hereafter
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
                src="/Images/courses/arabic-language.png"
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
                Our Approach has stood the test of time, preserved through
                generations, rooted in tradition.
              </p>
              <span className="sub-title-list">Sabaq (New Lesson)</span>
              <p>
                Sabaq means new lessons. In which the teacher Listens the
                recitation of the verses of the Holy Quran from the student and
                practices to learn these verses with correct pronunciation and
                accent first and then try to memorize it by repeating it many
                times.Instructor will help you with his Tips & Tricks to
                memorize lessons during and after the class as well. The student
                has to fully memorize this lesson before the next class.
              </p>
              <span className="sub-title-list">Sabaq Para (Revision)</span>

              <p>
                Sabaq Para means revision of the previous lessons of the same
                juzz, The student has memorized in the recent classes.The
                student will recite and the teacher will listen to him. Each
                student has to recite Sabaq Para lessons in each class after the
                new lesson so that he or she memorizes the last lessons very
                well.
              </p>
              <span className="sub-title-list"> Purana Sabaq (Old Lesson)</span>

              <p>
                Purana Sabaq means the revision of any juzz, the student has
                memorized it already. In each class, the student will recite at
                least half a juzz and the teacher will listen to him.It gives
                the student and teacher a kind of satisfaction and surety that
                the student is memorizing more and more without forgetting the
                previous lessons.
              </p>

              <div className="quran-memorization-content-box">
                <p>
                  حَدَّثَنَا مُسَدَّدٌ، حَدَّثَنَا يَحْيَى، عَنْ سُفْيَانَ،
                  حَدَّثَنِي عَاصِمُ بْنُ بَهْدَلَةَ، عَنْ زِرٍّ، عَنْ عَبْدِ
                  اللَّهِ بْنِ عَمْرٍو، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله
                  عليه وسلم&apos; يُقَالُ لِصَاحِبِ الْقُرْآنِ اقْرَأْ وَارْتَقِ
                  وَرَتِّلْ كَمَا كُنْتَ تُرَتِّلُ فِي الدُّنْيَا فَإِنَّ
                  مَنْزِلَكَ عِنْدَ آخِرِ آيَةٍ تَقْرَؤُهَا &apos;.
                </p>
                <p>
                  The Messenger of Allah (ﷺ) said: One who was devoted to the
                  Qur&spaos;an will be told to recite, ascend and recite
                  carefully as he recited carefully when he was in the world,
                  for he will reach his abode when he comes to the last verse he
                  recites.
                </p>
                <p>
                  رسول اللہ ﷺ نے فرمایا:&apos;جو شخص قرآن کا دل سے پابند رہا، اسے
                  (قیامت کے دن) کہا جائے گا: پڑھتا جا، بلند ہوتا جا، اور ٹھہر
                  ٹھہر کر اسی طرح پڑھ جیسے تو دنیا میں ٹھہر ٹھہر کر پڑھتا تھا،
                  کیونکہ تیرا مقام وہی ہوگا جہاں تو آخری آیت پڑھ کر پہنچے گا۔&apos;
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

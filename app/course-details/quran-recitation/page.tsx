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
      "We help you memorize 30 juz — a significant milestone in Quran recitation.",
  },
];

const ourCoursesCard = [
  {
    image: "/Images/courses/simplified-tajweed.png",
    title: "Simplified Tajweed",
    description:
      "Master the Art of Tajweed with Expert Guidance Live, Personalized, and at Your Pace!",
    link: "/course-details/simplified-tajweed",
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
              <span>Quran Recitation Online</span>
            </motion.h1>

            <h4 className="learning-journey-description-ctc">
              Do you aspire to recite the Holy Qur&apos;an with clarity,
              confidence, and beautiful Tajweed? Our comprehensive online Quran
              recitation course is designed to help you achieve just that.
              Whether you are a beginner taking your first steps or someone
              looking to refine their existing recitation skills, our expert
              instructors will guide you on a journey to articulate the words of
              Allah (SWT) correctly and melodiously. This course focuses on the
              practical application of Tajweed rules, ensuring you can recite
              with precision and reverence.
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
                src="/Images/courses/quran-recitation.png"
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
                          accredited by Online Taleemul Quran
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
                Learn Quranic Arabic and Connect with the Quran on a Deeper
                Level
              </p>
              <p>
                The Quran is a book of divine guidance that Muslims believe was
                revealed to the Prophet Muhammad (peace be upon him) in Arabic.
                Therefore, learning Quranic Arabic is essential for
                understanding the Quran in its original language and connecting
                with its message on a deeper level.
              </p>
              <p>
                Our Quranic Arabic course is designed to help students of all
                levels learn the Arabic alphabet, grammar, and vocabulary, as
                well as how to read and recite the Quran with proper
                pronunciation and intonation. Our experienced teachers use a
                variety of interactive teaching methods and materials to make
                learning Arabic fun and engaging.
              </p>
              <p>
                By learning Quran online, you will gain a deeper appreciation
                and understanding of the Quran&apos;s message and themes. You
                will also be able to recite and understand the Quran with more
                confidence and clarity, allowing you to connect with its divine
                guidance on a personal and spiritual level
              </p>
              <div className="quran-memorization-content-box">
                <p>
                  عَنْ عَائِشَةَ رضي اﷲ عنها قَالَتْ: قَالَ رَسُولُ اﷲِصلی الله
                  عليه وآله وسلم: الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ
                  الْکِرَامِ الْبَرَرَةِ، وَالَّذِي يَقْرَأُ الْقُرْآنَ
                  وَيَتَتَعْتَعُ فِيْهِ، وَهُوَ عَلَيْهِ شَاقٌّ لَهُ أَجْرَانِ.
                  وَفِي رِوايَةٍ: وَالَّذِي يَقْرَأُ وَهُوَ يَشْتَدُّ عَلَيْهِ
                  لَهُ أَجْرَانِ. متفق عليه و هذا لفظ مسلم.
                </p>
                <p>
                  &quot;Narrated by Hazrat &apos;Ā&apos;ishah The one who is
                  proficient in reciting the Qur&apos;an will be with the noble,
                  honorable angels (and the revered Prophets). And the one who
                  recites the Qur&apos;an with difficulty, stammering or
                  struggling, will have double the reward.&quot;
                  <br />
                  &quot;The person who recites the Qur&apos;an with great
                  difficulty and effort will receive a double reward.&quot;
                </p>
                <p>
                  &apos;حضرت عائشہ صدیقہ رضی اﷲ عنھا روایت فرماتی ہیں کہ حضور نبی
                  اکرم صلی اللہ علیہ وآلہ وسلم نے فرمایا: قرآن مجید کا ماہر معزز
                  و محترم فرشتوں اور معظم و مکرّم انبیاء علیہم السلام کے ساتھ
                  ہوگا اور وہ شخص جو قرآن پڑھتا ہو لیکن اس میں اٹکتا ہو اور
                  (پڑھنا) اس پر (کند ذہن یا موٹی زبان ہونے کی وجہ سے) مشکل ہو اس
                  کے لئے بھی دوگنا اجر ہے۔&apos;”ایک دوسری روایت میں ہے کہ وہ شخص جو
                  قرآن پڑھتا ہے حالانکہ یہ پڑھنا اس کے لئے سخت مشکل ہو، اس کے
                  لئ دو اجر ہیں۔“
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
                  Enrich Your recitation Journey with basics of
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

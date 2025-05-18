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
              Reading the Qur&apos;an with Tajweed is fardh (obligatory) for
              everyone, as it ensures correct pronunciation—especially important
              during Salah, Dhikr, or when reading the Qur&apos;an.
              Mispronunciation can alter meanings. In this course, we begin with
              practical Tajweed and then focus on recitation. It&apos;s perfect
              for complete beginners who&apos;ve never recited the Qur&apos;an
              or studied Tajweed before. Start learning Tajweed online from the
              basics, insha&apos;Allah.
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
                          spanning from <span>4 to 56 years old.</span>
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
                          Exclusive <span>One-on-One Sessions</span> for
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
                Our Approach
              </div>
              <p>
                An approach that has stood the test of time, preserved through
                generations, rooted in tradition.
              </p>
              <p>
                Sabaq (New Lesson)
                <br />
                Sabaq means new lessons. In which the teacher Listens the
                recitation of the verses of the Holy Quran from the student and
                practices to learn these verses with correct pronunciation and
                accent first and then try to memorize it by repeating it many
                times.
              </p>
              <p>
                Instructor will help you with his Tips & Tricks to memorize
                lessons during and after the class as well. The student has to
                fully memorize this lesson before the next class.
              </p>
              <p>
                Sabaq Para (Revision) Sabaq Para means revision of the previous
                lessons of the same juzz, The student has memorized in the
                recent classes.
              </p>
              <p>
                The student will recite and the teacher will listen to him. Each
                student has to recite Sabaq Para lessons in each class after the
                new lesson so that he or she memorizes the last lessons very
                well.
              </p>
              <p>
                Purana Sabaq (Old Lesson)
                <br />
                Purana Sabaq means the revision of any juzz, the student has
                memorized it already. In each class, the student will recite at
                least half a juzz and the teacher will listen to him.
              </p>
              <p>
                It gives the student and teacher a kind of satisfaction and
                surety that the student is memorizing more and more without
                forgetting the previous lessons.
              </p>
              <p>
                Reap the benefits of memorizing The Quran <br />
                Safe from the trial of Dajjal
              </p>
              <p>
                The Prophet (PBUH) said,” Whoever memorizes ten verses from the{" "}
                <br />
                beginning of Surah Al Kahf, he will be protected from the
                Dajjal.”
              </p>
              <p>(Muslim)</p>
              <p>
                The Highest Honour for the Parents of the Memoriser of the
                Qur&apos;an
              </p>
              <p>
                &apos;Whosoever recites the Quran and practices upon its
                injunctions, the reciter&apos;s parents will be given a crown on
                the day of Qiyaamat. The brightness of that crown will be more
                intense than the brightness of the sun in your actual
                house.&apos; The Prophet (PBUH) further said: &apos;What do you
                think will be given to the Hafiz (reciter) of the Quran
                himself?’”
              </p>
              <p>(Mishkaat Vol I.)</p>
              <p>Highest ranks of Jannah for the Memoriser of the Qur’an</p>
              <p>
                The Prophet (PBUH) said, &quot;It will be said to the companion
                of the Qur&apos;aan after he has entered Paradise, &apos;Recite,
                and rise!&apos; For every verse he recites he will rise one
                level (in Paradise), until he recites the last verse with him
                (i.e., in his memory).&quot;
              </p>
              <p>(Abu Dawood)</p>
              <p>
                Every letter the Memoriser of the Qur&apos;an recites is
                rewarded ten
              </p>
              <p>
                &quot;Whoever recites one Word from the Book of Allah will be
                rewarded for a good deed and ten more like it; and I don&apos;t
                say that Alif Lam Mim is a letter but Alif is a letter and Lam
                is a letter and Mim is a letter&quot;
              </p>
              <p>(Tirmidhi & Al-Dareemi)</p>
              <div className="quran-memorization-content-box">
                <p>The Messenger of Allah صلی ‌اللہ ‌علیہ ‌وسلم said:</p>
                <p>
                  who was devoted to the Quran will be told to recite, ascend
                  and recite carefully as he recited carefully when he was in
                  the world, for he will reach his abode when he comes to the
                  last verse he recites{" "}
                </p>
                <p>(Abu Dawood 1464)</p>
              </div>
            </div>
          </div>
        </div>
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
                  <span>He said, </span>&quot;So I started to read from Sūrat
                  An-Nisā until I reached the āyah that reads, &rsquo;So how
                  will it be when We bring from every nation a witness, and we
                  bring you, O Muḥammad, against these people as a
                  witness?&apos;&quot;
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
                    The Prophet (sall Allāhu &apos;alayhi wa sallam), at this
                    point, said to Ibn Mas&apos;ūd,{" "}
                  </span>
                  “This is enough”.
                </p>
                <br />
                <p className="prophetic-hadith-description">
                  <span>Ibn Mas&apos;ūd said, </span>&quot;I looked at him and
                  he was shedding tears.&quot;
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
                – Sahih Muslim, Book 31, &nbsp;&nbsp;&nbsp;&nbsp;Hadith 5920.
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

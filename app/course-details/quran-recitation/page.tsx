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
                          spanning from <span>4 to 56 years old.</span>
                        </>,
                        <>
                          Should complete The Mastery Phase of our{" "}
                          <span>Al-Hira Neo-Noorani Qaidah Course</span>
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
            <div className="quran-memorization-content-heading">
              Our Approach
            </div>
            <div className="quran-memorization-content-container-ctc">
              <br />
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
                and understanding of the Quran&apos;s message and themes. You will
                also be able to recite and understand the Quran with more
                confidence and clarity, allowing you to connect with its divine
                guidance on a personal and spiritual level
              </p>
              <p>
                The Prophet (s) once said to ibn Mas&apo;ud, <br />
                &quot;Recite to me some Qur&apos;ān&quot;
              </p>
              <p>
                He replied, &quot;O messenger of Allāh! How can I recite it to you
                whilst it was revealed to you?&quot;
              </p>
              <p>He said, &quot;I love to hear it from other than me.&quot;</p>
              <p>
                He said, &quot;So I started to read from Sūrat An-Nisā until I
                reached the āyah that reads, &apos;So how will it be when We bring
                from every nation a witness, and we bring you, O Muḥammad,
                against these people as a witness?&quot;
              </p>
              <p>
                The Prophet (sall Allāhu &apos;alayhi wa sallam), at this point, said
                to Ibn Mas&apos;ūd, “This is enough”.
              </p>
              <p>
                Ibn Mas&apos;ūd said, &quot;I looked at him and he was shedding tears. -
                Sahih Muslim, Book 31, Hadith 5920.
              </p>
              <div className="quran-memorization-content-heading">
                Attainment of Jannah
              </div>
              <p>
                &quot;The best among you are those who learn the Qur&apos;an and teach
                it.&quot; (Bukhari, Hadith No. 5027)
              </p>
              <div className="quran-memorization-content-heading">
                Source of Healing
              </div>
              <p>
                &quot;We send down in the Qur&apos;an that which is a healing and a mercy
                to those who believe.&quot; (Qur&apos;an 17:82) Forgiveness of Sins
              </p>
              <p>
                &quot;Whoever recites the Qur&apos;an and acts upon it, his parents will
                be given a crown on the Day of Resurrection, the light of which
                will be like the sun.&quot; (Abu Dawood, Hadith No. 1395)
              </p>
              <p>
                &quot;We send down in the Qur&apos;an that which is a healing and a mercy
                to those who believe.&quot; (Qur&apos;an 17:82) Increase in Rank
              </p>
              <p>
                &quot;Recite the Qur&apos;an, for it will come on the Day of Resurrection
                interceding for its companions.&quot; (Muslim, Hadith No. 804)
              </p>
              <div className="quran-memorization-content-box">
                <p>
                  عَنْ عُثْمَانَ رضي الله عنه عَنِ النَّبِيِّ صلی الله عليه وآله
                  وسلم قَالَ:خَيرُکُم مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.
                  رواه البخاري. وَفِي رِوَايَةٍ عَنْهُ: قَالَ النَّبِيُّ صلی
                  الله عليه وآله وسلم: إِنَّ أَفْضَلَکُمْ مَنْ تَعَلَّمَ
                  الْقُرآنَ وَعَلَّمَهُ. رواه البخاري. ”حضرت عثمان (بن عفان) رضی
                  اللہ عنہ سے روایت ہے کہ حضور نبی اکرم صلی اللہ علیہ وآلہ وسلم
                  نے فرمایا: تم میں سے بہتر وہ شخص ہے جو قرآن حکیم سیکھے اور
                  سکھائے۔
                </p>
                <p>
                  &quot;The best among you is the one who learns the Qur&apos;an and
                  teaches it.&quot;
                  <br />
                  &quot;Indeed, the most virtuous among you is the one who learns the
                  Qur&apos;an and teaches it.&quot;
                </p>
                <p>
                  تم میں سب سے بہتر وہ ہے جو قرآن سیکھے اور سکھائے۔, یقیناً تم
                  میں سب سے افضل وہ ہے جو قرآن سیکھتا ہے اور سکھاتا ہے۔
                </p>
              </div>
              <div className="quran-memorization-content-box">
                <p>
                  عَنْ عَائِشَةَ رضي اﷲ عنها قَالَتْ: قَالَ رَسُولُ اﷲِصلی الله
                  عليه وآله وسلم: الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ
                  الْکِرَامِ الْبَرَرَةِ، وَالَّذِي يَقْرَأُ الْقُرْآنَ
                  وَيَتَتَعْتَعُ فِيْهِ، وَهُوَ عَلَيْهِ شَاقٌّ لَهُ أَجْرَانِ.
                  وَفِي رِوايَةٍ: وَالَّذِي يَقْرَأُ وَهُوَ يَشْتَدُّ عَلَيْهِ
                  لَهُ أَجْرَانِ. متفق عليه و هذا لفظ مسلم. ”حضرت عائشہ صدیقہ
                  رضی اﷲ عنھا روایت فرماتی ہیں کہ حضور نبی اکرم صلی اللہ علیہ
                  وآلہ وسلم نے فرمایا: قرآن مجید کا ماہر معزز و محترم فرشتوں اور
                  معظم و مکرّم انبیاء علیہم السلام کے ساتھ ہوگا اور وہ شخص جو
                  قرآن پڑھتا ہو لیکن اس میں اٹکتا ہو اور (پڑھنا) اس پر (کند ذہن
                  یا موٹی زبان ہونے کی وجہ سے) مشکل ہو اس کے لئے بھی دوگنا اجر
                  ہے۔ ”ایک دوسری روایت میں ہے کہ وہ شخص جو قرآن پڑھتا ہے حالانکہ
                  یہ پڑھنا اس کے لئے سخت مشکل ہو، اس کے لئے دو اجر ہیں۔“
                </p>
                <p>
                  &quot;The one who is proficient in the Qur&apos;an will be with the
                  noble, righteous scribes (the angels); and the one who reads
                  the Qur&apos;an and stammers while reading it, finding it
                  difficult, will have a double reward.&quot;
                  <br />
                  &quot;The one who recites (the Qur&apos;an) with difficulty and hardship
                  shall receive two rewards.&quot;
                </p>
                <p>
                  قرآن مجید کا ماہر (یعنی جو روانی سے اور درست طریقے سے پڑھتا
                  ہو) معزز، نیکوکار اور بلند مرتبہ فرشتوں کے ساتھ ہوگا۔ اور وہ
                  شخص جو قرآن پڑھتا ہے لیکن اسے پڑھنے میں دقت محسوس ہوتی ہے، اس
                  کے لئے دوگنا اجر ہے۔,وہ شخص جو قرآن پڑھتا ہے حالانکہ یہ پڑھنا
                  اس کے لیے بہت مشکل ہوتا ہے، اس کے لیے دو اجر ہیں۔
                </p>
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
                    The Prophet (sall Allāhu &apos;alayhi wa sallam), at this point,
                    said to Ibn Mas&apos;ūd,{" "}
                  </span>
                  &quot;This is enough&quot;.
                </p>
                <br />
                <p className="prophetic-hadith-description">
                  <span>Ibn Mas&apos;ūd said, </span>&quot;I looked at him and he was
                  shedding tears.&quot;
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
                  Enrich Your recitation Journey with basics of
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

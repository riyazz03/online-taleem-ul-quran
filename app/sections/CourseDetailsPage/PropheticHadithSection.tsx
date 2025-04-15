"use client";
import React from "react";
import "@/app/css/CourseDetailsPage/prophetichadithsection.css";
import { motion } from "framer-motion";

// Animation Variants for individual content
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

const PropheticHadithSection = () => {
  return (
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
                <span>He replied, </span>“O messenger of Allāh! How can I recite
                it to you whilst it was revealed to you?”
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
              The above hadith shows that the Qur&rsquo;an has an impact on even
              our Prophet (s) heart. Being the best of mankind, Prophet (s)
              possessed the most softest of hearts, so much that these verses
              brought him to tears.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropheticHadithSection;

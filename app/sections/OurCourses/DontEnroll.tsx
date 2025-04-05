"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import "@/app/css/OurCourses/dont-enroll.css";
import Image from "next/image";

const dontEnroll = [
  {
    title: "❌ You Prefer Speed Over Proper Recitation",
    review:
      "We focus on reciting the Quran with correct Tajweed, ensuring proper pronunciation, reflection, and understanding of its meanings.",
  },
  {
    title: "❌ You Are Not Open to Modern Teaching Methods",
    review:
      "Our approach blends traditional Islamic teachings with effective modern learning techniques to enhance comprehension and retention.",
  },
  {
    title: "❌ You Cannot Dedicate Consistent Practice Time   ",
    review:
      "Regular practice is essential for mastering Quranic recitation. If you or your child cannot commit to consistent learning, our program may not be the right fit.",
  },
  {
    title: "❌ You Are Not Ready for a Long-Term Learning Journey",
    review:
      "Quranic learning is a continuous process that requires dedication and patience. We emphasize building a strong foundation for lifelong understanding and recitation.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.35,
      ease: "easeOut",
    },
  }),
};

const DontEnroll = () => {
  const sectionRef = useRef(null);

  return (
    <section className="dont-enroll-section" ref={sectionRef}>
      <Image
        src="/assets/Icons/left-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container dont-enroll-container">
          <div className="dont-enroll-heading">
            <h1 className="section-title dont-enroll-title">
              Don&apos;t <span>Enroll</span> with us
            </h1>
          </div>
          <div className="dont-enroll-cards">
            {dontEnroll.map((card, index) => (
              <motion.div
                className="dont-enroll-card"
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={index}
              >
                <h3 className="dont-enroll-card-title">{card.title}</h3>
                <p className="dont-enroll-card-review">{card.review}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DontEnroll;

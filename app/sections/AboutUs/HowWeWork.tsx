"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import howwework from "@/app/data/how-we-work.json";
import "@/app/css/howwework.css";
import HowWeWorkCard from "@/app/components/howWeWorkCard";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.3, // Stagger effect
    },
  }),
};

const arrowVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
      delay: index * 0.5,
    },
  }),
};

const HowWeWork = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="how-we-work-section pb-10">
      <div className="padding-global">
        <div className="main-container how-we-work-container">
          <div className="how-we-work-title">
            <h1 className="section-title">
              How We <span>Work</span>
            </h1>
          </div>
          <div className="cards-outer-div">
            <div className="top-arrow">
              {[...Array(2)].map((_, index) => (
                <motion.div
                  key={index}
                  className="top-arrow-icon"
                  variants={arrowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <Image
                    src="/assets/how-we-work/arrowTop.svg"
                    alt="Top Arrow"
                    height={46}
                    width={124}
                  />
                </motion.div>
              ))}
            </div>

            <div className="card-content">
              {howwework.map((card, index) => (
                <motion.div
                  key={index}
                  className="how-we-work-card-wrapper"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <HowWeWorkCard title={card.title} icon={card.icon} />
                </motion.div>
              ))}
            </div>

            <div className="bottom-arrow">
              {[...Array(2)].map((_, index) => (
                <motion.div
                  key={index}
                  className="bottom-arrow-icon"
                  variants={arrowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <Image
                    src="/assets/how-we-work/arrowBottom.svg"
                    alt="Bottom Arrow"
                    height={46}
                    width={124}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;

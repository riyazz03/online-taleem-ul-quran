"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "@/app/css/HomePage/keyBenefits.css";
import keybenefits from "@/app/data/key-benefits.json";
import KeyBenefitsCard from "@/app/components/keyBenefitsCard";

const KeyBenefits = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <div className="key-benefits-section" ref={sectionRef}>
      <div className="padding-global">
        <div className="main-container key-benefits-container">
          {/* Heading Animation */}
          <motion.h1
            ref={titleRef}
            className="section-title key-benefits-title"
            initial={{ opacity: 0, y: 50 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Key Benefits of <span>Our Program</span>
          </motion.h1>

          {/* Cards Animation */}
          <div className="key-benefits-cards">
            {keybenefits.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <KeyBenefitsCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyBenefits;

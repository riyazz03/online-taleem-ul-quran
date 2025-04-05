"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import FaqsCard from "@/app/components/FaqsCard";
import faqdata from "@/app/data/faq.json";
import "@/app/css/HomePage/faq.css";

const FAQ = () => {
  const sectionRef = useRef(null);

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="padding-global">
        <div className="main-container faq-container">
          <div className="faq-heading">
            {/* Animated Heading */}
            <motion.h1
              className="section-title"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
            >
              Got Questions? <br /> <span> We&apos;ve Got Answers!</span>
            </motion.h1>
            
            <motion.p
              className="section-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              Explore our FAQs to learn more about our classes, schedules, and teaching methods.
            </motion.p>
          </div>
          
          <div className="faq-qa">
            {faqdata.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 * index }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <FaqsCard question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;


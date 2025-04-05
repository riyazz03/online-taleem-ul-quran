"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "@/app/css/HomePage/ourCourses.css";
import coursedata from "@/app/data/courseCard.json";
import CoursesCard from "@/app/components/coursesCard";

const OurCourses = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const isDescriptionInView = useInView(descriptionRef, { once: true, margin: "-50px" });

  return (
    <div className="our-courses-section" ref={sectionRef}>
      <div className="padding-global">
        <div className="main-container our-courses-container">
          <div className="our-courses-content">
            {/* Title Animation */}
            <motion.h1
              className="section-title"
              ref={titleRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Our <span>Courses</span>
            </motion.h1>

            {/* Description Animation */}
            <motion.p
              className="section-description our-courses-description"
              ref={descriptionRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isDescriptionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Unlock the beauty of the Quran with expert-guided, interactive courses
            </motion.p>
          </div>

          {/* Cards Animation */}
          <div className="our-courses-cards">
            {coursedata.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <CoursesCard
                  images={card.src}
                  title={card.name}
                  buttonText="Learn More"
                  width={card.width}
                  height={card.height}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCourses;

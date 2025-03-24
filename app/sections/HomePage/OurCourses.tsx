"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/app/css/HomePage/ourCourses.css";
import coursedata from "@/app/data/courseCard.json";
import CoursesCard from "@/app/components/coursesCard";

gsap.registerPlugin(ScrollTrigger);

const OurCourses = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter((el) => el !== null);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 150 }, 
      {
        opacity: 1,
        y: 0, 
        duration: 1,
        stagger: 0.35, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse", 
        },
      }
    );
  }, []);

  return (
    <div className="our-courses-section" ref={sectionRef}>
      <div className="padding-global">
        <div className="main-container our-courses-container">
          <div className="our-courses-content">
            <h1 className="section-title">
              Our <span>Courses</span>
            </h1>
            <p className="section-description our-courses-description">
              Unlock the beauty of the Quran with expert-guided, interactive
              courses
            </p>
          </div>
          <div className="our-courses-cards">
            {coursedata.map((card, index) => (
              <div ref={(el) => { if (el) cardsRef.current[index] = el; }} key={index}>
                <CoursesCard
                  images={card.src}
                  title={card.name}
                  buttonText="Learn More"
                  width={card.width}
                  height={card.height}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCourses;

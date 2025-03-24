"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "@/app/css/OurCourses/our-courses-live.css";
import Image from "next/image";
import OurCoursesLiveCard from "@/app/components/OurCoursesLiveCard";

const ourCoursesCard = [
  {
    image: "/Images/courses/our-courses-image1.png",
    title: "Quran Recitation",
    description:
      "Learn to Recite with Beauty and Precision,Live Online, Anytime, Anywhere!",
  },
  {
    image: "/Images/courses/our-courses-image2.png",
    title: "Simplified Tajweed",
    description:
      "Learn to Recite with Beauty and Precision,Live Online, Anytime, Anywhere!",
  },
  {
    image: "/Images/courses/our-courses-image3.png",
    title: "Quran Memorization",
    description:
      "Learn to Recite with Beauty and Precision,Live Online, Anytime, Anywhere!",
  },
  {
    image: "/Images/courses/our-courses-image4.png",
    title: "Arabic Language",
    description:
      "Learn to Recite with Beauty and Precision,Live Online, Anytime, Anywhere!",
  },
];

const OurCoursesLive = () => {
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
    <section className="our-courses-live-section" ref={sectionRef}>
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container our-courses-live-container">
          <div className="our-courses-haading">
            <h1 className="section-title">
              Our <span>Courses</span>
            </h1>
            <p className="section-description">
              Unlock the beauty of the Quran with expert-guided, interactive
              courses
            </p>
          </div>
          <div className="our-courses-card-block">
            {ourCoursesCard.map((card, index) => (
              <div
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                key={index}
              >
                <OurCoursesLiveCard
                  key={index}
                  images={card.image}
                  title={card.title}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCoursesLive;

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/app/css/HomePage/keyBenefits.css";
import keybenefits from "@/app/data/key-benefits.json";
import KeyBenefitsCard from "@/app/components/keyBenefitsCard";

gsap.registerPlugin(ScrollTrigger);

const KeyBenefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter((el) => el !== null);

    gsap.set(cards, { opacity: 1 });

    gsap.from(cards, {
      x: -100,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <div className="key-benefits-section" ref={sectionRef}>
      <div className="padding-global">
        <div className="main-container key-benefits-container">
          <h1 className="section-title key-benefits-title">
            Key Benefits of <span>Our Program</span>
          </h1>
          <div className="key-benefits-cards">
            {keybenefits.map((card, index) => (
              <div
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                key={index}
              >
                <KeyBenefitsCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyBenefits;

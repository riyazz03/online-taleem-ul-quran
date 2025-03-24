"use client";
import React, { useEffect, useRef } from "react";
import howwework from "@/app/data/how-we-work.json";
import "@/app/css/howwework.css";
import HowWeWorkCard from "@/app/components/howWeWorkCard";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    // Ensure the elements start at their default position before animation
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, { opacity: 0, x: -100 });
      }
    });
  
    gsap.set(".top-arrow-icon, .bottom-arrow-icon", { opacity: 0, scale: 0 });
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 50%",
        toggleActions: "play none none none",
        once: true, // Play the animation only once
      },
    });
  
    cardsRef.current.forEach((card, index) => {
      if (card) {
        tl.to(card, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      }
  
      if (index % 2 === 0) {
        tl.to(`.top-arrow-icon:nth-of-type(${index / 2 + 1})`, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      } else {
        tl.to(`.bottom-arrow-icon:nth-of-type(${Math.ceil(index / 2)})`, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
    });
  
    return () => {
      tl.kill(); // Cleanup GSAP animations when component unmounts
    };
  }, []);
  
  
  

  return (
    <section ref={sectionRef} className="how-we-work-section">
      <div className="padding-global">
        <div className="main-container how-we-work-container">
          <div className="how-we-work-title">
            <h1 className="section-title">
              How We <span>Work</span>
            </h1>
          </div>
          <div className="cards-outer-div">
            <div className="top-arrow">
              <Image
                src="/assets/how-we-work/arrowTop.svg"
                alt="Top Arrow"
                className="top-arrow-icon"
                height={46}
                width={124}
              />
              <Image
                src="/assets/how-we-work/arrowTop.svg"
                alt="Top Arrow"
                className="top-arrow-icon"
                height={46}
                width={124}
              />
            </div>
            <div className="card-content">
              {howwework.map((card, index) => (
                <div
                  key={index}
                  ref={(el)=> {
                    if (el) cardsRef.current.push(el);
                  }}
                >
                  <HowWeWorkCard title={card.title} icon={card.icon} />
                </div>
              ))}
            </div>
            <div className="bottom-arrow">
              <Image
                src="/assets/how-we-work/arrowBottom.svg"
                alt="Bottom Arrow"
                className="bottom-arrow-icon"
                height={46}
                width={124}
              />
              <Image
                src="/assets/how-we-work/arrowBottom.svg"
                alt="Bottom Arrow"
                className="bottom-arrow-icon"
                height={46}
                width={124}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;

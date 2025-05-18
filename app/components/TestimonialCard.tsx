"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import "../css/testimonialCard.css";

export default function Cards({
  image,
  name,
  review,
}: {
  image: string;
  name: string;
  review: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.set(cardRef.current, { transformOrigin: "center" });
    }
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scaleX: 1, 
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scaleX: 1, 
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="cards"
      style={{ padding: "20px", borderRadius: "10px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={image} alt="Avatar" className="card-avatar" width={86} height={86} />
      <div className="card-name-container">
        {/* <div className="card-name-dot"></div> */}
        <h3 className="card-name">{name}</h3>
      </div>
      <div className="card-content">
        <p className="card-review">&quot;{review}&quot;</p>
      </div>
    </div>
  );
}

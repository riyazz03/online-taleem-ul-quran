"use client";

import React from "react";
import "../css/home-cta.css";
import Image from "next/image";

const HOMECTA = () => {
  return (
    <div className="home-cta-section">
      <div className="main-container home-cta-container">
      </div>
      <Image
            src="/assets/Icons/right-mosque-icon.svg"
            alt="Right Arrow"
            className='mosque-icon'
            height={1}
            width={1}
          />
    </div>
  );
};

export default HOMECTA;

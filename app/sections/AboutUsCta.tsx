"use client";

import React from "react";
import "../css/about-us-cta.css";
import Image from "next/image";
import Button from "../components/button";

const AboutUsCTA = () => {
  return (
    <div className="about-us-cta-section">
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="about-us-page-grid-image-left"
      />
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="about-us-page-grid-image-right"
      />
      <div className="main-container about-us-cta-container">
        <div className="about-us-cta-main">
          <div className="about-us-cta-content">
            <div className="about-us-cta-heading">
              {/* beginning of the heading text */}
              <div className="about-us-cta-title">
                <h1 className="about-us-title">
                  Connecting you with the <span>timeless wisdom of Islam</span>{" "}
                </h1>
              </div>
            </div>
            {/* End of the Heading text */}
            <p className="about-us-description">
              Guiding hearts with the wisdom of the Quran, Illuminating lives
              with the light of Islam.
            </p>
            <Button text="Book Your Demo" />
          </div>
          <div className="about-us-cta-image">
            <div className="about-us-image">
              <Image
                src="/Images/about-us-cta-image.png"
                alt="About Us image"
                height={350}
                width={410}
                className="about-us-image"
              />
            </div>
          </div>
        </div>
        <div className="about-us-mosque">
          <div className="about-us-mosque-gradient"></div>
          <Image
            src="/Images/homepage/home-page-mosque.png"
            alt="mosque image"
            height={155}
            width={700}
            className="about-us-mosque-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCTA;

"use client";

import React from "react";
import "../css/home-cta.css";
import Image from "next/image";
import Button from "../components/button";

const HOMECTA = () => {
  return (
    <div className="home-cta-section">
      <div className=" home-cta-container">
        <div className="home-cta-main">
          <div className="home-cta-content">
            <div className="home-cta-heading">
              {/* beginning of the heading text */}
              <div className="flex gap-4">
                <h1 className="home-cta-title"> Your Quran </h1>
                <Image
                  src="/Images/homepage/home-page-heading-image.png"
                  alt="homepage image"
                  width={205}
                  height={75}
                />
              </div>
              <h1 className="home-cta-title">Journey Begins Here</h1>
            </div>
            {/* End of the Heading text */}
            <p className="home-cta-description">
              Expert-led lessons, flexible schedules, lifelong learning.
            </p>
            <Button text="Book Your Demo" />
          </div>
          <div className="home-cta-image">
            <div className="home-page-quran-1">
              <Image
                src="/Images/homepage/home-page-image1.png"
                alt="Logo"
                width={240}
                height={240}
                className="home-page-quran"
              />
              <div className="quran-text-content-background quran1">
                <h3>Anytime, anywhere, with expert guidance.</h3>
              </div>
            </div>
            {/*End of first quran block */}
            <div className="home-page-quran-2">
              <Image
                src="/Images/homepage/home-page-image2.png"
                alt="Logo"
                width={200}
                height={200}
                className="home-page-quran"
              />
              <div className="quran-text-content-background quran2">
                <h3>Learn with clarity, recite with confidence.</h3>
              </div>
            </div>
            {/* End of second quran block*/}
            <div className="home-page-quran-3">
              <Image
                src="/Images/homepage/home-page-image3.png"
                alt="Logo"
                width={200}
                height={200}
                className="home-page-quran"
              />
              <div className="quran-text-content-background quran3">
                <h3>Guided learning for every heart and mind.</h3>
              </div>
            </div>
            {/* End of third quran block*/}
          </div>
        </div>
        <div className="homepage-mosque">
          <div className="homepage-mosque-gradient"></div>
          <Image
            src="/Images/homepage/home-page-mosque.png"
            alt="mosque image"
            height={155}
            width={700}
            className="homepage-mosque-image"
          />
        </div>
      </div>
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
    </div>
  );
};

export default HOMECTA;

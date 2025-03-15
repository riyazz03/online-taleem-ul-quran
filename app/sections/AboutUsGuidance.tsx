import React from "react";
import Image from "next/image";
import "../css/about-us-guidance.css";

const AboutUsGuidance = () => {
  return (
    <section className="about-us-guidance-section">
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="main-container about-us-guidance-container">
        <div className="guidance-content">
          <h1 className="section-title">
            Defining <span>Our Path</span>
          </h1>
          <p className="guidance-description">
            At Taleem-ul-Quran, our vision is to create a world where the
            teachings of the Holy Quran illuminate the hearts and minds of every
            individual, guiding them toward righteousness, peace, and success in
            both this life and the Hereafter. We aspire to build a spiritually
            enlightened society where the Quran is not just read but deeply
            understood, cherished, and applied in daily life.
          </p>
        </div>
        <div className="guidance-image">
          <Image
            src="/Images/about-us-guidance-image.png"
            alt="Guidance Image"
            className="guidance-image-image"
            height={403}
            width={427}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsGuidance;

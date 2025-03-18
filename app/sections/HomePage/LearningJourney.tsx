import React from "react";
import Image from "next/image";
import "@/app/css/HomePage/learning-journey.css";

const LearningJourney = () => {
  return (
    <section className="learning-journey">
      <Image
        src="/assets/Icons/right-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container learning-journey-container">
          <div className="learning-journey-content">
            <h1 className="section-title learning-journey-title">
              Empowering Your Quran <span>Learning Journey</span>
            </h1>
            <h4 className="learning-journey-description">
              At{" "}
              <span className="learning-journey-description-span">
                Online Taleem ul Quran
              </span>
              , we are committed to making Quran learning accessible,
              interactive, and enriching for students of all ages. With expert
              tutors, flexible online classes, and a structured curriculum, we
              provide a seamless learning experience tailored to your needs.
              Whether you&apos;re starting your journey, improving Tajweed, or
              memorizing the Quran, our platform ensures high-quality education
              from the comfort of your home.
            </h4>
            <button className="learning-journey-btn">Know More</button>
          </div>
          <div className="learning-journey-image-div">
            <Image
              src="/Images/learning-journey-image.png"
              className="learning-journey-image"
              alt="Learning Journey"
              width={477}
              height={750}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;

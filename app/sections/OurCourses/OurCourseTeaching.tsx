import React from "react";
import Image from "next/image";
import "@/app/css/our-course-teaching.css";

const OurCourseTeaching = () => {
  return (
    <section className="our-course-teaching">
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="our-courses-page-grid-image-left"
      />
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="our-courses-page-grid-image-right"
      />
      <div className="main-container teaching-container">
        <div className="teaching-content">
          <h1 className="teaching-content-title">
            Learn, Understand & Implement the Teachings of the Quran
          </h1>
          <p className="teaching-content-description">
            At Taleem-Ul-Quran, we offer a range of carefully designed courses
            to help individuals of all ages connect with the divine message of
            the Quran. Whether you are a beginner or looking to deepen your
            understanding, our expert scholars and structured curriculum ensure
            a transformative learning experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurCourseTeaching;

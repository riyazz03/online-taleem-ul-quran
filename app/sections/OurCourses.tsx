import React from "react";
import "../css/ourCourses.css";
import coursedata from "../data/courseCard.json";
import CoursesCard from "../components/coursesCard";

const OurCourses = () => {
  return (
    <div className="our-courses-section">
      <div className="main-container our-courses-container">
        <div className="our-courses-content">
          <h1 className="section-title">
            Our <span>Courses</span>
          </h1>
          <p className="section-description">
            Unlock the beauty of the Quran with expert-guided, interactive
            courses
          </p>
        </div>
        <div className="our-courses-cards">
          {coursedata.map((card, index) => (
            <CoursesCard 
              key={index} 
              images={card.src} 
              title={card.name} 
              buttonText="Learn More" 
              width={card.width}
              height={card.height}
            />
          ))}
        </div>
      </div> 
    </div>  // End of our-courses-section
  );
};

export default OurCourses;

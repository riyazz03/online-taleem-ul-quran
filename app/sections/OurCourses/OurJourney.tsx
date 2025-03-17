import React from "react";
import "@/app/css/our-journey.css";

const OurJourney = () => {
  return (
    <section className="our-journey-section">
      <div className="main-container our-journey-container">
        <div className="our-journey-content">
          <h1 className="our-journey-title">
            Our Journey of <span>Guidance & Growth</span>
          </h1>
          <p className="our-journey-description">
            We have guided over 300 students on their journey toward Jannah,
            proudly calling them our "Guided Seekers."
          </p>
        </div>
        <div className="our-journey-cirlce-block">
          <div className="stats-container">
            <div className="stats-wrapper">
              <div className="circle center">
                <div className="content">
                  <div className="number">1000+</div>
                  <div className="label">Demo</div>
                </div>
              </div>

              <div className="circle top-left">
                <div className="content">
                  <div className="number">20+</div>
                  <div className="label">Countries</div>
                </div>
              </div>

              <div className="circle top-right">
                <div className="content">
                  <div className="number">200+</div>
                  <div className="label">QQI Grads</div>
                </div>
              </div>

              <div className="circle middle-left">
                <div className="content">
                  <div className="number">1+</div>
                  <div className="label">Year</div>
                </div>
              </div>

              <div className="circle middle-right">
                <div className="content">
                  <div className="number">50k</div>
                  <div className="label">Class Taken</div>
                </div>
              </div>

              <div className="circle bottom-left">
                <div className="content">
                  <div className="number">120+</div>
                  <div className="label">Students</div>
                </div>
              </div>

              <div className="circle bottom-right">
                <div className="content">
                  <div className="number">15+</div>
                  <div className="label">Instructors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;

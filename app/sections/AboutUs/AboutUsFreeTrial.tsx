"use client";

import Image from "next/image";
import React, { useState } from "react";
import "@/app/css/AboutUs/about-us-free-trial.css";

const AboutUsFreeTrial = () => {
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <section className="about-us-free-trial">
      <Image
        src="/assets/Icons/left-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="padding-global">
        <div className="main-container free-trial-container">
          <Image
            src="/Images/about-us-free-trial-background.png"
            alt="free trial background"
            width={1360}
            height={711}
            className="free-trial-image"
          />
          <div className="free-trial-content-block">
            <div className="free-trial-content">
              <h1 className="free-trial-title">Wanna hear more about us ?</h1>
              <p className="free-trial-description">
                Drop by to say Salaam and get the answers you seek in a
                welcoming space. Clear your doubts, gain clarity, and start your
                journey toward deeper faith today!
              </p>
              <div className="free-trial-time">Every Day 09:00 pm</div>
              <div className="free-trial-drop-down-section">
                <select
                  id="course"
                  name="course"
                  value={selectedCourse}
                  className="free-trial-drop-down"
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">Select Your Date</option>
                  <option value="option1">Today</option>
                  <option value="option2">Tomorrow</option>
                </select>
              </div>
            </div>
            <div className="trial-offer">
              <h2 className="trial-offer-title">Claim Your Free Trial ! ✧₊⁺</h2>
              <div className="trial-offer-features-block">
                <div className="trial-offer-features-line">
                  <Image
                    src="/assets/Icons/tick-icon.svg"
                    alt="Tick icon"
                    width={30}
                    height={30}
                  />
                  <p className="trial-offer-features-paragraph">
                    Expert & Certified Tutors
                  </p>
                </div>
                <div className="trial-offer-features-line">
                  <Image
                    src="/assets/Icons/tick-icon.svg"
                    alt="Tick icon"
                    width={30}
                    height={30}
                  />
                  <p className="trial-offer-features-paragraph">
                    Affordable & Flexible Plans
                  </p>
                </div>
                <div className="trial-offer-features-line">
                  <Image
                    src="/assets/Icons/tick-icon.svg"
                    alt="Tick icon"
                    width={30}
                    height={30}
                  />
                  <p className="trial-offer-features-paragraph">
                    Male & Female Tutors
                  </p>
                </div>
                <div className="trial-offer-features-line">
                  <Image
                    src="/assets/Icons/tick-icon.svg"
                    alt="Tick icon"
                    width={30}
                    height={30}
                  />
                  <p className="trial-offer-features-paragraph">
                    Islamic Studies & Duas
                  </p>
                </div>
                <div className="trial-offer-features-line">
                  <Image
                    src="/assets/Icons/tick-icon.svg"
                    alt="Tick icon"
                    width={30}
                    height={30}
                  />
                  <p className="trial-offer-features-paragraph">
                    24/7 Learning Availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsFreeTrial;

import React from "react";
import Image from "next/image";
import "../css/freetrial.css";
import Button from "../components/button";

const FreeTrial = () => {
  return (
    <div className="free-trial-section">
      <Image
        src="/assets/Icons/left-mosque-icon.svg"
        alt="Right Arrow"
        className="mosque-icon"
        height={1}
        width={1}
      />
      <div className="main-container free-tail-container">
        <Image
          src="/Images/free-trial-background.png"
          alt="free trial background"
          width={1360}
          height={479}
          className="free-trial-image"
        />
        <div className="free-trial-content-block">
          <div className="free-trial-content">
            <h1 className="free-trial-title">Still deciding?</h1>
            <p className="free-trial-description">
              Come by with a hello to eliminate any confusion promptly.
            </p>
            <Button text="Book Your Demo" />
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
  );
};

export default FreeTrial;

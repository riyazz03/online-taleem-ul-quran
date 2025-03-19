import React from "react";
import howwework from "@/app/data/how-we-work.json";
import "@/app/css/howwework.css";
import HowWeWorkCard from "@/app/components/howWeWorkCard";
import Image from "next/image";

const HowWeWork = () => {
  return (
    <section className="how-we-work-section">
      <div className="padding-global">
        <div className="main-container how-we-work-container">
          <div className="how-we-work-title">
            <h1 className="section-title">
              How We <span>Work</span>
            </h1>
          </div>
          <div className="cards-outer-div">
            <div className="top-arrow">
              <Image
                src="/assets/how-we-work/arrowTop.svg"
                alt="Top Arrow"
                className="top-arrow-icon"
                height={46}
                width={124}
              />
              <Image
                src="/assets/how-we-work/arrowTop.svg"
                alt="Top Arrow"
                className="top-arrow-icon"
                height={46}
                width={124}
              />
            </div>
            <div className="card-content">
              {howwework.map((card, index) => (
                <HowWeWorkCard
                  key={index}
                  title={card.title}
                  icon={card.icon}
                />
              ))}
            </div>
            <div className="bottom-arrow">
              <Image
                src="/assets/how-we-work/arrowBottom.svg"
                alt="Bottom Arrow"
                className="bottom-arrow-icon"
                height={46}
                width={124}
              />
              <Image
                src="/assets/how-we-work/arrowBottom.svg"
                alt="Bottom Arrow"
                className="bottom-arrow-icon"
                height={46}
                width={124}
              />
            </div>
          </div>
          {/* <HowWeWorkCard title="Learn Quran" icon="/assets/how-we-work/schedule.svg" /> */}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;

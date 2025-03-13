import React from "react";
import "../css/howweworkcard.css";
import Image from "next/image";

const HowWeWorkCard = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className="how-we-work-card">
      <div className="how-we-work-card-icon">

        <Image src={icon} alt="circle" className="circle-icon" width={90} height={90} />
        <Image src={icon} alt={title} className="how-we-work-card-icon-image" width={60} height={60} />

      </div>
      <h2 className="how-we-work-card-title">{title}</h2>
    </div>
  );
};

export default HowWeWorkCard;

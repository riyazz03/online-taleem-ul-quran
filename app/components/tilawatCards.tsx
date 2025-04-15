import React from "react";
import Image from "next/image";
import "@/app/css/tilawatcard.css";


const TilawatCards = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="tilawat-card">
      <div className="tilawat-heading">
        <Image
          src={icon}
          alt="tilawat-card-icon"
          className="tilwat-card-icon"
          height={26}
          width={26}
        />
        <h1 className="tilawat-card-title">{title}</h1>
      </div>
      <div className="tilawat-content">
        <p className="tilawat-card-description">{description}</p>
      </div>
    </div>
  );
};

export default TilawatCards;

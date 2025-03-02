import React from "react";
import Image from "next/image";
import "../css/coursesCard.css";

const coursesCard = ({
  images,
  title,
  buttonText,
}: {
  images: string;
  title: string;
  buttonText: string;
  width: number;
  height: number;
}) => {
  return (
    <div className="courses-card">
      <div className="courses-card-image-div">
        <Image
          src={images}
          className="courses-card-image"
          alt={title}
          width={658}
          height={409}
        />
      </div>
      <div className="courses-card-content">
        <h2 className="courses-card-title">{title}</h2>
        <div className="courses-card-button">
          <p className="courses-card-button-text">{buttonText}</p>
          <img
            src="/assets/Icons/arrow-icon-with-background-color.svg"
            alt="Right Arrow"
          />
        </div>
      </div>
    </div>
  );
};

export default coursesCard;

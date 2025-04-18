import Image from "next/image";
import React from "react";
import "../css/our-courses-live-card.css";
import Link from "next/link";

const OurCoursesLiveCard = ({
  images,
  title,
  description,
}: {
  images: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="our-courses-card">
      <div className="courses-image">
        <Image
          src={images}
          alt="our-courses-live-card"
          width={550}
          height={500}
          className="our-courses-card-image"
        />
      </div>
      <div className="our-courses-live-content">
        <p className="our-courses-subtitle">Start your Journey From</p>
        <h2 className="our-courses-title">{title}</h2>
        <p className="our-courses-description-text">{description}</p>
        <Image
          src="/assets/social-media-icons/Rating.svg"
          alt="Rating Image"
          height={22}
          width={167}
          className="rating-icon"
        />
        <Link href="/course-details">
          <div className="courses-btn">
            <p className="courses-btn-text">Start With a Free Trail</p>
            <Image
              src="/assets/Icons/arrow-icon.svg"
              alt="Arrow"
              height={0}
              width={20}
              className="courses-btn-icon"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OurCoursesLiveCard;

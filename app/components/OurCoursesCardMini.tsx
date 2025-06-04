import Image from "next/image";
import React from "react";
import "../css/our-courses-card-mini.css";
import Link from "next/link";

const OurCoursesCardMini = ({
  images,
  title,
  description,
  link,
}: {
  images: string;
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <div className="our-courses-card-ctc">
      <div className="courses-image-ctc">
        <Image
          src={images}
          alt="our-courses-live-card"
          width={500}
          height={336}
          className="our-courses-card-image-ctc"
        />
      </div>
      <div className="our-courses-live-content-ctc">
        <h2 className="our-courses-title-ctc">{title}</h2>
        <p className="our-courses-description-text-ctc">{description}</p>

        <Link href={link}>
          <div className="courses-btn-ctc">
            <p className="courses-btn-text-ctc">Start With a Free Trial</p>
            <Image
              src="/assets/Icons/arrow-icon.svg"
              alt="Arrow"
              height={0}
              width={20}
              className="courses-btn-icon-ctc"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OurCoursesCardMini;

"use client";

import React from "react";
import "../css/footer.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <Image
        src="/Images/footer-waves-bg.png"
        alt="image"
        className="footer-waves-bg"
        height={98}
        width={1600}
      />
      <Image
        src="/Images/footer-waves-bg.png"
        alt="image"
        className="footer-waves-bg2"
        height={98}
        width={1600}
      />
      <div className="footer-section">
        <div className="footer-logo-image">
          <Image
            src="/Images/footer-logo.png"
            alt="nav-logo"
            className=""
            height={72}
            width={165}
          />
        </div>
        <div className="footer-content-block">
          <div className="footer-content-links-block">
            {" "}
            {/*First link div */}
            <h4 className="footer-content-link-title">Quick Links</h4>
            <div className="footer-content-links-wrapper-div">
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/our-course" className="footer-link">
                Our Courses
              </Link>
              <Link href="/about-us" className="footer-link">
                About us
              </Link>
              <Link href="/book-your-demo" className="footer-link">
                Book Your Demo
              </Link>
              <Link href="/contact-us" className="footer-link">
                Contact us
              </Link>
            </div>
          </div>{" "}
          {/*End of First LInk div */}
          <div className="footer-content-links-block">
            {" "}
            {/*second link div */}
            <h4 className="footer-content-link-title">Our Courses</h4>
            <div className="footer-content-links-wrapper-div">
              <Link href="/" className="footer-link">
                Simplified Tajweed
              </Link>
              <Link href="/" className="footer-link">
                Arabic Language
              </Link>
              <Link href="/" className="footer-link">
                Quran Memorization
              </Link>
              <Link href="/" className="footer-link">
                Tafseer-Ul-Quran
              </Link>
            </div>
          </div>{" "}
          {/*End of second LInk div */}
          <div className="footer-content-links-block">
            {" "}
            {/*third link div */}
            <h4 className="footer-content-link-title">Support & Policies</h4>
            <div className="footer-content-links-wrapper-div">
              <Link href="/" className="footer-link">
                Cancellation Policy
              </Link>
              <Link href="/" className="footer-link">
                Terms & Conditions
              </Link>
              <Link href="/" className="footer-link">
                Privacy Policy
              </Link>
            </div>
          </div>{" "}
          {/*End of third LInk div */}
          <div className="footer-content-links-block">
            {" "}
            {/*fourth link div */}
            <h4 className="footer-content-link-title">Connect Now</h4>
            <div className="footer-content-links-wrapper-div">
              <Link href="/" className="footer-link">
                onlinetaleem@gmail.com
              </Link>
              <Link href="/" className="footer-link">
                +91 9629158073
              </Link>
              <Link href="/" className="footer-link">
                +91 9629158073
              </Link>
              <div className="footer-social-media-icon-block">
                <Image
                  src="/assets/social-media-icons/whatsapp.svg"
                  alt="whatsapp"
                  width={40}
                  height={40}
                  className="footer-social-media-icons"
                />
                <Image
                  src="/assets/social-media-icons/facebook.svg"
                  alt="facebook"
                  width={40}
                  height={40}
                  className="footer-social-media-icons"
                />
                <Image
                  src="/assets/social-media-icons/x.svg"
                  alt="x"
                  width={40}
                  height={40}
                  className="footer-social-media-icons"
                />
              </div>
            </div>
          </div>{" "}
          {/*End of fourth LInk div */}
          <div className="crayont-div">
            <h3 className="crayont-text">Crafted by Crayont</h3>
            <Image
              src="/Images/crayont-logo.png"
              alt="crayont logo"
              width={28}
              height={31}
              className="crayont-logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

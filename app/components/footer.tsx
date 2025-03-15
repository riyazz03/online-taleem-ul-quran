"use client";

import React, { useState } from "react";
import "../css/footer.css";
import Image from "next/image";
import Link from "next/link";
import MobileFooter from "./MobileFooter";

const MobileFooterData = [
  {
    question: "Quick Links",
    answer: "Home",
    answer2: "Our Courses",
    answer3: "About us",
    answer4: "Book Your Demo",
    answer5: "Contact us",
    links: "/",
    links2: "/our-course",
    links3: "/about-us",
    links4: "/book-your-demo",
    links5: "/contact-us",
  },
  {
    question: "Our Courses",
    answer: "Simplified Tajweed",
    answer2: "Arabic Language",
    answer3: "Quran Memorization",
    answer4: "Tafseer-Ul-Quran",
    answer5: "Tafseer-Ul-Quran",
    links: "/",
    links2: "/",
    links3: "/",
    links4: "",
    links5: "",
  },
  {
    question: "Support & Policies",
    answer: "Cancellation Policy",
    answer2: "Terms & Conditions",
    answer3: "Privacy Policy",
    answer4: "Privacy Policy",
    answer5: "Privacy Policy",
    links: "",
    links2: "",
    links3: "",
    links4: "",
    links5: "",
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <>
      <div className="empty-footer-page"></div>
      <div className="footer">
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
            </div>
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
          <div className="footer-links-block">
            {MobileFooterData.map((item, index) => (
              <MobileFooter
                key={index}
                question={item.question}
                answer={item.answer}
                answer2={item.answer2}
                answer3={item.answer3}
                answer4={item.answer4}
                answer5={item.answer5}
                links={item.links}
                links2={item.links2}
                links3={item.links3}
                links4={item.links4}
                links5={item.links5}
                isOpen={openIndex === index} // Pass the state to MobileFooter
                onClick={() => setOpenIndex(index)} // Update state on click
              />
            ))}

            <div className="footer-content-links-block connect-now-block">
              {" "}
              {/*fourth link div */}
              <h4 className="footer-content-link-title">Connect Now</h4>
              <div className="footer-content-links-wrapper-div">
                <div className="footer-social-media-icon-block-mobile">
                  <Link href="/" className="footer-link">
                    onlinetaleem@gmail.com
                  </Link>
                  <Link href="/" className="footer-link">
                    +91 9629158073
                  </Link>
                  <Link href="/" className="footer-link">
                    +91 9629158073
                  </Link>
                </div>
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
            </div>
            <div className="crayont-div footer-logo-div">
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
    </>
  );
};

export default Footer;

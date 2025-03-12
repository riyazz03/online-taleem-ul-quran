"use client";

import React, { useState } from "react";
import "../css/contactUs.css";
import Image from "next/image";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
    date: "",
  });

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-us-section">
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="contact-us-grid-image"
      />
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Logo"
        width={500}
        height={800}
        className="contact-us-grid-image-landscape"
      />
      <div className="main-container contact-us-container">
        <div className="contact-us-form">
          <div className="contact-us-heading">
            <h1 className="section-title contact-us-title">
              <span>Contact</span> & Join Together
            </h1>
          </div>
          <div className="contact-us-form-content">
            <form onSubmit={handleSubmit} className="contact-us-form-block">
              {/* Name Input */}
              <div className="form-input-block">
                <label htmlFor="name" className="form-label-title">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Email Input */}
              <div className="form-input-block">
                <label htmlFor="email" className="form-label-title">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Phone Number Input */}
              <div className="form-input-block">
                <label htmlFor="phone" className="form-label-title">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="91+ 12345 67890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              {/* Course Dropdown */}
              <div className="form-input-block">
                <label htmlFor="course" className="form-label-title">
                  I&apos;m interested in
                </label>
                <select
                  id="course"
                  name="course"
                  value={selectedCourse}
                  className="form-input"
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">Select Your Course</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>

              {/* Message Input */}
              <div className="form-input-block">
                <label htmlFor="message" className="form-label-title">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="message-input"
                />
              </div>

              {/* Demo Schedule Dropdown */}
              <div className="form-input-block">
                <label htmlFor="date" className="form-label-title">
                  Demo Schedule (Every Day 09:00 pm)
                </label>
                <select
                  id="date"
                  name="date"
                  value={selectedDate}
                  className="form-input"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                >
                  <option value="">Select Your Date</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>

              <button type="submit" className="form-button">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="contact-us-details">
          <Image
            src="/Images/contact-us-image.png"
            alt="contact-us-image"
            className="contact-us-image"
            width={576}
            height={523}
          />
          <div className="contact-us-details-content">
            <h3 className="contact-us-details-title">Connect Now</h3>
          </div>
          <div className="contact-us-details-line">
            {/* Phone Number */}
            <div className="contact-us-details-svg-block">
              <div className="contact-us-details-svg">
                <Image
                  src="/assets/Icons/phone.svg"
                  alt="phone-icon"
                  width={30}
                  height={30}
                  className="phone-icon"
                />
              </div>
              <div className="numbers">
                <p>+91 9629158073</p>
                <p>+91 9629158073</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-us-details-svg-block">
              <Image
                src="/assets/Icons/email.svg"
                alt="email-icon"
                width={65}
                height={65}
                className="email-icon"
              />
              <p className="email">onlinetaleem@gmail.com</p>
            </div>

            {/* Address */}
            <div className="contact-us-details-svg-block">
              <Image
                src="/assets/Icons/map.svg"
                alt="location-icon"
                width={65}
                height={65}
                className="location-icon"
              />
              <div className="map">
                <p>
                  Kirubananda Variyar, Mosque Street Kaspa, Vellore - 632 009
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

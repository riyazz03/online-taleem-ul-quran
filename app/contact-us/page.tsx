"use client";

import React, { useState, useEffect, useRef } from "react";
import "../css/contactUs.css";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    course: "",
    message: "",
    date: "",
  });

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [nextDay, setNextDay] = useState("");

  const formRef = useRef(null);
  const detailsRef = useRef(null);

  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isDetailsInView = useInView(detailsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);

    const optionsDate: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const optionsDay: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };

    const formattedDate = today
      .toLocaleDateString("en-GB", optionsDate)
      .replace(/\//g, "-");
    const formattedDay = today.toLocaleDateString("en-GB", optionsDay);

    setNextDay(`${formattedDate}, ${formattedDay}`);
  }, []);

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const popUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
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
      <div className="padding-global">
        <div className="main-container contact-us-container">
          <motion.div
            className="contact-us-form"
            ref={formRef}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.div className="contact-us-heading" variants={fadeInUp}>
              <h1 className="section-title">
                <span>Contact</span> & Join Together
              </h1>
            </motion.div>
            <div className="contact-us-form-content">
              <form onSubmit={handleSubmit} className="contact-us-form-block">
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
                <div className="form-input-block">
                  <label htmlFor="phone" className="form-label-title">
                    What&apos;sApp Number
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="91+ 12345 67890"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-input-block">
                  <label htmlFor="course" className="form-label-title">
                    I&apos;m interested in
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    required
                    className="form-input appearance-none bg-none pr-4"
                  >
                    <option value="">Select Your Course</option>
                    <option value="option1">Quran Recitation</option>
                    <option value="option2">Simplified Tajweed</option>
                    <option value="option3">Quran Memorization</option>
                  </select>
                </div>
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
                    <option value="option1">Today</option>
                    <option value="option2">Tomorrow</option>
                    <option value="option3">{nextDay}</option>
                  </select>
                </div>
                <button type="submit" className="form-button">
                  Submit
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="contact-us-details"
            ref={detailsRef}
            initial="hidden"
            animate={isDetailsInView ? "visible" : "hidden"}
            variants={popUp}
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

"use client";

import React, { useState, useEffect, useRef } from "react";
import "../css/contactUs.css";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    message: "",
  });

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [weekendOptions, setWeekendOptions] = useState<string[]>([]);

  const formRef = useRef(null);
  const detailsRef = useRef(null);

  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isDetailsInView = useInView(detailsRef, { once: true, amount: 0.2 });

  // const isValidPhoneNumber = (number: string) => /^\d{20}$/.test(number);

  useEffect(() => {
    const weekends: string[] = [];
    const today = new Date();
    let count = 0;

    while (weekends.length < 3 && count < 30) {
      const day = today.getDay();
      if (day === 6 || day === 0) {
        const dateStr = today
          .toLocaleDateString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        weekends.push(dateStr);
      }
      today.setDate(today.getDate() + 1);
      count++;
    }

    setWeekendOptions(weekends);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (!isValidPhoneNumber(formData.phone)) {
    //   alert("Phone number must be 10 digits.");
    //   return;
    // }

    // if (!isValidPhoneNumber(formData.whatsapp)) {
    //   alert("WhatsApp number must be 10 digits.");
    //   return;
    // }

    setLoading(true);

    const url =
      "https://script.google.com/macros/s/AKfycbxkr-oYcIAWfyP8yT0c9P9R7JgXJFn8GuGoHwawOuCvL6ENDssOvLtnqQjQb01RTvKu/exec";

    const formPayload = `Name=${encodeURIComponent(
      formData.name
    )}&Email=${encodeURIComponent(formData.email)}&Phone=${encodeURIComponent(
      formData.phone
    )}&WhatsApp=${encodeURIComponent(
      formData.whatsapp
    )}&Course=${encodeURIComponent(
      selectedCourse
    )}&Message=${encodeURIComponent(
      formData.message
    )}&Date=${encodeURIComponent(selectedDate)}`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formPayload,
    })
      .then((res) => res.text())
      .then(() => {
        emailjs
          .sendForm("service_r36maoy", "template_78iu1vr", form.current!, {
            publicKey: "9GwxlluH6w4vlxKbe",
          })
          .then(() => {
            console.log("Email sent ✅");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setFormData({
              name: "",
              email: "",
              phone: "",
              whatsapp: "",
              message: "",
            });
            setSelectedCourse("");
            setSelectedDate("");
          })
          .catch((err) => console.error("EmailJS error:", err));
      })
      .catch((err) => console.error("Google Sheets error:", err))
      .finally(() => setLoading(false));
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
    <div className="contact-us-section relative">
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Grid"
        width={500}
        height={800}
        className="contact-us-grid-image"
      />
      <Image
        src="/assets/Icons/Grids.svg"
        alt="Grid"
        width={500}
        height={800}
        className="contact-us-grid-image-landscape"
      />

      {showSuccess && (
        <motion.div
          className="success-popup"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="success-checkmark">✔</div>
          <p>Submitted Successfully</p>
        </motion.div>
      )}

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
              <p className="form-label-title mb-4"></p>
            </motion.div>
            <div className="contact-us-form-content">
              <form
                ref={form}
                onSubmit={handleSubmit}
                className="contact-us-form-block"
              >
                <div className="form-input-block">
                  <label htmlFor="name" className="form-label-title">
                    Name <span className="required">*</span>
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
                    Email <span className="required">*</span>
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
                    Phone Number <span className="required">*</span>
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value })}
                    inputClass="form-input"
                    inputStyle={{ width: '100%' }}
                  />
                </div>
                <div className="form-input-block">
                  <label htmlFor="whatsapp" className="form-label-title">
                    WhatsApp Number <span className="required">*</span>
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={formData.whatsapp}
                    onChange={(value) => setFormData({ ...formData, whatsapp: value })}
                    inputClass="form-input"
                    inputStyle={{ width: '100%' }}
                  />
                </div>
                <div className="form-input-block">
                  <label htmlFor="course" className="form-label-title">
                    I&apos;m interested in <span className="required">*</span>
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
                    <option value="Quran Recitation">Quran Recitation</option>
                    <option value="Simplified Tajweed">Simplified Tajweed</option>
                    <option value="Quran Memorization">Quran Memorization</option>
                  </select>
                </div>
                <div className="form-input-block">
                  <label htmlFor="message" className="form-label-title">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="message-input"
                  />
                </div>
                <div className="form-input-block">
                  <label htmlFor="date" className="form-label-title">
                    Select Your Demo class on Weekends
                    <span className="required">*</span>
                  </label>
                  <select
                    id="date"
                    name="date"
                    value={selectedDate}
                    className="form-input"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  >
                    <option value="">Choose a Weekend Date</option>
                    {weekendOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="form-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      Submitting
                      <span className="loading-spinner" />
                    </>
                  ) : (
                    "Submit"
                  )}
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
                  <p>+91 9087078760</p>
                  <p>+919360771659</p>
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
                <p className="email">onlinetaleemulquranvlr@gmail.com</p>
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
                  <p>Madarasa-E-Siddiquia, Masjid-E-Qadeem Campus No.30, Old Mosque Steet Rahmathpala, Vellore - 632001</p>
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

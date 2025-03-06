"use client";

import React from "react";
import "../css/testimonial.css";
import TestimonialCard from "../components/TestimonialCard";
import Button from "../components/button";

const Testimonial = () => {
  return (
    <div className="testimonial-section">
      <div className="testimonial-card-container">
        <div className="testimonial-card-row1">
          <TestimonialCard
            image="/Images/testimonial/Avatar1.png"
            name="Salman"
            review="This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!"
          />
          <TestimonialCard
            image="/Images/testimonial/Avatar2.png"
            name="Ayesha K"
            review="I've tried many online Quran courses, but this one stands out. The lessons are well-structured, and my recitation has improved tremendously!"
          />
        </div>
        <div className="testimonial-card-row2">
          <TestimonialCard
            image="/Images/testimonial/Avatar3.png"
            name="Ayesha K"
            review="Perfect for beginners and advanced learners alike. The interactive lessons and flexible timings make it easy to stay consistent with my learning."
          />
          <TestimonialCard
            image="/Images/testimonial/Avatar2.png"
            name="Atihck"
            review="Perfect for beginners and advanced learners alike. The interactive lessons and flexible timings make it easy to stay consistent with my learning."
          />
          <div className="empty-card"></div>
          <TestimonialCard
            image="/Images/testimonial/Avatar2.png"
            name="Fatima S"
            review="My kids love their Quran teacher! The engaging and friendly approach has made them excited to learn every day."
          />
          <TestimonialCard
            image="/Images/testimonial/Avatar3.png"
            name="Omar H"
            review="My kids love their Quran teacher! The engaging and friendly approach has made them excited to learn every day."
          />
        </div>
        <div className="testimonial-card-row3">
          <TestimonialCard
            image="/Images/testimonial/Avatar1.png"
            name="Ayesha K"
            review="Learning Tajweed has never been this easy! The instructors are incredibly supportive, and the one-on-one sessions are so helpful."
          />
          <TestimonialCard
            image="/Images/testimonial/Avatar2.png"
            name="Salman"
            review="Learning Tajweed has never been this easy! The instructors are incredibly supportive, and the one-on-one sessions are so helpful."
          />
          <TestimonialCard
            image="/Images/testimonial/Avatar3.png"
            name="Omar H"
            review="This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!"
          />
          <TestimonialCard
            image="/Images/testimonial/Avatar2.png"
            name="Zainab A"
            review="This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!"
          />
          <TestimonialCard
            image="/Images/testimonial/Avatar1.png"
            name="Atihck"
            review="This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!"
          />
        </div>
      </div>
      {/* Testimonial content div */}
      <div className="testimonial-card-content">
        <h1 className="section-title testimonial-card-title">
          Why Students Love <span>Our Quran</span>Classes
        </h1>
        <p className="section-description testimonial-card-description">
          Hear from our students and parents about their journey of learning the
          Quran with us!
        </p>
        <Button text="Start Learning" />
      </div>
      {/* Testimonial background gradient div */}
      <div className="testimonial-background-gradient"></div>
    </div>
  );
};

export default Testimonial;

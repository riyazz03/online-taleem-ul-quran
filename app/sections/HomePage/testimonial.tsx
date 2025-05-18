"use client";

import React, { useRef } from "react";
import "@/app/css/HomePage/testimonial.css";
import { motion, useInView } from "framer-motion";
import TestimonialCard from "@/app/components/TestimonialCard";
import Button from "@/app/components/button";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Mousewheel,
  Keyboard,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const testimonials = [
  {
    image: "/Images/testimonial/Avatar1.png",
    name: "Hafsa",
    review:
      "Wonderful experience! Great progress in Tajweed and Qirah. Very dedicated and attentive teacher. Highly recommended!",
  },
  {
    image: "/Images/testimonial/Avatar2.png",
    name: "Umar",
    review:
      "Consistent lessons and patient teaching helped build a strong foundation. Very happy with the progress.",
  },
  {
    image: "/Images/testimonial/Avatar3.png",
    name: "Mamma",
    review:
      "I’m now confident in Tajweed and Qirah. Clear, patient, and encouraging teaching made a big difference.",
  },
  {
    image: "/Images/testimonial/Avatar2.png",
    name: "Abdul Aziz (America)",
    review:
      "Sessions are detailed, clear, and inspiring. Excellent explanations make learning Quran meaningful and impactful.",
  },
  {
    image: "/Images/testimonial/Avatar1.png",
    name: "Yasmeen (America)",
    review:
      "Really enjoying Tajweed class! I feel confident, and I appreciate the patience and flexibility in scheduling.",
  },
];

const Testimonial = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const isDescriptionInView = useInView(descriptionRef, {
    once: true,
    margin: "-50px",
  });

  return (
    <>
      <div ref={sectionRef} className="testimonial-section desktop-view">
        <div className="testimonial-card-container desktop">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="testimonial-card-col1"
          >
            <TestimonialCard
              image="/Images/testimonial/Avatar1.png"
              name="Fazal"
              review="Well-organized classes, kind teachers, and great progress in Hifz. Highly recommended for online Quran learning."
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar2.png"
              name="Jibreel"
              review="Patient, attentive teaching with consistent correction. Huge improvement in Tajweed and Qirah over two years."
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar2.png"
              name="Jibreel Wagid"
              review="Corrects every mistake, improves Tajweed and Qirah. Excellent teaching—I highly recommend the classes."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="testimonial-card-col2"
          >
            <TestimonialCard
              image="/Images/testimonial/Avatar3.png"
              name="Tajamul Hussain"
              review="Highly structured, supportive learning. Precise feedback and motivating environment helped me improve significantly."
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar2.png"
              name="Fahad Abdullah"
              review="My son is learning Tajweed with proper names and great interest—Alhamdulillah, very satisfied with the academy."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="testimonial-card-col3 "
          >
            <TestimonialCard
              image="/Images/testimonial/Avatar1.png"
              name="Mutahar"
              review="Teaching made a big impact—recitation improved and connection to the Qur’an strengthened. Truly appreciated and effective."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="testimonial-card-col4"
          >
            <TestimonialCard
              image="/Images/testimonial/Avatar2.png"
              name="Mariam"
              review="Extremely satisfied! Noticeable improvement in recitation, especially rulings. Grateful for such dedicated teaching."
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar3.png"
              name="Abdullah"
              review="This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="testimonial-card-col5"
          >
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
            <TestimonialCard
              image="/Images/testimonial/Avatar1.png"
              name="Atihck"
              review="This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!"
            />
          </motion.div>
        </div>

        <div className="testimonial-card-content desktop">
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="section-title testimonial-card-title"
          >
            Why Students Love <span>Our Quran</span> Classes
          </motion.h1>
          <motion.p
            ref={descriptionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isDescriptionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="section-description testimonial-card-description"
          >
            Hear from our students and parents about their journey of learning
            the Quran with us!
          </motion.p>
          <div className="testimonial-btn">
            <Link rel="stylesheet" href="/contact-us">
              <Button text="Start Learning" />
            </Link>
          </div>
        </div>
        <div className="testimonial-background-gradient"></div>
      </div>

      <div className="testimonial-section-mobile swiper-js-section">
        <div className="testimonial-card-content">
          <h1 className="section-title testimonial-card-title">
            Why Students Love <span>Our Quran</span> Classes
          </h1>
          <p className="section-description testimonial-card-description">
            Hear from our students and parents about their journey of learning
            the Quran with us!
          </p>
          <Button text="Start Learning" />
        </div>

        <div className="testimonial-card-container swiper-slide">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Mousewheel, Keyboard, Autoplay, Navigation]}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-cards ">
                  <TestimonialCard
                    image={testimonial.image}
                    name={testimonial.name}
                    review={testimonial.review}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="testimonial-background-gradient"></div>
      </div>
    </>
  );
};

export default Testimonial;

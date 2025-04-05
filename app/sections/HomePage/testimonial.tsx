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

const testimonials = [
  {
    image: "/Images/testimonial/Avatar1.png",
    name: "Salman",
    review:
      "This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!",
  },
  {
    image: "/Images/testimonial/Avatar2.png",
    name: "Ayesha K",
    review:
      "I've tried many online Quran courses, but this one stands out. The lessons are well-structured, and my recitation has improved tremendously!",
  },
  {
    image: "/Images/testimonial/Avatar3.png",
    name: "Omar H",
    review:
      "Perfect for beginners and advanced learners alike. The interactive lessons and flexible timings make it easy to stay consistent with my learning.",
  },
  {
    image: "/Images/testimonial/Avatar2.png",
    name: "Athick",
    review:
      "Learning Tajweed has never been this easy! The instructors are incredibly supportive, and the one-on-one sessions are so helpful.",
  },
  {
    image: "/Images/testimonial/Avatar1.png",
    name: "Zainab A",
    review:
      "This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!",
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
              name="Salman"
              review="This online Quran class has been a life-changing experience! The teachers are patient, knowledgeable, and make learning so easy. Highly recommend!"
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar2.png"
              name="Ayesha K"
              review="I've tried many online Quran courses, but this one stands out. The lessons are well-structured, and my recitation has improved tremendously!"
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar2.png"
              name="Ayesha K"
              review="I've tried many online Quran courses, but this one stands out. The lessons are well-structured, and my recitation has improved tremendously!"
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
              name="Ayesha K"
              review="Perfect for beginners and advanced learners alike. The interactive lessons and flexible timings make it easy to stay consistent with my learning."
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar2.png"
              name="Atihck"
              review="Perfect for beginners and advanced learners alike. The interactive lessons and flexible timings make it easy to stay consistent with my learning."
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
              name="Ayesha K"
              review="Learning Tajweed has never been this easy! The instructors are incredibly supportive, and the one-on-one sessions are so helpful."
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
              name="Salman"
              review="Learning Tajweed has never been this easy! The instructors are incredibly supportive, and the one-on-one sessions are so helpful."
            />
            <TestimonialCard
              image="/Images/testimonial/Avatar3.png"
              name="Omar H"
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
            <Button text="Start Learning" />
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
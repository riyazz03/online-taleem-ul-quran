"use client";

import React from "react";
import FaqsCard from "@/app/components/FaqsCard";
import faqdata from "@/app/data/faq.json";
import "@/app/css/HomePage/faq.css";

const FAQ = () => {
    return (
        <section className="faq-section"> 
            <div className="main-container faq-container">
                <div className="faq-heading">
                    <h1 className="section-title faq-heading-h1">
                        Got Questions? <br /><span className="">We&apos;ve Got Answers!</span> 
                    </h1>
                    <p className="faq-subheading-p">
                        Explore our FAQs to learn more about our classes, schedules, and teaching methods.
                    </p>
                </div>
                <div className="faq-qa">
                    {faqdata.map((faq) => (
                        <FaqsCard key={faq.question} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;

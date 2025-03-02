"use client";

import React from "react";
import "../css/faqCard.css";
import { useState } from "react";

const FaqsCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faqs-card">
      <div onClick={() => setIsOpen(!isOpen)} className="faq">
        <div className="faq-questions">
          <h3 className="faq-question-h3">{question}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-plus text-black flex-shrink-0 transition duration-300 "
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} faq-answers`}>
          <p className="faq-answers-p">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqsCard;

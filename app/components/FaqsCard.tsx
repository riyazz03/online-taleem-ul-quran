"use client";

import React from "react";
import "../css/faqCard.css";
import { useState, useRef, useEffect } from "react";

const FaqsCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div className="faqs-card">
      <div onClick={() => setIsOpen(!isOpen)} className="faq">
        <div className="faq-questions">
          <h3 className="faq-question-h3">{question}</h3>
          <div className="faq-svg-outline">
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
              className={`feather feather-plus text-black flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                }`}
            >
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                className={`transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                  }`}
              ></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
        <div
          ref={contentRef}
          className="faq-answers overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : "0",
          }}
        >
          <p className="faq-answers-p">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqsCard;
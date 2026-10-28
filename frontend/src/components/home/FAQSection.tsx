"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do I need a graduation degree to join the NTT course?",
    answer:
      "No. You only need to have completed Class 12 (10+2) in any stream. A graduation degree is an added advantage but is not mandatory.",
  },
  {
    question: "Is there an entrance exam for admission?",
    answer:
      "No entrance exam is required. Admissions are granted on a direct basis following academic counselling, review of minimum eligibility (Class 12 pass), and document verification.",
  },
  {
    question: "How long is the Nursery Teacher Training (NTT) course?",
    answer:
      "The program offers flexible learning tracks: a 6-month Certificate course and a 1-year Comprehensive Diploma, with weekday and weekend batch options designed for both freshers and working professionals.",
  },
  {
    question: "Can I pay the course fee in installments?",
    answer:
      "Yes. We offer flexible installment plans and zero-interest EMI options to ensure that fee payments are manageable and stress-free throughout your course.",
  },
  {
    question: "Do you provide placement assistance after course completion?",
    answer:
      "Yes, we provide 100% placement assistance. Our dedicated career support team connects certified graduates with reputed preschools, Montessori institutions, and international schools across Bangalore.",
  },
];

export const FAQSection: React.FC = () => {
  // Index 0 open by default to match reference design
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faqs" background="white" className="py-16 sm:py-24 border-t border-[rgba(90,29,22,0.06)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E9B13A]">
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3D221B] leading-tight tracking-tight">
              Frequently
              <br />
              Asked
              <br />
              Questions
            </h2>
            <p className="text-sm sm:text-base text-[#6F6864] leading-relaxed max-w-md">
              Find answers to the most common questions about our Nursery Teacher Training program and admissions
              process.
            </p>
            <div className="pt-2">
              <a
                href="#enquire"
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-full border border-[#3D221B] text-[#3D221B] text-sm font-semibold hover:bg-[#3D221B] hover:text-white transition-all duration-200 shadow-xs"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#FFF9F7] border border-[rgba(90,29,22,0.06)] rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#3D221B] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[#3D221B] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 stroke-[2.2]" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-[#6F6864] leading-relaxed border-t border-[rgba(90,29,22,0.03)] pt-2">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

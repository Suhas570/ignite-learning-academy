"use client";

import React from "react";
import { Star, Heart, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  tag: string;
  quote: string;
  rating: number;
}

const TOP_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Ananya Deshmukh",
    role: "NTT Diploma Graduate (2025)",
    tag: "Greenwood International School",
    quote:
      "The mentored practicum gave me real classroom poise before my very first interview. Within two weeks of graduation, I was hired as a pre-primary lead teacher!",
    rating: 5,
  },
  {
    id: "s1",
    name: "Rohan & Priya Sharma",
    role: "Parents of Aarav (Age 8)",
    tag: "Junior Public Speaking",
    quote:
      "Aarav used to hide behind us during school events. After 8 weeks at Ignite, he gave the vote of thanks at his annual day with zero stage fear! Truly grateful to the mentors.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Sneha Ramachandran",
    role: "Communication Skills Alumna",
    tag: "Centre Coordinator at EuroKids",
    quote:
      "Parent-teacher consultations used to terrify me. Simulated speech labs and de-escalation drills taught me how to communicate with authority, warmth, and empathy.",
    rating: 5,
  },
];

const MARQUEE_TESTIMONIALS = [...TOP_TESTIMONIALS, ...TOP_TESTIMONIALS];

interface TestimonialCardProps {
  item: TestimonialItem;
  ariaHidden?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item, ariaHidden }) => (
  <div
    aria-hidden={ariaHidden}
    className="shrink-0 w-[300px] sm:w-[360px] lg:w-[385px] bg-white rounded-2xl p-6 sm:p-7 border border-[rgba(90,29,22,0.1)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
  >
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[#E9B13A]">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <span className="text-[10px] font-bold text-[#5A1D16] bg-[#FFF8F5] border border-[#5A1D16]/15 px-2.5 py-0.5 rounded-full truncate max-w-[175px]">
          {item.tag}
        </span>
      </div>

      <p className="text-sm text-[#3D221B] leading-relaxed italic">
        &ldquo;{item.quote}&rdquo;
      </p>
    </div>

    <div className="pt-5 mt-5 border-t border-[rgba(90,29,22,0.06)] flex items-center justify-between">
      <div>
        <div className="text-sm font-bold text-[#3D221B]">{item.name}</div>
        <div className="text-[11px] text-[#6F6864] font-medium">{item.role}</div>
      </div>
      <Quote className="w-5 h-5 text-[#E9B13A]/50 shrink-0" />
    </div>
  </div>
);

export const FloatingTestimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FFF8F5] border-t border-[rgba(90,29,22,0.06)]">
      <Container>
        <div className="max-w-3xl mx-auto mb-12 sm:mb-14 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
            <Heart className="w-4 h-4 text-[#5A1D16] fill-current" />
            What Our Community Says
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
            Trusted by Educators, Students &amp; Parents
          </h2>
          <p className="text-sm sm:text-base text-[#6F6864]">
            Authentic stories from graduates and families across our Bengaluru and Pune campuses.
          </p>
        </div>

        <div className="overflow-hidden py-4">
          <div className="flex w-max gap-6 sm:gap-8 pr-6 sm:pr-8 animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none will-change-transform">
            {MARQUEE_TESTIMONIALS.map((item, index) => (
              <TestimonialCard
                key={`${item.id}-${index}`}
                item={item}
                ariaHidden={index >= TOP_TESTIMONIALS.length}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

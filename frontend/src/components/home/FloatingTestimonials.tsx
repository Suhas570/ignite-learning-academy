"use client";

import React from "react";
import { Star, Sparkles, GraduationCap, Heart, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  tag: string;
  quote: string;
  rating: number;
}

const STUDENT_REVIEWS: TestimonialItem[] = [
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
    id: "s2",
    name: "Kavya Nair",
    role: "Grade 10 Student",
    tag: "Senior Debate & Public Speaking",
    quote:
      "The debate simulators taught me how to construct arguments on my feet without losing composure. I won Best Speaker at the Bangalore Model UN thanks to Ignite's vocal lab.",
    rating: 5,
  },
  {
    id: "s3",
    name: "Dr. Vikram & Sunita Rao",
    role: "Parents of Ananya (Age 11)",
    tag: "Junior Life Skills",
    quote:
      "Ananya learned emotional self-regulation and positive conflict resolution. The facilitators create such a warm, judgment-free space for young minds to thrive.",
    rating: 5,
  },
  {
    id: "s4",
    name: "Aditya Menon",
    role: "Grade 12 Student",
    tag: "Senior Life Skills",
    quote:
      "From budgeting pocket money to handling board exam stress, the life skills course gave me practical mental models that standard textbook schooling never touched.",
    rating: 5,
  },
  {
    id: "s5",
    name: "Shweta Joshi",
    role: "Parent of Neil (Age 7)",
    tag: "Junior Speech Lab",
    quote:
      "The interactive theatre games and show-and-tell frameworks made learning fun for Neil. His pronunciation, sentence construction, and daily confidence have doubled.",
    rating: 5,
  },
];

const TEACHER_REVIEWS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Ananya Deshmukh",
    role: "NTT Diploma Graduate (2025)",
    tag: "Now at Greenwood International School",
    quote:
      "The mentored practicum gave me real classroom poise before my very first interview. Within two weeks of graduation, I was hired as a pre-primary lead teacher!",
    rating: 5,
  },
  {
    id: "t2",
    name: "Meera Kulkarni",
    role: "Play-Based Pedagogy Alumni",
    tag: "Lead Educator at Little Elly Preschool",
    quote:
      "Learning how to transform sensory loose parts into rich math and literacy prompts made my kindergarten classroom child-driven. The mentors are deeply invested in you.",
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
  {
    id: "t4",
    name: "Pooja Hegde",
    role: "Teachers Training Certificate",
    tag: "Facilitator at Chrysalis Kids",
    quote:
      "The NEP 2020 constructivist modules and low-cost teaching aids helped me stand out in school demo interviews. It gave me real pedagogical substance.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Divya Sundaram",
    role: "NTT Advanced Diploma",
    tag: "Kindergarten Head at VIBGYOR High",
    quote:
      "The deep dive into developmental milestones and phonics frameworks gave me the confidence to design preschool curriculums and mentor junior teachers effortlessly.",
    rating: 5,
  },
];

const ReviewCard: React.FC<{ item: TestimonialItem }> = ({ item }) => (
  <div className="w-[340px] sm:w-[380px] shrink-0 bg-white rounded-2xl p-6 border border-[rgba(90,29,22,0.1)] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
    <div className="space-y-3">
      {/* Stars & Tag */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#E9B13A]">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <span className="text-[10px] font-bold text-[#5A1D16] bg-[#FFF8F5] border border-[#5A1D16]/15 px-2 py-0.5 rounded-full truncate max-w-[180px]">
          {item.tag}
        </span>
      </div>

      {/* Quote */}
      <p className="text-xs sm:text-sm text-[#3D221B] leading-relaxed italic line-clamp-4">
        &ldquo;{item.quote}&rdquo;
      </p>
    </div>

    {/* Author Info */}
    <div className="pt-4 mt-4 border-t border-[rgba(90,29,22,0.06)] flex items-center justify-between">
      <div>
        <div className="text-sm font-bold text-[#3D221B]">{item.name}</div>
        <div className="text-[11px] text-[#6F6864] font-medium">{item.role}</div>
      </div>
      <Quote className="w-5 h-5 text-[#E9B13A]/40 shrink-0" />
    </div>
  </div>
);

export const FloatingTestimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FFF8F5] overflow-hidden border-t border-[rgba(90,29,22,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
          <Heart className="w-4 h-4 text-[#5A1D16] fill-current" />
          What Our Community Says
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
          Loved by Students, Parents & Certified Educators
        </h2>
        <p className="text-sm sm:text-base text-[#6F6864] max-w-2xl mx-auto">
          Hover over any review to pause the stream and read authentic experiences from across our Bangalore campus.
        </p>
      </div>

      {/* Track 1: Student & Parent Voices (Scrolling Left) */}
      <div className="space-y-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5A1D16]">
          <Sparkles className="w-4 h-4 text-[#E9B13A]" />
          <span>Student & Parent Voices</span>
        </div>

        {/* Marquee Wrapper with side gradient fades */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFF8F5] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFF8F5] to-transparent z-10" />

          <div className="animate-marquee-left pause-on-hover flex gap-6 px-4">
            {/* Duplicated for seamless loop */}
            {[...STUDENT_REVIEWS, ...STUDENT_REVIEWS].map((item, idx) => (
              <ReviewCard key={`student-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Track 2: Trainee & Educator Voices (Scrolling Right in Opposite Direction) */}
      <div className="space-y-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5A1D16]">
          <GraduationCap className="w-4 h-4 text-[#5A1D16]" />
          <span>Trainee & Educator Voices</span>
        </div>

        {/* Marquee Wrapper with side gradient fades */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFF8F5] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFF8F5] to-transparent z-10" />

          <div className="animate-marquee-right pause-on-hover flex gap-6 px-4">
            {/* Duplicated for seamless loop */}
            {[...TEACHER_REVIEWS, ...TEACHER_REVIEWS].map((item, idx) => (
              <ReviewCard key={`teacher-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

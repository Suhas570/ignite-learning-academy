"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

interface SlideData {
  id: number;
  image: string;
  alt: string;
  badge: string;
  description: string;
  headline?: string;
  highlight?: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/hero/teacher-training-seminar.jpg",
    alt: "Educator conducting early childhood teacher training seminar at Ignite Learning Academy Bangalore",
    badge: "Admissions Open 2026 Batches",
    headline: "Empowering Teachers. Inspiring Students.",
    highlight: "Shaping the Future.",
    description:
      "Bangalore's premier institute for accredited Nursery Teachers Training (NTT) diplomas, experiential pedagogy, and transformative student public speaking & life skills.",
  },
  {
    id: 2,
    image: "/hero/student-public-speaking.jpg",
    alt: "Indian student demonstrating confident speech and public presentation skills in classroom",
    badge: "Student Training • Ages 6–18",
    headline: "Nurturing Confident Young Voices &",
    highlight: "Empathetic Leaders.",
    description:
      "Ignite natural stage presence, articulate communication, emotional resilience, and real-world life skills through our acclaimed junior and senior speaking labs.",
  },
  {
    id: 3,
    image: "/hero/early-childhood-storytelling.jpg",
    alt: "Certified teacher reading stories to preschool children on carpet during interactive play-based learning",
    badge: "100% Placement Guidance",
    headline: "Hands-On Pedagogy & NEP 2020",
    highlight: "Classroom Practicums.",
    description:
      "Master sensory inquiry, Montessori methods, and inclusive early education with flexible weekend batches and guaranteed partner school internships in Bangalore.",
  },
];

export const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative overflow-hidden bg-[#2E1A14] select-none"
      aria-label="Ignite Academy Featured Highlights Carousel"
    >
      {/* Embla Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-full min-h-[580px] sm:min-h-[660px] lg:h-[740px] flex items-center justify-start shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
            >
              {/* Background Image with Next.js Image optimization */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />

              {/* Dark Overlay (bg-black/50) for crisp typography contrast */}
              <div className="absolute inset-0 bg-black/50 backdrop-brightness-95" />

              {/* Subtle Bottom Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Slide Content Overlay - Left-Middle Aligned */}
              <Container className="relative z-10 text-white text-left pl-4 pr-4 sm:pl-14 lg:pl-20 py-10 sm:py-14">
                <div className="max-w-3xl space-y-4 sm:space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#E9B13A] text-[#3D221B] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-4 h-4 text-[#5A1D16]" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Headline: Ignite Learning Academy — Empowering Teachers. Inspiring Students. Shaping the Future. */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] drop-shadow-md">
                    <span className="text-[#E9B13A]">Ignite Learning Academy</span> —{" "}
                    Empowering Teachers. Inspiring Students.{" "}
                    <span className="text-[#E9B13A] block sm:inline">
                      Shaping the Future.
                    </span>
                  </h1>

                  {/* Subtext */}
                  <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                    {slide.description}
                  </p>

                  {/* Dual CTA Buttons - Full-width stacked on mobile */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
                    <Button
                      href="#enquire"
                      variant="primary"
                      id="btnHeroConsultation"
                      className="w-full sm:w-auto justify-center text-center px-6 py-3 sm:px-8 sm:py-3.5 shadow-md text-sm sm:text-base"
                    >
                      <span>Book Free Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <Button
                      href="/courses"
                      variant="secondary"
                      id="btnHeroExploreCourses"
                      className="w-full sm:w-auto justify-center text-center px-6 py-3 sm:px-8 sm:py-3.5 shadow-md text-sm sm:text-base"
                    >
                      <span>Explore Courses</span>
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile, native swipe supported */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 text-white items-center justify-center backdrop-blur-xs border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#E9B13A]"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 text-white items-center justify-center backdrop-blur-xs border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#E9B13A]"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2.5">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === selectedIndex
                ? "w-8 h-2.5 bg-[#E9B13A] shadow-md"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

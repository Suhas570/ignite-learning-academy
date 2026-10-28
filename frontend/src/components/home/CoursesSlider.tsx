"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Course } from "@/data/courses";
import { CourseCard } from "@/components/courses/CourseCard";

interface CoursesSliderProps {
  courses: Course[];
}

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
];

export const CoursesSlider: React.FC<CoursesSliderProps> = ({ courses }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Featured Programs">
      {/* Slider Viewport */}
      <div className="overflow-hidden p-1 -m-1" ref={emblaRef}>
        <div className="flex -ml-4 sm:-ml-6">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="min-w-0 pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${courses.length}`}
            >
              <CourseCard
                course={course}
                imageUrl={SLIDER_IMAGES[idx % SLIDER_IMAGES.length]}
                className="h-[520px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls: Arrows and Dots */}
      <div className="flex items-center justify-between pt-8">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide group ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === selectedIndex
                  ? "w-7 h-2 bg-[#5A1D16]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous courses"
            className="w-10 h-10 rounded-full border border-[rgba(90,29,22,0.15)] bg-white text-[#5A1D16] flex items-center justify-center shadow-xs hover:bg-[#FFF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#5A1D16]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next courses"
            className="w-10 h-10 rounded-full border border-[rgba(90,29,22,0.15)] bg-white text-[#5A1D16] flex items-center justify-center shadow-xs hover:bg-[#FFF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#5A1D16]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

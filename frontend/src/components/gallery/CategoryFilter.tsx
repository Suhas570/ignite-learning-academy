"use client";

import React from "react";

export interface CategoryOption {
  label: string;
  value: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: "All", value: "all" },
  { label: "Classroom", value: "courses" },
  { label: "Events", value: "events" },
  { label: "Workshops", value: "workshops" },
  { label: "Student Work", value: "student_work" },
  { label: "Campus", value: "campus" },
];

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories?: CategoryOption[];
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  categories = CATEGORY_OPTIONS,
  className = "",
}) => {
  return (
    <div
      role="group"
      aria-label="Filter media by category"
      className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${className}`}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            id={`filter-${cat.value}`}
            aria-pressed={isActive}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A1D16] cursor-pointer ${
              isActive
                ? "bg-[#5A1D16] text-white shadow-md scale-105"
                : "bg-white text-[#3D221B] border border-[rgba(90,29,22,0.15)] hover:border-[#5A1D16] hover:bg-[#FFF8F5] text-[#6F6864]"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  imageUrl?: string;
  className?: string;
}

const DEFAULT_COURSE_IMAGES: Record<string, string> = {
  "nursery-teachers-training":
    "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  "public-speaking-for-juniors":
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  "public-speaking-for-seniors":
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  "life-skills-for-juniors":
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
  "life-skills-for-seniors":
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
  "communication-for-impact":
    "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  "teachers-training-certificate-program":
    "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  imageUrl,
  className = "",
}) => {
  const imageSrc =
    imageUrl ||
    DEFAULT_COURSE_IMAGES[course.slug] ||
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop";

  const categoryLabel =
    course.category === "teachers" ? "Teacher Training" : "Student Training";

  return (
    <div
      className={`group flex flex-col rounded-2xl overflow-hidden border border-[rgba(90,29,22,0.1)] bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-[520px] sm:h-[540px] ${className}`}
    >
      {/* Top Section: Image (60% height) */}
      <div className="relative h-[60%] w-full overflow-hidden bg-neutral-100">
        <Image
          src={imageSrc}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Dark Gradient for badge contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Floating Category Badge in Gold */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9B13A] text-[#3D221B] shadow-md border border-[#E9B13A]/80">
            {categoryLabel}
          </span>
        </div>

        {/* Top Right Duration Pill */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-xs border border-white/20">
            <Clock className="w-3 h-3 text-[#E9B13A]" />
            <span>{course.duration.split("(")[0].trim()}</span>
          </span>
        </div>

        {/* Sub-badge pill pinned above image bottom */}
        {course.badge && (
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <span className="inline-block text-[11px] font-medium text-white/95 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md truncate max-w-full">
              {course.badge}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Section: White Background Content (40% height) */}
      <div className="h-[40%] p-5 sm:p-6 bg-white flex flex-col justify-between border-t border-[rgba(90,29,22,0.06)]">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[#3D221B] group-hover:text-[#5A1D16] transition-colors line-clamp-1 leading-snug">
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#6F6864] leading-relaxed line-clamp-2">
            {course.shortDescription}
          </p>
        </div>

        {/* Bottom Learn More Link */}
        <div className="pt-3 border-t border-[rgba(90,29,22,0.08)] flex items-center justify-between">
          <span className="text-xs text-[#6F6864] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E9B13A]" />
            <span>Bangalore Campus</span>
          </span>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5A1D16] group-hover:text-[#E9B13A] transition-colors focus:outline-none"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { MediaItem, resolveMediaUrl, getVideoThumbnail } from "@/lib/api";

interface MediaCardProps {
  item: MediaItem;
  onClick?: (item: MediaItem) => void;
  className?: string;
  priority?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onClick,
  className = "",
  priority = false,
}) => {
  const isVideo = item.mediaType?.toLowerCase() === "video" || Boolean(item.videoUrl) || Boolean(item.filename && item.filename.endsWith(".mp4"));
  const thumbnailUrl = isVideo
    ? getVideoThumbnail(item)
    : resolveMediaUrl(item.url) || "/logo.png";

  const categoryLabelMap: Record<string, string> = {
    general: "General",
    campus: "Campus & Facilities",
    courses: "Classroom & Courses",
    events: "Events & Workshops",
    student_work: "Student Work",
    classroom: "Classroom",
    Classroom: "Classroom",
  };

  const categoryDisplay = categoryLabelMap[item.category] || item.category;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(item);
    }
  };

  const [imageError, setImageError] = React.useState(false);
  const displayThumbnail = imageError ? "/logo.png" : thumbnailUrl;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={handleKeyDown}
      aria-label={`View ${isVideo ? "video" : "image"}: ${item.title}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[rgba(90,29,22,0.1)] shadow-[0_10px_30px_rgba(46,26,20,0.06)] hover:shadow-[0_18px_40px_rgba(90,29,22,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A1D16] ${className}`}
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF8F5]">
        <Image
          src={displayThumbnail}
          alt={item.altText || item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          priority={priority}
          unoptimized
          onError={() => setImageError(true)}
        />

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#5A1D16] shadow-sm">
            {categoryDisplay}
          </span>
        </div>

        {/* Video Play Overlay Badge */}
        {isVideo && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#5A1D16]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#E9B13A] group-hover:text-[#3D221B] transition-all duration-300">
              <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Card Content Footer */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-[#3D221B] group-hover:text-[#5A1D16] transition-colors line-clamp-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-[#6F6864] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
        <div className="pt-2 border-t border-[rgba(90,29,22,0.06)] flex items-center justify-between text-[11px] text-[#6F6864]">
          <span className="font-semibold text-[#5A1D16]">
            {isVideo ? "▶ Watch Video" : "🔍 View Full Photo"}
          </span>
          <span>{new Date(item.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
        </div>
      </div>
    </div>
  );
};

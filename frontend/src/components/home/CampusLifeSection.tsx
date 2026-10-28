"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Video, ArrowRight } from "lucide-react";
import { MediaItem, getVideoThumbnail } from "@/lib/api";
import { VideoModal } from "@/components/gallery/VideoModal";

interface CampusLifeSectionProps {
  videos: MediaItem[];
}

export const CampusLifeSection: React.FC<CampusLifeSectionProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
              <Video className="w-4 h-4 text-[#5A1D16]" />
              Campus Life & Practicums
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
              Experience Practical Pedagogy in Action
            </h2>
            <p className="text-sm sm:text-base text-[#6F6864]">
              Peek into our authentic Bangalore training classrooms, Montessori apparatus walkthroughs, and live student speech showcases.
            </p>
          </div>

          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5A1D16] hover:text-[#6B241A] transition-colors whitespace-nowrap group"
          >
            <span>View All Campus Videos</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column / 2x2 Grid with Play Overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.slice(0, 4).map((video) => {
            const thumbUrl = getVideoThumbnail(video);

            return (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedVideo(video);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Watch video: ${video.title}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[rgba(90,29,22,0.1)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5A1D16]"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                  <Image
                    src={thumbUrl}
                    alt={video.altText || video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                    unoptimized={thumbUrl.includes("localhost") || thumbUrl.includes("127.0.0.1") || thumbUrl.startsWith("/api/")}
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors duration-300" />

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-[#E9B13A] text-[#3D221B] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#5A1D16] group-hover:text-white transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs border border-white/20">
                      {video.category}
                    </span>
                  </div>
                </div>

                {/* Video Info Bottom Area */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-sm font-bold text-[#3D221B] group-hover:text-[#5A1D16] transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[#6F6864] pt-1 border-t border-[rgba(90,29,22,0.06)]">
                    <span className="font-medium text-[#E9B13A] flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" />
                      Classroom Practicum
                    </span>
                    <span className="font-semibold text-[#5A1D16] group-hover:underline">
                      Watch Video →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reusable Video Modal */}
      <VideoModal item={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
};

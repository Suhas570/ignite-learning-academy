"use client";

import React, { useEffect, useCallback } from "react";
import { MediaItem, extractYouTubeId, extractInstagramShortcode, resolveMediaUrl } from "@/lib/api";

interface VideoModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, onClose }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  const ytId = extractYouTubeId(item.videoUrl);
  const igData = extractInstagramShortcode(item.videoUrl);
  const isVideoFile = item.url && (item.url.endsWith(".mp4") || item.mimeType?.startsWith("video/") || item.url.includes("/video/upload/"));
  const directVideoUrl = isVideoFile ? resolveMediaUrl(item.url) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Playing video: ${item.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close video player"
        id="btnCloseVideoModal"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>

      {/* Modal Container */}
      <div className="relative max-w-4xl w-full flex flex-col bg-[#1A110E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Video Player Area */}
        <div className="relative w-full aspect-video min-h-[420px] bg-black flex items-center justify-center">
          {ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : igData ? (
            <iframe
              src={`https://www.instagram.com/${igData.type}/${igData.shortcode}/embed/`}
              title={item.title}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0 min-h-[420px] bg-black"
            />
          ) : directVideoUrl ? (
            <video
              src={directVideoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video streaming.
            </video>
          ) : (
            <div className="p-8 text-center text-white/70 space-y-2">
              <p>Video source unavailable.</p>
              {item.videoUrl && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E9B13A] underline"
                >
                  Open External Video Link ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Video Details Bar */}
        <div className="p-4 sm:p-6 bg-[#3D221B] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E9B13A] text-[#3D221B]">
              {item.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
            {item.description && (
              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#E9B13A] hover:bg-[#D89F28] text-[#3D221B] transition-colors shrink-0"
          >
            Close Video
          </button>
        </div>
      </div>
    </div>
  );
};

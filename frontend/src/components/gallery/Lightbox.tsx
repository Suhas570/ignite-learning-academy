"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { MediaItem, resolveMediaUrl } from "@/lib/api";

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
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

  const fullImageUrl = resolveMediaUrl(item.url) || "/logo.png";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Full view of ${item.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close Button Top-Right */}
      <button
        onClick={onClose}
        aria-label="Close image modal"
        id="btnCloseLightbox"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>

      {/* Modal Content Box */}
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#1A110E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Main Image Display */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black/40 flex items-center justify-center overflow-hidden">
          <Image
            src={fullImageUrl}
            alt={item.altText || item.title}
            fill
            sizes="90vw"
            className="object-contain p-2"
            priority
            unoptimized={fullImageUrl.startsWith("http://localhost") || fullImageUrl.startsWith("http://127.0.0.1")}
          />
        </div>

        {/* Modal Caption & Details Footer */}
        <div className="p-4 sm:p-6 bg-[#3D221B] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E9B13A] text-[#3D221B]">
                {item.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {item.title}
              </h3>
            </div>
            {item.description && (
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={fullImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Open Original ↗
            </a>
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#E9B13A] hover:bg-[#D89F28] text-[#3D221B] transition-colors"
            >
              Close View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

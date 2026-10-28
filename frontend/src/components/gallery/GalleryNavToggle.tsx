import React from "react";
import Link from "next/link";

interface GalleryNavToggleProps {
  active: "photos" | "videos";
}

export const GalleryNavToggle: React.FC<GalleryNavToggleProps> = ({ active }) => {
  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[#3D221B]/5 border border-[rgba(90,29,22,0.1)] gap-1">
      {active === "photos" ? (
        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#5A1D16] text-white shadow-sm">
          📷 Photo Gallery
        </span>
      ) : (
        <Link
          href="/gallery"
          className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#6F6864] hover:text-[#5A1D16] transition-colors"
        >
          📷 Photo Gallery
        </Link>
      )}

      {active === "videos" ? (
        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#5A1D16] text-white shadow-sm">
          ▶ Video Gallery
        </span>
      ) : (
        <Link
          href="/videos"
          className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#6F6864] hover:text-[#5A1D16] transition-colors"
        >
          ▶ Video Gallery
        </Link>
      )}
    </div>
  );
};

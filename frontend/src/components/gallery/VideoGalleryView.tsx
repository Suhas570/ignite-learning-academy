"use client";

import React, { useState, useMemo } from "react";
import { MediaItem } from "@/lib/api";
import { MediaGrid } from "./MediaGrid";
import { MediaCard } from "./MediaCard";
import { VideoModal } from "./VideoModal";
import { CategoryFilter } from "./CategoryFilter";
import { EmptyState } from "./EmptyState";

interface VideoGalleryViewProps {
  initialVideos: MediaItem[];
}

export const VideoGalleryView: React.FC<VideoGalleryViewProps> = ({ initialVideos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "all") return initialVideos;
    return initialVideos.filter((item) => {
      const cat = (item.category || "").toLowerCase();
      if (selectedCategory === "courses" || selectedCategory === "classroom") {
        return cat === "courses" || cat === "academics" || cat === "classroom";
      }
      if (selectedCategory === "events") {
        return cat === "events" || cat === "activities";
      }
      if (selectedCategory === "workshops") {
        return cat === "workshops" || cat === "courses";
      }
      if (selectedCategory === "campus") {
        return cat === "campus" || cat === "general";
      }
      return cat === selectedCategory.toLowerCase();
    });
  }, [initialVideos, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Category Filter Chips */}
      <div className="flex justify-center">
        <CategoryFilter
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Grid or Empty State */}
      {filteredVideos.length > 0 ? (
        <MediaGrid>
          {filteredVideos.map((video, index) => (
            <MediaCard
              key={video.id}
              item={video}
              onClick={(item) => setActiveVideo(item)}
              priority={index < 4}
            />
          ))}
        </MediaGrid>
      ) : (
        <EmptyState
          title="No Videos in This Category"
          message={`There are currently no published videos under "${selectedCategory}". Click below to see all videos.`}
          onReset={() => setSelectedCategory("all")}
        />
      )}

      {/* Video Modal Player */}
      <VideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
};

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

const CATEGORY_ALIASES: Record<string, string[]> = {
  courses: ["courses", "classroom", "academics"],
  classroom: ["courses", "classroom", "academics"],
  events: ["events", "activities"],
  workshops: ["workshops", "workshop"],
  student_work: ["student_work", "student work"],
  campus: ["campus", "general"],
};

export const VideoGalleryView: React.FC<VideoGalleryViewProps> = ({ initialVideos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "all") return initialVideos;
    const normalizedSelected = selectedCategory.toLowerCase().trim();
    const allowed = CATEGORY_ALIASES[normalizedSelected] ?? [normalizedSelected];
    return initialVideos.filter((item) => {
      const cat = (item.category || "").toLowerCase().trim();
      return allowed.includes(cat);
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

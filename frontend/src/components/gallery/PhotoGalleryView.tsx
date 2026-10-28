"use client";

import React, { useState, useMemo } from "react";
import { MediaItem } from "@/lib/api";
import { MediaGrid } from "./MediaGrid";
import { MediaCard } from "./MediaCard";
import { Lightbox } from "./Lightbox";
import { CategoryFilter } from "./CategoryFilter";
import { EmptyState } from "./EmptyState";

import { CHILDREN_GALLERY_PHOTOS } from "@/data/galleryPhotos";

interface PhotoGalleryViewProps {
  initialPhotos?: MediaItem[];
}

export const PhotoGalleryView: React.FC<PhotoGalleryViewProps> = ({ initialPhotos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<MediaItem | null>(null);

  const photos = initialPhotos && initialPhotos.length > 0 ? initialPhotos : CHILDREN_GALLERY_PHOTOS;

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === "all") return photos;
    return photos.filter((item) => {
      if (selectedCategory === "courses" || selectedCategory === "classroom") {
        return item.category === "courses" || item.category === "classroom" || item.category === "academics";
      }
      if (selectedCategory === "events") {
        return item.category === "events" || item.category === "activities";
      }
      if (selectedCategory === "workshops") {
        return item.category === "workshops";
      }
      if (selectedCategory === "student_work") {
        return item.category === "student_work";
      }
      if (selectedCategory === "campus") {
        return item.category === "campus" || item.category === "general";
      }
      return item.category === selectedCategory;
    });
  }, [photos, selectedCategory]);

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
      {filteredPhotos.length > 0 ? (
        <MediaGrid>
          {filteredPhotos.map((photo, index) => (
            <MediaCard
              key={photo.id}
              item={photo}
              onClick={(item) => setActivePhoto(item)}
              priority={index < 4}
            />
          ))}
        </MediaGrid>
      ) : (
        <EmptyState
          title="No Photos in This Category"
          message={`There are currently no published photos under "${selectedCategory}". Click below to see all photos.`}
          onReset={() => setSelectedCategory("all")}
        />
      )}

      {/* Lightbox Modal */}
      <Lightbox item={activePhoto} onClose={() => setActivePhoto(null)} />
    </div>
  );
};

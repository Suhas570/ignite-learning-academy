"use client";

import React, { useEffect } from "react";
import { GalleryErrorState } from "@/components/gallery/GalleryErrorState";

export default function VideosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Videos Error]", error);
  }, [error]);

  return (
    <GalleryErrorState
      title="Unable to Load Videos"
      message="We encountered a temporary connection issue while loading the video lectures. Please try reloading."
      onRetry={() => reset()}
    />
  );
}

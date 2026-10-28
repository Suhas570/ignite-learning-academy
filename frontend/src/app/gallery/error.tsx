"use client";

import React, { useEffect } from "react";
import { GalleryErrorState } from "@/components/gallery/GalleryErrorState";

export default function GalleryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Gallery Error]", error);
  }, [error]);

  return (
    <GalleryErrorState
      title="Unable to Load Gallery"
      message="We encountered a temporary connection issue while reaching the media database. Please try reloading the gallery."
      onRetry={() => reset()}
    />
  );
}

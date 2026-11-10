"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

export const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const dismissedRef = useRef(false);

  const handleDismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Fallback safety timer in case onEnded is delayed or autoplay blocked
    const safetyTimer = setTimeout(() => {
      handleDismiss();
    }, 5500);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [handleDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center w-screen h-screen overflow-hidden transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <video
        src="/videos/loading.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleDismiss}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

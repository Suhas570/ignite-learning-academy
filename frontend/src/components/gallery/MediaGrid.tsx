import React from "react";

interface MediaGridProps {
  children: React.ReactNode;
  className?: string;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}
    >
      {children}
    </div>
  );
};

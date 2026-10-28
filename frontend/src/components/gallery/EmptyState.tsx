import React from "react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Media Found",
  message = "There are no published media items in this selected category right now.",
  onReset,
  className = "",
}) => {
  return (
    <div
      className={`text-center py-16 sm:py-20 px-4 rounded-3xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.1)] max-w-xl mx-auto space-y-4 my-8 ${className}`}
      role="status"
    >
      <div className="w-16 h-16 rounded-full bg-[#E9B13A]/20 text-[#5A1D16] flex items-center justify-center mx-auto text-3xl">
        📷
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#3D221B]">{title}</h3>
      <p className="text-sm text-[#6F6864] max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      {onReset && (
        <div className="pt-2">
          <Button variant="outline" onClick={onReset} className="text-xs sm:text-sm py-2 px-6">
            View All Media
          </Button>
        </div>
      )}
    </div>
  );
};

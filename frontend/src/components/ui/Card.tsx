import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  hoverable = true,
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-[rgba(90,29,22,0.1)] p-6 sm:p-8 transition-all duration-300 ${
        hoverable
          ? "hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(90,29,22,0.12)] shadow-[0_10px_30px_rgba(46,26,20,0.06)]"
          : "shadow-[0_10px_30px_rgba(46,26,20,0.06)]"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

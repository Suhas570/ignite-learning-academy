import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  background?: "white" | "cream" | "dark";
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  className = "",
  background = "white",
  children,
  ...props
}) => {
  const bgMap = {
    white: "bg-white text-[#6F6864]",
    cream: "bg-[#FFF8F5] text-[#6F6864]",
    dark: "bg-[#3D221B] text-white",
  };

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 md:py-20 ${bgMap[background]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

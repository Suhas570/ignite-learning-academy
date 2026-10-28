import React from "react";
import { Container } from "./Container";

interface PageHeroProps {
  badge?: React.ReactNode;
  title: string | React.ReactNode;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <section
      className={`bg-gradient-to-b from-[#FFF8F5] via-white to-white py-16 sm:py-20 border-b border-[rgba(90,29,22,0.06)] ${className}`}
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {badge && <div>{badge}</div>}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3D221B] tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#6F6864] leading-relaxed">
            {description}
          </p>
          {children}
        </div>
      </Container>
    </section>
  );
};

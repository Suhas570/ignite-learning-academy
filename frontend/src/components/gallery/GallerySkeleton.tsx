import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const GallerySkeleton: React.FC = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-[#FFF8F5] via-white to-white py-16 sm:py-20 border-b border-[rgba(90,29,22,0.06)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4 animate-pulse">
            <div className="h-6 w-32 bg-[#E9B13A]/30 rounded-full mx-auto" />
            <div className="h-10 w-3/4 bg-[#3D221B]/15 rounded-xl mx-auto" />
            <div className="h-4 w-1/2 bg-[#6F6864]/20 rounded mx-auto" />
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          {/* Skeleton Filter Chips */}
          <div className="flex justify-center gap-3 mb-10 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-20 bg-gray-200 rounded-full" />
            ))}
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[rgba(90,29,22,0.08)] bg-white overflow-hidden shadow-sm animate-pulse space-y-3"
              >
                <div className="aspect-[16/10] bg-gray-200 w-full" />
                <div className="p-4 space-y-2">
                  <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

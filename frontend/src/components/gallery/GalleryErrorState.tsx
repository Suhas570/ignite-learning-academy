"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface GalleryErrorStateProps {
  title: string;
  message: string;
  onRetry: () => void;
}

export const GalleryErrorState: React.FC<GalleryErrorStateProps> = ({
  title,
  message,
  onRetry,
}) => {
  return (
    <Section background="cream" className="min-h-[60vh] flex items-center justify-center">
      <Container>
        <div className="max-w-lg mx-auto text-center space-y-5 bg-white p-8 rounded-3xl border border-[rgba(90,29,22,0.1)] shadow-md">
          <div className="w-16 h-16 rounded-full bg-red-100 text-[#5A1D16] flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold text-[#3D221B]">{title}</h2>
          <p className="text-sm text-[#6F6864] leading-relaxed">{message}</p>
          <div className="pt-2 flex justify-center gap-3">
            <Button variant="primary" onClick={onRetry} className="text-sm py-2 px-6">
              Try Again
            </Button>
            <Button href="/" variant="outline" className="text-sm py-2 px-6">
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryNavToggle } from "@/components/gallery/GalleryNavToggle";
import { getPublishedVideos } from "@/lib/api";
import { VideoGalleryView } from "@/components/gallery/VideoGalleryView";

export const metadata: Metadata = {
  title: "Video Gallery & Lecture Demonstrations | Ignite Learning Academy",
  description:
    "Watch video demonstrations: Montessori material presentations, kindergarten classroom practicums, and annual convocation ceremonies at Ignite Learning Academy Bangalore.",
};

export const revalidate = 60;

export default async function VideosPage() {
  const videos = await getPublishedVideos();

  return (
    <>
      {/* Hero Header */}
      <PageHero
        badge={<GalleryNavToggle active="videos" />}
        title="Video Lectures & Campus Highlights"
        description="Watch authentic classroom teaching demonstrations, Montessori apparatus walkthroughs, and keynote convocation speeches from our campus."
      />

      {/* Main Video Gallery Section */}
      <Section background="white">
        <Container>
          <VideoGalleryView initialVideos={videos} />
        </Container>
      </Section>
    </>
  );
}

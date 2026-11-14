import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryNavToggle } from "@/components/gallery/GalleryNavToggle";
import { getPublishedPhotos, resolveMediaUrl } from "@/lib/api";
import { PhotoGalleryView } from "@/components/gallery/PhotoGalleryView";
import { CHILDREN_GALLERY_PHOTOS } from "@/data/galleryPhotos";

export const metadata: Metadata = {
  title: "Campus & Student Life Photo Gallery | Ignite Learning Academy",
  description:
    "Explore our photo gallery: Montessori classrooms, creative workshops, student activities, and teacher training sessions in Bengaluru and Pune.",
  alternates: {
    canonical: "https://ignitelearningacademy.in/gallery",
  },
};

export const revalidate = 60;

export default async function GalleryPage() {
  const publishedPhotos = await getPublishedPhotos();
  const photos =
    publishedPhotos && publishedPhotos.length > 0
      ? publishedPhotos
      : CHILDREN_GALLERY_PHOTOS;

  // JSON-LD ImageGallery Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Ignite Learning Academy Photo Gallery",
    description:
      "Visual tour of early childhood teacher training classrooms, Montessori apparatus workshops, and campus life in Bengaluru and Pune.",
    image: photos.map((photo) => ({
      "@type": "ImageObject",
      name: photo.title,
      contentUrl: resolveMediaUrl(photo.url),
      description: photo.description || photo.altText,
      caption: photo.altText,
    })),
  };

  return (
    <>
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <PageHero
        badge={<GalleryNavToggle active="photos" />}
        title="Life at Ignite Learning Academy"
        description="Explore moments from our Montessori classrooms, creative workshops, student activities, and educator training sessions."
      />

      {/* Main Gallery Section */}
      <Section background="white">
        <Container>
          <PhotoGalleryView initialPhotos={photos} />
        </Container>
      </Section>
    </>
  );
}

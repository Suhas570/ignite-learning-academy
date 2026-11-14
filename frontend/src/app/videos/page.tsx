import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryNavToggle } from "@/components/gallery/GalleryNavToggle";
import { getPublishedVideos, MediaItem } from "@/lib/api";
import { VideoGalleryView } from "@/components/gallery/VideoGalleryView";

const fallbackVideos: MediaItem[] = [
  {
    id: 31,
    title: "DIY Ladybug Craft",
    description: "Best-out-of-waste ladybug beetle craft created using recycled old buttons.",
    altText: "DIY Ladybug Craft student work video",
    category: "Student Work",
    mediaType: "video",
    url: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990999/ignite-academy/___OLD_BUTTONS___CUTE_BUG_BEETLE_A_simple_Best_Out_of_Waste_craft_made_using_old.mp4",
    thumbnailURL: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990999/ignite-academy/___OLD_BUTTONS___CUTE_BUG_BEETLE_A_simple_Best_Out_of_Waste_craft_made_using_old.jpg",
    status: "published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: 30,
    title: "Parts of a Plant Activity",
    description: "Interactive parts of a plant and life cycle teaching aid prepared by teacher trainees.",
    altText: "Parts of a Plant Activity classroom demonstration video",
    category: "Classroom",
    mediaType: "video",
    url: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990993/ignite-academy/___Parts_of_a_Plant___Its_Life_Cycle___Prepared_by_teacher_Trainees_at_Fun_n_Joy.mp4",
    thumbnailURL: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990993/ignite-academy/___Parts_of_a_Plant___Its_Life_Cycle___Prepared_by_teacher_Trainees_at_Fun_n_Joy.jpg",
    status: "published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: 29,
    title: "Straw Weaving Craft",
    description: "Creative straw weaving craft session from our hands-on teacher training workshop.",
    altText: "Straw Weaving Craft workshop video",
    category: "Workshops",
    mediaType: "video",
    url: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990988/ignite-academy/Watch_this_straw_craft_come_to_life______At_our_training_sessions__we_believe_in.mp4",
    thumbnailURL: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990988/ignite-academy/Watch_this_straw_craft_come_to_life______At_our_training_sessions__we_believe_in.jpg",
    status: "published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: 28,
    title: "Paper Plate Spider Web Craft",
    description: "DIY preschool teaching-learning material turning a paper plate into a spider web.",
    altText: "Paper Plate Spider Web Craft workshop video",
    category: "Workshops",
    mediaType: "video",
    url: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990978/ignite-academy/Paper_Plate_Spider_Web_______DIY_TLM_for_PreschoolTurn_a_paper_plate_and_leftove.mp4",
    thumbnailURL: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990978/ignite-academy/Paper_Plate_Spider_Web_______DIY_TLM_for_PreschoolTurn_a_paper_plate_and_leftove.jpg",
    status: "published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: 25,
    title: "Creative Shapes Fish Activity",
    description: "Cut-and-paste geometric shapes art activity forming a colourful fish.",
    altText: "Creative Shapes Fish Activity student work video",
    category: "Student Work",
    mediaType: "video",
    url: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990950/ignite-academy/Circle___Square___Triangle___Rectangle________Creative_Fish_A_fun_Cut___Paste_Ar.mp4",
    thumbnailURL: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990950/ignite-academy/Circle___Square___Triangle___Rectangle________Creative_Fish_A_fun_Cut___Paste_Ar.jpg",
    status: "published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: 24,
    title: "Straw Blow Painting Activity",
    description: "Playful straw blow painting activity helping children explore colour patterns.",
    altText: "Straw Blow Painting Activity event video",
    category: "Events",
    mediaType: "video",
    url: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990928/ignite-academy/A_fun_art_activity_where_children_use_straws_to_blow_colors_and_create_unique_pa.mp4",
    thumbnailURL: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792990928/ignite-academy/A_fun_art_activity_where_children_use_straws_to_blow_colors_and_create_unique_pa.jpg",
    status: "published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: 34,
    title: "Campus Tour & Learning Spaces",
    description: "Guided tour of Ignite Learning Academy classrooms, labs, and training spaces.",
    altText: "Campus Tour and Learning Spaces video",
    category: "Campus",
    mediaType: "video",
    url: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792819489/ignite-academy/CampusTour.mp4",
    thumbnailURL: "https://res.cloudinary.com/cbbjut8p/video/upload/v1792819489/ignite-academy/CampusTour.jpg",
    status: "published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  },
];

export const metadata: Metadata = {
  title: "Video Gallery & Lecture Demonstrations | Ignite Learning Academy",
  description:
    "Watch hands-on craft workshops, student learning activities, teaching aid demonstrations, and campus highlights from Ignite Learning Academy in Bengaluru and Pune.",
  alternates: {
    canonical: "https://ignitelearningacademy.in/videos",
  },
};

export const revalidate = 60;

export default async function VideosPage() {
  const fetchedVideos = await getPublishedVideos();
  const videos =
    fetchedVideos && fetchedVideos.length > 0 ? fetchedVideos : fallbackVideos;

  return (
    <>
      {/* Hero Header */}
      <PageHero
        badge={<GalleryNavToggle active="videos" />}
        title="Student Activities & Classroom Videos"
        description="Watch hands-on craft workshops, student learning activities, teaching aid demonstrations, and campus highlights from Ignite Learning Academy."
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

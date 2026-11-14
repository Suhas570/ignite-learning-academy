import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CourseCard } from "@/components/courses/CourseCard";
import { getStudentCourses } from "@/lib/api";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Student Training Programs | Ignite Learning Academy",
  description:
    "Public speaking, creative communication, debate, and essential life skills courses for juniors and teens in Bengaluru and Pune.",
  alternates: {
    canonical: "https://ignitelearningacademy.in/student-training",
  },
};

export default async function StudentTrainingPage() {
  const courses = await getStudentCourses();

  return (
    <>
      <PageHero
        badge={
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9B13A]/15 text-[#3D221B] text-xs font-bold uppercase tracking-wider">
            <span>Student Development • Ages 6 to 18</span>
          </div>
        }
        title="Student Training Programs"
        description="Building confident young voices, expressive public speakers, and emotionally resilient leaders through experiential workshops and practical speech labs."
      />

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Section>

      <Section background="cream" className="border-t border-[rgba(90,29,22,0.06)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
                Youth Communication &amp; Life Skills
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B] leading-tight">
                Nurture Lifelong Confidence &amp; Leadership
              </h2>
              <p className="text-sm sm:text-base text-[#6F6864] leading-relaxed">
                Our weekend programs guide students aged 6 to 18 to overcome stage hesitation, master persuasive debate, and cultivate practical life skills.
              </p>
            </div>
            <div className="lg:col-span-6">
              <EnquiryForm
                title="Enquire for Student Batches"
                subtitle="Reach out to book a complimentary trial workshop or speak with an advisor."
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


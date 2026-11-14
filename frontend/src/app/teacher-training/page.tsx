import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { CourseCard } from "@/components/courses/CourseCard";
import { getTeacherCourses } from "@/lib/api";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Teacher Training Programs | Ignite Learning Academy",
  description:
    "Government-authorized Nursery Teacher Training (NTT), Public Speaking & Spoken English for Teachers, and Educator Certifications in Bengaluru and Pune.",
  alternates: {
    canonical: "https://ignitelearningacademy.in/teacher-training",
  },
};

export default async function TeacherTrainingPage() {
  const courses = await getTeacherCourses();

  return (
    <>
      <PageHero
        badge={
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9B13A]/15 text-[#3D221B] text-xs font-bold uppercase tracking-wider">
            <span>Educator Certifications • Admissions Open</span>
          </div>
        }
        title="Teacher Training Programs"
        description="Industry-recognized diplomas and certifications designed to equip aspiring and practicing educators with modern pedagogy, classroom English fluency, and practical school internships."
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
                Educator Admissions Desk
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B] leading-tight">
                Advance Your Teaching Career With Certified Pedagogy
              </h2>
              <p className="text-sm sm:text-base text-[#6F6864] leading-relaxed">
                Speak with our senior academic counsellors regarding NTT diploma batches, flexible weekend options, and guaranteed classroom practicum placements in Bengaluru and Pune.
              </p>
            </div>
            <div className="lg:col-span-6">
              <EnquiryForm
                title="Book Educator Career Counselling"
                subtitle="Fill in your details below to receive the detailed syllabus and batch schedule."
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


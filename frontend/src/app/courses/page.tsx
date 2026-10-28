import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { getCourses } from "@/lib/api";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programmes & Certifications | Ignite Learning Academy",
  description:
    "Explore certified Nursery Teachers Training (NTT) diplomas, Play-Based Learning workshops, and Educator Communication certifications in Bangalore. Admissions open.",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      {/* 1. Header Banner */}
      <PageHero
        badge={
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9B13A]/15 text-[#3D221B] text-xs font-bold uppercase tracking-wider">
            <span>Academic Catalog • Admissions Open</span>
          </div>
        }
        title="Teacher Preparation Programmes & Certifications"
        description="Designed for aspiring educators, working teachers, and career changers. Our curricula combine international pedagogical best practices with deep practical practicums."
      />

      {/* 2. Course Grid */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                hoverable
                className="flex flex-col justify-between border-t-4 border-t-[#5A1D16] bg-white shadow-sm hover:shadow-xl transition-all"
              >
                <div className="space-y-5">
                  {/* Badge & Duration */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF8F5] text-[#5A1D16] border border-[#5A1D16]/20">
                      {course.badge}
                    </span>
                    <span className="text-xs font-semibold text-[#6F6864] flex items-center gap-1">
                      🕒 {course.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] leading-snug">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="hover:text-[#5A1D16] transition-colors"
                    >
                      {course.title}
                    </Link>
                  </h2>

                  {/* Short Description */}
                  <p className="text-sm text-[#6F6864] leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Program Metadata */}
                  <div className="space-y-2 pt-3 border-t border-[rgba(90,29,22,0.08)] text-xs text-[#6F6864]">
                    <div>
                      <strong className="text-[#3D221B]">Eligibility:</strong> {course.eligibility}
                    </div>
                    <div>
                      <strong className="text-[#3D221B]">Delivery Mode:</strong> {course.mode}
                    </div>
                    <div>
                      <strong className="text-[#3D221B]">Core Modules:</strong> {(course.syllabus || course.modules).length} syllabus units
                    </div>
                  </div>

                  {/* Module List Preview */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-bold text-[#3D221B] uppercase tracking-wider">
                      Key Topics Covered:
                    </div>
                    <ul className="space-y-1 text-xs text-[#6F6864]">
                      {(course.syllabus || course.modules).slice(0, 4).map((mod, i) => {
                        const colonIdx = mod.indexOf(":");
                        let display = mod;
                        if (colonIdx !== -1) {
                          const secondColon = mod.indexOf(":", colonIdx + 1);
                          if (secondColon !== -1) {
                            display = mod.substring(0, secondColon).trim();
                          }
                        }
                        return (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-[#E9B13A] font-bold">›</span>
                            <span>{display}</span>
                          </li>
                        );
                      })}
                      {(course.syllabus || course.modules).length > 4 && (
                        <li className="text-[11px] text-[#5A1D16] font-medium pt-1">
                          + {(course.syllabus || course.modules).length - 4} additional specialized modules
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 border-t border-[rgba(90,29,22,0.08)] space-y-2">
                  <Button
                    href={`/courses/${course.slug}`}
                    variant="primary"
                    className="w-full text-sm py-2.5"
                  >
                    Learn More & Syllabus
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Enquiry Section */}
      <Section background="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
                Need Admission Guidance?
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B] leading-tight">
                Not Sure Which Programme Aligns With Your Goals?
              </h2>
              <p className="text-sm sm:text-base text-[#6F6864] leading-relaxed">
                Whether you are starting from scratch or looking to upskill with play-based techniques,
                our academic advisors are here to evaluate your experience and recommend the optimal learning pathway.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-[rgba(90,29,22,0.1)] space-y-3">
                <div className="text-sm font-bold text-[#3D221B]">Direct Admissions Desk</div>
                <div className="text-xs text-[#6F6864]">
                  Phone:{" "}
                  <a href="tel:+919011901930" className="font-semibold text-[#5A1D16] hover:underline">
                    +91 90119 01930
                  </a>
                </div>
                <div className="text-xs text-[#6F6864]">
                  Email:{" "}
                  <span className="font-semibold text-[#5A1D16]">admissions@igniteacademy.in</span>
                </div>
                <div className="text-xs text-[#6F6864]">
                  Campus Hours: Monday – Saturday, 9:00 AM – 5:30 PM IST
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EnquiryForm
                title="Download Syllabus & Fee Structure"
                subtitle="Select your course below to receive the detailed academic prospectus."
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

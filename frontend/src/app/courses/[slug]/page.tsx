import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { getAllCourseSlugs } from "@/data/courses";
import { getCourseBySlug, getCourses } from "@/lib/api";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const courses = await getCourses();
    const slugs = courses.map((course) => course.slug);
    slugs.push("public-speaking-spoken-english-for-teachers");
    return slugs.map((slug) => ({
      slug,
    }));
  } catch {
    return getAllCourseSlugs().map((slug) => ({
      slug,
    }));
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Ignite Learning Academy",
      description: "The requested teacher training course could not be located.",
    };
  }

  return {
    title: `${course.title} | Ignite Learning Academy Bangalore`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const allCourses = await getCourses();

  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to enquire about the ${course.title} programme at Ignite Learning Academy.`
  );
  const whatsappUrl = `https://wa.me/9011901930?text=${whatsappMessage}`;

  return (
    <>
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF8F5] via-white to-white py-14 sm:py-20 border-b border-[rgba(90,29,22,0.06)]">
        <Container>
          <div className="max-w-4xl space-y-4">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#6F6864]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#5A1D16] transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href="/courses" className="hover:text-[#5A1D16] transition-colors">
                Courses
              </Link>
              <span>›</span>
              <span className="text-[#3D221B] font-bold truncate">{course.title}</span>
            </nav>

            {/* Badge & Mode Tag */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#5A1D16] text-white">
                {course.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E9B13A]/20 text-[#3D221B] border border-[#E9B13A]/40">
                Admissions Open 2026
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3D221B] tracking-tight leading-tight">
              {course.title}
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-xl text-[#6F6864] leading-relaxed max-w-3xl">
              {course.shortDescription}
            </p>

            {/* Key Meta Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[rgba(90,29,22,0.08)]">
              <div className="bg-[#FFF8F5] p-3 rounded-xl border border-[rgba(90,29,22,0.08)]">
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#6F6864]">Duration</div>
                <div className="text-sm font-extrabold text-[#3D221B] mt-0.5">{course.duration}</div>
              </div>
              <div className="bg-[#FFF8F5] p-3 rounded-xl border border-[rgba(90,29,22,0.08)]">
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#6F6864]">Delivery Mode</div>
                <div className="text-sm font-extrabold text-[#3D221B] mt-0.5">{course.mode.split("(")[0]}</div>
              </div>
              <div className="bg-[#FFF8F5] p-3 rounded-xl border border-[rgba(90,29,22,0.08)]">
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#6F6864]">Modules</div>
                <div className="text-sm font-extrabold text-[#3D221B] mt-0.5">{(course.syllabus || course.modules).length} Core Units</div>
              </div>
              <div className="bg-[#FFF8F5] p-3 rounded-xl border border-[rgba(90,29,22,0.08)]">
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#6F6864]">Placement</div>
                <div className="text-sm font-extrabold text-[#3D221B] mt-0.5">100% Support</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Content & Sidebar Layout */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Column: Overview, Modules, Outcomes */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-[#3D221B]">Programme Overview</h2>
                <p className="text-base text-[#6F6864] leading-relaxed">
                  {course.description}
                </p>
                <div className="p-5 rounded-2xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.1)] space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5A1D16]">
                    Eligibility Criteria
                  </div>
                  <p className="text-sm text-[#3D221B] font-medium leading-relaxed">
                    {course.eligibility}
                  </p>
                </div>
              </div>

              {/* Syllabus Modules */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E9B13A]">
                    Curriculum Architecture
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#3D221B] mt-1">
                    Syllabus Modules ({(course.syllabus || course.modules).length} Units)
                  </h2>
                </div>

                <div className="space-y-3">
                  {(course.syllabus || course.modules).map((mod, index) => {
                    let title = mod.trim();
                    let desc: string | null = null;

                    const colonIndex = mod.indexOf(":");
                    if (colonIndex !== -1) {
                      const secondColonIndex = mod.indexOf(":", colonIndex + 1);
                      if (secondColonIndex !== -1) {
                        // "Module 1: Title: Description"
                        title = mod.substring(0, secondColonIndex).trim();
                        desc = mod.substring(secondColonIndex + 1).trim();
                      } else if (!/^Module\s+\d+:/i.test(mod)) {
                        // "Title: Description"
                        title = mod.substring(0, colonIndex).trim();
                        desc = mod.substring(colonIndex + 1).trim();
                      } else {
                        // "Module 1: Title"
                        title = mod.trim();
                        desc = null;
                      }
                    }

                    return (
                      <Card key={index} hoverable className="p-4 sm:p-5 bg-white border border-[rgba(90,29,22,0.1)] shadow-sm">
                        <div className={`flex ${desc ? "items-start" : "items-center"} gap-4`}>
                          <div className="w-10 h-10 rounded-xl bg-[#FFF8F5] border border-[#5A1D16]/20 text-[#5A1D16] font-bold text-sm flex items-center justify-center shrink-0">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="space-y-1 flex-1">
                            <h3 className="text-base font-bold text-[#3D221B]">{title}</h3>
                            {desc && (
                              <p className="text-sm text-[#6F6864] leading-relaxed">
                                {desc}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E9B13A]">
                    What You Will Achieve
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#3D221B] mt-1">
                    Graduate Learning Outcomes
                  </h2>
                </div>

                <Card className="bg-[#FFF8F5]/60 border border-[rgba(90,29,22,0.1)] p-6 sm:p-8">
                  <ul className="space-y-3.5">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E9B13A] text-[#3D221B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          ✓
                        </div>
                        <p className="text-sm text-[#3D221B] leading-relaxed">{outcome}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar with WhatsApp CTA & Enquiry Form */}
            <aside className="lg:col-span-4 space-y-6">
              {/* WhatsApp Action Card */}
              <Card className="bg-[#3D221B] text-white p-6 sm:p-8 space-y-5 border-2 border-[#E9B13A]/40 shadow-lg">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider inline-block">
                    Instant WhatsApp Support
                  </span>
                  <h3 className="text-xl font-bold text-white">Have Questions About This Course?</h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Chat directly with our academic admissions counselor to get fee breakdowns, batch schedules, and scholarship details.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm py-3.5 px-4 rounded-full transition-all shadow-md hover:shadow-xl active:scale-95 text-center"
                  id="btnSidebarWhatsApp"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.927-2.233-.244-.587-.493-.507-.677-.517l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.121 3.238 5.138 4.542.718.31 1.278.496 1.716.635.72.229 1.376.197 1.895.12.578-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.514 2 2.023 6.49 2.023 12.015c0 1.94.553 3.754 1.517 5.29L2 22l4.836-1.503a9.98 9.98 0 0 0 5.204 1.52c5.526 0 10.017-4.49 10.017-10.017C22.057 6.49 17.566 2 12.04 2zm0 18.283c-1.618 0-3.123-.46-4.407-1.258l-.316-.196-3.267 1.016 1.039-3.18-.215-.333A8.256 8.256 0 0 1 3.77 12.015c0-4.56 3.71-8.27 8.27-8.27 4.56 0 8.27 3.71 8.27 8.27 0 4.56-3.71 8.268-8.27 8.268z" />
                  </svg>
                  <span>Enquire via WhatsApp</span>
                </a>
              </Card>

              {/* Enquiry Form */}
              <EnquiryForm
                defaultCourseSlug={course.slug}
                title="Enquire About This Course"
                subtitle="Fill the form to download syllabus & schedule counselor callback."
              />

              {/* Other Courses Links */}
              <Card className="bg-[#FFF8F5] p-6 space-y-4 border border-[rgba(90,29,22,0.1)]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#3D221B]">
                  Other Available Programmes
                </div>
                <div className="space-y-2">
                  {allCourses.filter((c) => c.slug !== course.slug).map((other) => (
                    <Link
                      key={other.id}
                      href={`/courses/${other.slug}`}
                      className="block p-3 rounded-xl bg-white border border-[rgba(90,29,22,0.08)] hover:border-[#5A1D16] transition-all group"
                    >
                      <div className="text-xs font-bold text-[#3D221B] group-hover:text-[#5A1D16] transition-colors">
                        {other.title}
                      </div>
                      <div className="text-[11px] text-[#6F6864] flex items-center gap-1 mt-0.5">
                        <span>🕒 {other.duration}</span>
                        <span>•</span>
                        <span>{other.badge}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

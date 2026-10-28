import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Briefcase,
  BookOpenCheck,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Award,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCampusLifeVideos, getCourses } from "@/lib/api";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CoursesSlider } from "@/components/home/CoursesSlider";
import { CampusLifeSection } from "@/components/home/CampusLifeSection";
import { FloatingTestimonials } from "@/components/home/FloatingTestimonials";
import { AdmissionProcess } from "@/components/home/AdmissionProcess";
import { FAQSection } from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "Ignite Learning Academy | Premier Early Childhood Teacher Training in Bangalore",
  description:
    "Transform into a certified early childhood educator with our recognized Nursery Teachers Training (NTT) Diploma, play-based pedagogy workshops, and 100% placement support in Bangalore.",
};

export const revalidate = 60;

const WHY_CHOOSE_IGNITE = [
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    description:
      "Learn directly from seasoned early childhood education specialists, senior child psychologists, and active international school principals in Bangalore.",
    highlight: "15+ Years Mentorship",
  },
  {
    icon: Sparkles,
    title: "Play-Based Methodology",
    description:
      "Go beyond rote memorization. Master experiential, child-led inquiry and authentic sensory materials aligned with NEP 2020 foundational guidelines.",
    highlight: "NEP 2020 Aligned",
  },
  {
    icon: Briefcase,
    title: "Placement Support",
    description:
      "Benefit from 100% career guidance, portfolio reviews, mock demonstration interviews, and direct placement tie-ups across leading Bangalore schools.",
    highlight: "100% Placement Support",
  },
  {
    icon: BookOpenCheck,
    title: "Practical Training",
    description:
      "Hands-on simulated teaching labs, phonics kits, storytelling workshops, and guaranteed mentored classroom practicums in partner institutions.",
    highlight: "Hands-on Practicums",
  },
];

export default async function HomePage() {
  const priorityOrder = [
    "nursery-teachers-training",
    "public-speaking-for-juniors",
    "life-skills-for-juniors",
    "teachers-training-certificate-program",
    "communication-for-impact",
    "public-speaking-for-seniors",
    "life-skills-for-seniors",
  ];
  const allCourses = await getCourses();
  const featuredCourses = [...allCourses.filter((c) => c.featured)].sort(
    (a, b) => {
      const idxA = priorityOrder.indexOf(a.slug);
      const idxB = priorityOrder.indexOf(b.slug);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    }
  );
  const campusVideos = await getCampusLifeVideos(4);

  return (
    <>
      {/* 1. HERO SECTION: 3-Slide Embla Carousel with 5s Auto-Rotation */}
      <HeroCarousel />

      {/* Trust Bar Banner */}
      <div className="bg-[#FFF8F5] border-y border-[rgba(90,29,22,0.08)] py-6">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#5A1D16]">100%</div>
              <div className="text-xs sm:text-sm text-[#6F6864] font-semibold">Placement Support</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#5A1D16]">500+</div>
              <div className="text-xs sm:text-sm text-[#6F6864] font-semibold">Trained Educators</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#5A1D16]">NEP 2020</div>
              <div className="text-xs sm:text-sm text-[#6F6864] font-semibold">Aligned Pedagogy</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#5A1D16]">Bangalore</div>
              <div className="text-xs sm:text-sm text-[#6F6864] font-semibold">Campus & Practicums</div>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. FEATURED PROGRAMS: Embla Horizontal Slider (1 mobile / 2 tablet / 3 desktop) */}
      <Section id="courses" background="white" className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
                <Award className="w-4 h-4 text-[#5A1D16]" />
                Featured Programs
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
                Industry-Recognized Teacher & Student Programs
              </h2>
              <p className="text-sm sm:text-base text-[#6F6864]">
                Explore our accredited early childhood certifications and transformative public speaking & life skills courses in Bangalore.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#5A1D16] hover:text-[#6B241A] transition-colors whitespace-nowrap group"
            >
              <span>Explore All Programs</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Horizontal Slider Component */}
          <CoursesSlider courses={featuredCourses} />
        </Container>
      </Section>

      {/* 3. "THE IGNITE ADVANTAGE" & "CAMPUS LIFE" (Home Gallery) */}
      <Section background="cream" className="py-16 sm:py-24 border-t border-[rgba(90,29,22,0.06)]">
        <Container className="space-y-20">
          {/* Why Choose Ignite Learning Academy */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
                <Sparkles className="w-4 h-4 text-[#5A1D16]" />
                The Ignite Advantage
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
                Why Choose Ignite Learning Academy
              </h2>
              <p className="text-sm sm:text-base text-[#6F6864]">
                Bridging academic rigor with real-world preschool dynamics and holistic student empowerment in Bangalore.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_IGNITE.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-[rgba(90,29,22,0.08)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      {/* Icon Box */}
                      <div className="w-14 h-14 rounded-2xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.1)] flex items-center justify-center text-[#5A1D16] group-hover:bg-[#5A1D16] group-hover:text-white transition-colors duration-300 shadow-xs">
                        <IconComponent className="w-7 h-7" />
                      </div>

                      {/* Highlight Badge */}
                      <span className="inline-block text-[11px] font-bold text-[#5A1D16] bg-[#E9B13A]/15 px-2.5 py-0.5 rounded-full">
                        {item.highlight}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#3D221B] group-hover:text-[#5A1D16] transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#6F6864] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Campus Life Section: 4 published videos with play overlay & modal */}
          <div className="pt-8 border-t border-[rgba(90,29,22,0.08)]">
            <CampusLifeSection videos={campusVideos} />
          </div>
        </Container>
      </Section>

      {/* 4. FLOATING TESTIMONIALS SECTION: "What Our Community Says" (Opposite scrolling marquees with hover:pause) */}
      <FloatingTestimonials />

      {/* 5. ADMISSION PROCESS SECTION: 4-Step Process */}
      <AdmissionProcess />

      {/* 6. HOME ENQUIRY SECTION */}
      <Section id="enquire" background="cream" className="py-16 sm:py-24 border-t border-[rgba(90,29,22,0.06)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
                Start Your Journey
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B] leading-tight">
                Ready to Become an Inspiring Early Childhood Educator?
              </h2>
              <p className="text-sm sm:text-base text-[#6F6864] leading-relaxed">
                Connect with our academic counseling team today. We will guide you on course eligibility,
                syllabus breakdowns, weekend schedules, and payment plans at our Bangalore campus.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A1D16] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#3D221B]">
                    <strong>Free Academic Counselling:</strong> Speak directly with senior child pedagogy advisors.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A1D16] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#3D221B]">
                    <strong>Flexible Installments:</strong> Easy fee schedules designed for working learners.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A1D16] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#3D221B]">
                    <strong>Live Practicum Support:</strong> Guaranteed mentored internship placements in Bangalore.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#6F6864]">
                <a
                  href="tel:+919011901930"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(90,29,22,0.1)] hover:border-[#5A1D16] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5A1D16]" />
                  <span>+91 90119 01930</span>
                </a>
                <a
                  href="mailto:ignitelearningacademy8@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(90,29,22,0.1)] hover:border-[#5A1D16] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#5A1D16]" />
                  <span>ignitelearningacademy8@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EnquiryForm
                title="Book a Free Counseling Session"
                subtitle="Fill in your contact details below and our coordinator will get in touch."
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. FAQS SECTION */}
      <FAQSection />
    </>
  );
}

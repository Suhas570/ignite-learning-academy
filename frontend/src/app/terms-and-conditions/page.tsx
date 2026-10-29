import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Scale, BookOpen, AlertTriangle, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ignite Learning Academy",
  description:
    "Review the terms of engagement, intellectual property policies, enrollment guidelines, and code of conduct for Ignite Learning Academy in Bangalore.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero
        badge={
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF0EB] text-[#5A1D16] border border-[#5A1D16]/15">
            <Scale className="w-3.5 h-3.5 text-[#5A1D16]" />
            Academic Guidelines &amp; Terms
          </span>
        }
        title="Terms & Conditions"
        description="Guidelines governing the use of our educational portal, teacher-training programs, and student learning services."
      >
        <p className="text-xs sm:text-sm font-semibold text-[#5A1D16]/80 mt-2">
          Last Updated: October 2026
        </p>
      </PageHero>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12 text-[#3D221B]/90 text-sm sm:text-base leading-relaxed">
            {/* Agreement Notice Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.1)] shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#3D221B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#5A1D16]" />
                Agreement to Terms
              </h2>
              <p className="text-[#6F6864]">
                Welcome to <strong>Ignite Learning Academy</strong> (&ldquo;Academy&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing our website, registering for admissions, submitting an enquiry, or enrolling in any of our teacher preparation or student programs, you agree to be bound by these Terms &amp; Conditions. If you disagree with any part of these terms, please do not use our services.
              </p>
            </div>

            {/* Section 1: Educational Programs & Admissions */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  1
                </span>
                Educational Programs &amp; Admissions
              </h2>
              <p>
                Ignite Learning Academy conducts premier early childhood teacher preparation and student empowerment courses, including:
              </p>
              <ul className="space-y-2.5 pl-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Nursery Teacher Training (NTT) Diploma:</strong> 1-year comprehensive diploma covering Montessori apparatus practicums, child developmental psychology, phonics, and kindergarten classroom management.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Public Speaking &amp; Communication:</strong> Structured programs for junior learners, senior students, and educators seeking enhanced stage presence and verbal impact.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Life Skills &amp; Leadership:</strong> Experiential modules focusing on emotional intelligence, conflict resolution, collaborative teamwork, and creative problem solving.
                  </span>
                </li>
              </ul>
              <p className="text-xs sm:text-sm text-[#6F6864]">
                Course schedules, batch timings, syllabi modules, and practicum locations may be updated periodically to maintain compliance with progressive early childhood pedagogy (NEP 2020) and optimal learning outcomes.
              </p>
            </div>

            {/* Section 2: Intellectual Property Rights */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  2
                </span>
                Intellectual Property &amp; Course Materials
              </h2>
              <p>
                All content published on this website and distributed within our training sessions—including but not limited to curriculum syllabi, lesson plans, Montessori worksheets, video practicum demonstrations, course slide decks, brand logos, and website code—is the proprietary intellectual property of Ignite Learning Academy and protected under Indian and international copyright laws.
              </p>
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 text-xs sm:text-sm text-[#3D221B] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Restrictions:</strong> Enrolled trainees and website visitors are granted a personal, non-transferable license to review materials for individual learning purposes only. You may not reproduce, resell, broadcast, reverse-engineer, or commercially distribute Academy materials without prior written consent from the Academic Dean.
                </p>
              </div>
            </div>

            {/* Section 3: Student Conduct & Ethics */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  3
                </span>
                Code of Conduct &amp; Classroom Ethics
              </h2>
              <p>
                As an educational institution cultivating future teachers and responsible young speakers, we uphold the highest standards of professional ethics, respect, and inclusive conduct:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Respectful Interaction:</strong> Trainees, parents, and instructors must treat peers and campus personnel with mutual courtesy, free from discrimination or harassment of any kind.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Academic Integrity:</strong> All assignments, practicum portfolios, and speech projects submitted for grading must represent the authentic work of the enrolled trainee.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Apparatus &amp; Campus Safety:</strong> Montessori materials, classroom furniture, and technological aids must be handled with care according to instructor supervision.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 4: Certification & Academic Credentials */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  4
                </span>
                Certification &amp; Assessment Policy
              </h2>
              <p>
                Certificates and diplomas (including NTT certifications) are awarded upon satisfactory completion of prescribed attendance thresholds, practical demonstrations, micro-teaching assessments, and project submissions.
              </p>
              <p className="text-xs sm:text-sm text-[#6F6864]">
                While our diploma equips graduates with competitive, progressive teacher competencies recognized across preschools and daycares, certification is subject to individual evaluation and does not constitute a legal guarantee of employment.
              </p>
            </div>

            {/* Section 5: Limitation of Liability */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  5
                </span>
                Disclaimers &amp; Limitation of Liability
              </h2>
              <p>
                Our website and online materials are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of uninterrupted service, error-free operation, or absolute compatibility with every browser.
              </p>
              <p>
                To the fullest extent permitted by applicable Indian law, Ignite Learning Academy, its trustees, instructors, and affiliates shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from website downtime, third-party internet disruptions, or reliance on information provided on the public portal.
              </p>
            </div>

            {/* Section 6: Governing Law & Jurisdiction */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  6
                </span>
                Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms &amp; Conditions are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to our educational services or website shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Bangalore, Karnataka, India</strong>.
              </p>
            </div>

            {/* Section 7: Contact Information */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(90,29,22,0.15)] shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#3D221B]">
                Academic Office Contact
              </h2>
              <p className="text-[#6F6864]">
                If you have questions regarding these terms, enrollment criteria, or Academy policies, please contact our administration:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                <div className="flex items-center gap-2.5 text-[#3D221B]">
                  <Mail className="w-4 h-4 text-[#5A1D16]" />
                  <a href="mailto:ignitelearningacademy8@gmail.com" className="hover:text-[#5A1D16] font-medium underline">
                    ignitelearningacademy8@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-[#3D221B]">
                  <Phone className="w-4 h-4 text-[#5A1D16]" />
                  <a href="tel:+919011901930" className="hover:text-[#5A1D16] font-medium">
                    +91 90119 01930
                  </a>
                </div>
                <div className="sm:col-span-2 flex items-start gap-2.5 text-[#6F6864]">
                  <MapPin className="w-4 h-4 text-[#5A1D16] shrink-0 mt-0.5" />
                  <span>Bangalore Campus, Tech City Knowledge Corridor, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div className="pt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#5A1D16] hover:text-[#6B241A] transition-colors"
              >
                ← Return to Home Page
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


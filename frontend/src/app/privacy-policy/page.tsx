import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ShieldCheck, Mail, Phone, MapPin, Lock, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Ignite Learning Academy",
  description:
    "Learn how Ignite Learning Academy collects, handles, and protects personal information from students, parents, and teacher-training applicants in Bangalore.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge={
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF0EB] text-[#5A1D16] border border-[#5A1D16]/15">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5A1D16]" />
            Data Protection & Transparency
          </span>
        }
        title="Privacy Policy"
        description="At Ignite Learning Academy, we value your trust and are committed to safeguarding your personal data with institutional integrity."
      >
        <p className="text-xs sm:text-sm font-semibold text-[#5A1D16]/80 mt-2">
          Last Updated: October 2026
        </p>
      </PageHero>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12 text-[#3D221B]/90 text-sm sm:text-base leading-relaxed">
            {/* Overview Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.1)] shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#3D221B] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#5A1D16]" />
                Institutional Commitment
              </h2>
              <p className="text-[#6F6864]">
                This Privacy Policy explains how <strong>Ignite Learning Academy</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), located in Bangalore, India, collects, uses, processes, and safeguards information gathered through our public website, admissions enquiry forms, and student registration touchpoints. By using our website or submitting an inquiry, you acknowledge the practices described herein.
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  1
                </span>
                Information We Collect
              </h2>
              <p>
                We only collect personal information that you intentionally and voluntarily provide to us when submitting an admission enquiry, requesting a course syllabus, or communicating with our admissions counselors.
              </p>
              <ul className="space-y-2.5 pl-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Personal Identifiers:</strong> Full name, email address, contact telephone / WhatsApp number.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Educational &amp; Course Interests:</strong> Selected program (e.g., Nursery Teacher Training, Public Speaking for Juniors/Seniors, Life Skills), applicant background, and student age bracket.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Inquiry Details &amp; Notes:</strong> Specific questions, career goals, or training preferences entered into our enquiry forms.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Technical Usage Data:</strong> Anonymized server logs, browser type, device category, and standard HTTP headers used solely to maintain site stability and protect against automated spam.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  2
                </span>
                How We Use Your Information
              </h2>
              <p>
                All data collected is used strictly for legitimate educational, academic advisory, and administrative purposes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-[rgba(90,29,22,0.08)] bg-white space-y-1.5">
                  <h3 className="font-bold text-[#5A1D16] text-sm">Admissions &amp; Academic Counseling</h3>
                  <p className="text-xs sm:text-sm text-[#6F6864]">
                    To respond directly to your inquiries regarding curriculum, fee schedules, batch timings, and Montessori practicum requirements.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[rgba(90,29,22,0.08)] bg-white space-y-1.5">
                  <h3 className="font-bold text-[#5A1D16] text-sm">Syllabus &amp; Enrollment Delivery</h3>
                  <p className="text-xs sm:text-sm text-[#6F6864]">
                    To deliver requested course brochures, orientation invites, and enrollment paperwork to your verified email or phone.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[rgba(90,29,22,0.08)] bg-white space-y-1.5">
                  <h3 className="font-bold text-[#5A1D16] text-sm">Important Academic Notices</h3>
                  <p className="text-xs sm:text-sm text-[#6F6864]">
                    To inform enrolled trainees about workshop schedules, guest lecture seminars, or certification convocation dates.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[rgba(90,29,22,0.08)] bg-white space-y-1.5">
                  <h3 className="font-bold text-[#5A1D16] text-sm">Service Improvement &amp; Security</h3>
                  <p className="text-xs sm:text-sm text-[#6F6864]">
                    To maintain firewall integrity, prevent fraudulent form submissions, and ensure high platform uptime for all users.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Third-Party Service Providers */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  3
                </span>
                Secure Third-Party Infrastructure &amp; Data Processors
              </h2>
              <p>
                We do not sell, rent, monetize, or trade your personal information with external advertisers or commercial data brokers. To operate our modern web infrastructure reliably, we collaborate with enterprise cloud service providers that adhere to rigorous data privacy standards:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.08)] flex items-start gap-3">
                  <Database className="w-5 h-5 text-[#5A1D16] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#3D221B] text-sm">Neon &amp; Render Cloud Databases</h3>
                    <p className="text-xs text-[#6F6864] mt-0.5">
                      Enquiries and admission records are securely stored in encrypted PostgreSQL databases hosted in ISO/IEC 27001-certified data centres with role-based access control.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.08)] flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#5A1D16] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#3D221B] text-sm">Resend Email Gateway</h3>
                    <p className="text-xs text-[#6F6864] mt-0.5">
                      Transactional emails, admission confirmations, and counseling follow-ups are routed securely via Resend using TLS-encrypted transmission channels.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.08)] flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#5A1D16] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#3D221B] text-sm">Cloudinary Global Media CDN</h3>
                    <p className="text-xs text-[#6F6864] mt-0.5">
                      Campus practicum photographs and educational training media are distributed via Cloudinary&rsquo;s global content delivery network with automated asset security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Data Security & Storage */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  4
                </span>
                Data Security &amp; Retention
              </h2>
              <p>
                We implement administrative, technical, and physical measures designed to protect your personal data against unauthorized access, loss, or alteration. All web communications are encrypted via modern Transport Layer Security (TLS 1.3/HTTPS).
              </p>
              <p>
                We retain enquiry information only for as long as necessary to complete your academic counseling, process ongoing enrollments, or comply with educational regulatory records requirements under Indian law. Inactive prospect records are periodically purged.
              </p>
            </div>

            {/* Section 5: Your Privacy Rights */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3D221B] flex items-center gap-2.5 pb-2 border-b border-[rgba(90,29,22,0.1)]">
                <span className="w-7 h-7 rounded-lg bg-[#5A1D16] text-[#E9B13A] text-xs font-black flex items-center justify-center shrink-0">
                  5
                </span>
                Your Privacy Rights
              </h2>
              <p>
                As a student, parent, or prospective applicant, you retain complete rights over your personal information:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Access &amp; Review:</strong> You may request a copy of the personal details stored about you.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Correction &amp; Updating:</strong> You may correct inaccurate or outdated contact numbers or email addresses.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E9B13A] font-bold text-lg leading-none shrink-0">•</span>
                  <span>
                    <strong>Deletion &amp; Opt-Out:</strong> You may ask us to delete your inquiry history or opt out of admissions follow-up calls or messages at any time.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 6: Contact Information */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(90,29,22,0.15)] shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#3D221B]">
                Questions or Privacy Inquiries?
              </h2>
              <p className="text-[#6F6864]">
                If you have questions regarding this Privacy Policy, wish to exercise your data rights, or want to update your communication preferences, please reach out directly to our administration office:
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
                  <span>Ignite Learning Academy Campus, Tech City Knowledge Corridor, Bangalore, Karnataka, India</span>
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


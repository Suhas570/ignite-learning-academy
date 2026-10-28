import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  GraduationCap,
  MessageSquare,
  Building,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us & Admissions Enquiry | Ignite Learning Academy Bangalore",
  description:
    "Get in touch with Ignite Learning Academy. Reach out for Nursery Teachers Training (NTT) diploma admissions, student speech and life skills programs, and campus visits.",
};

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Bangalore Campus",
    line1: "Ignite Learning Academy",
    line2: "Main Campus, Bangalore, Karnataka 560001",
    action: {
      label: "Get Directions",
      href: "https://maps.google.com/?q=Ignite+Learning+Academy+Bangalore",
    },
  },
  {
    icon: Phone,
    title: "Direct Calling",
    line1: "+91 90119 01930",
    line2: "Admissions Helpline (Mon–Sat)",
    action: {
      label: "Call Now",
      href: "tel:+919011901930",
    },
  },
  {
    icon: Mail,
    title: "Email Admissions",
    line1: "ignitelearningacademy8@gmail.com",
    line2: "General and corporate inquiries",
    action: {
      label: "Send Email",
      href: "mailto:ignitelearningacademy8@gmail.com",
    },
  },
  {
    icon: Clock,
    title: "Campus Hours",
    line1: "Monday – Saturday",
    line2: "9:00 AM – 6:00 PM IST",
    action: {
      label: "Sunday: Closed",
      href: "#",
    },
  },
];

export default function ContactPage() {
  return (
    <>
      {/* 1. Page Hero */}
      <PageHero
        badge={
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9B13A]/20 text-[#5A1D16] border border-[#E9B13A]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions & Inquiries</span>
          </span>
        }
        title="We're Here to Guide Your Educational Journey"
        description="Whether you're an aspiring early educator looking for accredited NTT certification or a parent seeking transformative communication and life skills for your child, our counseling team is ready to assist you."
      />

      {/* 2. Main Contact Grid */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Value Props */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E9B13A]">
                  Campus Information
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D221B] mt-1 mb-3">
                  Visit or Connect with Our Advisors
                </h2>
                <p className="text-sm text-[#6F6864] leading-relaxed">
                  We invite prospective trainees, parents, and educators to experience our campus, observe Montessori practical labs, and discuss course curricula directly with faculty mentors.
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_INFO.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-[rgba(90,29,22,0.08)] bg-[#FFFBF8] hover:border-[#5A1D16]/30 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#5A1D16]/10 text-[#5A1D16] flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-[#3D221B]">{info.title}</h3>
                      <p className="text-xs text-[#3D221B] font-semibold mt-1">{info.line1}</p>
                      <p className="text-[11px] text-[#6F6864] mt-0.5">{info.line2}</p>
                      {info.action.href !== "#" && (
                        <a
                          href={info.action.href}
                          target={info.action.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-block mt-2.5 text-xs font-bold text-[#5A1D16] hover:text-[#E9B13A] transition-colors"
                        >
                          {info.action.label} →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Trust Badges */}
              <div className="p-5 rounded-2xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.08)] space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold text-[#3D221B]">
                  <GraduationCap className="w-5 h-5 text-[#5A1D16]" />
                  <span>100% Placement & Practicum Assistance</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#3D221B]">
                  <Building className="w-5 h-5 text-[#5A1D16]" />
                  <span>Recognized by Leading Preschool Chains</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#3D221B]">
                  <MessageSquare className="w-5 h-5 text-[#5A1D16]" />
                  <span>Personal 1-on-1 Academic Counseling</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[rgba(90,29,22,0.08)]">
                <EnquiryForm
                  title="Submit an Admissions Enquiry"
                  subtitle="Fill in your details and our senior counselor will connect with you via call or WhatsApp within 24 hours."
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

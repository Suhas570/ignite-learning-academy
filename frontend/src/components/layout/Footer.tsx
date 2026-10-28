import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Container } from "../ui/Container";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3D221B] text-white/80 pt-16 pb-8 border-t-4 border-[#E9B13A]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block p-1.5 bg-white rounded-xl shadow-sm hover:opacity-95 transition-opacity">
              <Image
                src="/ilogo.png"
                alt="Ignite Learning Academy"
                width={220}
                height={64}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm font-semibold text-[#E9B13A]">
              Empowering Teachers. Inspiring Students. Shaping the Future.
            </p>
            <p className="text-xs leading-relaxed text-white/70">
              Premier educator certifications and transformative student programs in Bangalore.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E9B13A] hover:text-[#3D221B] flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ignitelearning24"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E9B13A] hover:text-[#3D221B] flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="mailto:ignitelearningacademy8@gmail.com"
                aria-label="Gmail"
                title="Gmail"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E9B13A] hover:text-[#3D221B] flex items-center justify-center transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#E9B13A] tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> About the Academy
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> Our Programmes
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> Campus & Events Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> Contact & Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#E9B13A] tracking-wider uppercase">
              Programmes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses/nursery-teachers-training" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> NTT Teachers Training
                </Link>
              </li>
              <li>
                <Link href="/courses/public-speaking-for-juniors" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> Public Speaking (Students)
                </Link>
              </li>
              <li>
                <Link href="/courses/life-skills-for-juniors" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> Life Skills for Students
                </Link>
              </li>
              <li>
                <Link href="/courses/communication-for-impact" className="hover:text-[#E9B13A] transition-colors flex items-center gap-2">
                  <span className="text-[#E9B13A]">›</span> Public Speaking &amp; Spoken English for Teachers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#E9B13A] tracking-wider uppercase">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E9B13A] shrink-0 mt-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Bangalore Campus, Tech City Knowledge Corridor, India</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#E9B13A] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:+919011901930" className="hover:text-[#E9B13A] transition-colors">
                  +91 90119 01930
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#E9B13A] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:ignitelearningacademy8@gmail.com" className="hover:text-[#E9B13A] transition-colors">
                  ignitelearningacademy8@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#E9B13A] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <span>Mon – Sun: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Ignite Learning Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

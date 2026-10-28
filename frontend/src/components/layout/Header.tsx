"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Phone,
  MapPin,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Container } from "../ui/Container";

interface CourseLink {
  name: string;
  href: string;
  tag: string;
  desc: string;
}

const CHILDREN_COURSES: CourseLink[] = [
  {
    name: "Public Speaking for Juniors",
    href: "/courses/public-speaking-for-juniors",
    tag: "Ages 6–11",
    desc: "Stage confidence & creative storytelling",
  },
  {
    name: "Public Speaking for Seniors",
    href: "/courses/public-speaking-for-seniors",
    tag: "Ages 12–18",
    desc: "Persuasive rhetoric & debate mastery",
  },
  {
    name: "Life Skills for Juniors",
    href: "/courses/life-skills-for-juniors",
    tag: "Ages 6–11",
    desc: "Emotional intelligence & positive habits",
  },
  {
    name: "Life Skills for Seniors",
    href: "/courses/life-skills-for-seniors",
    tag: "Ages 12–18",
    desc: "Personal finance, time & self-leadership",
  },
];

const TEACHER_COURSES: CourseLink[] = [
  {
    name: "NTT Nursery Teachers Training",
    href: "/courses/nursery-teachers-training",
    tag: "1 Year",
    desc: "Accredited early childhood diploma & practicum",
  },
  {
    name: "Public Speaking & Spoken English for Teachers",
    href: "/courses/communication-for-impact",
    tag: "6 Weeks",
    desc: "Public speaking, fluency & classroom communication",
  },
  {
    name: "Teachers Training Certificate Program",
    href: "/courses/teachers-training-certificate-program",
    tag: "3 Months",
    desc: "Contemporary pedagogy & active learning aids",
  },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCoursesOpen, setDesktopCoursesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"children" | "teachers" | null>(null);

  // Mobile multi-level accordion states
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileChildrenOpen, setMobileChildrenOpen] = useState(false);
  const [mobileTeacherOpen, setMobileTeacherOpen] = useState(false);

  // Dynamic course list state with static fallbacks
  const [childrenCourses, setChildrenCourses] = useState<CourseLink[]>(CHILDREN_COURSES);
  const [teacherCourses, setTeacherCourses] = useState<CourseLink[]>(TEACHER_COURSES);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamically fetch latest courses from Payload CMS API on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchNavCourses() {
      try {
        const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";
        const res = await fetch(`${payloadUrl}/api/courses?limit=100&sort=createdAt`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!data?.docs || !Array.isArray(data.docs) || !isMounted) return;

        const studentList: CourseLink[] = [];
        const teacherList: CourseLink[] = [];

        for (const doc of data.docs) {
          if (doc.status !== "Published") continue;
          const link: CourseLink = {
            name: doc.title,
            href: `/courses/${doc.slug}`,
            tag: doc.targetAge || doc.duration || "",
            desc: doc.description
              ? doc.description.slice(0, 55) + (doc.description.length > 55 ? "..." : "")
              : "",
          };
          if (doc.category === "Teacher Training") {
            teacherList.push(link);
          } else {
            studentList.push(link);
          }
        }

        if (isMounted) {
          if (studentList.length > 0) setChildrenCourses(studentList);
          if (teacherList.length > 0) setTeacherCourses(teacherList);
        }
      } catch {
        // Fallback to static defaults gracefully
      }
    }

    fetchNavCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopCoursesOpen(false);
        setActiveCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDesktopCoursesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDesktopCoursesOpen(false);
      setActiveCategory(null);
    }, 200);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setDesktopCoursesOpen(false);
      setActiveCategory(null);
      setMobileMenuOpen(false);
    }
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300"
      onKeyDown={handleKeyDown}
    >
      {/* Top Gold Contact & Announcement Bar */}
      <div className="bg-[#E9B13A] text-[#3D221B] text-xs font-semibold py-1.5 border-b border-[rgba(46,26,20,0.1)]">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Bangalore Campus</span>
            </span>
            <span className="hidden sm:inline text-black/20">|</span>
            <a
              href="tel:+919011901930"
              className="inline-flex items-center gap-1.5 hover:text-[#5A1D16] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 90119 01930</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1 bg-[#3D221B]/10 px-2.5 py-0.5 rounded-full text-[11px] tracking-wide uppercase font-bold">
              🎓 Admissions Open 2026
            </span>
            <Link
              href="/contact"
              className="bg-[#5A1D16] text-white hover:bg-[#6B241A] px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all shadow-sm"
            >
              Enquire Now
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Navbar - Solid White Background */}
      <nav className="border-b border-[rgba(90,29,22,0.08)] bg-white py-3">
        <Container className="flex items-center justify-between">
          {/* Brand Logo - Rectangular, h-12 md:h-16 w-auto object-contain */}
          <Link
            href="/"
            className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A1D16] rounded-lg"
            aria-label="Ignite Learning Academy Home"
          >
            <Image
              src="/ilogo.png"
              alt="Ignite Learning Academy"
              width={220}
              height={64}
              priority
              className="h-12 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className="relative px-3 py-2 text-sm lg:text-base font-semibold text-[#3D221B] hover:text-[#5A1D16] transition-colors rounded-md group"
            >
              Home
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E9B13A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </Link>

            <Link
              href="/about"
              className="relative px-3 py-2 text-sm lg:text-base font-semibold text-[#3D221B] hover:text-[#5A1D16] transition-colors rounded-md group"
            >
              About
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E9B13A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </Link>

            {/* Standard Cascading Nested Dropdown for Courses */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                id="btnCoursesDropdown"
                onClick={() => setDesktopCoursesOpen((prev) => !prev)}
                aria-expanded={desktopCoursesOpen}
                aria-haspopup="true"
                className="flex items-center gap-1.5 px-3 py-2 text-sm lg:text-base font-semibold text-[#3D221B] group-hover:text-[#5A1D16] hover:text-[#5A1D16] transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A1D16]"
              >
                <span>Courses</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#5A1D16] transition-transform duration-200 ${
                    desktopCoursesOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E9B13A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
              </button>

              {/* Level 1 Dropdown Menu */}
              <div
                role="menu"
                aria-label="Courses Categories"
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[rgba(90,29,22,0.1)] p-2 z-50 transition-all duration-150 ${
                  desktopCoursesOpen
                    ? "opacity-100 visible pointer-events-auto scale-100 translate-y-0"
                    : "opacity-0 invisible pointer-events-none scale-95 -translate-y-1"
                }`}
              >
                  {/* Category 1: Student Training */}
                  <div
                    onMouseEnter={() => setActiveCategory("children")}
                    className="relative"
                  >
                    <button
                      type="button"
                      id="btnDropdownChildren"
                      onClick={() =>
                        setActiveCategory(activeCategory === "children" ? null : "children")
                      }
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors font-semibold text-sm ${
                        activeCategory === "children"
                          ? "bg-[#FFF8F5] text-[#5A1D16]"
                          : "text-[#3D221B] hover:bg-[#FAF6F3]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="p-1 rounded-md bg-[#E9B13A]/20 text-[#5A1D16]">
                          <Sparkles className="w-4 h-4 text-[#5A1D16]" />
                        </span>
                        <div>
                          <div className="font-bold text-xs uppercase tracking-wider text-[#5A1D16]">
                            Student Training
                          </div>
                          <div className="text-[11px] text-[#6F6864] font-normal">
                            Ages 6 to 18 Years
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-[#5A1D16] transition-transform ${
                          activeCategory === "children" ? "translate-x-0.5 text-[#5A1D16]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Category 2: Teacher Training */}
                  <div
                    onMouseEnter={() => setActiveCategory("teachers")}
                    className="relative mt-1"
                  >
                    <button
                      type="button"
                      id="btnDropdownTeacher"
                      onClick={() =>
                        setActiveCategory(activeCategory === "teachers" ? null : "teachers")
                      }
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors font-semibold text-sm ${
                        activeCategory === "teachers"
                          ? "bg-[#FFF8F5] text-[#5A1D16]"
                          : "text-[#3D221B] hover:bg-[#FAF6F3]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="p-1 rounded-md bg-[#5A1D16]/10 text-[#5A1D16]">
                          <GraduationCap className="w-4 h-4 text-[#5A1D16]" />
                        </span>
                        <div>
                          <div className="font-bold text-xs uppercase tracking-wider text-[#5A1D16]">
                            Teacher Training
                          </div>
                          <div className="text-[11px] text-[#6F6864] font-normal">
                            Educator Certifications
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-[#5A1D16] transition-transform ${
                          activeCategory === "teachers" ? "translate-x-0.5 text-[#5A1D16]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Divider & View All */}
                  <div className="mt-2 pt-2 border-t border-[rgba(90,29,22,0.08)]">
                    <Link
                      href="/courses"
                      onClick={() => {
                        setDesktopCoursesOpen(false);
                        setActiveCategory(null);
                      }}
                      className="flex items-center justify-between px-2.5 py-1.5 text-xs font-bold text-[#5A1D16] hover:text-[#E9B13A] rounded-md transition-colors"
                    >
                      <span>Browse All Courses Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Level 2 Nested Flyout Submenu: Displays ONLY the active category courses */}
                  {activeCategory && (
                    <div
                      role="menu"
                      aria-label={`${
                        activeCategory === "children" ? "Student Training" : "Teacher Training"
                      } Submenu`}
                      className="absolute top-0 left-[262px] w-80 bg-white rounded-xl shadow-2xl border border-[rgba(90,29,22,0.1)] p-3 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                      onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      }}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[rgba(90,29,22,0.08)]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#5A1D16]">
                          {activeCategory === "children"
                            ? "Student Training Courses"
                            : "Teacher Training Programs"}
                        </span>
                        <span className="text-[10px] bg-[#E9B13A]/20 text-[#3D221B] px-2 py-0.5 rounded-full font-bold">
                          {activeCategory === "children"
                            ? `${childrenCourses.length} Courses`
                            : `${teacherCourses.length} Tracks`}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {(activeCategory === "children" ? childrenCourses : teacherCourses).map(
                          (course) => (
                            <Link
                              key={course.href}
                              href={course.href}
                              role="menuitem"
                              onClick={() => {
                                setDesktopCoursesOpen(false);
                                setActiveCategory(null);
                              }}
                              className="group/item flex flex-col p-2 rounded-lg hover:bg-[#FFF8F5] transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-[#3D221B] group-hover/item:text-[#5A1D16] transition-colors">
                                  {course.name}
                                </span>
                                <span className="text-[10px] text-[#6F6864] bg-white border border-[rgba(90,29,22,0.1)] px-1.5 py-0.5 rounded text-nowrap group-hover/item:border-[#5A1D16]/30">
                                  {course.tag}
                                </span>
                              </div>
                              <span className="text-[11px] text-[#6F6864] line-clamp-1 mt-0.5">
                                {course.desc}
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
            </div>

            <Link
              href="/gallery"
              className="relative px-3 py-2 text-sm lg:text-base font-semibold text-[#3D221B] hover:text-[#5A1D16] transition-colors rounded-md group"
            >
              Gallery
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E9B13A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </Link>

            <Link
              href="/contact"
              className="relative px-3 py-2 text-sm lg:text-base font-semibold text-[#3D221B] hover:text-[#5A1D16] transition-colors rounded-md group"
            >
              Contact
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E9B13A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </Link>
          </div>

          {/* Consultation Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              id="btnHeaderConsultation"
              className="hidden sm:inline-flex items-center gap-2 bg-[#5A1D16] hover:bg-[#6B241A] text-white font-semibold text-sm lg:text-base px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              id="btnMobileMenuToggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#3D221B] hover:bg-[#FFF8F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A1D16]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#5A1D16]" />
              ) : (
                <Menu className="w-6 h-6 text-[#3D221B]" />
              )}
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Slide-down Menu - Multi-level Nested Click-to-Expand Accordion */}
      {mobileMenuOpen && (
        <div
          id="mobileNavContainer"
          className="md:hidden bg-white border-b border-[rgba(90,29,22,0.12)] shadow-xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto"
        >
          <Container className="py-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[#3D221B] hover:bg-[#FFF8F5] hover:text-[#5A1D16] transition-colors"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[#3D221B] hover:bg-[#FFF8F5] hover:text-[#5A1D16] transition-colors"
            >
              About
            </Link>

            {/* Level 1: Mobile Courses Click-to-Expand Accordion */}
            <div className="rounded-xl border border-[rgba(90,29,22,0.1)] overflow-hidden bg-[#FAF6F3]">
              <button
                type="button"
                id="btnMobileCoursesToggle"
                onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-[#5A1D16] text-left hover:bg-[#FFF8F5] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>Courses</span>
                  <span className="text-[10px] bg-[#E9B13A] text-[#3D221B] px-2 py-0.5 rounded-full font-bold uppercase">
                    Categories
                  </span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#5A1D16] transition-transform duration-200 ${
                    mobileCoursesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileCoursesOpen && (
                <div className="px-3 pb-3 pt-1 space-y-2.5 bg-white border-t border-[rgba(90,29,22,0.06)]">
                  {/* Level 2 Sub-Accordion: Student Training (Click to show ONLY Student courses) */}
                  <div className="rounded-lg border border-[rgba(90,29,22,0.08)] bg-[#FFFBF8] overflow-hidden">
                    <button
                      type="button"
                      id="btnMobileChildrenToggle"
                      onClick={() => setMobileChildrenOpen(!mobileChildrenOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#5A1D16] text-left hover:bg-[#FFF8F5]"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#E9B13A]" />
                        <span>Student Training</span>
                        <span className="text-[10px] bg-white border border-[rgba(90,29,22,0.1)] px-1.5 py-0.2 rounded font-semibold text-[#6F6864]">
                          {childrenCourses.length}
                        </span>
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-[#5A1D16] transition-transform duration-200 ${
                          mobileChildrenOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* Level 3: ONLY Student Courses */}
                    {mobileChildrenOpen && (
                      <div className="px-3 pb-2 pt-1 space-y-1 bg-white border-t border-[rgba(90,29,22,0.06)]">
                        {childrenCourses.map((course) => (
                          <Link
                            key={course.href}
                            href={course.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-[#FFF8F5] text-xs font-semibold text-[#3D221B] hover:text-[#5A1D16]"
                          >
                            <span>{course.name}</span>
                            <span className="text-[10px] text-[#6F6864] bg-[#FFF8F5] px-1.5 py-0.5 rounded">
                              {course.tag}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Level 2 Sub-Accordion: Teacher Training (Click to show ONLY Teacher courses) */}
                  <div className="rounded-lg border border-[rgba(90,29,22,0.08)] bg-[#FFFBF8] overflow-hidden">
                    <button
                      type="button"
                      id="btnMobileTeacherToggle"
                      onClick={() => setMobileTeacherOpen(!mobileTeacherOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-[#5A1D16] text-left hover:bg-[#FFF8F5]"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#5A1D16]" />
                        <span>Teacher Training</span>
                        <span className="text-[10px] bg-white border border-[rgba(90,29,22,0.1)] px-1.5 py-0.2 rounded font-semibold text-[#6F6864]">
                          {teacherCourses.length}
                        </span>
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-[#5A1D16] transition-transform duration-200 ${
                          mobileTeacherOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* Level 3: ONLY Teacher Courses */}
                    {mobileTeacherOpen && (
                      <div className="px-3 pb-2 pt-1 space-y-1 bg-white border-t border-[rgba(90,29,22,0.06)]">
                        {teacherCourses.map((course) => (
                          <Link
                            key={course.href}
                            href={course.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex flex-col py-2 px-2 rounded-md hover:bg-[#FFF8F5] text-xs font-semibold text-[#3D221B] hover:text-[#5A1D16]"
                          >
                            <div className="flex items-center justify-between">
                              <span>{course.name}</span>
                              <span className="text-[10px] text-[#5A1D16] bg-[#5A1D16]/10 px-1.5 py-0.5 rounded">
                                {course.tag}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#6F6864] font-normal mt-0.5">
                              {course.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View All Courses Link */}
                  <div className="pt-2 border-t border-gray-100">
                    <Link
                      href="/courses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A1D16] hover:text-[#E9B13A] px-2 py-1"
                    >
                      <span>Browse All Courses Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[#3D221B] hover:bg-[#FFF8F5] hover:text-[#5A1D16] transition-colors"
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[#3D221B] hover:bg-[#FFF8F5] hover:text-[#5A1D16] transition-colors"
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#5A1D16] text-white font-semibold py-3 rounded-full shadow-md text-sm hover:bg-[#6B241A] transition-colors"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

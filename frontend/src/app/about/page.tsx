import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About Us | Ignite Learning Academy — Premier Teacher Training",
  description:
    "Discover the mission, child-centred philosophy, and seasoned faculty behind Ignite Learning Academy in Bangalore. Empowering early childhood educators with world-class pedagogical skills.",
};

const PHILOSOPHY_PILLARS = [
  {
    title: "Child-Centred Inquiry",
    description:
      "Children are not passive vessels to be filled; they are naturally curious explorers. Our pedagogy trains teachers to observe children's developmental interests and scaffold meaningful learning opportunities around them.",
    icon: "🌱",
  },
  {
    title: "Neuroscience-Backed Play",
    description:
      "Modern developmental neuroscience proves that multi-sensory, unstructured play builds vital neural architecture. We teach educators how play fosters cognitive grit, spatial intelligence, and language acquisition.",
    icon: "🧠",
  },
  {
    title: "Empathy & Positive Guidance",
    description:
      "A calm, secure classroom environment is essential for early emotional resilience. We train teachers in trauma-informed guidance, gentle boundary setting, and proactive emotional co-regulation.",
    icon: "❤️",
  },
];

const FACULTY_MEMBERS = [
  {
    name: "Dr. Radhika Sen",
    role: "Academic Dean & Senior Child Psychologist",
    credentials: "Ph.D. in Early Childhood Education, M.Sc. Developmental Psychology",
    bio: "Over 22 years spearheading preschool curricula and teacher preparation. Dr. Sen advises prominent educational boards on foundational learning under NEP 2020.",
    initials: "RS",
  },
  {
    name: "Prof. Kenneth Fernandez",
    role: "Head of Pedagogy & Practicums",
    credentials: "M.Ed. Curriculum & Instruction, AMI Montessori Diploma",
    bio: "Former principal of international schools in Bangalore with 18 years dedicated to progressive Montessori sensorial instruction and teacher mentorship.",
    initials: "KF",
  },
  {
    name: "Sunita Krishnamurthy",
    role: "Lead Trainer in Play-Based Learning",
    credentials: "B.Ed., Certified Reggio Emilia Practitioner",
    bio: "Passionate classroom practitioner and author with 14 years specializing in open-ended learning environments, emergent phonics, and natural material play.",
    initials: "SK",
  },
  {
    name: "Farhan Qureshi",
    role: "Educator Communication & Speech Specialist",
    credentials: "M.A. Linguistics, Certified Speech & Drama Coach",
    bio: "Trained over 1,200 educators in teacher presence, oral storytelling, parent conference facilitation, and non-violent conflict de-escalation.",
    initials: "FQ",
  },
];

const WHY_CHOOSE_US_POINTS = [
  "Government-Recognized NTT Certification valid across leading CBSE, ICSE, and Montessori schools.",
  "Deeply experiential practicums with 100+ hours of live classroom teaching in accredited Bangalore preschools.",
  "Curriculum strictly aligned with the National Education Policy (NEP 2020) and international EYFS benchmarks.",
  "Personalized mentorship with a low 1:12 faculty-to-trainee ratio during observation and assessment modules.",
  "Flexible weekday and weekend batches tailored to suit working mothers, career changers, and fresh graduates.",
  "Dedicated placement cell offering one-on-one resume crafting, demo teaching rehearsals, and direct school interviews.",
  "Affordable tuition structure with zero-interest monthly installment options to support passionate learners.",
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Header Banner */}
      <PageHero
        badge={
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9B13A]/15 text-[#3D221B] text-xs font-bold uppercase tracking-wider">
            <span>About Ignite Learning Academy</span>
          </div>
        }
        title="Shaping the Future, One Early Educator at a Time"
        description="We are dedicated to elevating the standard of early childhood teacher training through scientific pedagogy, deep child psychology, and compassionate mentorship."
      />

      {/* 2. Mission Statement */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
                Our Core Mission
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B] leading-snug">
                Every child deserves an educator who understands how they see the world.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#6F6864] leading-relaxed">
                <p>
                  At <strong>Ignite Learning Academy</strong>, our mission is to redefine early childhood education
                  by nurturing teachers who combine scientific knowledge of brain development with genuine empathy and creative wonder.
                </p>
                <p>
                  The first six years of life form 90% of a human being&apos;s neurological foundations. We believe that
                  nursery and kindergarten teachers are the most influential professionals in society. By equipping our trainees
                  with progressive teaching methods, hands-on sensory tools, and articulate communication, we enable them to build joyful,
                  supportive classrooms where every child flourishes.
                </p>
              </div>

              <div className="pt-2">
                <Button href="/courses" variant="primary">
                  Explore Our Programmes
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="bg-[#FFF8F5] border-2 border-[#E9B13A]/30 p-8 space-y-6 shadow-sm">
                <div className="text-4xl">🏛️</div>
                <h3 className="text-xl font-bold text-[#3D221B]">Bangalore&apos;s Premier Teacher Institute</h3>
                <p className="text-sm text-[#6F6864] leading-relaxed">
                  Founded with the goal of bridging theoretical child development with actual classroom realities,
                  our Bangalore campus hosts state-of-the-art Montessori sensorial apparatus, children&apos;s literature archives,
                  and observation suites.
                </p>
                <div className="border-t border-[rgba(90,29,22,0.1)] pt-4 text-xs font-semibold text-[#5A1D16] flex items-center justify-between">
                  <span>Admissions Office • Bangalore</span>
                  <span>Est. 2020</span>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Our Philosophy */}
      <Section background="cream">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
              Our Educational Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
              Rooted in Respect, Guided by Play
            </h2>
            <p className="text-sm sm:text-base text-[#6F6864]">
              Our foundational teaching principles draw from the best of Maria Montessori, Loris Malaguzzi (Reggio Emilia),
              and contemporary cognitive neuroscience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PHILOSOPHY_PILLARS.map((pillar) => (
              <Card key={pillar.title} hoverable className="space-y-4 bg-white">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8F5] border border-[rgba(90,29,22,0.1)] flex items-center justify-center text-3xl shadow-sm">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[#3D221B]">{pillar.title}</h3>
                <p className="text-sm text-[#6F6864] leading-relaxed">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Faculty Section */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
              Academic Faculty
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
              Learn From Leading Pedagogy Leaders
            </h2>
            <p className="text-sm sm:text-base text-[#6F6864]">
              Our mentors bring decades of combined experience directing premier schools, mentoring educator cohorts,
              and advancing child development research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACULTY_MEMBERS.map((faculty) => (
              <Card key={faculty.name} hoverable className="flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  {/* Photo Slot / Avatar Placeholder */}
                  <div className="relative aspect-square w-full rounded-xl bg-gradient-to-tr from-[#3D221B] to-[#5A1D16] flex items-center justify-center text-white shadow-inner overflow-hidden">
                    <span className="text-3xl font-extrabold tracking-wider text-[#E9B13A]/90">
                      {faculty.initials}
                    </span>
                    <div className="absolute inset-0 border border-white/10 rounded-xl" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#3D221B]">{faculty.name}</h3>
                    <div className="text-xs font-semibold text-[#5A1D16]">{faculty.role}</div>
                    <div className="text-[11px] text-[#6F6864] italic mt-0.5">{faculty.credentials}</div>
                  </div>

                  <p className="text-xs text-[#6F6864] leading-relaxed">{faculty.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. "Why Choose Us" Checklist */}
      <Section background="cream">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#E9B13A]">
                The Ignite Advantage
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3D221B]">
                Why Trainees Choose Ignite Learning Academy
              </h2>
              <p className="text-sm sm:text-base text-[#6F6864]">
                Everything an educator needs to step confidently into a preschool or primary classroom.
              </p>
            </div>

            <Card className="bg-white p-6 sm:p-10 shadow-sm">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_CHOOSE_US_POINTS.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E9B13A]/20 text-[#5A1D16] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-sm text-[#3D221B] leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[rgba(90,29,22,0.08)] flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-[#6F6864]">
                  Interested in visiting our Bangalore training facility or speaking with an advisor?
                </p>
                <Button href="/contact" variant="primary" className="text-sm py-2 px-6">
                  Schedule Campus Visit
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}

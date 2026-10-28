import React from "react";
import { MessageSquare, Users, FileCheck, ShieldCheck } from "lucide-react";
import { Container } from "../ui/Container";

interface AdmissionStep {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const ADMISSION_STEPS: AdmissionStep[] = [
  {
    step: 1,
    icon: MessageSquare,
    title: "Send an enquiry",
    description:
      "Fill in the enquiry form, call us, or message us on WhatsApp. Tell us which course interests you.",
  },
  {
    step: 2,
    icon: Users,
    title: "Counselling",
    description:
      "We'll discuss your background and goals. You're welcome to visit the Bangalore campus or join an online session.",
  },
  {
    step: 3,
    icon: FileCheck,
    title: "Submit documents",
    description:
      "Complete the admission form and hand over the required documents, either online or in person.",
  },
  {
    step: 4,
    icon: ShieldCheck,
    title: "Confirm your seat",
    description:
      "Pay the admission fee to secure your place. You will receive an official receipt and course onboarding kit.",
  },
];

export const AdmissionProcess: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FFF8F5] border-t border-[rgba(90,29,22,0.06)]">
      <Container>
        {/* Section Heading matching reference screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3D221B] tracking-tight">
            Admission process
          </h2>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ADMISSION_STEPS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center border-t-4 border-t-[#E9B13A] border-x border-b border-[rgba(90,29,22,0.08)] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center"
              >
                {/* Circular Icon with Numbered Pill */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#FAF3E7] flex items-center justify-center text-[#E9B13A]">
                    <Icon className="w-7 h-7 text-[#E9B13A]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#3D221B] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    {item.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#3D221B] mb-3">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[#6F6864] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

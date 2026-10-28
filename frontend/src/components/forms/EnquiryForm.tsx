"use client";

import React, { useState } from "react";
import { COURSES } from "@/data/courses";
import { Button } from "@/components/ui/Button";

interface EnquiryFormProps {
  defaultCourseSlug?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
  message?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  defaultCourseSlug,
  className = "",
  title = "Request Course Information",
  subtitle = "Have questions about admissions, fees, or batch timings? Send us an enquiry.",
}) => {
  const initialCourse =
    COURSES.find((c) => c.slug === defaultCourseSlug)?.title || COURSES[0]?.title || "";

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    course: initialCourse,
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, "");
      if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        newErrors.phone = "Please enter a valid phone number (10-15 digits).";
      }
    }

    if (!formData.course) {
      newErrors.course = "Please select a programme of interest.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please include a brief message or query.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const res = await fetch(`${apiUrl}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          subject: formData.course || "General Course Enquiry",
          message: formData.message.trim(),
          source: "website",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          const firstErr = data.errors[0];
          setSubmitError(firstErr.message || "Validation failed on the server.");
        } else if (data.message) {
          setSubmitError(data.message);
        } else {
          setSubmitError("Failed to submit enquiry. Please check your details and try again.");
        }
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "Network error connecting to the admissions server. Please try again or reach out directly on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: initialCourse,
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div
        className={`bg-white rounded-2xl border border-[rgba(90,29,22,0.12)] p-6 sm:p-8 text-center space-y-4 shadow-sm ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-[#E9B13A]/20 text-[#5A1D16] flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-[#3D221B]">
          Thank you — we&apos;ll be in touch within 24 hours
        </h3>
        <p className="text-sm text-[#6F6864] max-w-md mx-auto leading-relaxed">
          Your enquiry for <strong>{formData.course}</strong> has been received and saved to our admissions system. A confirmation email has been sent to <strong>{formData.email}</strong>.
        </p>
        <div className="pt-2">
          <Button variant="outline" onClick={handleReset} className="text-sm py-2 px-5">
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-[rgba(90,29,22,0.12)] p-6 sm:p-8 shadow-sm ${className}`}
    >
      <div className="mb-6 space-y-1">
        <h3 className="text-xl sm:text-2xl font-bold text-[#3D221B]">{title}</h3>
        <p className="text-sm text-[#6F6864]">{subtitle}</p>
      </div>

      {submitError && (
        <div
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="enquiry-name" className="block text-xs font-semibold uppercase tracking-wider text-[#3D221B] mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Priyadarshini Sharma"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#3D221B] placeholder-[#6F6864]/50 focus:outline-none transition-all ${
              errors.name
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                : "border-[rgba(90,29,22,0.2)] focus:border-[#5A1D16] focus:ring-1 focus:ring-[#5A1D16]"
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
          />
          {errors.name && (
            <p id="enquiry-name-error" className="mt-1 text-xs text-red-600 font-medium">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enquiry-email" className="block text-xs font-semibold uppercase tracking-wider text-[#3D221B] mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#3D221B] placeholder-[#6F6864]/50 focus:outline-none transition-all ${
                errors.email
                  ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                  : "border-[rgba(90,29,22,0.2)] focus:border-[#5A1D16] focus:ring-1 focus:ring-[#5A1D16]"
              }`}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            />
            {errors.email && (
              <p id="enquiry-email-error" className="mt-1 text-xs text-red-600 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="enquiry-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#3D221B] mb-1.5">
              Phone Number <span className="text-xs text-[#6F6864] font-normal">(Optional)</span>
            </label>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#3D221B] placeholder-[#6F6864]/50 focus:outline-none transition-all ${
                errors.phone
                  ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                  : "border-[rgba(90,29,22,0.2)] focus:border-[#5A1D16] focus:ring-1 focus:ring-[#5A1D16]"
              }`}
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            />
            {errors.phone && (
              <p id="enquiry-phone-error" className="mt-1 text-xs text-red-600 font-medium">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Programme Selection */}
        <div>
          <label htmlFor="enquiry-course" className="block text-xs font-semibold uppercase tracking-wider text-[#3D221B] mb-1.5">
            Programme of Interest <span className="text-red-500">*</span>
          </label>
          <select
            id="enquiry-course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-[rgba(90,29,22,0.2)] text-sm text-[#3D221B] bg-white focus:outline-none focus:border-[#5A1D16] focus:ring-1 focus:ring-[#5A1D16] transition-all"
          >
            {COURSES.map((c) => (
              <option key={c.id} value={c.title}>
                {c.title} ({c.duration})
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="enquiry-message" className="block text-xs font-semibold uppercase tracking-wider text-[#3D221B] mb-1.5">
            Your Questions or Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your educational background or ask about upcoming batch dates..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#3D221B] placeholder-[#6F6864]/50 focus:outline-none transition-all resize-y ${
              errors.message
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                : "border-[rgba(90,29,22,0.2)] focus:border-[#5A1D16] focus:ring-1 focus:ring-[#5A1D16]"
            }`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "enquiry-message-error" : undefined}
          />
          {errors.message && (
            <p id="enquiry-message-error" className="mt-1 text-xs text-red-600 font-medium">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full py-3 text-base shadow-sm hover:shadow-md"
            id="btnSubmitEnquiry"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting Enquiry...
              </span>
            ) : (
              "Submit Enquiry"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

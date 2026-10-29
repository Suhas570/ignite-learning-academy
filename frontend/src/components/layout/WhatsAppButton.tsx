"use client";

import React, { useState, useEffect } from "react";

const FALLBACK_WHATSAPP_NUMBER = "9011901930";

export const WhatsAppButton: React.FC = () => {
  const [whatsappNumber, setWhatsappNumber] = useState<string>(FALLBACK_WHATSAPP_NUMBER);

  useEffect(() => {
    let isMounted = true;
    const fetchWhatsAppNumber = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/globals/site-settings`, {
          // Revalidate cache or standard get
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          const rawNumber = data?.whatsappNumber || data?.result?.whatsappNumber;
          if (rawNumber && isMounted) {
            // Clean non-digits (remove + - space)
            const digits = String(rawNumber).replace(/[^0-9]/g, "");
            if (digits.length >= 10) {
              setWhatsappNumber(digits);
            }
          }
        }
      } catch (err) {
        console.warn("[WhatsAppButton] Failed to fetch SiteSettings whatsappNumber, using fallback:", err);
      }
    };

    fetchWhatsAppNumber();
    return () => {
      isMounted = false;
    };
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello! I am interested in courses at Ignite Learning Academy."
  )}`;

  return (
    <aside
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      aria-label="Direct messaging and contact support"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ignite Learning Academy on WhatsApp (opens in a new tab)"
        id="btnWhatsAppFloating"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 animate-whatsapp focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 sm:w-9 sm:h-9 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.927-2.233-.244-.587-.493-.507-.677-.517l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.121 3.238 5.138 4.542.718.31 1.278.496 1.716.635.72.229 1.376.197 1.895.12.578-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.514 2 2.023 6.49 2.023 12.015c0 1.94.553 3.754 1.517 5.29L2 22l4.836-1.503a9.98 9.98 0 0 0 5.204 1.52c5.526 0 10.017-4.49 10.017-10.017C22.057 6.49 17.566 2 12.04 2zm0 18.283c-1.618 0-3.123-.46-4.407-1.258l-.316-.196-3.267 1.016 1.039-3.18-.215-.333A8.256 8.256 0 0 1 3.77 12.015c0-4.56 3.71-8.27 8.27-8.27 4.56 0 8.27 3.71 8.27 8.27 0 4.56-3.71 8.268-8.27 8.268z" />
        </svg>

        {/* Floating Tooltip Pill */}
        <span className="absolute right-full mr-3 hidden sm:group-hover:flex items-center px-3 py-1.5 rounded-lg bg-[#3D221B] text-white text-xs font-medium shadow-lg whitespace-nowrap pointer-events-none transition-opacity">
          Need Help? Chat with us!
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#3D221B]" />
        </span>
      </a>
    </aside>
  );
};

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FDFBF7]">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[rgba(90,29,22,0.1)] shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#E9B13A]/20 text-[#5A1D16] flex items-center justify-center mx-auto text-2xl font-bold">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D221B]">
            Page Not Found
          </h1>
          <p className="text-sm text-[#6F6864] leading-relaxed">
            The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/">
            <Button variant="primary" className="text-sm py-2 px-6">
              Return Home
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" className="text-sm py-2 px-6">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

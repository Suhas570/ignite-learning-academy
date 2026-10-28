import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold text-sm sm:text-base rounded-full px-6 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#5A1D16] text-white border-2 border-[#5A1D16] hover:bg-[#6B241A] hover:border-[#6B241A] hover:shadow-lg focus-visible:ring-[#5A1D16]",
    secondary:
      "bg-[#E9B13A] text-[#3D221B] border-2 border-[#E9B13A] hover:bg-[#D89F28] hover:border-[#D89F28] hover:shadow-md focus-visible:ring-[#E9B13A]",
    outline:
      "bg-transparent text-[#5A1D16] border-2 border-[#5A1D16] hover:bg-[#5A1D16] hover:text-white focus-visible:ring-[#5A1D16]",
    ghost:
      "bg-transparent text-[#3D221B] hover:bg-[#FFF8F5] hover:text-[#5A1D16] border-2 border-transparent focus-visible:ring-[#5A1D16]",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

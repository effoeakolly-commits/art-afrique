import React from "react";

interface LogoProps {
  variant?: "full" | "symbol" | "light-on-dark";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ variant = "full", className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 sm:h-9 max-w-[140px]",
    md: "h-11 sm:h-12 max-w-[180px]",
    lg: "h-14 sm:h-16 max-w-[220px]",
    xl: "h-20 sm:h-24 max-w-[300px]",
  }[size];

  const symbolSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-13 h-13",
    xl: "w-16 h-16",
  }[size];

  if (variant === "symbol") {
    return (
      <div className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`} id="nkora-logo-symbol">
        <div className={`relative ${symbolSizeClasses} rounded-full overflow-hidden shadow-xs flex items-center justify-center bg-[#241710]`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nkora_logo_secondaire.png" alt="Sceau N'KORA" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center cursor-pointer select-none transition-transform duration-200 hover:scale-[1.02] ${className}`} id="nkora-logo-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/nkora_logo_principal.png"
        alt="N'KORA — Art, Artistes, Culture"
        className={`${sizeClasses} object-contain object-left ${variant === "light-on-dark" ? "brightness-110 contrast-105" : "mix-blend-multiply"}`}
      />
    </div>
  );
}
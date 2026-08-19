import React from 'react';
import nkoraMainLogoImg from '../assets/images/nkora_main_brand_logo_1787154635918.jpg';
import nkoraEmblemImg from '../assets/images/nkora_circular_emblem_1787143741297.jpg';

interface LogoProps {
  variant?: 'full' | 'symbol' | 'light-on-dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md'
}) => {
  // Sizing definitions for image rendering
  const sizeClasses = {
    sm: 'h-8 sm:h-9 max-w-[140px]',
    md: 'h-11 sm:h-12 max-w-[180px]',
    lg: 'h-14 sm:h-16 max-w-[220px]',
    xl: 'h-20 sm:h-24 max-w-[300px]'
  }[size];

  const symbolSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16'
  }[size];

  // 1. Symbol Only Variant (Secondary seal / medallion)
  if (variant === 'symbol') {
    return (
      <div
        className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`}
        id="nkora-logo-symbol"
      >
        <div className={`relative ${symbolSizeClasses} rounded-full overflow-hidden shadow-xs flex items-center justify-center bg-[#241710]`}>
          <img
            src={nkoraEmblemImg}
            alt="Sceau N'KORA"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // 2. Full Brand Logo (Contains both the emblem + the stylized "N'KORA" brand typography directly in the graphic)
  return (
    <div
      className={`inline-flex items-center cursor-pointer select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}
      id="nkora-logo-full"
    >
      <img
        src={nkoraMainLogoImg}
        alt="N'KORA — Art, Artistes, Culture"
        className={`${sizeClasses} object-contain object-left ${
          variant === 'light-on-dark' ? 'brightness-110 contrast-105' : 'mix-blend-multiply'
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

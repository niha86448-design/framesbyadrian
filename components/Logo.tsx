import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-all duration-300 cursor-hover ${className}`}
      aria-label="FramesByAdrian Home"
    >
      <div className="relative h-[65px] md:h-[85px] w-[240px] md:w-[340px] transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(0,212,255,0.8)] scale-110 origin-left">
        <Image
          src="/logo.png"
          alt="FramesByAdrian Logo"
          fill
          sizes="(max-width: 768px) 240px, 340px"
          className="object-contain object-left mix-blend-screen"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;

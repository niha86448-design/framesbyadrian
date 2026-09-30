'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-ice-blue/10 py-3 shadow-lg opacity-100'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Side: Logo (Only appears when scrolling past hero) */}
        <div className={`transition-all duration-500 ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
          <Logo />
        </div>

        {/* Right Side: Navigation links */}
        <div id="navbar-links" className="flex items-center gap-6">
          <Link
            href="/photos"
            className="text-xs font-mono uppercase tracking-widest text-text-muted hover:text-ice-blue transition-colors cursor-hover"
          >
            Photos
          </Link>
          <Link
            href="/videos"
            className="text-xs font-mono uppercase tracking-widest text-text-muted hover:text-ice-blue transition-colors cursor-hover"
          >
            Films
          </Link>
          <Link
            href="/contact"
            className="text-xs font-mono font-bold uppercase tracking-widest text-ice-blue bg-ice-blue/10 hover:bg-ice-blue/20 border border-ice-blue/30 px-4 py-1.5 rounded-full transition-all cursor-hover shadow-[0_0_15px_rgba(0,212,255,0.25)]"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

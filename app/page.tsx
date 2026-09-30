'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { InfiniteFilmStrip } from '@/components/InfiniteFilmStrip';
import { GalleryPortals } from '@/components/GalleryPortals';
import { FounderSection } from '@/components/FounderSection';
import { ClientLogos } from '@/components/ClientLogos';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between">
      {/* 1. HERO SECTION WITH OFFICIAL LOGO & INFINITE FILM STRIP */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden">
        
        {/* Official Brand Logo Centerpiece */}
        <div className="relative z-10 text-center space-y-4 px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-[360px] sm:w-[580px] md:w-[780px] h-[130px] sm:h-[210px] md:h-[280px] filter drop-shadow-[0_0_35px_rgba(0,212,255,0.45)]"
          >
            <Image
              src="/Frames by Adrian White.png"
              alt="Frames by Adrian"
              fill
              sizes="(max-width: 768px) 360px, (max-width: 1200px) 580px, 780px"
              className="object-contain mix-blend-screen"
              priority
            />
          </motion.div>

          {/* Subtitle with Exact Requested Category Order */}
          <p className="font-body text-xs sm:text-sm md:text-base tracking-[0.35em] md:tracking-[0.5em] text-text-muted uppercase font-medium">
            SPORTS &bull; EVENTS &bull; MUSIC &bull; CORPORATE &bull; WEDDING
          </p>
        </div>

        {/* Middle Section: Infinite Rolling Film Strip */}
        <div className="w-full relative z-10 my-4">
          <InfiniteFilmStrip />
        </div>

        {/* Bottom Scroll Chevron */}
        <div className="relative z-10 flex flex-col items-center gap-2 cursor-hover">
          <span className="text-[11px] font-body tracking-[0.25em] uppercase text-text-muted/70">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-ice-blue/80" />
          </motion.div>
        </div>
      </section>

      {/* 2. VIEWFINDER GALLERY PORTALS (PHOTO & VIDEO) */}
      <GalleryPortals />

      {/* 3. FOUNDER PORTRAIT & EDITORIAL BIOGRAPHY */}
      <FounderSection />

      {/* 4. UPGRADED CLIENT LOGO WALL */}
      <ClientLogos />
    </div>
  );
}

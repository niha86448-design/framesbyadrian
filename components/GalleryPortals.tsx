'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Play } from 'lucide-react';

export const GalleryPortals: React.FC = () => {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-background overflow-hidden select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* CARD 1: PHOTO GALLERY */}
        <Link href="/photos" className="group block w-full touch-manipulation cursor-hover">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="relative aspect-[4/5] lg:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface transition-all duration-500 group-hover:border-ice-blue/50 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
          >
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"
              alt="Still Frames Photo Gallery"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Viewfinder Corner Brackets */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-ice-blue rounded-tl-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.6)]" />
            <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-ice-blue rounded-tr-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.6)]" />
            <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-ice-blue rounded-bl-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.6)]" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-ice-blue rounded-br-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.6)]" />

            {/* Top Right Specs Tag */}
            <div className="absolute top-6 right-8 flex items-center gap-1.5 text-[10px] font-mono text-white/80 uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <Camera className="w-3 h-3 text-ice-blue" />
              <span>PHOTO ARCHIVE</span>
            </div>

            {/* Bottom-Left Text Content */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 space-y-1">
              <span className="font-body text-[10px] md:text-xs tracking-[0.3em] text-ice-blue uppercase font-semibold">
                CAPTURED MOMENTS
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide group-hover:text-glow transition-all">
                STILL FRAMES
              </h2>
            </div>
          </motion.div>
        </Link>

        {/* CARD 2: VIDEO GALLERY */}
        <Link href="/videos" className="group block w-full touch-manipulation cursor-hover">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="relative aspect-[4/5] lg:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface transition-all duration-500 group-hover:border-ice-blue/50 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]"
          >
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85"
              alt="Films Video Gallery"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Centered Pulsing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-ice-blue bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)] group-hover:scale-110 group-hover:border-white group-hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-500">
                <Play className="w-7 h-7 md:w-8 md:h-8 text-ice-blue ml-1 fill-ice-blue/30 group-hover:text-white group-hover:fill-white/30 transition-colors" />
              </div>
            </div>

            {/* Viewfinder Corner Brackets */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-white/30 rounded-tl-sm group-hover:border-ice-blue transition-colors" />
            <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-white/30 rounded-tr-sm group-hover:border-ice-blue transition-colors" />
            <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-white/30 rounded-bl-sm group-hover:border-ice-blue transition-colors" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-white/30 rounded-br-sm group-hover:border-ice-blue transition-colors" />

            {/* Top Right Specs Tag */}
            <div className="absolute top-6 right-8 flex items-center gap-1.5 text-[10px] font-mono text-white/80 uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>MOTION REEL</span>
            </div>

            {/* Bottom-Left Text Content */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 space-y-1">
              <span className="font-body text-[10px] md:text-xs tracking-[0.3em] text-ice-blue uppercase font-semibold">
                DYNAMIC STORIES
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide group-hover:text-glow transition-all">
                FILMS
              </h2>
            </div>
          </motion.div>
        </Link>

      </div>
    </section>
  );
};

export default GalleryPortals;

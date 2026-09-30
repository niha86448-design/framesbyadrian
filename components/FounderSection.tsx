'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { founderData } from '@/content/about';

const renderFormattedBio = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const FounderSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Premium Portrait with Ice-Blue Rim Glow & Parallax */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 relative group cursor-hover"
        >
          {/* Subtle Ice-Blue Rim Light Glow Aura */}
          <div className="absolute -inset-2 bg-gradient-to-r from-ice-blue/20 to-soft-blue/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none" />

          {/* Parallax Image Wrapper */}
          <motion.div
            style={{ y: portraitY }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          >
            <Image
              src="/adrian-portrait.jpg"
              alt="Adrian - Founder & Lead Photographer"
              fill
              className="object-cover object-top filter contrast-[1.05]"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            
            {/* Viewfinder Corner Overlays */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-ice-blue/60" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-ice-blue/60" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-ice-blue/60" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-ice-blue/60" />
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Editorial Content & Integrated Stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ice-blue/10 border border-ice-blue/20 text-ice-blue text-xs font-mono tracking-widest uppercase self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-ice-blue animate-pulse" />
            <span>{founderData.title}</span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
            Behind The Lens
          </h2>

          {/* Biography Text with Bold Highlight Parsing */}
          <div className="space-y-4 text-text-muted text-base md:text-lg leading-relaxed font-body">
            {founderData.bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{renderFormattedBio(paragraph)}</p>
            ))}
          </div>

          {/* Integrated Stats Grid & Contact CTA */}
          <div className="pt-8 border-t border-white/10 mt-6 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {founderData.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-heading text-3xl md:text-4xl font-bold text-ice-blue text-glow">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button to Contact Page */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-ice-blue text-black font-mono font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:scale-105 transition-all cursor-hover"
              >
                <span>LET'S CREATE TOGETHER</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FounderSection;

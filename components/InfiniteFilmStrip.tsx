'use client';

import React from 'react';
import Image from 'next/image';

const filmFrames = [
  {
    id: 1,
    title: "TATA IPL 2022",
    category: "SPORTS",
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "PALACE WEDDING",
    category: "WEDDING",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "ADIDAS ATHLETICS",
    category: "CORPORATE",
    src: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "HARD ROCK LIVE",
    category: "MUSIC",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "ABU DHABI T10",
    category: "SPORTS",
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "FC BENGALURU",
    category: "SPORTS",
    src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    title: "ASHLEY SHOWCASE",
    category: "COMMERCIAL",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    title: "GUINNESS RECORD 2017",
    category: "EVENTS",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
  },
];

export const InfiniteFilmStrip: React.FC = () => {
  const doubleFrames = [...filmFrames, ...filmFrames];

  return (
    <div className="relative w-full py-8 my-2 select-none group">
      
      {/* SOFT SUBTLE ICE-BLUE BACKLIGHT AURA */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[360px] pointer-events-none z-0 filter blur-[75px] opacity-50 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.18) 0%, rgba(0, 212, 255, 0.05) 45%, transparent 75%)',
        }}
      />

      {/* FILM STRIP MAIN CONTAINER */}
      <div 
        className="relative z-10 w-full py-8 bg-[#050505] border-y border-ice-blue/20 overflow-hidden"
        style={{
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.03)',
        }}
      >
        
        {/* Dark Vignette Fade Overlay on Left & Right Edges */}
        <div className="absolute inset-y-0 left-0 w-28 md:w-56 bg-gradient-to-r from-[#08080C] via-[#08080C]/85 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 md:w-56 bg-gradient-to-l from-[#08080C] via-[#08080C]/85 to-transparent z-30 pointer-events-none" />

        {/* SPROCKET HOLES TOP ROW */}
        <div className="relative z-20 flex justify-between items-center mb-3 px-4">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-2 rounded-[2px] bg-ice-blue/25 shadow-[0_0_3px_rgba(0,212,255,0.2)]"
            />
          ))}
        </div>

        {/* Ultra-Smooth Hardware-Accelerated Film Track */}
        <div className="flex overflow-hidden relative z-10">
          <div className="flex items-center gap-6 animate-film-roll group-hover:[animation-play-state:paused] transform-gpu">
            {doubleFrames.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="relative flex-shrink-0 w-72 md:w-96 aspect-[3/2] rounded-lg overflow-hidden border border-white/10 group/item cursor-hover transition-all duration-500"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover transition-all duration-500 filter blur-[1.5px] grayscale-[40%] brightness-80 group-hover/item:blur-0 group-hover/item:grayscale-0 group-hover/item:brightness-105 group-hover/item:scale-105"
                />
                
                {/* Retro Film Frame Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover/item:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/70 uppercase tracking-widest">
                    <span>35MM &bull; 0{item.id}</span>
                    <span className="text-ice-blue font-bold">{item.category}</span>
                  </div>
                  <div className="font-heading text-lg md:text-xl font-bold text-text-primary text-glow drop-shadow">
                    {item.title}
                  </div>
                </div>

                {/* Inner Frame Corner Lines */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/30" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/30" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/30" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/30" />
              </div>
            ))}
          </div>
        </div>

        {/* SPROCKET HOLES BOTTOM ROW */}
        <div className="relative z-20 flex justify-between items-center mt-3 px-4">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-2 rounded-[2px] bg-ice-blue/25 shadow-[0_0_3px_rgba(0,212,255,0.2)]"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default InfiniteFilmStrip;

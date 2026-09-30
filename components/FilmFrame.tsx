'use client';

import React from 'react';

export const FilmFrame: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* Top & Bottom Thin Gradient Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ice-blue/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ice-blue/30 to-transparent pointer-events-none" />
      
      {/* Left & Right Subtle Borders */}
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-ice-blue/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-ice-blue/10 to-transparent pointer-events-none" />

      {/* Viewfinder Corner Brackets */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 w-8 h-8 border-t-2 border-l-2 border-ice-blue/60 pointer-events-none" />
      <div className="absolute top-6 right-6 md:top-8 md:right-10 w-8 h-8 border-t-2 border-r-2 border-ice-blue/60 pointer-events-none" />
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 w-8 h-8 border-b-2 border-l-2 border-ice-blue/60 pointer-events-none" />
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 w-8 h-8 border-b-2 border-r-2 border-ice-blue/60 pointer-events-none" />

      {/* Top-Left REC Status Indicator Badge */}
      <div className="absolute top-14 left-10 md:top-20 md:left-20 flex items-center gap-2 text-xs font-mono text-white/90 tracking-widest uppercase bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-[0_0_12px_rgba(255,0,0,0.4)] pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ff0000]" />
        <span className="font-bold">REC &bull; 4K 60FPS</span>
      </div>

      {/* Top-Right ISO & Lens Spec Status Badge */}
      <div className="absolute top-14 right-10 md:top-20 md:right-20 text-xs font-mono text-white/80 tracking-widest uppercase bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-md pointer-events-none">
        RAW &bull; ISO 100 &bull; F/1.4
      </div>
    </div>
  );
};

export default FilmFrame;

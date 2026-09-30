'use client';

import React from 'react';

export interface ClientItem {
  id: string;
  name: string;
  category: string;
  type: 'image' | 'badge' | 'icon';
  src?: string;
  iconUrl?: string;
  badgeText?: string;
  subText?: string;
  sizeClass: string;
  cardBgClass?: string;
}

export const clientItems: ClientItem[] = [
  {
    id: 'srh',
    name: 'Sunrisers Hyderabad',
    category: 'TATA IPL FRANCHISE',
    type: 'image',
    src: '/clients/17466d111442a4f516dcace141b2bfd3.png',
    sizeClass: 'h-16 md:h-24 w-auto',
    cardBgClass: 'bg-white/[0.04] border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(255,140,0,0.3)]',
  },
  {
    id: 'kkr',
    name: 'Kolkata Knight Riders',
    category: 'TATA IPL FRANCHISE',
    type: 'image',
    src: '/clients/cb113910e846181ecd24c01fa9c16406.png',
    sizeClass: 'h-16 md:h-24 w-auto',
    cardBgClass: 'bg-white/[0.04] border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]',
  },
  {
    id: 'tkr',
    name: 'Trinbago Knight Riders',
    category: 'CPL FRANCHISE',
    type: 'image',
    src: '/clients/trinbago-knight-riders-seeklogo.png',
    sizeClass: 'h-16 md:h-24 w-auto',
    cardBgClass: 'bg-white/[0.04] border-white/10 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(235,30,40,0.3)]',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'COMMERCIAL PRODUCTIONS',
    type: 'image',
    src: '/clients/amazon_PNG12.png',
    sizeClass: 'h-10 md:h-14 w-auto p-1',
    cardBgClass: 'bg-white border-white/30 shadow-md hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(255,153,0,0.4)]',
  },
  {
    id: 'lewis-hamilton',
    name: 'Lewis Hamilton',
    category: 'F1 & GLOBAL ATHLETES',
    type: 'image',
    src: '/clients/lewis-hamilton-logo-png_seeklogo-373532.png',
    sizeClass: 'h-14 md:h-20 w-auto p-1.5',
    cardBgClass: 'bg-white border-white/30 shadow-md hover:border-ice-blue/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]',
  },
  {
    id: 'asics',
    name: 'ASICS',
    category: 'GLOBAL SPORTSWEAR',
    type: 'image',
    src: '/clients/607478e119d27149ad2a61a4be3fc526.png',
    sizeClass: 'h-10 md:h-14 w-auto rounded-lg overflow-hidden',
    cardBgClass: 'bg-black border-white/15 hover:border-ice-blue/50 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]',
  },
  {
    id: 'sa20',
    name: 'Betway SA20',
    category: 'SOUTH AFRICA T20 LEAGUE',
    type: 'image',
    src: '/clients/idEvJpR3w4_logos.jpeg',
    sizeClass: 'h-14 md:h-20 w-auto rounded-xl overflow-hidden',
    cardBgClass: 'bg-[#0b1636] border-white/20 shadow-lg hover:border-ice-blue/60 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]',
  },
  {
    id: 'bira91',
    name: 'Bira 91',
    category: 'BEVERAGES & FESTIVALS',
    type: 'image',
    src: '/clients/bira-91-logo.png',
    sizeClass: 'h-14 md:h-20 w-auto p-1.5',
    cardBgClass: 'bg-white border-white/30 shadow-md hover:border-ice-blue/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]',
  },
  {
    id: 'ladakh-marathon',
    name: 'Ladakh Marathon',
    category: 'ULTRA MARATHON',
    type: 'image',
    src: '/clients/Ladakh-Marathon-300x151.png',
    sizeClass: 'h-11 md:h-16 w-auto p-1.5',
    cardBgClass: 'bg-white border-white/30 shadow-md hover:border-ice-blue/60 hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]',
  },
  {
    id: 'athayog',
    name: 'Atha Yog',
    category: 'WELLNESS & LIFESTYLE',
    type: 'image',
    src: '/clients/atha yog v5_short logo.png',
    sizeClass: 'h-14 md:h-20 w-auto p-1.5',
    cardBgClass: 'bg-white border-white/30 shadow-md hover:border-ice-blue/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]',
  },
  {
    id: 'kettlesnatch',
    name: '911 CrossFit Kettle Snatch',
    category: 'ATHLETICS & FITNESS',
    type: 'image',
    src: '/clients/Kettlesnatch.png',
    sizeClass: 'h-16 md:h-24 w-auto p-1.5',
    cardBgClass: 'bg-white border-white/30 shadow-md hover:border-ice-blue/60 hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]',
  },
  {
    id: 'adidas',
    name: 'Adidas',
    category: 'GLOBAL ATHLETICS',
    type: 'icon',
    iconUrl: 'https://cdn.simpleicons.org/adidas/FFFFFF',
    sizeClass: 'h-10 md:h-14 w-auto',
    cardBgClass: 'bg-white/[0.04] border-white/10 hover:border-ice-blue/50 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]',
  },
  {
    id: 'hardrock',
    name: 'Hard Rock Cafe',
    category: 'CONCERTS & MUSIC',
    type: 'badge',
    badgeText: 'HARD ROCK',
    subText: 'CAFE LIVE ARENA',
    sizeClass: 'h-14 md:h-18',
    cardBgClass: 'bg-white/[0.04] border-white/10 hover:border-ice-blue/50 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]',
  },
  {
    id: 'ashley',
    name: 'Ashley Furniture',
    category: 'COMMERCIAL INTERIORS',
    type: 'badge',
    badgeText: 'ASHLEY',
    subText: 'HOMESTORE',
    sizeClass: 'h-14 md:h-18',
    cardBgClass: 'bg-white/[0.04] border-white/10 hover:border-ice-blue/50 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]',
  },
];

export const ClientLogos: React.FC = () => {
  const doubleItems = [...clientItems, ...clientItems];

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-[#08080C] via-[#050508] to-[#08080C] border-y border-ice-blue/10 overflow-hidden select-none">
      
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center space-y-2">
        <h3 className="text-xs md:text-sm font-mono tracking-[0.4em] text-ice-blue uppercase font-bold">
          TRUSTED BY GLOBAL BRANDS & FRANCHISES
        </h3>
        <p className="font-heading text-2xl md:text-4xl font-bold text-text-primary text-glow">
          Editorial, Sports & Commercial Portfolio
        </p>
      </div>

      {/* Dark Vignette Overlays on Left & Right Edges */}
      <div className="absolute inset-y-0 left-0 w-28 md:w-56 bg-gradient-to-r from-[#08080C] via-[#08080C]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 md:w-56 bg-gradient-to-l from-[#08080C] via-[#08080C]/90 to-transparent z-20 pointer-events-none" />

      {/* Scrolling Marquee Track Container */}
      <div className="flex overflow-hidden relative z-10 py-4">
        <div className="flex items-center gap-12 md:gap-16 animate-film-roll hover:[animation-play-state:paused] transform-gpu">
          {doubleItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`flex-shrink-0 flex items-center justify-center cursor-hover group/logo transition-all duration-500 px-5 py-2.5 rounded-2xl border ${item.cardBgClass || 'bg-white/[0.03] border-white/10'}`}
              title={`${item.name} - ${item.category}`}
            >
              {item.type === 'image' && item.src ? (
                <div className={`relative flex items-center justify-center transition-all duration-500 group-hover/logo:scale-110 ${item.sizeClass}`}>
                  <img
                    src={item.src}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : item.type === 'icon' && item.iconUrl ? (
                <div className={`relative flex items-center justify-center transition-all duration-500 group-hover/logo:scale-110 ${item.sizeClass}`}>
                  <img
                    src={item.iconUrl}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className={`px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center opacity-80 group-hover/logo:opacity-100 group-hover/logo:scale-105 group-hover/logo:border-ice-blue/60 group-hover/logo:bg-ice-blue/10 transition-all duration-500 shadow-lg min-w-[140px] ${item.sizeClass}`}>
                  <span className="font-heading font-extrabold text-sm md:text-base tracking-wider text-white group-hover/logo:text-ice-blue transition-colors">
                    {item.badgeText}
                  </span>
                  {item.subText && (
                    <span className="font-mono text-[9px] tracking-widest text-text-muted group-hover/logo:text-white/80 uppercase">
                      {item.subText}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

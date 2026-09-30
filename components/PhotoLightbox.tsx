'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Photo } from '@/lib/photoData';

export interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const index = currentIndex ?? -1;
  const activePhoto = isOpen ? photos[index] : null;
  const isFirst = index <= 0;
  const isLast = index >= photos.length - 1;

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && activePhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black/95 backdrop-blur-2xl select-none pointer-events-auto overflow-hidden"
        >
          {/* 1. TOP DEDICATED HEADER BAR */}
          <div className="w-full h-20 px-6 md:px-12 flex items-center justify-between bg-black/80 backdrop-blur-xl border-b border-white/10 z-[100000] relative pointer-events-auto">
            {/* Title / Category */}
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <div className="w-8 h-8 rounded-full bg-ice-blue/10 border border-ice-blue/30 flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 text-ice-blue" />
              </div>
              <div className="truncate">
                <h3 className="font-heading font-bold text-sm md:text-base text-white truncate">
                  {activePhoto.title || 'Still Frame'}
                </h3>
                <p className="font-mono text-[10px] text-ice-blue tracking-widest uppercase">
                  {activePhoto.mainCategory} {activePhoto.subCategory ? `• ${activePhoto.subCategory}` : ''}
                </p>
              </div>
            </div>

            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 hover:border-red-500 transition-all font-mono font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer pointer-events-auto active:scale-95"
              aria-label="Close photo viewer"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. CENTER IMAGE CONTAINER WITH PREV/NEXT ARROWS */}
          <div
            className="relative flex-1 w-full flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
          >
            {/* Previous Button */}
            <button
              type="button"
              disabled={isFirst}
              onClick={(e) => {
                e.stopPropagation();
                if (!isFirst) onNavigate(index - 1);
              }}
              className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-ice-blue/40 text-ice-blue flex items-center justify-center transition-all cursor-pointer hover:bg-ice-blue/20 hover:scale-110 shadow-2xl pointer-events-auto active:scale-95 ${
                isFirst ? 'opacity-20 pointer-events-none' : ''
              }`}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              disabled={isLast}
              onClick={(e) => {
                e.stopPropagation();
                if (!isLast) onNavigate(index + 1);
              }}
              className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100000] w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-ice-blue/40 text-ice-blue flex items-center justify-center transition-all cursor-pointer hover:bg-ice-blue/20 hover:scale-110 shadow-2xl pointer-events-auto active:scale-95 ${
                isLast ? 'opacity-20 pointer-events-none' : ''
              }`}
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container with Swipe Gestures */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhoto.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -60 && !isLast) {
                    onNavigate(index + 1);
                  } else if (offset.x > 60 && !isFirst) {
                    onNavigate(index - 1);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[78vh] w-full flex flex-col items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
              >
                <div className="relative w-full h-[70vh] md:h-[78vh] rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,212,255,0.25)] bg-surface">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.title || 'Photo'}
                    fill
                    sizes="100vw"
                    className="object-contain select-none pointer-events-none"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. BOTTOM FLOATING ACTION BAR */}
          <div className="w-full h-16 px-6 flex items-center justify-center bg-black/80 backdrop-blur-xl border-t border-white/10 z-[100000] relative pointer-events-auto gap-4">
            <span className="font-mono text-xs text-white/80 tracking-widest">
              {index + 1} / {photos.length}
            </span>
            <span className="text-white/20">•</span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-mono text-text-muted hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
            >
              PRESS ESC OR CLICK HERE TO EXIT
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoLightbox;

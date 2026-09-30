'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from '@/lib/videoData';

export interface VideoPlayerModalProps {
  videos: Video[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < videos.length;
  const activeVideo = isOpen ? videos[currentIndex] : null;

  // Escape key & Arrow key listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && currentIndex !== null && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex !== null && currentIndex < videos.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, currentIndex, videos.length, onNavigate]);

  // Determine if video is vertical (portrait)
  const isVertical = React.useMemo(() => {
    if (!activeVideo) return false;
    if (activeVideo.isVertical) return true;

    const titleLower = (activeVideo.title || '').toLowerCase();
    return (
      titleLower.includes('vertical') ||
      titleLower.includes('portrait') ||
      titleLower.includes('reel') ||
      titleLower.includes('short') ||
      titleLower.includes('9:16') ||
      titleLower.includes('9x16')
    );
  }, [activeVideo]);

  return (
    <AnimatePresence>
      {isOpen && activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center select-none pointer-events-auto overflow-hidden">
          
          {/* 1. BACKDROP DIV (z-[99]) - CLICK OUTSIDE TO CLOSE */}
          <div
            onClick={onClose}
            className="absolute inset-0 z-[99] bg-black/90 backdrop-blur-2xl cursor-pointer"
          />

          {/* 2. CLOSE BUTTON (z-[110]) - ABOVE EVERYTHING WITH SEMI-TRANSPARENT BACKDROP */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 z-[110] px-4 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 hover:border-ice-blue hover:bg-ice-blue/20 text-white hover:text-ice-blue transition-all cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center gap-2 font-mono text-xs tracking-widest font-bold uppercase pointer-events-auto"
            aria-label="Close video player"
          >
            <span>CLOSE</span>
            <X className="w-5 h-5 text-ice-blue" />
          </button>

          {/* PREVIOUS BUTTON (z-[110]) */}
          {currentIndex !== null && (
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex > 0) onNavigate(currentIndex - 1);
              }}
              className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-ice-blue/40 text-ice-blue flex items-center justify-center transition-all cursor-pointer hover:bg-ice-blue/20 hover:scale-110 shadow-2xl pointer-events-auto active:scale-95 ${
                currentIndex === 0 ? 'opacity-20 pointer-events-none' : ''
              }`}
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* NEXT BUTTON (z-[110]) */}
          {currentIndex !== null && (
            <button
              type="button"
              disabled={currentIndex === videos.length - 1}
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex < videos.length - 1) onNavigate(currentIndex + 1);
              }}
              className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-ice-blue/40 text-ice-blue flex items-center justify-center transition-all cursor-pointer hover:bg-ice-blue/20 hover:scale-110 shadow-2xl pointer-events-auto active:scale-95 ${
                currentIndex === videos.length - 1 ? 'opacity-20 pointer-events-none' : ''
              }`}
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* COUNTER BADGE (z-[110]) */}
          {currentIndex !== null && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] px-5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-sm text-white/90 tracking-widest pointer-events-none shadow-xl">
              {currentIndex + 1} / {videos.length}
            </div>
          )}

          {/* 3. PLAYER CONTAINER (z-[100]) - PREVENT CLICKS ON PLAYER FROM CLOSING */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideo.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative z-[100] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(0,212,255,0.3)] bg-black transition-all duration-500 ease-out pointer-events-auto cursor-default ${
                isVertical
                  ? 'max-w-[450px] w-[85vw] aspect-[9/16] max-h-[80vh]'
                  : 'max-w-[1000px] w-[90vw] aspect-video max-h-[85vh]'
              }`}
            >
              <iframe
                src={`https://drive.google.com/file/d/${activeVideo.driveFileId}/preview`}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={activeVideo.title}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayerModal;

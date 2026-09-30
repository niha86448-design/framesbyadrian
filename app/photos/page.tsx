'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Filter, Loader2 } from 'lucide-react';
import { mainCategories, subCategories, Photo } from '@/lib/photoData';
import { getFolderId } from '@/config/driveFolders';
import PhotoLightbox from '@/components/PhotoLightbox';
import EmptyState from '@/components/EmptyState';

const ASPECTS: Photo['aspectRatio'][] = ['portrait', 'landscape', 'square', 'landscape', 'portrait'];

export default function PhotosPage() {
  const [selectedMainCat, setSelectedMainCat] = useState<string>(mainCategories[0] || 'Fitness');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('ALL');
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const [drivePhotos, setDrivePhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeSubCategories = useMemo(() => {
    if (selectedMainCat === 'ALL' || !subCategories[selectedMainCat]) {
      return [];
    }
    return subCategories[selectedMainCat];
  }, [selectedMainCat]);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    const folderId = getFolderId(selectedMainCat, selectedSubCat, 'photo');

    if (!folderId) {
      setDrivePhotos([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/drive?folderId=${folderId}&type=image`);
      const data = await res.json();

      if (data.success === false && data.error) {
        setError(data.error);
        setDrivePhotos([]);
      } else if (data.files) {
        const mapped: Photo[] = data.files.map((file: any, index: number) => ({
          id: file.id || `drive-photo-${index}`,
          src: file.thumbnailLink,
          title: file.name || 'Photo',
          mainCategory: selectedMainCat as Photo['mainCategory'],
          subCategory: selectedSubCat === 'ALL' ? '' : selectedSubCat,
          aspectRatio: ASPECTS[index % ASPECTS.length],
        }));
        setDrivePhotos(mapped);
      } else {
        setDrivePhotos([]);
      }
    } catch (err) {
      console.error('Error fetching Drive photos:', err);
      setError('Failed to load photos from Google Drive');
      setDrivePhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMainCat, selectedSubCat]);

  const handleMainCatChange = (cat: string) => {
    setSelectedMainCat(cat);
    setSelectedSubCat('ALL');
    setActivePhotoIdx(null);
  };

  return (
    <div className="relative z-50 min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none">
      
      {/* Back Navigation Button */}
      <div className="relative z-50 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-ice-blue uppercase tracking-widest hover:text-white transition-colors cursor-hover bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-ice-blue uppercase tracking-widest">
          <Camera className="w-4 h-4 text-ice-blue animate-pulse" />
          <span>STILL FRAMES ARCHIVE</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-bold text-white text-glow">
          Photo Gallery
        </h1>
        <p className="text-sm md:text-base text-text-muted max-w-2xl font-body">
          An organic, editorial collection of high-contrast photography by Adrian across sports, weddings, music, and events.
        </p>
      </div>

      {/* 1. TIER 1 MAIN CATEGORY FILTER TABS (No 'ALL FRAMES' tab) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
        {mainCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleMainCatChange(cat)}
            className={`px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-hover ${
              selectedMainCat === cat
                ? 'bg-ice-blue text-[#08080C] shadow-[0_0_15px_#00D4FF]'
                : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. TIER 2 SUB-CATEGORY FILTER PILLS */}
      {activeSubCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 bg-surface/40 p-3 rounded-2xl border border-white/10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-ice-blue uppercase tracking-widest px-2">
            <Filter className="w-3 h-3" />
            <span>SUB:</span>
          </span>
          <button
            onClick={() => setSelectedSubCat('ALL')}
            className={`px-3.5 py-1 rounded-lg font-mono text-[11px] font-semibold uppercase tracking-wider transition-all cursor-hover ${
              selectedSubCat === 'ALL'
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-text-muted hover:text-white'
            }`}
          >
            ALL {selectedMainCat}
          </button>
          {activeSubCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCat(sub)}
              className={`px-3.5 py-1 rounded-lg font-mono text-[11px] font-semibold uppercase tracking-wider transition-all cursor-hover ${
                selectedSubCat === sub
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-text-muted hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </motion.div>
      )}

      {/* ICE-BLUE SKELETON LOADER STATE */}
      {loading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid relative w-full h-64 rounded-2xl bg-surface/60 border border-ice-blue/20 animate-pulse mb-6 flex items-center justify-center"
            >
              <Loader2 className="w-6 h-6 text-ice-blue animate-spin" />
            </div>
          ))}
        </div>
      ) : drivePhotos.length === 0 ? (
        /* EMPTY / ERROR STATE — ONLY REAL DRIVE DATA */
        <EmptyState
          title={error ? 'Unable to load Google Drive photos' : `No photos in ${selectedMainCat} category yet`}
          message={error ? error : `Photos will appear here once uploaded to the ${selectedMainCat} Google Drive folder.`}
          type="photo"
          onRetry={fetchPhotos}
        />
      ) : (
        /* UNEVEN MASONRY GALLERY WALL */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {drivePhotos.map((photo, idx) => {
            const aspectClass =
              photo.aspectRatio === 'portrait'
                ? 'aspect-[3/4]'
                : photo.aspectRatio === 'square'
                ? 'aspect-[1/1]'
                : 'aspect-[4/3]';

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActivePhotoIdx(idx)}
                className={`break-inside-avoid relative w-full ${aspectClass} rounded-2xl overflow-hidden border border-white/10 bg-surface shadow-xl cursor-hover group transition-all duration-500 hover:border-ice-blue/60 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] mb-6`}
              >
                <Image
                  src={photo.src}
                  alt="Gallery photo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                />

                {/* Viewfinder Corner Lines */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 group-hover:border-ice-blue transition-colors" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 group-hover:border-ice-blue transition-colors" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 group-hover:border-ice-blue transition-colors" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 group-hover:border-ice-blue transition-colors" />
              </motion.div>
            );
          })}
        </div>
      )}

      {/* DEDICATED PHOTO LIGHTBOX COMPONENT */}
      <PhotoLightbox
        photos={drivePhotos}
        currentIndex={activePhotoIdx}
        onClose={() => setActivePhotoIdx(null)}
        onNavigate={(index) => setActivePhotoIdx(index)}
      />

    </div>
  );
}

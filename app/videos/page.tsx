'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Film, Play, Filter, Loader2 } from 'lucide-react';
import { mainCategories, subCategories, Video } from '@/lib/videoData';
import { getFolderId } from '@/config/driveFolders';
import VideoPlayerModal from '@/components/VideoPlayerModal';
import EmptyState from '@/components/EmptyState';

export default function VideosPage() {
  const [selectedMainCat, setSelectedMainCat] = useState<string>(mainCategories[0] || 'Events');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('ALL');
  const [activeVideoIdx, setActiveVideoIdx] = useState<number | null>(null);

  const [driveVideos, setDriveVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeSubCategories = useMemo(() => {
    if (selectedMainCat === 'ALL' || !subCategories[selectedMainCat]) return [];
    return subCategories[selectedMainCat];
  }, [selectedMainCat]);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    const folderId = getFolderId(selectedMainCat, selectedSubCat, 'video');

    if (!folderId) {
      setDriveVideos([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/drive?folderId=${folderId}&type=video`);
      const data = await res.json();

      if (data.success === false && data.error) {
        setError(data.error);
        setDriveVideos([]);
      } else if (data.files) {
        const mapped: Video[] = data.files.map((file: any, index: number) => ({
          id: file.id || `drive-video-${index}`,
          title: file.name?.replace(/\.[^/.]+$/, '') || 'Video',
          driveFileId: file.id,
          thumbnail: file.thumbnailLink || '',
          duration: '',
          mainCategory: selectedMainCat as Video['mainCategory'],
          subCategory: selectedSubCat === 'ALL' ? '' : selectedSubCat,
        }));
        setDriveVideos(mapped);
      } else {
        setDriveVideos([]);
      }
    } catch (err: any) {
      console.error('Error fetching Drive videos:', err);
      setError('Failed to load videos from Google Drive');
      setDriveVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMainCat, selectedSubCat]);

  const handleMainCatChange = (cat: string) => {
    setSelectedMainCat(cat);
    setSelectedSubCat('ALL');
    setActiveVideoIdx(null);
  };

  return (
    <div className="relative z-50 min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none">

      {/* Back Navigation */}
      <div className="relative z-50 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-ice-blue uppercase tracking-widest hover:text-white transition-colors cursor-hover bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-ice-blue uppercase tracking-widest">
          <Film className="w-4 h-4 text-ice-blue animate-pulse" />
          <span>MOTION PICTURE ARCHIVE</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-6xl font-bold text-white text-glow">Films</h1>
        <p className="text-sm md:text-base text-text-muted max-w-2xl font-body">
          A premium collection of cinematic films across sports, weddings, events, and corporate productions.
        </p>
      </div>

      {/* TIER 1: Main Category Tabs */}
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

      {/* TIER 2: Sub-category Pills */}
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
              selectedSubCat === 'ALL' ? 'bg-white text-black font-bold' : 'bg-white/5 text-text-muted hover:text-white'
            }`}
          >
            ALL {selectedMainCat}
          </button>
          {activeSubCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCat(sub)}
              className={`px-3.5 py-1 rounded-lg font-mono text-[11px] font-semibold uppercase tracking-wider transition-all cursor-hover ${
                selectedSubCat === sub ? 'bg-white text-black font-bold' : 'bg-white/5 text-text-muted hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </motion.div>
      )}

      {/* SKELETON LOADER */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative w-full aspect-video rounded-2xl bg-surface/60 border border-ice-blue/20 animate-pulse flex items-center justify-center"
            >
              <Loader2 className="w-6 h-6 text-ice-blue animate-spin" />
            </div>
          ))}
        </div>
      ) : driveVideos.length === 0 ? (
        /* EMPTY STATE UI - ONLY REAL DRIVE DATA */
        <EmptyState
          title={error ? 'Unable to load Google Drive videos' : `No videos in ${selectedMainCat} category yet`}
          message={error ? error : `Videos will appear here once uploaded to the ${selectedMainCat} Google Drive folder.`}
          type="video"
          onRetry={fetchVideos}
        />
      ) : (
        /* VIDEO CARD GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {driveVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveVideoIdx(idx)}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-surface shadow-xl cursor-hover transition-all duration-500 hover:border-ice-blue/60 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
            >
              {/* Thumbnail */}
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-[#0d0d18] to-black flex items-center justify-center">
                  <Film className="w-10 h-10 text-ice-blue/40" />
                </div>
              )}

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-white/60 bg-black/50 backdrop-blur flex items-center justify-center group-hover:border-ice-blue group-hover:bg-ice-blue/20 group-hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all duration-500">
                  <Play className="w-6 h-6 text-white group-hover:text-ice-blue fill-current transition-colors ml-1" />
                </div>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-heading font-bold text-sm text-white leading-tight line-clamp-2 group-hover:text-ice-blue transition-colors">
                  {video.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="font-mono text-[10px] text-ice-blue uppercase tracking-widest">{video.subCategory || video.mainCategory}</span>
                </div>
              </div>

              {/* Viewfinder Corner Lines */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 group-hover:border-ice-blue transition-colors" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 group-hover:border-ice-blue transition-colors" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 group-hover:border-ice-blue transition-colors" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 group-hover:border-ice-blue transition-colors" />
            </motion.div>
          ))}
        </div>
      )}

      {/* ADAPTIVE VIDEO PLAYER MODAL COMPONENT */}
      <VideoPlayerModal
        videos={driveVideos}
        currentIndex={activeVideoIdx}
        onClose={() => setActiveVideoIdx(null)}
        onNavigate={(index) => setActiveVideoIdx(index)}
      />
    </div>
  );
}

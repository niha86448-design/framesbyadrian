'use client';

import React from 'react';
import { Film, ImageOff } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  type?: 'video' | 'photo';
  onRetry?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No videos in this category yet',
  message = 'Videos will appear here once uploaded to Google Drive',
  type = 'video',
  onRetry,
}) => {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-surface/30 rounded-3xl border border-white/10 p-8 space-y-4 my-6">
      <div className="w-16 h-16 rounded-full bg-ice-blue/10 border border-ice-blue/30 flex items-center justify-center text-ice-blue shadow-[0_0_20px_rgba(0,212,255,0.2)]">
        {type === 'video' ? <Film className="w-8 h-8" /> : <ImageOff className="w-8 h-8" />}
      </div>
      <h3 className="text-2xl font-heading font-bold text-white tracking-wide">{title}</h3>
      <p className="text-sm font-mono text-text-muted max-w-md">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 px-6 py-2.5 rounded-full bg-ice-blue/10 hover:bg-ice-blue/20 border border-ice-blue/40 text-ice-blue font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,212,255,0.4)]"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
};

export default EmptyState;

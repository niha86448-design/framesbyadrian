'use client';

import React from 'react';

export const Vignette: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5] select-none"
      style={{
        background: 'radial-gradient(circle at center, transparent 40%, rgba(8, 8, 12, 0.85) 100%)',
      }}
    />
  );
};

export default Vignette;

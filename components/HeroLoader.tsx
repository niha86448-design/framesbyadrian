'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Expanding Center Ice-Blue Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: 'circOut' }}
            className="w-48 md:w-80 h-[2px] bg-gradient-to-r from-transparent via-ice-blue to-transparent shadow-[0_0_15px_#00D4FF]"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-4 flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] uppercase text-ice-blue/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ice-blue animate-ping" />
            <span>FRAMES BY ADRIAN &bull; INITIALIZING</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroLoader;

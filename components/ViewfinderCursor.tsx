'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const ViewfinderCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    if (hasTouch) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Motion values update without triggering React re-renders.
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Only flip React state when it actually changes, so we don't
      // re-render the cursor on every pixel of movement.
      setIsVisible((v) => (v ? v : true));

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'a, button, [role="button"], input, select, textarea, .cursor-hover'
      );
      setIsHovered((h) => (h === isInteractive ? h : isInteractive));
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
    // mouseX/mouseY are stable motion values; deliberately run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full transition-shadow duration-300 ${
        isHovered ? 'glow-ice' : ''
      }`}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          width: isHovered ? 24 : 40,
          height: isHovered ? 24 : 40,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative flex items-center justify-center"
      >
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Left Corner Bracket */}
          <path
            d="M 2 10 V 2 H 10"
            stroke={isHovered ? '#00D4FF' : 'rgba(0, 212, 255, 0.5)'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Top-Right Corner Bracket */}
          <path
            d="M 30 2 H 38 V 10"
            stroke={isHovered ? '#00D4FF' : 'rgba(0, 212, 255, 0.5)'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Bottom-Left Corner Bracket */}
          <path
            d="M 2 30 V 38 H 10"
            stroke={isHovered ? '#00D4FF' : 'rgba(0, 212, 255, 0.5)'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Bottom-Right Corner Bracket */}
          <path
            d="M 30 38 H 38 V 30"
            stroke={isHovered ? '#00D4FF' : 'rgba(0, 212, 255, 0.5)'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Center Focus Dot (Visible on hover) */}
          {isHovered && (
            <circle cx="20" cy="20" r="2" fill="#00D4FF" />
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ViewfinderCursor;

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Heavy three.js scene is code-split and loaded only on the client,
// after mount, so it never ships in the initial bundle.
const BokehScene = dynamic(() => import('./BokehScene'), { ssr: false });

export function BokehBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer to idle time so the scene never competes with first paint.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setMounted(true));
      return () => {
        const cancel = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (typeof cancel === 'function') cancel(id);
      };
    }
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return <BokehScene />;
}

export default BokehBackground;

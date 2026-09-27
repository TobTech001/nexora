// hooks/useScroll.ts
// Tracks vertical scroll position and direction — used to blur/condense the navbar
// and trigger scroll-based reveals.

import { useEffect, useState } from 'react';

interface ScrollState {
  y: number;
  isScrolled: boolean;
  direction: 'up' | 'down';
}

export const useScroll = (threshold = 24) => {
  const [state, setState] = useState<ScrollState>({ y: 0, isScrolled: false, direction: 'up' });

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setState({
        y,
        isScrolled: y > threshold,
        direction: y > lastY ? 'down' : 'up',
      });
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
};
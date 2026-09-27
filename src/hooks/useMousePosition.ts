// hooks/useMousePosition.ts
// Normalized mouse position (-1 to 1 on each axis, centered on the viewport) —
// used to drive subtle parallax on the hero's 3D device.

import { useEffect, useState } from 'react';

interface NormalizedPosition {
  x: number;
  y: number;
}

export const useMousePosition = (): NormalizedPosition => {
  const [position, setPosition] = useState<NormalizedPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return position;
};
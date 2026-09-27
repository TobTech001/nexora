// components/ScrollIndicator.tsx
// "Scroll to explore" mark at the bottom of the hero — a thin line that
// gently travels downward on a loop. Respects prefers-reduced-motion.

import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const ScrollIndicator = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-3 text-ink/70">
      <span className="text-[11px] tracking-[0.2em] uppercase">Scroll to explore</span>
      <div className="relative w-px h-10 bg-line overflow-hidden">
        {!reducedMotion && (
          <span className="absolute inset-x-0 top-0 h-4 bg-ink/80 animate-scrollLine" />
        )}
      </div>
    </div>
  );
};

export default ScrollIndicator;
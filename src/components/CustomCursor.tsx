// components/CustomCursor.tsx
// Subtle custom cursor, desktop (fine-pointer) only. Mount once in App.tsx.
//
// States, detected via the nearest ancestor's data-cursor attribute:
//   data-cursor="view"  -> shows "VIEW →" (put this on product tile links)
//   data-cursor="image" -> small ring, no label (put this on plain imagery)
//   (button / a with no data-cursor) -> cursor expands slightly (CTA state)
//   default -> small dot
//
// Respects prefers-reduced-motion and is inert on touch devices — it never
// mounts its effects there, so the native cursor and default touch behavior
// are untouched.

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsFinePointer, usePrefersReducedMotion } from '../hooks/useMediaQuery';

type CursorState = 'default' | 'cta' | 'view' | 'image';

const CustomCursor = () => {
  const isFinePointer = useIsFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const active = isFinePointer && !reducedMotion;

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>('default');

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest<HTMLElement>('[data-cursor]');
      if (cursorEl) {
        setState((cursorEl.dataset.cursor as CursorState) ?? 'default');
        return;
      }
      if (target.closest('a, button')) {
        setState('cta');
        return;
      }
      setState('default');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [active]);

  if (!active) return null;

  const size = state === 'view' ? 64 : state === 'cta' ? 36 : state === 'image' ? 28 : 10;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center rounded-full border border-ink/60 bg-ink/5 backdrop-blur-sm"
      animate={{ x: pos.x - size / 2, y: pos.y - size / 2, width: size, height: size }}
      transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.4 }}
    >
      {state === 'view' && (
        <span className="text-[10px] uppercase tracking-widest text-ink whitespace-nowrap">View →</span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
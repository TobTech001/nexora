// components/HeroVideo.tsx
// Full-screen hero background. Tries to play a real video loop; if the
// sources 404 (no video file at these paths yet), or the viewer prefers
// reduced motion, it falls back to AnimatedFallback — a self-contained CSS
// animation (no external assets) that approximates the "slow-moving dark 3D
// environment" the design calls for. Once you drop real footage in, it plays
// automatically and the CSS fallback is hidden behind it.
//
// Drop your own loop into:
//   public/videos/nexora-hero.webm  (preferred)
//   public/videos/nexora-hero.mp4   (fallback)
//   public/images/hero-poster.svg   (poster — currently a generated placeholder;
//     swap for a real .webp/.jpg still and update the path below if renamed)

import { useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const AnimatedFallback = () => (
  <div className="absolute inset-0 overflow-hidden bg-bg">
    <div className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-accent/20 blur-[120px] animate-drift1" />
    <div className="absolute top-1/3 -left-1/4 w-[55vw] h-[55vw] rounded-full bg-cobalt/10 blur-[110px] animate-drift2" />
    <div className="absolute -bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-surface2 blur-[100px] animate-drift3" />
    {/* tiny champagne-gold highlight, kept small and low-opacity per the brief */}
    <div className="absolute bottom-1/4 left-1/3 w-[12vw] h-[12vw] rounded-full bg-gold/10 blur-[80px] animate-drift2" />
    {/* faint grid to keep the "technology environment" feel rather than a plain blob */}
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(203,213,225,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(203,213,225,0.6) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
  </div>
);

const HeroVideo = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = !reducedMotion && !videoFailed;

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg">
      <AnimatedFallback />

      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.svg"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/nexora-hero.webm" type="video/webm" />
          <source src="/videos/nexora-hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Layer 3: warm directional wash keeps left-aligned text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(232,240,231,0.98) 0%, rgba(232,240,231,0.90) 34%, rgba(232,240,231,0.48) 65%, rgba(232,240,231,0.18) 100%)',
        }}
      />

      {/* Layer 4: subtle violet + cobalt glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 75% 30%, rgba(220,104,76,0.14), transparent 55%), radial-gradient(circle at 30% 80%, rgba(82,123,112,0.12), transparent 50%)',
        }}
      />
    </div>
  );
};

export default HeroVideo;

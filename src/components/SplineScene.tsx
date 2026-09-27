// components/SplineScene.tsx
// Wraps @splinetool/react-spline. Install with: npm install @splinetool/react-spline
//
// Replace SCENE_URL with your own exported Spline scene (Export > Code Export > React).
// Until a real scene is wired in, this renders a CSS-built device mockup in its place
// so the hero still looks and animates correctly out of the box.

import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

const SCENE_URL = ''; // e.g. 'https://prod.spline.design/your-scene-id/scene.splinecode'

const DeviceFallback = () => {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      style={{
        transform: `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`,
      }}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
    >
      <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full bg-accent/20 blur-[100px]" />
      <div
        className="relative w-[220px] h-[460px] md:w-[300px] md:h-[620px] rounded-[38px] border border-line/80 bg-gradient-to-b from-surface2 to-bg shadow-2xl"
        style={{ boxShadow: '0 40px 100px -20px rgba(40,82,71,0.25)' }}
      >
        <div className="absolute inset-[3px] rounded-[34px] bg-bg overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-6 flex items-center justify-center">
            <div className="w-20 h-4 rounded-full bg-surface2" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

const SplineScene = () => {
  return <DeviceFallback />;
};

export default SplineScene;

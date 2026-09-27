// components/Hero.tsx
// Full-screen cinematic hero on the new navy/indigo/violet/gold palette.
// "Future" is highlighted with a violet-to-cobalt gradient (see .text-gradient-accent).

import { motion } from 'framer-motion';
import HeroVideo from './HeroVideo';
import ScrollIndicator from './ScrollIndicator';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <HeroVideo />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-content w-full mx-auto px-6 lg:px-10"
      >
        <div className="max-w-xl">
          <motion.p variants={item} className="text-xs tracking-[0.2em] uppercase text-gold mb-6">
            The next generation
          </motion.p>

          <motion.h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.98] tracking-tight text-ink">
            <motion.span variants={item} className="block">
              The <span className="text-gradient-accent">future</span>
            </motion.span>
            <motion.span variants={item} className="block">is in your</motion.span>
            <motion.span variants={item} className="block">hands.</motion.span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 text-muted max-w-md leading-relaxed">
            Discover premium smartphones, laptops and connected devices designed for people who
            expect more.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="/shop"
              className="px-7 py-3.5 rounded-full bg-accent text-ink text-xs tracking-wide uppercase font-medium transition-all duration-300 hover:bg-accentHover shadow-[0_14px_35px_-18px_rgba(220,104,76,0.7)]"
            >
              Explore collection →
            </a>
            <a
              href="/shop?filter=new"
              className="px-7 py-3.5 rounded-full border border-line text-xs tracking-wide uppercase text-ink hover:text-accent hover:border-accent transition-colors duration-300"
            >
              View new arrivals
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-10 text-[11px] tracking-widest uppercase text-slate">
            Authentic products · Secure checkout · Fast delivery
          </motion.p>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;

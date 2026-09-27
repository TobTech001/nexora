// components/Testimonials.tsx
// Customer notes in a calm, centered editorial panel.

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';

const TESTIMONIALS = [
  { quote: 'Everything about the experience felt premium — from ordering to delivery.', name: 'David O.' },
  { quote: 'My MacBook arrived faster than I expected, and support answered every question.', name: 'Amara N.' },
  { quote: "The site alone made me trust the store before I'd even checked out.", name: 'Tunde A.' },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-bg max-w-content mx-auto px-6 lg:px-10 py-20 sm:py-28 text-center">
      <div className="max-w-4xl mx-auto rounded-[2rem] border border-line bg-surface px-6 py-12 sm:px-16 sm:py-16 shadow-[0_24px_80px_-60px_rgba(40,82,71,0.35)]">
      <p className="text-[10px] tracking-[0.2em] uppercase text-accent mb-5">Notes from our customers</p>
      <div className="flex justify-center gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className="fill-gold text-gold" />
        ))}
      </div>

      <blockquote className="font-display font-semibold text-2xl sm:text-3xl text-ink max-w-2xl mx-auto leading-snug">
        <span className="text-accent">“</span>
        {t.quote}
        <span className="text-accent">”</span>
      </blockquote>

      <p className="mt-6 text-sm text-muted inline-flex items-center gap-1.5">
        {t.name} · Verified customer
        <BadgeCheck size={14} className="text-cobalt" />
      </p>

      <div className="flex justify-center gap-4 mt-10">
        <button aria-label="Previous testimonial" onClick={() => go(-1)} className="text-muted hover:text-accent transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button aria-label="Next testimonial" onClick={() => go(1)} className="text-muted hover:text-accent transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
      </div>
    </section>
  );
};

export default Testimonials;

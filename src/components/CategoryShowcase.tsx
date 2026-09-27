// components/CategoryShowcase.tsx
// Large editorial category tiles with soft color accents.

import { ArrowRight } from 'lucide-react';
import { categories } from '../data/categories';

const ACCENTS: Record<string, { glow: string; hoverText: string }> = {
  phone: { glow: 'rgba(230,94,67,0.24)', hoverText: 'group-hover:text-accent' },
  laptop: { glow: 'rgba(85,123,118,0.24)', hoverText: 'group-hover:text-cobalt' },
  tablet: { glow: 'rgba(217,166,90,0.22)', hoverText: 'group-hover:text-gold' },
  audio: { glow: 'rgba(230,94,67,0.16)', hoverText: 'group-hover:text-accent' },
  accessories: { glow: 'rgba(217,166,90,0.22)', hoverText: 'group-hover:text-gold' },
};

const CategoryShowcase = () => {
  return (
    <section className="bg-bg pb-28">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-14 max-w-lg">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent mb-3">Find your next favorite</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Shop by category.</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map((cat) => {
            const accent = ACCENTS[cat.id] ?? ACCENTS.phone;
            return (
              <a
                key={cat.id}
                href={cat.href}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-line"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/45 to-bg/10 group-hover:from-bg/90 transition-colors duration-700 ease-out" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                  style={{ background: `radial-gradient(circle at 30% 70%, ${accent.glow}, transparent 60%)` }}
                />

                <div className="relative z-10 h-full flex flex-col justify-end p-7">
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                    <h3 className="font-display font-semibold text-2xl text-ink">{cat.name}</h3>
                    <p className="text-sm text-muted mt-1 max-w-xs">{cat.description}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 mt-4 text-xs uppercase tracking-widest text-ink/80 transition-colors duration-500 ${accent.hoverText}`}>
                    Shop now
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

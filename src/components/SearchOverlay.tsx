// components/SearchOverlay.tsx
// Deep-navy fullscreen overlay (#070d20), gold "category" label, violet active chip.

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Search } from 'lucide-react';

const POPULAR = ['iPhone', 'MacBook', 'Samsung', 'Gaming laptops', 'AirPods'];

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-footer/95 backdrop-blur-xl flex flex-col px-6 pt-24"
        >
          <button aria-label="Close search" onClick={onClose} className="absolute top-8 right-6 text-muted hover:text-ink">
            <X size={22} />
          </button>

          <div className="max-w-2xl w-full mx-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4">What are you looking for?</p>
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <Search size={20} className="text-muted" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands..."
                className="flex-1 bg-transparent text-2xl text-ink placeholder:text-slate focus:outline-none"
              />
            </div>

            <div className="mt-8">
              <p className="text-xs text-slate mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((term) => {
                  const active = query === term;
                  return (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        active
                          ? 'border-accent text-accent bg-accent/10'
                          : 'border-line text-ink hover:border-accent/50'
                      }`}
                    >
                      {term}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
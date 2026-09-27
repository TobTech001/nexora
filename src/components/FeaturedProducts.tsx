// components/FeaturedProducts.tsx
// "JUST LANDED" — horizontal editorial showcase of large product panels,
// replacing the old small-card NewArrivals rail. Minimal info per panel;
// the photography does the work.

import { ArrowUpRight, Sparkles } from 'lucide-react';
import { newArrivals } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';

const FeaturedProducts = () => {
  const panels = newArrivals.slice(0, 4);
  const backdrops = [
    'linear-gradient(145deg, #efb19a 0%, #dc684c 100%)',
    'linear-gradient(145deg, #b9d6bf 0%, #769c8c 100%)',
    'linear-gradient(145deg, #f0d88e 0%, #c8944a 100%)',
  ];

  return (
    <section className="bg-bg py-28">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent mb-3">Fresh from the brands</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Just landed.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">Meet the latest devices, picked for the way you live and work.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {panels.map((product, index) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              data-cursor="view"
              className="group relative min-h-[440px] overflow-hidden rounded-[1.75rem] border border-line shadow-[0_20px_60px_-38px_rgba(40,82,71,0.42)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_-36px_rgba(40,82,71,0.48)]"
              style={{ background: backdrops[index % backdrops.length] }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(243,243,223,0.65),transparent_48%)]" />
              <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
                <Sparkles size={12} /> New arrival
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-x-0 top-2 h-[66%] w-full object-contain p-5 mix-blend-screen transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 rounded-t-[1.5rem] border-t border-ink/10 bg-surface/90 p-6 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-[-3px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{product.brand}</p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-ink">{product.name}</h3>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                {product.specs && <p className="mt-1 text-xs text-muted">{product.specs}</p>}
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-xs uppercase tracking-wider text-muted">From</span>
                  <span className="font-display text-sm font-bold text-ink">{formatCurrency(product.price)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

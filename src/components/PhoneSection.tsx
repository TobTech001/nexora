// components/PhoneSection.tsx
// Dedicated collection section for phones with a warm editorial treatment.

import { ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';

const phones = products.filter((p) => p.category === 'phone');

const PhoneSection = () => {
  return (
    <section className="relative bg-bg py-28 border-t border-line overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(230,94,67,0.08), transparent 45%), radial-gradient(circle at 85% 60%, rgba(85,123,118,0.08), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent mb-3">01 / Phones</p>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-ink leading-tight">
              Power in
              <br />
              your hands.
            </h2>
          </div>
          <p className="text-muted max-w-sm text-sm leading-relaxed">
            Explore flagship smartphones engineered for performance, photography and everyday
            excellence.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
          {phones.map((phone, index) => {
            const stageColors = [
              'linear-gradient(145deg, #efb29b, #df8168)',
              'linear-gradient(145deg, #bfdbbf, #8eaf91)',
              'linear-gradient(145deg, #d6d2ef, #aaa0ce)',
              'linear-gradient(145deg, #f2dfaa, #d4b56e)',
            ];
            return (
              <a
                key={phone.id}
                href={`/product/${phone.id}`}
                data-cursor="view"
                className="group w-[19rem] shrink-0 overflow-hidden rounded-[1.7rem] border border-line bg-surface shadow-[0_15px_45px_-32px_rgba(40,82,71,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-32px_rgba(40,82,71,0.45)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: stageColors[index % stageColors.length] }}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(243,243,223,0.68),transparent_52%)]" />
                  <span className="absolute left-4 top-4 z-10 rounded-full border border-ink/10 bg-surface/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-ink backdrop-blur-sm">Nexora pick</span>
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="relative h-full w-full object-contain p-5 mix-blend-screen transition-transform duration-500 ease-out group-hover:scale-105"
                />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{phone.brand}</p>
                  <h3 className="mt-1 font-display text-base font-bold text-ink">{phone.name}</h3>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                    <span className="text-sm font-semibold text-ink">{formatCurrency(phone.price)}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-accent transition-colors group-hover:text-ink">
                      View phone <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <a
          href="/shop?category=phone"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full bg-ink text-bg text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors duration-300"
        >
          Explore phones →
        </a>
      </div>
    </section>
  );
};

export default PhoneSection;

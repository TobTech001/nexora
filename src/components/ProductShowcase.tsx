// components/ProductShowcase.tsx
// Asymmetric editorial grid — the "fashion website" layout from the brief.
// Row 1: iPhone (large, 2 cols) + Galaxy + Pixel. Row 2: MacBook (large, 3 cols) + Dell.
// Each tile carries the same per-product atmospheric glow used on ProductCard.

import { ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../types/product';
import { formatCurrency } from '../utils/formatCurrency';

const find = (id: string) => products.find((p) => p.id === id)!;

const iphone = find('iphone-17-pro-max');
const galaxy = find('galaxy-s26-ultra');
const pixel = find('pixel-11-pro');
const macbook = find('macbook-pro-m5');
const dell = find('dell-xps-16');

const backdropFor = (product: Product): string => {
  if (product.id.includes('iphone')) return 'linear-gradient(145deg, #f0c0a9, #e78468)';
  if (product.id.includes('galaxy')) return 'linear-gradient(145deg, #c3ddc7, #88ae99)';
  if (product.id.includes('macbook')) return 'linear-gradient(145deg, #f1dfa6, #d5b66d)';
  return 'linear-gradient(145deg, #c9d9dd, #8eafb5)';
};

interface TileProps {
  product: Product;
  span: string;
  aspect?: string;
}

const Tile = ({ product, span, aspect = 'aspect-[4/5]' }: TileProps) => (
  <a
    href={`/product/${product.id}`}
    className={`group relative ${span} ${aspect} overflow-hidden rounded-[1.75rem] border border-line transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_60px_-34px_rgba(40,82,71,0.45)]`}
    data-cursor="view"
    style={{ background: backdropFor(product) }}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(243,243,223,0.6),transparent_50%)]" />
    <img
      src={product.image}
      alt={product.name}
      className="absolute inset-x-0 top-0 h-[72%] w-full object-contain p-8 mix-blend-screen transition-transform duration-700 ease-out group-hover:scale-105"
    />
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 rounded-t-[1.4rem] border-t border-ink/10 bg-surface/90 p-5 backdrop-blur-md sm:p-6">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{product.brand}</p>
        <h3 className="mt-1 truncate font-display text-lg font-bold text-ink">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold text-ink">{formatCurrency(product.price)}</p>
      </div>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-bg transition-all duration-300 group-hover:bg-accent group-hover:text-ink">
        <ArrowUpRight size={17} />
      </span>
    </div>
  </a>
);

const ProductShowcase = () => {
  return (
    <section className="bg-bg pb-28">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="mb-14 max-w-lg">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent mb-3">Made for your everyday</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">A closer look.</h2>
          <p className="mt-3 text-muted leading-relaxed">Standout devices, thoughtfully chosen for work, play and everything in between.</p>
        </div>

        <div className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <Tile product={iphone} span="lg:col-span-2" />
            <Tile product={galaxy} span="lg:col-span-1" />
            <Tile product={pixel} span="lg:col-span-1" />
          </div>
          <div className="grid lg:grid-cols-4 gap-6">
            <Tile product={macbook} span="lg:col-span-3" aspect="aspect-[16/9] lg:aspect-[21/9]" />
            <Tile product={dell} span="lg:col-span-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

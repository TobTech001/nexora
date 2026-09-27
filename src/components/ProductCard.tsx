// components/ProductCard.tsx

import { useState } from 'react';
import { Heart, Plus, Star } from 'lucide-react';
import type { Product } from '../types/product';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

// Subtle warm atmospheric glow behind product photography.
const glowFor = (product: Product): string => {
  if (product.id.includes('iphone')) return 'rgba(230,94,67,0.16)';
  if (product.id.includes('galaxy') || product.brand === 'Samsung') return 'rgba(85,123,118,0.18)';
  if (product.id.includes('macbook')) return 'rgba(217,166,90,0.16)';
  if (product.id.includes('rog') || product.id.includes('zephyrus')) return 'rgba(230,94,67,0.12)';
  return 'rgba(85,123,118,0.10)';
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group relative w-full shrink-0 rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:bg-surface2">
      <a href={`/product/${product.id}`} className="block" data-cursor="view">
        <div className="relative aspect-square rounded-xl bg-surface2 overflow-hidden mb-5">
          <div
            className="absolute inset-0 blur-2xl"
            style={{ background: `radial-gradient(circle at 50% 40%, ${glowFor(product)}, transparent 65%)` }}
          />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="relative w-full h-full object-contain p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]"
          />
        </div>

        <p className="text-xs text-slate">{product.brand}</p>
        <h3 className="font-display font-semibold text-ink mt-1">{product.name}</h3>
        {product.specs && <p className="text-xs text-muted mt-1">{product.specs}</p>}

        <div className="flex items-center gap-1 mt-2">
          <Star size={12} className="fill-gold text-gold" />
          <span className="text-xs text-muted">{product.rating.toFixed(1)}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-ink font-medium">{formatCurrency(product.price)}</span>
          {product.previousPrice && (
            <span className="text-xs text-slate line-through">{formatCurrency(product.previousPrice)}</span>
          )}
        </div>
      </a>

      <div className="flex items-center justify-between mt-4">
        <button
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => setWishlisted((w) => !w)}
          className="text-muted hover:text-ink transition-colors"
        >
          <Heart size={17} className={wishlisted ? 'fill-accent text-accent' : ''} />
        </button>
        <button
          aria-label={`Add ${product.name} to cart`}
          onClick={() => onAddToCart?.(product)}
          className="w-9 h-9 rounded-full bg-accent text-ink flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accentHover"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

// components/ProductGrid.tsx
// Renders a set of products as a responsive grid (4/2/1 cols) or a compact
// list. Used by the Shop page; animates items in/out as filters change.

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import type { Product } from '../types/product';
import { formatCurrency } from '../utils/formatCurrency';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  view: 'grid' | 'list';
  onAddToCart?: (product: Product) => void;
}

const ListRow = ({ product, onAddToCart }: { product: Product; onAddToCart?: (p: Product) => void }) => (
  <a
    href={`/product/${product.id}`}
    className="group flex items-center gap-5 border border-line rounded-xl p-4 hover:border-ink/30 transition-colors"
  >
    <div className="w-20 h-20 rounded-lg bg-surface2 shrink-0 overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted">{product.brand}</p>
      <h3 className="font-display font-semibold text-ink truncate">{product.name}</h3>
      {product.specs && <p className="text-xs text-muted mt-0.5">{product.specs}</p>}
      <div className="flex items-center gap-1 mt-1">
        <Star size={11} className="fill-accent text-accent" />
        <span className="text-xs text-muted">{product.rating.toFixed(1)}</span>
      </div>
    </div>
    <div className="flex items-center gap-6 shrink-0">
      <span className="text-ink font-medium">{formatCurrency(product.price)}</span>
      <button
        aria-label="Add to wishlist"
        onClick={(e) => e.preventDefault()}
        className="text-muted hover:text-ink transition-colors"
      >
        <Heart size={17} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onAddToCart?.(product);
        }}
        className="px-4 py-2 rounded-full bg-accent text-ink text-xs font-medium hover:bg-accentHover transition-colors"
      >
        Add
      </button>
    </div>
  </a>
);

const ProductGrid = ({ products, view, onAddToCart }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="border border-line rounded-2xl py-24 text-center">
        <p className="text-muted">No products match your filters.</p>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="space-y-3">
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ListRow product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
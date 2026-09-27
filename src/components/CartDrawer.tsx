// components/CartDrawer.tsx

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { CartItem } from '../types/product';
import { formatCurrency } from '../utils/formatCurrency';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
}

const CartDrawer = ({ open, onClose, items, subtotal }: CartDrawerProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[rgba(24,59,50,0.58)]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cart border-l border-line z-[61] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-line">
              <h2 className="font-display font-semibold text-ink tracking-wide uppercase text-sm">Your bag</h2>
              <button aria-label="Close bag" onClick={onClose} className="text-muted hover:text-ink">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {items.length === 0 ? (
                <p className="text-sm text-muted">Your bag is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-surface shrink-0 overflow-hidden">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-ink">{item.product.name}</p>
                      <p className="text-xs text-muted mt-1">Qty {item.quantity}</p>
                      <p className="text-sm text-ink mt-1">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-6 border-t border-[rgba(203,213,225,0.12)]">
              <div className="flex items-center justify-between text-sm mb-5">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="/cart"
                  className="flex-1 text-center px-5 py-3 rounded-full border border-accent text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-ink transition-colors"
                >
                  View bag
                </a>
                <a
                  href="/checkout"
                  className="flex-1 text-center px-5 py-3 rounded-full bg-gold text-bg text-xs uppercase tracking-widest font-medium hover:bg-goldHover transition-colors"
                >
                  Checkout
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

// pages/Cart.tsx
// Full cart page (distinct from the CartDrawer, which is a quick-access slideout).
// Reads/writes the shared CartContext so it reflects whatever was added from
// Home, Shop, or a product page.

import { Minus, Plus, X, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { useState } from 'react';
import SearchOverlay from '../components/SearchOverlay';
import CartDrawer from '../components/CartDrawer';

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, count } = useCartContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const shippingEstimate = subtotal > 0 ? 0 : 0; // TODO: wire real shipping calculation
  const total = subtotal + shippingEstimate;

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Navbar
        onSearchClick={() => setSearchOpen(true)}
        onCartClick={() => setDrawerOpen(true)}
        cartCount={count}
      />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Continue shopping
          </a>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-10">
            Your bag{count > 0 && <span className="text-muted font-normal"> · {count} {count === 1 ? 'item' : 'items'}</span>}
          </h1>

          {items.length === 0 ? (
            <div className="border border-line rounded-2xl py-24 flex flex-col items-center text-center">
              <p className="text-muted mb-6">Your bag is empty.</p>
              <a
                href="/shop"
                className="px-7 py-3.5 rounded-full bg-accent text-ink text-sm font-medium hover:bg-accentHover transition-colors duration-300"
              >
                Start shopping
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Line items */}
              <div className="lg:col-span-2 divide-y divide-line border-y border-line">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-5 py-6">
                    <a
                      href={`/product/${item.product.id}`}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-surface border border-line shrink-0 overflow-hidden"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-3"
                      />
                    </a>

                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted">{item.product.brand}</p>
                        <a
                          href={`/product/${item.product.id}`}
                          className="font-display font-semibold text-ink hover:text-accent transition-colors"
                        >
                          {item.product.name}
                        </a>
                        {item.product.specs && (
                          <p className="text-xs text-muted mt-1">{item.product.specs}</p>
                        )}
                        {(item.selectedColor || item.selectedStorage) && (
                          <p className="text-xs text-muted mt-1">
                            {[item.selectedColor, item.selectedStorage].filter(Boolean).join(' · ')}
                          </p>
                        )}

                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink transition-colors mt-3"
                        >
                          <X size={12} />
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                        <div className="flex items-center border border-line rounded-full">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center text-ink disabled:text-muted disabled:cursor-not-allowed hover:text-accent transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-sm text-ink">{item.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-ink hover:text-accent transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-ink font-medium">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <aside className="lg:col-span-1">
                <div className="border border-line rounded-2xl p-6 sticky top-28">
                  <h2 className="font-display font-semibold text-ink mb-5">Order summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Subtotal</span>
                      <span className="text-ink">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Shipping</span>
                      <span className="text-ink">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-line mt-5 pt-5 flex justify-between">
                    <span className="text-ink font-medium">Total</span>
                    <span className="text-ink font-medium">{formatCurrency(total)}</span>
                  </div>

                  <a
                    href="/checkout"
                    className="block text-center mt-6 px-6 py-3.5 rounded-full bg-gold text-bg text-sm font-medium hover:bg-goldHover transition-colors duration-300"
                  >
                    Proceed to checkout
                  </a>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} subtotal={subtotal} />
    </div>
  );
};

export default Cart;
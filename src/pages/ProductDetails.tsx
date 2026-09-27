// pages/ProductDetails.tsx
// Route: /product/:id
// Left: image gallery (falls back to a single image when product.images isn't
// set). Right: sticky buy box — brand, name, rating, price, color/storage
// selectors, quantity, Add to Cart / Buy Now. Below: Overview / Specifications
// / What's included / Warranty / Reviews tabs.

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, Minus, Plus, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchOverlay from '../components/SearchOverlay';
import CartDrawer from '../components/CartDrawer';
import { products } from '../data/products';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

type Tab = 'overview' | 'specs' | 'included' | 'warranty' | 'reviews';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs', label: 'Specifications' },
  { id: 'included', label: "What's included" },
  { id: 'warranty', label: 'Warranty' },
  { id: 'reviews', label: 'Reviews' },
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { items, addItem, subtotal, count } = useCartContext();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product?.colors?.[0]);
  const [storage, setStorage] = useState(product?.storageOptions?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');

  if (!product) {
    return (
      <div className="bg-bg min-h-screen flex flex-col">
        <Navbar onSearchClick={() => setSearchOpen(true)} onCartClick={() => setDrawerOpen(true)} cartCount={count} />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
          <p className="text-muted mb-6">We couldn't find that product.</p>
          <Link
            to="/shop"
            className="px-7 py-3.5 rounded-full bg-ink text-bg text-sm font-medium hover:bg-accent hover:text-ink transition-colors duration-300"
          >
            Back to shop
          </Link>
        </main>
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : [product.image];

  const handleAddToCart = () => {
    addItem(product, quantity);
    setDrawerOpen(true);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Navbar onSearchClick={() => setSearchOpen(true)} onCartClick={() => setDrawerOpen(true)} cartCount={count} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8"
          >
            <ChevronLeft size={15} />
            Back to shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* Gallery */}
            <div>
              <div className="aspect-square rounded-2xl bg-surface border border-line overflow-hidden">
                <img
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-10"
                />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {gallery.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`w-16 h-16 rounded-lg border overflow-hidden ${
                        activeImage === i ? 'border-accent' : 'border-line'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy box */}
            <div className="lg:sticky lg:top-28 self-start">
              <p className="text-sm text-slate">{product.brand}</p>
              <h1 className="font-display font-bold text-3xl text-ink mt-1">{product.name}</h1>

              <div className="flex items-center gap-1.5 mt-3">
                <Star size={14} className="fill-gold text-gold" />
                <span className="text-sm text-muted">{product.rating.toFixed(1)}</span>
              </div>

              <div className="flex items-baseline gap-3 mt-5">
                <span className="text-2xl text-ink font-medium">{formatCurrency(product.price)}</span>
                {product.previousPrice && (
                  <span className="text-sm text-slate line-through">{formatCurrency(product.previousPrice)}</span>
                )}
              </div>

              {product.description && <p className="text-muted mt-5 leading-relaxed">{product.description}</p>}

              {product.colors && product.colors.length > 0 && (
                <div className="mt-7">
                  <p className="text-sm text-ink mb-3">Color — {color}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`px-4 py-2 rounded-full border text-xs transition-colors ${
                          color === c ? 'border-accent text-ink' : 'border-line text-muted hover:border-ink/30'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.storageOptions && product.storageOptions.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-ink mb-3">Storage — {storage}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.storageOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStorage(s)}
                        className={`px-4 py-2 rounded-full border text-xs transition-colors ${
                          storage === s ? 'border-accent text-ink' : 'border-line text-muted hover:border-ink/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-7">
                <p className="text-sm text-ink mb-3">Quantity</p>
                <div className="inline-flex items-center border border-line rounded-full">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-ink hover:text-accent transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-9 text-center text-sm text-ink">{quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-ink hover:text-accent transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3.5 rounded-full border border-accent text-accent text-xs uppercase tracking-widest font-medium hover:bg-accent hover:text-ink transition-colors duration-300"
                >
                  Add to bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3.5 rounded-full bg-gold text-bg text-xs uppercase tracking-widest font-medium hover:bg-goldHover transition-colors duration-300"
                >
                  Buy now
                </button>
                <button
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  onClick={() => setWishlisted((w) => !w)}
                  className="w-12 h-12 shrink-0 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink transition-colors"
                >
                  <Heart size={17} className={wishlisted ? 'fill-accent text-accent' : ''} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-20">
            <div className="flex flex-wrap gap-8 border-b border-line">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`pb-4 text-sm transition-colors border-b-2 -mb-px ${
                    tab === t.id ? 'text-ink border-accent' : 'text-muted border-transparent hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="py-8 max-w-2xl text-sm text-muted leading-relaxed">
              {tab === 'overview' && <p>{product.description ?? 'No overview available for this product yet.'}</p>}
              {tab === 'specs' && <p>{product.specs ?? 'Detailed specifications coming soon.'}</p>}
              {tab === 'included' && (
                <ul className="list-disc list-inside space-y-1">
                  <li>{product.name}</li>
                  <li>Charging cable</li>
                  <li>Documentation</li>
                </ul>
              )}
              {tab === 'warranty' && <p>Covered by a 1-year manufacturer warranty against defects.</p>}
              {tab === 'reviews' && (
                <div className="flex items-center gap-2">
                  <Star size={14} className="fill-gold text-gold" />
                  <span>{product.rating.toFixed(1)} average — reviews coming soon.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} subtotal={subtotal} />
    </div>
  );
};

export default ProductDetails;
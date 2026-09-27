// pages/Shop.tsx
// Product listing with category/brand/price filters, sort, search and a
// grid/list toggle. Reads an initial ?category= param from the URL (set by
// CategorySection links on the homepage) but all filtering happens client-side
// against the static catalog in data/products.ts.
//
// Note: the brief's spec also calls for storage/RAM filters. The current
// Product type models storageOptions as buyer-facing variant choices, not a
// single filterable spec per catalog row, so a real storage/RAM filter needs
// that data shape decided first — left out here rather than faked.

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import SearchOverlay from '../components/SearchOverlay';
import CartDrawer from '../components/CartDrawer';
import { products } from '../data/products';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import type { Product } from '../types/product';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const CATEGORIES: { id: Product['category']; label: string }[] = [
  { id: 'phone', label: 'Phones' },
  { id: 'laptop', label: 'Laptops' },
  { id: 'tablet', label: 'Tablets' },
  { id: 'audio', label: 'Audio' },
  { id: 'accessory', label: 'Accessories' },
];

const PRICE_MAX = Math.max(...products.map((p) => p.price));

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as Product['category'] | null;

  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { items, addItem, subtotal, count } = useCartContext();

  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Product['category'][]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortKey>('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), []);

  const toggleCategory = (cat: Product['category']) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMaxPrice(PRICE_MAX);
    setQuery('');
  };

  const activeFilterCount = selectedCategories.length + selectedBrands.length + (maxPrice < PRICE_MAX ? 1 : 0);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (query && !`${p.brand} ${p.name}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategories, selectedBrands, maxPrice, query, sort]);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm text-ink font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 text-sm text-muted hover:text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="accent-accent"
              />
              {cat.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm text-ink font-medium mb-3">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 text-sm text-muted hover:text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="accent-accent"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm text-ink font-medium mb-3">Max price</h3>
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          step={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-accent"
        />
        <p className="text-xs text-muted mt-2">Up to {formatCurrency(maxPrice)}</p>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-xs text-accent hover:underline">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Navbar onSearchClick={() => setSearchOpen(true)} onCartClick={() => setDrawerOpen(true)} cartCount={count} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="mb-10 max-w-lg">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink">All Products</h1>
            <p className="mt-3 text-muted">Explore our complete collection.</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 min-w-[180px] bg-surface border border-line rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink/40"
            />

            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-line text-sm text-ink"
            >
              <SlidersHorizontal size={15} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-surface border border-line rounded-full px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink/40"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Highest rated</option>
            </select>

            <div className="flex items-center border border-line rounded-full overflow-hidden">
              <button
                aria-label="Grid view"
                onClick={() => setView('grid')}
                className={`w-9 h-9 flex items-center justify-center ${view === 'grid' ? 'bg-surface2 text-ink' : 'text-muted'}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                aria-label="List view"
                onClick={() => setView('list')}
                className={`w-9 h-9 flex items-center justify-center ${view === 'list' ? 'bg-surface2 text-ink' : 'text-muted'}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr] gap-10">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">{FilterPanel}</aside>

            {/* Results */}
            <div>
              <p className="text-xs text-muted mb-5">{filtered.length} products</p>
              <ProductGrid
                products={filtered}
                view={view}
                onAddToCart={(product) => {
                  addItem(product);
                  setDrawerOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-[rgba(24,59,50,0.58)]" onClick={() => setFiltersOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-surface border-l border-line p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-ink">Filters</h2>
              <button aria-label="Close filters" onClick={() => setFiltersOpen(false)} className="text-muted hover:text-ink">
                <X size={20} />
              </button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} subtotal={subtotal} />
    </div>
  );
};

export default Shop;

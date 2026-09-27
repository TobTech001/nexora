# NEXORA — Premium 3D Tech E-Commerce

Scaffolded file structure for the Nexora frontend, matching the component architecture
in the project brief. All files are placeholders (TODO stubs) — no implementation yet.

## Structure

- `src/components/` — all reusable UI sections (Navbar, Hero, ProductCard, CartDrawer, etc.)
- `src/pages/` — route-level pages (Home, Shop, ProductDetails, Cart, Checkout, Wishlist, Account)
- `src/data/` — sample product/category data
- `src/types/` — shared TypeScript types
- `src/hooks/` — custom hooks (useCart, useScroll, useMousePosition)
- `src/utils/` — utilities (formatCurrency)

## Setup

```bash
npm install
npm run dev
```

## Next step

Build out `Home.tsx` end-to-end: Navbar → Hero (with SplineScene) → TrustBar →
FeaturedCollection → CategorySection → new arrivals grid → FeaturedProduct →
PromoBanner → BrandShowcase → WhyUs → Testimonials → Newsletter → Footer.

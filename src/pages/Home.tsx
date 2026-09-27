// pages/Home.tsx
// Reassembled per the redesign brief: cinematic video hero (trust line now
// lives inside Hero itself, so the old standalone TrustBar section is gone),
// followed by editorial product sections, dedicated phone/laptop spotlights,
// a campaign section, brand marquee, trust section, testimonials, newsletter.

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductShowcase from '../components/ProductShowcase';
import CategoryShowcase from '../components/CategoryShowcase';
import PhoneSection from '../components/PhoneSection';
import LaptopSection from '../components/LaptopSection';
import PromoSection from '../components/PromoSection';
import BrandMarquee from '../components/BrandMarquee';
import TrustSection from '../components/TrustSection';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import SearchOverlay from '../components/SearchOverlay';
import CartDrawer from '../components/CartDrawer';
import { useCartContext } from '../context/CartContext';

const Home = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, subtotal, count } = useCartContext();

  return (
    <div className="bg-bg min-h-screen">
      <Navbar
        onSearchClick={() => setSearchOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={count}
      />

      <Hero />
      <FeaturedProducts />
      <ProductShowcase />
      <CategoryShowcase />
      <PhoneSection />
      <LaptopSection />
      <PromoSection />
      <BrandMarquee />
      <TrustSection />
      <Testimonials />
      <Newsletter />
      <Footer />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={items} subtotal={subtotal} />
    </div>
  );
};

export default Home;
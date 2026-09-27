// components/Navbar.tsx
// Transparent over the hero video; condenses to rgba(5,5,5,0.75) + blur on scroll.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

const LINKS = ['Shop', 'Phones', 'Laptops', 'Accessories', 'Deals'];

interface NavbarProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount?: number;
}

const Navbar = ({ onSearchClick, onCartClick, cartCount = 0 }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-[20px]"
      style={{
        backgroundColor: 'rgba(232,240,231,0.9)',
        borderColor: 'rgba(40,82,71,0.14)',
      }}
    >
      <div className="max-w-content mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <a href="/" className="font-display font-extrabold text-xl tracking-tight text-ink inline-flex items-center gap-1.5">
          NEXORA
          <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden />
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {LINKS.map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase()}`}
              className={({ isActive }) =>
                `text-xs tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? 'text-gold' : 'text-muted hover:text-accent'
                }`
              }
            >
              {link}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            onClick={onSearchClick}
            className="text-ink/80 hover:text-ink transition-colors"
          >
            <Search size={19} strokeWidth={1.75} />
          </button>
          <a href="/wishlist" aria-label="Wishlist" className="hidden sm:block text-ink/80 hover:text-ink transition-colors">
            <Heart size={19} strokeWidth={1.75} />
          </a>
          <button
            aria-label={`Bag, ${cartCount} items`}
            onClick={onCartClick}
            className="relative text-ink/80 hover:text-ink transition-colors"
          >
            <ShoppingBag size={19} strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-[10px] leading-4 text-center text-ink">
                {cartCount}
              </span>
            )}
          </button>
          <a href="/account" aria-label="Account" className="hidden sm:block text-ink/80 hover:text-ink transition-colors">
            <User size={19} strokeWidth={1.75} />
          </a>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-ink/80 hover:text-ink transition-colors"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-bg z-50 flex flex-col px-6 py-8 lg:hidden">
          <div className="flex items-center justify-between mb-12">
            <span className="font-display font-extrabold text-xl">NEXORA</span>
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {LINKS.map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-display font-semibold text-ink"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;

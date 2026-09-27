// src/App.tsx
// Wraps the app in CartProvider (shared cart state), mounts the custom cursor,
// and wires React Router with a subtle AnimatePresence page transition.

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        {/* TODO: /wishlist, /account */}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <CustomCursor />
        <AnimatedRoutes />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
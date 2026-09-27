// hooks/useCart.ts
// SUPERSEDED by context/CartContext.tsx — the app now shares one cart instance
// via CartProvider/useCartContext so Navbar, CartDrawer, Cart and Checkout all
// see the same state. Kept here for reference / in case you prefer local state
// in an isolated feature; not imported anywhere in the app.

import { useCallback, useMemo, useState } from 'react';
import type { CartItem, Product } from '../types/product';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  return { items, addItem, removeItem, updateQuantity, subtotal, count: items.length };
};
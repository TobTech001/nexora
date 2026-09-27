// pages/Checkout.tsx
// Single-page checkout: contact + delivery + payment method, with a sticky
// order summary. No real payment gateway is wired in — see the TODO near
// handlePlaceOrder for where to integrate one (e.g. Paystack, Flutterwave).

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import SearchOverlay from '../components/SearchOverlay';
import CartDrawer from '../components/CartDrawer';

type PaymentMethod = 'card' | 'transfer' | 'delivery';

interface CheckoutForm {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

const EMPTY_FORM: CheckoutForm = {
  email: '',
  fullName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
};

const Checkout = () => {
  const { items, subtotal, count } = useCartContext();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal > 0 ? 5000 : 0;
  const total = subtotal + shipping;

  const updateField = (field: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: integrate a real payment gateway here, e.g.:
    //   const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ form, payment, items }) });
    // then redirect to the gateway's hosted page or handle the client SDK response.

    await new Promise((resolve) => setTimeout(resolve, 900)); // placeholder latency
    setSubmitting(false);
    navigate('/'); // TODO: replace with an order-confirmation page once one exists
  };

  if (items.length === 0) {
    return (
      <div className="bg-bg min-h-screen flex flex-col">
        <Navbar onSearchClick={() => setSearchOpen(true)} onCartClick={() => setDrawerOpen(true)} cartCount={0} />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
          <p className="text-muted mb-6">Your bag is empty — nothing to check out.</p>
          <a
            href="/shop"
            className="px-7 py-3.5 rounded-full bg-accent text-ink text-sm font-medium hover:bg-accentHover transition-colors duration-300"
          >
            Start shopping
          </a>
        </main>
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Navbar onSearchClick={() => setSearchOpen(true)} onCartClick={() => setDrawerOpen(true)} cartCount={count} />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-10">Checkout</h1>

          <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-10">
            {/* Form fields */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="font-display font-semibold text-ink mb-4">Contact</h2>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={form.email}
                  onChange={updateField('email')}
                  className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink/40"
                />
              </section>

              <section>
                <h2 className="font-display font-semibold text-ink mb-4">Delivery address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Full name"
                    value={form.fullName}
                    onChange={updateField('fullName')}
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink/40"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={updateField('phone')}
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink/40"
                  />
                  <input
                    required
                    placeholder="Delivery address"
                    value={form.address}
                    onChange={updateField('address')}
                    className="sm:col-span-2 w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink/40"
                  />
                  <input
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={updateField('city')}
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink/40"
                  />
                  <input
                    required
                    placeholder="State"
                    value={form.state}
                    onChange={updateField('state')}
                    className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink/40"
                  />
                </div>
              </section>

              <section>
                <h2 className="font-display font-semibold text-ink mb-4">Payment method</h2>
                <div className="space-y-3">
                  {([
                    { id: 'card', label: 'Card payment' },
                    { id: 'transfer', label: 'Bank transfer' },
                    { id: 'delivery', label: 'Pay on delivery' },
                  ] as { id: PaymentMethod; label: string }[]).map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 cursor-pointer transition-colors ${
                        payment === option.id ? 'border-accent' : 'border-line hover:border-ink/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={payment === option.id}
                        onChange={() => setPayment(option.id)}
                        className="accent-accent"
                      />
                      <span className="text-sm text-ink">{option.label}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Order summary */}
            <aside className="lg:col-span-1">
              <div className="border border-line rounded-2xl p-6 sticky top-28">
                <h2 className="font-display font-semibold text-ink mb-5">Order summary</h2>

                <div className="space-y-4 max-h-64 overflow-y-auto pr-1 mb-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg bg-surface2 shrink-0 overflow-hidden">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink truncate">{item.product.name}</p>
                        <p className="text-xs text-muted">Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm text-ink shrink-0">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-ink">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span className="text-ink">{formatCurrency(shipping)}</span>
                  </div>
                </div>

                <div className="border-t border-line mt-4 pt-4 flex justify-between">
                  <span className="text-ink font-medium">Total</span>
                  <span className="text-ink font-medium">{formatCurrency(total)}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 mt-6 px-6 py-3.5 rounded-full bg-gold text-bg text-sm font-medium hover:bg-goldHover transition-colors duration-300 disabled:opacity-60"
                >
                  <Lock size={14} />
                  {submitting ? 'Placing order…' : 'Place order'}
                </button>
              </div>
            </aside>
          </form>
        </div>
      </main>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} items={items} subtotal={subtotal} />
    </div>
  );
};

export default Checkout;
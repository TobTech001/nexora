// components/Newsletter.tsx
// Newsletter signup on a quiet stone background.

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to email service
  };

  return (
    <section className="relative bg-surface2 overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(230,94,67,0.1), transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-accent mb-3">A little note from Nexora</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">Good things, first.</h2>
        <p className="mt-3 text-muted max-w-md mx-auto">
          Get early access to new releases, exclusive offers and technology drops.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex max-w-sm mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            aria-label="Email address"
            className="flex-1 bg-surface border border-line rounded-l-full px-5 py-3 text-sm text-ink placeholder:text-slate focus:outline-none focus:border-accent/50"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-3 rounded-r-full bg-ink text-bg text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors duration-300"
          >
            Join
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;

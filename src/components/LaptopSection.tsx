// components/LaptopSection.tsx
// Single-product laptop spotlight with soft botanical accents.

const LaptopSection = () => {
  return (
    <section className="relative py-32 overflow-hidden border-t border-line bg-surface">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(85,123,118,0.12), transparent 50%), radial-gradient(circle at 80% 70%, rgba(217,166,90,0.1), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent mb-3">02 / Laptops</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink leading-[0.98]">
            Built
            <br />
            to
            <br />
            create.
          </h2>
          <p className="mt-6 text-muted max-w-sm">Professional performance. Remarkable portability.</p>
          <a
            href="/shop?category=laptop"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-ink text-bg text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors duration-300"
          >
            Explore laptops →
          </a>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl border border-line bg-surface2 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 blur-3xl"
            style={{ background: 'radial-gradient(circle at 50% 45%, rgba(85,123,118,0.18), transparent 65%)' }}
          />
          <img
            src="/images/products/macbook-pro-m5-hero.svg"
            alt="MacBook Pro"
            className="relative w-full h-full object-contain p-10"
          />
        </div>
      </div>
    </section>
  );
};

export default LaptopSection;

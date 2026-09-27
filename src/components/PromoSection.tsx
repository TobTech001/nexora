// components/PromoSection.tsx
// Full-width campaign panel with a bold, warm accent.

const PromoSection = () => {
  return (
    <section className="relative py-32 overflow-hidden border-t border-line bg-surface2 text-center">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 120%, rgba(230,94,67,0.12), transparent 60%)',
        }}
      />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10">
        <div className="inline-block px-10 py-14 sm:px-20 rounded-[2rem] border border-line bg-surface shadow-[0_24px_80px_-50px_rgba(40,82,71,0.3)]">
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent mb-5">The Nexora edit</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-ink leading-[0.98]">
            Upgrade
            <br />
            your setup.
          </h2>
          <p className="mt-6 text-muted">Premium technology. Better experiences.</p>
          <a
            href="/shop?filter=offers"
            className="inline-flex items-center gap-2 mt-9 px-7 py-3.5 rounded-full bg-accent text-ink text-xs uppercase tracking-widest font-medium hover:bg-accentHover transition-colors duration-300"
          >
            Shop the collection →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;

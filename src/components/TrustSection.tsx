// components/TrustSection.tsx
// Typography-and-borders feature section (no colorful icon cards).

const POINTS = [
  { n: '01', title: 'Authentic products', body: 'Only genuine products from trusted sources.' },
  { n: '02', title: 'Fast delivery', body: 'Reliable delivery across Nigeria.' },
  { n: '03', title: 'Secure checkout', body: 'Safe and protected payments.' },
  { n: '04', title: 'Real support', body: 'Human support before and after your purchase.' },
];

const TrustSection = () => {
  return (
    <section className="bg-surface">
      <div className="max-w-content mx-auto px-6 lg:px-10 py-28">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-ink leading-[0.98] max-w-lg mb-16">
          Built
          <br />
          around
          <br />
          trust.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {POINTS.map((p) => (
            <div key={p.n} className="border-t border-line pt-6">
          <span className="text-sm text-accent font-display">{p.n}</span>
              <h3 className="font-display font-semibold text-muted mt-3">{p.title}</h3>
              <p className="text-sm text-slate mt-2 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

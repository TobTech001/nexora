// components/BrandMarquee.tsx
// Slow horizontal marquee of brand wordmarks; pauses on hover. Duplicates the
// list once so the loop is seamless (see the `marquee` keyframe in
// tailwind.config.js, which translates by -50%).

const BRANDS = ['Apple', 'Samsung', 'Google', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Sony'];

const BrandMarquee = () => {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="bg-bg overflow-hidden group" style={{ borderTop: '1px solid rgba(40,82,71,0.16)', borderBottom: '1px solid rgba(40,82,71,0.16)' }}>
      <p className="pt-8 text-center text-[10px] tracking-[0.2em] uppercase text-slate">A few of the names we love</p>
      <div className="flex gap-16 py-8 animate-marquee group-hover:[animation-play-state:paused] w-max">
        {doubled.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="font-display font-semibold text-lg text-muted hover:text-gold transition-colors duration-300 whitespace-nowrap"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;

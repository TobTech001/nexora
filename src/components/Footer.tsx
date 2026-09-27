// components/Footer.tsx
// Darkest navy tone (footer token, #070d20), gold logo accent, silver headings,
// slate links with violet hover, subtle indigo gradient along the top edge.

import { Instagram, Facebook, Twitter, Music2 } from 'lucide-react';

const COLUMNS = [
  { title: 'Shop', links: ['Phones', 'Laptops', 'Tablets', 'Accessories', 'Deals'] },
  { title: 'Company', links: ['About', 'Contact', 'Stores', 'Careers'] },
  { title: 'Support', links: ['Help center', 'Delivery', 'Returns', 'Warranty'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
];

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'X', href: '#' },
  { icon: Music2, label: 'TikTok', href: '#' },
];

const Footer = () => {
  return (
    <footer className="relative bg-footer">
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(232,240,231,0.24), transparent)' }}
      />
      <div className="max-w-content mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1">
            <span className="font-display font-extrabold text-xl text-ink inline-flex items-center gap-1.5">
              NEXORA
              <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden />
            </span>
            <p className="mt-3 text-sm text-slate">Technology without compromise.</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm text-muted font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate hover:text-accent transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate">© 2026 Nexora. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="text-slate hover:text-accent transition-colors">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

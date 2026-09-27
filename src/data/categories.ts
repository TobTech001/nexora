// data/categories.ts

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export const categories: Category[] = [
  {
    id: 'phone',
    name: 'Phone',
    description: 'Flagship smartphones from the brands that define the category.',
    image: '/categories/phone.svg',
    href: '/shop?category=phone',
  },
  {
    id: 'laptop',
    name: 'Laptop',
    description: 'Performance and portability, without the trade-off.',
    image: '/categories/laptop.svg',
    href: '/shop?category=laptop',
  },
  {
    id: 'tablet',
    name: 'Tablet',
    description: 'Canvas-sized screens for work that moves with you.',
    image: '/categories/tablet.svg',
    href: '/shop?category=tablet',
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Sound engineered for the way you actually listen.',
    image: '/categories/audio.svg',
    href: '/shop?category=audio',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'The details that complete your setup.',
    image: '/categories/accessories.svg',
    href: '/shop?category=accessories',
  },
];
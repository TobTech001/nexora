// types/product.ts

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: 'phone' | 'laptop' | 'tablet' | 'audio' | 'accessory';
  price: number;
  previousPrice?: number;
  rating: number;
  image: string;
  images?: string[]; // optional gallery; ProductDetails falls back to [image] when absent
  specs?: string;
  description?: string;
  colors?: string[];
  storageOptions?: string[];
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}
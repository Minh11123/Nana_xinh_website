export interface FlowerProduct {
  id: string;
  name: string;
  subtitle: string;
  vietnameseTitle: string;
  category: 'birthday' | 'grand_opening' | 'graduation' | 'custom' | 'anniversary' | 'romantic' | 'all';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  tags: string[];
  description: string;
  meaning: string;
  careInstructions: string[];
  flowerTypes: string[];
  colorTheme: string;
  isSignature?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface OccasionCategory {
  id: 'birthday' | 'grand_opening' | 'graduation' | 'custom' | 'anniversary' | 'romantic';
  title: string;
  vietnameseTitle: string;
  subtitle: string;
  image: string;
  badge?: string;
  flowerCount: number;
}

export interface GreetingCard {
  to: string;
  from: string;
  message: string;
  theme: 'vintage-rose' | 'minimal-ivory' | 'pastel-blush' | 'botanical-gold';
  occasion: string;
}

export interface CartItem {
  id: string; // unique item uuid in cart
  product: FlowerProduct;
  quantity: number;
  size: 'standard' | 'deluxe' | 'grandeur';
  sizeMultiplier: number;
  card?: GreetingCard;
  includeVase: boolean;
  vasePrice: number;
  deliveryDate: string;
  deliveryTimeSlot: string;
  specialNotes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
  images?: string[];
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  deliveryDistrict: string;
  deliveryCity: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  paymentMethod: 'momo' | 'vnpay' | 'zalopay' | 'bank_transfer' | 'cod';
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  voucherCode?: string;
  cardMessage?: string;
}

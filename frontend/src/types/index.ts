// User types
export interface User {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  isVerified: boolean;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// Food types
export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  ingredients: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "DELIVERED"
    | "CANCELLED";
  deliveryAddress: string;
  deliveryInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

// Component props types
export interface NavProps {
  cartCount: number;
}

export interface CardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  ingredients?: string[];
  onAddToCart?: (item: Omit<CartItem, "quantity">) => void;
}

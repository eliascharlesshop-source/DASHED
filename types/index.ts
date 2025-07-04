// Common types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  company?: string;
  location?: string;
  website?: string;
  onboardingComplete: boolean;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
  };
}

// Device types
export interface Device {
  id: string;
  userId: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet' | 'iot';
  status: 'online' | 'offline' | 'maintenance';
  configuration: Record<string, any>;
  solanaAddress?: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features: string[];
  specifications: Record<string, any>;
  inStock: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Support types
export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

// Job types
export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  requirements: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  resume: string;
  status: 'submitted' | 'reviewed' | 'interview' | 'offer' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Dashboard types
export interface DashboardMetrics {
  devices: {
    total: number;
    online: number;
    offline: number;
  };
  performance: {
    cpuUsage: number;
    memoryUsage: number;
    networkUsage: number;
    storageUsage: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
  };
  revenue: {
    total: number;
    monthly: number;
    growth: number;
  };
}

// Blockchain types
export interface SolanaTransaction {
  id: string;
  userId: string;
  deviceId?: string;
  signature: string;
  type: 'device_registration' | 'ownership_transfer' | 'payment';
  amount?: number;
  status: 'pending' | 'confirmed' | 'failed';
  blockHeight?: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletConnection {
  id: string;
  userId: string;
  address: string;
  provider: string;
  isConnected: boolean;
  createdAt: string;
  updatedAt: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Validation schemas
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

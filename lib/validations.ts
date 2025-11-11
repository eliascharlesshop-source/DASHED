import { z } from 'zod'

// User validation schemas
export const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500, 'Bio is too long').optional(),
  company: z.string().max(100, 'Company name is too long').optional(),
  location: z.string().max(100, 'Location is too long').optional(),
  website: z.string().url('Invalid URL').optional(),
  preferences: z.object({
    notifications: z.boolean(),
    emailUpdates: z.boolean(),
    darkMode: z.boolean(),
  }).optional(),
})

export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
})

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Device validation schemas
export const deviceSchema = z.object({
  name: z.string().min(1, 'Device name is required').max(100, 'Device name is too long'),
  type: z.enum(['desktop', 'mobile', 'tablet', 'iot']),
  configuration: z.object({}).catchall(z.unknown()).optional(),
  solanaAddress: z.string().optional(),
})

export const deviceUpdateSchema = deviceSchema.partial()

// Product validation schemas
export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Product name is too long'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description is too long'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  features: z.array(z.string()).optional(),
  specifications: z.object({}).catchall(z.unknown()).optional(),
  inStock: z.boolean().optional(),
})

export const productUpdateSchema = productSchema.partial()

// Cart validation schemas
export const cartItemSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().min(1, 'Quantity must be at least 1').max(100, 'Quantity is too large'),
})

export const cartUpdateSchema = z.object({
  items: z.array(cartItemSchema),
})

// Order validation schemas
export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required').max(200, 'Street address is too long'),
  city: z.string().min(1, 'City is required').max(100, 'City is too long'),
  state: z.string().min(1, 'State is required').max(100, 'State is too long'),
  zipCode: z.string().min(1, 'ZIP code is required').max(20, 'ZIP code is too long'),
  country: z.string().min(1, 'Country is required').max(100, 'Country is too long'),
})

export const orderSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'Order must contain at least one item'),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  paymentMethod: z.string().min(1, 'Payment method is required'),
})

// Support validation schemas
export const supportTicketSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(1, 'Message is required').max(5000, 'Message is too long'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
})

export const supportTicketUpdateSchema = z.object({
  status: z.enum(['open', 'in-progress', 'resolved', 'closed']).optional(),
  assignedTo: z.string().uuid('Invalid user ID').optional(),
})

// Job validation schemas
export const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required').max(200, 'Job title is too long'),
  description: z.string().min(1, 'Description is required').max(5000, 'Description is too long'),
  department: z.string().min(1, 'Department is required').max(100, 'Department is too long'),
  location: z.string().min(1, 'Location is required').max(100, 'Location is too long'),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salary: z.object({
    min: z.number().min(0, 'Minimum salary must be positive'),
    max: z.number().min(0, 'Maximum salary must be positive'),
    currency: z.string().min(1, 'Currency is required'),
  }).optional(),
  isActive: z.boolean().optional(),
})

export const jobUpdateSchema = jobSchema.partial()

export const jobApplicationSchema = z.object({
  jobId: z.string().uuid('Invalid job ID'),
  coverLetter: z.string().min(1, 'Cover letter is required').max(5000, 'Cover letter is too long'),
  resume: z.string().min(1, 'Resume is required'), // This would be a file URL
})

// Notification validation schemas
export const notificationSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  type: z.enum(['info', 'warning', 'error', 'success']),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
})

// Blockchain validation schemas
export const solanaTransactionSchema = z.object({
  signature: z.string().min(1, 'Transaction signature is required'),
  type: z.enum(['device_registration', 'ownership_transfer', 'payment']),
  deviceId: z.string().uuid('Invalid device ID').optional(),
  amount: z.number().min(0, 'Amount must be positive').optional(),
})

export const walletConnectionSchema = z.object({
  address: z.string().min(1, 'Wallet address is required'),
  provider: z.string().min(1, 'Provider is required'),
})

// Query parameter validation schemas
export const paginationSchema = z.object({
  page: z.coerce.number().min(1, 'Page must be at least 1').default(1),
  limit: z.coerce.number().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export const searchSchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  category: z.string().optional(),
  minPrice: z.coerce.number().min(0, 'Minimum price must be positive').optional(),
  maxPrice: z.coerce.number().min(0, 'Maximum price must be positive').optional(),
  inStock: z.coerce.boolean().optional(),
})

export const filterSchema = z.object({
  status: z.string().optional(),
  category: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  userId: z.string().uuid().optional(),
})

// File upload validation schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().optional(),
  allowedTypes: z.array(z.string()).optional(),
})

// ID validation schemas
export const idSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
})

export const multipleIdsSchema = z.object({
  ids: z.array(z.string().uuid('Invalid ID format')).min(1, 'At least one ID is required'),
})

// Utility functions for validation
export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}

export function validateQuery<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}

export function validateParams<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}

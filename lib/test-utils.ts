// Mock Supabase client
export const mockSupabase = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(() => ({ data: null, error: null })),
        range: jest.fn(() => ({ data: [], error: null, count: 0 })),
        order: jest.fn(() => ({ data: [], error: null, count: 0 }))
      })),
      in: jest.fn(() => ({
        data: [],
        error: null
      })),
      range: jest.fn(() => ({
        data: [],
        error: null,
        count: 0
      })),
      order: jest.fn(() => ({
        data: [],
        error: null,
        count: 0
      }))
    })),
    insert: jest.fn(() => ({
      select: jest.fn(() => ({
        single: jest.fn(() => ({ data: null, error: null }))
      }))
    })),
    update: jest.fn(() => ({
      eq: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({ data: null, error: null }))
        }))
      }))
    })),
    delete: jest.fn(() => ({
      eq: jest.fn(() => ({ error: null }))
    }))
  })),
  auth: {
    getUser: jest.fn(() => ({ data: { user: null }, error: null })),
    signUp: jest.fn(() => ({ data: { user: null }, error: null })),
    signInWithPassword: jest.fn(() => ({ data: { user: null }, error: null })),
    signOut: jest.fn(() => ({ error: null }))
  },
  storage: {
    from: jest.fn(() => ({
      upload: jest.fn(() => ({ data: null, error: null })),
      getPublicUrl: jest.fn(() => ({ data: { publicUrl: 'test-url' } }))
    }))
  },
  channel: jest.fn(() => ({
    send: jest.fn(() => ({}))
  }))
}

// Mock environment variables
export const mockEnv = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
  JWT_SECRET: 'test-jwt-secret',
  NODE_ENV: 'test'
}

// Mock user data
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user'
}

export const mockAdminUser = {
  id: 'admin-user-id',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin'
}

// Mock device data
export const mockDevice = {
  id: 'test-device-id',
  user_id: 'test-user-id',
  name: 'Test Device',
  type: 'laptop',
  status: 'online',
  configuration: {},
  last_seen: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Mock product data
export const mockProduct = {
  id: 'test-product-id',
  name: 'Test Product',
  description: 'Test product description',
  price: 99.99,
  category: 'hardware',
  images: ['test-image.jpg'],
  features: ['Feature 1', 'Feature 2'],
  specifications: { spec1: 'value1' },
  in_stock: true,
  rating: 4.5,
  reviews: 10,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Mock order data
export const mockOrder = {
  id: 'test-order-id',
  user_id: 'test-user-id',
  items: [
    {
      product_id: 'test-product-id',
      quantity: 1,
      price: 99.99
    }
  ],
  total: 99.99,
  status: 'pending',
  shipping_address: {
    street: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    zip: '12345',
    country: 'Test Country'
  },
  billing_address: {
    street: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    zip: '12345',
    country: 'Test Country'
  },
  payment_method: 'credit_card',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Mock notification data
export const mockNotification = {
  id: 'test-notification-id',
  user_id: 'test-user-id',
  type: 'info',
  title: 'Test Notification',
  message: 'Test notification message',
  read: false,
  created_at: new Date().toISOString()
}

// Mock support ticket data
export const mockSupportTicket = {
  id: 'test-ticket-id',
  user_id: 'test-user-id',
  subject: 'Test Support Ticket',
  message: 'Test support ticket message',
  category: 'technical',
  priority: 'medium',
  status: 'open',
  assigned_to: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Helper functions for tests
export function createMockRequest(
  method: string = 'GET',
  url: string = 'http://localhost:3000/api/test',
  body?: any,
  headers: Record<string, string> = {}
): Request {
  return new Request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })
}

export function createMockNextRequest(
  method: string = 'GET',
  url: string = 'http://localhost:3000/api/test',
  body?: any,
  headers: Record<string, string> = {}
): any {
  return {
    method,
    url,
    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers
    }),
    json: async () => body || {},
    text: async () => body ? JSON.stringify(body) : ''
  }
}

// Test utilities
export async function expectApiResponse(
  response: Response,
  expectedStatus: number,
  expectedSuccess: boolean = true
) {
  expect(response.status).toBe(expectedStatus)
  
  const data = await response.json()
  expect(data.success).toBe(expectedSuccess)
  
  return data
}

export function setupMockAuth(user = mockUser) {
  (mockSupabase.auth.getUser as any).mockResolvedValue({
    data: { user },
    error: null
  })
}

export function setupMockAuthError(error = 'Authentication failed') {
  (mockSupabase.auth.getUser as any).mockResolvedValue({
    data: { user: null },
    error: { message: error }
  })
}

export function resetMocks() {
  jest.clearAllMocks()
}

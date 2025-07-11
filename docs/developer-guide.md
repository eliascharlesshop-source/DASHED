# DASHED OS Developer Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database
- Supabase account
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/dashed_os
   DIRECT_URL=postgresql://username:password@localhost:5432/dashed_os
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   
   # Authentication
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Optional: Solana (for blockchain features)
   SOLANA_RPC_URL=https://api.devnet.solana.com
   SOLANA_PRIVATE_KEY=your-wallet-private-key
   ```

4. **Database setup**
   ```bash
   # Run Supabase migrations (if using Supabase)
   npx supabase db push
   
   # Or setup PostgreSQL manually
   createdb dashed_os
   psql dashed_os < schema.sql
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
app/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── (app)/             # Main application routes
│   ├── (marketing)/       # Marketing pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── validations.ts    # Zod schemas
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── docs/                 # Documentation
```

## Architecture Overview

### Frontend Architecture
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **React Hook Form**: Form handling with validation

### Backend Architecture
- **API Routes**: Next.js serverless functions
- **Supabase**: PostgreSQL database with real-time features
- **Authentication**: Supabase Auth with JWT tokens
- **Validation**: Zod schemas for type-safe validation
- **Rate Limiting**: Built-in request throttling

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Devices table
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'offline',
  configuration JSONB DEFAULT '{}',
  last_seen TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  images TEXT[],
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  billing_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Development Workflow

### 1. Creating New Features

**Frontend Components:**
```bash
# Create a new component
mkdir components/feature-name
touch components/feature-name/feature-component.tsx
```

**API Endpoints:**
```bash
# Create new API route
mkdir app/api/feature-name
touch app/api/feature-name/route.ts
```

**Database Tables:**
```bash
# Create migration (if using migrations)
npx supabase migration new add_feature_table
```

### 2. Code Style Guidelines

**TypeScript:**
- Use strict type checking
- Define interfaces for all data structures
- Use Zod for runtime validation

**React Components:**
- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for prop definitions

**API Routes:**
- Follow REST conventions
- Use consistent error handling
- Implement proper validation

**Example Component:**
```typescript
interface FeatureComponentProps {
  data: FeatureData
  onUpdate: (data: FeatureData) => void
}

export function FeatureComponent({ data, onUpdate }: FeatureComponentProps) {
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (values: FeatureData) => {
    setLoading(true)
    try {
      await updateFeature(values)
      onUpdate(values)
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

**Example API Route:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { featureSchema } from '@/lib/validations'
import { ApiResponse } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await request.json()
    
    // Validate input
    const validatedData = featureSchema.parse(body)
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return ApiResponse.unauthorized('Authentication required')
    }
    
    // Database operation
    const { data, error } = await supabase
      .from('features')
      .insert(validatedData)
      .select()
      .single()
    
    if (error) {
      return ApiResponse.error('Failed to create feature', 500)
    }
    
    return ApiResponse.success(data, 'Feature created successfully', 201)
  } catch (error) {
    return ApiResponse.error('Invalid request data', 400)
  }
}
```

### 3. Testing

**Unit Tests:**
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

**Test Structure:**
```typescript
import { describe, it, expect, beforeEach } from '@jest/globals'
import { createMockUser, createMockDevice } from '@/lib/test-utils'
import { validateDevice } from '@/lib/validations'

describe('Device Validation', () => {
  it('should validate a valid device', () => {
    const device = createMockDevice()
    const result = validateDevice(device)
    expect(result.success).toBe(true)
  })
  
  it('should reject invalid device type', () => {
    const device = createMockDevice({ type: 'invalid' })
    const result = validateDevice(device)
    expect(result.success).toBe(false)
  })
})
```

**API Testing:**
```typescript
import { POST } from '@/app/api/devices/route'
import { createMockRequest } from '@/lib/test-utils'

describe('/api/devices', () => {
  it('should create a device', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: { name: 'Test Device', type: 'laptop' }
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
  })
})
```

### 4. Database Operations

**Using Supabase Client:**
```typescript
import { createServerClient } from '@/lib/supabase'

// Get data
const { data: users, error } = await supabase
  .from('users')
  .select('*')
  .eq('role', 'admin')

// Insert data
const { data: newUser, error } = await supabase
  .from('users')
  .insert({ email, name, role })
  .select()
  .single()

// Update data
const { data: updatedUser, error } = await supabase
  .from('users')
  .update({ name: 'New Name' })
  .eq('id', userId)
  .select()
  .single()

// Delete data
const { error } = await supabase
  .from('users')
  .delete()
  .eq('id', userId)
```

**Real-time Subscriptions:**
```typescript
// Subscribe to changes
const subscription = supabase
  .channel('devices')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'devices'
  }, (payload) => {
    console.log('Device changed:', payload)
  })
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## Deployment

### Vercel Deployment

1. **Connect GitHub repository**
   - Link your repository to Vercel
   - Configure automatic deployments

2. **Environment variables**
   - Add all required environment variables in Vercel dashboard
   - Use production values for database URLs and API keys

3. **Build configuration**
   ```json
   {
     "buildCommand": "pnpm build",
     "devCommand": "pnpm dev",
     "installCommand": "pnpm install"
   }
   ```

### Database Migration

```bash
# Production migration (Supabase)
npx supabase db push --project-ref your-project-ref

# Manual PostgreSQL migration
psql $DATABASE_URL -f migrations/001_initial.sql
```

### CI/CD Pipeline

The project includes GitHub Actions for:
- **Code quality**: ESLint, TypeScript checking
- **Testing**: Unit and integration tests
- **Security**: Dependency scanning, code analysis
- **Deployment**: Automatic deployment to Vercel

## Common Development Tasks

### Adding a New Page

1. Create the page component:
   ```typescript
   // app/(app)/new-feature/page.tsx
   export default function NewFeaturePage() {
     return <div>New Feature</div>
   }
   ```

2. Add navigation (if needed):
   ```typescript
   // components/app-sidebar.tsx
   const sidebarItems = [
     // ... existing items
     {
       title: "New Feature",
       href: "/new-feature",
       icon: IconName
     }
   ]
   ```

### Adding a New API Endpoint

1. Create the route file:
   ```typescript
   // app/api/new-endpoint/route.ts
   import { NextRequest } from 'next/server'
   import { ApiResponse } from '@/lib/api-utils'
   
   export async function GET(request: NextRequest) {
     return ApiResponse.success({ message: 'Hello World' })
   }
   ```

2. Add validation schema:
   ```typescript
   // lib/validations.ts
   export const newEndpointSchema = z.object({
     name: z.string().min(1),
     value: z.number()
   })
   ```

3. Add tests:
   ```typescript
   // __tests__/api/new-endpoint.test.ts
   import { GET } from '@/app/api/new-endpoint/route'
   
   describe('/api/new-endpoint', () => {
     it('should return success', async () => {
       const response = await GET(new Request('http://localhost'))
       expect(response.status).toBe(200)
     })
   })
   ```

### Adding a Database Table

1. Create migration:
   ```sql
   -- migrations/add_new_table.sql
   CREATE TABLE new_table (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. Add TypeScript types:
   ```typescript
   // types/index.ts
   export interface NewTable {
     id: string
     name: string
     created_at: string
   }
   ```

3. Add validation:
   ```typescript
   // lib/validations.ts
   export const newTableSchema = z.object({
     name: z.string().min(1)
   })
   ```

## Troubleshooting

### Common Issues

**1. Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**2. Database Connection Issues**
- Verify environment variables
- Check database URL format
- Ensure database is running and accessible

**3. Authentication Problems**
- Verify Supabase configuration
- Check JWT secret and keys
- Ensure proper CORS settings

**4. Type Errors**
```bash
# Regenerate database types
npx supabase gen types typescript --project-id your-project > types/supabase.ts
```

### Debug Mode

Enable debug logging:
```env
# .env.local
LOG_LEVEL=debug
NODE_ENV=development
```

### Performance Monitoring

Use built-in monitoring:
```typescript
// lib/logger.ts
logger.performance('API Request', {
  endpoint: '/api/users',
  duration: 150,
  userId: 'user-id'
})
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and add tests
4. Run the test suite: `pnpm test`
5. Commit changes: `git commit -m "Add new feature"`
6. Push to branch: `git push origin feature/new-feature`
7. Create a pull request

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Security considerations are addressed
- [ ] Performance implications are considered

---

# Patch 1 Admin Enhancement - Developer Guide

## Admin Component Architecture

### Component Hierarchy

```
AdminLayout
├── AdminSidebar
├── AdminHeader
│   ├── AdminBreadcrumbs
│   └── AdminUserMenu
└── AdminContent
    ├── AdminDashboard
    │   ├── StatsCards
    │   ├── ChartsSection
    │   └── ActivityFeed
    ├── OrderManagement
    │   ├── OrderFilters
    │   ├── OrderTable
    │   ├── BulkActions
    │   └── OrderModal
    ├── CategoryManagement
    │   ├── CategoryTree
    │   ├── CategoryForm
    │   └── CategoryAssignments
    ├── TicketManagement
    │   ├── TicketList
    │   ├── TicketFilters
    │   ├── TicketModal
    │   └── ResponseForm
    └── LicenseManagement
        ├── LicenseList
        ├── LicenseForm
        ├── AssignmentForm
        └── UsageAnalytics
```

### Admin API Route Structure

```
/api/admin/
├── categories/
│   ├── route.ts                    # GET, POST, PATCH
│   └── [id]/
│       └── route.ts                # GET, PUT, DELETE
├── orders/
│   ├── route.ts                    # GET, PATCH
│   ├── [id]/
│   │   └── route.ts                # GET, PUT
│   └── export/
│       └── route.ts                # GET
├── support-tickets/
│   ├── route.ts                    # GET, PATCH
│   ├── [id]/
│   │   └── route.ts                # GET, PUT, POST
│   └── export/
│       └── route.ts                # GET
├── licenses/
│   ├── route.ts                    # GET, POST
│   └── [id]/
│       └── route.ts                # GET, PUT, DELETE
├── user-licenses/
│   ├── route.ts                    # GET, POST, PATCH
│   ├── [id]/
│   │   └── route.ts                # GET, PUT
│   └── export/
│       └── route.ts                # GET
├── users/
│   ├── route.ts                    # GET, PATCH
│   └── [id]/
│       └── route.ts                # GET, PUT
├── product-categories/
│   └── assignments/
│       └── route.ts                # GET, POST, PATCH
└── stats/
    └── route.ts                    # GET
```

## Database Schema Enhancements

### New Tables Added in Patch 1

```sql
-- Product Categories (Hierarchical)
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Software Licenses
CREATE TABLE software_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  license_key VARCHAR(255) UNIQUE NOT NULL,
  max_users INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User License Assignments
CREATE TABLE user_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  license_id UUID NOT NULL REFERENCES software_licenses(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, license_id)
);

-- Support Tickets
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category VARCHAR(100),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Support Ticket Responses
CREATE TABLE support_ticket_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Status History
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  old_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Product Category Assignments
CREATE TABLE product_category_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES product_categories(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(product_id, category_id)
);

-- Admin Action Logs
CREATE TABLE admin_action_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  details JSONB,
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Performance Indexes

```sql
-- Indexes for optimal admin query performance
CREATE INDEX idx_product_categories_parent_id ON product_categories(parent_id);
CREATE INDEX idx_product_categories_active_featured ON product_categories(is_active, is_featured);
CREATE INDEX idx_user_licenses_user_active ON user_licenses(user_id, is_active);
CREATE INDEX idx_user_licenses_license_active ON user_licenses(license_id, is_active);
CREATE INDEX idx_support_tickets_status_priority ON support_tickets(status, priority);
CREATE INDEX idx_support_tickets_assigned_status ON support_tickets(assigned_to, status);
CREATE INDEX idx_order_status_history_order_changed ON order_status_history(order_id, changed_at);
CREATE INDEX idx_admin_action_logs_admin_performed ON admin_action_logs(admin_user_id, performed_at);
```

## TypeScript Type Definitions

### Core Admin Types

```typescript
// Enhanced type definitions for admin features
interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  children?: ProductCategory[];
  _count?: {
    products: number;
    children: number;
  };
}

interface SoftwareLicense {
  id: string;
  name: string;
  description?: string;
  licenseKey: string;
  maxUsers: number;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    assignments: number;
  };
}

interface UserLicense {
  id: string;
  userId: string;
  licenseId: string;
  assignedAt: string;
  expiresAt?: string;
  isActive: boolean;
  user: {
    id: string;
    email: string;
    fullName?: string;
  };
  license: SoftwareLicense;
}

interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  assignedTo?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    fullName?: string;
  };
  assignedAdmin?: {
    id: string;
    email: string;
    fullName?: string;
  };
  responses?: TicketResponse[];
}

interface TicketResponse {
  id: string;
  ticketId: string;
  authorId: string;
  message: string;
  isInternal: boolean;
  createdAt: string;
  author: {
    id: string;
    email: string;
    fullName?: string;
  };
}

interface AdminStats {
  orders: {
    total: number;
    pending: number;
    completed: number;
    last30Days: number;
  };
  tickets: {
    total: number;
    open: number;
    inProgress: number;
    last7Days: number;
  };
  users: {
    total: number;
    active: number;
    newLast30Days: number;
  };
  licenses: {
    total: number;
    active: number;
    expiring: number;
  };
  products: {
    total: number;
    active: number;
    categories: number;
  };
}
```

## Custom Hooks for Admin Features

### Data Fetching Hooks

```typescript
// Admin-specific custom hooks
export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  });
}

export function useAdminOrders(filters: OrderFilters) {
  return useQuery({
    queryKey: ['admin', 'orders', filters],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      });
      
      const response = await fetch(`/api/admin/orders?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    },
    keepPreviousData: true,
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Order> }) => {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to update order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
    },
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: async () => {
      const response = await fetch('/api/admin/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
  });
}

export function useSupportTickets(filters: TicketFilters) {
  return useQuery({
    queryKey: ['admin', 'tickets', filters],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.assignedTo && { assignedTo: filters.assignedTo }),
      });
      
      const response = await fetch(`/api/admin/support-tickets?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch tickets');
      return response.json();
    },
    keepPreviousData: true,
  });
}
```

## Testing Strategy for Admin Features

### Component Testing

```typescript
// Example: Testing AdminDashboard component
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('AdminDashboard', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should display admin statistics', async () => {
    const mockStats = {
      orders: { total: 100, pending: 10, completed: 80, last30Days: 25 },
      tickets: { total: 50, open: 5, inProgress: 3, last7Days: 8 },
      users: { total: 200, active: 180, newLast30Days: 15 },
      licenses: { total: 10, active: 8, expiring: 2 },
      products: { total: 150, active: 140, categories: 20 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    render(<AdminDashboard />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument(); // Total orders
      expect(screen.getByText('50')).toBeInTheDocument(); // Total tickets
    });
  });
});
```

### API Route Testing

```typescript
// Example: Testing admin categories API
import { GET, POST } from '@/app/api/admin/categories/route';
import { createMocks } from 'node-mocks-http';

// Mock Supabase
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createServerComponentClient: () => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'admin-user-id' } },
      }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    single: jest.fn(),
  }),
}));

// Mock admin validation
jest.mock('@/lib/api-utils', () => ({
  validateAdminUser: jest.fn().mockResolvedValue({ isValid: true }),
}));

describe('/api/admin/categories', () => {
  it('should return categories for admin user', async () => {
    const { req } = createMocks({ method: 'GET' });
    
    const response = await GET(req as any);
    expect(response.status).toBe(200);
  });

  it('should create new category', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Category',
        description: 'Test description',
      }),
    });
    
    const response = await POST(req as any);
    expect(response.status).toBe(201);
  });
});
```

## Performance Optimization Guidelines

### Database Query Optimization

```typescript
// Optimized admin queries with proper joins and indexes
export async function getAdminOrdersOptimized(filters: OrderFilters) {
  const supabase = createServerComponentClient({ cookies });
  
  let query = supabase
    .from('orders')
    .select(`
      id,
      status,
      totalAmount,
      createdAt,
      updatedAt,
      user:users!userId(id, email, fullName),
      items:order_items(
        id,
        quantity,
        price,
        product:products(name, slug)
      )
    `, { count: 'exact' });

  // Apply filters efficiently
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  
  if (filters.startDate) {
    query = query.gte('createdAt', filters.startDate);
  }
  
  if (filters.endDate) {
    query = query.lte('createdAt', filters.endDate);
  }

  // Pagination
  const offset = (filters.page - 1) * filters.limit;
  query = query
    .range(offset, offset + filters.limit - 1)
    .order('createdAt', { ascending: false });

  return query;
}
```

### Frontend Performance

```typescript
// Memoization for expensive computations
const MemoizedCategoryTree = memo(({ categories }: { categories: ProductCategory[] }) => {
  const treeData = useMemo(() => {
    return buildCategoryTree(categories);
  }, [categories]);

  return <CategoryTreeComponent data={treeData} />;
});

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

function VirtualizedOrderList({ orders }: { orders: Order[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <OrderRow order={orders[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={orders.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

## Security Considerations

### Admin Authentication & Authorization

```typescript
// Enhanced admin validation middleware
export async function validateAdminUser(userId: string) {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, role, isActive, lastLoginAt')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return { isValid: false, error: 'User not found' };
    }

    if (user.role !== 'admin') {
      return { isValid: false, error: 'Insufficient permissions' };
    }

    if (!user.isActive) {
      return { isValid: false, error: 'Account deactivated' };
    }

    // Update last login for admin users
    await supabase
      .from('users')
      .update({ lastLoginAt: new Date().toISOString() })
      .eq('id', userId);

    return { isValid: true, user };
  } catch (error) {
    console.error('Admin validation error:', error);
    return { isValid: false, error: 'Validation failed' };
  }
}

// Rate limiting for admin endpoints
import { Ratelimit } from '@upstash/ratelimit';

const adminRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
});

export async function checkAdminRateLimit(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const { success, limit, reset, remaining } = await adminRateLimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }
  
  return null; // Continue processing
}
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
- [React Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**Developer Guide Version**: 1.1.0 (Patch 1)  
**Last Updated**: January 2024  
**Next Review**: March 2024

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

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

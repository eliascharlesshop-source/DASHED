# DASHED OS Setup Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [External Services](#external-services)
- [Running the Application](#running-the-application)
- [Testing Setup](#testing-setup)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before setting up DASHED OS, ensure you have the following installed:

### Required Software
- **Node.js** (v18.0.0 or higher)
  ```bash
  # Check your version
  node --version
  
  # Install via nvm (recommended)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install 18
  nvm use 18
  ```

- **pnpm** (Package manager)
  ```bash
  # Install pnpm
  npm install -g pnpm
  
  # Verify installation
  pnpm --version
  ```

- **Git** (Version control)
  ```bash
  # Verify installation
  git --version
  ```

### Optional Software
- **PostgreSQL** (for local database development)
- **Docker** (for containerized development)
- **VS Code** (recommended editor with extensions)

### Required Accounts
- **Supabase** account (for database and authentication)
- **Stripe** account (for payment processing)
- **Vercel** account (for deployment)
- **GitHub** account (for source control and CI/CD)

## Local Development Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>
cd app

# Check project structure
ls -la
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm list --depth=0
```

### 3. VS Code Setup (Optional but Recommended)

Install recommended extensions:
```bash
# Install VS Code extensions
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-json
```

Add workspace settings:
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Environment Configuration

### 1. Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local
```

### 2. Environment Variables

Open `.env.local` and configure the following variables:

#### Basic Configuration
```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (will be filled when setting up Supabase)
DATABASE_URL=postgresql://username:password@localhost:5432/dashed_os
DIRECT_URL=postgresql://username:password@localhost:5432/dashed_os
```

#### Supabase Configuration
```env
# Supabase (get these from your Supabase project)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Authentication
```env
# NextAuth.js
NEXTAUTH_SECRET=your-super-secret-jwt-secret
NEXTAUTH_URL=http://localhost:3000
```

#### Payment Processing
```env
# Stripe
STRIPE_SECRET_KEY=sk_test_your_test_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

#### Optional: Blockchain (Solana)
```env
# Solana
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_PRIVATE_KEY=your-wallet-private-key
```

#### Optional: External Services
```env
# Email service (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Monitoring (optional)
SENTRY_DSN=https://your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=https://your-public-sentry-dsn
```

## Database Setup

### Option 1: Supabase (Recommended)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create a new organization and project

2. **Get Database Credentials**
   ```bash
   # In Supabase Dashboard → Settings → Database
   # Copy the connection string and update .env.local
   ```

3. **Setup Database Schema**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Initialize Supabase in your project
   supabase init
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Apply migrations (if any)
   supabase db push
   ```

4. **Configure Row Level Security**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   
   -- Example policy for users table
   CREATE POLICY "Users can view own profile" ON users
     FOR SELECT USING (auth.uid() = id);
   
   CREATE POLICY "Users can update own profile" ON users
     FOR UPDATE USING (auth.uid() = id);
   ```

### Option 2: Local PostgreSQL

1. **Install PostgreSQL**
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

2. **Create Database**
   ```bash
   # Create database
   createdb dashed_os
   
   # Create user
   psql -c "CREATE USER dashed_user WITH PASSWORD 'your_password';"
   psql -c "GRANT ALL PRIVILEGES ON DATABASE dashed_os TO dashed_user;"
   ```

3. **Update Environment Variables**
   ```env
   DATABASE_URL=postgresql://dashed_user:your_password@localhost:5432/dashed_os
   DIRECT_URL=postgresql://dashed_user:your_password@localhost:5432/dashed_os
   ```

## External Services

### 1. Stripe Setup

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Create an account and verify

2. **Get API Keys**
   ```bash
   # In Stripe Dashboard → Developers → API Keys
   # Copy Publishable key and Secret key
   # Add to .env.local
   ```

3. **Setup Webhooks**
   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe
   
   # Login to Stripe
   stripe login
   
   # Forward webhooks to local development
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   
   # Copy the webhook signing secret to .env.local
   ```

### 2. Authentication Providers (Optional)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs

```env
# Add to .env.local
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL

```env
# Add to .env.local
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Running the Application

### 1. Development Server

```bash
# Start the development server
pnpm dev

# The application will be available at:
# http://localhost:3000
```

### 2. Build for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

### 3. Development Tools

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Format code
pnpm format

# Database studio (Supabase)
supabase studio
```

## Testing Setup

### 1. Install Test Dependencies

```bash
# Install Jest and testing utilities
pnpm add -D jest @jest/globals @types/jest jest-environment-jsdom
```

### 2. Configure Jest

Create `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### 3. Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Deployment

### 1. Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all production environment variables
   - Make sure to use production values for:
     - Database URLs
     - API keys
     - Webhook secrets

3. **Custom Domain (Optional)**
   - Go to Vercel Dashboard → Project Settings → Domains
   - Add your custom domain
   - Configure DNS records

### 2. Self-Hosted Deployment

#### Using Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   # Build Docker image
   docker build -t dashed-os .
   
   # Run container
   docker run -p 3000:3000 --env-file .env.local dashed-os
   ```

#### Using PM2

```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'dashed-os',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=3001 pnpm dev
```

#### 2. Node Version Mismatch
```bash
# Check current version
node --version

# Switch to correct version
nvm use 18

# Set as default
nvm alias default 18
```

#### 3. Package Installation Issues
```bash
# Clear package manager cache
pnpm store prune

# Delete node_modules and lock file
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install
```

#### 4. Database Connection Issues
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT version();"

# Check if Supabase is accessible
curl -I https://your-project.supabase.co/rest/v1/
```

#### 5. Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Check for TypeScript errors
pnpm type-check

# Check for linting errors
pnpm lint
```

### Environment-Specific Issues

#### Development
- **Hot Reload Not Working**: Restart dev server
- **Styles Not Loading**: Check Tailwind configuration
- **API Routes 404**: Verify file structure in `app/api/`

#### Production
- **Environment Variables**: Ensure all production secrets are set
- **Database Migrations**: Run migrations on production database
- **CORS Issues**: Configure proper CORS headers

### Getting Help

1. **Check Documentation**: Review API documentation and architecture docs
2. **Search Issues**: Look for similar issues in the repository
3. **Create Issue**: If problem persists, create a detailed issue
4. **Community Support**: Join the community Discord/Slack

### Useful Commands

```bash
# Quick setup script
npm run setup

# Health check
npm run health-check

# Database reset (development only)
npm run db:reset

# Generate types from database
npm run generate:types

# Full clean and reinstall
npm run clean && npm install
```

## Next Steps

After successfully setting up DASHED OS:

1. **Explore the Application**
   - Visit the dashboard at `http://localhost:3000`
   - Test user registration and login
   - Try device management features

2. **Read the Documentation**
   - [API Reference](./api-reference.md)
   - [Developer Guide](./developer-guide.md)
   - [Architecture Overview](./architecture.md)

3. **Start Development**
   - Create your first API endpoint
   - Add a new page or component
   - Implement custom features

4. **Deploy to Production**
   - Set up production database
   - Configure monitoring
   - Set up CI/CD pipeline

Congratulations! You now have DASHED OS running locally and are ready to start development.

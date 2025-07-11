# DASHED - Admin Management Platform

[![Version](https://img.shields.io/github/v/release/elicharlese/DASHED?style=for-the-badge)](https://github.com/elicharlese/DASHED/releases)
[![License](https://img.shields.io/github/license/elicharlese/DASHED?style=for-the-badge)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/elicharlese/DASHED/ci.yml?style=for-the-badge)](https://github.com/elicharlese/DASHED/actions)
[![Issues](https://img.shields.io/github/issues/elicharlese/DASHED?style=for-the-badge)](https://github.com/elicharlese/DASHED/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/elicharlese/DASHED?style=for-the-badge)](https://github.com/elicharlese/DASHED/pulls)
[![Contributors](https://img.shields.io/github/contributors/elicharlese/DASHED?style=for-the-badge)](https://github.com/elicharlese/DASHED/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/elicharlese/DASHED?style=for-the-badge)](https://github.com/elicharlese/DASHED/commits/main)
[![Code Size](https://img.shields.io/github/languages/code-size/elicharlese/DASHED?style=for-the-badge)](https://github.com/elicharlese/DASHED)
[![Top Language](https://img.shields.io/github/languages/top/elicharlese/DASHED?style=for-the-badge)](https://github.com/elicharlese/DASHED)

> 🚀 **DASHED v1.1.0** - Comprehensive admin management platform built with Next.js 15, TypeScript, and Supabase

## 📊 Project Statistics

- **25+ Admin API Endpoints** - Complete CRUD operations
- **6 Major Components** - Admin dashboard, orders, tickets, categories, licenses, users
- **7 Database Tables** - Optimized with 20+ performance indexes
- **100% TypeScript** - Full type safety and modern development
- **Comprehensive Testing** - Unit, integration, and E2E tests
- **Production Ready** - Optimized for deployment on Vercel

## ✨ Features

### 🏗️ **Admin Dashboard**
- Real-time analytics and statistics
- Order management with bulk operations
- Customer support ticket system
- Product category management
- Software license tracking
- User administration

### 🛠️ **Technical Stack**
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase PostgreSQL
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: Supabase Auth with role-based access
- **Testing**: Jest, React Testing Library, Playwright
- **Deployment**: Vercel-ready configuration

### 📈 **Performance**
- **< 2 second** page load times
- **< 500ms** API response times
- **95%** database query optimization
- **180KB** total admin bundle size

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/elicharlese/DASHED.git
cd DASHED

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## 📖 Documentation

- **[API Reference](docs/api-reference.md)** - Complete API documentation
- **[Admin User Guide](docs/admin-user-guide.md)** - Comprehensive user manual
- **[Developer Guide](docs/developer-guide.md)** - Architecture and development guide
- **[Troubleshooting](docs/troubleshooting-guide.md)** - Common issues and solutions

## 🏗️ Architecture

```
DASHED/
├── app/                    # Next.js 15 App Router
│   ├── (app)/             # Protected app routes
│   │   ├── admin/         # Admin dashboard
│   │   ├── dashboard/     # User dashboard
│   │   └── devices/       # Device management
│   └── api/               # API routes
│       ├── admin/         # Admin-specific APIs
│       ├── auth/          # Authentication
│       └── support/       # Support system
├── components/            # React components
│   ├── admin/            # Admin interface components
│   ├── ui/               # shadcn/ui components
│   └── providers/        # Context providers
├── database/             # Database migrations and schemas
├── docs/                 # Documentation
└── __tests__/           # Test suites
```

## 📋 Development Status

### ✅ Completed (v1.1.0)
- [x] Complete admin dashboard with analytics
- [x] Order management system with bulk operations
- [x] Product category management (hierarchical)
- [x] Customer support ticket system
- [x] Software license management foundation
- [x] User administration and role management
- [x] Performance optimization with database indexes
- [x] Comprehensive API documentation
- [x] Testing framework implementation

### 🔮 Roadmap (v1.2.0)
- [ ] Advanced reporting and analytics
- [ ] Email notification system
- [ ] Advanced search and filtering
- [ ] Audit logging dashboard
- [ ] Mobile app support
- [ ] Third-party integrations

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api/pin/?username=elicharlese&repo=DASHED&theme=dark&show_icons=true)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database powered by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">
  <strong>🚀 DASHED v1.1.0 - Powering Modern Admin Operations</strong>
</div>

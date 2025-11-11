require('@testing-library/jest-dom');

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Supabase
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
      }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  }),
  createServerComponentClient: () => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
      }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  }),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Users: () => 'Users',
  Package: () => 'Package',
  ShoppingCart: () => 'ShoppingCart',
  DollarSign: () => 'DollarSign',
  TrendingUp: () => 'TrendingUp',
  AlertTriangle: () => 'AlertTriangle',
  CheckCircle: () => 'CheckCircle',
  Clock: () => 'Clock',
  Zap: () => 'Zap',
  Shield: () => 'Shield',
  Wifi: () => 'Wifi',
  HardDrive: () => 'HardDrive',
  Eye: () => 'Eye',
  EyeOff: () => 'EyeOff',
  Plus: () => 'Plus',
  Search: () => 'Search',
  Smartphone: () => 'Smartphone',
  Tablet: () => 'Tablet',
  Monitor: () => 'Monitor',
  Settings: () => 'Settings',
  RefreshCw: () => 'RefreshCw',
  Power: () => 'Power',
  MoreVertical: () => 'MoreVertical',
  BarChart3: () => 'BarChart3',
  Activity: () => 'Activity',
  LayoutDashboard: () => 'LayoutDashboard',
  Key: () => 'Key',
  FolderOpen: () => 'FolderOpen',
  User: () => 'User',
  ChevronLeft: () => 'ChevronLeft',
  ChevronRight: () => 'ChevronRight',
  Star: () => 'Star',
}));

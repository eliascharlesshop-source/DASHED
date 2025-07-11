import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

// Mock fetch globally
global.fetch = jest.fn();

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
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display admin statistics correctly', async () => {
    const mockStats = {
      orders: { 
        total: 150, 
        pending: 12, 
        completed: 128, 
        last30Days: 35 
      },
      tickets: { 
        total: 45, 
        open: 8, 
        inProgress: 5, 
        last7Days: 12 
      },
      users: { 
        total: 250, 
        active: 230, 
        newLast30Days: 18 
      },
      licenses: { 
        total: 15, 
        active: 12, 
        expiring: 3 
      },
      products: { 
        total: 180, 
        active: 165, 
        categories: 25 
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    render(<AdminDashboard />, { wrapper: createWrapper() });

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument(); // Total orders
      expect(screen.getByText('45')).toBeInTheDocument(); // Total tickets
      expect(screen.getByText('250')).toBeInTheDocument(); // Total users
    });

    // Check that fetch was called with correct endpoint
    expect(fetch).toHaveBeenCalledWith('/api/admin/stats');
  });

  it('should handle loading state', () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<AdminDashboard />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<AdminDashboard />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

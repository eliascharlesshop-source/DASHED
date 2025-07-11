'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  FolderOpen,
  Key,
  Menu,
  LogOut,
  Shield
} from 'lucide-react';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { CategoryManagement } from '@/components/admin/category-management';
import { OrderManagement } from '@/components/admin/order-management';

const sidebarNavItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    id: 'dashboard',
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    id: 'orders',
  },
  {
    title: 'Products',
    icon: Package,
    id: 'products',
    children: [
      { title: 'All Products', id: 'products-list' },
      { title: 'Categories', id: 'categories' },
      { title: 'Inventory', id: 'inventory' },
    ],
  },
  {
    title: 'Users',
    icon: Users,
    id: 'users',
  },
  {
    title: 'Licenses',
    icon: Key,
    id: 'licenses',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    id: 'analytics',
  },
  {
    title: 'Settings',
    icon: Settings,
    id: 'settings',
  },
];

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['products']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'orders':
        return <OrderManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'products-list':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            <p className="text-muted-foreground">Product management interface will be implemented here.</p>
          </div>
        );
      case 'users':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <p className="text-muted-foreground">User management interface will be implemented here.</p>
          </div>
        );
      case 'licenses':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">License Management</h2>
            <p className="text-muted-foreground">License management interface will be implemented here.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p className="text-muted-foreground">Advanced analytics dashboard will be implemented here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
            <p className="text-muted-foreground">Admin settings and configuration will be implemented here.</p>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b px-6 py-4">
        <Shield className="h-6 w-6" />
        <span className="font-semibold">Admin Panel</span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarNavItems.map((item) => (
            <div key={item.id}>
              <Button
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  item.children && 'pr-2'
                )}
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.id);
                  } else {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
                {item.children && (
                  <FolderOpen 
                    className={cn(
                      'ml-auto h-4 w-4 transition-transform',
                      expandedItems.includes(item.id) && 'rotate-90'
                    )}
                  />
                )}
              </Button>
              
              {item.children && expandedItems.includes(item.id) && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.id}
                      variant={activeTab === child.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        setActiveTab(child.id);
                        setSidebarOpen(false);
                      }}
                    >
                      {child.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 border-r bg-card lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </Sheet>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {sidebarNavItems.find(item => 
                item.id === activeTab || item.children?.some(child => child.id === activeTab)
              )?.title || 'Admin Panel'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              View Site
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children || renderContent()}
        </main>
      </div>
    </div>
  );
}

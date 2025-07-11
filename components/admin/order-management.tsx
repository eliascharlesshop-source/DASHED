'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Eye, 
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  userId: string;
  status: string;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email: string;
    fullName?: string;
  };
  items?: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product?: {
      id: string;
      name: string;
      slug: string;
      imageUrl?: string;
    };
  }>;
  statusHistory?: Array<{
    id: string;
    status: string;
    notes?: string;
    trackingNumber?: string;
    createdAt: string;
    adminUser?: {
      id: string;
      email: string;
      fullName?: string;
    };
  }>;
}

interface OrderFilters {
  status: string;
  search: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'confirmed', label: 'Confirmed', color: 'info' },
  { value: 'processing', label: 'Processing', color: 'default' },
  { value: 'shipped', label: 'Shipped', color: 'primary' },
  { value: 'delivered', label: 'Delivered', color: 'success' },
  { value: 'cancelled', label: 'Cancelled', color: 'destructive' },
  { value: 'refunded', label: 'Refunded', color: 'secondary' },
];

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [bulkUpdate, setBulkUpdate] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    totalPages: 0,
  });
  const { toast } = useToast();

  const [filters, setFilters] = useState<OrderFilters>({
    status: '',
    search: '',
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [updateForm, setUpdateForm] = useState({
    status: '',
    trackingNumber: '',
    notes: '',
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
      
      const response = await fetch(`/api/admin/orders?${params}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(data.orders || []);
      setStats({
        total: data.pagination?.total || 0,
        totalPages: data.pagination?.totalPages || 0,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch order details');
      
      const data = await response.json();
      setSelectedOrder(data.order);
      setShowOrderDetail(true);
    } catch (error) {
      console.error('Error fetching order detail:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch order details',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateOrder = async (orderId: string) => {
    if (!updateForm.status && !updateForm.trackingNumber && !updateForm.notes) {
      toast({
        title: 'Error',
        description: 'Please provide at least one field to update',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateForm),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update order');
      }

      toast({
        title: 'Success',
        description: 'Order updated successfully',
      });

      // Refresh orders and order detail
      fetchOrders();
      if (selectedOrder) {
        fetchOrderDetail(selectedOrder.id);
      }
      
      setUpdateForm({ status: '', trackingNumber: '', notes: '' });
    } catch (error: any) {
      console.error('Error updating order:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleBulkUpdate = async () => {
    if (selectedOrders.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select orders to update',
        variant: 'destructive',
      });
      return;
    }

    if (!updateForm.status && !updateForm.trackingNumber && !updateForm.notes) {
      toast({
        title: 'Error',
        description: 'Please provide at least one field to update',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderIds: selectedOrders,
          ...updateForm,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update orders');
      }

      const data = await response.json();
      toast({
        title: 'Success',
        description: data.message,
      });

      setBulkUpdate(false);
      setSelectedOrders([]);
      setUpdateForm({ status: '', trackingNumber: '', notes: '' });
      fetchOrders();
    } catch (error: any) {
      console.error('Error updating orders:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <RefreshCw className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'refunded': return <DollarSign className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    const statusConfig = ORDER_STATUSES.find(s => s.value === status);
    return statusConfig?.color || 'default';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading orders...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Manage and track customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by ID, email, or name..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value, page: 1 }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                {ORDER_STATUSES.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={bulkUpdate ? "default" : "outline"}
              onClick={() => setBulkUpdate(!bulkUpdate)}
            >
              Bulk Update
            </Button>
          </div>

          {/* Bulk Update Panel */}
          {bulkUpdate && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Bulk Update Orders</CardTitle>
                <CardDescription>
                  Selected {selectedOrders.length} orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={updateForm.status}
                      onValueChange={(value) => setUpdateForm(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tracking Number</Label>
                    <Input
                      value={updateForm.trackingNumber}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, trackingNumber: e.target.value }))}
                      placeholder="Enter tracking number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Input
                      value={updateForm.notes}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add notes"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <Button onClick={handleBulkUpdate} disabled={selectedOrders.length === 0}>
                    Update {selectedOrders.length} Orders
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedOrders([])}>
                    Clear Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Orders Table */}
          <Table>
            <TableHeader>
              <TableRow>
                {bulkUpdate && (
                  <TableHead className="w-[50px]">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === orders.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(orders.map(o => o.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                    />
                  </TableHead>
                )}
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={bulkUpdate ? 8 : 7} className="text-center py-8 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map(order => (
                  <TableRow key={order.id}>
                    {bulkUpdate && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrders(prev => [...prev, order.id]);
                            } else {
                              setSelectedOrders(prev => prev.filter(id => id !== order.id));
                            }
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <code className="text-sm">{order.id.slice(0, 8)}</code>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.user?.fullName || order.user?.email}</div>
                        <div className="text-sm text-muted-foreground">{order.user?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status) as any} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(order.status)}
                        {ORDER_STATUSES.find(s => s.value === order.status)?.label || order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(order.total)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      {order.trackingNumber ? (
                        <code className="text-sm">{order.trackingNumber}</code>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchOrderDetail(order.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {stats.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {orders.length} of {stats.total} orders
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page <= 1}
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {filters.page} of {stats.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page >= stats.totalPages}
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.id.slice(0, 8)} - {selectedOrder?.user?.email}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid grid-cols-2 gap-6">
              {/* Order Info */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={getStatusBadgeVariant(selectedOrder.status) as any}>
                        {ORDER_STATUSES.find(s => s.value === selectedOrder.status)?.label || selectedOrder.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">{formatCurrency(selectedOrder.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{formatDate(selectedOrder.createdAt)}</span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tracking:</span>
                        <code className="text-sm">{selectedOrder.trackingNumber}</code>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Update Order */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Update Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={updateForm.status}
                        onValueChange={(value) => setUpdateForm(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select new status" />
                        </SelectTrigger>
                        <SelectContent>
                          {ORDER_STATUSES.map(status => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tracking Number</Label>
                      <Input
                        value={updateForm.trackingNumber}
                        onChange={(e) => setUpdateForm(prev => ({ ...prev, trackingNumber: e.target.value }))}
                        placeholder="Enter tracking number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        value={updateForm.notes}
                        onChange={(e) => setUpdateForm(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Add notes about this update"
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleUpdateOrder(selectedOrder.id)}
                      className="w-full"
                    >
                      Update Order
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Order Items & History */}
              <div className="space-y-4">
                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.items?.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border rounded">
                          <div className="flex-1">
                            <div className="font-medium">{item.product?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Quantity: {item.quantity} × {formatCurrency(item.price)}
                            </div>
                          </div>
                          <div className="font-medium">
                            {formatCurrency(item.quantity * item.price)}
                          </div>
                        </div>
                      )) || <div className="text-muted-foreground">No items found</div>}
                    </div>
                  </CardContent>
                </Card>

                {/* Status History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.statusHistory?.length ? (
                        selectedOrder.statusHistory.map(history => (
                          <div key={history.id} className="p-3 border rounded">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={getStatusBadgeVariant(history.status) as any}>
                                {ORDER_STATUSES.find(s => s.value === history.status)?.label || history.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(history.createdAt)}
                              </span>
                            </div>
                            {history.notes && (
                              <div className="text-sm mb-2">{history.notes}</div>
                            )}
                            {history.trackingNumber && (
                              <div className="text-sm text-muted-foreground">
                                Tracking: <code>{history.trackingNumber}</code>
                              </div>
                            )}
                            {history.adminUser && (
                              <div className="text-xs text-muted-foreground">
                                Updated by: {history.adminUser.fullName || history.adminUser.email}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-muted-foreground">No status history available</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

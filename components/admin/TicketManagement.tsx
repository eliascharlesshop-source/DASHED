'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Filter, Search, Clock, User, MessageSquare, AlertCircle, CheckCircle, RefreshCw, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userId: string;
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
  message: string;
  isInternal: boolean;
  createdAt: string;
  author: {
    id: string;
    email: string;
    fullName?: string;
  };
}

interface PaginatedTickets {
  tickets: SupportTicket[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const statusIcons = {
  open: AlertCircle,
  in_progress: RefreshCw,
  resolved: CheckCircle,
  closed: X,
};

export default function TicketManagement() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedTo: '',
    category: '',
    search: '',
  });
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [bulkUpdateData, setBulkUpdateData] = useState({
    status: '',
    priority: '',
    assignedTo: '',
  });
  const [newResponse, setNewResponse] = useState('');
  const [isInternalResponse, setIsInternalResponse] = useState(false);
  const [adminUsers, setAdminUsers] = useState<Array<{ id: string; email: string; fullName?: string }>>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
    fetchAdminUsers();
  }, [pagination.page, filters]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.assignedTo && { assignedTo: filters.assignedTo }),
        ...(filters.category && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/admin/support-tickets?${searchParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const data: PaginatedTickets = await response.json();
      setTickets(data.tickets);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch support tickets',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      // Assuming we have an endpoint to fetch admin users
      const response = await fetch('/api/admin/users?role=admin');
      if (response.ok) {
        const data = await response.json();
        setAdminUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching admin users:', error);
    }
  };

  const fetchTicketDetails = async (ticketId: string) => {
    try {
      const response = await fetch(`/api/admin/support-tickets/${ticketId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ticket details');
      }
      const data = await response.json();
      setSelectedTicket(data.ticket);
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch ticket details',
        variant: 'destructive',
      });
    }
  };

  const updateTicket = async (ticketId: string, updateData: Partial<SupportTicket>) => {
    try {
      const response = await fetch(`/api/admin/support-tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }

      const data = await response.json();
      
      // Update local state
      setTickets(tickets.map(ticket => 
        ticket.id === ticketId ? data.ticket : ticket
      ));
      
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(data.ticket);
      }

      toast({
        title: 'Success',
        description: 'Ticket updated successfully',
      });
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast({
        title: 'Error',
        description: 'Failed to update ticket',
        variant: 'destructive',
      });
    }
  };

  const bulkUpdateTickets = async () => {
    if (selectedTickets.length === 0) {
      toast({
        title: 'Warning',
        description: 'Please select tickets to update',
        variant: 'destructive',
      });
      return;
    }

    const updateData = Object.fromEntries(
      Object.entries(bulkUpdateData).filter(([_, value]) => value !== '')
    );

    if (Object.keys(updateData).length === 0) {
      toast({
        title: 'Warning',
        description: 'Please select at least one field to update',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/support-tickets', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketIds: selectedTickets,
          ...updateData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tickets');
      }

      const data = await response.json();
      
      toast({
        title: 'Success',
        description: data.message,
      });

      // Reset selections and refresh
      setSelectedTickets([]);
      setBulkUpdateData({ status: '', priority: '', assignedTo: '' });
      fetchTickets();
    } catch (error) {
      console.error('Error bulk updating tickets:', error);
      toast({
        title: 'Error',
        description: 'Failed to update tickets',
        variant: 'destructive',
      });
    }
  };

  const addResponse = async () => {
    if (!selectedTicket || !newResponse.trim()) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/support-tickets/${selectedTicket.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newResponse,
          isInternal: isInternalResponse,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add response');
      }

      const data = await response.json();
      
      // Refresh ticket details
      fetchTicketDetails(selectedTicket.id);
      
      setNewResponse('');
      setIsInternalResponse(false);

      toast({
        title: 'Success',
        description: 'Response added successfully',
      });
    } catch (error) {
      console.error('Error adding response:', error);
      toast({
        title: 'Error',
        description: 'Failed to add response',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusIcon = (status: string) => {
    const Icon = statusIcons[status as keyof typeof statusIcons];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Support Ticket Management</h2>
          <p className="text-muted-foreground">
            Manage customer support tickets and responses
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search tickets..."
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select value={filters.assignedTo} onValueChange={(value) => setFilters({ ...filters, assignedTo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All admins" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All admins</SelectItem>
                  {adminUsers.map((admin) => (
                    <SelectItem key={admin.id} value={admin.id}>
                      {admin.fullName || admin.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Category..."
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              />
            </div>

            <div className="flex items-end">
              <Button onClick={() => setFilters({ status: '', priority: '', assignedTo: '', category: '', search: '' })}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedTickets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Actions ({selectedTickets.length} selected)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Status</Label>
                <Select value={bulkUpdateData.status} onValueChange={(value) => setBulkUpdateData({ ...bulkUpdateData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No change</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Priority</Label>
                <Select value={bulkUpdateData.priority} onValueChange={(value) => setBulkUpdateData({ ...bulkUpdateData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No change</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Assign To</Label>
                <Select value={bulkUpdateData.assignedTo} onValueChange={(value) => setBulkUpdateData({ ...bulkUpdateData, assignedTo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No change</SelectItem>
                    {adminUsers.map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.fullName || admin.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={bulkUpdateTickets}>
                  Update Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>
            {pagination.total} total tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTickets.length === tickets.length && tickets.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTickets(tickets.map(t => t.id));
                      } else {
                        setSelectedTickets([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    Loading tickets...
                  </TableCell>
                </TableRow>
              ) : tickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No tickets found
                  </TableCell>
                </TableRow>
              ) : (
                tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTickets.includes(ticket.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTickets([...selectedTickets, ticket.id]);
                          } else {
                            setSelectedTickets(selectedTickets.filter(id => id !== ticket.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="text-sm text-muted-foreground">#{ticket.id.slice(-8)}</div>
                        {ticket.category && (
                          <Badge variant="outline" className="mt-1">
                            {ticket.category}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ticket.user.fullName || ticket.user.email}</div>
                        <div className="text-sm text-muted-foreground">{ticket.user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[ticket.status]}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(ticket.status)}
                          {ticket.status.replace('_', ' ')}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[ticket.priority]}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ticket.assignedAdmin ? (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{ticket.assignedAdmin.fullName || ticket.assignedAdmin.email}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(ticket.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(ticket.updatedAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchTicketDetails(ticket.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>Ticket Details</DialogTitle>
                            <DialogDescription>
                              View and manage support ticket
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTicket && (
                            <div className="space-y-6">
                              {/* Ticket Info */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Status</Label>
                                  <Select
                                    value={selectedTicket.status}
                                    onValueChange={(value) =>
                                      updateTicket(selectedTicket.id, { status: value as any })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="open">Open</SelectItem>
                                      <SelectItem value="in_progress">In Progress</SelectItem>
                                      <SelectItem value="resolved">Resolved</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Priority</Label>
                                  <Select
                                    value={selectedTicket.priority}
                                    onValueChange={(value) =>
                                      updateTicket(selectedTicket.id, { priority: value as any })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label>Assign To</Label>
                                <Select
                                  value={selectedTicket.assignedTo || ''}
                                  onValueChange={(value) =>
                                    updateTicket(selectedTicket.id, { assignedTo: value || null })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select admin" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="">Unassigned</SelectItem>
                                    {adminUsers.map((admin) => (
                                      <SelectItem key={admin.id} value={admin.id}>
                                        {admin.fullName || admin.email}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Original Message */}
                              <div>
                                <Label>Original Message</Label>
                                <div className="mt-2 p-4 bg-muted rounded-lg">
                                  <div className="text-sm font-medium">{selectedTicket.subject}</div>
                                  <div className="mt-2 text-sm">{selectedTicket.message}</div>
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    From: {selectedTicket.user.fullName || selectedTicket.user.email} • {formatDate(selectedTicket.createdAt)}
                                  </div>
                                </div>
                              </div>

                              {/* Responses */}
                              <div>
                                <Label>Responses</Label>
                                <ScrollArea className="mt-2 h-64 border rounded-lg p-4">
                                  {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                                    <div className="space-y-4">
                                      {selectedTicket.responses.map((response) => (
                                        <div key={response.id} className="border-l-2 border-l-muted pl-4">
                                          <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">
                                              {response.author.fullName || response.author.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              {response.isInternal && (
                                                <Badge variant="secondary">Internal</Badge>
                                              )}
                                              <div className="text-xs text-muted-foreground">
                                                {formatDate(response.createdAt)}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="mt-1 text-sm">{response.message}</div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-center text-muted-foreground">
                                      No responses yet
                                    </div>
                                  )}
                                </ScrollArea>
                              </div>

                              {/* Add Response */}
                              <div>
                                <Label>Add Response</Label>
                                <div className="mt-2 space-y-2">
                                  <Textarea
                                    placeholder="Type your response..."
                                    value={newResponse}
                                    onChange={(e) => setNewResponse(e.target.value)}
                                    rows={4}
                                  />
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id="internal"
                                        checked={isInternalResponse}
                                        onCheckedChange={setIsInternalResponse}
                                      />
                                      <Label htmlFor="internal">Internal note (not visible to customer)</Label>
                                    </div>
                                    <Button onClick={addResponse} disabled={!newResponse.trim()}>
                                      Add Response
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Admin Notes */}
                              <div>
                                <Label>Admin Notes</Label>
                                <Textarea
                                  className="mt-2"
                                  placeholder="Internal admin notes..."
                                  value={selectedTicket.adminNotes || ''}
                                  onChange={(e) =>
                                    updateTicket(selectedTicket.id, { adminNotes: e.target.value })
                                  }
                                  rows={3}
                                />
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} tickets
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page <= 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

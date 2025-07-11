'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon, Plus, Search, Download, Key, User, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface SoftwareLicense {
  id: string;
  name: string;
  description?: string;
  licenseKey: string;
  maxUsers: number;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
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

interface User {
  id: string;
  email: string;
  fullName?: string;
  isActive: boolean;
}

interface PaginatedLicenses {
  licenses: UserLicense[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function LicenseManagement() {
  const [userLicenses, setUserLicenses] = useState<UserLicense[]>([]);
  const [availableLicenses, setAvailableLicenses] = useState<SoftwareLicense[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    licenseId: '',
    userId: '',
    isActive: '',
    search: '',
  });
  const [assignmentData, setAssignmentData] = useState({
    userId: '',
    licenseId: '',
    expiresAt: undefined as Date | undefined,
  });
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserLicenses();
    fetchAvailableLicenses();
    fetchAvailableUsers();
  }, [pagination.page, filters]);

  const fetchUserLicenses = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.licenseId && { licenseId: filters.licenseId }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.isActive && { isActive: filters.isActive }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/admin/user-licenses?${searchParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user licenses');
      }

      const data: PaginatedLicenses = await response.json();
      setUserLicenses(data.licenses);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching user licenses:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user licenses',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableLicenses = async () => {
    try {
      const response = await fetch('/api/admin/licenses?isActive=true&limit=100');
      if (response.ok) {
        const data = await response.json();
        setAvailableLicenses(data.licenses || []);
      }
    } catch (error) {
      console.error('Error fetching licenses:', error);
    }
  };

  const fetchAvailableUsers = async () => {
    try {
      const response = await fetch('/api/admin/users?isActive=true&limit=100');
      if (response.ok) {
        const data = await response.json();
        setAvailableUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const assignLicense = async () => {
    if (!assignmentData.userId || !assignmentData.licenseId) {
      toast({
        title: 'Error',
        description: 'Please select both user and license',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/user-licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: assignmentData.userId,
          licenseId: assignmentData.licenseId,
          expiresAt: assignmentData.expiresAt?.toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to assign license');
      }

      const data = await response.json();
      
      toast({
        title: 'Success',
        description: 'License assigned successfully',
      });

      setShowAssignDialog(false);
      setAssignmentData({ userId: '', licenseId: '', expiresAt: undefined });
      fetchUserLicenses();
    } catch (error) {
      console.error('Error assigning license:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to assign license',
        variant: 'destructive',
      });
    }
  };

  const revokeLicense = async (userLicenseId: string) => {
    try {
      const response = await fetch(`/api/admin/user-licenses/${userLicenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to revoke license');
      }

      toast({
        title: 'Success',
        description: 'License revoked successfully',
      });

      fetchUserLicenses();
    } catch (error) {
      console.error('Error revoking license:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke license',
        variant: 'destructive',
      });
    }
  };

  const bulkRevokeLicenses = async () => {
    if (selectedLicenses.length === 0) {
      toast({
        title: 'Warning',
        description: 'Please select licenses to revoke',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/user-licenses', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licenseIds: selectedLicenses,
          isActive: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to revoke licenses');
      }

      const data = await response.json();
      
      toast({
        title: 'Success',
        description: data.message,
      });

      setSelectedLicenses([]);
      fetchUserLicenses();
    } catch (error) {
      console.error('Error bulk revoking licenses:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke licenses',
        variant: 'destructive',
      });
    }
  };

  const exportLicenses = async () => {
    try {
      const response = await fetch(`/api/admin/user-licenses/export`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to export licenses');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `user-licenses-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Success',
        description: 'License data exported successfully',
      });
    } catch (error) {
      console.error('Error exporting licenses:', error);
      toast({
        title: 'Error',
        description: 'Failed to export license data',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const isExpired = (expiresAt?: string) => {
    return expiresAt && new Date(expiresAt) < new Date();
  };

  const isExpiringSoon = (expiresAt?: string) => {
    if (!expiresAt) return false;
    const expiry = new Date(expiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">License Management</h2>
          <p className="text-muted-foreground">
            Assign and manage software licenses for users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={exportLicenses} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Assign License
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign License to User</DialogTitle>
                <DialogDescription>
                  Select a user and license to create a new assignment
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>User</Label>
                  <Select value={assignmentData.userId} onValueChange={(value) => setAssignmentData({ ...assignmentData, userId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.fullName || user.email} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>License</Label>
                  <Select value={assignmentData.licenseId} onValueChange={(value) => setAssignmentData({ ...assignmentData, licenseId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLicenses.map((license) => (
                        <SelectItem key={license.id} value={license.id}>
                          {license.name} (Max: {license.maxUsers} users)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Expiration Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {assignmentData.expiresAt ? (
                          format(assignmentData.expiresAt, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={assignmentData.expiresAt}
                        onSelect={(date) => setAssignmentData({ ...assignmentData, expiresAt: date })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={assignLicense}>
                    Assign License
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search users or licenses..."
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="license">License</Label>
              <Select value={filters.licenseId} onValueChange={(value) => setFilters({ ...filters, licenseId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All licenses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All licenses</SelectItem>
                  {availableLicenses.map((license) => (
                    <SelectItem key={license.id} value={license.id}>
                      {license.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="user">User</Label>
              <Select value={filters.userId} onValueChange={(value) => setFilters({ ...filters, userId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All users</SelectItem>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.fullName || user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.isActive} onValueChange={(value) => setFilters({ ...filters, isActive: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={() => setFilters({ licenseId: '', userId: '', isActive: '', search: '' })}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedLicenses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Actions ({selectedLicenses.length} selected)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Button onClick={bulkRevokeLicenses} variant="destructive">
                Revoke Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* License Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>License Assignments</CardTitle>
          <CardDescription>
            {pagination.total} total assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedLicenses.length === userLicenses.length && userLicenses.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLicenses(userLicenses.map(l => l.id));
                      } else {
                        setSelectedLicenses([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading licenses...
                  </TableCell>
                </TableRow>
              ) : userLicenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No license assignments found
                  </TableCell>
                </TableRow>
              ) : (
                userLicenses.map((userLicense) => (
                  <TableRow key={userLicense.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedLicenses.includes(userLicense.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLicenses([...selectedLicenses, userLicense.id]);
                          } else {
                            setSelectedLicenses(selectedLicenses.filter(id => id !== userLicense.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{userLicense.user.fullName || userLicense.user.email}</div>
                          <div className="text-sm text-muted-foreground">{userLicense.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{userLicense.license.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Max {userLicense.license.maxUsers} users
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {userLicense.isActive ? (
                          isExpired(userLicense.expiresAt) ? (
                            <Badge variant="destructive">Expired</Badge>
                          ) : isExpiringSoon(userLicense.expiresAt) ? (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Expiring Soon
                            </Badge>
                          ) : (
                            <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                          )
                        ) : (
                          <Badge variant="secondary">Revoked</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(userLicense.assignedAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {userLicense.expiresAt ? (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDate(userLicense.expiresAt)}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {userLicense.isActive && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => revokeLicense(userLicense.id)}
                        >
                          Revoke
                        </Button>
                      )}
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
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} assignments
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

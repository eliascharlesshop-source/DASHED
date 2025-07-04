import { NextRequest, NextResponse } from 'next/server'
import { supabase, requireAuth } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'

// GET /api/dashboard/stats - Get dashboard statistics
export const GET = withErrorHandling(async (request: NextRequest) => {
  const user = await requireAuth()

  // Get device statistics
  const { data: devices, error: deviceError } = await supabase
    .from('devices')
    .select('status, type')
    .eq('user_id', user.id)

  if (deviceError) {
    return createErrorResponse(deviceError.message, 500)
  }

  // Get order statistics
  const { data: orders, error: orderError } = await supabase
    .from('orders')
    .select('status, total, created_at')
    .eq('user_id', user.id)

  if (orderError) {
    return createErrorResponse(orderError.message, 500)
  }

  // Get notification count
  const { count: unreadNotifications, error: notificationError } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false)

  if (notificationError) {
    return createErrorResponse(notificationError.message, 500)
  }

  // Get support ticket count
  const { count: openTickets, error: ticketError } = await supabase
    .from('support_tickets')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .in('status', ['open', 'in-progress'])

  if (ticketError) {
    return createErrorResponse(ticketError.message, 500)
  }

  // Calculate statistics
  const deviceStats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    byType: devices.reduce((acc, device) => {
      acc[device.type] = (acc[device.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const orderStats = {
    total: orders.length,
    totalValue: orders.reduce((sum, order) => sum + order.total, 0),
    byStatus: orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    recent: orders
      .filter(order => {
        const orderDate = new Date(order.created_at)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return orderDate >= thirtyDaysAgo
      })
      .length
  }

  const stats = {
    devices: deviceStats,
    orders: orderStats,
    notifications: {
      unread: unreadNotifications || 0
    },
    support: {
      openTickets: openTickets || 0
    }
  }

  return NextResponse.json(createApiResponse(stats, 'Dashboard statistics retrieved successfully'))
})

// GET /api/dashboard/activity - Get recent activity
export const GET_ACTIVITY = withErrorHandling(async (request: NextRequest) => {
  const user = await requireAuth()
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')

  // Get recent device activity
  const { data: recentDevices, error: deviceError } = await supabase
    .from('devices')
    .select('name, type, status, last_seen')
    .eq('user_id', user.id)
    .order('last_seen', { ascending: false })
    .limit(limit)

  if (deviceError) {
    return createErrorResponse(deviceError.message, 500)
  }

  // Get recent orders
  const { data: recentOrders, error: orderError } = await supabase
    .from('orders')
    .select('id, status, total, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (orderError) {
    return createErrorResponse(orderError.message, 500)
  }

  // Get recent notifications
  const { data: recentNotifications, error: notificationError } = await supabase
    .from('notifications')
    .select('type, title, message, created_at, read')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (notificationError) {
    return createErrorResponse(notificationError.message, 500)
  }

  const activity = {
    devices: recentDevices,
    orders: recentOrders,
    notifications: recentNotifications
  }

  return NextResponse.json(createApiResponse(activity, 'Recent activity retrieved successfully'))
})

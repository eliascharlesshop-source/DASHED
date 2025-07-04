import { NextRequest, NextResponse } from 'next/server'
import { supabase, requireAuth } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'

// GET /api/notifications - Get user notifications
export const GET = withErrorHandling(async (request: NextRequest) => {
  const user = await requireAuth()
  const { searchParams } = new URL(request.url)
  
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const unreadOnly = searchParams.get('unread') === 'true'

  const offset = (page - 1) * limit

  let query = supabase
    .from('notifications')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)

  if (unreadOnly) {
    query = query.eq('read', false)
  }

  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(createApiResponse({
    data,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    }
  }))
})

// POST /api/notifications - Create notification (admin only)
export const POST = withErrorHandling(async (request: NextRequest) => {
  const user = await requireAuth()
  
  // Check if user is admin
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return createErrorResponse('Insufficient permissions', 403)
  }

  const body = await request.json()
  const { user_id, type, title, message } = body

  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id,
      type,
      title,
      message,
      read: false
    })
    .select()
    .single()

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  // Send real-time notification
  await supabase
    .channel(`notifications:${user_id}`)
    .send({
      type: 'broadcast',
      event: 'new_notification',
      payload: data
    })

  return NextResponse.json(
    createApiResponse(data, 'Notification created successfully'),
    { status: 201 }
  )
})

// PUT /api/notifications/mark-read - Mark notifications as read
export const PUT = withErrorHandling(async (request: NextRequest) => {
  const user = await requireAuth()
  const body = await request.json()
  const { notification_ids } = body

  if (!notification_ids || !Array.isArray(notification_ids)) {
    return createErrorResponse('Invalid notification IDs', 400)
  }

  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', user.id)
    .in('id', notification_ids)

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(createApiResponse(null, 'Notifications marked as read'))
})

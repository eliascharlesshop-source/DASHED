import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling, withAuth } from '@/lib/api-utils'
import { validateBody, validateQuery, deviceSchema, paginationSchema, idSchema } from '@/lib/validations'

// GET /api/devices - List user devices
export const GET = withAuth(withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const { page, limit } = validateQuery(paginationSchema, Object.fromEntries(searchParams))
  
  // Get user ID from auth context (would be implemented with proper auth)
  const userId = request.headers.get('user-id') // Placeholder

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const offset = (page - 1) * limit

  const { data: devices, error, count } = await supabase
    .from('devices')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse({
      data: devices,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  )
}))

// POST /api/devices - Create new device
export const POST = withAuth(withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  const deviceData = validateBody(deviceSchema, body)
  
  // Get user ID from auth context
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const { data: device, error } = await supabase
    .from('devices')
    .insert({
      ...deviceData,
      user_id: userId,
      status: 'offline',
      last_seen: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse(device, 'Device created successfully'),
    { status: 201 }
  )
}))

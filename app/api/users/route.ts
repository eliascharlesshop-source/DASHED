import { NextRequest } from 'next/server'
import { supabase, requireAuth } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'
import { userProfileSchema, paginationSchema } from '@/lib/validations'

// GET /api/users - Get all users (admin only)
export const GET = withErrorHandling(async (request: NextRequest) => {
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

  const url = new URL(request.url)
  const { page, limit } = paginationSchema.parse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit')
  })

  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('users')
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return Response.json(createApiResponse(data, 'Users retrieved successfully'), {
    status: 200
  })
})

// POST /api/users - Create user (admin only)
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
  const userData = userProfileSchema.parse(body)

  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single()

  if (error) {
    return createErrorResponse(error.message, 400)
  }

  return Response.json(createApiResponse(data, 'User created successfully'), {
    status: 201
  })
})

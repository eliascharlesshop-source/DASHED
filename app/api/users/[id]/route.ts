import { NextRequest } from 'next/server'
import { supabase, requireAuth } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'
import { userProfileSchema } from '@/lib/validations'

// GET /api/users/[id] - Get user profile
export const GET = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await requireAuth()
  const userId = params.id

  // Users can only access their own profile unless they're admin
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (user.id !== userId && profile?.role !== 'admin') {
    return createErrorResponse('Insufficient permissions', 403)
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    return createErrorResponse('User not found', 404)
  }

  return Response.json(createApiResponse(data, 'User profile retrieved successfully'))
})

// PUT /api/users/[id] - Update user profile
export const PUT = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await requireAuth()
  const userId = params.id

  // Users can only update their own profile unless they're admin
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (user.id !== userId && profile?.role !== 'admin') {
    return createErrorResponse('Insufficient permissions', 403)
  }

  const body = await request.json()
  const updateData = userProfileSchema.partial().parse(body)

  const { data, error } = await supabase
    .from('users')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    return createErrorResponse(error.message, 400)
  }

  return Response.json(createApiResponse(data, 'User profile updated successfully'))
})

// DELETE /api/users/[id] - Delete user (admin only)
export const DELETE = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await requireAuth()
  const userId = params.id

  // Check if user is admin
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return createErrorResponse('Insufficient permissions', 403)
  }

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)

  if (error) {
    return createErrorResponse(error.message, 400)
  }

  return Response.json(createApiResponse(null, 'User deleted successfully'))
})

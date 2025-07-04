import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling, withAuth } from '@/lib/api-utils'
import { validateBody, validateParams, deviceUpdateSchema, idSchema } from '@/lib/validations'

// GET /api/devices/[id] - Get device by ID
export const GET = withAuth(withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = validateParams(idSchema, params)
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const { data: device, error } = await supabase
    .from('devices')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return createErrorResponse('Device not found', 404)
    }
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(createApiResponse(device))
}))

// PUT /api/devices/[id] - Update device
export const PUT = withAuth(withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = validateParams(idSchema, params)
  const body = await request.json()
  const updateData = validateBody(deviceUpdateSchema, body)
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const { data: device, error } = await supabase
    .from('devices')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return createErrorResponse('Device not found', 404)
    }
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse(device, 'Device updated successfully')
  )
}))

// DELETE /api/devices/[id] - Delete device
export const DELETE = withAuth(withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = validateParams(idSchema, params)
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const { error } = await supabase
    .from('devices')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse(null, 'Device deleted successfully')
  )
}))

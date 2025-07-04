import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'
import { validateParams, idSchema } from '@/lib/validations'

// GET /api/products/[id] - Get product by ID
export const GET = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = validateParams(idSchema, params)

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return createErrorResponse('Product not found', 404)
    }
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(createApiResponse(product))
})

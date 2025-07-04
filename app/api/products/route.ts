import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'
import { validateQuery, paginationSchema, searchSchema } from '@/lib/validations'

// GET /api/products - List products with search and pagination
export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const queryParams = Object.fromEntries(searchParams)
  
  const { page, limit, sortBy = 'created_at', sortOrder = 'desc' } = validateQuery(paginationSchema, queryParams)
  
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })

  // Apply search filters if provided
  if (queryParams.q) {
    query = query.or(`name.ilike.%${queryParams.q}%,description.ilike.%${queryParams.q}%`)
  }

  if (queryParams.category) {
    query = query.eq('category', queryParams.category)
  }

  if (queryParams.minPrice) {
    query = query.gte('price', parseInt(queryParams.minPrice))
  }

  if (queryParams.maxPrice) {
    query = query.lte('price', parseInt(queryParams.maxPrice))
  }

  if (queryParams.inStock !== undefined) {
    query = query.eq('in_stock', queryParams.inStock === 'true')
  }

  const offset = (page - 1) * limit

  const { data: products, error, count } = await query
    .range(offset, offset + limit - 1)
    .order(sortBy, { ascending: sortOrder === 'asc' })

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse({
      data: products,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  )
})

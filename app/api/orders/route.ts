import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling, withAuth } from '@/lib/api-utils'
import { validateBody, validateQuery, orderSchema, paginationSchema } from '@/lib/validations'

// GET /api/orders - Get user's orders
export const GET = withAuth(withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const { page, limit } = validateQuery(paginationSchema, Object.fromEntries(searchParams))
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const offset = (page - 1) * limit

  const { data: orders, error, count } = await supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse({
      data: orders,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  )
}))

// POST /api/orders - Create new order
export const POST = withAuth(withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  const orderData = validateBody(orderSchema, body)
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  // Verify all products exist and are in stock
  const productIds = orderData.items.map(item => item.productId)
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds)

  if (productError) {
    return createErrorResponse(productError.message, 500)
  }

  if (products.length !== productIds.length) {
    return createErrorResponse('Some products not found', 404)
  }

  // Check stock availability
  for (const item of orderData.items) {
    const product = products.find(p => p.id === item.productId)
    if (!product || !product.in_stock) {
      return createErrorResponse(`Product ${item.productId} is out of stock`, 400)
    }
  }

  // Calculate total
  const total = orderData.items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId)
    return sum + (product!.price * item.quantity)
  }, 0)

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      items: orderData.items,
      total,
      status: 'pending',
      shipping_address: orderData.shippingAddress,
      billing_address: orderData.billingAddress,
      payment_method: orderData.paymentMethod,
    })
    .select()
    .single()

  if (orderError) {
    return createErrorResponse(orderError.message, 500)
  }

  // Clear user's cart after successful order
  await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', userId) // Assuming cart_id relates to user

  return NextResponse.json(
    createApiResponse(order, 'Order created successfully'),
    { status: 201 }
  )
}))

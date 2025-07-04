import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling, withAuth } from '@/lib/api-utils'
import { validateBody, cartItemSchema, cartUpdateSchema } from '@/lib/validations'

// GET /api/cart - Get user's cart
export const GET = withAuth(withErrorHandling(async (request: NextRequest) => {
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  // Get or create cart for user
  let { data: cart, error } = await supabase
    .from('carts')
    .select(`
      *,
      cart_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .single()

  if (error && error.code === 'PGRST116') {
    // Create new cart if doesn't exist
    const { data: newCart, error: createError } = await supabase
      .from('carts')
      .insert({
        user_id: userId,
        items: [],
        total: 0,
      })
      .select()
      .single()

    if (createError) {
      return createErrorResponse(createError.message, 500)
    }

    cart = newCart
  } else if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(createApiResponse(cart))
}))

// POST /api/cart/items - Add item to cart
export const POST = withAuth(withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  const { productId, quantity } = validateBody(cartItemSchema, body)
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  // Verify product exists and is in stock
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (productError) {
    return createErrorResponse('Product not found', 404)
  }

  if (!product.in_stock) {
    return createErrorResponse('Product is out of stock', 400)
  }

  // Get or create cart
  let { data: cart } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!cart) {
    const { data: newCart, error: createError } = await supabase
      .from('carts')
      .insert({
        user_id: userId,
        items: [],
        total: 0,
      })
      .select()
      .single()

    if (createError) {
      return createErrorResponse(createError.message, 500)
    }

    cart = newCart
  }

  // Add item to cart_items table
  const { data: cartItem, error: itemError } = await supabase
    .from('cart_items')
    .insert({
      cart_id: cart.id,
      product_id: productId,
      quantity,
      price: product.price,
    })
    .select(`
      *,
      products (*)
    `)
    .single()

  if (itemError) {
    return createErrorResponse(itemError.message, 500)
  }

  // Update cart total
  const { data: updatedCart, error: updateError } = await supabase
    .from('carts')
    .update({
      total: cart.total + (product.price * quantity),
      updated_at: new Date().toISOString(),
    })
    .eq('id', cart.id)
    .select()
    .single()

  if (updateError) {
    return createErrorResponse(updateError.message, 500)
  }

  return NextResponse.json(
    createApiResponse(cartItem, 'Item added to cart'),
    { status: 201 }
  )
}))

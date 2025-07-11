import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling, withAuth } from '@/lib/api-utils'
import { validateBody, validateQuery, supportTicketSchema, paginationSchema } from '@/lib/validations'

// GET /api/support/tickets - Get user's support tickets
export const GET = withAuth(withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const { page, limit } = validateQuery(paginationSchema, Object.fromEntries(searchParams))
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const offset = (page - 1) * limit

  const { data: tickets, error, count } = await supabase
    .from('support_tickets')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse({
      data: tickets,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  )
}))

// POST /api/support/tickets - Create support ticket
export const POST = withAuth(withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  const ticketData = validateBody(supportTicketSchema, body)
  const userId = request.headers.get('user-id')

  if (!userId) {
    return createErrorResponse('Unauthorized', 401)
  }

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .insert({
      user_id: userId,
      subject: ticketData.subject,
      message: ticketData.message,
      category: ticketData.category,
      priority: ticketData.priority || 'medium',
      status: 'open',
    })
    .select()
    .single()

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse(ticket, 'Support ticket created successfully'),
    { status: 201 }
  )
}))

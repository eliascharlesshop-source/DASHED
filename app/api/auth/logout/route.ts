import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'

// POST /api/auth/logout
export const POST = withErrorHandling(async (request: NextRequest) => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return createErrorResponse(error.message, 500)
  }

  return NextResponse.json(
    createApiResponse(null, 'Logout successful')
  )
})

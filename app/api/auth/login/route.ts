import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling } from '@/lib/api-utils'
import { validateBody, userLoginSchema } from '@/lib/validations'

// POST /api/auth/login
export const POST = withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  const { email, password } = validateBody(userLoginSchema, body)

  // Authenticate user with Supabase
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError) {
    return createErrorResponse('Invalid credentials', 401)
  }

  // Get user profile
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (userError) {
    return createErrorResponse(userError.message, 500)
  }

  return NextResponse.json(
    createApiResponse({
      user: userData,
      session: authData.session,
    }, 'Login successful')
  )
})

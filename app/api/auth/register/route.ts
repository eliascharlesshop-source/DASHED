import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createApiResponse, createErrorResponse, withErrorHandling, withAuth } from '@/lib/api-utils'
import { validateBody, userRegistrationSchema, userLoginSchema } from '@/lib/validations'

// POST /api/auth/register
export const POST = withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  const { email, password, name } = validateBody(userRegistrationSchema, body)

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    return createErrorResponse('User already exists', 409)
  }

  // Create user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (authError) {
    return createErrorResponse(authError.message, 400)
  }

  // Create user profile
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user!.id,
      email,
      name,
      role: 'user',
      onboarding_complete: false,
      preferences: {
        notifications: true,
        email_updates: true,
        dark_mode: false,
      },
    })
    .select()
    .single()

  if (userError) {
    return createErrorResponse(userError.message, 500)
  }

  return NextResponse.json(
    createApiResponse(userData, 'User registered successfully'),
    { status: 201 }
  )
})

import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { ApiResponse, ApiError } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly code: string

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code: string = 'INTERNAL_ERROR'
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }
}

export function createApiResponse<T>(
  data?: T,
  message?: string,
  success: boolean = true
): ApiResponse<T> {
  return {
    success,
    data,
    message,
  }
}

export function createErrorResponse(
  error: string | Error | ZodError | AppError,
  statusCode: number = 500
): NextResponse {
  let apiError: ApiError

  if (error instanceof ZodError) {
    apiError = {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: error.issues.reduce((acc: Record<string, string>, err) => {
        acc[err.path.join('.')] = err.message
        return acc
      }, {}),
      timestamp: new Date().toISOString(),
    }
    statusCode = 400
  } else if (error instanceof AppError) {
    apiError = {
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
    }
    statusCode = error.statusCode
  } else if (error instanceof Error) {
    apiError = {
      code: 'INTERNAL_ERROR',
      message: error.message,
      timestamp: new Date().toISOString(),
    }
  } else {
    apiError = {
      code: 'UNKNOWN_ERROR',
      message: typeof error === 'string' ? error : 'An unknown error occurred',
      timestamp: new Date().toISOString(),
    }
  }

  return NextResponse.json(
    createApiResponse(null, apiError.message, false),
    { status: statusCode }
  )
}

export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      console.error('API Error:', error)
      return createErrorResponse(error as Error)
    }
  }
}

export function withAuth<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    // Auth validation will be implemented with Supabase
    return handler(...args)
  }
}

export function withRateLimit<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
  limit: number = 100,
  window: number = 3600000 // 1 hour
) {
  const requests = new Map<string, { count: number; reset: number }>()
  
  return async (...args: T): Promise<NextResponse> => {
    const clientId = 'default' // Will be replaced with actual client identification
    const now = Date.now()
    const windowStart = now - window
    
    const clientData = requests.get(clientId)
    if (clientData && clientData.reset > now) {
      if (clientData.count >= limit) {
        return NextResponse.json(
          createApiResponse(null, 'Rate limit exceeded', false),
          { status: 429 }
        )
      }
      clientData.count++
    } else {
      requests.set(clientId, { count: 1, reset: now + window })
    }
    
    // Clean up old entries
    for (const [key, value] of requests.entries()) {
      if (value.reset < windowStart) {
        requests.delete(key)
      }
    }
    
    return handler(...args)
  }
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const

export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS]

export async function validateUser(userId: string) {
  try {
    const supabase = createServerComponentClient({ cookies })
    
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, role, isActive')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return { isValid: false, user: null }
    }

    if (!user.isActive) {
      return { isValid: false, user: null }
    }

    return { isValid: true, user }
  } catch (error) {
    console.error('Error validating user:', error)
    return { isValid: false, user: null }
  }
}

export async function validateAdminUser(userId: string) {
  const { isValid, user } = await validateUser(userId)
  if (!isValid || user?.role !== 'admin') {
    return { isValid: false, user: null }
  }
  return { isValid: true, user }
}

export async function getUserRole(userId: string): Promise<string | null> {
  try {
    const supabase = createServerComponentClient({ cookies })
    
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return null
    }

    return user.role
  } catch (error) {
    console.error('Error getting user role:', error)
    return null
  }
}

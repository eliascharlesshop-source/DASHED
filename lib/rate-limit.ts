// Simple rate limiter using Map (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitOptions {
  requests: number
  window: number // in seconds
}

export async function rateLimit(
  identifier: string,
  options: RateLimitOptions = { requests: 100, window: 60 }
): Promise<{ success: boolean; reset: number; remaining: number }> {
  const now = Date.now()
  const windowMs = options.window * 1000
  const key = `${identifier}:${Math.floor(now / windowMs)}`
  
  const current = rateLimitMap.get(key)
  
  if (!current) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return {
      success: true,
      reset: now + windowMs,
      remaining: options.requests - 1
    }
  }
  
  if (current.count >= options.requests) {
    return {
      success: false,
      reset: current.resetTime,
      remaining: 0
    }
  }
  
  current.count++
  rateLimitMap.set(key, current)
  
  // Clean up old entries
  cleanupOldEntries(now)
  
  return {
    success: true,
    reset: current.resetTime,
    remaining: options.requests - current.count
  }
}

function cleanupOldEntries(now: number) {
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }
}

// IP-based rate limiting
export function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return `ip:${ip}`
}

// User-based rate limiting
export function getUserRateLimitKey(userId: string): string {
  return `user:${userId}`
}

// Different rate limits for different endpoints
export const RATE_LIMITS = {
  // Authentication endpoints
  AUTH_LOGIN: { requests: 5, window: 300 }, // 5 attempts per 5 minutes
  AUTH_REGISTER: { requests: 3, window: 300 }, // 3 attempts per 5 minutes
  AUTH_RESET_PASSWORD: { requests: 3, window: 300 },
  
  // API endpoints
  API_GENERAL: { requests: 100, window: 60 }, // 100 requests per minute
  API_UPLOAD: { requests: 10, window: 60 }, // 10 uploads per minute
  API_SEARCH: { requests: 50, window: 60 }, // 50 searches per minute
  
  // User actions
  USER_PROFILE_UPDATE: { requests: 10, window: 300 }, // 10 updates per 5 minutes
  USER_DEVICE_REGISTER: { requests: 5, window: 300 }, // 5 device registrations per 5 minutes
  
  // Support actions
  SUPPORT_TICKET_CREATE: { requests: 3, window: 3600 }, // 3 tickets per hour
  SUPPORT_CONTACT_FORM: { requests: 5, window: 3600 }, // 5 form submissions per hour
  
  // Blockchain actions
  SOLANA_TRANSACTION: { requests: 10, window: 60 }, // 10 transactions per minute
  
  // Admin actions
  ADMIN_API: { requests: 1000, window: 60 }, // 1000 requests per minute for admins
} as const

export type RateLimitType = keyof typeof RATE_LIMITS

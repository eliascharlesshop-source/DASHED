// Simple logging utility (use winston or similar in production)
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

class Logger {
  private level: LogLevel

  constructor() {
    const envLevel = process.env.LOGGING_LEVEL?.toLowerCase()
    switch (envLevel) {
      case 'error':
        this.level = LogLevel.ERROR
        break
      case 'warn':
        this.level = LogLevel.WARN
        break
      case 'info':
        this.level = LogLevel.INFO
        break
      case 'debug':
        this.level = LogLevel.DEBUG
        break
      default:
        this.level = LogLevel.INFO
    }
  }

  private log(level: LogLevel, message: string, meta?: any) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString()
      const levelName = LogLevel[level]
      
      const logEntry = {
        timestamp,
        level: levelName,
        message,
        ...(meta && { meta })
      }

      // In production, send to logging service (e.g., Sentry, LogRocket)
      if (process.env.NODE_ENV === 'production') {
        // Send to external logging service
        this.sendToExternalService(logEntry)
      } else {
        // Console logging for development
        console.log(`[${timestamp}] ${levelName}: ${message}`, meta ? meta : '')
      }
    }
  }

  private sendToExternalService(logEntry: any) {
    // This would integrate with services like Sentry, LogRocket, etc.
    // For now, just console.log
    console.log(JSON.stringify(logEntry))
  }

  error(message: string, meta?: any) {
    this.log(LogLevel.ERROR, message, meta)
  }

  warn(message: string, meta?: any) {
    this.log(LogLevel.WARN, message, meta)
  }

  info(message: string, meta?: any) {
    this.log(LogLevel.INFO, message, meta)
  }

  debug(message: string, meta?: any) {
    this.log(LogLevel.DEBUG, message, meta)
  }

  // HTTP request logging
  request(req: Request, res?: Response, duration?: number) {
    const meta = {
      method: req.method,
      url: req.url,
      userAgent: req.headers.get('user-agent'),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
      ...(res && { status: res.status }),
      ...(duration && { duration: `${duration}ms` })
    }

    this.info(`${req.method} ${req.url}`, meta)
  }

  // Database query logging
  query(query: string, params?: any, duration?: number) {
    const meta = {
      query,
      ...(params && { params }),
      ...(duration && { duration: `${duration}ms` })
    }

    this.debug('Database query', meta)
  }

  // Authentication logging
  auth(userId: string, action: string, success: boolean, meta?: any) {
    const logMeta = {
      userId,
      action,
      success,
      ...(meta && { meta })
    }

    this.info(`Auth: ${action}`, logMeta)
  }

  // Business logic logging
  business(event: string, userId?: string, meta?: any) {
    const logMeta = {
      event,
      ...(userId && { userId }),
      ...(meta && { meta })
    }

    this.info(`Business: ${event}`, logMeta)
  }

  // Error with stack trace
  exception(error: Error, context?: any) {
    const meta = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...(context && { context })
    }

    this.error(`Exception: ${error.message}`, meta)
  }
}

// Create singleton instance
export const logger = new Logger()

// Utility functions
export function logApiCall(
  method: string,
  endpoint: string,
  userId?: string,
  duration?: number,
  status?: number
) {
  logger.info(`API Call: ${method} ${endpoint}`, {
    userId,
    duration: duration ? `${duration}ms` : undefined,
    status
  })
}

export function logBusinessEvent(
  event: string,
  userId?: string,
  data?: any
) {
  logger.business(event, userId, data)
}

export function logSecurityEvent(
  event: string,
  userId?: string,
  ip?: string,
  userAgent?: string
) {
  logger.warn(`Security: ${event}`, {
    userId,
    ip,
    userAgent
  })
}

export function logPerformance(
  operation: string,
  duration: number,
  metadata?: any
) {
  logger.info(`Performance: ${operation}`, {
    duration: `${duration}ms`,
    ...metadata
  })
}

// Performance monitoring wrapper
export function withPerformanceLogging<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now()
  
  return fn().then(
    result => {
      const duration = Date.now() - start
      logPerformance(operation, duration, { success: true })
      return result
    },
    error => {
      const duration = Date.now() - start
      logPerformance(operation, duration, { success: false, error: error.message })
      throw error
    }
  )
}

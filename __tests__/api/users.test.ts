import { describe, it, expect, beforeEach } from '@jest/globals'
import { GET, POST } from '@/app/api/users/route'
import { mockSupabase, mockUser, mockAdminUser, createMockNextRequest, resetMocks, setupMockAuth } from '@/lib/test-utils'

// Mock the supabase module
jest.mock('@/lib/supabase', () => ({
  supabase: mockSupabase,
  requireAuth: jest.fn()
}))

describe('/api/users', () => {
  beforeEach(() => {
    resetMocks()
  })

  describe('GET /api/users', () => {
    it('should return users list for admin', async () => {
      setupMockAuth(mockAdminUser)
      
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockAdminUser,
              error: null
            })
          }),
          range: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: [mockUser, mockAdminUser],
              error: null,
              count: 2
            })
          })
        })
      })

      const request = createMockNextRequest('GET', 'http://localhost:3000/api/users?page=1&limit=10')
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it('should return 403 for non-admin users', async () => {
      setupMockAuth(mockUser)
      
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockUser,
              error: null
            })
          })
        })
      })

      const request = createMockNextRequest('GET', 'http://localhost:3000/api/users')
      const response = await GET(request)
      
      expect(response.status).toBe(403)
    })
  })

  describe('POST /api/users', () => {
    it('should create user for admin', async () => {
      setupMockAuth(mockAdminUser)
      
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockAdminUser,
              error: null
            })
          })
        }),
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockUser,
              error: null
            })
          })
        })
      })

      const userData = {
        name: 'New User',
        email: 'newuser@example.com'
      }

      const request = createMockNextRequest('POST', 'http://localhost:3000/api/users', userData)
      const response = await POST(request)
      
      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toBeDefined()
    })
  })
})

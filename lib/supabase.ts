import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Only create clients if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}) : null as any

// Admin client for backend operations
export const supabaseAdmin = supabaseUrl && supabaseServiceKey ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null as any

// Helper function to get authenticated user
export async function getAuthenticatedUser() {
  if (!supabase) throw new Error('Supabase client not initialized')
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Helper function to require authentication
export async function requireAuth() {
  const user = await getAuthenticatedUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

// Helper function to get user profile
export async function getUserProfile(userId: string) {
  if (!supabase) throw new Error('Supabase client not initialized')
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          fullName: string | null
          name: string
          avatar?: string
          role: 'admin' | 'user' | 'moderator'
          bio?: string
          company?: string
          location?: string
          website?: string
          phone?: string | null
          isActive: boolean
          onboarding_complete: boolean
          preferences: {
            notifications: boolean
            email_updates: boolean
            dark_mode: boolean
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          fullName?: string | null
          name: string
          avatar?: string
          role?: 'admin' | 'user' | 'moderator'
          bio?: string
          company?: string
          location?: string
          website?: string
          phone?: string | null
          isActive?: boolean
          onboarding_complete?: boolean
          preferences?: {
            notifications: boolean
            email_updates: boolean
            dark_mode: boolean
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          fullName?: string | null
          name?: string
          avatar?: string
          role?: 'admin' | 'user' | 'moderator'
          bio?: string
          company?: string
          location?: string
          website?: string
          phone?: string | null
          isActive?: boolean
          onboarding_complete?: boolean
          preferences?: {
            notifications: boolean
            email_updates: boolean
            dark_mode: boolean
          }
          updated_at?: string
        }
      }
      devices: {
        Row: {
          id: string
          user_id: string
          userId: string
          name: string
          type: 'desktop' | 'mobile' | 'tablet' | 'iot'
          status: 'online' | 'offline' | 'maintenance'
          osVersion: string
          configuration: Record<string, any>
          metadata: Record<string, any> | null
          solana_address?: string
          isActive: boolean
          last_seen: string
          lastSeen: string
          created_at: string
          updated_at: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          user_id?: string
          userId?: string
          name: string
          type: 'desktop' | 'mobile' | 'tablet' | 'iot'
          status?: 'online' | 'offline' | 'maintenance'
          osVersion?: string
          configuration?: Record<string, any>
          metadata?: Record<string, any> | null
          solana_address?: string
          isActive?: boolean
          last_seen?: string
          lastSeen?: string
          created_at?: string
          updated_at?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          user_id?: string
          userId?: string
          name?: string
          type?: 'desktop' | 'mobile' | 'tablet' | 'iot'
          status?: 'online' | 'offline' | 'maintenance'
          osVersion?: string
          configuration?: Record<string, any>
          metadata?: Record<string, any> | null
          solana_address?: string
          isActive?: boolean
          last_seen?: string
          lastSeen?: string
          updated_at?: string
          updatedAt?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          category: string
          images: string[]
          imageUrl: string | null
          features: string[]
          specifications: Record<string, any>
          in_stock: boolean
          isActive: boolean
          rating: number
          reviews: number
          sku: string | null
          weight: number | null
          dimensions: Record<string, number> | null
          tags: string[] | null
          isFeatured: boolean
          sortOrder: number
          metaTitle: string | null
          metaDescription: string | null
          adminNotes: string | null
          created_at: string
          updated_at: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string
          description: string
          price: number
          category?: string
          images?: string[]
          imageUrl?: string | null
          features?: string[]
          specifications?: Record<string, any>
          in_stock?: boolean
          isActive?: boolean
          rating?: number
          reviews?: number
          sku?: string | null
          weight?: number | null
          dimensions?: Record<string, number> | null
          tags?: string[] | null
          isFeatured?: boolean
          sortOrder?: number
          metaTitle?: string | null
          metaDescription?: string | null
          adminNotes?: string | null
          created_at?: string
          updated_at?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          price?: number
          category?: string
          images?: string[]
          imageUrl?: string | null
          features?: string[]
          specifications?: Record<string, any>
          in_stock?: boolean
          isActive?: boolean
          rating?: number
          reviews?: number
          sku?: string | null
          weight?: number | null
          dimensions?: Record<string, number> | null
          tags?: string[] | null
          isFeatured?: boolean
          sortOrder?: number
          metaTitle?: string | null
          metaDescription?: string | null
          adminNotes?: string | null
          updated_at?: string
          updatedAt?: string
        }
      }
      product_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parentId: string | null
          imageUrl: string | null
          isActive: boolean
          sortOrder: number
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parentId?: string | null
          imageUrl?: string | null
          isActive?: boolean
          sortOrder?: number
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parentId?: string | null
          imageUrl?: string | null
          isActive?: boolean
          sortOrder?: number
          createdAt?: string
          updatedAt?: string
        }
      }
      software_licenses: {
        Row: {
          id: string
          name: string
          type: 'perpetual' | 'subscription' | 'trial' | 'freemium'
          productId: string
          description: string | null
          features: string[]
          durationDays: number | null
          maxDevices: number
          price: number
          isActive: boolean
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          type: 'perpetual' | 'subscription' | 'trial' | 'freemium'
          productId: string
          description?: string | null
          features: string[]
          durationDays?: number | null
          maxDevices?: number
          price: number
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'perpetual' | 'subscription' | 'trial' | 'freemium'
          productId?: string
          description?: string | null
          features?: string[]
          durationDays?: number | null
          maxDevices?: number
          price?: number
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
      }
      user_licenses: {
        Row: {
          id: string
          userId: string
          licenseId: string
          activationKey: string
          status: 'active' | 'suspended' | 'expired' | 'revoked'
          activatedAt: string
          expiresAt: string | null
          deviceAssignments: string[]
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          userId: string
          licenseId: string
          activationKey: string
          status?: 'active' | 'suspended' | 'expired' | 'revoked'
          activatedAt: string
          expiresAt?: string | null
          deviceAssignments?: string[]
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          userId?: string
          licenseId?: string
          activationKey?: string
          status?: 'active' | 'suspended' | 'expired' | 'revoked'
          activatedAt?: string
          expiresAt?: string | null
          deviceAssignments?: string[]
          createdAt?: string
          updatedAt?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          userId: string
          items: any[]
          total: number
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          shipping_address: any
          shippingAddress: Record<string, string>
          billing_address: any
          payment_method: string
          paymentMethod: string
          trackingNumber: string | null
          adminNotes: string | null
          created_at: string
          updated_at: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          user_id?: string
          userId?: string
          items: any[]
          total: number
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          shipping_address?: any
          shippingAddress?: Record<string, string>
          billing_address?: any
          payment_method?: string
          paymentMethod?: string
          trackingNumber?: string | null
          adminNotes?: string | null
          created_at?: string
          updated_at?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          user_id?: string
          userId?: string
          items?: any[]
          total?: number
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          shipping_address?: any
          shippingAddress?: Record<string, string>
          billing_address?: any
          payment_method?: string
          paymentMethod?: string
          trackingNumber?: string | null
          adminNotes?: string | null
          updated_at?: string
          updatedAt?: string
        }
      }
      order_items: {
        Row: {
          id: string
          orderId: string
          productId: string
          quantity: number
          price: number
          createdAt: string
        }
        Insert: {
          id?: string
          orderId: string
          productId: string
          quantity: number
          price: number
          createdAt?: string
        }
        Update: {
          id?: string
          orderId?: string
          productId?: string
          quantity?: number
          price?: number
          createdAt?: string
        }
      }
      order_status_history: {
        Row: {
          id: string
          orderId: string
          status: string
          notes: string | null
          trackingNumber: string | null
          adminUserId: string | null
          createdAt: string
        }
        Insert: {
          id?: string
          orderId: string
          status: string
          notes?: string | null
          trackingNumber?: string | null
          adminUserId?: string | null
          createdAt?: string
        }
        Update: {
          id?: string
          orderId?: string
          status?: string
          notes?: string | null
          trackingNumber?: string | null
          adminUserId?: string | null
          createdAt?: string
        }
      }
      product_category_assignments: {
        Row: {
          id: string
          productId: string
          categoryId: string
          isPrimary: boolean
          createdAt: string
        }
        Insert: {
          id?: string
          productId: string
          categoryId: string
          isPrimary?: boolean
          createdAt?: string
        }
        Update: {
          id?: string
          productId?: string
          categoryId?: string
          isPrimary?: boolean
          createdAt?: string
        }
      }
      admin_action_logs: {
        Row: {
          id: string
          adminUserId: string | null
          actionType: string
          resourceType: string
          resourceId: string
          details: Record<string, any>
          ipAddress: string | null
          userAgent: string | null
          createdAt: string
        }
        Insert: {
          id?: string
          adminUserId?: string | null
          actionType: string
          resourceType: string
          resourceId: string
          details: Record<string, any>
          ipAddress?: string | null
          userAgent?: string | null
          createdAt?: string
        }
        Update: {
          id?: string
          adminUserId?: string | null
          actionType?: string
          resourceType?: string
          resourceId?: string
          details?: Record<string, any>
          ipAddress?: string | null
          userAgent?: string | null
          createdAt?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          userId: string
          subject: string
          message: string
          category: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'open' | 'in-progress' | 'in_progress' | 'resolved' | 'closed'
          assigned_to?: string
          assignedTo?: string | null
          created_at: string
          updated_at: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          user_id?: string
          userId?: string
          subject: string
          message: string
          category: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'open' | 'in-progress' | 'in_progress' | 'resolved' | 'closed'
          assigned_to?: string
          assignedTo?: string | null
          created_at?: string
          updated_at?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          user_id?: string
          userId?: string
          subject?: string
          message?: string
          category?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'open' | 'in-progress' | 'in_progress' | 'resolved' | 'closed'
          assigned_to?: string
          assignedTo?: string | null
          updated_at?: string
          updatedAt?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          department: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'internship'
          requirements: string[]
          benefits: string[]
          salary?: {
            min: number
            max: number
            currency: string
          }
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          department: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'internship'
          requirements?: string[]
          benefits?: string[]
          salary?: {
            min: number
            max: number
            currency: string
          }
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          department?: string
          location?: string
          type?: 'full-time' | 'part-time' | 'contract' | 'internship'
          requirements?: string[]
          benefits?: string[]
          salary?: {
            min: number
            max: number
            currency: string
          }
          is_active?: boolean
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'info' | 'warning' | 'error' | 'success'
          title: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'info' | 'warning' | 'error' | 'success'
          title: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'info' | 'warning' | 'error' | 'success'
          title?: string
          message?: string
          read?: boolean
        }
      }
      solana_transactions: {
        Row: {
          id: string
          user_id: string
          device_id?: string
          signature: string
          type: 'device_registration' | 'ownership_transfer' | 'payment'
          amount?: number
          status: 'pending' | 'confirmed' | 'failed'
          block_height?: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          device_id?: string
          signature: string
          type: 'device_registration' | 'ownership_transfer' | 'payment'
          amount?: number
          status?: 'pending' | 'confirmed' | 'failed'
          block_height?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          device_id?: string
          signature?: string
          type?: 'device_registration' | 'ownership_transfer' | 'payment'
          amount?: number
          status?: 'pending' | 'confirmed' | 'failed'
          block_height?: number
          updated_at?: string
        }
      }
    }
  }
}

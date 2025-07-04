import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for frontend use
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Admin client for backend operations
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Helper function to get authenticated user
export async function getAuthenticatedUser() {
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
          name: string
          avatar?: string
          role: 'admin' | 'user'
          bio?: string
          company?: string
          location?: string
          website?: string
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
          name: string
          avatar?: string
          role?: 'admin' | 'user'
          bio?: string
          company?: string
          location?: string
          website?: string
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
          name?: string
          avatar?: string
          role?: 'admin' | 'user'
          bio?: string
          company?: string
          location?: string
          website?: string
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
          name: string
          type: 'desktop' | 'mobile' | 'tablet' | 'iot'
          status: 'online' | 'offline' | 'maintenance'
          configuration: Record<string, any>
          solana_address?: string
          last_seen: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'desktop' | 'mobile' | 'tablet' | 'iot'
          status?: 'online' | 'offline' | 'maintenance'
          configuration?: Record<string, any>
          solana_address?: string
          last_seen?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'desktop' | 'mobile' | 'tablet' | 'iot'
          status?: 'online' | 'offline' | 'maintenance'
          configuration?: Record<string, any>
          solana_address?: string
          last_seen?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: string
          images: string[]
          features: string[]
          specifications: Record<string, any>
          in_stock: boolean
          rating: number
          reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: string
          images?: string[]
          features?: string[]
          specifications?: Record<string, any>
          in_stock?: boolean
          rating?: number
          reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          images?: string[]
          features?: string[]
          specifications?: Record<string, any>
          in_stock?: boolean
          rating?: number
          reviews?: number
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: any[]
          total: number
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: any
          billing_address: any
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: any[]
          total: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: any
          billing_address: any
          payment_method: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: any[]
          total?: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: any
          billing_address?: any
          payment_method?: string
          updated_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          subject: string
          message: string
          category: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'open' | 'in-progress' | 'resolved' | 'closed'
          assigned_to?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          message: string
          category: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'open' | 'in-progress' | 'resolved' | 'closed'
          assigned_to?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          message?: string
          category?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'open' | 'in-progress' | 'resolved' | 'closed'
          assigned_to?: string
          updated_at?: string
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

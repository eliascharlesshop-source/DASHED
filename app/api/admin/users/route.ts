import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  fullName: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional(),
  isActive: z.boolean().optional(),
  role: z.enum(['user', 'admin']).optional(),
});

const bulkUpdateSchema = z.object({
  userIds: z.array(z.string().uuid()),
  isActive: z.boolean().optional(),
  role: z.enum(['user', 'admin']).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate admin role
    const { isValid } = await validateAdminUser(user.id);
    if (!isValid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const role = url.searchParams.get('role');
    const search = url.searchParams.get('search');
    const isActive = url.searchParams.get('isActive');

    const offset = (page - 1) * limit;

    let query = supabase
      .from('users')
      .select(`
        id,
        email,
        fullName,
        phone,
        role,
        isActive,
        createdAt,
        lastLoginAt,
        _count:orders(count)
      `, { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('createdAt', { ascending: false });

    if (role) {
      query = query.eq('role', role);
    }

    if (isActive !== null && isActive !== undefined) {
      query = query.eq('isActive', isActive === 'true');
    }

    if (search) {
      query = query.or(`
        email.ilike.%${search}%,
        fullName.ilike.%${search}%
      `);
    }

    const { data: users, error, count } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({ 
      users,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate admin role
    const { isValid } = await validateAdminUser(user.id);
    if (!isValid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    
    // Check if this is a bulk update
    if (body.userIds && Array.isArray(body.userIds)) {
      const { userIds, ...updateData } = bulkUpdateSchema.parse(body);
      
      const updatedUsers = [];

      // Process each user
      for (const userId of userIds) {
        // Don't allow updating the current admin user's role
        if (userId === user.id && updateData.role === 'user') {
          continue;
        }

        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({
            ...updateData,
            updatedAt: new Date().toISOString(),
          })
          .eq('id', userId)
          .select('id, email, fullName, role, isActive')
          .single();

        if (updateError) {
          console.error(`Error updating user ${userId}:`, updateError);
          continue;
        }

        updatedUsers.push(updatedUser);

        // Log admin action
        await supabase
          .from('admin_action_logs')
          .insert([{
            adminUserId: user.id,
            actionType: 'UPDATE',
            resourceType: 'user',
            resourceId: userId,
            details: { 
              updated: updateData,
              userEmail: updatedUser.email
            },
          }]);
      }

      return NextResponse.json({ 
        message: `Updated ${updatedUsers.length} users`,
        updatedUsers 
      });
    } else {
      return NextResponse.json({ error: 'Invalid bulk update format' }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid data', 
        details: error.issues.map(issue => ({ 
          path: issue.path.join('.'), 
          message: issue.message 
        }))
      }, { status: 400 });
    }
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

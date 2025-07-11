import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const updateOrderSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']).optional(),
  trackingNumber: z.string().max(255).nullable().optional(),
  notes: z.string().max(1000).optional(),
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
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('orders')
      .select(`
        *,
        user:users(id, email, fullName),
        items:order_items(
          id,
          productId,
          quantity,
          price,
          product:products(id, name, slug, imageUrl)
        ),
        statusHistory:order_status_history(
          id,
          status,
          notes,
          trackingNumber,
          createdAt,
          adminUser:adminUserId(id, email, fullName)
        )
      `, { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order(sortBy, { ascending: sortOrder === 'asc' });

    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`
        id.ilike.%${search}%,
        user.email.ilike.%${search}%,
        user.fullName.ilike.%${search}%
      `);
    }

    const { data: orders, error, count } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({ 
      orders,
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
    const { orderIds, ...updateData } = body;
    
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ error: 'Order IDs are required' }, { status: 400 });
    }

    const validatedData = updateOrderSchema.parse(updateData);

    const updatedOrders = [];
    const statusHistory = [];

    // Process each order
    for (const orderId of orderIds) {
      // Update order
      const { data: order, error: updateError } = await supabase
        .from('orders')
        .update(validatedData)
        .eq('id', orderId)
        .select(`
          *,
          user:users(id, email, fullName)
        `)
        .single();

      if (updateError) {
        console.error(`Error updating order ${orderId}:`, updateError);
        continue;
      }

      updatedOrders.push(order);

      // Add status history if status changed
      if (validatedData.status) {
        statusHistory.push({
          orderId: orderId,
          status: validatedData.status,
          notes: validatedData.notes,
          trackingNumber: validatedData.trackingNumber,
          adminUserId: user.id,
        });
      }

      // Log admin action
      await supabase
        .from('admin_action_logs')
        .insert([{
          adminUserId: user.id,
          actionType: 'UPDATE',
          resourceType: 'order',
          resourceId: orderId,
          details: { 
            updated: validatedData,
            orderNumber: order.id
          },
        }]);
    }

    // Batch insert status history
    if (statusHistory.length > 0) {
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert(statusHistory);

      if (historyError) {
        console.error('Error creating status history:', historyError);
      }
    }

    return NextResponse.json({ 
      message: `Updated ${updatedOrders.length} orders`,
      updatedOrders 
    });
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

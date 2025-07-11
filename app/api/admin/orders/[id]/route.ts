import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const updateOrderSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']).optional(),
  trackingNumber: z.string().max(255).nullable().optional(),
  notes: z.string().max(1000).optional(),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }).optional(),
  adminNotes: z.string().max(2000).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        user:users(id, email, fullName, phone),
        items:order_items(
          id,
          productId,
          quantity,
          price,
          product:products(
            id, 
            name, 
            slug, 
            imageUrl, 
            sku,
            weight,
            dimensions
          )
        ),
        statusHistory:order_status_history(
          id,
          status,
          notes,
          trackingNumber,
          createdAt,
          adminUser:adminUserId(id, email, fullName)
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      console.error('Error fetching order:', error);
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }

    // Sort status history by creation date
    if (order.statusHistory) {
      order.statusHistory.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const validatedData = updateOrderSchema.parse(body);

    // Get current order for comparison
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('status')
      .eq('id', params.id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      console.error('Error fetching current order:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }

    // Update order
    const { data: order, error } = await supabase
      .from('orders')
      .update(validatedData)
      .eq('id', params.id)
      .select(`
        *,
        user:users(id, email, fullName)
      `)
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    // Add status history if status changed
    if (validatedData.status && validatedData.status !== currentOrder.status) {
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert([{
          orderId: params.id,
          status: validatedData.status,
          notes: validatedData.notes,
          trackingNumber: validatedData.trackingNumber,
          adminUserId: user.id,
        }]);

      if (historyError) {
        console.error('Error creating status history:', historyError);
      }
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'UPDATE',
        resourceType: 'order',
        resourceId: params.id,
        details: { 
          updated: validatedData,
          orderNumber: order.id,
          statusChanged: validatedData.status !== currentOrder.status
        },
      }]);

    return NextResponse.json({ order });
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Get order info for logging
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('id, status, total')
      .eq('id', params.id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      console.error('Error fetching order:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }

    // Check if order can be deleted (only pending or cancelled orders)
    if (!['pending', 'cancelled'].includes(order.status)) {
      return NextResponse.json({ 
        error: 'Only pending or cancelled orders can be deleted' 
      }, { status: 400 });
    }

    // Delete order (cascade will handle related records)
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting order:', error);
      return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'DELETE',
        resourceType: 'order',
        resourceId: params.id,
        details: { 
          orderNumber: order.id,
          status: order.status,
          total: order.total
        },
      }]);

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

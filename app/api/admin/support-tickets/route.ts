import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const updateTicketSchema = z.object({
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  assignedTo: z.string().uuid().nullable().optional(),
  adminNotes: z.string().max(2000).optional(),
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
    const priority = url.searchParams.get('priority');
    const assignedTo = url.searchParams.get('assignedTo');
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');

    const offset = (page - 1) * limit;

    let query = supabase
      .from('support_tickets')
      .select(`
        *,
        user:users!userId(id, email, fullName),
        assignedAdmin:users!assignedTo(id, email, fullName)
      `, { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('createdAt', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (priority) {
      query = query.eq('priority', priority);
    }

    if (assignedTo) {
      query = query.eq('assignedTo', assignedTo);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`
        subject.ilike.%${search}%,
        message.ilike.%${search}%,
        user.email.ilike.%${search}%
      `);
    }

    const { data: tickets, error, count } = await query;

    if (error) {
      console.error('Error fetching tickets:', error);
      return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({ 
      tickets,
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
    const { ticketIds, ...updateData } = body;
    
    if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
      return NextResponse.json({ error: 'Ticket IDs are required' }, { status: 400 });
    }

    const validatedData = updateTicketSchema.parse(updateData);

    const updatedTickets = [];

    // Process each ticket
    for (const ticketId of ticketIds) {
      // Update ticket
      const { data: ticket, error: updateError } = await supabase
        .from('support_tickets')
        .update({
          ...validatedData,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', ticketId)
        .select(`
          *,
          user:users!userId(id, email, fullName),
          assignedAdmin:users!assignedTo(id, email, fullName)
        `)
        .single();

      if (updateError) {
        console.error(`Error updating ticket ${ticketId}:`, updateError);
        continue;
      }

      updatedTickets.push(ticket);

      // Log admin action
      await supabase
        .from('admin_action_logs')
        .insert([{
          adminUserId: user.id,
          actionType: 'UPDATE',
          resourceType: 'support_ticket',
          resourceId: ticketId,
          details: { 
            updated: validatedData,
            ticketSubject: ticket.subject
          },
        }]);
    }

    return NextResponse.json({ 
      message: `Updated ${updatedTickets.length} tickets`,
      updatedTickets 
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

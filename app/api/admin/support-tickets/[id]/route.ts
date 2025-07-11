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
  category: z.string().max(100).optional(),
});

const createResponseSchema = z.object({
  message: z.string().min(1).max(5000),
  isInternal: z.boolean().default(false),
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

    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .select(`
        *,
        user:users!userId(id, email, fullName, phone),
        assignedAdmin:users!assignedTo(id, email, fullName),
        responses:support_ticket_responses(
          id,
          message,
          isInternal,
          createdAt,
          author:users!authorId(id, email, fullName)
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
      }
      console.error('Error fetching ticket:', error);
      return NextResponse.json({ error: 'Failed to fetch ticket' }, { status: 500 });
    }

    // Sort responses by creation date
    if (ticket.responses) {
      ticket.responses.sort((a: any, b: any) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return NextResponse.json({ ticket });
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
    const validatedData = updateTicketSchema.parse(body);

    // Update ticket
    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .update({
        ...validatedData,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select(`
        *,
        user:users!userId(id, email, fullName),
        assignedAdmin:users!assignedTo(id, email, fullName)
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
      }
      console.error('Error updating ticket:', error);
      return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'UPDATE',
        resourceType: 'support_ticket',
        resourceId: params.id,
        details: { 
          updated: validatedData,
          ticketSubject: ticket.subject
        },
      }]);

    return NextResponse.json({ ticket });
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

export async function POST(
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
    const validatedData = createResponseSchema.parse(body);

    // Verify ticket exists
    const { data: ticket, error: ticketError } = await supabase
      .from('support_tickets')
      .select('id, subject, status')
      .eq('id', params.id)
      .single();

    if (ticketError) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Create response
    const { data: response, error } = await supabase
      .from('support_ticket_responses')
      .insert([{
        ticketId: params.id,
        authorId: user.id,
        message: validatedData.message,
        isInternal: validatedData.isInternal,
      }])
      .select(`
        *,
        author:users!authorId(id, email, fullName)
      `)
      .single();

    if (error) {
      console.error('Error creating response:', error);
      return NextResponse.json({ error: 'Failed to create response' }, { status: 500 });
    }

    // Update ticket's last activity
    await supabase
      .from('support_tickets')
      .update({ updatedAt: new Date().toISOString() })
      .eq('id', params.id);

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'CREATE',
        resourceType: 'support_ticket_response',
        resourceId: response.id,
        details: { 
          ticketId: params.id,
          ticketSubject: ticket.subject,
          isInternal: validatedData.isInternal
        },
      }]);

    return NextResponse.json({ response }, { status: 201 });
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

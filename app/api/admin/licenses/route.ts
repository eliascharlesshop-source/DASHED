import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const createLicenseSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(['perpetual', 'subscription', 'trial', 'freemium']),
  productId: z.string().uuid(),
  description: z.string().max(1000).optional(),
  features: z.array(z.string()),
  durationDays: z.number().min(1).optional(),
  maxDevices: z.number().min(1).default(1),
  price: z.number().min(0),
  isActive: z.boolean().default(true),
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
    const productId = url.searchParams.get('productId');
    const type = url.searchParams.get('type');
    const includeInactive = url.searchParams.get('includeInactive') === 'true';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('software_licenses')
      .select(`
        *,
        product:products(id, name, slug),
        userLicenses:user_licenses(
          id,
          status,
          activatedAt,
          expiresAt,
          user:users(id, email, fullName)
        )
      `, { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('createdAt', { ascending: false });

    if (!includeInactive) {
      query = query.eq('isActive', true);
    }

    if (productId) {
      query = query.eq('productId', productId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data: licenses, error, count } = await query;

    if (error) {
      console.error('Error fetching licenses:', error);
      return NextResponse.json({ error: 'Failed to fetch licenses' }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({ 
      licenses,
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

export async function POST(request: NextRequest) {
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
    const validatedData = createLicenseSchema.parse(body);

    // Verify product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name')
      .eq('id', validatedData.productId)
      .single();

    if (productError) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create license
    const { data: license, error } = await supabase
      .from('software_licenses')
      .insert([validatedData])
      .select(`
        *,
        product:products(id, name, slug)
      `)
      .single();

    if (error) {
      console.error('Error creating license:', error);
      return NextResponse.json({ error: 'Failed to create license' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'CREATE',
        resourceType: 'software_license',
        resourceId: license.id,
        details: { 
          name: license.name, 
          type: license.type,
          productName: product.name
        },
      }]);

    return NextResponse.json({ license }, { status: 201 });
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

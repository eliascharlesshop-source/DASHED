import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';
import { randomBytes } from 'crypto';

const assignLicenseSchema = z.object({
  userId: z.string().uuid(),
  licenseId: z.string().uuid(),
  expiresAt: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

function generateActivationKey(): string {
  const key = randomBytes(16).toString('hex').toUpperCase();
  return key.replace(/(.{4})/g, '$1-').slice(0, -1);
}

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
    const userId = url.searchParams.get('userId');
    const licenseId = url.searchParams.get('licenseId');
    const status = url.searchParams.get('status');

    const offset = (page - 1) * limit;

    let query = supabase
      .from('user_licenses')
      .select(`
        *,
        user:users(id, email, fullName),
        license:software_licenses(
          id, 
          name, 
          type, 
          maxDevices,
          product:products(id, name, slug)
        )
      `, { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('createdAt', { ascending: false });

    if (userId) {
      query = query.eq('userId', userId);
    }

    if (licenseId) {
      query = query.eq('licenseId', licenseId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: userLicenses, error, count } = await query;

    if (error) {
      console.error('Error fetching user licenses:', error);
      return NextResponse.json({ error: 'Failed to fetch user licenses' }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({ 
      userLicenses,
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
    const validatedData = assignLicenseSchema.parse(body);

    // Verify user exists
    const { data: targetUser, error: userError } = await supabase
      .from('users')
      .select('id, email, fullName')
      .eq('id', validatedData.userId)
      .single();

    if (userError) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify license exists and get details
    const { data: license, error: licenseError } = await supabase
      .from('software_licenses')
      .select(`
        *,
        product:products(id, name, slug)
      `)
      .eq('id', validatedData.licenseId)
      .single();

    if (licenseError) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 });
    }

    if (!license.isActive) {
      return NextResponse.json({ error: 'License is not active' }, { status: 400 });
    }

    // Check if user already has this license
    const { data: existing, error: checkError } = await supabase
      .from('user_licenses')
      .select('id, status')
      .eq('userId', validatedData.userId)
      .eq('licenseId', validatedData.licenseId)
      .eq('status', 'active')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing license:', checkError);
      return NextResponse.json({ error: 'Failed to validate license assignment' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: 'User already has an active license for this product' }, { status: 400 });
    }

    // Calculate expiration date
    let expiresAt = validatedData.expiresAt;
    if (!expiresAt && license.durationDays) {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + license.durationDays);
      expiresAt = expDate.toISOString();
    }

    // Generate activation key
    const activationKey = generateActivationKey();

    // Create user license assignment
    const { data: userLicense, error } = await supabase
      .from('user_licenses')
      .insert([{
        userId: validatedData.userId,
        licenseId: validatedData.licenseId,
        activationKey,
        status: 'active',
        activatedAt: new Date().toISOString(),
        expiresAt,
        deviceAssignments: [],
      }])
      .select(`
        *,
        user:users(id, email, fullName),
        license:software_licenses(
          id, 
          name, 
          type, 
          maxDevices,
          product:products(id, name, slug)
        )
      `)
      .single();

    if (error) {
      console.error('Error creating user license:', error);
      return NextResponse.json({ error: 'Failed to assign license' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'CREATE',
        resourceType: 'user_license',
        resourceId: userLicense.id,
        details: { 
          userId: targetUser.id,
          userEmail: targetUser.email,
          licenseName: license.name,
          productName: license.product.name,
          activationKey
        },
      }]);

    return NextResponse.json({ userLicense }, { status: 201 });
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

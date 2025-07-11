import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const createCategorySchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  parentId: z.string().uuid().optional(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().min(0).default(0),
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
    const includeInactive = url.searchParams.get('includeInactive') === 'true';
    const parentId = url.searchParams.get('parentId');

    let query = supabase
      .from('product_categories')
      .select(`
        *,
        parent:parentId(id, name, slug),
        children:product_categories!parentId(id, name, slug, isActive)
      `)
      .order('sortOrder', { ascending: true })
      .order('name', { ascending: true });

    if (!includeInactive) {
      query = query.eq('isActive', true);
    }

    if (parentId) {
      query = query.eq('parentId', parentId);
    } else if (parentId !== 'all') {
      query = query.is('parentId', null);
    }

    const { data: categories, error } = await query;

    if (error) {
      console.error('Error fetching categories:', error);
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }

    return NextResponse.json({ categories });
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
    const validatedData = createCategorySchema.parse(body);

    // Check if slug is unique
    const { data: existing, error: checkError } = await supabase
      .from('product_categories')
      .select('id')
      .eq('slug', validatedData.slug)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking slug uniqueness:', checkError);
      return NextResponse.json({ error: 'Failed to validate category' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 });
    }

    // Create category
    const { data: category, error } = await supabase
      .from('product_categories')
      .insert([validatedData])
      .select(`
        *,
        parent:parentId(id, name, slug)
      `)
      .single();

    if (error) {
      console.error('Error creating category:', error);
      return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'CREATE',
        resourceType: 'product_category',
        resourceId: category.id,
        details: { name: category.name, slug: category.slug },
      }]);

    return NextResponse.json({ category }, { status: 201 });
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

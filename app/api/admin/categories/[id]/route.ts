import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const updateCategorySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  parentId: z.string().uuid().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().min(0).optional(),
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

    const { data: category, error } = await supabase
      .from('product_categories')
      .select(`
        *,
        parent:parentId(id, name, slug),
        children:product_categories!parentId(id, name, slug, isActive),
        products:product_category_assignments(
          productId,
          isPrimary,
          product:products(id, name, slug, price)
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      console.error('Error fetching category:', error);
      return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }

    return NextResponse.json({ category });
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
    const validatedData = updateCategorySchema.parse(body);

    // Check if slug is unique (if being updated)
    if (validatedData.slug) {
      const { data: existing, error: checkError } = await supabase
        .from('product_categories')
        .select('id')
        .eq('slug', validatedData.slug)
        .neq('id', params.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking slug uniqueness:', checkError);
        return NextResponse.json({ error: 'Failed to validate category' }, { status: 500 });
      }

      if (existing) {
        return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 });
      }
    }

    // Update category
    const { data: category, error } = await supabase
      .from('product_categories')
      .update(validatedData)
      .eq('id', params.id)
      .select(`
        *,
        parent:parentId(id, name, slug)
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      console.error('Error updating category:', error);
      return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'UPDATE',
        resourceType: 'product_category',
        resourceId: category.id,
        details: { 
          updated: validatedData,
          name: category.name,
          slug: category.slug 
        },
      }]);

    return NextResponse.json({ category });
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

    // Check if category has children
    const { data: children, error: childError } = await supabase
      .from('product_categories')
      .select('id')
      .eq('parentId', params.id);

    if (childError) {
      console.error('Error checking children:', childError);
      return NextResponse.json({ error: 'Failed to validate deletion' }, { status: 500 });
    }

    if (children && children.length > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete category with subcategories. Please delete or move subcategories first.' 
      }, { status: 400 });
    }

    // Check if category has products
    const { data: products, error: productError } = await supabase
      .from('product_category_assignments')
      .select('id')
      .eq('categoryId', params.id);

    if (productError) {
      console.error('Error checking products:', productError);
      return NextResponse.json({ error: 'Failed to validate deletion' }, { status: 500 });
    }

    if (products && products.length > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete category with products. Please remove or reassign products first.' 
      }, { status: 400 });
    }

    // Get category info for logging
    const { data: category, error: fetchError } = await supabase
      .from('product_categories')
      .select('name, slug')
      .eq('id', params.id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      console.error('Error fetching category:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }

    // Delete category
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting category:', error);
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'DELETE',
        resourceType: 'product_category',
        resourceId: params.id,
        details: { 
          name: category.name,
          slug: category.slug 
        },
      }]);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { validateAdminUser } from '@/lib/api-utils';

const assignCategoriesSchema = z.object({
  productId: z.string().uuid(),
  categoryIds: z.array(z.string().uuid()),
});

const bulkAssignSchema = z.object({
  productIds: z.array(z.string().uuid()),
  categoryIds: z.array(z.string().uuid()),
  action: z.enum(['add', 'remove', 'replace']),
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
    const productId = url.searchParams.get('productId');
    const categoryId = url.searchParams.get('categoryId');

    if (productId) {
      // Get categories for a specific product
      const { data: assignments, error } = await supabase
        .from('product_category_assignments')
        .select(`
          id,
          categoryId,
          assignedAt,
          category:product_categories(
            id,
            name,
            slug,
            description,
            parentId
          )
        `)
        .eq('productId', productId)
        .order('assignedAt', { ascending: false });

      if (error) {
        console.error('Error fetching product categories:', error);
        return NextResponse.json({ error: 'Failed to fetch product categories' }, { status: 500 });
      }

      return NextResponse.json({ assignments });
    } else if (categoryId) {
      // Get products for a specific category
      const { data: assignments, error } = await supabase
        .from('product_category_assignments')
        .select(`
          id,
          productId,
          assignedAt,
          product:products(
            id,
            name,
            slug,
            description,
            price,
            isActive
          )
        `)
        .eq('categoryId', categoryId)
        .order('assignedAt', { ascending: false });

      if (error) {
        console.error('Error fetching category products:', error);
        return NextResponse.json({ error: 'Failed to fetch category products' }, { status: 500 });
      }

      return NextResponse.json({ assignments });
    } else {
      // Get all assignments with pagination
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const offset = (page - 1) * limit;

      const { data: assignments, error, count } = await supabase
        .from('product_category_assignments')
        .select(`
          id,
          productId,
          categoryId,
          assignedAt,
          product:products(
            id,
            name,
            slug,
            price
          ),
          category:product_categories(
            id,
            name,
            slug
          )
        `, { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('assignedAt', { ascending: false });

      if (error) {
        console.error('Error fetching assignments:', error);
        return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return NextResponse.json({
        assignments,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages
        }
      });
    }
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
    const { productId, categoryIds } = assignCategoriesSchema.parse(body);

    // Remove existing assignments for this product
    await supabase
      .from('product_category_assignments')
      .delete()
      .eq('productId', productId);

    // Add new assignments
    const assignments = categoryIds.map(categoryId => ({
      productId,
      categoryId,
      assignedAt: new Date().toISOString(),
    }));

    const { data: newAssignments, error } = await supabase
      .from('product_category_assignments')
      .insert(assignments)
      .select(`
        id,
        categoryId,
        assignedAt,
        category:product_categories(
          id,
          name,
          slug,
          description
        )
      `);

    if (error) {
      console.error('Error creating assignments:', error);
      return NextResponse.json({ error: 'Failed to assign categories' }, { status: 500 });
    }

    // Log admin action
    await supabase
      .from('admin_action_logs')
      .insert([{
        adminUserId: user.id,
        actionType: 'UPDATE',
        resourceType: 'product_category_assignment',
        resourceId: productId,
        details: {
          productId,
          assignedCategories: categoryIds.length,
          categoryIds
        },
      }]);

    return NextResponse.json({ assignments: newAssignments }, { status: 201 });
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
    const { productIds, categoryIds, action } = bulkAssignSchema.parse(body);

    let results = [];

    for (const productId of productIds) {
      if (action === 'replace') {
        // Remove existing assignments
        await supabase
          .from('product_category_assignments')
          .delete()
          .eq('productId', productId);

        // Add new assignments
        if (categoryIds.length > 0) {
          const assignments = categoryIds.map(categoryId => ({
            productId,
            categoryId,
            assignedAt: new Date().toISOString(),
          }));

          const { data: newAssignments, error } = await supabase
            .from('product_category_assignments')
            .insert(assignments)
            .select();

          if (!error) {
            results.push({ productId, action: 'replaced', count: newAssignments.length });
          }
        } else {
          results.push({ productId, action: 'cleared', count: 0 });
        }
      } else if (action === 'add') {
        // Add new assignments (ignore duplicates)
        const assignments = categoryIds.map(categoryId => ({
          productId,
          categoryId,
          assignedAt: new Date().toISOString(),
        }));

        const { data: newAssignments, error } = await supabase
          .from('product_category_assignments')
          .upsert(assignments, { 
            onConflict: 'productId,categoryId',
            ignoreDuplicates: true
          })
          .select();

        if (!error) {
          results.push({ productId, action: 'added', count: newAssignments.length });
        }
      } else if (action === 'remove') {
        // Remove specific assignments
        const { error } = await supabase
          .from('product_category_assignments')
          .delete()
          .eq('productId', productId)
          .in('categoryId', categoryIds);

        if (!error) {
          results.push({ productId, action: 'removed', count: categoryIds.length });
        }
      }

      // Log admin action
      await supabase
        .from('admin_action_logs')
        .insert([{
          adminUserId: user.id,
          actionType: 'BULK_UPDATE',
          resourceType: 'product_category_assignment',
          resourceId: productId,
          details: {
            action,
            productId,
            categoryIds,
            categoryCount: categoryIds.length
          },
        }]);
    }

    return NextResponse.json({ 
      message: `Bulk ${action} completed for ${productIds.length} products`,
      results 
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

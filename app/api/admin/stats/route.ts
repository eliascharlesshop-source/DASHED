import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { validateAdminUser } from '@/lib/api-utils';

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
    const timeRange = url.searchParams.get('timeRange') || '30'; // days

    const daysAgo = parseInt(timeRange);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    // Get basic counts
    const [
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      totalLicenses,
      recentOrders,
      ordersByStatus,
      revenueData,
      topProducts,
      userGrowth
    ] = await Promise.all([
      // Total users
      supabase.from('users').select('id', { count: 'exact', head: true }),
      
      // Total products
      supabase.from('products').select('id', { count: 'exact', head: true }),
      
      // Total categories
      supabase.from('product_categories').select('id', { count: 'exact', head: true }),
      
      // Total orders in time range
      supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .gte('createdAt', startDate.toISOString()),
      
      // Total licenses
      supabase.from('software_licenses').select('id', { count: 'exact', head: true }),
      
      // Recent orders
      supabase
        .from('orders')
        .select(`
          id,
          status,
          total,
          createdAt,
          user:users(email, fullName)
        `)
        .gte('createdAt', startDate.toISOString())
        .order('createdAt', { ascending: false })
        .limit(10),
      
      // Orders by status
      supabase
        .from('orders')
        .select('status', { count: 'exact' })
        .gte('createdAt', startDate.toISOString()),
      
      // Revenue data
      supabase
        .from('orders')
        .select('total, createdAt')
        .gte('createdAt', startDate.toISOString())
        .not('status', 'in', '(cancelled,refunded)'),
      
      // Top products by order count
      supabase
        .from('order_items')
        .select(`
          productId,
          quantity,
          product:products(name, slug),
          order:orders!inner(createdAt)
        `)
        .gte('order.createdAt', startDate.toISOString()),
      
      // User growth over time
      supabase
        .from('users')
        .select('createdAt')
        .gte('createdAt', startDate.toISOString())
        .order('createdAt', { ascending: true })
    ]);

    // Process orders by status
    const statusCounts = ordersByStatus.data?.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {}) || {};

    // Process revenue data by day
    const dailyRevenue: { [key: string]: number } = {};
    revenueData.data?.forEach((order: any) => {
      const date = new Date(order.createdAt).toISOString().split('T')[0];
      dailyRevenue[date] = (dailyRevenue[date] || 0) + parseFloat(order.total);
    });

    // Process top products
    const productSales: { [key: string]: { name: string; slug: string; quantity: number; orders: number } } = {};
    topProducts.data?.forEach((item: any) => {
      const productId = item.productId;
      if (!productSales[productId]) {
        productSales[productId] = {
          name: item.product.name,
          slug: item.product.slug,
          quantity: 0,
          orders: 0
        };
      }
      productSales[productId].quantity += item.quantity;
      productSales[productId].orders += 1;
    });

    const topProductsList = Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    // Process user growth
    const dailySignups: { [key: string]: number } = {};
    userGrowth.data?.forEach((user: any) => {
      const date = new Date(user.createdAt).toISOString().split('T')[0];
      dailySignups[date] = (dailySignups[date] || 0) + 1;
    });

    // Calculate totals and growth
    const totalRevenue = Object.values(dailyRevenue).reduce((sum, val) => sum + val, 0);
    const avgOrderValue = totalOrders.count ? totalRevenue / totalOrders.count : 0;

    const stats = {
      overview: {
        totalUsers: totalUsers.count || 0,
        totalProducts: totalProducts.count || 0,
        totalCategories: totalCategories.count || 0,
        totalOrders: totalOrders.count || 0,
        totalLicenses: totalLicenses.count || 0,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        avgOrderValue: Math.round(avgOrderValue * 100) / 100,
      },
      ordersByStatus: statusCounts,
      recentOrders: recentOrders.data || [],
      dailyRevenue,
      dailySignups,
      topProducts: topProductsList,
      timeRange: daysAgo,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

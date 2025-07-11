import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';

export const GET = withErrorHandling(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30';

    // Mock analytics data - in production this would come from your analytics database
    const mockAnalytics = {
      timeRange: parseInt(timeRange),
      metrics: {
        totalRevenue: 45287.50,
        totalOrders: 156,
        totalUsers: 1247,
        conversionRate: 3.2,
        averageOrderValue: 290.31,
        returnCustomerRate: 18.5,
      },
      revenueByDay: generateDailyData(parseInt(timeRange)),
      topProducts: [
        {
          id: '1',
          name: 'DASHED Hub Pro',
          revenue: 12450.75,
          quantity: 42,
          growth: 12.5,
        },
        {
          id: '2',
          name: 'DASHED Display 4K',
          revenue: 8975.20,
          quantity: 45,
          growth: 8.2,
        },
        {
          id: '3',
          name: 'DASHED Controller Wireless',
          revenue: 5680.15,
          quantity: 71,
          growth: -2.1,
        },
        {
          id: '4',
          name: 'DASHED Dock Station',
          revenue: 3240.80,
          quantity: 36,
          growth: 15.7,
        },
        {
          id: '5',
          name: 'DASHED Software Suite',
          revenue: 2890.45,
          quantity: 29,
          growth: 5.3,
        },
      ],
      customerSegments: [
        {
          segment: 'New Customers',
          count: 892,
          revenue: 18750.30,
          percentage: 41.4,
        },
        {
          segment: 'Returning Customers',
          count: 234,
          revenue: 15420.80,
          percentage: 34.1,
        },
        {
          segment: 'VIP Customers',
          count: 89,
          revenue: 8950.20,
          percentage: 19.8,
        },
        {
          segment: 'Enterprise',
          count: 32,
          revenue: 2166.20,
          percentage: 4.7,
        },
      ],
      trafficSources: [
        {
          source: 'Organic Search',
          visitors: 15420,
          conversions: 494,
          revenue: 18750.30,
        },
        {
          source: 'Direct',
          visitors: 8950,
          conversions: 287,
          revenue: 12450.75,
        },
        {
          source: 'Social Media',
          visitors: 5680,
          conversions: 114,
          revenue: 5680.15,
        },
        {
          source: 'Email',
          visitors: 3240,
          conversions: 97,
          revenue: 4890.25,
        },
        {
          source: 'Paid Ads',
          visitors: 2890,
          conversions: 81,
          revenue: 3516.05,
        },
      ],
    };

    return NextResponse.json({
      success: true,
      analytics: mockAnalytics,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
});

function generateDailyData(days: number) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 2000) + 500,
      orders: Math.floor(Math.random() * 20) + 5,
    });
  }
  
  return data;
}

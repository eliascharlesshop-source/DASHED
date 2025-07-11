import { NextRequest, NextResponse } from 'next/server';

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    database: 'healthy' | 'unhealthy';
    memory: 'healthy' | 'unhealthy';
    disk: 'healthy' | 'unhealthy';
  };
  environment: string;
  nodeVersion: string;
  platform: string;
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Get system information
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const version = process.env.NEXT_PUBLIC_APP_VERSION || '1.1.0';
    const environment = process.env.NODE_ENV || 'development';
    
    // Check memory usage (healthy if under 80% of heap limit)
    const memoryHealthy = memoryUsage.heapUsed / memoryUsage.heapTotal < 0.8;
    
    // Database health check (simplified - would connect to Supabase in real implementation)
    let databaseHealthy = true;
    try {
      // In a real implementation, you would test the database connection here
      // const { data, error } = await supabase.from('health_check').select('*').limit(1);
      // databaseHealthy = !error;
    } catch (error) {
      databaseHealthy = false;
    }
    
    // Disk health check (simplified)
    const diskHealthy = true; // Would check disk space in real implementation
    
    // Determine overall status
    let overallStatus: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';
    if (!databaseHealthy) {
      overallStatus = 'unhealthy';
    } else if (!memoryHealthy || !diskHealthy) {
      overallStatus = 'degraded';
    }
    
    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version,
      uptime: Math.floor(uptime),
      checks: {
        database: databaseHealthy ? 'healthy' : 'unhealthy',
        memory: memoryHealthy ? 'healthy' : 'unhealthy',
        disk: diskHealthy ? 'healthy' : 'unhealthy',
      },
      environment,
      nodeVersion: process.version,
      platform: process.platform,
    };
    
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json(
      {
        ...healthStatus,
        responseTime: `${responseTime}ms`,
      },
      {
        status: overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        responseTime: `${Date.now() - startTime}ms`,
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  }
}

export async function HEAD(request: NextRequest) {
  // Lightweight health check for load balancers
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

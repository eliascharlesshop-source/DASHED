import { NextRequest, NextResponse } from 'next/server';
import { InstallationProfile, InstallationProgress } from '@/lib/installation';
import { createApiResponse, createErrorResponse, validateUser } from '@/lib/api-utils';

/**
 * GET /api/installations
 * List all installations for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Mock data for installations
    const installations: InstallationProgress[] = [
      {
        installation_id: 'inst_001',
        status: 'completed',
        current_step: 6,
        total_steps: 6,
        percent_complete: 100,
        estimated_remaining_minutes: 0,
        current_phase: 'Installation Complete',
        log_entries: [
          {
            timestamp: new Date(),
            level: 'info',
            message: 'DashedOS successfully installed'
          }
        ],
        started_at: new Date(Date.now() - 30 * 60 * 1000),
        completed_at: new Date()
      }
    ];

    return NextResponse.json(
      createApiResponse({
        installations,
        total_count: 1,
        has_more: false
      }, 'Installations retrieved successfully')
    );
  } catch (error) {
    console.error('Error fetching installations:', error);
    return createErrorResponse(error instanceof Error ? error : new Error('Failed to fetch installations'), 500);
  }
}

/**
 * POST /api/installations
 * Start a new installation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const installationId = `inst_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json(
      createApiResponse({
        installation_id: installationId,
        status: 'preparing',
        estimated_duration_minutes: 15,
        progress_url: `/api/installations/${installationId}/progress`
      }, 'Installation started successfully'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error starting installation:', error);
    return createErrorResponse(error instanceof Error ? error : new Error('Failed to start installation'), 500);
  }
}

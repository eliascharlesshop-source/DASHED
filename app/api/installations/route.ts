import { NextRequest, NextResponse } from 'next/server';
import { InstallationProfile, InstallationProgress, CloudHostedImage } from '@/lib/installation';
import { validateRequest, requireAuth, logAction } from '@/lib/api-utils';

/**
 * GET /api/installations
 * List all installations for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request);
    
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

    await logAction(session.user.id, 'LIST_INSTALLATIONS', { status, limit, offset });

    return NextResponse.json({
      installations,
      total_count: 1,
      has_more: false
    });
  } catch (error) {
    console.error('Error fetching installations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch installations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/installations
 * Start a new installation
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(request);
    const body = await request.json();

    const validation = validateRequest(body, {
      profile_type: 'string',
      target_os: 'string',
      system_info: 'object',
      configuration: 'object'
    });

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: validation.errors },
        { status: 400 }
      );
    }

    const installationId = `inst_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    await logAction(session.user.id, 'START_INSTALLATION', {
      profile_type: body.profile_type,
      target_os: body.target_os
    });

    return NextResponse.json({
      installation_id: installationId,
      status: 'preparing',
      estimated_duration_minutes: 15,
      progress_url: `/api/installations/${installationId}/progress`
    });
  } catch (error) {
    console.error('Error starting installation:', error);
    return NextResponse.json(
      { error: 'Failed to start installation' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { MigrationProgress, MigrationStatus } from '@/lib/installation';
import { createApiResponse, createErrorResponse } from '@/lib/api-utils';

/**
 * GET /api/migrations
 * List all migrations for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Mock migration data
    const migrations: MigrationProgress[] = [
      {
        migration_id: 'mig_001',
        status: 'completed' as MigrationStatus,
        current_phase: 'Post-Migration Validation',
        percent_complete: 100,
        items_processed: 2450,
        items_total: 2450,
        bytes_transferred: 824633720832,
        bytes_total: 824633720832,
        estimated_remaining_minutes: 0,
        errors: [],
        created_backups: [
          {
            backup_id: 'bak_001',
            type: 'pre_migration',
            location: '/backups/pre_mig_001',
            size_gb: 256,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            retention_days: 30,
            encrypted: true,
            verified: true
          }
        ],
        validation_results: [
          {
            validation_type: 'post_migration',
            status: 'passed',
            checks_passed: 156,
            checks_failed: 0,
            checks_warning: 3,
            details: [],
            timestamp: new Date()
          }
        ]
      }
    ];

    return NextResponse.json(
      createApiResponse({
        migrations,
        total_count: 1,
        has_more: false
      }, 'Migrations retrieved successfully')
    );
  } catch (error) {
    console.error('Error fetching migrations:', error);
    return createErrorResponse(error instanceof Error ? error : new Error('Failed to fetch migrations'), 500);
  }
}

/**
 * POST /api/migrations
 * Start a new migration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate migration parameters
    if (!['full_system', 'data_only', 'partial', 'selective'].includes(body.migration_type)) {
      return NextResponse.json(
        createApiResponse(null, 'Invalid migration type', false),
        { status: 400 }
      );
    }

    const migrationId = `mig_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json(
      createApiResponse({
        migration_id: migrationId,
        status: 'planning',
        created_at: new Date(),
        estimated_start: body.schedule?.start_time || new Date(),
        progress_url: `/api/migrations/${migrationId}/progress`
      }, 'Migration started successfully'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error starting migration:', error);
    return createErrorResponse(error instanceof Error ? error : new Error('Failed to start migration'), 500);
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';

export const GET = withErrorHandling(async (request: NextRequest) => {
  try {
    // Mock settings data - in production this would come from your database
    const mockSettings = {
      general: {
        siteName: 'DASHED',
        siteDescription: 'Comprehensive admin management platform built with Next.js 15, TypeScript, and Supabase',
        adminEmail: 'admin@dashed.com',
        timezone: 'America/New_York',
        defaultCurrency: 'USD',
        maintenanceMode: false,
      },
      security: {
        twoFactorRequired: false,
        sessionTimeout: 60,
        maxLoginAttempts: 5,
        passwordMinLength: 8,
        requirePasswordChange: false,
      },
      notifications: {
        emailNotifications: true,
        orderNotifications: true,
        supportTicketNotifications: true,
        systemAlerts: true,
        marketingEmails: false,
      },
      payment: {
        stripeEnabled: true,
        paypalEnabled: false,
        cryptoEnabled: false,
        taxRate: 8.25,
        shippingFee: 9.99,
      },
      inventory: {
        lowStockThreshold: 10,
        autoRestockEnabled: false,
        trackInventory: true,
        allowBackorders: false,
      },
    };

    return NextResponse.json({
      success: true,
      settings: mockSettings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
});

export const PUT = withErrorHandling(async (request: NextRequest) => {
  try {
    const settings = await request.json();

    // In a real application, this would update the database
    // For now, we'll just validate and return success
    
    // Basic validation
    if (!settings.general?.siteName) {
      return NextResponse.json(
        { success: false, error: 'Site name is required' },
        { status: 400 }
      );
    }

    if (!settings.general?.adminEmail) {
      return NextResponse.json(
        { success: false, error: 'Admin email is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      settings,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
});

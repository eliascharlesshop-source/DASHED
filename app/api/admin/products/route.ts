import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';

export const GET = withErrorHandling(async (request: NextRequest) => {
  try {
    // In a real application, this would fetch from the database
    // For now, we'll return mock data to demonstrate the functionality
    const mockProducts = [
      {
        id: '1',
        name: 'DASHED Hub Pro',
        slug: 'dashed-hub-pro',
        description: 'Advanced smart home controller with AI capabilities',
        price: 299.99,
        sku: 'DHP-001',
        stockQuantity: 45,
        categoryId: 'cat-1',
        category: { name: 'Smart Controllers' },
        isActive: true,
        isFeatured: true,
        weight: 2.5,
        dimensions: '8" x 6" x 2"',
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'DASHED Display 4K',
        slug: 'dashed-display-4k',
        description: 'Ultra HD smart display for monitoring and control',
        price: 199.99,
        sku: 'DD4K-001',
        stockQuantity: 23,
        categoryId: 'cat-2',
        category: { name: 'Displays' },
        isActive: true,
        isFeatured: false,
        weight: 3.2,
        dimensions: '12" x 8" x 1"',
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'DASHED Dock Station',
        slug: 'dashed-dock-station',
        description: 'Multi-port charging and data hub',
        price: 89.99,
        sku: 'DDS-001',
        stockQuantity: 0,
        categoryId: 'cat-3',
        category: { name: 'Accessories' },
        isActive: true,
        isFeatured: false,
        weight: 1.8,
        dimensions: '6" x 4" x 2"',
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'DASHED Controller Wireless',
        slug: 'dashed-controller-wireless',
        description: 'Ergonomic wireless controller for smart home systems',
        price: 79.99,
        sku: 'DCW-001',
        stockQuantity: 8,
        categoryId: 'cat-3',
        category: { name: 'Accessories' },
        isActive: true,
        isFeatured: true,
        weight: 0.8,
        dimensions: '5" x 3" x 1"',
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      products: mockProducts,
      total: mockProducts.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products',
        products: [],
        total: 0
      },
      { status: 500 }
    );
  }
});

export const POST = withErrorHandling(async (request: NextRequest) => {
  try {
    const productData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'sku', 'stockQuantity'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Generate slug from name
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // In a real application, this would save to the database
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...productData,
      slug,
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
});

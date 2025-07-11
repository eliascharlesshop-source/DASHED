import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';

export const GET = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // In a real application, this would fetch from the database
    // For now, we'll return mock data based on the ID
    const mockProduct = {
      id,
      name: `Product ${id}`,
      slug: `product-${id}`,
      description: 'Sample product description',
      price: 99.99,
      sku: `SKU-${id}`,
      stockQuantity: 10,
      categoryId: 'cat-1',
      category: { name: 'Sample Category' },
      isActive: true,
      isFeatured: false,
      weight: 1.0,
      dimensions: '4" x 4" x 1"',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      product: mockProduct,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
});

export const PUT = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const productData = await request.json();

    // In a real application, this would update the database
    const updatedProduct = {
      id,
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
});

export const DELETE = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // In a real application, this would delete from the database
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
});

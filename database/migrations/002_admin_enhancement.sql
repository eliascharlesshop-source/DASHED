-- Product Categories Schema Enhancement
-- This adds hierarchical category support for better product organization

CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Software Licenses Foundation Schema
-- Preparing for license management system

CREATE TABLE IF NOT EXISTS software_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('perpetual', 'subscription', 'trial', 'freemium')),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  description TEXT,
  features JSONB DEFAULT '[]',
  duration_days INTEGER, -- NULL for perpetual licenses
  max_devices INTEGER DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User License Assignments
-- Track which users have which licenses

CREATE TABLE IF NOT EXISTS user_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  license_id UUID REFERENCES software_licenses(id) ON DELETE CASCADE,
  activation_key TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired', 'revoked')),
  activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  device_assignments JSONB DEFAULT '[]', -- Array of device IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Order Status History
-- Track order status changes and admin notes

CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  tracking_number TEXT,
  admin_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Support Tickets with Assignment
-- Add assignment and internal notes

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS internal_notes TEXT,
ADD COLUMN IF NOT EXISTS resolution_notes TEXT,
ADD COLUMN IF NOT EXISTS estimated_resolution TIMESTAMP WITH TIME ZONE;

-- Product Categories Junction Table
-- Support many-to-many relationship between products and categories

CREATE TABLE IF NOT EXISTS product_category_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, category_id)
);

-- Admin Action Logs
-- Track admin actions for audit purposes

CREATE TABLE IF NOT EXISTS admin_action_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Products Table
-- Add fields for better product management

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS weight DECIMAL(8,3), -- in kg
ADD COLUMN IF NOT EXISTS dimensions JSONB, -- {length, width, height}
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_product_categories_parent_id ON product_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_software_licenses_product_id ON software_licenses(product_id);
CREATE INDEX IF NOT EXISTS idx_user_licenses_user_id ON user_licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_licenses_license_id ON user_licenses(license_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_product_category_assignments_product_id ON product_category_assignments(product_id);
CREATE INDEX IF NOT EXISTS idx_product_category_assignments_category_id ON product_category_assignments(category_id);
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_admin_user_id ON admin_action_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_resource ON admin_action_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);

-- Sample Data for Product Categories
INSERT INTO product_categories (name, slug, description, sort_order) VALUES
('Hardware', 'hardware', 'Physical DASHED OS devices and accessories', 1),
('Software', 'software', 'DASHED OS software licenses and applications', 2),
('Accessories', 'accessories', 'Compatible accessories and add-ons', 3),
('Enterprise', 'enterprise', 'Enterprise-grade solutions and services', 4)
ON CONFLICT (slug) DO NOTHING;

-- Sample Sub-categories
INSERT INTO product_categories (name, slug, description, parent_id, sort_order) 
SELECT 
  'Control Units', 'control-units', 'Central control devices', id, 1
FROM product_categories WHERE slug = 'hardware'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_categories (name, slug, description, parent_id, sort_order) 
SELECT 
  'Displays', 'displays', 'Touchscreen displays and monitors', id, 2  
FROM product_categories WHERE slug = 'hardware'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO product_categories (name, slug, description, parent_id, sort_order) 
SELECT 
  'Controllers', 'controllers', 'Input devices and controllers', id, 3
FROM product_categories WHERE slug = 'hardware'
ON CONFLICT (slug) DO NOTHING;

-- Row Level Security Policies
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE software_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_category_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_action_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Public can view active categories" ON product_categories
  FOR SELECT USING (is_active = true);

-- Admin access for all category operations
CREATE POLICY "Admins can manage categories" ON product_categories
  USING (auth.jwt() ->> 'role' = 'admin');

-- Public read access for licenses
CREATE POLICY "Public can view active licenses" ON software_licenses
  FOR SELECT USING (is_active = true);

-- Admin access for license management
CREATE POLICY "Admins can manage licenses" ON software_licenses
  USING (auth.jwt() ->> 'role' = 'admin');

-- Users can view their own licenses
CREATE POLICY "Users can view own licenses" ON user_licenses
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can manage all licenses
CREATE POLICY "Admins can manage user licenses" ON user_licenses
  USING (auth.jwt() ->> 'role' = 'admin');

-- Users can view order history for their orders
CREATE POLICY "Users can view order history" ON order_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_status_history.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Admins can manage order history
CREATE POLICY "Admins can manage order history" ON order_status_history
  USING (auth.jwt() ->> 'role' = 'admin');

-- Public read access for product categories
CREATE POLICY "Public can view product categories" ON product_category_assignments
  FOR SELECT TO anon USING (true);

-- Admins can manage product categories
CREATE POLICY "Admins can manage product categories" ON product_category_assignments
  USING (auth.jwt() ->> 'role' = 'admin');

-- Admins only for action logs
CREATE POLICY "Admins can view action logs" ON admin_action_logs
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can create action logs" ON admin_action_logs
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');

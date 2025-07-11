-- Performance optimization indexes for Patch 1 admin features
-- These indexes will significantly improve query performance for admin operations

-- Indexes for product_categories table
CREATE INDEX IF NOT EXISTS idx_product_categories_parent_id ON product_categories(parentId);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_is_featured ON product_categories(isFeatured);
CREATE INDEX IF NOT EXISTS idx_product_categories_active_featured ON product_categories(isActive, isFeatured);

-- Indexes for software_licenses table
CREATE INDEX IF NOT EXISTS idx_software_licenses_active ON software_licenses(isActive);
CREATE INDEX IF NOT EXISTS idx_software_licenses_expires_at ON software_licenses(expiresAt);
CREATE INDEX IF NOT EXISTS idx_software_licenses_active_expires ON software_licenses(isActive, expiresAt);

-- Indexes for user_licenses table
CREATE INDEX IF NOT EXISTS idx_user_licenses_user_id ON user_licenses(userId);
CREATE INDEX IF NOT EXISTS idx_user_licenses_license_id ON user_licenses(licenseId);
CREATE INDEX IF NOT EXISTS idx_user_licenses_active ON user_licenses(isActive);
CREATE INDEX IF NOT EXISTS idx_user_licenses_expires_at ON user_licenses(expiresAt);
CREATE INDEX IF NOT EXISTS idx_user_licenses_user_active ON user_licenses(userId, isActive);
CREATE INDEX IF NOT EXISTS idx_user_licenses_license_active ON user_licenses(licenseId, isActive);

-- Indexes for order_status_history table
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(orderId);
CREATE INDEX IF NOT EXISTS idx_order_status_history_changed_at ON order_status_history(changedAt);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_changed ON order_status_history(orderId, changedAt);

-- Indexes for product_category_assignments table
CREATE INDEX IF NOT EXISTS idx_product_category_assignments_product ON product_category_assignments(productId);
CREATE INDEX IF NOT EXISTS idx_product_category_assignments_category ON product_category_assignments(categoryId);
CREATE INDEX IF NOT EXISTS idx_product_category_assignments_assigned_at ON product_category_assignments(assignedAt);

-- Indexes for admin_action_logs table
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_admin_user ON admin_action_logs(adminUserId);
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_resource_type ON admin_action_logs(resourceType);
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_action_type ON admin_action_logs(actionType);
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_performed_at ON admin_action_logs(performedAt);
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_admin_performed ON admin_action_logs(adminUserId, performedAt);

-- Indexes for support_tickets table
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(userId);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to ON support_tickets(assignedTo);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_category ON support_tickets(category);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(createdAt);
CREATE INDEX IF NOT EXISTS idx_support_tickets_updated_at ON support_tickets(updatedAt);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status_priority ON support_tickets(status, priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_status ON support_tickets(assignedTo, status);

-- Indexes for support_ticket_responses table
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_ticket_id ON support_ticket_responses(ticketId);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_author_id ON support_ticket_responses(authorId);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_created_at ON support_ticket_responses(createdAt);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_is_internal ON support_ticket_responses(isInternal);
CREATE INDEX IF NOT EXISTS idx_support_ticket_responses_ticket_created ON support_ticket_responses(ticketId, createdAt);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders(status, createdAt);
CREATE INDEX IF NOT EXISTS idx_orders_user_status ON orders(userId, status);
CREATE INDEX IF NOT EXISTS idx_products_active_featured ON products(isActive, isFeatured);
CREATE INDEX IF NOT EXISTS idx_users_role_active ON users(role, isActive);
CREATE INDEX IF NOT EXISTS idx_users_email_active ON users(email, isActive);

-- Full-text search indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_description_trgm ON products USING gin(description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_support_tickets_subject_trgm ON support_tickets USING gin(subject gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_support_tickets_message_trgm ON support_tickets USING gin(message gin_trgm_ops);

-- Add trigram extension if not exists (for fuzzy text search)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Update table statistics for better query planning
ANALYZE product_categories;
ANALYZE software_licenses;
ANALYZE user_licenses;
ANALYZE order_status_history;
ANALYZE product_category_assignments;
ANALYZE admin_action_logs;
ANALYZE support_tickets;
ANALYZE support_ticket_responses;
ANALYZE orders;
ANALYZE products;
ANALYZE users;

-- Create materialized view for admin dashboard statistics (optional optimization)
CREATE MATERIALIZED VIEW IF NOT EXISTS admin_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM orders WHERE status = 'pending') as pending_orders,
  (SELECT COUNT(*) FROM orders WHERE status = 'completed') as completed_orders,
  (SELECT COUNT(*) FROM orders WHERE createdAt >= CURRENT_DATE - INTERVAL '30 days') as orders_last_30_days,
  (SELECT COUNT(*) FROM support_tickets WHERE status = 'open') as open_tickets,
  (SELECT COUNT(*) FROM support_tickets WHERE status = 'in_progress') as in_progress_tickets,
  (SELECT COUNT(*) FROM support_tickets WHERE createdAt >= CURRENT_DATE - INTERVAL '7 days') as tickets_last_7_days,
  (SELECT COUNT(*) FROM user_licenses WHERE isActive = true) as active_licenses,
  (SELECT COUNT(*) FROM user_licenses WHERE expiresAt <= CURRENT_DATE + INTERVAL '30 days' AND isActive = true) as expiring_licenses,
  (SELECT COUNT(*) FROM users WHERE isActive = true) as active_users,
  (SELECT COUNT(*) FROM users WHERE createdAt >= CURRENT_DATE - INTERVAL '30 days') as new_users_30_days,
  (SELECT COUNT(*) FROM products WHERE isActive = true) as active_products,
  (SELECT COUNT(*) FROM product_categories WHERE isActive = true) as active_categories,
  CURRENT_TIMESTAMP as last_updated;

-- Create index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_dashboard_stats_last_updated ON admin_dashboard_stats(last_updated);

-- Function to refresh dashboard stats (can be called periodically)
CREATE OR REPLACE FUNCTION refresh_admin_dashboard_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW admin_dashboard_stats;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE admin_dashboard_stats IS 'Materialized view containing aggregated statistics for admin dashboard performance optimization';
COMMENT ON FUNCTION refresh_admin_dashboard_stats() IS 'Function to refresh admin dashboard statistics materialized view';

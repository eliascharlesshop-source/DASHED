# DASHED Platform API - Comprehensive Reference

**Version:** 1.1.0  
**Last Updated:** 2026-07-22  
**Status:** Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Installation & Migration APIs](#installation--migration-apis)
3. [Security & Compliance APIs](#security--compliance-apis)
4. [Licensing & Subscription APIs](#licensing--subscription-apis)
5. [Hardware Management APIs](#hardware-management-apis)
6. [DashedOS Core APIs](#dashedos-core-apis)
7. [Authentication & Authorization](#authentication--authorization)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Webhook Events](#webhook-events)

---

## Overview

The DASHED Platform provides a comprehensive REST API for managing the complete DashedOS ecosystem, including licensing, hardware, security, installations, and migrations. All endpoints require authentication and support both JSON and binary data formats.

### Base URL
```
https://api.dashed.io/v1
```

### Authentication
```
Authorization: Bearer {ACCESS_TOKEN}
X-API-Key: {API_KEY}
```

---

## Installation & Migration APIs

### POST /installations/start
Start a new installation process.

**Request:**
```json
{
  "profile_type": "cloud|container|local|hardware|embedded",
  "target_os": "linux|windows|macos|custom",
  "system_info": {
    "cpu_cores": 8,
    "memory_gb": 16,
    "storage_gb": 256
  },
  "configuration": {
    "installation_path": "/opt/dashed",
    "enable_optimization": true,
    "timezone": "UTC"
  }
}
```

**Response:**
```json
{
  "installation_id": "inst_abc123xyz789",
  "status": "preparing",
  "estimated_duration_minutes": 15,
  "progress_url": "/installations/inst_abc123xyz789/progress"
}
```

### GET /installations/{installation_id}/progress
Get real-time installation progress.

**Response:**
```json
{
  "installation_id": "inst_abc123xyz789",
  "status": "extracting",
  "current_step": 3,
  "total_steps": 6,
  "percent_complete": 50,
  "estimated_remaining_minutes": 7,
  "current_phase": "Extracting system files",
  "log_entries": [
    {
      "timestamp": "2026-07-22T10:30:45Z",
      "level": "info",
      "message": "Starting installation process"
    }
  ]
}
```

### POST /installations/{installation_id}/cancel
Cancel an ongoing installation.

**Response:**
```json
{
  "installation_id": "inst_abc123xyz789",
  "status": "cancelled",
  "cancelled_at": "2026-07-22T10:35:00Z"
}
```

### GET /installations/cloud-images
List available cloud-hosted DashedOS images.

**Query Parameters:**
- `channel`: stable|beta|preview|custom (default: stable)
- `architecture`: arm64|x86_64|multi (default: multi)
- `limit`: 10-100 (default: 20)
- `offset`: 0+ (default: 0)

**Response:**
```json
{
  "images": [
    {
      "id": "img_v1_1_0_stable",
      "version": "1.1.0",
      "channel": "stable",
      "size_gb": 4.2,
      "download_url": "https://cdn.dashed.io/images/v1.1.0-stable.iso",
      "checksum_sha256": "abc123...",
      "release_date": "2026-07-01T00:00:00Z",
      "release_notes": "Latest stable release"
    }
  ],
  "total_count": 25,
  "has_more": true
}
```

### POST /installations/download-image
Download a cloud-hosted OS image with resumable download support.

**Request:**
```json
{
  "image_id": "img_v1_1_0_stable",
  "download_method": "direct|torrent|cdn|resumable",
  "parallel_connections": 4,
  "verify_checksum": true
}
```

**Response:**
```json
{
  "download_id": "dl_xyz789abc123",
  "image_id": "img_v1_1_0_stable",
  "download_url": "https://cdn-us-west.dashed.io/images/v1.1.0-stable.iso",
  "fallback_urls": ["https://cdn-eu.dashed.io/...", "https://cdn-asia.dashed.io/..."],
  "file_size_bytes": 4494967296,
  "checksum_sha256": "abc123...",
  "resumable": true,
  "estimated_time_seconds": 300,
  "cdn_region": "us-west-2"
}
```

### POST /migrations/start
Start a data migration process.

**Request:**
```json
{
  "source_system": "legacy_os",
  "target_system": "dashed_v1_1_0",
  "migration_type": "full_system|data_only|partial|selective",
  "scope": {
    "include_user_data": true,
    "include_applications": true,
    "include_settings": true,
    "include_licenses": true
  },
  "schedule": {
    "start_time": "2026-07-23T02:00:00Z",
    "duration_estimate_minutes": 120
  }
}
```

**Response:**
```json
{
  "migration_id": "mig_migration123",
  "status": "planning",
  "created_at": "2026-07-22T10:45:00Z",
  "estimated_start": "2026-07-23T02:00:00Z",
  "progress_url": "/migrations/mig_migration123/progress"
}
```

### GET /migrations/{migration_id}/progress
Get real-time migration progress.

**Response:**
```json
{
  "migration_id": "mig_migration123",
  "status": "migrating",
  "current_phase": "Migrating application data",
  "percent_complete": 65,
  "items_processed": 325,
  "items_total": 500,
  "bytes_transferred": 536870912,
  "bytes_total": 824633720832,
  "estimated_remaining_minutes": 45,
  "errors": [
    {
      "error_code": "FILE_LOCKED",
      "message": "Could not access file: /legacy/protected.db",
      "item": "/legacy/protected.db",
      "severity": "warning",
      "timestamp": "2026-07-22T11:00:00Z"
    }
  ]
}
```

### POST /migrations/{migration_id}/rollback
Rollback a completed or failed migration.

**Response:**
```json
{
  "migration_id": "mig_migration123",
  "status": "rolled_back",
  "rollback_completed_at": "2026-07-22T12:30:00Z",
  "data_restored_from_backup": "bak_backup123",
  "system_restored_to": "pre_migration_state"
}
```

---

## Security & Compliance APIs

### GET /security/framework
Get the current security framework configuration.

**Response:**
```json
{
  "version": "1.1.0",
  "compliance_level": "advanced",
  "certification_status": "certified",
  "threat_level": "medium",
  "policies_enforced": 24,
  "incidents_detected_30d": 2,
  "incident_response_time_avg_minutes": 15
}
```

### POST /security/cache-protection/enable
Enable cache timing attack protection.

**Request:**
```json
{
  "protection_types": [
    "constant_time",
    "cache_partitioning",
    "cache_line_padding"
  ],
  "effectiveness_target_percent": 95
}
```

**Response:**
```json
{
  "cache_protection_id": "cp_protection123",
  "status": "enabled",
  "enabled_protections": 3,
  "effectiveness_percent": 98,
  "performance_overhead_percent": 3.5
}
```

### GET /security/host-os-throttling
Get host OS throttling configuration.

**Response:**
```json
{
  "enabled": true,
  "resource_limits": {
    "max_cpu_percent": 40,
    "max_memory_percent": 60,
    "max_io_bandwidth_mbps": 500,
    "max_network_bandwidth_mbps": 100
  },
  "access_scheduling": {
    "scheduling_enabled": true,
    "priority_level": 3
  },
  "emergency_isolation": true
}
```

### POST /security/incident-response
Report or create a security incident.

**Request:**
```json
{
  "incident_type": "timing_attack|intrusion|malware|data_breach",
  "severity": "low|medium|high|critical",
  "description": "Detected suspicious timing patterns in cryptographic operations",
  "affected_systems": ["crypto_module", "key_derivation"],
  "evidence": ["timing_sample_001", "timing_sample_002"]
}
```

**Response:**
```json
{
  "incident_id": "inc_incident123",
  "status": "detected",
  "severity": "high",
  "auto_response_initiated": true,
  "auto_response_actions": [
    "Enabled cache line padding",
    "Increased monitoring on cryptographic operations",
    "Isolated affected components"
  ]
}
```

### GET /security/incidents/{incident_id}
Get incident details and response status.

**Response:**
```json
{
  "incident_id": "inc_incident123",
  "incident_type": "timing_attack",
  "severity": "high",
  "status": "contained",
  "detected_at": "2026-07-22T11:15:00Z",
  "contained_at": "2026-07-22T11:22:00Z",
  "response_actions": [
    {
      "action_type": "enable_cache_protection",
      "status": "completed",
      "executed_at": "2026-07-22T11:16:30Z"
    }
  ],
  "investigation_in_progress": true
}
```

### GET /security/audit-logs
Get security audit logs.

**Query Parameters:**
- `severity`: info|warning|error|critical (default: all)
- `category`: string (comma-separated, default: all)
- `start_date`: ISO 8601 date
- `end_date`: ISO 8601 date
- `limit`: 10-1000 (default: 100)

**Response:**
```json
{
  "logs": [
    {
      "timestamp": "2026-07-22T11:15:00Z",
      "severity": "info",
      "category": "security.policy",
      "message": "Cache timing protection enabled",
      "details": {
        "protection_type": "constant_time",
        "effectiveness": 98
      }
    }
  ],
  "total_count": 245,
  "has_more": true
}
```

---

## Licensing & Subscription APIs

### GET /licenses/{license_id}
Get license details.

**Response:**
```json
{
  "id": "lic_premium123",
  "type": "pro",
  "tier": "individual",
  "user_id": "usr_user123",
  "status": "active",
  "features": {
    "dasheros_core": true,
    "device_management": true,
    "iot_integration": true,
    "edge_computing": true,
    "security_suite": true,
    "ai_acceleration": true,
    "api_access": true
  },
  "limits": {
    "max_devices": 25,
    "max_users": 5,
    "max_storage_gb": 500,
    "max_api_calls_per_month": 100000,
    "max_iot_devices": 100
  },
  "billing": {
    "plan": "Pro Monthly",
    "price_monthly": 9.99,
    "price_annual": 99.99,
    "currency": "USD",
    "billing_cycle": "monthly",
    "next_billing_date": "2026-08-22T00:00:00Z",
    "auto_renewal": true
  },
  "created_at": "2026-01-15T00:00:00Z",
  "expires_at": null,
  "last_validated": "2026-07-22T10:00:00Z"
}
```

### POST /licenses/validate
Validate a license key.

**Request:**
```json
{
  "license_key": "LIC-XXXX-YYYY-ZZZZ",
  "hardware_id": "hw_device123"
}
```

**Response:**
```json
{
  "valid": true,
  "license_id": "lic_premium123",
  "license_type": "pro",
  "activation_status": "active",
  "features_enabled": 12,
  "hardware_verified": true,
  "next_validation_required": "2026-08-22T00:00:00Z"
}
```

### POST /subscriptions/upgrade
Upgrade a subscription.

**Request:**
```json
{
  "license_id": "lic_premium123",
  "target_tier": "enterprise",
  "billing_cycle": "annual",
  "promo_code": "SAVE20"
}
```

**Response:**
```json
{
  "subscription_id": "sub_upgrade123",
  "old_tier": "pro",
  "new_tier": "enterprise",
  "effective_date": "2026-07-23T00:00:00Z",
  "price_difference_prorated": -$50.00,
  "credit_applied": true,
  "confirmation_email_sent": true
}
```

### GET /usage/{license_id}
Get license usage metrics.

**Query Parameters:**
- `period`: current_month|last_month|last_90_days|custom
- `start_date`: ISO 8601 date (required if period=custom)
- `end_date`: ISO 8601 date (required if period=custom)

**Response:**
```json
{
  "license_id": "lic_premium123",
  "period_start": "2026-07-01T00:00:00Z",
  "period_end": "2026-07-22T23:59:59Z",
  "devices_connected": 8,
  "max_devices_allowed": 25,
  "device_usage_percent": 32,
  "api_calls_made": 45231,
  "max_api_calls_allowed": 100000,
  "api_usage_percent": 45.2,
  "storage_used_gb": 125.3,
  "max_storage_gb": 500,
  "storage_usage_percent": 25.1,
  "data_transferred_gb": 234.5,
  "active_users": 3,
  "compliance_score": 98,
  "forecasted_overage": false
}
```

---

## Hardware Management APIs

### GET /hardware/devices
List all registered hardware devices.

**Query Parameters:**
- `device_type`: dashedbox|dashedpad|dashedhub|dashedmicro|all (default: all)
- `status`: active|inactive|maintenance|retired (default: all)
- `limit`: 10-1000 (default: 50)

**Response:**
```json
{
  "devices": [
    {
      "device_id": "hw_device001",
      "device_type": "dashedbox",
      "serial_number": "DB-20260722-001",
      "model": "DashedBox Pro v2",
      "firmware_version": "2.1.4",
      "os_version": "1.1.0",
      "status": "active",
      "last_heartbeat": "2026-07-22T11:20:00Z",
      "license_id": "lic_premium123",
      "license_valid": true,
      "warranty_expires": "2027-07-22T00:00:00Z"
    }
  ],
  "total_count": 8,
  "has_more": false
}
```

### POST /hardware/register
Register a new hardware device.

**Request:**
```json
{
  "device_type": "dashedbox",
  "serial_number": "DB-20260722-002",
  "model": "DashedBox Pro v2",
  "hardware_specs": {
    "processor": "Custom ARM64",
    "memory_gb": 32,
    "storage_gb": 1024
  },
  "license_key": "LIC-XXXX-YYYY-ZZZZ"
}
```

**Response:**
```json
{
  "device_id": "hw_device002",
  "device_type": "dashedbox",
  "serial_number": "DB-20260722-002",
  "registration_date": "2026-07-22T11:25:00Z",
  "license_activated": true,
  "license_id": "lic_premium123",
  "next_health_check": "2026-07-22T19:25:00Z"
}
```

### GET /hardware/{device_id}/health
Get hardware health status.

**Response:**
```json
{
  "device_id": "hw_device001",
  "health_score": 92,
  "status": "healthy",
  "last_check": "2026-07-22T11:20:00Z",
  "next_check": "2026-07-22T19:20:00Z",
  "components": {
    "processor": {
      "status": "optimal",
      "temperature_c": 38,
      "utilization_percent": 22
    },
    "memory": {
      "status": "optimal",
      "used_gb": 12,
      "available_gb": 20,
      "utilization_percent": 37
    },
    "storage": {
      "status": "healthy",
      "used_gb": 412,
      "available_gb": 612,
      "utilization_percent": 40
    },
    "network": {
      "status": "connected",
      "speed_mbps": 943,
      "latency_ms": 2.5
    }
  },
  "alerts": []
}
```

---

## DashedOS Core APIs

### GET /dasheros/devices/{device_id}
Get device management information.

**Response:**
```json
{
  "device_id": "dev_001",
  "device_name": "DashedBox-Pro-01",
  "dasheros_version": "1.1.0",
  "device_type": "dashedbox",
  "status": "online",
  "health_score": 95,
  "os_performance": {
    "uptime_days": 45,
    "cpu_utilization_percent": 22,
    "memory_utilization_percent": 38,
    "disk_utilization_percent": 42
  }
}
```

### POST /dasheros/devices/{device_id}/remote-command
Execute a remote command on a device.

**Request:**
```json
{
  "command": "get_system_info",
  "parameters": {},
  "timeout_seconds": 30
}
```

**Response:**
```json
{
  "command_id": "cmd_command123",
  "device_id": "dev_001",
  "command": "get_system_info",
  "status": "executing",
  "execution_url": "/commands/cmd_command123/status"
}
```

---

## Authentication & Authorization

### POST /auth/login
Authenticate and get access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "mfa_code": "123456"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": "usr_user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /auth/refresh
Refresh an expired access token.

**Request:**
```json
{
  "refresh_token": "eyJhbGc..."
}
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "expires_in": 3600
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INSTALLATION_FAILED",
    "message": "Installation failed due to insufficient disk space",
    "details": {
      "required_gb": 50,
      "available_gb": 25
    },
    "status_code": 400,
    "request_id": "req_error123",
    "timestamp": "2026-07-22T11:30:00Z"
  }
}
```

### Common Error Codes
- `INVALID_REQUEST`: Request validation failed
- `UNAUTHORIZED`: Authentication failed
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict
- `RATE_LIMITED`: Rate limit exceeded
- `SERVER_ERROR`: Internal server error

---

## Rate Limiting

All API endpoints enforce rate limiting based on your license tier:

- **Free**: 100 requests/hour
- **Pro**: 10,000 requests/hour
- **Enterprise**: Unlimited

### Rate Limit Headers
```
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9850
X-RateLimit-Reset: 1627055400
```

---

## Webhook Events

Subscribe to events using `/webhooks/subscribe`:

### Installation Events
- `installation.started`
- `installation.progress`
- `installation.completed`
- `installation.failed`
- `installation.cancelled`

### Migration Events
- `migration.started`
- `migration.progress`
- `migration.completed`
- `migration.rolled_back`
- `migration.failed`

### Security Events
- `security.incident_detected`
- `security.incident_resolved`
- `security.policy_violation`

### Device Events
- `device.registered`
- `device.connected`
- `device.disconnected`
- `device.health_degraded`

---

**For support, contact:** support@dashed.io  
**Documentation:** https://docs.dashed.io/api

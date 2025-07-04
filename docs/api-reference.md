# DASHED OS Backend API Documentation

## Overview

This documentation covers the complete backend API for DASHED OS, a comprehensive operating system for managing connected devices, products, orders, and blockchain integrations.

## Table of Contents

- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Data Models](#data-models)
- [Examples](#examples)

## Quick Start

### Base URL
```
Production: https://your-app.vercel.app/api
Development: http://localhost:3000/api
```

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Authentication

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "message": "User registered successfully"
}
```

### POST /api/auth/login
Authenticate and receive access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt-token-here"
  },
  "message": "Login successful"
}
```

### POST /api/auth/logout
Logout and invalidate session.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## API Endpoints

### Users

#### GET /api/users
Get all users (Admin only).

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### GET /api/users/[id]
Get user profile by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "bio": "Software developer",
    "preferences": {
      "notifications": true,
      "emailUpdates": true,
      "darkMode": false
    }
  }
}
```

#### PUT /api/users/[id]
Update user profile.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "bio": "Updated bio",
  "preferences": {
    "notifications": false,
    "emailUpdates": true,
    "darkMode": true
  }
}
```

### Devices

#### GET /api/devices
Get user's devices.

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `type` (string): Filter by device type
- `status` (string): Filter by device status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "device-id",
      "name": "MacBook Pro",
      "type": "laptop",
      "status": "online",
      "configuration": {},
      "last_seen": "2023-01-01T12:00:00Z"
    }
  ]
}
```

#### POST /api/devices
Register a new device.

**Request Body:**
```json
{
  "name": "MacBook Pro",
  "type": "laptop",
  "configuration": {
    "os": "macOS",
    "version": "14.0"
  }
}
```

#### PUT /api/devices/[id]
Update device information.

#### DELETE /api/devices/[id]
Remove device.

### Products

#### GET /api/products
Get products with search and filtering.

**Query Parameters:**
- `q` (string): Search query
- `category` (string): Product category
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `inStock` (boolean): Filter by stock status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "product-id",
      "name": "DASHED Hub",
      "description": "Central control unit",
      "price": 299.99,
      "category": "hardware",
      "images": ["image1.jpg"],
      "in_stock": true,
      "rating": 4.5,
      "reviews": 128
    }
  ]
}
```

#### GET /api/products/[id]
Get product details.

### Orders

#### GET /api/orders
Get user's orders.

#### POST /api/orders
Create new order.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country"
  },
  "paymentMethod": "credit_card"
}
```

#### GET /api/orders/[id]
Get order details.

#### PUT /api/orders/[id]
Update order status (Admin only).

### Support

#### GET /api/support/tickets
Get support tickets.

#### POST /api/support/tickets
Create support ticket.

**Request Body:**
```json
{
  "subject": "Technical Issue",
  "message": "Detailed description of the issue",
  "category": "technical",
  "priority": "medium"
}
```

#### PUT /api/support/tickets/[id]
Update ticket status.

### Notifications

#### GET /api/notifications
Get user notifications.

#### PUT /api/notifications/mark-read
Mark notifications as read.

### Dashboard

#### GET /api/dashboard
Get dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "devices": {
      "total": 5,
      "online": 3,
      "offline": 2
    },
    "orders": {
      "total": 10,
      "totalValue": 999.99,
      "recent": 3
    },
    "notifications": {
      "unread": 5
    }
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "details": {
    "field": "Specific error detail"
  },
  "timestamp": "2023-01-01T00:00:00Z"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

### Common Error Types

#### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

#### Authentication Error (401)
```json
{
  "success": false,
  "error": "Authentication required"
}
```

#### Authorization Error (403)
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

#### Rate Limit Error (429)
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "details": {
    "limit": 100,
    "reset": 1640995200
  }
}
```

## Rate Limiting

Different endpoints have different rate limits:

- **Authentication**: 5 requests per 5 minutes
- **General API**: 100 requests per minute
- **File Upload**: 10 requests per minute
- **Search**: 50 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "user | admin",
  "bio": "string?",
  "company": "string?",
  "location": "string?",
  "website": "string?",
  "preferences": {
    "notifications": "boolean",
    "emailUpdates": "boolean",
    "darkMode": "boolean"
  },
  "onboarding_complete": "boolean",
  "created_at": "string",
  "updated_at": "string"
}
```

### Device
```json
{
  "id": "string",
  "user_id": "string",
  "name": "string",
  "type": "desktop | mobile | tablet | iot",
  "status": "online | offline | maintenance",
  "configuration": "object",
  "solana_address": "string?",
  "last_seen": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

### Product
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "images": "string[]",
  "features": "string[]",
  "specifications": "object",
  "in_stock": "boolean",
  "rating": "number",
  "reviews": "number",
  "created_at": "string",
  "updated_at": "string"
}
```

### Order
```json
{
  "id": "string",
  "user_id": "string",
  "items": "array",
  "total": "number",
  "status": "pending | processing | shipped | delivered | cancelled",
  "shipping_address": "object",
  "billing_address": "object",
  "payment_method": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

## Examples

### JavaScript/TypeScript Example

```typescript
const API_BASE = 'https://your-app.vercel.app/api'

class DashedAPI {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed')
    }

    return data
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    
    this.setToken(response.data.token)
    return response
  }

  async register(userData: { email: string; password: string; name: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  // Users
  async getProfile(userId: string) {
    return this.request(`/users/${userId}`)
  }

  async updateProfile(userId: string, updates: any) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  }

  // Devices
  async getDevices(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams(params as any).toString()
    return this.request(`/devices${query ? `?${query}` : ''}`)
  }

  async addDevice(deviceData: any) {
    return this.request('/devices', {
      method: 'POST',
      body: JSON.stringify(deviceData)
    })
  }

  // Products
  async getProducts(params?: { q?: string; category?: string }) {
    const query = new URLSearchParams(params as any).toString()
    return this.request(`/products${query ? `?${query}` : ''}`)
  }

  // Orders
  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  }

  async getOrders() {
    return this.request('/orders')
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard')
  }
}

// Usage example
const api = new DashedAPI()

// Login
const loginResponse = await api.login('user@example.com', 'password')
console.log('Logged in:', loginResponse.data.user)

// Get user devices
const devices = await api.getDevices({ page: 1, limit: 10 })
console.log('Devices:', devices.data)

// Create order
const order = await api.createOrder({
  items: [{ productId: 'product-id', quantity: 1 }],
  shippingAddress: { /* address data */ },
  billingAddress: { /* address data */ },
  paymentMethod: 'credit_card'
})
console.log('Order created:', order.data)
```

### Python Example

```python
import requests
from typing import Optional, Dict, Any

class DashedAPI:
    def __init__(self, base_url: str = "https://your-app.vercel.app/api"):
        self.base_url = base_url
        self.token: Optional[str] = None
    
    def set_token(self, token: str):
        self.token = token
    
    def _request(self, endpoint: str, method: str = "GET", data: Optional[Dict] = None) -> Dict[Any, Any]:
        url = f"{self.base_url}{endpoint}"
        headers = {"Content-Type": "application/json"}
        
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        
        response = requests.request(
            method=method,
            url=url,
            headers=headers,
            json=data
        )
        
        response.raise_for_status()
        return response.json()
    
    def login(self, email: str, password: str) -> Dict:
        response = self._request("/auth/login", "POST", {
            "email": email,
            "password": password
        })
        self.set_token(response["data"]["token"])
        return response
    
    def get_devices(self, page: int = 1, limit: int = 10) -> Dict:
        return self._request(f"/devices?page={page}&limit={limit}")
    
    def create_order(self, order_data: Dict) -> Dict:
        return self._request("/orders", "POST", order_data)

# Usage
api = DashedAPI()
login_response = api.login("user@example.com", "password")
devices = api.get_devices()
print(f"Found {len(devices['data'])} devices")
```

## SDKs and Libraries

Official SDKs are available for:
- JavaScript/TypeScript (npm package coming soon)
- Python (pip package coming soon)
- iOS Swift (coming soon)
- Android Kotlin (coming soon)

## Support

For API support, please:
1. Check this documentation
2. Search existing issues on GitHub
3. Create a new issue with detailed information
4. Contact support at api-support@dashed.com

## Changelog

### v1.0.0 (2024-01-01)
- Initial API release
- Basic CRUD operations for all resources
- Authentication and authorization
- Rate limiting
- Comprehensive error handling

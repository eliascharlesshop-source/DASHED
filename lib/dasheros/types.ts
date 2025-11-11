/**
 * DashedOS Foundation - Core System Interface
 * Universal Operating System Layer for Cross-Platform Device Management
 */

export interface DashedOSDevice {
  id: string
  name: string
  type: 'desktop' | 'laptop' | 'smartphone' | 'tablet' | 'server' | 'iot'
  os: string
  version: string
  status: 'online' | 'offline' | 'sleeping' | 'maintenance'
  lastSeen: Date
  location?: string
  capabilities: DeviceCapabilities
  security: SecurityStatus
  performance: PerformanceMetrics
}

export interface DeviceCapabilities {
  hasCamera: boolean
  hasMicrophone: boolean
  hasGPS: boolean
  hasBiometric: boolean
  supportsTTS: boolean
  supportsAR: boolean
  networkInterfaces: NetworkInterface[]
  storageDevices: StorageDevice[]
}

export interface SecurityStatus {
  encryptionEnabled: boolean
  firewallActive: boolean
  antivirusStatus: 'active' | 'inactive' | 'outdated'
  lastSecurityScan: Date
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  vpnConnected: boolean
  privacyMode: boolean
}

export interface PerformanceMetrics {
  cpu: {
    usage: number
    temperature: number
    cores: number
  }
  memory: {
    total: number
    used: number
    available: number
  }
  storage: {
    total: number
    used: number
    available: number
  }
  network: {
    downloadSpeed: number
    uploadSpeed: number
    latency: number
  }
  battery?: {
    level: number
    isCharging: boolean
    timeRemaining: number
  }
}

export interface NetworkInterface {
  name: string
  type: 'ethernet' | 'wifi' | 'cellular' | 'bluetooth'
  ipAddress?: string
  macAddress: string
  isActive: boolean
}

export interface StorageDevice {
  name: string
  type: 'hdd' | 'ssd' | 'nvme' | 'sd' | 'usb'
  total: number
  used: number
  health: 'excellent' | 'good' | 'fair' | 'poor'
}

/**
 * DashedOS Core System Events
 */
export type DashedOSEvent = 
  | DeviceConnectedEvent
  | DeviceDisconnectedEvent
  | SecurityThreatEvent
  | PerformanceAlertEvent
  | SystemUpdateEvent

export interface DeviceConnectedEvent {
  type: 'device_connected'
  deviceId: string
  timestamp: Date
  location?: string
}

export interface DeviceDisconnectedEvent {
  type: 'device_disconnected'
  deviceId: string
  timestamp: Date
  reason: 'shutdown' | 'network_loss' | 'sleep' | 'crash'
}

export interface SecurityThreatEvent {
  type: 'security_threat'
  deviceId: string
  timestamp: Date
  threatType: 'malware' | 'intrusion' | 'suspicious_activity' | 'data_breach'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  action: 'blocked' | 'quarantined' | 'allowed' | 'investigating'
}

export interface PerformanceAlertEvent {
  type: 'performance_alert'
  deviceId: string
  timestamp: Date
  metric: 'cpu' | 'memory' | 'storage' | 'network' | 'battery'
  threshold: number
  currentValue: number
  recommendation?: string
}

export interface SystemUpdateEvent {
  type: 'system_update'
  deviceId: string
  timestamp: Date
  updateType: 'security' | 'feature' | 'driver' | 'firmware'
  version: string
  status: 'available' | 'downloading' | 'installing' | 'completed' | 'failed'
}

/**
 * DashedOS System Configuration
 */
export interface DashedOSConfig {
  monitoring: {
    heartbeatInterval: number // seconds
    performanceInterval: number // seconds
    securityScanInterval: number // seconds
  }
  security: {
    encryptionRequired: boolean
    anonymousMode: boolean
    threatDetectionEnabled: boolean
    autoQuarantine: boolean
  }
  networking: {
    p2pEnabled: boolean
    cloudSyncEnabled: boolean
    bandwidthLimit?: number
    compressionEnabled: boolean
  }
  privacy: {
    dataRetentionDays: number
    analyticsEnabled: boolean
    locationTrackingEnabled: boolean
    biometricsRequired: boolean
  }
}

export interface DashedOSCore {
  getAllDevices(): DashedOSDevice[]
  getDevice(deviceId: string): DashedOSDevice | undefined
  registerDevice(device: Omit<DashedOSDevice, 'lastSeen'>): Promise<void>
  on(event: string, callback: Function): void
  emitEvent(event: string, data: DashedOSEvent): void
}

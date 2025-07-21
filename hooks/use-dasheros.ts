/**
 * DashedOS React Integration Hook
 * Provides real-time device monitoring and management in React components
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { DashedOSDevice, DashedOSEvent } from '@/lib/dasheros/types'
import { dashedOS } from '@/lib/dasheros/core'
import { deviceMonitor, MonitoringAlert, DeviceHealth } from '@/lib/dasheros/monitor'

export interface DashedOSState {
  devices: DashedOSDevice[]
  onlineDevices: DashedOSDevice[]
  alerts: MonitoringAlert[]
  systemStatus: {
    deviceCount: number
    onlineDevices: number
    securityLevel: 'secure' | 'warning' | 'critical'
    uptime: number
  }
  // Advanced capabilities
  iotClusters: any[]
  edgeNodes: any[]
  activeConflicts: any[]
  systemMetrics: {
    total_devices: number
    online_devices: number
    iot_clusters: number
    edge_nodes: number
    active_conflicts: number
    high_priority_conflicts: number
  }
  isInitialized: boolean
  isLoading: boolean
}

export interface DashedOSActions {
  registerDevice: (device: Omit<DashedOSDevice, 'lastSeen'>) => Promise<void>
  unregisterDevice: (deviceId: string) => Promise<void>
  sendCommand: (deviceId: string, command: string, params?: any) => Promise<any>
  resolveAlert: (alertId: string) => Promise<void>
  getDeviceHealth: (deviceId: string) => DeviceHealth | undefined
  refreshDevices: () => void
  enableAnonymousMode: () => void
  disableAnonymousMode: () => void
  enablePrivacyMode: () => void
  // Licensing actions
  validateLicense: (licenseId: string) => Promise<any>
  upgradeLicense: (licenseId: string, newType: string) => Promise<boolean>
  // Hardware actions
  registerHardware: (licenseId: string, hardwareType: string, serialNumber: string) => Promise<string>
  // IoT actions
  discoverIoTDevices: () => Promise<any[]>
  createAutomationRule: (clusterId: string, rule: any) => Promise<string>
  // Edge computing actions
  deployEdgeWorkload: (nodeId: string, workload: any) => Promise<string>
  getClusterMetrics: (clusterId: string) => Promise<any>
}

export function useDashedOS(): DashedOSState & DashedOSActions {
  const [state, setState] = useState<DashedOSState>({
    devices: [],
    onlineDevices: [],
    alerts: [],
    systemStatus: {
      deviceCount: 0,
      onlineDevices: 0,
      securityLevel: 'secure',
      uptime: 0
    },
    // Advanced capabilities
    iotClusters: [],
    edgeNodes: [],
    activeConflicts: [],
    systemMetrics: {
      total_devices: 0,
      online_devices: 0,
      iot_clusters: 0,
      edge_nodes: 0,
      active_conflicts: 0,
      high_priority_conflicts: 0
    },
    isInitialized: false,
    isLoading: true
  })

  // Update state from DashedOS
  const updateState = useCallback(() => {
    const devices = dashedOS.getAllDevices()
    const onlineDevices = dashedOS.getOnlineDevices()
    const alerts = deviceMonitor.getActiveAlerts()
    const systemStatus = dashedOS.getSystemStatus()
    
    // Advanced system data
    const iotClusters = dashedOS.iotManager?.getClusters() || []
    const edgeNodes = dashedOS.edgeManager?.getNodes() || []
    const activeConflicts = dashedOS.conflictResolver?.getActiveConflicts() || []
    
    const systemMetrics = {
      total_devices: devices.length,
      online_devices: onlineDevices.length,
      iot_clusters: iotClusters.length,
      edge_nodes: edgeNodes.filter((n: any) => n.status === 'online').length,
      active_conflicts: activeConflicts.length,
      high_priority_conflicts: activeConflicts.filter((c: any) => c.severity === 'high' || c.severity === 'critical').length
    }

    setState(prev => ({
      ...prev,
      devices,
      onlineDevices,
      alerts,
      systemStatus,
      iotClusters,
      edgeNodes,
      activeConflicts,
      systemMetrics,
      isLoading: false,
      isInitialized: true
    }))
  }, [])

  // Initialize DashedOS and event listeners
  useEffect(() => {
    console.log('🔌 Initializing DashedOS React integration...')

    // Set up event listeners
    const handleDeviceEvent = (event: DashedOSEvent) => {
      console.log('📡 DashedOS Event:', event)
      updateState()
    }

    const handleAlert = (alert: MonitoringAlert) => {
      console.log('🚨 New Alert:', alert)
      updateState()
    }

    // Register event listeners
    dashedOS.on('device_connected', handleDeviceEvent)
    dashedOS.on('device_disconnected', handleDeviceEvent)
    dashedOS.on('security_threat', handleDeviceEvent)
    dashedOS.on('performance_alert', handleDeviceEvent)
    dashedOS.on('system_update', handleDeviceEvent)

    deviceMonitor.onAlert(handleAlert)

    // Initial state update
    updateState()

    // Set up periodic updates
    const interval = setInterval(updateState, 10000) // Update every 10 seconds

    // Demo: Add some mock devices for development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        addMockDevices()
      }, 1000)
    }

    return () => {
      clearInterval(interval)
      // Note: In a real implementation, we'd properly remove event listeners
      console.log('🔌 DashedOS React integration cleanup')
    }
  }, [updateState])

  // Actions
  const registerDevice = useCallback(async (device: Omit<DashedOSDevice, 'lastSeen'>) => {
    await dashedOS.registerDevice(device)
    updateState()
  }, [updateState])

  const unregisterDevice = useCallback(async (deviceId: string) => {
    await dashedOS.unregisterDevice(deviceId)
    updateState()
  }, [updateState])

  const sendCommand = useCallback(async (deviceId: string, command: string, params?: any) => {
    return await dashedOS.sendCommand(deviceId, command, params)
  }, [])

  const resolveAlert = useCallback(async (alertId: string) => {
    await deviceMonitor.resolveAlert(alertId)
    updateState()
  }, [updateState])

  const getDeviceHealth = useCallback((deviceId: string) => {
    return deviceMonitor.getDeviceHealth(deviceId)
  }, [])

  const refreshDevices = useCallback(() => {
    updateState()
  }, [updateState])

  const enableAnonymousMode = useCallback(() => {
    dashedOS.enableAnonymousMode()
    updateState()
  }, [updateState])

  const disableAnonymousMode = useCallback(() => {
    dashedOS.disableAnonymousMode()
    updateState()
  }, [updateState])

  const enablePrivacyMode = useCallback(() => {
    dashedOS.enablePrivacyMode()
    updateState()
  }, [updateState])

  // Licensing actions
  const validateLicense = useCallback(async (licenseId: string) => {
    // Integration with licensing system would go here
    console.log('Validating license:', licenseId)
    return { valid: true, license: null, violations: [], warnings: [] }
  }, [])

  const upgradeLicense = useCallback(async (licenseId: string, newType: string) => {
    // Integration with licensing system would go here
    console.log('Upgrading license:', licenseId, 'to', newType)
    return true
  }, [])

  // Hardware actions
  const registerHardware = useCallback(async (licenseId: string, hardwareType: string, serialNumber: string) => {
    // Integration with hardware registration would go here
    console.log('Registering hardware:', hardwareType, serialNumber, 'for license:', licenseId)
    return `hw_${Date.now()}`
  }, [])

  // IoT actions
  const discoverIoTDevices = useCallback(async () => {
    if (dashedOS.iotManager) {
      return await dashedOS.iotManager.discoverDevices()
    }
    return []
  }, [])

  const createAutomationRule = useCallback(async (clusterId: string, rule: any) => {
    if (dashedOS.iotManager) {
      return await dashedOS.iotManager.createAutomationRule(clusterId, rule)
    }
    return ''
  }, [])

  // Edge computing actions
  const deployEdgeWorkload = useCallback(async (nodeId: string, workload: any) => {
    if (dashedOS.edgeManager) {
      return await dashedOS.edgeManager.deployWorkload(nodeId, workload)
    }
    return ''
  }, [])

  const getClusterMetrics = useCallback(async (clusterId: string) => {
    if (dashedOS.edgeManager) {
      return await dashedOS.edgeManager.getClusterMetrics(clusterId)
    }
    return null
  }, [])

  return {
    ...state,
    registerDevice,
    unregisterDevice,
    sendCommand,
    resolveAlert,
    getDeviceHealth,
    refreshDevices,
    enableAnonymousMode,
    disableAnonymousMode,
    enablePrivacyMode,
    validateLicense,
    upgradeLicense,
    registerHardware,
    discoverIoTDevices,
    createAutomationRule,
    deployEdgeWorkload,
    getClusterMetrics
  }
}

/**
 * Mock data for development and testing
 */
async function addMockDevices() {
  const mockDevices = [
    {
      id: 'dev-laptop-001',
      name: 'MacBook Pro',
      type: 'laptop' as const,
      os: 'macOS 14.0',
      version: '2.1.4',
      status: 'online' as const,
      location: 'Home Office',
      capabilities: {
        hasCamera: true,
        hasMicrophone: true,
        hasGPS: false,
        hasBiometric: true,
        supportsTTS: true,
        supportsAR: false,
        networkInterfaces: [
          { name: 'WiFi', type: 'wifi' as const, ipAddress: '192.168.1.5', macAddress: '00:11:22:33:44:55', isActive: true },
          { name: 'Ethernet', type: 'ethernet' as const, macAddress: '00:11:22:33:44:56', isActive: false }
        ],
        storageDevices: [
          { name: 'Internal SSD', type: 'ssd' as const, total: 512, used: 256, health: 'excellent' as const }
        ]
      },
      security: {
        encryptionEnabled: true,
        firewallActive: true,
        antivirusStatus: 'active' as const,
        lastSecurityScan: new Date(),
        threatLevel: 'low' as const,
        vpnConnected: false,
        privacyMode: true
      },
      performance: {
        cpu: { usage: 25, temperature: 45, cores: 8 },
        memory: { total: 16384, used: 6144, available: 10240 },
        storage: { total: 512000, used: 256000, available: 256000 },
        network: { downloadSpeed: 100, uploadSpeed: 50, latency: 15 },
        battery: { level: 78, isCharging: false, timeRemaining: 480 }
      }
    },
    {
      id: 'dev-phone-001',
      name: 'iPhone 15 Pro',
      type: 'smartphone' as const,
      os: 'iOS 17.0',
      version: '2.1.4',
      status: 'online' as const,
      location: 'Home',
      capabilities: {
        hasCamera: true,
        hasMicrophone: true,
        hasGPS: true,
        hasBiometric: true,
        supportsTTS: true,
        supportsAR: true,
        networkInterfaces: [
          { name: 'WiFi', type: 'wifi' as const, ipAddress: '192.168.1.6', macAddress: '00:11:22:33:44:57', isActive: true },
          { name: 'Cellular', type: 'cellular' as const, macAddress: '00:11:22:33:44:58', isActive: true }
        ],
        storageDevices: [
          { name: 'Internal Storage', type: 'nvme' as const, total: 256, used: 128, health: 'excellent' as const }
        ]
      },
      security: {
        encryptionEnabled: true,
        firewallActive: true,
        antivirusStatus: 'active' as const,
        lastSecurityScan: new Date(),
        threatLevel: 'low' as const,
        vpnConnected: true,
        privacyMode: true
      },
      performance: {
        cpu: { usage: 15, temperature: 35, cores: 6 },
        memory: { total: 8192, used: 3072, available: 5120 },
        storage: { total: 256000, used: 128000, available: 128000 },
        network: { downloadSpeed: 80, uploadSpeed: 30, latency: 25 },
        battery: { level: 64, isCharging: false, timeRemaining: 360 }
      }
    },
    {
      id: 'dev-server-001',
      name: 'Linux Server',
      type: 'server' as const,
      os: 'Ubuntu 22.04',
      version: '2.1.4',
      status: 'online' as const,
      location: 'Data Center',
      capabilities: {
        hasCamera: false,
        hasMicrophone: false,
        hasGPS: false,
        hasBiometric: false,
        supportsTTS: false,
        supportsAR: false,
        networkInterfaces: [
          { name: 'eth0', type: 'ethernet' as const, ipAddress: '192.168.1.10', macAddress: '00:11:22:33:44:59', isActive: true }
        ],
        storageDevices: [
          { name: 'RAID Array', type: 'ssd' as const, total: 4096, used: 2048, health: 'good' as const }
        ]
      },
      security: {
        encryptionEnabled: true,
        firewallActive: true,
        antivirusStatus: 'active' as const,
        lastSecurityScan: new Date(),
        threatLevel: 'low' as const,
        vpnConnected: false,
        privacyMode: false
      },
      performance: {
        cpu: { usage: 45, temperature: 65, cores: 16 },
        memory: { total: 65536, used: 32768, available: 32768 },
        storage: { total: 4096000, used: 2048000, available: 2048000 },
        network: { downloadSpeed: 1000, uploadSpeed: 1000, latency: 5 }
      }
    }
  ]

  for (const device of mockDevices) {
    try {
      await dashedOS.registerDevice(device)
      console.log(`✅ Mock device registered: ${device.name}`)
    } catch (error) {
      console.error(`❌ Failed to register mock device: ${device.name}`, error)
    }
  }
}

/**
 * Hook for device-specific operations
 */
export function useDevice(deviceId: string) {
  const { devices, sendCommand, getDeviceHealth } = useDashedOS()
  
  const device = devices.find(d => d.id === deviceId)
  const health = device ? getDeviceHealth(deviceId) : undefined

  const restartDevice = useCallback(async () => {
    if (device) {
      return await sendCommand(deviceId, 'restart')
    }
  }, [device, deviceId, sendCommand])

  const shutdownDevice = useCallback(async () => {
    if (device) {
      return await sendCommand(deviceId, 'shutdown')
    }
  }, [device, deviceId, sendCommand])

  const lockDevice = useCallback(async () => {
    if (device) {
      return await sendCommand(deviceId, 'lock')
    }
  }, [device, deviceId, sendCommand])

  return {
    device,
    health,
    restartDevice,
    shutdownDevice,
    lockDevice
  }
}

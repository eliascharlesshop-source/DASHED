/**
 * DashedOS Device Monitor - Real-time Device Management Service
 * Provides comprehensive device monitoring, health checks, and analytics
 */

import { DashedOSDevice, PerformanceMetrics, SecurityStatus, DashedOSEvent } from './types'
// import { dashedOS } from './core' // Removed circular dependency

export interface MonitoringAlert {
  id: string
  deviceId: string
  type: 'performance' | 'security' | 'connectivity' | 'health'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: Date
  resolved: boolean
  recommendation?: string
}

export interface DeviceHealth {
  overall: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
  scores: {
    performance: number // 0-100
    security: number // 0-100
    connectivity: number // 0-100
    storage: number // 0-100
  }
  lastChecked: Date
}

export class DeviceMonitor {
  private alerts: Map<string, MonitoringAlert> = new Map()
  private healthScores: Map<string, DeviceHealth> = new Map()
  private monitoringInterval?: NodeJS.Timeout
  private alertCallbacks: Function[] = []
  private core: DashedOSCore

  constructor(core: DashedOSCore) {
    this.core = core
    this.initializeMonitoring()
  }

  /**
   * Initialize real-time monitoring
   */
  private initializeMonitoring(): void {
    console.log('📊 Device Monitor initializing...')
    
    // Start continuous monitoring
    this.monitoringInterval = setInterval(() => {
      this.performMonitoringCycle()
    }, 30000) // Every 30 seconds

    // Listen to DashedOS events
    this.core.on('device_connected', this.handleDeviceConnected.bind(this))
    this.core.on('device_disconnected', this.handleDeviceDisconnected.bind(this))
    this.core.on('security_threat', this.handleSecurityThreat.bind(this))

    console.log('✅ Device Monitor initialized')
  }

  /**
   * Perform comprehensive monitoring cycle
   */
  private async performMonitoringCycle(): Promise<void> {
    const devices = this.core.getAllDevices()
    
    for (const device of devices) {
      if (device.status === 'online') {
        await this.checkDeviceHealth(device)
        await this.analyzePerformance(device)
        await this.checkSecurity(device)
        await this.validateConnectivity(device)
      }
    }
  }

  /**
   * Device Health Assessment
   */
  async checkDeviceHealth(device: DashedOSDevice): Promise<DeviceHealth> {
    const health = this.calculateHealthScores(device)
    this.healthScores.set(device.id, health)

    // Generate alerts for poor health
    if (health.overall === 'poor' || health.overall === 'critical') {
      await this.createAlert({
        deviceId: device.id,
        type: 'health',
        severity: health.overall === 'critical' ? 'critical' : 'high',
        message: `Device health is ${health.overall}`,
        recommendation: this.getHealthRecommendation(health)
      })
    }

    return health
  }

  private calculateHealthScores(device: DashedOSDevice): DeviceHealth {
    const performance = this.calculatePerformanceScore(device.performance)
    const security = this.calculateSecurityScore(device.security)
    const connectivity = this.calculateConnectivityScore(device)
    const storage = this.calculateStorageScore(device.performance)

    const overallScore = (performance + security + connectivity + storage) / 4
    
    let overall: DeviceHealth['overall']
    if (overallScore >= 90) overall = 'excellent'
    else if (overallScore >= 75) overall = 'good'
    else if (overallScore >= 60) overall = 'fair'
    else if (overallScore >= 40) overall = 'poor'
    else overall = 'critical'

    return {
      overall,
      scores: {
        performance,
        security,
        connectivity,
        storage
      },
      lastChecked: new Date()
    }
  }

  private calculatePerformanceScore(metrics: PerformanceMetrics): number {
    let score = 100

    // CPU usage impact
    if (metrics.cpu.usage > 90) score -= 30
    else if (metrics.cpu.usage > 70) score -= 15
    else if (metrics.cpu.usage > 50) score -= 5

    // Memory usage impact
    const memoryUsage = (metrics.memory.used / metrics.memory.total) * 100
    if (memoryUsage > 90) score -= 25
    else if (memoryUsage > 80) score -= 10
    else if (memoryUsage > 70) score -= 5

    // Storage impact
    const storageUsage = (metrics.storage.used / metrics.storage.total) * 100
    if (storageUsage > 95) score -= 20
    else if (storageUsage > 85) score -= 10

    // CPU temperature impact
    if (metrics.cpu.temperature > 85) score -= 15
    else if (metrics.cpu.temperature > 75) score -= 5

    return Math.max(0, score)
  }

  private calculateSecurityScore(security: SecurityStatus): number {
    let score = 100

    if (!security.encryptionEnabled) score -= 30
    if (!security.firewallActive) score -= 20
    if (security.antivirusStatus !== 'active') score -= 25

    switch (security.threatLevel) {
      case 'critical': score -= 50; break
      case 'high': score -= 30; break
      case 'medium': score -= 15; break
      case 'low': break
    }

    // Check if security scan is recent (within 24 hours)
    const scanAge = Date.now() - security.lastSecurityScan.getTime()
    if (scanAge > 86400000) score -= 10 // 24 hours

    return Math.max(0, score)
  }

  private calculateConnectivityScore(device: DashedOSDevice): number {
    let score = 100

    // Check network interfaces
    const activeInterfaces = device.capabilities.networkInterfaces.filter(ni => ni.isActive)
    if (activeInterfaces.length === 0) score -= 50
    else if (activeInterfaces.length === 1) score -= 10

    // Network performance
    if (device.performance.network.latency > 200) score -= 20
    else if (device.performance.network.latency > 100) score -= 10

    if (device.performance.network.downloadSpeed < 1) score -= 15 // < 1 Mbps

    return Math.max(0, score)
  }

  private calculateStorageScore(metrics: PerformanceMetrics): number {
    const storageUsage = (metrics.storage.used / metrics.storage.total) * 100
    
    if (storageUsage > 95) return 10
    if (storageUsage > 90) return 30
    if (storageUsage > 85) return 50
    if (storageUsage > 80) return 70
    if (storageUsage > 70) return 85
    return 100
  }

  private getHealthRecommendation(health: DeviceHealth): string {
    const issues = []
    
    if (health.scores.performance < 60) {
      issues.push('Close unnecessary applications to improve performance')
    }
    if (health.scores.security < 60) {
      issues.push('Update security software and run a full system scan')
    }
    if (health.scores.connectivity < 60) {
      issues.push('Check network connection and restart network interfaces')
    }
    if (health.scores.storage < 60) {
      issues.push('Free up disk space by removing unnecessary files')
    }

    return issues.length > 0 ? issues.join('. ') : 'System is operating normally'
  }

  /**
   * Performance Analysis
   */
  private async analyzePerformance(device: DashedOSDevice): Promise<void> {
    const metrics = device.performance

    // CPU monitoring
    if (metrics.cpu.usage > 90) {
      await this.createAlert({
        deviceId: device.id,
        type: 'performance',
        severity: 'high',
        message: `High CPU usage: ${metrics.cpu.usage}%`,
        recommendation: 'Close resource-intensive applications'
      })
    }

    // Memory monitoring
    const memoryUsage = (metrics.memory.used / metrics.memory.total) * 100
    if (memoryUsage > 90) {
      await this.createAlert({
        deviceId: device.id,
        type: 'performance',
        severity: 'high',
        message: `High memory usage: ${memoryUsage.toFixed(1)}%`,
        recommendation: 'Restart applications or add more RAM'
      })
    }

    // Storage monitoring
    const storageUsage = (metrics.storage.used / metrics.storage.total) * 100
    if (storageUsage > 95) {
      await this.createAlert({
        deviceId: device.id,
        type: 'performance',
        severity: 'critical',
        message: `Critical storage usage: ${storageUsage.toFixed(1)}%`,
        recommendation: 'Immediately free up disk space'
      })
    }

    // Temperature monitoring
    if (metrics.cpu.temperature > 85) {
      await this.createAlert({
        deviceId: device.id,
        type: 'performance',
        severity: 'high',
        message: `High CPU temperature: ${metrics.cpu.temperature}°C`,
        recommendation: 'Check cooling system and reduce workload'
      })
    }

    // Battery monitoring (if applicable)
    if (metrics.battery && metrics.battery.level < 10) {
      await this.createAlert({
        deviceId: device.id,
        type: 'performance',
        severity: 'medium',
        message: `Low battery: ${metrics.battery.level}%`,
        recommendation: 'Connect charger to prevent data loss'
      })
    }
  }

  /**
   * Security Monitoring
   */
  private async checkSecurity(device: DashedOSDevice): Promise<void> {
    const security = device.security

    // Check encryption status
    if (!security.encryptionEnabled) {
      await this.createAlert({
        deviceId: device.id,
        type: 'security',
        severity: 'high',
        message: 'Disk encryption is disabled',
        recommendation: 'Enable full disk encryption for data protection'
      })
    }

    // Check firewall status
    if (!security.firewallActive) {
      await this.createAlert({
        deviceId: device.id,
        type: 'security',
        severity: 'medium',
        message: 'Firewall is inactive',
        recommendation: 'Enable firewall protection'
      })
    }

    // Check antivirus status
    if (security.antivirusStatus !== 'active') {
      await this.createAlert({
        deviceId: device.id,
        type: 'security',
        severity: 'high',
        message: `Antivirus status: ${security.antivirusStatus}`,
        recommendation: 'Update and activate antivirus protection'
      })
    }

    // Check threat level
    if (security.threatLevel === 'critical' || security.threatLevel === 'high') {
      await this.createAlert({
        deviceId: device.id,
        type: 'security',
        severity: 'critical',
        message: `${security.threatLevel} security threat detected`,
        recommendation: 'Run immediate security scan and isolate if necessary'
      })
    }
  }

  /**
   * Connectivity Monitoring
   */
  private async validateConnectivity(device: DashedOSDevice): Promise<void> {
    const activeInterfaces = device.capabilities.networkInterfaces.filter(ni => ni.isActive)
    
    if (activeInterfaces.length === 0) {
      await this.createAlert({
        deviceId: device.id,
        type: 'connectivity',
        severity: 'high',
        message: 'No active network connections',
        recommendation: 'Check network cables and wireless connections'
      })
    }

    // Check network performance
    if (device.performance.network.latency > 500) {
      await this.createAlert({
        deviceId: device.id,
        type: 'connectivity',
        severity: 'medium',
        message: `High network latency: ${device.performance.network.latency}ms`,
        recommendation: 'Check network congestion and connection quality'
      })
    }
  }

  /**
   * Alert Management
   */
  private async createAlert(alertData: Omit<MonitoringAlert, 'id' | 'timestamp' | 'resolved'>): Promise<MonitoringAlert> {
    const alert: MonitoringAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      resolved: false,
      ...alertData
    }

    this.alerts.set(alert.id, alert)
    
    // Notify listeners
    this.alertCallbacks.forEach(callback => callback(alert))
    
    console.log(`🚨 Alert created: ${alert.message} (${alert.severity})`)
    return alert
  }

  async resolveAlert(alertId: string): Promise<void> {
    const alert = this.alerts.get(alertId)
    if (alert) {
      alert.resolved = true
      console.log(`✅ Alert resolved: ${alert.message}`)
    }
  }

  getActiveAlerts(deviceId?: string): MonitoringAlert[] {
    const allAlerts = Array.from(this.alerts.values())
    return allAlerts.filter(alert => 
      !alert.resolved && 
      (deviceId ? alert.deviceId === deviceId : true)
    )
  }

  getDeviceHealth(deviceId: string): DeviceHealth | undefined {
    return this.healthScores.get(deviceId)
  }

  /**
   * Event Handlers
   */
  private handleDeviceConnected(event: DashedOSEvent): void {
    if (event.type === 'device_connected') {
      console.log(`📱 Device monitoring started: ${event.deviceId}`)
    }
  }

  private handleDeviceDisconnected(event: DashedOSEvent): void {
    if (event.type === 'device_disconnected') {
      console.log(`📱 Device monitoring stopped: ${event.deviceId}`)
      
      // Clear device-specific data
      this.healthScores.delete(event.deviceId)
    }
  }

  private async handleSecurityThreat(event: DashedOSEvent): Promise<void> {
    if (event.type === 'security_threat') {
      await this.createAlert({
        deviceId: event.deviceId,
        type: 'security',
        severity: event.severity,
        message: `Security threat: ${event.description}`,
        recommendation: 'Review security logs and take appropriate action'
      })
    }
  }

  /**
   * Subscription Management
   */
  onAlert(callback: (alert: MonitoringAlert) => void): void {
    this.alertCallbacks.push(callback)
  }

  /**
   * System Control
   */
  shutdown(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
    }
    console.log('📊 Device Monitor shutdown complete')
  }
}

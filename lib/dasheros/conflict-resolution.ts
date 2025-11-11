import { DashedOSDevice, DashedOSEvent, DashedOSCore } from './types';

export interface Conflict {
  id: string;
  type: 'resource' | 'scheduling' | 'security' | 'network' | 'data' | 'permission';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'analyzing' | 'resolving' | 'resolved' | 'escalated';
  description: string;
  affected_devices: string[];
  affected_resources: string[];
  detected_at: Date;
  resolved_at?: Date;
  resolution_strategy: ResolutionStrategy;
  auto_resolvable: boolean;
  metadata: Record<string, any>;
}

export interface ResolutionStrategy {
  type: 'automatic' | 'manual' | 'hybrid';
  algorithm: 'priority_based' | 'round_robin' | 'load_balanced' | 'custom';
  fallback_options: string[];
  timeout_seconds: number;
  requires_approval: boolean;
  approval_roles: string[];
}

export interface ConflictResolutionRule {
  id: string;
  name: string;
  conflict_type: Conflict['type'];
  condition: {
    device_types?: string[];
    resource_types?: string[];
    severity_threshold?: Conflict['severity'];
    time_constraints?: {
      start_hour: number;
      end_hour: number;
      days_of_week: number[];
    };
  };
  action: {
    strategy: ResolutionStrategy;
    priority: number;
    notification_required: boolean;
    logging_level: 'debug' | 'info' | 'warn' | 'error';
  };
  enabled: boolean;
  created_at: Date;
}

export interface ResourceAllocation {
  device_id: string;
  resource_type: 'cpu' | 'memory' | 'storage' | 'network' | 'gpu' | 'sensor' | 'actuator';
  resource_id: string;
  allocation_percent: number;
  priority: number;
  reserved_until?: Date;
  requester: string;
  purpose: string;
}

export interface ConflictResolutionLog {
  conflict_id: string;
  timestamp: Date;
  action: string;
  result: 'success' | 'failure' | 'partial';
  details: string;
  execution_time_ms: number;
  resources_affected: string[];
}

export class ConflictResolutionEngine {
  private core: DashedOSCore;
  private activeConflicts: Map<string, Conflict> = new Map();
  private resolutionRules: Map<string, ConflictResolutionRule> = new Map();
  private resourceAllocations: Map<string, ResourceAllocation[]> = new Map();
  private resolutionLogs: ConflictResolutionLog[] = [];
  private monitoringInterval?: NodeJS.Timeout;

  constructor(core: DashedOSCore) {
    this.core = core;
    this.initializeDefaultRules();
    this.startConflictMonitoring();
  }

  // Conflict Detection
  async detectConflicts(): Promise<Conflict[]> {
    const conflicts: Conflict[] = [];
    const devices = this.core.getAllDevices();

    // Resource conflicts
    const resourceConflicts = await this.detectResourceConflicts(devices);
    conflicts.push(...resourceConflicts);

    // Security conflicts
    const securityConflicts = await this.detectSecurityConflicts(devices);
    conflicts.push(...securityConflicts);

    // Network conflicts
    const networkConflicts = await this.detectNetworkConflicts(devices);
    conflicts.push(...networkConflicts);

    // Scheduling conflicts
    const schedulingConflicts = await this.detectSchedulingConflicts(devices);
    conflicts.push(...schedulingConflicts);

    // Process detected conflicts
    for (const conflict of conflicts) {
      if (!this.activeConflicts.has(conflict.id)) {
        this.activeConflicts.set(conflict.id, conflict);
        await this.processConflict(conflict);
      }
    }

    return conflicts;
  }

  private async detectResourceConflicts(devices: DashedOSDevice[]): Promise<Conflict[]> {
    const conflicts: Conflict[] = [];

    // Check for CPU over-allocation
    for (const device of devices) {
      const allocations = this.resourceAllocations.get(device.id) || [];
      const cpuAllocations = allocations.filter(a => a.resource_type === 'cpu');
      const totalCpuAllocation = cpuAllocations.reduce((sum, a) => sum + a.allocation_percent, 0);

      if (totalCpuAllocation > 100) {
        conflicts.push({
          id: `cpu-conflict-${device.id}-${Date.now()}`,
          type: 'resource',
          severity: totalCpuAllocation > 150 ? 'critical' : 'high',
          status: 'detected',
          description: `CPU over-allocation detected on ${device.name}: ${totalCpuAllocation}%`,
          affected_devices: [device.id],
          affected_resources: cpuAllocations.map(a => a.resource_id),
          detected_at: new Date(),
          resolution_strategy: {
            type: 'automatic',
            algorithm: 'priority_based',
            fallback_options: ['throttle', 'migrate', 'queue'],
            timeout_seconds: 30,
            requires_approval: totalCpuAllocation > 200,
            approval_roles: ['admin', 'ops']
          },
          auto_resolvable: totalCpuAllocation <= 120,
          metadata: {
            total_allocation: totalCpuAllocation,
            allocations: cpuAllocations
          }
        });
      }

      // Check memory conflicts
      const memoryAllocations = allocations.filter(a => a.resource_type === 'memory');
      const totalMemoryAllocation = memoryAllocations.reduce((sum, a) => sum + a.allocation_percent, 0);

      if (totalMemoryAllocation > 90) {
        conflicts.push({
          id: `memory-conflict-${device.id}-${Date.now()}`,
          type: 'resource',
          severity: totalMemoryAllocation > 95 ? 'critical' : 'high',
          status: 'detected',
          description: `Memory pressure detected on ${device.name}: ${totalMemoryAllocation}%`,
          affected_devices: [device.id],
          affected_resources: memoryAllocations.map(a => a.resource_id),
          detected_at: new Date(),
          resolution_strategy: {
            type: 'automatic',
            algorithm: 'load_balanced',
            fallback_options: ['gc', 'swap', 'migrate'],
            timeout_seconds: 60,
            requires_approval: false,
            approval_roles: []
          },
          auto_resolvable: true,
          metadata: {
            total_allocation: totalMemoryAllocation,
            allocations: memoryAllocations
          }
        });
      }
    }

    return conflicts;
  }

  private async detectSecurityConflicts(devices: DashedOSDevice[]): Promise<Conflict[]> {
    const conflicts: Conflict[] = [];

    for (const device of devices) {
      // Check for security level mismatches
      if (device.security.threatLevel === 'high' || device.security.threatLevel === 'critical') {
        // Find connected devices with lower security
        const connectedDevices = devices.filter(d => 
          d.id !== device.id && 
          this.areDevicesConnected(device, d) &&
          (d.security.threatLevel === 'low' || d.security.threatLevel === 'medium')
        );

        if (connectedDevices.length > 0) {
          conflicts.push({
            id: `security-conflict-${device.id}-${Date.now()}`,
            type: 'security',
            severity: device.security.threatLevel === 'critical' ? 'critical' : 'high',
            status: 'detected',
            description: `Security level mismatch: ${device.name} (${device.security.threatLevel}) connected to lower security devices`,
            affected_devices: [device.id, ...connectedDevices.map(d => d.id)],
            affected_resources: ['network', 'data_access'],
            detected_at: new Date(),
            resolution_strategy: {
              type: 'hybrid',
              algorithm: 'custom',
              fallback_options: ['isolate', 'upgrade_security', 'restrict_access'],
              timeout_seconds: 120,
              requires_approval: true,
              approval_roles: ['security_admin', 'admin']
            },
            auto_resolvable: false,
            metadata: {
              threat_level: device.security.threatLevel,
              connected_devices: connectedDevices.map(d => ({
                id: d.id,
                name: d.name,
                threat_level: d.security.threatLevel
              }))
            }
          });
        }
      }

      // Check for encryption mismatches
      if (device.security.encryptionEnabled) {
        const unencryptedConnected = devices.filter(d => 
          d.id !== device.id && 
          this.areDevicesConnected(device, d) &&
          !d.security.encryptionEnabled
        );

        if (unencryptedConnected.length > 0) {
          conflicts.push({
            id: `encryption-conflict-${device.id}-${Date.now()}`,
            type: 'security',
            severity: 'medium',
            status: 'detected',
            description: `Encrypted device ${device.name} connected to unencrypted devices`,
            affected_devices: [device.id, ...unencryptedConnected.map(d => d.id)],
            affected_resources: ['data_transmission'],
            detected_at: new Date(),
            resolution_strategy: {
              type: 'automatic',
              algorithm: 'priority_based',
              fallback_options: ['enable_encryption', 'create_tunnel', 'restrict_data'],
              timeout_seconds: 90,
              requires_approval: false,
              approval_roles: []
            },
            auto_resolvable: true,
            metadata: {
              unencrypted_devices: unencryptedConnected.map(d => d.id)
            }
          });
        }
      }
    }

    return conflicts;
  }

  private async detectNetworkConflicts(devices: DashedOSDevice[]): Promise<Conflict[]> {
    const conflicts: Conflict[] = [];

    // Check for bandwidth conflicts
    const networkUsage = new Map<string, number>();
    
    devices.forEach(device => {
      const networkMetrics = device.performance.network;
      const totalUsage = networkMetrics.downloadSpeed + networkMetrics.uploadSpeed;
      
      device.capabilities.networkInterfaces.forEach(intf => {
        const currentUsage = networkUsage.get(intf.name) || 0;
        networkUsage.set(intf.name, currentUsage + totalUsage);
      });
    });

    for (const [interfaceName, usage] of networkUsage) {
      if (usage > 800) { // 80% of typical 1Gbps
        const affectedDevices = devices.filter(d => 
          d.capabilities.networkInterfaces.some(intf => intf.name === interfaceName)
        );

        conflicts.push({
          id: `network-conflict-${interfaceName}-${Date.now()}`,
          type: 'network',
          severity: usage > 950 ? 'critical' : 'high',
          status: 'detected',
          description: `Network congestion on ${interfaceName}: ${usage.toFixed(1)} Mbps`,
          affected_devices: affectedDevices.map(d => d.id),
          affected_resources: [interfaceName],
          detected_at: new Date(),
          resolution_strategy: {
            type: 'automatic',
            algorithm: 'load_balanced',
            fallback_options: ['throttle', 'reschedule', 'load_balance'],
            timeout_seconds: 45,
            requires_approval: false,
            approval_roles: []
          },
          auto_resolvable: true,
          metadata: {
            interface: interfaceName,
            usage_mbps: usage,
            affected_device_count: affectedDevices.length
          }
        });
      }
    }

    return conflicts;
  }

  private async detectSchedulingConflicts(devices: DashedOSDevice[]): Promise<Conflict[]> {
    const conflicts: Conflict[] = [];

    // Check for devices trying to access the same exclusive resource
    const exclusiveResources = new Map<string, string[]>();

    devices.forEach(device => {
      // Simulate exclusive resource requests (cameras, microphones, etc.)
      if (device.capabilities.hasCamera) {
        const cameraResource = 'camera-primary';
        if (!exclusiveResources.has(cameraResource)) {
          exclusiveResources.set(cameraResource, []);
        }
        exclusiveResources.get(cameraResource)!.push(device.id);
      }
    });

    for (const [resource, deviceIds] of exclusiveResources) {
      if (deviceIds.length > 1) {
        conflicts.push({
          id: `scheduling-conflict-${resource}-${Date.now()}`,
          type: 'scheduling',
          severity: 'medium',
          status: 'detected',
          description: `Multiple devices competing for exclusive resource: ${resource}`,
          affected_devices: deviceIds,
          affected_resources: [resource],
          detected_at: new Date(),
          resolution_strategy: {
            type: 'automatic',
            algorithm: 'priority_based',
            fallback_options: ['queue', 'time_slice', 'priority_override'],
            timeout_seconds: 30,
            requires_approval: false,
            approval_roles: []
          },
          auto_resolvable: true,
          metadata: {
            resource,
            competing_devices: deviceIds.length
          }
        });
      }
    }

    return conflicts;
  }

  // Conflict Resolution
  async resolveConflict(conflictId: string): Promise<boolean> {
    const conflict = this.activeConflicts.get(conflictId);
    if (!conflict) {
      console.error(`Conflict ${conflictId} not found`);
      return false;
    }

    const startTime = Date.now();
    conflict.status = 'resolving';

    try {
      const rule = this.findMatchingRule(conflict);
      const success = await this.executeResolution(conflict, rule);

      if (success) {
        conflict.status = 'resolved';
        conflict.resolved_at = new Date();
        this.activeConflicts.delete(conflictId);
      } else {
        conflict.status = 'escalated';
      }

      // Log resolution attempt
      this.resolutionLogs.push({
        conflict_id: conflictId,
        timestamp: new Date(),
        action: 'resolve_conflict',
        result: success ? 'success' : 'failure',
        details: `Resolution ${success ? 'successful' : 'failed'} using ${rule?.action.strategy.algorithm || 'default'} algorithm`,
        execution_time_ms: Date.now() - startTime,
        resources_affected: conflict.affected_resources
      });

      return success;
    } catch (error) {
      console.error(`Error resolving conflict ${conflictId}:`, error);
      conflict.status = 'escalated';
      return false;
    }
  }

  private async executeResolution(conflict: Conflict, rule?: ConflictResolutionRule): Promise<boolean> {
    const strategy = rule?.action.strategy || conflict.resolution_strategy;

    switch (conflict.type) {
      case 'resource':
        return this.resolveResourceConflict(conflict, strategy);
      case 'security':
        return this.resolveSecurityConflict(conflict, strategy);
      case 'network':
        return this.resolveNetworkConflict(conflict, strategy);
      case 'scheduling':
        return this.resolveSchedulingConflict(conflict, strategy);
      default:
        console.warn(`Unknown conflict type: ${conflict.type}`);
        return false;
    }
  }

  private async resolveResourceConflict(conflict: Conflict, strategy: ResolutionStrategy): Promise<boolean> {
    const { metadata } = conflict;
    
    if (metadata.total_allocation <= 120) {
      // Minor over-allocation - throttle low priority tasks
      console.log(`🔧 Throttling low priority resources for conflict ${conflict.id}`);
      return true;
    } else if (metadata.total_allocation <= 150) {
      // Moderate over-allocation - migrate some workloads
      console.log(`🔄 Migrating workloads for conflict ${conflict.id}`);
      return true;
    } else {
      // Severe over-allocation - queue and delay
      console.log(`⏳ Queuing resources for conflict ${conflict.id}`);
      return true;
    }
  }

  private async resolveSecurityConflict(conflict: Conflict, strategy: ResolutionStrategy): Promise<boolean> {
    console.log(`🛡️ Resolving security conflict ${conflict.id}`);
    
    if (strategy.algorithm === 'custom') {
      // Isolate high-threat devices
      for (const deviceId of conflict.affected_devices) {
        console.log(`🚫 Isolating device ${deviceId} due to security conflict`);
      }
      return true;
    }
    
    return false;
  }

  private async resolveNetworkConflict(conflict: Conflict, strategy: ResolutionStrategy): Promise<boolean> {
    console.log(`🌐 Resolving network conflict ${conflict.id}`);
    
    if (strategy.algorithm === 'load_balanced') {
      console.log(`⚖️ Load balancing network traffic for ${conflict.metadata.interface}`);
      return true;
    }
    
    return false;
  }

  private async resolveSchedulingConflict(conflict: Conflict, strategy: ResolutionStrategy): Promise<boolean> {
    console.log(`📅 Resolving scheduling conflict ${conflict.id}`);
    
    if (strategy.algorithm === 'priority_based') {
      console.log(`🎯 Applying priority-based scheduling for ${conflict.metadata.resource}`);
      return true;
    }
    
    return false;
  }

  // Utility Methods
  private async processConflict(conflict: Conflict): Promise<void> {
    console.log(`⚠️ Conflict detected: ${conflict.description}`);
    
    if (conflict.auto_resolvable && conflict.severity !== 'critical') {
      await this.resolveConflict(conflict.id);
    } else {
      console.log(`🔔 Manual resolution required for conflict ${conflict.id}`);
      // Emit event for manual intervention
      this.core.emitEvent({
        type: 'conflict_requires_intervention',
        deviceId: conflict.affected_devices[0],
        timestamp: new Date(),
        data: { conflict }
      });
    }
  }

  private findMatchingRule(conflict: Conflict): ConflictResolutionRule | undefined {
    return Array.from(this.resolutionRules.values()).find(rule => 
      rule.enabled &&
      rule.conflict_type === conflict.type &&
      this.ruleMatches(rule, conflict)
    );
  }

  private ruleMatches(rule: ConflictResolutionRule, conflict: Conflict): boolean {
    const { condition } = rule;
    
    // Check severity threshold
    if (condition.severity_threshold) {
      const severityLevels = { low: 0, medium: 1, high: 2, critical: 3 };
      if (severityLevels[conflict.severity] < severityLevels[condition.severity_threshold]) {
        return false;
      }
    }
    
    return true;
  }

  private areDevicesConnected(device1: DashedOSDevice, device2: DashedOSDevice): boolean {
    // Simplified connectivity check - in reality would check network topology
    return device1.status === 'online' && device2.status === 'online';
  }

  private initializeDefaultRules(): void {
    // CPU over-allocation rule
    this.resolutionRules.set('cpu-overallocation', {
      id: 'cpu-overallocation',
      name: 'CPU Over-allocation Auto-Resolution',
      conflict_type: 'resource',
      condition: {
        resource_types: ['cpu'],
        severity_threshold: 'medium'
      },
      action: {
        strategy: {
          type: 'automatic',
          algorithm: 'priority_based',
          fallback_options: ['throttle', 'migrate'],
          timeout_seconds: 30,
          requires_approval: false,
          approval_roles: []
        },
        priority: 1,
        notification_required: true,
        logging_level: 'info'
      },
      enabled: true,
      created_at: new Date()
    });

    // Security isolation rule
    this.resolutionRules.set('security-isolation', {
      id: 'security-isolation',
      name: 'High Threat Device Isolation',
      conflict_type: 'security',
      condition: {
        severity_threshold: 'high'
      },
      action: {
        strategy: {
          type: 'hybrid',
          algorithm: 'custom',
          fallback_options: ['isolate', 'restrict_access'],
          timeout_seconds: 60,
          requires_approval: true,
          approval_roles: ['security_admin']
        },
        priority: 10,
        notification_required: true,
        logging_level: 'warn'
      },
      enabled: true,
      created_at: new Date()
    });
  }

  private startConflictMonitoring(): void {
    this.monitoringInterval = setInterval(async () => {
      try {
        await this.detectConflicts();
      } catch (error) {
        console.error('Conflict monitoring error:', error);
      }
    }, 30000); // Check every 30 seconds
  }

  // Public Methods
  getActiveConflicts(): Conflict[] {
    return Array.from(this.activeConflicts.values());
  }

  getConflict(id: string): Conflict | undefined {
    return this.activeConflicts.get(id);
  }

  getResolutionLogs(): ConflictResolutionLog[] {
    return this.resolutionLogs.slice(-100); // Return last 100 logs
  }

  addResourceAllocation(allocation: ResourceAllocation): void {
    const deviceAllocations = this.resourceAllocations.get(allocation.device_id) || [];
    deviceAllocations.push(allocation);
    this.resourceAllocations.set(allocation.device_id, deviceAllocations);
  }

  removeResourceAllocation(deviceId: string, resourceId: string): void {
    const allocations = this.resourceAllocations.get(deviceId) || [];
    const filtered = allocations.filter(a => a.resource_id !== resourceId);
    this.resourceAllocations.set(deviceId, filtered);
  }

  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
  }
}

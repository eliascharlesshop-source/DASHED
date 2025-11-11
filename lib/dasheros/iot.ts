import { DashedOSDevice, DashedOSCore } from './types';

export interface IoTDevice extends DashedOSDevice {
  sensors?: {
    temperature?: number;
    humidity?: number;
    motion?: boolean;
    light?: number;
    air_quality?: number;
    sound?: number;
  };
  actuators?: {
    lights?: boolean;
    fans?: boolean;
    locks?: boolean;
    speakers?: boolean;
    displays?: boolean;
  };
  connectivity: {
    protocol: 'wifi' | 'bluetooth' | 'zigbee' | 'zwave' | 'lora' | 'cellular';
    signal_strength: number;
    power_mode: 'battery' | 'mains' | 'solar' | 'hybrid';
    mesh_enabled: boolean;
  };
}

export interface IoTCluster {
  id: string;
  name: string;
  location: string;
  devices: IoTDevice[];
  coordinator?: string; // Device ID of cluster coordinator
  mesh_topology: {
    [deviceId: string]: string[]; // Device connections
  };
  automation_rules: AutomationRule[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    device_id: string;
    sensor: string;
    condition: 'equals' | 'greater_than' | 'less_than' | 'changed';
    value: any;
  };
  actions: {
    device_id: string;
    actuator: string;
    value: any;
  }[];
  enabled: boolean;
  created_at: Date;
}

export interface EdgeComputeNode {
  id: string;
  location: string;
  capabilities: {
    cpu_cores: number;
    ram_gb: number;
    storage_gb: number;
    gpu: boolean;
    ai_acceleration: boolean;
  };
  workloads: EdgeWorkload[];
  status: 'online' | 'offline' | 'maintenance';
  connected_devices: string[];
}

export interface EdgeWorkload {
  id: string;
  name: string;
  type: 'ai_inference' | 'data_processing' | 'stream_analysis' | 'cache' | 'proxy';
  resource_usage: {
    cpu_percent: number;
    ram_percent: number;
    storage_percent: number;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'running' | 'stopped' | 'error' | 'pending';
}

export class IoTManager {
  private core: DashedOSCore;
  private clusters: Map<string, IoTCluster> = new Map();
  private edgeNodes: Map<string, EdgeComputeNode> = new Map();
  private discoveryEnabled = true;
  private discoveryInterval: NodeJS.Timeout | null = null;

  constructor(core: DashedOSCore) {
    this.core = core;
    // Only start device discovery in production, not development
    if (process.env.NODE_ENV !== 'development') {
      this.startDeviceDiscovery();
    }
  }

  // Device Discovery
  async discoverDevices(): Promise<IoTDevice[]> {
    console.log('🔍 Discovering IoT devices...');
    
    const mockDevices: IoTDevice[] = [
      {
        id: 'smart-thermostat-01',
        name: 'Living Room Thermostat',
        type: 'iot',
        os: 'DashedOS-IoT',
        version: '1.0.0',
        status: 'online',
        lastSeen: new Date(),
        location: 'Living Room',
        capabilities: {
          hasCamera: false,
          hasMicrophone: false,
          hasGPS: false,
          hasBiometric: false,
          supportsTTS: false,
          supportsAR: false,
          networkInterfaces: [],
          storageDevices: []
        },
        performance: {
          cpu: { usage: 15, temperature: 45, cores: 1 },
          memory: { used: 128, total: 512, available: 384 },
          storage: { used: 2, total: 8, available: 6 },
          network: { downloadSpeed: 0.2, uploadSpeed: 0.1, latency: 5 },
          battery: { level: 85, isCharging: false, timeRemaining: 480 }
        },
        security: {
          encryptionEnabled: true,
          firewallActive: true,
          antivirusStatus: 'active',
          lastSecurityScan: new Date(),
          threatLevel: 'low',
          vpnConnected: false,
          privacyMode: false
        },
        sensors: {
          temperature: 22.5,
          humidity: 45,
          motion: false
        },
        actuators: {
          fans: false
        },
        connectivity: {
          protocol: 'wifi',
          signal_strength: 85,
          power_mode: 'mains',
          mesh_enabled: true
        }
      },
      {
        id: 'smart-doorbell-01',
        name: 'Front Door Bell',
        type: 'iot',
        os: 'DashedOS-IoT',
        version: '1.0.0',
        status: 'online',
        lastSeen: new Date(),
        location: 'Front Door',
        capabilities: {
          hasCamera: true,
          hasMicrophone: true,
          hasGPS: false,
          hasBiometric: false,
          supportsTTS: true,
          supportsAR: false,
          networkInterfaces: [],
          storageDevices: []
        },
        performance: {
          cpu: { usage: 20, temperature: 50, cores: 1 },
          memory: { used: 256, total: 1024, available: 768 },
          storage: { used: 4, total: 16, available: 12 },
          network: { downloadSpeed: 1, uploadSpeed: 2, latency: 8 },
          battery: { level: 92, isCharging: false, timeRemaining: 720 }
        },
        security: {
          encryptionEnabled: true,
          firewallActive: true,
          antivirusStatus: 'active',
          lastSecurityScan: new Date(),
          threatLevel: 'low',
          vpnConnected: true,
          privacyMode: false
        },
        sensors: {
          motion: false,
          sound: 35,
          light: 500
        },
        actuators: {
          speakers: false,
          lights: false
        },
        connectivity: {
          protocol: 'wifi',
          signal_strength: 92,
          power_mode: 'battery',
          mesh_enabled: true
        }
      }
    ];

    // Simulate discovery delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockDevices;
  }

  async addDevice(device: IoTDevice): Promise<void> {
    console.log(`📱 Adding IoT device: ${device.name}`);
    
    // Register with core DashedOS
    await this.core.registerDevice(device);
    
    // Add to appropriate cluster or create new one
    const location = device.location || 'Unknown';
    const clusterId = location.toLowerCase().replace(/\s+/g, '-');
    let cluster = this.clusters.get(clusterId);
    
    if (!cluster) {
      cluster = {
        id: clusterId,
        name: location,
        location: location,
        devices: [],
        mesh_topology: {},
        automation_rules: []
      };
      this.clusters.set(clusterId, cluster);
    }
    
    cluster.devices.push(device);
    this.updateMeshTopology(cluster);
  }

  // Automation Management
  async createAutomationRule(clusterId: string, rule: Omit<AutomationRule, 'id' | 'created_at'>): Promise<string> {
    const cluster = this.clusters.get(clusterId);
    if (!cluster) throw new Error('Cluster not found');
    
    const automationRule: AutomationRule = {
      ...rule,
      id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date()
    };
    
    cluster.automation_rules.push(automationRule);
    console.log(`🤖 Created automation rule: ${automationRule.name}`);
    
    return automationRule.id;
  }

  async executeAutomation(ruleId: string): Promise<void> {
    for (const cluster of this.clusters.values()) {
      const rule = cluster.automation_rules.find(r => r.id === ruleId);
      if (rule && rule.enabled) {
        console.log(`⚡ Executing automation: ${rule.name}`);
        
        // Execute actions
        for (const action of rule.actions) {
          const device = cluster.devices.find(d => d.id === action.device_id);
          if (device && device.actuators) {
            // Simulate actuator control
            if (device.actuators[action.actuator as keyof typeof device.actuators] !== undefined) {
              (device.actuators as any)[action.actuator] = action.value;
              console.log(`🎛️ ${device.name}: ${action.actuator} = ${action.value}`);
            }
          }
        }
        break;
      }
    }
  }

  // Edge Computing
  async deployEdgeWorkload(nodeId: string, workload: Omit<EdgeWorkload, 'id' | 'status' | 'resource_usage'>): Promise<string> {
    const node = this.edgeNodes.get(nodeId);
    if (!node) throw new Error('Edge node not found');
    
    const edgeWorkload: EdgeWorkload = {
      ...workload,
      id: `workload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      resource_usage: { cpu_percent: 0, ram_percent: 0, storage_percent: 0 }
    };
    
    node.workloads.push(edgeWorkload);
    
    // Simulate deployment
    setTimeout(() => {
      edgeWorkload.status = 'running';
      edgeWorkload.resource_usage = {
        cpu_percent: Math.random() * 50 + 10,
        ram_percent: Math.random() * 40 + 5,
        storage_percent: Math.random() * 30 + 5
      };
      console.log(`🚀 Edge workload deployed: ${edgeWorkload.name}`);
    }, 2000);
    
    return edgeWorkload.id;
  }

  async createEdgeNode(location: string): Promise<EdgeComputeNode> {
    const node: EdgeComputeNode = {
      id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      location,
      capabilities: {
        cpu_cores: 8,
        ram_gb: 16,
        storage_gb: 256,
        gpu: true,
        ai_acceleration: true
      },
      workloads: [],
      status: 'online',
      connected_devices: []
    };
    
    this.edgeNodes.set(node.id, node);
    console.log(`🌐 Created edge compute node: ${location}`);
    
    return node;
  }

  // Utility Methods
  private updateMeshTopology(cluster: IoTCluster): void {
    // Simple mesh topology - connect devices within signal range
    cluster.mesh_topology = {};
    
    cluster.devices.forEach(device => {
      cluster.mesh_topology[device.id] = cluster.devices
        .filter(d => d.id !== device.id)
        .filter(d => d.connectivity.mesh_enabled)
        .map(d => d.id);
    });
  }

  private async startDeviceDiscovery(): Promise<void> {
    // Only start if not already running and discovery is enabled
    if (this.discoveryInterval || !this.discoveryEnabled) return;
    
    console.log('🔍 Starting IoT device discovery...');
    
    // Run initial discovery
    try {
      const devices = await this.discoverDevices();
      for (const device of devices) {
        if (!this.core.getDevice(device.id)) {
          await this.addDevice(device);
        }
      }
    } catch (error) {
      console.error('Initial device discovery error:', error);
    }
    
    // Set up periodic discovery
    this.discoveryInterval = setInterval(async () => {
      if (!this.discoveryEnabled) return;
      
      try {
        const devices = await this.discoverDevices();
        for (const device of devices) {
          if (!this.core.getDevice(device.id)) {
            await this.addDevice(device);
          }
        }
      } catch (error) {
        console.error('Device discovery error:', error);
      }
    }, 30000); // Discovery every 30 seconds
  }

  // Getters
  getClusters(): IoTCluster[] {
    return Array.from(this.clusters.values());
  }

  getCluster(id: string): IoTCluster | undefined {
    return this.clusters.get(id);
  }

  getEdgeNodes(): EdgeComputeNode[] {
    return Array.from(this.edgeNodes.values());
  }

  getEdgeNode(id: string): EdgeComputeNode | undefined {
    return this.edgeNodes.get(id);
  }

  // Control Methods
  setDiscoveryEnabled(enabled: boolean): void {
    this.discoveryEnabled = enabled;
    console.log(`🔍 Device discovery ${enabled ? 'enabled' : 'disabled'}`);
    
    if (enabled && !this.discoveryInterval) {
      // Start discovery if enabled and not already running
      this.startDeviceDiscovery();
    } else if (!enabled && this.discoveryInterval) {
      // Stop discovery if disabled and currently running
      clearInterval(this.discoveryInterval);
      this.discoveryInterval = null;
      console.log('🔍 Device discovery stopped');
    }
  }
}

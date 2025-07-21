/**
 * DASHED Custom Hardware Ecosystem
 * Complete hardware specifications and manufacturing pipeline
 */

export interface HardwareSpecification {
  id: string;
  name: string;
  model: string;
  category: 'desktop' | 'portable' | 'iot' | 'edge' | 'network';
  generation: number;
  status: 'concept' | 'design' | 'prototype' | 'testing' | 'production' | 'discontinued';
  launch_date?: Date;
  eol_date?: Date;
  price_ranges: {
    base_model: number;
    mid_tier: number;
    high_end: number;
  };
  hardware: HardwareComponents;
  software: SoftwareStack;
  certifications: string[];
  manufacturing: ManufacturingInfo;
}

export interface HardwareComponents {
  processor: ProcessorSpec;
  memory: MemorySpec;
  storage: StorageSpec;
  graphics?: GraphicsSpec;
  connectivity: ConnectivitySpec;
  io_ports: IOPortsSpec;
  power: PowerSpec;
  cooling: CoolingSpec;
  sensors?: SensorSpec[];
  dimensions: DimensionsSpec;
  materials: MaterialsSpec;
}

export interface ProcessorSpec {
  architecture: 'ARM64' | 'x86_64' | 'RISC-V';
  manufacturer: 'Custom' | 'AMD' | 'Intel' | 'Qualcomm' | 'Apple' | 'MediaTek';
  model: string;
  cores: number;
  threads: number;
  base_frequency_ghz: number;
  boost_frequency_ghz: number;
  cache_l1_kb: number;
  cache_l2_kb: number;
  cache_l3_mb: number;
  tdp_watts: number;
  process_node_nm: number;
  ai_acceleration: {
    enabled: boolean;
    tops_performance?: number;
    neural_engine?: boolean;
  };
  security_features: string[];
}

export interface MemorySpec {
  type: 'DDR4' | 'DDR5' | 'LPDDR5' | 'LPDDR5X';
  capacity_options_gb: number[];
  speed_mhz: number;
  channels: number;
  ecc_support: boolean;
  expandable: boolean;
  max_capacity_gb: number;
}

export interface StorageSpec {
  primary: {
    type: 'NVMe SSD' | 'SATA SSD' | 'eUFS' | 'eMMC';
    capacity_options_gb: number[];
    interface: string;
    encryption: boolean;
    read_speed_mbps: number;
    write_speed_mbps: number;
  };
  secondary?: {
    type: string;
    capacity_options_gb: number[];
    removable: boolean;
  };
  expansion_slots: number;
}

export interface GraphicsSpec {
  type: 'integrated' | 'discrete';
  manufacturer: 'Custom' | 'AMD' | 'NVIDIA' | 'Intel' | 'Mali' | 'Adreno';
  model: string;
  memory_gb: number;
  memory_type: string;
  compute_units: number;
  base_frequency_mhz: number;
  boost_frequency_mhz: number;
  ray_tracing: boolean;
  ai_acceleration: boolean;
  video_encoding: string[];
  display_outputs: number;
  max_resolution: string;
}

export interface ConnectivitySpec {
  wifi: {
    standards: string[];
    mimo: string;
    channels: string[];
  };
  bluetooth: {
    version: string;
    low_energy: boolean;
    mesh_support: boolean;
  };
  cellular?: {
    generations: string[];
    bands: string[];
    carrier_aggregation: boolean;
  };
  ethernet: {
    ports: number;
    speeds: string[];
    poe_support: boolean;
  };
  specialty_radios?: {
    zigbee?: boolean;
    zwave?: boolean;
    lora?: boolean;
    thread?: boolean;
    matter?: boolean;
  };
}

export interface IOPortsSpec {
  usb_c: {
    count: number;
    specifications: string[];
    power_delivery: boolean;
    display_output: boolean;
  };
  usb_a: {
    count: number;
    versions: string[];
  };
  display_ports: {
    hdmi: number;
    displayport: number;
    thunderbolt: number;
  };
  audio: {
    headphone_jack: boolean;
    microphone_array: number;
    speakers: number;
    spatial_audio: boolean;
  };
  custom_ports?: {
    name: string;
    count: number;
    purpose: string;
  }[];
}

export interface PowerSpec {
  type: 'battery' | 'ac_adapter' | 'hybrid';
  battery?: {
    capacity_wh: number;
    type: 'Li-ion' | 'Li-Po' | 'LiFePO4';
    removable: boolean;
    fast_charging: boolean;
    wireless_charging: boolean;
    estimated_life_hours: number;
  };
  adapter?: {
    wattage: number;
    efficiency_rating: string;
    voltage_range: string;
  };
  power_management: {
    sleep_modes: string[];
    wake_on_lan: boolean;
    scheduled_operations: boolean;
  };
}

export interface CoolingSpec {
  type: 'passive' | 'active' | 'liquid' | 'hybrid';
  fans?: {
    count: number;
    variable_speed: boolean;
    noise_level_db: number;
  };
  heat_pipes?: number;
  thermal_design: {
    operating_temp_range: string;
    thermal_throttling: boolean;
    temperature_monitoring: boolean;
  };
}

export interface SensorSpec {
  type: 'temperature' | 'humidity' | 'pressure' | 'light' | 'motion' | 'proximity' | 'air_quality' | 'sound';
  model: string;
  accuracy: string;
  range: string;
  power_consumption_mw: number;
  sampling_rate_hz: number;
}

export interface DimensionsSpec {
  length_mm: number;
  width_mm: number;
  height_mm: number;
  weight_grams: number;
  form_factor: string;
  mounting_options: string[];
}

export interface MaterialsSpec {
  body: string;
  frame: string;
  screen?: string;
  finishes: string[];
  colors: string[];
  environmental_rating: string;
  durability_tests: string[];
}

export interface SoftwareStack {
  operating_system: {
    name: string;
    version: string;
    kernel: string;
    update_mechanism: string;
  };
  firmware: {
    bootloader: string;
    security_features: string[];
    update_method: string;
  };
  drivers: {
    display: string;
    network: string;
    storage: string;
    audio: string;
    custom: string[];
  };
  runtime: {
    container_support: string[];
    virtualization: boolean;
    development_tools: string[];
  };
  security: {
    secure_boot: boolean;
    tpm_version: string;
    encryption: string[];
    biometrics: string[];
  };
}

export interface ManufacturingInfo {
  estimated_cost: {
    materials: number;
    labor: number;
    tooling: number;
    testing: number;
    margin_percent: number;
  };
  production_capacity: {
    initial_units_per_month: number;
    scale_up_timeline: string;
    max_capacity_per_month: number;
  };
  supply_chain: {
    primary_suppliers: string[];
    backup_suppliers: string[];
    lead_times_weeks: Record<string, number>;
    critical_components: string[];
  };
  testing_requirements: {
    functional_tests: string[];
    stress_tests: string[];
    regulatory_tests: string[];
    quality_standards: string[];
  };
  packaging: {
    retail_box_dimensions: string;
    sustainability_features: string[];
    included_accessories: string[];
  };
}

// DashedBox - Primary Desktop/Server Unit
export const dashedBoxSpecs: HardwareSpecification = {
  id: 'dashedbox-gen1',
  name: 'DashedBox',
  model: 'DB-2024-PRO',
  category: 'desktop',
  generation: 1,
  status: 'design',
  price_ranges: {
    base_model: 999,
    mid_tier: 1999,
    high_end: 3999
  },
  hardware: {
    processor: {
      architecture: 'ARM64',
      manufacturer: 'Custom',
      model: 'DashedChip A1',
      cores: 12,
      threads: 12,
      base_frequency_ghz: 3.2,
      boost_frequency_ghz: 4.0,
      cache_l1_kb: 128,
      cache_l2_kb: 4096,
      cache_l3_mb: 32,
      tdp_watts: 65,
      process_node_nm: 5,
      ai_acceleration: {
        enabled: true,
        tops_performance: 50,
        neural_engine: true
      },
      security_features: ['Secure Enclave', 'Hardware RNG', 'Memory Protection']
    },
    memory: {
      type: 'DDR5',
      capacity_options_gb: [16, 32, 64, 128],
      speed_mhz: 6400,
      channels: 4,
      ecc_support: true,
      expandable: true,
      max_capacity_gb: 256
    },
    storage: {
      primary: {
        type: 'NVMe SSD',
        capacity_options_gb: [512, 1024, 2048, 4096],
        interface: 'PCIe 5.0 x4',
        encryption: true,
        read_speed_mbps: 7000,
        write_speed_mbps: 6000
      },
      secondary: {
        type: 'SATA SSD',
        capacity_options_gb: [1024, 2048, 4096, 8192],
        removable: true
      },
      expansion_slots: 4
    },
    graphics: {
      type: 'integrated',
      manufacturer: 'Custom',
      model: 'DashedGPU G1',
      memory_gb: 16,
      memory_type: 'Unified Memory',
      compute_units: 32,
      base_frequency_mhz: 1800,
      boost_frequency_mhz: 2400,
      ray_tracing: true,
      ai_acceleration: true,
      video_encoding: ['AV1', 'H.265', 'H.264'],
      display_outputs: 6,
      max_resolution: '8K@60Hz'
    },
    connectivity: {
      wifi: {
        standards: ['Wi-Fi 7', 'Wi-Fi 6E'],
        mimo: '4x4',
        channels: ['2.4GHz', '5GHz', '6GHz']
      },
      bluetooth: {
        version: '6.0',
        low_energy: true,
        mesh_support: true
      },
      ethernet: {
        ports: 2,
        speeds: ['10Gbps', '2.5Gbps', '1Gbps'],
        poe_support: true
      },
      specialty_radios: {
        zigbee: true,
        zwave: true,
        thread: true,
        matter: true
      }
    },
    io_ports: {
      usb_c: {
        count: 6,
        specifications: ['USB4', 'Thunderbolt 5'],
        power_delivery: true,
        display_output: true
      },
      usb_a: {
        count: 4,
        versions: ['USB 3.2 Gen 2']
      },
      display_ports: {
        hdmi: 2,
        displayport: 2,
        thunderbolt: 4
      },
      audio: {
        headphone_jack: true,
        microphone_array: 4,
        speakers: 6,
        spatial_audio: true
      },
      custom_ports: [
        {
          name: 'DashedPort',
          count: 2,
          purpose: 'High-speed device interconnect'
        }
      ]
    },
    power: {
      type: 'ac_adapter',
      adapter: {
        wattage: 300,
        efficiency_rating: '80+ Titanium',
        voltage_range: '100-240V'
      },
      power_management: {
        sleep_modes: ['S1', 'S3', 'S4'],
        wake_on_lan: true,
        scheduled_operations: true
      }
    },
    cooling: {
      type: 'hybrid',
      fans: {
        count: 3,
        variable_speed: true,
        noise_level_db: 25
      },
      heat_pipes: 6,
      thermal_design: {
        operating_temp_range: '0-40°C',
        thermal_throttling: true,
        temperature_monitoring: true
      }
    },
    dimensions: {
      length_mm: 220,
      width_mm: 220,
      height_mm: 100,
      weight_grams: 3500,
      form_factor: 'Mini-ITX',
      mounting_options: ['Desktop', 'VESA', 'Rack-mount']
    },
    materials: {
      body: 'Recycled Aluminum',
      frame: 'Carbon Fiber',
      finishes: ['Anodized', 'Powder Coated'],
      colors: ['Space Gray', 'Silver', 'Black'],
      environmental_rating: 'IP54',
      durability_tests: ['Drop Test', 'Vibration Test', 'Temperature Cycling']
    }
  },
  software: {
    operating_system: {
      name: 'DashedOS Desktop',
      version: '1.0',
      kernel: 'DashedKernel (Linux-based)',
      update_mechanism: 'OTA with rollback'
    },
    firmware: {
      bootloader: 'DashedBoot (UEFI-based)',
      security_features: ['Secure Boot', 'Measured Boot', 'Remote Attestation'],
      update_method: 'Signed firmware updates'
    },
    drivers: {
      display: 'DashedDisplay Driver',
      network: 'DashedNet Stack',
      storage: 'DashedStorage Manager',
      audio: 'DashedAudio Engine',
      custom: ['DashedPort Driver', 'AI Acceleration Driver']
    },
    runtime: {
      container_support: ['Docker', 'Podman', 'LXC'],
      virtualization: true,
      development_tools: ['DashedSDK', 'Cross-compilation toolchain']
    },
    security: {
      secure_boot: true,
      tpm_version: '2.0',
      encryption: ['AES-256', 'ChaCha20-Poly1305'],
      biometrics: ['Fingerprint', 'Face ID']
    }
  },
  certifications: ['FCC', 'CE', 'Energy Star', 'EPEAT Gold'],
  manufacturing: {
    estimated_cost: {
      materials: 450,
      labor: 150,
      tooling: 100,
      testing: 50,
      margin_percent: 40
    },
    production_capacity: {
      initial_units_per_month: 1000,
      scale_up_timeline: '6 months',
      max_capacity_per_month: 10000
    },
    supply_chain: {
      primary_suppliers: ['TSMC', 'Samsung', 'Foxconn'],
      backup_suppliers: ['Global Foundries', 'Pegatron'],
      lead_times_weeks: {
        'processors': 16,
        'memory': 8,
        'storage': 4,
        'assembly': 2
      },
      critical_components: ['Custom Processor', 'Display Controllers']
    },
    testing_requirements: {
      functional_tests: ['Boot Test', 'Stress Test', 'Connectivity Test'],
      stress_tests: ['24-hour Burn-in', 'Temperature Cycling'],
      regulatory_tests: ['EMC', 'Safety', 'Energy Efficiency'],
      quality_standards: ['ISO 9001', 'ISO 14001']
    },
    packaging: {
      retail_box_dimensions: '300x250x150mm',
      sustainability_features: ['100% Recyclable', 'Minimal Plastic'],
      included_accessories: ['Power Adapter', 'USB-C Cable', 'Quick Start Guide']
    }
  }
};

// DashedPad - Portable Tablet/Laptop Hybrid
export const dashedPadSpecs: HardwareSpecification = {
  id: 'dashedpad-gen1',
  name: 'DashedPad',
  model: 'DP-2024-PRO',
  category: 'portable',
  generation: 1,
  status: 'design',
  price_ranges: {
    base_model: 899,
    mid_tier: 1499,
    high_end: 2499
  },
  hardware: {
    processor: {
      architecture: 'ARM64',
      manufacturer: 'Custom',
      model: 'DashedChip M1',
      cores: 8,
      threads: 8,
      base_frequency_ghz: 2.8,
      boost_frequency_ghz: 3.6,
      cache_l1_kb: 128,
      cache_l2_kb: 2048,
      cache_l3_mb: 16,
      tdp_watts: 15,
      process_node_nm: 5,
      ai_acceleration: {
        enabled: true,
        tops_performance: 25,
        neural_engine: true
      },
      security_features: ['Secure Enclave', 'Hardware RNG']
    },
    memory: {
      type: 'LPDDR5X',
      capacity_options_gb: [8, 16, 32],
      speed_mhz: 7500,
      channels: 2,
      ecc_support: false,
      expandable: false,
      max_capacity_gb: 32
    },
    storage: {
      primary: {
        type: 'NVMe SSD',
        capacity_options_gb: [256, 512, 1024, 2048],
        interface: 'PCIe 4.0 x4',
        encryption: true,
        read_speed_mbps: 5000,
        write_speed_mbps: 4500
      },
      expansion_slots: 1
    },
    connectivity: {
      wifi: {
        standards: ['Wi-Fi 7', 'Wi-Fi 6E'],
        mimo: '2x2',
        channels: ['2.4GHz', '5GHz', '6GHz']
      },
      bluetooth: {
        version: '6.0',
        low_energy: true,
        mesh_support: true
      },
      cellular: {
        generations: ['5G', '4G LTE'],
        bands: ['Sub-6GHz', 'mmWave'],
        carrier_aggregation: true
      },
      ethernet: {
        ports: 0,
        speeds: [],
        poe_support: false
      }
    },
    io_ports: {
      usb_c: {
        count: 2,
        specifications: ['USB4', 'Thunderbolt 4'],
        power_delivery: true,
        display_output: true
      },
      usb_a: {
        count: 1,
        versions: ['USB 3.2 Gen 1']
      },
      display_ports: {
        hdmi: 0,
        displayport: 0,
        thunderbolt: 2
      },
      audio: {
        headphone_jack: true,
        microphone_array: 3,
        speakers: 4,
        spatial_audio: true
      }
    },
    power: {
      type: 'battery',
      battery: {
        capacity_wh: 100,
        type: 'Li-Po',
        removable: false,
        fast_charging: true,
        wireless_charging: true,
        estimated_life_hours: 15
      },
      adapter: {
        wattage: 65,
        efficiency_rating: '80+ Gold',
        voltage_range: '100-240V'
      },
      power_management: {
        sleep_modes: ['S0ix', 'S3'],
        wake_on_lan: false,
        scheduled_operations: true
      }
    },
    cooling: {
      type: 'active',
      fans: {
        count: 1,
        variable_speed: true,
        noise_level_db: 20
      },
      thermal_design: {
        operating_temp_range: '0-35°C',
        thermal_throttling: true,
        temperature_monitoring: true
      }
    },
    sensors: [
      {
        type: 'light',
        model: 'Ambient Light Sensor',
        accuracy: '±10%',
        range: '0.01-65k lux',
        power_consumption_mw: 0.5,
        sampling_rate_hz: 10
      },
      {
        type: 'motion',
        model: '9-axis IMU',
        accuracy: '±0.1°',
        range: '±16g, ±2000dps',
        power_consumption_mw: 2,
        sampling_rate_hz: 1000
      }
    ],
    dimensions: {
      length_mm: 280,
      width_mm: 220,
      height_mm: 8,
      weight_grams: 850,
      form_factor: 'Tablet/Laptop Hybrid',
      mounting_options: ['Kickstand', 'Magnetic Keyboard']
    },
    materials: {
      body: 'Aluminum Unibody',
      frame: 'Aluminum',
      screen: 'Gorilla Glass',
      finishes: ['Anodized'],
      colors: ['Silver', 'Space Gray', 'Rose Gold'],
      environmental_rating: 'IP52',
      durability_tests: ['Drop Test', 'Bend Test', 'Water Resistance']
    }
  },
  software: {
    operating_system: {
      name: 'DashedOS Mobile',
      version: '1.0',
      kernel: 'DashedKernel (Linux-based)',
      update_mechanism: 'OTA with rollback'
    },
    firmware: {
      bootloader: 'DashedBoot Lite',
      security_features: ['Secure Boot', 'Hardware Root of Trust'],
      update_method: 'Signed firmware updates'
    },
    drivers: {
      display: 'DashedDisplay Touch Driver',
      network: 'DashedNet Mobile',
      storage: 'DashedStorage Mobile',
      audio: 'DashedAudio Mobile',
      custom: ['Touch Driver', 'Cellular Modem']
    },
    runtime: {
      container_support: ['Docker', 'Flatpak'],
      virtualization: false,
      development_tools: ['DashedSDK Mobile']
    },
    security: {
      secure_boot: true,
      tpm_version: '2.0',
      encryption: ['AES-256'],
      biometrics: ['Fingerprint', 'Face ID']
    }
  },
  certifications: ['FCC', 'CE', 'Energy Star'],
  manufacturing: {
    estimated_cost: {
      materials: 350,
      labor: 100,
      tooling: 80,
      testing: 40,
      margin_percent: 35
    },
    production_capacity: {
      initial_units_per_month: 2000,
      scale_up_timeline: '4 months',
      max_capacity_per_month: 15000
    },
    supply_chain: {
      primary_suppliers: ['TSMC', 'LG Display', 'Foxconn'],
      backup_suppliers: ['Samsung', 'BOE', 'Pegatron'],
      lead_times_weeks: {
        'processors': 16,
        'displays': 12,
        'batteries': 6,
        'assembly': 2
      },
      critical_components: ['Custom Processor', 'Display Assembly']
    },
    testing_requirements: {
      functional_tests: ['Touch Test', 'Battery Test', 'Wireless Test'],
      stress_tests: ['Drop Test', 'Bend Test', 'Temperature Test'],
      regulatory_tests: ['SAR Testing', 'EMC', 'Safety'],
      quality_standards: ['ISO 9001']
    },
    packaging: {
      retail_box_dimensions: '320x240x50mm',
      sustainability_features: ['Recyclable Packaging', 'Reduced Plastic'],
      included_accessories: ['USB-C Charger', 'USB-C Cable', 'Stylus']
    }
  }
};

// Additional hardware specs can be defined similarly...
// DashedHub, DashedMicro, DashedBridge specifications would follow the same pattern

export class HardwareEcosystem {
  private specifications: Map<string, HardwareSpecification> = new Map();
  private productionLines: Map<string, ProductionLine> = new Map();

  constructor() {
    this.initializeHardwareSpecs();
  }

  private initializeHardwareSpecs(): void {
    this.specifications.set('dashedbox', dashedBoxSpecs);
    this.specifications.set('dashedpad', dashedPadSpecs);
    // Additional hardware specifications would be added here
    console.log('🏭 Hardware ecosystem initialized with product specifications');
  }

  getHardwareSpec(productId: string): HardwareSpecification | undefined {
    return this.specifications.get(productId);
  }

  getAllHardwareSpecs(): HardwareSpecification[] {
    return Array.from(this.specifications.values());
  }

  getProductsByCategory(category: HardwareSpecification['category']): HardwareSpecification[] {
    return Array.from(this.specifications.values()).filter(spec => spec.category === category);
  }

  calculateManufacturingCost(productId: string, quantity: number): number {
    const spec = this.specifications.get(productId);
    if (!spec) return 0;

    const baseCost = Object.values(spec.manufacturing.estimated_cost).reduce((sum, cost) => sum + cost, 0);
    const scaleDiscount = Math.max(0.7, 1 - (quantity / 10000) * 0.3); // Volume discount
    return baseCost * scaleDiscount * quantity;
  }

  estimateProductionTimeline(productId: string, quantity: number): {
    total_weeks: number;
    milestones: { week: number; milestone: string }[];
  } {
    const spec = this.specifications.get(productId);
    if (!spec) return { total_weeks: 0, milestones: [] };

    const leadTimes = spec.manufacturing.supply_chain.lead_times_weeks;
    const maxLeadTime = Math.max(...Object.values(leadTimes));
    const productionWeeks = Math.ceil(quantity / (spec.manufacturing.production_capacity.initial_units_per_month * 4.33));

    return {
      total_weeks: maxLeadTime + productionWeeks,
      milestones: [
        { week: 4, milestone: 'Component procurement started' },
        { week: Math.floor(maxLeadTime / 2), milestone: 'Critical components delivered' },
        { week: maxLeadTime, milestone: 'All components ready' },
        { week: maxLeadTime + 1, milestone: 'Production started' },
        { week: maxLeadTime + productionWeeks, milestone: 'Production completed' }
      ]
    };
  }
}

interface ProductionLine {
  id: string;
  product_id: string;
  facility_location: string;
  capacity_per_month: number;
  status: 'planning' | 'setup' | 'testing' | 'production' | 'maintenance';
  quality_metrics: {
    defect_rate: number;
    yield_rate: number;
    test_pass_rate: number;
  };
  current_order_queue: ProductionOrder[];
}

interface ProductionOrder {
  id: string;
  product_id: string;
  quantity: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customer_id: string;
  requested_delivery: Date;
  estimated_completion: Date;
  status: 'queued' | 'in_production' | 'testing' | 'completed' | 'shipped';
}

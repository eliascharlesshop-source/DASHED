/**
 * DASHED Licensing System
 * Comprehensive licensing, subscription, and usage tracking
 */

export interface License {
  id: string;
  type: 'free' | 'pro' | 'enterprise' | 'business' | 'developer' | 'hardware_bundle';
  tier: 'individual' | 'business' | 'enterprise' | 'oem';
  user_id: string;
  organization_id?: string;
  status: 'active' | 'suspended' | 'expired' | 'trial' | 'pending_payment';
  features: LicenseFeatures;
  limits: LicenseLimits;
  billing: BillingInfo;
  hardware_entitlements: HardwareEntitlement[];
  created_at: Date;
  expires_at?: Date;
  last_validated: Date;
}

export interface LicenseFeatures {
  // Core DashedOS Features
  dasheros_core: boolean;
  device_management: boolean;
  iot_integration: boolean;
  edge_computing: boolean;
  security_suite: boolean;
  
  // Advanced Features
  ai_acceleration: boolean;
  custom_integrations: boolean;
  api_access: boolean;
  white_labeling: boolean;
  custom_branding: boolean;
  
  // Business Features
  user_management: boolean;
  admin_controls: boolean;
  compliance_tools: boolean;
  audit_logging: boolean;
  sso_integration: boolean;
  
  // Support & Services
  priority_support: boolean;
  professional_services: boolean;
  custom_development: boolean;
  dedicated_account_manager: boolean;
  sla_guarantees: boolean;
}

export interface LicenseLimits {
  max_devices: number;
  max_users: number;
  max_storage_gb: number;
  max_api_calls_per_month: number;
  max_iot_devices: number;
  max_edge_nodes: number;
  data_retention_days: number;
  concurrent_sessions: number;
}

export interface BillingInfo {
  plan: string;
  price_monthly: number;
  price_annual: number;
  currency: string;
  billing_cycle: 'monthly' | 'annual' | 'lifetime';
  next_billing_date?: Date;
  payment_method?: string;
  auto_renewal: boolean;
  promo_code?: string;
  discount_percent?: number;
}

export interface HardwareEntitlement {
  hardware_id: string;
  hardware_type: 'dashedbox' | 'dashedpad' | 'dashedhub' | 'dashedmicro' | 'dashedbridge';
  serial_number: string;
  activation_date: Date;
  warranty_expires: Date;
  support_level: 'basic' | 'premium' | 'enterprise';
  replacement_entitlements: number;
}

export interface UsageMetrics {
  license_id: string;
  period_start: Date;
  period_end: Date;
  devices_connected: number;
  api_calls_made: number;
  storage_used_gb: number;
  data_transferred_gb: number;
  active_users: number;
  features_used: string[];
  compliance_score: number;
}

export interface LicenseValidationResult {
  valid: boolean;
  license: License | null;
  violations: string[];
  warnings: string[];
  grace_period_remaining?: number;
  renewal_required: boolean;
  upgrade_recommended: boolean;
}

export class LicensingSystem {
  private licenses: Map<string, License> = new Map();
  private usageMetrics: Map<string, UsageMetrics[]> = new Map();
  private validationCache: Map<string, { result: LicenseValidationResult; timestamp: Date }> = new Map();

  // License Management
  async createLicense(
    userId: string,
    type: License['type'],
    tier: License['tier'],
    billingCycle: 'monthly' | 'annual' = 'monthly',
    organizationId?: string
  ): Promise<License> {
    const licenseId = `lic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const features = this.getLicenseFeatures(type, tier);
    const limits = this.getLicenseLimits(type, tier);
    const billing = this.getBillingInfo(type, tier, billingCycle);

    const license: License = {
      id: licenseId,
      type,
      tier,
      user_id: userId,
      organization_id: organizationId,
      status: 'active',
      features,
      limits,
      billing,
      hardware_entitlements: [],
      created_at: new Date(),
      expires_at: billingCycle === 'lifetime' ? undefined : new Date(Date.now() + (billingCycle === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000),
      last_validated: new Date()
    };

    this.licenses.set(licenseId, license);
    console.log(`📋 Created ${type} license for user ${userId}`);

    return license;
  }

  async validateLicense(licenseId: string, requiredFeatures?: string[]): Promise<LicenseValidationResult> {
    // Check cache first
    const cached = this.validationCache.get(licenseId);
    if (cached && Date.now() - cached.timestamp.getTime() < 300000) { // 5 minutes cache
      return cached.result;
    }

    const license = this.licenses.get(licenseId);
    if (!license) {
      const result: LicenseValidationResult = {
        valid: false,
        license: null,
        violations: ['License not found'],
        warnings: [],
        renewal_required: false,
        upgrade_recommended: false
      };
      this.cacheValidationResult(licenseId, result);
      return result;
    }

    const violations: string[] = [];
    const warnings: string[] = [];

    // Check license status
    if (license.status === 'expired') {
      violations.push('License has expired');
    } else if (license.status === 'suspended') {
      violations.push('License is suspended');
    } else if (license.status === 'pending_payment') {
      violations.push('Payment is required to continue');
    }

    // Check expiration date
    if (license.expires_at && license.expires_at.getTime() < Date.now()) {
      violations.push('License has expired');
      license.status = 'expired';
    } else if (license.expires_at && license.expires_at.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000) {
      warnings.push('License expires within 7 days');
    }

    // Check feature requirements
    if (requiredFeatures) {
      for (const feature of requiredFeatures) {
        if (!(license.features as any)[feature]) {
          violations.push(`Feature '${feature}' not available in current license`);
        }
      }
    }

    // Check usage limits
    const usage = await this.getCurrentUsage(licenseId);
    if (usage) {
      if (usage.devices_connected > license.limits.max_devices) {
        violations.push(`Device limit exceeded: ${usage.devices_connected}/${license.limits.max_devices}`);
      }
      if (usage.active_users > license.limits.max_users) {
        violations.push(`User limit exceeded: ${usage.active_users}/${license.limits.max_users}`);
      }
      if (usage.storage_used_gb > license.limits.max_storage_gb) {
        violations.push(`Storage limit exceeded: ${usage.storage_used_gb}GB/${license.limits.max_storage_gb}GB`);
      }
      if (usage.api_calls_made > license.limits.max_api_calls_per_month) {
        warnings.push(`API call limit approaching: ${usage.api_calls_made}/${license.limits.max_api_calls_per_month}`);
      }
    }

    const result: LicenseValidationResult = {
      valid: violations.length === 0,
      license,
      violations,
      warnings,
      renewal_required: license.status === 'expired' || (license.expires_at && license.expires_at.getTime() < Date.now()),
      upgrade_recommended: warnings.some(w => w.includes('limit'))
    };

    // Update last validation time
    license.last_validated = new Date();
    this.cacheValidationResult(licenseId, result);

    return result;
  }

  // Hardware Integration
  async registerHardware(licenseId: string, hardwareType: HardwareEntitlement['hardware_type'], serialNumber: string): Promise<string> {
    const license = this.licenses.get(licenseId);
    if (!license) {
      throw new Error('License not found');
    }

    const hardwareId = `hw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const entitlement: HardwareEntitlement = {
      hardware_id: hardwareId,
      hardware_type: hardwareType,
      serial_number: serialNumber,
      activation_date: new Date(),
      warranty_expires: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000), // 3 years
      support_level: license.tier === 'enterprise' ? 'enterprise' : license.tier === 'business' ? 'premium' : 'basic',
      replacement_entitlements: license.tier === 'enterprise' ? 3 : license.tier === 'business' ? 2 : 1
    };

    license.hardware_entitlements.push(entitlement);
    console.log(`🔧 Registered ${hardwareType} hardware: ${serialNumber}`);

    return hardwareId;
  }

  async validateHardware(licenseId: string, serialNumber: string): Promise<boolean> {
    const license = this.licenses.get(licenseId);
    if (!license) return false;

    return license.hardware_entitlements.some(hw => 
      hw.serial_number === serialNumber && 
      hw.warranty_expires.getTime() > Date.now()
    );
  }

  // Usage Tracking
  async recordUsage(licenseId: string, usage: Partial<UsageMetrics>): Promise<void> {
    const license = this.licenses.get(licenseId);
    if (!license) return;

    const currentPeriod = this.getCurrentBillingPeriod(license);
    const existingMetrics = this.usageMetrics.get(licenseId) || [];
    
    const periodMetrics = existingMetrics.find(m => 
      m.period_start.getTime() === currentPeriod.start.getTime()
    );

    if (periodMetrics) {
      // Update existing metrics
      Object.assign(periodMetrics, usage, { period_end: new Date() });
    } else {
      // Create new metrics
      const newMetrics: UsageMetrics = {
        license_id: licenseId,
        period_start: currentPeriod.start,
        period_end: new Date(),
        devices_connected: 0,
        api_calls_made: 0,
        storage_used_gb: 0,
        data_transferred_gb: 0,
        active_users: 0,
        features_used: [],
        compliance_score: 100,
        ...usage
      };
      existingMetrics.push(newMetrics);
    }

    this.usageMetrics.set(licenseId, existingMetrics);
  }

  // Subscription Management
  async upgradeLicense(licenseId: string, newType: License['type'], newTier: License['tier']): Promise<boolean> {
    const license = this.licenses.get(licenseId);
    if (!license) return false;

    const oldFeatures = license.features;
    const newFeatures = this.getLicenseFeatures(newType, newTier);
    const newLimits = this.getLicenseLimits(newType, newTier);
    const newBilling = this.getBillingInfo(newType, newTier, license.billing.billing_cycle);

    // Calculate prorated billing
    const remainingDays = license.expires_at ? Math.max(0, (license.expires_at.getTime() - Date.now()) / (24 * 60 * 60 * 1000)) : 0;
    const proratedCredit = (license.billing.price_monthly / 30) * remainingDays;

    license.type = newType;
    license.tier = newTier;
    license.features = newFeatures;
    license.limits = newLimits;
    license.billing = newBilling;

    console.log(`⬆️ Upgraded license ${licenseId} from ${JSON.stringify(oldFeatures)} to ${newType}/${newTier}`);
    console.log(`💰 Prorated credit: $${proratedCredit.toFixed(2)}`);

    return true;
  }

  async renewLicense(licenseId: string): Promise<boolean> {
    const license = this.licenses.get(licenseId);
    if (!license) return false;

    const extensionDays = license.billing.billing_cycle === 'annual' ? 365 : 30;
    const newExpiration = new Date(Date.now() + extensionDays * 24 * 60 * 60 * 1000);

    license.expires_at = newExpiration;
    license.status = 'active';
    license.billing.next_billing_date = newExpiration;

    console.log(`🔄 Renewed license ${licenseId} until ${newExpiration.toISOString()}`);

    return true;
  }

  // Analytics and Reporting
  async getLicenseAnalytics(licenseId: string): Promise<{
    usage_trends: any[];
    feature_adoption: Record<string, number>;
    compliance_history: any[];
    cost_analysis: any;
    recommendations: string[];
  }> {
    const license = this.licenses.get(licenseId);
    const usage = this.usageMetrics.get(licenseId) || [];

    if (!license) {
      throw new Error('License not found');
    }

    const usageTrends = usage.map(u => ({
      period: u.period_start,
      devices: u.devices_connected,
      users: u.active_users,
      storage: u.storage_used_gb,
      api_calls: u.api_calls_made
    }));

    const featureAdoption = usage.reduce((acc, u) => {
      u.features_used.forEach(feature => {
        acc[feature] = (acc[feature] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const recommendations = this.generateRecommendations(license, usage);

    return {
      usage_trends: usageTrends,
      feature_adoption: featureAdoption,
      compliance_history: usage.map(u => ({ period: u.period_start, score: u.compliance_score })),
      cost_analysis: {
        current_monthly_cost: license.billing.price_monthly,
        annual_savings: license.billing.price_annual - (license.billing.price_monthly * 12),
        usage_efficiency: this.calculateUsageEfficiency(license, usage)
      },
      recommendations
    };
  }

  // Private Utility Methods
  private getLicenseFeatures(type: License['type'], tier: License['tier']): LicenseFeatures {
    const baseFeatures: LicenseFeatures = {
      dasheros_core: true,
      device_management: true,
      iot_integration: false,
      edge_computing: false,
      security_suite: false,
      ai_acceleration: false,
      custom_integrations: false,
      api_access: false,
      white_labeling: false,
      custom_branding: false,
      user_management: false,
      admin_controls: false,
      compliance_tools: false,
      audit_logging: false,
      sso_integration: false,
      priority_support: false,
      professional_services: false,
      custom_development: false,
      dedicated_account_manager: false,
      sla_guarantees: false
    };

    switch (type) {
      case 'free':
        return baseFeatures;
      
      case 'pro':
        return {
          ...baseFeatures,
          iot_integration: true,
          edge_computing: true,
          security_suite: true,
          api_access: true,
          priority_support: true
        };
      
      case 'enterprise':
        return {
          ...baseFeatures,
          iot_integration: true,
          edge_computing: true,
          security_suite: true,
          ai_acceleration: true,
          custom_integrations: true,
          api_access: true,
          white_labeling: true,
          custom_branding: true,
          user_management: true,
          admin_controls: true,
          compliance_tools: true,
          audit_logging: true,
          sso_integration: true,
          priority_support: true,
          professional_services: true,
          custom_development: true,
          dedicated_account_manager: true,
          sla_guarantees: true
        };
      
      case 'business':
        return {
          ...baseFeatures,
          iot_integration: true,
          security_suite: true,
          api_access: true,
          user_management: true,
          admin_controls: true,
          compliance_tools: true,
          priority_support: true
        };
      
      case 'hardware_bundle':
        return {
          ...baseFeatures,
          iot_integration: true,
          edge_computing: true,
          security_suite: true,
          ai_acceleration: true,
          priority_support: true
        };
      
      default:
        return baseFeatures;
    }
  }

  private getLicenseLimits(type: License['type'], tier: License['tier']): LicenseLimits {
    const baseLimits = {
      max_devices: 3,
      max_users: 1,
      max_storage_gb: 5,
      max_api_calls_per_month: 1000,
      max_iot_devices: 0,
      max_edge_nodes: 0,
      data_retention_days: 30,
      concurrent_sessions: 1
    };

    switch (type) {
      case 'free':
        return baseLimits;
      
      case 'pro':
        return {
          max_devices: 25,
          max_users: 1,
          max_storage_gb: 100,
          max_api_calls_per_month: 100000,
          max_iot_devices: 50,
          max_edge_nodes: 5,
          data_retention_days: 365,
          concurrent_sessions: 3
        };
      
      case 'enterprise':
        return {
          max_devices: 999999,
          max_users: 999999,
          max_storage_gb: 999999,
          max_api_calls_per_month: 999999999,
          max_iot_devices: 999999,
          max_edge_nodes: 999999,
          data_retention_days: 2555, // 7 years
          concurrent_sessions: 999999
        };
      
      case 'business':
        return {
          max_devices: 100,
          max_users: 50,
          max_storage_gb: 500,
          max_api_calls_per_month: 1000000,
          max_iot_devices: 200,
          max_edge_nodes: 20,
          data_retention_days: 1095, // 3 years
          concurrent_sessions: 50
        };
      
      case 'hardware_bundle':
        return {
          max_devices: 100,
          max_users: 10,
          max_storage_gb: 1000,
          max_api_calls_per_month: 500000,
          max_iot_devices: 500,
          max_edge_nodes: 50,
          data_retention_days: 1095,
          concurrent_sessions: 25
        };
      
      default:
        return baseLimits;
    }
  }

  private getBillingInfo(type: License['type'], tier: License['tier'], cycle: 'monthly' | 'annual'): BillingInfo {
    const pricing = {
      free: { monthly: 0, annual: 0 },
      pro: { monthly: 9.99, annual: 99.99 },
      enterprise: { monthly: 49.99, annual: 499.99 },
      business: { monthly: 19.99, annual: 199.99 },
      hardware_bundle: { monthly: 29.99, annual: 299.99 },
      developer: { monthly: 14.99, annual: 149.99 }
    };

    const prices = pricing[type] || pricing.free;
    
    return {
      plan: `${type}_${tier}_${cycle}`,
      price_monthly: prices.monthly,
      price_annual: prices.annual,
      currency: 'USD',
      billing_cycle: cycle,
      next_billing_date: cycle === 'lifetime' ? undefined : new Date(Date.now() + (cycle === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000),
      auto_renewal: true,
      discount_percent: cycle === 'annual' ? 20 : 0
    };
  }

  private async getCurrentUsage(licenseId: string): Promise<UsageMetrics | null> {
    const metrics = this.usageMetrics.get(licenseId) || [];
    const license = this.licenses.get(licenseId);
    
    if (!license) return null;
    
    const currentPeriod = this.getCurrentBillingPeriod(license);
    return metrics.find(m => m.period_start.getTime() === currentPeriod.start.getTime()) || null;
  }

  private getCurrentBillingPeriod(license: License): { start: Date; end: Date } {
    const now = new Date();
    const created = license.created_at;
    
    if (license.billing.billing_cycle === 'annual') {
      const yearsSinceCreation = Math.floor((now.getTime() - created.getTime()) / (365 * 24 * 60 * 60 * 1000));
      const periodStart = new Date(created.getTime() + yearsSinceCreation * 365 * 24 * 60 * 60 * 1000);
      const periodEnd = new Date(periodStart.getTime() + 365 * 24 * 60 * 60 * 1000);
      return { start: periodStart, end: periodEnd };
    } else {
      const monthsSinceCreation = Math.floor((now.getTime() - created.getTime()) / (30 * 24 * 60 * 60 * 1000));
      const periodStart = new Date(created.getTime() + monthsSinceCreation * 30 * 24 * 60 * 60 * 1000);
      const periodEnd = new Date(periodStart.getTime() + 30 * 24 * 60 * 60 * 1000);
      return { start: periodStart, end: periodEnd };
    }
  }

  private generateRecommendations(license: License, usage: UsageMetrics[]): string[] {
    const recommendations: string[] = [];
    const currentUsage = usage[usage.length - 1];
    
    if (!currentUsage) return recommendations;

    // Usage efficiency recommendations
    if (currentUsage.devices_connected < license.limits.max_devices * 0.3) {
      recommendations.push('Consider downgrading to a lower tier to reduce costs');
    }
    
    if (currentUsage.devices_connected > license.limits.max_devices * 0.8) {
      recommendations.push('Consider upgrading to accommodate growing device count');
    }
    
    if (currentUsage.api_calls_made > license.limits.max_api_calls_per_month * 0.9) {
      recommendations.push('API call limit approaching - consider upgrading or optimizing usage');
    }
    
    if (license.billing.billing_cycle === 'monthly' && usage.length > 6) {
      recommendations.push('Switch to annual billing to save 20% on subscription costs');
    }
    
    if (!license.features.iot_integration && currentUsage.devices_connected > 10) {
      recommendations.push('Enable IoT integration to better manage your growing device ecosystem');
    }

    return recommendations;
  }

  private calculateUsageEfficiency(license: License, usage: UsageMetrics[]): number {
    if (usage.length === 0) return 0;
    
    const currentUsage = usage[usage.length - 1];
    const deviceEfficiency = currentUsage.devices_connected / license.limits.max_devices;
    const storageEfficiency = currentUsage.storage_used_gb / license.limits.max_storage_gb;
    const apiEfficiency = currentUsage.api_calls_made / license.limits.max_api_calls_per_month;
    
    return (deviceEfficiency + storageEfficiency + apiEfficiency) / 3;
  }

  private cacheValidationResult(licenseId: string, result: LicenseValidationResult): void {
    this.validationCache.set(licenseId, {
      result,
      timestamp: new Date()
    });
  }

  // Public Getters
  getLicense(licenseId: string): License | undefined {
    return this.licenses.get(licenseId);
  }

  getUserLicenses(userId: string): License[] {
    return Array.from(this.licenses.values()).filter(l => l.user_id === userId);
  }

  getOrganizationLicenses(organizationId: string): License[] {
    return Array.from(this.licenses.values()).filter(l => l.organization_id === organizationId);
  }

  getAllLicenses(): License[] {
    return Array.from(this.licenses.values());
  }
}

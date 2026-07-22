/**
 * DASHED Installation & Migration System
 * Complete installation wizard, deployment automation, and data migration
 */

export interface InstallationProfile {
  id: string;
  type: 'cloud' | 'local' | 'container' | 'hardware' | 'embedded';
  target_os: 'linux' | 'windows' | 'macos' | 'custom';
  installation_method: InstallationMethod;
  image_url: string;
  checksum: string;
  size_gb: number;
  estimated_duration_minutes: number;
  requirements: SystemRequirements;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export type InstallationMethod = 
  | 'one_click'
  | 'container'
  | 'cloud_vm'
  | 'usb_boot'
  | 'pxe_network'
  | 'docker'
  | 'kubernetes'
  | 'qemu'
  | 'vmware'
  | 'virtualbox';

export interface SystemRequirements {
  min_cpu_cores: number;
  min_memory_gb: number;
  min_storage_gb: number;
  recommended_cpu_cores: number;
  recommended_memory_gb: number;
  recommended_storage_gb: number;
  supported_platforms: string[];
  network_requirements: NetworkRequirements;
  hardware_requirements?: HardwareRequirements;
}

export interface NetworkRequirements {
  internet_required: boolean;
  min_bandwidth_mbps: number;
  firewall_exceptions: string[];
  required_ports: number[];
  proxy_support: boolean;
}

export interface HardwareRequirements {
  gpu_required: boolean;
  gpu_vram_required_gb?: number;
  tpm_required: boolean;
  secure_boot_required: boolean;
  uefi_required: boolean;
  specific_hardware?: string[];
}

export interface InstallationProgress {
  installation_id: string;
  status: InstallationStatus;
  current_step: number;
  total_steps: number;
  percent_complete: number;
  estimated_remaining_minutes: number;
  current_phase: string;
  log_entries: LogEntry[];
  errors?: InstallationError[];
  started_at: Date;
  completed_at?: Date;
}

export type InstallationStatus = 
  | 'pending'
  | 'preparing'
  | 'downloading'
  | 'verifying'
  | 'extracting'
  | 'installing'
  | 'configuring'
  | 'optimizing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  details?: Record<string, any>;
}

export interface InstallationError {
  code: string;
  message: string;
  severity: 'warning' | 'error' | 'critical';
  recovery_steps?: string[];
  timestamp: Date;
}

export interface CloudHostedImage {
  id: string;
  version: string;
  channel: 'stable' | 'beta' | 'preview' | 'custom';
  os_type: string;
  architecture: 'arm64' | 'x86_64' | 'multi';
  size_gb: number;
  download_url: string;
  torrent_url?: string;
  checksum_sha256: string;
  release_date: Date;
  eol_date?: Date;
  release_notes: string;
  supported_hardware: string[];
  cdn_regions: string[];
}

export interface DownloadService {
  type: 'direct' | 'torrent' | 'cdn' | 'resumable';
  primary_url: string;
  fallback_urls: string[];
  chunk_size_mb: number;
  parallel_connections: number;
  resume_capable: boolean;
  integrity_verification: 'md5' | 'sha256' | 'sha512';
  estimated_speed_mbps?: number;
  compression: boolean;
  decompression_format?: string;
}

export interface MigrationProfile {
  id: string;
  source_system: string;
  target_system: string;
  migration_type: 'full_system' | 'data_only' | 'partial' | 'selective';
  scope: MigrationScope;
  schedule: MigrationSchedule;
  status: MigrationStatus;
  created_at: Date;
  started_at?: Date;
  completed_at?: Date;
}

export interface MigrationScope {
  include_user_data: boolean;
  include_applications: boolean;
  include_settings: boolean;
  include_licenses: boolean;
  include_devices: boolean;
  exclude_patterns?: string[];
  include_patterns?: string[];
  data_filters?: DataFilter[];
}

export interface DataFilter {
  type: 'file_type' | 'size_range' | 'date_range' | 'pattern';
  criteria: Record<string, any>;
  action: 'include' | 'exclude';
}

export interface MigrationSchedule {
  start_time: Date;
  duration_estimate_minutes: number;
  allow_incremental: boolean;
  rollback_enabled: boolean;
  maintenance_window?: boolean;
  parallel_operations: number;
}

export type MigrationStatus = 
  | 'planning'
  | 'pre_migration'
  | 'validation'
  | 'migrating'
  | 'post_migration'
  | 'verification'
  | 'completed'
  | 'rolled_back'
  | 'failed'
  | 'paused';

export interface MigrationProgress {
  migration_id: string;
  status: MigrationStatus;
  current_phase: string;
  percent_complete: number;
  items_processed: number;
  items_total: number;
  bytes_transferred: number;
  bytes_total: number;
  estimated_remaining_minutes: number;
  errors: MigrationError[];
  created_backups: BackupInfo[];
  validation_results: ValidationResult[];
}

export interface MigrationError {
  error_code: string;
  message: string;
  item: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  recovery_action?: string;
  timestamp: Date;
}

export interface BackupInfo {
  backup_id: string;
  type: 'pre_migration' | 'incremental' | 'rollback';
  location: string;
  size_gb: number;
  created_at: Date;
  retention_days: number;
  encrypted: boolean;
  verified: boolean;
}

export interface ValidationResult {
  validation_type: 'pre_migration' | 'during_migration' | 'post_migration';
  status: 'passed' | 'warning' | 'failed';
  checks_passed: number;
  checks_failed: number;
  checks_warning: number;
  details: ValidationCheck[];
  timestamp: Date;
}

export interface ValidationCheck {
  check_name: string;
  status: 'passed' | 'warning' | 'failed';
  message: string;
  details?: Record<string, any>;
}

export interface InstallationWizardState {
  current_step: number;
  total_steps: number;
  installation_type: InstallationMethod;
  system_info: SystemInfo;
  user_inputs: Record<string, any>;
  compatibility_check: CompatibilityCheck;
  configuration: InstallationConfiguration;
  estimated_duration_minutes: number;
  ready_to_install: boolean;
  validation_errors: string[];
}

export interface SystemInfo {
  os_type: string;
  os_version: string;
  architecture: 'x86_64' | 'arm64' | 'arm32' | 'other';
  cpu_cores: number;
  total_memory_gb: number;
  available_memory_gb: number;
  storage_gb: number;
  available_storage_gb: number;
  virtualization_enabled: boolean;
  secure_boot_enabled: boolean;
  tpm_available: boolean;
  network_connected: boolean;
  hostname: string;
}

export interface CompatibilityCheck {
  compatible: boolean;
  warnings: string[];
  required_upgrades: string[];
  optional_improvements: string[];
  hardware_compatibility: string;
  os_compatibility: string;
  timestamp: Date;
}

export interface InstallationConfiguration {
  installation_path: string;
  enable_optimization: boolean;
  enable_monitoring: boolean;
  enable_auto_updates: boolean;
  timezone: string;
  language: string;
  network_configuration: NetworkConfiguration;
  security_settings: SecuritySettings;
  backup_settings: BackupSettings;
  custom_options: Record<string, any>;
}

export interface NetworkConfiguration {
  dhcp_enabled: boolean;
  static_ip?: string;
  gateway?: string;
  dns_servers: string[];
  proxy_enabled: boolean;
  proxy_url?: string;
  vpn_integration: boolean;
}

export interface SecuritySettings {
  firewall_enabled: boolean;
  antivirus_enabled: boolean;
  cache_timing_protection: boolean;
  host_os_throttling: boolean;
  secure_boot: boolean;
  encryption_key_derivation: 'pbkdf2' | 'argon2' | 'scrypt';
}

export interface BackupSettings {
  enable_automatic_backups: boolean;
  backup_frequency: 'daily' | 'weekly' | 'monthly';
  backup_location: string;
  retention_days: number;
  incremental_backups: boolean;
  cloud_backup: boolean;
}

export interface RollbackCapability {
  supported: boolean;
  backup_available: boolean;
  backup_location: string;
  backup_size_gb: number;
  estimated_rollback_time_minutes: number;
  data_loss_potential: string;
  previous_state_available: boolean;
  rollback_point_date: Date;
}

export interface InstallationService {
  // Installation operations
  startInstallation(profile: InstallationProfile): Promise<{ installation_id: string }>;
  getInstallationProgress(installation_id: string): Promise<InstallationProgress>;
  cancelInstallation(installation_id: string): Promise<void>;
  pauseInstallation(installation_id: string): Promise<void>;
  resumeInstallation(installation_id: string): Promise<void>;
  
  // Cloud image management
  listCloudImages(filters?: Record<string, any>): Promise<CloudHostedImage[]>;
  downloadCloudImage(image_id: string, options?: Record<string, any>): Promise<DownloadService>;
  verifyImageIntegrity(file_path: string, checksum: string): Promise<boolean>;
  
  // Migration operations
  startMigration(profile: MigrationProfile): Promise<{ migration_id: string }>;
  getMigrationProgress(migration_id: string): Promise<MigrationProgress>;
  rollbackMigration(migration_id: string): Promise<void>;
  pauseMigration(migration_id: string): Promise<void>;
  
  // Installation wizard
  initializeWizard(): Promise<InstallationWizardState>;
  getWizardStep(step_number: number): Promise<Record<string, any>>;
  validateWizardStep(step_number: number, data: Record<string, any>): Promise<{ valid: boolean; errors?: string[] }>;
  
  // System checks
  performSystemCheck(): Promise<CompatibilityCheck>;
  getSystemRequirements(installation_type: InstallationMethod): Promise<SystemRequirements>;
  
  // Backup and recovery
  createPreInstallationBackup(): Promise<BackupInfo>;
  getRollbackCapability(installation_id: string): Promise<RollbackCapability>;
}

export interface InstallationFactory {
  // Installation creation
  createInstallationProfile(config: Record<string, any>): InstallationProfile;
  
  // Pre-built profiles
  getCloudInstallationProfile(): InstallationProfile;
  getContainerInstallationProfile(): InstallationProfile;
  getLocalInstallationProfile(): InstallationProfile;
  getHardwareInstallationProfile(hardware_type: string): InstallationProfile;
  
  // Migration creation
  createMigrationProfile(source: string, target: string, scope: MigrationScope): MigrationProfile;
}

/**
 * DASHED Security Framework
 * TailsOS-inspired security with cache timing protection and host OS isolation
 */

export interface SecurityFramework {
  version: string;
  created_at: Date;
  updated_at: Date;
  compliance_level: ComplianceLevel;
  certification_status: CertificationStatus;
  threat_model: ThreatModel;
  security_policies: SecurityPolicy[];
  audit_config: AuditConfiguration;
}

export type ComplianceLevel = 'basic' | 'standard' | 'advanced' | 'enterprise' | 'military-grade';
export type CertificationStatus = 'not-certified' | 'pending' | 'certified' | 'expired';

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  policy_type: PolicyType;
  enforcement_level: 'advisory' | 'warning' | 'enforced' | 'strict';
  rules: SecurityRule[];
  exceptions?: PolicyException[];
  audit_enabled: boolean;
  last_updated: Date;
}

export type PolicyType = 
  | 'privacy'
  | 'encryption'
  | 'authentication'
  | 'access_control'
  | 'data_protection'
  | 'network_security'
  | 'host_isolation'
  | 'cache_protection'
  | 'threat_detection'
  | 'compliance';

export interface SecurityRule {
  id: string;
  name: string;
  condition: RuleCondition;
  action: RuleAction;
  priority: number;
  enabled: boolean;
}

export interface RuleCondition {
  type: string;
  parameters: Record<string, any>;
  operators: 'and' | 'or' | 'not';
  nested_conditions?: RuleCondition[];
}

export interface RuleAction {
  type: 'allow' | 'deny' | 'alert' | 'block' | 'challenge' | 'throttle';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  notification?: boolean;
  log?: boolean;
  remediation?: string;
}

export interface PolicyException {
  id: string;
  user_id?: string;
  resource_id?: string;
  reason: string;
  expiration_date: Date;
  approval_date: Date;
  approved_by: string;
}

export interface ThreatModel {
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  attack_vectors: AttackVector[];
  vulnerabilities: Vulnerability[];
  countermeasures: Countermeasure[];
  risk_matrix: RiskAssessment[];
  last_assessment: Date;
  next_assessment: Date;
}

export interface AttackVector {
  id: string;
  name: string;
  description: string;
  target: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation_status: 'unmitigated' | 'partially_mitigated' | 'mitigated';
}

export interface Vulnerability {
  id: string;
  cve_id?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affected_component: string;
  discovered_date: Date;
  remediation: string;
  remediation_status: 'identified' | 'in_progress' | 'resolved';
  patch_available: boolean;
  patch_version?: string;
}

export interface Countermeasure {
  id: string;
  type: CountermeasureType;
  description: string;
  effectiveness_percent: number;
  implementation_status: 'planned' | 'implemented' | 'verified' | 'deprecated';
  threat_addressed: string;
  resources_required: string[];
}

export type CountermeasureType = 
  | 'preventive'
  | 'detective'
  | 'responsive'
  | 'recovery'
  | 'administrative'
  | 'technical';

export interface RiskAssessment {
  threat: string;
  likelihood: number; // 0-1
  impact: number; // 0-1
  risk_score: number; // 0-1
  current_controls: string[];
  residual_risk: number; // 0-1
  mitigation_plan: string;
}

export interface CacheTimingProtection {
  enabled: boolean;
  protection_type: CacheProtectionType[];
  constant_time_operations: ConstantTimeConfig;
  cache_partitioning: CachePartitioningConfig;
  cache_line_padding: boolean;
  monitoring_active: boolean;
  detected_timing_attacks: TimingAttackDetection[];
}

export type CacheProtectionType = 
  | 'constant_time'
  | 'cache_partitioning'
  | 'cache_line_padding'
  | 'memory_obfuscation'
  | 'timing_normalization'
  | 'noise_injection';

export interface ConstantTimeConfig {
  enabled: boolean;
  cryptographic_operations: boolean;
  memory_access_patterns: boolean;
  branch_prediction_mitigation: boolean;
  spectre_mitigation: boolean;
  meltdown_mitigation: boolean;
}

export interface CachePartitioningConfig {
  enabled: boolean;
  partition_count: number;
  isolation_level: 'process' | 'security_domain' | 'temporal' | 'spatial';
  enforcement_method: 'hardware' | 'software' | 'hybrid';
  performance_overhead_percent: number;
}

export interface TimingAttackDetection {
  attack_id: string;
  timestamp: Date;
  attack_type: string;
  target_operation: string;
  timing_variance_detected: number;
  confidence_percent: number;
  mitigation_applied: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface HostOSThrottling {
  enabled: boolean;
  throttling_type: ThrottlingType[];
  resource_limits: ResourceLimits;
  access_scheduling: AccessScheduling;
  audit_logging: boolean;
  emergency_isolation: boolean;
  isolation_triggers: IsolationTrigger[];
}

export type ThrottlingType = 
  | 'cpu_throttling'
  | 'memory_throttling'
  | 'io_throttling'
  | 'network_throttling'
  | 'interrupt_throttling'
  | 'priority_inversion';

export interface ResourceLimits {
  max_cpu_percent: number;
  max_memory_percent: number;
  max_io_bandwidth_mbps: number;
  max_network_bandwidth_mbps: number;
  max_concurrent_operations: number;
  context_switch_limit: number;
}

export interface AccessScheduling {
  scheduling_enabled: boolean;
  time_slots: TimeSlot[];
  priority_boost_enabled: boolean;
  preemption_enabled: boolean;
  burst_allowance: BurstAllowance;
}

export interface TimeSlot {
  start_time: string; // HH:MM format
  end_time: string;
  priority_level: number;
  resource_allocation_percent: number;
  day_of_week?: number;
}

export interface BurstAllowance {
  enabled: boolean;
  max_burst_duration_ms: number;
  burst_frequency_limit: number;
  recovery_time_ms: number;
}

export interface IsolationTrigger {
  trigger_type: IsolationTriggerType;
  threshold: number;
  threshold_unit: string;
  action: 'warning' | 'throttle' | 'block' | 'isolate';
  auto_recovery_enabled: boolean;
  recovery_delay_ms?: number;
}

export type IsolationTriggerType = 
  | 'cpu_usage_threshold'
  | 'memory_usage_threshold'
  | 'io_rate_threshold'
  | 'malware_detection'
  | 'unauthorized_access'
  | 'timing_attack_detection'
  | 'resource_exhaustion';

export interface PrivacyEngine {
  enabled: boolean;
  privacy_mode: PrivacyMode;
  data_handling: DataHandling;
  anonymization: AnonymizationConfig;
  encryption_config: EncryptionConfig;
  network_privacy: NetworkPrivacy;
  device_privacy: DevicePrivacy;
}

export type PrivacyMode = 'standard' | 'enhanced' | 'strict' | 'paranoid';

export interface DataHandling {
  collect_user_data: boolean;
  collect_telemetry: boolean;
  collect_usage_analytics: boolean;
  allow_third_party_cookies: boolean;
  data_retention_days: number;
  data_deletion_on_logout: boolean;
  encryption_at_rest: boolean;
  encryption_in_transit: boolean;
}

export interface AnonymizationConfig {
  enabled: boolean;
  anonymization_level: 'low' | 'medium' | 'high' | 'maximum';
  remove_identifiers: boolean;
  k_anonymity_level?: number;
  l_diversity_enabled: boolean;
  t_closeness_enabled: boolean;
  differential_privacy_epsilon?: number;
}

export interface EncryptionConfig {
  algorithm: 'AES-256-GCM' | 'ChaCha20-Poly1305' | 'TweetNaCl' | 'libsodium';
  key_derivation: 'PBKDF2' | 'Argon2' | 'scrypt' | 'bcrypt';
  key_size_bits: number;
  key_rotation_days: number;
  encrypted_filesystems: boolean;
  encrypted_swap: boolean;
  encrypted_temp: boolean;
  secure_key_storage: boolean;
  hardware_security_module: boolean;
}

export interface NetworkPrivacy {
  vpn_enabled: boolean;
  vpn_provider?: string;
  tor_enabled: boolean;
  dns_privacy: 'none' | 'dns-over-https' | 'dns-over-tls' | 'dns64';
  leak_protection: boolean;
  ipv6_leak_protection: boolean;
  webrtc_leak_protection: boolean;
  proxy_enabled: boolean;
  traffic_obfuscation: boolean;
}

export interface DevicePrivacy {
  camera_access_controlled: boolean;
  microphone_access_controlled: boolean;
  location_access_controlled: boolean;
  sensor_access_controlled: boolean;
  kill_switch_available: boolean;
  physical_disconnect_option: boolean;
  no_persistent_tracking: boolean;
}

export interface IncidentResponse {
  incident_id: string;
  incident_type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: IncidentStatus;
  detected_at: Date;
  contained_at?: Date;
  resolved_at?: Date;
  affected_systems: string[];
  attack_details: AttackDetails;
  response_actions: ResponseAction[];
  investigation_results: InvestigationResult;
  post_incident_review?: PostIncidentReview;
}

export type IncidentType = 
  | 'intrusion'
  | 'data_breach'
  | 'malware'
  | 'timing_attack'
  | 'privilege_escalation'
  | 'resource_exhaustion'
  | 'policy_violation'
  | 'configuration_drift';

export type IncidentStatus = 
  | 'detected'
  | 'investigating'
  | 'contained'
  | 'remediating'
  | 'resolved'
  | 'closed';

export interface AttackDetails {
  attack_vector: string;
  attack_pattern: string;
  indicators_of_compromise: string[];
  suspicious_processes: string[];
  network_connections: NetworkConnection[];
  file_modifications: FileModification[];
  registry_changes?: RegistryChange[];
}

export interface NetworkConnection {
  protocol: string;
  source_ip: string;
  destination_ip: string;
  port: number;
  direction: 'inbound' | 'outbound';
  status: string;
  start_time: Date;
}

export interface FileModification {
  file_path: string;
  modification_type: 'created' | 'modified' | 'deleted';
  timestamp: Date;
  hash_before?: string;
  hash_after?: string;
  size_before?: number;
  size_after?: number;
}

export interface RegistryChange {
  registry_path: string;
  value_name: string;
  value_before?: string;
  value_after: string;
  timestamp: Date;
  change_type: 'created' | 'modified' | 'deleted';
}

export interface ResponseAction {
  action_id: string;
  action_type: ResponseActionType;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  executed_at?: Date;
  result: string;
  rollback_available: boolean;
}

export type ResponseActionType = 
  | 'isolate_system'
  | 'terminate_process'
  | 'block_network'
  | 'disable_account'
  | 'activate_backup'
  | 'enable_forensics'
  | 'notify_admin'
  | 'escalate_incident';

export interface InvestigationResult {
  root_cause: string;
  attack_timeline: TimelineEvent[];
  evidence_collected: EvidenceItem[];
  persistence_mechanisms: string[];
  lateral_movement: boolean;
  exfiltration_detected: boolean;
  compromised_credentials: string[];
  recommendations: string[];
}

export interface TimelineEvent {
  timestamp: Date;
  event_type: string;
  description: string;
  confidence_percent: number;
}

export interface EvidenceItem {
  evidence_id: string;
  type: 'log' | 'file' | 'memory' | 'network' | 'registry';
  location: string;
  hash: string;
  collection_time: Date;
}

export interface PostIncidentReview {
  review_date: Date;
  lessons_learned: string[];
  prevention_measures: string[];
  detection_improvements: string[];
  response_improvements: string[];
  policy_updates: string[];
  training_recommendations: string[];
}

export interface AuditConfiguration {
  audit_enabled: boolean;
  audit_level: 'minimal' | 'standard' | 'enhanced' | 'maximum';
  log_retention_days: number;
  log_encryption: boolean;
  log_tamper_protection: boolean;
  real_time_alerting: boolean;
  centralized_logging: boolean;
  log_aggregation_server?: string;
  audit_events: AuditEvent[];
}

export interface AuditEvent {
  event_id: string;
  category: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  description: string;
  logging_enabled: boolean;
  alert_enabled: boolean;
  retention_days: number;
}

export interface SecurityService {
  // Policy management
  getSecurityFramework(): Promise<SecurityFramework>;
  updateSecurityPolicy(policy: SecurityPolicy): Promise<void>;
  enforceSecurityPolicy(policy_id: string): Promise<void>;
  
  // Cache protection
  getCacheTimingProtection(): Promise<CacheTimingProtection>;
  enableCacheProtection(protection_type: CacheProtectionType): Promise<void>;
  disableCacheProtection(protection_type: CacheProtectionType): Promise<void>;
  
  // Host OS throttling
  getHostOSThrottling(): Promise<HostOSThrottling>;
  updateThrottlingLimits(limits: ResourceLimits): Promise<void>;
  
  // Privacy
  getPrivacySettings(): Promise<PrivacyEngine>;
  updatePrivacySettings(settings: Partial<PrivacyEngine>): Promise<void>;
  
  // Incident response
  reportIncident(incident: IncidentResponse): Promise<void>;
  getIncidentStatus(incident_id: string): Promise<IncidentResponse>;
  executeIncidentResponse(incident_id: string, action: ResponseActionType): Promise<void>;
  
  // Audit
  getAuditLogs(filters?: Record<string, any>): Promise<AuditEvent[]>;
  generateSecurityReport(start_date: Date, end_date: Date): Promise<Record<string, any>>;
}

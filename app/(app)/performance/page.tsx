"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import {
  Zap,
  Battery,
  Cpu,
  Thermometer,
  Clock,
  Save,
  RotateCcw,
  BarChart3,
  RefreshCw,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  HardDrive,
  AlertTriangle,
  Gauge,
  Leaf,
  Flame,
  Moon,
} from "lucide-react"

// Mock data for devices
const mockDevices = [
  {
    id: "device-1",
    name: "MacBook Pro",
    type: "laptop",
    icon: <Laptop className="h-6 w-6" />,
    os: "macOS",
    status: "online",
    currentProfile: "balanced",
    cpu: {
      model: "Apple M2 Pro",
      cores: 10,
      currentSpeed: 2.8,
      maxSpeed: 3.8,
      usage: 32,
      temperature: 42,
    },
    gpu: {
      model: "Integrated GPU",
      cores: 16,
      usage: 18,
      temperature: 40,
    },
    memory: {
      total: 16,
      used: 8.4,
      speed: 6400,
    },
    power: {
      mode: "balanced",
      batteryLevel: 78,
      estimatedRuntime: "5h 42m",
      charging: false,
    },
    thermal: {
      fanSpeed: 1200,
      maxFanSpeed: 5500,
      temperature: 42,
    },
    performance: {
      score: 8750,
      history: [8200, 8300, 8500, 8400, 8600, 8750],
    },
  },
  {
    id: "device-2",
    name: "iPhone 14 Pro",
    type: "smartphone",
    icon: <Smartphone className="h-6 w-6" />,
    os: "iOS",
    status: "online",
    currentProfile: "balanced",
    cpu: {
      model: "Apple A16 Bionic",
      cores: 6,
      currentSpeed: 1.8,
      maxSpeed: 3.5,
      usage: 24,
      temperature: 38,
    },
    gpu: {
      model: "Apple GPU",
      cores: 5,
      usage: 12,
      temperature: 37,
    },
    memory: {
      total: 6,
      used: 3.2,
      speed: 4800,
    },
    power: {
      mode: "balanced",
      batteryLevel: 64,
      estimatedRuntime: "8h 15m",
      charging: false,
    },
    thermal: {
      fanSpeed: null,
      maxFanSpeed: null,
      temperature: 38,
    },
    performance: {
      score: 5400,
      history: [5200, 5300, 5350, 5400, 5400, 5400],
    },
  },
  {
    id: "device-3",
    name: "iPad Air",
    type: "tablet",
    icon: <Tablet className="h-6 w-6" />,
    os: "iPadOS",
    status: "offline",
    currentProfile: "power-saver",
    cpu: {
      model: "Apple A14 Bionic",
      cores: 6,
      currentSpeed: 1.5,
      maxSpeed: 2.8,
      usage: 0,
      temperature: 25,
    },
    gpu: {
      model: "Apple GPU",
      cores: 4,
      usage: 0,
      temperature: 25,
    },
    memory: {
      total: 4,
      used: 0.8,
      speed: 4266,
    },
    power: {
      mode: "power-saver",
      batteryLevel: 23,
      estimatedRuntime: "2h 30m",
      charging: false,
    },
    thermal: {
      fanSpeed: null,
      maxFanSpeed: null,
      temperature: 25,
    },
    performance: {
      score: 3800,
      history: [4200, 4100, 4000, 3900, 3850, 3800],
    },
  },
  {
    id: "device-4",
    name: "Windows Desktop",
    type: "desktop",
    icon: <Monitor className="h-6 w-6" />,
    os: "Windows",
    status: "online",
    currentProfile: "performance",
    cpu: {
      model: "Intel Core i9-12900K",
      cores: 16,
      currentSpeed: 4.2,
      maxSpeed: 5.2,
      usage: 45,
      temperature: 65,
    },
    gpu: {
      model: "NVIDIA RTX 4080",
      cores: 9728,
      usage: 38,
      temperature: 68,
    },
    memory: {
      total: 32,
      used: 18.4,
      speed: 5600,
    },
    power: {
      mode: "performance",
      batteryLevel: null,
      estimatedRuntime: null,
      charging: null,
    },
    thermal: {
      fanSpeed: 1800,
      maxFanSpeed: 3000,
      temperature: 65,
    },
    performance: {
      score: 15800,
      history: [15200, 15400, 15500, 15600, 15700, 15800],
    },
  },
  {
    id: "device-5",
    name: "Linux Server",
    type: "server",
    icon: <HardDrive className="h-6 w-6" />,
    os: "Ubuntu",
    status: "online",
    currentProfile: "balanced",
    cpu: {
      model: "AMD EPYC 7763",
      cores: 64,
      currentSpeed: 2.8,
      maxSpeed: 3.5,
      usage: 65,
      temperature: 72,
    },
    gpu: {
      model: "None",
      cores: 0,
      usage: 0,
      temperature: 0,
    },
    memory: {
      total: 128,
      used: 86.4,
      speed: 3200,
    },
    power: {
      mode: "balanced",
      batteryLevel: null,
      estimatedRuntime: null,
      charging: null,
    },
    thermal: {
      fanSpeed: 2200,
      maxFanSpeed: 3500,
      temperature: 72,
    },
    performance: {
      score: 24500,
      history: [24000, 24100, 24200, 24300, 24400, 24500],
    },
  },
]

// Performance profiles
const performanceProfiles = [
  {
    id: "power-saver",
    name: "Power Saver",
    icon: <Leaf className="h-5 w-5" />,
    description: "Maximizes battery life by reducing performance",
    cpuLimit: 60,
    gpuLimit: 50,
    fanSpeed: 40,
  },
  {
    id: "balanced",
    name: "Balanced",
    icon: <Gauge className="h-5 w-5" />,
    description: "Balances performance and power consumption",
    cpuLimit: 80,
    gpuLimit: 70,
    fanSpeed: 60,
  },
  {
    id: "performance",
    name: "Performance",
    icon: <Zap className="h-5 w-5" />,
    description: "Maximizes performance for demanding tasks",
    cpuLimit: 100,
    gpuLimit: 100,
    fanSpeed: 80,
  },
  {
    id: "custom",
    name: "Custom",
    icon: <Gauge className="h-5 w-5" />,
    description: "User-defined performance settings",
    cpuLimit: 90,
    gpuLimit: 85,
    fanSpeed: 70,
  },
]

export default function PerformancePage() {
  const { toast } = useToast()
  const [selectedDevice, setSelectedDevice] = useState<string>("device-1")
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [selectedProfile, setSelectedProfile] = useState<string>("balanced")
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  // Settings state
  const [cpuSettings, setCpuSettings] = useState({
    maxFrequency: 100,
    powerLimit: 80,
    turboBoost: true,
  })

  const [gpuSettings, setGpuSettings] = useState({
    maxFrequency: 100,
    powerLimit: 70,
  })

  const [memorySettings, setMemorySettings] = useState({
    profile: "auto",
    pageFile: 8,
  })

  const [thermalSettings, setThermalSettings] = useState({
    fanControl: "auto",
    customFanSpeed: 60,
    targetTemperature: 75,
  })

  const [powerSettings, setPowerSettings] = useState({
    plan: "balanced",
    sleepAfter: 15,
    displayOff: 5,
  })

  // Get the selected device details
  const device = mockDevices.find((d) => d.id === selectedDevice) || mockDevices[0]

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Refreshed",
        description: "Performance data has been updated",
      })
    }, 1500)
  }

  // Handle profile change
  const handleProfileChange = (profileId: string) => {
    setSelectedProfile(profileId)

    const profile = performanceProfiles.find((p) => p.id === profileId)

    if (profile && profileId !== "custom") {
      setCpuSettings({
        ...cpuSettings,
        maxFrequency: profile.cpuLimit,
        powerLimit: profile.cpuLimit,
      })

      setGpuSettings({
        ...gpuSettings,
        maxFrequency: profile.gpuLimit,
        powerLimit: profile.gpuLimit,
      })

      setThermalSettings({
        ...thermalSettings,
        customFanSpeed: profile.fanSpeed,
      })

      setPowerSettings({
        ...powerSettings,
        plan: profileId,
      })

      toast({
        title: "Profile Applied",
        description: `Switched to ${profile.name} profile`,
      })
    }
  }

  // Handle save settings
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Performance settings have been applied to the device",
    })
    setIsEditing(false)
  }

  // Handle reset settings
  const handleResetSettings = () => {
    // Reset to profile defaults
    handleProfileChange(selectedProfile)

    toast({
      title: "Settings Reset",
      description: "Performance settings have been reset to defaults",
    })
  }

  // Format temperature
  const formatTemperature = (temp: number) => {
    return `${temp}°C`
  }

  // Get temperature color
  const getTemperatureColor = (temp: number) => {
    if (temp > 80) return "text-red-500"
    if (temp > 70) return "text-orange-500"
    if (temp > 60) return "text-yellow-500"
    return "text-green-500"
  }

  // Get usage color
  const getUsageColor = (usage: number) => {
    if (usage > 90) return "text-red-500"
    if (usage > 70) return "text-yellow-500"
    return "text-green-500"
  }

  // Get profile icon
  const getProfileIcon = (profileId: string) => {
    const profile = performanceProfiles.find((p) => p.id === profileId)
    return profile?.icon || <Gauge className="h-5 w-5" />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
              <p className="text-gray-600">Monitor and optimize device performance</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger className="w-full md:w-[220px]">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  {mockDevices.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      <div className="flex items-center">
                        {device.icon}
                        <span className="ml-2">{device.name}</span>
                        {device.status === "offline" && (
                          <Badge variant="outline" className="ml-2 text-gray-500">
                            Offline
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Device Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center mr-4">
                  {device.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-gray-900">{device.name}</h2>
                    <div
                      className={`w-2 h-2 rounded-full ml-2 ${device.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                    ></div>
                  </div>
                  <p className="text-gray-600">
                    {device.os} • {device.cpu.model}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Cpu className="h-5 w-5 text-accent-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">CPU</p>
                    <p className={`text-sm ${getUsageColor(device.cpu.usage)}`}>{device.cpu.usage}%</p>
                  </div>
                </div>

                {device.gpu.model !== "None" && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent-500 mr-2"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <path d="M6 12h4" />
                      <path d="M14 12h4" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-700">GPU</p>
                      <p className={`text-sm ${getUsageColor(device.gpu.usage)}`}>{device.gpu.usage}%</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Thermometer className="h-5 w-5 text-accent-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Temp</p>
                    <p className={`text-sm ${getTemperatureColor(device.cpu.temperature)}`}>
                      {formatTemperature(device.cpu.temperature)}
                    </p>
                  </div>
                </div>

                {device.power.batteryLevel !== null && (
                  <div className="flex items-center">
                    <Battery className="h-5 w-5 text-accent-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Battery</p>
                      <p className="text-sm">{device.power.batteryLevel}%</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-accent-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Performance</p>
                    <p className="text-sm">{device.performance.score.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  {getProfileIcon(device.currentProfile)}
                  <span className="text-sm font-medium capitalize">
                    {device.currentProfile.replace("-", " ")} Profile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cpu">CPU</TabsTrigger>
              <TabsTrigger value="gpu">GPU</TabsTrigger>
              <TabsTrigger value="memory">Memory</TabsTrigger>
              <TabsTrigger value="thermal">Thermal</TabsTrigger>
              <TabsTrigger value="power">Power</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Performance Profiles */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Profiles</CardTitle>
                  <CardDescription>Select a performance profile for your device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {performanceProfiles.map((profile) => (
                      <div
                        key={profile.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedProfile === profile.id
                            ? "border-accent-500 bg-accent-50"
                            : "border-gray-200 hover:border-accent-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleProfileChange(profile.id)}
                      >
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-8 h-8 rounded-full ${
                              selectedProfile === profile.id ? "bg-accent-100" : "bg-gray-100"
                            } flex items-center justify-center mr-3`}
                          >
                            {profile.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{profile.name}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{profile.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CPU & GPU Usage */}
                <Card>
                  <CardHeader>
                    <CardTitle>Processor Usage</CardTitle>
                    <CardDescription>Current CPU and GPU utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <Cpu className="h-4 w-4 text-accent-500 mr-2" />
                            <span className="text-sm font-medium">CPU Usage</span>
                          </div>
                          <span className={`text-sm font-medium ${getUsageColor(device.cpu.usage)}`}>
                            {device.cpu.usage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              device.cpu.usage > 90
                                ? "bg-red-500"
                                : device.cpu.usage > 70
                                  ? "bg-yellow-500"
                                  : "bg-accent-500"
                            }`}
                            style={{ width: `${device.cpu.usage}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>

                      {device.gpu.model !== "None" && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-accent-500 mr-2"
                              >
                                <rect x="2" y="6" width="20" height="12" rx="2" />
                                <path d="M6 12h4" />
                                <path d="M14 12h4" />
                              </svg>
                              <span className="text-sm font-medium">GPU Usage</span>
                            </div>
                            <span className={`text-sm font-medium ${getUsageColor(device.gpu.usage)}`}>
                              {device.gpu.usage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                device.gpu.usage > 90
                                  ? "bg-red-500"
                                  : device.gpu.usage > 70
                                    ? "bg-yellow-500"
                                    : "bg-accent-500"
                              }`}
                              style={{ width: `${device.gpu.usage}%` }}
                            ></div>
                          </div>
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Processor Information</h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">CPU Model</span>
                            <span className="text-xs font-medium">{device.cpu.model}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Cores</span>
                            <span className="text-xs font-medium">{device.cpu.cores} cores</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Current Speed</span>
                            <span className="text-xs font-medium">{device.cpu.currentSpeed} GHz</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Max Speed</span>
                            <span className="text-xs font-medium">{device.cpu.maxSpeed} GHz</span>
                          </div>
                          {device.gpu.model !== "None" && (
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-500">GPU Model</span>
                              <span className="text-xs font-medium">{device.gpu.model}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Temperature & Memory */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Temperature and memory usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 text-accent-500 mr-2" />
                            <span className="text-sm font-medium">Temperature</span>
                          </div>
                          <span className={`text-sm font-medium ${getTemperatureColor(device.cpu.temperature)}`}>
                            {formatTemperature(device.cpu.temperature)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              device.cpu.temperature > 80
                                ? "bg-red-500"
                                : device.cpu.temperature > 70
                                  ? "bg-orange-500"
                                  : device.cpu.temperature > 60
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                            style={{ width: `${(device.cpu.temperature / 100) * 100}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>0°C</span>
                          <span>50°C</span>
                          <span>100°C</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-accent-500 mr-2"
                            >
                              <path d="M6 19v-3"></path>
                              <path d="M10 19v-3"></path>
                              <path d="M14 19v-3"></path>
                              <path d="M18 19v-3"></path>
                              <path d="M8 11V9"></path>
                              <path d="M16 11V9"></path>
                              <path d="M12 11V9"></path>
                              <path d="M2 15h20"></path>
                              <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"></path>
                            </svg>
                            <span className="text-sm font-medium">Memory Usage</span>
                          </div>
                          <span className="text-sm font-medium">
                            {device.memory.used} GB / {device.memory.total} GB
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-accent-500"
                            style={{ width: `${(device.memory.used / device.memory.total) * 100}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>0 GB</span>
                          <span>{device.memory.total / 2} GB</span>
                          <span>{device.memory.total} GB</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">System Information</h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Memory Speed</span>
                            <span className="text-xs font-medium">{device.memory.speed} MHz</span>
                          </div>
                          {device.thermal.fanSpeed && (
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-500">Fan Speed</span>
                              <span className="text-xs font-medium">{device.thermal.fanSpeed} RPM</span>
                            </div>
                          )}
                          {device.power.batteryLevel !== null && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Battery</span>
                                <span className="text-xs font-medium">{device.power.batteryLevel}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Estimated Runtime</span>
                                <span className="text-xs font-medium">{device.power.estimatedRuntime}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance History */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance History</CardTitle>
                  <CardDescription>Performance score over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {device.performance.history.map((score, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-accent-500 rounded-t-sm"
                          style={{
                            height: `${(score / Math.max(...device.performance.history)) * 100}%`,
                            opacity: 0.5 + (index / device.performance.history.length) * 0.5,
                          }}
                        ></div>
                        <span className="text-xs mt-2">
                          {index === 0 ? "5d ago" : index === device.performance.history.length - 1 ? "Today" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">Current Score: </span>
                      <span className="text-sm font-bold text-accent-600">
                        {device.performance.score.toLocaleString()}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Detailed History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CPU Tab */}
            <TabsContent value="cpu" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>CPU Settings</CardTitle>
                    <CardDescription>Configure processor performance</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleResetSettings}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button size="sm" onClick={handleSaveSettings}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        Edit Settings
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="cpu-frequency">Maximum Frequency</Label>
                          <span className="text-sm">{cpuSettings.maxFrequency}%</span>
                        </div>
                        <Slider
                          id="cpu-frequency"
                          disabled={!isEditing}
                          value={[cpuSettings.maxFrequency]}
                          onValueChange={(value) => setCpuSettings({ ...cpuSettings, maxFrequency: value[0] })}
                          max={100}
                          step={5}
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>Lower</span>
                          <span>Default</span>
                          <span>Higher</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="cpu-power">Power Limit</Label>
                          <span className="text-sm">{cpuSettings.powerLimit}%</span>
                        </div>
                        <Slider
                          id="cpu-power"
                          disabled={!isEditing}
                          value={[cpuSettings.powerLimit]}
                          onValueChange={(value) => setCpuSettings({ ...cpuSettings, powerLimit: value[0] })}
                          max={100}
                          step={5}
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>Efficient</span>
                          <span>Balanced</span>
                          <span>Performance</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="turbo-boost">Turbo Boost</Label>
                          <p className="text-sm text-gray-500">Allow processor to temporarily exceed base frequency</p>
                        </div>
                        <Switch
                          id="turbo-boost"
                          disabled={!isEditing}
                          checked={cpuSettings.turboBoost}
                          onCheckedChange={(checked) => setCpuSettings({ ...cpuSettings, turboBoost: checked })}
                        />
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-amber-800">Performance Notice</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Adjusting CPU settings beyond recommended values may affect system stability and battery
                            life. Changes will be applied after saving and may require a system restart.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CPU Performance</CardTitle>
                  <CardDescription>Current processor metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-accent-500 mr-2" />
                          <h3 className="font-medium text-gray-900">Clock Speed</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {device.cpu.currentSpeed} <span className="text-sm font-normal text-gray-500">GHz</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Max: {device.cpu.maxSpeed} GHz</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Cpu className="h-5 w-5 text-accent-500 mr-2" />
                          <h3 className="font-medium text-gray-900">Utilization</h3>
                        </div>
                        <p className={`text-2xl font-bold ${getUsageColor(device.cpu.usage)}`}>
                          {device.cpu.usage}
                          <span className="text-sm font-normal text-gray-500">%</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{device.cpu.cores} cores</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Thermometer className="h-5 w-5 text-accent-500 mr-2" />
                          <h3 className="font-medium text-gray-900">Temperature</h3>
                        </div>
                        <p className={`text-2xl font-bold ${getTemperatureColor(device.cpu.temperature)}`}>
                          {device.cpu.temperature}
                          <span className="text-sm font-normal text-gray-500">°C</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {device.cpu.temperature < 60 ? "Normal" : device.cpu.temperature < 80 ? "Moderate" : "High"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Core Utilization</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Array.from({ length: Math.min(8, device.cpu.cores) }).map((_, index) => {
                          const usage = Math.floor(Math.random() * (device.cpu.usage + 20)) % 100
                          return (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Core {index + 1}</span>
                                <span className={getUsageColor(usage)}>{usage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    usage > 90 ? "bg-red-500" : usage > 70 ? "bg-yellow-500" : "bg-accent-500"
                                  }`}
                                  style={{ width: `${usage}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GPU Tab */}
            <TabsContent value="gpu" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>GPU Settings</CardTitle>
                    <CardDescription>Configure graphics performance</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleResetSettings}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button size="sm" onClick={handleSaveSettings}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        Edit Settings
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {device.gpu.model === "None" ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <rect x="2" y="6" width="20" height="12" rx="2" />
                          <path d="M6 12h4" />
                          <path d="M14 12h4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No GPU Detected</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        This device does not have a dedicated graphics processor or the GPU is not accessible.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label htmlFor="gpu-frequency">Maximum Frequency</Label>
                            <span className="text-sm">{gpuSettings.maxFrequency}%</span>
                          </div>
                          <Slider
                            id="gpu-frequency"
                            disabled={!isEditing}
                            value={[gpuSettings.maxFrequency]}
                            onValueChange={(value) => setGpuSettings({ ...gpuSettings, maxFrequency: value[0] })}
                            max={100}
                            step={5}
                          />
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Lower</span>
                            <span>Default</span>
                            <span>Higher</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <Label htmlFor="gpu-power">Power Limit</Label>
                            <span className="text-sm">{gpuSettings.powerLimit}%</span>
                          </div>
                          <Slider
                            id="gpu-power"
                            disabled={!isEditing}
                            value={[gpuSettings.powerLimit]}
                            onValueChange={(value) => setGpuSettings({ ...gpuSettings, powerLimit: value[0] })}
                            max={100}
                            step={5}
                          />
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Efficient</span>
                            <span>Balanced</span>
                            <span>Performance</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-amber-800">Performance Notice</h4>
                            <p className="text-sm text-amber-700 mt-1">
                              Adjusting GPU settings beyond recommended values may affect system stability, graphics
                              performance, and battery life. Changes will be applied after saving.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {device.gpu.model !== "None" && (
                <Card>
                  <CardHeader>
                    <CardTitle>GPU Performance</CardTitle>
                    <CardDescription>Current graphics processor metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-accent-500 mr-2"
                            >
                              <rect x="2" y="6" width="20" height="12" rx="2" />
                              <path d="M6 12h4" />
                              <path d="M14 12h4" />
                            </svg>
                            <h3 className="font-medium text-gray-900">GPU Model</h3>
                          </div>
                          <p className="text-lg font-medium text-gray-900">{device.gpu.model}</p>
                          <p className="text-sm text-gray-500 mt-1">{device.gpu.cores} cores</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Cpu className="h-5 w-5 text-accent-500 mr-2" />
                            <h3 className="font-medium text-gray-900">Utilization</h3>
                          </div>
                          <p className={`text-2xl font-bold ${getUsageColor(device.gpu.usage)}`}>
                            {device.gpu.usage}
                            <span className="text-sm font-normal text-gray-500">%</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {device.gpu.usage < 30
                              ? "Light load"
                              : device.gpu.usage < 70
                                ? "Moderate load"
                                : "Heavy load"}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Thermometer className="h-5 w-5 text-accent-500 mr-2" />
                            <h3 className="font-medium text-gray-900">Temperature</h3>
                          </div>
                          <p className={`text-2xl font-bold ${getTemperatureColor(device.gpu.temperature)}`}>
                            {device.gpu.temperature}
                            <span className="text-sm font-normal text-gray-500">°C</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {device.gpu.temperature < 60 ? "Normal" : device.gpu.temperature < 80 ? "Moderate" : "High"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">GPU Memory</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Memory Usage</span>
                            <span className="text-sm font-medium">2.4 GB / 8 GB</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="h-2 rounded-full bg-accent-500" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Memory Tab */}
            <TabsContent value="memory" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Memory Settings</CardTitle>
                    <CardDescription>Configure system memory performance</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleResetSettings}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button size="sm" onClick={handleSaveSettings}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        Edit Settings
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="memory-profile">Memory Profile</Label>
                          <Select
                            disabled={!isEditing}
                            value={memorySettings.profile}
                            onValueChange={(value) => setMemorySettings({ ...memorySettings, profile: value })}
                          >
                            <SelectTrigger id="memory-profile">
                              <SelectValue placeholder="Select profile" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto (Default)</SelectItem>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="performance">Performance</SelectItem>
                              <SelectItem value="extreme">Extreme</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500">
                            Memory timing profile affects system stability and performance
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="page-file">Virtual Memory (Page File)</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="page-file"
                              type="number"
                              disabled={!isEditing}
                              value={memorySettings.pageFile}
                              onChange={(e) =>
                                setMemorySettings({ ...memorySettings, pageFile: Number.parseInt(e.target.value) || 0 })
                              }
                              className="w-24"
                              min={1}
                              max={32}
                            />
                            <span className="text-sm">GB</span>
                          </div>
                          <p className="text-xs text-gray-500">Virtual memory size (requires restart to apply)</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-amber-800">Memory Settings Notice</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Changing memory profiles may require a system restart and can affect system stability. Only
                            adjust these settings if you understand the potential impacts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Memory Usage</CardTitle>
                  <CardDescription>Current memory allocation and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Physical Memory Usage</span>
                        <span className="text-sm font-medium">
                          {device.memory.used} GB / {device.memory.total} GB
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-accent-500"
                          style={{ width: `${(device.memory.used / device.memory.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>0 GB</span>
                        <span>{device.memory.total / 2} GB</span>
                        <span>{device.memory.total} GB</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Memory Information</h4>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Total Memory</span>
                            <span className="text-sm font-medium">{device.memory.total} GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Used Memory</span>
                            <span className="text-sm font-medium">{device.memory.used} GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Available Memory</span>
                            <span className="text-sm font-medium">
                              {(device.memory.total - device.memory.used).toFixed(1)} GB
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Memory Speed</span>
                            <span className="text-sm font-medium">{device.memory.speed} MHz</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Virtual Memory</span>
                            <span className="text-sm font-medium">{memorySettings.pageFile} GB</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Memory Allocation</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">System</span>
                              <span className="text-sm font-medium">1.8 GB</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Applications</span>
                              <span className="text-sm font-medium">4.2 GB</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Cache</span>
                              <span className="text-sm font-medium">2.4 GB</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden flex">
                              <div className="bg-blue-500 h-full" style={{ width: "25%" }}></div>
                              <div className="bg-green-500 h-full" style={{ width: "45%" }}></div>
                              <div className="bg-purple-500 h-full" style={{ width: "30%" }}></div>
                            </div>
                            <div className="mt-2 flex text-xs">
                              <div className="flex items-center mr-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                                <span>System</span>
                              </div>
                              <div className="flex items-center mr-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                <span>Applications</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                                <span>Cache</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Thermal Tab */}
            <TabsContent value="thermal" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Thermal Settings</CardTitle>
                    <CardDescription>Configure cooling and temperature management</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleResetSettings}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button size="sm" onClick={handleSaveSettings}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        Edit Settings
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {device.thermal.fanSpeed === null ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Thermometer className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No Fan Control Available</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        This device does not support fan control or does not have active cooling components.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fan-control">Fan Control Mode</Label>
                            <Select
                              disabled={!isEditing}
                              value={thermalSettings.fanControl}
                              onValueChange={(value) => setThermalSettings({ ...thermalSettings, fanControl: value })}
                            >
                              <SelectTrigger id="fan-control">
                                <SelectValue placeholder="Select mode" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">Automatic (Default)</SelectItem>
                                <SelectItem value="quiet">Quiet</SelectItem>
                                <SelectItem value="balanced">Balanced</SelectItem>
                                <SelectItem value="performance">Performance</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                              Controls how aggressively fans respond to temperature changes
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between mb-2">
                              <Label htmlFor="target-temp">Target Temperature</Label>
                              <span className="text-sm">{thermalSettings.targetTemperature}°C</span>
                            </div>
                            <Slider
                              id="target-temp"
                              disabled={!isEditing || thermalSettings.fanControl !== "custom"}
                              value={[thermalSettings.targetTemperature]}
                              onValueChange={(value) =>
                                setThermalSettings({ ...thermalSettings, targetTemperature: value[0] })
                              }
                              min={60}
                              max={90}
                              step={1}
                            />
                            <p className="text-xs text-gray-500">
                              System will try to maintain temperature below this threshold
                            </p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <Label htmlFor="fan-speed">Custom Fan Speed</Label>
                            <span className="text-sm">{thermalSettings.customFanSpeed}%</span>
                          </div>
                          <Slider
                            id="fan-speed"
                            disabled={!isEditing || thermalSettings.fanControl !== "custom"}
                            value={[thermalSettings.customFanSpeed]}
                            onValueChange={(value) =>
                              setThermalSettings({ ...thermalSettings, customFanSpeed: value[0] })
                            }
                            max={100}
                            step={5}
                          />
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Quiet</span>
                            <span>Balanced</span>
                            <span>Performance</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-amber-800">Thermal Management Notice</h4>
                            <p className="text-sm text-amber-700 mt-1">
                              Setting fan speeds too low may cause your device to overheat and throttle performance.
                              Higher fan speeds will improve cooling but may increase noise levels.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thermal Status</CardTitle>
                  <CardDescription>Current temperature and cooling performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Temperature Zones</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">CPU</span>
                              <span className={`text-sm font-medium ${getTemperatureColor(device.cpu.temperature)}`}>
                                {formatTemperature(device.cpu.temperature)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  device.cpu.temperature > 80
                                    ? "bg-red-500"
                                    : device.cpu.temperature > 70
                                      ? "bg-orange-500"
                                      : device.cpu.temperature > 60
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                                style={{ width: `${(device.cpu.temperature / 100) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {device.gpu.model !== "None" && (
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">GPU</span>
                                <span className={`text-sm font-medium ${getTemperatureColor(device.gpu.temperature)}`}>
                                  {formatTemperature(device.gpu.temperature)}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    device.gpu.temperature > 80
                                      ? "bg-red-500"
                                      : device.gpu.temperature > 70
                                        ? "bg-orange-500"
                                        : device.gpu.temperature > 60
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                  }`}
                                  style={{ width: `${(device.gpu.temperature / 100) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">System</span>
                              <span
                                className={`text-sm font-medium ${getTemperatureColor(device.thermal.temperature)}`}
                              >
                                {formatTemperature(device.thermal.temperature)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  device.thermal.temperature > 80
                                    ? "bg-red-500"
                                    : device.thermal.temperature > 70
                                      ? "bg-orange-500"
                                      : device.thermal.temperature > 60
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                                style={{ width: `${(device.thermal.temperature / 100) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {device.thermal.fanSpeed !== null && (
                        <div>
                          <h4 className="text-sm font-medium mb-3">Cooling Status</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-accent-500 mr-2"
                                >
                                  <path d="M12 2v10"></path>
                                  <path d="M12 22v-3"></path>
                                  <path d="M4.93 4.93l7.07 7.07"></path>
                                  <path d="M19.07 19.07l-3-3"></path>
                                  <path d="M2 12h10"></path>
                                  <path d="M22 12h-3"></path>
                                  <path d="M4.93 19.07l7.07-7.07"></path>
                                  <path d="M19.07 4.93l-3 3"></path>
                                </svg>
                                <span className="text-sm font-medium">Fan Speed</span>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{device.thermal.fanSpeed}</span>
                                <span className="text-gray-500"> / {device.thermal.maxFanSpeed} RPM</span>
                              </div>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full bg-accent-500"
                                style={{ width: `${(device.thermal.fanSpeed / device.thermal.maxFanSpeed) * 100}%` }}
                              ></div>
                            </div>

                            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                              <div className="flex items-center">
                                <Moon className="h-4 w-4 mr-1" />
                                <span>Quiet</span>
                              </div>
                              <div className="flex items-center">
                                <Gauge className="h-4 w-4 mr-1" />
                                <span>Balanced</span>
                              </div>
                              <div className="flex items-center">
                                <Flame className="h-4 w-4 mr-1" />
                                <span>Performance</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Thermal History</h4>
                      <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-end">
                        {/* Simulated temperature graph */}
                        <div className="w-full h-full flex items-end">
                          {Array.from({ length: 24 }).map((_, index) => {
                            const height = 30 + Math.sin(index / 3) * 20 + Math.random() * 10
                            const temp = 40 + Math.sin(index / 3) * 15 + Math.random() * 5
                            const color =
                              temp > 70
                                ? "bg-red-500"
                                : temp > 60
                                  ? "bg-orange-500"
                                  : temp > 50
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            return (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <div className={`w-full ${color} rounded-t-sm`} style={{ height: `${height}%` }}></div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>-24 min</span>
                        <span>-12 min</span>
                        <span>Now</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Power Tab */}
            <TabsContent value="power" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Power Settings</CardTitle>
                    <CardDescription>Configure power and energy management</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleResetSettings}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button size="sm" onClick={handleSaveSettings}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        Edit Settings
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="power-plan">Power Plan</Label>
                          <Select
                            disabled={!isEditing}
                            value={powerSettings.plan}
                            onValueChange={(value) => setPowerSettings({ ...powerSettings, plan: value })}
                          >
                            <SelectTrigger id="power-plan">
                              <SelectValue placeholder="Select plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="power-saver">
                                <div className="flex items-center">
                                  <Leaf className="h-4 w-4 mr-2 text-green-500" />
                                  <span>Power Saver</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="balanced">
                                <div className="flex items-center">
                                  <Gauge className="h-4 w-4 mr-2 text-blue-500" />
                                  <span>Balanced</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="performance">
                                <div className="flex items-center">
                                  <Zap className="h-4 w-4 mr-2 text-amber-500" />
                                  <span>Performance</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500">
                            Affects overall system power consumption and performance
                          </p>
                        </div>

                        {device.power.batteryLevel !== null && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="battery-limit">Battery Charge Limit</Label>
                                <p className="text-xs text-gray-500">
                                  Limit maximum battery charge to extend battery lifespan
                                </p>
                              </div>
                              <Switch id="battery-limit" disabled={!isEditing} checked={true} />
                            </div>

                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm">80%</span>
                                <span className="text-sm">100%</span>
                              </div>
                              <Slider disabled={!isEditing} value={[80]} min={60} max={100} step={5} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sleep-after">Sleep After</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="sleep-after"
                              type="number"
                              disabled={!isEditing}
                              value={powerSettings.sleepAfter}
                              onChange={(e) =>
                                setPowerSettings({ ...powerSettings, sleepAfter: Number.parseInt(e.target.value) || 0 })
                              }
                              className="w-20"
                              min={1}
                              max={180}
                            />
                            <span className="text-sm">minutes</span>
                          </div>
                          <p className="text-xs text-gray-500">Time of inactivity before system enters sleep mode</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="display-off">Turn Off Display</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="display-off"
                              type="number"
                              disabled={!isEditing}
                              value={powerSettings.displayOff}
                              onChange={(e) =>
                                setPowerSettings({ ...powerSettings, displayOff: Number.parseInt(e.target.value) || 0 })
                              }
                              className="w-20"
                              min={1}
                              max={60}
                            />
                            <span className="text-sm">minutes</span>
                          </div>
                          <p className="text-xs text-gray-500">Time of inactivity before display turns off</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {device.power.batteryLevel !== null ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Battery Status</CardTitle>
                    <CardDescription>Current battery health and usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <Battery className="h-5 w-5 text-accent-500 mr-2" />
                            <h3 className="font-medium text-gray-900">Battery Level</h3>
                          </div>

                          <div className="relative h-48 w-48 mx-auto">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-3xl font-bold text-gray-900">{device.power.batteryLevel}%</div>
                            </div>
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle
                                className="text-gray-200"
                                strokeWidth="10"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                              />
                              <circle
                                className={`${
                                  device.power.batteryLevel < 20
                                    ? "text-red-500"
                                    : device.power.batteryLevel < 50
                                      ? "text-yellow-500"
                                      : "text-green-500"
                                }`}
                                strokeWidth="10"
                                strokeDasharray={`${device.power.batteryLevel * 2.51} 251`}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                              />
                            </svg>
                          </div>

                          <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">Estimated Runtime</p>
                            <p className="text-lg font-medium text-gray-900">{device.power.estimatedRuntime}</p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <Zap className="h-5 w-5 text-accent-500 mr-2" />
                            <h3 className="font-medium text-gray-900">Power Consumption</h3>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Current</span>
                                <span className="text-sm font-medium">12.4 W</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "40%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Average</span>
                                <span className="text-sm font-medium">15.2 W</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "50%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Peak</span>
                                <span className="text-sm font-medium">28.7 W</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "80%" }}></div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Battery Health</span>
                              <span className="text-sm font-medium">92%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Charge Cycles</span>
                              <span className="text-sm font-medium">142</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Charging Status</span>
                              <span className="text-sm font-medium">
                                {device.power.charging ? (
                                  <div className="flex items-center text-green-600">
                                    <Zap className="h-4 w-4 mr-1" />
                                    <span>Charging</span>
                                  </div>
                                ) : (
                                  <span>Discharging</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Battery Usage by App</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-blue-600"
                                >
                                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Web Browser</p>
                                <p className="text-xs text-gray-500">Background: 12 min</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium">28%</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-purple-600"
                                >
                                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                  <line x1="8" y1="21" x2="16" y2="21"></line>
                                  <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Video Player</p>
                                <p className="text-xs text-gray-500">Active: 45 min</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium">22%</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-green-600"
                                >
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Messaging</p>
                                <p className="text-xs text-gray-500">Background: 2h 10m</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Power Status</CardTitle>
                    <CardDescription>Current power consumption and efficiency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <Zap className="h-5 w-5 text-accent-500 mr-2" />
                            <h3 className="font-medium text-gray-900">Power Consumption</h3>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Current</span>
                                <span className="text-sm font-medium">85.4 W</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "60%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Average</span>
                                <span className="text-sm font-medium">92.7 W</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "65%" }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Peak</span>
                                <span className="text-sm font-medium">145.2 W</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "85%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-accent-500 mr-2"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            <h3 className="font-medium text-gray-900">Power Efficiency</h3>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Energy Rating</span>
                              <div className="flex">
                                {["A", "B", "C", "D", "E"].map((rating, index) => (
                                  <div
                                    key={rating}
                                    className={`w-8 h-8 flex items-center justify-center text-sm font-medium ${
                                      index === 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                                    }`}
                                  >
                                    {rating}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm">Power Supply</span>
                              <span className="text-sm font-medium">650W 80+ Gold</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm">Efficiency</span>
                              <span className="text-sm font-medium">92%</span>
                            </div>
                          </div>

                          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-500 mr-2"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                              </svg>
                              <p className="text-sm text-blue-700">
                                This device is connected to a power outlet. Power management settings are optimized for
                                performance.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Power Usage by Component</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Cpu className="h-5 w-5 text-accent-500 mr-2" />
                              <span className="text-sm">CPU</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "45%" }}></div>
                              </div>
                              <span className="text-sm font-medium">45 W</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-accent-500 mr-2"
                              >
                                <rect x="2" y="6" width="20" height="12" rx="2" />
                                <path d="M6 12h4" />
                                <path d="M14 12h4" />
                              </svg>
                              <span className="text-sm">GPU</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "38%" }}></div>
                              </div>
                              <span className="text-sm font-medium">38 W</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <HardDrive className="h-5 w-5 text-accent-500 mr-2" />
                              <span className="text-sm">Storage</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "8%" }}></div>
                              </div>
                              <span className="text-sm font-medium">8 W</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-accent-500 mr-2"
                              >
                                <path d="M6 19v-3"></path>
                                <path d="M10 19v-3"></path>
                                <path d="M14 19v-3"></path>
                                <path d="M18 19v-3"></path>
                                <path d="M8 11V9"></path>
                                <path d="M16 11V9"></path>
                                <path d="M12 11V9"></path>
                                <path d="M2 15h20"></path>
                                <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"></path>
                              </svg>
                              <span className="text-sm">Memory</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                                <div className="h-2 rounded-full bg-accent-500" style={{ width: "12%" }}></div>
                              </div>
                              <span className="text-sm font-medium">12 W</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

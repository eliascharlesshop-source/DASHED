"use client"

import { useState, useMemo, memo } from "react"
import { useToast } from "@/hooks/use-toast"
import { useDashedOS, useDevice } from "@/hooks/use-dasheros"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  HardDrive,
  Search,
  RefreshCw,
  Plus,
  Power,
  Shield,
  Wifi,
  Clock,
  Battery,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Check,
  Cpu,
  Upload,
  Download,
  Zap,
  Server
} from "lucide-react"

// Memoized device card component for better performance
const DeviceCard = memo(({
  device,
  isSelected,
  deviceIcon,
  getStatusColor,
  getBatteryColor,
  formatStorage,
  onClick
}: {
  device: any
  isSelected: boolean
  deviceIcon: any
  getStatusColor: (status: string) => string
  getBatteryColor: (level: number | null) => string
  formatStorage: (size: number) => string
  onClick: () => void
}) => (
  <div
    className={`bg-white rounded-lg border-2 ${isSelected ? "border-accent-500 ring-2 ring-accent-200 shadow-lg" : "border-gray-200 hover:border-accent-300"} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1`}
    onClick={onClick}
  >
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center mr-3 shadow-sm border border-accent-300">
            {deviceIcon}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm mb-1">{device.name}</h3>
            <p className="text-xs text-gray-600">{device.os}</p>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
      </div>

      <div className="space-y-2">
        {device.performance.battery && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Battery</span>
            <span className={`font-medium ${getBatteryColor(device.performance.battery.level)}`}>
              {device.performance.battery.level}%
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Storage</span>
          <span className="font-medium">
            {formatStorage(device.performance.storage.used)} / {formatStorage(device.performance.storage.total)}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Last Seen</span>
          <span className="font-medium">
            {new Date(device.lastSeen).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
      </div>
    </div>
  </div>
))

DeviceCard.displayName = 'DeviceCard'

// Device type icons mapping
const deviceIcons: Record<string, JSX.Element> = {
  laptop: <Laptop className="h-6 w-6" />,
  smartphone: <Smartphone className="h-6 w-6" />,
  tablet: <Tablet className="h-6 w-6" />,
  desktop: <Monitor className="h-6 w-6" />,
  server: <Server className="h-6 w-6" />,
  iot: <HardDrive className="h-6 w-6" />
}

export default function AppPage() {
  const { toast } = useToast()
  const { 
    devices, 
    onlineDevices, 
    alerts, 
    isLoading, 
    refreshDevices, 
    sendCommand 
  } = useDashedOS()
  
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const demoDevices = useMemo(() => ([
    {
      id: "demo-1",
      name: "Surface Laptop",
      type: "laptop",
      status: "online",
      os: "Windows 11",
      version: "2.1.4",
      location: "HQ - West",
      lastSeen: Date.now() - 5 * 60 * 1000,
      performance: {
        battery: { level: 76 },
        storage: { used: 180 * 1024, total: 512 * 1024 },
        cpu: { usage: 22 },
        memory: { used: 8 * 1024, total: 16 * 1024 },
      },
      capabilities: {
        networkInterfaces: [
          { name: "Wi‑Fi", isActive: true },
          { name: "Ethernet", isActive: false },
        ],
      },
    },
    {
      id: "demo-2",
      name: "Raspberry Pi 5",
      type: "iot",
      status: "maintenance",
      os: "Ubuntu 22.04",
      version: "2.1.5",
      location: "Home Office",
      lastSeen: Date.now() - 30 * 60 * 1000,
      performance: {
        battery: null,
        storage: { used: 32 * 1024, total: 128 * 1024 },
        cpu: { usage: 38 },
        memory: { used: 3 * 1024, total: 8 * 1024 },
      },
      capabilities: {
        networkInterfaces: [
          { name: "Wi‑Fi", isActive: true },
          { name: "Bluetooth", isActive: true },
        ],
      },
    },
  ]), [])

  const displayDevices = useMemo(() => ([...devices, ...demoDevices]), [devices, demoDevices])

  // Filter devices based on search query - memoized for performance
  const filteredDevices = useMemo(() => 
    displayDevices.filter(
      (device) =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location?.toLowerCase().includes(searchQuery.toLowerCase()),
    ), [displayDevices, searchQuery])

  // Get the selected device details - memoized
  const selectedDeviceDetails = useMemo(() => 
    displayDevices.find((device) => device.id === selectedDevice), [displayDevices, selectedDevice])

  // Recent activities from alerts - memoized for performance
  const recentActivities = useMemo(() => alerts.slice(0, 5).map(alert => ({
    id: alert.id,
    device: displayDevices.find(d => d.id === alert.deviceId)?.name || 'Unknown Device',
    action: alert.message,
    details: alert.recommendation || '',
    time: new Date(alert.timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    })
  })), [alerts, displayDevices])

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    refreshDevices()

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Refreshed",
        description: "Device data has been updated",
      })
    }, 1500)
  }

  // Handle device action
  const handleDeviceAction = async (action: string) => {
    if (!selectedDeviceDetails) return

    let message = ""
    let variant: "default" | "destructive" = "default"

    try {
      await sendCommand(selectedDeviceDetails.id, action)
      
      switch (action) {
        case "restart":
          message = `Restarting ${selectedDeviceDetails.name}...`
          break
        case "shutdown":
          message = `Shutting down ${selectedDeviceDetails.name}...`
          variant = "destructive"
          break
        case "lock":
          message = `${selectedDeviceDetails.name} has been locked`
          break
        case "locate":
          message = `${selectedDeviceDetails.name} located at ${selectedDeviceDetails.location}`
          break
        default:
          message = `Action performed on ${selectedDeviceDetails.name}`
      }

      toast({
        title: "Device Action",
        description: message,
        variant,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} ${selectedDeviceDetails.name}`,
        variant: "destructive"
      })
    }
  }

  // Format storage size
  const formatStorage = (sizeInMB: number) => {
    if (sizeInMB >= 1024 * 1024) {
      return `${(sizeInMB / (1024 * 1024)).toFixed(1)} TB`
    } else if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`
    }
    return `${sizeInMB} MB`
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-gray-400"
      case "sleeping":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-blue-500"
      default:
        return "bg-gray-400"
    }
  }

  // Get battery color
  const getBatteryColor = (level: number | null) => {
    if (level === null) return "text-gray-400"
    if (level < 20) return "text-red-500"
    if (level < 50) return "text-yellow-500"
    return "text-green-500"
  }

  // Get usage color
  const getUsageColor = (percentage: number) => {
    if (percentage > 90) return "text-red-500"
    if (percentage > 70) return "text-yellow-500"
    return "text-green-500"
  }

  if (isLoading) {
    return (
      <div className="flex h-full">
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader toggleSidebar={toggleSidebar} />
          <main className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading DashedOS devices...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Device Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Monitor and manage all your DASHED OS devices</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search devices..."
                  className="pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="h-9 px-3">
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>

              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")} className="h-9 px-3">
                {viewMode === "grid" ? (
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
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                ) : (
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
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                )}
              </Button>

              <Button className="bg-accent-500 hover:bg-accent-600 text-white h-9 px-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Devices Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[520px]">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Connected Devices</h2>
                  <Badge variant="outline" className="text-xs">{filteredDevices.length} devices</Badge>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="flex justify-between">
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredDevices.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No devices found</h3>
                    <p className="text-gray-600 text-sm">Try adjusting your search query</p>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {filteredDevices.map((device) => (
                      <DeviceCard
                        key={device.id}
                        device={device}
                        isSelected={selectedDevice === device.id}
                        deviceIcon={deviceIcons[device.type] || deviceIcons.iot}
                        getStatusColor={getStatusColor}
                        getBatteryColor={getBatteryColor}
                        formatStorage={formatStorage}
                        onClick={() => setSelectedDevice(device.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredDevices.map((device) => (
                      <div
                        key={device.id}
                        className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${selectedDevice === device.id ? "bg-accent-50" : ""}`}
                        onClick={() => setSelectedDevice(device.id)}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center mr-3 shadow-sm border border-accent-300`}>
                          {deviceIcons[device.type] || deviceIcons.iot}
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900 mr-2">{device.name}</h3>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                          </div>
                          <p className="text-xs text-gray-500">
                            {device.os} • {device.location}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          {device.performance.battery && (
                            <div className="flex items-center">
                              <Battery className={`h-4 w-4 mr-1 ${getBatteryColor(device.performance.battery.level)}`} />
                              <span className="text-xs font-medium">{device.performance.battery.level}%</span>
                            </div>
                          )}

                          <div className="text-xs text-gray-500">{new Date(device.lastSeen).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit', 
                            hour12: true 
                          })}</div>

                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Device Details Panel */}
            <div className="flex flex-col gap-6 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto">
              {selectedDeviceDetails ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Device Details</h2>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedDeviceDetails.status)}`}></div>
                      <span className="text-xs capitalize text-gray-600">{selectedDeviceDetails.status}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center mr-4 shadow-sm border border-accent-300">
                        {deviceIcons[selectedDeviceDetails.type] || deviceIcons.iot}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">{selectedDeviceDetails.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedDeviceDetails.os} • {selectedDeviceDetails.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Quick Actions */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 border border-gray-200"
                            onClick={() => handleDeviceAction("restart")}
                          >
                            <RefreshCw className="h-4 w-4 text-accent-500 mb-1" />
                            <span className="text-xs">Restart</span>
                          </button>
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 border border-gray-200"
                            onClick={() => handleDeviceAction("shutdown")}
                          >
                            <Power className="h-4 w-4 text-accent-500 mb-1" />
                            <span className="text-xs">Shutdown</span>
                          </button>
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 border border-gray-200"
                            onClick={() => handleDeviceAction("lock")}
                          >
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
                              className="h-4 w-4 text-accent-500 mb-1"
                            >
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span className="text-xs">Lock</span>
                          </button>
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 border border-gray-200"
                            onClick={() => handleDeviceAction("locate")}
                          >
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
                              className="h-4 w-4 text-accent-500 mb-1"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span className="text-xs">Locate</span>
                          </button>
                        </div>
                      </div>

                      {/* System Resources */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">System Resources</h4>
                        <div className="space-y-3">
                          {selectedDeviceDetails.performance.battery && (
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-500">Battery</span>
                                <span
                                  className={`text-xs font-medium ${getBatteryColor(selectedDeviceDetails.performance.battery.level)}`}
                                >
                                  {selectedDeviceDetails.performance.battery.level}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div
                                  className={`h-1 rounded-full ${selectedDeviceDetails.performance.battery.level < 20 ? "bg-red-500" : selectedDeviceDetails.performance.battery.level < 50 ? "bg-yellow-500" : "bg-accent-500"}`}
                                  style={{ width: `${selectedDeviceDetails.performance.battery.level}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-500">Storage</span>
                              <span className="text-xs font-medium">
                                {formatStorage(selectedDeviceDetails.performance.storage.used)} /{" "}
                                {formatStorage(selectedDeviceDetails.performance.storage.total)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div
                                className="h-1 rounded-full bg-accent-500"
                                style={{
                                  width: `${(selectedDeviceDetails.performance.storage.used / selectedDeviceDetails.performance.storage.total) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {selectedDeviceDetails.status === "online" && (
                            <>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-500">CPU</span>
                                  <span className={`text-xs font-medium ${getUsageColor(selectedDeviceDetails.performance.cpu.usage)}`}>
                                    {selectedDeviceDetails.performance.cpu.usage}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div
                                    className={`h-1 rounded-full ${selectedDeviceDetails.performance.cpu.usage > 90 ? "bg-red-500" : selectedDeviceDetails.performance.cpu.usage > 70 ? "bg-yellow-500" : "bg-accent-500"}`}
                                    style={{ width: `${selectedDeviceDetails.performance.cpu.usage}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-500">Memory</span>
                                  <span
                                    className={`text-xs font-medium ${getUsageColor((selectedDeviceDetails.performance.memory.used / selectedDeviceDetails.performance.memory.total) * 100)}`}
                                  >
                                    {Math.round((selectedDeviceDetails.performance.memory.used / selectedDeviceDetails.performance.memory.total) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div
                                    className={`h-1 rounded-full ${(selectedDeviceDetails.performance.memory.used / selectedDeviceDetails.performance.memory.total) * 100 > 90 ? "bg-red-500" : (selectedDeviceDetails.performance.memory.used / selectedDeviceDetails.performance.memory.total) * 100 > 70 ? "bg-yellow-500" : "bg-accent-500"}`}
                                    style={{ width: `${(selectedDeviceDetails.performance.memory.used / selectedDeviceDetails.performance.memory.total) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Device Information */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Device Information</h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Network Interfaces</span>
                            <span className="text-xs font-medium">
                              {selectedDeviceDetails.capabilities.networkInterfaces.filter(ni => ni.isActive).length} active
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Location</span>
                            <span className="text-xs font-medium">{selectedDeviceDetails.location || 'Unknown'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Last Seen</span>
                            <span className="text-xs font-medium">{new Date(selectedDeviceDetails.lastSeen).toLocaleString('en-US', { 
                              year: 'numeric',
                              month: 'short', 
                              day: 'numeric',
                              hour: 'numeric', 
                              minute: '2-digit', 
                              hour12: true 
                            })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">OS Version</span>
                            <span className="text-xs font-medium">{selectedDeviceDetails.os}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">DashedOS</span>
                            <span className="text-xs font-medium">{selectedDeviceDetails.version}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <Button variant="outline" className="w-full">
                      View Full Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Laptop className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">No device selected</h3>
                  <p className="text-gray-600 text-sm">Select a device to view its details</p>
                </div>
              )}

              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                </div>

                <div className="divide-y divide-gray-200 max-h-[280px] overflow-y-auto">
                  {recentActivities.length > 0 ? recentActivities.map((activity) => (
                    <div key={activity.id} className="p-3">
                      <div className="flex items-start">
                        <div className="mr-3 flex-shrink-0">
                          {activity.action.includes("alert") || activity.action.includes("threat") ? (
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                          ) : activity.action.includes("updated") || activity.action.includes("restart") ? (
                            <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                              <RefreshCw className="h-4 w-4 text-accent-500" />
                            </div>
                          ) : activity.action.includes("synced") || activity.action.includes("completed") ? (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-500" />
                            </div>
                          ) : activity.action.includes("battery") || activity.action.includes("usage") ? (
                            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                              <Battery className="h-4 w-4 text-yellow-500" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-accent-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span>{activity.device}</span>
                            {activity.details && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{activity.details}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 flex-shrink-0 ml-2">{activity.time}</div>
                      </div>
                    </div>
                  )) : (
                    <div className="p-6 text-center">
                      <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No recent alerts</p>
                      <p className="text-xs text-gray-400">All systems operating normally</p>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <Button variant="link" className="w-full text-accent-500">
                    View All Activities
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-green-800 text-sm">Security</h3>
                  </div>
                  <p className="text-green-700 text-xs">All systems secure</p>
                </div>

                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <div className="flex items-center mb-2">
                    <Wifi className="h-5 w-5 text-accent-600 mr-2" />
                    <h3 className="font-medium text-accent-800 text-sm">Network</h3>
                  </div>
                  <p className="text-accent-700 text-xs">6 devices connected</p>
                </div>

                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-accent-600 mr-2" />
                    <h3 className="font-medium text-accent-800 text-sm">Performance</h3>
                  </div>
                  <p className="text-accent-700 text-xs">All devices optimal</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center mb-2">
                    <RefreshCw className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-medium text-purple-800 text-sm">Sync Status</h3>
                  </div>
                  <p className="text-purple-700 text-xs">Last sync: 2 minutes ago</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900 text-sm">Network Traffic</h3>
                    <div className="text-xs text-gray-500">Last 24 hours</div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-gray-700 text-xs">Download</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">1.2 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Upload className="h-4 w-4 text-accent-600 mr-2" />
                      <span className="text-gray-700 text-xs">Upload</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">342 MB</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900 text-sm">System Health</h3>
                    <div className="text-xs text-gray-500">All devices</div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 text-accent-600 mr-2" />
                      <span className="text-gray-700 text-xs">Average CPU</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Battery className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-gray-700 text-xs">Average Battery</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">64%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

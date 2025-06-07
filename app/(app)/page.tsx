"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
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
} from "lucide-react"

// Mock data for devices and recent activities
const mockDevices = [
  {
    id: "device-1",
    name: "MacBook Pro",
    type: "laptop",
    icon: <Laptop className="h-6 w-6" />,
    os: "macOS",
    status: "online",
    battery: 78,
    storage: {
      used: 256,
      total: 512,
    },
    cpu: 12,
    memory: 42,
    lastSeen: "Just now",
    ip: "192.168.1.5",
    location: "Home Office",
  },
  {
    id: "device-2",
    name: "iPhone 14 Pro",
    type: "smartphone",
    icon: <Smartphone className="h-6 w-6" />,
    os: "iOS",
    status: "online",
    battery: 64,
    storage: {
      used: 78,
      total: 128,
    },
    cpu: 8,
    memory: 35,
    lastSeen: "2 minutes ago",
    ip: "192.168.1.6",
    location: "Home",
  },
  {
    id: "device-3",
    name: "iPad Air",
    type: "tablet",
    icon: <Tablet className="h-6 w-6" />,
    os: "iPadOS",
    status: "offline",
    battery: 23,
    storage: {
      used: 45,
      total: 256,
    },
    cpu: 0,
    memory: 0,
    lastSeen: "3 hours ago",
    ip: "192.168.1.7",
    location: "Living Room",
  },
  {
    id: "device-4",
    name: "Windows Desktop",
    type: "desktop",
    icon: <Monitor className="h-6 w-6" />,
    os: "Windows",
    status: "online",
    battery: null,
    storage: {
      used: 512,
      total: 1024,
    },
    cpu: 35,
    memory: 60,
    lastSeen: "Just now",
    ip: "192.168.1.8",
    location: "Home Office",
  },
  {
    id: "device-5",
    name: "Android Tablet",
    type: "tablet",
    icon: <Tablet className="h-6 w-6" />,
    os: "Android",
    status: "online",
    battery: 92,
    storage: {
      used: 16,
      total: 64,
    },
    cpu: 5,
    memory: 28,
    lastSeen: "5 minutes ago",
    ip: "192.168.1.9",
    location: "Kitchen",
  },
  {
    id: "device-6",
    name: "Linux Server",
    type: "server",
    icon: <HardDrive className="h-6 w-6" />,
    os: "Ubuntu",
    status: "online",
    battery: null,
    storage: {
      used: 2048,
      total: 4096,
    },
    cpu: 65,
    memory: 72,
    lastSeen: "Just now",
    ip: "192.168.1.10",
    location: "Home Office",
  },
]

const recentActivities = [
  {
    id: "activity-1",
    device: "MacBook Pro",
    action: "File synced",
    details: "Document.pdf (2.5 MB)",
    time: "2 minutes ago",
  },
  {
    id: "activity-2",
    device: "iPhone 14 Pro",
    action: "Backup completed",
    details: "12.3 GB of data",
    time: "15 minutes ago",
  },
  {
    id: "activity-3",
    device: "Windows Desktop",
    action: "Software updated",
    details: "DASHED OS v2.1.4",
    time: "1 hour ago",
  },
  {
    id: "activity-4",
    device: "Linux Server",
    action: "Security alert",
    details: "Unusual login attempt blocked",
    time: "3 hours ago",
  },
  {
    id: "activity-5",
    device: "iPad Air",
    action: "Low battery",
    details: "Device powered off at 5%",
    time: "3 hours ago",
  },
]

export default function AppPage() {
  const { toast } = useToast()
  const [selectedDevice, setSelectedDevice] = useState<string | null>("device-1")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter devices based on search query
  const filteredDevices = mockDevices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get the selected device details
  const selectedDeviceDetails = mockDevices.find((device) => device.id === selectedDevice)

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

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
  const handleDeviceAction = (action: string) => {
    if (!selectedDeviceDetails) return

    let message = ""
    let variant: "default" | "destructive" = "default"

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
  }

  // Format storage size
  const formatStorage = (sizeInGB: number) => {
    if (sizeInGB >= 1024) {
      return `${(sizeInGB / 1024).toFixed(1)} TB`
    }
    return `${sizeInGB} GB`
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-gray-400"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
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

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Device Dashboard</h1>
              <p className="text-gray-600">Monitor and manage all your DASHED OS devices</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search devices..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>

              <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
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

              <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Devices Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Connected Devices</h2>
                  <Badge variant="outline">{filteredDevices.length} devices</Badge>
                </div>

                {filteredDevices.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No devices found</h3>
                    <p className="text-gray-600">Try adjusting your search query</p>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {filteredDevices.map((device) => (
                      <div
                        key={device.id}
                        className={`bg-white rounded-lg border ${selectedDevice === device.id ? "border-accent-500 ring-1 ring-accent-200" : "border-gray-200"} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer`}
                        onClick={() => setSelectedDevice(device.id)}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              <div
                                className={`w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center mr-3`}
                              >
                                {device.icon}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{device.name}</h3>
                                <p className="text-xs text-gray-500">{device.os}</p>
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                          </div>

                          <div className="space-y-2">
                            {device.battery !== null && (
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Battery</span>
                                <span className={`font-medium ${getBatteryColor(device.battery)}`}>
                                  {device.battery}%
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Storage</span>
                              <span className="font-medium">
                                {formatStorage(device.storage.used)} / {formatStorage(device.storage.total)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Last Seen</span>
                              <span className="font-medium">{device.lastSeen}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredDevices.map((device) => (
                      <div
                        key={device.id}
                        className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${selectedDevice === device.id ? "bg-accent-50" : ""}`}
                        onClick={() => setSelectedDevice(device.id)}
                      >
                        <div className={`w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center mr-4`}>
                          {device.icon}
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

                        <div className="flex items-center gap-6">
                          {device.battery !== null && (
                            <div className="flex items-center">
                              <Battery className={`h-4 w-4 mr-1 ${getBatteryColor(device.battery)}`} />
                              <span className="text-xs font-medium">{device.battery}%</span>
                            </div>
                          )}

                          <div className="text-xs text-gray-500">{device.lastSeen}</div>

                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Device Details Panel */}
            <div>
              {selectedDeviceDetails ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-900">Device Details</h2>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedDeviceDetails.status)}`}></div>
                      <span className="text-xs capitalize">{selectedDeviceDetails.status}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center mr-4`}>
                        {selectedDeviceDetails.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-lg">{selectedDeviceDetails.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedDeviceDetails.os} • {selectedDeviceDetails.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Quick Actions */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
                            onClick={() => handleDeviceAction("restart")}
                          >
                            <RefreshCw className="h-5 w-5 text-accent-500 mb-1" />
                            <span className="text-xs">Restart</span>
                          </button>
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
                            onClick={() => handleDeviceAction("shutdown")}
                          >
                            <Power className="h-5 w-5 text-accent-500 mb-1" />
                            <span className="text-xs">Shutdown</span>
                          </button>
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
                            onClick={() => handleDeviceAction("lock")}
                          >
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
                              className="h-5 w-5 text-accent-500 mb-1"
                            >
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span className="text-xs">Lock</span>
                          </button>
                          <button
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
                            onClick={() => handleDeviceAction("locate")}
                          >
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
                              className="h-5 w-5 text-accent-500 mb-1"
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
                        <h4 className="text-sm font-medium text-gray-700 mb-3">System Resources</h4>
                        <div className="space-y-3">
                          {selectedDeviceDetails.battery !== null && (
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-500">Battery</span>
                                <span
                                  className={`text-xs font-medium ${getBatteryColor(selectedDeviceDetails.battery)}`}
                                >
                                  {selectedDeviceDetails.battery}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${selectedDeviceDetails.battery < 20 ? "bg-red-500" : selectedDeviceDetails.battery < 50 ? "bg-yellow-500" : "bg-green-500"}`}
                                  style={{ width: `${selectedDeviceDetails.battery}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-500">Storage</span>
                              <span className="text-xs font-medium">
                                {formatStorage(selectedDeviceDetails.storage.used)} /{" "}
                                {formatStorage(selectedDeviceDetails.storage.total)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full bg-accent-500"
                                style={{
                                  width: `${(selectedDeviceDetails.storage.used / selectedDeviceDetails.storage.total) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {selectedDeviceDetails.status === "online" && (
                            <>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-500">CPU</span>
                                  <span className={`text-xs font-medium ${getUsageColor(selectedDeviceDetails.cpu)}`}>
                                    {selectedDeviceDetails.cpu}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${selectedDeviceDetails.cpu > 90 ? "bg-red-500" : selectedDeviceDetails.cpu > 70 ? "bg-yellow-500" : "bg-accent-500"}`}
                                    style={{ width: `${selectedDeviceDetails.cpu}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-500">Memory</span>
                                  <span
                                    className={`text-xs font-medium ${getUsageColor(selectedDeviceDetails.memory)}`}
                                  >
                                    {selectedDeviceDetails.memory}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${selectedDeviceDetails.memory > 90 ? "bg-red-500" : selectedDeviceDetails.memory > 70 ? "bg-yellow-500" : "bg-accent-500"}`}
                                    style={{ width: `${selectedDeviceDetails.memory}%` }}
                                  ></div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Device Information */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Device Information</h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">IP Address</span>
                            <span className="text-xs font-medium">{selectedDeviceDetails.ip}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Location</span>
                            <span className="text-xs font-medium">{selectedDeviceDetails.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Last Seen</span>
                            <span className="text-xs font-medium">{selectedDeviceDetails.lastSeen}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">OS Version</span>
                            <span className="text-xs font-medium">{selectedDeviceDetails.os}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">DASHED OS</span>
                            <span className="text-xs font-medium">v2.1.4</span>
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Laptop className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No device selected</h3>
                  <p className="text-gray-600 mb-4">Select a device to view its details</p>
                </div>
              )}

              {/* Recent Activities */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Recent Activities</h2>
                </div>

                <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="p-4">
                      <div className="flex items-start">
                        <div className="mr-3">
                          {activity.action.includes("alert") ? (
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                          ) : activity.action.includes("updated") ? (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <RefreshCw className="h-4 w-4 text-blue-500" />
                            </div>
                          ) : activity.action.includes("synced") ? (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-500" />
                            </div>
                          ) : activity.action.includes("battery") ? (
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
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{activity.device}</span>
                            <span className="mx-1">•</span>
                            <span>{activity.details}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
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
              <h2 className="font-semibold text-gray-900">System Status</h2>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium text-green-700">Security</h3>
                  </div>
                  <p className="text-sm text-green-600">All systems secure</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <Wifi className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-blue-700">Network</h3>
                  </div>
                  <p className="text-sm text-blue-600">6 devices connected</p>
                </div>

                <div className="bg-accent-50 rounded-lg p-4 border border-accent-100">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-accent-500 mr-2" />
                    <h3 className="font-medium text-accent-700">Performance</h3>
                  </div>
                  <p className="text-sm text-accent-600">All devices optimal</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center mb-2">
                    <RefreshCw className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="font-medium text-purple-700">Sync Status</h3>
                  </div>
                  <p className="text-sm text-purple-600">Last sync: 2 minutes ago</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Network Traffic</h3>
                    <div className="text-xs text-gray-500">Last 24 hours</div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">Download</span>
                    </div>
                    <span className="text-sm font-medium">1.2 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Upload className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">Upload</span>
                    </div>
                    <span className="text-sm font-medium">342 MB</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">System Health</h3>
                    <div className="text-xs text-gray-500">All devices</div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 text-accent-500 mr-1" />
                      <span className="text-sm text-gray-600">Average CPU</span>
                    </div>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Battery className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">Average Battery</span>
                    </div>
                    <span className="text-sm font-medium">64%</span>
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

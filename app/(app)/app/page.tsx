"use client"

import { useState } from "react"
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

// Device type icons mapping
const deviceIcons = {
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

  // Filter devices based on search query
  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get the selected device details
  const selectedDeviceDetails = devices.find((device) => device.id === selectedDevice)

  // Recent activities from alerts
  const recentActivities = alerts.slice(0, 5).map(alert => ({
    id: alert.id,
    device: devices.find(d => d.id === alert.deviceId)?.name || 'Unknown Device',
    action: alert.message,
    details: alert.recommendation || '',
    time: new Date(alert.timestamp).toLocaleTimeString()
  }))

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
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading DashedOS devices...</p>
            </div>
          </main>
        </div>
      </div>
    )
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
                    {filteredDevices.map((device) => (                        <div
                          key={device.id}
                          className={`bg-white rounded-lg border ${selectedDevice === device.id ? "border-blue-600 ring-1 ring-blue-200" : "border-gray-200"} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer`}
                          onClick={() => setSelectedDevice(device.id)}
                        >
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                                  {deviceIcons[device.type] || deviceIcons.iot}
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900 text-sm">{device.name}</h3>
                                  <p className="text-xs text-gray-500">{device.os}</p>
                                </div>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                            </div>

                            <div className="space-y-3">
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
                                  {new Date(device.lastSeen).toLocaleTimeString()}
                                </span>
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
                        <div className={`w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4`}>
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

                        <div className="flex items-center gap-6">
                          {device.performance.battery && (
                            <div className="flex items-center">
                              <Battery className={`h-4 w-4 mr-1 ${getBatteryColor(device.performance.battery.level)}`} />
                              <span className="text-xs font-medium">{device.performance.battery.level}%</span>
                            </div>
                          )}

                          <div className="text-xs text-gray-500">{new Date(device.lastSeen).toLocaleTimeString()}</div>

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
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                        {deviceIcons[selectedDeviceDetails.type] || deviceIcons.iot}
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
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${selectedDeviceDetails.performance.battery.level < 20 ? "bg-red-500" : selectedDeviceDetails.performance.battery.level < 50 ? "bg-yellow-500" : "bg-green-500"}`}
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
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full bg-blue-500"
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
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${selectedDeviceDetails.performance.cpu.usage > 90 ? "bg-red-500" : selectedDeviceDetails.performance.cpu.usage > 70 ? "bg-yellow-500" : "bg-blue-500"}`}
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
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${(selectedDeviceDetails.performance.memory.used / selectedDeviceDetails.performance.memory.total) * 100 > 90 ? "bg-red-500" : (selectedDeviceDetails.performance.memory.used / selectedDeviceDetails.performance.memory.total) * 100 > 70 ? "bg-yellow-500" : "bg-blue-500"}`}
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
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Device Information</h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
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
                            <span className="text-xs font-medium">{new Date(selectedDeviceDetails.lastSeen).toLocaleString()}</span>
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
                  {recentActivities.length > 0 ? recentActivities.map((activity) => (
                    <div key={activity.id} className="p-4">
                      <div className="flex items-start">
                        <div className="mr-3">
                          {activity.action.includes("alert") || activity.action.includes("threat") ? (
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                          ) : activity.action.includes("updated") || activity.action.includes("restart") ? (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <RefreshCw className="h-4 w-4 text-blue-500" />
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
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-blue-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{activity.device}</span>
                            {activity.details && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{activity.details}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  )) : (
                    <div className="p-8 text-center">
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

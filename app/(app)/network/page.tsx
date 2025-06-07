"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Wifi,
  RefreshCw,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  HardDrive,
  Upload,
  Download,
  Activity,
  Zap,
  WifiOff,
} from "lucide-react"

export default function NetworkPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [networkStatus, setNetworkStatus] = useState("online") // online, offline, limited

  // Mock network data
  const networkInfo = {
    name: "DASHED-Network",
    type: "Wi-Fi",
    status: networkStatus,
    ipAddress: "192.168.1.1",
    macAddress: "00:1A:2B:3C:4D:5E",
    gateway: "192.168.1.1",
    dns: ["8.8.8.8", "8.8.4.4"],
    speed: {
      download: 245.6, // Mbps
      upload: 35.2, // Mbps
      ping: 12, // ms
    },
    usage: {
      today: 2.4, // GB
      week: 15.8, // GB
      month: 68.2, // GB
    },
    connectedDevices: 6,
  }

  // Mock connected devices
  const connectedDevices = [
    {
      id: "device-1",
      name: "MacBook Pro",
      type: "laptop",
      icon: <Laptop className="h-5 w-5" />,
      ipAddress: "192.168.1.5",
      macAddress: "00:1A:2B:3C:4D:5F",
      connected: "5 hours ago",
      usage: {
        download: 1.2, // GB
        upload: 0.3, // GB
      },
      status: "active",
    },
    {
      id: "device-2",
      name: "iPhone 14 Pro",
      type: "smartphone",
      icon: <Smartphone className="h-5 w-5" />,
      ipAddress: "192.168.1.6",
      macAddress: "00:2B:3C:4D:5F:6G",
      connected: "2 hours ago",
      usage: {
        download: 0.8, // GB
        upload: 0.2, // GB
      },
      status: "active",
    },
    {
      id: "device-3",
      name: "iPad Air",
      type: "tablet",
      icon: <Tablet className="h-5 w-5" />,
      ipAddress: "192.168.1.7",
      macAddress: "00:3C:4D:5F:6G:7H",
      connected: "3 hours ago",
      usage: {
        download: 0.5, // GB
        upload: 0.1, // GB
      },
      status: "idle",
    },
    {
      id: "device-4",
      name: "Windows Desktop",
      type: "desktop",
      icon: <Monitor className="h-5 w-5" />,
      ipAddress: "192.168.1.8",
      macAddress: "00:4D:5F:6G:7H:8I",
      connected: "6 hours ago",
      usage: {
        download: 3.5, // GB
        upload: 1.2, // GB
      },
      status: "active",
    },
    {
      id: "device-5",
      name: "Android Tablet",
      type: "tablet",
      icon: <Tablet className="h-5 w-5" />,
      ipAddress: "192.168.1.9",
      macAddress: "00:5F:6G:7H:8I:9J",
      connected: "1 day ago",
      usage: {
        download: 0.3, // GB
        upload: 0.1, // GB
      },
      status: "idle",
    },
    {
      id: "device-6",
      name: "Linux Server",
      type: "server",
      icon: <HardDrive className="h-5 w-5" />,
      ipAddress: "192.168.1.10",
      macAddress: "00:6G:7H:8I:9J:0K",
      connected: "1 week ago",
      usage: {
        download: 5.2, // GB
        upload: 2.8, // GB
      },
      status: "active",
    },
  ]

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Network Status Updated",
        description: "Network information has been refreshed",
      })
    }, 1500)
  }

  // Toggle network status (for demo purposes)
  const toggleNetworkStatus = () => {
    const newStatus = networkStatus === "online" ? "offline" : "online"
    setNetworkStatus(newStatus)

    toast({
      title: `Network ${newStatus === "online" ? "Connected" : "Disconnected"}`,
      description: `Your network is now ${newStatus === "online" ? "connected" : "disconnected"}`,
      variant: newStatus === "online" ? "default" : "destructive",
    })
  }

  // Format data size
  const formatDataSize = (sizeInGB) => {
    if (sizeInGB < 0.1) {
      return `${(sizeInGB * 1000).toFixed(0)} MB`
    }
    return `${sizeInGB.toFixed(1)} GB`
  }

  // Format speed
  const formatSpeed = (speedInMbps) => {
    if (speedInMbps > 1000) {
      return `${(speedInMbps / 1000).toFixed(1)} Gbps`
    }
    return `${speedInMbps.toFixed(1)} Mbps`
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-red-500"
      case "limited":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  // Get device status color
  const getDeviceStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Network</h1>
              <p className="text-gray-600">Monitor and manage your network connections</p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>

              <Button
                onClick={toggleNetworkStatus}
                className={
                  networkStatus === "online"
                    ? "bg-accent-500 hover:bg-accent-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }
              >
                {networkStatus === "online" ? (
                  <>
                    <Wifi className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  <>
                    <WifiOff className="mr-2 h-4 w-4" />
                    Disconnected
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Network Status */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Network Status</h2>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(networkStatus)} mr-2`}></div>
                    <span className="text-sm capitalize">{networkStatus}</span>
                  </div>
                </div>

                {networkStatus === "offline" ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <WifiOff className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Network Disconnected</h3>
                    <p className="text-gray-600 mb-6">Your network connection is currently offline</p>
                    <Button onClick={toggleNetworkStatus} className="bg-accent-500 hover:bg-accent-600 text-white">
                      Reconnect
                    </Button>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Network Info */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Network Information</h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Name</span>
                              <span className="text-sm font-medium">{networkInfo.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Type</span>
                              <span className="text-sm font-medium">{networkInfo.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">IP Address</span>
                              <span className="text-sm font-medium">{networkInfo.ipAddress}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">MAC Address</span>
                              <span className="text-sm font-medium">{networkInfo.macAddress}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Gateway</span>
                              <span className="text-sm font-medium">{networkInfo.gateway}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">DNS</span>
                              <span className="text-sm font-medium">{networkInfo.dns.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Network Speed */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Network Speed</h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <div className="flex items-center">
                                  <Download className="h-4 w-4 text-green-500 mr-2" />
                                  <span className="text-sm text-gray-500">Download</span>
                                </div>
                                <span className="text-sm font-medium">{formatSpeed(networkInfo.speed.download)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-green-500"
                                  style={{ width: `${(networkInfo.speed.download / 300) * 100}%` }}
                                ></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <div className="flex items-center">
                                  <Upload className="h-4 w-4 text-blue-500 mr-2" />
                                  <span className="text-sm text-gray-500">Upload</span>
                                </div>
                                <span className="text-sm font-medium">{formatSpeed(networkInfo.speed.upload)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-blue-500"
                                  style={{ width: `${(networkInfo.speed.upload / 50) * 100}%` }}
                                ></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <div className="flex items-center">
                                  <Activity className="h-4 w-4 text-accent-500 mr-2" />
                                  <span className="text-sm text-gray-500">Ping</span>
                                </div>
                                <span className="text-sm font-medium">{networkInfo.speed.ping} ms</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full bg-accent-500"
                                  style={{ width: `${100 - (networkInfo.speed.ping / 50) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data Usage */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Data Usage</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="text-center">
                            <span className="text-sm text-gray-500 block mb-1">Today</span>
                            <span className="text-2xl font-bold text-gray-900 block mb-1">
                              {formatDataSize(networkInfo.usage.today)}
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div
                                className="h-1.5 rounded-full bg-accent-500"
                                style={{ width: `${(networkInfo.usage.today / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="text-center">
                            <span className="text-sm text-gray-500 block mb-1">This Week</span>
                            <span className="text-2xl font-bold text-gray-900 block mb-1">
                              {formatDataSize(networkInfo.usage.week)}
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div
                                className="h-1.5 rounded-full bg-accent-500"
                                style={{ width: `${(networkInfo.usage.week / 30) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="text-center">
                            <span className="text-sm text-gray-500 block mb-1">This Month</span>
                            <span className="text-2xl font-bold text-gray-900 block mb-1">
                              {formatDataSize(networkInfo.usage.month)}
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div
                                className="h-1.5 rounded-full bg-accent-500"
                                style={{ width: `${(networkInfo.usage.month / 100) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Connected Devices */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Connected Devices</h2>
                  <Badge variant="outline">{networkInfo.connectedDevices} devices</Badge>
                </div>

                <div className="divide-y divide-gray-200">
                  {connectedDevices.map((device) => (
                    <div key={device.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center mr-4">
                          {device.icon}
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-900 mr-2">{device.name}</h3>
                            <div className={`w-2 h-2 rounded-full ${getDeviceStatusColor(device.status)}`}></div>
                          </div>
                          <p className="text-xs text-gray-500">
                            {device.ipAddress} • {device.connected}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center justify-end">
                              <Download className="h-3 w-3 text-green-500 mr-1" />
                              <span className="text-xs font-medium">{formatDataSize(device.usage.download)}</span>
                            </div>
                            <div className="flex items-center justify-end">
                              <Upload className="h-3 w-3 text-blue-500 mr-1" />
                              <span className="text-xs font-medium">{formatDataSize(device.usage.upload)}</span>
                            </div>
                          </div>

                          <Button variant="ghost" size="sm" className="text-gray-500">
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
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Network Tools */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Network Tools</h2>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white justify-start">
                      <Zap className="mr-2 h-4 w-4" />
                      Run Speed Test
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
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
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Ping Test
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
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
                        className="mr-2 h-4 w-4"
                      >
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                        <line x1="6" y1="6" x2="6.01" y2="6" />
                        <line x1="6" y1="18" x2="6.01" y2="18" />
                      </svg>
                      Network Diagnostics
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
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
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Manage Device Access
                    </Button>
                  </div>
                </div>
              </div>

              {/* Network Settings */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Network Settings</h2>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">Auto-Connect</h3>
                          <p className="text-xs text-gray-500">Automatically connect to known networks</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">Data Saver</h3>
                          <p className="text-xs text-gray-500">Reduce data usage on metered networks</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">Network Notifications</h3>
                          <p className="text-xs text-gray-500">Get alerts about network changes</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Button variant="outline" className="w-full">
                        Advanced Network Settings
                      </Button>
                    </div>
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

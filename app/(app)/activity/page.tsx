"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Clock,
  RefreshCw,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  Laptop,
  Shield,
  Wifi,
  Database,
  Cloud,
  Power,
  Key,
  Fingerprint,
} from "lucide-react"

export default function ActivityPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filter, setFilter] = useState("all") // all, security, network, storage, device

  // Mock activity data
  const activities = [
    {
      id: "activity-1",
      type: "security",
      icon: <Shield className="h-5 w-5" />,
      title: "Login Successful",
      description: "You logged in from MacBook Pro",
      device: "MacBook Pro",
      time: "Just now",
      status: "success",
    },
    {
      id: "activity-2",
      type: "network",
      icon: <Wifi className="h-5 w-5" />,
      title: "Network Connected",
      description: "Connected to DASHED-Network",
      device: "iPhone 14 Pro",
      time: "5 minutes ago",
      status: "success",
    },
    {
      id: "activity-3",
      type: "storage",
      icon: <Upload className="h-5 w-5" />,
      title: "File Uploaded",
      description: "Project Presentation.pptx (8.5 MB)",
      device: "MacBook Pro",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: "activity-4",
      type: "security",
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Login Attempt Blocked",
      description: "Suspicious login attempt from Moscow, Russia",
      device: "Unknown",
      time: "3 hours ago",
      status: "warning",
    },
    {
      id: "activity-5",
      type: "device",
      icon: <Power className="h-5 w-5" />,
      title: "Device Shutdown",
      description: "iPad Air was powered off",
      device: "iPad Air",
      time: "5 hours ago",
      status: "info",
    },
    {
      id: "activity-6",
      type: "storage",
      icon: <Cloud className="h-5 w-5" />,
      title: "Cloud Sync Completed",
      description: "24.5 GB of data synced to DASHED Cloud",
      device: "All Devices",
      time: "6 hours ago",
      status: "success",
    },
    {
      id: "activity-7",
      type: "network",
      icon: <Download className="h-5 w-5" />,
      title: "Large Download",
      description: "Software update (1.2 GB)",
      device: "Windows Desktop",
      time: "1 day ago",
      status: "info",
    },
    {
      id: "activity-8",
      type: "security",
      icon: <Key className="h-5 w-5" />,
      title: "Password Changed",
      description: "Your account password was updated",
      device: "MacBook Pro",
      time: "2 days ago",
      status: "success",
    },
    {
      id: "activity-9",
      type: "device",
      icon: <Laptop className="h-5 w-5" />,
      title: "New Device Added",
      description: "Android Tablet was added to your account",
      device: "Android Tablet",
      time: "3 days ago",
      status: "success",
    },
    {
      id: "activity-10",
      type: "storage",
      icon: <Database className="h-5 w-5" />,
      title: "Storage Optimized",
      description: "18.2 GB of space freed up",
      device: "MacBook Pro",
      time: "4 days ago",
      status: "success",
    },
    {
      id: "activity-11",
      type: "security",
      icon: <Fingerprint className="h-5 w-5" />,
      title: "Biometric Authentication Enabled",
      description: "Fingerprint authentication was set up",
      device: "iPhone 14 Pro",
      time: "1 week ago",
      status: "success",
    },
    {
      id: "activity-12",
      type: "network",
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Network Vulnerability Detected",
      description: "Potential security risk in your network",
      device: "Router",
      time: "1 week ago",
      status: "error",
    },
  ]

  // Filter activities
  const filteredActivities = filter === "all" ? activities : activities.filter((activity) => activity.type === filter)

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Activity Log Updated",
        description: "Activity information has been refreshed",
      })
    }, 1500)
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-gray-400"
    }
  }

  // Get icon background color
  const getIconBgColor = (type) => {
    switch (type) {
      case "security":
        return "bg-red-100"
      case "network":
        return "bg-blue-100"
      case "storage":
        return "bg-purple-100"
      case "device":
        return "bg-green-100"
      default:
        return "bg-gray-100"
    }
  }

  // Get icon color
  const getIconColor = (type) => {
    switch (type) {
      case "security":
        return "text-red-500"
      case "network":
        return "text-blue-500"
      case "storage":
        return "text-purple-500"
      case "device":
        return "text-green-500"
      default:
        return "text-gray-500"
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
              <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
              <p className="text-gray-600">Track all activities across your devices</p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <div className="flex items-center bg-white rounded-md border border-gray-200 p-1">
                <button
                  className={`px-3 py-1 text-sm rounded-md ${filter === "all" ? "bg-accent-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${filter === "security" ? "bg-accent-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  onClick={() => setFilter("security")}
                >
                  Security
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${filter === "network" ? "bg-accent-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  onClick={() => setFilter("network")}
                >
                  Network
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${filter === "storage" ? "bg-accent-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  onClick={() => setFilter("storage")}
                >
                  Storage
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${filter === "device" ? "bg-accent-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  onClick={() => setFilter("device")}
                >
                  Device
                </button>
              </div>

              <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>

              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Activity Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Activity Summary</h2>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <Shield className="h-4 w-4 text-red-500" />
                          </div>
                          <span className="font-medium text-gray-900">Security</span>
                        </div>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {activities.filter((a) => a.type === "security").length}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">1 security alert in the last 24 hours</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Wifi className="h-4 w-4 text-blue-500" />
                          </div>
                          <span className="font-medium text-gray-900">Network</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {activities.filter((a) => a.type === "network").length}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">2 network events in the last 24 hours</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <Database className="h-4 w-4 text-purple-500" />
                          </div>
                          <span className="font-medium text-gray-900">Storage</span>
                        </div>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {activities.filter((a) => a.type === "storage").length}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">3 storage activities in the last 24 hours</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Laptop className="h-4 w-4 text-green-500" />
                          </div>
                          <span className="font-medium text-gray-900">Device</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {activities.filter((a) => a.type === "device").length}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">2 device events in the last 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Activity Tools</h2>
                </div>

                <div className="p-4">
                  <div className="space-y-3">
                    <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      Export Activity Log
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
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      Generate Report
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
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Activity Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Activity Log</h2>
                  <Badge variant="outline">{filteredActivities.length} activities</Badge>
                </div>

                {filteredActivities.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No activities found</h3>
                    <p className="text-gray-600">Try adjusting your filter settings</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
                    {filteredActivities.map((activity) => (
                      <div key={activity.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="mr-3">
                            <div
                              className={`w-10 h-10 rounded-full ${getIconBgColor(activity.type)} flex items-center justify-center`}
                            >
                              <div className={getIconColor(activity.type)}>{activity.icon}</div>
                            </div>
                          </div>

                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-900">{activity.title}</h3>
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)} mr-2`}></div>
                                <span className="text-xs text-gray-500">{activity.time}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center mt-2">
                              <Badge variant="outline" className="mr-2 text-xs">
                                {activity.device}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-xs capitalize ${
                                  activity.type === "security"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : activity.type === "network"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : activity.type === "storage"
                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                        : "bg-green-50 text-green-700 border-green-200"
                                }`}
                              >
                                {activity.type}
                              </Badge>
                            </div>
                          </div>

                          <Button variant="ghost" size="sm" className="text-gray-500 ml-2">
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
                    ))}
                  </div>
                )}

                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                  <Button variant="link" className="text-accent-500">
                    View Older Activities
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
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

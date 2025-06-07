"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  RefreshCw,
  Trash2,
  FileText,
  Image,
  Film,
  Music,
  Archive,
  File,
  Database,
  Cloud,
  Download,
  Upload,
  AlertTriangle,
  Check,
} from "lucide-react"

export default function StoragePage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)

  // Mock storage data
  const storageInfo = {
    total: 4096, // GB
    used: 2458, // GB
    available: 1638, // GB
    devices: [
      {
        id: "device-1",
        name: "Main Storage",
        type: "SSD",
        total: 2048, // GB
        used: 1356, // GB
        health: 98, // percentage
      },
      {
        id: "device-2",
        name: "Secondary Storage",
        type: "HDD",
        total: 2048, // GB
        used: 1102, // GB
        health: 92, // percentage
      },
    ],
    fileTypes: [
      {
        type: "Documents",
        icon: <FileText className="h-4 w-4" />,
        size: 128, // GB
        color: "bg-blue-500",
      },
      {
        type: "Images",
        icon: <Image className="h-4 w-4" />,
        size: 356, // GB
        color: "bg-green-500",
      },
      {
        type: "Videos",
        icon: <Film className="h-4 w-4" />,
        size: 845, // GB
        color: "bg-purple-500",
      },
      {
        type: "Audio",
        icon: <Music className="h-4 w-4" />,
        size: 215, // GB
        color: "bg-yellow-500",
      },
      {
        type: "Archives",
        icon: <Archive className="h-4 w-4" />,
        size: 189, // GB
        color: "bg-orange-500",
      },
      {
        type: "Other",
        icon: <File className="h-4 w-4" />,
        size: 725, // GB
        color: "bg-gray-500",
      },
    ],
    cloudStorage: {
      total: 1000, // GB
      used: 345, // GB
      synced: "2 hours ago",
    },
  }

  // Mock recent files
  const recentFiles = [
    {
      id: "file-1",
      name: "Project Presentation.pptx",
      type: "presentation",
      icon: <FileText className="h-4 w-4 text-accent-500" />,
      size: 8.5, // MB
      modified: "2 hours ago",
      location: "Documents/Projects",
    },
    {
      id: "file-2",
      name: "Family Photo.jpg",
      type: "image",
      icon: <Image className="h-4 w-4 text-green-500" />,
      size: 3.2, // MB
      modified: "Yesterday",
      location: "Pictures/Family",
    },
    {
      id: "file-3",
      name: "Quarterly Report.pdf",
      type: "document",
      icon: <FileText className="h-4 w-4 text-red-500" />,
      size: 5.7, // MB
      modified: "3 days ago",
      location: "Documents/Work",
    },
    {
      id: "file-4",
      name: "Vacation Video.mp4",
      type: "video",
      icon: <Film className="h-4 w-4 text-purple-500" />,
      size: 256.8, // MB
      modified: "1 week ago",
      location: "Videos/Vacation",
    },
    {
      id: "file-5",
      name: "Project Backup.zip",
      type: "archive",
      icon: <Archive className="h-4 w-4 text-orange-500" />,
      size: 128.5, // MB
      modified: "2 weeks ago",
      location: "Documents/Backups",
    },
  ]

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Storage Information Updated",
        description: "Storage information has been refreshed",
      })
    }, 1500)
  }

  // Handle storage optimization
  const handleOptimize = () => {
    setIsOptimizing(true)

    // Simulate optimization delay
    setTimeout(() => {
      setIsOptimizing(false)
      toast({
        title: "Storage Optimized",
        description: "Successfully freed up 24.5 GB of storage",
      })
    }, 2500)
  }

  // Format storage size
  const formatStorageSize = (sizeInGB) => {
    if (sizeInGB < 1) {
      return `${(sizeInGB * 1000).toFixed(0)} MB`
    }
    return `${sizeInGB.toFixed(0)} GB`
  }

  // Calculate percentage
  const calculatePercentage = (used, total) => {
    return Math.round((used / total) * 100)
  }

  // Get usage color
  const getUsageColor = (percentage) => {
    if (percentage > 90) return "bg-red-500"
    if (percentage > 70) return "bg-yellow-500"
    return "bg-accent-500"
  }

  // Get health color
  const getHealthColor = (health) => {
    if (health < 70) return "text-red-500"
    if (health < 90) return "text-yellow-500"
    return "text-green-500"
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
              <h1 className="text-2xl font-bold text-gray-900">Storage</h1>
              <p className="text-gray-600">Manage your storage devices and files</p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>

              <Button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="bg-accent-500 hover:bg-accent-600 text-white"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Optimize Storage
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Storage Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Storage Overview</h2>
                </div>

                <div className="p-4">
                  {/* Total Storage */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">Total Storage</h3>
                        <p className="text-sm text-gray-500">
                          {formatStorageSize(storageInfo.used)} used of {formatStorageSize(storageInfo.total)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">
                          {formatStorageSize(storageInfo.available)} available
                        </span>
                        <p className="text-xs text-gray-500">
                          {calculatePercentage(storageInfo.used, storageInfo.total)}% used
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getUsageColor(calculatePercentage(storageInfo.used, storageInfo.total))}`}
                        style={{ width: `${calculatePercentage(storageInfo.used, storageInfo.total)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Storage Devices */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Storage Devices</h3>
                    <div className="space-y-4">
                      {storageInfo.devices.map((device) => (
                        <div key={device.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{device.name}</h4>
                              <p className="text-xs text-gray-500">{device.type}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium">
                                {formatStorageSize(device.used)} / {formatStorageSize(device.total)}
                              </span>
                              <p className="text-xs text-gray-500">
                                {calculatePercentage(device.used, device.total)}% used
                              </p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getUsageColor(calculatePercentage(device.used, device.total))}`}
                              style={{ width: `${calculatePercentage(device.used, device.total)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-gray-500">Health</span>
                            <span className={`text-xs font-medium ${getHealthColor(device.health)}`}>
                              {device.health}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* File Type Distribution */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Storage by File Type</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex mb-4">
                        {storageInfo.fileTypes.map((fileType, index) => (
                          <div
                            key={fileType.type}
                            className={`h-4 ${fileType.color}`}
                            style={{
                              width: `${(fileType.size / storageInfo.used) * 100}%`,
                              borderTopLeftRadius: index === 0 ? "0.25rem" : "0",
                              borderBottomLeftRadius: index === 0 ? "0.25rem" : "0",
                              borderTopRightRadius: index === storageInfo.fileTypes.length - 1 ? "0.25rem" : "0",
                              borderBottomRightRadius: index === storageInfo.fileTypes.length - 1 ? "0.25rem" : "0",
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {storageInfo.fileTypes.map((fileType) => (
                          <div key={fileType.type} className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${fileType.color} mr-2`}></div>
                            <div className="flex items-center mr-2">{fileType.icon}</div>
                            <span className="text-xs text-gray-700 mr-1">{fileType.type}</span>
                            <span className="text-xs text-gray-500 ml-auto">{formatStorageSize(fileType.size)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Files */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Recent Files</h2>
                  <Button variant="outline" size="sm">
                    View All Files
                  </Button>
                </div>

                <div className="divide-y divide-gray-200">
                  {recentFiles.map((file) => (
                    <div key={file.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {file.icon}
                        </div>

                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                          <p className="text-xs text-gray-500">
                            {file.location} • {file.size} MB
                          </p>
                        </div>

                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-4">{file.modified}</span>
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

            {/* Storage Tools and Cloud Storage */}
            <div>
              {/* Storage Tools */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Storage Tools</h2>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      Analyze Storage
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clean Temporary Files
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
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                      Disk Health Check
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Backup Manager
                    </Button>
                  </div>
                </div>
              </div>

              {/* Cloud Storage */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Cloud Storage</h2>
                </div>

                <div className="p-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Cloud className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">DASHED Cloud</h3>
                      <p className="text-sm text-blue-600">Last synced {storageInfo.cloudStorage.synced}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Storage Used</span>
                      <span className="text-sm font-medium">
                        {formatStorageSize(storageInfo.cloudStorage.used)} /{" "}
                        {formatStorageSize(storageInfo.cloudStorage.total)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(storageInfo.cloudStorage.used / storageInfo.cloudStorage.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Upload className="h-4 w-4 text-accent-500 mr-1" />
                        <span className="text-xs font-medium">Uploaded</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">24.5 GB</span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Download className="h-4 w-4 text-accent-500 mr-1" />
                        <span className="text-xs font-medium">Downloaded</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">18.2 GB</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Cloud className="mr-2 h-4 w-4" />
                      Sync Now
                    </Button>

                    <Button variant="outline" className="w-full">
                      Cloud Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Storage Alerts */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Storage Alerts</h2>
                </div>

                <div className="p-4">
                  <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100 mb-3">
                    <div className="mr-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-800">Low Storage Warning</h4>
                      <p className="text-sm text-yellow-600">Secondary Storage is at 92% capacity</p>
                    </div>
                  </div>

                  <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="mr-3">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Backup Complete</h4>
                      <p className="text-sm text-green-600">Last backup completed successfully</p>
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

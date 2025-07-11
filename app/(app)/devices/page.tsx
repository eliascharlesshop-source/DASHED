"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Monitor,
  Smartphone,
  Tablet,
  HardDrive,
  Search,
  Plus,
  MoreVertical,
  Wifi,
  Battery,
  Power,
  Settings,
  RefreshCw
} from "lucide-react"

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const devices = [
    {
      id: "1",
      name: "MacBook Pro",
      type: "laptop",
      status: "online",
      os: "macOS",
      location: "Home Office",
      battery: 85,
      lastSeen: "Active now",
      icon: Monitor
    },
    {
      id: "2", 
      name: "iPhone 14 Pro",
      type: "smartphone",
      status: "online", 
      os: "iOS",
      location: "Home",
      battery: 72,
      lastSeen: "2 minutes ago",
      icon: Smartphone
    },
    {
      id: "3",
      name: "iPad Air",
      type: "tablet",
      status: "offline",
      os: "iPadOS", 
      location: "Living Room",
      battery: 23,
      lastSeen: "3 hours ago",
      icon: Tablet
    },
    {
      id: "4",
      name: "Windows Desktop",
      type: "desktop",
      status: "online",
      os: "Windows 11",
      location: "Home Office", 
      battery: null,
      lastSeen: "Active now",
      icon: Monitor
    },
    {
      id: "5",
      name: "Linux Server",
      type: "server", 
      status: "online",
      os: "Ubuntu",
      location: "Home Office",
      battery: null,
      lastSeen: "Active now", 
      icon: HardDrive
    }
  ]

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || device.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline": 
        return "bg-gray-400"
      case "warning":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const getBatteryColor = (level: number | null) => {
    if (level === null) return "text-gray-400"
    if (level < 20) return "text-red-500"
    if (level < 50) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader toggleSidebar={() => {}} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Devices</h1>
              <p className="text-gray-600">Manage and monitor all your connected devices</p>
            </div>
            
            <Button className="bg-accent-500 hover:bg-accent-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search devices..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    onClick={() => setFilterStatus("all")}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === "online" ? "default" : "outline"}
                    onClick={() => setFilterStatus("online")}
                    size="sm"
                  >
                    Online
                  </Button>
                  <Button
                    variant={filterStatus === "offline" ? "default" : "outline"}
                    onClick={() => setFilterStatus("offline")}
                    size="sm"
                  >
                    Offline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => {
              const IconComponent = device.icon
              return (
                <Card key={device.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-accent-50 rounded-full p-3">
                          <IconComponent className="h-6 w-6 text-accent-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <CardDescription>{device.os}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status</span>
                        <Badge variant={device.status === "online" ? "default" : "secondary"}>
                          {device.status}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Location</span>
                        <span className="font-medium">{device.location}</span>
                      </div>
                      
                      {device.battery !== null && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Battery</span>
                          <div className="flex items-center space-x-1">
                            <Battery className={`h-4 w-4 ${getBatteryColor(device.battery)}`} />
                            <span className={`font-medium ${getBatteryColor(device.battery)}`}>
                              {device.battery}%
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last Seen</span>
                        <span className="font-medium">{device.lastSeen}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-1" />
                        Settings
                      </Button>
                      
                      {device.status === "online" && (
                        <>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Power className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredDevices.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No devices found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? "Try adjusting your search query" : "Add your first device to get started"}
                </p>
                <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Device
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

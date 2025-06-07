"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  HardDrive,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  Edit,
  RefreshCw,
  Download,
  Tag,
  Shield,
  Settings,
  ChevronRight,
  AlertTriangle,
  Info,
} from "lucide-react"

// Mock data for devices
const mockDevices = [
  {
    id: "device-1",
    name: "MacBook Pro",
    type: "laptop",
    icon: <Laptop className="h-6 w-6" />,
    os: "macOS",
    osVersion: "Sonoma 14.4",
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
    lastUpdate: "2 days ago",
    groups: ["Personal", "Work"],
    securityStatus: "secure",
    model: "MacBook Pro 16-inch (2023)",
    serialNumber: "C02XL0GYPG8W",
    processor: "Apple M2 Pro",
    ram: "32 GB",
  },
  {
    id: "device-2",
    name: "iPhone 14 Pro",
    type: "smartphone",
    icon: <Smartphone className="h-6 w-6" />,
    os: "iOS",
    osVersion: "17.4",
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
    lastUpdate: "1 week ago",
    groups: ["Personal", "Mobile"],
    securityStatus: "secure",
    model: "iPhone 14 Pro",
    serialNumber: "DNQXK8UHN72Y",
    processor: "Apple A16 Bionic",
    ram: "6 GB",
  },
  {
    id: "device-3",
    name: "iPad Air",
    type: "tablet",
    icon: <Tablet className="h-6 w-6" />,
    os: "iPadOS",
    osVersion: "17.4",
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
    lastUpdate: "2 weeks ago",
    groups: ["Personal", "Mobile"],
    securityStatus: "warning",
    model: "iPad Air (5th generation)",
    serialNumber: "DLXQP1F9JYVD",
    processor: "Apple M1",
    ram: "8 GB",
  },
  {
    id: "device-4",
    name: "Windows Desktop",
    type: "desktop",
    icon: <Monitor className="h-6 w-6" />,
    os: "Windows",
    osVersion: "11 Pro",
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
    lastUpdate: "3 days ago",
    groups: ["Work"],
    securityStatus: "secure",
    model: "Custom Build",
    serialNumber: "CB-2023-0142",
    processor: "Intel Core i9-13900K",
    ram: "64 GB",
  },
  {
    id: "device-5",
    name: "Android Tablet",
    type: "tablet",
    icon: <Tablet className="h-6 w-6" />,
    os: "Android",
    osVersion: "14",
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
    lastUpdate: "1 month ago",
    groups: ["Personal", "Mobile"],
    securityStatus: "attention",
    model: "Samsung Galaxy Tab S9",
    serialNumber: "R52M60BT1XY",
    processor: "Snapdragon 8 Gen 2",
    ram: "12 GB",
  },
  {
    id: "device-6",
    name: "Linux Server",
    type: "server",
    icon: <HardDrive className="h-6 w-6" />,
    os: "Ubuntu",
    osVersion: "22.04 LTS",
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
    lastUpdate: "5 days ago",
    groups: ["Work", "Server"],
    securityStatus: "secure",
    model: "Dell PowerEdge R740",
    serialNumber: "SRV20230789",
    processor: "AMD EPYC 7763",
    ram: "128 GB",
  },
]

// Device groups
const deviceGroups = [
  { id: "personal", name: "Personal", count: 4 },
  { id: "work", name: "Work", count: 3 },
  { id: "mobile", name: "Mobile", count: 3 },
  { id: "server", name: "Server", count: 1 },
]

export default function DevicesPage() {
  const { toast } = useToast()
  const [devices, setDevices] = useState(mockDevices)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showAddDeviceDialog, setShowAddDeviceDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterOS, setFilterOS] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Get the selected device details
  const selectedDeviceDetails = devices.find((device) => device.id === selectedDevice)

  // Filter devices based on search query, active tab, and filters
  const filteredDevices = devices.filter((device) => {
    // Search filter
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "online" && device.status === "online") ||
      (activeTab === "offline" && device.status === "offline") ||
      (activeTab === "personal" && device.groups.includes("Personal")) ||
      (activeTab === "work" && device.groups.includes("Work"))

    // OS filter
    const matchesOS = filterOS.length === 0 || filterOS.includes(device.os)

    // Status filter
    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(device.status)

    return matchesSearch && matchesTab && matchesOS && matchesStatus
  })

  // Sort devices
  const sortedDevices = [...filteredDevices].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "os":
        comparison = a.os.localeCompare(b.os)
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
      case "lastSeen":
        // This is a simplification since lastSeen is a string like "Just now", "5 minutes ago", etc.
        comparison = a.lastSeen.localeCompare(b.lastSeen)
        break
      default:
        comparison = a.name.localeCompare(b.name)
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Refreshed",
        description: "Device list has been updated",
      })
    }, 1500)
  }

  // Handle device deletion
  const handleDeleteDevice = () => {
    if (!deviceToDelete) return

    setDevices(devices.filter((device) => device.id !== deviceToDelete))
    setShowDeleteDialog(false)
    setDeviceToDelete(null)

    if (selectedDevice === deviceToDelete) {
      setSelectedDevice(null)
    }

    toast({
      title: "Device Deleted",
      description: "The device has been removed from your account",
    })
  }

  // Handle adding a new device
  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would add the device to the database
    setShowAddDeviceDialog(false)

    toast({
      title: "Device Added",
      description: "New device has been added to your account",
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

  // Get security status details
  const getSecurityStatus = (status: string) => {
    switch (status) {
      case "secure":
        return {
          icon: <Shield className="h-4 w-4 text-green-500" />,
          text: "Secure",
          color: "text-green-500",
          bg: "bg-green-50",
          border: "border-green-100",
        }
      case "warning":
        return {
          icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
          text: "Updates Required",
          color: "text-yellow-500",
          bg: "bg-yellow-50",
          border: "border-yellow-100",
        }
      case "attention":
        return {
          icon: <Info className="h-4 w-4 text-blue-500" />,
          text: "Needs Attention",
          color: "text-blue-500",
          bg: "bg-blue-50",
          border: "border-blue-100",
        }
      default:
        return {
          icon: <Shield className="h-4 w-4 text-green-500" />,
          text: "Secure",
          color: "text-green-500",
          bg: "bg-green-50",
          border: "border-green-100",
        }
    }
  }

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Device Management</h1>
          <p className="text-gray-600">Manage and configure all your DASHED OS devices</p>
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

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-accent-50 text-accent-600" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>

          <Dialog open={showAddDeviceDialog} onOpenChange={setShowAddDeviceDialog}>
            <DialogTrigger asChild>
              <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogDescription>
                  Enter the details of the device you want to add to your DASHED OS network.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddDevice}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Device name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select defaultValue="laptop">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="server">Server</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="os" className="text-right">
                      OS
                    </Label>
                    <Select defaultValue="dashed">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select operating system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashed">DASHED OS</SelectItem>
                        <SelectItem value="macos">macOS</SelectItem>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="linux">Linux</SelectItem>
                        <SelectItem value="ios">iOS</SelectItem>
                        <SelectItem value="android">Android</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input id="location" placeholder="Device location" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Groups</Label>
                    <div className="col-span-3 space-y-2">
                      {deviceGroups.map((group) => (
                        <div key={group.id} className="flex items-center space-x-2">
                          <Checkbox id={`group-${group.id}`} />
                          <label
                            htmlFor={`group-${group.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {group.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Device</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterOS([])
                setFilterStatus([])
              }}
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Operating System</h4>
              <div className="space-y-2">
                {Array.from(new Set(devices.map((device) => device.os))).map((os) => (
                  <div key={os} className="flex items-center space-x-2">
                    <Checkbox
                      id={`os-${os}`}
                      checked={filterOS.includes(os)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterOS([...filterOS, os])
                        } else {
                          setFilterOS(filterOS.filter((item) => item !== os))
                        }
                      }}
                    />
                    <label
                      htmlFor={`os-${os}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {os}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
              <div className="space-y-2">
                {Array.from(new Set(devices.map((device) => device.status))).map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={filterStatus.includes(status)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterStatus([...filterStatus, status])
                        } else {
                          setFilterStatus(filterStatus.filter((item) => item !== status))
                        }
                      }}
                    />
                    <label
                      htmlFor={`status-${status}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="capitalize">{status}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="online">Online</TabsTrigger>
                  <TabsTrigger value="offline">Offline</TabsTrigger>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="work">Work</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="m-0">
                <DeviceList
                  devices={sortedDevices}
                  selectedDevice={selectedDevice}
                  setSelectedDevice={setSelectedDevice}
                  setDeviceToDelete={setDeviceToDelete}
                  setShowDeleteDialog={setShowDeleteDialog}
                  getStatusColor={getStatusColor}
                  toggleSort={toggleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </TabsContent>

              <TabsContent value="online" className="m-0">
                <DeviceList
                  devices={sortedDevices}
                  selectedDevice={selectedDevice}
                  setSelectedDevice={setSelectedDevice}
                  setDeviceToDelete={setDeviceToDelete}
                  setShowDeleteDialog={setShowDeleteDialog}
                  getStatusColor={getStatusColor}
                  toggleSort={toggleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </TabsContent>

              <TabsContent value="offline" className="m-0">
                <DeviceList
                  devices={sortedDevices}
                  selectedDevice={selectedDevice}
                  setSelectedDevice={setSelectedDevice}
                  setDeviceToDelete={setDeviceToDelete}
                  setShowDeleteDialog={setShowDeleteDialog}
                  getStatusColor={getStatusColor}
                  toggleSort={toggleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </TabsContent>

              <TabsContent value="personal" className="m-0">
                <DeviceList
                  devices={sortedDevices}
                  selectedDevice={selectedDevice}
                  setSelectedDevice={setSelectedDevice}
                  setDeviceToDelete={setDeviceToDelete}
                  setShowDeleteDialog={setShowDeleteDialog}
                  getStatusColor={getStatusColor}
                  toggleSort={toggleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </TabsContent>

              <TabsContent value="work" className="m-0">
                <DeviceList
                  devices={sortedDevices}
                  selectedDevice={selectedDevice}
                  setSelectedDevice={setSelectedDevice}
                  setDeviceToDelete={setDeviceToDelete}
                  setShowDeleteDialog={setShowDeleteDialog}
                  getStatusColor={getStatusColor}
                  toggleSort={toggleSort}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

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
                      {selectedDeviceDetails.os} {selectedDeviceDetails.osVersion} • {selectedDeviceDetails.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Device Groups */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Device Groups</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeviceDetails.groups.map((group) => (
                        <Badge key={group} variant="outline" className="bg-accent-50 text-accent-700 border-accent-200">
                          <Tag className="h-3 w-3 mr-1" />
                          {group}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" className="h-6 text-xs">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Group
                      </Button>
                    </div>
                  </div>

                  {/* Security Status */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Security Status</h4>
                    {(() => {
                      const security = getSecurityStatus(selectedDeviceDetails.securityStatus)
                      return (
                        <div className={`${security.bg} ${security.border} border rounded-lg p-3 flex items-center`}>
                          {security.icon}
                          <span className={`ml-2 text-sm ${security.color}`}>{security.text}</span>
                        </div>
                      )
                    })()}
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
                              className={`text-xs font-medium ${selectedDeviceDetails.battery < 20 ? "text-red-500" : selectedDeviceDetails.battery < 50 ? "text-yellow-500" : "text-green-500"}`}
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
                              <span
                                className={`text-xs font-medium ${selectedDeviceDetails.cpu > 90 ? "text-red-500" : selectedDeviceDetails.cpu > 70 ? "text-yellow-500" : "text-green-500"}`}
                              >
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
                                className={`text-xs font-medium ${selectedDeviceDetails.memory > 90 ? "text-red-500" : selectedDeviceDetails.memory > 70 ? "text-yellow-500" : "text-green-500"}`}
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
                        <span className="text-xs text-gray-500">Model</span>
                        <span className="text-xs font-medium">{selectedDeviceDetails.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Serial Number</span>
                        <span className="text-xs font-medium">{selectedDeviceDetails.serialNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Processor</span>
                        <span className="text-xs font-medium">{selectedDeviceDetails.processor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">RAM</span>
                        <span className="text-xs font-medium">{selectedDeviceDetails.ram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">IP Address</span>
                        <span className="text-xs font-medium">{selectedDeviceDetails.ip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Last Seen</span>
                        <span className="text-xs font-medium">{selectedDeviceDetails.lastSeen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Last Update</span>
                        <span className="text-xs font-medium">{selectedDeviceDetails.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setDeviceToDelete(selectedDeviceDetails.id)
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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

          {/* Device Groups */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">Device Groups</h2>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Group
              </Button>
            </div>

            <div className="divide-y divide-gray-200">
              {deviceGroups.map((group) => (
                <div key={group.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-accent-50 flex items-center justify-center mr-3">
                      <Tag className="h-4 w-4 text-accent-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                      <p className="text-xs text-gray-500">{group.count} devices</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Device</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this device? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              Deleting this device will remove it from your DASHED OS network. Any data stored on the device will remain
              intact, but you will no longer be able to manage it from this dashboard.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteDevice}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Device List Component
function DeviceList({
  devices,
  selectedDevice,
  setSelectedDevice,
  setDeviceToDelete,
  setShowDeleteDialog,
  getStatusColor,
  toggleSort,
  sortBy,
  sortOrder,
}: {
  devices: any[]
  selectedDevice: string | null
  setSelectedDevice: (id: string) => void
  setDeviceToDelete: (id: string) => void
  setShowDeleteDialog: (show: boolean) => void
  getStatusColor: (status: string) => string
  toggleSort: (field: string) => void
  sortBy: string
  sortOrder: "asc" | "desc"
}) {
  if (devices.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No devices found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div>
      <div className="hidden md:flex items-center p-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
        <div className="w-10"></div>
        <div className="flex-1 flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
          <span>Device Name</span>
          <ArrowUpDown className={`ml-1 h-3 w-3 ${sortBy === "name" ? "text-accent-500" : "text-gray-400"}`} />
        </div>
        <div className="w-24 flex items-center cursor-pointer" onClick={() => toggleSort("os")}>
          <span>OS</span>
          <ArrowUpDown className={`ml-1 h-3 w-3 ${sortBy === "os" ? "text-accent-500" : "text-gray-400"}`} />
        </div>
        <div className="w-24 flex items-center cursor-pointer" onClick={() => toggleSort("status")}>
          <span>Status</span>
          <ArrowUpDown className={`ml-1 h-3 w-3 ${sortBy === "status" ? "text-accent-500" : "text-gray-400"}`} />
        </div>
        <div className="w-28 flex items-center cursor-pointer" onClick={() => toggleSort("lastSeen")}>
          <span>Last Seen</span>
          <ArrowUpDown className={`ml-1 h-3 w-3 ${sortBy === "lastSeen" ? "text-accent-500" : "text-gray-400"}`} />
        </div>
        <div className="w-10"></div>
      </div>

      <div className="divide-y divide-gray-200">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${selectedDevice === device.id ? "bg-accent-50" : ""}`}
            onClick={() => setSelectedDevice(device.id)}
          >
            <div className={`w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center mr-4`}>
              {device.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h3 className="font-medium text-gray-900 mr-2">{device.name}</h3>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
              </div>
              <p className="text-xs text-gray-500 md:hidden">
                {device.os} • {device.location}
              </p>
              <div className="flex items-center mt-1 md:hidden">
                <span className="text-xs text-gray-500 mr-4">Last seen: {device.lastSeen}</span>
                {device.battery !== null && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`mr-1 ${device.battery < 20 ? "text-red-500" : device.battery < 50 ? "text-yellow-500" : "text-green-500"}`}
                    >
                      <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
                      <line x1="23" y1="13" x2="23" y2="11"></line>
                    </svg>
                    <span className="text-xs font-medium">{device.battery}%</span>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:block w-24">
              <span className="text-sm">{device.os}</span>
            </div>

            <div className="hidden md:block w-24">
              <span className="text-sm capitalize">{device.status}</span>
            </div>

            <div className="hidden md:block w-28">
              <span className="text-sm">{device.lastSeen}</span>
            </div>

            <div className="w-10 flex justify-end">
              <div className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[200px]">
                    <div className="py-2 space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setSelectedDevice(device.id)}
                      >
                        <Info className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setDeviceToDelete(device.id)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

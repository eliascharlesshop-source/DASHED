"use client"

import { useState, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  RefreshCw,
  Download,
  Share2,
  ImageIcon,
  Music,
  Video,
  Mic,
  Camera,
  MoreVertical,
  Cast,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Clock,
  Sliders,
} from "lucide-react"

// Mock data for devices and streams
const mockDevices = [
  {
    id: "device-1",
    name: "MacBook Pro",
    type: "laptop",
    icon: <Laptop className="h-6 w-6" />,
    status: "online",
    streams: ["stream-1", "stream-2", "stream-5"],
  },
  {
    id: "device-2",
    name: "iPhone 14 Pro",
    type: "smartphone",
    icon: <Smartphone className="h-6 w-6" />,
    status: "online",
    streams: ["stream-3", "stream-6"],
  },
  {
    id: "device-3",
    name: "iPad Air",
    type: "tablet",
    icon: <Tablet className="h-6 w-6" />,
    status: "offline",
    streams: ["stream-4"],
  },
  {
    id: "device-4",
    name: "Windows Desktop",
    type: "desktop",
    icon: <Monitor className="h-6 w-6" />,
    status: "online",
    streams: ["stream-7", "stream-8"],
  },
]

const mockStreams = [
  {
    id: "stream-1",
    name: "Screen Recording",
    type: "video",
    icon: <Monitor className="h-5 w-5" />,
    thumbnail: "/placeholder.svg?height=720&width=1280",
    resolution: "1920x1080",
    fps: 60,
    bitrate: "8 Mbps",
    duration: "00:45:12",
    size: "2.3 GB",
    isLive: true,
    isProtected: false,
  },
  {
    id: "stream-2",
    name: "Webcam Feed",
    type: "video",
    icon: <Camera className="h-5 w-5" />,
    thumbnail: "/placeholder.svg?height=720&width=1280",
    resolution: "1280x720",
    fps: 30,
    bitrate: "2 Mbps",
    duration: "01:12:34",
    size: "1.5 GB",
    isLive: true,
    isProtected: false,
  },
  {
    id: "stream-3",
    name: "Phone Camera",
    type: "video",
    icon: <Camera className="h-5 w-5" />,
    thumbnail: "/placeholder.svg?height=1080&width=1920",
    resolution: "1080x1920",
    fps: 30,
    bitrate: "4 Mbps",
    duration: "00:23:45",
    size: "890 MB",
    isLive: true,
    isProtected: true,
  },
  {
    id: "stream-4",
    name: "Music Playback",
    type: "audio",
    icon: <Music className="h-5 w-5" />,
    thumbnail: "/placeholder.svg?height=500&width=500",
    bitrate: "320 kbps",
    duration: "03:45:12",
    size: "450 MB",
    isLive: true,
    isProtected: false,
  },
  {
    id: "stream-5",
    name: "Microphone Input",
    type: "audio",
    icon: <Mic className="h-5 w-5" />,
    thumbnail: "/placeholder.svg?height=500&width=500",
    bitrate: "192 kbps",
    duration: "00:32:18",
    size: "120 MB",
    isLive: true,
    isProtected: false,
  },
  {
    id: "stream-6",
    name: "Photo Library",
    type: "image",
    icon: <ImageIcon className="h-5 w-5" />,
    thumbnail: "/placeholder.svg?height=1080&width=1920",
    count: 256,
    size: "4.2 GB",
    isLive: false,
    isProtected: true,
  },
  {
    id: "stream-7",
    name: "Documents",
    type: "file",
    icon: <File className="h-5 w-5" />,
    count: 124,
    size: "1.8 GB",
    isLive: false,
    isProtected: false,
  },
  {
    id: "stream-8",
    name: "System Audio",
    type: "audio",
    icon: <Volume2 className="h-5 w-5" />,
    thumbnail: "/placeholder.svg?height=500&width=500",
    bitrate: "256 kbps",
    duration: "01:15:42",
    size: "320 MB",
    isLive: true,
    isProtected: false,
  },
]

// File icon component
function File(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

// Media player component
function MediaPlayer({ stream, onClose }: { stream: any; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([75])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [quality, setQuality] = useState("auto")
  const playerRef = useRef<HTMLDivElement>(null)

  // Convert duration string to seconds for the progress bar
  useEffect(() => {
    if (stream.duration) {
      const parts = stream.duration.split(":")
      const durationInSeconds =
        Number.parseInt(parts[0]) * 3600 + Number.parseInt(parts[1]) * 60 + Number.parseInt(parts[2])
      setDuration(durationInSeconds)
      // Set a random current time for demo purposes
      setCurrentTime(Math.floor(Math.random() * durationInSeconds))
    }
  }, [stream])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Format time display
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    return [
      hours > 0 ? hours.toString().padStart(2, "0") : null,
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ]
      .filter(Boolean)
      .join(":")
  }

  return (
    <div ref={playerRef} className="relative bg-black rounded-lg overflow-hidden">
      {/* Media content */}
      {stream.type === "video" && (
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <img
            src={stream.thumbnail || "/placeholder.svg"}
            alt={stream.name}
            className="max-w-full max-h-full object-contain"
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
          {stream.isProtected && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-black bg-opacity-50 text-white border-none">
                <Lock className="h-3 w-3 mr-1" /> Protected
              </Badge>
            </div>
          )}
          {stream.isLive && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 text-white">
                <Zap className="h-3 w-3 mr-1" /> LIVE
              </Badge>
            </div>
          )}
        </div>
      )}

      {stream.type === "audio" && (
        <div className="h-48 bg-gradient-to-br from-accent-900 to-accent-700 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-10 mx-auto flex items-center justify-center mb-4">
              {stream.icon}
            </div>
            <h3 className="text-white font-medium">{stream.name}</h3>
            {stream.isLive && (
              <Badge className="mt-2 bg-red-500 text-white">
                <Zap className="h-3 w-3 mr-1" /> LIVE
              </Badge>
            )}
          </div>
        </div>
      )}

      {stream.type === "image" && (
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <img
            src={stream.thumbnail || "/placeholder.svg"}
            alt={stream.name}
            className="max-w-full max-h-full object-contain"
          />
          {stream.isProtected && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-black bg-opacity-50 text-white border-none">
                <Lock className="h-3 w-3 mr-1" /> Protected
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        {/* Progress bar */}
        {(stream.type === "video" || stream.type === "audio") && (
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="flex-grow"
                onValueChange={(value) => setCurrentTime(value[0])}
              />
            </div>
            <div className="flex justify-between text-xs text-white">
              <span>{formatTime(currentTime)}</span>
              <span>{stream.duration}</span>
            </div>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {(stream.type === "video" || stream.type === "audio") && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white hover:bg-opacity-10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-10">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-10">
                  <SkipForward className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white hover:bg-opacity-10"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    className="w-24"
                    onValueChange={(value) => setVolume(value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {stream.type === "video" && (
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="h-8 w-20 bg-black bg-opacity-50 text-white border-none">
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="360p">360p</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-10">
              <Cast className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white hover:bg-opacity-10"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-10"
        onClick={onClose}
      >
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
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </Button>
    </div>
  )
}

// Stream card component
function StreamCard({ stream, onClick }: { stream: any; onClick: () => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="relative">
        {stream.thumbnail && (
          <div className="aspect-video bg-gray-100">
            <img
              src={stream.thumbnail || "/placeholder.svg"}
              alt={stream.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {!stream.thumbnail && (
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">{stream.icon}</div>
          </div>
        )}
        {stream.isLive && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white">
              <Zap className="h-3 w-3 mr-1" /> LIVE
            </Badge>
          </div>
        )}
        {stream.isProtected && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white bg-opacity-75 border-none">
              <Lock className="h-3 w-3 mr-1" /> Protected
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{stream.name}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <div className="flex items-center mr-3">
                {stream.icon}
                <span className="ml-1 capitalize">{stream.type}</span>
              </div>
              {stream.resolution && <span className="mr-3">{stream.resolution}</span>}
              {stream.fps && <span className="mr-3">{stream.fps} fps</span>}
              {stream.count && <span className="mr-3">{stream.count} items</span>}
              <span>{stream.size}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Mirror Page component
export default function MirrorPage() {
  const { toast } = useToast()
  const [selectedDevice, setSelectedDevice] = useState<string | null>("device-1")
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mirrorSettings, setMirrorSettings] = useState({
    autoRefresh: false,
    highQuality: true,
    lowLatency: true,
    secureConnection: true,
    showNotifications: true,
  })

  // Get the selected device details
  const selectedDeviceDetails = mockDevices.find((device) => device.id === selectedDevice)

  // Get the selected stream details
  const selectedStreamDetails = selectedStream ? mockStreams.find((stream) => stream.id === selectedStream) : null

  // Get streams for the selected device
  const deviceStreams = selectedDeviceDetails
    ? mockStreams.filter((stream) => selectedDeviceDetails.streams.includes(stream.id))
    : []

  // Filter streams based on active tab
  const filteredStreams =
    activeTab === "all" ? deviceStreams : deviceStreams.filter((stream) => stream.type === activeTab)

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Refreshed",
        description: "Stream data has been updated",
      })
    }, 1500)
  }

  // Toggle mirror settings
  const toggleSetting = (setting: keyof typeof mirrorSettings) => {
    setMirrorSettings({
      ...mirrorSettings,
      [setting]: !mirrorSettings[setting],
    })

    toast({
      title: "Setting Updated",
      description: `${setting.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} has been ${mirrorSettings[setting] ? "disabled" : "enabled"}`,
    })
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
              <h1 className="text-2xl font-bold text-gray-900">Device Mirror</h1>
              <p className="text-gray-600">View and control media streams from your connected devices</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={selectedDevice || ""} onValueChange={setSelectedDevice}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  {mockDevices.map((device) => (
                    <SelectItem key={device.id} value={device.id} disabled={device.status === "offline"}>
                      <div className="flex items-center">
                        <div className="mr-2">{device.icon}</div>
                        <span>{device.name}</span>
                        {device.status === "offline" && <span className="ml-2 text-xs text-gray-400">(Offline)</span>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>

              <Button variant="outline" size="icon" onClick={() => setSelectedStream(null)} disabled={!selectedStream}>
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
              </Button>

              <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                <Cast className="h-4 w-4 mr-2" />
                Cast Screen
              </Button>
            </div>
          </div>

          {selectedDevice ? (
            <>
              {/* Selected stream view */}
              {selectedStreamDetails && (
                <div className="mb-6">
                  <MediaPlayer stream={selectedStreamDetails} onClose={() => setSelectedStream(null)} />
                </div>
              )}

              {/* Stream tabs and grid */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex justify-between items-center px-4 py-2">
                      <TabsList className="grid grid-cols-5 w-auto">
                        <TabsTrigger value="all" className="px-4">
                          All
                        </TabsTrigger>
                        <TabsTrigger value="video" className="px-4">
                          Video
                        </TabsTrigger>
                        <TabsTrigger value="audio" className="px-4">
                          Audio
                        </TabsTrigger>
                        <TabsTrigger value="image" className="px-4">
                          Images
                        </TabsTrigger>
                        <TabsTrigger value="file" className="px-4">
                          Files
                        </TabsTrigger>
                      </TabsList>

                      <div className="flex items-center">
                        <Input placeholder="Search streams..." className="w-48 h-8 text-sm" />
                      </div>
                    </div>
                  </Tabs>
                </div>

                <div className="p-4">
                  {filteredStreams.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        {activeTab === "all" ? (
                          <Cast className="h-6 w-6 text-gray-400" />
                        ) : activeTab === "video" ? (
                          <Video className="h-6 w-6 text-gray-400" />
                        ) : activeTab === "audio" ? (
                          <Music className="h-6 w-6 text-gray-400" />
                        ) : activeTab === "image" ? (
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        ) : (
                          <File className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No {activeTab === "all" ? "streams" : activeTab + " streams"} found
                      </h3>
                      <p className="text-gray-600">
                        This device doesn't have any {activeTab === "all" ? "active streams" : activeTab + " streams"}{" "}
                        at the moment
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredStreams.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} onClick={() => setSelectedStream(stream.id)} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mirror settings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Sliders className="h-5 w-5 mr-2" />
                        Mirror Settings
                      </CardTitle>
                      <CardDescription>Configure how your device streams are mirrored and displayed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Auto Refresh</div>
                              <div className="text-sm text-gray-500">
                                Automatically refresh streams every 30 seconds
                              </div>
                            </div>
                            <Switch
                              checked={mirrorSettings.autoRefresh}
                              onCheckedChange={() => toggleSetting("autoRefresh")}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">High Quality</div>
                              <div className="text-sm text-gray-500">Stream at the highest quality available</div>
                            </div>
                            <Switch
                              checked={mirrorSettings.highQuality}
                              onCheckedChange={() => toggleSetting("highQuality")}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Low Latency</div>
                              <div className="text-sm text-gray-500">Optimize for reduced delay in streaming</div>
                            </div>
                            <Switch
                              checked={mirrorSettings.lowLatency}
                              onCheckedChange={() => toggleSetting("lowLatency")}
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Secure Connection</div>
                              <div className="text-sm text-gray-500">Use encrypted connection for all streams</div>
                            </div>
                            <Switch
                              checked={mirrorSettings.secureConnection}
                              onCheckedChange={() => toggleSetting("secureConnection")}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Show Notifications</div>
                              <div className="text-sm text-gray-500">Display notifications for stream events</div>
                            </div>
                            <Switch
                              checked={mirrorSettings.showNotifications}
                              onCheckedChange={() => toggleSetting("showNotifications")}
                            />
                          </div>

                          <div className="pt-2">
                            <Button variant="outline" className="w-full">
                              Advanced Settings
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Play className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Screen Recording started</p>
                            <p className="text-xs text-gray-500">MacBook Pro • 5 minutes ago</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Download className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Webcam Feed downloaded</p>
                            <p className="text-xs text-gray-500">MacBook Pro • 15 minutes ago</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <Share2 className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Phone Camera shared</p>
                            <p className="text-xs text-gray-500">iPhone 14 Pro • 32 minutes ago</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                            <Eye className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Photo Library viewed</p>
                            <p className="text-xs text-gray-500">iPhone 14 Pro • 1 hour ago</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <EyeOff className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">System Audio muted</p>
                            <p className="text-xs text-gray-500">Windows Desktop • 2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-accent-500">
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Cast className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No device selected</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Select a device from the dropdown above to view and control its media streams
              </p>
              <Button>Connect a Device</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

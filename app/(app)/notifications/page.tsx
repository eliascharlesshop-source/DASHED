"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Bell,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  RefreshCw,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: "security",
    title: "New device logged in",
    message: "A new device was used to log in to your account from San Francisco, CA.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "system",
    title: "System maintenance completed",
    message: "The scheduled system maintenance has been completed successfully.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    title: "Unusual activity detected",
    message: "We detected unusual activity on your account. Please verify recent actions.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "Your subscription will renew soon",
    message: "Your Premium subscription will automatically renew on Jan 15, 2024.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 5,
    type: "security",
    title: "Password changed successfully",
    message: "Your account password was changed successfully.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "New feature available",
    message: "Check out our new dashboard analytics feature now available in your account.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 7,
    type: "info",
    title: "Welcome to DASHED OS",
    message: "Thank you for joining DASHED OS. Explore your new dashboard to get started.",
    time: "1 week ago",
    read: true,
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
    toast({
      title: "All notifications marked as read",
    })
  }

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    toast({
      title: "Notification deleted",
    })
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
    toast({
      title: "All notifications cleared",
    })
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-5 w-5 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "system":
        return <RefreshCw className="h-5 w-5 text-green-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-[#0077b6]" />
    }
  }

  // Get unread count
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader toggleSidebar={() => {}} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Manage your notifications and alerts</p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
              <Button variant="outline" onClick={clearAllNotifications} disabled={notifications.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear all
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all" className="relative">
                All
                {unreadCount > 0 && <Badge className="ml-2 bg-[#0077b6]">{unreadCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {filteredNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <p
                                className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notification.title}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {!notification.read && (
                                      <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        <span>Mark as read</span>
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Bell className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
                    <p className="text-gray-500">
                      You don't have any {activeTab !== "all" ? activeTab : ""} notifications at the moment
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  Monitor,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Wifi,
  HardDrive
} from "lucide-react"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Devices",
      value: "12",
      change: "+2 from last month",
      icon: Monitor,
      color: "text-blue-500"
    },
    {
      title: "Active Users",
      value: "8",
      change: "+1 from last week",
      icon: Users,
      color: "text-green-500"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.2% uptime",
      icon: Activity,
      color: "text-accent-500"
    },
    {
      title: "Data Synced",
      value: "2.4 GB",
      change: "+340 MB today",
      icon: HardDrive,
      color: "text-purple-500"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Device connected",
      device: "MacBook Pro",
      time: "2 minutes ago",
      status: "success"
    },
    {
      id: 2,
      action: "Backup completed",
      device: "iPhone 14 Pro",
      time: "15 minutes ago",
      status: "success"
    },
    {
      id: 3,
      action: "Low battery warning",
      device: "iPad Air",
      time: "1 hour ago",
      status: "warning"
    },
    {
      id: 4,
      action: "System update",
      device: "Windows Desktop",
      time: "3 hours ago",
      status: "info"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader toggleSidebar={() => {}} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Monitor your DASHED OS ecosystem performance</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                <TabsList>
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Status */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  System Performance
                </CardTitle>
                <CardDescription>
                  Real-time performance metrics across all devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <h3 className="font-medium text-green-700">Security</h3>
                    </div>
                    <p className="text-sm text-green-600">All systems secure</p>
                    <div className="mt-2">
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Wifi className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="font-medium text-blue-700">Network</h3>
                    </div>
                    <p className="text-sm text-blue-600">12 devices connected</p>
                    <div className="mt-2">
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent-50 rounded-lg p-4 border border-accent-100">
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 text-accent-500 mr-2" />
                      <h3 className="font-medium text-accent-700">Performance</h3>
                    </div>
                    <p className="text-sm text-accent-600">Optimal performance</p>
                    <div className="mt-2">
                      <div className="w-full bg-accent-200 rounded-full h-2">
                        <div className="bg-accent-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3">Resource Usage</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">CPU Usage</span>
                        <span className="font-medium">24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-accent-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Memory Usage</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Storage Usage</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest events across your devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.device}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts for managing your DASHED OS ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex-col space-y-2">
                  <Monitor className="h-6 w-6" />
                  <span>Add Device</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Users</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Shield className="h-6 w-6" />
                  <span>Security Settings</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

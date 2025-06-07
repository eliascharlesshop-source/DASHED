"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
  Camera,
  Settings,
  Shield,
  Bell,
  LogOut,
  Clock,
  CreditCard,
  Key,
  Moon,
  Sun,
  Smartphone,
  Laptop,
  Tablet,
  ComputerIcon as Desktop,
  AlertTriangle,
  CheckCircle,
  Save,
} from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    occupation: "Software Engineer",
    joinDate: "January 2023",
    bio: "Passionate about technology and building great products. I love exploring new tools and frameworks to improve my workflow.",
    avatar: "/placeholder.svg?height=200&width=200",
    devices: 6,
    lastLogin: "Today at 9:30 AM",
    subscription: "Premium",
    subscriptionRenewal: "January 15, 2024",
  }

  // Handle save profile
  const handleSaveProfile = () => {
    setIsEditing(false)

    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved",
    })
  }

  // Handle logout
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    })
  }

  // Handle save settings
  const handleSaveSettings = (settingType: string) => {
    toast({
      title: "Settings Updated",
      description: `Your ${settingType} settings have been saved`,
    })
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
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your account information and settings</p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {activeTab === "general" && (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>Cancel</>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>

                  {isEditing && (
                    <Button onClick={handleSaveProfile} className="bg-accent-500 hover:bg-accent-600 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Profile Information</h2>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <div className="flex flex-col items-center">
                          <div className="relative">
                            <img
                              src={userData.avatar || "/placeholder.svg"}
                              alt="Profile"
                              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            {isEditing && (
                              <button className="absolute bottom-0 right-0 bg-accent-500 text-white p-2 rounded-full shadow-lg">
                                <Camera className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          <div className="mt-4 text-center">
                            <Badge variant="outline" className="bg-accent-50 text-accent-700 border-accent-200">
                              {userData.subscription}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">Renews on {userData.subscriptionRenewal}</p>
                          </div>
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1">
                          {isEditing ? (
                            <div className="space-y-4">
                              <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                  Full Name
                                </label>
                                <Input id="name" defaultValue={userData.name} />
                              </div>

                              <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                  Email
                                </label>
                                <Input id="email" type="email" defaultValue={userData.email} />
                              </div>

                              <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                  Phone
                                </label>
                                <Input id="phone" defaultValue={userData.phone} />
                              </div>

                              <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                  Location
                                </label>
                                <Input id="location" defaultValue={userData.location} />
                              </div>

                              <div>
                                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                                  Occupation
                                </label>
                                <Input id="occupation" defaultValue={userData.occupation} />
                              </div>

                              <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                  Bio
                                </label>
                                <Textarea id="bio" defaultValue={userData.bio} rows={4} />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-4">{userData.name}</h3>

                              <div className="space-y-3">
                                <div className="flex items-center">
                                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                  <span className="text-gray-600">{userData.email}</span>
                                </div>

                                <div className="flex items-center">
                                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                  <span className="text-gray-600">{userData.phone}</span>
                                </div>

                                <div className="flex items-center">
                                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                  <span className="text-gray-600">{userData.location}</span>
                                </div>

                                <div className="flex items-center">
                                  <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                                  <span className="text-gray-600">{userData.occupation}</span>
                                </div>

                                <div className="flex items-center">
                                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                  <span className="text-gray-600">Member since {userData.joinDate}</span>
                                </div>
                              </div>

                              <div className="mt-6">
                                <h4 className="font-medium text-gray-900 mb-2">About</h4>
                                <p className="text-gray-600">{userData.bio}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Activity */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Account Activity</h2>
                    </div>

                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                              <Clock className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Last Login</h3>
                              <p className="text-sm text-gray-600">{userData.lastLogin}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                              <User className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Connected Devices</h3>
                              <p className="text-sm text-gray-600">
                                {userData.devices} devices connected to your account
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                              <CreditCard className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Subscription</h3>
                              <p className="text-sm text-gray-600">
                                {userData.subscription} plan - Renews on {userData.subscriptionRenewal}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Quick Settings</h2>
                    </div>

                    <div className="p-4">
                      <div className="space-y-4">
                        <Button className="w-full justify-start bg-accent-500 hover:bg-accent-600 text-white">
                          <Settings className="mr-2 h-4 w-4" />
                          General Settings
                        </Button>

                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="mr-2 h-4 w-4" />
                          Security Settings
                        </Button>

                        <Button variant="outline" className="w-full justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          Notification Preferences
                        </Button>

                        <Button variant="outline" className="w-full justify-start">
                          <Key className="mr-2 h-4 w-4" />
                          Privacy Settings
                        </Button>

                        <Button variant="outline" className="w-full justify-start">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Billing & Subscription
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Account Actions</h2>
                    </div>

                    <div className="p-4">
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log Out
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
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          Switch Account
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
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
                            <path d="M3 6h18" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Help & Support */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Help & Support</h2>
                    </div>

                    <div className="p-4">
                      <div className="space-y-4">
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
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                          Help Center
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
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          Contact Support
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
                          Documentation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Password Settings */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Password & Authentication</h2>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button className="bg-accent-500 hover:bg-accent-600 text-white">Update Password</Button>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 mb-1">Add an extra layer of security to your account</p>
                            <p className="text-sm text-gray-500">
                              Status: <span className="text-green-500 font-medium">Enabled</span>
                            </p>
                          </div>
                          <Switch id="2fa" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Login Sessions */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Active Sessions</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                              <Laptop className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">MacBook Pro - Chrome</h3>
                              <p className="text-sm text-gray-600">San Francisco, CA • Current Session</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" disabled>
                            Current
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                              <Smartphone className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">iPhone 13 - Safari</h3>
                              <p className="text-sm text-gray-600">New York, NY • 2 days ago</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            Revoke
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                              <Tablet className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">iPad Pro - Safari</h3>
                              <p className="text-sm text-gray-600">Chicago, IL • 5 days ago</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Security Recommendations */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Security Recommendations</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-gray-900">Two-factor authentication is enabled</h3>
                            <p className="text-sm text-gray-600">
                              Your account is protected with an extra layer of security
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-gray-900">Password last changed 6 months ago</h3>
                            <p className="text-sm text-gray-600">We recommend changing your password every 3 months</p>
                            <Button size="sm" className="mt-2 bg-accent-500 hover:bg-accent-600 text-white">
                              Change Password
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-gray-900">Multiple active sessions detected</h3>
                            <p className="text-sm text-gray-600">You have 3 active sessions across different devices</p>
                            <Button size="sm" className="mt-2 bg-red-500 hover:bg-red-600 text-white">
                              Review Sessions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Security Settings</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Login Notifications</p>
                            <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                          </div>
                          <Switch id="login-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Suspicious Activity Alerts</p>
                            <p className="text-sm text-gray-500">
                              Get alerts about suspicious activity on your account
                            </p>
                          </div>
                          <Switch id="suspicious-activity" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Require Email Confirmation</p>
                            <p className="text-sm text-gray-500">Require email confirmation for password changes</p>
                          </div>
                          <Switch id="email-confirmation" defaultChecked />
                        </div>
                      </div>
                      <Button
                        className="w-full mt-4 bg-accent-500 hover:bg-accent-600 text-white"
                        onClick={() => handleSaveSettings("security")}
                      >
                        Save Security Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Theme Settings */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Theme Settings</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Color Theme</h3>
                          <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                            <div>
                              <RadioGroupItem value="light" id="light" className="sr-only" />
                              <Label
                                htmlFor="light"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <Sun className="h-6 w-6 mb-2 text-yellow-500" />
                                <span className="text-sm font-medium">Light</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="dark" id="dark" className="sr-only" />
                              <Label
                                htmlFor="dark"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <Moon className="h-6 w-6 mb-2 text-blue-700" />
                                <span className="text-sm font-medium">Dark</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="system" id="system" className="sr-only" />
                              <Label
                                htmlFor="system"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <div className="flex">
                                  <Sun className="h-6 w-6 text-yellow-500" />
                                  <Moon className="h-6 w-6 text-blue-700 -ml-1" />
                                </div>
                                <span className="text-sm font-medium mt-2">System</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Accent Color</h3>
                          <RadioGroup defaultValue="accent" className="grid grid-cols-6 gap-4">
                            <div>
                              <RadioGroupItem value="accent" id="accent" className="sr-only" />
                              <Label
                                htmlFor="accent"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <div className="w-8 h-8 rounded-full bg-accent-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="blue" id="blue" className="sr-only" />
                              <Label
                                htmlFor="blue"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="green" id="green" className="sr-only" />
                              <Label
                                htmlFor="green"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <div className="w-8 h-8 rounded-full bg-green-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="purple" id="purple" className="sr-only" />
                              <Label
                                htmlFor="purple"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="orange" id="orange" className="sr-only" />
                              <Label
                                htmlFor="orange"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="red" id="red" className="sr-only" />
                              <Label
                                htmlFor="red"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-accent-500"
                              >
                                <div className="w-8 h-8 rounded-full bg-red-500"></div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interface Settings */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Interface Settings</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Compact Mode</p>
                            <p className="text-sm text-gray-500">Reduce spacing and padding in the interface</p>
                          </div>
                          <Switch id="compact-mode" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Animations</p>
                            <p className="text-sm text-gray-500">Enable animations throughout the interface</p>
                          </div>
                          <Switch id="animations" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Sidebar Collapsed by Default</p>
                            <p className="text-sm text-gray-500">Start with the sidebar in collapsed state</p>
                          </div>
                          <Switch id="sidebar-collapsed" />
                        </div>

                        <div className="pt-4">
                          <label htmlFor="font-size" className="block text-sm font-medium text-gray-700 mb-1">
                            Font Size
                          </label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-6 bg-accent-500 hover:bg-accent-600 text-white"
                        onClick={() => handleSaveSettings("appearance")}
                      >
                        Save Appearance Settings
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Preview */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Theme Preview</h2>
                    </div>
                    <div className="p-4">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-accent-500 p-3 text-white text-sm font-medium">Header</div>
                        <div className="flex">
                          <div className="w-1/4 bg-gray-50 p-3 border-r border-gray-200 text-sm">Sidebar</div>
                          <div className="w-3/4 p-3 text-sm">
                            <div className="mb-3 font-medium">Main Content</div>
                            <div className="h-20 bg-gray-100 rounded-md mb-3"></div>
                            <div className="flex gap-2">
                              <div className="h-8 w-20 bg-accent-500 rounded-md text-white flex items-center justify-center text-xs">
                                Button
                              </div>
                              <div className="h-8 w-20 border border-gray-300 rounded-md flex items-center justify-center text-xs">
                                Button
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">This is a preview of your selected theme</p>
                    </div>
                  </div>

                  {/* Accessibility */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Accessibility</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">High Contrast</p>
                            <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                          </div>
                          <Switch id="high-contrast" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Reduce Motion</p>
                            <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                          </div>
                          <Switch id="reduce-motion" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Screen Reader Optimized</p>
                            <p className="text-sm text-gray-500">Enhance compatibility with screen readers</p>
                          </div>
                          <Switch id="screen-reader" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Email Notifications */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Email Notifications</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Security Alerts</p>
                            <p className="text-sm text-gray-500">Get notified about security-related events</p>
                          </div>
                          <Switch id="security-email" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Account Updates</p>
                            <p className="text-sm text-gray-500">Receive emails about account changes</p>
                          </div>
                          <Switch id="account-email" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">New Device Connections</p>
                            <p className="text-sm text-gray-500">
                              Get notified when a new device connects to your account
                            </p>
                          </div>
                          <Switch id="device-email" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Product Updates</p>
                            <p className="text-sm text-gray-500">Receive emails about new features and updates</p>
                          </div>
                          <Switch id="product-email" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Newsletter</p>
                            <p className="text-sm text-gray-500">Receive our monthly newsletter</p>
                          </div>
                          <Switch id="newsletter-email" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Push Notifications</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Enable Push Notifications</p>
                            <p className="text-sm text-gray-500">Allow notifications to be sent to your device</p>
                          </div>
                          <Switch id="enable-push" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Security Alerts</p>
                            <p className="text-sm text-gray-500">Get notified about security-related events</p>
                          </div>
                          <Switch id="security-push" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Device Status Updates</p>
                            <p className="text-sm text-gray-500">Get notified about changes in your device status</p>
                          </div>
                          <Switch id="device-push" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Performance Alerts</p>
                            <p className="text-sm text-gray-500">Get notified about performance issues</p>
                          </div>
                          <Switch id="performance-push" defaultChecked />
                        </div>
                      </div>
                      <Button
                        className="w-full mt-6 bg-accent-500 hover:bg-accent-600 text-white"
                        onClick={() => handleSaveSettings("notifications")}
                      >
                        Save Notification Settings
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Notification Schedule */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Notification Schedule</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="quiet-hours-start" className="block text-sm font-medium text-gray-700 mb-1">
                            Quiet Hours Start
                          </label>
                          <Select defaultValue="22:00">
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                              <SelectItem value="21:00">9:00 PM</SelectItem>
                              <SelectItem value="22:00">10:00 PM</SelectItem>
                              <SelectItem value="23:00">11:00 PM</SelectItem>
                              <SelectItem value="00:00">12:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="quiet-hours-end" className="block text-sm font-medium text-gray-700 mb-1">
                            Quiet Hours End
                          </label>
                          <Select defaultValue="07:00">
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="05:00">5:00 AM</SelectItem>
                              <SelectItem value="06:00">6:00 AM</SelectItem>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <p className="font-medium text-gray-900">Enable Quiet Hours</p>
                            <p className="text-sm text-gray-500">Mute notifications during specified hours</p>
                          </div>
                          <Switch id="enable-quiet-hours" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Do Not Disturb */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Do Not Disturb</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Enable Do Not Disturb</p>
                            <p className="text-sm text-gray-500">Temporarily mute all notifications</p>
                          </div>
                          <Switch id="enable-dnd" />
                        </div>

                        <div>
                          <label htmlFor="dnd-duration" className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <Select defaultValue="1h">
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30m">30 minutes</SelectItem>
                              <SelectItem value="1h">1 hour</SelectItem>
                              <SelectItem value="3h">3 hours</SelectItem>
                              <SelectItem value="8h">8 hours</SelectItem>
                              <SelectItem value="24h">24 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <p className="font-medium text-gray-900">Allow Priority Notifications</p>
                            <p className="text-sm text-gray-500">Allow critical security alerts even during DND</p>
                          </div>
                          <Switch id="priority-notifications" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="devices">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Connected Devices */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Connected Devices</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                              <Laptop className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">MacBook Pro</h3>
                              <p className="text-sm text-gray-600">Last active: 2 minutes ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-700 border-green-200">Current</Badge>
                            <Button variant="outline" size="sm">
                              Settings
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                              <Smartphone className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">iPhone 13</h3>
                              <p className="text-sm text-gray-600">Last active: 1 hour ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Settings
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                              <Tablet className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">iPad Pro</h3>
                              <p className="text-sm text-gray-600">Last active: 3 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Settings
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                              <Desktop className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Home Desktop</h3>
                              <p className="text-sm text-gray-600">Last active: 1 week ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Settings
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Device Permissions */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Device Permissions</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Allow Remote Access</p>
                            <p className="text-sm text-gray-500">Allow devices to be accessed remotely</p>
                          </div>
                          <Switch id="remote-access" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Auto-Lock Inactive Devices</p>
                            <p className="text-sm text-gray-500">
                              Automatically lock devices after period of inactivity
                            </p>
                          </div>
                          <Switch id="auto-lock" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Sync Settings Across Devices</p>
                            <p className="text-sm text-gray-500">Keep settings synchronized between all devices</p>
                          </div>
                          <Switch id="sync-settings" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Allow File Sharing Between Devices</p>
                            <p className="text-sm text-gray-500">Enable direct file transfers between your devices</p>
                          </div>
                          <Switch id="file-sharing" defaultChecked />
                        </div>
                      </div>
                      <Button
                        className="w-full mt-6 bg-accent-500 hover:bg-accent-600 text-white"
                        onClick={() => handleSaveSettings("device")}
                      >
                        Save Device Settings
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Add New Device */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Add New Device</h2>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-4">
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
                            className="text-accent-500"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Connect a New Device</h3>
                        <p className="text-sm text-gray-500 text-center mb-4">
                          Scan the QR code with your new device or enter the code manually
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                          <div className="w-40 h-40 bg-white flex items-center justify-center">
                            <svg
                              width="120"
                              height="120"
                              viewBox="0 0 120 120"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="120" height="120" fill="white" />
                              <rect x="20" y="20" width="20" height="20" fill="black" />
                              <rect x="40" y="20" width="20" height="20" fill="black" />
                              <rect x="60" y="20" width="20" height="20" fill="black" />
                              <rect x="20" y="40" width="20" height="20" fill="black" />
                              <rect x="60" y="40" width="20" height="20" fill="black" />
                              <rect x="80" y="40" width="20" height="20" fill="black" />
                              <rect x="20" y="60" width="20" height="20" fill="black" />
                              <rect x="40" y="60" width="20" height="20" fill="black" />
                              <rect x="80" y="60" width="20" height="20" fill="black" />
                              <rect x="20" y="80" width="20" height="20" fill="black" />
                              <rect x="60" y="80" width="20" height="20" fill="black" />
                              <rect x="80" y="80" width="20" height="20" fill="black" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Or enter code manually:</p>
                        <p className="text-lg font-mono font-bold tracking-wider mb-4">DASHED-4X7Y-9Z2W</p>
                        <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white">
                          Generate New Code
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Device Limits */}
                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Device Limits</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-700">Device Usage (4 of 6)</p>
                            <p className="text-xs text-gray-500">Premium Plan</p>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-accent-500 h-full rounded-full" style={{ width: "66.7%" }}></div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <p className="text-sm text-gray-600 mb-4">
                            Your Premium plan allows up to 6 connected devices. Upgrade to increase this limit.
                          </p>
                          <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white">Upgrade Plan</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

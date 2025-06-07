"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Moon, Sun, Shield, Bell, Key, CreditCard, Save, Smartphone, Laptop } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

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
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
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
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Account Information</h2>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <Input id="name" defaultValue="John Doe" />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input id="email" type="email" defaultValue="john@example.com" />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <Input id="phone" defaultValue="+1 (555) 123-4567" />
                        </div>

                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <Input id="location" defaultValue="San Francisco, CA" />
                        </div>
                      </div>
                      <Button
                        className="bg-[#0077b6] hover:bg-[#0069a3] text-white"
                        onClick={() => handleSaveSettings("account")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Account Information
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Preferences</h2>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
                          </div>
                          <Switch id="push-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Marketing Communications</p>
                            <p className="text-sm text-gray-500">Receive marketing emails and newsletters</p>
                          </div>
                          <Switch id="marketing-communications" />
                        </div>

                        <div>
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                            Language
                          </label>
                          <Select defaultValue="en">
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="ja">Japanese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                            Timezone
                          </label>
                          <Select defaultValue="pst">
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                              <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                              <SelectItem value="cst">Central Time (CST)</SelectItem>
                              <SelectItem value="est">Eastern Time (EST)</SelectItem>
                              <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        className="bg-[#0077b6] hover:bg-[#0069a3] text-white"
                        onClick={() => handleSaveSettings("preferences")}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Quick Settings</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <Button className="w-full justify-start bg-[#0077b6] hover:bg-[#0069a3] text-white">
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

                  <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Theme</h2>
                    </div>
                    <div className="p-4">
                      <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="light" id="light" className="sr-only" />
                          <Label
                            htmlFor="light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                          >
                            <Sun className="h-6 w-6 mb-2 text-yellow-500" />
                            <span className="text-sm font-medium">Light</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="dark" id="dark" className="sr-only" />
                          <Label
                            htmlFor="dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                          >
                            <Moon className="h-6 w-6 mb-2 text-blue-700" />
                            <span className="text-sm font-medium">Dark</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="system" id="system" className="sr-only" />
                          <Label
                            htmlFor="system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                          >
                            <div className="flex">
                              <Sun className="h-6 w-6 text-yellow-500" />
                              <Moon className="h-6 w-6 text-blue-700 -ml-1" />
                            </div>
                            <span className="text-sm font-medium mt-2">System</span>
                          </Label>
                        </div>
                      </RadioGroup>
                      <Button
                        className="w-full mt-4 bg-[#0077b6] hover:bg-[#0069a3] text-white"
                        onClick={() => handleSaveSettings("theme")}
                      >
                        Save Theme
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
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
                          <Button className="bg-[#0077b6] hover:bg-[#0069a3] text-white">Update Password</Button>
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
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                        className="w-full mt-4 bg-[#0077b6] hover:bg-[#0069a3] text-white"
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
                              <RadioGroupItem value="light" id="light-theme" className="sr-only" />
                              <Label
                                htmlFor="light-theme"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <Sun className="h-6 w-6 mb-2 text-yellow-500" />
                                <span className="text-sm font-medium">Light</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="dark" id="dark-theme" className="sr-only" />
                              <Label
                                htmlFor="dark-theme"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <Moon className="h-6 w-6 mb-2 text-blue-700" />
                                <span className="text-sm font-medium">Dark</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="system" id="system-theme" className="sr-only" />
                              <Label
                                htmlFor="system-theme"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
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
                          <RadioGroup defaultValue="blue" className="grid grid-cols-6 gap-4">
                            <div>
                              <RadioGroupItem value="blue" id="blue" className="sr-only" />
                              <Label
                                htmlFor="blue"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <div className="w-8 h-8 rounded-full bg-[#0077b6]"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="green" id="green" className="sr-only" />
                              <Label
                                htmlFor="green"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <div className="w-8 h-8 rounded-full bg-green-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="purple" id="purple" className="sr-only" />
                              <Label
                                htmlFor="purple"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="orange" id="orange" className="sr-only" />
                              <Label
                                htmlFor="orange"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="red" id="red" className="sr-only" />
                              <Label
                                htmlFor="red"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <div className="w-8 h-8 rounded-full bg-red-500"></div>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="gray" id="gray" className="sr-only" />
                              <Label
                                htmlFor="gray"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:bg-gray-50 cursor-pointer [&:has([data-state=checked])]:border-[#0077b6]"
                              >
                                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-6 bg-[#0077b6] hover:bg-[#0069a3] text-white"
                        onClick={() => handleSaveSettings("appearance")}
                      >
                        Save Appearance Settings
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Interface Settings</h2>
                    </div>
                    <div className="p-4">
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
                    </div>
                  </div>

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
                      <Button
                        className="w-full mt-4 bg-[#0077b6] hover:bg-[#0069a3] text-white"
                        onClick={() => handleSaveSettings("accessibility")}
                      >
                        Save Accessibility Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
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
                        className="w-full mt-6 bg-[#0077b6] hover:bg-[#0069a3] text-white"
                        onClick={() => handleSaveSettings("notifications")}
                      >
                        Save Notification Settings
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="devices">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
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
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">Device Settings</h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
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
                        className="w-full mt-4 bg-[#0077b6] hover:bg-[#0069a3] text-white"
                        onClick={() => handleSaveSettings("device")}
                      >
                        Save Device Settings
                      </Button>
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

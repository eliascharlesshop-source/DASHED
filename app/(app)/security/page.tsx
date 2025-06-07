"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Shield, Lock, AlertTriangle, Check, Eye, EyeOff, RefreshCw, Key, Fingerprint, Smartphone } from "lucide-react"

export default function SecurityPage() {
  const { toast } = useToast()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true)
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false)

  // Mock security threats
  const securityThreats = [
    {
      id: "threat-1",
      device: "MacBook Pro",
      type: "Login Attempt",
      location: "Moscow, Russia",
      time: "2 days ago",
      status: "blocked",
    },
    {
      id: "threat-2",
      device: "iPhone 14 Pro",
      type: "Unusual Activity",
      location: "Your location",
      time: "1 week ago",
      status: "resolved",
    },
  ]

  // Mock security logs
  const securityLogs = [
    {
      id: "log-1",
      event: "Password Changed",
      device: "MacBook Pro",
      ip: "192.168.1.5",
      location: "Home Office",
      time: "2 days ago",
    },
    {
      id: "log-2",
      event: "Login Successful",
      device: "iPhone 14 Pro",
      ip: "192.168.1.6",
      location: "Home",
      time: "3 days ago",
    },
    {
      id: "log-3",
      event: "Two-Factor Authentication Enabled",
      device: "MacBook Pro",
      ip: "192.168.1.5",
      location: "Home Office",
      time: "1 week ago",
    },
    {
      id: "log-4",
      event: "Login Successful",
      device: "Windows Desktop",
      ip: "192.168.1.8",
      location: "Home Office",
      time: "1 week ago",
    },
    {
      id: "log-5",
      event: "Device Added",
      device: "iPad Air",
      ip: "192.168.1.7",
      location: "Living Room",
      time: "2 weeks ago",
    },
  ]

  const handleSecurityScan = () => {
    setIsScanning(true)

    // Simulate scan delay
    setTimeout(() => {
      setIsScanning(false)
      toast({
        title: "Security Scan Complete",
        description: "No threats detected. Your system is secure.",
      })
    }, 2000)
  }

  const toggleTwoFactor = () => {
    setIsTwoFactorEnabled(!isTwoFactorEnabled)
    toast({
      title: `Two-Factor Authentication ${isTwoFactorEnabled ? "Disabled" : "Enabled"}`,
      description: isTwoFactorEnabled
        ? "Your account is now less secure. We recommend enabling 2FA."
        : "Your account is now more secure.",
      variant: isTwoFactorEnabled ? "destructive" : "default",
    })
  }

  const toggleBiometric = () => {
    setIsBiometricEnabled(!isBiometricEnabled)
    toast({
      title: `Biometric Authentication ${isBiometricEnabled ? "Disabled" : "Enabled"}`,
      description: `Biometric authentication has been ${isBiometricEnabled ? "disabled" : "enabled"} for your account.`,
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
              <h1 className="text-2xl font-bold text-gray-900">Security</h1>
              <p className="text-gray-600">Manage your account security and privacy settings</p>
            </div>

            <Button
              onClick={handleSecurityScan}
              disabled={isScanning}
              className="mt-4 md:mt-0 bg-accent-500 hover:bg-accent-600 text-white"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Run Security Scan
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Security Status */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Security Status</h2>
                </div>

                <div className="p-4">
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Your account is secure</h3>
                      <p className="text-sm text-green-600">All security checks have passed</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center mb-2">
                        <Lock className="h-5 w-5 text-accent-500 mr-2" />
                        <h3 className="font-medium text-gray-700">Password</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Last changed 30 days ago</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Strong
                      </Badge>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center mb-2">
                        <Smartphone className="h-5 w-5 text-accent-500 mr-2" />
                        <h3 className="font-medium text-gray-700">Two-Factor</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Authentication app</p>
                      <Badge
                        variant="outline"
                        className={
                          isTwoFactorEnabled
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {isTwoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center mb-2">
                        <Fingerprint className="h-5 w-5 text-accent-500 mr-2" />
                        <h3 className="font-medium text-gray-700">Biometric</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Fingerprint & Face ID</p>
                      <Badge
                        variant="outline"
                        className={
                          isBiometricEnabled
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {isBiometricEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>

                  {/* Security Threats */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Recent Security Alerts</h3>
                    {securityThreats.length > 0 ? (
                      <div className="space-y-3">
                        {securityThreats.map((threat) => (
                          <div
                            key={threat.id}
                            className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="mr-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  threat.status === "blocked" ? "bg-red-100" : "bg-yellow-100"
                                }`}
                              >
                                <AlertTriangle
                                  className={`h-4 w-4 ${
                                    threat.status === "blocked" ? "text-red-500" : "text-yellow-500"
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900">{threat.type}</h4>
                                <span className="text-xs text-gray-500">{threat.time}</span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {threat.device} • {threat.location}
                              </p>
                              <div className="mt-1">
                                <Badge
                                  variant="outline"
                                  className={`${
                                    threat.status === "blocked"
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : "bg-green-50 text-green-700 border-green-200"
                                  }`}
                                >
                                  {threat.status === "blocked" ? "Blocked" : "Resolved"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                          <Check className="h-6 w-6 text-green-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No security threats</h3>
                        <p className="text-gray-600">Your account and devices are secure</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Logs */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Security Activity Log</h2>
                  <Button variant="outline" size="sm">
                    Export Logs
                  </Button>
                </div>

                <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                  {securityLogs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="mr-3">
                          <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                            {log.event.includes("Login") ? (
                              <Key className="h-4 w-4 text-accent-500" />
                            ) : log.event.includes("Password") ? (
                              <Lock className="h-4 w-4 text-accent-500" />
                            ) : log.event.includes("Two-Factor") ? (
                              <Smartphone className="h-4 w-4 text-accent-500" />
                            ) : (
                              <Shield className="h-4 w-4 text-accent-500" />
                            )}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-900">{log.event}</h4>
                            <span className="text-xs text-gray-500">{log.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {log.device} • {log.ip} • {log.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <Button variant="link" className="w-full text-accent-500">
                    View Full Activity Log
                  </Button>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Security Settings</h2>
                </div>

                <div className="p-4">
                  {/* Password Section */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <Input id="new-password" type="password" placeholder="••••••••" />
                      </div>

                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <Input id="confirm-password" type="password" placeholder="••••••••" />
                      </div>

                      <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white">Update Password</Button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isTwoFactorEnabled}
                            onChange={toggleTwoFactor}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                        </label>
                      </div>
                    </div>

                    {isTwoFactorEnabled && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Two-factor authentication is currently enabled using the authentication app.
                        </p>
                        <Button variant="outline" size="sm">
                          Reconfigure
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Biometric Authentication */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">Biometric Authentication</h3>
                        <p className="text-sm text-gray-600">Use fingerprint or face recognition to log in</p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isBiometricEnabled}
                            onChange={toggleBiometric}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                        </label>
                      </div>
                    </div>

                    {isBiometricEnabled && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Biometric authentication is enabled for compatible devices.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Manage Devices
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Security Notifications */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">Security Notifications</h3>
                        <p className="text-sm text-gray-600">Get alerts about suspicious activity</p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="notify-login"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                          defaultChecked
                        />
                        <label htmlFor="notify-login" className="ml-2 block text-sm text-gray-700">
                          New login from unknown device
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="notify-password"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                          defaultChecked
                        />
                        <label htmlFor="notify-password" className="ml-2 block text-sm text-gray-700">
                          Password changes
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="notify-security"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                          defaultChecked
                        />
                        <label htmlFor="notify-security" className="ml-2 block text-sm text-gray-700">
                          Security setting changes
                        </label>
                      </div>
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

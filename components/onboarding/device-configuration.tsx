"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface DeviceConfigurationProps {
  isConfigured: boolean
  onConfigured: () => void
}

export function DeviceConfiguration({ isConfigured, onConfigured }: DeviceConfigurationProps) {
  const [step, setStep] = useState<"download" | "mfa" | "success">("download")
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleDownload = () => {
    setIsLoading(true)
    // Simulate download
    setTimeout(() => {
      setIsLoading(false)
      setStep("mfa")
    }, 1500)
  }

  const handleVerify = () => {
    setIsLoading(true)
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
      onConfigured()
    }, 1500)
  }

  return (
    <div className="h-[400px] overflow-y-auto pr-2">
      {step === "download" && (
        <div className="space-y-4">
          <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <Icons.download className="h-10 w-10 text-accent-500" />
              <div>
                <h3 className="text-lg font-semibold">Download DASHED OS</h3>
                <p className="text-sm text-gray-600">Download the DASHED OS installer to configure your devices</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleDownload}
                disabled={isLoading}
                className="w-full bg-accent-500 hover:bg-accent-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Icons.download className="mr-2 h-4 w-4" />
                    Download DASHED OS
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>System Requirements:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Windows 10/11, macOS 11+, or Linux</li>
              <li>4GB RAM minimum (8GB recommended)</li>
              <li>1GB free disk space</li>
              <li>Internet connection for setup and updates</li>
            </ul>
          </div>
        </div>
      )}

      {step === "mfa" && (
        <div className="space-y-4">
          <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <Icons.shield className="h-10 w-10 text-accent-500" />
              <div>
                <h3 className="text-lg font-semibold">Multi-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Enter the verification code sent to your device</p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button
                onClick={handleVerify}
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full bg-accent-500 hover:bg-accent-400 text-white"
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              For your security, we use multi-factor authentication to protect your DASHED OS installation. The
              verification code expires in 10 minutes.
            </p>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="space-y-4">
          <div className="glass-effect p-6 rounded-lg">
            <div className="flex items-center space-x-4">
              <Icons.check className="h-10 w-10 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Configuration Complete</h3>
                <p className="text-sm text-gray-600">Your DASHED OS has been successfully configured</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">
                Your devices are now ready to be managed through DASHED OS. Continue to the next step to customize your
                dashboard.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { Icons } from "@/components/icons"
import { ConfettiEffect } from "@/components/confetti-effect"
import { useState, useEffect } from "react"

interface OnboardingCompleteProps {
  template: string
  layout: string
  onComplete: () => void
}

export function OnboardingComplete({ template, layout, onComplete }: OnboardingCompleteProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  const getTemplateName = () => {
    switch (template) {
      case "home":
        return "Home Management"
      case "yard":
        return "Yard Management"
      case "office":
        return "Home Office Management"
      case "hobby":
        return "Hobby Management"
      default:
        return "Custom"
    }
  }

  const getLayoutName = () => {
    switch (layout) {
      case "tabular":
        return "Tabular View"
      case "kanban":
        return "Kanban View"
      case "map":
        return "Map View"
      default:
        return "Custom View"
    }
  }

  return (
    <div className="h-[400px] overflow-y-auto pr-2">
      <ConfettiEffect trigger={showConfetti} />
      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mb-4">
          <Icons.check className="h-10 w-10 text-accent-500" />
        </div>
        <h3 className="text-xl font-bold text-center">Your DASHED OS is Ready!</h3>
        <p className="text-center text-gray-600 mt-2">You've successfully set up your personalized DASHED experience</p>
      </div>

      <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg">
        <h4 className="font-semibold mb-4">Your Configuration Summary</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Template</span>
            <span className="font-medium">{getTemplateName()}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Dashboard Layout</span>
            <span className="font-medium">{getLayoutName()}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Device Configuration</span>
            <span className="font-medium text-green-500">Complete</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Account Status</span>
            <span className="font-medium text-green-500">Active</span>
          </div>
        </div>
      </div>

      <div className="bg-accent-50 p-4 rounded-lg border border-accent-100 mt-6">
        <p className="text-sm">
          <span className="font-semibold">Next Steps:</span> Log in to your DASHED dashboard to start managing your
          devices, customize your widgets, and explore the full capabilities of your personal operating system.
        </p>
      </div>
    </div>
  )
}

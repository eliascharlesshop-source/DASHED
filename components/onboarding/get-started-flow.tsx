"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DashboardPreference } from "./dashboard-preference"
import { DeviceConfiguration } from "./device-configuration"
import { TemplateSelection } from "./template-selection"
import { OnboardingComplete } from "./onboarding-complete"

interface GetStartedFlowProps {
  isOpen: boolean
  onClose: () => void
}

export function GetStartedFlow({ isOpen, onClose }: GetStartedFlowProps) {
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState({
    dashboardType: "",
    template: "",
    devices: [],
  })

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleComplete = () => {
    // Here you would typically save the user's preferences
    console.log("Onboarding complete with preferences:", preferences)
    onClose()
    // Reset for next time
    setStep(1)
  }

  const updatePreferences = (newPrefs: Partial<typeof preferences>) => {
    setPreferences({ ...preferences, ...newPrefs })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {step === 1 && "Choose Your Dashboard"}
            {step === 2 && "Select a Template"}
            {step === 3 && "Configure Your Devices"}
            {step === 4 && "You're All Set!"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {step === 1 && (
            <DashboardPreference
              onSelect={(dashboardType) => updatePreferences({ dashboardType })}
              selected={preferences.dashboardType}
            />
          )}
          {step === 2 && (
            <TemplateSelection
              onSelect={(template) => updatePreferences({ template })}
              selected={preferences.template}
            />
          )}
          {step === 3 && (
            <DeviceConfiguration
              onSelect={(devices) => updatePreferences({ devices })}
              selected={preferences.devices}
            />
          )}
          {step === 4 && <OnboardingComplete preferences={preferences} />}

          <div className="flex justify-between mt-8">
            {step > 1 && step < 4 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step === 1 && <div />}

            {step < 4 ? (
              <Button onClick={handleNext}>Continue</Button>
            ) : (
              <Button onClick={handleComplete}>Get Started</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

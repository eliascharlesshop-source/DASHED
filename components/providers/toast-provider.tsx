"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { ToastContainer } from "@/components/toast-container"
import { useToast } from "@/hooks/use-toast"

type ToastContextType = ReturnType<typeof useToast>

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastMethods = useToast()

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}

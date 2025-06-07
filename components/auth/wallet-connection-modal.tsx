"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToastContext } from "@/components/providers/toast-provider"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  walletType: string
}

export function WalletConnectionModal({ isOpen, onClose, onSuccess, walletType }: WalletConnectionModalProps) {
  const { toast } = useToastContext()
  const [connectionStep, setConnectionStep] = useState<"connecting" | "approving" | "connected">("connecting")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Simulate connection process
      const connectingTimeout = setTimeout(() => {
        setConnectionStep("approving")
      }, 2000)

      return () => clearTimeout(connectingTimeout)
    }
  }, [isOpen])

  const handleApprove = () => {
    setConnectionStep("connected")

    // Simulate successful connection
    setTimeout(() => {
      onSuccess()
      onClose()
      toast({
        title: "Wallet connected successfully",
        description: `Your ${walletType} wallet has been connected to DASHED.`,
        type: "success",
        duration: 3000,
      })
    }, 1000)
  }

  const handleReject = () => {
    setError("Connection rejected by user")

    setTimeout(() => {
      onClose()
      toast({
        title: "Connection cancelled",
        description: "You cancelled the wallet connection.",
        type: "error",
        duration: 3000,
      })
    }, 1000)
  }

  const getWalletIcon = () => {
    switch (walletType) {
      case "Phantom":
        return <Icons.phantom className="h-12 w-12" />
      case "Solflare":
        return <Icons.solflare className="h-12 w-12" />
      case "MetaMask":
        return <Icons.metamask className="h-12 w-12" />
      default:
        return <Icons.wallet className="h-12 w-12" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-white shadow-md">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center">
            {getWalletIcon()}
            <DialogTitle className="mt-4 text-xl font-bold text-accent-700">
              {connectionStep === "connecting" && `Connecting to ${walletType}`}
              {connectionStep === "approving" && `Approve Connection`}
              {connectionStep === "connected" && `Connected to ${walletType}`}
            </DialogTitle>
          </div>
          <DialogDescription className="text-center">
            {connectionStep === "connecting" && "Please wait while we connect to your wallet..."}
            {connectionStep === "approving" && `Please approve the connection request in your ${walletType} wallet`}
            {connectionStep === "connected" && "Your wallet has been successfully connected!"}
            {error && <span className="text-red-500">{error}</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center space-y-4">
          {connectionStep === "connecting" && (
            <div className="flex items-center justify-center p-4">
              <Icons.spinner className="h-8 w-8 animate-spin text-accent-500" />
            </div>
          )}

          {connectionStep === "approving" && (
            <div className="flex flex-col space-y-4 w-full">
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="text-sm text-gray-700">DASHED is requesting to:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                  <li>View your wallet address</li>
                  <li>Request approval for transactions</li>
                </ul>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={handleReject}>
                  Reject
                </Button>
                <Button className="flex-1 bg-accent-500 hover:bg-accent-600" onClick={handleApprove}>
                  Approve
                </Button>
              </div>
            </div>
          )}

          {connectionStep === "connected" && (
            <div className="flex items-center justify-center p-4">
              <Icons.check className="h-8 w-8 text-green-500" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

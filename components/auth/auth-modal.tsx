"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "../icons"
import { useToastContext } from "@/components/providers/toast-provider"
import { Checkbox } from "@/components/ui/checkbox"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  mode?: "signin" | "signup"
}

export function AuthModal({ isOpen, onClose, onSuccess, mode = "signin" }: AuthModalProps) {
  const { toast } = useToastContext()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">(mode)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess()
      onClose()
      toast({
        title: authMode === "signin" ? "Signed in successfully" : "Account created successfully",
        description:
          authMode === "signin" ? "Welcome back to DASHED!" : "Welcome to DASHED! Your account has been created.",
        variant: "success",
      })
    }, 1500)
  }

  const handleWalletConnect = async (walletType: string) => {
    setSelectedWallet(walletType)
    setIsLoading(true)
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess()
      onClose()
      toast({
        title: "Wallet connected",
        description: `Your ${walletType} wallet has been connected successfully.`,
        variant: "success",
      })
    }, 1500)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess()
      onClose()
      toast({
        title: authMode === "signin" ? "Signed in successfully" : "Account created successfully",
        description:
          authMode === "signin" ? "Welcome back to DASHED!" : "Welcome to DASHED! Your account has been created.",
        variant: "success",
      })
    }, 1500)
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const handleDemoAccess = () => {
    onClose()
    router.push('/app')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-accent-700">
            {authMode === "signin" ? "Sign in to DASHED" : "Create a DASHED account"}
          </DialogTitle>
          <DialogDescription>
            {authMode === "signin"
              ? "Choose your preferred method to sign in to your DASHED account"
              : "Choose your preferred method to create your DASHED account"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="wallet">Crypto Wallet</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4 py-4">
            <Button variant="outline" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              {authMode === "signin" ? "Sign in with Google" : "Sign up with Google"}
            </Button>
            <Button variant="outline" disabled={isLoading} className="w-full">
              <Icons.apple className="mr-2 h-4 w-4" />
              {authMode === "signin" ? "Sign in with Apple" : "Sign up with Apple"}
            </Button>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={() => handleWalletConnect("Phantom")}
                disabled={isLoading}
                className="w-full justify-start"
              >
                {isLoading && selectedWallet === "Phantom" ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.phantom className="mr-2 h-4 w-4" />
                )}
                Connect with Phantom
              </Button>

              <Button
                variant="outline"
                onClick={() => handleWalletConnect("Solflare")}
                disabled={isLoading}
                className="w-full justify-start"
              >
                {isLoading && selectedWallet === "Solflare" ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.solflare className="mr-2 h-4 w-4" />
                )}
                Connect with Solflare
              </Button>

              <Button
                variant="outline"
                onClick={() => handleWalletConnect("MetaMask")}
                disabled={isLoading}
                className="w-full justify-start"
              >
                {isLoading && selectedWallet === "MetaMask" ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.metamask className="mr-2 h-4 w-4" />
                )}
                Connect with MetaMask
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Connect your crypto wallet to {authMode === "signin" ? "sign in" : "sign up"} securely to DASHED
            </p>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 py-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              {authMode === "signup" && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree to the{" "}
                    <a href="/terms" className="text-accent-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-accent-500 hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
              )}
              <Button type="submit" className="w-full bg-accent-500 hover:bg-accent-600" disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : authMode === "signin" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
            <div className="text-center space-y-2">
              {authMode === "signin" && (
                <Button variant="link" className="text-sm text-accent-500">
                  Forgot password?
                </Button>
              )}
              <div className="text-sm">
                {authMode === "signin" ? "Don't have an account? " : "Already have an account? "}
                <Button variant="link" className="p-0 text-accent-500" onClick={toggleAuthMode}>
                  {authMode === "signin" ? "Sign up" : "Sign in"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Demo Access Section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Want to explore first?</p>
            <Button
              variant="outline"
              onClick={handleDemoAccess}
              className="w-full bg-[#0077b6] hover:bg-[#0069a3] text-white border-[#0077b6] hover:border-[#0069a3]"
            >
              Try Demo Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

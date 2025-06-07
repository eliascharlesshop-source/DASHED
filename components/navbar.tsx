"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { AuthModal } from "@/components/auth/auth-modal"
import { CartDropdown } from "@/components/cart/cart-dropdown"
import { Logo } from "@/components/ui/logo"

// Create a simplified version of the GetStartedFlow component directly in this file
// to avoid import issues

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
  }

  const handleSignIn = () => {
    setIsAuthModalOpen(true)
  }

  const handleGetStarted = () => {
    setIsGetStartedOpen(true)
  }

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0077b6] shadow-md py-2" : "bg-[#0077b6] py-4"
        }`}
      >
        <div className="container flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/features" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">
                Features
              </Link>
              <Link href="/products" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">
                Products
              </Link>
              <Link href="/careers" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">
                Contact
              </Link>
              <Link href="/terms" className="text-sm font-medium text-white hover:text-blue-100 transition-colors">
                Terms
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <CartDropdown />
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-[#0069a3] hover:text-white"
                onClick={handleSignIn}
              >
                {isLoggedIn ? "Dashboard" : "Sign In"}
              </Button>
              <Button size="sm" className="bg-white text-[#0077b6] hover:bg-blue-100" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu - update colors to match blue theme */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0077b6] animate-fade-in">
            <nav className="flex flex-col p-4">
              <Link
                href="/features"
                className="py-2 text-white hover:text-blue-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/products"
                className="py-2 text-white hover:text-blue-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/careers"
                className="py-2 text-white hover:text-blue-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="py-2 text-white hover:text-blue-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/terms"
                className="py-2 text-white hover:text-blue-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Terms
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-center mb-2">
                  <CartDropdown />
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-[#0069a3]"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleSignIn()
                  }}
                >
                  {isLoggedIn ? "Dashboard" : "Sign In"}
                </Button>
                <Button
                  className="w-full bg-white text-[#0077b6] hover:bg-blue-100"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleGetStarted()
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleAuthSuccess} />

      {/* Get Started Flow - Simplified inline version */}
      {isGetStartedOpen && (
        <SimpleGetStartedDialog isOpen={isGetStartedOpen} onClose={() => setIsGetStartedOpen(false)} />
      )}
    </>
  )
}

// Simple inline version of the GetStartedFlow component to avoid import issues
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function SimpleGetStartedDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            <div className="flex justify-center mb-4">
              <Logo size="lg" textColor="text-[#0077b6]" />
            </div>
            Get Started with DASHED OS
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <p className="text-center text-gray-600 mb-6">
            Welcome to DASHED OS! Complete a few simple steps to set up your personal operating system.
          </p>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Choose Your Dashboard</h3>
              <p className="text-sm text-gray-500">Select how you want your dashboard to look and function</p>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Connect Your Devices</h3>
              <p className="text-sm text-gray-500">Link your computers, phones, and smart devices</p>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Set Your Preferences</h3>
              <p className="text-sm text-gray-500">Customize notifications, themes, and privacy settings</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button className="bg-[#0077b6] hover:bg-[#0069a3] text-white" onClick={onClose}>
              Get Started
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

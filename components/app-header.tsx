"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, Bell, ChevronDown, User, LogOut, Settings, HelpCircle } from "lucide-react"
import { CartDropdown } from "@/components/cart/cart-dropdown"

interface AppHeaderProps {
  toggleSidebar: () => void
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-[#0077b6] border-b border-[#0069a3] h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-white/80 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center ml-4">{/* Navigation links removed as requested */}</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-white hover:text-white/80" asChild>
            <Link href="/app/notifications">
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Link>
          </Button>
        </div>

        <CartDropdown />

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white/80 flex items-center gap-1"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-[#0069a3] flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
          </Button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/app/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/app/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/app/help">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Link>
                </Button>
              </div>
              <div className="p-2 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

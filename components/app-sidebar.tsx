"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Laptop, Shield, Wifi, HardDrive, Clock, User, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

export function AppSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check if the screen is mobile on initial render
  useEffect(() => {
    const checkIfMobile = () => {
      setIsCollapsed(window.innerWidth < 1024 && window.innerWidth >= 768)
    }

    // Set initial state
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      name: "Mirror",
      path: "/mirror",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Devices",
      path: "/devices",
      icon: <Laptop className="h-5 w-5" />,
    },
    {
      name: "Performance",
      path: "/performance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: "Security",
      path: "/security",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      name: "Network",
      path: "/network",
      icon: <Wifi className="h-5 w-5" />,
    },
    {
      name: "Storage",
      path: "/storage",
      icon: <HardDrive className="h-5 w-5" />,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: <Clock className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "md:w-20" : "md:w-64",
        )}
      >
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4 bg-[#0077b6] text-white">
          {!isCollapsed ? <Logo /> : <Logo withText={false} className="mx-auto" />}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#0069a3] ml-auto"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#0069a3] mx-auto"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  isCollapsed ? "justify-center" : "",
                  isActive(item.path)
                    ? "bg-accent-50 text-accent-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <div className={isCollapsed ? "" : "mr-3"}>{item.icon}</div>
                {!isCollapsed && item.name}
              </Link>
            ))}
          </nav>
        </div>

        {!isCollapsed && (
          <Link href="/profile" className="p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed inset-0 z-40 flex">
        {isMobileOpen && (
          <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Logo textColor="text-[#0077b6]" />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive(item.path)
                          ? "bg-accent-50 text-accent-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <div className="mr-3">{item.icon}</div>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <Link
                href="/profile"
                className="flex-shrink-0 flex border-t border-gray-200 p-4 hover:bg-gray-50"
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Mobile sidebar button */}
      <div className="md:hidden fixed bottom-4 left-4 z-20">
        <button className="bg-accent-500 text-white p-3 rounded-full shadow-lg" onClick={() => setIsMobileOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </>
  )
}

"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ClientAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Redirect to dashboard if at the app root
    if (pathname === "/app") {
      router.push("/dashboard")
    }
  }, [pathname, router])

  return <div className="h-screen overflow-hidden">{children}</div>
}

"use client"

import { usePathname } from "next/navigation"
import { NetworkAnimation } from "@/components/network-animation"

export function ClientNetworkAnimation() {
  const pathname = usePathname()

  // Don't show network animation on these pages
  const excludedPaths = ["/products", "/careers", "/contact", "/terms", "/products/dashed-hub"]

  if (excludedPaths.some((path) => pathname?.startsWith(path))) {
    return null
  }

  return <NetworkAnimation />
}

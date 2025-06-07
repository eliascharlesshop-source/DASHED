import type React from "react"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}

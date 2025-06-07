import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/providers/toast-provider"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DASHED OS - Dashboard",
  description: "Monitor and manage all your DASHED OS devices",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}

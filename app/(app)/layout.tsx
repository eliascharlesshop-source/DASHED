import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientAppLayout from "./ClientAppLayout"

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
  return <ClientAppLayout>{children}</ClientAppLayout>
}

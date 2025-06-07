import type React from "react"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0077b6] py-4">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <Logo size="sm" textColor="text-[#0077b6]" />
          <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} DASHED OS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

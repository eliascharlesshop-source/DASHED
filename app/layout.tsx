import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/providers/toast-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CartProvider } from "@/components/cart/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DASHED OS",
  description: "The operating system for your connected life",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <ToastProvider>
            {children}
            <ScrollToTop />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  )
}

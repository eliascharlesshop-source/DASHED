import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/providers/toast-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CartProvider } from "@/components/cart/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://dashed.com'),
  title: {
    default: "DASHED - Universal Computing Platform",
    template: "%s | DASHED"
  },
  description: "Experience the future of computing with DASHED - a universal operating system and hardware ecosystem that seamlessly integrates across all your devices.",
  keywords: [
    "DASHED", 
    "universal operating system", 
    "cross-platform", 
    "device synchronization", 
    "smart hardware", 
    "computing platform", 
    "TailsOS", 
    "privacy", 
    "security", 
    "IoT", 
    "DashedOS"
  ],
  authors: [{ name: "DASHED Team", url: "https://dashed.com" }],
  creator: "DASHED",
  publisher: "DASHED",
  openGraph: {
    type: "website",
    locale: "en",
    url: "/",
    title: "DASHED - Universal Computing Platform",
    description: "Experience the future of computing with DASHED - a universal operating system and hardware ecosystem.",
    siteName: "DASHED",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "DASHED Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DASHED - Universal Computing Platform",
    description: "Experience the future of computing with DASHED - a universal operating system and hardware ecosystem.",
    images: ["/placeholder-logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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

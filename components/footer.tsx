"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="w-full border-t py-16 lg:py-20 bg-white">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        >
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-sm font-medium">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/dashed-hub"
                  className="hover:underline hover:text-accent-500 transition-colors duration-200"
                >
                  DASHED Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/products/dashed-display"
                  className="hover:underline hover:text-accent-500 transition-colors duration-200"
                >
                  DASHED Display
                </Link>
              </li>
              <li>
                <Link
                  href="/products/dashed-controller"
                  className="hover:underline hover:text-accent-500 transition-colors duration-200"
                >
                  DASHED Controller
                </Link>
              </li>
              <li>
                <Link
                  href="/products/dashed-dock"
                  className="hover:underline hover:text-accent-500 transition-colors duration-200"
                >
                  DASHED Dock
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  View All
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Press
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="hover:underline hover:text-accent-500 transition-colors duration-200"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline hover:text-accent-500 transition-colors duration-200">
                  Privacy
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-sm font-medium">Subscribe</h3>
            <p className="text-sm text-gray-500">
              Subscribe to our newsletter to stay up to date on features and releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button variant="primary" size="sm">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">© 2025 DASHED. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-accent-500 transition-colors duration-200">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-accent-500 transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-accent-500 transition-colors duration-200">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-accent-500 transition-colors duration-200">
              <span className="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-accent-500 transition-colors duration-200">
              <span className="sr-only">YouTube</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

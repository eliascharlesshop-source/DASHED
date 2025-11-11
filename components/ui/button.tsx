import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary button - Brand colors with strong visual emphasis
        primary: "bg-[#0077b6] text-white hover:bg-[#0069a3] focus:ring-[#0077b6] shadow-sm",
        // Secondary button - Outline style with subtle emphasis
        secondary: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 shadow-sm",
        // Tertiary button - Text-only with minimal visual weight
        tertiary: "text-[#0077b6] hover:text-[#0069a3] hover:underline focus:ring-[#0077b6] bg-transparent",
        // Legacy variants for backwards compatibility
        default: "bg-[#0077b6] text-white hover:bg-[#0069a3] focus:ring-[#0077b6] shadow-sm",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
        outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 shadow-sm",
        ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
        link: "text-[#0077b6] hover:text-[#0069a3] hover:underline focus:ring-[#0077b6] bg-transparent",
        blue: "text-[#0077b6] hover:text-[#0069a3] focus:ring-[#0077b6]",
      },
      size: {
        sm: "h-8 px-3 py-1 text-xs rounded",
        default: "h-10 px-4 py-2 text-sm rounded-md",
        lg: "h-12 px-6 py-3 text-base rounded-lg",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

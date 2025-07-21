"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// This would normally come from your cart context
const useCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "DASHED Hub",
      price: 199.99,
      quantity: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DASHED-c02auZcBEAeuuDUf3mRBbvXpv1YObq.png",
    },
    {
      id: 2,
      name: "DASHED Display",
      price: 299.99,
      quantity: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DASHED-c02auZcBEAeuuDUf3mRBbvXpv1YObq.png",
    },
  ])

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return { items, removeItem, updateQuantity, subtotal }
}

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="relative">
      <button
        className="flex items-center text-white hover:text-blue-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-[#0077b6] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-medium">Your Cart ({itemCount})</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Your cart is empty</div>
            ) : (
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.id} className="py-6 px-4 flex">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-gray-500">Qty {item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Button
                  asChild
                  className="w-full"
                  variant="primary"
                >
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                  >
                    Checkout
                  </Link>
                </Button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-[#0077b6] hover:text-[#0069a3]"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

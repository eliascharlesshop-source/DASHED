"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, CreditCard, Truck, ShieldCheck } from "lucide-react"
import Image from "next/image"

// Mock cart data - in a real app, this would come from your cart context
const cartItems = [
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
]

const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
const shipping = 9.99
const tax = subtotal * 0.08
const total = subtotal + shipping + tax

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleContinue = () => {
    if (currentStep === "cart") {
      setCurrentStep("shipping")
    } else if (currentStep === "shipping") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      // Process payment
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep("confirmation")
      }, 2000)
    } else if (currentStep === "confirmation") {
      router.push("/")
    }
  }

  const handleBack = () => {
    if (currentStep === "shipping") {
      setCurrentStep("cart")
    } else if (currentStep === "payment") {
      setCurrentStep("shipping")
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <ol className="flex items-center w-full">
            {["cart", "shipping", "payment", "confirmation"].map((step, index) => (
              <li key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep === step
                      ? "bg-[#0077b6] text-white"
                      : ["cart", "shipping", "payment"].indexOf(currentStep) >=
                          ["cart", "shipping", "payment"].indexOf(step as CheckoutStep)
                        ? "bg-[#0077b6] text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      ["cart", "shipping", "payment"].indexOf(currentStep) > index ? "bg-[#0077b6]" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={currentStep === "cart" ? "font-medium text-[#0077b6]" : ""}>Cart</span>
          <span className={currentStep === "shipping" ? "font-medium text-[#0077b6]" : ""}>Shipping</span>
          <span className={currentStep === "payment" ? "font-medium text-[#0077b6]" : ""}>Payment</span>
          <span className={currentStep === "confirmation" ? "font-medium text-[#0077b6]" : ""}>Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          {currentStep === "cart" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
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
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "shipping" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="NY" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" />
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                <div className="flex items-center space-x-2 border p-4 rounded-lg">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-[#0077b6]" />
                        <span>Standard Shipping (3-5 business days)</span>
                      </div>
                      <span className="font-medium">$9.99</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-[#0077b6]" />
                        <span>Express Shipping (1-2 business days)</span>
                      </div>
                      <span className="font-medium">$19.99</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === "payment" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
              <div className="mb-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 border p-4 rounded-lg">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-[#0077b6]" />
                        <span>Credit / Debit Card</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <ShieldCheck className="h-5 w-5 text-[#0077b6] mr-2" />
                <span className="text-sm text-gray-500">Your payment information is secure and encrypted</span>
              </div>
            </div>
          )}

          {currentStep === "confirmation" && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been placed successfully.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Order #12345</h3>
                <p className="text-sm text-gray-500">A confirmation email has been sent to your email address.</p>
              </div>

              <div className="flex justify-center mb-6">
                <Logo size="lg" textColor="text-[#0077b6]" />
              </div>

              <Button onClick={() => router.push("/")} className="bg-[#0077b6] hover:bg-[#0069a3] text-white">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity} x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {currentStep !== "confirmation" && (
              <Button
                onClick={handleContinue}
                className="w-full bg-[#0077b6] hover:bg-[#0069a3] text-white"
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : currentStep === "cart"
                    ? "Continue to Shipping"
                    : currentStep === "shipping"
                      ? "Continue to Payment"
                      : "Place Order"}
              </Button>
            )}

            {(currentStep === "shipping" || currentStep === "payment") && (
              <Button onClick={handleBack} variant="outline" className="w-full">
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, StarHalf, Shield, Truck, RotateCcw, Check, ChevronRight } from "lucide-react"
import { useToastContext } from "@/components/providers/toast-provider"

interface ProductSpec {
  [key: string]: string
}

interface ProductDetailProps {
  product: {
    id: string
    name: string
    price: number
    tagline?: string
    description: string
    longDescription?: string
    features: string[]
    specs: ProductSpec
    rating: number
    reviews: number
    images: string[]
    variants: string[]
    type?: "hardware" | "software"
    period?: string
    relatedProducts?: string[]
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { toast } = useToastContext()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [isZoomed, setIsZoomed] = useState(false)

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-accent-500 text-accent-500" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-accent-500 text-accent-500" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedVariant}) has been added to your cart.`,
      type: "success",
      duration: 3000,
    })
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-accent-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-accent-500">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/products" className="hover:text-accent-500">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-accent-500">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="aspect-square relative overflow-hidden rounded-lg bg-gray-50 border border-gray-200 cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-contain p-8 transition-transform duration-300 ${isZoomed ? "scale-125" : "scale-100"}`}
              />
              {isZoomed && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                  <span className="text-sm">Click to zoom out</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square relative overflow-hidden rounded-lg bg-gray-50 border ${
                    selectedImage === image ? "border-accent-500 ring-2 ring-accent-200" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.tagline && <p className="text-accent-500 font-medium mb-1">{product.tagline}</p>}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-accent-700">${product.price}</p>
                {product.period && <span className="text-gray-500">/{product.period}</span>}
              </div>
              <p className="mt-4 text-gray-600">{product.longDescription || product.description}</p>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Variant</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant}
                      variant={selectedVariant === variant ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant)}
                      className={selectedVariant === variant ? "bg-accent-500" : ""}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              {product.type !== "software" && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                      className="w-16 mx-2 text-center"
                    />
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="space-y-3">
              <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full">
                Buy Now
              </Button>
              <p className="text-sm text-center text-gray-600">
                {product.type === "hardware"
                  ? "Free shipping on orders over $50"
                  : "Instant digital delivery after purchase"}
              </p>
            </div>

            {/* Benefits */}
            <div className="border-t border-b border-gray-200 py-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-accent-500 mr-2" />
                  <span className="text-sm text-gray-600">2-Year Warranty</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-accent-500 mr-2" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 text-accent-500 mr-2" />
                  <span className="text-sm text-gray-600">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full justify-start border-b mb-0 rounded-none bg-transparent space-x-8">
              <TabsTrigger
                value="features"
                className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value="returns"
                className="data-[state=active]:border-b-2 data-[state=active]:border-accent-500 data-[state=active]:text-accent-700 rounded-none border-b-2 border-transparent pb-2 pt-0 px-1"
              >
                Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-2">
                      <dt className="text-sm font-medium text-gray-500 capitalize">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                <p className="text-gray-600 mb-4">We offer the following shipping options for all hardware products:</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Standard Shipping (Free)</span>
                      <p className="text-sm text-gray-600">Delivery in 3-5 business days</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Express Shipping ($15)</span>
                      <p className="text-sm text-gray-600">Delivery in 1-2 business days</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Same-Day Delivery ($25)</span>
                      <p className="text-sm text-gray-600">Available in select cities for orders placed before 10am</p>
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  For software products, delivery is instant via email after purchase.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="returns" className="mt-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Return Policy</h3>
                <p className="text-gray-600 mb-4">
                  We want you to be completely satisfied with your purchase. If you're not, we offer a hassle-free
                  return policy:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">30-Day Return Window</span>
                      <p className="text-sm text-gray-600">
                        Return any product within 30 days of delivery for a full refund
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Free Return Shipping</span>
                      <p className="text-sm text-gray-600">
                        We'll provide a prepaid shipping label for hardware returns
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Software Refunds</span>
                      <p className="text-sm text-gray-600">
                        Software subscriptions can be canceled within 14 days for a prorated refund
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* This would normally fetch related products data */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-square relative bg-gray-50">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Related product"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Related DASHED Product</h3>
                    <p className="text-accent-700 font-bold mt-1">$199</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

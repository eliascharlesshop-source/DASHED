import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "DASHED Hub",
    price: 299,
    image: "/placeholder.svg?height=400&width=400",
    badge: { text: "Best Seller", variant: "success" as const },
  },
  {
    id: 2,
    name: "DASHED Display",
    price: 499,
    image: "/placeholder.svg?height=400&width=400",
    badge: { text: "New", variant: "new" as const },
  },
  {
    id: 3,
    name: "DASHED Controller",
    price: 199,
    image: "/placeholder.svg?height=400&width=400",
    badge: { text: "Sale", variant: "sale" as const },
  },
  {
    id: 4,
    name: "DASHED Dock",
    price: 149,
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            {product.badge && (
              <Badge variant={product.badge.variant} className="absolute top-2 right-2 z-10">
                {product.badge.text}
              </Badge>
            )}
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <Button
              className="w-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              variant="outline"
            >
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

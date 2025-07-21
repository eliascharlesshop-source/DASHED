import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton"

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

export function ProductGrid({ isLoading = false }: { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
          </div>
          <div className="mt-3 space-y-1">
            <h3 className="text-base font-medium leading-tight">{product.name}</h3>
            <p className="text-gray-600 font-semibold">${product.price}</p>
            <Button
              size="sm"
              className="w-full opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
              variant="primary"
            >
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

import Image from "next/image"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    title: "Introducing DASHED OS 2.0",
    excerpt: "A new era of personal computing with enhanced features and capabilities.",
    date: "March 4, 2024",
    category: "Product Updates",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    title: "The Future of Home Automation",
    excerpt: "How DASHED is revolutionizing the way we interact with our homes.",
    date: "March 2, 2024",
    category: "Industry Insights",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    title: "Security in the Age of Connected Devices",
    excerpt: "Understanding the importance of device security in modern homes.",
    date: "February 28, 2024",
    category: "Security",
    image: "/placeholder.svg?height=300&width=600",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 gradient-text">DASHED Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article key={index} className="glass-effect rounded-lg overflow-hidden hover-lift">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={600}
              height={300}
              className="w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-accent-500">{post.category}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Button variant="link" className="p-0 text-accent-500 hover:text-accent-400">
                Read More
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

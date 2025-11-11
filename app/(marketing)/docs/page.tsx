import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const docCategories = [
  {
    title: "Getting Started",
    items: ["Quick Start Guide", "Installation", "Basic Configuration", "Device Setup"],
  },
  {
    title: "Core Concepts",
    items: ["DASHED Architecture", "Security Model", "Device Management", "User Permissions"],
  },
  {
    title: "Advanced Topics",
    items: ["Custom Automations", "API Integration", "Plugin Development", "Performance Optimization"],
  },
]

export default function DocsPage() {
  return (
    
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Documentation</h1>

          {/* Search */}
          <div className="relative mb-12">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input placeholder="Search documentation..." className="pl-10" />
          </div>

          {/* Documentation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docCategories.map((category, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg hover-lift">
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Button variant="link" className="p-0 text-accent-500 hover:text-accent-400">
                        {item}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="w-full justify-start">
                API Reference
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Troubleshooting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Release Notes
              </Button>
            </div>
          </div>
        </div>
      </div>
    
  )
}

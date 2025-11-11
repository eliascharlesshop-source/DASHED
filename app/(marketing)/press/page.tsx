import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const pressReleases = [
  {
    title: "DASHED Announces Series A Funding Round",
    date: "March 1, 2024",
    excerpt: "Leading technology investors back DASHED's vision for the future of personal computing.",
  },
  {
    title: "DASHED OS 2.0 Launch Event Announced",
    date: "February 15, 2024",
    excerpt: "Join us for the virtual launch event of our next-generation operating system.",
  },
  {
    title: "DASHED Partners with Leading Smart Home Manufacturers",
    date: "February 1, 2024",
    excerpt: "Strategic partnerships expand DASHED OS compatibility across major device brands.",
  },
]

export default function PressPage() {
  return (
    
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Press Center</h1>

          {/* Press Kit */}
          <div className="glass-effect p-6 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Press Kit</h2>
            <p className="text-gray-600 mb-6">
              Download our press kit for official logos, brand guidelines, and high-resolution images.
            </p>
            <Button className="bg-accent-500 hover:bg-accent-400">
              <Download className="mr-2 h-4 w-4" />
              Download Press Kit
            </Button>
          </div>

          {/* Press Releases */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Recent Press Releases</h2>
            {pressReleases.map((release, index) => (
              <article key={index} className="glass-effect p-6 rounded-lg hover-lift">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-accent-500">Press Release</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{release.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                <p className="text-gray-600 mb-4">{release.excerpt}</p>
                <Button variant="link" className="p-0 text-accent-500 hover:text-accent-400">
                  Read Full Release
                </Button>
              </article>
            ))}
          </div>

          {/* Media Contact */}
          <div className="mt-12 p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Media Contact</h2>
            <p className="text-gray-600">
              For press inquiries, please contact:
              <br />
              <a href="mailto:press@dashed.com" className="text-accent-500 hover:text-accent-400">
                press@dashed.com
              </a>
            </p>
          </div>
        </div>
      </div>
    
  )
}

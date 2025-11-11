import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Book, PenToolIcon as Tool, Terminal } from "lucide-react"

export default function DevelopersPage() {
  return (
    
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Developers</h1>

          {/* Overview Section */}
          <div className="glass-effect p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Build with DASHED</h2>
            <p className="text-gray-600 mb-6">
              Create powerful integrations and extensions for DASHED OS using our comprehensive developer tools and
              APIs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-accent-500 hover:bg-accent-400">Get Started</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>

          {/* Developer Resources */}
          <Tabs defaultValue="docs" className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="docs">
                <Book className="w-4 h-4 mr-2" />
                Docs
              </TabsTrigger>
              <TabsTrigger value="api">
                <Code className="w-4 h-4 mr-2" />
                API
              </TabsTrigger>
              <TabsTrigger value="tools">
                <Tool className="w-4 h-4 mr-2" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="examples">
                <Terminal className="w-4 h-4 mr-2" />
                Examples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="docs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-effect p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
                  <p className="text-gray-600 mb-4">Learn the basics of developing with DASHED OS.</p>
                  <Button variant="link" className="p-0 text-accent-500">
                    Read More
                  </Button>
                </div>
                <div className="glass-effect p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Integration Guide</h3>
                  <p className="text-gray-600 mb-4">Detailed guide for integrating with DASHED OS.</p>
                  <Button variant="link" className="p-0 text-accent-500">
                    Read More
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <div className="glass-effect p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">API Reference</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">REST API</h4>
                    <p className="text-sm text-gray-600">Complete REST API documentation with examples.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">WebSocket API</h4>
                    <p className="text-sm text-gray-600">Real-time communication API documentation.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-effect p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">SDK</h3>
                  <p className="text-gray-600 mb-4">Official DASHED SDK for multiple platforms.</p>
                  <Button variant="link" className="p-0 text-accent-500">
                    Download
                  </Button>
                </div>
                <div className="glass-effect p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">CLI Tools</h3>
                  <p className="text-gray-600 mb-4">Command-line tools for development and testing.</p>
                  <Button variant="link" className="p-0 text-accent-500">
                    Learn More
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-6">
              <div className="space-y-4">
                <div className="glass-effect p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Sample Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">Device Integration</h4>
                      <p className="text-sm text-gray-600 mb-2">Example of integrating a new device type.</p>
                      <Button variant="link" className="p-0 text-accent-500">
                        View Code
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">Custom Dashboard</h4>
                      <p className="text-sm text-gray-600 mb-2">Building a custom dashboard widget.</p>
                      <Button variant="link" className="p-0 text-accent-500">
                        View Code
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Developer Community */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Join Our Developer Community</h2>
            <p className="text-gray-600 mb-6">
              Connect with other developers, share your projects, and get help from the DASHED team.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-accent-500 hover:bg-accent-400">Join Discord</Button>
              <Button variant="outline">Visit Forum</Button>
            </div>
          </div>
        </div>
      </div>
    
  )
}

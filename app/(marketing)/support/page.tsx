import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Book, HelpCircle } from "lucide-react"

const supportCategories = [
  {
    title: "Getting Started",
    description: "New to DASHED? Start here for setup guides and basics.",
    icon: Book,
  },
  {
    title: "Troubleshooting",
    description: "Common issues and their solutions.",
    icon: HelpCircle,
  },
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time.",
    icon: MessageCircle,
  },
]

const faqItems = [
  {
    question: "How do I set up my DASHED Hub?",
    answer:
      "Setting up your DASHED Hub is simple. Just plug it in, download the DASHED app, and follow the in-app setup instructions.",
  },
  {
    question: "Can I use DASHED OS with my existing smart home devices?",
    answer: "Yes! DASHED OS is compatible with most major smart home brands and protocols.",
  },
  {
    question: "How secure is DASHED OS?",
    answer: "DASHED OS uses enterprise-grade encryption and security protocols to keep your devices and data safe.",
  },
]

export default function SupportPage() {
  return (
    
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Support Center</h1>

          {/* Search */}
          <div className="relative mb-12">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input placeholder="Search for help..." className="pl-10" />
          </div>

          {/* Support Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {supportCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="glass-effect p-6 rounded-lg hover-lift">
                  <Icon className="h-8 w-8 text-accent-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Button className="w-full bg-accent-500 hover:bg-accent-400">Get Started</Button>
                </div>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="glass-effect p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <Button className="bg-accent-500 hover:bg-accent-400">Contact Support</Button>
          </div>
        </div>
      </div>
    
  )
}

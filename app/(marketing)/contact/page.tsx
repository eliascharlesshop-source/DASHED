import { ContactForm } from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <div className="bg-accent-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-accent-700 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Get in touch with our team to learn more about DASHED OS or to get support with your products.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-accent-700 mb-6">Send us a message</h2>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-accent-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Headquarters</p>
                    <p className="text-gray-600">123 Tech Avenue</p>
                    <p className="text-gray-600">San Francisco, CA 94107</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-accent-500 mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-accent-500 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@dashed.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-accent-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9AM - 5PM PST</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Support Options</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">
                  <span className="font-medium text-gray-900">Technical Support:</span> support@dashed.com
                </li>
                <li className="text-gray-600">
                  <span className="font-medium text-gray-900">Sales Inquiries:</span> sales@dashed.com
                </li>
                <li className="text-gray-600">
                  <span className="font-medium text-gray-900">Press:</span> press@dashed.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import { Icons } from "@/components/icons"

interface TemplateSelectionProps {
  selectedTemplate: string | null
  onSelectTemplate: (template: string) => void
}

export function TemplateSelection({ selectedTemplate, onSelectTemplate }: TemplateSelectionProps) {
  const templates = [
    {
      id: "home",
      title: "Home Management",
      description: "Manage your smart home devices, security systems, and energy usage",
      icon: <Icons.home className="h-10 w-10 text-accent-500" />,
    },
    {
      id: "yard",
      title: "Yard Management",
      description: "Control irrigation systems, outdoor lighting, and garden monitoring",
      icon: <Icons.yard className="h-10 w-10 text-accent-500" />,
    },
    {
      id: "office",
      title: "Home Office Management",
      description: "Optimize your work environment with device control and automation",
      icon: <Icons.office className="h-10 w-10 text-accent-500" />,
    },
    {
      id: "hobby",
      title: "Hobby Management",
      description: "Customize controls for your hobby equipment and creative spaces",
      icon: <Icons.hobby className="h-10 w-10 text-accent-500" />,
    },
  ]

  return (
    <div className="h-[400px] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`bg-white p-6 rounded-lg shadow-sm border cursor-pointer transition-all hover-lift ${
              selectedTemplate === template.id ? "border-2 border-accent-500 bg-accent-50" : "border-gray-200"
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{template.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <div className="flex-shrink-0 bg-accent-500 text-white rounded-full p-1">
                  <Icons.check className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

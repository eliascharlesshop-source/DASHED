"use client"

import { Icons } from "@/components/icons"
import Image from "next/image"

interface DashboardPreferenceProps {
  selectedLayout: string | null
  onSelectLayout: (layout: string) => void
}

export function DashboardPreference({ selectedLayout, onSelectLayout }: DashboardPreferenceProps) {
  const layouts = [
    {
      id: "tabular",
      title: "Tabular View",
      description: "Organize your devices in a structured table format",
      icon: <Icons.grid className="h-10 w-10 text-accent-500" />,
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "kanban",
      title: "Kanban View",
      description: "Manage your devices in customizable card columns",
      icon: <Icons.kanban className="h-10 w-10 text-accent-500" />,
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "map",
      title: "Map View",
      description: "Visualize your devices on an interactive map with hover cards",
      icon: <Icons.map className="h-10 w-10 text-accent-500" />,
      image: "/placeholder.svg?height=150&width=250",
    },
  ]

  return (
    <div className="space-y-4 h-[400px] flex flex-col">
      <p className="text-sm text-gray-600">
        Choose how you want to view and manage your devices in the DASHED dashboard
      </p>

      <div className="overflow-y-auto pr-2 flex-grow">
        <div className="grid grid-cols-1 gap-4">
          {layouts.map((layout) => (
            <div
              key={layout.id}
              className={`bg-white p-4 shadow-sm border rounded-lg cursor-pointer transition-all hover-lift ${
                selectedLayout === layout.id ? "border-2 border-accent-500 bg-accent-50" : "border-gray-200"
              }`}
              onClick={() => onSelectLayout(layout.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">{layout.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{layout.title}</h3>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </div>
                {selectedLayout === layout.id && (
                  <div className="flex-shrink-0 bg-accent-500 text-white rounded-full p-1">
                    <Icons.check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="mt-4 overflow-hidden rounded-md">
                <Image
                  src={layout.image || "/placeholder.svg"}
                  alt={layout.title}
                  width={250}
                  height={150}
                  className="w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

const departments = [
  {
    name: "Engineering",
    jobs: [
      {
        title: "Senior Software Engineer",
        location: "San Francisco, CA",
        description: "We're looking for experienced software engineers to help build the core of DASHED OS.",
      },
      {
        title: "Frontend Developer",
        location: "Remote",
        description: "Join our team building the next generation of user interfaces.",
      },
    ],
  },
  {
    name: "Design",
    jobs: [
      {
        title: "Product Designer",
        location: "New York, NY",
        description: "Help shape the future of personal computing through thoughtful design.",
      },
    ],
  },
  {
    name: "Operations",
    jobs: [
      {
        title: "Product Manager",
        location: "Remote",
        description: "Drive the vision and execution of DASHED OS features.",
      },
    ],
  },
]

export function JobListings() {
  const [expandedDept, setExpandedDept] = useState<string | null>("Engineering")

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {departments.map((dept) => (
        <div key={dept.name} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedDept(expandedDept === dept.name ? null : dept.name)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold">{dept.name}</h2>
            {expandedDept === dept.name ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {expandedDept === dept.name && (
            <div className="divide-y">
              {dept.jobs.map((job) => (
                <div key={job.title} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.location}</p>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const departments = [
  {
    name: "Engineering",
    jobs: [
      {
        title: "Senior Software Engineer",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "We're looking for experienced software engineers to help build the core of DASHED OS.",
      },
      {
        title: "Frontend Developer",
        location: "Remote",
        type: "Full-time",
        description: "Join our team building the next generation of user interfaces.",
      },
      {
        title: "DevOps Engineer",
        location: "New York, NY",
        type: "Full-time",
        description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
      },
    ],
  },
  {
    name: "Design",
    jobs: [
      {
        title: "Product Designer",
        location: "New York, NY",
        type: "Full-time",
        description: "Help shape the future of personal computing through thoughtful design.",
      },
      {
        title: "UX Researcher",
        location: "Remote",
        type: "Full-time",
        description: "Conduct user research to inform our product development process.",
      },
    ],
  },
  {
    name: "Operations",
    jobs: [
      {
        title: "Product Manager",
        location: "Remote",
        type: "Full-time",
        description: "Drive the vision and execution of DASHED OS features.",
      },
      {
        title: "Technical Program Manager",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Coordinate cross-functional teams to deliver complex projects on time.",
      },
    ],
  },
]

export default function CareersPage() {
  return (
    <>
      <div className="bg-accent-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-accent-700 mb-4">Careers at DASHED</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Join us in building the future of personal computing. We're looking for talented individuals to help shape
            the next generation of operating systems.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input placeholder="Search for jobs..." className="pl-10" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {departments.map((dept) => (
            <div key={dept.name}>
              <h2 className="text-2xl font-bold text-accent-700 mb-6">{dept.name}</h2>
              <div className="space-y-4">
                {dept.jobs.map((job) => (
                  <div
                    key={job.title}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                            {job.location}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0 bg-accent-500 hover:bg-accent-600 text-white">Apply Now</Button>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-accent-700 mb-4">Don't see the right role?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in
            mind for future opportunities.
          </p>
          <Button className="bg-accent-500 hover:bg-accent-600 text-white">Submit Your Resume</Button>
        </div>
      </div>
    </>
  )
}

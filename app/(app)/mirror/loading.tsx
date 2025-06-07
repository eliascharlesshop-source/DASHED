import { Skeleton } from "@/components/ui/skeleton"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"

export default function MirrorLoading() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* Page Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>

          {/* Stream View Skeleton */}
          <div className="mb-6">
            <Skeleton className="w-full aspect-video rounded-lg" />
          </div>

          {/* Tabs Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-8 w-16 rounded-md" />
                  ))}
                </div>
                <Skeleton className="h-8 w-48 rounded-md" />
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-gray-200">
                    <Skeleton className="w-full aspect-video" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((col) => (
                      <div key={col} className="space-y-6">
                        {[1, 2, 3].map((row) => (
                          <div key={`${col}-${row}`} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Skeleton className="h-5 w-32" />
                              <Skeleton className="h-4 w-48" />
                            </div>
                            <Skeleton className="h-6 w-12 rounded-full" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <Skeleton className="h-6 w-36" />
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="w-8 h-8 rounded-full mr-3" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-3/4 mb-1" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

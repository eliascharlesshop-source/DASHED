import { Skeleton } from "@/components/ui/skeleton"

export default function DocsLoading() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 max-w-lg" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden md:block space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/6" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-8 w-full mt-6" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/6" />
        </div>

        {/* Main content skeleton */}
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-8 w-full max-w-lg" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-8 w-full max-w-md" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-8 w-full max-w-sm" />
          <Skeleton className="h-20 w-full" />

          {/* Code block skeleton */}
          <div className="rounded-md bg-gray-100 p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    </div>
  )
}

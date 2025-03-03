import { CompanySkeleton } from "@/components/ui/skeletons"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-10 w-3/4 mb-4" />

      {/* Description skeleton */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-8" />

      {/* Filters skeleton */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-8 w-48 mb-4" />
          <CompanySkeleton />
        </div>

        <div className="lg:col-span-1">
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-[400px] w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}


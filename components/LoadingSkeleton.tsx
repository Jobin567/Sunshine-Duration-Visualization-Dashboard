import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function DashboardLoadingSkeleton() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Section Skeleton */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
          
          {/* Chart Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Skeleton className="h-6 w-48" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>

          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Metadata Panel Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="h-6 w-48" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="pl-6 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights Panel Skeleton */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="h-6 w-40" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-36" />
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, j) => (
                      <div key={j} className="flex items-center justify-between">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ChartLoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-80 w-full" />
      </CardContent>
    </Card>
  );
}